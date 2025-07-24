/**
 * Transaction Details Screen - Refactored
 * Reduced from 347 lines to ~50 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { TransactionHeader } from '@/src/features/transaction-details/components';
import { useTransactionDetails } from '@/src/features/transaction-details/hooks/useTransactionDetails';

export default function TransactionDetailsScreen() {
  const { toggleSidebar } = useNavigation();
  const { transaction, shareTransaction } = useTransactionDetails();

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
          <TransactionHeader transaction={transaction} />
          
          <Button
            title="Share Transaction"
            onPress={shareTransaction}
            variant="secondary"
            icon={<Ionicons name="share-outline" size={20} color={Colors.primary.blue} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
