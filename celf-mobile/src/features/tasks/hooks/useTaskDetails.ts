/**
 * Task Details Hook
 * Custom hook for task details functionality
 */

import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Share } from 'react-native';
import { apiService } from '@/services/apiService';
import type { Task } from '../types';

export function useTaskDetails(taskId: string) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch task details from API
  const fetchTaskDetails = async () => {
    if (!taskId) {
      setError('Task ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('📋 Fetching task details for ID:', taskId);
      const response = await apiService.getTaskDetails(taskId);

      if (response.success && response.data) {
        console.log('✅ Task details fetched successfully:', response.data);
        setTask(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch task details');
      }
    } catch (err) {
      console.error('❌ Error fetching task details:', err);

      // Provide more specific error messages
      let errorMessage = 'Failed to fetch task details';
      if (err instanceof Error) {
        if (err.message.includes('Network error') || err.message.includes('fetch')) {
          errorMessage = err.message;
        } else if (err.message.includes('401')) {
          errorMessage = 'Authentication failed. Please login again.';
        } else if (err.message.includes('404')) {
          errorMessage = 'Task not found.';
        } else if (err.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      setTask(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch task details on mount and when taskId changes
  useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);

  // Handle sharing task
  const handleShareTask = async () => {
    if (!task) return;

    try {
      const message = `Check out this CELF task: ${task.title}\n\n${task.description}\n\nReward: ${task.reward} CELF tokens`;
      
      await Share.share({
        message,
        title: `CELF Task: ${task.title}`,
      });
    } catch (err) {
      console.error('❌ Error sharing task:', err);
    }
  };

  // Handle claiming reward
  const handleClaimReward = async () => {
    if (!task || !task.isCompleted || task.rewardClaimed) {
      return;
    }

    try {
      console.log('💰 Claiming reward for task:', task.id);
      const response = await apiService.claimTaskReward(task.id);

      if (response.success) {
        console.log('✅ Reward claimed successfully:', response.data);
        
        // Update task state to reflect claimed reward
        setTask(prev => prev ? { ...prev, rewardClaimed: true } : null);
        
        // You could show a success message here
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to claim reward');
      }
    } catch (err) {
      console.error('❌ Error claiming reward:', err);
      throw err;
    }
  };

  // Handle viewing all tasks
  const handleViewAllTasks = () => {
    router.push('/tasks');
  };

  // Handle going back
  const handleGoBack = () => {
    router.back();
  };

  return {
    // Data
    task,
    
    // State
    loading,
    error,
    
    // Actions
    handleShareTask,
    handleClaimReward,
    handleViewAllTasks,
    handleGoBack,
    fetchTaskDetails,
  };
}
