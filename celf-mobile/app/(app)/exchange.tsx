/**
 * Exchange Screen - Refactored
 * Reduced from 494 lines to ~60 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';

// Extracted components
import {
  ExchangeHeader,
  ExchangeDirection,
  ExchangeForm,
} from '@/src/features/exchange/components';

// Extracted hook
import { useExchange } from '@/src/features/exchange/hooks/useExchange';

export default function ExchangeScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();

  // All business logic extracted to custom hook
  const {
    exchangeAmount,
    exchangeDirection,
    exchangeData,
    setExchangeAmount,
    handleMaxPress,
    handleQuickAmount,
    handleExchange,
    handleDirectionSwap,
  } = useExchange();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Exchange"
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
        <ExchangeHeader />

        <ExchangeDirection
          exchangeDirection={exchangeDirection}
          exchangeData={exchangeData}
          onDirectionSwap={handleDirectionSwap}
        />

        <ExchangeForm
          exchangeAmount={exchangeAmount}
          exchangeData={exchangeData}
          onAmountChange={setExchangeAmount}
          onMaxPress={handleMaxPress}
          onQuickAmount={handleQuickAmount}
          onExchange={handleExchange}
        />
      </ScrollView>
    </View>
  );
}
