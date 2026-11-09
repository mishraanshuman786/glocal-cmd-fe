'use client';

import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/lib/api/auth.api';
import { tokenManager } from '@/lib/token-manager';
import { useAuth } from '../context/auth-context';

import type { LoginPayload } from '@/lib/api/auth.api';

export function useLogin() {
  const { setAuthenticatedUser } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => {
      return authApi.login(payload);
    },

    onSuccess: (response) => {
      // Store the short-lived access token in memory.
      tokenManager.setAccessToken(response.accessToken);

      // Update AuthProvider and React Query cache.
      setAuthenticatedUser(response.user);
    },
  });
}