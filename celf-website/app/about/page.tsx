import React from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients } from '@/lib/constants/design-tokens';

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former blockchain researcher at MIT with 10+ years in cryptocurrency education.',
      image: '👩‍💼',
      expertise: ['Blockchain Technology', 'Educational Design', 'Financial Literacy']
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      bio: 'Senior software engineer with expertise in mobile development and cryptocurrency systems.',
      image: '👨‍💻',
      expertise: ['Mobile Development', 'Cryptocurrency', 'System Architecture']
    },
    {
      name: 'Dr. Amara Okafor',
      role: 'Head of Education',
      bio: 'Educational psychologist specializing in digital learning and financial literacy programs.',
      image: '👩‍🏫',
      expertise: ['Educational Psychology', 'Curriculum Design', 'Learning Analytics']
    },
    {
      name: 'James Thompson',
      role: 'Head of Community',
      bio: 'Community building expert with experience in global educational initiatives.',
      image: '👨‍🤝‍👨',
      expertise: ['Community Management', 'Global Outreach', 'Partnership Development']
    }
  ];

  const values = [
    {
      icon: '🎓',
      title: 'Education First',
      description: 'We believe education is the foundation of financial empowerment and should be accessible to everyone.'
    },
    {
      icon: '🤝',
      title: 'Inclusive Community',
      description: 'We foster a welcoming environment where learners from all backgrounds can thrive and grow together.'
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'We maintain open communication about our processes, tokenomics, and educational methodologies.'
    },
    {
      icon: '🌱',
      title: 'Sustainable Growth',
      description: 'We prioritize long-term educational impact over short-term gains, building lasting value for our community.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously explore new ways to make cryptocurrency education more engaging and effective.'
    },
    {
      icon: '🌍',
      title: 'Global Impact',
      description: 'We work towards creating positive change in financial literacy and education worldwide.'
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Foundation Established',
      description: 'CELF Foundation was founded with the mission to democratize cryptocurrency education.'
    },
    {
      year: '2023',
      title: 'Mobile App Launch',
      description: 'Released our first mobile application with basic educational mining features.'
    },
    {
      year: '2024',
      title: 'Community Growth',
      description: 'Reached 100,000+ active learners across 150+ countries worldwide.'
    },
    {
      year: '2025',
      title: 'Scholarship Program',
      description: 'Launched comprehensive scholarship program, awarding $2M+ in educational grants.'
    }
  ];

  const impactStats = [
    { value: '100K+', label: 'Active Learners', description: 'Students actively learning and mining' },
    { value: '150+', label: 'Countries', description: 'Global reach across continents' },
    { value: '$2M+', label: 'Scholarships', description: 'Educational grants awarded' },
    { value: '50M+', label: 'CELF Mined', description: 'Tokens earned through learning' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: Gradients.primary,
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
            About CELF Foundation
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
            We're on a mission to democratize cryptocurrency education and create a world where financial literacy is accessible to everyone.
          </Typography>

          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      {/* Mission and Vision */}
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: Spacing['3xl'],
            }}
          >
            <Card variant="elevated">
              <div style={{ textAlign: 'center' }}>
                <Typography variant="h2" style={{ marginBottom: Spacing.lg }}>
                  🎯
                </Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  weight="bold"
                  style={{ marginBottom: Spacing.lg }}
                >
                  Our Mission
                </Typography>
                <Typography variant="bodyLarge" color="secondary" style={{ lineHeight: 1.6 }}>
                  To democratize access to cryptocurrency education and financial literacy through innovative technology that makes learning rewarding, accessible, and engaging for everyone, regardless of their background or location.
                </Typography>
              </div>
            </Card>

            <Card variant="elevated">
              <div style={{ textAlign: 'center' }}>
                <Typography variant="h2" style={{ marginBottom: Spacing.lg }}>
                  🌟
                </Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  weight="bold"
                  style={{ marginBottom: Spacing.lg }}
                >
                  Our Vision
                </Typography>
                <Typography variant="bodyLarge" color="secondary" style={{ lineHeight: 1.6 }}>
                  A world where everyone has the knowledge, tools, and confidence to participate in the digital economy, creating opportunities for financial empowerment and economic inclusion globally.
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Company History */}
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
              Our Journey
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              From a simple idea to a global educational movement
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {milestones.map((milestone, index) => (
              <Card key={index} variant="outlined">
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {milestone.year}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {milestone.title}
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary">
                    {milestone.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
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
              Our Impact
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Measuring success through the growth and achievements of our learning community
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: Spacing['2xl'],
              textAlign: 'center',
            }}
          >
            {impactStats.map((stat, index) => (
              <div key={index}>
                <Typography
                  variant="displayMedium"
                  color="primary"
                  weight="bold"
                  style={{ marginBottom: Spacing.sm }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="h5"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.xs }}
                >
                  {stat.label}
                </Typography>
                <Typography variant="bodyMedium" color="secondary">
                  {stat.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Introduction */}
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
              Meet Our Team
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Passionate educators and technologists working together to revolutionize cryptocurrency education
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing['2xl'],
            }}
          >
            {teamMembers.map((member, index) => (
              <Card key={index} variant="elevated" hover>
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="displaySmall"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    {member.image}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.xs }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{ marginBottom: Spacing.lg, lineHeight: 1.5 }}
                  >
                    {member.bio}
                  </Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: Spacing.xs, justifyContent: 'center' }}>
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        style={{
                          backgroundColor: Colors.primary.blue + '10',
                          color: Colors.primary.blue,
                          padding: `${Spacing.xs} ${Spacing.sm}`,
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values and Principles */}
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
              Our Values
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              The principles that guide everything we do at CELF Foundation
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {values.map((value, index) => (
              <Card key={index} variant="outlined" hover>
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="h1"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    {value.icon}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                    {value.description}
                  </Typography>
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
            Join Our Mission
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
            Be part of the movement to democratize cryptocurrency education and create opportunities for financial empowerment worldwide.
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
                Start Learning Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="xl">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
