/**
 * Error Screen Component
 * Shows error state during app initialization with retry functionality
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => {
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
      </View>

      {/* Error Content */}
      <View style={styles.errorContainer}>
        <View style={[styles.errorIcon, { backgroundColor: themeColors.status.error + '20' }]}>
          <Text style={[styles.errorIconText, { color: themeColors.status.error }]}>
            ⚠️
          </Text>
        </View>
        
        <Text style={[styles.errorTitle, { color: themeColors.text.primary }]}>
          Something went wrong
        </Text>
        
        <Text style={[styles.errorMessage, { color: themeColors.text.secondary }]}>
          {error}
        </Text>

        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: themeColors.primary.blue }]}
          onPress={onRetry}
        >
          <Text style={styles.retryButtonText}>
            Try Again
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: themeColors.text.tertiary }]}>
          If the problem persists, please contact support
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
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 60,
    maxWidth: 300,
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorIconText: {
    fontSize: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
