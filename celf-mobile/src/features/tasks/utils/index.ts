/**
 * Tasks Utilities
 * Helper functions for tasks feature
 */

import { Colors } from '@/constants/design-tokens';
import type { Task } from '../types';

/**
 * Get category color based on task category
 */
export function getCategoryColor(category: string): string {
  switch (category) {
    case 'mining':
      return Colors.secondary.warning; // Orange
    case 'social':
      return Colors.secondary.success; // Green
    case 'wallet':
      return Colors.primary.blue; // Blue
    case 'milestone':
      return Colors.secondary.error; // Red
    default:
      return Colors.primary.blue;
  }
}

/**
 * Get category name for display
 */
export function getCategoryName(category: string): string {
  switch (category) {
    case 'mining':
      return 'Mining';
    case 'social':
      return 'Social';
    case 'wallet':
      return 'Wallet';
    case 'milestone':
      return 'Milestone';
    default:
      return 'Unknown';
  }
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(task: Task): number {
  if (task.maxProgress === 0) return 0;
  return Math.min((task.progress / task.maxProgress) * 100, 100);
}

/**
 * Get progress text for display
 */
export function getProgressText(task: Task): string {
  if (task.isCompleted) {
    return 'Completed';
  }
  
  return `${task.progress}/${task.maxProgress}`;
}

/**
 * Format reward amount
 */
export function formatReward(reward: number): string {
  if (reward >= 1000) {
    return `${(reward / 1000).toFixed(1)}K`;
  }
  return reward.toString();
}

/**
 * Get task status text
 */
export function getTaskStatus(task: Task): string {
  if (task.rewardClaimed) {
    return 'Reward Claimed';
  }
  
  if (task.isCompleted) {
    return 'Ready to Claim';
  }
  
  const percentage = calculateProgress(task);
  if (percentage === 0) {
    return 'Not Started';
  }
  
  if (percentage < 100) {
    return 'In Progress';
  }
  
  return 'Completed';
}

/**
 * Get task status color
 */
export function getTaskStatusColor(task: Task): string {
  if (task.rewardClaimed) {
    return Colors.neutral.gray;
  }
  
  if (task.isCompleted) {
    return Colors.secondary.success;
  }
  
  const percentage = calculateProgress(task);
  if (percentage === 0) {
    return Colors.neutral.gray;
  }
  
  if (percentage < 100) {
    return Colors.secondary.warning;
  }
  
  return Colors.secondary.success;
}

/**
 * Sort tasks by priority (completed last, highest reward first)
 */
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    // Completed tasks go to the bottom
    if (a.isCompleted && !b.isCompleted) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;
    
    // Within same completion status, sort by reward (highest first)
    return b.reward - a.reward;
  });
}

/**
 * Filter tasks by category
 */
export function filterTasksByCategory(tasks: Task[], category: string): Task[] {
  if (category === 'all') {
    return tasks;
  }
  
  return tasks.filter(task => task.category === category);
}

/**
 * Get tasks statistics
 */
export function getTasksStatistics(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.isCompleted).length;
  const unclaimed = tasks.filter(task => task.isCompleted && !task.rewardClaimed).length;
  const totalRewards = tasks
    .filter(task => task.isCompleted && !task.rewardClaimed)
    .reduce((sum, task) => sum + task.reward, 0);
  
  return {
    total,
    completed,
    unclaimed,
    totalRewards,
    completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
