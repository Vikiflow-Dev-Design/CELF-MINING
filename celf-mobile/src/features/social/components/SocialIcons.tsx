/**
 * Social Icons Component
 * Renders social platform icons for a post
 */

import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '@/constants/design-tokens';
import { getPlatformData } from '../utils';
import type { SocialPost } from '../types';

interface SocialIconsProps {
  post: SocialPost;
  onSocialPress: (post: SocialPost, platformId: string) => void;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
  post,
  onSocialPress,
}) => {
  return (
    <FlatList
      data={post.platforms}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      contentContainerStyle={{ paddingLeft: 0 }}
      renderItem={({ item: platformId }) => {
        const platform = getPlatformData(platformId);
        if (!platform) return null;

        return (
          <TouchableOpacity
            onPress={() => onSocialPress(post, platformId)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: platform.color + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: Spacing.md,
              borderWidth: 2,
              borderColor: platform.color + '40',
            }}>
            <Ionicons name={platform.icon as any} size={16} color={platform.color} />
          </TouchableOpacity>
        );
      }}
    />
  );
};
