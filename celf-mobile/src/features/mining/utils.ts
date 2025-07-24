/**
 * Mining Screen Utilities
 * Helper functions for mining functionality
 */

/**
 * Format time remaining as HH:MM:SS
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
