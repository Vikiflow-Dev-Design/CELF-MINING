/**
 * Data for App Information Screen
 */

import { AppInfo, UpdateInfo, WhatsNewItem } from './types';

// Website URL - to be updated when website is created
export const WEBSITE_URL = 'https://celf.app';
export const APP_INFO_URL = `${WEBSITE_URL}/app-info`;

// Mock app information
export const appInfo: AppInfo = {
  version: '1.0.0',
  buildNumber: '100',
  releaseDate: '2025-01-17',
};

// Mock update information
export const updateInfo: UpdateInfo = {
  hasUpdate: false,
  latestVersion: '1.0.1',
  updateSize: '25 MB',
  isRequired: false
};

// What's new items
export const whatsNewItems: WhatsNewItem[] = [
  {
    id: '1',
    title: 'Enhanced Mining Experience',
    description: 'Improved mining interface with better visual feedback and progress tracking',
    type: 'feature',
    icon: 'diamond'
  },
  {
    id: '2',
    title: 'Faster Transaction Processing',
    description: 'Optimized wallet operations for quicker send and receive transactions',
    type: 'improvement',
    icon: 'flash'
  },
  {
    id: '3',
    title: 'Achievement System',
    description: 'New gamification features with achievements and daily challenges',
    type: 'feature',
    icon: 'trophy'
  },
  {
    id: '4',
    title: 'Bug Fixes',
    description: 'Resolved various issues to improve app stability and performance',
    type: 'bugfix',
    icon: 'checkmark-circle'
  }
];
