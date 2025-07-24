/**
 * Daily Challenges Types
 * Type definitions for daily challenges functionality
 */

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'bonus';
  progress: number;
  maxProgress: number;
  reward: number;
  isCompleted: boolean;
  expiresIn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export interface ChallengeTab {
  key: string;
  label: string;
  challenges: Challenge[];
}

export type ChallengeType = 'daily' | 'weekly' | 'bonus';
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';
export type TabKey = 'today' | 'weekly' | 'bonus';
