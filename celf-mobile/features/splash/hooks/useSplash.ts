/**
 * Splash Hook
 * Custom hook for splash screen functionality
 */

import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay } from 'react-native-reanimated';
import { splashConfig, animationConfig } from '../data';
import { navigateAfterSplash } from '../utils';

export const useSplash = () => {
  // Animation values
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  // Start animations and navigation
  useEffect(() => {
    // Start logo animations
    logoOpacity.value = withTiming(1, animationConfig.logoFadeIn);
    logoScale.value = withSequence(
      withTiming(1.1, animationConfig.logoScale.scaleUp),
      withTiming(1, animationConfig.logoScale.scaleDown)
    );
    
    // Start text animation
    textOpacity.value = withDelay(
      animationConfig.textFadeIn.delay,
      withTiming(1, animationConfig.textFadeIn)
    );

    // Navigate after delay
    const timer = setTimeout(() => {
      navigateAfterSplash();
    }, splashConfig.navigationDelay);

    return () => clearTimeout(timer);
  }, [logoOpacity, logoScale, textOpacity]);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return {
    splashConfig,
    logoAnimatedStyle,
    textAnimatedStyle,
  };
};
