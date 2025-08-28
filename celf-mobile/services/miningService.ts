/**
 * Mining Service - Mobile App Version with Backend Integration
 * Features:
 * - 24-hour mining sessions
 * - Server-side authoritative calculations
 * - Local UI updates for smooth experience
 * - Backend sync at session completion
 */

import { useWalletStore } from '@/stores/walletStore';
import { apiService } from './apiService';

export interface MiningState {
  isMining: boolean;
  totalEarned: number;
  miningRatePerSecond: number; // CELF per second (new system)
  miningIntervalMs: number; // Mining interval in milliseconds (new system)
  startTime: number | null;
  runtime: string;
  countdown: string; // Time remaining until session ends
  sessionId: string | null;
  maxDurationMs: number;
  remainingTimeMs: number;
  serverTime: number | null;

  // Backward compatibility fields (calculated from new fields)
  miningRate?: number; // CELF per hour (for backward compatibility)
  tokensPerSecond?: number; // CELF per second (for backward compatibility)
}

export interface MiningCallbacks {
  onEarningsUpdate: (earnings: number) => void;
  onRuntimeUpdate: (runtime: string) => void;
  onCountdownUpdate: (countdown: string) => void;
  onMiningStateChange: (isMining: boolean) => void;
}

export class MiningService {
  private state: MiningState;
  private callbacks: MiningCallbacks;
  private updateTimer: NodeJS.Timeout | null = null;
  private sessionEndTimer: NodeJS.Timeout | null = null;
  private lastUpdateTime: number = 0;

  constructor() {
    this.state = {
      isMining: false,
      totalEarned: 0,
      miningRatePerSecond: 0.000278, // Default: 1 CELF/hour
      miningIntervalMs: 1000, // Default: 1 second
      startTime: null,
      runtime: '0h 0m 0s',
      countdown: '24h 0m 0s',
      sessionId: null,
      maxDurationMs: 24 * 60 * 60 * 1000, // 24 hours
      remainingTimeMs: 24 * 60 * 60 * 1000,
      serverTime: null,
    };

    // Initialize callbacks with empty functions
    this.callbacks = {
      onEarningsUpdate: () => {},
      onRuntimeUpdate: () => {},
      onCountdownUpdate: () => {},
      onMiningStateChange: () => {},
    };

    console.log('🔧 Mining service initialized with default state:', {
      miningRatePerSecond: this.state.miningRatePerSecond,
      miningIntervalMs: this.state.miningIntervalMs,
      maxDurationMs: this.state.maxDurationMs
    });

    // Don't fetch mining rate on initialization - wait for user authentication
    // this.fetchCurrentMiningRate();
  }

  /**
   * Fetch current mining rate from admin settings
   * Only call this after user is authenticated
   */
  async fetchCurrentMiningRate(): Promise<void> {
    try {
      console.log('Fetching current mining rate from admin settings...');
      const response = await apiService.getMiningRate();

      if (response.success && response.data?.rate) {
        const rateData = response.data.rate;

        // Handle both old and new response formats for backward compatibility
        let miningRatePerSecond, miningIntervalMs, maxSessionTime, maintenanceMode;

        if (rateData.miningRatePerSecond !== undefined) {
          // New format
          miningRatePerSecond = rateData.miningRatePerSecond;
          miningIntervalMs = rateData.miningIntervalMs || 1000;
          maxSessionTime = rateData.maxSessionTime;
          maintenanceMode = rateData.maintenanceMode;
        } else {
          // Old format fallback (convert hourly rate to per-second)
          const hourlyRate = rateData.currentRate || 1.0;
          miningRatePerSecond = hourlyRate / 3600;
          miningIntervalMs = 1000;
          maxSessionTime = rateData.maxSessionTime;
          maintenanceMode = rateData.maintenanceMode;
        }

        // Update mining configuration
        this.state.miningRatePerSecond = miningRatePerSecond;
        this.state.miningIntervalMs = miningIntervalMs;
        this.state.maxDurationMs = maxSessionTime * 1000; // Convert seconds to ms
        this.state.remainingTimeMs = maxSessionTime * 1000;

        // Update countdown display
        this.state.countdown = this.formatRuntime(maxSessionTime * 1000);

        console.log('Mining rate updated from admin settings:', {
          miningRatePerSecond: miningRatePerSecond,
          miningIntervalMs: miningIntervalMs,
          calculatedHourlyRate: miningRatePerSecond * 3600,
          maxSessionTime: maxSessionTime,
          maintenanceMode: maintenanceMode
        });

        // Check if mining is in maintenance mode
        if (maintenanceMode && this.state.isMining) {
          console.warn('Mining is in maintenance mode, stopping current session');
          await this.stopMining();
        }

        // Notify callbacks of the update
        this.callbacks.onMiningStateChange(this.state);
      }
    } catch (error) {
      console.error('Failed to fetch mining rate from admin settings:', error);

      // Handle authentication errors gracefully
      if (error instanceof Error && error.message.includes('Authentication')) {
        console.log('User not authenticated, using default mining rate');
        return;
      }

      // Continue with default rate if admin settings are unavailable
      console.log('Using default mining rate due to connection issues');
    }
  }

  /**
   * Set callbacks for mining state updates
   */
  setCallbacks(callbacks: Partial<MiningCallbacks>) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  /**
   * Start mining session - Now integrates with backend and wallet
   */
  async startMining(): Promise<void> {
    if (this.state.isMining) return;

    try {
      console.log('Starting mining session...');

      // Get current wallet balance before starting mining
      const walletStore = useWalletStore.getState();
      await walletStore.syncBalanceWithBackend();

      // Get device info for backend
      const deviceInfo = {
        platform: 'mobile',
        appVersion: '1.0.0', // TODO: Get from app config
      };

      // Start session on backend (rate is determined by admin settings)
      const response = await apiService.startMining(deviceInfo);
      if (!response.success) {
        throw new Error(response.message || 'Failed to start mining session');
      }

      console.log('🔍 Backend response:', JSON.stringify(response, null, 2));

      const sessionData = response.data.session;

      if (!sessionData) {
        throw new Error('No session data received from backend');
      }

      console.log('📊 Session data received:', {
        sessionId: sessionData.sessionId,
        miningRatePerSecond: sessionData.miningRatePerSecond,
        miningIntervalMs: sessionData.miningIntervalMs,
        maxDurationMs: sessionData.maxDurationMs,
        startedAt: sessionData.startedAt
      });

      // Initialize local state with backend data and fallbacks
      this.state.isMining = true;
      this.state.totalEarned = 0;
      this.state.startTime = sessionData.startedAt ? new Date(sessionData.startedAt).getTime() : Date.now();
      this.state.sessionId = sessionData.sessionId;
      this.state.miningRatePerSecond = sessionData.miningRatePerSecond || 0.000278; // Fallback
      this.state.miningIntervalMs = sessionData.miningIntervalMs || 1000; // Fallback
      this.state.maxDurationMs = sessionData.maxDurationMs || 86400000; // Fallback
      this.state.remainingTimeMs = this.state.maxDurationMs;
      this.state.serverTime = sessionData.serverTime ? new Date(sessionData.serverTime).getTime() : Date.now();

      console.log('✅ Mining session initialized:', {
        sessionId: this.state.sessionId,
        miningRatePerSecond: this.state.miningRatePerSecond,
        miningIntervalMs: this.state.miningIntervalMs,
        maxDurationMs: this.state.maxDurationMs,
        calculatedHourlyRate: (this.state.miningRatePerSecond * 3600).toFixed(4)
      });

      // Initialize wallet for mining session
      walletStore.startMiningSession();

      // Start local UI update timer (every 1 second for estimated progress)
      this.updateTimer = setInterval(() => {
        this.updateLocalProgress();
      }, 1000);

      // Initial estimated earnings calculation
      const initialEarnings = this.calculateEstimatedEarnings();
      console.log('🔍 Initial estimated earnings:', initialEarnings);
      walletStore.updateMiningEarnings(initialEarnings);

      // No real-time backend sync - only sync at session completion
      console.log('📊 Mining session started - showing estimated progress only');
      console.log('💡 Final earnings will be calculated server-side at completion');

      // Set timer for session end (24 hours)
      this.sessionEndTimer = setTimeout(() => {
        this.completeSession();
      }, this.state.maxDurationMs);

      // Notify state change
      this.callbacks.onMiningStateChange(true);
    } catch (error) {
      console.error('Error starting mining session:', error);
      throw error;
    }
  }

  /**
   * Calculate estimated earnings for UI display (not real tokens)
   */
  private calculateEstimatedEarnings(): number {
    if (!this.state.isMining || !this.state.startTime) return 0;

    const now = Date.now();
    const elapsedMs = now - this.state.startTime;
    const cappedElapsedMs = Math.min(elapsedMs, this.state.maxDurationMs || 86400000);

    // Ensure we have valid mining parameters with fallbacks
    const miningRatePerSecond = this.state.miningRatePerSecond || 0.000278; // 1 CELF/hour default
    const miningIntervalMs = this.state.miningIntervalMs || 1000; // 1 second default

    // Calculate estimated earnings based on elapsed time and admin-configured rate
    const completedIntervals = Math.floor(cappedElapsedMs / miningIntervalMs);
    const intervalRate = miningRatePerSecond * (miningIntervalMs / 1000);

    const estimatedEarnings = completedIntervals * intervalRate;

    // Ensure we return a valid number
    return isNaN(estimatedEarnings) ? 0 : estimatedEarnings;
  }

  /**
   * Update local progress for smooth UI (estimated earnings and time updates)
   */
  private updateLocalProgress(): void {
    if (!this.state.isMining || !this.state.startTime) return;

    try {
      const now = Date.now();

      // Update earnings every time since we're now running at 1-second intervals

      const elapsedMs = now - this.state.startTime;
      const maxDuration = this.state.maxDurationMs || 86400000; // 24 hours default

      // Check if session should be completed
      if (elapsedMs >= maxDuration) {
        this.completeSession();
        return;
      }

      // Update estimated earnings for UI display
      const estimatedEarnings = this.calculateEstimatedEarnings();

      // Validate the estimated earnings
      if (isNaN(estimatedEarnings) || estimatedEarnings < 0) {
        console.warn('Invalid estimated earnings calculated:', estimatedEarnings);
        console.warn('Mining state:', {
          miningRatePerSecond: this.state.miningRatePerSecond,
          miningIntervalMs: this.state.miningIntervalMs,
          elapsedMs,
          maxDuration
        });
        return;
      }

      // Only update if the value has actually changed (prevent unnecessary updates)
      const roundedEarnings = parseFloat(estimatedEarnings.toFixed(6));
      const currentRoundedEarnings = parseFloat((this.state.totalEarned || 0).toFixed(6));

      if (roundedEarnings !== currentRoundedEarnings) {
        this.state.totalEarned = estimatedEarnings;
        this.lastUpdateTime = now;

        // Update wallet store with estimated earnings (for display only)
        const walletStore = useWalletStore.getState();
        walletStore.updateMiningEarnings(estimatedEarnings);

        // Update display with estimated earnings
        this.callbacks.onEarningsUpdate(roundedEarnings);
      }

      // Update remaining time
      this.state.remainingTimeMs = Math.max(0, maxDuration - elapsedMs);
    } catch (error) {
      console.error('Error updating local progress:', error);
    }

    // Update runtime and countdown
    this.updateRuntime();
    this.updateCountdown();

    // Check if session should end
    if (this.state.remainingTimeMs <= 0) {
      console.log('Local timer expired, completing session');
      this.completeSession();
    }
  }

  /**
   * Sync with backend to get authoritative session data
   */
  private async syncWithBackend(): Promise<void> {
    if (!this.state.isMining) return;

    try {
      console.log('Syncing with backend for authoritative data...');
      const response = await apiService.getMiningStatus();

      if (response.success && response.data.isActive) {
        const serverData = response.data;

        // Update with server-authoritative data
        if (serverData.tokensEarned !== undefined) {
          this.state.totalEarned = serverData.tokensEarned;
        }

        if (serverData.runtime !== undefined) {
          // Recalculate start time based on server runtime
          const serverRuntimeMs = serverData.runtime * 1000;
          this.state.startTime = Date.now() - serverRuntimeMs;
        }

        // Handle both old and new rate formats
        if (serverData.miningRatePerSecond !== undefined) {
          this.state.miningRatePerSecond = serverData.miningRatePerSecond;
          this.state.miningIntervalMs = serverData.miningIntervalMs || 1000;
        } else if (serverData.currentRate !== undefined) {
          // Fallback for old format
          this.state.miningRatePerSecond = serverData.currentRate / 3600;
          this.state.miningIntervalMs = 1000;
        }

        console.log('Backend sync completed:', {
          tokensEarned: this.state.totalEarned,
          runtime: serverData.runtime,
          currentRate: this.state.miningRate
        });

        // Update wallet with server data
        const walletStore = useWalletStore.getState();
        walletStore.updateMiningEarnings(this.state.totalEarned);

      } else if (response.success && !response.data.isActive) {
        // Server says no active session, stop local mining
        console.log('Server reports no active session, stopping local mining');
        this.stopMining();
      }
    } catch (error) {
      console.error('Failed to sync with backend:', error);
      // Continue with local calculations if sync fails
    }
  }

  /**
   * Update runtime - matches HTML version 9 calculation
   */
  private updateRuntime(): void {
    if (this.state.startTime) {
      const elapsed = Date.now() - this.state.startTime;
      this.state.runtime = this.formatRuntime(elapsed);
      this.callbacks.onRuntimeUpdate(this.state.runtime);
    }
  }

  /**
   * Update countdown timer - shows remaining time until session ends
   * Syncs with backend remainingTimeMs for accuracy
   */
  private updateCountdown(): void {
    if (this.state.isMining && this.state.startTime) {
      // Calculate remaining time based on elapsed time and max duration
      const elapsed = Date.now() - this.state.startTime;
      const remainingMs = Math.max(0, this.state.maxDurationMs - elapsed);

      // Use server remaining time if available and valid
      let finalRemainingMs = remainingMs;
      if (this.state.remainingTimeMs && !isNaN(this.state.remainingTimeMs) && this.state.remainingTimeMs > 0) {
        // Use server time but adjust for local elapsed time
        const serverRemainingMs = this.state.remainingTimeMs;

        // Calculate time drift and apply small correction if needed
        if (this.state.serverTime && !isNaN(this.state.serverTime)) {
          const localElapsed = Date.now() - this.state.startTime;
          const serverElapsed = this.state.maxDurationMs - serverRemainingMs;
          const timeDrift = localElapsed - serverElapsed;

          // Apply small drift correction (max 5 seconds)
          const driftCorrection = Math.max(-5000, Math.min(5000, timeDrift));
          finalRemainingMs = Math.max(0, serverRemainingMs - driftCorrection);
        } else {
          finalRemainingMs = serverRemainingMs;
        }
      }

      // Update remaining time state for session end detection
      this.state.remainingTimeMs = finalRemainingMs;

      // Format and update countdown display
      this.state.countdown = this.formatRuntime(finalRemainingMs);
      this.callbacks.onCountdownUpdate(this.state.countdown);

      // Debug logging (remove in production)
      if (finalRemainingMs <= 0 || isNaN(finalRemainingMs)) {
        console.log('Mining Service: Countdown issue detected:', {
          finalRemainingMs,
          startTime: this.state.startTime,
          maxDurationMs: this.state.maxDurationMs,
          remainingTimeMs: this.state.remainingTimeMs,
          countdown: this.state.countdown
        });
      }
    } else {
      // Not mining or no start time - show full duration
      this.state.countdown = this.formatRuntime(this.state.maxDurationMs);
      this.callbacks.onCountdownUpdate(this.state.countdown);
    }
  }

  /**
   * Complete mining session (called automatically after 24 hours or manually)
   */
  async completeSession(): Promise<void> {
    if (!this.state.isMining || !this.state.sessionId) return;

    try {
      console.log('Completing mining session:', this.state.sessionId);

      // Prepare client data for validation
      const clientData = {
        reportedEarnings: this.state.totalEarned,
        sessionDuration: this.state.startTime ? Date.now() - this.state.startTime : 0,
      };

      // Complete session on backend
      const response = await apiService.stopMining();
      if (!response.success) {
        console.error('Failed to complete session on backend:', response.message);
        // Continue with local cleanup even if backend fails
      } else {
        console.log('Session completed successfully:', response.data);

        // Update wallet with server-authoritative final balance
        const walletStore = useWalletStore.getState();
        if (response.data.session?.newWalletBalance) {
          const finalBalance = response.data.session.newWalletBalance.total ||
                              response.data.session.newWalletBalance.totalBalance ||
                              response.data.session.newWalletBalance;

          console.log('Updating wallet with final balance:', finalBalance);
          walletStore.endMiningSession(finalBalance);
        }
      }

      // Clean up local state
      this.cleanupSession();

    } catch (error) {
      console.error('Error completing mining session:', error);
      // Clean up local state even if backend sync fails
      this.cleanupSession();
      throw error;
    }
  }

  /**
   * Stop mining session manually (user initiated)
   */
  async stopMining(): Promise<void> {
    if (!this.state.isMining) return;

    console.log('User stopped mining session');
    await this.completeSession();
  }

  /**
   * Clean up local mining state
   */
  private cleanupSession(): void {
    console.log('Cleaning up mining session');

    this.state.isMining = false;
    this.state.startTime = null;
    this.state.sessionId = null;
    this.state.totalEarned = 0;
    this.state.runtime = '0h 0m 0s';
    this.state.countdown = '24h 0m 0s';
    this.state.remainingTimeMs = this.state.maxDurationMs;

    // Clear timers
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }

    if (this.sessionEndTimer) {
      clearTimeout(this.sessionEndTimer);
      this.sessionEndTimer = null;
    }

    // Notify state change
    this.callbacks.onMiningStateChange(false);
    this.callbacks.onRuntimeUpdate(this.state.runtime);
    this.callbacks.onCountdownUpdate(this.state.countdown);
  }

  /**
   * Check for existing mining session on app startup
   */
  async checkExistingSession(): Promise<void> {
    try {
      console.log('Checking for existing mining session...');

      // First, sync wallet balance with backend
      const walletStore = useWalletStore.getState();
      await walletStore.syncBalanceWithBackend();

      const response = await apiService.getMiningStatus();
      console.log('Mining status response:', response);

      if (response.success && response.data.isActive) {
        const sessionData = response.data;

        console.log('Found active session, restoring:', sessionData);

        // Calculate start time from server data (more accurate)
        let startTime: number;
        if (sessionData.runtime && sessionData.runtime > 0) {
          // Use server runtime to calculate accurate start time
          const serverRuntimeMs = sessionData.runtime * 1000; // Convert seconds to ms
          startTime = Date.now() - serverRuntimeMs;
        } else {
          // Fallback to current time if no runtime data
          startTime = Date.now();
        }

        // Restore session state with server-authoritative data (but don't set isMining yet)
        this.state.sessionId = sessionData.sessionId || null;
        this.state.startTime = startTime;
        this.state.miningRatePerSecond = sessionData.miningRatePerSecond || 0.000278;
        this.state.miningIntervalMs = sessionData.miningIntervalMs || 1000;
        this.state.totalEarned = sessionData.tokensEarned || 0;
        this.state.serverTime = new Date(sessionData.serverTime || Date.now()).getTime();

        // Set max duration from server or use default
        this.state.maxDurationMs = sessionData.maxDurationMs || (24 * 60 * 60 * 1000);

        // Calculate remaining time more accurately
        if (sessionData.runtime && sessionData.maxDurationMs) {
          const elapsedMs = sessionData.runtime * 1000;
          this.state.remainingTimeMs = Math.max(0, sessionData.maxDurationMs - elapsedMs);
        } else {
          // Fallback calculation
          const elapsed = Date.now() - startTime;
          this.state.remainingTimeMs = Math.max(0, this.state.maxDurationMs - elapsed);
        }

        console.log('Session restored:', {
          sessionId: this.state.sessionId,
          startTime: new Date(this.state.startTime),
          totalEarned: this.state.totalEarned,
          remainingTimeMs: this.state.remainingTimeMs
        });

        // Initialize wallet for restored mining session
        walletStore.startMiningSession();

        // Calculate current estimated earnings
        const estimatedEarnings = this.calculateEstimatedEarnings();
        this.state.totalEarned = estimatedEarnings;
        walletStore.updateMiningEarnings(estimatedEarnings);

        // Start local UI updates (estimated progress only)
        this.updateTimer = setInterval(() => {
          this.updateLocalProgress();
        }, 1000);

        console.log('📊 Mining session restored - showing estimated progress');
        console.log(`💰 Current estimated earnings: ${estimatedEarnings.toFixed(6)} CELF`);

        // Set timer for remaining session time
        if (this.state.remainingTimeMs > 0) {
          this.sessionEndTimer = setTimeout(() => {
            console.log('Session timer expired, completing session');
            this.completeSession();
          }, this.state.remainingTimeMs);

          // Only set mining to true if session is still valid
          this.state.isMining = true;

          // Notify state change
          this.callbacks.onMiningStateChange(true);
        } else {
          // Session should have ended, complete it
          console.log('Session already expired, completing now');
          this.completeSession();
          // Don't set isMining to true for expired sessions
        }

        // Update runtime and countdown display immediately
        this.updateRuntime();
        this.updateCountdown();
      } else {
        console.log('No active mining session found');
        // Make sure wallet is initialized with current balance
        walletStore.initializeMiningBalance(walletStore.miningIntegration.baseBalance);
      }
    } catch (error) {
      console.error('Mining Service: Error checking existing session:', error);

      try {
        // Set wallet sync error for user feedback
        const walletStore = useWalletStore.getState();
        if (walletStore && walletStore.miningIntegration) {
          // Just log the error for now - wallet store will handle its own errors
          console.warn('Mining Service: Session restoration failed, wallet may show sync error');
        }
      } catch (walletError) {
        console.error('Mining Service: Error accessing wallet store:', walletError);
      }

      // Don't throw the error, just log it to prevent app crash
      console.warn('Mining Service: Continuing without session restoration due to error');
    }
  }

  /**
   * Get current mining state (with backward compatibility)
   */
  getState(): MiningState {
    const state = { ...this.state };

    // Add backward compatibility properties
    if (!state.miningRate && state.miningRatePerSecond) {
      state.miningRate = state.miningRatePerSecond * 3600; // Convert to hourly rate
    }
    if (!state.tokensPerSecond && state.miningRatePerSecond) {
      state.tokensPerSecond = state.miningRatePerSecond; // Already per second
    }

    return state;
  }

  /**
   * Get current total balance from wallet store
   */
  getCurrentBalance(): number {
    const walletStore = useWalletStore.getState();
    return walletStore.totalBalance;
  }

  /**
   * Format balance to display with exactly 4 decimal places
   */
  formatBalance(balance: number): string {
    return balance.toFixed(4);
  }

  /**
   * Format runtime duration to display as "Xh Ym Zs" format
   */
  private formatRuntime(elapsed: number): string {
    // Handle invalid inputs
    if (!elapsed || isNaN(elapsed) || elapsed < 0) {
      return '0h 0m 0s';
    }

    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    // Ensure values are valid numbers
    const safeHours = isNaN(hours) ? 0 : Math.max(0, hours);
    const safeMinutes = isNaN(minutes) ? 0 : Math.max(0, Math.min(59, minutes));
    const safeSeconds = isNaN(seconds) ? 0 : Math.max(0, Math.min(59, seconds));

    return `${safeHours}h ${safeMinutes}m ${safeSeconds}s`;
  }

  /**
   * Get current balance formatted for display
   */
  getFormattedBalance(): string {
    return this.formatBalance(this.state.currentBalance);
  }

  /**
   * Get total earned formatted for display
   */
  getFormattedEarnings(): string {
    return this.formatBalance(this.state.totalEarned);
  }

  /**
   * Get current runtime
   */
  getRuntime(): string {
    return this.state.runtime;
  }

  /**
   * Get current countdown (time remaining)
   */
  getCountdown(): string {
    return this.state.countdown;
  }

  /**
   * Check if currently mining
   */
  isMining(): boolean {
    return this.state.isMining;
  }

  /**
   * Update mining rate (backward compatibility - converts hourly rate to per-second)
   */
  updateMiningRate(newRate: number): void {
    this.state.miningRatePerSecond = newRate / 3600;
    this.state.miningIntervalMs = 1000;

    console.log('Mining rate updated to:', newRate, 'CELF/hour');
    console.log('Converted to per-second:', this.state.miningRatePerSecond, 'CELF/second');
  }

  /**
   * Get mining rate in CELF/hour (backward compatibility)
   */
  getMiningRate(): number {
    return (this.state.miningRatePerSecond || 0.000278) * 3600;
  }

  /**
   * Get tokens per second (backward compatibility)
   */
  getTokensPerSecond(): string {
    return (this.state.miningRatePerSecond || 0.000278).toFixed(6);
  }

  /**
   * Cleanup - call when component unmounts
   */
  cleanup(): void {
    // Clean up timers without triggering backend calls
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }

    if (this.sessionEndTimer) {
      clearTimeout(this.sessionEndTimer);
      this.sessionEndTimer = null;
    }
  }
}

// Export singleton instance
export const miningService = new MiningService();