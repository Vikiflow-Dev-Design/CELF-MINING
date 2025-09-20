import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Spacing } from '@/constants/design-tokens';
import { apiService, UserSearchResult } from '@/services/apiService';

interface UserSearchInputProps {
  onUserSelect: (user: UserSearchResult) => void;
  onAddressEnter: (address: string) => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export const UserSearchInput: React.FC<UserSearchInputProps> = ({
  onUserSelect,
  onAddressEnter,
  placeholder = "Search by name, email, or wallet address",
  value,
  onChangeText,
}) => {
  const [searchQuery, setSearchQuery] = useState(value || '');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const themeColors = useThemeColors();
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (onChangeText) {
      onChangeText(searchQuery);
    }
  }, [searchQuery, onChangeText]);

  const handleSearch = async (query: string) => {
    if (query.length < 1) {
      setSearchResults([]);
      setShowResults(false);
      setIsLoading(false);
      return;
    }

    // Check if it looks like a wallet address
    if (query.startsWith('celf') && query.length > 10) {
      setIsValidatingAddress(true);
      try {
        const response = await apiService.validateAddress(query);
        if (response.success && response.data) {
          // Convert to search result format
          const userResult: UserSearchResult = {
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            walletAddress: response.data.walletAddress,
          };
          setSearchResults([userResult]);
          setShowResults(true);
        } else {
          setSearchResults([]);
          setShowResults(false);
        }
      } catch (error) {
        console.error('Address validation error:', error);
        setSearchResults([]);
        setShowResults(false);
      } finally {
        setIsValidatingAddress(false);
      }
      return;
    }

    // Search for users
    setIsLoading(true);
    try {
      console.log('🔍 Searching for users with query:', query);

      const response = await apiService.searchUsers(query, 5);
      console.log('📡 Search response:', response);

      if (response.success && response.data) {
        console.log('✅ Raw response data:', response.data);

        // Handle both response formats for backward compatibility
        let users: UserSearchResult[] = [];

        if (Array.isArray(response.data)) {
          // Direct array format from /users/search
          users = response.data;
          console.log('✅ Using direct array format');
        } else if (response.data.users && Array.isArray(response.data.users)) {
          // Object format from /profile/search
          users = response.data.users.map((user: any) => ({
            id: user.userId || user.id,
            email: user.email || '',
            firstName: user.firstName || user.displayName?.split(' ')[0] || '',
            lastName: user.lastName || user.displayName?.split(' ')[1] || '',
            walletAddress: user.walletAddress || null
          }));
          console.log('✅ Converted profile format to user format');
        }

        console.log('✅ Final processed users:', users.length, users);
        setSearchResults(users);
        setShowResults(users.length > 0);
      } else {
        console.log('❌ No users found or API error:', response.message);
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('❌ User search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (text: string) => {
    setSearchQuery(text);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If text is empty, clear results immediately
    if (text.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Show loading state immediately for better UX
    if (text.trim().length >= 1) {
      setIsLoading(true);
    }

    // Set new timeout for search (shorter delay for better responsiveness)
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(text);
    }, 200);
  };

  const handleUserSelect = (user: UserSearchResult) => {
    setSearchQuery(`${user.firstName} ${user.lastName} (${user.walletAddress})`);
    setShowResults(false);
    onUserSelect(user);
  };

  const handleSubmit = () => {
    if (searchQuery.startsWith('celf')) {
      onAddressEnter(searchQuery);
    }
    setShowResults(false);
  };

  const renderUserItem = ({ item, index }: { item: UserSearchResult; index?: number }) => (
    <TouchableOpacity
      onPress={() => handleUserSelect(item)}
      style={{
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderBottomWidth: (index !== undefined && index < searchResults.length - 1) ? 1 : 0,
        borderBottomColor: themeColors.border.primary + '30',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themeColors.background.primary,
      }}
      activeOpacity={0.7}
    >
      {/* Enhanced Avatar */}
      <View style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: themeColors.primary.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
        shadowColor: themeColors.primary.blue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <Typography variant="bodyLarge" color="inverse" weight="bold">
          {item.firstName.charAt(0).toUpperCase()}{item.lastName.charAt(0).toUpperCase()}
        </Typography>
      </View>

      {/* User Info */}
      <View style={{ flex: 1 }}>
        <Typography variant="bodyLarge" weight="bold" style={{ marginBottom: Spacing.xs }}>
          {item.firstName} {item.lastName}
        </Typography>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
          <Ionicons
            name="mail"
            size={12}
            color={themeColors.icon.tertiary}
            style={{ marginRight: Spacing.xs }}
          />
          <Typography variant="bodySmall" color="secondary">
            {item.email}
          </Typography>
        </View>

        {item.walletAddress && (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: themeColors.background.secondary,
            paddingHorizontal: Spacing.sm,
            paddingVertical: Spacing.xs,
            borderRadius: 8,
            alignSelf: 'flex-start',
          }}>
            <Ionicons
              name="wallet"
              size={12}
              color={themeColors.icon.tertiary}
              style={{ marginRight: Spacing.xs }}
            />
            <Typography variant="bodySmall" color="tertiary" weight="medium">
              {item.walletAddress.slice(0, 8)}...{item.walletAddress.slice(-4)}
            </Typography>
          </View>
        )}
      </View>

      {/* Selection Indicator */}
      <View style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: themeColors.primary.blue + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Spacing.sm,
      }}>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={themeColors.primary.blue}
        />
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={{ position: 'relative' }}>
      {/* Enhanced Search Input */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themeColors.background.primary,
        borderRadius: 16,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderWidth: 2,
        borderColor: showResults ? themeColors.primary.blue : themeColors.border.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <View style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: themeColors.primary.blue + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons
            name="search"
            size={14}
            color={themeColors.primary.blue}
          />
        </View>

        <TextInput
          value={searchQuery}
          onChangeText={handleInputChange}
          placeholder={placeholder}
          placeholderTextColor={themeColors.text.tertiary}
          style={{
            flex: 1,
            fontSize: 16,
            color: themeColors.text.primary,
            paddingVertical: Spacing.xs,
            fontWeight: '500',
          }}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
        />

        {(isLoading || isValidatingAddress) && (
          <View style={{
            marginLeft: Spacing.sm,
            padding: Spacing.xs,
          }}>
            <ActivityIndicator
              size="small"
              color={themeColors.primary.blue}
            />
          </View>
        )}

        {searchQuery.length > 0 && !isLoading && !isValidatingAddress && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setSearchResults([]);
              setShowResults(false);
            }}
            style={{
              marginLeft: Spacing.sm,
              padding: Spacing.xs,
              borderRadius: 12,
              backgroundColor: themeColors.background.tertiary,
            }}
          >
            <Ionicons
              name="close"
              size={14}
              color={themeColors.icon.secondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <View style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: themeColors.background.primary,
          borderRadius: 20,
          marginTop: Spacing.md,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 12,
          zIndex: 9999,
          maxHeight: 400,
          borderWidth: 2,
          borderColor: themeColors.primary.blue + '30',
        }}>
          {/* Results Header */}
          <View style={{
            paddingHorizontal: Spacing.lg,
            paddingVertical: Spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: themeColors.border.primary + '20',
            backgroundColor: themeColors.primary.blue + '10',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: themeColors.primary.blue,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.sm,
              }}>
                <Typography variant="bodySmall" color="inverse" weight="bold">
                  {searchResults.length}
                </Typography>
              </View>
              <Typography variant="bodyMedium" color="primary" weight="bold">
                Users Found
              </Typography>
            </View>
            <Typography variant="bodySmall" color="secondary">
              Tap to select
            </Typography>
          </View>

          <FlatList
            data={searchResults}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 320 }}
            bounces={false}
          />
        </View>
      )}

      {/* No Results Message */}
      {showResults && searchResults.length === 0 && searchQuery.length > 1 && !isLoading && !isValidatingAddress && (
        <View style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: themeColors.background.primary,
          borderRadius: 20,
          marginTop: Spacing.md,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
          zIndex: 9999,
          borderWidth: 2,
          borderColor: themeColors.status.warning + '30',
          paddingHorizontal: Spacing.xl,
          paddingVertical: Spacing.xl,
        }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: themeColors.status.warning + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.md,
            }}>
              <Ionicons
                name="search"
                size={28}
                color={themeColors.status.warning}
              />
            </View>
            <Typography variant="bodyLarge" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              No users found
            </Typography>
            <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.md }}>
              Try searching by:
            </Typography>
            <View style={{ alignItems: 'flex-start' }}>
              <Typography variant="bodySmall" color="tertiary" style={{ marginBottom: Spacing.xs }}>
                • First or last name
              </Typography>
              <Typography variant="bodySmall" color="tertiary" style={{ marginBottom: Spacing.xs }}>
                • Email address
              </Typography>
              <Typography variant="bodySmall" color="tertiary">
                • Full name (e.g., "John Doe")
              </Typography>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
