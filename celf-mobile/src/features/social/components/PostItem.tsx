/**
 * Post Item Component
 * Individual social media post component
 */

import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/ui';
import { Spacing, Layout } from '@/constants/design-tokens';
import { PostContent } from './PostContent';
import { SocialIcons } from './SocialIcons';
import type { SocialPost } from '../types';

interface PostItemProps {
  post: SocialPost;
  onSocialPress: (post: SocialPost, platformId: string) => void;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  onSocialPress,
}) => {
  return (
    <View style={{ paddingBottom: Spacing.lg }}>
      {/* Post Thumbnail */}
      <View style={{ marginBottom: Spacing.lg }}>
        <PostContent post={post} />
      </View>

      {/* Post Title - only for non-article content */}
      {post.contentType !== 'articles' && (
        <View
          style={{
            marginBottom: Spacing.lg,
            paddingHorizontal: Layout.screenMargin.mobile,
          }}>
          <Typography
            variant="h3"
            weight="bold"
            numberOfLines={2}
            style={{ lineHeight: 24 }}>
            {post.title}
          </Typography>
        </View>
      )}

      {/* Social Platform Icons */}
      <View style={{ paddingHorizontal: Layout.screenMargin.mobile }}>
        <Typography
          variant="bodyMedium"
          weight="semibold"
          style={{ marginBottom: Spacing.md }}>
          View on Social Media:
        </Typography>
        <SocialIcons post={post} onSocialPress={onSocialPress} />
      </View>
    </View>
  );
};
