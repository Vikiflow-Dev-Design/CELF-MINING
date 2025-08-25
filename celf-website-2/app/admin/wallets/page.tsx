'use client';

import React from 'react';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import {
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  Filter,
  Download,
  Eye,
  AlertCircle
} from 'lucide-react';

export default function AdminWallets() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wallet Management</h1>
            <p className="text-gray-600">Monitor wallets and transaction activity</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Wallet Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Wallets</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">0.00 CELF</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">0.00 CELF</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Received</p>
                <p className="text-2xl font-bold text-gray-900">0.00 CELF</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search wallets by address or user..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EFF00]"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        {/* Wallets Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Wallets</h3>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="text-center py-12">
            <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-medium text-gray-600 mb-2">No Wallets Found</p>
            <p className="text-gray-500 mb-6">
              Wallet data will appear here once users start creating accounts and mining tokens.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• User wallets will be automatically created upon registration</p>
              <p>• Track sendable and non-sendable token balances</p>
              <p>• Monitor transaction history and mining rewards</p>
              <p>• Manage wallet security and restrictions</p>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-medium text-gray-600 mb-2">No Transactions Yet</p>
            <p className="text-gray-500 mb-6">
              Transaction history will be displayed here once users start mining and transferring tokens.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Monitor all CELF token transactions</p>
              <p>• Track mining rewards and transfers</p>
              <p>• View transaction status and confirmations</p>
              <p>• Export transaction data for analysis</p>
            </div>
          </div>
        </Card>

        {/* Wallet Security */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertCircle className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Wallet Security</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Wallet Monitoring</h4>
                  <p className="text-sm text-gray-600">
                    Monitor suspicious wallet activity
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 mr-2">Active</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Transaction Limits</h4>
                  <p className="text-sm text-gray-600">
                    Enforce daily transaction limits
                  </p>
                </div>
                <Button size="sm" variant="outline" disabled>
                  Configure
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Fraud Detection</h4>
                  <p className="text-sm text-gray-600">
                    Automatically detect fraudulent activity
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 mr-2">Active</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Wallet Backup</h4>
                  <p className="text-sm text-gray-600">
                    Automated wallet data backup
                  </p>
                </div>
                <Button size="sm" variant="outline" disabled>
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
