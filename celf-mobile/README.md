# CELF Mobile App

A next-generation cryptocurrency mining mobile application built with React Native and Expo. CELF enables users to mine digital assets effortlessly through their mobile devices, featuring a comprehensive ecosystem similar to Pi Network, Bee Network, and other successful crypto mining platforms.

## 🚀 Quick Start

### Prerequisites

Ensure you have the `.env` file with your Clerk configuration:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on specific platforms
npm run android  # Android emulator
npm run ios      # iOS simulator
npm run web      # Web browser
```

## 📱 Key Features

- **🔨 One-Tap Mining**: Effortless cryptocurrency mining with session tracking
- **💰 Digital Wallet**: Secure balance management, send/receive tokens
- **👥 Referral System**: Invite friends and earn mining bonuses
- **📱 Social Integration**: Multi-platform social media feed integration
- **🏆 Gamification**: Achievement system with badges and daily challenges
- **🔐 Secure Authentication**: Multiple login options with biometric support
- **🌐 Cross-Platform**: iOS, Android, and Web support

## 🏗️ Architecture

### Screen Structure (52 Total Screens)

- **Pre-Auth**: Splash, updates, maintenance (3 screens)
- **Authentication**: Welcome, signup, login flows (9 screens)
- **Onboarding**: Profile setup, tutorials (4 screens)
- **Main App**: Mining, wallet, referrals, profile, social (5 screens)
- **Settings**: Account and app management (3 screens)
- **Wallet**: Send, receive, transaction history (5 screens)
- **Gamification**: Achievements, challenges (4 screens)
- **Support**: Help, terms, privacy (3 screens)
- **Modals**: Confirmations, info dialogs (6 screens)
- **States**: Loading, error, empty states (10 screens)

### Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Authentication**: Clerk (with custom CELF branding)
- **Styling**: NativeWind (Tailwind CSS) + Design Tokens
- **State Management**: React hooks and context
- **Animations**: React Native Reanimated
- **UI Components**: Custom design system

## 📚 Documentation

All comprehensive documentation is organized in the [`/docs`](./docs) folder:

### 📖 Essential Reading

- **[📋 Complete Documentation Index](./docs/README.md)** - Start here for navigation
- **[🏗️ Project Architecture](./docs/CELF-README.MD)** - Complete 52-screen specification
- **[🎨 Style Guide](./docs/STYLE_GUIDE.md)** - Complete design system
- **[💻 Implementation Guide](./docs/STYLE_GUIDE_IMPLEMENTATION.md)** - Code examples and patterns
- **[📄 Visual Breakdown](./docs/CELF%20Mining%20App%20-%20Updated%20Screen%20Breakdown.pdf)** - Screen mockups and flows

### 🎯 Quick Links by Role

**👨‍💻 Developers**

1. [Style Guide](./docs/STYLE_GUIDE.md) - Design system overview
2. [Implementation Guide](./docs/STYLE_GUIDE_IMPLEMENTATION.md) - Code examples
3. [Design Tokens](./constants/design-tokens.ts) - Centralized constants

**🎨 Designers**

1. [Style Guide](./docs/STYLE_GUIDE.md) - Complete design specifications
2. [Screen Architecture](./docs/CELF-README.MD) - All 52 screen details
3. [Visual Reference](./docs/CELF%20Mining%20App%20-%20Updated%20Screen%20Breakdown.pdf) - Mockups

**📊 Project Managers**

1. [Project Overview](./docs/CELF-README.MD) - Feature specifications
2. [Documentation Index](./docs/README.md) - Complete resource guide

## 🎨 Design System & Styling

The CELF app uses a hybrid styling approach combining NativeWind with design tokens:

### Design System Features

- **Color Palette**: Professional blue primary with crypto-inspired accents
- **Typography**: Inter font family with 8-level hierarchy
- **Spacing**: 4pt grid system for consistent layouts
- **Components**: Reusable UI components with multiple variants
- **Accessibility**: WCAG AA compliant with screen reader support
- **Animations**: Smooth transitions with haptic feedback

### Styling Implementation

```typescript
import { Colors, Typography, Spacing } from "@/constants/design-tokens";
import { Button } from "@/components/ui/Button";

// NativeWind for layout and common styles
<View className="flex-1 bg-white p-4">
  <Text
    className="text-2xl font-bold mb-4"
    style={{ color: Colors.primary.blue }}
  >
    Welcome to CELF
  </Text>
  // Custom components with design tokens
  <Button
    title="Start Mining"
    variant="mining"
    className="w-full mt-6"
    onPress={handleStartMining}
  />
</View>;
```

### 🔐 Authentication with Clerk

- **Custom Branding**: Clerk auth templates modified for CELF design
- **Multiple Options**: Email, phone, Google, Apple, Facebook login
- **Secure**: Built-in session management and user profiles
- **Environment**: Pre-configured with Clerk publishable key

## 🌟 Similar Apps

CELF draws inspiration from successful crypto mining platforms:

1. **Pi Network** - Pioneer in mobile crypto mining
2. **Lither Mine** - Mining with social features
3. **Bee Network** - Community-focused mining
4. **Star Network** - Gamified mining experience
5. **Sunwaves Network** - Social mining platform

## 🛠️ Development

### Project Structure

```
celf-mobile-app/
├── app/                    # Expo Router pages
├── components/             # Reusable UI components
│   └── ui/                # Design system components
├── constants/              # Design tokens and constants
├── docs/                   # All documentation
├── assets/                 # Images, fonts, icons
└── package.json           # Dependencies and scripts
```

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run reset-project  # Reset to blank project
```

### Environment Setup

1. Install [Node.js](https://nodejs.org/) (v18 or later)
2. Install [Expo CLI](https://docs.expo.dev/get-started/installation/)
3. Set up [development environment](https://docs.expo.dev/get-started/set-up-your-environment/)

## 🤝 Contributing

1. **Follow Design System**: Use design tokens and component patterns
2. **Update Documentation**: Keep docs current with changes
3. **Test Accessibility**: Ensure WCAG compliance
4. **Cross-Platform Testing**: Verify iOS, Android, and Web
5. **Performance**: Follow optimization best practices

## 📄 License

This project is proprietary software for CELF cryptocurrency platform.

## 📞 Support

- **Documentation**: See [`/docs`](./docs) folder for comprehensive guides
- **Issues**: Report bugs and feature requests through project channels
- **Development**: Follow setup instructions in documentation

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Platform**: React Native + Expo  
**Supported Platforms**: iOS, Android, Web
