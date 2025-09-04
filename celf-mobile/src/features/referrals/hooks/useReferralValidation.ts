/**
 * Referral Validation Hook
 * For validating referral codes during registration
 */

import { useState } from 'react';
import { apiService } from '@/services/apiService';

interface ReferralValidationState {
  isValid: boolean | null;
  isValidating: boolean;
  referrer: {
    name: string;
    email: string;
  } | null;
  error: string | null;
}

export const useReferralValidation = () => {
  const [validationState, setValidationState] = useState<ReferralValidationState>({
    isValid: null,
    isValidating: false,
    referrer: null,
    error: null,
  });

  const validateReferralCode = async (code: string) => {
    if (!code || code.trim().length === 0) {
      setValidationState({
        isValid: null,
        isValidating: false,
        referrer: null,
        error: null,
      });
      return;
    }

    setValidationState(prev => ({
      ...prev,
      isValidating: true,
      error: null,
    }));

    try {
      console.log('🔍 useReferralValidation: Validating code:', code);
      const response = await apiService.validateReferralCode(code.trim());

      if (response.success && response.data) {
        const { valid, referrer } = response.data;
        
        setValidationState({
          isValid: valid,
          isValidating: false,
          referrer: referrer || null,
          error: null,
        });

        console.log('✅ useReferralValidation: Validation result:', { valid, referrer });
      } else {
        throw new Error(response.message || 'Validation failed');
      }
    } catch (error) {
      console.error('❌ useReferralValidation: Validation error:', error);
      setValidationState({
        isValid: false,
        isValidating: false,
        referrer: null,
        error: error instanceof Error ? error.message : 'Validation failed',
      });
    }
  };

  const clearValidation = () => {
    setValidationState({
      isValid: null,
      isValidating: false,
      referrer: null,
      error: null,
    });
  };

  return {
    ...validationState,
    validateReferralCode,
    clearValidation,
  };
};
