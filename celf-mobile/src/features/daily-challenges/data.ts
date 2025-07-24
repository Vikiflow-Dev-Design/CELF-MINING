/**
 * Daily Challenges Data
 * Contains mock data for daily challenges screen
 */

import type { Challenge, ChallengeTab } from './types';

// Mock challenges data
export const todayChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Morning Miner',
    description: 'Complete 3 mining sessions today',
    type: 'daily',
    progress: 2,
    maxProgress: 3,
    reward: 15,
    isCompleted: false,
    expiresIn: '8h 32m',
    difficulty: 'easy',
    icon: 'diamond'
  },
  {
    id: '2',
    title: 'Social Connector',
    description: 'Share CELF with 2 friends',
    type: 'daily',
    progress: 0,
    maxProgress: 2,
    reward: 25,
    isCompleted: false,
    expiresIn: '8h 32m',
    difficulty: 'medium',
    icon: 'share-social'
  },
  {
    id: '3',
    title: 'Transaction Master',
    description: 'Send tokens to another user',
    type: 'daily',
    progress: 1,
    maxProgress: 1,
    reward: 20,
    isCompleted: true,
    expiresIn: 'Completed',
    difficulty: 'easy',
    icon: 'send'
  }
];

export const weeklyChallenges: Challenge[] = [
  {
    id: '4',
    title: 'Weekly Warrior',
    description: 'Mine for 5 consecutive days',
    type: 'weekly',
    progress: 3,
    maxProgress: 5,
    reward: 100,
    isCompleted: false,
    expiresIn: '3d 12h',
    difficulty: 'medium',
    icon: 'flame'
  },
  {
    id: '5',
    title: 'Referral Champion',
    description: 'Get 3 new referrals this week',
    type: 'weekly',
    progress: 1,
    maxProgress: 3,
    reward: 150,
    isCompleted: false,
    expiresIn: '3d 12h',
    difficulty: 'hard',
    icon: 'people'
  }
];

export const bonusChallenges: Challenge[] = [
  {
    id: '6',
    title: 'Speed Demon',
    description: 'Complete 10 mining sessions in 1 hour',
    type: 'bonus',
    progress: 0,
    maxProgress: 10,
    reward: 50,
    isCompleted: false,
    expiresIn: '2d 5h',
    difficulty: 'hard',
    icon: 'speedometer'
  }
];

// Tab configuration
export const challengeTabs: ChallengeTab[] = [
  { key: 'today', label: 'Today', challenges: todayChallenges },
  { key: 'weekly', label: 'Weekly', challenges: weeklyChallenges },
  { key: 'bonus', label: 'Bonus', challenges: bonusChallenges },
];
