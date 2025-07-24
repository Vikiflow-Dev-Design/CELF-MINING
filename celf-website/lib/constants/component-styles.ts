/**
 * CELF Component Style Guide
 * Comprehensive styling patterns and guidelines for all UI components
 */

import { Colors, Typography, Spacing, BorderRadius, Shadows } from './design-tokens';

// ============================================================================
// COMPONENT PATTERNS
// ============================================================================

export const ComponentPatterns = {
  // Interactive States
  interactiveStates: {
    default: {
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer'
    },
    hover: {
      transform: 'translateY(-1px)',
      boxShadow: Shadows.md
    },
    active: {
      transform: 'translateY(0)',
      boxShadow: Shadows.sm
    },
    focus: {
      outline: `2px solid ${Colors.primary.blue}`,
      outlineOffset: '2px'
    },
    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      pointerEvents: 'none'
    }
  },
  
  // Loading States
  loadingStates: {
    skeleton: {
      backgroundColor: Colors.neutral[200],
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    },
    spinner: {
      borderColor: Colors.neutral[300],
      borderTopColor: Colors.primary.blue,
      animation: 'spin 1s linear infinite'
    },
    shimmer: {
      background: `linear-gradient(90deg, ${Colors.neutral[200]} 25%, ${Colors.neutral[100]} 50%, ${Colors.neutral[200]} 75%)`,
      backgroundSize: '200% 100%',
      animation: 'shimmer 2s infinite'
    }
  },
  
  // Elevation System
  elevation: {
    flat: {
      boxShadow: 'none',
      border: `1px solid ${Colors.border.secondary}`
    },
    raised: {
      boxShadow: Shadows.sm,
      border: 'none'
    },
    elevated: {
      boxShadow: Shadows.md,
      border: 'none'
    },
    floating: {
      boxShadow: Shadows.lg,
      border: 'none'
    },
    modal: {
      boxShadow: Shadows.xl,
      border: 'none'
    }
  }
} as const;

// ============================================================================
// BUTTON STYLE GUIDE
// ============================================================================

export const ButtonStyles = {
  // Base Button Styles
  base: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.semibold,
    borderRadius: BorderRadius.md,
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    outline: 'none'
  },
  
  // Size Variants
  sizes: {
    xs: {
      padding: `${Spacing.xs} ${Spacing.sm}`,
      fontSize: Typography.fontSize.caption,
      minHeight: '1.5rem',
      gap: Spacing.xs
    },
    sm: {
      padding: `${Spacing.sm} ${Spacing.md}`,
      fontSize: Typography.fontSize.bodySmall,
      minHeight: '2rem',
      gap: Spacing.xs
    },
    md: {
      padding: `${Spacing.md} ${Spacing.lg}`,
      fontSize: Typography.fontSize.bodyMedium,
      minHeight: '2.5rem',
      gap: Spacing.sm
    },
    lg: {
      padding: `${Spacing.lg} ${Spacing.xl}`,
      fontSize: Typography.fontSize.bodyLarge,
      minHeight: '3rem',
      gap: Spacing.sm
    },
    xl: {
      padding: `${Spacing.xl} ${Spacing['2xl']}`,
      fontSize: Typography.fontSize.h6,
      minHeight: '3.5rem',
      gap: Spacing.md
    }
  },
  
  // Usage Guidelines
  usage: {
    primary: 'Main call-to-action, most important action on page',
    secondary: 'Secondary actions, alternative to primary',
    outline: 'Tertiary actions, less prominent actions',
    ghost: 'Subtle actions, navigation elements',
    success: 'Positive actions, confirmations',
    warning: 'Caution actions, important notices',
    error: 'Destructive actions, deletions'
  },
  
  // Accessibility
  accessibility: {
    minTouchTarget: '44px', // Minimum touch target size
    colorContrast: '4.5:1', // WCAG AA compliance
    focusIndicator: 'Visible focus outline required',
    ariaLabels: 'Descriptive labels for screen readers'
  }
} as const;

// ============================================================================
// TYPOGRAPHY STYLE GUIDE
// ============================================================================

export const TypographyStyles = {
  // Hierarchy Guidelines
  hierarchy: {
    displayLarge: 'Hero headlines, major page titles',
    displayMedium: 'Section headlines, important announcements',
    displaySmall: 'Subsection headlines, feature titles',
    h1: 'Page titles, main content headers',
    h2: 'Section headers, major content divisions',
    h3: 'Subsection headers, card titles',
    h4: 'Component headers, minor sections',
    h5: 'Small headers, metadata labels',
    h6: 'Micro headers, fine print headers',
    bodyLarge: 'Important body text, introductions',
    bodyMedium: 'Standard body text, descriptions',
    bodySmall: 'Secondary text, captions',
    caption: 'Fine print, metadata, timestamps',
    overline: 'Labels, categories, tags'
  },
  
  // Content Patterns
  patterns: {
    heroText: {
      variant: 'displayLarge',
      maxWidth: '800px',
      textAlign: 'center',
      lineHeight: Typography.lineHeight.tight
    },
    sectionTitle: {
      variant: 'h1',
      marginBottom: Spacing.lg,
      textAlign: 'center'
    },
    cardTitle: {
      variant: 'h3',
      marginBottom: Spacing.md,
      color: Colors.text.primary
    },
    bodyText: {
      variant: 'bodyMedium',
      lineHeight: Typography.lineHeight.relaxed,
      maxWidth: '65ch' // Optimal reading width
    },
    caption: {
      variant: 'caption',
      color: Colors.text.tertiary,
      fontStyle: 'italic'
    }
  },
  
  // Responsive Typography
  responsive: {
    mobile: {
      displayLarge: '2.5rem',
      displayMedium: '2rem',
      h1: '1.75rem',
      h2: '1.5rem'
    },
    tablet: {
      displayLarge: '3.5rem',
      displayMedium: '2.75rem',
      h1: '2.25rem',
      h2: '1.875rem'
    },
    desktop: {
      displayLarge: '4rem',
      displayMedium: '3.5rem',
      h1: '2.5rem',
      h2: '2rem'
    }
  }
} as const;

// ============================================================================
// CARD STYLE GUIDE
// ============================================================================

export const CardStyles = {
  // Card Variants
  variants: {
    default: {
      backgroundColor: Colors.background.primary,
      border: `1px solid ${Colors.border.secondary}`,
      boxShadow: Shadows.sm,
      usage: 'Standard content cards'
    },
    elevated: {
      backgroundColor: Colors.background.primary,
      boxShadow: Shadows.lg,
      border: 'none',
      usage: 'Important content, featured items'
    },
    outlined: {
      backgroundColor: Colors.background.primary,
      border: `2px solid ${Colors.border.primary}`,
      boxShadow: 'none',
      usage: 'Emphasized content without elevation'
    },
    filled: {
      backgroundColor: Colors.background.secondary,
      border: 'none',
      boxShadow: 'none',
      usage: 'Subtle content containers'
    }
  },
  
  // Card Anatomy
  anatomy: {
    header: {
      padding: `${Spacing.lg} ${Spacing.lg} 0`,
      borderBottom: `1px solid ${Colors.border.light}`
    },
    content: {
      padding: Spacing.lg,
      flex: 1
    },
    footer: {
      padding: `0 ${Spacing.lg} ${Spacing.lg}`,
      borderTop: `1px solid ${Colors.border.light}`
    },
    media: {
      aspectRatio: '16:9',
      objectFit: 'cover',
      borderRadius: `${BorderRadius.lg} ${BorderRadius.lg} 0 0`
    }
  },
  
  // Interactive Cards
  interactive: {
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: Shadows.xl,
      transition: 'all 0.2s ease-in-out'
    },
    clickable: {
      cursor: 'pointer',
      userSelect: 'none'
    }
  }
} as const;

// ============================================================================
// FORM STYLE GUIDE
// ============================================================================

export const FormStyles = {
  // Input Base Styles
  inputBase: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.bodyMedium,
    padding: `${Spacing.md} ${Spacing.lg}`,
    borderRadius: BorderRadius.md,
    border: `2px solid ${Colors.border.primary}`,
    backgroundColor: Colors.background.primary,
    transition: 'all 0.2s ease-in-out',
    outline: 'none'
  },
  
  // Input States
  inputStates: {
    default: {
      borderColor: Colors.border.primary,
      color: Colors.text.primary
    },
    focus: {
      borderColor: Colors.primary.blue,
      boxShadow: `0 0 0 3px ${Colors.primary.blue}20`
    },
    error: {
      borderColor: Colors.secondary.error,
      boxShadow: `0 0 0 3px ${Colors.secondary.error}20`
    },
    success: {
      borderColor: Colors.secondary.success,
      boxShadow: `0 0 0 3px ${Colors.secondary.success}20`
    },
    disabled: {
      backgroundColor: Colors.background.tertiary,
      borderColor: Colors.border.secondary,
      color: Colors.text.tertiary,
      cursor: 'not-allowed'
    }
  },
  
  // Label Styles
  label: {
    fontSize: Typography.fontSize.bodySmall,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
    display: 'block'
  },
  
  // Helper Text
  helperText: {
    fontSize: Typography.fontSize.caption,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs
  },
  
  // Error Text
  errorText: {
    fontSize: Typography.fontSize.caption,
    color: Colors.secondary.error,
    marginTop: Spacing.xs
  }
} as const;

// ============================================================================
// LAYOUT PATTERNS
// ============================================================================

export const LayoutPatterns = {
  // Section Spacing
  sections: {
    hero: {
      paddingY: Spacing['8xl'],
      paddingX: Spacing.lg
    },
    content: {
      paddingY: Spacing['6xl'],
      paddingX: Spacing.lg
    },
    compact: {
      paddingY: Spacing['4xl'],
      paddingX: Spacing.lg
    }
  },
  
  // Container Patterns
  containers: {
    narrow: {
      maxWidth: '600px',
      margin: '0 auto',
      usage: 'Forms, single-column content'
    },
    medium: {
      maxWidth: '800px',
      margin: '0 auto',
      usage: 'Articles, detailed content'
    },
    wide: {
      maxWidth: '1200px',
      margin: '0 auto',
      usage: 'Multi-column layouts, dashboards'
    },
    full: {
      maxWidth: '100%',
      usage: 'Full-width content, hero sections'
    }
  },
  
  // Grid Patterns
  grids: {
    cards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: Spacing['2xl']
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: Spacing.xl
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: Spacing.lg
    }
  }
} as const;
