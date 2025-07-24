'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Layout, Spacing } from '@/lib/constants/design-tokens';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    country: '',
    referralCode: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia',
    'Japan', 'South Korea', 'Singapore', 'Brazil', 'Mexico', 'India', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.country) newErrors.country = 'Country selection is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms of service';
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to email verification
      window.location.href = '/email-verification';
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic
  };

  const inputStyle = {
    width: '100%',
    padding: `${Spacing.md} ${Spacing.lg}`,
    border: `2px solid ${Colors.border.primary}`,
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: Colors.secondary.error,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: Spacing.xs,
    fontSize: '14px',
    fontWeight: '600',
    color: Colors.text.secondary,
  };

  const errorStyle = {
    color: Colors.secondary.error,
    fontSize: '12px',
    marginTop: Spacing.xs,
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: Colors.background.secondary,
      padding: `${Spacing['2xl']} ${Layout.screenMargin.mobile}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: Spacing['2xl'] }}>
          <Typography variant="h1" color="primary" weight="bold" style={{ marginBottom: Spacing.sm }}>
            Join CELF
          </Typography>
          <Typography variant="bodyLarge" color="secondary">
            Start your cryptocurrency education journey today
          </Typography>
        </div>

        <Card variant="elevated" padding="xl">
          {/* Social Login Options */}
          <div style={{ marginBottom: Spacing.xl }}>
            <div style={{ display: 'flex', gap: Spacing.sm, marginBottom: Spacing.lg }}>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => handleSocialLogin('google')}
              >
                🔍 Google
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => handleSocialLogin('facebook')}
              >
                📘 Facebook
              </Button>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              margin: `${Spacing.lg} 0`,
              color: Colors.text.tertiary 
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: Colors.border.secondary }} />
              <span style={{ padding: `0 ${Spacing.md}`, fontSize: '14px' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: Colors.border.secondary }} />
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: Spacing.md, marginBottom: Spacing.lg }}>
              <div>
                <label style={labelStyle}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={errors.firstName ? errorInputStyle : inputStyle}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
              </div>
              <div>
                <label style={labelStyle}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={errors.lastName ? errorInputStyle : inputStyle}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: Spacing.lg }}>
              <label style={labelStyle}>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={errors.email ? errorInputStyle : inputStyle}
                placeholder="Enter your email address"
              />
              {errors.email && <div style={errorStyle}>{errors.email}</div>}
            </div>

            {/* Password Fields */}
            <div style={{ marginBottom: Spacing.lg }}>
              <label style={labelStyle}>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={errors.password ? errorInputStyle : inputStyle}
                placeholder="Create a strong password"
              />
              {errors.password && <div style={errorStyle}>{errors.password}</div>}
            </div>

            <div style={{ marginBottom: Spacing.lg }}>
              <label style={labelStyle}>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={errors.confirmPassword ? errorInputStyle : inputStyle}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
            </div>

            {/* Country Selection */}
            <div style={{ marginBottom: Spacing.lg }}>
              <label style={labelStyle}>Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                style={errors.country ? errorInputStyle : inputStyle}
              >
                <option value="">Select your country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <div style={errorStyle}>{errors.country}</div>}
            </div>

            {/* Referral Code */}
            <div style={{ marginBottom: Spacing.lg }}>
              <label style={labelStyle}>Referral Code (Optional)</label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter referral code if you have one"
              />
            </div>

            {/* Terms Acceptance */}
            <div style={{ marginBottom: Spacing.lg }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.sm }}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  style={{ marginTop: '2px' }}
                />
                <Typography variant="bodySmall" color="secondary">
                  I agree to the <Link href="/terms" style={{ color: Colors.primary.blue }}>Terms of Service</Link> *
                </Typography>
              </div>
              {errors.agreeToTerms && <div style={errorStyle}>{errors.agreeToTerms}</div>}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.sm }}>
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleInputChange}
                  style={{ marginTop: '2px' }}
                />
                <Typography variant="bodySmall" color="secondary">
                  I agree to the <Link href="/privacy" style={{ color: Colors.primary.blue }}>Privacy Policy</Link> *
                </Typography>
              </div>
              {errors.agreeToPrivacy && <div style={errorStyle}>{errors.agreeToPrivacy}</div>}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: Spacing.sm }}>
                <input
                  type="checkbox"
                  name="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onChange={handleInputChange}
                  style={{ marginTop: '2px' }}
                />
                <Typography variant="bodySmall" color="secondary">
                  I would like to receive educational content and updates via email
                </Typography>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <div style={{ textAlign: 'center', marginTop: Spacing.lg }}>
            <Typography variant="bodyMedium" color="secondary">
              Already have an account?{' '}
              <Link href="/login" style={{ color: Colors.primary.blue, fontWeight: '600' }}>
                Sign In
              </Link>
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}
