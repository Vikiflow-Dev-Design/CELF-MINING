import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
  rightAction?: React.ReactNode;
  leftAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuPress, rightAction, leftAction }) => {
  const themeColors = useThemeColors();

  return (
    <>
      <StatusBar barStyle={themeColors.statusBar as any} backgroundColor="transparent" />
      <View
        style={{
          backgroundColor: 'transparent',
          paddingTop: (StatusBar.currentHeight || 0) + 16,
          paddingBottom: Spacing.md,
          paddingHorizontal: Layout.screenMargin.mobile,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* Left Action or Menu Button */}
        {leftAction || (
          <TouchableOpacity
            onPress={onMenuPress}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: themeColors.background.tertiary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="menu" size={20} color={themeColors.icon.primary} />
          </TouchableOpacity>
        )}

        {/* Title */}
        <Typography variant="h3" weight="bold" style={{ flex: 1, textAlign: 'center' }}>
          {title}
        </Typography>

        {/* Right Action or Spacer */}
        <View style={{ width: 40, alignItems: 'center' }}>{rightAction || <View />}</View>
      </View>
    </>
  );
};
