'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { authApi } from '@/lib/api/auth.api';
import { useAuth } from '../context/auth-context';

import type {
  ChangePasswordPayload,
} from '@/lib/api/auth.api';

export function useChangePassword() {
  const router = useRouter();

  const { clearAuth } = useAuth();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => {
      return authApi.changePassword(payload);
    },

    onSuccess: () => {
      // Backend has revoked all sessions.
      // Remove the current frontend authentication.
      clearAuth();

      // Ask the user to sign in again.
      router.replace('/login');
    },
  });
}