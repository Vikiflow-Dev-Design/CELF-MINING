import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';

export default function NoInternetScreen() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [offlineFeatures] = useState([
    'View your current CELF balance',
    'Check mining session history',
    'Review transaction records',
    'Access account settings',
    'View achievement progress'
  ]);

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for the main icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Wave animation for signal bars
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const checkConnection = async () => {
    setIsChecking(true);
    setLastChecked(new Date());
    
    // Simulate connection check
    setTimeout(() => {
      setIsChecking(false);
      // In a real app, this would check actual network connectivity
      Alert.alert(
        'Connection Check',
        'Still no internet connection detected. Please check your network settings.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const openNetworkSettings = () => {
    Alert.alert(
      'Network Settings',
      'Please check your device network settings to restore internet connectivity.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => {
          // In a real app, this would open device network settings
          Alert.alert('Settings', 'This would open your device network settings.');
        }}
      ]
    );
  };

  const goOffline = () => {
    Alert.alert(
      'Offline Mode',
      'You can continue using CELF with limited functionality while offline.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue Offline', onPress: () => router.replace('/(app)/dashboard') }
      ]
    );
  };

  const pulse = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.1],
  });

  const waveOpacity = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.8],
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['4xl'],
          paddingBottom: 32,
          minHeight: '100%',
          justifyContent: 'center',
        }}>
          
          {/* No Internet Animation */}
          <View style={{ alignItems: 'center', marginBottom: Spacing['2xl'] }}>
            {/* Background pulse effect */}
            <Animated.View style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: Colors.secondary.warning,
              opacity: pulseOpacity,
              transform: [{ scale: pulse }],
            }} />
            
            {/* Main no-internet icon */}
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: Colors.secondary.warning + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
              zIndex: 1,
            }}>
              <Ionicons name="wifi-off" size={60} color={Colors.secondary.warning} />
            </View>
            
            {/* Signal bars animation */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: Spacing.lg }}>
              {[1, 2, 3, 4].map((bar) => (
                <Animated.View
                  key={bar}
                  style={{
                    width: 8,
                    height: bar * 6,
                    backgroundColor: Colors.neutral[400],
                    marginHorizontal: 2,
                    borderRadius: 2,
                    opacity: waveOpacity,
                  }}
                />
              ))}
            </View>
            
            <Typography variant="h1" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.md }}>
              No Internet Connection
            </Typography>
            
            <Typography variant="bodyLarge" color="secondary" style={{ textAlign: 'center', lineHeight: 24 }}>
              CELF needs an internet connection to sync your mining progress and process transactions.
            </Typography>
          </View>

          {/* Connection Status */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.error + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="alert-circle" size={20} color={Colors.secondary.error} />
              </View>
              <Typography variant="h3" weight="semibold">
                Connection Status
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Internet</Typography>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: Colors.secondary.error,
                    marginRight: Spacing.sm,
                  }} />
                  <Typography variant="bodySmall" weight="semibold" style={{ color: Colors.secondary.error }}>
                    Disconnected
                  </Typography>
                </View>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">CELF Servers</Typography>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: Colors.neutral[400],
                    marginRight: Spacing.sm,
                  }} />
                  <Typography variant="bodySmall" weight="semibold" color="tertiary">
                    Unreachable
                  </Typography>
                </View>
              </View>
              
              {lastChecked && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="bodyMedium" color="secondary">Last Checked</Typography>
                  <Typography variant="bodySmall" color="tertiary">
                    {lastChecked.toLocaleTimeString()}
                  </Typography>
                </View>
              )}
            </View>
          </Card>

          {/* Quick Actions */}
          <View style={{ gap: Spacing.md, marginBottom: Spacing['2xl'] }}>
            <Button
              title={isChecking ? "Checking Connection..." : "Check Connection"}
              onPress={checkConnection}
              variant="primary"
              disabled={isChecking}
              loading={isChecking}
              icon={!isChecking ? <Ionicons name="refresh" size={20} color={Colors.neutral.white} /> : undefined}
              style={{
                backgroundColor: Colors.secondary.warning,
                borderColor: Colors.secondary.warning,
                shadowColor: Colors.secondary.warning,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            />
            
            <Button
              title="Network Settings"
              onPress={openNetworkSettings}
              variant="secondary"
              icon={<Ionicons name="settings" size={20} color={Colors.text.primary} />}
            />
          </View>

          {/* Troubleshooting Tips */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.info + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="bulb" size={20} color={Colors.secondary.info} />
              </View>
              <Typography variant="h3" weight="semibold">
                Troubleshooting Tips
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.sm }}>
              {[
                'Check if WiFi or mobile data is enabled',
                'Try switching between WiFi and mobile data',
                'Move closer to your WiFi router',
                'Restart your device network settings',
                'Contact your internet service provider'
              ].map((tip, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Typography variant="bodyMedium" color="secondary" style={{ marginRight: Spacing.sm }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary" style={{ flex: 1, lineHeight: 20 }}>
                    {tip}
                  </Typography>
                </View>
              ))}
            </View>
          </Card>

          {/* Offline Features */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.success + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="phone-portrait" size={20} color={Colors.secondary.success} />
              </View>
              <Typography variant="h3" weight="semibold">
                Available Offline
              </Typography>
            </View>
            
            <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.lg, lineHeight: 20 }}>
              While offline, you can still access these features:
            </Typography>
            
            <View style={{ gap: Spacing.sm }}>
              {offlineFeatures.map((feature, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                  <Typography variant="bodySmall" color="secondary" style={{ flex: 1 }}>
                    {feature}
                  </Typography>
                </View>
              ))}
            </View>
            
            <Button
              title="Continue Offline"
              onPress={goOffline}
              variant="secondary"
              icon={<Ionicons name="arrow-forward" size={20} color={Colors.secondary.success} />}
              style={{
                marginTop: Spacing.lg,
                borderColor: Colors.secondary.success,
                backgroundColor: Colors.secondary.success + '10',
              }}
            />
          </Card>

          {/* Important Notice */}
          <View style={{
            backgroundColor: Colors.secondary.warning + '10',
            padding: Spacing.md,
            borderRadius: BorderRadius.md,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="warning" size={20} color={Colors.secondary.warning} style={{ marginRight: Spacing.sm, marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm, color: Colors.secondary.warning }}>
                  Important Notice
                </Typography>
                <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                  • Mining sessions require internet connectivity
                  {'\n'}• Transactions cannot be processed offline
                  {'\n'}• Data will sync automatically when connection is restored
                  {'\n'}• Your CELF tokens and progress are safely stored
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
