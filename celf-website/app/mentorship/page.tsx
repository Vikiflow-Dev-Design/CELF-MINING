'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, Gradients, BorderRadius } from '@/lib/constants/design-tokens';

export default function MentorshipPage() {
  const [selectedMentorshipType, setSelectedMentorshipType] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    goals: '',
    availability: '',
    mentorshipType: '',
    specificAreas: [],
    preferredFormat: ''
  });

  const mentorshipTypes = [
    {
      id: 'one-on-one',
      title: '1-on-1 Mentorship',
      duration: '3-6 months',
      commitment: '1 hour/week',
      description: 'Personalized guidance with an experienced cryptocurrency professional',
      benefits: ['Customized learning path', 'Direct access to mentor', 'Career guidance', 'Project feedback'],
      icon: '👤'
    },
    {
      id: 'group-mentorship',
      title: 'Group Mentorship',
      duration: '2-4 months',
      commitment: '2 hours/month',
      description: 'Learn alongside peers with expert-led group sessions',
      benefits: ['Peer learning', 'Group discussions', 'Shared experiences', 'Networking opportunities'],
      icon: '👥'
    },
    {
      id: 'project-based',
      title: 'Project-Based Mentorship',
      duration: '1-3 months',
      commitment: 'Flexible',
      description: 'Get guidance on specific cryptocurrency or blockchain projects',
      benefits: ['Project completion', 'Technical guidance', 'Portfolio building', 'Real-world application'],
      icon: '🚀'
    },
    {
      id: 'career-coaching',
      title: 'Career Coaching',
      duration: '2-6 months',
      commitment: '2 hours/month',
      description: 'Professional development focused on cryptocurrency career advancement',
      benefits: ['Resume review', 'Interview preparation', 'Industry insights', 'Job search strategy'],
      icon: '💼'
    }
  ];

  const expertiseAreas = [
    { id: 'blockchain-basics', name: 'Blockchain Fundamentals', icon: '🔗' },
    { id: 'cryptocurrency-trading', name: 'Cryptocurrency Trading', icon: '📈' },
    { id: 'defi', name: 'Decentralized Finance (DeFi)', icon: '🏦' },
    { id: 'nft', name: 'NFTs & Digital Assets', icon: '🎨' },
    { id: 'smart-contracts', name: 'Smart Contracts', icon: '📝' },
    { id: 'mining', name: 'Cryptocurrency Mining', icon: '⛏️' },
    { id: 'security', name: 'Blockchain Security', icon: '🔒' },
    { id: 'development', name: 'Blockchain Development', icon: '💻' },
    { id: 'regulation', name: 'Crypto Regulation & Compliance', icon: '⚖️' },
    { id: 'entrepreneurship', name: 'Crypto Entrepreneurship', icon: '🚀' }
  ];

  const featuredMentors = [
    {
      name: 'Dr. Sarah Kim',
      title: 'Blockchain Research Director',
      company: 'TechCorp',
      expertise: ['Blockchain Fundamentals', 'Smart Contracts', 'Research'],
      experience: '8+ years',
      students: 150,
      rating: 4.9,
      image: '👩‍🔬',
      bio: 'Leading blockchain researcher with expertise in smart contract development and cryptocurrency education.'
    },
    {
      name: 'Marcus Johnson',
      title: 'Senior DeFi Developer',
      company: 'DeFi Labs',
      expertise: ['DeFi', 'Smart Contracts', 'Development'],
      experience: '6+ years',
      students: 120,
      rating: 4.8,
      image: '👨‍💻',
      bio: 'Full-stack developer specializing in DeFi protocols and decentralized application development.'
    },
    {
      name: 'Elena Rodriguez',
      title: 'Crypto Investment Strategist',
      company: 'CryptoVentures',
      expertise: ['Trading', 'Investment Strategy', 'Market Analysis'],
      experience: '10+ years',
      students: 200,
      rating: 4.9,
      image: '👩‍💼',
      bio: 'Investment professional with deep expertise in cryptocurrency markets and portfolio management.'
    },
    {
      name: 'David Chen',
      title: 'Blockchain Security Expert',
      company: 'SecureChain',
      expertise: ['Security', 'Auditing', 'Risk Management'],
      experience: '7+ years',
      students: 90,
      rating: 4.7,
      image: '👨‍🔒',
      bio: 'Cybersecurity specialist focused on blockchain security audits and cryptocurrency safety protocols.'
    }
  ];

  const liveStreamTopics = [
    {
      title: 'Introduction to Cryptocurrency',
      mentor: 'Dr. Sarah Kim',
      date: 'Every Monday',
      time: '7:00 PM EST',
      duration: '60 minutes',
      level: 'Beginner',
      description: 'Weekly live sessions covering cryptocurrency basics and blockchain fundamentals'
    },
    {
      title: 'DeFi Deep Dive',
      mentor: 'Marcus Johnson',
      date: 'Every Wednesday',
      time: '8:00 PM EST',
      duration: '90 minutes',
      level: 'Intermediate',
      description: 'Advanced discussions on decentralized finance protocols and strategies'
    },
    {
      title: 'Trading Strategies & Market Analysis',
      mentor: 'Elena Rodriguez',
      date: 'Every Friday',
      time: '6:00 PM EST',
      duration: '75 minutes',
      level: 'Intermediate',
      description: 'Live market analysis and cryptocurrency trading strategy discussions'
    },
    {
      title: 'Blockchain Security Best Practices',
      mentor: 'David Chen',
      date: 'Bi-weekly Saturday',
      time: '2:00 PM EST',
      duration: '60 minutes',
      level: 'Advanced',
      description: 'Security-focused sessions on protecting cryptocurrency assets and smart contracts'
    }
  ];

  const programBenefits = [
    {
      icon: '🎯',
      title: 'Personalized Guidance',
      description: 'Get tailored advice based on your specific goals and learning style'
    },
    {
      icon: '🌟',
      title: 'Industry Experts',
      description: 'Learn from professionals with real-world cryptocurrency experience'
    },
    {
      icon: '🚀',
      title: 'Career Acceleration',
      description: 'Fast-track your cryptocurrency career with insider knowledge and connections'
    },
    {
      icon: '🤝',
      title: 'Networking Opportunities',
      description: 'Connect with peers and professionals in the cryptocurrency industry'
    },
    {
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Access to exclusive resources, workshops, and educational content'
    },
    {
      icon: '💡',
      title: 'Innovation Support',
      description: 'Get help developing your own cryptocurrency projects and ideas'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMentorshipTypeSelect = (type: string) => {
    setSelectedMentorshipType(type);
    setFormData(prev => ({
      ...prev,
      mentorshipType: type
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to a backend
    alert('Thank you for your mentorship request! We\'ll match you with a suitable mentor within 48 hours.');
  };

  const inputStyle = {
    width: '100%',
    padding: `${Spacing.md} ${Spacing.lg}`,
    border: `2px solid ${Colors.border.primary}`,
    borderRadius: BorderRadius.md,
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease-in-out',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: Spacing.xs,
    fontWeight: '600',
    color: Colors.text.secondary,
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
            variant="displayMedium"
            color="inverse"
            weight="bold"
            style={{ marginBottom: Spacing.lg }}
          >
            CELF Mentorship Program
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
            Connect with industry experts and accelerate your cryptocurrency education journey through personalized mentorship and guidance.
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
              🤝 Request Mentor
            </Button>
            <Button variant="outline" size="xl">
              📺 Join Live Sessions
            </Button>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
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
              Why Choose CELF Mentorship?
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Our mentorship program is designed to provide comprehensive support for your cryptocurrency education journey
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

      {/* Mentorship Types */}
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
              Choose Your Mentorship Style
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Select the mentorship format that best fits your learning preferences and schedule
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {mentorshipTypes.map((type, index) => (
              <Card
                key={type.id}
                variant={selectedMentorshipType === type.id ? 'elevated' : 'outlined'}
                style={{
                  borderColor: selectedMentorshipType === type.id ? Colors.primary.blue : undefined,
                  borderWidth: selectedMentorshipType === type.id ? '2px' : undefined,
                  cursor: 'pointer'
                }}
                onClick={() => handleMentorshipTypeSelect(type.id)}
              >
                <div style={{ textAlign: 'center' }}>
                  <Typography
                    variant="displaySmall"
                    style={{ marginBottom: Spacing.lg }}
                  >
                    {type.icon}
                  </Typography>

                  <Typography
                    variant="h4"
                    color="primary"
                    weight="bold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    {type.title}
                  </Typography>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: Spacing.md }}>
                    <Typography variant="bodySmall" color="tertiary">
                      Duration: {type.duration}
                    </Typography>
                    <Typography variant="bodySmall" color="tertiary">
                      {type.commitment}
                    </Typography>
                  </div>

                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{ marginBottom: Spacing.lg, lineHeight: 1.6 }}
                  >
                    {type.description}
                  </Typography>

                  <div style={{ textAlign: 'left' }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.sm }}
                    >
                      Benefits:
                    </Typography>
                    {type.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: Spacing.xs }}>
                        <Typography variant="bodySmall" style={{ marginRight: Spacing.sm, color: Colors.secondary.success }}>
                          ✓
                        </Typography>
                        <Typography variant="bodySmall" color="secondary">
                          {benefit}
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

      {/* Featured Mentors */}
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
              Meet Our Expert Mentors
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Learn from industry professionals with proven track records in cryptocurrency and blockchain technology
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {featuredMentors.map((mentor, index) => (
              <Card key={index} variant="elevated" hover>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: Spacing.lg }}>
                    <Typography
                      variant="displaySmall"
                      style={{ marginRight: Spacing.md }}
                    >
                      {mentor.image}
                    </Typography>
                    <div>
                      <Typography
                        variant="h5"
                        color="primary"
                        weight="bold"
                        style={{ marginBottom: Spacing.xs }}
                      >
                        {mentor.name}
                      </Typography>
                      <Typography
                        variant="bodyMedium"
                        color="primary"
                        weight="semibold"
                        style={{ marginBottom: Spacing.xs }}
                      >
                        {mentor.title}
                      </Typography>
                      <Typography variant="bodySmall" color="secondary">
                        {mentor.company}
                      </Typography>
                    </div>
                  </div>

                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{ marginBottom: Spacing.lg, lineHeight: 1.6 }}
                  >
                    {mentor.bio}
                  </Typography>

                  <div style={{ marginBottom: Spacing.lg }}>
                    <Typography
                      variant="bodySmall"
                      color="tertiary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.sm }}
                    >
                      Expertise Areas:
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: Spacing.xs }}>
                      {mentor.expertise.map((area, areaIndex) => (
                        <span
                          key={areaIndex}
                          style={{
                            backgroundColor: Colors.primary.blue + '20',
                            color: Colors.primary.blue,
                            padding: `${Spacing.xs} ${Spacing.sm}`,
                            borderRadius: BorderRadius.sm,
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Typography variant="bodySmall" color="tertiary">
                        {mentor.experience} experience
                      </Typography>
                      <Typography variant="bodySmall" color="tertiary">
                        {mentor.students} students mentored
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="bodySmall" color="secondary" weight="semibold">
                        {mentor.rating} ⭐
                      </Typography>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Request Form */}
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
              Request Your Mentor
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Fill out this form and we'll match you with the perfect mentor within 48 hours
            </Typography>
          </div>

          <Card variant="elevated">
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: Spacing.lg,
                  marginBottom: Spacing.lg,
                }}
              >
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = Colors.primary.blue}
                    onBlur={(e) => e.target.style.borderColor = Colors.border.primary}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = Colors.primary.blue}
                    onBlur={(e) => e.target.style.borderColor = Colors.border.primary}
                  />
                </div>
              </div>

              <div style={{ marginBottom: Spacing.lg }}>
                <label style={labelStyle}>Current Experience Level *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner - New to cryptocurrency</option>
                  <option value="intermediate">Intermediate - Some knowledge and experience</option>
                  <option value="advanced">Advanced - Experienced with specific goals</option>
                  <option value="professional">Professional - Looking to specialize or advance career</option>
                </select>
              </div>

              <div style={{ marginBottom: Spacing.lg }}>
                <label style={labelStyle}>Learning Goals *</label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe what you want to achieve through mentorship..."
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '100px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = Colors.primary.blue}
                  onBlur={(e) => e.target.style.borderColor = Colors.border.primary}
                />
              </div>

              <div style={{ marginBottom: Spacing.lg }}>
                <label style={labelStyle}>Areas of Interest</label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: Spacing.sm,
                    marginTop: Spacing.sm,
                  }}
                >
                  {expertiseAreas.map((area) => (
                    <label
                      key={area.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: Spacing.sm,
                        border: `1px solid ${Colors.border.primary}`,
                        borderRadius: BorderRadius.sm,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      <input
                        type="checkbox"
                        value={area.id}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          setFormData(prev => ({
                            ...prev,
                            specificAreas: checked
                              ? [...prev.specificAreas, value]
                              : prev.specificAreas.filter(item => item !== value)
                          }));
                        }}
                        style={{ marginRight: Spacing.sm }}
                      />
                      <Typography variant="bodySmall" style={{ marginRight: Spacing.xs }}>
                        {area.icon}
                      </Typography>
                      <Typography variant="bodySmall" color="secondary">
                        {area.name}
                      </Typography>
                    </label>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: Spacing.lg,
                  marginBottom: Spacing.xl,
                }}
              >
                <div>
                  <label style={labelStyle}>Availability *</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  >
                    <option value="">Select your availability</option>
                    <option value="weekday-morning">Weekday Mornings</option>
                    <option value="weekday-afternoon">Weekday Afternoons</option>
                    <option value="weekday-evening">Weekday Evenings</option>
                    <option value="weekend">Weekends</option>
                    <option value="flexible">Flexible Schedule</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Preferred Format *</label>
                  <select
                    name="preferredFormat"
                    value={formData.preferredFormat}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  >
                    <option value="">Select preferred format</option>
                    <option value="video-call">Video Calls</option>
                    <option value="phone-call">Phone Calls</option>
                    <option value="text-chat">Text/Chat</option>
                    <option value="email">Email Exchange</option>
                    <option value="mixed">Mixed Formats</option>
                  </select>
                </div>
              </div>

              {selectedMentorshipType && (
                <div
                  style={{
                    backgroundColor: Colors.primary.blue + '10',
                    padding: Spacing.lg,
                    borderRadius: BorderRadius.md,
                    marginBottom: Spacing.xl,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    weight="semibold"
                    style={{ marginBottom: Spacing.sm }}
                  >
                    Selected: {mentorshipTypes.find(t => t.id === selectedMentorshipType)?.title}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {mentorshipTypes.find(t => t.id === selectedMentorshipType)?.description}
                  </Typography>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="xl"
                fullWidth
              >
                🤝 Submit Mentorship Request
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Live Stream Podcast Features */}
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
              Live Learning Sessions
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Join our regular live streams and interactive sessions with expert mentors
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {liveStreamTopics.map((session, index) => (
              <Card key={index} variant="outlined" hover>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md }}>
                    <Typography
                      variant="h4"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.sm }}
                    >
                      {session.title}
                    </Typography>
                    <div
                      style={{
                        backgroundColor:
                          session.level === 'Beginner' ? Colors.secondary.success + '20' :
                          session.level === 'Intermediate' ? Colors.secondary.warning + '20' :
                          Colors.secondary.error + '20',
                        color:
                          session.level === 'Beginner' ? Colors.secondary.success :
                          session.level === 'Intermediate' ? Colors.secondary.warning :
                          Colors.secondary.error,
                        padding: `${Spacing.xs} ${Spacing.sm}`,
                        borderRadius: BorderRadius.sm,
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}
                    >
                      {session.level}
                    </div>
                  </div>

                  <Typography
                    variant="bodyMedium"
                    color="secondary"
                    style={{ marginBottom: Spacing.lg, lineHeight: 1.6 }}
                  >
                    {session.description}
                  </Typography>

                  <div style={{ marginBottom: Spacing.lg }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                      <Typography variant="bodySmall" color="tertiary" weight="semibold">
                        Mentor:
                      </Typography>
                      <Typography variant="bodySmall" color="primary">
                        {session.mentor}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                      <Typography variant="bodySmall" color="tertiary" weight="semibold">
                        Schedule:
                      </Typography>
                      <Typography variant="bodySmall" color="secondary">
                        {session.date}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                      <Typography variant="bodySmall" color="tertiary" weight="semibold">
                        Time:
                      </Typography>
                      <Typography variant="bodySmall" color="secondary">
                        {session.time}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="bodySmall" color="tertiary" weight="semibold">
                        Duration:
                      </Typography>
                      <Typography variant="bodySmall" color="secondary">
                        {session.duration}
                      </Typography>
                    </div>
                  </div>

                  <Button variant="outline" size="md" fullWidth>
                    📺 Join Live Session
                  </Button>
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
            Ready to Accelerate Your Learning?
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
            Join our mentorship program and get personalized guidance from industry experts to achieve your cryptocurrency education goals.
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
              🤝 Request Mentor Now
            </Button>
            <Link href="/scholarship">
              <Button variant="secondary" size="xl">
                🎓 Apply for Scholarship
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl">
                💬 Ask Questions
              </Button>
            </Link>
          </div>

          <Typography variant="bodyMedium" color="tertiary">
            Questions about our mentorship program? <Link href="/help" style={{ color: Colors.primary.blue }}>Visit our Help Center</Link> or <Link href="/contact" style={{ color: Colors.primary.blue }}>contact our team</Link> for more information.
          </Typography>
        </div>
      </section>
    </div>
  );
}
