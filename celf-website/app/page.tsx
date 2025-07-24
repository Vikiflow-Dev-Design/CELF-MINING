'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients, BorderRadius } from '@/lib/constants/design-tokens';

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1500));

    alert('Thank you for subscribing to our newsletter! You\'ll receive updates about CELF developments, educational content, and community news.');
    setNewsletterEmail('');
    setIsSubscribing(false);
  };

  const features = [
    {
      icon: '🎓',
      title: 'Educational Mining',
      description: 'Learn about cryptocurrency while earning CELF tokens through our educational mining platform.',
    },
    {
      icon: '💰',
      title: 'Scholarship Program',
      description: 'Access scholarships and educational opportunities funded by the CELF community.',
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Join a worldwide community of learners passionate about financial literacy and blockchain technology.',
    },
    {
      icon: '📱',
      title: 'Mobile App',
      description: 'Mine CELF tokens on the go with our user-friendly mobile application.',
    },
  ];

  const statistics = [
    { value: '100K+', label: 'Active Miners' },
    { value: '50M+', label: 'CELF Tokens Mined' },
    { value: '150+', label: 'Countries' },
    { value: '$2M+', label: 'Scholarships Awarded' },
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
            Empowering Education Through Cryptocurrency
          </Typography>
          
          <Typography
            variant="h4"
            color="inverse"
            weight="regular"
            style={{ 
              marginBottom: Spacing['4xl'],
              opacity: 0.9,
              maxWidth: '600px',
              margin: `0 auto ${Spacing['4xl']} auto`,
            }}
          >
            Join the CELF community and start mining cryptocurrency while learning about blockchain technology and financial literacy.
          </Typography>

          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/download">
              <Button variant="secondary" size="xl">
                Download App
              </Button>
            </Link>
            <Link href="/what-is-celf">
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Dashboard */}
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
            {statistics.map((stat, index) => (
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

      {/* Features Section */}
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
              Why Choose CELF?
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Discover the benefits of joining our educational cryptocurrency mining platform
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing['2xl'],
            }}
          >
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" hover>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '3rem',
                      marginBottom: Spacing.lg,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="bodyLarge" color="secondary">
                    {feature.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
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
            Start Mining Today
          </Typography>
          
          <Typography
            variant="h5"
            color="secondary"
            style={{ 
              marginBottom: Spacing['4xl'],
              maxWidth: '500px',
              margin: `0 auto ${Spacing['4xl']} auto`,
            }}
          >
            Download the CELF mobile app and begin your journey into cryptocurrency education and mining.
          </Typography>

          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: Spacing['4xl'],
            }}
          >
            <Link href="/download">
              <Button variant="primary" size="xl">
                📱 Download for iOS
              </Button>
            </Link>
            <Link href="/download">
              <Button variant="primary" size="xl">
                🤖 Download for Android
              </Button>
            </Link>
          </div>

          <Typography variant="bodyMedium" color="tertiary">
            Available on iOS and Android • Free to download • Start mining immediately
          </Typography>
        </div>
      </section>

      {/* Newsletter Signup Section */}
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
          <Card variant="elevated">
            <div style={{ textAlign: 'center' }}>
              <Typography
                variant="h1"
                color="primary"
                weight="bold"
                style={{ marginBottom: Spacing.lg }}
              >
                📧 Stay Updated with CELF
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
                Get the latest updates on cryptocurrency education, platform developments, scholarship opportunities, and community news delivered to your inbox.
              </Typography>

              <form onSubmit={handleNewsletterSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: Spacing.md,
                    marginBottom: Spacing.lg,
                    flexDirection: 'row',
                    alignItems: 'stretch'
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: `${Spacing.md} ${Spacing.lg}`,
                      border: `2px solid ${Colors.border.primary}`,
                      borderRadius: BorderRadius.md,
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease-in-out',
                    }}
                    onFocus={(e) => e.target.style.borderColor = Colors.primary.blue}
                    onBlur={(e) => e.target.style.borderColor = Colors.border.primary}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubscribing}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
              </form>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: Spacing.lg,
                  marginTop: Spacing['2xl'],
                }}
              >
                <div>
                  <Typography variant="h6" color="primary" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                    📚 Educational Content
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    Weekly cryptocurrency tutorials and guides
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="primary" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                    🚀 Platform Updates
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    New features and app improvements
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="primary" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                    🎓 Scholarship News
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    New opportunities and success stories
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="primary" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                    👥 Community Highlights
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    Member achievements and events
                  </Typography>
                </div>
              </div>

              <Typography variant="bodySmall" color="tertiary" style={{ marginTop: Spacing.lg }}>
                We respect your privacy. Unsubscribe at any time. • No spam, just valuable content • Sent weekly
              </Typography>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
