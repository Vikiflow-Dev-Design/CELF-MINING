/**
 * Maintenance Tasks Component
 * Shows list of maintenance tasks and their status
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Typography } from '@/components/ui';
import { Spacing } from '@/constants/design-tokens';
import { getTaskStatusColor } from '../data';
import type { MaintenanceTask } from '../types';

interface MaintenanceTasksProps {
  tasks: MaintenanceTask[];
}

export const MaintenanceTasks: React.FC<MaintenanceTasksProps> = ({ tasks }) => {
  return (
    <Card style={{ marginBottom: Spacing.lg }}>
      <Typography
        variant="h4"
        color="primary"
        weight="semibold"
        style={{ marginBottom: Spacing.md }}
      >
        What we're working on:
      </Typography>

      <View style={{ gap: Spacing.sm }}>
        {tasks.map((task) => (
          <View key={task.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 8,
              height: 8,
              backgroundColor: getTaskStatusColor(task.status),
              borderRadius: 4,
              marginRight: Spacing.sm
            }} />
            <Typography variant="bodyMedium" color="secondary">
              {task.title}
            </Typography>
          </View>
        ))}
      </View>
    </Card>
  );
};
