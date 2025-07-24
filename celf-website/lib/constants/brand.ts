/**
 * CELF Brand Constants
 * Brand identity, logos, iconography, and visual elements
 */

// ============================================================================
// BRAND IDENTITY
// ============================================================================

export const Brand = {
  // Brand Name
  name: 'CELF',
  fullName: 'Cryptocurrency Education & Learning Foundation',
  tagline: 'Empowering Education Through Cryptocurrency',
  
  // Mission & Vision
  mission: 'To democratize access to cryptocurrency education and financial literacy through innovative mining technology.',
  vision: 'A world where everyone has the knowledge and tools to participate in the digital economy.',
  
  // Brand Values
  values: [
    'Education First',
    'Financial Inclusion',
    'Community Driven',
    'Innovation',
    'Transparency',
    'Sustainability'
  ],
  
  // Brand Personality
  personality: {
    primary: ['Educational', 'Trustworthy', 'Innovative'],
    secondary: ['Accessible', 'Community-focused', 'Forward-thinking'],
    tone: 'Professional yet approachable, educational but not condescending'
  }
} as const;

// ============================================================================
// LOGO SPECIFICATIONS
// ============================================================================

export const Logo = {
  // Logo Variants
  variants: {
    primary: {
      name: 'Primary Logo',
      usage: 'Main brand representation',
      minWidth: '120px',
      maxWidth: '300px',
      aspectRatio: '3:1'
    },
    icon: {
      name: 'Icon Only',
      usage: 'Small spaces, favicons, app icons',
      minSize: '16px',
      maxSize: '128px',
      aspectRatio: '1:1'
    },
    horizontal: {
      name: 'Horizontal Logo',
      usage: 'Headers, footers, wide layouts',
      minWidth: '150px',
      maxWidth: '400px',
      aspectRatio: '4:1'
    },
    stacked: {
      name: 'Stacked Logo',
      usage: 'Narrow spaces, mobile layouts',
      minWidth: '80px',
      maxWidth: '200px',
      aspectRatio: '1:1.2'
    }
  },
  
  // Clear Space
  clearSpace: {
    minimum: '0.5x logo height',
    preferred: '1x logo height',
    description: 'Maintain clear space around logo for optimal visibility'
  },
  
  // Color Variations
  colorVariations: {
    primary: '#1E40AF', // Primary blue
    white: '#FFFFFF',   // For dark backgrounds
    black: '#000000',   // For light backgrounds
    monochrome: '#6B7280' // Neutral gray
  },
  
  // Usage Guidelines
  usage: {
    do: [
      'Use on appropriate backgrounds with sufficient contrast',
      'Maintain minimum size requirements',
      'Preserve aspect ratio',
      'Use approved color variations'
    ],
    dont: [
      'Stretch or distort the logo',
      'Use on busy backgrounds',
      'Change colors outside approved palette',
      'Add effects, shadows, or outlines'
    ]
  }
} as const;

// ============================================================================
// ICONOGRAPHY
// ============================================================================

export const Iconography = {
  // Icon Style
  style: {
    type: 'Outline with selective fills',
    strokeWidth: '1.5px',
    cornerRadius: '2px',
    size: {
      small: '16px',
      medium: '24px',
      large: '32px',
      xlarge: '48px'
    }
  },
  
  // Icon Categories
  categories: {
    // Navigation Icons
    navigation: [
      'home', 'menu', 'close', 'arrow-left', 'arrow-right', 
      'arrow-up', 'arrow-down', 'chevron-left', 'chevron-right'
    ],
    
    // Action Icons
    actions: [
      'download', 'upload', 'share', 'copy', 'edit', 'delete',
      'save', 'search', 'filter', 'refresh', 'settings'
    ],
    
    // Content Icons
    content: [
      'document', 'image', 'video', 'audio', 'link', 'attachment',
      'calendar', 'clock', 'location', 'tag'
    ],
    
    // Communication Icons
    communication: [
      'mail', 'phone', 'chat', 'notification', 'bell', 'message',
      'comment', 'like', 'heart', 'star'
    ],
    
    // Cryptocurrency Icons
    crypto: [
      'bitcoin', 'ethereum', 'mining', 'wallet', 'transaction',
      'blockchain', 'token', 'exchange', 'chart', 'trend'
    ],
    
    // Education Icons
    education: [
      'book', 'graduation-cap', 'certificate', 'trophy', 'award',
      'lightbulb', 'target', 'puzzle', 'quiz', 'progress'
    ],
    
    // Social Icons
    social: [
      'facebook', 'twitter', 'instagram', 'linkedin', 'youtube',
      'tiktok', 'discord', 'telegram', 'reddit', 'github'
    ],
    
    // Status Icons
    status: [
      'check', 'x', 'warning', 'info', 'error', 'success',
      'pending', 'loading', 'offline', 'online'
    ]
  },
  
  // Usage Guidelines
  guidelines: {
    consistency: 'Use icons from the same style family',
    sizing: 'Maintain consistent sizing within interface sections',
    spacing: 'Provide adequate spacing around icons',
    accessibility: 'Include alt text and ARIA labels for screen readers'
  }
} as const;

// ============================================================================
// IMAGERY GUIDELINES
// ============================================================================

export const Imagery = {
  // Photography Style
  photography: {
    style: 'Modern, clean, authentic',
    subjects: [
      'Diverse people learning and using technology',
      'Educational environments',
      'Digital interfaces and devices',
      'Community and collaboration'
    ],
    treatment: {
      saturation: 'Natural to slightly enhanced',
      contrast: 'Medium to high',
      brightness: 'Well-lit, optimistic',
      composition: 'Clean, uncluttered backgrounds'
    }
  },
  
  // Illustration Style
  illustrations: {
    style: 'Geometric, modern, educational',
    elements: [
      'Cryptocurrency symbols',
      'Educational icons',
      'Technology representations',
      'Growth and progress metaphors'
    ],
    colors: 'Use brand color palette',
    complexity: 'Simple to moderate detail level'
  },
  
  // Image Specifications
  specifications: {
    formats: ['WebP', 'PNG', 'JPG'],
    quality: 'High resolution for retina displays',
    optimization: 'Compressed for web performance',
    aspectRatios: {
      hero: '16:9',
      card: '4:3',
      avatar: '1:1',
      banner: '3:1'
    }
  },
  
  // Usage Context
  context: {
    hero: 'Large, impactful images for main sections',
    cards: 'Supporting images for content cards',
    backgrounds: 'Subtle patterns or gradients',
    icons: 'Functional interface elements'
  }
} as const;

// ============================================================================
// CONTENT VOICE & TONE
// ============================================================================

export const Voice = {
  // Brand Voice Characteristics
  characteristics: {
    educational: 'Informative without being condescending',
    approachable: 'Friendly and accessible to all skill levels',
    trustworthy: 'Reliable and transparent in communication',
    innovative: 'Forward-thinking and technology-focused',
    inclusive: 'Welcoming to diverse audiences'
  },
  
  // Tone Variations by Context
  toneByContext: {
    marketing: 'Enthusiastic and inspiring',
    educational: 'Clear and instructional',
    support: 'Helpful and patient',
    legal: 'Professional and precise',
    community: 'Warm and encouraging'
  },
  
  // Writing Guidelines
  guidelines: {
    clarity: 'Use simple, clear language',
    conciseness: 'Be direct and to the point',
    consistency: 'Maintain consistent terminology',
    accessibility: 'Write for diverse reading levels',
    positivity: 'Focus on benefits and opportunities'
  },
  
  // Terminology
  terminology: {
    preferred: {
      'cryptocurrency': 'Not crypto or digital currency',
      'mining': 'Educational mining or CELF mining',
      'community': 'Not users or customers',
      'learning': 'Not training or education alone',
      'platform': 'Not app or system'
    },
    avoid: [
      'Technical jargon without explanation',
      'Financial advice language',
      'Overly promotional language',
      'Exclusive or elitist terms'
    ]
  }
} as const;
