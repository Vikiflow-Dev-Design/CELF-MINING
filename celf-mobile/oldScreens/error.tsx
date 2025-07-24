import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router, useLocalSearchParams } from 'expo-router';

interface ErrorConfig {
  type: 'network' | 'server' | 'auth' | 'mining' | 'transaction' | 'general';
  title: string;
  message: string;
  icon: string;
  color: string;
  canRetry: boolean;
  showSupport: boolean;
  errorCode?: string;
}

export default function ErrorScreen() {
  const { 
    type = 'general',
    title = '',
    message = '',
    errorCode = '',
    canRetry = 'true',
    showSupport = 'true'
  } = useLocalSearchParams();

  const [isRetrying, setIsRetrying] = useState(false);

  const getErrorConfig = (): ErrorConfig => {
    switch (type) {
      case 'network':
        return {
          type: 'network',
          title: title || 'Connection Error',
          message: message || 'Unable to connect to CELF servers. Please check your internet connection and try again.',
          icon: 'wifi-off',
          color: Colors.secondary.warning,
          canRetry: true,
          showSupport: false,
          errorCode: errorCode as string
        };
      case 'server':
        return {
          type: 'server',
          title: title || 'Server Error',
          message: message || 'CELF servers are temporarily unavailable. Our team has been notified and is working on a fix.',
          icon: 'server',
          color: Colors.secondary.error,
          canRetry: true,
          showSupport: true,
          errorCode: errorCode as string
        };
      case 'auth':
        return {
          type: 'auth',
          title: title || 'Authentication Error',
          message: message || 'Your session has expired. Please log in again to continue using CELF.',
          icon: 'key',
          color: Colors.secondary.error,
          canRetry: false,
          showSupport: true,
          errorCode: errorCode as string
        };
      case 'mining':
        return {
          type: 'mining',
          title: title || 'Mining Error',
          message: message || 'Unable to start mining session. This could be due to device limitations or network issues.',
          icon: 'diamond',
          color: Colors.secondary.warning,
          canRetry: true,
          showSupport: true,
          errorCode: errorCode as string
        };
      case 'transaction':
        return {
          type: 'transaction',
          title: title || 'Transaction Error',
          message: message || 'Transaction failed to process. Your funds are safe and no charges were applied.',
          icon: 'card',
          color: Colors.secondary.error,
          canRetry: true,
          showSupport: true,
          errorCode: errorCode as string
        };
      default:
        return {
          type: 'general',
          title: title || 'Something Went Wrong',
          message: message || 'An unexpected error occurred. Please try again or contact support if the problem persists.',
          icon: 'alert-circle',
          color: Colors.secondary.error,
          canRetry: canRetry === 'true',
          showSupport: showSupport === 'true',
          errorCode: errorCode as string
        };
    }
  };

  const config = getErrorConfig();

  const handleRetry = async () => {
    setIsRetrying(true);
    
    // Simulate retry attempt
    setTimeout(() => {
      setIsRetrying(false);
      // In a real app, this would attempt the failed operation again
      Alert.alert('Retry', 'Attempting to resolve the issue...');
    }, 2000);
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(app)/dashboard');
    }
  };

  const handleContactSupport = () => {
    const subject = `CELF Error Report - ${config.type.toUpperCase()}`;
    const body = `Error Type: ${config.type}\nError Code: ${config.errorCode || 'N/A'}\nTitle: ${config.title}\nMessage: ${config.message}\n\nPlease describe what you were doing when this error occurred:\n\n`;
    
    const mailtoUrl = `mailto:support@celf.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Error', 'Could not open email app. Please contact support@celf.app directly.');
    });
  };

  const handleReportBug = () => {
    Alert.alert(
      'Report Bug',
      'Thank you for helping us improve CELF. Your bug report has been submitted.',
      [{ text: 'OK' }]
    );
  };

  const getQuickSolutions = () => {
    switch (config.type) {
      case 'network':
        return [
          'Check your internet connection',
          'Try switching between WiFi and mobile data',
          'Restart the app',
          'Check if CELF servers are online'
        ];
      case 'mining':
        return [
          'Close other apps to free up memory',
          'Ensure your device has sufficient battery',
          'Check your internet connection',
          'Restart the mining session'
        ];
      case 'transaction':
        return [
          'Verify your wallet balance',
          'Check the recipient address',
          'Ensure network fees are sufficient',
          'Try the transaction again later'
        ];
      case 'auth':
        return [
          'Log out and log back in',
          'Clear app cache',
          'Check your credentials',
          'Reset your password if needed'
        ];
      default:
        return [
          'Restart the app',
          'Check your internet connection',
          'Update to the latest version',
          'Contact support if issue persists'
        ];
    }
  };

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
          
          {/* Error Icon and Title */}
          <View style={{ alignItems: 'center', marginBottom: Spacing['2xl'] }}>
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: config.color + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons name={config.icon as any} size={60} color={config.color} />
            </View>
            
            <Typography variant="h1" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.md }}>
              {config.title}
            </Typography>
            
            <Typography variant="bodyLarge" color="secondary" style={{ textAlign: 'center', lineHeight: 24 }}>
              {config.message}
            </Typography>
            
            {config.errorCode && (
              <View style={{
                backgroundColor: Colors.background.tertiary,
                paddingHorizontal: Spacing.md,
                paddingVertical: Spacing.sm,
                borderRadius: BorderRadius.md,
                marginTop: Spacing.md,
              }}>
                <Typography variant="bodySmall" color="tertiary">
                  Error Code: {config.errorCode}
                </Typography>
              </View>
            )}
          </View>

          {/* Quick Solutions */}
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
                Quick Solutions
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.sm }}>
              {getQuickSolutions().map((solution, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Typography variant="bodyMedium" color="secondary" style={{ marginRight: Spacing.sm }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary" style={{ flex: 1, lineHeight: 20 }}>
                    {solution}
                  </Typography>
                </View>
              ))}
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md, marginBottom: Spacing['2xl'] }}>
            {config.canRetry && (
              <Button
                title={isRetrying ? "Retrying..." : "Try Again"}
                onPress={handleRetry}
                variant="primary"
                disabled={isRetrying}
                loading={isRetrying}
                icon={!isRetrying ? <Ionicons name="refresh" size={20} color={Colors.neutral.white} /> : undefined}
                style={{
                  shadowColor: config.color,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              />
            )}
            
            <Button
              title="Go Back"
              onPress={handleGoBack}
              variant="secondary"
              icon={<Ionicons name="arrow-back" size={20} color={Colors.text.primary} />}
            />
          </View>

          {/* Support Options */}
          {config.showSupport && (
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
                  <Ionicons name="help-circle" size={20} color={Colors.secondary.success} />
                </View>
                <Typography variant="h3" weight="semibold">
                  Need Help?
                </Typography>
              </View>
              
              <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.lg, lineHeight: 20 }}>
                If the problem persists, our support team is here to help you resolve this issue.
              </Typography>
              
              <View style={{ gap: Spacing.md }}>
                <Button
                  title="Contact Support"
                  onPress={handleContactSupport}
                  variant="secondary"
                  icon={<Ionicons name="mail" size={20} color={Colors.secondary.success} />}
                  style={{
                    borderColor: Colors.secondary.success,
                    backgroundColor: Colors.secondary.success + '10',
                  }}
                />
                
                <Button
                  title="Report Bug"
                  onPress={handleReportBug}
                  variant="secondary"
                  icon={<Ionicons name="bug" size={20} color={Colors.text.secondary} />}
                />
              </View>
            </Card>
          )}

          {/* Status Information */}
          <Card variant="default">
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.primary.blue + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="information-circle" size={20} color={Colors.primary.blue} />
              </View>
              <Typography variant="h3" weight="semibold">
                System Status
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">CELF Servers</Typography>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: config.type === 'server' ? Colors.secondary.error : Colors.secondary.success,
                    marginRight: Spacing.sm,
                  }} />
                  <Typography variant="bodySmall" weight="semibold">
                    {config.type === 'server' ? 'Issues Detected' : 'Operational'}
                  </Typography>
                </View>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Mining Network</Typography>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: config.type === 'mining' ? Colors.secondary.warning : Colors.secondary.success,
                    marginRight: Spacing.sm,
                  }} />
                  <Typography variant="bodySmall" weight="semibold">
                    {config.type === 'mining' ? 'Degraded' : 'Operational'}
                  </Typography>
                </View>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Transaction Processing</Typography>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: config.type === 'transaction' ? Colors.secondary.error : Colors.secondary.success,
                    marginRight: Spacing.sm,
                  }} />
                  <Typography variant="bodySmall" weight="semibold">
                    {config.type === 'transaction' ? 'Issues Detected' : 'Operational'}
                  </Typography>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
