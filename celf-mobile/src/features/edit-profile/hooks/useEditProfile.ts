/**
 * Edit Profile Hook
 */

import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { apiService } from '@/services/apiService';
import type { ProfileData } from '../types';

export const useEditProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    profilePicture: null,
    username: '',
    displayName: '',
    bio: '',
    email: '',
    phone: '',
    country: '',
    joinDate: '',
  });

  const [originalData, setOriginalData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch current profile data
  const fetchProfileData = useCallback(async () => {
    try {
      setIsFetching(true);
      console.log('📋 Fetching profile data for editing...');

      const response = await apiService.getProfile();

      if (response.success && response.data) {
        const data: ProfileData = {
          profilePicture: response.data.profilePicture,
          username: response.data.username,
          displayName: response.data.displayName,
          bio: response.data.bio,
          email: response.data.email,
          phone: response.data.phone,
          country: response.data.country,
          joinDate: response.data.joinDate,
        };

        setProfileData(data);
        setOriginalData(data);
        console.log('✅ Profile data loaded for editing');
      } else {
        throw new Error(response.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('❌ Error fetching profile data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Load profile data on mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Check for changes whenever profile data updates
  useEffect(() => {
    if (originalData) {
      const hasDataChanged = JSON.stringify(profileData) !== JSON.stringify(originalData);
      setHasChanges(hasDataChanged);
    }
  }, [profileData, originalData]);

  const updateField = useCallback((field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  }, []);

  const pickImage = useCallback(async () => {
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
      const imageUri = result.assets[0].uri;

      try {
        // Upload profile picture to backend
        console.log('📸 Uploading profile picture...');
        const uploadResponse = await apiService.uploadProfilePicture(imageUri);

        if (uploadResponse.success) {
          updateField('profilePicture', uploadResponse.data.profilePicture);
          console.log('✅ Profile picture uploaded successfully');
        } else {
          throw new Error(uploadResponse.message || 'Failed to upload image');
        }
      } catch (error) {
        console.error('❌ Error uploading profile picture:', error);
        Alert.alert('Error', 'Failed to upload profile picture');
      }
    }
  }, [updateField]);

  const saveProfile = useCallback(async () => {
    if (!hasChanges) return;

    setIsLoading(true);

    try {
      console.log('💾 Saving profile changes...');

      // Prepare update data (only changed fields)
      const updateData: any = {};

      if (profileData.username !== originalData?.username) {
        updateData.username = profileData.username;
      }
      if (profileData.displayName !== originalData?.displayName) {
        updateData.displayName = profileData.displayName;
      }
      if (profileData.bio !== originalData?.bio) {
        updateData.bio = profileData.bio;
      }
      if (profileData.phone !== originalData?.phone) {
        updateData.phone = profileData.phone;
      }
      if (profileData.country !== originalData?.country) {
        updateData.country = profileData.country;
      }

      const response = await apiService.updateProfile(updateData);

      if (response.success) {
        console.log('✅ Profile updated successfully');
        setOriginalData(profileData);
        setHasChanges(false);

        Alert.alert('Success', 'Profile updated successfully!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  }, [hasChanges, profileData, originalData]);

  const discardChanges = useCallback(() => {
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
  }, [hasChanges]);

  return {
    profileData,
    isLoading,
    isFetching,
    hasChanges,
    updateField,
    pickImage,
    saveProfile,
    discardChanges,
    refreshProfile: fetchProfileData,
  };
};

