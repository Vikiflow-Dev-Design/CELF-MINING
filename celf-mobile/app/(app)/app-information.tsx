/**
 * App Information Screen - Refactored
 * Reduced from 430 lines to ~50 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Layout, Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';

// Extracted components
import {
  WhatsNewCard,
  QuickActionsCard,
  AppVersionCard
} from '@/src/features/app-information/components';

// Extracted data and logic
import { whatsNewItems } from '@/src/features/app-information/data';
import { useAppInfo } from '@/src/features/app-information/hooks/useAppInfo';

export default function AppInformationScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  
  // All business logic extracted to custom hook
  const {
    appInfo,
    updateInfo,
    openFullAppInfo,
    checkForUpdates,
    openChangelog,
  } = useAppInfo();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="App Information"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing.lg,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: Spacing['3xl'] }}>
          <AppVersionCard
            appInfo={appInfo}
            updateInfo={updateInfo}
            onCheckUpdates={checkForUpdates}
            onOpenFullInfo={openFullAppInfo}
          />
        </View>

        <View style={{ marginBottom: Spacing['3xl'] }}>
          <WhatsNewCard
            items={whatsNewItems}
            onOpenChangelog={openChangelog}
          />
        </View>

        <QuickActionsCard
          onOpenChangelog={openChangelog}
        />
      </ScrollView>
    </View>
  );
}
