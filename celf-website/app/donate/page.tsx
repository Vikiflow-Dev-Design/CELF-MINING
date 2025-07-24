'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients, BorderRadius } from '@/lib/constants/design-tokens';

export default function DonateSponsorshipPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');

  const sponsorshipTiers = [
    {
      id: 'platinum',
      name: 'Platinum Partner',
      amount: '$50,000+',
      color: '#E5E7EB',
      benefits: [
        'Logo prominently featured on website and app',
        'Dedicated blog post and press release',
        'Speaking opportunity at CELF events',
        'Custom educational content collaboration',
        'Quarterly impact reports',
        'Direct access to CELF leadership team',
        'Co-branded scholarship program'
      ],
      impact: 'Funds 500+ scholarships and supports platform development for 1 year'
    },
    {
      id: 'gold',
      name: 'Gold Sponsor',
      amount: '$25,000+',
      color: '#FCD34D',
      benefits: [
        'Logo featured on website and app',
        'Social media recognition campaign',
        'Quarterly impact reports',
        'Access to community events',
        'Educational content collaboration',
        'Priority customer support'
      ],
      impact: 'Funds 250+ scholarships and supports educational content creation'
    },
    {
      id: 'silver',
      name: 'Silver Supporter',
      amount: '$10,000+',
      color: '#D1D5DB',
      benefits: [
        'Logo on website sponsors page',
        'Social media mentions',
        'Bi-annual impact reports',
        'Community event invitations',
        'Educational resource access'
      ],
      impact: 'Funds 100+ scholarships and supports community programs'
    },
    {
      id: 'bronze',
      name: 'Bronze Contributor',
      amount: '$5,000+',
      color: '#CD7C2F',
      benefits: [
        'Name listed on sponsors page',
        'Social media recognition',
        'Annual impact report',
        'Community newsletter inclusion'
      ],
      impact: 'Funds 50+ scholarships and supports educational initiatives'
    }
  ];

  const donationOptions = [
    { amount: '$25', description: 'Supports 1 student for a month' },
    { amount: '$100', description: 'Funds educational materials for 5 students' },
    { amount: '$250', description: 'Sponsors a complete learning module' },
    { amount: '$500', description: 'Funds a scholarship for 1 student' },
    { amount: '$1,000', description: 'Supports platform development' },
    { amount: 'Custom', description: 'Choose your own amount' }
  ];

  const impactMetrics = [
    { value: '$2.5M+', label: 'Total Raised', description: 'Funding educational initiatives worldwide' },
    { value: '1,200+', label: 'Scholarships Awarded', description: 'Students supported through donations' },
    { value: '50+', label: 'Corporate Partners', description: 'Organizations supporting our mission' },
    { value: '25+', label: 'Countries Impacted', description: 'Global reach of sponsored programs' }
  ];

  const currentSponsors = [
    { name: 'TechCorp Global', tier: 'Platinum', logo: '🏢', description: 'Leading technology solutions provider' },
    { name: 'EduFund Foundation', tier: 'Gold', logo: '🎓', description: 'Educational funding organization' },
    { name: 'CryptoVentures', tier: 'Gold', logo: '₿', description: 'Blockchain investment firm' },
    { name: 'Innovation Labs', tier: 'Silver', logo: '🔬', description: 'Research and development company' },
    { name: 'Future Finance', tier: 'Silver', logo: '💰', description: 'Financial technology startup' },
    { name: 'Global Learning', tier: 'Bronze', logo: '🌍', description: 'International education platform' }
  ];

  const whySponsorReasons = [
    {
      icon: '🎯',
      title: 'Targeted Impact',
      description: 'Your sponsorship directly funds educational opportunities for underserved communities worldwide.'
    },
    {
      icon: '🌱',
      title: 'Sustainable Growth',
      description: 'Support a platform that creates lasting change through education and financial literacy.'
    },
    {
      icon: '🤝',
      title: 'Brand Alignment',
      description: 'Associate your brand with innovation, education, and positive social impact.'
    },
    {
      icon: '📊',
      title: 'Measurable Results',
      description: 'Receive detailed reports showing exactly how your contribution makes a difference.'
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Extend your impact across 150+ countries and diverse communities.'
    },
    {
      icon: '🚀',
      title: 'Innovation Leadership',
      description: 'Be part of pioneering the future of cryptocurrency education and financial inclusion.'
    }
  ];

  const handleDonationSelect = (amount: string) => {
    if (amount === 'Custom') {
      setDonationAmount('');
    } else {
      setDonationAmount(amount.replace('$', ''));
    }
  };

  const handleSponsorshipInquiry = (tierId: string) => {
    setSelectedTier(tierId);
    // In a real implementation, this would open a contact form or redirect to a sponsorship inquiry page
    alert(`Thank you for your interest in our ${sponsorshipTiers.find(t => t.id === tierId)?.name} program! We'll be in touch soon.`);
  };

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
            Support CELF's Mission
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
            Partner with us to democratize cryptocurrency education and create opportunities for learners worldwide.
          </Typography>

          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button variant="secondary" size="xl">
              💝 Make a Donation
            </Button>
            <Button variant="outline" size="xl">
              🤝 Become a Sponsor
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
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
              Our Impact Together
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              See how your support translates into real educational opportunities
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: Spacing['2xl'],
            }}
          >
            {impactMetrics.map((metric, index) => (
              <Card key={index} variant="elevated">
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="displayMedium"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {metric.value}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {metric.label}
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary">
                    {metric.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sponsor CELF */}
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
              Why Sponsor CELF?
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Join forward-thinking organizations making a meaningful impact on global education
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {whySponsorReasons.map((reason, index) => (
              <Card key={index} variant="outlined" hover>
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="displaySmall"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    {reason.icon}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {reason.title}
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                    {reason.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
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
              Sponsorship Opportunities
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Choose a sponsorship level that aligns with your organization's goals and budget
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {sponsorshipTiers.map((tier, index) => (
              <Card
                key={tier.id}
                variant={tier.id === 'platinum' ? 'elevated' : 'outlined'}
                style={{
                  borderTop: `4px solid ${tier.color}`,
                  position: 'relative'
                }}
              >
                {tier.id === 'platinum' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: Colors.primary.blue,
                      color: Colors.text.inverse,
                      padding: `${Spacing.xs} ${Spacing.md}`,
                      borderRadius: BorderRadius.md,
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {tier.name}
                  </Typography>

                  <Typography
                    variant="displaySmall"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    {tier.amount}
                  </Typography>

                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{
                      marginBottom: Spacing.lg,
                      fontStyle: 'italic',
                      lineHeight: 1.5
                    }}
                  >
                    {tier.impact}
                  </Typography>

                  <div style={{ textAlign: 'left', marginBottom: Spacing.xl }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.md }}
                    >
                      Benefits Include:
                    </Typography>

                    {tier.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          marginBottom: Spacing.sm
                        }}
                      >
                        <Typography
                          variant="bodySmall"
                          style={{
                            marginRight: Spacing.sm,
                            color: Colors.secondary.success
                          }}
                        >
                          ✓
                        </Typography>
                        <Typography variant="bodySmall" color="secondary">
                          {benefit}
                        </Typography>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={tier.id === 'platinum' ? 'primary' : 'outline'}
                    size="lg"
                    fullWidth
                    onClick={() => handleSponsorshipInquiry(tier.id)}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Donations */}
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
              Make a Donation
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Every contribution, no matter the size, helps us expand educational opportunities
            </Typography>
          </div>

          <Card variant="elevated">
            <div style={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                color="primary"
                weight="semibold"
                style={{ marginBottom: Spacing.xl }}
              >
                Choose Your Donation Amount
              </Typography>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: Spacing.md,
                  marginBottom: Spacing.xl,
                }}
              >
                {donationOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleDonationSelect(option.amount)}
                    style={{
                      padding: Spacing.lg,
                      border: `2px solid ${donationAmount === option.amount.replace('$', '') ? Colors.primary.blue : Colors.border.primary}`,
                      borderRadius: BorderRadius.md,
                      backgroundColor: donationAmount === option.amount.replace('$', '') ? Colors.primary.blue + '10' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      textAlign: 'center'
                    }}
                  >
                    <Typography
                      variant="h5"
                      color="primary"
                      weight="bold"
                      style={{ marginBottom: Spacing.xs }}
                    >
                      {option.amount}
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      {option.description}
                    </Typography>
                  </button>
                ))}
              </div>

              {donationAmount && (
                <div style={{ marginBottom: Spacing.xl }}>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    Donation Amount: ${donationAmount}
                  </Typography>

                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    style={{
                      width: '200px',
                      padding: `${Spacing.md} ${Spacing.lg}`,
                      border: `2px solid ${Colors.border.primary}`,
                      borderRadius: BorderRadius.md,
                      fontSize: '1rem',
                      textAlign: 'center',
                      outline: 'none',
                      marginBottom: Spacing.lg
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: Spacing.lg,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Button variant="primary" size="xl">
                  💳 Donate with Card
                </Button>
                <Button variant="secondary" size="xl">
                  🏦 Bank Transfer
                </Button>
                <Button variant="outline" size="xl">
                  ₿ Crypto Donation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Current Sponsors Recognition */}
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
              Our Valued Partners
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Thank you to our sponsors who make CELF's mission possible
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: Spacing.lg,
            }}
          >
            {currentSponsors.map((sponsor, index) => (
              <Card key={index} variant="outlined" hover>
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="displaySmall"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {sponsor.logo}
                  </Typography>

                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.xs }}
                  >
                    {sponsor.name}
                  </Typography>

                  <div
                    style={{
                      display: 'inline-block',
                      padding: `${Spacing.xs} ${Spacing.sm}`,
                      backgroundColor: Colors.primary.blue + '20',
                      color: Colors.primary.blue,
                      borderRadius: BorderRadius.sm,
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: Spacing.sm
                    }}
                  >
                    {sponsor.tier}
                  </div>

                  <Typography variant="bodySmall" color="secondary">
                    {sponsor.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
            Ready to Make an Impact?
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
            Join us in democratizing cryptocurrency education and creating opportunities for learners worldwide.
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
              💝 Start Donating
            </Button>
            <Link href="/contact">
              <Button variant="secondary" size="xl">
                🤝 Discuss Sponsorship
              </Button>
            </Link>
          </div>

          <Typography variant="bodyMedium" color="tertiary">
            Questions about sponsorship or donations? <Link href="/contact" style={{ color: Colors.primary.blue }}>Contact our team</Link> for personalized assistance.
          </Typography>
        </div>
      </section>
    </div>
  );
}
