# CELF Mobile App Style Guide

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons & Imagery](#icons--imagery)
7. [Animation & Interactions](#animation--interactions)
8. [Platform Guidelines](#platform-guidelines)
9. [Accessibility](#accessibility)
10. [Code Standards](#code-standards)

---

## Brand Identity

### Vision
CELF is a next-generation cryptocurrency mining platform that empowers users to mine digital assets effortlessly through mobile devices. Our design reflects trust, innovation, and accessibility in the blockchain ecosystem.

### Brand Personality
- **Trustworthy**: Professional, secure, and reliable
- **Innovative**: Modern, cutting-edge, and forward-thinking
- **Accessible**: User-friendly, inclusive, and approachable
- **Energetic**: Dynamic, engaging, and motivating

### Logo Usage
- Primary logo: Full CELF wordmark with symbol
- Secondary: Symbol only for small spaces
- Minimum size: 24px height for digital
- Clear space: 2x logo height on all sides

---

## Color System

### Primary Colors
```
Primary Blue: #1E40AF
- Usage: Primary actions, mining button, active states
- Accessibility: WCAG AA compliant with white text

Primary Light: #3B82F6
- Usage: Hover states, secondary actions
- Accessibility: WCAG AA compliant with white text

Primary Dark: #1E3A8A
- Usage: Pressed states, emphasis
```

### Secondary Colors
```
Success Green: #10B981
- Usage: Positive actions, earnings, confirmations
- RGB: (16, 185, 129)

Warning Orange: #F59E0B
- Usage: Alerts, pending states, notifications
- RGB: (245, 158, 11)

Error Red: #EF4444
- Usage: Errors, destructive actions, failures
- RGB: (239, 68, 68)

Info Cyan: #06B6D4
- Usage: Information, tips, neutral actions
- RGB: (6, 182, 212)
```

### Neutral Colors
```
Gray 900: #111827 (Text Primary)
Gray 700: #374151 (Text Secondary)
Gray 500: #6B7280 (Text Tertiary)
Gray 300: #D1D5DB (Borders)
Gray 100: #F3F4F6 (Background Light)
Gray 50: #F9FAFB (Background Lightest)
White: #FFFFFF (Background)
Black: #000000 (Text Emphasis)
```

### Gradient System
```
Primary Gradient: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)
Success Gradient: linear-gradient(135deg, #10B981 0%, #34D399 100%)
Mining Gradient: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)
```

---

## Typography

### Font Family
- **Primary**: Inter (System fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI')
- **Monospace**: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono'

### Type Scale
```
Display Large: 48px / 56px (3rem / 3.5rem)
Display Medium: 40px / 48px (2.5rem / 3rem)
Display Small: 32px / 40px (2rem / 2.5rem)

Heading 1: 28px / 36px (1.75rem / 2.25rem) - Bold
Heading 2: 24px / 32px (1.5rem / 2rem) - Bold
Heading 3: 20px / 28px (1.25rem / 1.75rem) - Semibold
Heading 4: 18px / 24px (1.125rem / 1.5rem) - Semibold

Body Large: 18px / 28px (1.125rem / 1.75rem) - Regular
Body Medium: 16px / 24px (1rem / 1.5rem) - Regular
Body Small: 14px / 20px (0.875rem / 1.25rem) - Regular

Caption: 12px / 16px (0.75rem / 1rem) - Medium
Overline: 10px / 16px (0.625rem / 1rem) - Bold, Uppercase
```

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## Spacing & Layout

### Spacing Scale (4pt Grid System)
```
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 12px (0.75rem)
lg: 16px (1rem)
xl: 20px (1.25rem)
2xl: 24px (1.5rem)
3xl: 32px (2rem)
4xl: 40px (2.5rem)
5xl: 48px (3rem)
6xl: 64px (4rem)
```

### Layout Grid
- **Mobile**: 16px margins, 8px gutters
- **Tablet**: 24px margins, 16px gutters
- **Breakpoints**: 
  - Mobile: 0-767px
  - Tablet: 768-1023px
  - Desktop: 1024px+

### Safe Areas
- **iOS**: Respect safe area insets
- **Android**: Account for system bars
- **Minimum touch target**: 44px x 44px

---

## Components

### Buttons

#### Primary Button
```
Background: Primary Blue (#1E40AF)
Text: White, Body Medium, Semibold
Padding: 12px 24px
Border Radius: 8px
Min Height: 48px
States: Default, Hover, Pressed, Disabled
```

#### Secondary Button
```
Background: Transparent
Border: 2px solid Primary Blue
Text: Primary Blue, Body Medium, Semibold
Padding: 10px 22px
Border Radius: 8px
Min Height: 48px
```

#### Mining Button (Special)
```
Background: Mining Gradient
Text: White, Heading 3, Bold
Padding: 20px 32px
Border Radius: 16px
Min Height: 64px
shadow: 0 8px 24px rgba(245, 158, 11, 0.3)
```

### Cards
```
Background: White
Border Radius: 12px
shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
Padding: 16px
Border: 1px solid Gray 300 (optional)
```

### Input Fields
```
Background: Gray 50
Border: 1px solid Gray 300
Border Radius: 8px
Padding: 12px 16px
Text: Body Medium
Focus: Border Primary Blue, shadow 0 0 0 3px rgba(30, 64, 175, 0.1)
```

### Navigation
```
Tab Bar Height: 80px (including safe area)
Tab Item: 44px min touch target
Active Color: Primary Blue
Inactive Color: Gray 500
Background: White with 1px top border Gray 300
```

---

## Icons & Imagery

### Icon System
- **Library**: @expo/vector-icons (Ionicons, MaterialIcons)
- **Sizes**: 16px, 20px, 24px, 32px, 48px
- **Style**: Outlined (primary), Filled (emphasis)
- **Color**: Inherit from parent or semantic colors

### Key Icons
```
Mining: ⛏️ (pickaxe, gear, lightning)
Wallet: 💰 (wallet, coins, money)
Profile: 👤 (person, account, user)
Referrals: 👥 (people, share, network)
Social: 📱 (social media platform icons)
Settings: ⚙️ (gear, cog, preferences)
```

### Image Guidelines
- **Format**: PNG for icons, JPEG for photos, SVG for illustrations
- **Density**: @1x, @2x, @3x for React Native
- **Optimization**: Compress images, use appropriate formats
- **Accessibility**: Provide alt text for all images

---

## Animation & Interactions

### Timing Functions
```
Ease Out: cubic-bezier(0.0, 0.0, 0.2, 1)
Ease In: cubic-bezier(0.4, 0.0, 1, 1)
Ease In Out: cubic-bezier(0.4, 0.0, 0.2, 1)
```

### Duration
```
Fast: 150ms (micro-interactions)
Medium: 250ms (standard transitions)
Slow: 350ms (complex animations)
```

### Common Animations
- **Button Press**: Scale 0.95, 150ms ease-out
- **Page Transition**: Slide 250ms ease-out
- **Loading**: Rotation 1s linear infinite
- **Mining Active**: Pulse 2s ease-in-out infinite

### Haptic Feedback
- **Light**: Button taps, selections
- **Medium**: Confirmations, toggles
- **Heavy**: Errors, important actions

---

## Platform Guidelines

### iOS Specific
- Use SF Symbols when available
- Respect iOS Human Interface Guidelines
- Implement proper navigation patterns
- Support Dynamic Type
- Use iOS-style alerts and modals

### Android Specific
- Follow Material Design principles
- Use Android-style navigation
- Implement proper back button behavior
- Support Android accessibility services
- Use Android-style notifications

### Cross-Platform Considerations
- Consistent core functionality
- Platform-appropriate UI patterns
- Shared design tokens
- Unified brand experience

---

## Accessibility

### Color Contrast
- **Normal Text**: 4.5:1 minimum ratio
- **Large Text**: 3:1 minimum ratio
- **UI Elements**: 3:1 minimum ratio

### Focus Management
- Visible focus indicators
- Logical tab order
- Skip links for navigation
- Focus trapping in modals

### Screen Reader Support
- Semantic HTML/React Native elements
- Descriptive labels and hints
- Proper heading hierarchy
- Alternative text for images

### Motor Accessibility
- Minimum 44px touch targets
- Adequate spacing between interactive elements
- Support for assistive technologies
- Alternative input methods

---

## Code Standards

### File Organization
```
/components
  /ui (reusable UI components)
  /forms (form-specific components)
  /navigation (navigation components)
/styles
  /tokens (design tokens)
  /themes (theme definitions)
  /utilities (utility styles)
/constants
  /colors.ts
  /typography.ts
  /spacing.ts
```

### Naming Conventions
- **Components**: PascalCase (e.g., `MiningButton`)
- **Files**: kebab-case (e.g., `mining-button.tsx`)
- **Props**: camelCase (e.g., `isActive`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `PRIMARY_BLUE`)

### Style Implementation
```typescript
// Use StyleSheet.create for performance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
});

// Use design tokens
import { Colors, Typography, Spacing } from '@/constants';
```

### Component Structure
```typescript
interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  // Component implementation
};
```

---

## Implementation Notes

1. **Design Tokens**: Create centralized constants for colors, typography, and spacing
2. **Theme Support**: Implement light/dark theme switching
3. **Responsive Design**: Use flexible layouts and appropriate breakpoints
4. **Performance**: Optimize images, use lazy loading, minimize re-renders
5. **Testing**: Include accessibility testing in QA process
6. **Documentation**: Keep this style guide updated with design changes

---

*Last Updated: January 2025*
*Version: 1.0.0*
