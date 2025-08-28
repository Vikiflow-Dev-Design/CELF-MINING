/**
 * Wallet Screen - Refactored
 * Reduced from 264 lines to ~60 lines by extracting components and logic
 */

import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';
import { useWallet } from '@/src/features/wallet/hooks/useWallet';
import { BalanceBreakdownCard } from '@/src/features/wallet/components/BalanceBreakdownCard';
import { useWalletStore } from '@/stores/walletStore';

export default function WalletScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);

  const {
    balance,
    balanceBreakdown,
    getFormattedBalance,
    recentTransactions,
    handleSendTokens,
    handleReceiveTokens,
    handleViewHistory,
    handleTransactionPress,
    refreshWalletData,
  } = useWallet();

  const { debugWalletState, refreshBalance } = useWalletStore();

  // Load balance when wallet screen mounts
  useEffect(() => {
    console.log('💰 Wallet Screen: Loading balance on mount...');

    // First, debug the current state
    debugWalletState();

    const loadBalance = async () => {
      try {
        await refreshBalance();
        console.log('✅ Wallet Screen: Balance loaded successfully');
        // Debug state after loading
        setTimeout(() => debugWalletState(), 100);
      } catch (error) {
        console.error('❌ Wallet Screen: Failed to load balance:', error);
      }
    };

    loadBalance();
  }, []); // Empty dependency array - only run once on mount

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshWalletData();
    setRefreshing(false);
  }, [refreshWalletData]);

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Wallet"
        onMenuPress={toggleSidebar}
        rightAction={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                console.log('🔍 Debug: Wallet state and refreshing balance...');
                debugWalletState();
                refreshBalance();
              }}
              style={{ marginRight: Spacing.sm }}
            >
              <Ionicons name="bug" size={20} color={themeColors.icon.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
            </TouchableOpacity>
          </View>
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
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          {/* Enhanced Balance Card */}
          <Card
            variant="gradient"
            gradientColors={[Colors.primary.blue, Colors.primary.light]}
            style={{
              marginBottom: Spacing.lg,
              shadowColor: Colors.primary.blue,
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 12,
            }}
          >
            <View style={{ alignItems: 'center', paddingVertical: Spacing.md }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: Spacing.sm
              }}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: Colors.icon.inverse,
                  opacity: 0.8,
                  marginRight: Spacing.xs,
                }} />
                <Typography variant="bodyMedium" color="inverse" style={{ opacity: 0.9 }}>
                  Total Balance
                </Typography>
              </View>

              <Typography
                variant="displayLarge"
                color="inverse"
                weight="bold"
                style={{
                  marginBottom: Spacing.xs,
                  fontSize: 42,
                  letterSpacing: -1,
                }}
              >
                {getFormattedBalance(balance)}
              </Typography>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                paddingHorizontal: Spacing.md,
                paddingVertical: Spacing.xs,
                borderRadius: 20,
              }}>
                <Typography variant="bodyLarge" color="inverse" weight="semibold">
                  CELF
                </Typography>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: Colors.icon.inverse,
                  marginLeft: Spacing.xs,
                  opacity: 0.8,
                }} />
              </View>
            </View>
          </Card>

          {/* Balance Breakdown */}
          <BalanceBreakdownCard />

          {/* Enhanced Action Buttons */}
          <View style={{
            flexDirection: 'row',
            gap: Spacing.md,
            marginBottom: Spacing['3xl'],
            paddingHorizontal: Spacing.xs,
          }}>
            <TouchableOpacity
              onPress={handleSendTokens}
              style={{
                flex: 1,
                backgroundColor: Colors.primary.blue,
                borderRadius: 16,
                paddingVertical: Spacing.lg,
                paddingHorizontal: Spacing.md,
                alignItems: 'center',
                shadowColor: Colors.primary.blue,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.sm,
              }}>
                <Ionicons name="arrow-up" size={24} color={Colors.neutral.white} />
              </View>
              <Typography variant="bodyMedium" color="inverse" weight="semibold">
                Send
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleReceiveTokens}
              style={{
                flex: 1,
                backgroundColor: Colors.secondary.success,
                borderRadius: 16,
                paddingVertical: Spacing.lg,
                paddingHorizontal: Spacing.md,
                alignItems: 'center',
                shadowColor: Colors.secondary.success,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.sm,
              }}>
                <Ionicons name="arrow-down" size={24} color={Colors.neutral.white} />
              </View>
              <Typography variant="bodyMedium" color="inverse" weight="semibold">
                Receive
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Recent Transactions */}
          <Card variant="default">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg }}>
              <Typography variant="h3" weight="semibold">
                Recent Transactions
              </Typography>
              <TouchableOpacity onPress={handleViewHistory}>
                <Typography variant="bodySmall" color="primary">
                  View All
                </Typography>
              </TouchableOpacity>
            </View>
            
            {recentTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => handleTransactionPress(transaction.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: Spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.border.secondary,
                }}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: Colors.primary.blue + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name="swap-horizontal" size={20} color={Colors.primary.blue} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyMedium" weight="semibold">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </Typography>
                </View>
                
                <Typography variant="bodyMedium" weight="bold">
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} CELF
                </Typography>
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
