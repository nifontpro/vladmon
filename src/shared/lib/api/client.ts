/**
 * Лёгкий fetch-клиент с JWT-интерсептором.
 * Доступ к access-токену через колбэк (зависимость инвертирована,
 * чтобы не было циклической зависимости с auth-store).
 *
 * Поведение:
 *   - присоединяет Authorization, если есть валидный access-токен;
 *   - 401 → попытка refresh (заглушка) → повтор запроса;
 *   - JSON по умолчанию; для бинарных вызовов — { rawResponse: true }.
 */

import { isExpired } from '@/shared/lib/jwt';

export type ApiErrorShape = {
  status: number;
  code?: string;
  message: string;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(shape: ApiErrorShape) {
    super(shape.message);
    this.name = 'ApiError';
    this.status = shape.status;
    this.code = shape.code;
  }
}

type TokenProvider = {
  getAccessToken: () => string | null;
  refresh?: () => Promise<string | null>;
  onUnauthorized?: () => void;
};

let provider: TokenProvider = { getAccessToken: () => null };

export function configureApi(p: TokenProvider) {
  provider = p;
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api') as string;

export type RequestOptions = RequestInit & {
  rawResponse?: boolean;
  skipAuth?: boolean;
};

export async function apiRequest<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const headers = new Headers(opts.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  if (opts.body && !headers.has('Content-Type') && !(opts.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (!opts.skipAuth) {
    let token = provider.getAccessToken();
    if (token && isExpired(token) && provider.refresh) {
      token = await provider.refresh();
    }
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, { ...opts, headers, credentials: 'include' });

  if (res.status === 401 && !opts.skipAuth && provider.refresh) {
    const newToken = await provider.refresh();
    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`);
      const retry = await fetch(url, { ...opts, headers, credentials: 'include' });
      return parseResponse<T>(retry, opts);
    }
    provider.onUnauthorized?.();
  }

  return parseResponse<T>(res, opts);
}

async function parseResponse<T>(res: Response, opts: RequestOptions): Promise<T> {
  if (!res.ok) {
    let message = res.statusText || 'Network error';
    let code: string | undefined;
    try {
      const body = (await res.json()) as { message?: string; code?: string };
      if (body.message) message = body.message;
      if (body.code) code = body.code;
    } catch {
      /* ignore */
    }
    throw new ApiError({ status: res.status, code, message });
  }
  if (opts.rawResponse) return res as unknown as T;
  if (res.status === 204) return undefined as T;
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) return (await res.json()) as T;
  return (await res.text()) as T;
}
