/**
 * Maintenance Screen - Refactored
 * Reduced from 188 lines to ~50 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Colors, Spacing } from '@/constants/design-tokens';

// Extracted components
import {
  MaintenanceHeader,
  MaintenanceInfoCard,
  MaintenanceTasks,
  MaintenanceActions,
  MaintenanceFooter,
} from '@/src/features/maintenance/components';

// Extracted hook
import { useMaintenance } from '@/src/features/maintenance/hooks/useMaintenance';

export default function MaintenanceScreen() {
  // All business logic extracted to custom hook
  const {
    maintenanceInfo,
    onRetry,
    onContactSupport,
    onGoBack,
  } = useMaintenance();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.primary }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.xl
        }}
        showsVerticalScrollIndicator={false}
      >
        
        <MaintenanceHeader />

        <MaintenanceInfoCard maintenanceInfo={maintenanceInfo} />

        <MaintenanceTasks tasks={maintenanceInfo.tasks} />

        <MaintenanceActions
          onRetry={onRetry}
          onContactSupport={onContactSupport}
        />

        <MaintenanceFooter />
      </ScrollView>
    </View>
  );
}
