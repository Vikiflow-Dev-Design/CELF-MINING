'use client';

import React from 'react';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/lib/utils';

export interface ModernActionButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  tooltip?: string;
  badge?: string | number;
  glow?: boolean;
}

export function ModernActionButton({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  onClick,
  disabled = false,
  loading = false,
  className,
  tooltip,
  badge,
  glow = false,
  ...props
}: ModernActionButtonProps) {
  const variantStyles = {
    primary: "bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black hover:from-brand-primary-dark hover:to-brand-primary shadow-glow hover:shadow-xl",
    secondary: "bg-background-secondary/50 border border-border-accent/50 text-text-primary hover:bg-background-secondary hover:border-brand-primary/50",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
  };

  const sizeStyles = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className="relative inline-block group">
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          "relative overflow-hidden transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          glow && "animate-pulse",
          className
        )}
        {...props}
      >
        {/* Loading spinner overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Button content */}
        <div className={cn(
          "flex items-center space-x-2",
          loading && "opacity-0"
        )}>
          {Icon && (
            <Icon className={cn(
              iconSizes[size],
              "transition-transform duration-300 group-hover:scale-110"
            )} />
          )}
          <span className="font-medium">{children}</span>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 border-2 border-background-primary">
            {badge}
          </div>
        )}

        {/* Glow effect */}
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-primary-dark/20 rounded-lg blur-lg -z-10 animate-pulse"></div>
        )}
      </Button>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-background-secondary border border-border-accent/30 text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 backdrop-blur-sm">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background-secondary"></div>
        </div>
      )}
    </div>
  );
}

// Preset action buttons for common admin actions
export const CreateButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="primary" icon={require('lucide-react').Plus} {...props} />
);

export const EditButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="secondary" icon={require('lucide-react').Edit} {...props} />
);

export const DeleteButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="danger" icon={require('lucide-react').Trash2} {...props} />
);

export const ViewButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="info" icon={require('lucide-react').Eye} {...props} />
);

export const RefreshButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="secondary" icon={require('lucide-react').RefreshCw} {...props} />
);

export const SaveButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="success" icon={require('lucide-react').Save} {...props} />
);

export const CancelButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="secondary" icon={require('lucide-react').X} {...props} />
);

export const DownloadButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="info" icon={require('lucide-react').Download} {...props} />
);

export const UploadButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="primary" icon={require('lucide-react').Upload} {...props} />
);

export const SearchButton = (props: Omit<ModernActionButtonProps, 'variant' | 'icon'>) => (
  <ModernActionButton variant="secondary" icon={require('lucide-react').Search} {...props} />
);
