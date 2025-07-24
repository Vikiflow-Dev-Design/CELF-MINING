/**
 * Splash Screen - Simplified
 * Simple splash screen without complex components
 */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Typography } from '@/components/ui';
import { Colors, Layout, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function SplashScreen() {
  const themeColors = useThemeColors();

  useEffect(() => {
    // Navigate to main app after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/mining');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[themeColors.primary.blue, themeColors.primary.light]}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Layout.screenMargin.mobile,
      }}
    >
      {/* App Logo */}
      <View style={{
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing['3xl'],
      }}>
        <Typography variant="h1" color="inverse" weight="bold">
          CELF
        </Typography>
      </View>

      {/* App Tagline */}
      <Typography variant="h3" color="inverse" align="center" style={{ marginBottom: Spacing.lg }}>
        Next-Generation Crypto Mining
      </Typography>

      {/* Version */}
      <View style={{ position: 'absolute', bottom: 50 }}>
        <Typography variant="bodySmall" color="inverse" align="center">
          Version 1.0.0
        </Typography>
      </View>
    </LinearGradient>
  );
}
