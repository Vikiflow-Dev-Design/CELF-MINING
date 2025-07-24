/**
 * Maintenance Info Component
 * Shows estimated time for maintenance completion
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import type { MaintenanceInfo } from '../types';

interface MaintenanceInfoProps {
  maintenanceInfo: MaintenanceInfo;
}

export const MaintenanceInfoCard: React.FC<MaintenanceInfoProps> = ({ maintenanceInfo }) => {
  return (
    <Card style={{ marginBottom: Spacing.lg }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm
      }}>
        <Ionicons
          name="time-outline"
          size={20}
          color={Colors.secondary.warning}
        />
        <Typography
          variant="h4"
          color="warning"
          weight="semibold"
          style={{ marginLeft: Spacing.sm }}
        >
          Estimated Time
        </Typography>
      </View>
      <Typography variant="bodyMedium" color="secondary">
        Maintenance is expected to complete in approximately {maintenanceInfo.estimatedTime}.
      </Typography>
    </Card>
  );
};
