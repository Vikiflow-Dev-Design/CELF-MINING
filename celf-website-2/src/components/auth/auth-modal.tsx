/**
 * Authentication Modal Component
 * Modal that switches between login and register forms
 */

'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  const handleSwitchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Form Content */}
          <div className="p-6">
            {mode === 'login' ? (
              <LoginForm
                onSwitchToRegister={handleSwitchMode}
                onSuccess={handleSuccess}
                className="shadow-none border-0 p-0"
              />
            ) : (
              <RegisterForm
                onSwitchToLogin={handleSwitchMode}
                onSuccess={handleSuccess}
                className="shadow-none border-0 p-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Auth Button Component
 * Button that opens the auth modal
 */
interface AuthButtonProps {
  mode?: 'login' | 'register';
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  mode = 'login',
  children,
  className,
  variant = 'default'
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    console.log('Authentication successful!');
    // You can add additional success handling here
  };

  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4",
    ghost: "hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
  };

  return (
    <>
      <button
        onClick={openModal}
        className={cn(baseClasses, variantClasses[variant], className)}
      >
        {children}
      </button>
      
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialMode={mode}
        onSuccess={handleSuccess}
      />
    </>
  );
};

/**
 * Auth Pages Component
 * Full page authentication (for dedicated auth routes)
 */
interface AuthPagesProps {
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({
  initialMode = 'login',
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const handleSwitchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {mode === 'login' ? (
          <LoginForm
            onSwitchToRegister={handleSwitchMode}
            onSuccess={onSuccess}
          />
        ) : (
          <RegisterForm
            onSwitchToLogin={handleSwitchMode}
            onSuccess={onSuccess}
          />
        )}
      </div>
    </div>
  );
};
