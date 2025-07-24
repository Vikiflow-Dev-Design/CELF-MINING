/**
 * Achievements Screen - Refactored
 * Displays user achievements with filtering and progress tracking
 */

import React, { useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';

// Extracted components
import { StatsOverview, CategoryTabs, AchievementCard } from '@/src/features/achievements/components';

// Extracted hook
import { useAchievements } from '@/src/features/achievements/hooks/useAchievements';

export default function AchievementsScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);

  const {
    achievements,
    categories,
    selectedCategory,
    completedCount,
    totalCount,
    totalRewards,
    completionPercentage,
    handleCategorySelect,
    handleAchievementPress,
    refreshAchievements,
  } = useAchievements();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshAchievements();
    setRefreshing(false);
  }, [refreshAchievements]);

  const renderAchievement = ({ item }: { item: any }) => (
    <AchievementCard
      achievement={item}
      onPress={handleAchievementPress}
    />
  );

  const ListHeaderComponent = () => (
    <View>
      {/* Stats Overview */}
      <View style={{
        paddingHorizontal: Layout.screenMargin.mobile,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.md,
      }}>
        <StatsOverview
          completedCount={completedCount}
          totalCount={totalCount}
          totalRewards={totalRewards}
          completionPercentage={completionPercentage}
        />
      </View>

      {/* Category Tabs */}
      <View style={{
        paddingBottom: Spacing.md,
      }}>
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={{
      alignItems: 'center',
      paddingTop: Spacing['3xl'],
      paddingHorizontal: Layout.screenMargin.mobile,
    }}>
      <Ionicons name="trophy-outline" size={64} color={themeColors.icon.tertiary} />
      <Typography variant="h3" weight="semibold" style={{
        marginTop: Spacing.lg,
        marginBottom: Spacing.sm,
        textAlign: 'center',
      }}>
        No achievements found
      </Typography>
      <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
        Try selecting a different category
      </Typography>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Achievements"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={achievements}
        renderItem={renderAchievement}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themeColors.primary.blue}
            colors={[themeColors.primary.blue]}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
