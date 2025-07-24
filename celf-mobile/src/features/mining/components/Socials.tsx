/**
 * Socials Component
 * Shows social media platform links
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { socialPlatforms } from '../data';

interface SocialsProps {
  onTwitterPress: () => void;
  onTelegramPress: () => void;
  onDiscordPress: () => void;
  onYouTubePress: () => void;
}

export const Socials: React.FC<SocialsProps> = ({
  onTwitterPress,
  onTelegramPress,
  onDiscordPress,
  onYouTubePress,
}) => {
  const themeColors = useThemeColors();
  const getHandler = (onPress: string) => {
    switch (onPress) {
      case 'handleTwitterPress':
        return onTwitterPress;
      case 'handleTelegramPress':
        return onTelegramPress;
      case 'handleDiscordPress':
        return onDiscordPress;
      case 'handleYouTubePress':
        return onYouTubePress;
      default:
        return () => {};
    }
  };

  return (
    <Card variant="default" style={{ marginTop: Spacing['2xl'] }}>
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Socials
      </Typography>

      <View style={{ gap: Spacing.md }}>
        {socialPlatforms.map((platform) => (
          <TouchableOpacity
            key={platform.id}
            onPress={getHandler(platform.onPress)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: themeColors.background.tertiary,
              borderRadius: 12,
              padding: Spacing.lg,
            }}>
            <View style={{
              width: 40,
              height: 40,
              backgroundColor: themeColors.icon.primary + '15',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: Spacing.md,
            }}>
              <Ionicons name={platform.icon as any} size={20} color={themeColors.icon.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: 2 }}>
                {platform.name}
              </Typography>
              <Typography variant="caption" color="secondary">
                {platform.description}
              </Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color={themeColors.icon.tertiary} />
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
};
