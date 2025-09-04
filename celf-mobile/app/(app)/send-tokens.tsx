/**
 * Send Tokens Search Screen - New Flow
 * Step 1: Search bar + Recent users + Search modal
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { UserSearchResult, apiService } from '@/services/apiService';

// Mock recent users data - replace with actual API call
const mockRecentUsers: UserSearchResult[] = [
  {
    id: '1',
    email: 'victor@example.com',
    firstName: 'Victor',
    lastName: 'Ezekiel',
    walletAddress: 'celf1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: '2',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    walletAddress: 'celf9876543210fedcba9876543210fedcba87654321'
  },
  {
    id: '3',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    walletAddress: 'celfabcdef1234567890abcdef1234567890abcdef12'
  },
];

export default function SendTokensScreen() {
  const { toggleSidebar } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [recentUsers] = useState(mockRecentUsers);
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSearch = async (query: string) => {
    console.log('🔍 Frontend: Starting search for query:', query);

    if (query.length < 2) {
      console.log('❌ Query too short, clearing results');
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      console.log('📡 Frontend: Calling apiService.searchUsers with:', query);
      const response = await apiService.searchUsers(query);
      console.log('📡 Frontend: API response received:', response);

      if (response.success && response.data) {
        console.log('✅ Frontend: Setting search results:', response.data);
        setSearchResults(response.data);
      } else {
        console.log('❌ Frontend: No data in response or not successful:', response);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('❌ Frontend: Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);
  };

  const handleSearchFocus = () => {
    setShowSearchModal(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleUserSelect = (user: UserSearchResult) => {
    setShowSearchModal(false);
    setSearchQuery('');
    setSearchResults([]);
    // Navigate to send amount screen with user data
    router.push({
      pathname: '/send-amount',
      params: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        walletAddress: user.walletAddress,
      }
    });
  };

  const handleViewAllRecent = () => {
    // Navigate to view all recent users screen
    router.push('/recent-recipients');
  };

  const renderUserItem = ({ item }: { item: UserSearchResult }) => (
    <TouchableOpacity
      onPress={() => handleUserSelect(item)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background.primary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.primary,
      }}
    >
      {/* Avatar */}
      <View style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
      }}>
        <Typography variant="bodyMedium" color="inverse" weight="bold">
          {item.firstName.charAt(0)}{item.lastName.charAt(0)}
        </Typography>
      </View>

      {/* User Info */}
      <View style={{ flex: 1 }}>
        <Typography variant="bodyMedium" weight="bold">
          {item.firstName} {item.lastName}
        </Typography>
        <Typography variant="bodySmall" color="secondary">
          {item.email}
        </Typography>
        {item.walletAddress && (
          <Typography variant="bodySmall" color="tertiary" style={{ marginTop: 2, fontFamily: 'monospace' }}>
            {item.walletAddress.slice(0, 16)}...{item.walletAddress.slice(-8)}
          </Typography>
        )}
      </View>

      {/* Arrow */}
      <Ionicons name="chevron-forward" size={16} color={Colors.icon.secondary} />
    </TouchableOpacity>
  );

  const renderRecentUser = (user: UserSearchResult) => (
    <TouchableOpacity
      key={user.id}
      onPress={() => handleUserSelect(user)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background.primary,
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border.primary,
      }}
    >
      {/* Avatar */}
      <View style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primary.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
      }}>
        <Typography variant="bodyLarge" color="inverse" weight="bold">
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </Typography>
      </View>

      {/* User Info */}
      <View style={{ flex: 1 }}>
        <Typography variant="bodyMedium" weight="bold">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="bodySmall" color="secondary">
          {user.email}
        </Typography>
      </View>

      {/* Arrow */}
      <Ionicons name="chevron-forward" size={20} color={Colors.icon.secondary} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Send Tokens"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.xl,
          paddingBottom: Spacing.xl,
        }}>

          {/* Search Bar */}
          <View style={{ marginBottom: Spacing.xl }}>
            <TouchableOpacity
              onPress={handleSearchFocus}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.background.primary,
                borderRadius: 12,
                paddingHorizontal: Spacing.md,
                paddingVertical: Spacing.md,
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
              <Ionicons name="search" size={20} color={Colors.icon.secondary} style={{ marginRight: Spacing.sm }} />
              <Typography variant="bodyMedium" color="tertiary">
                Search by name, email, or wallet address
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Recent Users */}
          <View>
            <Typography variant="h3" weight="bold" style={{ marginBottom: Spacing.md }}>
              Recent
            </Typography>

            {recentUsers.slice(0, 3).map(renderRecentUser)}

            {recentUsers.length > 3 && (
              <TouchableOpacity
                onPress={handleViewAllRecent}
                style={{
                  alignItems: 'center',
                  paddingVertical: Spacing.md,
                  marginTop: Spacing.sm,
                }}
              >
                <Typography variant="bodyMedium" color="primary" weight="semibold">
                  View All Recent Recipients
                </Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Search Modal */}
      <Modal
        visible={showSearchModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowSearchModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
          <Header
            title="Search Users"
            rightAction={
              <TouchableOpacity onPress={() => setShowSearchModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text.secondary} />
              </TouchableOpacity>
            }
          />

          <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg }}>
            {/* Search Input */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.background.primary,
              borderRadius: 12,
              paddingHorizontal: Spacing.md,
              paddingVertical: Spacing.md,
              borderWidth: 1,
              borderColor: Colors.border.primary,
              marginBottom: Spacing.lg,
            }}>
              <Ionicons name="search" size={20} color={Colors.icon.secondary} style={{ marginRight: Spacing.sm }} />
              <TextInput
                value={searchQuery}
                onChangeText={handleSearchQueryChange}
                placeholder="Search by name, email, or wallet address"
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: Colors.text.primary,
                }}
                placeholderTextColor={Colors.text.tertiary}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}>
                  <Ionicons name="close" size={16} color={Colors.icon.secondary} />
                </TouchableOpacity>
              )}
              {isSearching && (
                <ActivityIndicator size="small" color={Colors.primary.blue} style={{ marginLeft: Spacing.sm }} />
              )}
            </View>

            {/* Search Results */}
            <View style={{ flex: 1 }}>
              {searchQuery.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: Spacing.xl }}>
                  <Ionicons name="search" size={48} color={Colors.icon.tertiary} style={{ marginBottom: Spacing.md }} />
                  <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
                    Start typing to search for users
                  </Typography>
                </View>
              ) : isSearching ? (
                <View style={{ alignItems: 'center', marginTop: Spacing.xl }}>
                  <ActivityIndicator size="large" color={Colors.primary.blue} />
                  <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginTop: Spacing.md }}>
                    Searching...
                  </Typography>
                </View>
              ) : searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  renderItem={renderUserItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={true}
                  style={{ flex: 1 }}
                />
              ) : searchQuery.length >= 2 ? (
                <View style={{ alignItems: 'center', marginTop: Spacing.xl }}>
                  <Ionicons name="person-remove" size={48} color={Colors.icon.tertiary} style={{ marginBottom: Spacing.md }} />
                  <Typography variant="bodyMedium" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
                    No users found
                  </Typography>
                  <Typography variant="bodySmall" color="secondary" style={{ textAlign: 'center' }}>
                    Try searching with a different name, email, or wallet address
                  </Typography>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
