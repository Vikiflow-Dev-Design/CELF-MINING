/**
 * Tasks Types
 * Type definitions for tasks feature
 */

export type CategoryKey = 'all' | 'mining' | 'social' | 'wallet' | 'milestone';

export interface Task {
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
  isLinkTask?: boolean;
  linkUrl?: string;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
  unclaimedRewards: number;
  totalUnclaimedRewardValue: number;
}

export interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
  color: string;
}

export interface TaskProgress {
  taskId: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  wasJustCompleted?: boolean;
}

export interface TaskReward {
  success: boolean;
  reward: number;
  message: string;
}
