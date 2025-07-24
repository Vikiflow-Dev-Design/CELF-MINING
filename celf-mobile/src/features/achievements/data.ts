/**
 * Achievements Data
 * Static data for achievements functionality
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'mining' | 'social' | 'wallet' | 'milestone';
  progress: number;
  maxProgress: number;
  reward: number;
  isCompleted: boolean;
  icon: string;
  completedDate?: string;
  tips?: string[];
  requirements?: string[];
}

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first mining session',
    category: 'mining',
    progress: 1,
    maxProgress: 1,
    reward: 10,
    isCompleted: true,
    icon: 'diamond',
    completedDate: '2025-01-15',
    tips: [
      'Tap the mining button to start your first session',
      'Mining sessions help you earn CELF tokens',
      'Check back regularly to maximize earnings'
    ],
    requirements: [
      'Start and complete one mining session',
      'Session can be any duration',
      'Must be logged into the app'
    ]
  },
  {
    id: '2',
    title: 'Mining Streak',
    description: 'Mine for 7 consecutive days',
    category: 'mining',
    progress: 5,
    maxProgress: 7,
    reward: 50,
    isCompleted: false,
    icon: 'flame',
    tips: [
      'Set daily reminders to mine consistently',
      'Mining sessions can be as short as 1 minute',
      'Check the app daily to maintain your streak',
      'Your streak resets if you miss a day'
    ],
    requirements: [
      'Complete at least one mining session per day',
      'Sessions must be on consecutive calendar days',
      'No minimum mining duration required',
      'Streak continues across different time zones'
    ]
  },
  {
    id: '3',
    title: 'Social Butterfly',
    description: 'Refer 5 friends to CELF',
    category: 'social',
    progress: 3,
    maxProgress: 5,
    reward: 100,
    isCompleted: false,
    icon: 'people',
    tips: [
      'Share your referral code with friends',
      'Use social media to spread the word',
      'Explain the benefits of CELF mining',
      'Help friends get started with their first mining session'
    ],
    requirements: [
      'Friends must sign up using your referral code',
      'Referred users must complete account verification',
      'Each friend must complete at least one mining session',
      'Referrals must be unique users'
    ]
  },
  {
    id: '4',
    title: 'First Transaction',
    description: 'Send your first CELF tokens',
    category: 'wallet',
    progress: 1,
    maxProgress: 1,
    reward: 25,
    isCompleted: true,
    icon: 'send',
    completedDate: '2025-01-16',
    tips: [
      'Make sure you have sufficient balance',
      'Double-check the recipient address',
      'Start with small amounts for testing',
      'Transaction fees are minimal'
    ],
    requirements: [
      'Have CELF tokens in your wallet',
      'Valid recipient address',
      'Sufficient balance for transaction and fees',
      'Complete transaction successfully'
    ]
  },
  {
    id: '5',
    title: 'CELF Collector',
    description: 'Accumulate 1000 CELF tokens',
    category: 'milestone',
    progress: 750,
    maxProgress: 1000,
    reward: 200,
    isCompleted: false,
    icon: 'trophy',
    tips: [
      'Mine regularly to increase your balance',
      'Refer friends for bonus tokens',
      'Complete daily challenges',
      'Participate in community events'
    ],
    requirements: [
      'Total wallet balance must reach 1000 CELF',
      'Includes all token sources (mining, referrals, etc.)',
      'Balance must be maintained when achievement unlocks',
      'Tokens can be across different wallet types'
    ]
  },
  {
    id: '6',
    title: 'Community Leader',
    description: 'Have 10 active referrals',
    category: 'social',
    progress: 8,
    maxProgress: 10,
    reward: 300,
    isCompleted: false,
    icon: 'star',
    tips: [
      'Engage with your referrals regularly',
      'Help them understand the platform',
      'Share mining tips and strategies',
      'Build a supportive community'
    ],
    requirements: [
      'Have 10 users signed up with your referral code',
      'All referrals must be active (mined in last 7 days)',
      'Referrals must have completed verification',
      'Must maintain active status for achievement'
    ]
  },
  {
    id: '7',
    title: 'Power Miner',
    description: 'Complete 100 mining sessions',
    category: 'mining',
    progress: 67,
    maxProgress: 100,
    reward: 150,
    isCompleted: false,
    icon: 'flash',
    tips: [
      'Consistency is key to reaching 100 sessions',
      'Each session counts regardless of duration',
      'Track your progress in the achievements section',
      'Set daily mining goals'
    ],
    requirements: [
      'Complete 100 individual mining sessions',
      'Sessions must be started and completed',
      'Minimum session duration applies',
      'Progress tracked automatically'
    ]
  },
  {
    id: '8',
    title: 'Wallet Master',
    description: 'Complete 50 transactions',
    category: 'wallet',
    progress: 23,
    maxProgress: 50,
    reward: 75,
    isCompleted: false,
    icon: 'card',
    tips: [
      'Both sending and receiving count',
      'Practice with small amounts first',
      'Keep track of your transaction history',
      'Learn about different transaction types'
    ],
    requirements: [
      'Complete 50 successful transactions',
      'Includes both sent and received transactions',
      'Failed transactions do not count',
      'Must be verified transactions'
    ]
  }
];

export const categories = [
  { key: 'all', label: 'All', icon: 'grid', color: '#3B82F6' },
  { key: 'mining', label: 'Mining', icon: 'diamond', color: '#F59E0B' },
  { key: 'social', label: 'Social', icon: 'people', color: '#10B981' },
  { key: 'wallet', label: 'Wallet', icon: 'wallet', color: '#06B6D4' },
  { key: 'milestone', label: 'Milestones', icon: 'trophy', color: '#EF4444' },
];
