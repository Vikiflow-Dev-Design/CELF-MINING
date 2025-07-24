'use client';

import React, { useState } from 'react';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing, BorderRadius } from '@/lib/constants/design-tokens';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@celf.foundation',
      action: 'mailto:hello@celf.foundation'
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak directly with our support team',
      contact: '+1 (555) 123-CELF',
      action: 'tel:+15551232353'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Get instant help through our live chat',
      contact: 'Available 24/7',
      action: '#'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Come visit our headquarters',
      contact: '123 Innovation Drive, Tech City, TC 12345',
      action: 'https://maps.google.com'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com/celf.official' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/celf_official' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/celf_official' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/celf' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com/@celf_official' },
    { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com/@celf_official' }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
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
            Get in Touch
          </Typography>
          
          <Typography
            variant="h4"
            color="inverse"
            weight="regular"
            style={{ 
              marginBottom: Spacing.lg,
              opacity: 0.9,
              maxWidth: '600px',
              margin: `0 auto`,
            }}
          >
            Have questions about CELF? We're here to help you on your cryptocurrency education journey.
          </Typography>
        </div>
      </section>

      {/* Contact Methods */}
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
              How Can We Help?
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Choose the best way to reach us. We're committed to responding quickly and helpfully.
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: Spacing.xl,
            }}
          >
            {contactMethods.map((method, index) => (
              <Card key={index} variant="elevated" hover>
                <a
                  href={method.action}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Typography
                      variant="displaySmall"
                      style={{ marginBottom: Spacing.lg }}
                    >
                      {method.icon}
                    </Typography>
                    <Typography
                      variant="h4"
                      color="primary"
                      weight="semibold"
                      style={{ marginBottom: Spacing.sm }}
                    >
                      {method.title}
                    </Typography>
                    <Typography
                      variant="bodyMedium"
                      color="secondary"
                      style={{ marginBottom: Spacing.md, lineHeight: 1.5 }}
                    >
                      {method.description}
                    </Typography>
                    <Typography
                      variant="bodyMedium"
                      color="primary"
                      weight="semibold"
                    >
                      {method.contact}
                    </Typography>
                  </div>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: Spacing['4xl'],
              alignItems: 'start',
            }}
          >
            {/* Form */}
            <Card variant="elevated">
              <Typography
                variant="h2"
                color="primary"
                weight="bold"
                style={{ marginBottom: Spacing.lg }}
              >
                Send Us a Message
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: Spacing.lg }}>
                  <label style={labelStyle}>Name *</label>
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

                <div style={{ marginBottom: Spacing.lg }}>
                  <label style={labelStyle}>Email *</label>
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

                <div style={{ marginBottom: Spacing.lg }}>
                  <label style={labelStyle}>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = Colors.primary.blue}
                    onBlur={(e) => e.target.style.borderColor = Colors.border.primary}
                  />
                </div>

                <div style={{ marginBottom: Spacing.xl }}>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '120px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = Colors.primary.blue}
                    onBlur={(e) => e.target.style.borderColor = Colors.border.primary}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>

            {/* Additional Info */}
            <div>
              {/* Business Hours */}
              <Card variant="outlined" style={{ marginBottom: Spacing.xl }}>
                <Typography
                  variant="h3"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.lg }}
                >
                  📅 Business Hours
                </Typography>
                
                {businessHours.map((schedule, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: Spacing.sm,
                      marginBottom: Spacing.sm,
                      borderBottom: index < businessHours.length - 1 ? `1px solid ${Colors.border.light}` : 'none'
                    }}
                  >
                    <Typography variant="bodyMedium" color="secondary" weight="medium">
                      {schedule.day}
                    </Typography>
                    <Typography variant="bodyMedium" color="primary" weight="semibold">
                      {schedule.hours}
                    </Typography>
                  </div>
                ))}
              </Card>

              {/* Response Time */}
              <Card variant="filled" style={{ marginBottom: Spacing.xl }}>
                <Typography
                  variant="h3"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.md }}
                >
                  ⚡ Response Time
                </Typography>
                <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.sm }}>
                  <strong>Email:</strong> Within 24 hours
                </Typography>
                <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.sm }}>
                  <strong>Phone:</strong> Immediate during business hours
                </Typography>
                <Typography variant="bodyMedium" color="secondary">
                  <strong>Live Chat:</strong> Real-time support 24/7
                </Typography>
              </Card>

              {/* Social Media */}
              <Card variant="outlined">
                <Typography
                  variant="h3"
                  color="primary"
                  weight="semibold"
                  style={{ marginBottom: Spacing.lg }}
                >
                  🌐 Follow Us
                </Typography>
                
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: Spacing.md,
                  }}
                >
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: Spacing.sm,
                        borderRadius: BorderRadius.md,
                        textDecoration: 'none',
                        color: Colors.text.secondary,
                        transition: 'background-color 0.2s ease-in-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = Colors.background.tertiary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Typography variant="h5" style={{ marginBottom: Spacing.xs }}>
                        {social.icon}
                      </Typography>
                      <Typography variant="caption" weight="medium">
                        {social.name}
                      </Typography>
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
