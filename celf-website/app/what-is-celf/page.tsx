import React from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients } from '@/lib/constants/design-tokens';

export default function WhatIsCELFPage() {
  const tokenFeatures = [
    {
      icon: '🎓',
      title: 'Educational Foundation',
      description: 'CELF tokens are earned through educational activities, promoting financial literacy and blockchain understanding.',
    },
    {
      icon: '⛏️',
      title: 'Educational Mining',
      description: 'Mine CELF tokens by completing educational modules, quizzes, and participating in learning activities.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Growth',
      description: 'Token distribution is designed to reward learning and community participation over speculation.',
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Governance and development decisions are made by the community of learners and educators.',
    },
  ];

  const miningMechanism = [
    {
      step: '1',
      title: 'Learn',
      description: 'Complete educational modules about cryptocurrency, blockchain, and financial literacy.',
    },
    {
      step: '2',
      title: 'Participate',
      description: 'Engage with the community through discussions, quizzes, and collaborative learning.',
    },
    {
      step: '3',
      title: 'Earn',
      description: 'Receive CELF tokens as rewards for your educational achievements and contributions.',
    },
    {
      step: '4',
      title: 'Grow',
      description: 'Use earned tokens for scholarships, advanced courses, or community initiatives.',
    },
  ];

  const tokenomics = [
    { metric: 'Total Supply', value: '1,000,000,000 CELF', description: 'Fixed maximum supply' },
    { metric: 'Educational Mining', value: '60%', description: 'Rewards for learning activities' },
    { metric: 'Scholarship Fund', value: '20%', description: 'Educational scholarships and grants' },
    { metric: 'Development', value: '15%', description: 'Platform development and maintenance' },
    { metric: 'Community', value: '5%', description: 'Community initiatives and governance' },
  ];

  const roadmapMilestones = [
    {
      phase: 'Phase 1',
      title: 'Foundation Launch',
      status: 'completed',
      items: ['Mobile app release', 'Basic mining system', 'Community building']
    },
    {
      phase: 'Phase 2',
      title: 'Educational Expansion',
      status: 'current',
      items: ['Advanced courses', 'Mentorship program', 'Scholarship distribution']
    },
    {
      phase: 'Phase 3',
      title: 'Global Reach',
      status: 'upcoming',
      items: ['Multi-language support', 'Regional partnerships', 'University collaborations']
    },
    {
      phase: 'Phase 4',
      title: 'Ecosystem Growth',
      status: 'future',
      items: ['DeFi integration', 'NFT certificates', 'Governance implementation']
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: Gradients.ocean,
          padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile}`,
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
            variant="displayMedium"
            color="inverse"
            weight="bold"
            style={{ marginBottom: Spacing.lg }}
          >
            What is CELF?
          </Typography>
          
          <Typography
            variant="h4"
            color="inverse"
            weight="regular"
            style={{ 
              marginBottom: Spacing['2xl'],
              opacity: 0.9,
              maxWidth: '700px',
              margin: `0 auto ${Spacing['2xl']} auto`,
            }}
          >
            CELF (Cryptocurrency Education & Learning Foundation) is a revolutionary platform that combines cryptocurrency mining with educational content to promote financial literacy worldwide.
          </Typography>

          <Link href="/download">
            <Button variant="secondary" size="lg">
              Start Learning & Mining
            </Button>
          </Link>
        </div>
      </section>

      {/* Token Overview */}
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
              CELF Token Overview
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Understanding the educational cryptocurrency that rewards learning and promotes financial literacy
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing['2xl'],
            }}
          >
            {tokenFeatures.map((feature, index) => (
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

      {/* Educational Foundation Mission */}
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
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            color="primary"
            weight="bold"
            style={{ marginBottom: Spacing.lg }}
          >
            Our Educational Mission
          </Typography>
          
          <Typography
            variant="h5"
            color="secondary"
            style={{ 
              marginBottom: Spacing['2xl'],
              lineHeight: 1.6,
            }}
          >
            To democratize access to cryptocurrency education and financial literacy through innovative technology that makes learning rewarding and accessible to everyone, regardless of their background or location.
          </Typography>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: Spacing.xl,
              marginTop: Spacing['2xl'],
            }}
          >
            <div>
              <Typography variant="h2" color="primary" weight="bold">
                🎯
              </Typography>
              <Typography variant="h5" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                Accessibility
              </Typography>
              <Typography variant="bodyMedium" color="secondary">
                Making cryptocurrency education accessible to learners worldwide
              </Typography>
            </div>
            
            <div>
              <Typography variant="h2" color="primary" weight="bold">
                💡
              </Typography>
              <Typography variant="h5" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                Innovation
              </Typography>
              <Typography variant="bodyMedium" color="secondary">
                Pioneering new ways to combine learning with earning
              </Typography>
            </div>
            
            <div>
              <Typography variant="h2" color="primary" weight="bold">
                🌍
              </Typography>
              <Typography variant="h5" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                Impact
              </Typography>
              <Typography variant="bodyMedium" color="secondary">
                Creating positive change through education and financial inclusion
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Mining Mechanism */}
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
              How Educational Mining Works
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Earn CELF tokens through learning activities and community participation
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {miningMechanism.map((step, index) => (
              <Card key={index} variant="outlined">
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
                      margin: `0 auto ${Spacing.lg}`,
                    }}
                  >
                    <Typography variant="h3" color="inverse" weight="bold">
                      {step.step}
                    </Typography>
                  </div>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary">
                    {step.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Preview */}
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
              CELF Tokenomics
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Transparent and sustainable token distribution focused on education and community growth
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.lg,
            }}
          >
            {tokenomics.map((item, index) => (
              <Card key={index} variant="elevated">
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {item.metric}
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary">
                    {item.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
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
              CELF Roadmap
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Our journey to revolutionize cryptocurrency education and create a global learning community
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {roadmapMilestones.map((milestone, index) => (
              <Card
                key={index}
                variant={milestone.status === 'current' ? 'elevated' : 'default'}
                style={{
                  borderLeft: milestone.status === 'completed'
                    ? `4px solid ${Colors.secondary.success}`
                    : milestone.status === 'current'
                    ? `4px solid ${Colors.primary.blue}`
                    : `4px solid ${Colors.neutral[300]}`
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: Spacing.md
                  }}>
                    <Typography
                      variant="overline"
                      color={
                        milestone.status === 'completed' ? 'success' :
                        milestone.status === 'current' ? 'primary' : 'tertiary'
                      }
                      weight="bold"
                      style={{ marginRight: Spacing.sm }}
                    >
                      {milestone.phase}
                    </Typography>
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor:
                          milestone.status === 'completed' ? Colors.secondary.success :
                          milestone.status === 'current' ? Colors.primary.blue : Colors.neutral[300]
                      }}
                    />
                  </div>

                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {milestone.title}
                  </Typography>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.xs }}>
                    {milestone.items.map((item, itemIndex) => (
                      <div key={itemIndex} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="bodySmall" style={{ marginRight: Spacing.xs }}>
                          {milestone.status === 'completed' ? '✅' :
                           milestone.status === 'current' ? '🔄' : '⏳'}
                        </Typography>
                        <Typography variant="bodyMedium" color="secondary">
                          {item}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile}`,
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
              maxWidth: '500px',
              margin: `0 auto ${Spacing['2xl']} auto`,
            }}
          >
            Join thousands of learners worldwide who are earning CELF tokens while building their cryptocurrency knowledge.
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
              <Button variant="primary" size="xl">
                Download App
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="xl">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
