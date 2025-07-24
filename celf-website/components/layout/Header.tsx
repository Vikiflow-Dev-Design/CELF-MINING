'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography } from '@/components/ui';
import { Colors, Layout, Spacing, Shadows } from '@/lib/constants/design-tokens';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'What is CELF', href: '/what-is-celf' },
    { label: 'About Us', href: '/about' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Download', href: '/download' },
    { label: 'Help', href: '/help' },
  ];

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: Layout.header.height,
    backgroundColor: Colors.background.primary,
    borderBottom: `1px solid ${Colors.border.secondary}`,
    boxShadow: Shadows.sm,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${Layout.screenMargin.mobile}`,
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: Layout.container['2xl'],
    margin: '0 auto',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: Spacing.sm,
    textDecoration: 'none',
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: Spacing['2xl'],
  };

  const navItemStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: Colors.text.secondary,
    fontWeight: '500',
    transition: 'color 0.2s ease-in-out',
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.background.primary,
    borderBottom: `1px solid ${Colors.border.secondary}`,
    boxShadow: Shadows.lg,
    padding: Spacing.lg,
    display: isMenuOpen ? 'block' : 'none',
  };

  const mobileNavStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.lg,
  };

  const authButtonsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: Spacing.md,
  };

  const hamburgerStyle: React.CSSProperties = {
    display: 'none',
    flexDirection: 'column',
    gap: '4px',
    cursor: 'pointer',
    padding: Spacing.sm,
  };

  const hamburgerLineStyle: React.CSSProperties = {
    width: '24px',
    height: '2px',
    backgroundColor: Colors.text.primary,
    transition: 'all 0.3s ease',
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <Link href="/" style={logoStyle}>
            <div
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: Colors.primary.blue,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" color="inverse" weight="bold">
                C
              </Typography>
            </div>
            <Typography variant="h5" weight="bold" color="primary">
              CELF
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ ...navStyle, display: 'none' }} className="md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={navItemStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = Colors.primary.blue;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = Colors.text.secondary;
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div style={{ ...authButtonsStyle, display: 'none' }} className="md:flex">
            <Link href="/login">
              <Button variant="ghost" size="md">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="md">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div
            style={{ ...hamburgerStyle, display: 'flex' }}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div style={hamburgerLineStyle} />
            <div style={hamburgerLineStyle} />
            <div style={hamburgerLineStyle} />
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={mobileMenuStyle}>
          <nav style={mobileNavStyle}>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={navItemStyle}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ borderTop: `1px solid ${Colors.border.secondary}`, paddingTop: Spacing.lg }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.md }}>
                <Link href="/login">
                  <Button variant="ghost" size="md" fullWidth>
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="md" fullWidth>
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div style={{ height: Layout.header.height }} />

      <style jsx>{`
        @media (min-width: 768px) {
          .md\\:flex {
            display: flex !important;
          }
          .md\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
