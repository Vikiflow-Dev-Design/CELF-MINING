/**
 * Mining Hook
 * Custom hook for mining functionality
 */

import { useState, useEffect } from 'react';
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
    miningRate,
    startMining,
    stopMining,
    updateBalance,
    updateEarnings,
    updateRuntime,
    updateMiningState,
  } = useMiningStore();

  // Wallet state for unified balance
  const { totalBalance } = useWalletStore();

  // Timer countdown state
  const [timeRemaining, setTimeRemaining] = useState(1 * 60 * 60); // 1 hour in seconds

  // Animation values
  const miningButtonScale = useSharedValue(1);
  const timerOpacity = useSharedValue(0);
  const timerScale = useSharedValue(0.8);
  const statusIndicatorOpacity = useSharedValue(1);

  // Initialize miningService callbacks
  useEffect(() => {
    miningService.setCallbacks({
      onEarningsUpdate: updateEarnings,
      onRuntimeUpdate: updateRuntime,
      onMiningStateChange: updateMiningState,
    });

    // Cleanup on unmount
    return () => {
      miningService.cleanup();
    };
  }, [updateEarnings, updateRuntime, updateMiningState]);

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

      // Start mining using the service
      miningService.startMining();

      // Countdown timer for session duration
      const countdownTimer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            miningService.stopMining();
            return 1 * 60 * 60; // Reset to 1 hour
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(countdownTimer);
      };
    } else {
      miningButtonScale.value = withTiming(1);
      timerOpacity.value = withTiming(0, { duration: 300 });
      timerScale.value = withTiming(0.8, { duration: 300 });
      statusIndicatorOpacity.value = withTiming(1, { duration: 300 });
      miningService.stopMining();
    }
  }, [isMining, miningRate]);

  // Handle mining toggle
  const handleMiningToggle = () => {
    // Only allow starting mining, not stopping it
    if (!isMining) {
      startMining();
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
    // In a real app, this would fetch fresh data from the server
    // For now, we'll simulate a refresh
    return new Promise<void>(resolve => setTimeout(resolve, 1500));
  };

  // Calculate derived values
  const tokensPerSecond = calculateTokensPerSecond(miningRate);

  return {
    // State
    isMining,
    totalBalance,
    totalEarned,
    runtime,
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
