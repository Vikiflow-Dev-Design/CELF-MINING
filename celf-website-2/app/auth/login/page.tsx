/**
 * Login Page
 * Dedicated login page for CELF website
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthPages } from '@/src/components/auth/auth-modal';
import { useAuth } from '@/src/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthPages 
      initialMode="login" 
      onSuccess={handleSuccess}
    />
  );
}
