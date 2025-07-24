/**
 * Maintenance Footer Component
 * Shows thank you message
 */

import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/ui';

export const MaintenanceFooter: React.FC = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Typography
        variant="caption"
        color="tertiary"
        align="center"
      >
        Thank you for your patience. We'll be back soon!
      </Typography>
    </View>
  );
};
