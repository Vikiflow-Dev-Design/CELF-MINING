/**
 * Network Error State Component
 * Displays a user-friendly error message when network requests fail
 * with retry functionality and better UX
 */

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Button } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

interface NetworkErrorStateProps {
  error: string;
  onRetry: () => void;
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onGoBack?: () => void;
}

export const NetworkErrorState: React.FC<NetworkErrorStateProps> = ({
  error,
  onRetry,
  title = "Connection Problem",
  description,
  showBackButton = false,
  onGoBack,
}) => {
  const themeColors = useThemeColors();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  // Determine if this is a network error
  const isNetworkError = error.toLowerCase().includes('network') || 
                        error.toLowerCase().includes('connection') ||
                        error.toLowerCase().includes('fetch') ||
                        error.toLowerCase().includes('refused');

  // Get appropriate icon and color
  const iconName = isNetworkError ? 'wifi-off' : 'alert-circle-outline';
  const iconColor = isNetworkError ? Colors.secondary.warning : Colors.status.error;

  // Get user-friendly error message
  const getUserFriendlyMessage = () => {
    if (isNetworkError) {
      return description || "Unable to connect to the server. Please check your internet connection and try again.";
    }
    return description || error;
  };

  return (
    <View style={{
      alignItems: 'center',
      paddingTop: Spacing['3xl'],
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.lg,
    }}>
      {/* Error Icon */}
      <View style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: iconColor + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
      }}>
        <Ionicons name={iconName as any} size={50} color={iconColor} />
      </View>
      
      {/* Error Title */}
      <Typography variant="h3" weight="semibold" style={{
        marginBottom: Spacing.sm,
        textAlign: 'center',
      }}>
        {title}
      </Typography>
      
      {/* Error Description */}
      <Typography variant="bodyMedium" color="secondary" style={{
        textAlign: 'center',
        marginBottom: Spacing.xl,
        lineHeight: 22,
        maxWidth: 300,
      }}>
        {getUserFriendlyMessage()}
      </Typography>

      {/* Action Buttons */}
      <View style={{ width: '100%', maxWidth: 280, gap: Spacing.md }}>
        {/* Retry Button */}
        <Button
          title={isRetrying ? "Retrying..." : "Try Again"}
          onPress={handleRetry}
          variant="primary"
          disabled={isRetrying}
          loading={isRetrying}
          icon={!isRetrying ? <Ionicons name="refresh" size={20} color={Colors.neutral.white} /> : undefined}
          style={{
            shadowColor: iconColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
          }}
        />

        {/* Go Back Button (optional) */}
        {showBackButton && onGoBack && (
          <Button
            title="Go Back"
            onPress={onGoBack}
            variant="secondary"
            icon={<Ionicons name="arrow-back" size={20} color={themeColors.text.primary} />}
          />
        )}
      </View>

      {/* Additional Help Text for Network Errors */}
      {isNetworkError && (
        <View style={{
          marginTop: Spacing.xl,
          padding: Spacing.md,
          backgroundColor: themeColors.background.tertiary,
          borderRadius: BorderRadius.md,
          borderLeftWidth: 4,
          borderLeftColor: Colors.secondary.warning,
        }}>
          <Typography variant="bodySmall" color="secondary" style={{ textAlign: 'center' }}>
            💡 Make sure your device is connected to the internet and the CELF backend server is running
          </Typography>
        </View>
      )}
    </View>
  );
};
