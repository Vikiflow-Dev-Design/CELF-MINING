/**
 * Mining Screen Data
 * Contains static data for mining screen
 */

import { SocialPlatform, QuickAction, ProjectActivityCategory } from './types';

// Social media platforms for mining screen
export const socialPlatforms: SocialPlatform[] = [
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
export const quickActions: QuickAction[] = [
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
    id: 'tasks',
    title: 'Tasks',
    icon: 'trophy-outline',
    color: 'success',
    route: '/tasks',
  },
  {
    id: 'show-more',
    title: 'Show More',
    icon: 'ellipsis-horizontal-outline',
    color: 'primary',
    route: 'show-more-modal',
  },
];

// Comprehensive project links and activities for Show More modal
export const projectActivities: ProjectActivityCategory[] = [
  // Core App Features
  {
    category: 'Core Features',
    items: [
      {
        id: 'mining',
        title: 'Mining',
        description: 'Mine CELF tokens and earn rewards',
        icon: 'diamond-outline',
        route: '/mining',
        color: '#007AFF',
      },
      {
        id: 'wallet',
        title: 'Wallet',
        description: 'Manage your CELF tokens and transactions',
        icon: 'wallet-outline',
        route: '/wallet',
        color: '#34C759',
      },
      {
        id: 'send-tokens',
        title: 'Send Tokens',
        description: 'Send CELF tokens to other users',
        icon: 'arrow-up-outline',
        route: '/send-tokens',
        color: '#007AFF',
      },
      {
        id: 'receive-tokens',
        title: 'Receive Tokens',
        description: 'Receive CELF tokens from others',
        icon: 'arrow-down-outline',
        route: '/receive-tokens',
        color: '#34C759',
      },
      {
        id: 'exchange',
        title: 'Exchange',
        description: 'Exchange tokens and manage your portfolio',
        icon: 'swap-horizontal-outline',
        route: '/exchange',
        color: '#FF9500',
      },
    ],
  },
  // Social & Community
  {
    category: 'Social & Community',
    items: [
      {
        id: 'referrals',
        title: 'Invite Friends',
        description: 'Invite friends and earn referral bonuses',
        icon: 'people-outline',
        route: '/referrals',
        color: '#007AFF',
      },
      {
        id: 'tasks',
        title: 'Tasks',
        description: 'Complete tasks and earn rewards',
        icon: 'trophy-outline',
        route: '/tasks',
        color: '#34C759',
      },
      {
        id: 'leaderboard',
        title: 'Leaderboard',
        description: 'See top miners and compete',
        icon: 'podium-outline',
        route: '/leaderboard',
        color: '#FF9500',
      },
    ],
  },
  // Social Media Links
  {
    category: 'Social Media',
    items: [
      {
        id: 'twitter',
        title: 'Twitter',
        description: 'Follow us for updates and news',
        icon: 'logo-twitter',
        url: 'https://twitter.com/celfmining',
        color: '#1DA1F2',
      },
      {
        id: 'telegram',
        title: 'Telegram',
        description: 'Join our community chat',
        icon: 'paper-plane-outline',
        url: 'https://t.me/celfmining',
        color: '#0088CC',
      },
      {
        id: 'discord',
        title: 'Discord',
        description: 'Connect with other miners',
        icon: 'chatbubbles-outline',
        url: 'https://discord.gg/celfmining',
        color: '#5865F2',
      },
      {
        id: 'youtube',
        title: 'YouTube',
        description: 'Watch tutorials and guides',
        icon: 'logo-youtube',
        url: 'https://youtube.com/@celfmining',
        color: '#FF0000',
      },
    ],
  },
  // Information & Support
  {
    category: 'Information & Support',
    items: [
      {
        id: 'help-center',
        title: 'Help Center',
        description: 'Get help and find answers',
        icon: 'help-circle-outline',
        route: '/help-center',
        color: '#007AFF',
      },
      {
        id: 'app-information',
        title: 'App Information',
        description: 'Learn about the app and updates',
        icon: 'information-circle-outline',
        route: '/app-information',
        color: '#34C759',
      },
      {
        id: 'profile',
        title: 'Profile',
        description: 'Manage your account and settings',
        icon: 'person-outline',
        route: '/profile',
        color: '#FF9500',
      },
      {
        id: 'settings',
        title: 'Settings',
        description: 'Customize your app experience',
        icon: 'settings-outline',
        route: '/settings',
        color: '#8E8E93',
      },
    ],
  },
];
