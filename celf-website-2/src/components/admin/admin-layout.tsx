'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/lib/auth-context';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import {
  LayoutDashboard,
  Users,
  Pickaxe,
  Wallet,
  FileText,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'User management'
  },
  {
    title: 'Mining',
    href: '/admin/mining',
    icon: Pickaxe,
    description: 'Mining operations'
  },
  {
    title: 'Wallets',
    href: '/admin/wallets',
    icon: Wallet,
    description: 'Wallet management'
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText,
    description: 'Content management'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System settings'
  },
  {
    title: 'Security',
    href: '/admin/security',
    icon: Shield,
    description: 'Security & audit'
  }
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Temporarily allow access to anyone - remove role check for now
  // TODO: Re-enable role-based access control when admin accounts are set up
  /*
  if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin dashboard.
          </p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </Card>
      </div>
    );
  }
  */

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-75 lg:hidden backdrop-blur-celf"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background-secondary border-r border-border-accent shadow-card transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border-accent">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-black font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-text-primary">CELF Admin</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1 ${
                    isActive
                      ? 'bg-brand-primary text-black shadow-glow'
                      : 'text-text-secondary hover:bg-background-card hover:text-text-primary border border-border-accent'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <div>
                    <div>{item.title}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-default bg-card">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center border border-accent">
              <User className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">
                {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
              </p>
              <p className="text-xs text-secondary truncate">{user?.role || 'guest'}</p>
            </div>
          </div>
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-secondary hover:text-primary hover:bg-card transition-default"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-secondary hover:text-primary hover:bg-card transition-default"
              asChild
            >
              <Link href="/auth/login">
                <LogOut className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-background-secondary shadow-card border-b border-border-accent backdrop-blur-celf">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-text-secondary hover:text-text-primary"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="hidden md:flex items-center space-x-2 bg-background-card rounded-lg px-3 py-2 border border-border-accent">
                <Search className="h-5 w-5 text-text-accent" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-0 bg-transparent text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-secondary hover:text-accent hover:bg-card transition-default">
                <Bell className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center border border-accent">
                  <User className="h-4 w-4 text-accent" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-primary">
                    {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                  </p>
                  <p className="text-xs text-secondary">{user?.role || 'guest'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
