'use client';

import React from 'react';
import { Colors, Typography, BorderRadius, Spacing } from '@/lib/constants/design-tokens';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
}) => {
  const getVariantStyles = () => {
    const variants = {
      primary: {
        backgroundColor: Colors.primary.blue,
        color: Colors.text.inverse,
        border: `2px solid ${Colors.primary.blue}`,
        hover: {
          backgroundColor: Colors.primary.dark,
          borderColor: Colors.primary.dark,
          color: Colors.text.inverse,
        },
      },
      secondary: {
        backgroundColor: Colors.neutral.white,
        color: Colors.primary.blue,
        border: `2px solid ${Colors.primary.blue}`,
        hover: {
          backgroundColor: Colors.primary.blue,
          borderColor: Colors.primary.blue,
          color: Colors.text.inverse,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: Colors.text.primary,
        border: `2px solid ${Colors.border.primary}`,
        hover: {
          backgroundColor: Colors.background.secondary,
          borderColor: Colors.text.primary,
          color: Colors.text.primary,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: Colors.text.primary,
        border: '2px solid transparent',
        hover: {
          backgroundColor: Colors.background.secondary,
          borderColor: 'transparent',
          color: Colors.text.primary,
        },
      },
      success: {
        backgroundColor: Colors.secondary.success,
        color: Colors.text.inverse,
        border: `2px solid ${Colors.secondary.success}`,
        hover: {
          backgroundColor: '#059669',
          borderColor: '#059669',
          color: Colors.text.inverse,
        },
      },
      warning: {
        backgroundColor: Colors.secondary.warning,
        color: Colors.text.inverse,
        border: `2px solid ${Colors.secondary.warning}`,
        hover: {
          backgroundColor: '#D97706',
          borderColor: '#D97706',
          color: Colors.text.inverse,
        },
      },
      error: {
        backgroundColor: Colors.secondary.error,
        color: Colors.text.inverse,
        border: `2px solid ${Colors.secondary.error}`,
        hover: {
          backgroundColor: '#DC2626',
          borderColor: '#DC2626',
          color: Colors.text.inverse,
        },
      },
    };

    return variants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: {
        padding: `${Spacing.sm} ${Spacing.md}`,
        fontSize: Typography.fontSize.bodySmall,
        minHeight: '2rem',
      },
      md: {
        padding: `${Spacing.md} ${Spacing.lg}`,
        fontSize: Typography.fontSize.bodyMedium,
        minHeight: '2.5rem',
      },
      lg: {
        padding: `${Spacing.lg} ${Spacing.xl}`,
        fontSize: Typography.fontSize.bodyLarge,
        minHeight: '3rem',
      },
      xl: {
        padding: `${Spacing.xl} ${Spacing['2xl']}`,
        fontSize: Typography.fontSize.h6,
        minHeight: '3.5rem',
      },
    };

    return sizes[size];
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const buttonStyle: React.CSSProperties = {
    ...sizeStyles,
    backgroundColor: variantStyles.backgroundColor,
    color: variantStyles.color,
    border: variantStyles.border,
    borderRadius: BorderRadius.md,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.semibold,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? Spacing.sm : 0,
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    outline: 'none',
    position: 'relative',
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      const target = e.currentTarget;
      if (variantStyles.hover.backgroundColor) {
        target.style.backgroundColor = variantStyles.hover.backgroundColor;
      }
      if (variantStyles.hover.borderColor) {
        target.style.borderColor = variantStyles.hover.borderColor;
      }
      if (variantStyles.hover.color) {
        target.style.color = variantStyles.hover.color;
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      const target = e.currentTarget;
      target.style.backgroundColor = variantStyles.backgroundColor;
      target.style.borderColor = variantStyles.border.split(' ')[2];
      target.style.color = variantStyles.color;
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
      className={className}
      disabled={disabled || loading}
    >
      {loading && (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            border: `2px solid ${variantStyles.color}`,
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && icon}
      
      {!loading && children}
      
      {!loading && icon && iconPosition === 'right' && icon}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};
