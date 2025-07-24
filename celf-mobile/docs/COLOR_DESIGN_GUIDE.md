# CELF Mobile App - Color Design Guide

## 🎨 Overview

This guide establishes a unified color strategy for the CELF mobile app, focusing on simplicity, consistency, and brand recognition. The goal is to reduce color complexity while maintaining visual hierarchy and user experience.

## 🎯 Design Principles

### 1. **Color Hierarchy**
- **Primary**: Brand blue for main actions and navigation
- **Accent**: Orange for mining and special features only
- **Neutral**: Grays for text, backgrounds, and supporting elements
- **Status**: Functional colors for feedback only

### 2. **Simplicity First**
- Limit color variety to prevent visual noise
- Use neutral colors as the foundation
- Reserve bright colors for important actions
- Maintain consistent color meanings across the app

### 3. **Brand Recognition**
- Primary blue (`#1E40AF`) as the main brand color
- Orange accent (`#F59E0B`) for mining-specific features
- Clean, professional appearance with crypto-inspired touches

## 🔵 Primary Colors

### Primary Blue (`#1E40AF`)
**When to use:**
- Primary buttons and CTAs
- Active navigation states
- Selected items and tabs
- Main brand elements
- Primary icons and actions

**Where to use:**
- Start Mining button (when inactive)
- Primary navigation items
- Active sidebar selections
- Main action buttons
- Important links and controls

**Why this color:**
- Establishes strong brand identity
- Conveys trust and professionalism
- Guides user attention to key actions

### Primary Blue Light (`#3B82F6`)
**When to use:**
- Hover states for primary elements
- Secondary emphasis
- Gradient combinations

### Primary Blue Dark (`#1E3A8A`)
**When to use:**
- Pressed states for primary buttons
- High emphasis elements
- Dark theme variations

## 🟡 Accent Colors

### Accent Orange (`#F59E0B`)
**When to use:**
- Mining-specific features ONLY
- Active mining states
- Mining rewards and earnings
- Special achievements related to mining

**Where to use:**
- Mining button when active
- Mining statistics and counters
- Mining-related notifications
- Reward indicators

**Why this color:**
- Creates excitement around mining
- Differentiates mining from other features
- Adds warmth to the professional blue palette

### ⚠️ Important: Accent Color Restrictions
- **DO NOT** use orange for general navigation
- **DO NOT** use orange for non-mining features
- **DO NOT** use orange for regular buttons or actions

## ⚫ Neutral Colors

### Text Colors
```typescript
// Primary text - main content, headings
color: Colors.neutral[900] // #111827

// Secondary text - supporting content, descriptions
color: Colors.neutral[700] // #374151

// Tertiary text - captions, metadata, placeholders
color: Colors.neutral[500] // #6B7280

// Disabled text
color: Colors.neutral[400] // #9CA3AF
```

### Background Colors
```typescript
// Primary background - main app background
backgroundColor: Colors.neutral.white // #FFFFFF

// Secondary background - cards, sections
backgroundColor: Colors.neutral[50] // #F9FAFB

// Tertiary background - subtle sections
backgroundColor: Colors.neutral[100] // #F3F4F6
```

### Border Colors
```typescript
// Primary borders - cards, inputs
borderColor: Colors.neutral[300] // #D1D5DB

// Secondary borders - subtle dividers
borderColor: Colors.neutral[200] // #E5E7EB
```

## 🔧 Icon Color System

### Icon Color Hierarchy
```typescript
// Primary icons - main navigation, key actions
color: Colors.icon.primary // #1E40AF (Primary Blue)

// Secondary icons - supporting actions, decorative
color: Colors.icon.secondary // #4B5563 (Neutral 600)

// Tertiary icons - minimal emphasis, arrows, chevrons
color: Colors.icon.tertiary // #9CA3AF (Neutral 400)

// Accent icons - mining features only
color: Colors.icon.accent // #F59E0B (Orange)

// Inverse icons - on dark backgrounds
color: Colors.icon.inverse // #FFFFFF (White)
```

### Icon Usage Examples

**Primary Icons (Blue):**
- Main navigation icons (when active)
- Primary action buttons
- Important feature icons
- Brand-related icons

**Secondary Icons (Gray 600):**
- Inactive navigation icons
- Supporting action icons
- Profile and settings icons
- General feature icons

**Tertiary Icons (Gray 400):**
- Chevron arrows
- Decorative icons
- Placeholder icons
- Minimal emphasis elements

**Accent Icons (Orange):**
- Mining-related icons only
- Active mining indicators
- Mining rewards and achievements

## 🟢 Status Colors

### Success Green (`#10B981`)
**When to use:**
- Success messages and notifications
- Completed states
- Positive feedback
- Confirmation indicators

### Error Red (`#EF4444`)
**When to use:**
- Error messages and alerts
- Failed states
- Destructive actions
- Critical warnings

### Warning Orange (`#F59E0B`)
**When to use:**
- Warning messages
- Pending states
- Caution indicators
- Important notices

### Info Cyan (`#06B6D4`)
**When to use:**
- Informational messages
- Tips and hints
- Neutral notifications
- Help indicators

## 📱 Screen-Specific Guidelines

### Mining Screen
- **Background**: White/Light gray
- **Mining Button**: Blue (inactive) → Orange (active)
- **Stats**: Primary blue for labels, neutral for values
- **Icons**: Orange for mining-related, blue for navigation

### Wallet Screen
- **Background**: Gradient (blue tones) for balance card
- **Buttons**: Primary blue for main actions
- **Icons**: Blue for primary actions, gray for secondary
- **Text**: White on gradient, dark on white backgrounds

### Navigation (Sidebar)
- **All Icons**: Use consistent blue for active, gray for inactive
- **Remove**: Individual colors per menu item
- **Background**: Clean white with subtle shadows

### Profile Screen
- **Icons**: Consistent gray for menu items
- **Buttons**: Primary blue for main actions
- **Avatar**: Neutral background with gray icon

## 🚫 What NOT to Do

1. **Don't** use multiple colors in navigation menus
2. **Don't** use orange for non-mining features
3. **Don't** use status colors for decorative purposes
4. **Don't** mix warm and cool colors randomly
5. **Don't** use more than 3 colors in a single component

## ✅ Implementation Checklist

- [x] Update sidebar navigation to use consistent icon colors
- [x] Standardize all icon colors using the new icon color system
- [x] Remove individual colors from menu items
- [x] Ensure mining features use accent orange consistently
- [x] Update quick actions to use unified color scheme
- [x] Update header component icons
- [x] Update profile screen icons
- [x] Update mining button colors
- [x] Update wallet screen icon colors
- [ ] Review all gradients and reduce to essential ones only
- [ ] Test color accessibility and contrast ratios
- [x] Update style guide documentation

## 🔄 Migration Strategy

1. **Phase 1**: Update design tokens (✅ Complete)
2. **Phase 2**: Update navigation components (✅ Complete)
3. **Phase 3**: Standardize icon colors across all screens (✅ Complete)
4. **Phase 4**: Optimize mining screen colors (✅ Complete)
5. **Phase 5**: Final testing and documentation (🔄 In Progress)

## 📋 Changes Implemented

### Design Tokens Updated
- Added new `Colors.accent` system for mining features
- Added new `Colors.icon` hierarchy for consistent icon colors
- Maintained backward compatibility with existing color system

### Components Updated
1. **Sidebar Navigation** (`components/navigation/Sidebar.tsx`)
   - Removed individual menu item colors
   - Implemented unified blue/gray system
   - Active items: Primary blue background + blue icons
   - Inactive items: Transparent background + gray icons

2. **Header Component** (`components/navigation/Header.tsx`)
   - Updated menu icon to use `Colors.icon.primary`

3. **Quick Actions** (`app/(app)/mining/components/QuickActions.tsx`)
   - Simplified from multiple colors to single primary blue
   - Consistent visual hierarchy across all action cards

4. **Social Links** (`app/(app)/mining/components/Socials.tsx`)
   - Updated to use `Colors.icon.primary` for main icons
   - Updated to use `Colors.icon.tertiary` for chevron arrows

5. **Profile Screen** (`app/(app)/profile/index.tsx`)
   - Updated menu item icons to use `Colors.icon.secondary`
   - Updated chevron arrows to use `Colors.icon.tertiary`
   - Updated profile placeholder icon to use `Colors.icon.tertiary`

6. **Mining Button** (`app/(app)/mining/components/MiningButton.tsx`)
   - Updated to use `Colors.accent.main` for active mining state
   - Updated icon to use `Colors.icon.inverse`

7. **Button Component** (`components/ui/Button.tsx`)
   - Updated mining variant to use `Colors.accent.main`

8. **Wallet Screen** (`app/(app)/wallet/index.tsx`)
   - Updated indicator dots to use `Colors.icon.inverse`

## 🌙 Dark Theme Implementation

### Theme System Architecture
- **Theme Context** (`contexts/ThemeContext.tsx`) - Manages theme state and persistence
- **Theme Hook** (`hooks/useThemeColors.ts`) - Provides theme-aware colors
- **Design Tokens** - Extended with dark theme color variants
- **Secure Storage** - Theme preference persisted using expo-secure-store

### Dark Theme Colors
```typescript
// Dark Theme Color Palette
dark: {
  background: {
    primary: '#0F172A',    // Main dark background (slate-900)
    secondary: '#1E293B',  // Card backgrounds (slate-800)
    tertiary: '#334155',   // Elevated surfaces (slate-700)
  },
  text: {
    primary: '#F8FAFC',    // Main text (slate-50)
    secondary: '#CBD5E1',  // Secondary text (slate-300)
    tertiary: '#94A3B8',   // Tertiary text (slate-400)
    inverse: '#0F172A',    // Inverse text (dark on light)
  },
  border: {
    primary: '#475569',    // Primary borders (slate-600)
    secondary: '#334155',  // Secondary borders (slate-700)
  },
  icon: {
    primary: '#3B82F6',    // Primary icons (blue-500, brighter for dark)
    secondary: '#94A3B8',  // Secondary icons (slate-400)
    tertiary: '#64748B',   // Tertiary icons (slate-500)
    // Accent and status colors remain the same
  },
}
```

### Theme Usage Examples
```typescript
// Using theme colors in components
const themeColors = useThemeColors();

// Background colors
backgroundColor: themeColors.background.primary

// Text colors
color: themeColors.text.primary

// Icon colors
color: themeColors.icon.secondary

// Theme-aware status bar
<StatusBar barStyle={themeColors.statusBar} />
```

### Settings Screen
- **Location**: `app/(app)/settings/index.tsx`
- **Features**: Theme toggle switch, app preferences, navigation to other settings
- **Theme Toggle**: Instantly switches between light and dark themes
- **Persistence**: Theme preference saved securely and restored on app restart

### Components Updated for Dark Theme
1. **Core UI Components**
   - Card, Typography, Button, Header components
   - All use `useThemeColors()` hook for theme-aware styling

2. **Navigation Components**
   - Sidebar with dark theme support
   - Header with theme-aware status bar

3. **Screen Components**
   - Mining, Wallet, Profile screens
   - Settings screen with theme toggle

4. **Mining Components**
   - MiningButton, QuickActions, Socials components
   - All icons and backgrounds adapt to theme

### Testing Dark Theme
1. **Manual Testing**
   - Navigate to Settings screen
   - Toggle "Dark Theme" switch
   - Verify all screens adapt correctly
   - Check icon colors and contrast
   - Test navigation between screens

2. **Theme Persistence**
   - Toggle theme and restart app
   - Verify theme preference is restored
   - Test with different theme settings

3. **Component Testing**
   - Verify all UI components render correctly in both themes
   - Check text readability and contrast
   - Ensure icons are visible and properly colored

### Implementation Benefits
- **Consistent Experience**: All components automatically adapt to theme changes
- **Performance**: Theme colors cached and efficiently updated
- **Accessibility**: Improved contrast and readability in dark mode
- **User Preference**: Theme choice persisted across app sessions
- **Developer Experience**: Simple `useThemeColors()` hook for theme-aware styling

---

*This guide ensures a cohesive, professional, and user-friendly color experience throughout the CELF mobile app.*
