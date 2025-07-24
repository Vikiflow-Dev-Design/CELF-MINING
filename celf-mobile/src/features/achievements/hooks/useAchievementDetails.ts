/**
 * Achievement Details Hook
 * Custom hook for achievement details functionality
 */

import { Alert, Share } from 'react-native';
import { router } from 'expo-router';
import { achievements } from '../data';
import type { Achievement } from '../types';

export const useAchievementDetails = (achievementId: string) => {
  // Find achievement by ID
  const achievement = achievements.find(a => a.id === achievementId);

  // Handle share achievement
  const handleShareAchievement = async () => {
    if (!achievement) return;

    try {
      const message = achievement.isCompleted 
        ? `🎉 I just unlocked the "${achievement.title}" achievement in CELF! ${achievement.description}`
        : `💪 I'm working on the "${achievement.title}" achievement in CELF! ${achievement.description}`;

      await Share.share({
        message,
        title: 'CELF Achievement',
      });
    } catch (error) {
      console.error('Error sharing achievement:', error);
      Alert.alert('Error', 'Failed to share achievement');
    }
  };

  // Handle claim reward (for completed achievements)
  const handleClaimReward = () => {
    if (!achievement || !achievement.isCompleted) return;

    Alert.alert(
      'Reward Claimed!',
      `You have successfully claimed ${achievement.reward} CELF tokens!`,
      [{ text: 'OK' }]
    );
  };

  // Handle view all achievements
  const handleViewAllAchievements = () => {
    router.back(); // Go back to achievements list
  };

  // Handle go back
  const handleGoBack = () => {
    router.back();
  };

  return {
    // Data
    achievement,
    
    // Handlers
    handleShareAchievement,
    handleClaimReward,
    handleViewAllAchievements,
    handleGoBack,
  };
};
