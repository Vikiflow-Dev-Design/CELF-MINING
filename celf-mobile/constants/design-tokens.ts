/**
 * CELF Mobile App Design Tokens
 * 
 * Centralized design system constants for consistent styling
 * across the entire application. Based on the CELF Style Guide.
 */

// ============================================================================
// COLORS
// ============================================================================

export const Colors = {
  // Primary Colors
  primary: {
    blue: '#1E40AF',
    light: '#3B82F6',
    dark: '#1E3A8A',
  },

  // Accent Color (for mining and special features)
  accent: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },

  // Status Colors (functional feedback only)
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },

  // Legacy Secondary Colors (for backward compatibility)
  secondary: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },

  // Neutral Colors
  neutral: {
    900: '#111827', // Text Primary
    700: '#374151', // Text Secondary
    500: '#6B7280', // Text Tertiary
    300: '#D1D5DB', // Borders
    100: '#F3F4F6', // Background Light
    50: '#F9FAFB',  // Background Lightest
    white: '#FFFFFF',
    black: '#000000',
  },

  // Semantic Colors (aliases for easier usage)
  text: {
    primary: '#111827',
    secondary: '#374151',
    tertiary: '#6B7280',
    inverse: '#FFFFFF',
  },

  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  border: {
    primary: '#D1D5DB',
    secondary: '#F3F4F6',
  },

  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },

  // Icon Color System (NEW - Unified icon colors)
  icon: {
    primary: '#1E40AF',      // Main navigation, primary actions
    secondary: '#4B5563',    // Supporting actions, decorative
    tertiary: '#9CA3AF',     // Minimal emphasis, arrows
    accent: '#F59E0B',       // Mining, special features
    inverse: '#FFFFFF',      // On dark backgrounds
    success: '#10B981',      // Success states
    error: '#EF4444',        // Error states
    warning: '#F59E0B',      // Warning states
  },

  // Dark Theme Colors
  dark: {
    // Dark Background Colors
    background: {
      primary: '#0F172A',    // Main dark background (slate-900)
      secondary: '#1E293B',  // Card backgrounds (slate-800)
      tertiary: '#334155',   // Elevated surfaces (slate-700)
    },

    // Dark Text Colors (Improved contrast)
    text: {
      primary: '#FFFFFF',    // Pure white for maximum contrast
      secondary: '#E2E8F0',  // Lighter secondary text (slate-200)
      tertiary: '#CBD5E1',   // Improved tertiary text (slate-300)
      inverse: '#FFFFFF',    // Inverse text (white on colored backgrounds)
    },

    // Dark Border Colors (Improved visibility)
    border: {
      primary: '#64748B',    // Lighter primary borders (slate-500)
      secondary: '#475569',  // Improved secondary borders (slate-600)
    },

    // Dark Icon Colors (Improved visibility)
    icon: {
      primary: '#60A5FA',    // Brighter blue for better visibility (blue-400)
      secondary: '#CBD5E1',  // Lighter secondary icons (slate-300)
      tertiary: '#94A3B8',   // Improved tertiary icons (slate-400)
      accent: '#F59E0B',     // Accent stays the same
      inverse: '#0F172A',    // Inverse icons (dark on light)
      success: '#10B981',    // Status colors stay the same
      error: '#EF4444',
      warning: '#F59E0B',
    },
  },
} as const;

// ============================================================================
// GRADIENTS
// ============================================================================

export const Gradients = {
  primary: ['#1E40AF', '#3B82F6'],
  success: ['#10B981', '#34D399'],
  mining: ['#F59E0B', '#FBBF24'],
  sunset: ['#F59E0B', '#EF4444'],
  ocean: ['#06B6D4', '#1E40AF'],
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const Typography = {
  // Font Families
  fontFamily: {
    primary: 'Inter',
    monospace: 'SF Mono',
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Font Sizes (in pixels)
  fontSize: {
    // Display
    displayLarge: 48,
    displayMedium: 40,
    displaySmall: 32,

    // Headings
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 18,

    // Body
    bodyLarge: 18,
    bodyMedium: 16,
    bodySmall: 14,

    // Utility
    caption: 12,
    overline: 10,
  },

  // Line Heights (in pixels)
  lineHeight: {
    // Display
    displayLarge: 56,
    displayMedium: 48,
    displaySmall: 40,

    // Headings
    h1: 36,
    h2: 32,
    h3: 28,
    h4: 24,

    // Body
    bodyLarge: 28,
    bodyMedium: 24,
    bodySmall: 20,

    // Utility
    caption: 16,
    overline: 16,
  },

  // Font Weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

// ============================================================================
// shadowS
// ============================================================================

export const shadows = {
  none: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

// ============================================================================
// LAYOUT
// ============================================================================

export const Layout = {
  // Screen margins
  screenMargin: {
    mobile: 16,
    tablet: 24,
  },

  // Grid gutters
  gridGutter: {
    mobile: 8,
    tablet: 16,
  },

  // Component dimensions
  touchTarget: {
    minimum: 44,
  },

  tabBar: {
    height: 80,
  },

  header: {
    height: 56,
  },

  // Breakpoints
  breakpoints: {
    mobile: 767,
    tablet: 1023,
  },
} as const;

// ============================================================================
// ANIMATION
// ============================================================================

export const Animation = {
  // Timing functions
  easing: {
    easeOut: [0.0, 0.0, 0.2, 1],
    easeIn: [0.4, 0.0, 1, 1],
    easeInOut: [0.4, 0.0, 0.2, 1],
  },

  // Durations (in milliseconds)
  duration: {
    fast: 150,
    medium: 250,
    slow: 350,
  },

  // Common animation values
  scale: {
    pressed: 0.95,
    hover: 1.05,
  },
} as const;

// ============================================================================
// ICON SIZES
// ============================================================================

export const IconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

// ============================================================================
// Z-INDEX
// ============================================================================

export const ZIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
} as const;

// ============================================================================
// OPACITY
// ============================================================================

export const Opacity = {
  disabled: 0.5,
  pressed: 0.8,
  overlay: 0.6,
  subtle: 0.1,
} as const;

// ============================================================================
// COMPONENT SPECIFIC TOKENS
// ============================================================================

export const Components = {
  button: {
    height: {
      small: 36,
      medium: 48,
      large: 56,
      mining: 64,
    },
    padding: {
      horizontal: 24,
      vertical: 12,
    },
  },

  card: {
    padding: 16,
    borderRadius: BorderRadius.lg,
  },

  input: {
    height: 48,
    padding: {
      horizontal: 16,
      vertical: 12,
    },
    borderRadius: BorderRadius.md,
  },

  avatar: {
    size: {
      small: 32,
      medium: 48,
      large: 64,
      xlarge: 96,
    },
  },
} as const;

// ============================================================================
// THEME VARIANTS
// ============================================================================

export const Theme = {
  light: {
    colors: {
      background: Colors.background.primary,
      surface: Colors.background.secondary,
      text: Colors.text.primary,
      textSecondary: Colors.text.secondary,
      border: Colors.border.primary,
    },
  },
  dark: {
    colors: {
      background: Colors.dark.background.primary,
      surface: Colors.dark.background.secondary,
      text: Colors.dark.text.primary,
      textSecondary: Colors.dark.text.secondary,
      border: Colors.dark.border.primary,
    },
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get responsive spacing based on screen size
 */
export const getResponsiveSpacing = (mobile: number, tablet?: number) => ({
  mobile,
  tablet: tablet || mobile * 1.5,
});

/**
 * Get shadow color with opacity
 */
export const getshadowColor = (color: string, opacity: number) => 
  `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;

/**
 * Convert hex color to rgba
 */
export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  Colors,
  Gradients,
  Typography,
  Spacing,
  BorderRadius,
  shadows,
  Layout,
  Animation,
  IconSizes,
  ZIndex,
  Opacity,
  Components,
  Theme,
};
