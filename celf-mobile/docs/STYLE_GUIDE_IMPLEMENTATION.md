# CELF Style Guide Implementation

This document provides practical guidance on implementing the CELF design system using NativeWind and design tokens in your React Native components.

## Quick Start

### 1. Import Design Tokens

```typescript
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  shadows,
} from "@/constants/design-tokens";
```

### 2. Hybrid Styling Approach

The CELF app uses **NativeWind** (Tailwind CSS for React Native) combined with design tokens for optimal development experience:

#### NativeWind for Layout & Common Styles

```typescript
// Use NativeWind classes for layout, spacing, and common styles
<View className="flex-1 bg-white p-4 rounded-lg">
  <Text className="text-2xl font-bold mb-4">CELF Mining</Text>
  <Button className="w-full mt-6 px-4 py-3">Start Mining</Button>
</View>
```

#### Design Tokens for Brand-Specific Values

```typescript
// Use design tokens for brand colors, typography, and custom values
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    ...shadows.sm,
  },
  title: {
    fontSize: Typography.fontSize.h2,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
});
```

#### Combined Approach

```typescript
// Best of both worlds - NativeWind + Design Tokens
<View
  className="flex-1 p-4"
  style={{ backgroundColor: Colors.background.primary }}
>
  <Text
    className="text-center mb-6"
    style={{
      fontSize: Typography.fontSize.h1,
      color: Colors.primary.blue,
      fontWeight: Typography.fontWeight.bold,
    }}
  >
    Welcome to CELF
  </Text>
</View>
```

## Authentication with Clerk

### Setup and Configuration

The CELF app uses Clerk for authentication with custom CELF branding. The Clerk publishable key is already configured in your `.env` file:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dHJ1c3RpbmctbGVlY2gtOTkuY2xlcmsuYWNjb3VudHMuZGV2JA
```

### Custom Authentication Screens

Clerk provides authentication templates that we customize with CELF design system:

#### Sign In Screen (Custom CELF Design)

```typescript
import { SignIn } from "@clerk/clerk-expo";
import { Colors, Typography, BorderRadius } from "@/constants/design-tokens";

<View className="flex-1 bg-white">
  <SignIn
    appearance={{
      elements: {
        formButtonPrimary: {
          backgroundColor: Colors.primary.blue,
          fontSize: Typography.fontSize.bodyMedium,
          fontWeight: Typography.fontWeight.semibold,
        },
        card: {
          backgroundColor: Colors.background.primary,
          borderRadius: BorderRadius.lg,
        },
        headerTitle: {
          color: Colors.text.primary,
          fontSize: Typography.fontSize.h2,
          fontWeight: Typography.fontWeight.bold,
        },
      },
    }}
  />
</View>;
```

#### Register Screen (Custom CELF Design)

```typescript
import { SignUp } from "@clerk/clerk-expo";

<View
  className="flex-1 p-4"
  style={{ backgroundColor: Colors.background.secondary }}
>
  <SignUp
    appearance={{
      elements: {
        formButtonPrimary: {
          backgroundColor: Colors.primary.blue,
          borderRadius: BorderRadius.md,
        },
        socialButtonsBlockButton: {
          borderColor: Colors.border.primary,
          color: Colors.text.primary,
        },
      },
    }}
  />
</View>;
```

### Authentication Features

- **Email/Password**: Standard email registration with verification
- **Phone**: SMS-based authentication with OTP
- **Social Logins**: Google, Apple, Facebook integration
- **Security**: Built-in session management and security features
- **Profile Management**: User profile setup and management

## Component Examples

### Mining Button

```typescript
import { Button } from "@/components/ui/Button";

<Button
  title="Start Mining"
  variant="mining"
  size="large"
  onPress={handleStartMining}
  fullWidth
/>;
```

### Card Component

```typescript
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...shadows.md,
    marginBottom: Spacing.md,
  },
});
```

### Balance Display

```typescript
const BalanceCard: React.FC<{ balance: number }> = ({ balance }) => (
  <View style={styles.balanceCard}>
    <Text style={styles.balanceLabel}>Total Balance</Text>
    <Text style={styles.balanceAmount}>{balance.toFixed(4)} CELF</Text>
    <Text style={styles.balanceUsd}>≈ ${(balance * 0.1).toFixed(2)} USD</Text>
  </View>
);

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: "center",
    ...shadows.md,
  },
  balanceLabel: {
    fontSize: Typography.fontSize.bodySmall,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  balanceAmount: {
    fontSize: Typography.fontSize.displaySmall,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  balanceUsd: {
    fontSize: Typography.fontSize.bodyMedium,
    color: Colors.text.tertiary,
  },
});
```

## Color Usage Guidelines

### Primary Colors

- **Primary Blue**: Main actions, active states, primary buttons
- **Primary Light**: Hover states, secondary emphasis
- **Primary Dark**: Pressed states, high emphasis

### Status Colors

```typescript
// Success - for positive actions
backgroundColor: Colors.status.success;

// Warning - for alerts and pending states
backgroundColor: Colors.status.warning;

// Error - for errors and destructive actions
backgroundColor: Colors.status.error;

// Info - for informational content
backgroundColor: Colors.status.info;
```

### Text Colors

```typescript
// Primary text - main content
color: Colors.text.primary;

// Secondary text - supporting content
color: Colors.text.secondary;

// Tertiary text - least important content
color: Colors.text.tertiary;

// Inverse text - on dark backgrounds
color: Colors.text.inverse;
```

## Typography Implementation

### Heading Styles

```typescript
const headingStyles = StyleSheet.create({
  h1: {
    fontSize: Typography.fontSize.h1,
    lineHeight: Typography.lineHeight.h1,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  h2: {
    fontSize: Typography.fontSize.h2,
    lineHeight: Typography.lineHeight.h2,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  h3: {
    fontSize: Typography.fontSize.h3,
    lineHeight: Typography.lineHeight.h3,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
});
```

### Body Text Styles

```typescript
const textStyles = StyleSheet.create({
  bodyLarge: {
    fontSize: Typography.fontSize.bodyLarge,
    lineHeight: Typography.lineHeight.bodyLarge,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.text.primary,
  },
  bodyMedium: {
    fontSize: Typography.fontSize.bodyMedium,
    lineHeight: Typography.lineHeight.bodyMedium,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.text.primary,
  },
  caption: {
    fontSize: Typography.fontSize.caption,
    lineHeight: Typography.lineHeight.caption,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
  },
});
```

## Spacing Guidelines

### Container Spacing

```typescript
// Screen containers
paddingHorizontal: Spacing.lg, // 16px
paddingVertical: Spacing.xl,   // 20px

// Card containers
padding: Spacing.lg,           // 16px

// Section spacing
marginBottom: Spacing['2xl'], // 24px
```

### Element Spacing

```typescript
// Between related elements
marginBottom: Spacing.md,     // 12px

// Between sections
marginBottom: Spacing['3xl'], // 32px

// Icon spacing
marginRight: Spacing.sm,      // 8px
```

## Animation Examples

### Button Press Animation

```typescript
import { Animated } from "react-native";

const scaleValue = new Animated.Value(1);

const handlePressIn = () => {
  Animated.timing(scaleValue, {
    toValue: Animation.scale.pressed, // 0.95
    duration: Animation.duration.fast, // 150ms
    useNativeDriver: true,
  }).start();
};

const handlePressOut = () => {
  Animated.timing(scaleValue, {
    toValue: 1,
    duration: Animation.duration.fast,
    useNativeDriver: true,
  }).start();
};
```

### Loading Animation

```typescript
const rotateValue = new Animated.Value(0);

const startRotation = () => {
  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();
};

const rotate = rotateValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});
```

## Responsive Design

### Screen Size Handling

```typescript
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > Layout.breakpoints.mobile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: isTablet
      ? Layout.screenMargin.tablet
      : Layout.screenMargin.mobile,
  },
});
```

### Responsive Typography

```typescript
const getResponsiveFontSize = (baseSize: number) => {
  const { width } = Dimensions.get("window");
  const scale = width > Layout.breakpoints.mobile ? 1.2 : 1;
  return baseSize * scale;
};
```

## Accessibility Implementation

### Semantic Elements

```typescript
<TouchableOpacity
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Start mining CELF tokens"
  accessibilityHint="Tap to begin the mining process"
>
  <Text>Start Mining</Text>
</TouchableOpacity>
```

### Focus Management

```typescript
import { AccessibilityInfo } from "react-native";

// Announce important changes
AccessibilityInfo.announceForAccessibility("Mining started successfully");

// Focus management
const buttonRef = useRef<TouchableOpacity>(null);
AccessibilityInfo.setAccessibilityFocus(buttonRef.current);
```

## Theme Support

### Theme Context

```typescript
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return Theme[theme];
};
```

### Theme-aware Styles

```typescript
const ThemedComponent: React.FC = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
    },
    text: {
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Themed content</Text>
    </View>
  );
};
```

## Performance Best Practices

### StyleSheet Optimization

```typescript
// ✅ Good - Create styles outside component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
});

// ❌ Avoid - Inline styles in render
<View style={{ flex: 1, backgroundColor: Colors.background.primary }} />;
```

### Memoization

```typescript
import { memo, useMemo } from "react";

const OptimizedComponent = memo<Props>(({ data }) => {
  const computedStyles = useMemo(
    () => ({
      container: {
        backgroundColor: data.isActive
          ? Colors.primary.blue
          : Colors.neutral[100],
      },
    }),
    [data.isActive]
  );

  return <View style={computedStyles.container} />;
});
```

## Testing with Design Tokens

### Component Testing

```typescript
import { render } from "@testing-library/react-native";
import { Colors } from "@/constants/design-tokens";

test("button has correct background color", () => {
  const { getByTestId } = render(
    <Button
      testID="primary-button"
      variant="primary"
      title="Test"
      onPress={() => {}}
    />
  );

  const button = getByTestId("primary-button");
  expect(button).toHaveStyle({ backgroundColor: Colors.primary.blue });
});
```

## Common Patterns

### Status Indicators

```typescript
const StatusBadge: React.FC<{ status: "active" | "inactive" | "pending" }> = ({
  status,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return Colors.status.success;
      case "inactive":
        return Colors.neutral[500];
      case "pending":
        return Colors.status.warning;
      default:
        return Colors.neutral[500];
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
    </View>
  );
};
```

### Form Inputs

```typescript
const TextInput: React.FC<TextInputProps> = ({ error, ...props }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholderTextColor={Colors.text.tertiary}
      {...props}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);
```

---

For more detailed information, refer to the main [STYLE_GUIDE.md](./STYLE_GUIDE.md) file.
