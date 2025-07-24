# Zustand State Management Integration Guide

## 🎯 Overview

This guide explains how to integrate Zustand state management into your CELF mobile app, replacing the current Context-based approach with a more scalable and performant solution.

## 📦 Installation

```bash
npm install zustand @react-native-async-storage/async-storage
```

## 🏗️ Store Architecture

### **4 Main Stores Created:**

1. **`authStore.ts`** - User authentication and profile
2. **`miningStore.ts`** - Mining state and session history
3. **`walletStore.ts`** - Wallet balances and transactions
4. **`appStore.ts`** - Global app settings and UI state

## 🔄 Migration Steps

### **Step 1: Replace MockAuthProvider**

**Before (Context):**
```typescript
// components/MockAuthProvider.tsx
const { isSignedIn, signIn, signOut } = useMockAuth();
```

**After (Zustand):**
```typescript
// Any component
import { useAuthStore } from '@/stores/authStore';
const { isSignedIn, signIn, signOut } = useAuthStore();
```

### **Step 2: Replace NavigationContext**

**Before:**
```typescript
// components/navigation/NavigationContext.tsx
const { sidebarOpen, toggleSidebar } = useNavigation();
```

**After:**
```typescript
// Any component
import { useAppStore } from '@/stores/appStore';
const { sidebarOpen, toggleSidebar } = useAppStore();
```

### **Step 3: Integrate Mining Store**

**Before (Service + State):**
```typescript
// app/(app)/mining.tsx
const [isMining, setIsMining] = useState(false);
const [totalBalance, setTotalBalance] = useState(24.3564);
// + miningService callbacks
```

**After (Zustand):**
```typescript
// app/(app)/mining.tsx
import { useMiningStore } from '@/stores/miningStore';
const { 
  isMining, 
  currentBalance, 
  totalEarned, 
  startMining, 
  stopMining 
} = useMiningStore();
```

## 🚀 Usage Examples

### **Authentication**
```typescript
import { useAuthStore } from '@/stores/authStore';

const LoginScreen = () => {
  const { signIn, isSignedIn, user } = useAuthStore();
  
  const handleLogin = async () => {
    await signIn('user@example.com', 'password');
  };
  
  if (isSignedIn) {
    return <Text>Welcome {user?.firstName}!</Text>;
  }
  
  return <Button onPress={handleLogin} title="Sign In" />;
};
```

### **Mining**
```typescript
import { useMiningStore } from '@/stores/miningStore';

const MiningScreen = () => {
  const { 
    isMining, 
    currentBalance, 
    totalEarned, 
    runtime,
    startMining, 
    stopMining,
    sessions 
  } = useMiningStore();
  
  return (
    <View>
      <Text>Balance: {currentBalance.toFixed(4)} CELF</Text>
      <Text>Session Earnings: {totalEarned.toFixed(4)} CELF</Text>
      <Text>Runtime: {runtime}</Text>
      <Button 
        onPress={isMining ? stopMining : startMining}
        title={isMining ? 'Stop Mining' : 'Start Mining'}
      />
      <Text>Total Sessions: {sessions.length}</Text>
    </View>
  );
};
```

### **Wallet**
```typescript
import { useWalletStore } from '@/stores/walletStore';

const WalletScreen = () => {
  const { 
    totalBalance, 
    transactions, 
    sendTokens, 
    getFormattedBalance 
  } = useWalletStore();
  
  const handleSend = async () => {
    await sendTokens('celf1abc...', 10.0, 'Payment to friend');
  };
  
  return (
    <View>
      <Text>Balance: {getFormattedBalance(totalBalance)}</Text>
      <Button onPress={handleSend} title="Send Tokens" />
      <FlatList 
        data={transactions}
        renderItem={({ item }) => (
          <Text>{item.description}: {item.amount} CELF</Text>
        )}
      />
    </View>
  );
};
```

### **App Settings**
```typescript
import { useAppStore } from '@/stores/appStore';

const SettingsScreen = () => {
  const { 
    settings, 
    updateTheme, 
    toggleNotification,
    notifications,
    markAllNotificationsRead 
  } = useAppStore();
  
  return (
    <View>
      <Switch 
        value={settings.notifications.mining}
        onValueChange={() => toggleNotification('mining')}
      />
      <Button 
        onPress={() => updateTheme('dark')}
        title="Dark Theme"
      />
      <Text>Unread: {notifications.filter(n => !n.read).length}</Text>
    </View>
  );
};
```

## 🔧 Integration with Existing Services

### **Mining Service Integration**
```typescript
// stores/miningStore.ts - Connect with miningService
import { miningService } from '@/services/miningService';

// In store actions:
startMining: () => {
  miningService.setCallbacks({
    onBalanceUpdate: (balance) => set({ currentBalance: balance }),
    onEarningsUpdate: (earnings) => set({ totalEarned: earnings }),
    onRuntimeUpdate: (runtime) => set({ runtime }),
    onMiningStateChange: (isMining) => set({ isMining }),
  });
  miningService.startMining();
},
```

## 🎯 Benefits Achieved

### **Performance**
- ✅ **Selective Re-renders** - Only components using changed state re-render
- ✅ **No Provider Wrapping** - Direct store access
- ✅ **Optimized Updates** - Zustand's built-in optimizations

### **Developer Experience**
- ✅ **TypeScript First** - Full type safety
- ✅ **DevTools Support** - Redux DevTools integration
- ✅ **Simple API** - No boilerplate, easy to use

### **Scalability**
- ✅ **Modular Stores** - Feature-based organization
- ✅ **Persistence** - Automatic AsyncStorage integration
- ✅ **Global Access** - No prop drilling

### **Maintainability**
- ✅ **Centralized State** - All state in one place per feature
- ✅ **Clear Actions** - Explicit state mutations
- ✅ **Easy Testing** - Stores can be tested independently

## 🔄 Migration Checklist

- [ ] Install Zustand and AsyncStorage
- [ ] Create store files (already provided)
- [ ] Replace MockAuthProvider with useAuthStore
- [ ] Replace NavigationContext with useAppStore
- [ ] Update mining screen to use useMiningStore
- [ ] Update wallet screens to use useWalletStore
- [ ] Remove old Context providers
- [ ] Test all functionality
- [ ] Update other components gradually

## 🚀 Next Steps

1. **Install dependencies**
2. **Copy store files** to your project
3. **Start with one store** (recommend authStore first)
4. **Gradually migrate** other components
5. **Remove old Context** providers once migration is complete

This migration will significantly improve your app's performance, maintainability, and developer experience!
