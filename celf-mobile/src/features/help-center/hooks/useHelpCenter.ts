/**
 * Help Center Hook
 * Custom hook for help center functionality
 */

import { faqItems, getContactOptions } from '../data';
import {
  openFullHelpCenter,
  openFAQ,
  openLiveChat,
  openEmailSupport,
  openCommunityForum,
  reportBug,
  callEmergencySupport,
} from '../utils';

export const useHelpCenter = () => {
  // Contact options with actions
  const contactOptions = getContactOptions({
    openLiveChat,
    openEmailSupport,
    openCommunityForum,
    reportBug,
  });

  // Handle FAQ press
  const handleFAQPress = (faq: typeof faqItems[0]) => {
    openFAQ(faq);
  };

  // Handle full help center press
  const handleFullHelpCenterPress = () => {
    openFullHelpCenter();
  };

  // Handle emergency support press
  const handleEmergencySupportPress = () => {
    callEmergencySupport();
  };

  return {
    faqItems,
    contactOptions,
    handleFAQPress,
    handleFullHelpCenterPress,
    handleEmergencySupportPress,
  };
};
