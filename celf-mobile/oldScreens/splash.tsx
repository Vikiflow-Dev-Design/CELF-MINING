import { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay 
} from 'react-native-reanimated';

export default function SplashScreen() {
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Start animations
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withSequence(
      withTiming(1.1, { duration: 600 }),
      withTiming(1, { duration: 200 })
    );
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));

    // Navigate after animation
    const timer = setTimeout(() => {
      // Check if user is authenticated
      // For now, navigate to auth flow
      router.replace('/(auth)/welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-600 to-blue-800 items-center justify-center px-8">
      <Animated.View style={logoAnimatedStyle} className="items-center mb-8">
        {/* Logo placeholder - replace with actual CELF logo */}
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
          <Text className="text-blue-600 text-2xl font-bold">CELF</Text>
        </View>
      </Animated.View>

      <Animated.View style={textAnimatedStyle} className="items-center">
        <Text className="text-white text-3xl font-bold mb-2">CELF</Text>
        <Text className="text-blue-100 text-lg text-center mb-8">
          Next-Generation Crypto Mining
        </Text>
        
        {/* Loading indicator */}
        <View className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </Animated.View>

      <View className="absolute bottom-12">
        <Text className="text-blue-200 text-sm">Version 1.0.0</Text>
      </View>
    </View>
  );
}
