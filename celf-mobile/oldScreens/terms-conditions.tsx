import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';

interface TermsSection {
  id: string;
  title: string;
  summary: string;
  icon: string;
  importance: 'high' | 'medium' | 'low';
}

export default function TermsConditionsScreen() {
  const { toggleSidebar } = useNavigation();
  const [hasAccepted, setHasAccepted] = useState(true); // Mock acceptance status

  // Website URL - to be updated when website is created
  const WEBSITE_URL = 'https://celf.app';
  const TERMS_URL = `${WEBSITE_URL}/terms`;

  // Last updated date
  const lastUpdated = '2025-01-17';
  const version = '1.0';

  // Terms sections summary
  const termsSections: TermsSection[] = [
    {
      id: '1',
      title: 'User Agreement',
      summary: 'Your rights and responsibilities as a CELF user, including account usage and conduct guidelines.',
      icon: 'person-circle',
      importance: 'high'
    },
    {
      id: '2',
      title: 'Mining Terms',
      summary: 'Rules and conditions for CELF token mining, including rewards, limitations, and fair usage policies.',
      icon: 'diamond',
      importance: 'high'
    },
    {
      id: '3',
      title: 'Wallet & Transactions',
      summary: 'Terms governing digital wallet usage, token transfers, and transaction processing.',
      icon: 'wallet',
      importance: 'high'
    },
    {
      id: '4',
      title: 'Privacy & Data',
      summary: 'How we collect, use, and protect your personal information and app usage data.',
      icon: 'shield-checkmark',
      importance: 'high'
    },
    {
      id: '5',
      title: 'Referral Program',
      summary: 'Terms and conditions for the referral system, bonuses, and reward distribution.',
      icon: 'people',
      importance: 'medium'
    },
    {
      id: '6',
      title: 'Intellectual Property',
      summary: 'Copyright, trademark, and intellectual property rights related to CELF platform.',
      icon: 'document-text',
      importance: 'medium'
    },
    {
      id: '7',
      title: 'Limitation of Liability',
      summary: 'Legal limitations and disclaimers regarding platform usage and potential risks.',
      icon: 'warning',
      importance: 'medium'
    },
    {
      id: '8',
      title: 'Termination',
      summary: 'Conditions under which accounts may be suspended or terminated.',
      icon: 'close-circle',
      importance: 'low'
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return Colors.secondary.error;
      case 'medium': return Colors.secondary.warning;
      case 'low': return Colors.secondary.info;
      default: return Colors.primary.blue;
    }
  };

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case 'high': return 'IMPORTANT';
      case 'medium': return 'REVIEW';
      case 'low': return 'INFO';
      default: return 'REVIEW';
    }
  };

  const openWebsite = async (url: string, title: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${title}. Please check your internet connection.`);
      }
    } catch (error) {
      Alert.alert('Error', `Failed to open ${title}. Please try again later.`);
    }
  };

  const openFullTerms = () => {
    openWebsite(TERMS_URL, 'Terms & Conditions');
  };

  const openSection = (section: TermsSection) => {
    const sectionUrl = `${TERMS_URL}#${section.id}`;
    openWebsite(sectionUrl, section.title);
  };

  const acceptTerms = () => {
    if (hasAccepted) {
      Alert.alert('Already Accepted', 'You have already accepted the current terms and conditions.');
      return;
    }

    Alert.alert(
      'Accept Terms & Conditions',
      'By accepting, you agree to be bound by all terms and conditions. Please make sure you have read and understood them.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept', 
          onPress: () => {
            setHasAccepted(true);
            Alert.alert('Terms Accepted', 'Thank you for accepting our terms and conditions.');
          }
        }
      ]
    );
  };

  const downloadTerms = () => {
    const downloadUrl = `${TERMS_URL}/download`;
    openWebsite(downloadUrl, 'Download Terms');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Terms & Conditions"
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
          
          {/* Terms Header */}
          <Card 
            variant="gradient" 
            gradientColors={[Colors.secondary.info, Colors.secondary.info + 'CC']}
            style={{ 
              backgroundColor: Colors.secondary.info,
              shadowColor: Colors.secondary.info,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
              marginBottom: Spacing['2xl'],
              alignItems: 'center'
            }}
          >
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons name="document-text" size={30} color={Colors.neutral.white} />
            </View>
            
            <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              Terms & Conditions
            </Typography>
            
            <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9, marginBottom: Spacing.md }}>
              Legal agreement governing your use of CELF
            </Typography>
            
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: Spacing.md,
              paddingVertical: Spacing.sm,
              borderRadius: BorderRadius.full,
            }}>
              <Typography variant="bodySmall" color="inverse" weight="semibold">
                Version {version} • Updated {lastUpdated}
              </Typography>
            </View>
          </Card>

          {/* Acceptance Status */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: hasAccepted ? Colors.secondary.success + '20' : Colors.secondary.warning + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons 
                  name={hasAccepted ? "checkmark-circle" : "time"} 
                  size={20} 
                  color={hasAccepted ? Colors.secondary.success : Colors.secondary.warning} 
                />
              </View>
              <Typography variant="h3" weight="semibold">
                Acceptance Status
              </Typography>
            </View>
            
            {hasAccepted ? (
              <View style={{
                backgroundColor: Colors.secondary.success + '10',
                padding: Spacing.md,
                borderRadius: BorderRadius.md,
              }}>
                <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                  Terms Accepted
                </Typography>
                <Typography variant="bodySmall" color="secondary">
                  You accepted the current terms and conditions on {lastUpdated}
                </Typography>
              </View>
            ) : (
              <View>
                <View style={{
                  backgroundColor: Colors.secondary.warning + '10',
                  padding: Spacing.md,
                  borderRadius: BorderRadius.md,
                  marginBottom: Spacing.lg,
                }}>
                  <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                    Acceptance Required
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    Please review and accept the updated terms and conditions to continue using CELF.
                  </Typography>
                </View>
                
                <Button
                  title="Accept Terms & Conditions"
                  onPress={acceptTerms}
                  variant="primary"
                  icon={<Ionicons name="checkmark" size={20} color={Colors.neutral.white} />}
                />
              </View>
            )}
          </Card>

          {/* Terms Summary */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Terms Summary
            </Typography>
            
            <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
              Here's a quick overview of the key sections in our terms and conditions. Click any section to read the full details.
            </Typography>
            
            <View style={{ gap: Spacing.sm }}>
              {termsSections.map((section) => (
                <TouchableOpacity
                  key={section.id}
                  onPress={() => openSection(section)}
                >
                  <Card variant="default">
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: getImportanceColor(section.importance) + '20',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: Spacing.md,
                      }}>
                        <Ionicons name={section.icon as any} size={20} color={getImportanceColor(section.importance)} />
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
                          <Typography variant="bodyMedium" weight="semibold" style={{ flex: 1 }}>
                            {section.title}
                          </Typography>
                          <View style={{
                            backgroundColor: getImportanceColor(section.importance) + '20',
                            paddingHorizontal: Spacing.sm,
                            paddingVertical: 2,
                            borderRadius: BorderRadius.sm,
                          }}>
                            <Typography variant="bodySmall" style={{ color: getImportanceColor(section.importance) }} weight="medium">
                              {getImportanceLabel(section.importance)}
                            </Typography>
                          </View>
                        </View>
                        <Typography variant="bodySmall" color="secondary" numberOfLines={2}>
                          {section.summary}
                        </Typography>
                      </View>
                      
                      <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} style={{ marginLeft: Spacing.sm }} />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Full Terms Access */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: Colors.primary.blue + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.md,
              }}>
                <Ionicons name="globe" size={24} color={Colors.primary.blue} />
              </View>
              
              <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                Complete Terms & Conditions
              </Typography>
              
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.lg }}>
                Read the full legal document with all terms, conditions, and legal provisions
              </Typography>
              
              <Button
                title="Read Full Terms"
                onPress={openFullTerms}
                variant="primary"
                icon={<Ionicons name="open-outline" size={20} color={Colors.neutral.white} />}
                style={{
                  shadowColor: Colors.primary.blue,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                  marginBottom: Spacing.md,
                }}
              />
              
              <Button
                title="Download PDF"
                onPress={downloadTerms}
                variant="secondary"
                icon={<Ionicons name="download-outline" size={20} color={Colors.primary.blue} />}
              />
            </View>
          </Card>

          {/* Quick Acceptance */}
          {!hasAccepted && (
            <Card 
              variant="default" 
              style={{ 
                backgroundColor: Colors.secondary.warning + '10',
                borderWidth: 1,
                borderColor: Colors.secondary.warning + '30',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: Colors.secondary.warning + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name="warning" size={20} color={Colors.secondary.warning} />
                </View>
                <Typography variant="h3" weight="semibold" style={{ color: Colors.secondary.warning }}>
                  Quick Acceptance
                </Typography>
              </View>
              
              <Typography variant="bodyMedium" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
                By using CELF, you agree to our terms and conditions. Please review them carefully before accepting.
              </Typography>
              
              <Button
                title="I Accept the Terms & Conditions"
                onPress={acceptTerms}
                variant="secondary"
                icon={<Ionicons name="checkmark" size={20} color={Colors.secondary.warning} />}
                style={{
                  borderColor: Colors.secondary.warning,
                  backgroundColor: Colors.secondary.warning + '10',
                }}
              />
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
