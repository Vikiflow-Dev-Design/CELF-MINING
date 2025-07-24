import React from 'react';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients, BorderRadius } from '@/lib/constants/design-tokens';

export default function DownloadAppPage() {
  const appFeatures = [
    {
      icon: '🎓',
      title: 'Educational Mining',
      description: 'Learn cryptocurrency concepts while earning CELF tokens through our gamified mining system.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your learning progress, mining statistics, and token earnings in real-time.'
    },
    {
      icon: '🏆',
      title: 'Achievements System',
      description: 'Unlock badges and achievements as you complete educational milestones and challenges.'
    },
    {
      icon: '👥',
      title: 'Community Features',
      description: 'Connect with fellow learners, share progress, and participate in community challenges.'
    },
    {
      icon: '💰',
      title: 'Wallet Integration',
      description: 'Secure built-in wallet to store, send, and receive your earned CELF tokens.'
    },
    {
      icon: '📚',
      title: 'Learning Resources',
      description: 'Access comprehensive guides, tutorials, and educational content about cryptocurrency.'
    }
  ];

  const systemRequirements = {
    ios: {
      version: 'iOS 13.0 or later',
      storage: '150 MB available space',
      compatibility: 'iPhone, iPad, and iPod touch'
    },
    android: {
      version: 'Android 7.0 (API level 24) or later',
      storage: '200 MB available space',
      compatibility: 'Most Android devices'
    }
  };

  const downloadStats = [
    { value: '500K+', label: 'Downloads' },
    { value: '4.8★', label: 'App Store Rating' },
    { value: '4.7★', label: 'Google Play Rating' },
    { value: '100K+', label: 'Active Users' }
  ];

  const screenshots = [
    { title: 'Mining Dashboard', description: 'Track your mining progress and earnings' },
    { title: 'Learning Modules', description: 'Interactive cryptocurrency education' },
    { title: 'Achievements', description: 'Unlock rewards as you learn' },
    { title: 'Community', description: 'Connect with fellow learners' },
    { title: 'Wallet', description: 'Manage your CELF tokens securely' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: Gradients.hero,
          padding: `${Spacing['8xl']} ${Layout.screenMargin.mobile}`,
          textAlign: 'center',
          color: Colors.text.inverse,
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.lg,
            margin: '0 auto',
          }}
        >
          <Typography
            variant="displayLarge"
            color="inverse"
            weight="bold"
            style={{ marginBottom: Spacing.lg }}
          >
            Download CELF App
          </Typography>
          
          <Typography
            variant="h4"
            color="inverse"
            weight="regular"
            style={{ 
              marginBottom: Spacing['4xl'],
              opacity: 0.9,
              maxWidth: '700px',
              margin: `0 auto ${Spacing['4xl']} auto`,
            }}
          >
            Start your cryptocurrency education journey today. Mine CELF tokens while learning about blockchain technology and financial literacy.
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
            <a
              href="https://apps.apple.com/app/celf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="secondary" size="xl">
                <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.sm }}>
                  <Typography variant="h4">📱</Typography>
                  <div>
                    <Typography variant="bodySmall" style={{ opacity: 0.8 }}>
                      Download on the
                    </Typography>
                    <Typography variant="h6" weight="bold">
                      App Store
                    </Typography>
                  </div>
                </div>
              </Button>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.celf.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="secondary" size="xl">
                <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.sm }}>
                  <Typography variant="h4">🤖</Typography>
                  <div>
                    <Typography variant="bodySmall" style={{ opacity: 0.8 }}>
                      Get it on
                    </Typography>
                    <Typography variant="h6" weight="bold">
                      Google Play
                    </Typography>
                  </div>
                </div>
              </Button>
            </a>
          </div>

          <Typography variant="bodyMedium" style={{ opacity: 0.8 }}>
            Free to download • Available worldwide • Start mining immediately
          </Typography>
        </div>
      </section>

      {/* Download Statistics */}
      <section
        style={{
          padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile}`,
          backgroundColor: Colors.background.secondary,
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.xl,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: Spacing['2xl'],
              textAlign: 'center',
            }}
          >
            {downloadStats.map((stat, index) => (
              <div key={index}>
                <Typography
                  variant="displayMedium"
                  color="primary"
                  weight="bold"
                  style={{ marginBottom: Spacing.sm }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="h6" color="secondary">
                  {stat.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Features */}
      <section
        style={{
          padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile}`,
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.xl,
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
              Powerful Features
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Everything you need to start your cryptocurrency education journey
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {appFeatures.map((feature, index) => (
              <Card key={index} variant="elevated" hover>
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="displaySmall"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    {feature.icon}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section
        style={{
          padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile}`,
          backgroundColor: Colors.background.secondary,
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.xl,
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
              See It In Action
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Take a look at the CELF app interface and discover how easy it is to start learning
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: Spacing.lg,
            }}
          >
            {screenshots.map((screenshot, index) => (
              <Card key={index} variant="outlined">
                <div style={{ textAlign: 'center' }}>
                  {/* Placeholder for screenshot */}
                  <div
                    style={{
                      width: '100%',
                      height: '300px',
                      backgroundColor: Colors.neutral[100],
                      borderRadius: BorderRadius.md,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: Spacing.md,
                      border: `2px dashed ${Colors.border.primary}`
                    }}
                  >
                    <Typography variant="h2">📱</Typography>
                  </div>
                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.xs }}
                  >
                    {screenshot.title}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {screenshot.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section
        style={{
          padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile}`,
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
              System Requirements
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Make sure your device is compatible with the CELF app
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: Spacing['2xl'],
            }}
          >
            {/* iOS Requirements */}
            <Card variant="elevated">
              <div style={{ textAlign: 'center' }}>
                <Typography
                  variant="displaySmall"
                  style={{ marginBottom: Spacing.lg }}
                >
                  📱
                </Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  weight="bold"
                  style={{ marginBottom: Spacing.lg }}
                >
                  iOS Requirements
                </Typography>
                
                <div style={{ textAlign: 'left' }}>
                  <div style={{ marginBottom: Spacing.md }}>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      Version:
                    </Typography>
                    <Typography variant="bodyMedium" color="secondary">
                      {systemRequirements.ios.version}
                    </Typography>
                  </div>
                  
                  <div style={{ marginBottom: Spacing.md }}>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      Storage:
                    </Typography>
                    <Typography variant="bodyMedium" color="secondary">
                      {systemRequirements.ios.storage}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      Compatibility:
                    </Typography>
                    <Typography variant="bodyMedium" color="secondary">
                      {systemRequirements.ios.compatibility}
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>

            {/* Android Requirements */}
            <Card variant="elevated">
              <div style={{ textAlign: 'center' }}>
                <Typography
                  variant="displaySmall"
                  style={{ marginBottom: Spacing.lg }}
                >
                  🤖
                </Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  weight="bold"
                  style={{ marginBottom: Spacing.lg }}
                >
                  Android Requirements
                </Typography>
                
                <div style={{ textAlign: 'left' }}>
                  <div style={{ marginBottom: Spacing.md }}>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      Version:
                    </Typography>
                    <Typography variant="bodyMedium" color="secondary">
                      {systemRequirements.android.version}
                    </Typography>
                  </div>
                  
                  <div style={{ marginBottom: Spacing.md }}>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      Storage:
                    </Typography>
                    <Typography variant="bodyMedium" color="secondary">
                      {systemRequirements.android.storage}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      Compatibility:
                    </Typography>
                    <Typography variant="bodyMedium" color="secondary">
                      {systemRequirements.android.compatibility}
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile}`,
          backgroundColor: Colors.background.secondary,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: Layout.container.lg,
            margin: '0 auto',
          }}
        >
          <Typography
            variant="h1"
            color="primary"
            weight="bold"
            style={{ marginBottom: Spacing.lg }}
          >
            Ready to Start Learning?
          </Typography>
          
          <Typography
            variant="h5"
            color="secondary"
            style={{ 
              marginBottom: Spacing['2xl'],
              maxWidth: '600px',
              margin: `0 auto ${Spacing['2xl']} auto`,
            }}
          >
            Join thousands of learners worldwide who are already earning CELF tokens while mastering cryptocurrency concepts.
          </Typography>

          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://apps.apple.com/app/celf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="primary" size="xl">
                📱 Download for iOS
              </Button>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.celf.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="primary" size="xl">
                🤖 Download for Android
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
