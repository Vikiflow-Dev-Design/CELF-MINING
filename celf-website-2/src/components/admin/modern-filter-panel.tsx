'use client';

import React, { useState } from 'react';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterField {
  key: string;
  label: string;
  type: 'search' | 'select' | 'multiselect' | 'date' | 'range';
  placeholder?: string;
  options?: FilterOption[];
  value?: any;
  onChange?: (value: any) => void;
}

export interface ModernFilterPanelProps {
  title?: string;
  description?: string;
  fields: FilterField[];
  onApplyFilters?: (filters: Record<string, any>) => void;
  onClearFilters?: () => void;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  showResultCount?: boolean;
  resultCount?: number;
}

export function ModernFilterPanel({
  title = "Search & Filter",
  description = "Find what you're looking for",
  fields,
  onApplyFilters,
  onClearFilters,
  className,
  collapsible = false,
  defaultCollapsed = false,
  showResultCount = false,
  resultCount = 0
}: ModernFilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Find the field and call its onChange if it exists
    const field = fields.find(f => f.key === key);
    field?.onChange?.(value);
  };

  const handleApplyFilters = () => {
    onApplyFilters?.(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    fields.forEach(field => {
      field.onChange?.('');
    });
    onClearFilters?.();
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== null && value !== undefined && 
    (Array.isArray(value) ? value.length > 0 : true)
  );

  const renderField = (field: FilterField) => {
    const value = filters[field.key] || field.value || '';

    switch (field.type) {
      case 'search':
        return (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary" />
            <Input
              placeholder={field.placeholder || `Search ${field.label.toLowerCase()}...`}
              value={value}
              onChange={(e) => handleFilterChange(field.key, e.target.value)}
              className="pl-10 bg-background-secondary/50 border-border-accent/30 text-text-primary placeholder-text-muted focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all duration-300"
            />
          </div>
        );

      case 'select':
        return (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => handleFilterChange(field.key, e.target.value)}
              className="w-full px-4 py-3 bg-background-secondary/50 border border-border-accent/30 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/50 transition-all duration-300 appearance-none"
            >
              <option value="">{field.placeholder || `All ${field.label}`}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} {option.count !== undefined && `(${option.count})`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none" />
          </div>
        );

      case 'multiselect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            <div className="text-sm font-medium text-text-secondary">{field.label}</div>
            <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-secondary/30 transition-colors duration-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...selectedValues, option.value]
                        : selectedValues.filter(v => v !== option.value);
                      handleFilterChange(field.key, newValues);
                    }}
                    className="rounded border-border-accent/30 bg-background-secondary/50 text-brand-primary focus:ring-brand-primary/20"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-xs text-text-muted">({option.count})</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            className="bg-background-secondary/50 border-border-accent/30 text-text-primary focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all duration-300"
          />
        );

      case 'range':
        const [min, max] = Array.isArray(value) ? value : ['', ''];
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => handleFilterChange(field.key, [e.target.value, max])}
              className="bg-background-secondary/50 border-border-accent/30 text-text-primary focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all duration-300"
            />
            <Input
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => handleFilterChange(field.key, [min, e.target.value])}
              className="bg-background-secondary/50 border-border-accent/30 text-text-primary focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all duration-300"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={cn(
      "bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl transition-all duration-300",
      className
    )}>
      {/* Header */}
      <div 
        className={cn(
          "flex items-center justify-between p-6",
          collapsible && "cursor-pointer hover:bg-background-secondary/20 transition-colors duration-300"
        )}
        onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
            <Filter className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            <p className="text-xs text-text-secondary">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {showResultCount && (
            <div className="text-sm text-text-muted">
              {resultCount} results
            </div>
          )}
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
          )}
          {collapsible && (
            <ChevronDown className={cn(
              "h-5 w-5 text-text-muted transition-transform duration-300",
              isCollapsed && "rotate-180"
            )} />
          )}
        </div>
      </div>

      {/* Content */}
      {(!collapsible || !isCollapsed) && (
        <div className="px-6 pb-6 space-y-6">
          {/* Filter Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                {field.type !== 'multiselect' && (
                  <label className="text-sm font-medium text-text-secondary">
                    {field.label}
                  </label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border-accent/20">
            <div className="flex items-center space-x-4 text-sm text-text-muted">
              {hasActiveFilters && (
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Filters active</span>
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-text-secondary hover:text-red-400 hover:bg-red-500/10 border border-border-accent/30 hover:border-red-500/30 transition-all duration-300"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
              <Button
                onClick={handleApplyFilters}
                className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black hover:from-brand-primary-dark hover:to-brand-primary transition-all duration-300"
              >
                <Search className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
