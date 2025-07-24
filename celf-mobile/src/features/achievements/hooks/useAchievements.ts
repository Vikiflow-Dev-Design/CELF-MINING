/**
 * Achievements Hook
 * Custom hook for achievements functionality
 */

import { useState } from 'react';
import { router } from 'expo-router';
import { achievements, categories } from '../data';
import { 
  filterAchievementsByCategory, 
  sortAchievementsByCompletion,
  getCompletedAchievements,
  getTotalRewards
} from '../utils';
import type { CategoryKey } from '../types';

export const useAchievements = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');

  // Filter and sort achievements
  const filteredAchievements = filterAchievementsByCategory(achievements, selectedCategory);
  const sortedAchievements = sortAchievementsByCompletion(filteredAchievements);

  // Calculate stats
  const completedAchievements = getCompletedAchievements(achievements);
  const completedCount = completedAchievements.length;
  const totalCount = achievements.length;
  const totalRewards = getTotalRewards(achievements);
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  // Handle category selection
  const handleCategorySelect = (category: CategoryKey) => {
    setSelectedCategory(category);
  };

  // Handle achievement press
  const handleAchievementPress = (achievementId: string) => {
    router.push(`/achievement-details?id=${achievementId}` as any);
  };

  // Refresh achievements data
  const refreshAchievements = async () => {
    // In a real app, this would fetch fresh data from the server
    return new Promise<void>(resolve => setTimeout(resolve, 1500));
  };

  return {
    // Data
    achievements: sortedAchievements,
    categories,
    selectedCategory,
    
    // Stats
    completedCount,
    totalCount,
    totalRewards,
    completionPercentage,
    
    // Handlers
    handleCategorySelect,
    handleAchievementPress,
    refreshAchievements,
  };
};
