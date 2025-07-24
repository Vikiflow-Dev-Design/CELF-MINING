/**
 * Mining utility functions for CELF mobile app
 */

/**
 * Calculate mining increment per second based on hourly rate
 * @param hourlyRate - Mining rate in CELF per hour
 * @returns Mining increment per second
 */
export const calculateMiningIncrement = (hourlyRate: number): number => {
  // Convert hourly rate to per-second rate
  // 1 hour = 3600 seconds
  return hourlyRate / 3600;
};

/**
 * Format balance to display with exactly 4 decimal places (like HTML example)
 * @param balance - Balance amount
 * @returns Formatted balance string
 */
export const formatBalance = (balance: number): string => {
  return balance.toFixed(4);
};

/**
 * Add mining increment to current balance
 * @param currentBalance - Current balance amount
 * @param increment - Amount to add
 * @returns New balance with proper precision
 */
export const addMiningIncrement = (currentBalance: number, increment: number): number => {
  // Add increment and round to 4 decimal places to prevent floating point errors
  return Math.round((currentBalance + increment) * 10000) / 10000;
};

/**
 * Calculate total mined amount in a session
 * @param miningRate - Mining rate in CELF per hour
 * @param secondsElapsed - Seconds elapsed in current session
 * @returns Total amount mined in current session
 */
export const calculateSessionTotal = (miningRate: number, secondsElapsed: number): number => {
  const incrementPerSecond = calculateMiningIncrement(miningRate);
  return Math.round((incrementPerSecond * secondsElapsed) * 10000) / 10000;
};

/**
 * Validate mining rate
 * @param rate - Mining rate to validate
 * @returns Whether the rate is valid
 */
export const isValidMiningRate = (rate: number): boolean => {
  return rate > 0 && rate <= 10; // Reasonable limits for mining rate
};

/**
 * Calculate estimated earnings for different time periods
 * @param miningRate - Mining rate in CELF per hour
 * @returns Object with estimated earnings for different periods
 */
export const calculateEstimatedEarnings = (miningRate: number) => {
  return {
    perHour: miningRate,
    perDay: Math.round((miningRate * 24) * 10000) / 10000,
    perWeek: Math.round((miningRate * 24 * 7) * 10000) / 10000,
    perMonth: Math.round((miningRate * 24 * 30) * 10000) / 10000,
  };
};

/**
 * Format runtime duration to display as "Xh Ym Zs" format
 * Based on the HTML example implementation
 * @param elapsed - Elapsed time in milliseconds
 * @returns Formatted runtime string
 */
export const formatRuntime = (elapsed: number): string => {
  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

/**
 * Calculate mining runtime excluding paused periods
 * Based on the HTML example implementation
 * @param startTime - Mining start timestamp
 * @param pausedTime - Total paused time in milliseconds
 * @param isMining - Whether mining is currently active
 * @param lastPauseTime - Timestamp of last pause (if currently paused)
 * @returns Runtime in milliseconds
 */
export const calculateMiningRuntime = (
  startTime: number,
  pausedTime: number = 0,
  isMining: boolean = true,
  lastPauseTime: number = 0
): number => {
  let elapsed: number;

  if (isMining) {
    // Currently mining - calculate elapsed time minus total paused time
    elapsed = Date.now() - startTime - pausedTime;
  } else {
    // Currently paused - calculate elapsed time up to last pause minus total paused time
    elapsed = lastPauseTime - startTime - pausedTime;
  }

  return Math.max(0, elapsed); // Ensure non-negative
};
