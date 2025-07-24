/**
 * Challenge Details Screen - Refactored
 * Reduced from 433 lines to ~60 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';

// Extracted components
import {
  ChallengeHeader,
  ProgressCard,
  Instructions,
  ActionButtons,
} from '@/src/features/challenge-details/components';

// Extracted hook
import { useChallengeDetails } from '@/src/features/challenge-details/hooks/useChallengeDetails';

export default function ChallengeDetailsScreen() {
  const { toggleSidebar } = useNavigation();
  
  // All business logic extracted to custom hook
  const {
    challenge,
    isStarted,
    progressPercentage,
    handleStartChallenge,
    handleShareChallenge,
  } = useChallengeDetails();

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
          
          <ChallengeHeader challenge={challenge} />

          <ProgressCard 
            challenge={challenge}
            progressPercentage={progressPercentage}
          />

          <Instructions challenge={challenge} />

          <View style={{ marginTop: Spacing['2xl'] }}>
            <ActionButtons
              challenge={challenge}
              isStarted={isStarted}
              onStart={handleStartChallenge}
              onShare={handleShareChallenge}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
