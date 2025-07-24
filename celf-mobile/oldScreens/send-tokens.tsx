import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';

export default function SendTokensScreen() {
  const { toggleSidebar } = useNavigation();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  
  const balance = 1247.89;
  const estimatedFee = 0.01;
  
  // Mock recent contacts
 
  const handleSend = () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (parseFloat(amount) > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    // Navigate to confirmation screen (to be created)
    Alert.alert(
      'Confirm Transaction',
      `Send ${amount} CELF to ${recipient}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => {
          Alert.alert('Success', 'Transaction sent successfully!');
          router.back();
        }}
      ]
    );
  };

  const selectContact = (contact: any) => {
    setSelectedContact(contact);
    setRecipient(contact.username);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Send Tokens"
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
          
          {/* Balance Display */}
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
              marginBottom: Spacing['2xl'],
              alignItems: 'center'
            }}
          >
            <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
              Available Balance
            </Typography>
            <Typography variant="displaySmall" color="inverse" weight="bold">
              {balance.toFixed(2)}
            </Typography>
            <Typography variant="bodyLarge" color="inverse" weight="semibold" style={{ opacity: 0.9 }}>
              CELF
            </Typography>
          </Card>

          

          {/* Recipient Input */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Send To
            </Typography>
            <Card variant="default">
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: Colors.primary.blue + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name="person-outline" size={20} color={Colors.primary.blue} />
                </View>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: Colors.text.primary,
                    paddingVertical: Spacing.md,
                  }}
                  placeholder="Enter username or wallet address"
                  placeholderTextColor={Colors.text.tertiary}
                  value={recipient}
                  onChangeText={setRecipient}
                  autoCapitalize="none"
                />
              </View>
            </Card>
          </View>

          {/* Amount Input */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Amount
            </Typography>
            <Card variant="default">
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: Colors.secondary.success + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name="cash-outline" size={20} color={Colors.secondary.success} />
                </View>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: Colors.text.primary,
                    paddingVertical: Spacing.md,
                  }}
                  placeholder="0.00"
                  placeholderTextColor={Colors.text.tertiary}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                <Typography variant="h3" weight="semibold" color="primary">
                  CELF
                </Typography>
              </View>

              {/* Quick Amount Buttons */}
              <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
                {[
                  { label: '25%', value: 0.25 },
                  { label: '50%', value: 0.5 },
                  { label: '75%', value: 0.75 },
                  { label: 'MAX', value: 1 }
                ].map((item) => (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => {
                      const value = item.label === 'MAX'
                        ? (balance - estimatedFee).toFixed(2)
                        : (balance * item.value).toFixed(2);
                      setAmount(value);
                    }}
                    style={{
                      flex: 1,
                      paddingVertical: Spacing.sm,
                      paddingHorizontal: Spacing.md,
                      backgroundColor: Colors.background.tertiary,
                      borderRadius: BorderRadius.md,
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="bodySmall" color="primary" weight="semibold">
                      {item.label}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          </View>

          {/* Message Input */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Message (Optional)
            </Typography>
            <Card variant="default">
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: Colors.secondary.info + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                  marginTop: Spacing.xs,
                }}>
                  <Ionicons name="chatbubble-outline" size={20} color={Colors.secondary.info} />
                </View>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: Colors.text.primary,
                    paddingVertical: Spacing.md,
                    minHeight: 80,
                    textAlignVertical: 'top',
                  }}
                  placeholder="Add a note to your transaction..."
                  placeholderTextColor={Colors.text.tertiary}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  maxLength={200}
                />
              </View>
              <Typography variant="bodySmall" color="tertiary" style={{ textAlign: 'right', marginTop: Spacing.xs }}>
                {message.length}/200
              </Typography>
            </Card>
          </View>

          {/* Transaction Summary */}
          {amount && (
            <Card
              variant="default"
              style={{
                marginBottom: Spacing['2xl'],
                backgroundColor: Colors.background.tertiary,
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
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
                  <Ionicons name="receipt-outline" size={20} color={Colors.primary.blue} />
                </View>
                <Typography variant="h3" weight="semibold">
                  Transaction Summary
                </Typography>
              </View>

              <View style={{ gap: Spacing.md }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="bodyMedium" color="secondary">Amount</Typography>
                  <Typography variant="bodyMedium" weight="semibold">{amount} CELF</Typography>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="bodyMedium" color="secondary">Network Fee</Typography>
                  <Typography variant="bodyMedium" weight="semibold">{estimatedFee} CELF</Typography>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: Spacing.md,
                  borderTopWidth: 1,
                  borderTopColor: Colors.border.primary,
                }}>
                  <Typography variant="bodyLarge" weight="bold">Total</Typography>
                  <Typography variant="bodyLarge" weight="bold" color="primary">
                    {(parseFloat(amount) + estimatedFee).toFixed(2)} CELF
                  </Typography>
                </View>
              </View>
            </Card>
          )}

          {/* Send Button */}
          <Button
            title="Send Tokens"
            onPress={handleSend}
            variant="primary"
            size="large"
            disabled={!recipient || !amount || parseFloat(amount) <= 0}
            icon={<Ionicons name="send" size={20} color={Colors.neutral.white} />}
            style={{
              shadowColor: Colors.primary.blue,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
