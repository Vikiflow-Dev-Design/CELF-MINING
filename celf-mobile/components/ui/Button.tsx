import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Colors, Typography, BorderRadius, shadows, Components, Animation } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'mining' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large' | 'mining';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const themeColors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(Animation.scale.pressed, { duration: Animation.duration.fast });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: Animation.duration.fast });
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.md,
      paddingHorizontal: Components.button.padding.horizontal,
      paddingVertical: Components.button.padding.vertical,
      minHeight: Components.button.height[size],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[300] : themeColors.primary.blue,
          ...shadows.sm,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? Colors.neutral[300] : themeColors.primary.blue,
        };
      case 'mining':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[300] : themeColors.accent.main,
          borderRadius: BorderRadius.xl,
          minHeight: Components.button.height.mining,
          paddingHorizontal: 32,
          paddingVertical: 20,
          ...shadows.lg,
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[300] : Colors.secondary.success,
          ...shadows.sm,
        };
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[300] : Colors.secondary.warning,
          ...shadows.sm,
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.neutral[300] : Colors.secondary.error,
          ...shadows.sm,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: Typography.fontWeight.semibold,
      textAlign: 'center',
    };

    const sizeStyles = {
      small: { fontSize: Typography.fontSize.bodySmall },
      medium: { fontSize: Typography.fontSize.bodyMedium },
      large: { fontSize: Typography.fontSize.bodyLarge },
      mining: { fontSize: Typography.fontSize.h3, fontWeight: Typography.fontWeight.bold },
    };

    const colorStyles = {
      primary: { color: disabled ? Colors.neutral[500] : Colors.neutral.white },
      secondary: { color: disabled ? Colors.neutral[300] : themeColors.primary.blue },
      mining: { color: disabled ? Colors.neutral[500] : Colors.neutral.white },
      success: { color: disabled ? Colors.neutral[500] : Colors.neutral.white },
      warning: { color: disabled ? Colors.neutral[500] : Colors.neutral.white },
      error: { color: disabled ? Colors.neutral[500] : Colors.neutral.white },
    };

    return {
      ...baseTextStyle,
      ...sizeStyles[size],
      ...colorStyles[variant],
    };
  };

  return (
    <AnimatedTouchableOpacity
      style={[animatedStyle, getButtonStyle(), style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? Colors.primary.blue : Colors.neutral.white} 
          size="small" 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <>{icon}</>
          )}
          <Text style={[getTextStyle(), textStyle, icon && { marginHorizontal: 8 }]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <>{icon}</>
          )}
        </>
      )}
    </AnimatedTouchableOpacity>
  );
};
