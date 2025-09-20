'use client';

import React from 'react';
import { Card } from '@/src/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModernStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  description?: string;
  trend?: number[];
  className?: string;
  loading?: boolean;
}

export function ModernStatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  description, 
  trend,
  className,
  loading = false
}: ModernStatCardProps) {
  if (loading) {
    return (
      <Card className={cn(
        "group relative p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl overflow-hidden",
        className
      )}>
        <div className="animate-pulse space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-background-secondary/50 rounded w-1/2"></div>
              <div className="h-8 bg-background-secondary/50 rounded w-3/4"></div>
            </div>
            <div className="w-14 h-14 bg-background-secondary/50 rounded-2xl"></div>
          </div>
          <div className="h-3 bg-background-secondary/30 rounded w-1/3"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "group relative p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 hover:border-brand-primary/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-2xl backdrop-blur-xl overflow-hidden",
      className
    )}>
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
                <div className={cn(
                  "flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                  {
                    'bg-green-500/20 text-green-400 border-green-500/30': changeType === 'positive',
                    'bg-red-500/20 text-red-400 border-red-500/30': changeType === 'negative',
                    'bg-background-secondary/50 text-text-secondary border-border-accent/30': changeType === 'neutral'
                  }
                )}>
                  {changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                  {changeType === 'negative' && <TrendingDown className="h-3 w-3 mr-1" />}
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
