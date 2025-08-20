import React, { useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { useAuthStore } from '@/stores/authStore';
import { performDirectLogout } from '@/utils/logout';

export interface LogoutConfirmationModalProps {
  isVisible: boolean;
  onConfirm?: () => void; // Made optional since we'll handle logout internally
  onCancel: () => void;
  hasUnsavedData?: boolean;
  activeMiningSession?: boolean;
}

export const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  hasUnsavedData = false,
  activeMiningSession = false
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirm = async () => {
    setIsLoggingOut(true);

    try {
      console.log('🧪 Testing utility-based direct logout...');
      // Use direct logout (no confirmation since modal already confirms)
      await performDirectLogout('Logout Modal');
      console.log('✅ Utility direct logout completed');

      // Call the optional onConfirm callback if provided
      if (onConfirm) {
        onConfirm();
      }

      // Close the modal
      onCancel();
    } catch (error) {
      console.error('❌ Utility direct logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getWarningMessage = () => {
    if (activeMiningSession && hasUnsavedData) {
      return "You have an active mining session and unsaved changes. Logging out will stop mining and lose unsaved data.";
    } else if (activeMiningSession) {
      return "You have an active mining session. Logging out will stop your current mining progress.";
    } else if (hasUnsavedData) {
      return "You have unsaved changes that will be lost if you log out now.";
    }
    return "Are you sure you want to log out of your CELF account?";
  };

  const getWarningIcon = () => {
    if (activeMiningSession || hasUnsavedData) {
      return "warning";
    }
    return "log-out";
  };

  const getWarningColor = () => {
    if (activeMiningSession || hasUnsavedData) {
      return Colors.secondary.warning;
    }
    return Colors.secondary.info;
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Layout.screenMargin.mobile,
      }}>
        <Card 
          variant="default" 
          style={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: Colors.background.primary,
            borderRadius: BorderRadius.xl,
            shadowColor: Colors.neutral.black,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: Spacing['2xl'] }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: getWarningColor() + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons name={getWarningIcon() as any} size={40} color={getWarningColor()} />
            </View>
            
            <Typography variant="h2" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              Log Out
            </Typography>
            
            <Typography variant="bodyLarge" color="secondary" style={{ textAlign: 'center', lineHeight: 24 }}>
              {getWarningMessage()}
            </Typography>
          </View>

          {/* Warning Details */}
          {(activeMiningSession || hasUnsavedData) && (
            <View style={{
              backgroundColor: Colors.secondary.warning + '10',
              padding: Spacing.md,
              borderRadius: BorderRadius.md,
              marginBottom: Spacing['2xl'],
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Ionicons name="alert-circle" size={20} color={Colors.secondary.warning} style={{ marginRight: Spacing.sm, marginTop: 2 }} />
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm, color: Colors.secondary.warning }}>
                    Important Notice
                  </Typography>
                  <View style={{ gap: Spacing.xs }}>
                    {activeMiningSession && (
                      <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                        • Your current mining session will be stopped
                      </Typography>
                    )}
                    {hasUnsavedData && (
                      <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                        • Any unsaved changes will be permanently lost
                      </Typography>
                    )}
                    <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                      • You'll need to log in again to access your account
                    </Typography>
                    <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                      • Your CELF tokens and progress are safely stored
                    </Typography>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Account Security Info */}
          <View style={{
            backgroundColor: Colors.secondary.info + '10',
            padding: Spacing.md,
            borderRadius: BorderRadius.md,
            marginBottom: Spacing['2xl'],
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="shield-checkmark" size={20} color={Colors.secondary.info} style={{ marginRight: Spacing.sm, marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm, color: Colors.secondary.info }}>
                  Account Security
                </Typography>
                <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                  For your security, always log out when using shared devices or public networks.
                </Typography>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          {activeMiningSession && (
            <View style={{ marginBottom: Spacing['2xl'] }}>
              <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.md }}>
                Quick Actions
              </Typography>
              <View style={{ gap: Spacing.sm }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Mining Paused', 'Your mining session has been paused. You can resume it after logging back in.');
                    // In a real app, this would pause mining
                  }}
                  style={{
                    backgroundColor: Colors.background.tertiary,
                    padding: Spacing.md,
                    borderRadius: BorderRadius.md,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="pause" size={20} color={Colors.text.secondary} style={{ marginRight: Spacing.sm }} />
                  <Typography variant="bodyMedium">Pause mining before logout</Typography>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md }}>
            <Button
              title={isLoggingOut ? "Logging Out..." : "Confirm Logout"}
              onPress={handleConfirm}
              variant="secondary"
              disabled={isLoggingOut}
              loading={isLoggingOut}
              icon={!isLoggingOut ? <Ionicons name="log-out" size={20} color={Colors.secondary.error} /> : undefined}
              style={{
                borderColor: Colors.secondary.error,
                backgroundColor: Colors.secondary.error + '10',
              }}
            />
            
            <Button
              title="Cancel"
              onPress={onCancel}
              variant="primary"
              disabled={isLoggingOut}
              icon={<Ionicons name="close" size={20} color={Colors.neutral.white} />}
              style={{
                shadowColor: Colors.primary.blue,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};
