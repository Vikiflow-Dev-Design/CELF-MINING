/**
 * Mining Screen - Refactored
 * Reduced from 605 lines to ~70 lines by extracting components and logic
 */

import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

// Extracted components
import {
  BalanceCard,
  MiningButton,
  MiningStats,
  QuickActions,
  Socials,
} from '@/src/features/mining/components';

// Extracted hook
import { useMining } from '@/src/features/mining/hooks/useMining';

export default function MiningScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);
  
  // All business logic extracted to custom hook
  const {
    // State
    isMining,
    totalBalance,
    totalEarned,
    runtime,
    countdown,
    miningRate,
    timeRemaining,
    tokensPerSecond,

    // Animation values
    miningButtonScale,
    timerOpacity,
    timerScale,
    statusIndicatorOpacity,

    // Handlers
    handleMiningToggle,
    handleSettingsPress,
    handleQuickActionPress,
    refreshMiningData,
    handleTwitterPress,
    handleTelegramPress,
    handleDiscordPress,
    handleYouTubePress,
  } = useMining();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshMiningData();
    setRefreshing(false);
  }, [refreshMiningData]);

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Mining"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity
            onPress={handleSettingsPress}
            style={{
              width: 40,
              height: 40,
              backgroundColor: themeColors.background.tertiary,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="settings-outline" size={20} color={themeColors.icon.secondary} />
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
        <View
          style={{
            paddingHorizontal: Layout.screenMargin.mobile,
            paddingTop: Spacing['2xl'],
            paddingBottom: 32,
          }}>
          
          <BalanceCard totalBalance={totalBalance} />

          <MiningButton
            isMining={isMining}
            timeRemaining={timeRemaining}
            miningButtonScale={miningButtonScale}
            timerOpacity={timerOpacity}
            timerScale={timerScale}
            onPress={handleMiningToggle}
          />

          <MiningStats
            isMining={isMining}
            miningRate={miningRate}
            totalEarned={totalEarned}
            runtime={runtime}
            countdown={countdown}
            tokensPerSecond={tokensPerSecond}
            statusIndicatorOpacity={statusIndicatorOpacity}
          />

          <QuickActions onActionPress={handleQuickActionPress} />

          <Socials
            onTwitterPress={handleTwitterPress}
            onTelegramPress={handleTelegramPress}
            onDiscordPress={handleDiscordPress}
            onYouTubePress={handleYouTubePress}
          />
        </View>
      </ScrollView>
    </View>
  );
}
