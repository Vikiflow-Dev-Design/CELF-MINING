/**
 * Splash Screen Data
 * Contains splash screen configuration and constants
 */

import type { SplashConfig } from './types';

/**
 * Splash screen configuration
 */
export const splashConfig: SplashConfig = {
  appName: 'CELF',
  tagline: 'Next-Generation Crypto Mining',
  version: '1.0.0',
  animationDuration: 800,
  navigationDelay: 2500,
};

/**
 * Animation timing configuration
 */
export const animationConfig = {
  logoFadeIn: { duration: 800 },
  logoScale: {
    scaleUp: { duration: 600 },
    scaleDown: { duration: 200 },
  },
  textFadeIn: { duration: 600, delay: 400 },
};
