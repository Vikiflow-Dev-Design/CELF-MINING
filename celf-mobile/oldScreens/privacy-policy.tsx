import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';

interface PrivacySection {
  id: string;
  title: string;
  summary: string;
  icon: string;
  dataType: 'personal' | 'usage' | 'device' | 'optional';
}

interface PrivacyControl {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
  isRequired: boolean;
  icon: string;
}

export default function PrivacyPolicyScreen() {
  const { toggleSidebar } = useNavigation();
  
  // Privacy controls state
  const [privacyControls, setPrivacyControls] = useState<PrivacyControl[]>([
    {
      id: '1',
      title: 'Analytics & Performance',
      description: 'Help us improve the app by sharing usage analytics',
      isEnabled: true,
      isRequired: false,
      icon: 'analytics'
    },
    {
      id: '2',
      title: 'Marketing Communications',
      description: 'Receive updates about new features and promotions',
      isEnabled: false,
      isRequired: false,
      icon: 'mail'
    },
    {
      id: '3',
      title: 'Personalized Experience',
      description: 'Customize app experience based on your preferences',
      isEnabled: true,
      isRequired: false,
      icon: 'person'
    }
  ]);

  // Website URL - to be updated when website is created
  const WEBSITE_URL = 'https://celf.app';
  const PRIVACY_URL = `${WEBSITE_URL}/privacy`;

  // Last updated date
  const lastUpdated = '2025-01-17';
  const version = '1.0';

  // Privacy sections summary
  const privacySections: PrivacySection[] = [
    {
      id: '1',
      title: 'Information We Collect',
      summary: 'Personal data, account information, and app usage data we collect to provide CELF services.',
      icon: 'folder',
      dataType: 'personal'
    },
    {
      id: '2',
      title: 'How We Use Your Data',
      summary: 'Purposes for data processing including mining rewards, transactions, and app improvements.',
      icon: 'cog',
      dataType: 'usage'
    },
    {
      id: '3',
      title: 'Data Sharing & Disclosure',
      summary: 'When and how we share your information with third parties and service providers.',
      icon: 'share',
      dataType: 'usage'
    },
    {
      id: '4',
      title: 'Data Security',
      summary: 'Security measures we implement to protect your personal information and crypto assets.',
      icon: 'shield-checkmark',
      dataType: 'personal'
    },
    {
      id: '5',
      title: 'Your Privacy Rights',
      summary: 'Your rights to access, modify, delete, or control your personal data.',
      icon: 'key',
      dataType: 'personal'
    },
    {
      id: '6',
      title: 'Cookies & Tracking',
      summary: 'How we use cookies, analytics, and tracking technologies in the app.',
      icon: 'eye',
      dataType: 'device'
    },
    {
      id: '7',
      title: 'Third-Party Services',
      summary: 'External services integrated into CELF and their privacy practices.',
      icon: 'link',
      dataType: 'optional'
    },
    {
      id: '8',
      title: 'Data Retention',
      summary: 'How long we keep your data and our deletion policies.',
      icon: 'time',
      dataType: 'usage'
    }
  ];

  const getDataTypeColor = (dataType: string) => {
    switch (dataType) {
      case 'personal': return Colors.secondary.error;
      case 'usage': return Colors.secondary.warning;
      case 'device': return Colors.secondary.info;
      case 'optional': return Colors.secondary.success;
      default: return Colors.primary.blue;
    }
  };

  const getDataTypeLabel = (dataType: string) => {
    switch (dataType) {
      case 'personal': return 'PERSONAL';
      case 'usage': return 'USAGE';
      case 'device': return 'DEVICE';
      case 'optional': return 'OPTIONAL';
      default: return 'DATA';
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

  const openFullPrivacyPolicy = () => {
    openWebsite(PRIVACY_URL, 'Privacy Policy');
  };

  const openSection = (section: PrivacySection) => {
    const sectionUrl = `${PRIVACY_URL}#${section.id}`;
    openWebsite(sectionUrl, section.title);
  };

  const togglePrivacyControl = (controlId: string) => {
    setPrivacyControls(prev => 
      prev.map(control => 
        control.id === controlId && !control.isRequired
          ? { ...control, isEnabled: !control.isEnabled }
          : control
      )
    );
  };

  const downloadPrivacyPolicy = () => {
    const downloadUrl = `${PRIVACY_URL}/download`;
    openWebsite(downloadUrl, 'Download Privacy Policy');
  };

  const requestDataExport = () => {
    Alert.alert(
      'Data Export Request',
      'We will prepare your data export and send it to your registered email address within 30 days.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Request Export', onPress: () => {
          Alert.alert('Request Submitted', 'Your data export request has been submitted.');
        }}
      ]
    );
  };

  const requestDataDeletion = () => {
    Alert.alert(
      'Delete Account Data',
      'This will permanently delete your account and all associated data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert('Deletion Requested', 'Your account deletion request has been submitted.');
        }}
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Privacy Policy"
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
          
          {/* Privacy Header */}
          <Card 
            variant="gradient" 
            gradientColors={[Colors.secondary.success, Colors.secondary.success + 'CC']}
            style={{ 
              backgroundColor: Colors.secondary.success,
              shadowColor: Colors.secondary.success,
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
              <Ionicons name="shield-checkmark" size={30} color={Colors.neutral.white} />
            </View>
            
            <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              Privacy Policy
            </Typography>
            
            <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9, marginBottom: Spacing.md }}>
              Your privacy and data protection rights
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

          {/* Data Usage Overview */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.info + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="pie-chart" size={20} color={Colors.secondary.info} />
              </View>
              <Typography variant="h3" weight="semibold">
                Data Usage Overview
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Personal Data</Typography>
                <Typography variant="bodyMedium" weight="semibold" style={{ color: Colors.secondary.error }}>
                  Required for account
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Usage Analytics</Typography>
                <Typography variant="bodyMedium" weight="semibold" style={{ color: Colors.secondary.warning }}>
                  App improvement
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Device Information</Typography>
                <Typography variant="bodyMedium" weight="semibold" style={{ color: Colors.secondary.info }}>
                  Security & support
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Marketing Data</Typography>
                <Typography variant="bodyMedium" weight="semibold" style={{ color: Colors.secondary.success }}>
                  Optional
                </Typography>
              </View>
            </View>
          </Card>

          {/* Quick Privacy Controls */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Quick Privacy Controls
            </Typography>
            
            <View style={{ gap: Spacing.md }}>
              {privacyControls.map((control) => (
                <Card key={control.id} variant="default">
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: control.isEnabled ? Colors.secondary.success + '20' : Colors.neutral[300] + '20',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: Spacing.md,
                    }}>
                      <Ionicons 
                        name={control.icon as any} 
                        size={20} 
                        color={control.isEnabled ? Colors.secondary.success : Colors.neutral[500]} 
                      />
                    </View>
                    
                    <View style={{ flex: 1 }}>
                      <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                        {control.title}
                      </Typography>
                      <Typography variant="bodySmall" color="secondary">
                        {control.description}
                      </Typography>
                      {control.isRequired && (
                        <Typography variant="bodySmall" style={{ color: Colors.secondary.warning, marginTop: Spacing.xs }}>
                          Required for app functionality
                        </Typography>
                      )}
                    </View>
                    
                    <TouchableOpacity
                      onPress={() => togglePrivacyControl(control.id)}
                      disabled={control.isRequired}
                      style={{
                        width: 50,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: control.isEnabled ? Colors.secondary.success : Colors.neutral[300],
                        justifyContent: 'center',
                        paddingHorizontal: 2,
                        opacity: control.isRequired ? 0.5 : 1,
                      }}
                    >
                      <View style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: Colors.neutral.white,
                        alignSelf: control.isEnabled ? 'flex-end' : 'flex-start',
                      }} />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          </View>

          {/* Privacy Summary */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Privacy Summary
            </Typography>
            
            <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
              Here's an overview of how we handle your data. Click any section to read the full details.
            </Typography>
            
            <View style={{ gap: Spacing.sm }}>
              {privacySections.map((section) => (
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
                        backgroundColor: getDataTypeColor(section.dataType) + '20',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: Spacing.md,
                      }}>
                        <Ionicons name={section.icon as any} size={20} color={getDataTypeColor(section.dataType)} />
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
                          <Typography variant="bodyMedium" weight="semibold" style={{ flex: 1 }}>
                            {section.title}
                          </Typography>
                          <View style={{
                            backgroundColor: getDataTypeColor(section.dataType) + '20',
                            paddingHorizontal: Spacing.sm,
                            paddingVertical: 2,
                            borderRadius: BorderRadius.sm,
                          }}>
                            <Typography variant="bodySmall" style={{ color: getDataTypeColor(section.dataType) }} weight="medium">
                              {getDataTypeLabel(section.dataType)}
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

          {/* Full Privacy Policy */}
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
                Complete Privacy Policy
              </Typography>
              
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.lg }}>
                Read the full privacy policy with detailed information about data handling
              </Typography>
              
              <Button
                title="Read Full Privacy Policy"
                onPress={openFullPrivacyPolicy}
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
                onPress={downloadPrivacyPolicy}
                variant="secondary"
                icon={<Ionicons name="download-outline" size={20} color={Colors.primary.blue} />}
              />
            </View>
          </Card>

          {/* Data Rights */}
          <View style={{ gap: Spacing.md }}>
            <Typography variant="h3" weight="semibold">
              Your Data Rights
            </Typography>
            
            <Button
              title="Request Data Export"
              onPress={requestDataExport}
              variant="secondary"
              icon={<Ionicons name="download-outline" size={20} color={Colors.primary.blue} />}
            />
            
            <Button
              title="Delete My Data"
              onPress={requestDataDeletion}
              variant="secondary"
              icon={<Ionicons name="trash-outline" size={20} color={Colors.secondary.error} />}
              style={{
                borderColor: Colors.secondary.error,
                backgroundColor: Colors.secondary.error + '10',
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
