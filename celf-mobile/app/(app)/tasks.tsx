/**
 * Tasks Screen - Refactored
 * Displays user tasks with filtering and progress tracking
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
import { StatsOverview, CategoryTabs, TaskCard } from '@/src/features/tasks/components';

// Extracted hook
import { useTasks } from '@/src/features/tasks/hooks/useTasks';

export default function TasksScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);

  const {
    tasks,
    categories,
    selectedCategory,
    completedCount,
    totalCount,
    totalRewards,
    completionPercentage,
    unclaimedRewards,
    loading,
    error,
    handleCategorySelect,
    handleTaskPress,
    refreshTasks,
    claimReward,
  } = useTasks();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshTasks();
    setRefreshing(false);
  }, [refreshTasks]);

  const renderTask = ({ item }: { item: any }) => (
    <TaskCard
      task={item}
      onPress={handleTaskPress}
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

  const ListEmptyComponent = () => {
    if (loading) {
      return (
        <View style={{
          alignItems: 'center',
          paddingTop: Spacing['3xl'],
          paddingHorizontal: Layout.screenMargin.mobile,
        }}>
          <Ionicons name="hourglass-outline" size={64} color={themeColors.icon.tertiary} />
          <Typography variant="h3" weight="semibold" style={{
            marginTop: Spacing.lg,
            marginBottom: Spacing.sm,
            textAlign: 'center',
          }}>
            Loading achievements...
          </Typography>
          <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
            Please wait while we fetch your achievements
          </Typography>
        </View>
      );
    }

    if (error) {
      return (
        <View style={{
          alignItems: 'center',
          paddingTop: Spacing['3xl'],
          paddingHorizontal: Layout.screenMargin.mobile,
        }}>
          <Ionicons name="alert-circle-outline" size={64} color={themeColors.icon.tertiary} />
          <Typography variant="h3" weight="semibold" style={{
            marginTop: Spacing.lg,
            marginBottom: Spacing.sm,
            textAlign: 'center',
          }}>
            Failed to load achievements
          </Typography>
          <Typography variant="bodyMedium" color="secondary" style={{
            textAlign: 'center',
            marginBottom: Spacing.lg,
          }}>
            {error}
          </Typography>
          <TouchableOpacity
            onPress={refreshAchievements}
            style={{
              backgroundColor: themeColors.primary.blue,
              paddingHorizontal: Spacing.lg,
              paddingVertical: Spacing.sm,
              borderRadius: 8,
            }}
          >
            <Typography variant="bodyMedium" color="inverse" weight="semibold">
              Try Again
            </Typography>
          </TouchableOpacity>
        </View>
      );
    }

    return (
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
          No tasks found
        </Typography>
        <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
          Try selecting a different category
        </Typography>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Tasks"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={tasks}
        renderItem={renderTask}
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
