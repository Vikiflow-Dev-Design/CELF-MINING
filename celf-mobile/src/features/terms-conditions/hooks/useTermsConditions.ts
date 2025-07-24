/**
 * Terms & Conditions Hook
 * Custom hook for terms and conditions functionality
 */

import { useState } from 'react';
import {
  openFullTerms,
  openTermsSection,
  downloadTerms,
  acceptTerms,
} from '../utils';
import type { TermsSection } from '../types';

export const useTermsConditions = () => {
  // Mock acceptance status - in real app this would come from user preferences/API
  const [hasAccepted, setHasAccepted] = useState(true);

  // Handle section press
  const handleSectionPress = (section: TermsSection) => {
    openTermsSection(section.id, section.title);
  };

  // Handle full terms press
  const handleFullTermsPress = () => {
    openFullTerms();
  };

  // Handle download press
  const handleDownloadPress = () => {
    downloadTerms();
  };

  // Handle accept terms press
  const handleAcceptTermsPress = () => {
    acceptTerms(hasAccepted, () => setHasAccepted(true));
  };

  return {
    hasAccepted,
    handleSectionPress,
    handleFullTermsPress,
    handleDownloadPress,
    handleAcceptTermsPress,
  };
};
