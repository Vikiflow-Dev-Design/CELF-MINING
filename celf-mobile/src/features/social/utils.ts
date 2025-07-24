/**
 * Social Screen Utilities
 * Helper functions for social media functionality
 */

import { Linking } from 'react-native';
import { socialPlatforms } from './data';
import type { SocialPost, SocialPlatform, ContentTypeId } from './types';

/**
 * Get platform data by ID
 */
export const getPlatformData = (platformId: string): SocialPlatform | undefined => {
  return socialPlatforms.find((platform) => platform.id === platformId);
};

/**
 * Filter posts based on content type
 */
export const filterPostsByContentType = (
  posts: SocialPost[], 
  contentType: ContentTypeId
): SocialPost[] => {
  return contentType === 'all' 
    ? posts 
    : posts.filter((post) => post.contentType === contentType);
};

/**
 * Handle social media navigation
 */
export const handleSocialPress = async (post: SocialPost, platformId: string): Promise<void> => {
  const postUrl = post.postUrls[platformId];
  const platform = getPlatformData(platformId);

  if (postUrl) {
    try {
      await Linking.openURL(postUrl);
    } catch (error) {
      console.error('Error opening URL:', error);
      // Fallback to platform base URL
      if (platform?.baseUrl) {
        await Linking.openURL(platform.baseUrl);
      }
    }
  } else if (platform?.baseUrl) {
    await Linking.openURL(platform.baseUrl);
  }
};

/**
 * Open platform base URL
 */
export const openPlatformUrl = async (platform: SocialPlatform): Promise<void> => {
  try {
    await Linking.openURL(platform.baseUrl);
  } catch (error) {
    console.error('Error opening platform URL:', error);
  }
};

/**
 * Format engagement numbers (e.g., 1240 -> 1.2k)
 */
export const formatEngagementNumber = (num: number): string => {
  return num > 999 ? `${(num / 1000).toFixed(1)}k` : num.toString();
};
