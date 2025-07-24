/**
 * Profile Hook
 */

import { router } from 'expo-router';
import { Alert } from 'react-native';

export const useProfile = () => {
  const profileData = {
    profilePicture: null,
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'CELF mining enthusiast and crypto investor.',
    email: 'john.doe@example.com',
    joinDate: '2024-12-15',
    totalMined: 1250.75,
    referrals: 12,
    achievements: 8,
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

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // Handle logout logic
          Alert.alert('Logged Out', 'You have been logged out successfully.');
        }}
      ]
    );
  };

  return {
    profileData,
    menuItems,
    handleMenuPress,
    handleLogout,
  };
};
