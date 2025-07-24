/**
 * Challenge Details Hook
 * Custom hook for challenge details functionality
 */

import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getMockChallengeData } from '../data';
import { startChallenge, shareChallenge, calculateProgressPercentage } from '../utils';

export const useChallengeDetails = () => {
  const { id } = useLocalSearchParams();
  const [isStarted, setIsStarted] = useState(false);
  
  // Get challenge data (in real app, this would be fetched from API)
  const challenge = getMockChallengeData(id as string);
  
  // Calculate progress percentage
  const progressPercentage = calculateProgressPercentage(challenge.progress, challenge.maxProgress);

  // Handle start challenge
  const handleStartChallenge = () => {
    startChallenge(challenge, isStarted, setIsStarted);
  };

  // Handle share challenge
  const handleShareChallenge = () => {
    shareChallenge(challenge);
  };

  return {
    challenge,
    isStarted,
    progressPercentage,
    handleStartChallenge,
    handleShareChallenge,
  };
};
