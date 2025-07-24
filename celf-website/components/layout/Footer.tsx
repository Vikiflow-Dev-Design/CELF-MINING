'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Typography, Button } from '@/components/ui';
import { Colors, Layout, Spacing, BorderRadius } from '@/lib/constants/design-tokens';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1500));

    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
    setIsSubscribing(false);
  };

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
    product: [
      { label: 'What is CELF', href: '/what-is-celf' },
      { label: 'Download App', href: '/download' },
      { label: 'Features', href: '/features' },
      { label: 'Scholarship Program', href: '/scholarship' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Support', href: '/support' },
      { label: 'Community', href: '/community' },
      { label: 'Documentation', href: '/docs' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Compliance', href: '/compliance' },
    ],
  };

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com/celf.official', icon: '📘' },
    { label: 'Twitter', href: 'https://twitter.com/celf_official', icon: '🐦' },
    { label: 'Instagram', href: 'https://instagram.com/celf_official', icon: '📷' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/celf', icon: '💼' },
    { label: 'YouTube', href: 'https://youtube.com/@celf_official', icon: '📺' },
    { label: 'TikTok', href: 'https://tiktok.com/@celf_official', icon: '🎵' },
  ];

  const footerStyle: React.CSSProperties = {
    backgroundColor: Colors.background.dark,
    color: Colors.text.inverse,
    padding: `${Spacing['6xl']} ${Layout.screenMargin.mobile} ${Spacing['2xl']}`,
    marginTop: 'auto',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: Layout.container['2xl'],
    margin: '0 auto',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: Spacing['4xl'],
    marginBottom: Spacing['4xl'],
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.lg,
  };

  const linkStyle: React.CSSProperties = {
    color: Colors.neutral[300],
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
  };

  const socialGridStyle: React.CSSProperties = {
    display: 'flex',
    gap: Spacing.lg,
    flexWrap: 'wrap',
    marginTop: Spacing.lg,
  };

  const socialLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: Spacing.sm,
    color: Colors.neutral[300],
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
  };

  const bottomSectionStyle: React.CSSProperties = {
    borderTop: `1px solid ${Colors.neutral[700]}`,
    paddingTop: Spacing['2xl'],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.lg,
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: Spacing.sm,
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Main Footer Content */}
        <div style={gridStyle}>
          {/* Company Info */}
          <div style={columnStyle}>
            <div style={logoStyle}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: Colors.primary.blue,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" color="inverse" weight="bold">
                  C
                </Typography>
              </div>
              <Typography variant="h4" weight="bold" color="inverse">
                CELF
              </Typography>
            </div>
            <Typography variant="bodyMedium" color="muted">
              Empowering education through cryptocurrency mining. Join the CELF community and start your journey towards financial literacy and digital currency education.
            </Typography>
            
            {/* Social Links */}
            <div>
              <Typography variant="h6" color="inverse" weight="semibold" style={{ marginBottom: Spacing.md }}>
                Follow Us
              </Typography>
              <div style={socialGridStyle}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={socialLinkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = Colors.primary.light;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = Colors.neutral[300];
                    }}
                  >
                    <span>{social.icon}</span>
                    <Typography variant="bodySmall">
                      {social.label}
                    </Typography>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div style={columnStyle}>
            <Typography variant="h6" color="inverse" weight="semibold">
              Company
            </Typography>
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = Colors.primary.light;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = Colors.neutral[300];
                }}
              >
                <Typography variant="bodyMedium">
                  {link.label}
                </Typography>
              </Link>
            ))}
          </div>

          {/* Product Links */}
          <div style={columnStyle}>
            <Typography variant="h6" color="inverse" weight="semibold">
              Product
            </Typography>
            {footerLinks.product.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = Colors.primary.light;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = Colors.neutral[300];
                }}
              >
                <Typography variant="bodyMedium">
                  {link.label}
                </Typography>
              </Link>
            ))}
          </div>

          {/* Support Links */}
          <div style={columnStyle}>
            <Typography variant="h6" color="inverse" weight="semibold">
              Support
            </Typography>
            {footerLinks.support.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = Colors.primary.light;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = Colors.neutral[300];
                }}
              >
                <Typography variant="bodyMedium">
                  {link.label}
                </Typography>
              </Link>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div style={columnStyle}>
            <Typography variant="h6" color="inverse" weight="semibold">
              📧 Stay Updated
            </Typography>
            <Typography variant="bodySmall" color="muted" style={{ marginBottom: Spacing.md }}>
              Get the latest updates on CELF developments, educational content, and community news.
            </Typography>

            <form onSubmit={handleNewsletterSubmit}>
              <div style={{ marginBottom: Spacing.md }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: `${Spacing.sm} ${Spacing.md}`,
                    border: `1px solid ${Colors.neutral[600]}`,
                    borderRadius: BorderRadius.md,
                    backgroundColor: Colors.neutral[800],
                    color: Colors.text.inverse,
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease-in-out',
                  }}
                  onFocus={(e) => e.target.style.borderColor = Colors.primary.blue}
                  onBlur={(e) => e.target.style.borderColor = Colors.neutral[600]}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={isSubscribing}
                fullWidth
                style={{ fontSize: '0.875rem' }}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>

            <Typography variant="bodySmall" color="muted" style={{ marginTop: Spacing.sm, fontSize: '0.75rem' }}>
              Weekly updates • No spam • Unsubscribe anytime
            </Typography>
          </div>

          {/* Legal Links */}
          <div style={columnStyle}>
            <Typography variant="h6" color="inverse" weight="semibold">
              Legal
            </Typography>
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = Colors.primary.light;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = Colors.neutral[300];
                }}
              >
                <Typography variant="bodyMedium">
                  {link.label}
                </Typography>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div style={bottomSectionStyle}>
          <Typography variant="bodySmall" color="muted">
            © 2025 CELF Foundation. All rights reserved.
          </Typography>
          <Typography variant="bodySmall" color="muted">
            Made with ❤️ for education and financial literacy
          </Typography>
        </div>
      </div>
    </footer>
  );
};
