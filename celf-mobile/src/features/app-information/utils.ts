/**
 * Utility functions for App Information Screen
 */

import { Alert, Linking } from 'react-native';
import { Colors } from '@/constants/design-tokens';
import { UpdateType } from './types';
import { WEBSITE_URL } from './data';

export const getTypeColor = (type: UpdateType): string => {
  switch (type) {
    case 'feature': return Colors.secondary.success;
    case 'improvement': return Colors.secondary.info;
    case 'bugfix': return Colors.secondary.warning;
    default: return Colors.primary.blue;
  }
};

export const getTypeLabel = (type: UpdateType): string => {
  switch (type) {
    case 'feature': return 'NEW';
    case 'improvement': return 'IMPROVED';
    case 'bugfix': return 'FIXED';
    default: return 'UPDATE';
  }
};

export const openWebsite = async (url: string, title: string): Promise<void> => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', `Cannot open ${title}. Please check your internet connection.`);
    }
  } catch (error) {
    Alert.alert('Error', `Failed to open ${title}. Please try again later.`);
  }
};

export const shareApp = (): void => {
  const message = `Check out CELF - the next-generation crypto mining app! Download it now: ${WEBSITE_URL}`;
  
  // In a real app, you would use React Native's Share API
  Alert.alert('Share CELF', message);
};

export const openAppStore = (): void => {
  // In a real app, this would open the appropriate app store
  Alert.alert('App Store', 'This would open the app store for updates.');
};
