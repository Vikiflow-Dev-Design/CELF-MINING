/**
 * CELF Website Design Tokens
 * Centralized design system constants for consistent styling
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

  // Secondary Colors
  secondary: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },

  // Neutral Colors
  neutral: {
    900: '#111827', // Text Primary
    800: '#1F2937', // Text Dark
    700: '#374151', // Text Secondary
    600: '#4B5563', // Text Medium
    500: '#6B7280', // Text Tertiary
    400: '#9CA3AF', // Text Light
    300: '#D1D5DB', // Borders
    200: '#E5E7EB', // Borders Light
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
    muted: '#9CA3AF',
  },

  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    dark: '#111827',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  border: {
    primary: '#D1D5DB',
    secondary: '#E5E7EB',
    light: '#F3F4F6',
  },

  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },
} as const;

// ============================================================================
// GRADIENTS
// ============================================================================

export const Gradients = {
  primary: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
  success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  mining: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
  sunset: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  ocean: 'linear-gradient(135deg, #06B6D4 0%, #1E40AF 100%)',
  hero: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #06B6D4 100%)',
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const Typography = {
  // Font Families
  fontFamily: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace',
  },

  // Font Sizes (in rem)
  fontSize: {
    // Display
    displayLarge: '4rem',    // 64px
    displayMedium: '3.5rem', // 56px
    displaySmall: '3rem',    // 48px

    // Headings
    h1: '2.5rem',   // 40px
    h2: '2rem',     // 32px
    h3: '1.75rem',  // 28px
    h4: '1.5rem',   // 24px
    h5: '1.25rem',  // 20px
    h6: '1.125rem', // 18px

    // Body
    bodyLarge: '1.125rem',  // 18px
    bodyMedium: '1rem',     // 16px
    bodySmall: '0.875rem',  // 14px

    // Utility
    caption: '0.75rem',   // 12px
    overline: '0.625rem', // 10px
  },

  // Font Weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line Heights
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const Spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  '4xl': '2.5rem',  // 40px
  '5xl': '3rem',    // 48px
  '6xl': '4rem',    // 64px
  '7xl': '5rem',    // 80px
  '8xl': '6rem',    // 96px
} as const;

// ============================================================================
// LAYOUT
// ============================================================================

export const Layout = {
  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Screen margins
  screenMargin: {
    mobile: '1rem',
    tablet: '2rem',
    desktop: '3rem',
  },

  // Section spacing
  section: {
    paddingY: '5rem',
    paddingX: '1rem',
  },

  // Header height
  header: {
    height: '4rem',
  },

  // Footer height
  footer: {
    height: '20rem',
  },
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const BorderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

export const Shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const Breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// ANIMATION
// ============================================================================

export const Animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;
