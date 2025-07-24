/**
 * CELF Content Style Guide
 * Content patterns, structure standards, and editorial guidelines
 */

import { Typography, Spacing, Colors } from './design-tokens';

// ============================================================================
// CONTENT PATTERNS
// ============================================================================

export const ContentPatterns = {
  // Page Structure Templates
  pageStructures: {
    // Landing Page Structure
    landing: {
      sections: [
        'hero',
        'statistics',
        'features',
        'testimonials',
        'cta',
        'footer'
      ],
      maxSections: 6,
      minSections: 4
    },
    
    // Article Page Structure
    article: {
      sections: [
        'header',
        'introduction',
        'content',
        'conclusion',
        'related',
        'footer'
      ],
      maxWordCount: 2000,
      minWordCount: 500
    },
    
    // Product Page Structure
    product: {
      sections: [
        'hero',
        'overview',
        'features',
        'benefits',
        'pricing',
        'faq',
        'cta'
      ],
      focusAreas: ['value proposition', 'social proof', 'clear pricing']
    },
    
    // Support Page Structure
    support: {
      sections: [
        'search',
        'categories',
        'popular',
        'contact',
        'resources'
      ],
      organization: 'problem-solution focused'
    }
  },
  
  // Content Blocks
  contentBlocks: {
    // Hero Block
    hero: {
      elements: ['headline', 'subheadline', 'cta', 'visual'],
      headline: {
        maxLength: 60,
        style: 'benefit-focused',
        tone: 'compelling'
      },
      subheadline: {
        maxLength: 160,
        style: 'explanatory',
        tone: 'supportive'
      }
    },
    
    // Feature Block
    feature: {
      elements: ['icon', 'title', 'description', 'link'],
      title: {
        maxLength: 40,
        style: 'descriptive',
        tone: 'clear'
      },
      description: {
        maxLength: 120,
        style: 'benefit-focused',
        tone: 'helpful'
      }
    },
    
    // Testimonial Block
    testimonial: {
      elements: ['quote', 'author', 'role', 'company', 'avatar'],
      quote: {
        maxLength: 200,
        style: 'authentic',
        tone: 'positive'
      },
      attribution: {
        required: ['name', 'role'],
        optional: ['company', 'location']
      }
    },
    
    // FAQ Block
    faq: {
      elements: ['question', 'answer', 'category'],
      question: {
        maxLength: 100,
        style: 'user-focused',
        tone: 'direct'
      },
      answer: {
        maxLength: 300,
        style: 'helpful',
        tone: 'clear'
      }
    }
  }
} as const;

// ============================================================================
// EDITORIAL GUIDELINES
// ============================================================================

export const EditorialGuidelines = {
  // Writing Principles
  principles: {
    clarity: 'Write clearly and concisely',
    accessibility: 'Use language accessible to all skill levels',
    consistency: 'Maintain consistent terminology and style',
    helpfulness: 'Focus on helping users achieve their goals',
    authenticity: 'Be genuine and transparent in communication'
  },
  
  // Content Standards
  standards: {
    // Readability
    readability: {
      gradeLevel: '8th grade or lower',
      sentenceLength: 'Average 15-20 words',
      paragraphLength: '3-4 sentences maximum',
      activevoice: 'Prefer active voice over passive'
    },
    
    // Structure
    structure: {
      headlines: 'Use descriptive, benefit-focused headlines',
      subheadings: 'Break content with clear subheadings',
      bullets: 'Use bullet points for lists and key points',
      whitespace: 'Include adequate white space for readability'
    },
    
    // Tone Guidelines
    tone: {
      educational: 'Informative without being condescending',
      supportive: 'Helpful and encouraging',
      professional: 'Credible and trustworthy',
      inclusive: 'Welcoming to diverse audiences',
      optimistic: 'Positive and forward-looking'
    }
  },
  
  // Content Types
  contentTypes: {
    // Educational Content
    educational: {
      purpose: 'Teach concepts and skills',
      structure: 'Introduction → Explanation → Examples → Practice',
      tone: 'Patient and thorough',
      length: '800-1500 words'
    },
    
    // Marketing Content
    marketing: {
      purpose: 'Promote products and services',
      structure: 'Problem → Solution → Benefits → Proof → Action',
      tone: 'Compelling and confident',
      length: '300-800 words'
    },
    
    // Support Content
    support: {
      purpose: 'Help users solve problems',
      structure: 'Problem → Solution → Steps → Verification',
      tone: 'Clear and helpful',
      length: '200-600 words'
    },
    
    // Legal Content
    legal: {
      purpose: 'Provide legal information',
      structure: 'Overview → Details → Implications → Contact',
      tone: 'Professional and precise',
      length: '500-2000 words'
    }
  }
} as const;

// ============================================================================
// CONTENT FORMATTING
// ============================================================================

export const ContentFormatting = {
  // Text Formatting
  textFormatting: {
    // Emphasis
    emphasis: {
      bold: 'For important terms and key concepts',
      italic: 'For emphasis and foreign terms',
      underline: 'Avoid except for links',
      color: 'Use sparingly for highlights'
    },
    
    // Lists
    lists: {
      bulleted: 'For unordered items and features',
      numbered: 'For sequential steps and processes',
      definition: 'For term explanations',
      nested: 'Maximum 2 levels deep'
    },
    
    // Links
    links: {
      descriptive: 'Use descriptive link text',
      external: 'Indicate external links',
      download: 'Specify file types and sizes',
      email: 'Use mailto: for email addresses'
    }
  },
  
  // Code Formatting
  codeFormatting: {
    inline: {
      usage: 'Short code snippets and commands',
      style: {
        fontFamily: Typography.fontFamily.monospace,
        backgroundColor: Colors.background.tertiary,
        padding: `${Spacing.xs} ${Spacing.sm}`,
        borderRadius: '4px'
      }
    },
    
    block: {
      usage: 'Multi-line code examples',
      style: {
        fontFamily: Typography.fontFamily.monospace,
        backgroundColor: Colors.background.dark,
        color: Colors.text.inverse,
        padding: Spacing.lg,
        borderRadius: '8px',
        overflow: 'auto'
      }
    }
  },
  
  // Quote Formatting
  quotes: {
    blockquote: {
      usage: 'Long quotes and testimonials',
      style: {
        borderLeft: `4px solid ${Colors.primary.blue}`,
        paddingLeft: Spacing.lg,
        fontStyle: 'italic',
        fontSize: Typography.fontSize.bodyLarge
      }
    },
    
    pullquote: {
      usage: 'Highlighted excerpts',
      style: {
        fontSize: Typography.fontSize.h4,
        fontWeight: Typography.fontWeight.semibold,
        textAlign: 'center',
        padding: Spacing.xl,
        backgroundColor: Colors.background.secondary
      }
    }
  }
} as const;

// ============================================================================
// MEDIA GUIDELINES
// ============================================================================

export const MediaGuidelines = {
  // Image Standards
  images: {
    // Technical Specifications
    technical: {
      formats: ['WebP', 'PNG', 'JPG'],
      quality: 85,
      compression: 'Optimize for web',
      responsive: 'Provide multiple sizes',
      lazy: 'Use lazy loading for performance'
    },
    
    // Aspect Ratios
    aspectRatios: {
      hero: '16:9',
      card: '4:3',
      avatar: '1:1',
      banner: '3:1',
      thumbnail: '1:1'
    },
    
    // Alt Text Guidelines
    altText: {
      descriptive: 'Describe image content and context',
      concise: 'Keep under 125 characters',
      functional: 'Describe function for interactive images',
      decorative: 'Use empty alt="" for decorative images'
    },
    
    // Content Guidelines
    content: {
      style: 'Professional, modern, diverse',
      subjects: 'Real people, authentic scenarios',
      quality: 'High resolution, well-lit',
      consistency: 'Maintain visual consistency'
    }
  },
  
  // Video Standards
  videos: {
    // Technical Specifications
    technical: {
      formats: ['MP4', 'WebM'],
      resolution: '1080p minimum',
      framerate: '30fps',
      compression: 'H.264 codec',
      captions: 'Include closed captions'
    },
    
    // Content Guidelines
    content: {
      length: '30 seconds to 3 minutes',
      intro: 'Hook viewers in first 5 seconds',
      pacing: 'Clear, moderate speaking pace',
      branding: 'Subtle brand integration'
    }
  },
  
  // Icon Standards
  icons: {
    // Style Guidelines
    style: {
      type: 'Outline with selective fills',
      strokeWidth: '1.5px',
      consistency: 'Use same icon family',
      sizing: 'Consistent sizing within sections'
    },
    
    // Usage Guidelines
    usage: {
      functional: 'Use for navigation and actions',
      decorative: 'Support content, don\'t distract',
      accessibility: 'Include proper labels',
      context: 'Ensure icons match their meaning'
    }
  }
} as const;

// ============================================================================
// SEO GUIDELINES
// ============================================================================

export const SEOGuidelines = {
  // Meta Data Standards
  metaData: {
    // Title Tags
    titles: {
      length: '50-60 characters',
      structure: 'Primary Keyword | Brand Name',
      unique: 'Each page needs unique title',
      descriptive: 'Clearly describe page content'
    },
    
    // Meta Descriptions
    descriptions: {
      length: '150-160 characters',
      compelling: 'Include call-to-action',
      keywords: 'Include target keywords naturally',
      unique: 'Each page needs unique description'
    },
    
    // Open Graph
    openGraph: {
      title: 'Optimized for social sharing',
      description: 'Compelling social description',
      image: '1200x630px recommended',
      type: 'website, article, or product'
    }
  },
  
  // Content Optimization
  contentOptimization: {
    // Keyword Strategy
    keywords: {
      primary: 'One primary keyword per page',
      secondary: '2-3 related keywords',
      density: '1-2% keyword density',
      natural: 'Use keywords naturally in content'
    },
    
    // Heading Structure
    headings: {
      h1: 'One H1 per page with primary keyword',
      hierarchy: 'Use proper heading hierarchy',
      descriptive: 'Make headings descriptive',
      keywords: 'Include keywords in headings'
    },
    
    // Internal Linking
    internalLinks: {
      contextual: 'Link to relevant internal content',
      descriptive: 'Use descriptive anchor text',
      structure: 'Create logical site structure',
      depth: 'Keep important pages 3 clicks from home'
    }
  },
  
  // Technical SEO
  technicalSEO: {
    // Performance
    performance: {
      speed: 'Page load time under 3 seconds',
      mobile: 'Mobile-first responsive design',
      core: 'Optimize Core Web Vitals',
      images: 'Optimize and compress images'
    },
    
    // Structure
    structure: {
      urls: 'Clean, descriptive URLs',
      sitemap: 'XML sitemap for search engines',
      robots: 'Proper robots.txt configuration',
      schema: 'Structured data markup'
    }
  }
} as const;
