'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { authApi } from '@/lib/api/auth.api';
import { useAuth } from '../context/auth-context';

export function useLogout() {
  const router = useRouter();

  const { clearAuth } = useAuth();

  return useMutation({
    mutationFn: () => authApi.logout(),

    onSettled: () => {
      // Clear frontend authentication even if
      // the logout request fails.
      clearAuth();

      router.replace('/login');
    },
  });
}