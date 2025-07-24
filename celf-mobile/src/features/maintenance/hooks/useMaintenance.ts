/**
 * Maintenance Hook
 * Custom hook for maintenance screen functionality
 */

import { getMaintenanceInfo } from '../data';
import { handleRetry, handleContactSupport, handleGoBack } from '../utils';

export const useMaintenance = () => {
  // Get maintenance information
  const maintenanceInfo = getMaintenanceInfo();

  // Handle actions
  const onRetry = () => {
    handleRetry();
  };

  const onContactSupport = () => {
    handleContactSupport();
  };

  const onGoBack = () => {
    handleGoBack();
  };

  return {
    maintenanceInfo,
    onRetry,
    onContactSupport,
    onGoBack,
  };
};
