/**
 * No Internet Hook
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export const useNoInternet = () => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    
    setTimeout(() => {
      setIsRetrying(false);
      Alert.alert('Connection Check', 'Still no internet connection. Please check your network settings.');
    }, 2000);
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/mining');
    }
  };

  const openSettings = () => {
    Alert.alert('Network Settings', 'Please check your device network settings and try again.');
  };

  return {
    isRetrying,
    handleRetry,
    handleGoBack,
    openSettings,
  };
};
