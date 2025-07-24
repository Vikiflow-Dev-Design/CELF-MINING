'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing } from '@/lib/constants/design-tokens';

export default function EmailVerificationPage() {
  const [email, setEmail] = useState('user@example.com'); // This would come from signup
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    // Start cooldown timer if needed
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendVerification = async () => {
    setIsResending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setVerificationSent(true);
      setResendCooldown(60); // 60 second cooldown
      
      // Hide success message after 5 seconds
      setTimeout(() => setVerificationSent(false), 5000);
    } catch (error) {
      console.error('Resend verification error:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleContactSupport = () => {
    window.location.href = '/support';
  };

  const handleChangeEmail = () => {
    window.location.href = '/signup';
  };

  const verificationSteps = [
    {
      step: '1',
      title: 'Check Your Email',
      description: 'Look for an email from CELF in your inbox',
      icon: '📧'
    },
    {
      step: '2',
      title: 'Click the Link',
      description: 'Click the verification link in the email',
      icon: '🔗'
    },
    {
      step: '3',
      title: 'Complete Setup',
      description: 'Finish setting up your CELF account',
      icon: '✅'
    }
  ];

  const troubleshootingTips = [
    {
      icon: '📁',
      title: 'Check Spam Folder',
      description: 'The verification email might be in your spam or junk folder'
    },
    {
      icon: '⏰',
      title: 'Wait a Few Minutes',
      description: 'Email delivery can take up to 10 minutes'
    },
    {
      icon: '🔄',
      title: 'Resend Email',
      description: 'Click the resend button if you haven\'t received the email'
    },
    {
      icon: '✉️',
      title: 'Check Email Address',
      description: 'Make sure you entered the correct email address'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: Colors.background.secondary,
      padding: `${Spacing['2xl']} ${Layout.screenMargin.mobile}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: Spacing['2xl'] }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: Colors.secondary.info + '20',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: `0 auto ${Spacing.lg}`,
            fontSize: '2rem'
          }}>
            📧
          </div>
          
          <Typography variant="h1" color="primary" weight="bold" style={{ marginBottom: Spacing.sm }}>
            Verify Your Email
          </Typography>
          <Typography variant="bodyLarge" color="secondary" style={{ marginBottom: Spacing.md }}>
            We've sent a verification link to:
          </Typography>
          <Typography variant="h5" color="primary" weight="semibold">
            {email}
          </Typography>
        </div>

        <Card variant="elevated" padding="xl">
          {/* Success Message */}
          {verificationSent && (
            <div style={{
              backgroundColor: Colors.secondary.success + '10',
              border: `1px solid ${Colors.secondary.success}40`,
              borderRadius: '8px',
              padding: Spacing.lg,
              marginBottom: Spacing.lg,
              display: 'flex',
              alignItems: 'center',
              gap: Spacing.sm
            }}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <Typography variant="bodyMedium" color="success" weight="semibold">
                Verification email sent successfully!
              </Typography>
            </div>
          )}

          {/* Verification Instructions */}
          <div style={{ marginBottom: Spacing.xl }}>
            <Typography variant="h4" color="primary" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Verification Steps
            </Typography>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.lg }}>
              {verificationSteps.map((step, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: Spacing.md }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: Colors.primary.blue,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Typography variant="bodyMedium" color="inverse" weight="bold">
                      {step.step}
                    </Typography>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Typography variant="h6" color="primary" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                      {step.title}
                    </Typography>
                    <Typography variant="bodyMedium" color="secondary">
                      {step.description}
                    </Typography>
                  </div>
                  <div style={{ fontSize: '1.5rem' }}>
                    {step.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.md, marginBottom: Spacing.xl }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleResendVerification}
              loading={isResending}
              disabled={isResending || resendCooldown > 0}
            >
              {isResending 
                ? 'Sending...' 
                : resendCooldown > 0 
                  ? `Resend in ${resendCooldown}s` 
                  : 'Resend Verification Email'
              }
            </Button>
            
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={handleChangeEmail}
            >
              Change Email Address
            </Button>
          </div>

          {/* Troubleshooting */}
          <div style={{ marginBottom: Spacing.lg }}>
            <Typography variant="h5" color="primary" weight="semibold" style={{ marginBottom: Spacing.md }}>
              Not receiving the email?
            </Typography>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: Spacing.md }}>
              {troubleshootingTips.map((tip, index) => (
                <div key={index} style={{
                  backgroundColor: Colors.background.secondary,
                  borderRadius: '8px',
                  padding: Spacing.md,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: Spacing.sm
                }}>
                  <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>
                    {tip.icon}
                  </div>
                  <div>
                    <Typography variant="bodySmall" color="primary" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                      {tip.title}
                    </Typography>
                    <Typography variant="caption" color="secondary">
                      {tip.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Contact */}
          <div style={{
            backgroundColor: Colors.background.secondary,
            borderRadius: '8px',
            padding: Spacing.lg,
            textAlign: 'center'
          }}>
            <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.sm }}>
              Still having trouble?
            </Typography>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleContactSupport}
            >
              Contact Support
            </Button>
          </div>
        </Card>

        {/* Back to Login */}
        <div style={{ textAlign: 'center', marginTop: Spacing.lg }}>
          <Typography variant="bodyMedium" color="secondary">
            Already verified?{' '}
            <Link href="/login" style={{ color: Colors.primary.blue, fontWeight: '600' }}>
              Sign In
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
