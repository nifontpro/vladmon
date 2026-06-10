import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureApi } from '@/shared/lib/api/client';
import { getAccessToken, useAuthStore } from '@/features/auth/model/store';

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  useEffect(() => {
    configureApi({
      getAccessToken,
      onUnauthorized: () => {
        useAuthStore.getState().logout();
      },
    });
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
