'use client';

import React, { useState } from 'react';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { ChevronLeft, ChevronRight, Search, Filter, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

export interface ModernDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    totalItems: number;
  };
  actions?: (item: T) => React.ReactNode;
  className?: string;
  emptyState?: {
    title: string;
    description: string;
    action?: React.ReactNode;
  };
}

export function ModernDataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  searchable = false,
  searchPlaceholder = "Search...",
  onSearch,
  pagination,
  actions,
  className,
  emptyState
}: ModernDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  if (loading) {
    return (
      <Card className={cn(
        "overflow-hidden bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl",
        className
      )}>
        <div className="p-8 animate-pulse space-y-6">
          {searchable && (
            <div className="h-10 bg-background-secondary/50 rounded-lg w-1/3"></div>
          )}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-background-secondary/30 rounded-xl">
              <div className="w-12 h-12 bg-background-secondary/50 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-background-secondary/50 rounded w-1/4"></div>
                <div className="h-3 bg-background-secondary/30 rounded w-1/3"></div>
              </div>
              <div className="w-20 h-6 bg-background-secondary/50 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (data.length === 0 && !loading) {
    return (
      <Card className={cn(
        "p-16 text-center bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl",
        className
      )}>
        <div className="space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 bg-background-secondary/50 rounded-full flex items-center justify-center mx-auto border border-border-accent/30">
            <Filter className="h-8 w-8 text-text-muted" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-text-primary">
              {emptyState?.title || 'No data found'}
            </h3>
            <p className="text-text-secondary">
              {emptyState?.description || 'There are no items to display at the moment.'}
            </p>
          </div>
          {emptyState?.action && (
            <div className="flex justify-center">
              {emptyState.action}
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "overflow-hidden bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl",
      className
    )}>
      {/* Header with search */}
      {searchable && (
        <div className="p-6 border-b border-border-accent/20">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-background-secondary/50 border-border-accent/30 text-text-primary placeholder-text-muted focus:border-brand-primary/50 focus:ring-brand-primary/20"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-background-secondary/50 to-background-secondary/30 border-b border-border-accent/20">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider",
                    column.sortable && "cursor-pointer hover:text-brand-primary transition-colors duration-300",
                    column.className
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortColumn === column.key && (
                      <div className={cn(
                        "w-0 h-0 border-l-4 border-r-4 border-transparent transition-transform duration-300",
                        sortDirection === 'asc' ? "border-b-4 border-b-brand-primary" : "border-t-4 border-t-brand-primary"
                      )}></div>
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-accent/10">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className="group hover:bg-gradient-to-r hover:from-background-secondary/20 hover:to-background-secondary/10 transition-all duration-300"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn(
                      "px-6 py-5 whitespace-nowrap text-sm",
                      column.className
                    )}
                  >
                    {column.render 
                      ? column.render(item[column.key], item)
                      : String(item[column.key])
                    }
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-5 whitespace-nowrap text-sm">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="p-6 border-t border-border-accent/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-text-secondary">
              Showing <span className="font-semibold text-text-primary">
                {((pagination.currentPage - 1) * pagination.pageSize) + 1}
              </span> to{' '}
              <span className="font-semibold text-text-primary">
                {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
              </span> of{' '}
              <span className="font-semibold text-brand-primary">{pagination.totalItems}</span> results
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 border border-border-accent/30 hover:border-brand-primary/30 transition-all duration-300 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-text-secondary">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 border border-border-accent/30 hover:border-brand-primary/30 transition-all duration-300 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
