/**
 * Daily Challenges Screen - Refactored
 * Reduced from 421 lines to ~70 lines by extracting components and logic
 */

import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';

// Extracted components
import {
  ProgressOverview,
  TabNavigation,
  ChallengesList,
} from '@/src/features/daily-challenges/components';

// Extracted hook
import { useDailyChallenges } from '@/src/features/daily-challenges/hooks/useDailyChallenges';

export default function DailyChallengesScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);

  // All business logic extracted to custom hook
  const {
    selectedTab,
    currentChallenges,
    challengeTabs,
    todayStats,
    handleTabChange,
    handleChallengeStart,
    refreshChallenges,
  } = useDailyChallenges();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshChallenges();
    setRefreshing(false);
  }, [refreshChallenges]);

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Daily Challenges"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themeColors.primary.blue}
            colors={[themeColors.primary.blue]}
          />
        }
      >
        {/* Today's Progress */}
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing.lg,
          paddingBottom: Spacing.md,
        }}>
          <ProgressOverview
            completedToday={todayStats.completedToday}
            totalChallenges={todayStats.totalChallenges}
            totalRewardsToday={todayStats.totalRewardsToday}
          />
        </View>

        {/* Tab Navigation */}
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingBottom: Spacing.md,
        }}>
          <TabNavigation
            tabs={challengeTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
        </View>

        {/* Challenges List */}
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingBottom: 32,
        }}>
          <ChallengesList
            challenges={currentChallenges}
            onChallengePress={handleChallengeStart}
          />
        </View>
      </ScrollView>
    </View>
  );
}
