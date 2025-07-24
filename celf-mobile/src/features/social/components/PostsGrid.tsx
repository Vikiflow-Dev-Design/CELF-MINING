/**
 * Posts Grid Component
 * Grid view for social media posts
 */

import React from 'react';
import { FlatList, TouchableOpacity, Image, View, Dimensions } from 'react-native';
import { Typography } from '@/components/ui';
import { Spacing } from '@/constants/design-tokens';
import type { SocialPost } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PostsGridProps {
  posts: SocialPost[];
}

export const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  const itemWidth = (SCREEN_WIDTH - Spacing.lg * 3) / 2;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: post }) => (
        <TouchableOpacity
          style={{
            width: itemWidth,
            marginBottom: Spacing.md,
          }}>
          <Image
            source={{ uri: post.thumbnail }}
            style={{
              width: '100%',
              height: itemWidth,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: Spacing.sm,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Typography
              variant="caption"
              weight="semibold"
              color="inverse"
              numberOfLines={1}>
              {post.title}
            </Typography>
          </View>
        </TouchableOpacity>
      )}
      numColumns={2}
      contentContainerStyle={{
        padding: Spacing.sm,
        paddingTop: Spacing.md,
      }}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      style={{ flex: 1 }}
    />
  );
};
