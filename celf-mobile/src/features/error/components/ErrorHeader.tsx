/**
 * Error Header Component
 * Shows error icon, title, message and error code
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import type { ErrorConfig } from '../types';

interface ErrorHeaderProps {
  config: ErrorConfig;
}

export const ErrorHeader: React.FC<ErrorHeaderProps> = ({ config }) => {
  return (
    <View style={{ alignItems: 'center', marginBottom: Spacing['2xl'] }}>
      <View style={{
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: config.color + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
      }}>
        <Ionicons name={config.icon as any} size={60} color={config.color} />
      </View>
      
      <Typography variant="h1" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.md }}>
        {config.title}
      </Typography>
      
      <Typography variant="bodyLarge" color="secondary" style={{ textAlign: 'center', lineHeight: 24 }}>
        {config.message}
      </Typography>
      
      {config.errorCode && (
        <View style={{
          backgroundColor: Colors.background.tertiary,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          borderRadius: BorderRadius.md,
          marginTop: Spacing.md,
        }}>
          <Typography variant="bodySmall" color="tertiary">
            Error Code: {config.errorCode}
          </Typography>
        </View>
      )}
    </View>
  );
};
