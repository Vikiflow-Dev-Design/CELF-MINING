'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Select, SelectItem } from '@/src/components/ui/select';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Badge } from '@/src/components/ui/badge';
import { adminApi } from '@/src/lib/admin-api';
import {
  ArrowLeft,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle,
  Link,
  ExternalLink,
  Trash2
} from 'lucide-react';

interface Task {
  _id: string;
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

interface TaskFormData {
  taskId: string;
  title: string;
  description: string;
  category: 'mining' | 'social' | 'wallet' | 'referral';
  maxProgress: number;
  reward: number;
  icon: string;
  isActive: boolean;
  isLinkTask: boolean;
  linkUrl: string;
}

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  // Debug logging
  console.log('EditTaskPage - params:', params);
  console.log('EditTaskPage - taskId:', taskId);

  const [task, setTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    taskId: '',
    title: '',
    description: '',
    category: 'mining',
    maxProgress: 1,
    reward: 0,
    icon: '⛏️',
    isActive: true,
    isLinkTask: false,
    linkUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError(null);

      // Guard against undefined taskId
      if (!taskId) {
        throw new Error('Task ID is missing from URL parameters');
      }

      console.log('Fetching task with ID:', taskId);
      const response = await fetch(`http://localhost:5000/api/tasks/admin/${taskId}`);
      
      if (!response.ok) throw new Error('Failed to fetch task');
      
      const data = await response.json();
      const taskData = data.data || data;
      
      setTask(taskData);
      setFormData({
        taskId: taskData.taskId,
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        maxProgress: taskData.maxProgress,
        reward: taskData.reward,
        icon: taskData.icon,
        isActive: taskData.isActive,
        isLinkTask: taskData.isLinkTask || false,
        linkUrl: taskData.linkUrl || ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch task');
      console.error('Failed to fetch task:', err);
      
      // Mock data for development
      const mockTask: Task = {
        _id: taskId,
        taskId: 'MINING_001',
        title: 'First Mining Session',
        description: 'Complete your first mining session to earn CELF tokens. This is a detailed description of what the user needs to do to complete this task.',
        category: 'mining',
        maxProgress: 1,
        reward: 10,
        icon: '⛏️',
        isActive: true,
        isLinkTask: false,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      };
      
      setTask(mockTask);
      setFormData({
        taskId: mockTask.taskId,
        title: mockTask.title,
        description: mockTask.description,
        category: mockTask.category,
        maxProgress: mockTask.maxProgress,
        reward: mockTask.reward,
        icon: mockTask.icon,
        isActive: mockTask.isActive,
        isLinkTask: mockTask.isLinkTask || false,
        linkUrl: mockTask.linkUrl || ''
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchTask();
    } else {
      setError('Task ID is missing from URL');
      setLoading(false);
    }
  }, [taskId]);

  const handleSave = async () => {
    if (!taskId) {
      console.error('Cannot save: Task ID is missing');
      return;
    }

    setSaving(true);

    try {
      // Prepare data for submission, excluding empty linkUrl
      const { linkUrl, ...baseData } = formData;
      const submitData = {
        ...baseData,
        ...(linkUrl && linkUrl.trim() !== '' ? { linkUrl } : {})
      };

      console.log('Saving task with data:', submitData);
      const response = await fetch(`http://localhost:5000/api/tasks/admin/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      console.log('Save response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Save error response:', errorText);
        throw new Error(`Failed to update task: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log('Task updated successfully');
        alert('Task updated successfully!');
        router.push('/admin/tasks');
      } else {
        throw new Error(data.message || 'Failed to update task');
      }
    } catch (err) {
      console.error('Failed to update task:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!taskId) {
      console.error('Cannot delete: Task ID is missing');
      return;
    }

    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/admin/${taskId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete task');
      
      console.log('Task deleted successfully');
      router.push('/admin/tasks');
    } catch (err) {
      console.error('Failed to delete task:', err);
      // For development, just navigate back
      router.push('/admin/tasks');
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'mining': return 'bg-blue-500';
      case 'social': return 'bg-green-500';
      case 'wallet': return 'bg-purple-500';
      case 'referral': return 'bg-orange-500';
      default: return 'bg-gray-500';
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

  if (error && !task) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/admin/tasks')}
              variant="secondary"
              className="border-accent text-primary hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tasks
            </Button>
          </div>
          
          <Card className="p-6 bg-red-50 border-red-200">
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800">Error loading task</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/admin/tasks')}
              variant="secondary"
              className="border-accent text-primary hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tasks
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold text-primary">Edit Task</h1>
              <p className="text-secondary">Modify task details and settings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={saving}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Task
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#9EFF00] text-black hover:bg-[#7ACC00]"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Task Preview */}
        {task && (
          <Card className="p-6 bg-card border-accent">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getCategoryBadgeColor(task.category)} text-white`}>
                      {task.category}
                    </Badge>
                    {task.isLinkTask && (
                      <Badge variant="secondary" className="border-accent text-accent">
                        <Link className="h-3 w-3 mr-1" />
                        Link Task
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{task.title}</h3>
                  <p className="text-sm text-secondary">{task.taskId}</p>
                </div>
                <div className="flex items-center gap-1">
                  {task.isActive ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>

              <p className="text-secondary">{task.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Reward: {task.reward} CELF</span>
                <span className="text-secondary">Max Progress: {task.maxProgress}</span>
              </div>

              {task.isLinkTask && task.linkUrl && (
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4 text-accent" />
                  <a 
                    href={task.linkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {task.linkUrl}
                  </a>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Edit Form */}
        <Card className="p-6 bg-card border-accent">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">Task Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="taskId" className="text-primary">Task ID</Label>
                <Input
                  id="taskId"
                  value={formData.taskId}
                  onChange={(e) => setFormData({ ...formData, taskId: e.target.value })}
                  placeholder="unique-task-id"
                  className="bg-secondary border-accent text-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-primary">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Task title"
                  className="bg-secondary border-accent text-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-primary">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value as 'mining' | 'social' | 'wallet' | 'referral' })}
                >
                  <SelectItem key="mining" value="mining">Mining</SelectItem>
                  <SelectItem key="social" value="social">Social</SelectItem>
                  <SelectItem key="wallet" value="wallet">Wallet</SelectItem>
                  <SelectItem key="referral" value="referral">Referral</SelectItem>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon" className="text-primary">Icon</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="⛏️"
                  className="bg-secondary border-accent text-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxProgress" className="text-primary">Max Progress</Label>
                <Input
                  id="maxProgress"
                  type="number"
                  min="1"
                  value={formData.maxProgress}
                  onChange={(e) => setFormData({ ...formData, maxProgress: parseInt(e.target.value) || 1 })}
                  className="bg-secondary border-accent text-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reward" className="text-primary">Reward (CELF)</Label>
                <Input
                  id="reward"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: parseFloat(e.target.value) || 0 })}
                  className="bg-secondary border-accent text-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-primary">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed task description..."
                rows={4}
                className="bg-secondary border-accent text-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
                />
                <Label htmlFor="isActive" className="text-primary">Task is active</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isLinkTask"
                  checked={formData.isLinkTask}
                  onCheckedChange={(checked) => setFormData({ ...formData, isLinkTask: !!checked })}
                />
                <Label htmlFor="isLinkTask" className="text-primary">This is a link task</Label>
              </div>

              {formData.isLinkTask && (
                <div className="space-y-2">
                  <Label htmlFor="linkUrl" className="text-primary">Link URL</Label>
                  <Input
                    id="linkUrl"
                    type="url"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="bg-secondary border-accent text-primary"
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Task Metadata */}
        {task && (
          <Card className="p-6 bg-card border-accent">
            <h2 className="text-xl font-semibold text-primary mb-4">Task Metadata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-secondary">Created:</span>
                <span className="ml-2 text-primary">{new Date(task.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-secondary">Last Updated:</span>
                <span className="ml-2 text-primary">{new Date(task.updatedAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-secondary">Task ID:</span>
                <span className="ml-2 text-primary font-mono">{task._id}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
