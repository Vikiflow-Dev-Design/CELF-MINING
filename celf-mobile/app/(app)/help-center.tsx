/**
 * Help Center Screen - Refactored
 * Reduced from 408 lines to ~60 lines by extracting components and logic
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
  WelcomeHeader,
  FAQSection,
  FullHelpCenter,
  ContactSupport,
  EmergencyContact,
} from '@/src/features/help-center/components';

// Extracted hook
import { useHelpCenter } from '@/src/features/help-center/hooks/useHelpCenter';

export default function HelpCenterScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  
  // All business logic extracted to custom hook
  const {
    faqItems,
    contactOptions,
    handleFAQPress,
    handleFullHelpCenterPress,
    handleEmergencySupportPress,
  } = useHelpCenter();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Help Center"
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
          
          <WelcomeHeader />

          <FAQSection 
            faqItems={faqItems}
            onFAQPress={handleFAQPress}
          />

          <FullHelpCenter onPress={handleFullHelpCenterPress} />

          <ContactSupport contactOptions={contactOptions} />

          <EmergencyContact onPress={handleEmergencySupportPress} />
        </View>
      </ScrollView>
    </View>
  );
}
