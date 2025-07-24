/**
 * Maintenance Screen Types
 * Type definitions for maintenance screen functionality
 */

export interface MaintenanceTask {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface MaintenanceInfo {
  estimatedTime: string;
  startTime: string;
  tasks: MaintenanceTask[];
}
