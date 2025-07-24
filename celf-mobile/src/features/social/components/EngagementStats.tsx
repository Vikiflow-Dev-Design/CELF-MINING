/**
 * Engagement Stats Component
 * Shows likes, shares, and comments for a post
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { formatEngagementNumber } from '../utils';
import type { PostEngagement } from '../types';

interface EngagementStatsProps {
  engagement: PostEngagement;
}

export const EngagementStats: React.FC<EngagementStatsProps> = ({
  engagement,
}) => {
  const statStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    shadow: `0 2px 4px ${Colors.neutral.black}1A`,
    elevation: 3,
    minWidth: 50,
    justifyContent: 'center' as const,
  };

  const iconContainerStyle = (color: string) => ({
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: color + '20',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 4,
  });

  return (
    <View
      style={{
        position: 'absolute',
        top: Spacing.md,
        right: Spacing.md,
        flexDirection: 'column',
        gap: Spacing.xs,
      }}>
      {/* Likes */}
      <View style={statStyle}>
        <View style={iconContainerStyle(Colors.secondary.error)}>
          <Ionicons name="heart" size={10} color={Colors.secondary.error} />
        </View>
        <Typography
          variant="caption"
          weight="bold"
          style={{ color: Colors.secondary.error, fontSize: 11 }}>
          {formatEngagementNumber(engagement.likes)}
        </Typography>
      </View>

      {/* Shares */}
      <View style={statStyle}>
        <View style={iconContainerStyle(Colors.secondary.success)}>
          <Ionicons name="share-social" size={10} color={Colors.secondary.success} />
        </View>
        <Typography
          variant="caption"
          weight="bold"
          style={{ color: Colors.secondary.success, fontSize: 11 }}>
          {formatEngagementNumber(engagement.shares)}
        </Typography>
      </View>

      {/* Comments */}
      <View style={statStyle}>
        <View style={iconContainerStyle(Colors.secondary.warning)}>
          <Ionicons name="chatbubble" size={10} color={Colors.secondary.warning} />
        </View>
        <Typography
          variant="caption"
          weight="bold"
          style={{ color: Colors.secondary.warning, fontSize: 11 }}>
          {formatEngagementNumber(engagement.comments)}
        </Typography>
      </View>
    </View>
  );
};
