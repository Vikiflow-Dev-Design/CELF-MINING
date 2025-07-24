/**
 * Social Screen Hook
 * Custom hook for social media functionality
 */

import { useState } from 'react';
import { socialPosts } from '../data';
import { filterPostsByContentType, handleSocialPress, openPlatformUrl } from '../utils';
import type { ContentTypeId, SocialPost, SocialPlatform } from '../types';

export const useSocial = () => {
  // Content type filter state
  const [activeContentType, setActiveContentType] = useState<ContentTypeId>('all');

  // Filter posts based on active content type
  const filteredPosts = filterPostsByContentType(socialPosts, activeContentType);

  // Handle content type change
  const handleContentTypeChange = (contentType: ContentTypeId) => {
    setActiveContentType(contentType);
  };

  // Handle social platform press
  const handlePlatformPress = async (platform: SocialPlatform) => {
    await openPlatformUrl(platform);
  };

  // Handle post social press
  const handlePostSocialPress = async (post: SocialPost, platformId: string) => {
    await handleSocialPress(post, platformId);
  };

  return {
    activeContentType,
    filteredPosts,
    handleContentTypeChange,
    handlePlatformPress,
    handlePostSocialPress,
  };
};
