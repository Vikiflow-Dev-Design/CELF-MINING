/**
 * Platform Overview Component
 * Shows social media platforms for following CELF
 */

import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { socialPlatforms } from '../data';
import type { SocialPlatform } from '../types';

interface PlatformOverviewProps {
  onPlatformPress: (platform: SocialPlatform) => void;
}

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({
  onPlatformPress,
}) => {
  return (
    <View style={{ marginBottom: Spacing['3xl'], paddingBottom: Spacing.lg }}>
      <View
        style={{ 
          paddingHorizontal: Layout.screenMargin.mobile, 
          marginBottom: Spacing.lg 
        }}>
        <Typography variant="h3" weight="semibold">
          Follow CELF on Social Media
        </Typography>
      </View>

      <FlatList
        data={socialPlatforms}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: Spacing.md,
          paddingHorizontal: Layout.screenMargin.mobile,
        }}
        renderItem={({ item: platform }) => (
          <TouchableOpacity
            onPress={() => onPlatformPress(platform)}
            style={{
              alignItems: 'center',
              marginRight: Spacing['2xl'],
              minWidth: 60,
            }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: platform.color + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.xs,
                borderWidth: 2,
                borderColor: platform.color + '40',
              }}>
              <Ionicons name={platform.icon as any} size={20} color={platform.color} />
            </View>
            <Typography variant="caption" color="secondary" align="center">
              {platform.name}
            </Typography>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
