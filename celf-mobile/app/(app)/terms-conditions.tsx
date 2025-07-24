/**
 * Terms & Conditions Screen - Refactored
 * Reduced from 440 lines to ~60 lines by extracting components and logic
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
  TermsHeader,
  AcceptanceStatus,
  TermsSections,
  FullTermsAccess,
  QuickAcceptance,
} from '@/src/features/terms-conditions/components';

// Extracted hook
import { useTermsConditions } from '@/src/features/terms-conditions/hooks/useTermsConditions';

export default function TermsConditionsScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  
  // All business logic extracted to custom hook
  const {
    hasAccepted,
    handleSectionPress,
    handleFullTermsPress,
    handleDownloadPress,
    handleAcceptTermsPress,
  } = useTermsConditions();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Terms & Conditions"
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
          
          <TermsHeader />

          <AcceptanceStatus 
            hasAccepted={hasAccepted}
            onAccept={handleAcceptTermsPress}
          />

          <TermsSections onSectionPress={handleSectionPress} />

          <FullTermsAccess 
            onReadFullTerms={handleFullTermsPress}
            onDownload={handleDownloadPress}
          />

          <QuickAcceptance 
            hasAccepted={hasAccepted}
            onAccept={handleAcceptTermsPress}
          />
        </View>
      </ScrollView>
    </View>
  );
}
