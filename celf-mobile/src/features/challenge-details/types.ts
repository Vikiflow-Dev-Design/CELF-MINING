/**
 * Challenge Details Types
 * Type definitions for challenge details functionality
 */

export interface ChallengeDetail {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'bonus';
  progress: number;
  maxProgress: number;
  reward: number;
  isCompleted: boolean;
  isStarted: boolean;
  expiresIn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  instructions: string[];
  tips: string[];
  timeLimit?: string;
  category: string;
}

export type ChallengeType = 'daily' | 'weekly' | 'bonus';
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';
