/**
 * Social Header Component
 * Custom header with content type filters
 */

import React from 'react';
import { View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { contentTypes } from '../data';
import type { ContentTypeId } from '../types';

interface SocialHeaderProps {
  activeContentType: ContentTypeId;
  onContentTypeChange: (contentType: ContentTypeId) => void;
  onMenuPress: () => void;
  onClosePress?: () => void;
}

export const SocialHeader: React.FC<SocialHeaderProps> = ({
  activeContentType,
  onContentTypeChange,
  onMenuPress,
  onClosePress,
}) => {
  const themeColors = useThemeColors();
  return (
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
      {/* Menu Button */}
      <TouchableOpacity
        onPress={onMenuPress}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: themeColors.background.tertiary,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name="menu" size={16} color={themeColors.icon.primary} />
      </TouchableOpacity>

      {/* Content Type Toggle */}
      <View style={{ flex: 1, marginLeft: Spacing.md }}>
        <FlatList
          data={contentTypes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item: contentType }) => {
            const isActive = activeContentType === contentType.id;

            return (
              <TouchableOpacity
                onPress={() => onContentTypeChange(contentType.id as ContentTypeId)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: isActive ? themeColors.primary.blue : themeColors.background.tertiary,
                  borderRadius: 18,
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  marginRight: Spacing.sm,
                  borderWidth: 1,
                  borderColor: isActive ? themeColors.primary.blue : themeColors.border.secondary,
                }}>
                <Ionicons
                  name={contentType.icon as any}
                  size={14}
                  color={isActive ? themeColors.icon.inverse : themeColors.icon.secondary}
                  style={{ marginRight: Spacing.xs }}
                />
                <Typography
                  variant="caption"
                  weight="semibold"
                  color={isActive ? 'inverse' : 'secondary'}>
                  {contentType.label}
                </Typography>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Close Button */}
      {onClosePress && (
        <TouchableOpacity
          onPress={onClosePress}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: themeColors.background.tertiary,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: Spacing.sm,
          }}>
          <Ionicons name="close" size={16} color={themeColors.icon.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};
