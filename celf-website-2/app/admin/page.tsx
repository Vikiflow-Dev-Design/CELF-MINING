'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { adminApi, AdminStats } from '@/src/lib/admin-api';
import {
  Users,
  Pickaxe,
  CreditCard,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  description?: string;
}

function StatCard({ title, value, change, changeType, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="p-6 bg-card border-accent hover:border-accent-hover transition-default hover-lift-sm shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary">{title}</p>
          <p className="text-2xl font-bold text-primary mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${
              changeType === 'positive' ? 'text-[#9EFF00]' :
              changeType === 'negative' ? 'text-red-400' : 'text-secondary'
            }`}>
              {change}
            </p>
          )}
          {description && (
            <p className="text-xs text-muted mt-1">{description}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center border border-accent shadow-glow">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
    </Card>
  );
}

interface ActivityItem {
  type: string;
  id: string;
  description: string;
  timestamp: string;
}

function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return <Users className="h-4 w-4 text-blue-400" />;
      case 'transaction':
        return <CreditCard className="h-4 w-4 text-[#9EFF00]" />;
      case 'mining_session':
        return <Pickaxe className="h-4 w-4 text-yellow-400" />;
      default:
        return <Activity className="h-4 w-4 text-accent" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="p-6 bg-card border-accent hover:border-accent-hover transition-default shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">Recent Activity</h3>
        <Button variant="ghost" size="sm" className="text-secondary hover:text-accent hover:bg-secondary transition-default">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-secondary text-center py-4">No recent activity</p>
        ) : (
          activities.map((activity, index) => (
            <div key={`${activity.type}-${activity.id}-${index}`} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50 border border-accent/20 hover:border-accent/40 transition-default">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary">{activity.description}</p>
                <p className="text-xs text-muted">{formatTimestamp(activity.timestamp)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsResponse, activityResponse] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getRecentActivity(10)
      ]);

      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }

      if (activityResponse.success && activityResponse.data) {
        setRecentActivity(activityResponse.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9EFF00] shadow-glow"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-secondary">Welcome to the CELF admin control panel</p>
          </div>
          <Button onClick={fetchDashboardData} className="bg-[#9EFF00] text-black hover:bg-[#7ACC00] shadow-glow transition-default">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={stats.users.total.toLocaleString()}
              change={`${stats.users.active} active`}
              changeType="positive"
              icon={Users}
              description="Registered users"
            />
            
            <StatCard
              title="Active Mining"
              value={stats.mining.activeSessions.toLocaleString()}
              change={`${stats.mining.totalCelfMined.toFixed(2)} CELF mined`}
              changeType="positive"
              icon={Pickaxe}
              description="Active sessions"
            />
            
            <StatCard
              title="Today's Transactions"
              value={stats.transactions.today.toLocaleString()}
              icon={CreditCard}
              description="Transactions today"
            />
            
            <StatCard
              title="Pending Applications"
              value={(stats.applications.pendingMentorship + 
                     stats.applications.pendingScholarship + 
                     stats.applications.pendingContact).toLocaleString()}
              change={`${stats.applications.pendingContact} contact forms`}
              changeType="neutral"
              icon={Clock}
              description="Require attention"
            />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <RecentActivity activities={recentActivity} />

          {/* Quick Actions */}
          <Card className="p-6 bg-card border-accent hover:border-accent-hover transition-default shadow-card">
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-secondary border-accent text-primary hover:bg-card hover:border-accent-hover transition-default" variant="outline" asChild>
                <a href="/admin/users">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </a>
              </Button>

              <Button className="w-full justify-start bg-secondary border-accent text-primary hover:bg-card hover:border-accent-hover transition-default" variant="outline" asChild>
                <a href="/admin/mining">
                  <Pickaxe className="h-4 w-4 mr-2" />
                  Mining Settings
                </a>
              </Button>

              <Button className="w-full justify-start bg-secondary border-accent text-primary hover:bg-card hover:border-accent-hover transition-default" variant="outline" asChild>
                <a href="/admin/content">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Review Applications
                </a>
              </Button>

              <Button className="w-full justify-start bg-secondary border-accent text-primary hover:bg-card hover:border-accent-hover transition-default" variant="outline" asChild>
                <a href="/admin/settings">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  System Settings
                </a>
              </Button>
            </div>
          </Card>
        </div>

        {/* System Status */}
        {stats && (
          <Card className="p-6 bg-card border-accent hover:border-accent-hover transition-default shadow-card">
            <h3 className="text-lg font-semibold text-primary mb-4">System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg border border-accent/20">
                <CheckCircle className="h-5 w-5 text-[#9EFF00]" />
                <span className="text-sm text-primary">API Status: Online</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg border border-accent/20">
                <CheckCircle className="h-5 w-5 text-[#9EFF00]" />
                <span className="text-sm text-primary">Database: Connected</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg border border-accent/20">
                <CheckCircle className="h-5 w-5 text-[#9EFF00]" />
                <span className="text-sm text-primary">Mining: Operational</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
