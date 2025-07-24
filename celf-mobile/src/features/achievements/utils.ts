/**
 * Achievements Utilities
 * Helper functions for achievements functionality
 */

import { Colors } from '@/constants/design-tokens';
import type { Achievement } from './types';

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'mining': return Colors.secondary.warning;
    case 'social': return Colors.secondary.success;
    case 'wallet': return Colors.secondary.info;
    case 'milestone': return Colors.secondary.error;
    default: return Colors.primary.blue;
  }
};

export const getCategoryName = (category: string): string => {
  switch (category) {
    case 'mining': return 'Mining';
    case 'social': return 'Social';
    case 'wallet': return 'Wallet';
    case 'milestone': return 'Milestone';
    default: return 'Unknown';
  }
};

export const calculateProgress = (achievement: Achievement): number => {
  return Math.min((achievement.progress / achievement.maxProgress) * 100, 100);
};

export const getProgressText = (achievement: Achievement): string => {
  return `${achievement.progress}/${achievement.maxProgress}`;
};

export const isAchievementCompleted = (achievement: Achievement): boolean => {
  return achievement.isCompleted || achievement.progress >= achievement.maxProgress;
};

export const getCompletedAchievements = (achievements: Achievement[]): Achievement[] => {
  return achievements.filter(achievement => isAchievementCompleted(achievement));
};

export const getTotalRewards = (achievements: Achievement[]): number => {
  return getCompletedAchievements(achievements).reduce((sum, achievement) => sum + achievement.reward, 0);
};

export const filterAchievementsByCategory = (achievements: Achievement[], category: string): Achievement[] => {
  if (category === 'all') {
    return achievements;
  }
  return achievements.filter(achievement => achievement.category === category);
};

export const sortAchievementsByCompletion = (achievements: Achievement[]): Achievement[] => {
  return [...achievements].sort((a, b) => {
    // Completed achievements first, then by progress percentage
    if (a.isCompleted && !b.isCompleted) return -1;
    if (!a.isCompleted && b.isCompleted) return 1;
    
    const aProgress = calculateProgress(a);
    const bProgress = calculateProgress(b);
    
    return bProgress - aProgress;
  });
};
