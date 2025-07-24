import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';

interface Achievement {
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
}

export default function AchievementsScreen() {
  const { toggleSidebar } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first mining session',
      category: 'mining',
      progress: 1,
      maxProgress: 1,
      reward: 10,
      isCompleted: true,
      icon: 'diamond',
      completedDate: '2025-01-15'
    },
    {
      id: '2',
      title: 'Mining Streak',
      description: 'Mine for 7 consecutive days',
      category: 'mining',
      progress: 5,
      maxProgress: 7,
      reward: 50,
      isCompleted: false,
      icon: 'flame'
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Refer 5 friends to CELF',
      category: 'social',
      progress: 3,
      maxProgress: 5,
      reward: 100,
      isCompleted: false,
      icon: 'people'
    },
    {
      id: '4',
      title: 'First Transaction',
      description: 'Send your first CELF tokens',
      category: 'wallet',
      progress: 1,
      maxProgress: 1,
      reward: 25,
      isCompleted: true,
      icon: 'send',
      completedDate: '2025-01-16'
    },
    {
      id: '5',
      title: 'CELF Collector',
      description: 'Accumulate 1000 CELF tokens',
      category: 'milestone',
      progress: 750,
      maxProgress: 1000,
      reward: 200,
      isCompleted: false,
      icon: 'trophy'
    },
    {
      id: '6',
      title: 'Community Leader',
      description: 'Have 10 active referrals',
      category: 'social',
      progress: 8,
      maxProgress: 10,
      reward: 300,
      isCompleted: false,
      icon: 'star'
    }
  ];

  const categories = [
    { key: 'all', label: 'All', icon: 'grid', color: Colors.primary.blue },
    { key: 'mining', label: 'Mining', icon: 'diamond', color: Colors.secondary.warning },
    { key: 'social', label: 'Social', icon: 'people', color: Colors.secondary.success },
    { key: 'wallet', label: 'Wallet', icon: 'wallet', color: Colors.secondary.info },
    { key: 'milestone', label: 'Milestones', icon: 'trophy', color: Colors.secondary.error },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mining': return Colors.secondary.warning;
      case 'social': return Colors.secondary.success;
      case 'wallet': return Colors.secondary.info;
      case 'milestone': return Colors.secondary.error;
      default: return Colors.primary.blue;
    }
  };

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const completedCount = achievements.filter(a => a.isCompleted).length;
  const totalRewards = achievements.filter(a => a.isCompleted).reduce((sum, a) => sum + a.reward, 0);

  const renderAchievement = ({ item }: { item: Achievement }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(app)/achievement-details?id=${item.id}` as any)}
      style={{ marginBottom: Spacing.md }}
    >
      <Card 
        variant="default" 
        style={{
          opacity: item.isCompleted ? 1 : 0.8,
          borderWidth: item.isCompleted ? 2 : 1,
          borderColor: item.isCompleted ? getCategoryColor(item.category) : Colors.border.primary,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: getCategoryColor(item.category) + (item.isCompleted ? 'FF' : '20'),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.md,
          }}>
            <Ionicons 
              name={item.icon as any} 
              size={24} 
              color={item.isCompleted ? Colors.neutral.white : getCategoryColor(item.category)} 
            />
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Typography variant="bodyLarge" weight="semibold" numberOfLines={1}>
                  {item.title}
                </Typography>
                <Typography variant="bodySmall" color="secondary" numberOfLines={2} style={{ marginBottom: Spacing.sm }}>
                  {item.description}
                </Typography>
              </View>
              
              <View style={{ alignItems: 'flex-end', marginLeft: Spacing.sm }}>
                <Typography variant="bodyMedium" weight="bold" color="primary">
                  +{item.reward} CELF
                </Typography>
                {item.isCompleted && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Spacing.xs }}>
                    <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} />
                    <Typography variant="bodySmall" color="success" style={{ marginLeft: Spacing.xs }}>
                      Completed
                    </Typography>
                  </View>
                )}
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={{ marginTop: Spacing.sm }}>
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
                  backgroundColor: getCategoryColor(item.category),
                  borderRadius: 3,
                }} />
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Achievements"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1 }}>
        {/* Stats Overview */}
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing.lg,
          paddingBottom: Spacing.md,
        }}>
          <Card 
            variant="gradient" 
            gradientColors={[Colors.primary.blue, Colors.primary.light]}
            style={{ 
              backgroundColor: Colors.primary.blue,
              shadowColor: Colors.primary.blue,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {completedCount}
                </Typography>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
                  Completed
                </Typography>
              </View>
              
              <View style={{
                width: 1,
                height: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }} />
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {achievements.length}
                </Typography>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
                  Total
                </Typography>
              </View>
              
              <View style={{
                width: 1,
                height: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }} />
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {totalRewards}
                </Typography>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
                  CELF Earned
                </Typography>
              </View>
            </View>
          </Card>
        </View>

        {/* Category Filters */}
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingBottom: Spacing.md,
        }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  onPress={() => setSelectedCategory(category.key)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.sm,
                    backgroundColor: selectedCategory === category.key 
                      ? category.color 
                      : Colors.background.primary,
                    borderRadius: BorderRadius.full,
                    borderWidth: 1,
                    borderColor: selectedCategory === category.key 
                      ? category.color 
                      : Colors.border.primary,
                  }}
                >
                  <Ionicons 
                    name={category.icon as any} 
                    size={16} 
                    color={selectedCategory === category.key ? Colors.neutral.white : category.color}
                    style={{ marginRight: Spacing.xs }}
                  />
                  <Typography 
                    variant="bodySmall" 
                    weight="medium"
                    style={{ 
                      color: selectedCategory === category.key ? Colors.neutral.white : category.color 
                    }}
                  >
                    {category.label}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Achievements List */}
        <FlatList
          data={filteredAchievements}
          renderItem={renderAchievement}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: Layout.screenMargin.mobile,
            paddingBottom: 32,
          }}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingTop: Spacing['3xl'] }}>
              <Ionicons name="trophy-outline" size={64} color={Colors.text.tertiary} />
              <Typography variant="h3" weight="semibold" style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm }}>
                No achievements found
              </Typography>
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
                Try selecting a different category
              </Typography>
            </View>
          }
        />
      </View>
    </View>
  );
}
