/**
 * Maintenance Header Component
 * Shows maintenance icon, title and description
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing, shadows } from '@/constants/design-tokens';

export const MaintenanceHeader: React.FC = () => {
  return (
    <View style={{ alignItems: 'center', marginBottom: Spacing.xl }}>
      <View style={{
        width: 96,
        height: 96,
        backgroundColor: Colors.secondary.warning + '20',
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
        ...shadows.md
      }}>
        <Ionicons
          name="construct-outline"
          size={48}
          color={Colors.secondary.warning}
        />
      </View>

      <Typography
        variant="h1"
        color="primary"
        weight="bold"
        align="center"
        style={{ marginBottom: Spacing.sm }}
      >
        Under Maintenance
      </Typography>

      <Typography
        variant="bodyLarge"
        color="secondary"
        align="center"
        style={{ lineHeight: 24 }}
      >
        We're currently performing scheduled maintenance to improve your experience.
      </Typography>
    </View>
  );
};
