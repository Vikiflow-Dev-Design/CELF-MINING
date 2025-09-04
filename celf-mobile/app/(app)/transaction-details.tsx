/**
 * Transaction Details Screen - Refactored
 * Reduced from 347 lines to ~50 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { TransactionHeader } from '@/src/features/transaction-details/components';
import { useTransactionDetails } from '@/src/features/transaction-details/hooks/useTransactionDetails';

export default function TransactionDetailsScreen() {
  const { toggleSidebar } = useNavigation();
  const { transaction, shareTransaction, loading, error, refetch } = useTransactionDetails();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Transaction Details"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          {/* Loading State */}
          {loading && (
            <View style={{ alignItems: 'center', paddingVertical: Spacing.xl }}>
              <ActivityIndicator size="large" color={Colors.primary.blue} />
              <Typography variant="bodyMedium" color="secondary" style={{ marginTop: Spacing.md }}>
                Loading transaction details...
              </Typography>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View style={{ alignItems: 'center', paddingVertical: Spacing.xl }}>
              <Ionicons name="alert-circle-outline" size={48} color={Colors.text.secondary} />
              <Typography variant="h3" weight="bold" style={{ marginTop: Spacing.md, marginBottom: Spacing.sm }}>
                Error Loading Transaction
              </Typography>
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.xl }}>
                {error}
              </Typography>
              <Button
                title="Try Again"
                onPress={refetch}
                variant="primary"
              />
            </View>
          )}

          {/* Transaction Details */}
          {transaction && !loading && !error && (
            <>
              <TransactionHeader transaction={transaction} />

              <Button
                title="Share Transaction"
                onPress={shareTransaction}
                variant="secondary"
                icon={<Ionicons name="share-outline" size={20} color={Colors.primary.blue} />}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
