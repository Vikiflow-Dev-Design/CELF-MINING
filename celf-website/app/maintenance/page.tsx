'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients, BorderRadius } from '@/lib/constants/design-tokens';

export default function MaintenancePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState('');

  // Maintenance schedule
  const maintenanceStart = new Date('2024-03-20T02:00:00Z');
  const maintenanceEnd = new Date('2024-03-20T06:00:00Z');
  const estimatedDuration = '4 hours';

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate time remaining
  useEffect(() => {
    const now = currentTime.getTime();
    const end = maintenanceEnd.getTime();
    const remaining = end - now;

    if (remaining > 0) {
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setTimeRemaining('Maintenance completed');
    }
  }, [currentTime, maintenanceEnd]);

  const maintenanceActivities = [
    {
      icon: '🔧',
      title: 'Server Infrastructure Upgrade',
      description: 'Upgrading our servers to improve performance and reliability',
      status: 'in-progress',
      estimatedTime: '2 hours'
    },
    {
      icon: '🔒',
      title: 'Security Enhancements',
      description: 'Implementing additional security measures and protocols',
      status: 'pending',
      estimatedTime: '1 hour'
    },
    {
      icon: '📊',
      title: 'Database Optimization',
      description: 'Optimizing database performance for faster app responses',
      status: 'pending',
      estimatedTime: '1 hour'
    },
    {
      icon: '🚀',
      title: 'Feature Deployment',
      description: 'Deploying new features and improvements to the platform',
      status: 'pending',
      estimatedTime: '30 minutes'
    }
  ];

  const affectedServices = [
    {
      service: 'CELF Mobile App',
      status: 'offline',
      description: 'Temporarily unavailable during maintenance'
    },
    {
      service: 'Educational Mining',
      status: 'offline',
      description: 'Mining sessions will resume after maintenance'
    },
    {
      service: 'Wallet Services',
      status: 'limited',
      description: 'View-only mode, transactions temporarily disabled'
    },
    {
      service: 'Community Features',
      status: 'offline',
      description: 'Chat and social features temporarily unavailable'
    },
    {
      service: 'CELF Website',
      status: 'online',
      description: 'Website remains accessible with limited functionality'
    },
    {
      service: 'Customer Support',
      status: 'online',
      description: 'Support team available via email and chat'
    }
  ];

  const alternativeActivities = [
    {
      icon: '📚',
      title: 'Read Educational Content',
      description: 'Explore our comprehensive cryptocurrency guides and tutorials',
      link: '/education'
    },
    {
      icon: '🎓',
      title: 'Apply for Scholarships',
      description: 'Check out available scholarship opportunities',
      link: '/scholarship'
    },
    {
      icon: '👥',
      title: 'Join Our Community',
      description: 'Connect with other learners on our social platforms',
      link: '/socials'
    },
    {
      icon: '📧',
      title: 'Subscribe to Newsletter',
      description: 'Stay updated with the latest CELF news and developments',
      link: '#newsletter'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return Colors.secondary.success;
      case 'offline': return Colors.secondary.error;
      case 'limited': return Colors.secondary.warning;
      case 'in-progress': return Colors.primary.blue;
      case 'pending': return Colors.neutral[400];
      default: return Colors.neutral[400];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '✅';
      case 'offline': return '🔴';
      case 'limited': return '🟡';
      case 'in-progress': return '🔄';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: Gradients.sunset,
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
            variant="displaySmall"
            style={{ marginBottom: Spacing.lg, fontSize: '4rem' }}
          >
            🔧
          </Typography>
          
          <Typography
            variant="displayMedium"
            color="inverse"
            weight="bold"
            style={{ marginBottom: Spacing.lg }}
          >
            Scheduled Maintenance
          </Typography>
          
          <Typography
            variant="h4"
            color="inverse"
            weight="regular"
            style={{ 
              marginBottom: Spacing['2xl'],
              opacity: 0.9,
              maxWidth: '600px',
              margin: `0 auto ${Spacing['2xl']} auto`,
            }}
          >
            We're currently performing scheduled maintenance to improve your CELF experience. Thank you for your patience!
          </Typography>

          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: `${Spacing.lg} ${Spacing.xl}`,
              borderRadius: BorderRadius.lg,
              marginBottom: Spacing['2xl'],
            }}
          >
            <Typography variant="h3" color="inverse" weight="bold" style={{ marginBottom: Spacing.sm }}>
              {timeRemaining}
            </Typography>
            <Typography variant="h6" color="inverse" style={{ opacity: 0.8 }}>
              Estimated time remaining
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: Spacing.lg,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <div>
              <Typography variant="bodyMedium" color="inverse" weight="semibold">
                Started:
              </Typography>
              <Typography variant="bodyMedium" color="inverse" style={{ opacity: 0.8 }}>
                {maintenanceStart.toLocaleString()}
              </Typography>
            </div>
            <div>
              <Typography variant="bodyMedium" color="inverse" weight="semibold">
                Expected End:
              </Typography>
              <Typography variant="bodyMedium" color="inverse" style={{ opacity: 0.8 }}>
                {maintenanceEnd.toLocaleString()}
              </Typography>
            </div>
            <div>
              <Typography variant="bodyMedium" color="inverse" weight="semibold">
                Duration:
              </Typography>
              <Typography variant="bodyMedium" color="inverse" style={{ opacity: 0.8 }}>
                {estimatedDuration}
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Activities */}
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
              🔄 Maintenance Activities
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Here's what we're working on to improve your CELF experience
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {maintenanceActivities.map((activity, index) => (
              <Card key={index} variant="outlined">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: Spacing.md }}>
                    <Typography
                      variant="h2"
                      style={{ marginRight: Spacing.md }}
                    >
                      {activity.icon}
                    </Typography>
                    <div style={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        color="primary"
                        weight="semibold"
                        style={{ marginBottom: Spacing.xs }}
                      >
                        {activity.title}
                      </Typography>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="bodySmall"
                          style={{ 
                            marginRight: Spacing.sm,
                            color: getStatusColor(activity.status)
                          }}
                        >
                          {getStatusIcon(activity.status)}
                        </Typography>
                        <Typography
                          variant="bodySmall"
                          style={{ 
                            color: getStatusColor(activity.status),
                            fontWeight: '600',
                            textTransform: 'capitalize'
                          }}
                        >
                          {activity.status.replace('-', ' ')}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  
                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{ marginBottom: Spacing.md, lineHeight: 1.6 }}
                  >
                    {activity.description}
                  </Typography>
                  
                  <div
                    style={{
                      backgroundColor: Colors.background.secondary,
                      padding: Spacing.sm,
                      borderRadius: BorderRadius.sm,
                    }}
                  >
                    <Typography variant="bodySmall" color="tertiary">
                      Estimated time: {activity.estimatedTime}
                    </Typography>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Status */}
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
              📊 Service Status
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Current status of CELF services during maintenance
            </Typography>
          </div>

          <Card variant="elevated">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: Spacing.lg,
              }}
            >
              {affectedServices.map((service, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: Spacing.md,
                    borderRadius: BorderRadius.md,
                    backgroundColor: service.status === 'online'
                      ? Colors.secondary.success + '10'
                      : service.status === 'offline'
                      ? Colors.secondary.error + '10'
                      : Colors.secondary.warning + '10'
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{ marginRight: Spacing.md }}
                  >
                    {getStatusIcon(service.status)}
                  </Typography>
                  <div style={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.xs }}
                    >
                      {service.service}
                    </Typography>
                    <Typography
                      variant="bodySmall"
                      style={{
                        color: getStatusColor(service.status),
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        marginBottom: Spacing.xs
                      }}
                    >
                      {service.status}
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      {service.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Alternative Activities */}
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
              💡 What You Can Do Meanwhile
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              While we're working on improvements, here are some things you can explore
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {alternativeActivities.map((activity, index) => (
              <Link key={index} href={activity.link} style={{ textDecoration: 'none' }}>
                <Card variant="outlined" hover>
                  <div style={{ textAlign: 'center' }}>
                    <Typography
                      variant="displaySmall"
                      style={{ marginBottom: Spacing.lg }}
                    >
                      {activity.icon}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.md }}
                    >
                      {activity.title}
                    </Typography>
                    <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                      {activity.description}
                    </Typography>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Updates */}
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
              📢 Live Updates
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Follow our progress with real-time maintenance updates
            </Typography>
          </div>

          <Card variant="elevated">
            <div>
              <Typography
                variant="h4"
                color="primary"
                weight="semibold"
                style={{ marginBottom: Spacing.lg }}
              >
                🕐 Maintenance Timeline
              </Typography>

              <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.lg }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: Spacing.md,
                    backgroundColor: Colors.secondary.success + '10',
                    borderRadius: BorderRadius.md,
                    borderLeft: `4px solid ${Colors.secondary.success}`
                  }}
                >
                  <Typography variant="bodySmall" style={{ marginRight: Spacing.md, color: Colors.secondary.success }}>
                    ✅
                  </Typography>
                  <div>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      02:00 UTC - Maintenance Started
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      All systems taken offline for scheduled maintenance
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: Spacing.md,
                    backgroundColor: Colors.primary.blue + '10',
                    borderRadius: BorderRadius.md,
                    borderLeft: `4px solid ${Colors.primary.blue}`
                  }}
                >
                  <Typography variant="bodySmall" style={{ marginRight: Spacing.md, color: Colors.primary.blue }}>
                    🔄
                  </Typography>
                  <div>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      03:30 UTC - Server Upgrade in Progress
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      Infrastructure improvements proceeding as scheduled
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: Spacing.md,
                    backgroundColor: Colors.neutral[100],
                    borderRadius: BorderRadius.md,
                    borderLeft: `4px solid ${Colors.neutral[400]}`
                  }}
                >
                  <Typography variant="bodySmall" style={{ marginRight: Spacing.md, color: Colors.neutral[400] }}>
                    ⏳
                  </Typography>
                  <div>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      05:00 UTC - Security Updates (Upcoming)
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      Implementation of enhanced security measures
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: Spacing.md,
                    backgroundColor: Colors.neutral[100],
                    borderRadius: BorderRadius.md,
                    borderLeft: `4px solid ${Colors.neutral[400]}`
                  }}
                >
                  <Typography variant="bodySmall" style={{ marginRight: Spacing.md, color: Colors.neutral[400] }}>
                    ⏳
                  </Typography>
                  <div>
                    <Typography variant="bodyMedium" weight="semibold" color="primary">
                      06:00 UTC - Services Restoration (Expected)
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      All services expected to be fully operational
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact and Support */}
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
            Need Help or Have Questions?
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
            Our support team is available to assist you during the maintenance period.
          </Typography>

          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: Spacing.xl,
            }}
          >
            <Link href="/contact">
              <Button variant="primary" size="xl">
                💬 Contact Support
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="secondary" size="xl">
                📚 Help Center
              </Button>
            </Link>
            <Link href="/status">
              <Button variant="outline" size="xl">
                📊 System Status
              </Button>
            </Link>
          </div>

          <Typography variant="bodyMedium" color="tertiary">
            Follow us on social media for real-time updates:
            <Link href="/socials" style={{ color: Colors.primary.blue, marginLeft: Spacing.xs }}>
              @CELF_Official
            </Link>
          </Typography>
        </div>
      </section>
    </div>
  );
}
