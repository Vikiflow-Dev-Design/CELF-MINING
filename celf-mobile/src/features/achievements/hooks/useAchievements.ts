/**
 * Achievements Hook
 * Custom hook for achievements functionality
 */

import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { apiService } from '@/services/apiService';
import type { CategoryKey } from '../types';

interface Achievement {
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
  rewardClaimed?: boolean;
}

interface AchievementStats {
  totalAchievements: number;
  completedAchievements: number;
  completionPercentage: number;
  unclaimedRewards: number;
  totalUnclaimedRewardValue: number;
}

interface AchievementCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
}

export const useAchievements = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [categories, setCategories] = useState<AchievementCategory[]>([]);
  const [stats, setStats] = useState<AchievementStats>({
    totalAchievements: 0,
    completedAchievements: 0,
    completionPercentage: 0,
    unclaimedRewards: 0,
    totalUnclaimedRewardValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch achievements from API
  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🏆 Fetching achievements from API...');
      const response = await apiService.getAchievements(selectedCategory);

      if (response.success && response.data) {
        console.log('✅ Achievements fetched successfully:', response.data);
        setAchievements(response.data.achievements);
        setCategories(response.data.categories);
        setStats(response.data.stats);
      } else {
        throw new Error(response.message || 'Failed to fetch achievements');
      }
    } catch (err) {
      console.error('❌ Error fetching achievements:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch achievements');

      // Fallback to empty data
      setAchievements([]);
      setCategories([
        { key: 'all', label: 'All', icon: 'apps', color: '#007AFF' },
        { key: 'mining', label: 'Mining', icon: 'diamond', color: '#FF9500' },
        { key: 'social', label: 'Social', icon: 'people', color: '#34C759' },
        { key: 'wallet', label: 'Wallet', icon: 'card', color: '#007AFF' },
        { key: 'milestone', label: 'Milestone', icon: 'trophy', color: '#FF3B30' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch achievements on mount and when category changes
  useEffect(() => {
    fetchAchievements();
  }, [selectedCategory]);

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
    await fetchAchievements();
  };

  // Claim achievement reward
  const claimReward = async (achievementId: string) => {
    try {
      console.log(`🎁 Claiming reward for achievement: ${achievementId}`);
      const response = await apiService.claimAchievementReward(achievementId);

      if (response.success && response.data) {
        console.log('✅ Reward claimed successfully:', response.data);

        // Refresh achievements to update the claimed status
        await fetchAchievements();

        return response.data;
      } else {
        throw new Error(response.message || 'Failed to claim reward');
      }
    } catch (err) {
      console.error('❌ Error claiming reward:', err);
      throw err;
    }
  };

  // Sort achievements by completion status
  const sortedAchievements = achievements.sort((a, b) => {
    // Completed achievements go to the bottom
    if (a.isCompleted && !b.isCompleted) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;

    // Among incomplete achievements, sort by progress percentage (descending)
    if (!a.isCompleted && !b.isCompleted) {
      const aProgress = (a.progress / a.maxProgress) * 100;
      const bProgress = (b.progress / b.maxProgress) * 100;
      return bProgress - aProgress;
    }

    // Among completed achievements, sort by completion date (most recent first)
    if (a.isCompleted && b.isCompleted) {
      if (a.completedDate && b.completedDate) {
        return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
      }
    }

    return 0;
  });

  return {
    // Data
    achievements: sortedAchievements,
    categories,
    selectedCategory,
    loading,
    error,

    // Stats
    completedCount: stats.completedAchievements,
    totalCount: stats.totalAchievements,
    totalRewards: stats.totalUnclaimedRewardValue,
    completionPercentage: stats.completionPercentage,
    unclaimedRewards: stats.unclaimedRewards,

    // Handlers
    handleCategorySelect,
    handleAchievementPress,
    refreshAchievements,
    claimReward,
  };
};
