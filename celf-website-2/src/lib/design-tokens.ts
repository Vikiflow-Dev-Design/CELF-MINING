/**
 * Design Tokens - Type-safe access to design system values
 * Generated from design-system.json
 */

export const colors = {
  brand: {
    primary: '#9EFF00',
    primaryDark: '#7ACC00',
    accent: '#00FF94',
  },
  background: {
    primary: '#0A0A0A',
    secondary: '#1A1A1A',
    card: 'rgba(26, 26, 26, 0.8)',
    cardHover: 'rgba(26, 26, 26, 1)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    muted: '#808080',
    accent: '#9EFF00',
  },
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    accent: 'rgba(158, 255, 0, 0.1)',
    accentHover: 'rgba(158, 255, 0, 0.3)',
    featured: '#9EFF00',
  }
} as const

export const gradients = {
  primaryGlow: 'radial-gradient(circle, rgba(158, 255, 0, 0.3) 0%, rgba(158, 255, 0, 0) 70%)',
  cardGlow: 'radial-gradient(circle at center, rgba(158, 255, 0, 0.1) 0%, transparent 50%)',
  heroBackground: 'radial-gradient(ellipse at center, rgba(158, 255, 0, 0.05) 0%, transparent 70%)',
  deviceGradient: 'linear-gradient(145deg, #2A2A2A 0%, #1A1A1A 100%)',
  globeGlow: 'radial-gradient(circle, rgba(158, 255, 0, 0.3) 0%, rgba(158, 255, 0, 0.1) 50%, transparent 100%)',
} as const

export const shadows = {
  card: '0 8px 32px rgba(0, 0, 0, 0.3)',
  cardHover: '0 12px 48px rgba(0, 0, 0, 0.4)',
  device: '0 20px 60px rgba(0, 0, 0, 0.5)',
  glow: '0 0 30px rgba(158, 255, 0, 0.2)',
  globeGlow: '0 0 100px rgba(158, 255, 0, 0.3)',
} as const

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
} as const

export const spacing = {
  card: '24px',
  cardLg: '32px',
  section: '60px 0 40px',
  icon: '12px',
} as const

export const typography = {
  hero: {
    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
    fontWeight: '700',
    lineHeight: '1.1',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
  },
} as const

export const animations = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  transforms: {
    cardHover: 'translateY(-4px)',
    buttonHover: 'translateY(-2px)',
  },
} as const

export const backdrop = {
  blur: 'blur(10px)',
  blurStrong: 'blur(15px)',
} as const

// Component-specific token combinations
export const componentTokens = {
  button: {
    primary: {
      background: colors.brand.primary,
      text: '#000000',
      borderRadius: borderRadius.md,
      padding: '16px 32px',
      hover: {
        background: colors.brand.primaryDark,
        transform: animations.transforms.buttonHover,
      },
    },
    secondary: {
      background: 'transparent',
      border: `1px solid ${colors.brand.primary}`,
      text: colors.brand.primary,
      borderRadius: '24px',
      padding: '8px 20px',
      hover: {
        background: colors.brand.primary,
        text: '#000000',
      },
    },
  },
  card: {
    default: {
      background: colors.background.card,
      border: `1px solid ${colors.border.accent}`,
      borderRadius: borderRadius.lg,
      padding: spacing.card,
      shadow: shadows.card,
      backdrop: backdrop.blur,
      hover: {
        border: `1px solid ${colors.border.accentHover}`,
        transform: animations.transforms.cardHover,
        shadow: shadows.cardHover,
      },
    },
  },
  navigation: {
    background: 'rgba(10, 10, 10, 0.95)',
    backdrop: backdrop.blur,
    border: `1px solid ${colors.border.accent}`,
  },
} as const

// Type exports for TypeScript support
export type ColorKey = keyof typeof colors
export type GradientKey = keyof typeof gradients
export type ShadowKey = keyof typeof shadows
export type BorderRadiusKey = keyof typeof borderRadius
