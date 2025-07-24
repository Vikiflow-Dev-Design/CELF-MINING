import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Colors, BorderRadius, shadows, Components } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  gradientColors?: string[];
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  style,
  gradientColors,
}) => {
  const themeColors = useThemeColors();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Components.card.borderRadius,
      overflow: 'hidden',
    };

    const paddingStyles = {
      none: { padding: 0 },
      small: { padding: 12 },
      medium: { padding: Components.card.padding },
      large: { padding: 24 },
    };

    switch (variant) {
      case 'default':
        return {
          ...baseStyle,
          backgroundColor: themeColors.card.background,
          ...shadows.sm,
          ...paddingStyles[padding],
        };
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: themeColors.card.elevated,
          ...shadows.lg,
          ...paddingStyles[padding],
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: themeColors.card.background,
          borderWidth: 1,
          borderColor: themeColors.border.primary,
          ...paddingStyles[padding],
        };
      case 'gradient':
        return {
          ...baseStyle,
          ...paddingStyles[padding],
        };
      default:
        return {
          ...baseStyle,
          ...paddingStyles[padding],
        };
    }
  };

  if (variant === 'gradient' && gradientColors) {
    // For gradient cards, we'll use a simple background color for now
    // In a real implementation, you'd use react-native-linear-gradient
    return (
      <View style={[getCardStyle(), { backgroundColor: gradientColors[0] }, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};
