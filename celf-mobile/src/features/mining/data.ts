/**
 * Mining Screen Data
 * Contains static data for mining screen
 */

// Social media platforms for mining screen
export const socialPlatforms = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'logo-twitter',
    description: 'Follow us for updates and news',
    onPress: 'handleTwitterPress',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'paper-plane',
    description: 'Join our community chat',
    onPress: 'handleTelegramPress',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'chatbubbles',
    description: 'Connect with other miners',
    onPress: 'handleDiscordPress',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'logo-youtube',
    description: 'Watch tutorials and guides',
    onPress: 'handleYouTubePress',
  },
];

// Quick action items
export const quickActions = [
  {
    id: 'send',
    title: 'Send Tokens',
    icon: 'arrow-up-outline',
    color: 'primary',
    route: '/send-tokens',
  },
  {
    id: 'receive',
    title: 'Receive Tokens',
    icon: 'arrow-down-outline',
    color: 'success',
    route: '/receive-tokens',
  },
  {
    id: 'exchange',
    title: 'Exchange',
    icon: 'swap-horizontal-outline',
    color: 'warning',
    route: '/exchange',
  },
  {
    id: 'invite',
    title: 'Invite Friends',
    icon: 'people-outline',
    color: 'primary',
    route: '/referrals',
  },
  {
    id: 'achievements',
    title: 'Achievements',
    icon: 'trophy-outline',
    color: 'success',
    route: '/achievements',
  },
  {
    id: 'daily',
    title: 'Daily Bonus',
    icon: 'gift-outline',
    color: 'warning',
    route: '/daily-challenges',
  },
];
