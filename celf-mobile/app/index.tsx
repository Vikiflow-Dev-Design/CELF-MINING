/**
 * Main App Entry Point
 * Handles authentication flow and app initialization
 */

import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useAppInitialization } from '@/hooks/useAppInitialization';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { LoadingScreen } from '@/components/auth/LoadingScreen';
import { ErrorScreen } from '@/components/auth/ErrorScreen';
import { Redirect } from 'expo-router';

export default function IndexScreen() {
  const { isSignedIn, user } = useAuthStore();
  const { isInitialized, isLoading, initError, retryInitialization } = useAppInitialization();

  // Debug logging
  React.useEffect(() => {
    console.log('🔍 Index Screen - Auth State:', {
      isSignedIn,
      hasUser: !!user,
      userEmail: user?.email,
      isInitialized,
      isLoading
    });
  }, [isSignedIn, user, isInitialized, isLoading]);

  // Show error screen if initialization failed
  if (initError) {
    console.log('❌ Showing error screen:', initError);
    return (
      <ErrorScreen
        error={initError}
        onRetry={retryInitialization}
      />
    );
  }

  // Show auth screens if not signed in (even during loading)
  if (!isSignedIn) {
    console.log('🔐 User not signed in - showing auth screens');
    return <AuthContainer />;
  }

  // Show loading screen only for signed-in users during initialization
  if (!isInitialized || isLoading) {
    console.log('⏳ Showing loading screen for signed-in user');
    return <LoadingScreen message="Loading your data..." />;
  }

  // User is authenticated and data is loaded, redirect to main app
  console.log('✅ User authenticated - redirecting to mining');
  return <Redirect href="/mining" />;
}
