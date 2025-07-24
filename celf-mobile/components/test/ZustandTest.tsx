/**
 * Zustand Integration Test Component
 * Simple test to verify stores are working correctly
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMiningStore } from '@/stores/miningStore';
import { useAppStore } from '@/stores/appStore';

export const ZustandTest: React.FC = () => {
  // Test mining store
  const {
    isMining,
    currentBalance,
    totalEarned,
    runtime,
    miningRate,
    startMining,
    stopMining,
  } = useMiningStore();

  // Test app store
  const {
    sidebarOpen,
    isLoading,
    toggleSidebar,
    setLoading,
  } = useAppStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Zustand Integration Test</Text>
      
      {/* Mining Store Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⛏️ Mining Store</Text>
        <Text>Is Mining: {isMining ? '✅ Yes' : '❌ No'}</Text>
        <Text>Balance: {currentBalance.toFixed(4)} CELF</Text>
        <Text>Session Earnings: {totalEarned.toFixed(4)} CELF</Text>
        <Text>Runtime: {runtime}</Text>
        <Text>Mining Rate: {miningRate} CELF/hour</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.startButton]} 
            onPress={startMining}
            disabled={isMining}
          >
            <Text style={styles.buttonText}>Start Mining</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.stopButton]} 
            onPress={stopMining}
            disabled={!isMining}
          >
            <Text style={styles.buttonText}>Stop Mining</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* App Store Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 App Store</Text>
        <Text>Sidebar Open: {sidebarOpen ? '✅ Yes' : '❌ No'}</Text>
        <Text>Loading: {isLoading ? '✅ Yes' : '❌ No'}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={toggleSidebar}
          >
            <Text style={styles.buttonText}>Toggle Sidebar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={() => setLoading(!isLoading)}
          >
            <Text style={styles.buttonText}>Toggle Loading</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Status</Text>
        <Text style={styles.success}>✅ Zustand stores are working!</Text>
        <Text style={styles.info}>
          {isMining ? '⛏️ Mining in progress...' : '💤 Mining stopped'}
        </Text>
        <Text style={styles.info}>
          {sidebarOpen ? '📂 Sidebar is open' : '📁 Sidebar is closed'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  success: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  info: {
    color: '#666',
    marginTop: 5,
  },
});
