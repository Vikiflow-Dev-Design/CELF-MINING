/**
 * Balance Card Component
 * Shows the user's total CELF balance
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Typography } from '@/components/ui';
import { Spacing } from '@/constants/design-tokens';
import { useWalletStore } from '@/stores/walletStore';

interface BalanceCardProps {
  totalBalance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  totalBalance,
}) => {
  const { getFormattedBalance } = useWalletStore();

  return (
    <Card variant="elevated" style={{ marginBottom: Spacing['3xl'] }}>
      <View style={{ alignItems: 'center' }}>
        <Typography
          variant="bodyMedium"
          color="secondary"
          style={{ marginBottom: Spacing.xs }}>
          Total Balance
        </Typography>
        <Typography
          variant="displayMedium"
          weight="bold"
          style={{ marginBottom: Spacing.xs }}>
          {getFormattedBalance(totalBalance)}
        </Typography>
        <Typography variant="bodyLarge" color="primary" weight="semibold">
          CELF
        </Typography>
      </View>
    </Card>
  );
};
