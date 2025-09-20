'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { adminApi, AdminUser } from '@/src/lib/admin-api';
import {
  User,
  ArrowLeft,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Wallet,
  Activity,
  Shield,
  Clock,
  TrendingUp,
  Pickaxe,
  CreditCard
} from 'lucide-react';

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminApi.getUserById(userId);

      if (response.success && response.data) {
        setUser(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch user details');
      }
    } catch (err) {
      console.error('Failed to fetch user details:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleUserAction = async (action: string) => {
    if (!user) return;

    try {
      switch (action) {
        case 'suspend':
          await adminApi.suspendUser(user.id, 'Suspended by admin');
          break;
        case 'activate':
          await adminApi.activateUser(user.id);
          break;
        case 'delete':
          if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            await adminApi.deleteUser(user.id);
            router.push('/admin/users');
            return;
          } else {
            return;
          }
        case 'edit':
          // TODO: Navigate to edit page
          alert('Edit functionality coming soon');
          return;
        default:
          return;
      }

      // Refresh user data
      fetchUserDetails();
    } catch (err) {
      console.error(`Failed to ${action} user:`, err);
      alert(`Failed to ${action} user`);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-background-secondary/50 rounded-lg animate-pulse"></div>
            <div className="h-8 bg-background-secondary/50 rounded w-48 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-8 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-background-secondary/50 rounded w-1/3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-background-secondary/30 rounded w-full"></div>
                      <div className="h-4 bg-background-secondary/30 rounded w-2/3"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
                <div className="animate-pulse space-y-4">
                  <div className="w-20 h-20 bg-background-secondary/50 rounded-full mx-auto"></div>
                  <div className="h-6 bg-background-secondary/50 rounded w-2/3 mx-auto"></div>
                  <div className="h-4 bg-background-secondary/30 rounded w-1/2 mx-auto"></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !user) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-8 text-center bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl max-w-md">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
                <User className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">User Not Found</h3>
              <p className="text-text-secondary">{error || 'The requested user could not be found.'}</p>
              <Button 
                onClick={() => router.push('/admin/users')}
                className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black hover:from-brand-primary-dark hover:to-brand-primary transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
            </div>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push('/admin/users')}
              variant="ghost"
              className="text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 border border-border-accent/30 hover:border-brand-primary/30 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
            <div className="w-1 h-8 bg-border-accent"></div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-text-secondary">User Details & Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => handleUserAction('edit')}
              variant="secondary"
              className="bg-background-card/50 border-border-accent/50 text-text-primary hover:bg-background-card hover:border-brand-primary/50 transition-all duration-300"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit User
            </Button>
            
            {(user.is_active ?? user.isActive) ? (
              <Button
                onClick={() => handleUserAction('suspend')}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300"
              >
                <UserX className="h-4 w-4 mr-2" />
                Suspend User
              </Button>
            ) : (
              <Button
                onClick={() => handleUserAction('activate')}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Activate User
              </Button>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card className="p-8 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
                  <User className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">Basic Information</h3>
                  <p className="text-sm text-text-secondary">User account details</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-background-secondary/30 rounded-xl border border-border-accent/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <User className="h-4 w-4 text-brand-primary" />
                      <span className="text-sm font-medium text-text-secondary">Full Name</span>
                    </div>
                    <p className="text-lg font-semibold text-text-primary">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-background-secondary/30 rounded-xl border border-border-accent/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <Mail className="h-4 w-4 text-brand-primary" />
                      <span className="text-sm font-medium text-text-secondary">Email Address</span>
                    </div>
                    <p className="text-lg font-semibold text-text-primary">{user.email}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-background-secondary/30 rounded-xl border border-border-accent/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="h-4 w-4 text-brand-primary" />
                      <span className="text-sm font-medium text-text-secondary">Role</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${
                        user.role === 'admin' 
                          ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        user.role === 'moderator' 
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                          : 'bg-background-secondary/50 text-text-secondary border-border-accent/30'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-background-secondary/30 rounded-xl border border-border-accent/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <Activity className="h-4 w-4 text-brand-primary" />
                      <span className="text-sm font-medium text-text-secondary">Status</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        (user.is_active ?? user.isActive) ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                      }`}></div>
                      <span className={`text-lg font-semibold ${
                        (user.is_active ?? user.isActive) ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {(user.is_active ?? user.isActive) ? 'Active' : 'Suspended'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Statistics */}
            <Card className="p-8 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
                  <TrendingUp className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">Account Statistics</h3>
                  <p className="text-sm text-text-secondary">User activity and performance metrics</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-background-secondary/30 to-background-secondary/10 rounded-xl border border-border-accent/20 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-brand-primary/30">
                    <Wallet className="h-6 w-6 text-brand-primary" />
                  </div>
                  <p className="text-2xl font-bold text-text-primary mb-1">
                    {user.balance?.toLocaleString() || '0'} CELF
                  </p>
                  <p className="text-sm text-text-secondary">Total Balance</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-background-secondary/30 to-background-secondary/10 rounded-xl border border-border-accent/20 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                    <Pickaxe className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-text-primary mb-1">
                    {user.totalMined?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm text-text-secondary">Total Mined</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-background-secondary/30 to-background-secondary/10 rounded-xl border border-border-accent/20 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                    <CreditCard className="h-6 w-6 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-text-primary mb-1">
                    {user.totalTransactions || '0'}
                  </p>
                  <p className="text-sm text-text-secondary">Transactions</p>
                </div>
              </div>
            </Card>

            {/* Account Timeline */}
            <Card className="p-8 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
                  <Clock className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">Account Timeline</h3>
                  <p className="text-sm text-text-secondary">Important dates and milestones</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-background-secondary/20 rounded-xl border border-border-accent/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                    <Calendar className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-primary">Account Created</p>
                    <p className="text-sm text-text-secondary">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Unknown'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-background-secondary/20 rounded-xl border border-border-accent/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
                    <Activity className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-primary">Last Activity</p>
                    <p className="text-sm text-text-secondary">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Never logged in'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Avatar & Quick Info */}
            <Card className="p-6 text-center bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-full flex items-center justify-center border-4 border-brand-primary/30">
                  <User className="h-12 w-12 text-brand-primary" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background-primary ${
                  (user.is_active ?? user.isActive) ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-1">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-text-secondary mb-4">{user.email}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background-secondary/30 rounded-lg border border-border-accent/20">
                  <span className="text-sm text-text-secondary">User ID</span>
                  <span className="text-sm font-mono text-text-primary">{user.id}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-background-secondary/30 rounded-lg border border-border-accent/20">
                  <span className="text-sm text-text-secondary">Role</span>
                  <span className={`text-sm font-semibold ${
                    user.role === 'admin' ? 'text-red-400' :
                    user.role === 'moderator' ? 'text-blue-400' : 'text-text-primary'
                  }`}>
                    {user.role}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-background-secondary/30 rounded-lg border border-border-accent/20">
                  <span className="text-sm text-text-secondary">Status</span>
                  <span className={`text-sm font-semibold ${
                    (user.is_active ?? user.isActive) ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {(user.is_active ?? user.isActive) ? 'Active' : 'Suspended'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <Button
                  onClick={() => handleUserAction('edit')}
                  className="w-full bg-background-secondary/50 border border-border-accent/50 text-text-primary hover:bg-background-secondary hover:border-brand-primary/50 transition-all duration-300 justify-start"
                >
                  <Edit className="h-4 w-4 mr-3" />
                  Edit User Details
                </Button>

                {(user.is_active ?? user.isActive) ? (
                  <Button
                    onClick={() => handleUserAction('suspend')}
                    className="w-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-300 justify-start"
                  >
                    <UserX className="h-4 w-4 mr-3" />
                    Suspend Account
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUserAction('activate')}
                    className="w-full bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 hover:border-green-500/50 transition-all duration-300 justify-start"
                  >
                    <UserCheck className="h-4 w-4 mr-3" />
                    Activate Account
                  </Button>
                )}

                <Button
                  onClick={() => handleUserAction('delete')}
                  className="w-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-300 justify-start"
                >
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
