/**
 * Tasks Hook
 * Custom hook for tasks functionality
 */

import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { apiService } from '@/services/apiService';
import type { CategoryKey } from '../types';

interface Task {
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

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
  unclaimedRewards: number;
  totalUnclaimedRewardValue: number;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Computed values
  const completedCount = stats?.completedTasks || 0;
  const totalCount = stats?.totalTasks || 0;
  const totalRewards = stats?.totalUnclaimedRewardValue || 0;
  const completionPercentage = stats?.completionPercentage || 0;
  const unclaimedRewards = stats?.unclaimedRewards || 0;

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📋 Fetching tasks from API...');
      const response = await apiService.getTasks(selectedCategory);

      if (response.success && response.data) {
        console.log('✅ Tasks fetched successfully:', response.data);
        setTasks(response.data.tasks);
        setCategories(response.data.categories);
        setStats(response.data.stats);
      } else {
        throw new Error(response.message || 'Failed to fetch tasks');
      }
    } catch (err) {
      console.error('❌ Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');

      // Fallback to empty data
      setTasks([]);
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

  // Fetch tasks on mount and when category changes
  useEffect(() => {
    fetchTasks();
  }, [selectedCategory]);

  // Handle category selection
  const handleCategorySelect = (category: CategoryKey) => {
    setSelectedCategory(category);
  };

  // Handle task press
  const handleTaskPress = (taskId: string) => {
    router.push(`/task-details?id=${taskId}`);
  };

  // Refresh tasks
  const refreshTasks = async () => {
    await fetchTasks();
  };

  // Claim reward
  const claimReward = async (taskId: string) => {
    try {
      console.log('💰 Claiming reward for task:', taskId);
      const response = await apiService.claimTaskReward(taskId);

      if (response.success) {
        console.log('✅ Reward claimed successfully:', response.data);
        
        // Refresh tasks to update the UI
        await refreshTasks();
        
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to claim reward');
      }
    } catch (err) {
      console.error('❌ Error claiming reward:', err);
      throw err;
    }
  };

  return {
    // Data
    tasks,
    categories,
    selectedCategory,
    stats,
    
    // Computed values
    completedCount,
    totalCount,
    totalRewards,
    completionPercentage,
    unclaimedRewards,
    
    // State
    loading,
    error,
    
    // Actions
    handleCategorySelect,
    handleTaskPress,
    refreshTasks,
    claimReward,
  };
}
