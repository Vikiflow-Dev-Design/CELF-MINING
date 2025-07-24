import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { useLocalSearchParams } from 'expo-router';

interface LoadingConfig {
  type: 'mining' | 'transaction' | 'sync' | 'auth' | 'general';
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export default function LoadingScreen() {
  const { 
    type = 'general',
    message = '',
    showProgress = 'false',
    progress = '0'
  } = useLocalSearchParams();

  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    // Spinning animation for main icon
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Pulsing animation for background elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Dots animation for loading text
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotsAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(dotsAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Progress animation
    if (showProgress === 'true') {
      Animated.timing(progressAnim, {
        toValue: parseFloat(progress as string) / 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, showProgress]);

  const getLoadingConfig = (): LoadingConfig => {
    switch (type) {
      case 'mining':
        return {
          type: 'mining',
          message: message || 'Starting mining session...',
          showProgress: showProgress === 'true',
          progress: parseFloat(progress as string)
        };
      case 'transaction':
        return {
          type: 'transaction',
          message: message || 'Processing transaction...',
          showProgress: showProgress === 'true',
          progress: parseFloat(progress as string)
        };
      case 'sync':
        return {
          type: 'sync',
          message: message || 'Syncing with network...',
          showProgress: showProgress === 'true',
          progress: parseFloat(progress as string)
        };
      case 'auth':
        return {
          type: 'auth',
          message: message || 'Authenticating...',
          showProgress: false,
          progress: 0
        };
      default:
        return {
          type: 'general',
          message: message || 'Loading...',
          showProgress: showProgress === 'true',
          progress: parseFloat(progress as string)
        };
    }
  };

  const config = getLoadingConfig();

  const getTypeIcon = () => {
    switch (config.type) {
      case 'mining': return 'diamond';
      case 'transaction': return 'send';
      case 'sync': return 'sync';
      case 'auth': return 'key';
      default: return 'hourglass';
    }
  };

  const getTypeColor = () => {
    switch (config.type) {
      case 'mining': return Colors.secondary.warning;
      case 'transaction': return Colors.secondary.info;
      case 'sync': return Colors.secondary.success;
      case 'auth': return Colors.secondary.error;
      default: return Colors.primary.blue;
    }
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulse = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.1],
  });

  const dotsOpacity = dotsAnim.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0.3, 1, 0.3, 1],
  });

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.background.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Spacing['2xl'],
    }}>
      {/* Background Pulse Circles */}
      <Animated.View style={{
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: getTypeColor(),
        opacity: pulseOpacity,
        transform: [{ scale: pulse }],
      }} />
      
      <Animated.View style={{
        position: 'absolute',
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.3,
        backgroundColor: getTypeColor(),
        opacity: pulseOpacity,
        transform: [{ scale: pulse }],
      }} />

      {/* Main Loading Content */}
      <View style={{ alignItems: 'center', zIndex: 1 }}>
        {/* CELF Logo/Icon */}
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 30,
          backgroundColor: Colors.background.secondary,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Spacing['2xl'],
          shadowColor: getTypeColor(),
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}>
          <Typography variant="displayLarge" weight="bold" style={{ color: getTypeColor() }}>
            C
          </Typography>
        </View>

        {/* Spinning Type Icon */}
        <Animated.View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: getTypeColor() + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Spacing['2xl'],
          transform: [{ rotate: spin }],
        }}>
          <Ionicons name={getTypeIcon() as any} size={40} color={getTypeColor()} />
        </Animated.View>

        {/* Loading Message */}
        <View style={{ alignItems: 'center', marginBottom: Spacing['2xl'] }}>
          <Typography variant="h2" weight="semibold" style={{ textAlign: 'center', marginBottom: Spacing.md }}>
            {config.message}
          </Typography>
          
          {/* Animated Dots */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant="bodyLarge" color="secondary">
              Please wait
            </Typography>
            <Animated.View style={{ opacity: dotsOpacity, marginLeft: Spacing.sm }}>
              <Typography variant="bodyLarge" color="secondary">
                ...
              </Typography>
            </Animated.View>
          </View>
        </View>

        {/* Progress Bar */}
        {config.showProgress && (
          <View style={{ width: '100%', alignItems: 'center', marginBottom: Spacing['2xl'] }}>
            <View style={{
              width: '80%',
              height: 8,
              backgroundColor: Colors.background.tertiary,
              borderRadius: 4,
              overflow: 'hidden',
              marginBottom: Spacing.md,
            }}>
              <Animated.View style={{
                height: '100%',
                backgroundColor: getTypeColor(),
                borderRadius: 4,
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }} />
            </View>
            
            <Typography variant="bodyMedium" color="secondary">
              {Math.round(config.progress)}% Complete
            </Typography>
          </View>
        )}

        {/* Loading Steps (for complex operations) */}
        {(config.type === 'sync' || config.type === 'mining') && (
          <View style={{
            backgroundColor: Colors.background.secondary,
            padding: Spacing.lg,
            borderRadius: BorderRadius.lg,
            width: '100%',
            maxWidth: 300,
          }}>
            <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.md, textAlign: 'center' }}>
              {config.type === 'sync' ? 'Synchronization Steps' : 'Mining Setup'}
            </Typography>
            
            <View style={{ gap: Spacing.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodySmall" color="secondary">
                  {config.type === 'sync' ? 'Connecting to network' : 'Initializing mining engine'}
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodySmall" color="secondary">
                  {config.type === 'sync' ? 'Downloading latest data' : 'Optimizing device performance'}
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: getTypeColor(),
                  marginRight: Spacing.sm,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Animated.View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: getTypeColor(),
                    opacity: pulseAnim,
                  }} />
                </View>
                <Typography variant="bodySmall" color="secondary">
                  {config.type === 'sync' ? 'Synchronizing wallet' : 'Starting mining session'}
                </Typography>
              </View>
            </View>
          </View>
        )}

        {/* Tips for longer operations */}
        {config.type === 'sync' && (
          <View style={{
            backgroundColor: Colors.secondary.info + '10',
            padding: Spacing.md,
            borderRadius: BorderRadius.md,
            marginTop: Spacing.lg,
            width: '100%',
            maxWidth: 300,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="information-circle" size={16} color={Colors.secondary.info} style={{ marginRight: Spacing.sm, marginTop: 2 }} />
              <Typography variant="bodySmall" style={{ flex: 1, lineHeight: 18 }}>
                First sync may take a few minutes. Keep the app open for best performance.
              </Typography>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
