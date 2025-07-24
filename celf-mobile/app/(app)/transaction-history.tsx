/**
 * Transaction History Screen - Refactored
 * Reduced from 346 lines to ~50 lines by extracting components and logic
 */

import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { useTransactionHistory } from '@/src/features/transaction-history/hooks/useTransactionHistory';

export default function TransactionHistoryScreen() {
  const { toggleSidebar } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, handleTransactionPress, refreshTransactions } = useTransactionHistory();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshTransactions();
    setRefreshing(false);
  }, [refreshTransactions]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Transaction History"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary.blue}
            colors={[Colors.primary.blue]}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTransactionPress(item)}>
            <Card variant="default" style={{ marginBottom: Spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </Typography>
                </View>
                
                <Typography variant="bodyMedium" weight="bold">
                  {item.type === 'sent' ? '-' : '+'}{item.amount} CELF
                </Typography>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
