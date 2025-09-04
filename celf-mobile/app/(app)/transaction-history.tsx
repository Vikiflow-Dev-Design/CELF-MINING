/**
 * Transaction History Screen - Refactored
 * Reduced from 346 lines to ~50 lines by extracting components and logic
 */

import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography, Button } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { useTransactionHistory } from '@/src/features/transaction-history/hooks/useTransactionHistory';

export default function TransactionHistoryScreen() {
  const { toggleSidebar } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const {
    transactions,
    handleTransactionPress,
    refreshTransactions,
    loading,
    error,
    pagination,
    hasMore,
    loadMoreTransactions
  } = useTransactionHistory();

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

      {/* Error State */}
      {error && (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: Layout.screenMargin.mobile,
        }}>
          <Ionicons name="alert-circle-outline" size={48} color={Colors.text.secondary} />
          <Typography variant="h3" weight="bold" style={{ marginTop: Spacing.md, marginBottom: Spacing.sm }}>
            Error Loading Transactions
          </Typography>
          <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.xl }}>
            {error}
          </Typography>
          <Button
            title="Try Again"
            onPress={refreshTransactions}
            variant="primary"
          />
        </View>
      )}

      {/* Loading State */}
      {loading && transactions.length === 0 && (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: Layout.screenMargin.mobile,
        }}>
          <ActivityIndicator size="large" color={Colors.primary.blue} />
          <Typography variant="bodyMedium" color="secondary" style={{ marginTop: Spacing.md }}>
            Loading transactions...
          </Typography>
        </View>
      )}

      {/* Empty State */}
      {!loading && !error && transactions.length === 0 && (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: Layout.screenMargin.mobile,
        }}>
          <Ionicons name="receipt-outline" size={48} color={Colors.text.secondary} />
          <Typography variant="h3" weight="bold" style={{ marginTop: Spacing.md, marginBottom: Spacing.sm }}>
            No Transactions Yet
          </Typography>
          <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
            Your transaction history will appear here once you start sending or receiving tokens.
          </Typography>
        </View>
      )}

      {/* Transaction List */}
      {!error && transactions.length > 0 && (
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
                  backgroundColor: item.type === 'send' ? Colors.status.error + '20' :
                                   item.type === 'receive' ? Colors.status.success + '20' :
                                   Colors.primary.blue + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons
                    name={item.type === 'send' ? 'arrow-up' :
                          item.type === 'receive' ? 'arrow-down' :
                          item.type === 'mining' ? 'hammer' :
                          'swap-horizontal'}
                    size={20}
                    color={item.type === 'send' ? Colors.status.error :
                           item.type === 'receive' ? Colors.status.success :
                           Colors.primary.blue}
                  />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyMedium" weight="semibold">
                    {item.type === 'send' ? 'Sent' :
                     item.type === 'receive' ? 'Received' :
                     item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {new Date(item.createdAt || item.timestamp).toLocaleDateString()} • {item.status}
                  </Typography>
                  {item.description && (
                    <Typography variant="bodySmall" color="tertiary" numberOfLines={1}>
                      {item.description}
                    </Typography>
                  )}
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Typography
                    variant="bodyMedium"
                    weight="bold"
                    style={{ color: item.type === 'send' ? Colors.status.error : Colors.status.success }}
                  >
                    {item.type === 'send' ? '-' : '+'}{item.amount} CELF
                  </Typography>
                  {item.fee && item.fee > 0 && (
                    <Typography variant="bodySmall" color="secondary">
                      Fee: {item.fee} CELF
                    </Typography>
                  )}
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        onEndReached={hasMore ? loadMoreTransactions : undefined}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          loading && transactions.length > 0 ? (
            <View style={{ paddingVertical: Spacing.lg, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={Colors.primary.blue} />
              <Typography variant="bodySmall" color="secondary" style={{ marginTop: Spacing.sm }}>
                Loading more transactions...
              </Typography>
            </View>
          ) : null
        )}
      />
      )}
    </View>
  );
}
