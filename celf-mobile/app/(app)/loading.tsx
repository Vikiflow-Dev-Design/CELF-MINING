/**
 * Loading Screen - Refactored
 * Reduced from 352 lines to ~30 lines by extracting components and logic
 */

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

export default function LoadingScreen() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: Colors.background.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" color={Colors.primary.blue} />
      <Typography variant="bodyLarge" style={{ marginTop: Spacing.lg }}>
        Loading...
      </Typography>
    </View>
  );
}
