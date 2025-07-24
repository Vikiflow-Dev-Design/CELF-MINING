/**
 * CELF Style Utilities
 * Helper functions for applying consistent styles across components
 */

import { 
  Colors, 
  Typography, 
  Spacing, 
  BorderRadius, 
  Shadows,
  ComponentPatterns,
  ButtonStyles,
  LayoutUtilities
} from '@/lib/constants';

// ============================================================================
// STYLE GENERATORS
// ============================================================================

/**
 * Generate button styles based on variant and size
 */
export const generateButtonStyles = (
  variant: keyof typeof ButtonStyles.usage = 'primary',
  size: keyof typeof ButtonStyles.sizes = 'md'
) => {
  const baseStyles = ButtonStyles.base;
  const sizeStyles = ButtonStyles.sizes[size];
  
  const variantStyles = {
    primary: {
      backgroundColor: Colors.primary.blue,
      color: Colors.text.inverse,
      border: `2px solid ${Colors.primary.blue}`,
    },
    secondary: {
      backgroundColor: Colors.background.primary,
      color: Colors.primary.blue,
      border: `2px solid ${Colors.primary.blue}`,
    },
    outline: {
      backgroundColor: 'transparent',
      color: Colors.text.primary,
      border: `2px solid ${Colors.border.primary}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: Colors.text.primary,
      border: '2px solid transparent',
    },
    success: {
      backgroundColor: Colors.secondary.success,
      color: Colors.text.inverse,
      border: `2px solid ${Colors.secondary.success}`,
    },
    warning: {
      backgroundColor: Colors.secondary.warning,
      color: Colors.text.inverse,
      border: `2px solid ${Colors.secondary.warning}`,
    },
    error: {
      backgroundColor: Colors.secondary.error,
      color: Colors.text.inverse,
      border: `2px solid ${Colors.secondary.error}`,
    }
  };

  return {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles[variant]
  };
};

/**
 * Generate card styles based on variant and elevation
 */
export const generateCardStyles = (
  variant: 'default' | 'elevated' | 'outlined' | 'filled' = 'default',
  hover: boolean = false
) => {
  const baseStyles = {
    borderRadius: BorderRadius.lg,
    transition: ComponentPatterns.interactiveStates.default.transition
  };

  const variantStyles = {
    default: {
      backgroundColor: Colors.background.primary,
      border: `1px solid ${Colors.border.secondary}`,
      boxShadow: Shadows.sm
    },
    elevated: {
      backgroundColor: Colors.background.primary,
      border: 'none',
      boxShadow: Shadows.lg
    },
    outlined: {
      backgroundColor: Colors.background.primary,
      border: `2px solid ${Colors.border.primary}`,
      boxShadow: 'none'
    },
    filled: {
      backgroundColor: Colors.background.secondary,
      border: 'none',
      boxShadow: 'none'
    }
  };

  const hoverStyles = hover ? {
    cursor: 'pointer',
    ':hover': ComponentPatterns.interactiveStates.hover
  } : {};

  return {
    ...baseStyles,
    ...variantStyles[variant],
    ...hoverStyles
  };
};

/**
 * Generate typography styles based on variant and modifiers
 */
export const generateTypographyStyles = (
  variant: string,
  color?: string,
  weight?: string,
  align?: string
) => {
  const variantStyles = {
    displayLarge: {
      fontSize: Typography.fontSize.displayLarge,
      fontWeight: Typography.fontWeight.bold,
      lineHeight: Typography.lineHeight.tight
    },
    displayMedium: {
      fontSize: Typography.fontSize.displayMedium,
      fontWeight: Typography.fontWeight.bold,
      lineHeight: Typography.lineHeight.tight
    },
    displaySmall: {
      fontSize: Typography.fontSize.displaySmall,
      fontWeight: Typography.fontWeight.bold,
      lineHeight: Typography.lineHeight.tight
    },
    h1: {
      fontSize: Typography.fontSize.h1,
      fontWeight: Typography.fontWeight.bold,
      lineHeight: Typography.lineHeight.tight
    },
    h2: {
      fontSize: Typography.fontSize.h2,
      fontWeight: Typography.fontWeight.bold,
      lineHeight: Typography.lineHeight.tight
    },
    h3: {
      fontSize: Typography.fontSize.h3,
      fontWeight: Typography.fontWeight.semibold,
      lineHeight: Typography.lineHeight.normal
    },
    h4: {
      fontSize: Typography.fontSize.h4,
      fontWeight: Typography.fontWeight.semibold,
      lineHeight: Typography.lineHeight.normal
    },
    h5: {
      fontSize: Typography.fontSize.h5,
      fontWeight: Typography.fontWeight.semibold,
      lineHeight: Typography.lineHeight.normal
    },
    h6: {
      fontSize: Typography.fontSize.h6,
      fontWeight: Typography.fontWeight.semibold,
      lineHeight: Typography.lineHeight.normal
    },
    bodyLarge: {
      fontSize: Typography.fontSize.bodyLarge,
      fontWeight: Typography.fontWeight.regular,
      lineHeight: Typography.lineHeight.relaxed
    },
    bodyMedium: {
      fontSize: Typography.fontSize.bodyMedium,
      fontWeight: Typography.fontWeight.regular,
      lineHeight: Typography.lineHeight.normal
    },
    bodySmall: {
      fontSize: Typography.fontSize.bodySmall,
      fontWeight: Typography.fontWeight.regular,
      lineHeight: Typography.lineHeight.normal
    },
    caption: {
      fontSize: Typography.fontSize.caption,
      fontWeight: Typography.fontWeight.regular,
      lineHeight: Typography.lineHeight.normal
    },
    overline: {
      fontSize: Typography.fontSize.overline,
      fontWeight: Typography.fontWeight.semibold,
      lineHeight: Typography.lineHeight.normal,
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }
  };

  const colorStyles = color ? {
    primary: { color: Colors.text.primary },
    secondary: { color: Colors.text.secondary },
    tertiary: { color: Colors.text.tertiary },
    inverse: { color: Colors.text.inverse },
    muted: { color: Colors.text.muted },
    success: { color: Colors.secondary.success },
    warning: { color: Colors.secondary.warning },
    error: { color: Colors.secondary.error },
    info: { color: Colors.secondary.info }
  }[color] : {};

  const weightStyles = weight ? {
    fontWeight: Typography.fontWeight[weight as keyof typeof Typography.fontWeight]
  } : {};

  const alignStyles = align ? { textAlign: align } : {};

  return {
    fontFamily: Typography.fontFamily.primary,
    margin: 0,
    ...variantStyles[variant as keyof typeof variantStyles],
    ...colorStyles,
    ...weightStyles,
    ...alignStyles
  };
};

// ============================================================================
// LAYOUT UTILITIES
// ============================================================================

/**
 * Generate responsive container styles
 */
export const generateContainerStyles = (
  variant: 'fluid' | 'fixed' | 'narrow' | 'wide' = 'fixed'
) => {
  const containerStyles = {
    fluid: {
      width: '100%',
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    fixed: {
      maxWidth: '1440px',
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    narrow: {
      maxWidth: '800px',
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    wide: {
      maxWidth: '1600px',
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  };

  return containerStyles[variant];
};

/**
 * Generate section spacing styles
 */
export const generateSectionStyles = (
  variant: 'hero' | 'content' | 'compact' = 'content'
) => {
  const sectionStyles = {
    hero: {
      paddingTop: Spacing['8xl'],
      paddingBottom: Spacing['8xl'],
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg
    },
    content: {
      paddingTop: Spacing['6xl'],
      paddingBottom: Spacing['6xl'],
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg
    },
    compact: {
      paddingTop: Spacing['4xl'],
      paddingBottom: Spacing['4xl'],
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg
    }
  };

  return sectionStyles[variant];
};

/**
 * Generate grid styles
 */
export const generateGridStyles = (
  columns: number,
  gap: keyof typeof Spacing = 'xl',
  minItemWidth: string = '300px'
) => {
  return {
    display: 'grid',
    gridTemplateColumns: columns > 0 
      ? `repeat(${columns}, 1fr)` 
      : `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
    gap: Spacing[gap]
  };
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Combine multiple style objects
 */
export const combineStyles = (...styles: React.CSSProperties[]) => {
  return styles.reduce((combined, style) => ({ ...combined, ...style }), {});
};

/**
 * Apply responsive styles based on breakpoint
 */
export const applyResponsiveStyles = (
  baseStyles: React.CSSProperties,
  responsiveStyles: {
    mobile?: React.CSSProperties;
    tablet?: React.CSSProperties;
    desktop?: React.CSSProperties;
  }
) => {
  // This would typically be handled by CSS-in-JS libraries or CSS modules
  // For now, return base styles with responsive overrides
  return {
    ...baseStyles,
    // Add media queries here when using styled-components or emotion
  };
};

/**
 * Generate focus styles for accessibility
 */
export const generateFocusStyles = () => {
  return {
    outline: `2px solid ${Colors.primary.blue}`,
    outlineOffset: '2px'
  };
};

/**
 * Generate loading state styles
 */
export const generateLoadingStyles = (type: 'skeleton' | 'spinner' | 'shimmer' = 'skeleton') => {
  return ComponentPatterns.loadingStates[type];
};

/**
 * Generate elevation styles
 */
export const generateElevationStyles = (level: keyof typeof ComponentPatterns.elevation = 'raised') => {
  return ComponentPatterns.elevation[level];
};
