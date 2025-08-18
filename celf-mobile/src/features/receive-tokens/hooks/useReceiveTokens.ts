/**
 * Receive Tokens Hook
 */

import { Share, Clipboard, Alert } from 'react-native';
import { useWalletStore } from '@/stores/walletStore';

export const useReceiveTokens = () => {
  const { currentAddress } = useWalletStore();
  const walletAddress = currentAddress || 'celf1234567890abcdef1234567890abcdef12345678'; // Fallback
  const qrCodeData = `celf:${walletAddress}`;

  const copyAddress = () => {
    Clipboard.setString(walletAddress);
    Alert.alert('Copied!', 'Wallet address copied to clipboard');
  };

  const shareAddress = async () => {
    try {
      await Share.share({
        message: `Send CELF tokens to my wallet: ${walletAddress}`,
        title: 'My CELF Wallet Address',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return {
    walletAddress,
    qrCodeData,
    copyAddress,
    shareAddress,
  };
};
