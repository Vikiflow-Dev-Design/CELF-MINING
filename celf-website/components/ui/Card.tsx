'use client';

import React from 'react';
import { Colors, BorderRadius, Shadows, Spacing } from '@/lib/constants/design-tokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'lg',
  className = '',
  style = {},
  onClick,
  hover = false,
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    const variants = {
      default: {
        backgroundColor: Colors.background.primary,
        border: `1px solid ${Colors.border.secondary}`,
        boxShadow: Shadows.sm,
      },
      elevated: {
        backgroundColor: Colors.background.primary,
        border: 'none',
        boxShadow: Shadows.lg,
      },
      outlined: {
        backgroundColor: Colors.background.primary,
        border: `2px solid ${Colors.border.primary}`,
        boxShadow: 'none',
      },
      filled: {
        backgroundColor: Colors.background.secondary,
        border: 'none',
        boxShadow: 'none',
      },
    };

    return variants[variant];
  };

  const getPaddingStyles = (): React.CSSProperties => {
    const paddingStyles = {
      none: { padding: 0 },
      sm: { padding: Spacing.md },
      md: { padding: Spacing.lg },
      lg: { padding: Spacing.xl },
      xl: { padding: Spacing['2xl'] },
    };

    return paddingStyles[padding];
  };

  const getHoverStyles = (): React.CSSProperties => {
    if (!hover && !onClick) return {};

    return {
      transition: 'all 0.2s ease-in-out',
      cursor: onClick ? 'pointer' : 'default',
    };
  };

  const cardStyles: React.CSSProperties = {
    borderRadius: BorderRadius.lg,
    ...getVariantStyles(),
    ...getPaddingStyles(),
    ...getHoverStyles(),
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hover || onClick) {
      const target = e.currentTarget;
      target.style.transform = 'translateY(-2px)';
      target.style.boxShadow = Shadows.xl;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hover || onClick) {
      const target = e.currentTarget;
      target.style.transform = 'translateY(0)';
      target.style.boxShadow = getVariantStyles().boxShadow || 'none';
    }
  };

  return (
    <div
      className={className}
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
