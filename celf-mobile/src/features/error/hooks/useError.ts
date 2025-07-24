/**
 * Error Hook
 * Custom hook for error screen functionality
 */

import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getErrorConfig, getQuickSolutions } from '../data';
import { handleRetry, handleGoBack, handleContactSupport, handleReportBug } from '../utils';

export const useError = () => {
  const { 
    type = 'general',
    title = '',
    message = '',
    errorCode = '',
    canRetry = 'true',
    showSupport = 'true'
  } = useLocalSearchParams();

  const [isRetrying, setIsRetrying] = useState(false);

  // Get error configuration
  const config = getErrorConfig(
    type as string,
    title as string,
    message as string,
    errorCode as string,
    canRetry as string,
    showSupport as string
  );

  // Get quick solutions
  const quickSolutions = getQuickSolutions(config.type);

  // Handle retry
  const onRetry = () => {
    handleRetry(setIsRetrying);
  };

  // Handle go back
  const onGoBack = () => {
    handleGoBack();
  };

  // Handle contact support
  const onContactSupport = () => {
    handleContactSupport(config);
  };

  // Handle report bug
  const onReportBug = () => {
    handleReportBug();
  };

  return {
    config,
    quickSolutions,
    isRetrying,
    onRetry,
    onGoBack,
    onContactSupport,
    onReportBug,
  };
};
