/**
 * Referrals Hook
 */

import { useState } from 'react';
import { Share, Clipboard, Alert } from 'react-native';

export const useReferrals = () => {
  const referralCode = 'CELF123ABC';
  const referralLink = `https://celf.app/join?ref=${referralCode}`;
  
  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 450.75,
    pendingRewards: 25.50,
  };

  const referrals = [
    { id: '1', username: 'user123', joinDate: '2024-12-10', status: 'active', earnings: 50 },
    { id: '2', username: 'miner456', joinDate: '2024-12-08', status: 'active', earnings: 75 },
    { id: '3', username: 'crypto789', joinDate: '2024-12-05', status: 'inactive', earnings: 25 },
  ];

  const shareReferralLink = async () => {
    try {
      await Share.share({
        message: `Join CELF and start mining crypto! Use my referral link: ${referralLink}`,
        title: 'Join CELF',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyReferralCode = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const copyReferralLink = () => {
    Clipboard.setString(referralLink);
    Alert.alert('Copied!', 'Referral link copied to clipboard');
  };

  const refreshReferralData = async () => {
    // In a real app, this would fetch fresh data from the server
    // For now, we'll simulate a refresh
    return new Promise<void>(resolve => setTimeout(resolve, 1500));
  };

  return {
    referralCode,
    referralLink,
    stats,
    referrals,
    shareReferralLink,
    copyReferralCode,
    copyReferralLink,
    refreshReferralData,
  };
};
