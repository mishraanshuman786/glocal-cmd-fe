'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../context/auth-context';
import { AuthSplashScreen } from './AuthSplashScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useAuth();
  const router = useRouter();

  const [minimumLoadingComplete, setMinimumLoadingComplete] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingComplete(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading' || !minimumLoadingComplete) {
    return <AuthSplashScreen />;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
}
