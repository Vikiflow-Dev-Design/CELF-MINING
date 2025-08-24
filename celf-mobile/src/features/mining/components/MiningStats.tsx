/**
 * Mining Stats Component
 * Shows mining statistics and status
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { miningService } from '@/services/miningService';
import Animated, { SharedValue } from 'react-native-reanimated';

interface MiningStatsProps {
  isMining: boolean;
  miningRate: number;
  totalEarned: number;
  runtime: string;
  countdown: string;
  tokensPerSecond: number;
  statusIndicatorOpacity: SharedValue<number>;
}

export const MiningStats: React.FC<MiningStatsProps> = ({
  isMining,
  miningRate,
  totalEarned,
  runtime,
  countdown,
  tokensPerSecond,
  statusIndicatorOpacity,
}) => {
  const StatRow: React.FC<{ label: string; value: string; color?: string }> = ({
    label,
    value,
    color,
  }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Typography variant="bodyMedium" color="secondary">
        {label}
      </Typography>
      <Typography 
        variant="bodyMedium" 
        weight="semibold"
        color={color as any}>
        {value}
      </Typography>
    </View>
  );

  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Mining Statistics
      </Typography>

      <View style={{ gap: Spacing.md }}>
        <StatRow 
          label="Mining Rate" 
          value={`${miningRate} CELF/hour`} 
        />

        {/* Mining Status Indicator */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant="bodyMedium" color="secondary">
            Status
          </Typography>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
            <Animated.View
              style={[
                {
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: isMining ? Colors.secondary.success : Colors.text.tertiary,
                },
                { opacity: statusIndicatorOpacity }
              ]}
            />
            <Typography variant="bodyMedium" weight="semibold">
              {isMining ? 'Mining Active' : 'Mining Inactive'}
            </Typography>
          </View>
        </View>

        <StatRow 
          label="Session Earnings" 
          value={`${miningService.formatBalance(totalEarned)} CELF`}
          color="success"
        />

        <StatRow
          label="Runtime"
          value={runtime}
        />

        <StatRow
          label="Time Remaining"
          value={countdown}
          color={isMining ? "warning" : "secondary"}
        />

        <StatRow
          label="Tokens per second"
          value={tokensPerSecond.toFixed(6)}
        />
      </View>
    </Card>
  );
};
