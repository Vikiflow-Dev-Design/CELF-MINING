/**
 * Profile Hook
 */

import { router } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { performDirectLogout } from '@/utils/logout';

export const useProfile = () => {
  const { user, isLoading } = useAuthStore();

  // Use real user data from auth store, with fallbacks for missing data
  const profileData = {
    profilePicture: null,
    username: user?.email?.split('@')[0] || 'user',
    displayName: `${user?.firstName || 'User'} ${user?.lastName || ''}`.trim(),
    bio: 'CELF mining enthusiast and crypto investor.',
    email: user?.email || 'user@example.com',
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2024-12-15',
    totalMined: 1250.75, // TODO: Connect to wallet store
    referrals: 12, // TODO: Connect to referral system
    achievements: 8, // TODO: Connect to achievements system
  };

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
    profileData,
    menuItems,
    handleMenuPress,
    handleLogout,
    isLoading, // Expose loading state for UI
  };
};
