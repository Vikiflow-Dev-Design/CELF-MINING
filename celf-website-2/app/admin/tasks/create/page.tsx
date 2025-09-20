'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Select, SelectItem } from '@/src/components/ui/select';
import { Checkbox } from '@/src/components/ui/checkbox';
import { adminApi } from '@/src/lib/admin-api';
import {
  ArrowLeft,
  Save,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

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

const defaultFormData: TaskFormData = {
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
};

export default function CreateTask() {
  const router = useRouter();
  const [formData, setFormData] = useState<TaskFormData>(defaultFormData);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await adminApi.createTask(formData);
      
      if (response.success) {
        router.push('/admin/tasks');
      } else {
        throw new Error(response.message || 'Failed to create task');
      }
    } catch (err) {
      console.error('Failed to create task:', err);
      alert('Failed to create task: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
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
            <h1 className="text-3xl font-bold text-primary">Create New Task</h1>
            <p className="text-secondary">Add a new task for users to complete</p>
          </div>
        </div>

        {/* Create Form */}
        <Card className="p-6 bg-card border-accent">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="taskId" className="text-primary">Task ID</Label>
                <Input
                  id="taskId"
                  value={formData.taskId}
                  onChange={(e) => setFormData({ ...formData, taskId: e.target.value })}
                  placeholder="unique-task-id (e.g., MINING_001)"
                  required
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
                  required
                  className="bg-secondary border-accent text-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-primary">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value as 'mining' | 'social' | 'wallet' | 'referral' })}
                >
                  <SelectItem value="mining">Mining</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="wallet">Wallet</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon" className="text-primary">Icon</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="⛏️ (emoji or icon name)"
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
                placeholder="Describe what users need to do to complete this task..."
                rows={4}
                className="bg-secondary border-accent text-primary"
                required
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
                  {formData.linkUrl && (
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-accent" />
                      <a 
                        href={formData.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        Test Link
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-accent">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push('/admin/tasks')}
                disabled={saving}
                className="border-accent text-primary hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-[#9EFF00] text-black hover:bg-[#7ACC00]"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Task
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
