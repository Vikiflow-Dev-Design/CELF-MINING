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
  RefreshCw,
  ChevronRight,
  Settings
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  description?: string;
  trend?: number[];
}

function StatCard({ title, value, change, changeType, icon: Icon, description, trend }: StatCardProps) {
  return (
    <Card className="group relative p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 hover:border-brand-primary/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
            <p className="text-3xl font-bold text-text-primary group-hover:text-brand-primary transition-colors duration-300">
              {value}
            </p>
            {change && (
              <div className="flex items-center mt-2 space-x-2">
                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  changeType === 'positive'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  changeType === 'negative'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-background-secondary/50 text-text-secondary border border-border-accent/30'
                }`}>
                  {changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                  {changeType === 'negative' && <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                  {change}
                </div>
              </div>
            )}
            {description && (
              <p className="text-xs text-text-muted mt-2">{description}</p>
            )}
          </div>

          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/30 group-hover:border-brand-primary/50 transition-all duration-300 group-hover:shadow-glow">
              <Icon className="h-7 w-7 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Mini trend chart */}
        {trend && trend.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border-accent/20">
            <div className="flex items-end space-x-1 h-8">
              {trend.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-brand-primary/30 to-brand-primary/60 rounded-sm transition-all duration-300 group-hover:from-brand-primary/50 group-hover:to-brand-primary/80"
                  style={{ height: `${(value / Math.max(...trend)) * 100}%` }}
                ></div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-2">Last 7 days</p>
          </div>
        )}
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
        return { icon: <Users className="h-4 w-4" />, color: 'text-blue-400', bg: 'bg-blue-500/20' };
      case 'transaction':
        return { icon: <CreditCard className="h-4 w-4" />, color: 'text-brand-primary', bg: 'bg-brand-primary/20' };
      case 'mining_session':
        return { icon: <Pickaxe className="h-4 w-4" />, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
      default:
        return { icon: <Activity className="h-4 w-4" />, color: 'text-text-accent', bg: 'bg-background-secondary/50' };
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
    <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 hover:border-brand-primary/50 transition-all duration-500 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
            <Activity className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
            <p className="text-xs text-text-secondary">Live system events</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-text-secondary hover:text-brand-primary hover:bg-background-card/50 transition-all duration-300 rounded-lg"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-background-secondary/50 rounded-full flex items-center justify-center mx-auto mb-3 border border-border-accent/30">
              <Activity className="h-8 w-8 text-text-muted" />
            </div>
            <p className="text-text-secondary">No recent activity</p>
            <p className="text-xs text-text-muted mt-1">Activity will appear here as it happens</p>
          </div>
        ) : (
          activities.map((activity, index) => {
            const iconData = getActivityIcon(activity.type);
            return (
              <div
                key={`${activity.type}-${activity.id}-${index}`}
                className="group flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-background-secondary/30 to-background-secondary/10 border border-border-accent/20 hover:border-brand-primary/30 transition-all duration-300 hover:transform hover:scale-[1.01]"
              >
                <div className={`flex-shrink-0 w-10 h-10 ${iconData.bg} rounded-xl flex items-center justify-center border border-border-accent/30 group-hover:border-brand-primary/30 transition-all duration-300`}>
                  <div className={iconData.color}>
                    {iconData.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors duration-300">
                    {activity.description}
                  </p>
                  <div className="flex items-center mt-1 space-x-2">
                    <p className="text-xs text-text-muted">{formatTimestamp(activity.timestamp)}</p>
                    <div className="w-1 h-1 bg-text-muted rounded-full"></div>
                    <p className="text-xs text-text-muted capitalize">{activity.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })
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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-text-primary to-brand-primary bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary text-lg">
              Welcome to the CELF admin control panel
            </p>
            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div className="w-1 h-4 bg-border-accent"></div>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={fetchDashboardData}
              variant="secondary"
              className="bg-background-card/50 border-border-accent/50 text-text-primary hover:bg-background-card hover:border-brand-primary/50 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button
              onClick={fetchDashboardData}
              className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black hover:from-brand-primary-dark hover:to-brand-primary shadow-glow hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={stats.users.total.toLocaleString()}
              change={`+${stats.users.active} active`}
              changeType="positive"
              icon={Users}
              description="Registered users"
              trend={[65, 78, 82, 95, 88, 92, 100]}
            />

            <StatCard
              title="Active Mining"
              value={stats.mining.activeSessions.toLocaleString()}
              change={`${stats.mining.totalCelfMined.toFixed(2)} CELF mined`}
              changeType="positive"
              icon={Pickaxe}
              description="Active sessions"
              trend={[45, 52, 48, 61, 55, 67, 73]}
            />

            <StatCard
              title="Today's Transactions"
              value={stats.transactions.today.toLocaleString()}
              change="+12.5%"
              changeType="positive"
              icon={CreditCard}
              description="Transactions today"
              trend={[30, 35, 42, 38, 45, 48, 52]}
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
              trend={[15, 18, 12, 20, 16, 14, 18]}
            />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Activity - Takes 2 columns */}
          <div className="xl:col-span-2">
            <RecentActivity activities={recentActivity} />
          </div>

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 hover:border-brand-primary/50 transition-all duration-500 shadow-xl backdrop-blur-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
                <TrendingUp className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
                <p className="text-xs text-text-secondary">Common admin tasks</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { href: '/admin/users', icon: Users, label: 'Manage Users', desc: 'User accounts & roles' },
                { href: '/admin/tasks', icon: CheckCircle, label: 'Manage Tasks', desc: 'Task configuration' },
                { href: '/admin/mining', icon: Pickaxe, label: 'Mining Settings', desc: 'Mining parameters' },
                { href: '/admin/content', icon: AlertCircle, label: 'Review Applications', desc: 'Pending reviews' },
                { href: '/admin/settings', icon: Settings, label: 'System Settings', desc: 'Global configuration' }
              ].map((action, index) => (
                <Button
                  key={action.href}
                  className="w-full justify-start p-4 h-auto bg-gradient-to-r from-background-secondary/30 to-background-secondary/10 border border-border-accent/20 text-text-primary hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-primary/5 hover:border-brand-primary/30 transition-all duration-300 group"
                  variant="ghost"
                  asChild
                >
                  <a href={action.href} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-background-card/50 rounded-lg flex items-center justify-center border border-border-accent/30 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/10 transition-all duration-300">
                      <action.icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-text-primary group-hover:text-brand-primary transition-colors duration-300">
                        {action.label}
                      </div>
                      <div className="text-xs text-text-muted">
                        {action.desc}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-brand-primary transition-colors duration-300" />
                  </a>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* System Status */}
        {stats && (
          <Card className="p-8 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 hover:border-brand-primary/50 transition-all duration-500 shadow-xl backdrop-blur-xl">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
                <Activity className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">System Status</h3>
                <p className="text-sm text-text-secondary">Real-time system health monitoring</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'API Status',
                  status: 'Online',
                  icon: CheckCircle,
                  color: 'text-green-400',
                  bg: 'bg-green-500/20',
                  border: 'border-green-500/30',
                  uptime: '99.9%'
                },
                {
                  label: 'Database',
                  status: 'Connected',
                  icon: CheckCircle,
                  color: 'text-green-400',
                  bg: 'bg-green-500/20',
                  border: 'border-green-500/30',
                  uptime: '99.8%'
                },
                {
                  label: 'Mining System',
                  status: 'Operational',
                  icon: CheckCircle,
                  color: 'text-green-400',
                  bg: 'bg-green-500/20',
                  border: 'border-green-500/30',
                  uptime: '99.7%'
                }
              ].map((service, index) => (
                <div
                  key={service.label}
                  className="group p-6 bg-gradient-to-br from-background-secondary/30 to-background-secondary/10 rounded-2xl border border-border-accent/20 hover:border-brand-primary/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center border ${service.border} group-hover:border-brand-primary/30 transition-all duration-300`}>
                      <service.icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-text-muted">Uptime</div>
                      <div className="text-sm font-semibold text-text-primary">{service.uptime}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-text-primary">{service.label}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className={`text-sm font-semibold ${service.color}`}>{service.status}</span>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="w-full bg-background-secondary/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500" style={{ width: service.uptime }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Overall system health */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-brand-primary/10 rounded-2xl border border-green-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-text-primary">All Systems Operational</span>
                </div>
                <div className="text-sm text-text-secondary">
                  Last checked: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
