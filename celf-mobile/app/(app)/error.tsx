/**
 * Error Screen - Refactored
 * Reduced from 410 lines to ~60 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';

// Extracted components
import {
  ErrorHeader,
  QuickSolutions,
  ActionButtons,
  SupportOptions,
  SystemStatus,
} from '@/src/features/error/components';

// Extracted hook
import { useError } from '@/src/features/error/hooks/useError';

export default function ErrorScreen() {
  // All business logic extracted to custom hook
  const {
    config,
    quickSolutions,
    isRetrying,
    onRetry,
    onGoBack,
    onContactSupport,
    onReportBug,
  } = useError();

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
          
          <ErrorHeader config={config} />

          <QuickSolutions solutions={quickSolutions} />

          <ActionButtons
            config={config}
            isRetrying={isRetrying}
            onRetry={onRetry}
            onGoBack={onGoBack}
          />

          <SupportOptions
            showSupport={config.showSupport}
            onContactSupport={onContactSupport}
            onReportBug={onReportBug}
          />

          <SystemStatus config={config} />
        </View>
      </ScrollView>
    </View>
  );
}
