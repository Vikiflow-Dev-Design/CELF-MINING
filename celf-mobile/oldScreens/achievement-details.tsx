import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router, useLocalSearchParams } from 'expo-router';

interface AchievementDetail {
  id: string;
  title: string;
  description: string;
  category: 'mining' | 'social' | 'wallet' | 'milestone';
  progress: number;
  maxProgress: number;
  reward: number;
  isCompleted: boolean;
  icon: string;
  completedDate?: string;
  tips: string[];
  requirements: string[];
}

export default function AchievementDetailsScreen() {
  const { toggleSidebar } = useNavigation();
  const { id } = useLocalSearchParams();
  
  // Mock achievement data - in real app, fetch by ID
  const achievement: AchievementDetail = {
    id: id as string || '1',
    title: 'Mining Streak',
    description: 'Mine for 7 consecutive days to unlock this achievement and earn bonus CELF tokens',
    category: 'mining',
    progress: 5,
    maxProgress: 7,
    reward: 50,
    isCompleted: false,
    icon: 'flame',
    tips: [
      'Set daily reminders to mine consistently',
      'Mining sessions can be as short as 1 minute',
      'Check the app daily to maintain your streak',
      'Your streak resets if you miss a day'
    ],
    requirements: [
      'Complete at least one mining session per day',
      'Sessions must be on consecutive calendar days',
      'No minimum mining duration required',
      'Streak continues across different time zones'
    ]
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mining': return Colors.secondary.warning;
      case 'social': return Colors.secondary.success;
      case 'wallet': return Colors.secondary.info;
      case 'milestone': return Colors.secondary.error;
      default: return Colors.primary.blue;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'mining': return 'Mining';
      case 'social': return 'Social';
      case 'wallet': return 'Wallet';
      case 'milestone': return 'Milestone';
      default: return 'Achievement';
    }
  };

  const shareAchievement = async () => {
    try {
      const message = achievement.isCompleted 
        ? `🎉 I just completed the "${achievement.title}" achievement on CELF and earned ${achievement.reward} CELF tokens!`
        : `💪 I'm working on the "${achievement.title}" achievement on CELF. ${achievement.progress}/${achievement.maxProgress} complete!`;
      
      await Share.share({
        message,
        title: 'CELF Achievement',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const claimReward = () => {
    if (achievement.isCompleted) {
      Alert.alert('Already Claimed', 'You have already claimed this achievement reward.');
    } else {
      Alert.alert('Not Complete', 'Complete this achievement to claim your reward.');
    }
  };

  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Achievement Details"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          {/* Achievement Header */}
          <Card 
            variant="gradient" 
            gradientColors={[getCategoryColor(achievement.category), getCategoryColor(achievement.category) + 'CC']}
            style={{ 
              backgroundColor: getCategoryColor(achievement.category),
              shadowColor: getCategoryColor(achievement.category),
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
              marginBottom: Spacing['2xl'],
              alignItems: 'center'
            }}
          >
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons 
                name={achievement.icon as any} 
                size={40} 
                color={Colors.neutral.white} 
              />
            </View>
            
            <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              {achievement.title}
            </Typography>
            
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: Spacing.lg,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: Spacing.md,
              paddingVertical: Spacing.sm,
              borderRadius: BorderRadius.full,
            }}>
              <Ionicons name="pricetag" size={16} color={Colors.neutral.white} style={{ marginRight: Spacing.sm }} />
              <Typography variant="bodyMedium" color="inverse" weight="semibold">
                {getCategoryName(achievement.category)}
              </Typography>
            </View>

            <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9 }}>
              {achievement.description}
            </Typography>
          </Card>

          {/* Progress Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: getCategoryColor(achievement.category) + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="analytics" size={20} color={getCategoryColor(achievement.category)} />
              </View>
              <Typography variant="h3" weight="semibold">
                Progress
              </Typography>
            </View>
            
            <View style={{ marginBottom: Spacing.lg }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                <Typography variant="bodyMedium" color="secondary">
                  Current Progress
                </Typography>
                <Typography variant="bodyMedium" weight="bold">
                  {achievement.progress} / {achievement.maxProgress}
                </Typography>
              </View>
              
              <View style={{
                height: 12,
                backgroundColor: Colors.background.tertiary,
                borderRadius: 6,
                overflow: 'hidden',
                marginBottom: Spacing.md,
              }}>
                <View style={{
                  height: '100%',
                  width: `${progressPercentage}%`,
                  backgroundColor: getCategoryColor(achievement.category),
                  borderRadius: 6,
                }} />
              </View>
              
              <Typography variant="bodyLarge" weight="bold" color="primary" style={{ textAlign: 'center' }}>
                {progressPercentage.toFixed(0)}% Complete
              </Typography>
            </View>

            {achievement.isCompleted && (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.secondary.success + '10',
                padding: Spacing.md,
                borderRadius: BorderRadius.md,
              }}>
                <Ionicons name="checkmark-circle" size={24} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodyLarge" weight="semibold" color="success">
                  Achievement Completed!
                </Typography>
              </View>
            )}
          </Card>

          {/* Reward Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.warning + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="gift" size={20} color={Colors.secondary.warning} />
              </View>
              <Typography variant="h3" weight="semibold">
                Reward
              </Typography>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Typography variant="displaySmall" weight="bold" color="primary" style={{ marginBottom: Spacing.sm }}>
                +{achievement.reward} CELF
              </Typography>
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
                Tokens will be added to your wallet upon completion
              </Typography>
            </View>
          </Card>

          {/* Requirements */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.info + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="list" size={20} color={Colors.secondary.info} />
              </View>
              <Typography variant="h3" weight="semibold">
                Requirements
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.sm }}>
              {achievement.requirements.map((requirement, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: Colors.secondary.info,
                    marginTop: 8,
                    marginRight: Spacing.sm,
                  }} />
                  <Typography variant="bodyMedium" style={{ flex: 1, lineHeight: 22 }}>
                    {requirement}
                  </Typography>
                </View>
              ))}
            </View>
          </Card>

          {/* Tips */}
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
                <Ionicons name="bulb" size={20} color={Colors.primary.blue} />
              </View>
              <Typography variant="h3" weight="semibold">
                Completion Tips
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.sm }}>
              {achievement.tips.map((tip, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: Colors.primary.blue,
                    marginTop: 8,
                    marginRight: Spacing.sm,
                  }} />
                  <Typography variant="bodyMedium" style={{ flex: 1, lineHeight: 22 }}>
                    {tip}
                  </Typography>
                </View>
              ))}
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md }}>
            <Button
              title={achievement.isCompleted ? "Reward Claimed" : "Claim Reward"}
              onPress={claimReward}
              variant={achievement.isCompleted ? "secondary" : "primary"}
              disabled={!achievement.isCompleted}
              icon={<Ionicons name="gift" size={20} color={achievement.isCompleted ? Colors.primary.blue : Colors.neutral.white} />}
              style={{
                shadowColor: achievement.isCompleted ? 'transparent' : Colors.primary.blue,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            />
            
            <Button
              title="Share Achievement"
              onPress={shareAchievement}
              variant="secondary"
              icon={<Ionicons name="share-outline" size={20} color={Colors.primary.blue} />}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
