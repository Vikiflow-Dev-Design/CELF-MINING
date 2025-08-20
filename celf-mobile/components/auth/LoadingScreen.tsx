/**
 * Loading Screen Component
 * Shows loading state during app initialization and authentication checks
 */

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...' 
}) => {
  const themeColors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.appName, { color: themeColors.text.primary }]}>
          CELF
        </Text>
        <Text style={[styles.tagline, { color: themeColors.text.secondary }]}>
          Mining Made Simple
        </Text>
      </View>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={themeColors.primary.blue} 
        />
        <Text style={[styles.loadingText, { color: themeColors.text.secondary }]}>
          {message}
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: themeColors.text.tertiary }]}>
          Powered by CELF Technology
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
