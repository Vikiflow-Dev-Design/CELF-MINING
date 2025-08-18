# CELF Mobile App - Backend Integration Guide

## 🎯 Overview

This guide explains how to integrate the CELF mobile app with the custom backend authentication system, replacing Clerk with email/password authentication.

## 📦 New Files Created

### **Services**
- `services/apiService.ts` - HTTP client for backend API calls
- `hooks/useAppInitialization.ts` - App startup and data loading

### **Authentication**
- `stores/authStore.ts` - Zustand store for authentication state
- `components/auth/LoginScreen.tsx` - Login form component
- `components/auth/RegisterScreen.tsx` - Registration form component  
- `components/auth/AuthContainer.tsx` - Auth screen container

### **Updated Files**
- `stores/walletStore.ts` - Added backend integration for wallet data
- `stores/miningStore.ts` - Added backend integration for mining operations

## 🔧 Integration Steps

### **Step 1: Update Your App Root**

Replace your current authentication logic with the new system:

```typescript
// app/_layout.tsx or your main app file
import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useAppInitialization } from '@/hooks/useAppInitialization';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { LoadingScreen } from '@/components/LoadingScreen'; // Create this if needed

export default function RootLayout() {
  const { isSignedIn } = useAuthStore();
  const { isInitialized, isLoading, initError, retryInitialization } = useAppInitialization();

  // Show loading screen during initialization
  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  // Show error screen if initialization failed
  if (initError) {
    return (
      <ErrorScreen 
        error={initError} 
        onRetry={retryInitialization} 
      />
    );
  }

  // Show auth screens if not signed in
  if (!isSignedIn) {
    return <AuthContainer />;
  }

  // Show main app if signed in
  return <YourMainAppNavigator />;
}
```

### **Step 2: Update Mining Screen**

Replace the current mining logic with the new store:

```typescript
// app/(app)/mining.tsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useMiningStore } from '@/stores/miningStore';
import { useWalletStore } from '@/stores/walletStore';

export default function MiningScreen() {
  const { 
    isMining, 
    totalEarned, 
    runtime, 
    miningRate,
    isLoading,
    startMining, 
    stopMining,
    refreshMiningStatus 
  } = useMiningStore();

  const { refreshBalance } = useWalletStore();

  useEffect(() => {
    // Refresh mining status when screen loads
    refreshMiningStatus();
  }, []);

  const handleStartMining = async () => {
    try {
      await startMining();
      // Refresh wallet balance after starting mining
      await refreshBalance();
    } catch (error) {
      Alert.alert('Error', 'Failed to start mining');
    }
  };

  const handleStopMining = async () => {
    try {
      await stopMining();
      // Refresh wallet balance after stopping mining
      await refreshBalance();
    } catch (error) {
      Alert.alert('Error', 'Failed to stop mining');
    }
  };

  return (
    <View>
      <Text>Mining Status: {isMining ? 'Active' : 'Stopped'}</Text>
      <Text>Tokens Earned: {totalEarned.toFixed(4)} CELF</Text>
      <Text>Runtime: {runtime}</Text>
      <Text>Rate: {miningRate} CELF/hour</Text>
      
      <TouchableOpacity 
        onPress={isMining ? handleStopMining : handleStartMining}
        disabled={isLoading}
      >
        <Text>{isLoading ? 'Loading...' : (isMining ? 'Stop Mining' : 'Start Mining')}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### **Step 3: Update Wallet Screen**

Replace the current wallet logic with the new store:

```typescript
// app/(app)/wallet.tsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useWalletStore } from '@/stores/walletStore';

export default function WalletScreen() {
  const { 
    totalBalance,
    balanceBreakdown,
    currentAddress,
    transactions,
    isLoadingBalance,
    refreshBalance,
    getFormattedBalance 
  } = useWalletStore();

  useEffect(() => {
    // Refresh balance when screen loads
    refreshBalance();
  }, []);

  return (
    <View>
      <Text>Total Balance: {getFormattedBalance(totalBalance)}</Text>
      <Text>Sendable: {getFormattedBalance(balanceBreakdown.sendable)}</Text>
      <Text>Non-Sendable: {getFormattedBalance(balanceBreakdown.nonSendable)}</Text>
      <Text>Pending: {getFormattedBalance(balanceBreakdown.pending)}</Text>
      <Text>Address: {currentAddress}</Text>
      
      <TouchableOpacity onPress={refreshBalance} disabled={isLoadingBalance}>
        <Text>{isLoadingBalance ? 'Refreshing...' : 'Refresh Balance'}</Text>
      </TouchableOpacity>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.description}</Text>
            <Text>{item.amount} CELF</Text>
            <Text>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

### **Step 4: Add Logout Functionality**

Add logout to your settings or profile screen:

```typescript
// app/(app)/settings.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '@/stores/authStore';

export default function SettingsScreen() {
  const { user, signOut } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out');
            }
          }
        }
      ]
    );
  };

  return (
    <View>
      <Text>Welcome, {user?.firstName} {user?.lastName}</Text>
      <Text>Email: {user?.email}</Text>
      
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## 🔧 Configuration

### **Backend URL Configuration**

Update the API base URL in `services/apiService.ts`:

```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://YOUR_LOCAL_IP:5000/api'  // Replace with your local IP
  : 'https://your-production-api.com/api';
```

**For development:**
- If using Android emulator: `http://10.0.2.2:5000/api`
- If using iOS simulator: `http://localhost:5000/api`  
- If using physical device: `http://YOUR_COMPUTER_IP:5000/api`

## 🧪 Testing the Integration

### **1. Start Your Backend**
```bash
cd backend
npm run dev
```

### **2. Test Registration**
1. Open the mobile app
2. Tap "Sign Up"
3. Fill in the registration form
4. Check backend logs for user creation

### **3. Test Login**
1. Use the credentials you just registered
2. Tap "Sign In"
3. Should navigate to the main app

### **4. Test Data Loading**
1. After login, check that wallet balance loads
2. Check that mining status loads
3. Try starting/stopping mining

## 🚨 Troubleshooting

### **Network Issues**
- Check that backend is running on correct port
- Verify API_BASE_URL is correct for your setup
- Check device/emulator can reach your backend

### **Authentication Issues**
- Check backend logs for authentication errors
- Verify JWT tokens are being stored/sent correctly
- Clear app data if tokens are corrupted

### **Data Loading Issues**
- Check that user is properly authenticated
- Verify API endpoints are working in backend
- Check network requests in React Native debugger

## 🎉 Success Indicators

When integration is successful, you should see:

✅ **Registration**: New users created in database  
✅ **Login**: JWT tokens stored and user authenticated  
✅ **Wallet**: Real balance data from backend  
✅ **Mining**: Mining operations sync with backend  
✅ **Persistence**: User stays logged in after app restart  

## 🔄 Next Steps

After basic integration works:

1. **Add error handling** for network failures
2. **Implement offline support** for better UX
3. **Add push notifications** for mining updates
4. **Implement real-time updates** with WebSockets
5. **Add biometric authentication** for better security

Your mobile app is now fully integrated with the custom backend! 🚀
