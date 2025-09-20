/**
 * Profile Hook
 */

import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { performDirectLogout } from '@/utils/logout';
import { apiService } from '@/services/apiService';

export const useProfile = () => {
  const { user, isLoading: authLoading } = useAuthStore();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data from API
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('📋 Fetching profile data from API...');
      const response = await apiService.getProfile();

      if (response.success && response.data) {
        console.log('✅ Profile data fetched successfully:', response.data);
        setProfileData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch profile');
      }
    } catch (err) {
      console.error('❌ Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');

      // Fallback to auth store data
      const fallbackData = {
        profilePicture: null,
        username: user?.email?.split('@')[0] || 'user',
        displayName: `${user?.firstName || 'User'} ${user?.lastName || ''}`.trim(),
        bio: 'CELF mining enthusiast and crypto investor.',
        email: user?.email || 'user@example.com',
        joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2024-12-15',
        totalMined: 0,
        referrals: 0,
      };
      setProfileData(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    if (user && !authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const menuItems = [
    { id: 'edit-profile', title: 'Edit Profile', icon: 'person-outline', route: '/edit-profile' },
    { id: 'privacy', title: 'Privacy Policy', icon: 'shield-outline', route: '/privacy-policy' },
    { id: 'terms', title: 'Terms & Conditions', icon: 'document-text-outline', route: '/terms-conditions' },
    { id: 'help', title: 'Help Center', icon: 'help-circle-outline', route: '/help-center' },
    { id: 'about', title: 'About CELF', icon: 'information-circle-outline', route: '/about' },
    { id: 'app-info', title: 'App Information', icon: 'phone-portrait-outline', route: '/app-information' },
  ];

  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  const handleLogout = async () => {
    console.log('🧪 Testing utility-based direct logout...');
    try {
      await performDirectLogout('Profile Screen');
      console.log('✅ Utility direct logout completed');
    } catch (error) {
      console.error('❌ Utility direct logout failed:', error);
    }
  };

  return {
    profileData: profileData || {
      profilePicture: null,
      username: 'user',
      displayName: 'User',
      bio: 'CELF mining enthusiast and crypto investor.',
      email: 'user@example.com',
      joinDate: '2024-12-15',
      totalMined: 0,
      referrals: 0,
    },
    menuItems,
    handleMenuPress,
    handleLogout,
    isLoading,
    error,
    refreshProfile: fetchProfile,
  };
};
