/**
 * Password Input Component with Visibility Toggle
 * Reusable password input with show/hide functionality and strength indicator
 */

'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPasswordStrength } from '@/src/lib/validation';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  showStrengthIndicator?: boolean;
  containerClassName?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  showStrengthIndicator = false,
  containerClassName,
  className,
  value = '',
  onChange,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const passwordStrength = showStrengthIndicator ? getPasswordStrength(value as string) : null;
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'fair': return 'bg-orange-500';
      case 'good': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthTextColor = (strength: string) => {
    switch (strength) {
      case 'weak': return 'text-red-600';
      case 'fair': return 'text-orange-600';
      case 'good': return 'text-yellow-600';
      case 'strong': return 'text-green-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={cn('space-y-2', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            'pr-10', // Add padding for the eye icon
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
        
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          tabIndex={-1}
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {/* Password Strength Indicator */}
      {showStrengthIndicator && value && passwordStrength && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    'h-2 flex-1 rounded-full transition-colors',
                    level <= passwordStrength.score
                      ? getStrengthColor(passwordStrength.strength)
                      : 'bg-gray-200 dark:bg-gray-700'
                  )}
                />
              ))}
            </div>
            <span className={cn(
              'text-xs font-medium capitalize',
              getStrengthTextColor(passwordStrength.strength)
            )}>
              {passwordStrength.strength}
            </span>
          </div>
          
          {passwordStrength.feedback.length > 0 && (
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-1">Password requirements:</p>
              <ul className="space-y-1">
                {passwordStrength.feedback.map((feedback, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <span className="text-gray-400">•</span>
                    <span>{feedback}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
