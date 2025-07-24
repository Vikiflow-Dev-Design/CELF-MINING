/**
 * Social Screen - Refactored
 * Reduced from 876 lines to ~60 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';
import { EmptySocialFeed } from '@/components/empty-states';

// Extracted components
import {
  SocialHeader,
  PlatformOverview,
  PostItem,
  PostsGrid,
} from '@/src/features/social/components';

// Extracted hook
import { useSocial } from '@/src/features/social/hooks/useSocial';

export default function SocialScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  
  // All business logic extracted to custom hook
  const {
    activeContentType,
    filteredPosts,
    handleContentTypeChange,
    handlePlatformPress,
    handlePostSocialPress,
  } = useSocial();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      {/* Custom Header with Content Toggle */}
      <SocialHeader
        activeContentType={activeContentType}
        onContentTypeChange={handleContentTypeChange}
        onMenuPress={toggleSidebar}
        onClosePress={() => router.back()}
      />

      {/* Content */}
      {filteredPosts.length === 0 ? (
        <EmptySocialFeed
          title="No Social Content Yet"
          description="We're working on bringing you the latest CELF updates and community content. Check back soon!"
          style={{ flex: 1 }}
        />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ paddingTop: Spacing.md, paddingBottom: 32 }}>
            {/* Platform Overview - only for 'all' posts */}
            {activeContentType === 'all' && (
              <PlatformOverview onPlatformPress={handlePlatformPress} />
            )}

            {/* Social Media Posts */}
            <View style={{ gap: Spacing['2xl'] }}>
              {filteredPosts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onSocialPress={handlePostSocialPress}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
