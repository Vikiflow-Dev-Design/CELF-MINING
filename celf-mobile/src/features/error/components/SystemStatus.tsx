/**
 * System Status Component
 * Shows system status information
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import type { ErrorConfig } from '../types';

interface SystemStatusProps {
  config: ErrorConfig;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ config }) => {
  const StatusRow: React.FC<{ 
    label: string; 
    isOperational: boolean; 
    status: string;
  }> = ({ label, isOperational, status }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="bodyMedium" color="secondary">{label}</Typography>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: isOperational ? Colors.secondary.success : Colors.secondary.error,
          marginRight: Spacing.sm,
        }} />
        <Typography variant="bodySmall" weight="semibold">
          {status}
        </Typography>
      </View>
    </View>
  );

  return (
    <Card variant="default">
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.primary.blue + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons name="information-circle" size={20} color={Colors.primary.blue} />
        </View>
        <Typography variant="h3" weight="semibold">
          System Status
        </Typography>
      </View>
      
      <View style={{ gap: Spacing.md }}>
        <StatusRow 
          label="CELF Servers"
          isOperational={config.type !== 'server'}
          status={config.type === 'server' ? 'Issues Detected' : 'Operational'}
        />
        
        <StatusRow 
          label="Mining Network"
          isOperational={config.type !== 'mining'}
          status={config.type === 'mining' ? 'Degraded' : 'Operational'}
        />
        
        <StatusRow 
          label="Transaction Processing"
          isOperational={config.type !== 'transaction'}
          status={config.type === 'transaction' ? 'Issues Detected' : 'Operational'}
        />
      </View>
    </Card>
  );
};
