/**
 * Achievements Types
 * TypeScript interfaces for achievements functionality
 */

export interface Achievement {
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
}

export interface AchievementCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
}

export type CategoryKey = 'all' | 'mining' | 'social' | 'wallet' | 'milestone';
