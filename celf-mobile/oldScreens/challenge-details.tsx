import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router, useLocalSearchParams } from 'expo-router';

interface ChallengeDetail {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'bonus';
  progress: number;
  maxProgress: number;
  reward: number;
  isCompleted: boolean;
  isStarted: boolean;
  expiresIn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  instructions: string[];
  tips: string[];
  timeLimit?: string;
  category: string;
}

export default function ChallengeDetailsScreen() {
  const { toggleSidebar } = useNavigation();
  const { id } = useLocalSearchParams();
  const [isStarted, setIsStarted] = useState(false);
  
  // Mock challenge data - in real app, fetch by ID
  const challenge: ChallengeDetail = {
    id: id as string || '1',
    title: 'Morning Miner',
    description: 'Complete 3 mining sessions today to earn bonus CELF tokens and maintain your mining streak',
    type: 'daily',
    progress: 2,
    maxProgress: 3,
    reward: 15,
    isCompleted: false,
    isStarted: true,
    expiresIn: '8h 32m',
    difficulty: 'easy',
    icon: 'diamond',
    timeLimit: '1 hour',
    category: 'Mining',
    instructions: [
      'Open the mining screen from the main dashboard',
      'Tap the mining button to start a session',
      'Complete at least 3 separate mining sessions',
      'Sessions can be any duration (minimum 30 seconds)',
      'All sessions must be completed within 1 hour'
    ],
    tips: [
      'Set reminders throughout the day to complete sessions',
      'Mining sessions can be as short as 30 seconds',
      'Complete sessions during different times for variety',
      'Check your progress regularly to stay on track'
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return Colors.secondary.success;
      case 'medium': return Colors.secondary.warning;
      case 'hard': return Colors.secondary.error;
      default: return Colors.primary.blue;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return Colors.primary.blue;
      case 'weekly': return Colors.secondary.warning;
      case 'bonus': return Colors.secondary.error;
      default: return Colors.primary.blue;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'daily': return 'Daily Challenge';
      case 'weekly': return 'Weekly Challenge';
      case 'bonus': return 'Bonus Challenge';
      default: return 'Challenge';
    }
  };

  const startChallenge = () => {
    if (challenge.isCompleted) {
      Alert.alert('Already Completed', 'You have already completed this challenge!');
      return;
    }
    
    setIsStarted(true);
    Alert.alert(
      'Challenge Started!',
      'Your challenge has begun. Complete the required actions to earn your reward.',
      [{ text: 'Got it!', onPress: () => router.back() }]
    );
  };

  const shareChallenge = async () => {
    try {
      const message = challenge.isCompleted 
        ? `🎉 I just completed the "${challenge.title}" challenge on CELF and earned ${challenge.reward} CELF tokens!`
        : `💪 I'm working on the "${challenge.title}" challenge on CELF. ${challenge.progress}/${challenge.maxProgress} complete!`;
      
      await Share.share({
        message,
        title: 'CELF Challenge',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const progressPercentage = (challenge.progress / challenge.maxProgress) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Challenge Details"
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
          
          {/* Challenge Header */}
          <Card 
            variant="gradient" 
            gradientColors={[getTypeColor(challenge.type), getTypeColor(challenge.type) + 'CC']}
            style={{ 
              backgroundColor: getTypeColor(challenge.type),
              shadowColor: getTypeColor(challenge.type),
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
                name={challenge.icon as any} 
                size={40} 
                color={Colors.neutral.white} 
              />
            </View>
            
            <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              {challenge.title}
            </Typography>
            
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: Spacing.md,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: Spacing.md,
              paddingVertical: Spacing.sm,
              borderRadius: BorderRadius.full,
            }}>
              <Ionicons name="flag" size={16} color={Colors.neutral.white} style={{ marginRight: Spacing.sm }} />
              <Typography variant="bodyMedium" color="inverse" weight="semibold">
                {getTypeName(challenge.type)}
              </Typography>
            </View>

            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: Spacing.lg,
              backgroundColor: getDifficultyColor(challenge.difficulty) + '40',
              paddingHorizontal: Spacing.md,
              paddingVertical: Spacing.sm,
              borderRadius: BorderRadius.full,
            }}>
              <Typography variant="bodySmall" color="inverse" weight="bold">
                {challenge.difficulty.toUpperCase()} DIFFICULTY
              </Typography>
            </View>

            <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9 }}>
              {challenge.description}
            </Typography>
          </Card>

          {/* Challenge Status */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: getTypeColor(challenge.type) + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="analytics" size={20} color={getTypeColor(challenge.type)} />
              </View>
              <Typography variant="h3" weight="semibold">
                Challenge Progress
              </Typography>
            </View>
            
            <View style={{ marginBottom: Spacing.lg }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                <Typography variant="bodyMedium" color="secondary">
                  Current Progress
                </Typography>
                <Typography variant="bodyMedium" weight="bold">
                  {challenge.progress} / {challenge.maxProgress}
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
                  backgroundColor: getTypeColor(challenge.type),
                  borderRadius: 6,
                }} />
              </View>
              
              <Typography variant="bodyLarge" weight="bold" color="primary" style={{ textAlign: 'center' }}>
                {progressPercentage.toFixed(0)}% Complete
              </Typography>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Typography variant="bodySmall" color="secondary">Time Remaining</Typography>
                <Typography variant="bodyMedium" weight="semibold">{challenge.expiresIn}</Typography>
              </View>
              <View>
                <Typography variant="bodySmall" color="secondary">Category</Typography>
                <Typography variant="bodyMedium" weight="semibold">{challenge.category}</Typography>
              </View>
              <View>
                <Typography variant="bodySmall" color="secondary">Reward</Typography>
                <Typography variant="bodyMedium" weight="semibold" color="primary">+{challenge.reward} CELF</Typography>
              </View>
            </View>

            {challenge.isCompleted && (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.secondary.success + '10',
                padding: Spacing.md,
                borderRadius: BorderRadius.md,
                marginTop: Spacing.lg,
              }}>
                <Ionicons name="checkmark-circle" size={24} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodyLarge" weight="semibold" color="success">
                  Challenge Completed!
                </Typography>
              </View>
            )}
          </Card>

          {/* Instructions */}
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
                How to Complete
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.md }}>
              {challenge.instructions.map((instruction, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: Colors.secondary.info,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: Spacing.md,
                    marginTop: 2,
                  }}>
                    <Typography variant="bodySmall" color="inverse" weight="bold">
                      {index + 1}
                    </Typography>
                  </View>
                  <Typography variant="bodyMedium" style={{ flex: 1, lineHeight: 22 }}>
                    {instruction}
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
                Pro Tips
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.sm }}>
              {challenge.tips.map((tip, index) => (
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

          {/* Reward Details */}
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
                +{challenge.reward} CELF
              </Typography>
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
                Tokens will be automatically added to your wallet upon completion
              </Typography>
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md }}>
            {!challenge.isCompleted && (
              <Button
                title={challenge.isStarted || isStarted ? "Continue Challenge" : "Start Challenge"}
                onPress={startChallenge}
                variant="primary"
                icon={<Ionicons name="play" size={20} color={Colors.neutral.white} />}
                style={{
                  shadowColor: Colors.primary.blue,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              />
            )}
            
            <Button
              title="Share Challenge"
              onPress={shareChallenge}
              variant="secondary"
              icon={<Ionicons name="share-outline" size={20} color={Colors.primary.blue} />}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
