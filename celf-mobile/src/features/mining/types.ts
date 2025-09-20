/**
 * Mining Screen Types
 * Type definitions for mining functionality
 */

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  description: string;
  onPress: string;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'error';
  route: string;
}

export interface MiningStats {
  miningRate: number;
  status: 'active' | 'inactive';
  sessionEarnings: number;
  runtime: string;
  tokensPerSecond: number;
}

export interface ProjectActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route?: string;
  url?: string;
}

export interface ProjectActivityCategory {
  category: string;
  items: ProjectActivity[];
}
