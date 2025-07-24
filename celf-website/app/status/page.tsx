'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients, BorderRadius } from '@/lib/constants/design-tokens';

export default function SystemStatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const overallStatus = 'operational'; // operational, degraded, outage

  const services = [
    {
      name: 'CELF Mobile App',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '245ms',
      description: 'Mobile application and core features',
      lastIncident: null
    },
    {
      name: 'Educational Mining',
      status: 'operational',
      uptime: '99.8%',
      responseTime: '180ms',
      description: 'Mining sessions and token earning',
      lastIncident: null
    },
    {
      name: 'Wallet Services',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '320ms',
      description: 'Token storage and transactions',
      lastIncident: null
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.7%',
      responseTime: '150ms',
      description: 'User login and security',
      lastIncident: null
    },
    {
      name: 'API Services',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: '850ms',
      description: 'Backend API and data services',
      lastIncident: '2 hours ago'
    },
    {
      name: 'Push Notifications',
      status: 'operational',
      uptime: '99.6%',
      responseTime: '95ms',
      description: 'Mobile and web notifications',
      lastIncident: null
    },
    {
      name: 'Community Features',
      status: 'operational',
      uptime: '99.4%',
      responseTime: '280ms',
      description: 'Social features and messaging',
      lastIncident: null
    },
    {
      name: 'Website',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '120ms',
      description: 'CELF website and documentation',
      lastIncident: null
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      title: 'API Response Time Degradation',
      status: 'investigating',
      severity: 'minor',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      description: 'We are investigating reports of slower API response times affecting some users.',
      updates: [
        {
          time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          message: 'We have identified the cause and are implementing a fix.',
          status: 'update'
        },
        {
          time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          message: 'We are investigating reports of API performance issues.',
          status: 'investigating'
        }
      ]
    },
    {
      id: 2,
      title: 'Scheduled Maintenance - Database Optimization',
      status: 'completed',
      severity: 'maintenance',
      startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      endTime: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
      description: 'Scheduled maintenance to optimize database performance.',
      updates: [
        {
          time: new Date(Date.now() - 20 * 60 * 60 * 1000),
          message: 'Maintenance completed successfully. All services restored.',
          status: 'resolved'
        },
        {
          time: new Date(Date.now() - 24 * 60 * 60 * 1000),
          message: 'Maintenance started as scheduled.',
          status: 'maintenance'
        }
      ]
    }
  ];

  const uptimeData = [
    { date: '2024-03-13', uptime: 100 },
    { date: '2024-03-14', uptime: 99.8 },
    { date: '2024-03-15', uptime: 99.9 },
    { date: '2024-03-16', uptime: 98.5 },
    { date: '2024-03-17', uptime: 99.7 },
    { date: '2024-03-18', uptime: 99.9 },
    { date: '2024-03-19', uptime: 100 },
    { date: '2024-03-20', uptime: 99.2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return Colors.secondary.success;
      case 'degraded': return Colors.secondary.warning;
      case 'outage': return Colors.secondary.error;
      case 'maintenance': return Colors.primary.blue;
      default: return Colors.neutral[400];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return '✅';
      case 'degraded': return '🟡';
      case 'outage': return '🔴';
      case 'maintenance': return '🔧';
      default: return '❓';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return Colors.secondary.error;
      case 'major': return Colors.secondary.warning;
      case 'minor': return Colors.secondary.info;
      case 'maintenance': return Colors.primary.blue;
      default: return Colors.neutral[400];
    }
  };

  const getOverallStatusMessage = () => {
    switch (overallStatus) {
      case 'operational':
        return 'All systems are operational';
      case 'degraded':
        return 'Some systems are experiencing issues';
      case 'outage':
        return 'We are experiencing service disruptions';
      default:
        return 'Status unknown';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: overallStatus === 'operational' 
            ? Gradients.success 
            : overallStatus === 'degraded' 
            ? Gradients.warning 
            : Gradients.error,
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
            {getStatusIcon(overallStatus)}
          </Typography>
          
          <Typography
            variant="displayMedium"
            color="inverse"
            weight="bold"
            style={{ marginBottom: Spacing.lg }}
          >
            CELF System Status
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
            {getOverallStatusMessage()}
          </Typography>

          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: `${Spacing.md} ${Spacing.lg}`,
              borderRadius: BorderRadius.lg,
              marginBottom: Spacing.lg,
            }}
          >
            <Typography variant="bodyMedium" color="inverse" weight="semibold">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Typography>
          </div>

          <div
            style={{
              display: 'flex',
              gap: Spacing.md,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button 
              variant={autoRefresh ? 'secondary' : 'outline'} 
              size="md"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? '⏸️ Pause' : '▶️ Resume'} Auto-refresh
            </Button>
            <Button 
              variant="outline" 
              size="md"
              onClick={() => setLastUpdated(new Date())}
            >
              🔄 Refresh Now
            </Button>
          </div>
        </div>
      </section>

      {/* Service Status Grid */}
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
              🔍 Service Status
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Real-time status of all CELF services and components
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.lg,
            }}
          >
            {services.map((service, index) => (
              <Card key={index} variant="outlined">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: Spacing.md }}>
                    <Typography
                      variant="h4"
                      style={{ marginRight: Spacing.md }}
                    >
                      {getStatusIcon(service.status)}
                    </Typography>
                    <div style={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        color="primary"
                        weight="semibold"
                        style={{ marginBottom: Spacing.xs }}
                      >
                        {service.name}
                      </Typography>
                      <Typography
                        variant="bodySmall"
                        style={{ 
                          color: getStatusColor(service.status),
                          fontWeight: '600',
                          textTransform: 'capitalize'
                        }}
                      >
                        {service.status}
                      </Typography>
                    </div>
                  </div>
                  
                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    {service.description}
                  </Typography>
                  
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: Spacing.md,
                      marginBottom: Spacing.md,
                    }}
                  >
                    <div>
                      <Typography variant="bodySmall" color="tertiary" weight="semibold">
                        Uptime (30d)
                      </Typography>
                      <Typography variant="bodyMedium" color="primary" weight="semibold">
                        {service.uptime}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="bodySmall" color="tertiary" weight="semibold">
                        Response Time
                      </Typography>
                      <Typography variant="bodyMedium" color="primary" weight="semibold">
                        {service.responseTime}
                      </Typography>
                    </div>
                  </div>
                  
                  {service.lastIncident && (
                    <div
                      style={{
                        backgroundColor: Colors.secondary.warning + '10',
                        padding: Spacing.sm,
                        borderRadius: BorderRadius.sm,
                      }}
                    >
                      <Typography variant="bodySmall" color="secondary">
                        Last incident: {service.lastIncident}
                      </Typography>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
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
              📋 Recent Incidents
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Latest incidents and maintenance activities
            </Typography>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.xl }}>
            {recentIncidents.map((incident) => (
              <Card key={incident.id} variant="elevated">
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: Spacing.lg }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: Spacing.sm }}>
                        <Typography
                          variant="h4"
                          color="primary"
                          weight="semibold"
                          style={{ marginRight: Spacing.md }}
                        >
                          {incident.title}
                        </Typography>
                        <div
                          style={{
                            backgroundColor: getSeverityColor(incident.severity) + '20',
                            color: getSeverityColor(incident.severity),
                            padding: `${Spacing.xs} ${Spacing.sm}`,
                            borderRadius: BorderRadius.sm,
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                          }}
                        >
                          {incident.severity}
                        </div>
                      </div>

                      <Typography
                        variant="bodyMedium"
                        color="secondary"
                        style={{ marginBottom: Spacing.md }}
                      >
                        {incident.description}
                      </Typography>

                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: Spacing.lg }}>
                        <Typography variant="bodySmall" color="tertiary" style={{ marginRight: Spacing.md }}>
                          Started: {incident.startTime.toLocaleString()}
                        </Typography>
                        {incident.endTime && (
                          <Typography variant="bodySmall" color="tertiary">
                            Ended: {incident.endTime.toLocaleString()}
                          </Typography>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor:
                          incident.status === 'resolved' ? Colors.secondary.success + '20' :
                          incident.status === 'investigating' ? Colors.secondary.warning + '20' :
                          Colors.primary.blue + '20',
                        color:
                          incident.status === 'resolved' ? Colors.secondary.success :
                          incident.status === 'investigating' ? Colors.secondary.warning :
                          Colors.primary.blue,
                        padding: `${Spacing.sm} ${Spacing.md}`,
                        borderRadius: BorderRadius.md,
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}
                    >
                      {incident.status}
                    </div>
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.md }}
                    >
                      Updates:
                    </Typography>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.md }}>
                      {incident.updates.map((update, updateIndex) => (
                        <div
                          key={updateIndex}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            padding: Spacing.md,
                            backgroundColor: Colors.background.tertiary,
                            borderRadius: BorderRadius.sm,
                            borderLeft: `3px solid ${
                              update.status === 'resolved' ? Colors.secondary.success :
                              update.status === 'investigating' ? Colors.secondary.warning :
                              Colors.primary.blue
                            }`
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <Typography
                              variant="bodyMedium"
                              color="secondary"
                              style={{ marginBottom: Spacing.xs }}
                            >
                              {update.message}
                            </Typography>
                            <Typography variant="bodySmall" color="tertiary">
                              {update.time.toLocaleString()}
                            </Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Uptime History */}
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
              📈 Uptime History
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              System uptime over the past 7 days
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
                Overall System Uptime
              </Typography>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                  gap: Spacing.sm,
                  marginBottom: Spacing.lg,
                }}
              >
                {uptimeData.map((day, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      padding: Spacing.md,
                      borderRadius: BorderRadius.md,
                      backgroundColor: day.uptime >= 99.5
                        ? Colors.secondary.success + '20'
                        : day.uptime >= 98
                        ? Colors.secondary.warning + '20'
                        : Colors.secondary.error + '20'
                    }}
                  >
                    <Typography
                      variant="h5"
                      weight="bold"
                      style={{
                        color: day.uptime >= 99.5
                          ? Colors.secondary.success
                          : day.uptime >= 98
                          ? Colors.secondary.warning
                          : Colors.secondary.error,
                        marginBottom: Spacing.xs
                      }}
                    >
                      {day.uptime}%
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Typography>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: Spacing.lg,
                  padding: Spacing.lg,
                  backgroundColor: Colors.background.secondary,
                  borderRadius: BorderRadius.md,
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" weight="bold">
                    99.6%
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    7-day average
                  </Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" weight="bold">
                    99.8%
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    30-day average
                  </Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" weight="bold">
                    99.9%
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    90-day average
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Subscribe to Updates */}
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
            📢 Stay Informed
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
            Get notified about system status updates, maintenance schedules, and incident reports.
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
            <Button variant="primary" size="xl">
              📧 Subscribe to Updates
            </Button>
            <Link href="/socials">
              <Button variant="secondary" size="xl">
                📱 Follow on Social Media
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline" size="xl">
                📚 Help Center
              </Button>
            </Link>
          </div>

          <Typography variant="bodyMedium" color="tertiary">
            For urgent issues, contact our support team:
            <Link href="/contact" style={{ color: Colors.primary.blue, marginLeft: Spacing.xs }}>
              support@celf.foundation
            </Link>
          </Typography>
        </div>
      </section>
    </div>
  );
}
