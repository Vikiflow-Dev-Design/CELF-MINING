/**
 * CELF Layout and Grid System
 * Comprehensive responsive layout patterns and grid systems
 */

import { Spacing, Breakpoints } from './design-tokens';

// ============================================================================
// RESPONSIVE GRID SYSTEM
// ============================================================================

export const GridSystem = {
  // Grid Configuration
  config: {
    columns: 12,
    gutterWidth: Spacing.lg,
    maxWidth: '1440px',
    margins: {
      mobile: Spacing.lg,
      tablet: Spacing['2xl'],
      desktop: Spacing['3xl']
    }
  },
  
  // Breakpoint System
  breakpoints: {
    xs: '0px',      // Extra small devices
    sm: '640px',    // Small devices (phones)
    md: '768px',    // Medium devices (tablets)
    lg: '1024px',   // Large devices (laptops)
    xl: '1280px',   // Extra large devices (desktops)
    '2xl': '1536px' // 2X large devices (large desktops)
  },
  
  // Column Spans
  spans: {
    1: '8.333333%',
    2: '16.666667%',
    3: '25%',
    4: '33.333333%',
    5: '41.666667%',
    6: '50%',
    7: '58.333333%',
    8: '66.666667%',
    9: '75%',
    10: '83.333333%',
    11: '91.666667%',
    12: '100%'
  },
  
  // Common Grid Patterns
  patterns: {
    // Two Column Layout
    twoColumn: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: Spacing['2xl'],
      responsive: {
        mobile: { gridTemplateColumns: '1fr' },
        tablet: { gridTemplateColumns: '1fr 1fr' }
      }
    },
    
    // Three Column Layout
    threeColumn: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: Spacing.xl,
      responsive: {
        mobile: { gridTemplateColumns: '1fr' },
        tablet: { gridTemplateColumns: 'repeat(2, 1fr)' },
        desktop: { gridTemplateColumns: 'repeat(3, 1fr)' }
      }
    },
    
    // Four Column Layout
    fourColumn: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: Spacing.lg,
      responsive: {
        mobile: { gridTemplateColumns: '1fr' },
        tablet: { gridTemplateColumns: 'repeat(2, 1fr)' },
        desktop: { gridTemplateColumns: 'repeat(4, 1fr)' }
      }
    },
    
    // Auto-fit Grid
    autoFit: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: Spacing.xl
    },
    
    // Sidebar Layout
    sidebar: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: Spacing['2xl'],
      responsive: {
        mobile: { gridTemplateColumns: '1fr' },
        desktop: { gridTemplateColumns: '300px 1fr' }
      }
    }
  }
} as const;

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

export const LayoutComponents = {
  // Container Variants
  containers: {
    // Fluid Container
    fluid: {
      width: '100%',
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    
    // Fixed Container
    fixed: {
      maxWidth: '1440px',
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    
    // Narrow Container
    narrow: {
      maxWidth: '800px',
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    
    // Wide Container
    wide: {
      maxWidth: '1600px',
      paddingLeft: Spacing.lg,
      paddingRight: Spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  
  // Section Layouts
  sections: {
    // Hero Section
    hero: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: `${Spacing['8xl']} ${Spacing.lg}`
    },
    
    // Content Section
    content: {
      padding: `${Spacing['6xl']} ${Spacing.lg}`,
      responsive: {
        mobile: { padding: `${Spacing['4xl']} ${Spacing.lg}` },
        desktop: { padding: `${Spacing['6xl']} ${Spacing.lg}` }
      }
    },
    
    // Feature Section
    feature: {
      padding: `${Spacing['5xl']} ${Spacing.lg}`,
      backgroundColor: 'var(--background-secondary)'
    },
    
    // CTA Section
    cta: {
      padding: `${Spacing['4xl']} ${Spacing.lg}`,
      textAlign: 'center',
      backgroundColor: 'var(--primary-blue)'
    }
  },
  
  // Header Layouts
  headers: {
    // Standard Header
    standard: {
      height: '4rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${Spacing.lg}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    
    // Tall Header
    tall: {
      height: '5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${Spacing.lg}`
    },
    
    // Centered Header
    centered: {
      height: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `0 ${Spacing.lg}`
    }
  },
  
  // Footer Layouts
  footers: {
    // Multi-column Footer
    multiColumn: {
      padding: `${Spacing['6xl']} ${Spacing.lg} ${Spacing['2xl']}`,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: Spacing['4xl']
    },
    
    // Simple Footer
    simple: {
      padding: `${Spacing['2xl']} ${Spacing.lg}`,
      textAlign: 'center',
      borderTop: '1px solid var(--border-secondary)'
    },
    
    // Stacked Footer
    stacked: {
      padding: `${Spacing['4xl']} ${Spacing.lg}`,
      display: 'flex',
      flexDirection: 'column',
      gap: Spacing['2xl']
    }
  }
} as const;

// ============================================================================
// SPACING SYSTEM
// ============================================================================

export const SpacingSystem = {
  // Vertical Rhythm
  verticalRhythm: {
    // Section Spacing
    sectionGap: Spacing['6xl'],
    subsectionGap: Spacing['4xl'],
    componentGap: Spacing['2xl'],
    elementGap: Spacing.lg,
    
    // Content Spacing
    paragraphGap: Spacing.lg,
    listItemGap: Spacing.sm,
    headingGap: Spacing.xl,
    
    // Component Internal Spacing
    cardPadding: Spacing.xl,
    buttonPadding: `${Spacing.md} ${Spacing.lg}`,
    inputPadding: `${Spacing.md} ${Spacing.lg}`
  },
  
  // Horizontal Spacing
  horizontalSpacing: {
    // Layout Margins
    pageMargin: Spacing.lg,
    sectionMargin: Spacing['2xl'],
    
    // Component Spacing
    buttonGap: Spacing.md,
    iconGap: Spacing.sm,
    tagGap: Spacing.xs,
    
    // Grid Gutters
    gridGutter: Spacing.lg,
    cardGutter: Spacing.xl,
    columnGutter: Spacing['2xl']
  },
  
  // Responsive Spacing
  responsiveSpacing: {
    mobile: {
      sectionPadding: Spacing['4xl'],
      containerPadding: Spacing.lg,
      gridGap: Spacing.lg
    },
    tablet: {
      sectionPadding: Spacing['5xl'],
      containerPadding: Spacing.xl,
      gridGap: Spacing.xl
    },
    desktop: {
      sectionPadding: Spacing['6xl'],
      containerPadding: Spacing['2xl'],
      gridGap: Spacing['2xl']
    }
  }
} as const;

// ============================================================================
// LAYOUT UTILITIES
// ============================================================================

export const LayoutUtilities = {
  // Flexbox Utilities
  flex: {
    // Flex Direction
    row: { display: 'flex', flexDirection: 'row' },
    column: { display: 'flex', flexDirection: 'column' },
    rowReverse: { display: 'flex', flexDirection: 'row-reverse' },
    columnReverse: { display: 'flex', flexDirection: 'column-reverse' },
    
    // Justify Content
    justifyStart: { justifyContent: 'flex-start' },
    justifyCenter: { justifyContent: 'center' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyAround: { justifyContent: 'space-around' },
    justifyEvenly: { justifyContent: 'space-evenly' },
    
    // Align Items
    alignStart: { alignItems: 'flex-start' },
    alignCenter: { alignItems: 'center' },
    alignEnd: { alignItems: 'flex-end' },
    alignStretch: { alignItems: 'stretch' },
    alignBaseline: { alignItems: 'baseline' },
    
    // Flex Wrap
    wrap: { flexWrap: 'wrap' },
    nowrap: { flexWrap: 'nowrap' },
    wrapReverse: { flexWrap: 'wrap-reverse' }
  },
  
  // Position Utilities
  position: {
    static: { position: 'static' },
    relative: { position: 'relative' },
    absolute: { position: 'absolute' },
    fixed: { position: 'fixed' },
    sticky: { position: 'sticky' }
  },
  
  // Display Utilities
  display: {
    block: { display: 'block' },
    inline: { display: 'inline' },
    inlineBlock: { display: 'inline-block' },
    flex: { display: 'flex' },
    inlineFlex: { display: 'inline-flex' },
    grid: { display: 'grid' },
    inlineGrid: { display: 'inline-grid' },
    none: { display: 'none' }
  },
  
  // Text Alignment
  textAlign: {
    left: { textAlign: 'left' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    justify: { textAlign: 'justify' }
  }
} as const;

// ============================================================================
// RESPONSIVE HELPERS
// ============================================================================

export const ResponsiveHelpers = {
  // Media Query Generator
  mediaQuery: (breakpoint: keyof typeof Breakpoints) => 
    `@media (min-width: ${Breakpoints[breakpoint]})`,
  
  // Responsive Value Helper
  responsiveValue: (values: {
    mobile?: string | number;
    tablet?: string | number;
    desktop?: string | number;
  }) => ({
    default: values.mobile,
    [`@media (min-width: ${Breakpoints.md})`]: values.tablet,
    [`@media (min-width: ${Breakpoints.lg})`]: values.desktop
  }),
  
  // Container Query Helper
  containerQuery: (minWidth: string) => 
    `@container (min-width: ${minWidth})`,
  
  // Aspect Ratio Helper
  aspectRatio: (ratio: string) => ({
    aspectRatio: ratio,
    width: '100%',
    height: 'auto'
  })
} as const;
