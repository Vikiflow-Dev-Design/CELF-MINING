/**
 * Custom hook for App Information functionality
 */

import { Alert } from 'react-native';
import { appInfo, updateInfo, APP_INFO_URL } from '../data';
import { openWebsite, openAppStore } from '../utils';

export const useAppInfo = () => {
  const openFullAppInfo = () => {
    openWebsite(APP_INFO_URL, 'App Information');
  };

  const checkForUpdates = () => {
    if (updateInfo.hasUpdate) {
      Alert.alert(
        'Update Available',
        `Version ${updateInfo.latestVersion} is available (${updateInfo.updateSize}). ${
          updateInfo.isRequired ? 'This update is required.' : 'Would you like to update now?'
        }`,
        [
          { text: 'Later', style: 'cancel' },
          { text: 'Update', onPress: () => openAppStore() }
        ]
      );
    } else {
      Alert.alert('No Updates', 'You are using the latest version of CELF.');
    }
  };

  const openChangelog = () => {
    const changelogUrl = `${APP_INFO_URL}/changelog`;
    openWebsite(changelogUrl, 'Changelog');
  };

  return {
    appInfo,
    updateInfo,
    openFullAppInfo,
    checkForUpdates,
    openChangelog,
  };
};
