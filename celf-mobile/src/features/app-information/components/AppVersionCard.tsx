/**
 * App Version Information Card Component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { AppInfo, UpdateInfo } from '../types';

interface AppVersionCardProps {
  appInfo: AppInfo;
  updateInfo: UpdateInfo;
  onCheckUpdates: () => void;
  onOpenFullInfo: () => void;
}

export const AppVersionCard: React.FC<AppVersionCardProps> = ({
  appInfo,
  updateInfo,
  onCheckUpdates,
  onOpenFullInfo,
}) => {
  const themeColors = useThemeColors();
  return (
    <Card variant="default">
      <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: themeColors.primary.blue,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.md,
          }}>
          <Ionicons name="diamond" size={40} color={themeColors.icon.inverse} />
        </View>
        
        <Typography variant="h2" weight="bold" style={{ marginBottom: Spacing.xs }}>
          CELF
        </Typography>
        
        <Typography variant="bodyMedium" color="secondary">
          Version {appInfo.version} (Build {appInfo.buildNumber})
        </Typography>
        
        <Typography variant="bodySmall" color="tertiary">
          Released {appInfo.releaseDate}
        </Typography>
      </View>

      <View style={{ gap: Spacing.md }}>
        <TouchableOpacity
          onPress={onCheckUpdates}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.lg,
            backgroundColor: updateInfo.hasUpdate ? Colors.secondary.success : themeColors.background.secondary,
            borderRadius: 12,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
            <Ionicons 
              name={updateInfo.hasUpdate ? "download" : "checkmark-circle"} 
              size={20} 
              color={updateInfo.hasUpdate ? themeColors.icon.inverse : Colors.secondary.success}
            />
            <Typography 
              variant="bodyMedium" 
              weight="semibold"
              color={updateInfo.hasUpdate ? "white" : "primary"}
            >
              {updateInfo.hasUpdate ? 'Update Available' : 'Up to Date'}
            </Typography>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={16} 
            color={updateInfo.hasUpdate ? themeColors.icon.inverse : themeColors.icon.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onOpenFullInfo}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.lg,
            backgroundColor: themeColors.background.secondary,
            borderRadius: 12,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
            <Ionicons name="information-circle" size={20} color={themeColors.icon.primary} />
            <Typography variant="bodyMedium" weight="semibold">
              Full App Information
            </Typography>
          </View>
          <Ionicons name="chevron-forward" size={16} color={themeColors.icon.secondary} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};
