/**
 * Social Screen Types
 * Type definitions for social media functionality
 */

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  baseUrl: string;
}

export interface PostEngagement {
  likes: number;
  shares: number;
  comments: number;
}

export interface SocialPost {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  platforms: string[];
  engagement: PostEngagement;
  time: string;
  contentType: 'all' | 'videos' | 'shorts' | 'articles' | 'images';
  postUrls: Record<string, string>;
}

export interface ContentType {
  id: string;
  label: string;
  icon: string;
}

export type ContentTypeId = 'all' | 'videos' | 'shorts' | 'articles' | 'images';
