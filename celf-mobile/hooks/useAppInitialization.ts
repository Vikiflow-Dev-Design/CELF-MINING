/**
 * App Initialization Hook
 * Handles authentication check and data loading on app start
 */

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useWalletStore } from '@/stores/walletStore';
import { useMiningStore } from '@/stores/miningStore';

export const useAppInitialization = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  const { checkAuthStatus, isSignedIn, isLoading: authLoading } = useAuthStore();
  const { refreshBalance } = useWalletStore();
  const { refreshMiningStatus } = useMiningStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setInitError(null);

      // Step 1: Check authentication status
      console.log('🔐 Checking authentication status...');
      await checkAuthStatus();

      // Step 2: If user is signed in, load their data
      const authState = useAuthStore.getState();
      if (authState.isSignedIn) {
        console.log('👤 User is signed in, loading data...');

        // Load wallet balance
        console.log('💰 Loading wallet balance...');
        try {
          await refreshBalance();
          console.log('✅ App Init: Wallet balance loaded successfully');
        } catch (error) {
          console.error('❌ App Init: Failed to load wallet balance:', error);
        }

        // Initialize mining store with backend sync (only on app launch)
        console.log('⛏️ Initializing mining store with backend sync...');
        const { useMiningStore } = await import('@/stores/miningStore');
        await useMiningStore.getState().initializeWithSession();

        console.log('✅ App initialization complete');
      } else {
        console.log('🚪 User not signed in, skipping data load');
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('❌ App initialization failed:', error);
      setInitError(error instanceof Error ? error.message : 'Initialization failed');
      setIsInitialized(true); // Still mark as initialized to show the app
    }
  };

  const retryInitialization = () => {
    setIsInitialized(false);
    initializeApp();
  };

  return {
    isInitialized,
    initError,
    retryInitialization,
    isLoading: authLoading || !isInitialized,
  };
};
