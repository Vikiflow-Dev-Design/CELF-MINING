/**
 * Mining Store - SecureStore Only Version
 * Uses only Expo SecureStore for all data (no AsyncStorage dependency)
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureOnlyStorage } from '@/utils/storage';
import { miningService } from '@/services/miningService';

export interface MiningSession {
  id: string;
  startTime: number;
  endTime?: number;
  totalEarned: number;
  duration: number; // in milliseconds
  miningRate: number;
}

interface MiningState {
  // Current mining state
  isMining: boolean;
  currentBalance: number;
  totalEarned: number;
  miningRate: number;
  runtime: string;
  tokensPerSecond: number;
  
  // Mining history (limited due to SecureStore size constraints)
  recentSessions: MiningSession[]; // Only keep last 10 sessions
  totalLifetimeEarnings: number;
  totalMiningTime: number; // in milliseconds
  
  // Statistics
  dailyEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  
  // Actions
  startMining: () => void;
  stopMining: () => void;
  updateBalance: (balance: number) => void;
  updateEarnings: (earnings: number) => void;
  updateRuntime: (runtime: string) => void;
  updateMiningState: (isMining: boolean) => void;
  addSession: (session: MiningSession) => void;
  updateMiningRate: (rate: number) => void;
  resetBalance: (balance?: number) => void;
  calculateStatistics: () => void;
}

export const useMiningStore = create<MiningState>()(
  persist(
    (set, get) => ({
      // Initial state
      isMining: false,
      currentBalance: 24.3564,
      totalEarned: 0,
      miningRate: 0.125,
      runtime: '0h 0m 0s',
      tokensPerSecond: 0.125 / 3600,
      
      // History (limited for SecureStore)
      recentSessions: [],
      totalLifetimeEarnings: 0,
      totalMiningTime: 0,
      
      // Statistics
      dailyEarnings: 0,
      weeklyEarnings: 0,
      monthlyEarnings: 0,

      // Actions
      startMining: () => {
        const state = get();
        if (!state.isMining) {
          miningService.startMining();
          set({ isMining: true });
        }
      },

      stopMining: () => {
        const state = get();
        if (state.isMining) {
          // Create session record
          const session: MiningSession = {
            id: Date.now().toString(),
            startTime: Date.now() - (state.totalEarned / state.tokensPerSecond * 1000),
            endTime: Date.now(),
            totalEarned: state.totalEarned,
            duration: state.totalEarned / state.tokensPerSecond * 1000,
            miningRate: state.miningRate,
          };

          miningService.stopMining();
          
          set((state) => {
            // Keep only last 10 sessions to avoid SecureStore size limits
            const updatedSessions = [session, ...state.recentSessions].slice(0, 10);
            
            return {
              isMining: false,
              recentSessions: updatedSessions,
              totalLifetimeEarnings: state.totalLifetimeEarnings + state.totalEarned,
              totalMiningTime: state.totalMiningTime + session.duration,
            };
          });

          // Recalculate statistics
          get().calculateStatistics();
        }
      },

      updateBalance: (balance: number) => {
        set({ currentBalance: balance });
      },

      updateEarnings: (earnings: number) => {
        set({ totalEarned: earnings });
      },

      updateRuntime: (runtime: string) => {
        set({ runtime });
      },

      updateMiningState: (isMining: boolean) => {
        set({ isMining });
      },

      addSession: (session: MiningSession) => {
        set((state) => {
          // Keep only last 10 sessions
          const updatedSessions = [session, ...state.recentSessions].slice(0, 10);
          
          return {
            recentSessions: updatedSessions,
            totalLifetimeEarnings: state.totalLifetimeEarnings + session.totalEarned,
            totalMiningTime: state.totalMiningTime + session.duration,
          };
        });
        get().calculateStatistics();
      },

      updateMiningRate: (rate: number) => {
        set({
          miningRate: rate,
          tokensPerSecond: rate / 3600,
        });
        miningService.updateMiningRate(rate);
      },

      resetBalance: (balance = 24.3564) => {
        set({
          currentBalance: balance,
          totalEarned: 0,
        });
      },

      calculateStatistics: () => {
        const state = get();
        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
        const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

        const dailyEarnings = state.recentSessions
          .filter(session => session.startTime >= oneDayAgo)
          .reduce((total, session) => total + session.totalEarned, 0);

        const weeklyEarnings = state.recentSessions
          .filter(session => session.startTime >= oneWeekAgo)
          .reduce((total, session) => total + session.totalEarned, 0);

        const monthlyEarnings = state.recentSessions
          .filter(session => session.startTime >= oneMonthAgo)
          .reduce((total, session) => total + session.totalEarned, 0);

        set({
          dailyEarnings,
          weeklyEarnings,
          monthlyEarnings,
        });
      },
    }),
    {
      name: 'celf-mining-storage',
      storage: createJSONStorage(() => secureOnlyStorage),
      // Persist everything except current mining state
      partialize: (state) => ({
        currentBalance: state.currentBalance,
        recentSessions: state.recentSessions, // Limited to 10 sessions
        totalLifetimeEarnings: state.totalLifetimeEarnings,
        totalMiningTime: state.totalMiningTime,
        miningRate: state.miningRate,
        dailyEarnings: state.dailyEarnings,
        weeklyEarnings: state.weeklyEarnings,
        monthlyEarnings: state.monthlyEarnings,
      }),
    }
  )
);
