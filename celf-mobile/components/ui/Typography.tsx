import React from 'react';
import { Text, TextStyle } from 'react-native';
import { Colors, Typography as TypographyTokens } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

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
    | 'bodyLarge' 
    | 'bodyMedium' 
    | 'bodySmall'
    | 'caption' 
    | 'overline';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'success' | 'warning' | 'error';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'bodyMedium',
  color = 'primary',
  weight,
  align = 'left',
  style,
  numberOfLines,
}) => {
  const themeColors = useThemeColors();

  const getTextStyle = (): TextStyle => {
    const variantStyles: Record<string, TextStyle> = {
      displayLarge: {
        fontSize: TypographyTokens.fontSize.displayLarge,
        lineHeight: TypographyTokens.lineHeight.displayLarge,
        fontWeight: TypographyTokens.fontWeight.bold,
      },
      displayMedium: {
        fontSize: TypographyTokens.fontSize.displayMedium,
        lineHeight: TypographyTokens.lineHeight.displayMedium,
        fontWeight: TypographyTokens.fontWeight.bold,
      },
      displaySmall: {
        fontSize: TypographyTokens.fontSize.displaySmall,
        lineHeight: TypographyTokens.lineHeight.displaySmall,
        fontWeight: TypographyTokens.fontWeight.bold,
      },
      h1: {
        fontSize: TypographyTokens.fontSize.h1,
        lineHeight: TypographyTokens.lineHeight.h1,
        fontWeight: TypographyTokens.fontWeight.bold,
      },
      h2: {
        fontSize: TypographyTokens.fontSize.h2,
        lineHeight: TypographyTokens.lineHeight.h2,
        fontWeight: TypographyTokens.fontWeight.bold,
      },
      h3: {
        fontSize: TypographyTokens.fontSize.h3,
        lineHeight: TypographyTokens.lineHeight.h3,
        fontWeight: TypographyTokens.fontWeight.semibold,
      },
      h4: {
        fontSize: TypographyTokens.fontSize.h4,
        lineHeight: TypographyTokens.lineHeight.h4,
        fontWeight: TypographyTokens.fontWeight.semibold,
      },
      bodyLarge: {
        fontSize: TypographyTokens.fontSize.bodyLarge,
        lineHeight: TypographyTokens.lineHeight.bodyLarge,
        fontWeight: TypographyTokens.fontWeight.regular,
      },
      bodyMedium: {
        fontSize: TypographyTokens.fontSize.bodyMedium,
        lineHeight: TypographyTokens.lineHeight.bodyMedium,
        fontWeight: TypographyTokens.fontWeight.regular,
      },
      bodySmall: {
        fontSize: TypographyTokens.fontSize.bodySmall,
        lineHeight: TypographyTokens.lineHeight.bodySmall,
        fontWeight: TypographyTokens.fontWeight.regular,
      },
      caption: {
        fontSize: TypographyTokens.fontSize.caption,
        lineHeight: TypographyTokens.lineHeight.caption,
        fontWeight: TypographyTokens.fontWeight.medium,
      },
      overline: {
        fontSize: TypographyTokens.fontSize.overline,
        lineHeight: TypographyTokens.lineHeight.overline,
        fontWeight: TypographyTokens.fontWeight.bold,
        textTransform: 'uppercase',
        letterSpacing: 1,
      },
    };

    const colorStyles = {
      primary: { color: themeColors.text.primary },
      secondary: { color: themeColors.text.secondary },
      tertiary: { color: themeColors.text.tertiary },
      inverse: { color: themeColors.text.inverse },
      success: { color: Colors.secondary.success },
      warning: { color: Colors.secondary.warning },
      error: { color: Colors.secondary.error },
    };

    const weightStyles = weight ? {
      fontWeight: TypographyTokens.fontWeight[weight],
    } : {};

    const alignStyles = {
      textAlign: align,
    };

    return {
      ...variantStyles[variant],
      ...colorStyles[color],
      ...weightStyles,
      ...alignStyles,
    };
  };

  return (
    <Text 
      style={[getTextStyle(), style]} 
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};
