/**
 * Task Details Screen - Refactored
 * Displays detailed information about a specific task
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router, useLocalSearchParams } from 'expo-router';

// Extracted hook
import { useTaskDetails } from '@/src/features/tasks/hooks/useTaskDetails';
import { getCategoryColor, getCategoryName, calculateProgress } from '@/src/features/tasks/utils';
import { NetworkErrorState } from '@/src/features/tasks/components';

export default function TaskDetailsScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const { id } = useLocalSearchParams();

  const {
    task,
    loading,
    error,
    handleShareTask,
    handleClaimReward,
    handleViewAllTasks,
    handleGoBack,
    fetchTaskDetails,
  } = useTaskDetails(id as string);

  const handleOpenLink = async () => {
    if (!task?.linkUrl) return;
    
    try {
      const supported = await Linking.canOpenURL(task.linkUrl);
      if (supported) {
        await Linking.openURL(task.linkUrl);
      } else {
        Alert.alert('Error', 'Unable to open this link');
      }
    } catch (error) {
      console.error('Error opening link:', error);
      Alert.alert('Error', 'Failed to open the link');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
        <Header
          title="Task Details"
          onMenuPress={toggleSidebar}
          rightAction={
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
            </TouchableOpacity>
          }
        />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: Layout.screenMargin.mobile,
        }}>
          <Ionicons name="hourglass-outline" size={64} color={themeColors.icon.tertiary} />
          <Typography variant="h3" weight="semibold" style={{
            marginTop: Spacing.lg,
            marginBottom: Spacing.sm,
            textAlign: 'center',
          }}>
            Loading Task...
          </Typography>
          <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
            Please wait while we fetch the task details.
          </Typography>
        </View>
      </View>
    );
  }

  if (error || !task) {
    return (
      <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
        <Header
          title="Achievement Details"
          onMenuPress={toggleSidebar}
          rightAction={
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
            </TouchableOpacity>
          }
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {error ? (
            <NetworkErrorState
              error={error}
              onRetry={fetchTaskDetails}
              title="Failed to Load Task"
              description="Unable to fetch task details. Please check your connection and try again."
              showBackButton={true}
              onGoBack={handleGoBack}
            />
          ) : (
            <View style={{
              alignItems: 'center',
              paddingHorizontal: Layout.screenMargin.mobile,
            }}>
              <Ionicons name="alert-circle" size={64} color={themeColors.icon.tertiary} />
              <Typography variant="h3" weight="semibold" style={{
                marginTop: Spacing.lg,
                marginBottom: Spacing.sm,
                textAlign: 'center',
              }}>
                Task Not Found
              </Typography>
              <Typography variant="bodyMedium" color="secondary" style={{
                textAlign: 'center',
                marginBottom: Spacing.lg,
              }}>
                The task you're looking for doesn't exist.
              </Typography>
              <Button
                title="Go Back"
                onPress={handleGoBack}
                variant="secondary"
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  const categoryColor = getCategoryColor(task.category);
  const categoryName = getCategoryName(task.category);
  const progressPercentage = calculateProgress(task);

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Task Details"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>

          {/* Task Header */}
          <Card
            variant="gradient"
            gradientColors={[categoryColor, categoryColor + 'CC']}
            style={{
              backgroundColor: categoryColor,
              shadowColor: categoryColor,
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
              position: 'relative',
            }}>
              <Ionicons
                name={task.icon as any}
                size={40}
                color={Colors.neutral.white}
              />

              {/* Completion Badge */}
              {task.isCompleted && (
                <View style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: Colors.secondary.success,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: Colors.neutral.white,
                }}>
                  <Ionicons name="checkmark" size={14} color={Colors.neutral.white} />
                </View>
              )}
            </View>

            <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              {task.title}
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
                {categoryName}
              </Typography>
            </View>

            <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9 }}>
              {task.description}
            </Typography>
          </Card>

          {/* Progress Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
              <Ionicons name="trending-up" size={20} color={categoryColor} style={{ marginRight: Spacing.sm }} />
              <Typography variant="h3" weight="semibold" style={{ color: categoryColor }}>
                Progress
              </Typography>
            </View>

            {task.isCompleted ? (
              <View style={{ alignItems: 'center', paddingVertical: Spacing.lg }}>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: Colors.secondary.success + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: Spacing.md,
                }}>
                  <Ionicons name="checkmark-circle" size={30} color={Colors.secondary.success} />
                </View>
                <Typography variant="h3" weight="bold" style={{ color: Colors.secondary.success, marginBottom: Spacing.sm }}>
                  Completed!
                </Typography>
                {task.completedDate && (
                  <Typography variant="bodyMedium" color="secondary">
                    Completed on {new Date(task.completedDate).toLocaleDateString()}
                  </Typography>
                )}
              </View>
            ) : (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                  <Typography variant="bodyLarge" weight="medium">
                    {task.progress} / {task.maxProgress}
                  </Typography>
                  <Typography variant="bodyLarge" weight="bold" style={{ color: categoryColor }}>
                    {Math.round(progressPercentage)}%
                  </Typography>
                </View>

                {/* Progress Bar */}
                <View style={{
                  height: 12,
                  backgroundColor: themeColors.background.tertiary,
                  borderRadius: 6,
                  overflow: 'hidden',
                  marginBottom: Spacing.md,
                }}>
                  <View style={{
                    height: '100%',
                    width: `${progressPercentage}%`,
                    backgroundColor: categoryColor,
                    borderRadius: 6,
                  }} />
                </View>

                <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
                  {task.maxProgress - task.progress} more to go!
                </Typography>
              </View>
            )}
          </Card>

          {/* Reward Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
              <Ionicons name="diamond" size={20} color={Colors.secondary.warning} style={{ marginRight: Spacing.sm }} />
              <Typography variant="h3" weight="semibold" style={{ color: Colors.secondary.warning }}>
                Reward
              </Typography>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: Colors.secondary.warning + '10',
              padding: Spacing.md,
              borderRadius: BorderRadius.md,
              marginBottom: Spacing.md,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="diamond" size={24} color={Colors.secondary.warning} style={{ marginRight: Spacing.sm }} />
                <Typography variant="h2" weight="bold" style={{ color: Colors.secondary.warning }}>
                  {task.reward} CELF
                </Typography>
              </View>

              {task.isCompleted && !task.rewardClaimed && (
                <Button
                  title="Claim Reward"
                  onPress={handleClaimReward}
                  variant="primary"
                  size="small"
                />
              )}

              {task.isCompleted && task.rewardClaimed && (
                <View style={{
                  backgroundColor: Colors.secondary.success + '20',
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  borderRadius: BorderRadius.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} style={{ marginRight: Spacing.xs }} />
                  <Typography variant="bodySmall" weight="semibold" style={{ color: Colors.secondary.success }}>
                    Reward Claimed
                  </Typography>
                </View>
              )}
            </View>

            <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
              {task.isCompleted
                ? task.rewardClaimed
                  ? 'Congratulations! You have claimed your reward.'
                  : 'Congratulations! You can claim your reward.'
                : 'Complete this task to earn CELF tokens.'
              }
            </Typography>
          </Card>

          {/* Link Task Section */}
          {task.isLinkTask && task.linkUrl && (
            <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
                <Ionicons name="link" size={20} color={Colors.primary.blue} style={{ marginRight: Spacing.sm }} />
                <Typography variant="h3" weight="semibold" style={{ color: Colors.primary.blue }}>
                  External Link
                </Typography>
              </View>

              <View style={{
                backgroundColor: Colors.primary.blue + '10',
                padding: Spacing.md,
                borderRadius: BorderRadius.md,
                marginBottom: Spacing.md,
              }}>
                <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.md, textAlign: 'center' }}>
                  This task requires you to visit an external link. Click the button below to open the link.
                </Typography>

                <Button
                  title="Open Link"
                  onPress={handleOpenLink}
                  variant="primary"
                  icon={<Ionicons name="open" size={20} color={Colors.neutral.white} />}
                  style={{ 
                    backgroundColor: Colors.primary.blue,
                    shadowColor: Colors.primary.blue,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 4,
                  }}
                />
              </View>

              <Typography variant="bodySmall" color="secondary" style={{ textAlign: 'center', fontStyle: 'italic' }}>
                Complete the required action on the external site to finish this task.
              </Typography>
            </Card>
          )}

          {/* Tips Section */}
          {task.tips && task.tips.length > 0 && (
            <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
                <Ionicons name="bulb" size={20} color={Colors.secondary.info} style={{ marginRight: Spacing.sm }} />
                <Typography variant="h3" weight="semibold" style={{ color: Colors.secondary.info }}>
                  Tips
                </Typography>
              </View>

              {task.tips.map((tip, index) => (
                <View key={index} style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: index < task.tips!.length - 1 ? Spacing.md : 0,
                }}>
                  <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: Colors.secondary.info,
                    marginTop: 8,
                    marginRight: Spacing.sm,
                  }} />
                  <Typography variant="bodyMedium" style={{ flex: 1, lineHeight: 22 }}>
                    {tip}
                  </Typography>
                </View>
              ))}
            </Card>
          )}

          {/* Requirements Section */}
          {task.requirements && task.requirements.length > 0 && (
            <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
                <Ionicons name="list" size={20} color={themeColors.icon.primary} style={{ marginRight: Spacing.sm }} />
                <Typography variant="h3" weight="semibold">
                  Requirements
                </Typography>
              </View>

              {task.requirements.map((requirement, index) => (
                <View key={index} style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: index < task.requirements!.length - 1 ? Spacing.md : 0,
                }}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={16}
                    color={themeColors.icon.secondary}
                    style={{ marginTop: 2, marginRight: Spacing.sm }}
                  />
                  <Typography variant="bodyMedium" style={{ flex: 1, lineHeight: 22 }}>
                    {requirement}
                  </Typography>
                </View>
              ))}
            </Card>
          )}

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', gap: Spacing.md }}>
            <Button
              title="Share Task"
              onPress={handleShareTask}
              variant="secondary"
              icon={<Ionicons name="share" size={20} color={themeColors.text.primary} />}
              style={{ flex: 1 }}
            />

            <Button
              title="View All"
              onPress={handleViewAllTasks}
              variant="primary"
              icon={<Ionicons name="trophy" size={20} color={Colors.neutral.white} />}
              style={{ flex: 1 }}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
