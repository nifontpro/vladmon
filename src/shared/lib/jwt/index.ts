/**
 * Утилиты для разбора и проверки JWT.
 * НЕ делает криптографическую верификацию подписи —
 * подпись валидирует бэкенд. Здесь только парсинг claims и проверка срока.
 */

export type JwtClaims = {
  sub?: string;
  exp?: number;
  iat?: number;
  email?: string;
  [k: string]: unknown;
};

export function parseJwt(token: string): JwtClaims | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload + '==='.slice((payload.length + 3) % 4);
    const json = atob(padded);
    return JSON.parse(json) as JwtClaims;
  } catch {
    return null;
  }
}

export function isExpired(token: string, skewSeconds = 30): boolean {
  const claims = parseJwt(token);
  if (!claims?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return claims.exp - skewSeconds <= now;
}
