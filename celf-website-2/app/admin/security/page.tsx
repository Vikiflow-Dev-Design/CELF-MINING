'use client';

import React from 'react';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import {
  Shield,
  Eye,
  AlertTriangle,
  Lock,
  Activity,
  FileText,
  RefreshCw,
  Download
} from 'lucide-react';

export default function AdminSecurity() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security & Audit</h1>
            <p className="text-gray-600">Monitor security events and system activity</p>
          </div>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Security Status</p>
                <p className="text-2xl font-bold text-green-600">Secure</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed Logins</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audit Logs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No audit logs available</p>
              <p className="text-sm text-gray-500 mt-2">
                System activity will be logged here
              </p>
            </div>
          </Card>

          {/* Login Attempts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Login Attempts</h3>
              </div>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            
            <div className="text-center py-8">
              <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No failed login attempts</p>
              <p className="text-sm text-gray-500 mt-2">
                Failed login attempts will be monitored here
              </p>
            </div>
          </Card>
        </div>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Security Configuration</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">IP Restrictions</h4>
                <p className="text-sm text-gray-600">
                  Limit admin access to specific IP addresses
                </p>
              </div>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Session Timeout</h4>
                <p className="text-sm text-gray-600">
                  Automatically log out inactive admin sessions
                </p>
              </div>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Audit Logging</h4>
                <p className="text-sm text-gray-600">
                  Log all admin actions and system events
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-green-600 mr-2">Active</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Security Events</h3>
          </div>

          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent security events</p>
            <p className="text-sm text-gray-500 mt-2">
              Security events and alerts will appear here
            </p>
          </div>
        </Card>

        {/* System Health */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">API Status: Online</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Database: Connected</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Security: Active</span>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
