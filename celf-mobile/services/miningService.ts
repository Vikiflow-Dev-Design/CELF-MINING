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
  miningRate: number; // CELF per hour
  startTime: number | null;
  runtime: string;
  countdown: string; // Time remaining until session ends
  tokensPerSecond: number;
  sessionId: string | null;
  maxDurationMs: number;
  remainingTimeMs: number;
  serverTime: number | null;
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
  private syncTimer: NodeJS.Timeout | null = null;

  constructor(miningRate: number = 0.125) {
    this.state = {
      isMining: false,
      totalEarned: 0,
      miningRate: miningRate,
      startTime: null,
      runtime: '0h 0m 0s',
      countdown: '24h 0m 0s',
      tokensPerSecond: miningRate / 3600,
      sessionId: null,
      maxDurationMs: 24 * 60 * 60 * 1000, // 24 hours
      remainingTimeMs: 24 * 60 * 60 * 1000,
      serverTime: null,
    };

    // Fetch current admin mining rate on initialization
    this.fetchCurrentMiningRate();
  }

  /**
   * Fetch current mining rate from admin settings
   */
  async fetchCurrentMiningRate(): Promise<void> {
    try {
      console.log('Fetching current mining rate from admin settings...');
      const response = await apiService.getMiningRate();

      if (response.success && response.data?.rate) {
        const { currentRate, maxSessionTime, maintenanceMode } = response.data.rate;

        // Update mining rate and session duration
        this.updateMiningRate(currentRate);
        this.state.maxDurationMs = maxSessionTime * 1000; // Convert seconds to ms
        this.state.remainingTimeMs = maxSessionTime * 1000;

        // Update countdown display
        this.state.countdown = this.formatRuntime(maxSessionTime * 1000);

        console.log('Mining rate updated from admin settings:', {
          rate: currentRate,
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
      // Continue with default rate if fetch fails
    }

    this.callbacks = {
      onEarningsUpdate: () => {},
      onRuntimeUpdate: () => {},
      onCountdownUpdate: () => {},
      onMiningStateChange: () => {},
    };
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

      const sessionData = response.data.session;

      // Initialize local state with backend data
      this.state.isMining = true;
      this.state.totalEarned = 0;
      this.state.startTime = new Date(sessionData.startedAt).getTime();
      this.state.sessionId = sessionData.sessionId;
      this.state.miningRate = sessionData.miningRate;
      this.state.maxDurationMs = sessionData.maxDurationMs;
      this.state.remainingTimeMs = sessionData.maxDurationMs;
      this.state.serverTime = new Date(sessionData.serverTime).getTime();

      console.log('Mining session started:', sessionData.sessionId);
      console.log('Mining rate:', this.state.miningRate, 'CELF/hour');

      // Initialize wallet for mining session
      walletStore.startMiningSession();

      // Start local UI update timer (every 100ms for smooth UI)
      this.updateTimer = setInterval(() => {
        this.updateLocalProgress();
      }, 100);

      // Start backend sync timer (every 30 seconds for authoritative data)
      this.syncTimer = setInterval(() => {
        this.syncWithBackend();
      }, 30000);

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
   * Update local progress for smooth UI (estimated values)
   * Real calculations happen on backend
   */
  private updateLocalProgress(): void {
    if (!this.state.isMining || !this.state.startTime) return;

    const now = Date.now();
    const elapsedMs = now - this.state.startTime;

    // Calculate estimated earnings for UI (backend will provide authoritative values)
    const elapsedHours = elapsedMs / (1000 * 60 * 60);
    const estimatedEarnings = elapsedHours * this.state.miningRate;

    // Update earnings (use server value if available, otherwise estimate)
    this.state.totalEarned = estimatedEarnings;
    this.state.remainingTimeMs = Math.max(0, this.state.maxDurationMs - elapsedMs);

    // Update wallet store with estimated mining earnings for real-time balance display
    const walletStore = useWalletStore.getState();
    walletStore.updateMiningEarnings(this.state.totalEarned);

    // Update display with 4 decimal places
    this.callbacks.onEarningsUpdate(parseFloat(this.state.totalEarned.toFixed(4)));

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

        if (serverData.currentRate !== undefined) {
          this.state.miningRate = serverData.currentRate;
          this.state.tokensPerSecond = serverData.currentRate / 3600;
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

    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
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

        // Restore session state with server-authoritative data
        this.state.isMining = true;
        this.state.sessionId = sessionData.sessionId || null;
        this.state.startTime = startTime;
        this.state.miningRate = sessionData.currentRate || 0.125;
        this.state.totalEarned = sessionData.tokensEarned || 0;
        this.state.serverTime = new Date(sessionData.serverTime || Date.now()).getTime();
        this.state.tokensPerSecond = this.state.miningRate / 3600;

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
        walletStore.updateMiningEarnings(this.state.totalEarned);

        // Start local UI updates
        this.updateTimer = setInterval(() => {
          this.updateLocalProgress();
        }, 100);

        // Start backend sync timer for restored session
        this.syncTimer = setInterval(() => {
          this.syncWithBackend();
        }, 30000);

        // Set timer for remaining session time
        if (this.state.remainingTimeMs > 0) {
          this.sessionEndTimer = setTimeout(() => {
            console.log('Session timer expired, completing session');
            this.completeSession();
          }, this.state.remainingTimeMs);
        } else {
          // Session should have ended, complete it
          console.log('Session already expired, completing now');
          this.completeSession();
        }

        // Notify state change
        this.callbacks.onMiningStateChange(true);

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
   * Get current mining state
   */
  getState(): MiningState {
    return { ...this.state };
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
   * Update mining rate
   */
  updateMiningRate(newRate: number): void {
    this.state.miningRate = newRate;
    this.state.tokensPerSecond = newRate / 3600;
    
    console.log('Mining rate updated to:', newRate, 'CELF/hour');
    console.log('New tokens per second:', this.state.tokensPerSecond, 'CELF');
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

    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }
}

// Export singleton instance
export const miningService = new MiningService();