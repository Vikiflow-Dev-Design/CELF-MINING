/**
 * Data Usage Overview Component
 * Shows overview of data usage types
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

export const DataUsageOverview: React.FC = () => {
  const DataRow: React.FC<{ label: string; value: string; color: string }> = ({
    label,
    value,
    color,
  }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="bodyMedium" color="secondary">{label}</Typography>
      <Typography variant="bodyMedium" weight="semibold" style={{ color }}>
        {value}
      </Typography>
    </View>
  );

  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.secondary.info + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons name="pie-chart" size={20} color={Colors.secondary.info} />
        </View>
        <Typography variant="h3" weight="semibold">
          Data Usage Overview
        </Typography>
      </View>
      
      <View style={{ gap: Spacing.md }}>
        <DataRow 
          label="Personal Data" 
          value="Required for account" 
          color={Colors.secondary.error} 
        />
        <DataRow 
          label="Usage Analytics" 
          value="Optional" 
          color={Colors.secondary.warning} 
        />
        <DataRow 
          label="Device Information" 
          value="For security" 
          color={Colors.secondary.info} 
        />
        <DataRow 
          label="Marketing Data" 
          value="Opt-in only" 
          color={Colors.secondary.success} 
        />
      </View>
    </Card>
  );
};
