import { ThemeProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        {/* Pre-App Screens */}
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="update" />
        <Stack.Screen name="maintenance" />

        {/* Main App */}
        <Stack.Screen name="(app)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
