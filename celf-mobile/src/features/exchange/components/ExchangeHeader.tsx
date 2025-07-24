/**
 * Exchange Header Component
 * Header section with title and description
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

export const ExchangeHeader: React.FC = () => {
  return (
    <Card
      variant="gradient"
      gradientColors={[Colors.primary.blue, Colors.primary.light]}
      style={{
        backgroundColor: Colors.primary.blue,
        marginBottom: Spacing['2xl'],
        alignItems: 'center',
      }}
    >
      <View style={{ alignItems: 'center', paddingVertical: Spacing.md }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Spacing.lg,
        }}>
          <Ionicons name="swap-horizontal" size={40} color={Colors.neutral.white} />
        </View>

        <Typography
          variant="h2"
          color="inverse"
          weight="bold"
          style={{
            marginBottom: Spacing.sm,
            textAlign: 'center',
          }}
        >
          Exchange Tokens
        </Typography>

        <Typography
          variant="bodyMedium"
          color="inverse"
          style={{
            textAlign: 'center',
            opacity: 0.9,
            lineHeight: 22,
          }}
        >
          Convert between sendable and non-sendable balances.{'\n'}
          Tap the swap icon to change direction.
        </Typography>
      </View>
    </Card>
  );
};
