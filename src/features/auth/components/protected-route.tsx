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

  const [hasAuthResolved, setHasAuthResolved] = useState(
    status !== 'loading',
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingComplete(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status !== 'loading') {
      setHasAuthResolved(true);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  const shouldShowSplashScreen =
    !hasAuthResolved || !minimumLoadingComplete;

  if (shouldShowSplashScreen) {
    return <AuthSplashScreen />;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
}