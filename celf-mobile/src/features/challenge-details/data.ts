/**
 * Challenge Details Data
 * Contains mock data for challenge details screen
 */

import type { ChallengeDetail } from './types';

/**
 * Get mock challenge data by ID
 * In a real app, this would fetch from an API
 */
export const getMockChallengeData = (id: string): ChallengeDetail => {
  // Mock challenge data - in real app, fetch by ID
  return {
    id: id || '1',
    title: 'Morning Miner',
    description: 'Complete 3 mining sessions today to earn bonus CELF tokens and maintain your mining streak',
    type: 'daily',
    progress: 2,
    maxProgress: 3,
    reward: 15,
    isCompleted: false,
    isStarted: true,
    expiresIn: '8h 32m',
    difficulty: 'easy',
    icon: 'diamond',
    timeLimit: '1 hour',
    category: 'Mining',
    instructions: [
      'Open the mining screen from the main dashboard',
      'Tap the mining button to start a session',
      'Complete at least 3 separate mining sessions',
      'Sessions can be any duration (minimum 30 seconds)',
      'All sessions must be completed within 1 hour'
    ],
    tips: [
      'Set reminders throughout the day to complete sessions',
      'Mining sessions can be as short as 30 seconds',
      'Complete sessions during different times for variety',
      'Check your progress regularly to stay on track'
    ]
  };
};
