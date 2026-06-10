import { create } from 'zustand';
import type { User } from '@/entities/user/types';

export type AuthStatus = 'idle' | 'loading' | 'authed' | 'error';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  error: string | null;
  setSession: (user: User, accessToken: string) => void;
  setError: (message: string) => void;
  setLoading: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  status: 'idle',
  error: null,
  setSession: (user, accessToken) =>
    set({ user, accessToken, status: 'authed', error: null }),
  setError: (message) => set({ status: 'error', error: message }),
  setLoading: () => set({ status: 'loading', error: null }),
  logout: () => set({ user: null, accessToken: null, status: 'idle', error: null }),
}));

/** Геттер для API-клиента (избегаем циклической зависимости с lib/api/client.ts). */
export function getAccessToken(): string | null {
  return useAuthStore.getState().accessToken;
}
