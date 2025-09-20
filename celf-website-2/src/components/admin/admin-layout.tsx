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
  User,
  ChevronRight,
  Home,
  Activity,
  TrendingUp
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Breadcrumb component
function Breadcrumb() {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Admin', href: '/admin', icon: Home }];

    if (paths.length > 1) {
      const currentPage = paths[paths.length - 1];
      const parentPath = paths.slice(0, -1).join('/');

      // Find the current page in sidebar items
      const currentItem = sidebarItems.find(item =>
        item.href === pathname || item.href.includes(currentPage)
      );

      if (currentItem) {
        breadcrumbs.push({
          name: currentItem.title,
          href: currentItem.href,
          icon: currentItem.icon
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.href}>
          {index > 0 && <ChevronRight className="h-4 w-4 text-text-muted" />}
          <Link
            href={crumb.href}
            className={`flex items-center space-x-1 hover:text-brand-primary transition-colors ${
              index === breadcrumbs.length - 1 ? 'text-brand-primary font-medium' : ''
            }`}
          >
            <crumb.icon className="h-4 w-4" />
            <span>{crumb.name}</span>
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Overview and analytics',
    category: 'main'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'User management',
    category: 'management'
  },
  {
    title: 'Tasks',
    href: '/admin/tasks',
    icon: FileText,
    description: 'Task management',
    category: 'management'
  },
  {
    title: 'Mining',
    href: '/admin/mining',
    icon: Pickaxe,
    description: 'Mining operations',
    category: 'operations'
  },
  {
    title: 'Wallets',
    href: '/admin/wallets',
    icon: Wallet,
    description: 'Wallet management',
    category: 'operations'
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText,
    description: 'Content management',
    category: 'management'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System settings',
    category: 'system'
  },
  {
    title: 'Security',
    href: '/admin/security',
    icon: Shield,
    description: 'Security & audit',
    category: 'system'
  }
];

const categoryLabels = {
  main: 'Overview',
  management: 'Management',
  operations: 'Operations',
  system: 'System'
};

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-primary to-background-secondary/30 relative overflow-hidden lg:flex">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand-primary/3 to-transparent rounded-full"></div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-background-secondary to-background-primary border-r border-border-accent/30 shadow-2xl backdrop-blur-xl transform transition-all duration-500 ease-out lg:relative lg:translate-x-0 lg:flex-shrink-0 lg:h-screen lg:flex lg:flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'lg:w-20 w-20' : 'lg:w-72 w-72'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-border-accent/20 bg-gradient-to-r from-brand-primary/5 to-transparent lg:flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-black font-bold text-lg">C</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            {!sidebarCollapsed && (
              <div>
                <span className="text-xl font-bold text-text-primary">CELF Admin</span>
                <div className="text-xs text-text-secondary">Control Panel</div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex text-text-secondary hover:text-text-primary hover:bg-background-card/50 rounded-lg"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-text-secondary hover:text-text-primary hover:bg-background-card/50 rounded-lg"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar min-h-0">
          {Object.entries(categoryLabels).map(([category, label]) => {
            const categoryItems = sidebarItems.filter(item => item.category === category);

            return (
              <div key={category} className="space-y-2">
                {!sidebarCollapsed && (
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      {label}
                    </h3>
                  </div>
                )}
                <div className="space-y-1">
                  {categoryItems.map((item) => {
                    const isActive = pathname === item.href ||
                      (item.href !== '/admin' && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] ${
                          isActive
                            ? 'bg-gradient-to-r from-brand-primary/20 to-brand-primary/10 text-brand-primary border border-brand-primary/30 shadow-lg backdrop-blur-sm'
                            : 'text-text-secondary hover:bg-gradient-to-r hover:from-background-card/50 hover:to-background-card/30 hover:text-text-primary border border-transparent hover:border-border-accent/30'
                        } ${sidebarCollapsed ? 'justify-center' : ''}`}
                        onClick={() => setSidebarOpen(false)}
                        title={sidebarCollapsed ? item.title : ''}
                      >
                        <div className={`${sidebarCollapsed ? '' : 'mr-3'} p-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-brand-primary/20 shadow-sm'
                            : 'bg-background-card/30 group-hover:bg-brand-primary/10'
                        }`}>
                          <item.icon className={`h-5 w-5 ${
                            isActive ? 'text-brand-primary' : 'text-brand-primary'
                          }`} />
                        </div>
                        {!sidebarCollapsed && (
                          <div className="flex-1">
                            <div className={`font-semibold ${isActive ? 'text-brand-primary' : ''}`}>
                              {item.title}
                            </div>
                            <div className={`text-xs opacity-75 ${
                              isActive ? 'text-brand-primary/80' : 'text-text-muted'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        )}
                        {isActive && !sidebarCollapsed && (
                          <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-glow"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="lg:flex-shrink-0 p-4 border-t border-border-accent/20 bg-gradient-to-t from-background-primary/80 to-transparent backdrop-blur-sm">
          <div className={`flex items-center mb-4 p-3 rounded-xl bg-background-card/30 border border-border-accent/20 ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/30">
                <User className="h-5 w-5 text-brand-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background-secondary"></div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                </p>
                <p className="text-xs text-text-secondary truncate capitalize">
                  {user?.role || 'guest'} • Online
                </p>
              </div>
            )}
          </div>
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              className={`w-full text-text-secondary hover:text-text-primary hover:bg-background-card/50 transition-all duration-300 rounded-lg border border-transparent hover:border-border-accent/30 ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
              onClick={handleLogout}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <LogOut className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && <span>Sign Out</span>}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className={`w-full text-text-secondary hover:text-text-primary hover:bg-background-card/50 transition-all duration-300 rounded-lg border border-transparent hover:border-border-accent/30 ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
              asChild
              title={sidebarCollapsed ? 'Sign In' : ''}
            >
              <Link href="/auth/login">
                <LogOut className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                {!sidebarCollapsed && <span>Sign In</span>}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:flex lg:flex-col min-w-0 lg:h-screen lg:overflow-hidden">
        {/* Top header */}
        <header className="lg:flex-shrink-0 z-40 bg-gradient-to-r from-background-secondary/95 to-background-primary/95 shadow-xl border-b border-border-accent/30 backdrop-blur-xl">
          <div className="flex items-center justify-between h-20 px-6">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-text-secondary hover:text-text-primary hover:bg-background-card/50 rounded-lg p-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>

              <div className="hidden md:flex items-center space-x-3 bg-background-card/50 rounded-xl px-4 py-3 border border-border-accent/30 backdrop-blur-sm min-w-[300px]">
                <Search className="h-5 w-5 text-brand-primary" />
                <input
                  type="text"
                  placeholder="Search admin panel..."
                  className="border-0 bg-transparent text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-0 flex-1"
                />
                <div className="text-xs text-text-muted bg-background-secondary/50 px-2 py-1 rounded border border-border-accent/20">
                  ⌘K
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Activity indicator */}
              <div className="hidden sm:flex items-center space-x-2 text-sm text-text-secondary">
                <Activity className="h-4 w-4 text-green-400" />
                <span>System Online</span>
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-text-secondary hover:text-brand-primary hover:bg-background-card/50 transition-all duration-300 rounded-lg p-2"
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </Button>

              {/* User profile */}
              <div className="flex items-center space-x-3 bg-background-card/30 rounded-xl px-3 py-2 border border-border-accent/20">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/30">
                    <User className="h-4 w-4 text-brand-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background-secondary"></div>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-text-primary">
                    {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                  </p>
                  <p className="text-xs text-text-secondary capitalize">{user?.role || 'guest'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 bg-gradient-to-br from-background-primary via-background-primary to-background-secondary/50 min-h-0 overflow-y-auto custom-scrollbar">
          <Breadcrumb />
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
