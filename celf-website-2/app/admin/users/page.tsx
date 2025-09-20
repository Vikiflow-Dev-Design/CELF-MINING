'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

import { adminApi, AdminUser } from '@/src/lib/admin-api';
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  User
} from 'lucide-react';

interface UserTableProps {
  users: AdminUser[];
  onUserAction: (userId: string, action: string) => void;
  loading: boolean;
}

function UserTable({ users, onUserAction, loading }: UserTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
        <div className="animate-pulse space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-background-secondary/30 rounded-xl">
              <div className="w-12 h-12 bg-background-secondary/50 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-background-secondary/50 rounded w-1/4"></div>
                <div className="h-3 bg-background-secondary/30 rounded w-1/3"></div>
              </div>
              <div className="w-20 h-6 bg-background-secondary/50 rounded"></div>
              <div className="w-24 h-8 bg-background-secondary/50 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-background-secondary/50 to-background-secondary/30 border-b border-border-accent/20">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border-accent/30 bg-background-secondary/50" />
                  <span>User</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-accent/10">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-gradient-to-r hover:from-background-secondary/20 hover:to-background-secondary/10 transition-all duration-300">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <input type="checkbox" className="rounded border-border-accent/30 bg-background-secondary/50" />
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/30">
                        <User className="h-6 w-6 text-brand-primary" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background-card ${
                        (user.is_active ?? user.isActive) ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors duration-300">
                        {user.first_name || user.firstName} {user.last_name || user.lastName}
                      </div>
                      <div className="text-sm text-text-secondary">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                    user.role === 'admin'
                      ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    user.role === 'moderator'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-background-secondary/50 text-text-secondary border-border-accent/30'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      (user.is_active ?? user.isActive) ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      (user.is_active ?? user.isActive) ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {(user.is_active ?? user.isActive) ? 'Active' : 'Suspended'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm font-semibold text-text-primary">
                    {user.wallets?.totalBalance ? `${user.wallets.totalBalance.toFixed(2)} CELF` : '0.00 CELF'}
                  </div>
                  <div className="text-xs text-text-muted">
                    {user.wallets?.sendableBalance ? `${user.wallets.sendableBalance.toFixed(2)} sendable` : 'No balance'}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-text-secondary">
                  {formatDate(user.created_at || user.createdAt)}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onUserAction(user.id, 'view')}
                    className="text-brand-primary hover:text-brand-primary-dark hover:bg-brand-primary/20 border border-brand-primary/30 hover:border-brand-primary/50 transition-all duration-300"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminApi.getAllUsers({
        page: currentPage,
        limit: 20,
        search: searchTerm || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined
      });

      if (response.success && response.data) {
        setUsers(response.data.users);
        setTotalPages(response.data.pagination.totalPages);
        setTotalUsers(response.data.pagination.total);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    if (action === 'view') {
      router.push(`/admin/users/${userId}`);
    }
  };



  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, roleFilter, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-text-primary to-brand-primary bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-text-secondary text-lg">Manage and monitor user accounts</p>
            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{totalUsers.toLocaleString()} total users</span>
              </div>
              <div className="w-1 h-4 bg-border-accent"></div>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={fetchUsers}
              variant="secondary"
              className="bg-background-card/50 border-border-accent/50 text-text-primary hover:bg-background-card hover:border-brand-primary/50 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black hover:from-brand-primary-dark hover:to-brand-primary shadow-glow hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Users className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Users',
              value: totalUsers.toLocaleString(),
              icon: Users,
              color: 'text-blue-400',
              bg: 'bg-blue-500/20',
              border: 'border-blue-500/30',
              change: '+12 this week'
            },
            {
              title: 'Active Users',
              value: users.filter(u => u.isActive).length,
              icon: UserCheck,
              color: 'text-green-400',
              bg: 'bg-green-500/20',
              border: 'border-green-500/30',
              change: `${Math.round((users.filter(u => u.isActive).length / totalUsers) * 100)}% active`
            },
            {
              title: 'Suspended',
              value: users.filter(u => !u.isActive).length,
              icon: UserX,
              color: 'text-red-400',
              bg: 'bg-red-500/20',
              border: 'border-red-500/30',
              change: '-3 this week'
            },
            {
              title: 'Administrators',
              value: users.filter(u => u.role === 'admin').length,
              icon: Filter,
              color: 'text-purple-400',
              bg: 'bg-purple-500/20',
              border: 'border-purple-500/30',
              change: 'No changes'
            }
          ].map((stat, index) => (
            <Card key={stat.title} className="group p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 hover:border-brand-primary/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-secondary mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-text-primary group-hover:text-brand-primary transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-muted mt-2">{stat.change}</p>
                </div>
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center border ${stat.border} group-hover:border-brand-primary/50 transition-all duration-300 group-hover:shadow-glow`}>
                  <stat.icon className={`h-7 w-7 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
              <Search className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Search & Filter</h3>
              <p className="text-xs text-text-secondary">Find specific users quickly</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary" />
                  <Input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background-secondary/50 border-border-accent/30 text-text-primary placeholder-text-muted focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-background-secondary/50 border border-border-accent/30 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/50 transition-all duration-300"
                >
                  <option value="">All Roles</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-background-secondary/50 border border-border-accent/30 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/50 transition-all duration-300"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Suspended</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-accent/20">
              <div className="flex items-center space-x-4 text-sm text-text-muted">
                <span>Showing {users.length} of {totalUsers} users</span>
                {(searchTerm || roleFilter || statusFilter) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setRoleFilter('');
                      setStatusFilter('');
                    }}
                    className="text-text-secondary hover:text-brand-primary transition-colors duration-300"
                  >
                    Clear filters
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  type="submit"
                  variant="secondary"
                  className="bg-background-secondary/50 border-border-accent/50 text-text-primary hover:bg-background-secondary hover:border-brand-primary/50 transition-all duration-300"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button
                  type="button"
                  className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black hover:from-brand-primary-dark hover:to-brand-primary transition-all duration-300"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Users Table */}
        {error ? (
          <Card className="p-6 text-center">
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchUsers} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </Card>
        ) : (
          <UserTable users={users} onUserAction={handleUserAction} loading={loading} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-text-secondary">
                  Showing <span className="font-semibold text-text-primary">{((currentPage - 1) * 20) + 1}</span> to{' '}
                  <span className="font-semibold text-text-primary">{Math.min(currentPage * 20, totalUsers)}</span> of{' '}
                  <span className="font-semibold text-brand-primary">{totalUsers}</span> users
                </p>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                  <span className="text-xs text-text-muted">Live data</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 border border-border-accent/30 hover:border-brand-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black shadow-glow'
                            : 'text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 border border-border-accent/30 hover:border-brand-primary/30'
                        } transition-all duration-300`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 border border-border-accent/30 hover:border-brand-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        )}

      </div>
    </AdminLayout>
  );
}
