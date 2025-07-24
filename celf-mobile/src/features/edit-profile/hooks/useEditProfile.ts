/**
 * Edit Profile Hook
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import type { ProfileData } from '../types';

export const useEditProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    profilePicture: null,
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'CELF mining enthusiast and crypto investor. Building the future of digital currency!',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    joinDate: '2024-12-15',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateField('profilePicture', result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setHasChanges(false);
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 2000);
  };

  const discardChanges = () => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => router.back() }
        ]
      );
    } else {
      router.back();
    }
  };

  return {
    profileData,
    isLoading,
    hasChanges,
    updateField,
    pickImage,
    saveProfile,
    discardChanges,
  };
};

