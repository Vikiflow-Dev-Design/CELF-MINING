# CELF Mining Functionality Documentation

This document explains the complete mining functionality implementation based on the `mining-rate-example.html` file.

## Overview

The mining functionality includes:
- **Real-time balance updates** (every 100ms)
- **Mining time tracking** with runtime calculation
- **Session earnings tracking**
- **4 decimal places formatting** for balance display
- **Mining rate of 0.125 CELF/hour** with real-time updates

## Architecture

### 1. MiningService (`services/miningService.ts`)
The core service that handles all mining logic:

```typescript
import { miningService } from '@/services/miningService';

// Start mining
miningService.startMining();

// Stop mining
miningService.stopMining();

// Get current state
const state = miningService.getState();

// Format balance with 4 decimal places
const formatted = miningService.formatBalance(1234.56789); // "1234.5679"
```

### 2. React Hook (`hooks/useMining.ts`)
Easy-to-use React hook for components:

```typescript
import { useMining } from '@/hooks/useMining';

const MyComponent = () => {
  const {
    isMining,
    currentBalance,
    totalEarned,
    formattedBalance,
    formattedEarnings,
    runtime,
    tokensPerSecond,
    startMining,
    stopMining,
    resetBalance,
  } = useMining(24.3564, 0.125); // initial balance, mining rate

  return (
    <View>
      <Text>Balance: {formattedBalance} CELF</Text>
      <Text>Earned: {formattedEarnings} CELF</Text>
      <Text>Runtime: {runtime}</Text>
      <Button onPress={startMining} title="Start Mining" />
    </View>
  );
};
```

### 3. Example Component (`components/mining/MiningExample.tsx`)
Complete implementation showing all features.

## Key Features Implementation

### Real-time Balance Updates
- Updates every **100ms** for smooth animation
- Uses `tokensPerSecond = miningRate / 3600`
- Increment per 100ms = `tokensPerSecond / 10`

```typescript
// In MiningService
const incrementPer100ms = this.state.tokensPerSecond / 10;

this.balanceTimer = setInterval(() => {
  this.state.currentBalance += incrementPer100ms;
  this.state.totalEarned += incrementPer100ms;
  // Trigger callbacks...
}, 100);
```

### Mining Time Tracking
- Tracks active mining time excluding paused periods
- Updates runtime display every second
- Format: "Xh Ym Zs"

```typescript
// Runtime calculation
const elapsed = Date.now() - startTime;
const hours = Math.floor(elapsed / (1000 * 60 * 60));
const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
return `${hours}h ${minutes}m ${seconds}s`;
```

### 4 Decimal Places Formatting
- All balance displays use exactly 4 decimal places
- Internal calculations maintain full precision

```typescript
export const formatBalance = (balance: number): string => {
  return balance.toFixed(4);
};
```

## Usage Examples

### Basic Mining Integration

```typescript
import { useMining } from '@/hooks/useMining';

const MiningScreen = () => {
  const {
    isMining,
    formattedBalance,
    formattedEarnings,
    runtime,
    startMining,
    stopMining,
  } = useMining();

  return (
    <View>
      <Text>Current Balance: {formattedBalance} CELF</Text>
      {isMining && (
        <>
          <Text>Session Earnings: {formattedEarnings} CELF</Text>
          <Text>Runtime: {runtime}</Text>
        </>
      )}
      <Button 
        onPress={isMining ? stopMining : startMining}
        title={isMining ? 'Stop Mining' : 'Start Mining'}
      />
    </View>
  );
};
```

### Advanced Mining Statistics

```typescript
import { useMining, useMiningStats } from '@/hooks/useMining';

const MiningStats = () => {
  const { tokensPerSecond } = useMining();
  const { miningRate, estimatedEarnings } = useMiningStats();

  return (
    <View>
      <Text>Mining Rate: {miningRate} CELF/hour</Text>
      <Text>Tokens per second: {tokensPerSecond}</Text>
      <Text>Estimated daily: {estimatedEarnings.perDay} CELF</Text>
      <Text>Estimated weekly: {estimatedEarnings.perWeek} CELF</Text>
      <Text>Estimated monthly: {estimatedEarnings.perMonth} CELF</Text>
    </View>
  );
};
```

### Status Indicator with Animation

```typescript
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const StatusIndicator = ({ isMining }: { isMining: boolean }) => {
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    if (isMining) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0.5, { duration: 1000 })
        ),
        -1,
        false
      );
    } else {
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [isMining]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Animated.View
        style={[
          {
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: isMining ? '#00ff00' : '#666',
          },
          animatedStyle
        ]}
      />
      <Text>{isMining ? 'Mining Active' : 'Mining Inactive'}</Text>
    </View>
  );
};
```

## Configuration

### Default Values (from HTML example)
- **Starting Balance**: 24.3564 CELF
- **Mining Rate**: 0.125 CELF/hour
- **Update Interval**: 100ms for balance, 1000ms for runtime
- **Decimal Places**: 4 for balance display, 6 for tokens per second

### Customization

```typescript
// Custom initial values
const mining = useMining(1000.0, 0.25); // 1000 CELF starting, 0.25 CELF/hour

// Update mining rate dynamically
mining.updateMiningRate(0.5); // Change to 0.5 CELF/hour

// Reset balance
mining.resetBalance(500.0); // Reset to 500 CELF
```

## Integration with Existing Mining Screen

To integrate with your existing mining screen:

1. Replace the current mining logic with the `useMining` hook
2. Update balance display to use `formattedBalance`
3. Add status indicator with pulsing animation
4. Use the runtime tracking for session display

```typescript
// Replace existing state with:
const {
  isMining,
  formattedBalance,
  formattedEarnings,
  runtime,
  tokensPerSecond,
  startMining,
  stopMining,
} = useMining(1247.8900, 0.125); // Your current values
```

This implementation provides all the functionality from the HTML example with proper React integration and TypeScript support.
