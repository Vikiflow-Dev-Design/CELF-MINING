/**
 * Update Screen - Simplified
 * Simple update screen without complex components
 */

import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Typography, Button } from '@/components/ui';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function UpdateScreen() {
  const themeColors = useThemeColors();

  const handleContinue = () => {
    router.replace('/mining');
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: themeColors.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Layout.screenMargin.mobile,
    }}>
      {/* Update Icon */}
      <View style={{
        width: 100,
        height: 100,
        backgroundColor: themeColors.primary.blue + '20',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing['3xl'],
      }}>
        <Typography variant="h2" color="primary" weight="bold">
          ↑
        </Typography>
      </View>

      {/* Update Title */}
      <Typography variant="h2" align="center" style={{ marginBottom: Spacing.lg }}>
        App Update Available
      </Typography>

      {/* Update Description */}
      <Typography variant="bodyLarge" color="secondary" align="center" style={{ marginBottom: Spacing['3xl'] }}>
        A new version of CELF is available with improved features and performance.
      </Typography>

      {/* Continue Button */}
      <Button
        title="Continue to CELF"
        variant="primary"
        onPress={handleContinue}
        style={{ width: '100%' }}
      />
    </View>
  );
}
