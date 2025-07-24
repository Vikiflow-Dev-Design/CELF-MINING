/**
 * Daily Challenges Utilities
 * Helper functions for daily challenges functionality
 */

import { Alert } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/design-tokens';
import { todayChallenges } from './data';
import type { Challenge, ChallengeDifficulty, ChallengeType } from './types';

/**
 * Get color for difficulty level
 */
export const getDifficultyColor = (difficulty: ChallengeDifficulty): string => {
  switch (difficulty) {
    case 'easy': return Colors.secondary.success;
    case 'medium': return Colors.secondary.warning;
    case 'hard': return Colors.secondary.error;
    default: return Colors.primary.blue;
  }
};

/**
 * Get color for challenge type
 */
export const getTypeColor = (type: ChallengeType): string => {
  switch (type) {
    case 'daily': return Colors.primary.blue;
    case 'weekly': return Colors.secondary.warning;
    case 'bonus': return Colors.secondary.error;
    default: return Colors.primary.blue;
  }
};

/**
 * Calculate progress percentage
 */
export const calculateProgressPercentage = (progress: number, maxProgress: number): number => {
  return (progress / maxProgress) * 100;
};

/**
 * Calculate today's stats
 */
export const calculateTodayStats = () => {
  const completedToday = todayChallenges.filter(c => c.isCompleted).length;
  const totalRewardsToday = todayChallenges.filter(c => c.isCompleted).reduce((sum, c) => sum + c.reward, 0);
  
  return {
    completedToday,
    totalChallenges: todayChallenges.length,
    totalRewardsToday,
  };
};

/**
 * Start challenge
 */
export const startChallenge = (challenge: Challenge): void => {
  if (challenge.isCompleted) {
    Alert.alert('Already Completed', 'You have already completed this challenge!');
  } else {
    router.push(`/(app)/challenge-details?id=${challenge.id}` as any);
  }
};
