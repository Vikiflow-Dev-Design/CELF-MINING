'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients, BorderRadius } from '@/lib/constants/design-tokens';

export default function AppUpdatePage() {
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulate update progress
  useEffect(() => {
    if (isUpdating) {
      const interval = setInterval(() => {
        setUpdateProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUpdating(false);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isUpdating]);

  const currentVersion = '2.4.1';
  const newVersion = '2.5.0';
  const releaseDate = 'March 15, 2024';

  const newFeatures = [
    {
      icon: '🚀',
      title: 'Enhanced Mining Algorithm',
      description: 'Improved educational mining efficiency with 25% faster token earning rates'
    },
    {
      icon: '🎓',
      title: 'Advanced Learning Modules',
      description: 'New DeFi and NFT educational content with interactive quizzes and simulations'
    },
    {
      icon: '💰',
      title: 'Wallet Improvements',
      description: 'Enhanced security features and support for additional cryptocurrency networks'
    },
    {
      icon: '👥',
      title: 'Community Features',
      description: 'New social features including study groups, leaderboards, and peer challenges'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Comprehensive learning analytics and progress tracking with detailed insights'
    },
    {
      icon: '🔒',
      title: 'Security Enhancements',
      description: 'Advanced biometric authentication and improved data encryption protocols'
    }
  ];

  const improvements = [
    'Fixed mining session interruption issues',
    'Improved app startup time by 40%',
    'Enhanced notification system reliability',
    'Better offline mode functionality',
    'Optimized battery usage during mining',
    'Improved accessibility features',
    'Bug fixes for iOS 17 compatibility',
    'Enhanced dark mode experience'
  ];

  const systemRequirements = {
    ios: {
      minimum: 'iOS 14.0 or later',
      recommended: 'iOS 16.0 or later',
      storage: '200 MB available space',
      devices: 'iPhone 8 and newer, iPad (6th generation) and newer'
    },
    android: {
      minimum: 'Android 8.0 (API level 26)',
      recommended: 'Android 12.0 or later',
      storage: '250 MB available space',
      devices: 'Most Android devices with 3GB+ RAM'
    }
  };

  const handleUpdateNow = () => {
    setIsUpdating(true);
    setUpdateProgress(0);
  };

  const handleDownloadUpdate = (platform: string) => {
    // In a real implementation, this would redirect to the appropriate app store
    const urls = {
      ios: 'https://apps.apple.com/app/celf',
      android: 'https://play.google.com/store/apps/details?id=com.celf.app'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, ${Colors.primary.blue} 0%, ${Colors.primary.dark} 50%, ${Colors.secondary.info} 100%)`,
          padding: `${Spacing['8xl']} ${Layout.screenMargin.mobile} ${Spacing['6xl']}`,
          textAlign: 'center',
          color: Colors.text.inverse,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: Layout.container.lg,
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* App Icon */}
          <div
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: BorderRadius.xl,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: `0 auto ${Spacing['2xl']}`,
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="displayLarge"
              style={{ fontSize: '4rem', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}
            >
              🚀
            </Typography>
          </div>

          <Typography
            variant="displayLarge"
            color="inverse"
            weight="bold"
            style={{
              marginBottom: Spacing.lg,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            CELF Update Available
          </Typography>

          <Typography
            variant="h4"
            color="inverse"
            weight="regular"
            style={{
              marginBottom: Spacing['2xl'],
              opacity: 0.95,
              maxWidth: '700px',
              margin: `0 auto ${Spacing['2xl']} auto`,
              lineHeight: 1.5,
            }}
          >
            Experience the next level of cryptocurrency education with enhanced features, improved performance, and exciting new capabilities.
          </Typography>

          {/* Version Info Card */}
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              padding: `${Spacing.lg} ${Spacing['2xl']}`,
              borderRadius: BorderRadius.xl,
              marginBottom: Spacing['3xl'],
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.lg, marginBottom: Spacing.md }}>
              <div style={{ textAlign: 'center' }}>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
                  Current Version
                </Typography>
                <Typography variant="h5" color="inverse" weight="bold">
                  v{currentVersion}
                </Typography>
              </div>

              <Typography variant="h3" color="inverse" style={{ opacity: 0.6 }}>
                →
              </Typography>

              <div style={{ textAlign: 'center' }}>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
                  New Version
                </Typography>
                <Typography variant="h5" color="inverse" weight="bold">
                  v{newVersion}
                </Typography>
              </div>
            </div>

            <Typography variant="bodyMedium" color="inverse" style={{ opacity: 0.9 }}>
              Released {releaseDate}
            </Typography>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: isUpdating ? Spacing['2xl'] : 0,
            }}
          >
            <Button
              variant="secondary"
              size="xl"
              onClick={handleUpdateNow}
              loading={isUpdating}
              style={{
                minWidth: '200px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              {isUpdating ? `Updating... ${Math.round(updateProgress)}%` : '⚡ Update Now'}
            </Button>
            <Button
              variant="outline"
              size="xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: Colors.text.inverse,
              }}
            >
              📋 View Release Notes
            </Button>
          </div>

          {/* Progress Bar */}
          {isUpdating && (
            <div
              style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: `${Spacing.lg} ${Spacing.xl}`,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: BorderRadius.xl,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography
                variant="h6"
                color="inverse"
                weight="semibold"
                style={{ marginBottom: Spacing.md, textAlign: 'center' }}
              >
                Installing Update
              </Typography>

              <div
                style={{
                  width: '100%',
                  height: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: BorderRadius.md,
                  overflow: 'hidden',
                  marginBottom: Spacing.md,
                }}
              >
                <div
                  style={{
                    width: `${updateProgress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${Colors.secondary.success} 0%, ${Colors.primary.light} 100%)`,
                    borderRadius: BorderRadius.md,
                    transition: 'width 0.3s ease-in-out',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </div>

              <Typography variant="bodyMedium" color="inverse" style={{ opacity: 0.9, textAlign: 'center' }}>
                {Math.round(updateProgress)}% Complete • Downloading and installing...
              </Typography>
            </div>
          )}
        </div>
      </section>

      {/* New Features */}
      <section
        style={{
          padding: `${Spacing['8xl']} ${Layout.screenMargin.mobile}`,
          backgroundColor: Colors.background.primary,
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.xl,
            margin: '0 auto',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: Spacing['5xl'] }}>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: Colors.primary.blue + '15',
                color: Colors.primary.blue,
                padding: `${Spacing.sm} ${Spacing.lg}`,
                borderRadius: BorderRadius.full,
                fontSize: '0.875rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: Spacing.lg,
              }}
            >
              ✨ New in v{newVersion}
            </div>

            <Typography
              variant="displayMedium"
              color="primary"
              weight="bold"
              style={{ marginBottom: Spacing.lg }}
            >
              Powerful New Features
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Experience enhanced learning with cutting-edge features designed to accelerate your cryptocurrency education journey
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: Spacing['2xl'],
            }}
          >
            {newFeatures.map((feature, index) => (
              <Card
                key={index}
                variant="elevated"
                hover
                style={{
                  background: `linear-gradient(135deg, ${Colors.background.primary} 0%, ${Colors.background.secondary} 100%)`,
                  border: `1px solid ${Colors.border.light}`,
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <div style={{ padding: Spacing.lg }}>
                  {/* Feature Icon */}
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: Colors.primary.blue + '15',
                      borderRadius: BorderRadius.xl,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: Spacing.xl,
                      border: `2px solid ${Colors.primary.blue}20`,
                    }}
                  >
                    <Typography
                      variant="displaySmall"
                      style={{ fontSize: '2.5rem' }}
                    >
                      {feature.icon}
                    </Typography>
                  </div>

                  <Typography
                    variant="h3"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="bodyLarge"
                    color="secondary"
                    style={{
                      lineHeight: 1.6,
                      marginBottom: Spacing.lg,
                    }}
                  >
                    {feature.description}
                  </Typography>

                  {/* Feature Badge */}
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: Colors.secondary.success + '20',
                      color: Colors.secondary.success,
                      padding: `${Spacing.xs} ${Spacing.md}`,
                      borderRadius: BorderRadius.full,
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    New Feature
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Improvements and Bug Fixes */}
      <section
        style={{
          padding: `${Spacing['8xl']} ${Layout.screenMargin.mobile}`,
          backgroundColor: Colors.background.secondary,
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.lg,
            margin: '0 auto',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: Spacing['5xl'] }}>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: Colors.secondary.success + '15',
                color: Colors.secondary.success,
                padding: `${Spacing.sm} ${Spacing.lg}`,
                borderRadius: BorderRadius.full,
                fontSize: '0.875rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: Spacing.lg,
              }}
            >
              🔧 Enhanced & Fixed
            </div>

            <Typography
              variant="displayMedium"
              color="primary"
              weight="bold"
              style={{ marginBottom: Spacing.lg }}
            >
              Performance Improvements
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              We've fine-tuned every aspect of the app to deliver a faster, more reliable, and smoother experience
            </Typography>
          </div>

          <Card
            variant="elevated"
            style={{
              background: `linear-gradient(135deg, ${Colors.background.primary} 0%, ${Colors.background.tertiary} 100%)`,
              border: `1px solid ${Colors.border.light}`,
              padding: Spacing['2xl'],
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: Spacing['2xl'],
              }}
            >
              {improvements.map((improvement, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: Spacing.lg,
                    backgroundColor: Colors.background.primary,
                    borderRadius: BorderRadius.lg,
                    border: `1px solid ${Colors.border.light}`,
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: Colors.secondary.success + '20',
                      borderRadius: BorderRadius.md,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: Spacing.md,
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      variant="bodyMedium"
                      style={{
                        color: Colors.secondary.success,
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                      }}
                    >
                      ✓
                    </Typography>
                  </div>
                  <Typography
                    variant="bodyLarge"
                    color="secondary"
                    style={{
                      lineHeight: 1.5,
                      fontWeight: '500',
                    }}
                  >
                    {improvement}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Performance Stats */}
            <div
              style={{
                marginTop: Spacing['3xl'],
                padding: Spacing['2xl'],
                backgroundColor: Colors.primary.blue + '10',
                borderRadius: BorderRadius.xl,
                border: `1px solid ${Colors.primary.blue}20`,
              }}
            >
              <Typography
                variant="h4"
                color="primary"
                weight="bold"
                style={{ marginBottom: Spacing.lg, textAlign: 'center' }}
              >
                📊 Performance Boost
              </Typography>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: Spacing.lg,
                  textAlign: 'center',
                }}
              >
                <div>
                  <Typography variant="h2" color="primary" weight="bold">
                    40%
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary">
                    Faster Startup
                  </Typography>
                </div>
                <div>
                  <Typography variant="h2" color="primary" weight="bold">
                    25%
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary">
                    Better Battery Life
                  </Typography>
                </div>
                <div>
                  <Typography variant="h2" color="primary" weight="bold">
                    99.9%
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary">
                    Crash-Free Sessions
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Download Options */}
      <section
        style={{
          padding: `${Spacing['8xl']} ${Layout.screenMargin.mobile}`,
          background: `linear-gradient(135deg, ${Colors.background.primary} 0%, ${Colors.primary.blue}05 100%)`,
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.lg,
            margin: '0 auto',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: Spacing['5xl'] }}>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: Colors.primary.blue + '15',
                color: Colors.primary.blue,
                padding: `${Spacing.sm} ${Spacing.lg}`,
                borderRadius: BorderRadius.full,
                fontSize: '0.875rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: Spacing.lg,
              }}
            >
              📱 Ready to Update
            </div>

            <Typography
              variant="displayMedium"
              color="primary"
              weight="bold"
              style={{ marginBottom: Spacing.lg }}
            >
              Download the Update
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Get the latest version of CELF with all the new features and improvements from your device's app store
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: Spacing['3xl'],
            }}
          >
            {/* iOS Download */}
            <Card
              variant="elevated"
              style={{
                background: `linear-gradient(135deg, ${Colors.background.primary} 0%, ${Colors.neutral[50]} 100%)`,
                border: `2px solid ${Colors.border.light}`,
                transition: 'all 0.3s ease-in-out',
              }}
              hover
            >
              <div style={{ padding: Spacing.xl }}>
                {/* Platform Header */}
                <div style={{ textAlign: 'center', marginBottom: Spacing['2xl'] }}>
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: Colors.neutral[100],
                      borderRadius: BorderRadius.xl,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: `0 auto ${Spacing.lg}`,
                      border: `2px solid ${Colors.border.light}`,
                    }}
                  >
                    <Typography
                      variant="displaySmall"
                      style={{ fontSize: '3rem' }}
                    >
                      📱
                    </Typography>
                  </div>

                  <Typography
                    variant="h2"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    iOS Update
                  </Typography>

                  <Typography variant="bodyLarge" color="secondary">
                    Available on the App Store
                  </Typography>
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: Spacing['2xl'] }}>
                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    📋 System Requirements
                  </Typography>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.md }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: Spacing.md,
                        backgroundColor: Colors.background.secondary,
                        borderRadius: BorderRadius.md,
                      }}
                    >
                      <Typography variant="bodyMedium" weight="semibold" color="tertiary">
                        Minimum iOS:
                      </Typography>
                      <Typography variant="bodyMedium" color="primary" weight="semibold">
                        {systemRequirements.ios.minimum}
                      </Typography>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: Spacing.md,
                        backgroundColor: Colors.background.secondary,
                        borderRadius: BorderRadius.md,
                      }}
                    >
                      <Typography variant="bodyMedium" weight="semibold" color="tertiary">
                        Storage:
                      </Typography>
                      <Typography variant="bodyMedium" color="primary" weight="semibold">
                        {systemRequirements.ios.storage}
                      </Typography>
                    </div>

                    <div
                      style={{
                        padding: Spacing.md,
                        backgroundColor: Colors.secondary.success + '10',
                        borderRadius: BorderRadius.md,
                        border: `1px solid ${Colors.secondary.success}30`,
                      }}
                    >
                      <Typography variant="bodySmall" color="secondary" style={{ lineHeight: 1.5 }}>
                        <strong>Compatible:</strong> {systemRequirements.ios.devices}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  variant="primary"
                  size="xl"
                  fullWidth
                  onClick={() => handleDownloadUpdate('ios')}
                  style={{
                    background: `linear-gradient(135deg, ${Colors.primary.blue} 0%, ${Colors.primary.dark} 100%)`,
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                    border: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm }}>
                    <Typography variant="h6" style={{ fontSize: '1.2rem' }}>📱</Typography>
                    <Typography variant="h6" weight="bold">
                      Update on App Store
                    </Typography>
                  </div>
                </Button>
              </div>
            </Card>

            {/* Android Download */}
            <Card
              variant="elevated"
              style={{
                background: `linear-gradient(135deg, ${Colors.background.primary} 0%, ${Colors.secondary.success}05 100%)`,
                border: `2px solid ${Colors.border.light}`,
                transition: 'all 0.3s ease-in-out',
              }}
              hover
            >
              <div style={{ padding: Spacing.xl }}>
                {/* Platform Header */}
                <div style={{ textAlign: 'center', marginBottom: Spacing['2xl'] }}>
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: Colors.secondary.success + '15',
                      borderRadius: BorderRadius.xl,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: `0 auto ${Spacing.lg}`,
                      border: `2px solid ${Colors.secondary.success}30`,
                    }}
                  >
                    <Typography
                      variant="displaySmall"
                      style={{ fontSize: '3rem' }}
                    >
                      🤖
                    </Typography>
                  </div>

                  <Typography
                    variant="h2"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    Android Update
                  </Typography>

                  <Typography variant="bodyLarge" color="secondary">
                    Available on Google Play Store
                  </Typography>
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: Spacing['2xl'] }}>
                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    📋 System Requirements
                  </Typography>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.md }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: Spacing.md,
                        backgroundColor: Colors.background.secondary,
                        borderRadius: BorderRadius.md,
                      }}
                    >
                      <Typography variant="bodyMedium" weight="semibold" color="tertiary">
                        Minimum Android:
                      </Typography>
                      <Typography variant="bodyMedium" color="primary" weight="semibold">
                        {systemRequirements.android.minimum}
                      </Typography>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: Spacing.md,
                        backgroundColor: Colors.background.secondary,
                        borderRadius: BorderRadius.md,
                      }}
                    >
                      <Typography variant="bodyMedium" weight="semibold" color="tertiary">
                        Storage:
                      </Typography>
                      <Typography variant="bodyMedium" color="primary" weight="semibold">
                        {systemRequirements.android.storage}
                      </Typography>
                    </div>

                    <div
                      style={{
                        padding: Spacing.md,
                        backgroundColor: Colors.secondary.success + '10',
                        borderRadius: BorderRadius.md,
                        border: `1px solid ${Colors.secondary.success}30`,
                      }}
                    >
                      <Typography variant="bodySmall" color="secondary" style={{ lineHeight: 1.5 }}>
                        <strong>Compatible:</strong> {systemRequirements.android.devices}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  variant="primary"
                  size="xl"
                  fullWidth
                  onClick={() => handleDownloadUpdate('android')}
                  style={{
                    background: `linear-gradient(135deg, ${Colors.secondary.success} 0%, #059669 100%)`,
                    boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)',
                    border: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm }}>
                    <Typography variant="h6" style={{ fontSize: '1.2rem' }}>🤖</Typography>
                    <Typography variant="h6" weight="bold">
                      Update on Google Play
                    </Typography>
                  </div>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Update Instructions */}
      <section
        style={{
          padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile}`,
          backgroundColor: Colors.background.secondary,
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.lg,
            margin: '0 auto',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: Spacing['4xl'] }}>
            <Typography
              variant="h1"
              color="primary"
              weight="bold"
              style={{ marginBottom: Spacing.lg }}
            >
              📋 Update Instructions
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Follow these simple steps to update your CELF app
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            <Card variant="outlined">
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: Colors.primary.blue,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: `0 auto ${Spacing.md}`,
                    fontSize: '1.5rem'
                  }}
                >
                  1️⃣
                </div>
                <Typography
                  variant="h5"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.md }}
                >
                  Open App Store
                </Typography>
                <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                  Open the App Store (iOS) or Google Play Store (Android) on your device
                </Typography>
              </div>
            </Card>

            <Card variant="outlined">
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: Colors.primary.blue,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: `0 auto ${Spacing.md}`,
                    fontSize: '1.5rem'
                  }}
                >
                  2️⃣
                </div>
                <Typography
                  variant="h5"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.md }}
                >
                  Find CELF App
                </Typography>
                <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                  Search for "CELF" or find it in your "Updates" section
                </Typography>
              </div>
            </Card>

            <Card variant="outlined">
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: Colors.primary.blue,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: `0 auto ${Spacing.md}`,
                    fontSize: '1.5rem'
                  }}
                >
                  3️⃣
                </div>
                <Typography
                  variant="h5"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.md }}
                >
                  Tap Update
                </Typography>
                <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                  Tap the "Update" button and wait for the download to complete
                </Typography>
              </div>
            </Card>

            <Card variant="outlined">
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: Colors.primary.blue,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: `0 auto ${Spacing.md}`,
                    fontSize: '1.5rem'
                  }}
                >
                  4️⃣
                </div>
                <Typography
                  variant="h5"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.md }}
                >
                  Enjoy New Features
                </Typography>
                <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                  Open the updated app and explore all the new features and improvements
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          padding: `${Spacing['8xl']} ${Layout.screenMargin.mobile}`,
          background: `linear-gradient(135deg, ${Colors.primary.blue} 0%, ${Colors.primary.dark} 50%, ${Colors.secondary.info} 100%)`,
          textAlign: 'center',
          color: Colors.text.inverse,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: Layout.container.lg,
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: BorderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: `0 auto ${Spacing.xl}`,
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Typography
              variant="displaySmall"
              style={{ fontSize: '2.5rem' }}
            >
              🚀
            </Typography>
          </div>

          <Typography
            variant="displayLarge"
            color="inverse"
            weight="bold"
            style={{
              marginBottom: Spacing.lg,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Ready to Experience the New CELF?
          </Typography>

          <Typography
            variant="h4"
            color="inverse"
            weight="regular"
            style={{
              marginBottom: Spacing['3xl'],
              opacity: 0.95,
              maxWidth: '700px',
              margin: `0 auto ${Spacing['3xl']} auto`,
              lineHeight: 1.6,
            }}
          >
            Update now to unlock enhanced mining capabilities, cutting-edge educational content, and enterprise-grade security features.
          </Typography>

          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: Spacing['2xl'],
            }}
          >
            <Button
              variant="secondary"
              size="xl"
              onClick={() => handleDownloadUpdate('ios')}
              style={{
                minWidth: '200px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.sm }}>
                <Typography variant="h6">📱</Typography>
                <Typography variant="h6" weight="bold">Update on iOS</Typography>
              </div>
            </Button>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => handleDownloadUpdate('android')}
              style={{
                minWidth: '200px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.sm }}>
                <Typography variant="h6">🤖</Typography>
                <Typography variant="h6" weight="bold">Update on Android</Typography>
              </div>
            </Button>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              padding: `${Spacing.lg} ${Spacing.xl}`,
              borderRadius: BorderRadius.xl,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-block',
            }}
          >
            <Typography variant="bodyLarge" color="inverse" style={{ opacity: 0.9 }}>
              Need help with the update?
              <Link href="/help" style={{ color: Colors.text.inverse, textDecoration: 'underline', marginLeft: Spacing.xs }}>
                Visit our Help Center
              </Link> or
              <Link href="/contact" style={{ color: Colors.text.inverse, textDecoration: 'underline', marginLeft: Spacing.xs }}>
                contact support
              </Link> for assistance.
            </Typography>
          </div>
        </div>
      </section>
    </div>
  );
}
