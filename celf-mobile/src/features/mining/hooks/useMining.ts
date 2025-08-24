/**
 * Mining Hook
 * Custom hook for mining functionality
 */

import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useMiningStore } from '@/stores/miningStore';
import { useWalletStore } from '@/stores/walletStore';
import { miningService } from '@/services/miningService';
import { socialHandlers, calculateTokensPerSecond } from '../utils';
import {
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

export const useMining = () => {
  // Mining state from Zustand store
  const {
    isMining,
    totalEarned,
    runtime,
    countdown,
    miningRate,
    startMining,
    stopMining,
    updateBalance,
    updateEarnings,
    updateRuntime,
    updateCountdown,
    updateMiningState,
  } = useMiningStore();

  // Wallet state for unified balance
  const { totalBalance } = useWalletStore();

  // Convert countdown string to seconds for MiningButton component
  const timeRemaining = React.useMemo(() => {
    if (!countdown || countdown === '0h 0m 0s') return 0;

    // Parse countdown string "Xh Ym Zs" to seconds
    const match = countdown.match(/(\d+)h (\d+)m (\d+)s/);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const seconds = parseInt(match[3], 10);

      // Check for NaN values
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        console.warn('Mining Hook: Invalid countdown values:', { countdown, hours, minutes, seconds });
        return 0;
      }

      return hours * 3600 + minutes * 60 + seconds;
    }

    console.warn('Mining Hook: Could not parse countdown:', countdown);
    return 0;
  }, [countdown]);

  // Animation values
  const miningButtonScale = useSharedValue(1);
  const timerOpacity = useSharedValue(0);
  const timerScale = useSharedValue(0.8);
  const statusIndicatorOpacity = useSharedValue(1);

  // Initialize miningService callbacks and check for existing session
  useEffect(() => {
    miningService.setCallbacks({
      onEarningsUpdate: updateEarnings,
      onRuntimeUpdate: updateRuntime,
      onCountdownUpdate: updateCountdown,
      onMiningStateChange: updateMiningState,
    });

    // Check for existing mining session on app startup
    const initializeMining = async () => {
      try {
        console.log('useMining: Initializing mining on component mount...');

        // Initialize wallet and mining together
        // This will restore any active session from backend and sync wallet balance
        await useMiningStore.getState().initializeWithSession();

        console.log('useMining: Mining initialization complete');
      } catch (error) {
        console.error('useMining: Failed to initialize mining:', error);
      }
    };

    initializeMining();

    // Cleanup on unmount
    return () => {
      miningService.cleanup();
    };
  }, [updateEarnings, updateRuntime, updateCountdown, updateMiningState]);

  // Handle mining state changes and animations
  useEffect(() => {
    if (isMining) {
      // Start zoom in/out animation for the mining button
      miningButtonScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1500 }),
          withTiming(1, { duration: 1500 })
        ),
        -1,
        false
      );

      // Animate timer appearance
      timerOpacity.value = withTiming(1, { duration: 500 });
      timerScale.value = withTiming(1, { duration: 500 });

      // Start status indicator pulsing animation
      statusIndicatorOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0.5, { duration: 1000 })
        ),
        -1,
        false
      );

      // Mining is now handled by the service with backend sync
      // No need for local countdown timer - using backend-synced countdown
    } else {
      miningButtonScale.value = withTiming(1);
      timerOpacity.value = withTiming(0, { duration: 300 });
      timerScale.value = withTiming(0.8, { duration: 300 });
      statusIndicatorOpacity.value = withTiming(1, { duration: 300 });
      miningService.stopMining();
    }
  }, [isMining, miningRate]);

  // Handle mining toggle
  const handleMiningToggle = async () => {
    // Only allow starting mining, not stopping it
    if (!isMining) {
      try {
        await startMining();
      } catch (error) {
        console.error('Failed to start mining:', error);
        // TODO: Show error message to user
      }
    }
  };

  // Navigation handlers
  const handleSettingsPress = () => {
    router.push('/profile');
  };

  const handleQuickActionPress = (route: string) => {
    router.push(route as any);
  };

  // Refresh mining data
  const refreshMiningData = async () => {
    try {
      console.log('useMining: Refreshing mining data...');
      // Refresh mining status from the store
      await useMiningStore.getState().refreshMiningStatus();
      console.log('useMining: Mining data refreshed successfully');
    } catch (error) {
      console.error('useMining: Failed to refresh mining data:', error);
    }
  };

  // Calculate derived values
  const tokensPerSecond = calculateTokensPerSecond(miningRate);

  return {
    // State
    isMining,
    totalBalance,
    totalEarned,
    runtime,
    countdown,
    miningRate,
    timeRemaining,
    tokensPerSecond,

    // Animation values
    miningButtonScale,
    timerOpacity,
    timerScale,
    statusIndicatorOpacity,

    // Handlers
    handleMiningToggle,
    handleSettingsPress,
    handleQuickActionPress,
    refreshMiningData,
    ...socialHandlers,
  };
};
