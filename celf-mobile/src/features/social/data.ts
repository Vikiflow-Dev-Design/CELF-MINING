/**
 * Social Screen Data
 * Contains all static data for social media platforms and posts
 */

// Content types for filtering
export const contentTypes = [
  { id: 'all', label: 'All Posts', icon: 'grid-outline' },
  { id: 'videos', label: 'Videos', icon: 'play-circle-outline' },
  { id: 'shorts', label: 'Shorts', icon: 'flash-outline' },
  { id: 'articles', label: 'Articles', icon: 'document-text-outline' },
  { id: 'images', label: 'Images', icon: 'image-outline' },
];

// Social Media Platforms
export const socialPlatforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'logo-facebook',
    color: '#1877F2',
    baseUrl: 'https://facebook.com/celf.official',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'logo-twitter',
    color: '#1DA1F2',
    baseUrl: 'https://twitter.com/celf_official',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'logo-instagram',
    color: '#E4405F',
    baseUrl: 'https://instagram.com/celf.official',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'logo-linkedin',
    color: '#0A66C2',
    baseUrl: 'https://linkedin.com/company/celf',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'logo-youtube',
    color: '#FF0000',
    baseUrl: 'https://youtube.com/@celf.official',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'musical-notes',
    color: '#000000',
    baseUrl: 'https://tiktok.com/@celf.official',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'chatbubbles',
    color: '#5865F2',
    baseUrl: 'https://discord.gg/celf',
  },
];

// Social Media Posts with thumbnails
// Set to empty array to show empty state, uncomment posts below to see populated state
export const socialPosts = [
  // Uncomment these posts to see populated state:
  /*
  {
    id: 1,
    title: 'CELF Mining Update: New Features Released!',
    description:
      'Discover the latest mining optimizations and bonus features in our newest update.',
    thumbnail: 'https://via.placeholder.com/300x200/1E40AF/FFFFFF?text=CELF+Update',
    platforms: ['facebook', 'twitter', 'linkedin'],
    engagement: { likes: 1240, shares: 89, comments: 156 },
    time: '2h ago',
    contentType: 'articles',
    postUrls: {
      facebook: 'https://facebook.com/celf.official/posts/123',
      twitter: 'https://twitter.com/celf_official/status/123',
      linkedin: 'https://linkedin.com/company/celf/posts/123',
    },
  },
  {
    id: 2,
    title: 'Community Spotlight: Top Miners This Week',
    description:
      'Celebrating our amazing community members who achieved incredible mining milestones!',
    thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Community+Spotlight',
    platforms: ['instagram', 'facebook', 'twitter'],
    engagement: { likes: 892, shares: 234, comments: 67 },
    time: '5h ago',
    contentType: 'images',
    postUrls: {
      instagram: 'https://instagram.com/p/celf-community-123',
      facebook: 'https://facebook.com/celf.official/posts/124',
      twitter: 'https://twitter.com/celf_official/status/124',
    },
  },
  {
    id: 3,
    title: 'CELF Tutorial: Maximizing Your Mining Efficiency',
    description:
      'Learn pro tips and strategies to boost your CELF mining rewards in this comprehensive guide.',
    thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Mining+Tutorial',
    platforms: ['youtube', 'tiktok', 'discord'],
    engagement: { likes: 2156, shares: 445, comments: 289 },
    time: '1d ago',
    contentType: 'videos',
    postUrls: {
      youtube: 'https://youtube.com/watch?v=celf-tutorial-123',
      tiktok: 'https://tiktok.com/@celf.official/video/123',
      discord: 'https://discord.gg/celf',
    },
  },
  {
    id: 4,
    title: 'Weekly Challenge: Double Rewards Event',
    description:
      'Join our special mining challenge this week and earn double CELF rewards! Limited time only.',
    thumbnail: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Double+Rewards',
    platforms: ['facebook', 'twitter', 'instagram', 'discord'],
    engagement: { likes: 3421, shares: 678, comments: 445 },
    time: '2d ago',
    contentType: 'shorts',
    postUrls: {
      facebook: 'https://facebook.com/celf.official/posts/125',
      twitter: 'https://twitter.com/celf_official/status/125',
      instagram: 'https://instagram.com/p/celf-challenge-123',
      discord: 'https://discord.gg/celf',
    },
  },
  // More dummy data for testing
  { 
    id: 5, 
    title: 'Exciting Partnerships Announced!', 
    description: 'CELF is teaming up with major industry leaders to expand.', 
    thumbnail: 'https://via.placeholder.com/300x200/FFAB40/FFFFFF?text=Partnerships', 
    platforms: ['linkedin', 'twitter'], 
    engagement: { likes: 1540, shares: 234, comments: 310 }, 
    time: '3h ago', 
    contentType: 'articles', 
    postUrls: { 
      linkedin: 'https://linkedin.com/company/celf/posts/126', 
      twitter: 'https://twitter.com/celf_official/status/126' 
    } 
  },
  { 
    id: 6, 
    title: 'Inside Look: How We Develop our Products', 
    description: 'A sneak peek into CELF product development offices.', 
    thumbnail: 'https://via.placeholder.com/300x200/FFC107/FFFFFF?text=Development+Offices', 
    platforms: ['instagram', 'linkedin'], 
    engagement: { likes: 2974, shares: 431, comments: 298 }, 
    time: '7h ago', 
    contentType: 'images', 
    postUrls: { 
      instagram: 'https://instagram.com/p/celf-development-126', 
      linkedin: 'https://linkedin.com/company/celf/posts/127' 
    } 
  },
  { 
    id: 7, 
    title: 'Live Webinar: Mining Techniques for 2025', 
    description: 'Join our experts for a live webinar on the latest mining techniques.', 
    thumbnail: 'https://via.placeholder.com/300x200/8BC34A/FFFFFF?text=Live+Webinar', 
    platforms: ['youtube'], 
    engagement: { likes: 1124, shares: 78, comments: 104 }, 
    time: '11h ago', 
    contentType: 'videos', 
    postUrls: { 
      youtube: 'https://youtube.com/watch?v=celf-webinar-2025' 
    } 
  },
  { 
    id: 8, 
    title: 'Behind the Scenes: Team Building Activities', 
    description: 'See how the CELF team spends time together with fun activities.', 
    thumbnail: 'https://via.placeholder.com/300x200/03A9F4/FFFFFF?text=Team+Building', 
    platforms: ['facebook', 'twitter'], 
    engagement: { likes: 934, shares: 190, comments: 156 }, 
    time: '12h ago', 
    contentType: 'shorts', 
    postUrls: { 
      facebook: 'https://facebook.com/celf.official/posts/128', 
      twitter: 'https://twitter.com/celf_official/status/128' 
    } 
  },
  { 
    id: 9, 
    title: 'Artistic View: Photography Contest Winners!', 
    description: 'Check out the amazing winning images from our recent contest.', 
    thumbnail: 'https://via.placeholder.com/300x200/00BCD4/FFFFFF?text=Contest+Winners', 
    platforms: ['instagram', 'pinterest'], 
    engagement: { likes: 7643, shares: 982, comments: 507 }, 
    time: '1d ago', 
    contentType: 'images', 
    postUrls: { 
      instagram: 'https://instagram.com/p/celf-photos-winners', 
      pinterest: 'https://pinterest.com/celf_photos_winners' 
    } 
  }
  */
];
