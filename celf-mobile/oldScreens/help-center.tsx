import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';

interface FAQItem {
  id: string;
  question: string;
  category: string;
  icon: string;
}

interface ContactOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
  color: string;
}

export default function HelpCenterScreen() {
  const { toggleSidebar } = useNavigation();

  // Website URL - to be updated when website is created
  const WEBSITE_URL = 'https://celf.app'; // Placeholder URL
  const HELP_CENTER_URL = `${WEBSITE_URL}/help`;
  const CONTACT_URL = `${WEBSITE_URL}/contact`;

  // Quick FAQ items
  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I start mining CELF?',
      category: 'Mining',
      icon: 'diamond'
    },
    {
      id: '2',
      question: 'How to send and receive tokens?',
      category: 'Wallet',
      icon: 'wallet'
    },
    {
      id: '3',
      question: 'What are referral bonuses?',
      category: 'Referrals',
      icon: 'people'
    },
    {
      id: '4',
      question: 'How do achievements work?',
      category: 'Gamification',
      icon: 'trophy'
    },
    {
      id: '5',
      question: 'Account security best practices',
      category: 'Security',
      icon: 'shield'
    },
    {
      id: '6',
      question: 'Troubleshooting app issues',
      category: 'Technical',
      icon: 'settings'
    }
  ];

  // Contact options
  const contactOptions: ContactOption[] = [
    {
      id: '1',
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: 'chatbubbles',
      color: Colors.secondary.success,
      action: () => openLiveChat()
    },
    {
      id: '2',
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: 'mail',
      color: Colors.secondary.info,
      action: () => openEmailSupport()
    },
    {
      id: '3',
      title: 'Community Forum',
      description: 'Connect with other CELF users',
      icon: 'people-circle',
      color: Colors.secondary.warning,
      action: () => openCommunityForum()
    },
    {
      id: '4',
      title: 'Report a Bug',
      description: 'Help us improve the app',
      icon: 'bug',
      color: Colors.secondary.error,
      action: () => reportBug()
    }
  ];

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

  const openFullHelpCenter = () => {
    openWebsite(HELP_CENTER_URL, 'Help Center');
  };

  const openFAQ = (faq: FAQItem) => {
    const faqUrl = `${HELP_CENTER_URL}/faq/${faq.id}`;
    openWebsite(faqUrl, faq.question);
  };

  const openLiveChat = () => {
    // In a real app, this would open a live chat widget
    Alert.alert(
      'Live Chat',
      'Live chat will be available soon. For immediate assistance, please use email support.',
      [
        { text: 'OK' },
        { text: 'Email Support', onPress: openEmailSupport }
      ]
    );
  };

  const openEmailSupport = () => {
    const email = 'support@celf.app';
    const subject = 'CELF App Support Request';
    const body = 'Please describe your issue or question:\n\n';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Error', 'Could not open email app. Please contact support@celf.app directly.');
    });
  };

  const openCommunityForum = () => {
    const forumUrl = `${WEBSITE_URL}/community`;
    openWebsite(forumUrl, 'Community Forum');
  };

  const reportBug = () => {
    const bugReportUrl = `${WEBSITE_URL}/bug-report`;
    openWebsite(bugReportUrl, 'Bug Report');
  };

  const callEmergencySupport = () => {
    Alert.alert(
      'Emergency Support',
      'For urgent security issues or account compromises, please contact us immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Support', onPress: () => Linking.openURL('tel:+1-800-CELF-HELP') },
        { text: 'Email Security', onPress: () => Linking.openURL('mailto:security@celf.app') }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Help Center"
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
          
          {/* Welcome Section */}
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
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons name="help-circle" size={30} color={Colors.neutral.white} />
            </View>
            
            <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              How can we help?
            </Typography>
            
            <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9 }}>
              Find answers to common questions or get in touch with our support team
            </Typography>
          </Card>

          {/* Quick FAQ Section */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Quick FAQ
            </Typography>
            
            <View style={{ gap: Spacing.sm }}>
              {faqItems.map((faq) => (
                <TouchableOpacity
                  key={faq.id}
                  onPress={() => openFAQ(faq)}
                  style={{
                    backgroundColor: Colors.background.primary,
                    borderRadius: BorderRadius.md,
                    borderWidth: 1,
                    borderColor: Colors.border.primary,
                  }}
                >
                  <Card variant="default" style={{ margin: 0 }}>
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
                        <Ionicons name={faq.icon as any} size={20} color={Colors.primary.blue} />
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <Typography variant="bodyMedium" weight="semibold" numberOfLines={1}>
                          {faq.question}
                        </Typography>
                        <Typography variant="bodySmall" color="secondary">
                          {faq.category}
                        </Typography>
                      </View>
                      
                      <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Visit Full Help Center */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: Colors.secondary.info + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.md,
              }}>
                <Ionicons name="globe" size={24} color={Colors.secondary.info} />
              </View>
              
              <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                Need More Help?
              </Typography>
              
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.lg }}>
                Visit our comprehensive help center for detailed guides, tutorials, and documentation
              </Typography>
              
              <Button
                title="Visit Full Help Center"
                onPress={openFullHelpCenter}
                variant="primary"
                icon={<Ionicons name="open-outline" size={20} color={Colors.neutral.white} />}
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

          {/* Contact Support Options */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Contact Support
            </Typography>
            
            <View style={{ gap: Spacing.md }}>
              {contactOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={option.action}
                >
                  <Card variant="default">
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: option.color + '20',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: Spacing.md,
                      }}>
                        <Ionicons name={option.icon as any} size={24} color={option.color} />
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <Typography variant="bodyLarge" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                          {option.title}
                        </Typography>
                        <Typography variant="bodySmall" color="secondary">
                          {option.description}
                        </Typography>
                      </View>
                      
                      <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Emergency Contact */}
          <Card 
            variant="default" 
            style={{ 
              backgroundColor: Colors.secondary.error + '10',
              borderWidth: 1,
              borderColor: Colors.secondary.error + '30',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.error + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="warning" size={20} color={Colors.secondary.error} />
              </View>
              <Typography variant="h3" weight="semibold" style={{ color: Colors.secondary.error }}>
                Emergency Support
              </Typography>
            </View>
            
            <Typography variant="bodyMedium" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
              For urgent security issues, account compromises, or critical problems that require immediate attention.
            </Typography>
            
            <Button
              title="Emergency Contact"
              onPress={callEmergencySupport}
              variant="secondary"
              icon={<Ionicons name="call" size={20} color={Colors.secondary.error} />}
              style={{
                borderColor: Colors.secondary.error,
                backgroundColor: Colors.secondary.error + '10',
              }}
            />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
