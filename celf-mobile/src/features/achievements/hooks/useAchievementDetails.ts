/**
 * Achievement Details Hook
 * Custom hook for achievement details functionality
 */

import { useState, useEffect } from 'react';
import { Alert, Share } from 'react-native';
import { router } from 'expo-router';
import { apiService } from '@/services/apiService';
import type { Achievement } from '../types';

export const useAchievementDetails = (achievementId: string) => {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch achievement details from API
  const fetchAchievementDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🏆 Fetching achievement details for ID:', achievementId);
      const response = await apiService.getAchievementDetails(achievementId);

      if (response.success && response.data) {
        console.log('✅ Achievement details fetched successfully:', response.data);
        setAchievement(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch achievement details');
      }
    } catch (err) {
      console.error('❌ Error fetching achievement details:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch achievement details');
    } finally {
      setLoading(false);
    }
  };

  // Fetch achievement details on mount
  useEffect(() => {
    if (achievementId) {
      fetchAchievementDetails();
    }
  }, [achievementId]);

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
  const handleClaimReward = async () => {
    if (!achievement || !achievement.isCompleted || achievement.rewardClaimed) return;

    try {
      console.log('🎁 Claiming reward for achievement:', achievement.id);
      const response = await apiService.claimAchievementReward(achievement.id);

      if (response.success && response.data) {
        Alert.alert(
          'Reward Claimed!',
          `You have successfully claimed ${response.data.reward} CELF tokens!`,
          [{
            text: 'OK',
            onPress: () => {
              // Refresh achievement details to update claimed status
              fetchAchievementDetails();
            }
          }]
        );
      } else {
        throw new Error(response.message || 'Failed to claim reward');
      }
    } catch (err) {
      console.error('❌ Error claiming reward:', err);
      Alert.alert(
        'Error',
        err instanceof Error ? err.message : 'Failed to claim reward. Please try again.',
        [{ text: 'OK' }]
      );
    }
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
    loading,
    error,

    // Handlers
    handleShareAchievement,
    handleClaimReward,
    handleViewAllAchievements,
    handleGoBack,
    fetchAchievementDetails,
  };
};
