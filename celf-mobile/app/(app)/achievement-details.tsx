/**
 * Achievement Details Screen - Refactored
 * Displays detailed information about a specific achievement
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router, useLocalSearchParams } from 'expo-router';

// Extracted hook
import { useAchievementDetails } from '@/src/features/achievements/hooks/useAchievementDetails';
import { getCategoryColor, getCategoryName, calculateProgress } from '@/src/features/achievements/utils';

export default function AchievementDetailsScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const { id } = useLocalSearchParams();

  const {
    achievement,
    handleShareAchievement,
    handleClaimReward,
    handleViewAllAchievements,
    handleGoBack,
  } = useAchievementDetails(id as string);

  if (!achievement) {
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
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: Layout.screenMargin.mobile,
        }}>
          <Ionicons name="alert-circle" size={64} color={themeColors.icon.tertiary} />
          <Typography variant="h3" weight="semibold" style={{
            marginTop: Spacing.lg,
            marginBottom: Spacing.sm,
            textAlign: 'center',
          }}>
            Achievement Not Found
          </Typography>
          <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
            The achievement you're looking for doesn't exist.
          </Typography>
          <Button
            title="Go Back"
            onPress={handleGoBack}
            style={{ marginTop: Spacing.lg }}
          />
        </View>
      </View>
    );
  }

  const categoryColor = getCategoryColor(achievement.category);
  const categoryName = getCategoryName(achievement.category);
  const progressPercentage = calculateProgress(achievement);

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

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>

          {/* Achievement Header */}
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
                name={achievement.icon as any}
                size={40}
                color={Colors.neutral.white}
              />

              {/* Completion Badge */}
              {achievement.isCompleted && (
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
                {categoryName}
              </Typography>
            </View>

            <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9 }}>
              {achievement.description}
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

            {achievement.isCompleted ? (
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
                {achievement.completedDate && (
                  <Typography variant="bodyMedium" color="secondary">
                    Completed on {new Date(achievement.completedDate).toLocaleDateString()}
                  </Typography>
                )}
              </View>
            ) : (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                  <Typography variant="bodyLarge" weight="medium">
                    {achievement.progress} / {achievement.maxProgress}
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
                  {achievement.maxProgress - achievement.progress} more to go!
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
                  {achievement.reward} CELF
                </Typography>
              </View>

              {achievement.isCompleted && (
                <Button
                  title="Claim"
                  onPress={handleClaimReward}
                  variant="primary"
                  size="small"
                />
              )}
            </View>

            <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
              {achievement.isCompleted
                ? 'Congratulations! You can claim your reward.'
                : 'Complete this achievement to earn CELF tokens.'
              }
            </Typography>
          </Card>

          {/* Tips Section */}
          {achievement.tips && achievement.tips.length > 0 && (
            <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
                <Ionicons name="bulb" size={20} color={Colors.secondary.info} style={{ marginRight: Spacing.sm }} />
                <Typography variant="h3" weight="semibold" style={{ color: Colors.secondary.info }}>
                  Tips
                </Typography>
              </View>

              {achievement.tips.map((tip, index) => (
                <View key={index} style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: index < achievement.tips!.length - 1 ? Spacing.md : 0,
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
          {achievement.requirements && achievement.requirements.length > 0 && (
            <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
                <Ionicons name="list" size={20} color={themeColors.icon.primary} style={{ marginRight: Spacing.sm }} />
                <Typography variant="h3" weight="semibold">
                  Requirements
                </Typography>
              </View>

              {achievement.requirements.map((requirement, index) => (
                <View key={index} style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: index < achievement.requirements!.length - 1 ? Spacing.md : 0,
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
              title="Share Achievement"
              onPress={handleShareAchievement}
              variant="secondary"
              icon={<Ionicons name="share" size={20} color={themeColors.text.primary} />}
              style={{ flex: 1 }}
            />

            <Button
              title="View All"
              onPress={handleViewAllAchievements}
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
