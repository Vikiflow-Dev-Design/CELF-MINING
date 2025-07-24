/**
 * Privacy Policy Hook
 * Custom hook for privacy policy functionality
 */

import { useState } from 'react';
import { initialPrivacyControls } from '../data';
import {
  openFullPrivacyPolicy,
  openPrivacySection,
  downloadPrivacyPolicy,
  requestDataExport,
  requestDataDeletion,
} from '../utils';
import type { PrivacyControl, PrivacySection } from '../types';

export const usePrivacyPolicy = () => {
  // Privacy controls state
  const [privacyControls, setPrivacyControls] = useState<PrivacyControl[]>(initialPrivacyControls);

  // Toggle privacy control
  const togglePrivacyControl = (controlId: string) => {
    setPrivacyControls(prev => 
      prev.map(control => 
        control.id === controlId && !control.isRequired
          ? { ...control, isEnabled: !control.isEnabled }
          : control
      )
    );
  };

  // Handle section press
  const handleSectionPress = (section: PrivacySection) => {
    openPrivacySection(section.id, section.title);
  };

  // Handle full privacy policy press
  const handleFullPrivacyPolicyPress = () => {
    openFullPrivacyPolicy();
  };

  // Handle download press
  const handleDownloadPress = () => {
    downloadPrivacyPolicy();
  };

  // Handle data export press
  const handleDataExportPress = () => {
    requestDataExport();
  };

  // Handle data deletion press
  const handleDataDeletionPress = () => {
    requestDataDeletion();
  };

  return {
    privacyControls,
    togglePrivacyControl,
    handleSectionPress,
    handleFullPrivacyPolicyPress,
    handleDownloadPress,
    handleDataExportPress,
    handleDataDeletionPress,
  };
};
