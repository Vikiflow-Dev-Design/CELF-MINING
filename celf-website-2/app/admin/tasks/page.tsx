'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Select, SelectItem } from '@/src/components/ui/select';
import { Badge } from '@/src/components/ui/badge';
import { adminApi } from '@/src/lib/admin-api';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Link,
  ExternalLink,
  FileText
} from 'lucide-react';

interface Task {
  id: string;
  taskId: string;
  title: string;
  description: string;
  category: 'mining' | 'social' | 'wallet' | 'referral';
  maxProgress: number;
  reward: number;
  icon: string;
  isActive: boolean;
  isLinkTask?: boolean;
  linkUrl?: string;
  createdAt: string;
  updatedAt: string;
}



export default function TaskManagement() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminApi.getAllTasks();

      if (response.success && response.data) {
        setTasks(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      console.error('Failed to fetch tasks:', err);
      setTasks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.taskId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });



  const handleCreateTask = () => {
    router.push('/admin/tasks/create');
  };

  const handleEditTask = (task: Task) => {
    router.push(`/admin/tasks/edit/${task.id}`);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await adminApi.deleteTask(taskId);

      if (response.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        throw new Error(response.message || 'Failed to delete task');
      }
    } catch (err) {
      console.error('Failed to delete task:', err);
      alert('Failed to delete task: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };



  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9EFF00]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-text-primary to-brand-primary bg-clip-text text-transparent">
              Task Management
            </h1>
            <p className="text-text-secondary text-lg">Create and manage tasks for users</p>
            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{filteredTasks.length} tasks available</span>
              </div>
              <div className="w-1 h-4 bg-border-accent"></div>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={fetchTasks}
              variant="secondary"
              className="bg-background-card/50 border-border-accent/50 text-text-primary hover:bg-background-card hover:border-brand-primary/50 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button
              onClick={handleCreateTask}
              className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black hover:from-brand-primary-dark hover:to-brand-primary shadow-glow hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/30">
              <Search className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Search & Filter Tasks</h3>
              <p className="text-xs text-text-secondary">Find and organize tasks efficiently</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary" />
                <Input
                  placeholder="Search tasks by title or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background-secondary/50 border-border-accent/30 text-text-primary placeholder-text-muted focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectItem key="all" value="all">
                  All Categories
                </SelectItem>
                <SelectItem key="mining" value="mining">
                  Mining
                </SelectItem>
                <SelectItem key="social" value="social">
                  Social
                </SelectItem>
                <SelectItem key="wallet" value="wallet">
                  Wallet
                </SelectItem>
                <SelectItem key="referral" value="referral">
                  Referral
                </SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border-accent/20 mt-4">
            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <span>Showing {filteredTasks.length} tasks</span>
              {(searchTerm || categoryFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                  className="text-text-secondary hover:text-brand-primary transition-colors duration-300"
                >
                  Clear filters
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-xs text-text-muted">
                <span>View:</span>
                <Button variant="ghost" size="sm" className="text-brand-primary">Grid</Button>
                <Button variant="ghost" size="sm" className="text-text-muted">List</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="group relative p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 hover:border-brand-primary/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-2xl backdrop-blur-xl overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        task.category === 'mining' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        task.category === 'social' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        task.category === 'wallet' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                        task.category === 'referral' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                        'bg-background-secondary/50 text-text-secondary border-border-accent/30'
                      }`}>
                        {task.category}
                      </Badge>
                      {task.isLinkTask && (
                        <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 px-2 py-1 text-xs">
                          <Link className="h-3 w-3 mr-1" />
                          Link
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text-primary group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
                        {task.title}
                      </h3>
                      <p className="text-sm text-text-muted font-mono mt-1">{task.taskId}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <div className={`w-3 h-3 rounded-full ${
                      task.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                    }`}></div>
                    <div className={`p-2 rounded-lg border ${
                      task.isActive
                        ? 'bg-green-500/20 border-green-500/30'
                        : 'bg-red-500/20 border-red-500/30'
                    }`}>
                      {task.isActive ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
                  {task.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-background-secondary/30 rounded-xl border border-border-accent/20">
                  <div className="text-center">
                    <div className="text-lg font-bold text-brand-primary">{task.reward}</div>
                    <div className="text-xs text-text-muted">CELF Reward</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-text-primary">{task.maxProgress}</div>
                    <div className="text-xs text-text-muted">Max Progress</div>
                  </div>
                </div>

                {/* Link URL */}
                {task.isLinkTask && task.linkUrl && (
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-brand-primary flex-shrink-0" />
                      <a
                        href={task.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary hover:text-brand-primary-dark transition-colors duration-300 truncate font-medium"
                      >
                        {task.linkUrl}
                      </a>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2 border-t border-border-accent/20">
                  <Button
                    onClick={() => handleEditTask(task)}
                    variant="ghost"
                    className="flex-1 bg-background-secondary/30 border border-border-accent/30 text-text-primary hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary transition-all duration-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteTask(task.id)}
                    variant="ghost"
                    className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && !loading && (
          <Card className="p-16 text-center bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
            <div className="space-y-6 max-w-md mx-auto">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-brand-primary/30">
                  <FileText className="h-12 w-12 text-brand-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-background-secondary rounded-full flex items-center justify-center border border-border-accent/30">
                  <Plus className="h-4 w-4 text-text-muted" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-text-primary">
                  {searchTerm || categoryFilter !== 'all' ? 'No tasks found' : 'No tasks yet'}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {searchTerm || categoryFilter !== 'all'
                    ? 'Try adjusting your search criteria or filters to find the tasks you\'re looking for.'
                    : 'Get started by creating your first task. Tasks help users earn CELF tokens through various activities.'
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {searchTerm || categoryFilter !== 'all' ? (
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                    }}
                    variant="secondary"
                    className="bg-background-secondary/50 border-border-accent/50 text-text-primary hover:bg-background-secondary hover:border-brand-primary/50 transition-all duration-300"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                ) : (
                  <Button
                    onClick={handleCreateTask}
                    className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-black hover:from-brand-primary-dark hover:to-brand-primary shadow-glow hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Task
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6 bg-red-50 border-red-200">
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800">Error loading tasks</h3>
                <p className="text-red-600">{error}</p>
              </div>
              <Button onClick={fetchTasks} variant="secondary" className="ml-auto">
                Try Again
              </Button>
            </div>
          </Card>
        )}


      </div>
    </AdminLayout>
  );
}
