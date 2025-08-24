/**
 * Mining Screen Utilities
 * Helper functions for mining functionality
 */

/**
 * Format time remaining as HH:MM:SS
 */
export const formatTime = (seconds: number): string => {
  // Handle invalid inputs
  if (!seconds || isNaN(seconds) || seconds < 0) {
    return '00:00:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // Ensure values are valid
  const safeHours = isNaN(hours) ? 0 : Math.max(0, hours);
  const safeMinutes = isNaN(minutes) ? 0 : Math.max(0, Math.min(59, minutes));
  const safeSecs = isNaN(secs) ? 0 : Math.max(0, Math.min(59, secs));

  return `${safeHours.toString().padStart(2, '0')}:${safeMinutes.toString().padStart(2, '0')}:${safeSecs.toString().padStart(2, '0')}`;
};

/**
 * Calculate tokens per second from mining rate
 */
export const calculateTokensPerSecond = (miningRate: number): number => {
  return miningRate / 3600;
};

/**
 * Social media handlers
 */
export const socialHandlers = {
  handleTwitterPress: () => {
    // Open Twitter/X profile
    console.log('Opening Twitter/X');
  },

  handleTelegramPress: () => {
    // Open Telegram channel
    console.log('Opening Telegram');
  },

  handleDiscordPress: () => {
    // Open Discord server
    console.log('Opening Discord');
  },

  handleYouTubePress: () => {
    // Open YouTube channel
    console.log('Opening YouTube');
  },
};
