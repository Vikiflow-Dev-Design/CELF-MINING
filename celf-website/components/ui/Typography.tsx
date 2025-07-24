import React from 'react';
import { Colors, Typography as TypographyTokens } from '@/lib/constants/design-tokens';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: 
    | 'displayLarge' 
    | 'displayMedium' 
    | 'displaySmall'
    | 'h1' 
    | 'h2' 
    | 'h3' 
    | 'h4'
    | 'h5'
    | 'h6'
    | 'bodyLarge' 
    | 'bodyMedium' 
    | 'bodySmall'
    | 'caption' 
    | 'overline';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'muted' | 'success' | 'warning' | 'error' | 'info';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'bodyMedium',
  color = 'primary',
  weight,
  align = 'left',
  className = '',
  style = {},
  as,
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    const variantStyles: Record<string, React.CSSProperties> = {
      displayLarge: {
        fontSize: TypographyTokens.fontSize.displayLarge,
        fontWeight: TypographyTokens.fontWeight.bold,
        lineHeight: TypographyTokens.lineHeight.tight,
      },
      displayMedium: {
        fontSize: TypographyTokens.fontSize.displayMedium,
        fontWeight: TypographyTokens.fontWeight.bold,
        lineHeight: TypographyTokens.lineHeight.tight,
      },
      displaySmall: {
        fontSize: TypographyTokens.fontSize.displaySmall,
        fontWeight: TypographyTokens.fontWeight.bold,
        lineHeight: TypographyTokens.lineHeight.tight,
      },
      h1: {
        fontSize: TypographyTokens.fontSize.h1,
        fontWeight: TypographyTokens.fontWeight.bold,
        lineHeight: TypographyTokens.lineHeight.tight,
      },
      h2: {
        fontSize: TypographyTokens.fontSize.h2,
        fontWeight: TypographyTokens.fontWeight.bold,
        lineHeight: TypographyTokens.lineHeight.tight,
      },
      h3: {
        fontSize: TypographyTokens.fontSize.h3,
        fontWeight: TypographyTokens.fontWeight.semibold,
        lineHeight: TypographyTokens.lineHeight.normal,
      },
      h4: {
        fontSize: TypographyTokens.fontSize.h4,
        fontWeight: TypographyTokens.fontWeight.semibold,
        lineHeight: TypographyTokens.lineHeight.normal,
      },
      h5: {
        fontSize: TypographyTokens.fontSize.h5,
        fontWeight: TypographyTokens.fontWeight.semibold,
        lineHeight: TypographyTokens.lineHeight.normal,
      },
      h6: {
        fontSize: TypographyTokens.fontSize.h6,
        fontWeight: TypographyTokens.fontWeight.semibold,
        lineHeight: TypographyTokens.lineHeight.normal,
      },
      bodyLarge: {
        fontSize: TypographyTokens.fontSize.bodyLarge,
        fontWeight: TypographyTokens.fontWeight.regular,
        lineHeight: TypographyTokens.lineHeight.relaxed,
      },
      bodyMedium: {
        fontSize: TypographyTokens.fontSize.bodyMedium,
        fontWeight: TypographyTokens.fontWeight.regular,
        lineHeight: TypographyTokens.lineHeight.normal,
      },
      bodySmall: {
        fontSize: TypographyTokens.fontSize.bodySmall,
        fontWeight: TypographyTokens.fontWeight.regular,
        lineHeight: TypographyTokens.lineHeight.normal,
      },
      caption: {
        fontSize: TypographyTokens.fontSize.caption,
        fontWeight: TypographyTokens.fontWeight.regular,
        lineHeight: TypographyTokens.lineHeight.normal,
      },
      overline: {
        fontSize: TypographyTokens.fontSize.overline,
        fontWeight: TypographyTokens.fontWeight.semibold,
        lineHeight: TypographyTokens.lineHeight.normal,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
    };

    return variantStyles[variant] || variantStyles.bodyMedium;
  };

  const getColorStyles = () => {
    const colorStyles = {
      primary: { color: Colors.text.primary },
      secondary: { color: Colors.text.secondary },
      tertiary: { color: Colors.text.tertiary },
      inverse: { color: Colors.text.inverse },
      muted: { color: Colors.text.muted },
      success: { color: Colors.secondary.success },
      warning: { color: Colors.secondary.warning },
      error: { color: Colors.secondary.error },
      info: { color: Colors.secondary.info },
    };

    return colorStyles[color] || colorStyles.primary;
  };

  const getWeightStyles = () => {
    if (!weight) return {};
    
    return {
      fontWeight: TypographyTokens.fontWeight[weight],
    };
  };

  const getDefaultElement = () => {
    if (as) return as;
    
    const elementMap: Record<string, string> = {
      displayLarge: 'h1',
      displayMedium: 'h1',
      displaySmall: 'h1',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      bodyLarge: 'p',
      bodyMedium: 'p',
      bodySmall: 'p',
      caption: 'span',
      overline: 'span',
    };

    return elementMap[variant] || 'p';
  };

  const combinedStyles: React.CSSProperties = {
    fontFamily: TypographyTokens.fontFamily.primary,
    textAlign: align,
    margin: 0,
    ...getVariantStyles(),
    ...getColorStyles(),
    ...getWeightStyles(),
    ...style,
  };

  const Element = getDefaultElement() as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={className}
      style={combinedStyles}
    >
      {children}
    </Element>
  );
};
