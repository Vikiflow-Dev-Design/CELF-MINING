'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, BorderRadius } from '@/lib/constants/design-tokens';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      description: 'Learn the basics of CELF and cryptocurrency mining',
      articleCount: 12
    },
    {
      id: 'mining',
      title: 'Mining & Earning',
      icon: '⛏️',
      description: 'How to mine CELF tokens and maximize your earnings',
      articleCount: 18
    },
    {
      id: 'wallet',
      title: 'Wallet & Transactions',
      icon: '💰',
      description: 'Managing your CELF tokens and making transactions',
      articleCount: 15
    },
    {
      id: 'education',
      title: 'Educational Content',
      icon: '📚',
      description: 'Learning resources and educational materials',
      articleCount: 25
    },
    {
      id: 'community',
      title: 'Community & Social',
      icon: '👥',
      description: 'Connecting with other learners and community features',
      articleCount: 10
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: '🔧',
      description: 'Troubleshooting and technical assistance',
      articleCount: 20
    }
  ];

  const popularArticles = [
    {
      title: 'How to Start Mining CELF Tokens',
      category: 'Getting Started',
      readTime: '5 min read',
      views: '15.2K views'
    },
    {
      title: 'Understanding CELF Tokenomics',
      category: 'Education',
      readTime: '8 min read',
      views: '12.8K views'
    },
    {
      title: 'Setting Up Your CELF Wallet',
      category: 'Wallet',
      readTime: '6 min read',
      views: '11.5K views'
    },
    {
      title: 'Maximizing Your Mining Rewards',
      category: 'Mining',
      readTime: '7 min read',
      views: '10.3K views'
    },
    {
      title: 'Troubleshooting Common Issues',
      category: 'Technical',
      readTime: '4 min read',
      views: '9.7K views'
    }
  ];

  const faqs = [
    {
      question: 'What is CELF and how does it work?',
      answer: 'CELF (Cryptocurrency Education & Learning Foundation) is an educational platform that allows users to learn about cryptocurrency while earning CELF tokens through educational mining. Users complete learning modules, quizzes, and challenges to earn tokens while building their knowledge of blockchain technology and financial literacy.'
    },
    {
      question: 'How do I start mining CELF tokens?',
      answer: 'To start mining CELF tokens, download the CELF mobile app, create an account, and complete the onboarding process. Once verified, you can begin educational mining by participating in learning modules, completing daily challenges, and engaging with educational content.'
    },
    {
      question: 'Is CELF mining free?',
      answer: 'Yes, CELF mining is completely free. There are no upfront costs, subscription fees, or hidden charges. You only need a compatible mobile device and internet connection to start learning and earning CELF tokens.'
    },
    {
      question: 'How can I withdraw my CELF tokens?',
      answer: 'CELF tokens can be managed through the built-in wallet in the mobile app. You can send tokens to other CELF users, participate in the scholarship program, or hold them for future use. Withdrawal options depend on your region and local regulations.'
    },
    {
      question: 'What devices are supported?',
      answer: 'CELF is available on iOS (13.0+) and Android (7.0+) devices. The app is optimized for smartphones and tablets, providing the best learning experience across different screen sizes.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact our support team through multiple channels: email (support@celf.foundation), live chat in the app, or by submitting a support ticket through our help center. Our team typically responds within 24 hours.'
    }
  ];

  const videoTutorials = [
    {
      title: 'CELF App Overview - Getting Started',
      duration: '8:32',
      thumbnail: '🎥',
      description: 'Complete walkthrough of the CELF app interface and basic features'
    },
    {
      title: 'Your First Mining Session',
      duration: '6:15',
      thumbnail: '🎥',
      description: 'Step-by-step guide to starting your first educational mining session'
    },
    {
      title: 'Understanding Cryptocurrency Basics',
      duration: '12:45',
      thumbnail: '🎥',
      description: 'Educational video covering fundamental cryptocurrency concepts'
    },
    {
      title: 'Wallet Security Best Practices',
      duration: '9:20',
      thumbnail: '🎥',
      description: 'Learn how to keep your CELF tokens safe and secure'
    }
  ];

  const quickActions = [
    {
      title: 'Download App',
      description: 'Get the CELF mobile app',
      icon: '📱',
      link: '/download'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our team',
      icon: '💬',
      link: '/support'
    },
    {
      title: 'Community Forum',
      description: 'Join the discussion',
      icon: '👥',
      link: '/community'
    },
    {
      title: 'Report Bug',
      description: 'Report technical issues',
      icon: '🐛',
      link: '/support'
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? helpCategories 
    : helpCategories.filter(cat => cat.id === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, ${Colors.primary.blue} 0%, ${Colors.primary.light} 100%)`,
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
            Help Center
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
            Find answers, get support, and learn everything you need to know about CELF
          </Typography>

          {/* Search Bar */}
          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: `${Spacing.lg} ${Spacing.xl}`,
                paddingRight: '60px',
                border: 'none',
                borderRadius: BorderRadius.lg,
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: Spacing.lg,
                top: '50%',
                transform: 'translateY(-50%)',
                color: Colors.text.tertiary,
                fontSize: '1.2rem'
              }}
            >
              🔍
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section
        style={{
          padding: `${Spacing['4xl']} ${Layout.screenMargin.mobile}`,
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
              gap: Spacing.lg,
            }}
          >
            {quickActions.map((action, index) => (
              <Link key={index} href={action.link} style={{ textDecoration: 'none' }}>
                <Card variant="outlined" hover>
                  <div style={{ textAlign: 'center' }}>
                    <Typography
                      variant="h2"
                      style={{ marginBottom: Spacing.sm }}
                    >
                      {action.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.xs }}
                    >
                      {action.title}
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      {action.description}
                    </Typography>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
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
              Browse by Category
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Find the help you need organized by topic
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {helpCategories.map((category, index) => (
              <Card key={index} variant="elevated" hover>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: Spacing.md }}>
                    <Typography
                      variant="h2"
                      style={{ marginRight: Spacing.md }}
                    >
                      {category.icon}
                    </Typography>
                    <div>
                      <Typography
                        variant="h4"
                        color="primary"
                        weight="semibold"
                        style={{ marginBottom: Spacing.xs }}
                      >
                        {category.title}
                      </Typography>
                      <Typography variant="caption" color="tertiary">
                        {category.articleCount} articles
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.5 }}>
                    {category.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
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
              Popular Articles
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Most viewed help articles by our community
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: Spacing.lg,
            }}
          >
            {popularArticles.map((article, index) => (
              <Card key={index} variant="outlined" hover>
                <div>
                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {article.title}
                  </Typography>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: Spacing.sm
                  }}>
                    <Typography variant="bodySmall" color="primary" weight="medium">
                      {article.category}
                    </Typography>
                    <Typography variant="bodySmall" color="tertiary">
                      {article.views}
                    </Typography>
                  </div>
                  
                  <Typography variant="caption" color="secondary">
                    {article.readTime}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
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
              Video Tutorials
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Learn visually with our step-by-step video guides
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {videoTutorials.map((video, index) => (
              <Card key={index} variant="elevated" hover>
                <div>
                  {/* Video Thumbnail */}
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      backgroundColor: Colors.neutral[100],
                      borderRadius: BorderRadius.md,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: Spacing.md,
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    <Typography variant="displaySmall">{video.thumbnail}</Typography>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: Spacing.sm,
                        right: Spacing.sm,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: Colors.text.inverse,
                        padding: `${Spacing.xs} ${Spacing.sm}`,
                        borderRadius: BorderRadius.sm,
                        fontSize: '0.75rem'
                      }}
                    >
                      {video.duration}
                    </div>
                  </div>

                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {video.title}
                  </Typography>

                  <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.5 }}>
                    {video.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Quick answers to common questions about CELF
            </Typography>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.lg }}>
            {faqs.map((faq, index) => (
              <Card key={index} variant="outlined">
                <div>
                  <Typography
                    variant="h5"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {faq.question}
                  </Typography>
                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{ lineHeight: 1.6 }}
                  >
                    {faq.answer}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help CTA */}
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
            Still Need Help?
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
            Can't find what you're looking for? Our support team is here to help you with any questions or issues.
          </Typography>

          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/support">
              <Button variant="primary" size="xl">
                💬 Contact Support
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="secondary" size="xl">
                👥 Join Community
              </Button>
            </Link>
          </div>

          <Typography
            variant="bodyMedium"
            color="tertiary"
            style={{ marginTop: Spacing.lg }}
          >
            Average response time: 24 hours • Available 24/7
          </Typography>
        </div>
      </section>
    </div>
  );
}
