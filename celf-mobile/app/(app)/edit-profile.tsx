/**
 * Edit Profile Screen - Refactored
 * Reduced from 404 lines to ~60 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

// Extracted components
import ProfilePictureSection from '@/src/features/edit-profile/components/ProfilePictureSection';
import ProfileForm from '@/src/features/edit-profile/components/ProfileForm';

// Extracted hook
import {useEditProfile}  from '@/src/features/edit-profile/hooks/useEditProfile';


export default function EditProfileScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  
  // All business logic extracted to custom hook
  const {
    profileData,
    isLoading,
    isFetching,
    hasChanges,
    updateField,
    pickImage,
    saveProfile,
    discardChanges,
  } = useEditProfile();

  // Show loading state while fetching profile data
  if (isFetching) {
    return (
      <View style={{ flex: 1, backgroundColor: themeColors.background.secondary, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h3" style={{ marginBottom: Spacing.md }}>
          Loading Profile...
        </Typography>
        <Typography variant="bodyMedium" color="secondary">
          Please wait while we fetch your profile data.
        </Typography>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Edit Profile"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={discardChanges}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          <ProfilePictureSection
            profilePicture={profileData.profilePicture}
            onPickImage={pickImage}
          />

          <ProfileForm
            profileData={profileData}
            onUpdateField={updateField}
          />

          <View style={{ gap: Spacing.md }}>
            <Button
              title={isLoading ? "Saving..." : "Save Changes"}
              onPress={saveProfile}
              variant="primary"
              disabled={!hasChanges || isLoading}
              loading={isLoading}
              icon={!isLoading ? <Ionicons name="checkmark" size={20} color={Colors.neutral.white} /> : undefined}
            />
            
            <Button
              title="Cancel"
              onPress={discardChanges}
              variant="secondary"
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
