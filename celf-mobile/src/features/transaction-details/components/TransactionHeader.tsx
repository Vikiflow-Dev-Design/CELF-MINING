/**
 * Transaction Header Component
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import type { TransactionDetail } from '../types';

interface TransactionHeaderProps {
  transaction: TransactionDetail;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({ transaction }) => {
  const getTypeColor = () => {
    switch (transaction.type) {
      case 'sent': return Colors.secondary.error;
      case 'received': return Colors.secondary.success;
      case 'mining': return Colors.secondary.warning;
      case 'referral': return Colors.primary.blue;
      default: return Colors.text.primary;
    }
  };

  const getTypeIcon = () => {
    switch (transaction.type) {
      case 'sent': return 'arrow-up';
      case 'received': return 'arrow-down';
      case 'mining': return 'diamond';
      case 'referral': return 'people';
      default: return 'swap-horizontal';
    }
  };

  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: getTypeColor() + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Spacing.lg,
        }}>
          <Ionicons name={getTypeIcon() as any} size={40} color={getTypeColor()} />
        </View>
        
        <Typography variant="h1" weight="bold" style={{ color: getTypeColor(), marginBottom: Spacing.sm }}>
          {transaction.type === 'sent' ? '-' : '+'}{transaction.amount} CELF
        </Typography>
        
        <Typography variant="bodyLarge" style={{ textTransform: 'capitalize', marginBottom: Spacing.sm }}>
          {transaction.type} Transaction
        </Typography>
        
        <View style={{
          backgroundColor: transaction.status === 'completed' ? Colors.secondary.success + '20' : Colors.secondary.warning + '20',
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          borderRadius: 20,
        }}>
          <Typography variant="bodySmall" weight="semibold" style={{
            color: transaction.status === 'completed' ? Colors.secondary.success : Colors.secondary.warning,
            textTransform: 'uppercase',
          }}>
            {transaction.status}
          </Typography>
        </View>
      </View>
    </Card>
  );
};
