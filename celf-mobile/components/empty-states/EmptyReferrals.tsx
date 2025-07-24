import React from 'react';
import { View, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Spacing, shadows } from '@/constants/design-tokens';

interface EmptyReferralsProps {
  referralCode?: string;
  onShareReferral?: () => void;
}

export const EmptyReferrals: React.FC<EmptyReferralsProps> = ({
  referralCode = 'CELF2025',
  onShareReferral
}) => {
  const handleShareReferral = async () => {
    if (onShareReferral) {
      onShareReferral();
      return;
    }

    try {
      await Share.share({
        message: `Join me on CELF and start mining cryptocurrency! Use my referral code: ${referralCode}`,
        url: `https://celf.app/invite/${referralCode}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Unable to share referral code');
    }
  };

  const handleCopyCode = () => {
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const handleInviteFriends = () => {
    handleShareReferral();
  };

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.xl
    }}>
      {/* Icon */}
      <View style={{
        width: 120,
        height: 120,
        backgroundColor: Colors.secondary.success + '10',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xl,
        ...shadows.sm
      }}>
        <Ionicons 
          name="people-outline" 
          size={60} 
          color={Colors.secondary.success} 
        />
      </View>

      {/* Title */}
      <Typography 
        variant="h2" 
        color="primary" 
        weight="bold" 
        align="center"
        style={{ marginBottom: Spacing.sm }}
      >
        No Referrals Yet
      </Typography>

      {/* Description */}
      <Typography 
        variant="bodyLarge" 
        color="secondary" 
        align="center"
        style={{ 
          marginBottom: Spacing.xl,
          lineHeight: 24,
          maxWidth: 300
        }}
      >
        Invite friends to join CELF and earn rewards together! Share your referral code and start building your network.
      </Typography>

      {/* Referral Code Card */}
      <Card style={{ 
        width: '100%', 
        marginBottom: Spacing.lg,
        backgroundColor: Colors.primary.blue + '05'
      }}>
        <View style={{ alignItems: 'center' }}>
          <Typography 
            variant="bodySmall" 
            color="tertiary" 
            style={{ marginBottom: Spacing.xs }}
          >
            Your Referral Code
          </Typography>
          
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.background.secondary,
            borderRadius: 8,
            paddingHorizontal: Spacing.md,
            paddingVertical: Spacing.sm,
            marginBottom: Spacing.sm
          }}>
            <Typography 
              variant="h3" 
              color="primary" 
              weight="bold"
              style={{ marginRight: Spacing.sm }}
            >
              {referralCode}
            </Typography>
            
            <Button
              title="Copy"
              onPress={handleCopyCode}
              variant="secondary"
              size="small"
              icon={<Ionicons name="copy-outline" size={16} color={Colors.primary.blue} />}
              iconPosition="left"
            />
          </View>
        </View>
      </Card>

      {/* Benefits */}
      <View style={{
        backgroundColor: Colors.secondary.success + '10',
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.lg,
        width: '100%'
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: Spacing.sm
        }}>
          <Ionicons 
            name="gift-outline" 
            size={20} 
            color={Colors.secondary.success} 
          />
          <Typography 
            variant="bodyMedium" 
            color="success" 
            weight="semibold"
            style={{ marginLeft: Spacing.xs }}
          >
            Referral Benefits
          </Typography>
        </View>
        
        <Typography 
          variant="bodySmall" 
          color="secondary"
          style={{ marginBottom: Spacing.xs }}
        >
          • Earn 25 CELF for each successful referral
        </Typography>
        <Typography 
          variant="bodySmall" 
          color="secondary"
          style={{ marginBottom: Spacing.xs }}
        >
          • Get ongoing mining bonuses from your network
        </Typography>
        <Typography 
          variant="bodySmall" 
          color="secondary"
        >
          • Help friends discover cryptocurrency mining
        </Typography>
      </View>

      {/* Action Buttons */}
      <View style={{ width: '100%', gap: Spacing.sm }}>
        <Button
          title="Invite Friends"
          onPress={handleInviteFriends}
          variant="primary"
          size="large"
          icon={<Ionicons name="person-add" size={20} color={Colors.text.inverse} />}
          iconPosition="left"
        />

        <Button
          title="Share Referral Code"
          onPress={handleShareReferral}
          variant="secondary"
          size="large"
          icon={<Ionicons name="share-outline" size={20} color={Colors.primary.blue} />}
          iconPosition="left"
        />
      </View>

      {/* Help Text */}
      <View style={{ 
        marginTop: Spacing.lg,
        alignItems: 'center'
      }}>
        <Typography 
          variant="caption" 
          color="tertiary" 
          align="center"
        >
          Share via social media, messaging apps, or copy the link
        </Typography>
      </View>
    </View>
  );
};

export default EmptyReferrals;
