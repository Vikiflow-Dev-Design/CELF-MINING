import React from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';

interface MiningRateData {
  baseRate: number;
  currentMultiplier: number;
  networkDifficulty: string;
  estimatedDaily: number;
  estimatedWeekly: number;
  estimatedMonthly: number;
}

interface RateFactors {
  id: string;
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  value: string;
  icon: string;
}

export interface MiningRateInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  currentRate?: number;
}

export const MiningRateInfoModal: React.FC<MiningRateInfoModalProps> = ({
  isVisible,
  onClose,
  currentRate = 1.2
}) => {
  // Mock mining rate data
  const miningData: MiningRateData = {
    baseRate: 1.0,
    currentMultiplier: 1.2,
    networkDifficulty: 'Medium',
    estimatedDaily: currentRate * 24,
    estimatedWeekly: currentRate * 24 * 7,
    estimatedMonthly: currentRate * 24 * 30
  };

  // Factors affecting mining rate
  const rateFactors: RateFactors[] = [
    {
      id: '1',
      name: 'Network Activity',
      impact: 'positive',
      description: 'Higher network activity increases mining rewards',
      value: '+20%',
      icon: 'trending-up'
    },
    {
      id: '2',
      name: 'Device Performance',
      impact: 'positive',
      description: 'Your device is performing optimally',
      value: '+15%',
      icon: 'phone-portrait'
    },
    {
      id: '3',
      name: 'Network Difficulty',
      impact: 'negative',
      description: 'Current network difficulty is medium',
      value: '-10%',
      icon: 'bar-chart'
    },
    {
      id: '4',
      name: 'Referral Bonus',
      impact: 'positive',
      description: 'Active referrals boost your mining rate',
      value: '+5%',
      icon: 'people'
    },
    {
      id: '5',
      name: 'Time of Day',
      impact: 'neutral',
      description: 'Peak hours have standard rates',
      value: '0%',
      icon: 'time'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return Colors.secondary.success;
      case 'negative': return Colors.secondary.error;
      case 'neutral': return Colors.text.secondary;
      default: return Colors.text.secondary;
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return 'arrow-up';
      case 'negative': return 'arrow-down';
      case 'neutral': return 'remove';
      default: return 'remove';
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
      }}>
        <View style={{
          backgroundColor: Colors.background.primary,
          borderTopLeftRadius: BorderRadius.xl,
          borderTopRightRadius: BorderRadius.xl,
          maxHeight: '90%',
          shadowColor: Colors.neutral.black,
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10,
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: Layout.screenMargin.mobile,
            paddingTop: Spacing.lg,
            paddingBottom: Spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: Colors.border.primary,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.warning + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="diamond" size={20} color={Colors.secondary.warning} />
              </View>
              <Typography variant="h2" weight="bold">
                Mining Rate Info
              </Typography>
            </View>
            
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: Colors.background.tertiary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="close" size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={{
              paddingHorizontal: Layout.screenMargin.mobile,
              paddingTop: Spacing.lg,
              paddingBottom: 32,
            }}>
              
              {/* Current Rate Display */}
              <Card 
                variant="gradient" 
                gradientColors={[Colors.secondary.warning, Colors.secondary.warning + 'CC']}
                style={{ 
                  backgroundColor: Colors.secondary.warning,
                  shadowColor: Colors.secondary.warning,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 8,
                  marginBottom: Spacing['2xl'],
                  alignItems: 'center'
                }}
              >
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
                  Current Mining Rate
                </Typography>
                <Typography variant="displayLarge" color="inverse" weight="bold">
                  {currentRate.toFixed(2)}
                </Typography>
                <Typography variant="bodyLarge" color="inverse" weight="semibold" style={{ opacity: 0.9 }}>
                  CELF per hour
                </Typography>
                
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Spacing.md,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  borderRadius: BorderRadius.full,
                }}>
                  <Ionicons name="trending-up" size={16} color={Colors.neutral.white} style={{ marginRight: Spacing.sm }} />
                  <Typography variant="bodySmall" color="inverse" weight="semibold">
                    {((miningData.currentMultiplier - 1) * 100).toFixed(0)}% above base rate
                  </Typography>
                </View>
              </Card>

              {/* Estimated Earnings */}
              <View style={{ marginBottom: Spacing['2xl'] }}>
                <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
                  Estimated Earnings
                </Typography>
                
                <View style={{ gap: Spacing.md }}>
                  <Card variant="default">
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="today" size={20} color={Colors.secondary.info} style={{ marginRight: Spacing.sm }} />
                        <Typography variant="bodyMedium" color="secondary">Daily (24h)</Typography>
                      </View>
                      <Typography variant="bodyMedium" weight="bold" color="primary">
                        {miningData.estimatedDaily.toFixed(2)} CELF
                      </Typography>
                    </View>
                  </Card>
                  
                  <Card variant="default">
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="calendar" size={20} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                        <Typography variant="bodyMedium" color="secondary">Weekly (7 days)</Typography>
                      </View>
                      <Typography variant="bodyMedium" weight="bold" color="primary">
                        {miningData.estimatedWeekly.toFixed(2)} CELF
                      </Typography>
                    </View>
                  </Card>
                  
                  <Card variant="default">
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="calendar-outline" size={20} color={Colors.secondary.warning} style={{ marginRight: Spacing.sm }} />
                        <Typography variant="bodyMedium" color="secondary">Monthly (30 days)</Typography>
                      </View>
                      <Typography variant="bodyMedium" weight="bold" color="primary">
                        {miningData.estimatedMonthly.toFixed(2)} CELF
                      </Typography>
                    </View>
                  </Card>
                </View>
              </View>

              {/* Rate Factors */}
              <View style={{ marginBottom: Spacing['2xl'] }}>
                <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
                  Factors Affecting Your Rate
                </Typography>
                
                <View style={{ gap: Spacing.sm }}>
                  {rateFactors.map((factor) => (
                    <Card key={factor.id} variant="default">
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: getImpactColor(factor.impact) + '20',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: Spacing.md,
                        }}>
                          <Ionicons name={factor.icon as any} size={20} color={getImpactColor(factor.impact)} />
                        </View>
                        
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
                            <Typography variant="bodyMedium" weight="semibold" style={{ flex: 1 }}>
                              {factor.name}
                            </Typography>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Ionicons 
                                name={getImpactIcon(factor.impact) as any} 
                                size={14} 
                                color={getImpactColor(factor.impact)} 
                                style={{ marginRight: Spacing.xs }} 
                              />
                              <Typography variant="bodySmall" style={{ color: getImpactColor(factor.impact) }} weight="bold">
                                {factor.value}
                              </Typography>
                            </View>
                          </View>
                          <Typography variant="bodySmall" color="secondary" numberOfLines={2}>
                            {factor.description}
                          </Typography>
                        </View>
                      </View>
                    </Card>
                  ))}
                </View>
              </View>

              {/* Network Info */}
              <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: Colors.primary.blue + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: Spacing.md,
                  }}>
                    <Ionicons name="globe" size={20} color={Colors.primary.blue} />
                  </View>
                  <Typography variant="h3" weight="semibold">
                    Network Information
                  </Typography>
                </View>
                
                <View style={{ gap: Spacing.md }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="bodyMedium" color="secondary">Base Rate</Typography>
                    <Typography variant="bodyMedium" weight="semibold">{miningData.baseRate.toFixed(2)} CELF/hour</Typography>
                  </View>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="bodyMedium" color="secondary">Network Difficulty</Typography>
                    <Typography variant="bodyMedium" weight="semibold">{miningData.networkDifficulty}</Typography>
                  </View>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="bodyMedium" color="secondary">Your Multiplier</Typography>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      {miningData.currentMultiplier.toFixed(2)}x
                    </Typography>
                  </View>
                </View>
              </Card>

              {/* Important Notes */}
              <View style={{
                backgroundColor: Colors.secondary.info + '10',
                padding: Spacing.md,
                borderRadius: BorderRadius.md,
                marginBottom: Spacing['2xl'],
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Ionicons name="information-circle" size={20} color={Colors.secondary.info} style={{ marginRight: Spacing.sm, marginTop: 2 }} />
                  <View style={{ flex: 1 }}>
                    <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm, color: Colors.secondary.info }}>
                      Important Notes
                    </Typography>
                    <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                      • Mining rates are estimates and may vary based on network conditions
                      {'\n'}• Actual earnings depend on mining duration and network activity
                      {'\n'}• Rates are updated every 10 minutes based on current conditions
                      {'\n'}• Boost sessions and referrals can increase your mining rate
                    </Typography>
                  </View>
                </View>
              </View>

              {/* Close Button */}
              <Button
                title="Got it!"
                onPress={onClose}
                variant="primary"
                icon={<Ionicons name="checkmark" size={20} color={Colors.neutral.white} />}
                style={{
                  shadowColor: Colors.primary.blue,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
