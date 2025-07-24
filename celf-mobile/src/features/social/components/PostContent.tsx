/**
 * Post Content Component
 * Renders different types of post content (videos, images, articles, shorts)
 */

import React from 'react';
import { View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { EngagementStats } from './EngagementStats';
import type { SocialPost } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PostContentProps {
  post: SocialPost;
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const renderPlayIcon = () => (
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -30 }, { translateY: -30 }],
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Ionicons name="play" size={24} color="white" />
    </View>
  );

  const renderTimeBadge = () => (
    <View
      style={{
        position: 'absolute',
        top: Spacing.md,
        left: Spacing.md,
        backgroundColor: Colors.neutral.black + '80',
        borderRadius: 12,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
      }}>
      <Typography variant="caption" color="inverse" weight="semibold">
        {post.time}
      </Typography>
    </View>
  );

  if (post.contentType === 'shorts') {
    return (
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: post.thumbnail }}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 1.2,
            backgroundColor: Colors.background.tertiary,
          }}
          resizeMode="cover"
        />
        {renderPlayIcon()}
        {renderTimeBadge()}
        <EngagementStats engagement={post.engagement} />
      </View>
    );
  }

  if (post.contentType === 'articles') {
    return (
      <Card>
        <Image
          source={{ uri: post.thumbnail }}
          style={{
            width: '100%',
            height: 150,
          }}
          resizeMode="cover"
        />
        <View style={{ padding: Spacing.md }}>
          <Typography
            variant="h5"
            weight="bold"
            numberOfLines={2}
            style={{ lineHeight: 24 }}>
            {post.title}
          </Typography>
          <Typography
            variant="body"
            numberOfLines={3}
            style={{ marginTop: Spacing.xs }}>
            {post.description}
          </Typography>
        </View>
      </Card>
    );
  }

  if (post.contentType === 'images') {
    return (
      <View style={{ position: 'relative' }}>
        <FlatList
          data={[post.thumbnail]}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: SCREEN_WIDTH / 2,
                height: SCREEN_WIDTH / 2,
                margin: Spacing.xs,
              }}
              resizeMode="cover"
            />
          )}
          keyExtractor={(item, index) => `${post.id}-${index}`}
          numColumns={2}
        />
        {renderTimeBadge()}
        <EngagementStats engagement={post.engagement} />
      </View>
    );
  }

  // Default: videos or other content types
  return (
    <View style={{ position: 'relative' }}>
      <Image
        source={{ uri: post.thumbnail }}
        style={{
          width: SCREEN_WIDTH,
          height: 200,
          backgroundColor: Colors.background.tertiary,
        }}
        resizeMode="cover"
      />
      {renderPlayIcon()}
      {renderTimeBadge()}
      <EngagementStats engagement={post.engagement} />
    </View>
  );
};
