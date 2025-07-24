/**
 * Privacy Policy Screen - Refactored
 * Reduced from 528 lines to ~60 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';

// Extracted components
import {
  PrivacyHeader,
  DataUsageOverview,
  PrivacyControls,
  PrivacySections,
  FullPrivacyPolicy,
  DataRights,
} from '@/src/features/privacy-policy/components';

// Extracted hook
import { usePrivacyPolicy } from '@/src/features/privacy-policy/hooks/usePrivacyPolicy';

export default function PrivacyPolicyScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  
  // All business logic extracted to custom hook
  const {
    privacyControls,
    togglePrivacyControl,
    handleSectionPress,
    handleFullPrivacyPolicyPress,
    handleDownloadPress,
    handleDataExportPress,
    handleDataDeletionPress,
  } = usePrivacyPolicy();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Privacy Policy"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          <PrivacyHeader />

          <DataUsageOverview />

          <PrivacyControls 
            controls={privacyControls}
            onToggle={togglePrivacyControl}
          />

          <PrivacySections onSectionPress={handleSectionPress} />

          <FullPrivacyPolicy 
            onReadFullPolicy={handleFullPrivacyPolicyPress}
            onDownload={handleDownloadPress}
          />

          <DataRights 
            onDataExport={handleDataExportPress}
            onDataDeletion={handleDataDeletionPress}
          />
        </View>
      </ScrollView>
    </View>
  );
}
