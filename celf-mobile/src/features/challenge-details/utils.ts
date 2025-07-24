/**
 * Challenge Details Utilities
 * Helper functions for challenge details functionality
 */

import { Alert, Share } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/design-tokens';
import type { ChallengeType, ChallengeDifficulty, ChallengeDetail } from './types';

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
 * Get display name for challenge type
 */
export const getTypeName = (type: ChallengeType): string => {
  switch (type) {
    case 'daily': return 'Daily Challenge';
    case 'weekly': return 'Weekly Challenge';
    case 'bonus': return 'Bonus Challenge';
    default: return 'Challenge';
  }
};

/**
 * Calculate progress percentage
 */
export const calculateProgressPercentage = (progress: number, maxProgress: number): number => {
  return (progress / maxProgress) * 100;
};

/**
 * Start challenge
 */
export const startChallenge = (
  challenge: ChallengeDetail,
  isStarted: boolean,
  setIsStarted: (started: boolean) => void
): void => {
  if (challenge.isCompleted) {
    Alert.alert('Already Completed', 'You have already completed this challenge!');
    return;
  }
  
  setIsStarted(true);
  Alert.alert(
    'Challenge Started!',
    'Your challenge has begun. Complete the required actions to earn your reward.',
    [{ text: 'Got it!', onPress: () => router.back() }]
  );
};

/**
 * Share challenge
 */
export const shareChallenge = async (challenge: ChallengeDetail): Promise<void> => {
  try {
    const message = challenge.isCompleted 
      ? `🎉 I just completed the "${challenge.title}" challenge on CELF and earned ${challenge.reward} CELF tokens!`
      : `💪 I'm working on the "${challenge.title}" challenge on CELF. ${challenge.progress}/${challenge.maxProgress} complete!`;
    
    await Share.share({
      message,
      title: 'CELF Challenge',
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
};
