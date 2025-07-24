/**
 * Mining Service - Fixed version based on HTML version 9 implementation
 * Key fixes: Proper timer handling, continuous updates, and accurate calculations
 * Now integrated with wallet store for unified balance management
 */

import { useWalletStore } from '@/stores/walletStore';

export interface MiningState {
  isMining: boolean;
  totalEarned: number;
  miningRate: number; // CELF per hour
  startTime: number | null;
  runtime: string;
  tokensPerSecond: number;
}

export interface MiningCallbacks {
  onEarningsUpdate: (earnings: number) => void;
  onRuntimeUpdate: (runtime: string) => void;
  onMiningStateChange: (isMining: boolean) => void;
}

export class MiningService {
  private state: MiningState;
  private callbacks: MiningCallbacks;
  private updateTimer: NodeJS.Timeout | null = null; // Single timer like HTML version

  constructor(miningRate: number = 0.125) {
    this.state = {
      isMining: false,
      totalEarned: 0,
      miningRate: miningRate,
      startTime: null,
      runtime: '0h 0m 0s',
      tokensPerSecond: miningRate / 3600, // Convert hourly rate to per second
    };

    this.callbacks = {
      onEarningsUpdate: () => {},
      onRuntimeUpdate: () => {},
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
   * Start mining session - Fixed to match HTML version 9 behavior
   */
  startMining(): void {
    if (this.state.isMining) return;

    console.log('Mining started!');
    console.log('Mining rate:', this.state.miningRate, 'CELF/hour');
    console.log('Tokens per second:', this.state.tokensPerSecond, 'CELF');

    // Initialize mining state
    this.state.isMining = true;
    this.state.totalEarned = 0;
    this.state.startTime = Date.now();

    // Single update timer (every 100ms like HTML version)
    this.updateTimer = setInterval(() => {
      this.updateBalance();
    }, 100);

    // Notify state change
    this.callbacks.onMiningStateChange(true);
  }

  /**
   * Main update function - matches HTML version 9 logic exactly
   * Now updates wallet store instead of local balance
   */
  private updateBalance(): void {
    if (this.state.isMining) {
      // Add tokens per second (scaled for 100ms updates)
      const increment = this.state.tokensPerSecond / 10; // Divide by 10 for 100ms intervals

      this.state.totalEarned += increment;

      // Update wallet store with mining reward (non-transferrable)
      const walletStore = useWalletStore.getState();
      walletStore.addMiningReward(increment);

      // Update display with 4 decimal places (like HTML version)
      this.callbacks.onEarningsUpdate(parseFloat(this.state.totalEarned.toFixed(4)));
    }

    // Update runtime
    this.updateRuntime();
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
   * Stop mining session - Fixed cleanup
   */
  stopMining(): void {
    if (!this.state.isMining) return;

    console.log('Mining stopped!');
    console.log('Total earned this session:', this.formatBalance(this.state.totalEarned), 'CELF');

    this.state.isMining = false;
    this.state.startTime = null;
    this.state.runtime = '0h 0m 0s';

    // Clear the single timer
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }

    // Notify state change
    this.callbacks.onMiningStateChange(false);
    this.callbacks.onRuntimeUpdate(this.state.runtime);
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
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
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
    this.stopMining();
  }
}

// Export singleton instance
export const miningService = new MiningService();