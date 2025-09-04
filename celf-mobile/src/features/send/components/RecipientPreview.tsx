import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Spacing } from '@/constants/design-tokens';
import { UserSearchResult } from '@/services/apiService';

interface RecipientPreviewProps {
  recipient: UserSearchResult | null;
  onClear: () => void;
  isValidating?: boolean;
  validationError?: string;
}

export const RecipientPreview: React.FC<RecipientPreviewProps> = ({
  recipient,
  onClear,
  isValidating = false,
  validationError,
}) => {
  const themeColors = useThemeColors();

  if (!recipient && !isValidating && !validationError) {
    return null;
  }

  if (validationError) {
    return (
      <View style={{
        backgroundColor: themeColors.status.error + '20',
        borderRadius: 12,
        padding: Spacing.md,
        marginTop: Spacing.md,
        borderWidth: 1,
        borderColor: themeColors.status.error,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons 
            name="alert-circle" 
            size={20} 
            color={themeColors.status.error} 
            style={{ marginRight: Spacing.sm }}
          />
          <Typography variant="bodyMedium" color="error">
            {validationError}
          </Typography>
        </View>
      </View>
    );
  }

  if (isValidating) {
    return (
      <View style={{
        backgroundColor: themeColors.background.secondary,
        borderRadius: 12,
        padding: Spacing.md,
        marginTop: Spacing.md,
        borderWidth: 1,
        borderColor: themeColors.border.primary,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: themeColors.background.tertiary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.md,
          }}>
            <Ionicons 
              name="hourglass" 
              size={20} 
              color={themeColors.icon.secondary} 
            />
          </View>
          
          <View style={{ flex: 1 }}>
            <Typography variant="bodyMedium" color="secondary">
              Validating recipient...
            </Typography>
          </View>
        </View>
      </View>
    );
  }

  if (!recipient) {
    return null;
  }

  return (
    <View style={{
      backgroundColor: themeColors.primary.blue + '08',
      borderRadius: 16,
      padding: Spacing.md,
      marginTop: Spacing.md,
      borderWidth: 1,
      borderColor: themeColors.primary.blue + '30',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      {/* Avatar */}
      <View style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: themeColors.primary.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
      }}>
        <Typography variant="bodyMedium" color="inverse" weight="bold">
          {recipient.firstName.charAt(0).toUpperCase()}{recipient.lastName.charAt(0).toUpperCase()}
        </Typography>
      </View>

      {/* User Details */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={themeColors.status.success}
            style={{ marginRight: Spacing.xs }}
          />
          <Typography variant="bodyMedium" weight="bold">
            {recipient.firstName} {recipient.lastName}
          </Typography>
        </View>

        <Typography variant="bodySmall" color="secondary">
          {recipient.email}
        </Typography>

        {recipient.walletAddress && (
          <Typography variant="bodySmall" color="tertiary" style={{ fontFamily: 'monospace', marginTop: 2 }}>
            {recipient.walletAddress.slice(0, 16)}...{recipient.walletAddress.slice(-8)}
          </Typography>
        )}
      </View>

      {/* Clear Button */}
      <TouchableOpacity
        onPress={onClear}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: themeColors.background.primary,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: themeColors.border.primary,
        }}
      >
        <Ionicons
          name="close"
          size={14}
          color={themeColors.icon.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};
