'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { refreshAccessToken } from '@/lib/axios';
import { tokenManager } from '@/lib/token-manager';
import { authApi } from '@/lib/api/auth.api';

import type { AuthUser } from '@/lib/api/auth.api';

type AuthStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

interface AuthContextType {
  user: AuthUser | null;
  status: AuthStatus;

  setAuthenticatedUser: (user: AuthUser) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [status, setStatus] = useState<AuthStatus>('loading');

  const queryClient = useQueryClient();

const setAuthenticatedUser = useCallback(
  (authUser: AuthUser) => {
    setUser(authUser);
    setStatus('authenticated');

    queryClient.setQueryData(
      ['auth', 'me'],
      {
        success: true,
        user: authUser,
      },
    );
  },
  [queryClient],
);

const clearAuth = useCallback(() => {
  tokenManager.clearAccessToken();

  setUser(null);
  setStatus('unauthenticated');

  queryClient.clear();
}, [queryClient]);
  // Restore authentication when the application loads.
  useEffect(() => {
    let cancelled = false;

    async function initializeAuth() {
      try {
        console.log('AUTH: Starting initialization');

        await refreshAccessToken();

        console.log('AUTH: Refresh successful');

        const response = await authApi.getCurrentUser();

        if (cancelled) return;

        setUser(response.user);
        setStatus('authenticated');

        queryClient.setQueryData(
          ['auth', 'me'],
          response,
        );
      } catch (error) {
        console.error('AUTH: Initialization failed:', error);

        if (cancelled) return;

        tokenManager.clearAccessToken();

        setUser(null);
        setStatus('unauthenticated');

        queryClient.removeQueries({
          queryKey: ['auth', 'me'],
        });
      }
    }

    initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        setAuthenticatedUser,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}