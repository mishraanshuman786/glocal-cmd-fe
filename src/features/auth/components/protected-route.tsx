'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../context/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useAuth();
  const router = useRouter();

  console.log("status:", status);

  useEffect(() => {

    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  

  // if (status === 'loading') {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
}