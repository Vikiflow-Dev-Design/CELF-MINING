import React from 'react';
import { Redirect } from 'expo-router';

export default function IndexScreen() {
  // Redirect directly to the main app
  return <Redirect href="/mining" />;
}
