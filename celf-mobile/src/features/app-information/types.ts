/**
 * Types for App Information Screen
 */

export interface AppInfo {
  version: string;
  buildNumber: string;
  releaseDate: string;
}

export interface UpdateInfo {
  hasUpdate: boolean;
  latestVersion?: string;
  updateSize?: string;
  isRequired?: boolean;
}

export interface WhatsNewItem {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'bugfix';
  icon: string;
}

export type UpdateType = 'feature' | 'improvement' | 'bugfix';
