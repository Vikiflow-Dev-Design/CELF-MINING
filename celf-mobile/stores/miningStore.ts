/**
 * Mining Store - Zustand
 * Manages mining state and integrates with miningService
 */

import { create } from 'zustand';
import { miningService } from '@/services/miningService';
import { apiService } from '@/services/apiService';

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
  countdown: string;
  tokensPerSecond: number;
  isLoading: boolean;

  // Mining history
  sessions: MiningSession[];
  totalLifetimeEarnings: number;
  totalMiningTime: number; // in milliseconds

  // Statistics
  dailyEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;

  // Actions
  startMining: () => Promise<void>;
  stopMining: () => Promise<void>;
  pauseMining: () => Promise<void>;
  resumeMining: () => Promise<void>;
  refreshMiningStatus: () => Promise<void>;
  updateBalance: (balance: number) => void;
  updateEarnings: (earnings: number) => void;
  updateRuntime: (runtime: string) => void;
  updateCountdown: (countdown: string) => void;
  updateMiningState: (isMining: boolean) => void;
  addSession: (session: MiningSession) => void;
  updateMiningRate: (rate: number) => void;
  resetBalance: (balance?: number) => void;
  calculateStatistics: () => void;
}

export const useMiningStore = create<MiningState>((set, get) => ({
  // Initial state (in-memory only)
  isMining: false,
  currentBalance: 0, // Will be synced from wallet store
  totalEarned: 0,
  miningRate: 0.125,
  runtime: '0h 0m 0s',
  countdown: '24h 0m 0s',
  tokensPerSecond: 0.125 / 3600,
  isLoading: false,

  // Session data (will be saved to database later)
  sessions: [],
  totalLifetimeEarnings: 0,
  totalMiningTime: 0,

  // Statistics
  dailyEarnings: 0,
  weeklyEarnings: 0,
  monthlyEarnings: 0,

      // Actions
      startMining: async () => {
        const state = get();
        if (!state.isMining) {
          try {
            set({ isLoading: true });
            await miningService.startMining();
            set({ isMining: true, isLoading: false });
          } catch (error) {
            console.error('Failed to start mining:', error);
            set({ isLoading: false });
            throw error;
          }
        }
      },

      stopMining: async () => {
        const state = get();
        if (state.isMining) {
          try {
            set({ isLoading: true });

            // Create session record before stopping
            const session: MiningSession = {
              id: Date.now().toString(),
              startTime: Date.now() - (state.totalEarned / state.tokensPerSecond * 1000),
              endTime: Date.now(),
              totalEarned: state.totalEarned,
              duration: state.totalEarned / state.tokensPerSecond * 1000,
              miningRate: state.miningRate,
            };

            // Stop mining on backend
            await miningService.stopMining();

            set((state) => ({
              isMining: false,
              isLoading: false,
              sessions: [...state.sessions, session],
              totalLifetimeEarnings: state.totalLifetimeEarnings + state.totalEarned,
              totalMiningTime: state.totalMiningTime + session.duration,
              totalEarned: 0, // Reset for next session
            }));

            // Recalculate statistics
            get().calculateStatistics();
          } catch (error) {
            console.error('Failed to stop mining:', error);
            set({ isLoading: false });
            throw error;
          }
        }
      },

      updateBalance: (balance: number) => {
        // Balance is now managed by wallet store, this is for compatibility
        set({ currentBalance: balance });
      },

      updateEarnings: (earnings: number) => {
        set({ totalEarned: earnings });
      },

      updateRuntime: (runtime: string) => {
        set({ runtime });
      },

      updateCountdown: (countdown: string) => {
        set({ countdown });
      },

      updateMiningState: (isMining: boolean) => {
        set({ isMining });
      },

      addSession: (session: MiningSession) => {
        set((state) => ({
          sessions: [...state.sessions, session],
          totalLifetimeEarnings: state.totalLifetimeEarnings + session.totalEarned,
          totalMiningTime: state.totalMiningTime + session.duration,
        }));
        get().calculateStatistics();
      },

      updateMiningRate: (rate: number) => {
        set({
          miningRate: rate,
          tokensPerSecond: rate / 3600,
        });
        miningService.updateMiningRate(rate);
      },

      refreshMiningStatus: async () => {
        try {
          console.log('Mining Store: Refreshing mining status...');
          // This will check for existing sessions and restore state
          await get().initializeWithSession();
        } catch (error) {
          console.error('Mining Store: Failed to refresh mining status:', error);
        }
      },

      resetBalance: (balance = 24.3564) => {
        set({
          currentBalance: balance,
          totalEarned: 0,
        });
      },

      // Initialize mining store with existing session data
      initializeWithSession: async () => {
        try {
          console.log('Mining Store: Initializing with existing session...');
          set({ isLoading: true });

          // Fetch current admin mining rate first
          await miningService.fetchCurrentMiningRate();

          // Check for existing session
          await miningService.checkExistingSession();
          const miningState = miningService.getState();

          console.log('Mining Store: State from service:', miningState);

          // Update store with restored session data
          set({
            isMining: miningState.isMining,
            totalEarned: miningState.totalEarned,
            runtime: miningState.runtime,
            countdown: miningState.countdown,
            miningRate: miningState.miningRate,
            tokensPerSecond: miningState.tokensPerSecond,
            isLoading: false,
          });

          console.log('Mining Store: Initialized successfully:', {
            isMining: miningState.isMining,
            totalEarned: miningState.totalEarned,
            runtime: miningState.runtime
          });
        } catch (error) {
          console.error('Mining Store: Failed to initialize:', error);
          set({
            isLoading: false,
            // Set safe default values on error
            isMining: false,
            totalEarned: 0,
            runtime: '0h 0m 0s',
            countdown: '24h 0m 0s',
            miningRate: 0.125,
            tokensPerSecond: 0.125 / 3600,
          });

          // Don't throw the error, just log it
          console.warn('Mining Store: Continuing with default values due to initialization error');
        }
      },

      calculateStatistics: () => {
        const state = get();
        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
        const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

        const dailyEarnings = state.sessions
          .filter(session => session.startTime >= oneDayAgo)
          .reduce((total, session) => total + session.totalEarned, 0);

        const weeklyEarnings = state.sessions
          .filter(session => session.startTime >= oneWeekAgo)
          .reduce((total, session) => total + session.totalEarned, 0);

        const monthlyEarnings = state.sessions
          .filter(session => session.startTime >= oneMonthAgo)
          .reduce((total, session) => total + session.totalEarned, 0);

        set({
          dailyEarnings,
          weeklyEarnings,
          monthlyEarnings,
        });
      },
    }));
