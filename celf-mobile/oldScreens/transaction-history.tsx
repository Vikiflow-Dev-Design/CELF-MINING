import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { EmptyTransactionHistory } from '@/components/empty-states';

interface Transaction {
  id: string;
  type: 'mining' | 'referral' | 'send' | 'receive';
  amount: number;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  recipient?: string;
  sender?: string;
  txHash?: string;
}

export default function TransactionHistoryScreen() {
  const { toggleSidebar } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Mock transaction data
  const allTransactions: Transaction[] = [
    {
      id: '1',
      type: 'mining',
      amount: 12.5,
      date: '2025-01-17',
      time: '14:30',
      status: 'completed',
      description: 'Mining Reward',
      txHash: '0x1234...5678'
    },
    {
      id: '2',
      type: 'receive',
      amount: 50.0,
      date: '2025-01-16',
      time: '09:15',
      status: 'completed',
      description: 'Received from @johndoe',
      sender: '@johndoe',
      txHash: '0x2345...6789'
    },
    {
      id: '3',
      type: 'send',
      amount: -25.0,
      date: '2025-01-15',
      time: '16:45',
      status: 'completed',
      description: 'Sent to @sarahw',
      recipient: '@sarahw',
      txHash: '0x3456...7890'
    },
    {
      id: '4',
      type: 'referral',
      amount: 5.0,
      date: '2025-01-14',
      time: '11:20',
      status: 'completed',
      description: 'Referral Bonus',
      txHash: '0x4567...8901'
    },
    {
      id: '5',
      type: 'send',
      amount: -100.0,
      date: '2025-01-13',
      time: '13:10',
      status: 'pending',
      description: 'Sent to @mikechen',
      recipient: '@mikechen',
      txHash: '0x5678...9012'
    },
    {
      id: '6',
      type: 'mining',
      amount: 8.75,
      date: '2025-01-12',
      time: '10:05',
      status: 'completed',
      description: 'Mining Reward',
      txHash: '0x6789...0123'
    },
  ];

  const filterOptions = [
    { key: 'all', label: 'All', icon: 'list' },
    { key: 'mining', label: 'Mining', icon: 'diamond' },
    { key: 'send', label: 'Sent', icon: 'arrow-up' },
    { key: 'receive', label: 'Received', icon: 'arrow-down' },
    { key: 'referral', label: 'Referrals', icon: 'people' },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'mining': return 'diamond';
      case 'referral': return 'people';
      case 'send': return 'arrow-up';
      case 'receive': return 'arrow-down';
      default: return 'swap-horizontal';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'mining': return Colors.secondary.warning;
      case 'referral': return Colors.secondary.success;
      case 'send': return Colors.secondary.error;
      case 'receive': return Colors.secondary.success;
      default: return Colors.primary.blue;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return Colors.secondary.success;
      case 'pending': return Colors.secondary.warning;
      case 'failed': return Colors.secondary.error;
      default: return Colors.text.tertiary;
    }
  };

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.sender?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleDownload = () => {
    // Handle transaction history download/export
    console.log('Download transaction history');
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(`/(app)/transaction-details?id=${item.id}` as any);
      }}
    >
      <Card variant="default" style={{ marginBottom: Spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: getTransactionColor(item.type) + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.md,
          }}>
            <Ionicons 
              name={getTransactionIcon(item.type) as any} 
              size={20} 
              color={getTransactionColor(item.type)} 
            />
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Typography variant="bodyMedium" weight="semibold" numberOfLines={1}>
                  {item.description}
                </Typography>
                <Typography variant="bodySmall" color="secondary">
                  {item.date} • {item.time}
                </Typography>
              </View>
              
              <View style={{ alignItems: 'flex-end', marginLeft: Spacing.sm }}>
                <Typography 
                  variant="bodyMedium" 
                  weight="bold"
                  style={{ 
                    color: item.amount > 0 ? Colors.secondary.success : Colors.secondary.error 
                  }}
                >
                  {item.amount > 0 ? '+' : ''}{item.amount.toFixed(2)} CELF
                </Typography>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: getStatusColor(item.status),
                    marginRight: Spacing.xs,
                  }} />
                  <Typography variant="bodySmall" style={{ color: getStatusColor(item.status) }}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Typography>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Transaction History"
        onMenuPress={toggleSidebar}
        leftAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        }
        rightAction={
          <TouchableOpacity onPress={handleDownload}>
            <Ionicons name="download-outline" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1 }}>
        {/* Search and Filters */}
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing.lg,
          paddingBottom: Spacing.md,
        }}>
          {/* Search Bar */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.background.primary,
            borderRadius: BorderRadius.md,
            paddingHorizontal: Spacing.md,
            marginBottom: Spacing.lg,
            borderWidth: 1,
            borderColor: Colors.border.primary,
          }}>
            <Ionicons name="search" size={20} color={Colors.text.tertiary} style={{ marginRight: Spacing.sm }} />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: Colors.text.primary,
                paddingVertical: Spacing.md,
              }}
              placeholder="Search transactions..."
              placeholderTextColor={Colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Buttons */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
              {filterOptions.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  onPress={() => setSelectedFilter(filter.key)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.sm,
                    backgroundColor: selectedFilter === filter.key 
                      ? Colors.primary.blue 
                      : Colors.background.primary,
                    borderRadius: BorderRadius.full,
                    borderWidth: 1,
                    borderColor: selectedFilter === filter.key 
                      ? Colors.primary.blue 
                      : Colors.border.primary,
                  }}
                >
                  <Ionicons 
                    name={filter.icon as any} 
                    size={16} 
                    color={selectedFilter === filter.key ? Colors.neutral.white : Colors.text.secondary}
                    style={{ marginRight: Spacing.xs }}
                  />
                  <Typography 
                    variant="bodySmall" 
                    weight="medium"
                    style={{ 
                      color: selectedFilter === filter.key ? Colors.neutral.white : Colors.text.secondary 
                    }}
                  >
                    {filter.label}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Transaction List */}
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: Layout.screenMargin.mobile,
            paddingBottom: 32,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            searchQuery || selectedFilter !== 'all' ? (
              <View style={{ alignItems: 'center', paddingTop: Spacing['3xl'] }}>
                <Ionicons name="search-outline" size={64} color={Colors.text.tertiary} />
                <Typography variant="h3" weight="semibold" style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm }}>
                  No transactions found
                </Typography>
                <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
                  Try adjusting your search or filters
                </Typography>
              </View>
            ) : (
              <EmptyTransactionHistory
                onStartMining={() => router.push('/(app)/mining')}
              />
            )
          }
        />
      </View>
    </View>
  );
}
