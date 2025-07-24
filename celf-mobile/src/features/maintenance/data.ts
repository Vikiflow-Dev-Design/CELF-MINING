/**
 * Maintenance Screen Data
 * Contains maintenance information and tasks
 */

import { Colors } from '@/constants/design-tokens';
import type { MaintenanceInfo, MaintenanceTask } from './types';

/**
 * Get maintenance tasks with their current status
 */
export const getMaintenanceTasks = (): MaintenanceTask[] => [
  {
    id: '1',
    title: 'Server infrastructure upgrade',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Mining algorithm optimization',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Security enhancements',
    status: 'pending'
  }
];

/**
 * Get maintenance information
 */
export const getMaintenanceInfo = (): MaintenanceInfo => ({
  estimatedTime: '2 hours',
  startTime: new Date().toISOString(),
  tasks: getMaintenanceTasks()
});

/**
 * Get status color for maintenance task
 */
export const getTaskStatusColor = (status: MaintenanceTask['status']): string => {
  switch (status) {
    case 'completed':
      return Colors.secondary.success;
    case 'in-progress':
      return Colors.secondary.warning;
    case 'pending':
      return Colors.neutral[300];
    default:
      return Colors.neutral[300];
  }
};
