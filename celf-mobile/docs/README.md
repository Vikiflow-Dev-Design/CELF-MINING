# CELF Mobile App Documentation

Welcome to the CELF Mobile App documentation hub. This folder contains all the essential documentation for understanding, developing, and maintaining the CELF cryptocurrency mining mobile application.

## 📚 Documentation Index

### 🏗️ Project Architecture & Specifications

#### [CELF-README.MD](./CELF-README.MD)

**Core Project Specification**

- Complete screen navigation structure (52 screens)
- Detailed feature breakdown for mining app
- User flow examples and screen descriptions
- Main app screens and navigation structure
- Modal, popup, and error state specifications

#### [CELF Mining App - Updated Screen Breakdown.pdf](./CELF%20Mining%20App%20-%20Updated%20Screen%20Breakdown.pdf)

**Visual Screen Breakdown**

- PDF document with detailed screen specifications
- Visual mockups and wireframes
- Updated screen flow diagrams

### 🎨 Design System & Style Guide

#### [STYLE_GUIDE.md](./STYLE_GUIDE.md)

**Complete Design System**

- Brand identity and personality guidelines
- Color system with hex codes and usage rules
- Typography scale and font specifications
- Spacing system based on 4pt grid
- Component specifications (buttons, cards, inputs)
- Icon and imagery guidelines
- Animation and interaction patterns
- Platform-specific guidelines (iOS/Android)
- Accessibility standards and requirements
- Code implementation standards

#### [STYLE_GUIDE_IMPLEMENTATION.md](./STYLE_GUIDE_IMPLEMENTATION.md)

**Practical Implementation Guide**

- Code examples for using design tokens
- Component implementation patterns
- Color usage guidelines with examples
- Typography implementation examples
- Spacing and animation code samples
- Responsive design techniques
- Accessibility implementation
- Performance best practices
- Testing strategies
- Common UI patterns and components

## 🗂️ Quick Reference

### For Developers

1. **Start Here**: [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Understand the design system
2. **Implementation**: [STYLE_GUIDE_IMPLEMENTATION.md](./STYLE_GUIDE_IMPLEMENTATION.md) - See code examples
3. **Architecture**: [CELF-README.MD](./CELF-README.MD) - Understand app structure

### For Designers

1. **Design System**: [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Complete design specifications
2. **Screen Flows**: [CELF-README.MD](./CELF-README.MD) - All 52 screen specifications
3. **Visual Reference**: [CELF Mining App - Updated Screen Breakdown.pdf](./CELF%20Mining%20App%20-%20Updated%20Screen%20Breakdown.pdf)

### For Project Managers

1. **Project Overview**: [CELF-README.MD](./CELF-README.MD) - Complete feature list
2. **Technical Setup**: See development setup below

## 🎯 Key Features Overview

The CELF mobile app is a cryptocurrency mining application similar to Pi Network, Bee Network, Star Network, and Sunwaves Network. Key features include:

### Core Functionality

- **Mining System**: One-tap mining with session tracking
- **Wallet Management**: Balance display, send/receive tokens
- **Referral System**: Invite friends and earn bonuses
- **Social Integration**: Multi-platform social media feed
- **Achievement System**: Gamification with badges and challenges

### Technical Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router with file-based routing
- **Language**: TypeScript
- **State Management**: Zustand for global state
- **Styling**: NativeWind (Tailwind CSS for React Native) + Design Tokens
- **State Management**: React hooks and context
- **Animations**: React Native Reanimated
- **Platform Support**: iOS, Android, and Web

## 🚀 Development Setup

### Prerequisites

1. **Environment Setup**: Ensure you have Node.js and Expo CLI installed

### Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## 🔧 Key Implementation Details

### 🏗️ App Architecture

The CELF app follows a clean, modular architecture:

- **File-based Routing**: Expo Router for intuitive navigation structure
- **Component Organization**: Reusable UI components with design system integration
- **State Management**: Zustand stores for global state (mining, wallet, settings)
- **Type Safety**: Full TypeScript implementation for better development experience
- **Performance**: Optimized for smooth animations and responsive interactions

**Main App Screens**:

- Mining dashboard with real-time balance updates
- Wallet management with transaction history
- Referral system with sharing capabilities
- Social features and community interaction
- Settings and profile management

### 🎨 Styling with NativeWind

The app uses **NativeWind** (Tailwind CSS for React Native) combined with design tokens:

- **Primary Styling**: NativeWind classes for rapid development
- **Design System**: Centralized design tokens for consistency
- **Hybrid Approach**: NativeWind + StyleSheet for complex components
- **Responsive**: Built-in responsive design utilities
- **Performance**: Optimized for React Native performance

**Styling Strategy**:

```typescript
// NativeWind classes for layout and common styles
<View className="flex-1 bg-white p-4">

// Design tokens for brand-specific values
<Text style={{ color: Colors.primary.blue, fontSize: Typography.fontSize.h2 }}>

// Hybrid approach for complex components
<Button className="w-full" style={[styles.miningButton, { backgroundColor: Colors.secondary.warning }]}>
```

## 🔗 Related Files

### Design Tokens

- [`/constants/design-tokens.ts`](../constants/design-tokens.ts) - Centralized design system constants

### Example Components

- [`/components/ui/Button.tsx`](../components/ui/Button.tsx) - Example implementation of design system

### Configuration Files

- [`/package.json`](../package.json) - Project dependencies and scripts
- [`/app.json`](../app.json) - Expo configuration
- [`/tsconfig.json`](../tsconfig.json) - TypeScript configuration

## 📱 Similar Apps Reference

The CELF app draws inspiration from these successful crypto mining mobile applications:

1. **Pi Network** - Pioneer in mobile crypto mining
2. **Lither Mine** - Mining with social features
3. **Bee Network** - Community-focused mining
4. **Star Network** - Gamified mining experience
5. **Sunwaves Network** - Social mining platform

## 🤝 Contributing

When contributing to the CELF mobile app:

1. **Follow the Style Guide**: Use the design tokens and component patterns
2. **Maintain Documentation**: Update relevant docs when making changes
3. **Test Accessibility**: Ensure all features meet accessibility standards
4. **Cross-Platform Testing**: Test on iOS, Android, and Web
5. **Performance**: Follow performance best practices outlined in the guides

## 📞 Support & Resources

### Documentation Resources

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

### Community

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

**Last Updated**: January 2025
**Documentation Version**: 1.0.0
**App Version**: 1.0.0
