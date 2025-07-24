import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'bonus';
  progress: number;
  maxProgress: number;
  reward: number;
  isCompleted: boolean;
  expiresIn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export default function DailyChallengesScreen() {
  const { toggleSidebar } = useNavigation();
  const [selectedTab, setSelectedTab] = useState('today');

  // Mock challenges data
  const todayChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Morning Miner',
      description: 'Complete 3 mining sessions today',
      type: 'daily',
      progress: 2,
      maxProgress: 3,
      reward: 15,
      isCompleted: false,
      expiresIn: '8h 32m',
      difficulty: 'easy',
      icon: 'diamond'
    },
    {
      id: '2',
      title: 'Social Connector',
      description: 'Share CELF with 2 friends',
      type: 'daily',
      progress: 0,
      maxProgress: 2,
      reward: 25,
      isCompleted: false,
      expiresIn: '8h 32m',
      difficulty: 'medium',
      icon: 'share-social'
    },
    {
      id: '3',
      title: 'Transaction Master',
      description: 'Send tokens to another user',
      type: 'daily',
      progress: 1,
      maxProgress: 1,
      reward: 20,
      isCompleted: true,
      expiresIn: 'Completed',
      difficulty: 'easy',
      icon: 'send'
    }
  ];

  const weeklyChallenges: Challenge[] = [
    {
      id: '4',
      title: 'Weekly Warrior',
      description: 'Mine for 5 consecutive days',
      type: 'weekly',
      progress: 3,
      maxProgress: 5,
      reward: 100,
      isCompleted: false,
      expiresIn: '3d 12h',
      difficulty: 'medium',
      icon: 'flame'
    },
    {
      id: '5',
      title: 'Referral Champion',
      description: 'Get 3 new referrals this week',
      type: 'weekly',
      progress: 1,
      maxProgress: 3,
      reward: 150,
      isCompleted: false,
      expiresIn: '3d 12h',
      difficulty: 'hard',
      icon: 'people'
    }
  ];

  const bonusChallenges: Challenge[] = [
    {
      id: '6',
      title: 'Speed Demon',
      description: 'Complete 10 mining sessions in 1 hour',
      type: 'bonus',
      progress: 0,
      maxProgress: 10,
      reward: 50,
      isCompleted: false,
      expiresIn: '2d 5h',
      difficulty: 'hard',
      icon: 'speedometer'
    }
  ];

  const tabs = [
    { key: 'today', label: 'Today', challenges: todayChallenges },
    { key: 'weekly', label: 'Weekly', challenges: weeklyChallenges },
    { key: 'bonus', label: 'Bonus', challenges: bonusChallenges },
  ];

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

  const currentChallenges = tabs.find(tab => tab.key === selectedTab)?.challenges || [];
  const completedToday = todayChallenges.filter(c => c.isCompleted).length;
  const totalRewardsToday = todayChallenges.filter(c => c.isCompleted).reduce((sum, c) => sum + c.reward, 0);

  const startChallenge = (challenge: Challenge) => {
    if (challenge.isCompleted) {
      Alert.alert('Already Completed', 'You have already completed this challenge!');
    } else {
      router.push(`/(app)/challenge-details?id=${challenge.id}` as any);
    }
  };

  const renderChallenge = ({ item }: { item: Challenge }) => (
    <TouchableOpacity
      onPress={() => startChallenge(item)}
      style={{ marginBottom: Spacing.md }}
    >
      <Card 
        variant="default" 
        style={{
          opacity: item.isCompleted ? 0.9 : 1,
          borderWidth: item.isCompleted ? 2 : 1,
          borderColor: item.isCompleted ? Colors.secondary.success : Colors.border.primary,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: getTypeColor(item.type) + (item.isCompleted ? 'FF' : '20'),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.md,
          }}>
            <Ionicons 
              name={item.icon as any} 
              size={24} 
              color={item.isCompleted ? Colors.neutral.white : getTypeColor(item.type)} 
            />
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Typography variant="bodyLarge" weight="semibold" numberOfLines={1}>
                  {item.title}
                </Typography>
                <Typography variant="bodySmall" color="secondary" numberOfLines={2}>
                  {item.description}
                </Typography>
              </View>
              
              <View style={{ alignItems: 'flex-end', marginLeft: Spacing.sm }}>
                <Typography variant="bodyMedium" weight="bold" color="primary">
                  +{item.reward} CELF
                </Typography>
                <View style={{
                  backgroundColor: getDifficultyColor(item.difficulty) + '20',
                  paddingHorizontal: Spacing.sm,
                  paddingVertical: 2,
                  borderRadius: BorderRadius.sm,
                  marginTop: Spacing.xs,
                }}>
                  <Typography variant="bodySmall" style={{ color: getDifficultyColor(item.difficulty) }} weight="medium">
                    {item.difficulty.toUpperCase()}
                  </Typography>
                </View>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={{ marginBottom: Spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs }}>
                <Typography variant="bodySmall" color="secondary">
                  Progress
                </Typography>
                <Typography variant="bodySmall" weight="medium">
                  {item.progress}/{item.maxProgress}
                </Typography>
              </View>
              <View style={{
                height: 6,
                backgroundColor: Colors.background.tertiary,
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: `${(item.progress / item.maxProgress) * 100}%`,
                  backgroundColor: getTypeColor(item.type),
                  borderRadius: 3,
                }} />
              </View>
            </View>

            {/* Status and Timer */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {item.isCompleted ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} />
                  <Typography variant="bodySmall" color="success" style={{ marginLeft: Spacing.xs }}>
                    Completed
                  </Typography>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="time" size={16} color={Colors.text.secondary} />
                  <Typography variant="bodySmall" color="secondary" style={{ marginLeft: Spacing.xs }}>
                    {item.expiresIn} left
                  </Typography>
                </View>
              )}
              
              <TouchableOpacity
                onPress={() => startChallenge(item)}
                style={{
                  backgroundColor: item.isCompleted ? Colors.secondary.success : getTypeColor(item.type),
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  borderRadius: BorderRadius.md,
                }}
              >
                <Typography variant="bodySmall" color="inverse" weight="semibold">
                  {item.isCompleted ? 'Completed' : 'Start'}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Daily Challenges"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1 }}>
        {/* Today's Progress */}
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing.lg,
          paddingBottom: Spacing.md,
        }}>
          <Card 
            variant="gradient" 
            gradientColors={[Colors.secondary.success, Colors.secondary.success + 'CC']}
            style={{ 
              backgroundColor: Colors.secondary.success,
              shadowColor: Colors.secondary.success,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {completedToday}
                </Typography>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
                  Completed Today
                </Typography>
              </View>
              
              <View style={{
                width: 1,
                height: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }} />
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {todayChallenges.length}
                </Typography>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
                  Daily Challenges
                </Typography>
              </View>
              
              <View style={{
                width: 1,
                height: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }} />
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {totalRewardsToday}
                </Typography>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
                  CELF Earned
                </Typography>
              </View>
            </View>
          </Card>
        </View>

        {/* Tab Navigation */}
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingBottom: Spacing.md,
        }}>
          <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setSelectedTab(tab.key)}
                style={{
                  flex: 1,
                  paddingVertical: Spacing.md,
                  paddingHorizontal: Spacing.md,
                  backgroundColor: selectedTab === tab.key 
                    ? Colors.primary.blue 
                    : Colors.background.primary,
                  borderRadius: BorderRadius.md,
                  borderWidth: 1,
                  borderColor: selectedTab === tab.key 
                    ? Colors.primary.blue 
                    : Colors.border.primary,
                  alignItems: 'center',
                }}
              >
                <Typography 
                  variant="bodyMedium" 
                  weight="semibold"
                  style={{ 
                    color: selectedTab === tab.key ? Colors.neutral.white : Colors.text.primary 
                  }}
                >
                  {tab.label}
                </Typography>
                <Typography 
                  variant="bodySmall" 
                  style={{ 
                    color: selectedTab === tab.key ? Colors.neutral.white : Colors.text.secondary,
                    opacity: 0.8,
                    marginTop: 2,
                  }}
                >
                  {tab.challenges.length} challenges
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Challenges List */}
        <FlatList
          data={currentChallenges}
          renderItem={renderChallenge}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: Layout.screenMargin.mobile,
            paddingBottom: 32,
          }}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingTop: Spacing['3xl'] }}>
              <Ionicons name="trophy-outline" size={64} color={Colors.text.tertiary} />
              <Typography variant="h3" weight="semibold" style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm }}>
                No challenges available
              </Typography>
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
                Check back later for new challenges
              </Typography>
            </View>
          }
        />
      </View>
    </View>
  );
}
