/**
 * No Internet Screen - Refactored
 * Reduced from 378 lines to ~50 lines by extracting components and logic
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import NoInternetHeader  from '@/src/features/no-internet/components/NoInternetHeader';
import { useNoInternet } from '@/src/features/no-internet/hooks/useNoInternet';

export default function NoInternetScreen() {
  const { isRetrying, handleRetry, handleGoBack, openSettings } = useNoInternet();

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: Colors.background.secondary,
      paddingHorizontal: Layout.screenMargin.mobile,
      justifyContent: 'center',
    }}>
      <NoInternetHeader />
      
      <View style={{ gap: Spacing.md }}>
        <Button
          title={isRetrying ? "Checking..." : "Try Again"}
          onPress={handleRetry}
          variant="primary"
          loading={isRetrying}
          icon={!isRetrying ? <Ionicons name="refresh" size={20} color={Colors.neutral.white} /> : undefined}
        />
        
        <Button
          title="Network Settings"
          onPress={openSettings}
          variant="secondary"
          icon={<Ionicons name="settings" size={20} color={Colors.text.primary} />}
        />
        
        <Button
          title="Go Back"
          onPress={handleGoBack}
          variant="secondary"
          icon={<Ionicons name="arrow-back" size={20} color={Colors.text.primary} />}
        />
      </View>
    </View>
  );
}
