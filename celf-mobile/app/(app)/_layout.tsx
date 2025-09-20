import React from 'react';
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { NavigationProvider, useNavigation } from '@/components/navigation/NavigationContext';
import { Sidebar } from '@/components/navigation/Sidebar';
import { useAuthStore } from '@/stores/authStore';
import { Redirect } from 'expo-router';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Filter out DOM-related errors that are often recoverable
    if (error.message.includes('removeChild') || error.message.includes('Node')) {
      console.warn('DOM manipulation error caught and ignored:', error.message);
      return { hasError: false }; // Don't show error boundary for these
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);

    // Auto-recover from DOM errors after a short delay
    if (error.message.includes('removeChild') || error.message.includes('Node')) {
      setTimeout(() => {
        this.setState({ hasError: false, error: undefined });
      }, 100);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Something went wrong</Text>
          <Text style={{ color: 'red', textAlign: 'center' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const { sidebarOpen, closeSidebar } = useNavigation();
  const { isSignedIn } = useAuthStore();

  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <ErrorBoundary>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'none', // Disable animations to prevent DOM issues
          }}>
          <Stack.Screen name="mining" />
          <Stack.Screen name="wallet" />
          <Stack.Screen name="exchange" />
          <Stack.Screen name="referrals" />
          <Stack.Screen name="social" />
          <Stack.Screen name="app-information" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="privacy-policy" />
          <Stack.Screen name="terms-conditions" />
          <Stack.Screen name="challenge-details" />
          <Stack.Screen name="daily-challenges" />
          <Stack.Screen name="error" />
          <Stack.Screen name="help-center" />
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="no-internet" />

          <Stack.Screen name="loading" />
          <Stack.Screen name="transaction-details" />
          <Stack.Screen name="transaction-history" />
          <Stack.Screen name="send-tokens" />
          <Stack.Screen name="receive-tokens" />
        </Stack>

        {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />}
      </View>
    </ErrorBoundary>
  );
}

export default function AppLayout() {
  return (
    <ErrorBoundary>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ErrorBoundary>
  );
}
