/**
 * Referrals Hook - Connected to Backend
 */

import { useState, useEffect } from 'react';
import { Share, Clipboard, Alert } from 'react-native';
import { apiService } from '@/services/apiService';

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingRewards: number;
}

interface ReferralData {
  id: string;
  username: string;
  joinDate: string;
  status: string;
  earnings: number;
}

export const useReferrals = () => {
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    pendingRewards: 0,
  });
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch referral data from backend
  const fetchReferralData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔍 useReferrals: Fetching referral data...');
      const response = await apiService.getReferralInfo();

      if (response.success && response.data) {
        const { referralCode: code, referralLink: link, stats: backendStats, referrals: backendReferrals } = response.data;

        setReferralCode(code);
        setReferralLink(link);

        // Transform backend stats to match UI expectations
        setStats({
          totalReferrals: backendStats.total,
          activeReferrals: backendStats.completed + backendStats.rewarded,
          totalEarnings: backendStats.totalEarned,
          pendingRewards: backendStats.pending * 5, // Assuming 5 CELF per pending referral
        });

        // Transform backend referrals to match UI expectations
        const transformedReferrals = backendReferrals.map(ref => ({
          id: ref.id,
          username: ref.referee.name,
          joinDate: new Date(ref.date).toISOString().split('T')[0],
          status: ref.status === 'rewarded' ? 'active' : ref.status,
          earnings: ref.reward,
        }));

        setReferrals(transformedReferrals);

        console.log('✅ useReferrals: Data fetched successfully', {
          code,
          stats: backendStats,
          referralsCount: backendReferrals.length
        });
      } else {
        throw new Error(response.message || 'Failed to fetch referral data');
      }
    } catch (error) {
      console.error('❌ useReferrals: Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load referral data');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchReferralData();
  }, []);

  const shareReferralLink = async () => {
    try {
      if (!referralLink) {
        Alert.alert('Error', 'Referral link not available. Please try refreshing.');
        return;
      }

      await Share.share({
        message: `Join CELF and start mining crypto! Use my referral link: ${referralLink}`,
        title: 'Join CELF',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Unable to share referral link');
    }
  };

  const copyReferralCode = () => {
    if (!referralCode) {
      Alert.alert('Error', 'Referral code not available. Please try refreshing.');
      return;
    }

    Clipboard.setString(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const copyReferralLink = () => {
    if (!referralLink) {
      Alert.alert('Error', 'Referral link not available. Please try refreshing.');
      return;
    }

    Clipboard.setString(referralLink);
    Alert.alert('Copied!', 'Referral link copied to clipboard');
  };

  const refreshReferralData = async () => {
    await fetchReferralData();
  };

  return {
    referralCode,
    referralLink,
    stats,
    referrals,
    isLoading,
    error,
    shareReferralLink,
    copyReferralCode,
    copyReferralLink,
    refreshReferralData,
  };
};
