'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients, BorderRadius } from '@/lib/constants/design-tokens';

export default function ScholarshipPage() {
  const [selectedScholarship, setSelectedScholarship] = useState<string | null>(null);
  const [applicationStep, setApplicationStep] = useState(0);

  const scholarshipTypes = [
    {
      id: 'full-education',
      name: 'Full Education Scholarship',
      amount: '$5,000',
      duration: '1 Year',
      description: 'Complete educational support including courses, materials, and mentorship',
      eligibility: ['High school graduate or equivalent', 'Demonstrated financial need', 'Interest in cryptocurrency/blockchain'],
      benefits: ['Full course access', 'Personal mentor', 'Career guidance', 'Networking opportunities', 'Certificate upon completion'],
      spots: 50,
      deadline: 'March 31, 2024'
    },
    {
      id: 'partial-support',
      name: 'Partial Support Grant',
      amount: '$2,000',
      duration: '6 Months',
      description: 'Targeted support for specific educational goals and skill development',
      eligibility: ['Currently enrolled student', 'GPA 3.0 or higher', 'Commitment to complete program'],
      benefits: ['Selected course access', 'Study materials', 'Community support', 'Progress tracking', 'Completion certificate'],
      spots: 100,
      deadline: 'Rolling basis'
    },
    {
      id: 'community-leader',
      name: 'Community Leader Fellowship',
      amount: '$3,500',
      duration: '9 Months',
      description: 'For emerging leaders who will teach and support others in their communities',
      eligibility: ['Leadership experience', 'Community involvement', 'Teaching or mentoring background'],
      benefits: ['Advanced training', 'Teaching resources', 'Community platform', 'Leadership development', 'Ongoing support'],
      spots: 25,
      deadline: 'June 15, 2024'
    },
    {
      id: 'innovation-grant',
      name: 'Innovation Research Grant',
      amount: '$7,500',
      duration: '1 Year',
      description: 'Support for innovative projects that advance cryptocurrency education',
      eligibility: ['Research proposal required', 'Academic or professional background', 'Innovation potential'],
      benefits: ['Research funding', 'Expert mentorship', 'Publication support', 'Conference opportunities', 'Patent assistance'],
      spots: 15,
      deadline: 'September 30, 2024'
    }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: 'Choose Your Path',
      description: 'Select the scholarship program that best fits your educational goals and background.',
      icon: '🎯'
    },
    {
      step: 2,
      title: 'Prepare Documents',
      description: 'Gather required documents including transcripts, essays, and recommendation letters.',
      icon: '📄'
    },
    {
      step: 3,
      title: 'Submit Application',
      description: 'Complete the online application form with all required information and documents.',
      icon: '📝'
    },
    {
      step: 4,
      title: 'Review Process',
      description: 'Our committee reviews applications based on merit, need, and program fit.',
      icon: '🔍'
    },
    {
      step: 5,
      title: 'Interview Round',
      description: 'Selected candidates participate in virtual interviews with our scholarship committee.',
      icon: '💬'
    },
    {
      step: 6,
      title: 'Award Notification',
      description: 'Successful applicants receive notification and begin their educational journey.',
      icon: '🎉'
    }
  ];

  const successStories = [
    {
      name: 'Maria Rodriguez',
      location: 'Mexico City, Mexico',
      scholarship: 'Full Education Scholarship',
      year: '2023',
      story: 'Thanks to CELF\'s scholarship, I was able to complete my blockchain certification and now work as a cryptocurrency consultant for local businesses.',
      achievement: 'Started her own blockchain consulting firm',
      image: '👩‍💼'
    },
    {
      name: 'James Chen',
      location: 'Singapore',
      scholarship: 'Community Leader Fellowship',
      year: '2023',
      story: 'The fellowship helped me establish a cryptocurrency education program in my community, reaching over 500 students in the first year.',
      achievement: 'Educated 500+ community members',
      image: '👨‍🏫'
    },
    {
      name: 'Aisha Patel',
      location: 'Mumbai, India',
      scholarship: 'Innovation Research Grant',
      year: '2022',
      story: 'My research on mobile cryptocurrency education led to a published paper and a new educational app used by thousands of students.',
      achievement: 'Published researcher and app developer',
      image: '👩‍🔬'
    },
    {
      name: 'David Okafor',
      location: 'Lagos, Nigeria',
      scholarship: 'Partial Support Grant',
      year: '2023',
      story: 'The grant allowed me to complete my studies while working part-time. I now help other students navigate cryptocurrency education.',
      achievement: 'Peer mentor and student advocate',
      image: '👨‍🎓'
    }
  ];

  const programBenefits = [
    {
      icon: '🎓',
      title: 'World-Class Education',
      description: 'Access to cutting-edge cryptocurrency and blockchain education from industry experts.'
    },
    {
      icon: '👥',
      title: 'Global Community',
      description: 'Join a network of scholars and professionals from over 50 countries worldwide.'
    },
    {
      icon: '🚀',
      title: 'Career Advancement',
      description: 'Gain skills and credentials that open doors to exciting career opportunities.'
    },
    {
      icon: '💡',
      title: 'Innovation Support',
      description: 'Resources and mentorship to develop your own innovative projects and ideas.'
    },
    {
      icon: '🌍',
      title: 'Social Impact',
      description: 'Contribute to democratizing financial education and creating positive change.'
    },
    {
      icon: '🤝',
      title: 'Lifetime Network',
      description: 'Build lasting relationships with mentors, peers, and industry professionals.'
    }
  ];

  const programStats = [
    { value: '1,200+', label: 'Scholarships Awarded', description: 'Since program inception' },
    { value: '85%', label: 'Employment Rate', description: 'Within 6 months of completion' },
    { value: '$2.5M+', label: 'Total Investment', description: 'In student education' },
    { value: '50+', label: 'Countries Represented', description: 'Global scholarship recipients' }
  ];

  const handleScholarshipSelect = (scholarshipId: string) => {
    setSelectedScholarship(scholarshipId);
  };

  const handleApplicationStart = () => {
    // In a real implementation, this would redirect to the application form
    alert('Application form will open in a new window. Please ensure you have all required documents ready.');
  };

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
            CELF Scholarship Program
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
            Empowering the next generation of cryptocurrency and blockchain professionals through accessible education and financial support.
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
              🎓 Apply Now
            </Button>
            <Button variant="outline" size="xl">
              📖 Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Program Statistics */}
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
            {programStats.map((stat, index) => (
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
                  variant="h6"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.xs }}
                >
                  {stat.label}
                </Typography>
                <Typography variant="bodySmall" color="secondary">
                  {stat.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview */}
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
              Program Overview
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Our scholarship program is designed to remove financial barriers and provide comprehensive support for cryptocurrency education
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {programBenefits.map((benefit, index) => (
              <Card key={index} variant="elevated" hover>
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="displaySmall"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    {benefit.icon}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                    {benefit.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Types */}
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
              Available Scholarships
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Choose from our diverse scholarship programs designed to meet different educational goals and career paths
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {scholarshipTypes.map((scholarship, index) => (
              <Card
                key={scholarship.id}
                variant={scholarship.id === selectedScholarship ? 'elevated' : 'outlined'}
                style={{
                  borderColor: scholarship.id === selectedScholarship ? Colors.primary.blue : undefined,
                  borderWidth: scholarship.id === selectedScholarship ? '2px' : undefined
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md }}>
                    <div>
                      <Typography
                        variant="h4"
                        color="primary"
                        weight="bold"
                        style={{ marginBottom: Spacing.xs }}
                      >
                        {scholarship.name}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="primary"
                        weight="semibold"
                      >
                        {scholarship.amount}
                      </Typography>
                    </div>
                    <div
                      style={{
                        backgroundColor: Colors.secondary.success + '20',
                        color: Colors.secondary.success,
                        padding: `${Spacing.xs} ${Spacing.sm}`,
                        borderRadius: BorderRadius.sm,
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}
                    >
                      {scholarship.spots} spots available
                    </div>
                  </div>

                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{ marginBottom: Spacing.lg, lineHeight: 1.6 }}
                  >
                    {scholarship.description}
                  </Typography>

                  <div style={{ marginBottom: Spacing.lg }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.sm }}
                    >
                      Eligibility Requirements:
                    </Typography>
                    {scholarship.eligibility.map((req, reqIndex) => (
                      <div key={reqIndex} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: Spacing.xs }}>
                        <Typography variant="bodySmall" style={{ marginRight: Spacing.sm, color: Colors.primary.blue }}>
                          •
                        </Typography>
                        <Typography variant="bodySmall" color="secondary">
                          {req}
                        </Typography>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: Spacing.lg }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.sm }}
                    >
                      Benefits Include:
                    </Typography>
                    {scholarship.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: Spacing.xs }}>
                        <Typography variant="bodySmall" style={{ marginRight: Spacing.sm, color: Colors.secondary.success }}>
                          ✓
                        </Typography>
                        <Typography variant="bodySmall" color="secondary">
                          {benefit}
                        </Typography>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg }}>
                    <div>
                      <Typography variant="bodySmall" color="tertiary">
                        Duration: {scholarship.duration}
                      </Typography>
                      <Typography variant="bodySmall" color="tertiary">
                        Deadline: {scholarship.deadline}
                      </Typography>
                    </div>
                  </div>

                  <Button
                    variant={scholarship.id === selectedScholarship ? 'primary' : 'outline'}
                    size="lg"
                    fullWidth
                    onClick={() => handleScholarshipSelect(scholarship.id)}
                  >
                    {scholarship.id === selectedScholarship ? 'Selected' : 'Select This Scholarship'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
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
              Application Process
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Follow these simple steps to apply for your CELF scholarship
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {applicationSteps.map((step, index) => (
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
                      margin: `0 auto ${Spacing.md}`,
                      fontSize: '1.5rem'
                    }}
                  >
                    {step.icon}
                  </div>

                  <Typography
                    variant="overline"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.xs }}
                  >
                    Step {step.step}
                  </Typography>

                  <Typography
                    variant="h4"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.md }}
                  >
                    {step.title}
                  </Typography>

                  <Typography variant="bodyMedium" color="secondary" style={{ lineHeight: 1.6 }}>
                    {step.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
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
              Success Stories
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Meet some of our scholarship recipients who are making a difference in their communities
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {successStories.map((story, index) => (
              <Card key={index} variant="elevated">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: Spacing.lg }}>
                    <Typography
                      variant="displaySmall"
                      style={{ marginRight: Spacing.md }}
                    >
                      {story.image}
                    </Typography>
                    <div>
                      <Typography
                        variant="h5"
                        color="primary"
                        weight="bold"
                        style={{ marginBottom: Spacing.xs }}
                      >
                        {story.name}
                      </Typography>
                      <Typography variant="bodySmall" color="secondary">
                        {story.location}
                      </Typography>
                      <div
                        style={{
                          display: 'inline-block',
                          backgroundColor: Colors.primary.blue + '20',
                          color: Colors.primary.blue,
                          padding: `${Spacing.xs} ${Spacing.sm}`,
                          borderRadius: BorderRadius.sm,
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          marginTop: Spacing.xs
                        }}
                      >
                        {story.scholarship} • {story.year}
                      </div>
                    </div>
                  </div>

                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{
                      marginBottom: Spacing.lg,
                      lineHeight: 1.6,
                      fontStyle: 'italic'
                    }}
                  >
                    "{story.story}"
                  </Typography>

                  <div
                    style={{
                      backgroundColor: Colors.secondary.success + '10',
                      padding: Spacing.md,
                      borderRadius: BorderRadius.md,
                      borderLeft: `4px solid ${Colors.secondary.success}`
                    }}
                  >
                    <Typography
                      variant="bodySmall"
                      color="primary"
                      weight="semibold"
                    >
                      Achievement: {story.achievement}
                    </Typography>
                  </div>
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
            Ready to Start Your Journey?
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
            Join thousands of students worldwide who have transformed their lives through CELF's scholarship program.
          </Typography>

          {selectedScholarship && (
            <Card variant="filled" style={{ marginBottom: Spacing['2xl'] }}>
              <div style={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.md }}
                >
                  Selected: {scholarshipTypes.find(s => s.id === selectedScholarship)?.name}
                </Typography>
                <Typography variant="bodyMedium" color="secondary">
                  You're ready to apply for this scholarship program!
                </Typography>
              </div>
            </Card>
          )}

          <div
            style={{
              display: 'flex',
              gap: Spacing.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: Spacing.xl,
            }}
          >
            <Button variant="primary" size="xl" onClick={handleApplicationStart}>
              🎓 Start Application
            </Button>
            <Link href="/contact">
              <Button variant="secondary" size="xl">
                💬 Ask Questions
              </Button>
            </Link>
            <Link href="/download">
              <Button variant="outline" size="xl">
                📱 Download App First
              </Button>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: Spacing.lg,
              marginBottom: Spacing.lg,
            }}
          >
            <div>
              <Typography variant="bodySmall" color="tertiary" weight="semibold">
                Application Deadlines
              </Typography>
              <Typography variant="bodySmall" color="secondary">
                Rolling admissions for most programs
              </Typography>
            </div>
            <div>
              <Typography variant="bodySmall" color="tertiary" weight="semibold">
                Processing Time
              </Typography>
              <Typography variant="bodySmall" color="secondary">
                4-6 weeks from submission
              </Typography>
            </div>
            <div>
              <Typography variant="bodySmall" color="tertiary" weight="semibold">
                Support Available
              </Typography>
              <Typography variant="bodySmall" color="secondary">
                Application assistance provided
              </Typography>
            </div>
          </div>

          <Typography variant="bodyMedium" color="tertiary">
            Questions about the application process? <Link href="/help" style={{ color: Colors.primary.blue }}>Visit our Help Center</Link> or <Link href="/contact" style={{ color: Colors.primary.blue }}>contact our team</Link> for personalized assistance.
          </Typography>
        </div>
      </section>
    </div>
  );
}
