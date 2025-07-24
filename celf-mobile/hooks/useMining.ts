/**
 * React Hook for Mining Functionality
 * Provides easy integration with the MiningService for React components
 * Based on the mining-rate-example.html implementation
 */

import { useState, useEffect, useCallback } from 'react';
import { miningService, MiningState } from '@/services/miningService';

export interface UseMiningReturn {
  // State
  isMining: boolean;
  currentBalance: number;
  totalEarned: number;
  miningRate: number;
  runtime: string;
  tokensPerSecond: string;
  
  // Formatted values
  formattedBalance: string;
  formattedEarnings: string;
  
  // Actions
  startMining: () => void;
  stopMining: () => void;
  resetBalance: (initialBalance?: number) => void;
  updateMiningRate: (newRate: number) => void;
}

/**
 * Custom hook for mining functionality
 * Integrates with the MiningService and provides reactive state updates
 */
export const useMining = (initialBalance?: number, initialMiningRate?: number): UseMiningReturn => {
  // Initialize mining service if custom values provided
  useEffect(() => {
    if (initialBalance !== undefined) {
      miningService.resetBalance(initialBalance);
    }
    if (initialMiningRate !== undefined) {
      miningService.updateMiningRate(initialMiningRate);
    }
  }, [initialBalance, initialMiningRate]);

  // Local state that mirrors mining service state
  const [miningState, setMiningState] = useState<MiningState>(() => miningService.getState());

  // Update local state when mining service state changes
  useEffect(() => {
    const updateState = () => {
      setMiningState(miningService.getState());
    };

    // Set up callbacks for real-time updates
    miningService.setCallbacks({
      onBalanceUpdate: (balance: number) => {
        setMiningState(prev => ({ ...prev, currentBalance: balance }));
      },
      onEarningsUpdate: (earnings: number) => {
        setMiningState(prev => ({ ...prev, totalEarned: earnings }));
      },
      onRuntimeUpdate: (runtime: string) => {
        setMiningState(prev => ({ ...prev, runtime }));
      },
      onMiningStateChange: (isMining: boolean) => {
        setMiningState(prev => ({ ...prev, isMining }));
      },
    });

    // Initial state sync
    updateState();

    // Cleanup on unmount
    return () => {
      miningService.cleanup();
    };
  }, []);

  // Action handlers
  const startMining = useCallback(() => {
    miningService.startMining();
  }, []);

  const stopMining = useCallback(() => {
    miningService.stopMining();
  }, []);

  const resetBalance = useCallback((initialBalance?: number) => {
    miningService.resetBalance(initialBalance);
  }, []);

  const updateMiningRate = useCallback((newRate: number) => {
    miningService.updateMiningRate(newRate);
    setMiningState(prev => ({ 
      ...prev, 
      miningRate: newRate,
      tokensPerSecond: newRate / 3600
    }));
  }, []);

  return {
    // State
    isMining: miningState.isMining,
    currentBalance: miningState.currentBalance,
    totalEarned: miningState.totalEarned,
    miningRate: miningState.miningRate,
    runtime: miningState.runtime,
    tokensPerSecond: miningService.getTokensPerSecond(),
    
    // Formatted values
    formattedBalance: miningService.formatBalance(miningState.currentBalance),
    formattedEarnings: miningService.formatBalance(miningState.totalEarned),
    
    // Actions
    startMining,
    stopMining,
    resetBalance,
    updateMiningRate,
  };
};

/**
 * Hook for mining statistics and calculations
 */
export const useMiningStats = () => {
  const [miningRate, setMiningRate] = useState(miningService.getMiningRate());

  const calculateEstimatedEarnings = useCallback((rate: number) => {
    return {
      perHour: rate,
      perDay: Number((rate * 24).toFixed(4)),
      perWeek: Number((rate * 24 * 7).toFixed(4)),
      perMonth: Number((rate * 24 * 30).toFixed(4)),
    };
  }, []);

  const getTokensPerSecond = useCallback(() => {
    return (miningRate / 3600).toFixed(6);
  }, [miningRate]);

  const updateRate = useCallback((newRate: number) => {
    setMiningRate(newRate);
    miningService.updateMiningRate(newRate);
  }, []);

  return {
    miningRate,
    tokensPerSecond: getTokensPerSecond(),
    estimatedEarnings: calculateEstimatedEarnings(miningRate),
    updateMiningRate: updateRate,
  };
};

/**
 * Hook for mining session management
 */
export const useMiningSession = () => {
  const [sessionData, setSessionData] = useState({
    sessionStartTime: null as number | null,
    sessionDuration: 0,
    sessionEarnings: 0,
    isActive: false,
  });

  const startSession = useCallback(() => {
    const startTime = Date.now();
    setSessionData({
      sessionStartTime: startTime,
      sessionDuration: 0,
      sessionEarnings: 0,
      isActive: true,
    });
    miningService.startMining();
  }, []);

  const endSession = useCallback(() => {
    const state = miningService.getState();
    setSessionData(prev => ({
      ...prev,
      sessionDuration: prev.sessionStartTime ? Date.now() - prev.sessionStartTime : 0,
      sessionEarnings: state.totalEarned,
      isActive: false,
    }));
    miningService.stopMining();
  }, []);

  const getSessionSummary = useCallback(() => {
    return {
      duration: sessionData.sessionDuration,
      earnings: sessionData.sessionEarnings,
      formattedDuration: sessionData.sessionDuration > 0 
        ? `${Math.floor(sessionData.sessionDuration / 60000)}m ${Math.floor((sessionData.sessionDuration % 60000) / 1000)}s`
        : '0m 0s',
      formattedEarnings: miningService.formatBalance(sessionData.sessionEarnings),
    };
  }, [sessionData]);

  return {
    sessionData,
    startSession,
    endSession,
    getSessionSummary,
    isSessionActive: sessionData.isActive,
  };
};
