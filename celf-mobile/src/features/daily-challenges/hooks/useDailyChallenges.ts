/**
 * Daily Challenges Hook
 * Custom hook for daily challenges functionality
 */

import { useState } from 'react';
import { challengeTabs } from '../data';
import { calculateTodayStats, startChallenge } from '../utils';
import type { TabKey, Challenge } from '../types';

export const useDailyChallenges = () => {
  // Selected tab state
  const [selectedTab, setSelectedTab] = useState<TabKey>('today');

  // Get current challenges based on selected tab
  const currentChallenges = challengeTabs.find(tab => tab.key === selectedTab)?.challenges || [];

  // Calculate today's stats
  const todayStats = calculateTodayStats();

  // Handle tab change
  const handleTabChange = (tabKey: TabKey) => {
    setSelectedTab(tabKey);
  };

  // Handle challenge start
  const handleChallengeStart = (challenge: Challenge) => {
    startChallenge(challenge);
  };

  // Refresh challenges data
  const refreshChallenges = async () => {
    // In a real app, this would fetch fresh data from the server
    // For now, we'll simulate a refresh
    return new Promise<void>(resolve => setTimeout(resolve, 1500));
  };

  return {
    selectedTab,
    currentChallenges,
    challengeTabs,
    todayStats,
    handleTabChange,
    handleChallengeStart,
    refreshChallenges,
  };
};
