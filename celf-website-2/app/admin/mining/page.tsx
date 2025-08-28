'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { adminApi, MiningSession, MiningSettings } from '@/src/lib/admin-api';
import {
  Pickaxe,
  Settings,
  Play,
  Pause,
  Square,
  RefreshCw,
  Save,
  Activity,
  Clock,
  Zap,
  TrendingUp
} from 'lucide-react';

interface MiningSettingsCardProps {
  settings: MiningSettings;
  onUpdate: (settings: Partial<MiningSettings>) => void;
  loading: boolean;
}

function MiningSettingsCard({ settings, onUpdate, loading }: MiningSettingsCardProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(localSettings);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof MiningSettings, value: number | boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="p-6 bg-card border-accent hover:border-accent-hover transition-default shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold text-primary">Mining Settings</h3>
        </div>
        <Button onClick={handleSave} disabled={saving || loading} className="bg-[#9EFF00] text-black hover:bg-[#7ACC00] shadow-glow transition-default">
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Mining Rate (CELF/second)
          </label>
          <Input
            type="number"
            step="0.000001"
            min="0.000001"
            max="1"
            value={localSettings.miningRatePerSecond}
            onChange={(e) => handleInputChange('miningRatePerSecond', parseFloat(e.target.value))}
            disabled={loading}
            className="bg-secondary border-accent text-primary focus:border-accent-hover"
          />
          <p className="text-xs text-gray-500 mt-1">
            Hourly Rate: {(localSettings.miningRatePerSecond * 3600).toFixed(4)} CELF/hour
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mining Interval (milliseconds)
          </label>
          <Input
            type="number"
            min="100"
            max="10000"
            value={localSettings.miningIntervalMs}
            onChange={(e) => handleInputChange('miningIntervalMs', parseInt(e.target.value))}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            How often tokens are mined (1000ms = 1 second)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Session Time (hours)
          </label>
          <Input
            type="number"
            step="0.5"
            min="0.5"
            max="24"
            value={localSettings.maxSessionTime / 3600}
            onChange={(e) => handleInputChange('maxSessionTime', parseFloat(e.target.value) * 3600)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Sessions will auto-complete after {(localSettings.maxSessionTime / 3600).toFixed(1)} hours
          </p>
        </div>



        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Referral Bonus Multiplier
          </label>
          <Input
            type="number"
            step="0.1"
            min="0"
            max="2"
            value={localSettings.referralBonus}
            onChange={(e) => handleInputChange('referralBonus', parseFloat(e.target.value))}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Bonus multiplier for referred users
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localSettings.maintenanceMode}
              onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
              disabled={loading}
              className="rounded border-gray-300 text-[#9EFF00] focus:ring-[#9EFF00]"
            />
            <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            When enabled, new mining sessions cannot be started
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localSettings.autoClaim}
              onChange={(e) => handleInputChange('autoClaim', e.target.checked)}
              disabled={loading}
              className="rounded border-gray-300 text-[#9EFF00] focus:ring-[#9EFF00]"
            />
            <span className="text-sm font-medium text-gray-700">Auto-Claim Earnings</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Automatically claim earnings when session ends
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localSettings.notificationEnabled}
              onChange={(e) => handleInputChange('notificationEnabled', e.target.checked)}
              disabled={loading}
              className="rounded border-gray-300 text-[#9EFF00] focus:ring-[#9EFF00]"
            />
            <span className="text-sm font-medium text-gray-700">Mining Notifications</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Enable push notifications for mining events
          </p>
        </div>
      </div>
    </Card>
  );
}

interface MiningSessionsTableProps {
  sessions: MiningSession[];
  onSessionAction: (sessionId: string, action: string) => void;
  loading: boolean;
}

function MiningSessionsTable({ sessions, onSessionAction, loading }: MiningSessionsTableProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Earned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Started
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(sessions || []).length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <Pickaxe className="h-8 w-8 text-gray-400" />
                    <p>No mining sessions found</p>
                    <p className="text-sm">Mining sessions will appear here once users start mining</p>
                  </div>
                </td>
              </tr>
            ) : (
              (sessions || []).map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {session.users ? `${session.users.firstName} ${session.users.lastName}` : 'Unknown User'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.users?.email || `User ID: ${session.user_id}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(session.mining_rate || session.miningRate || 0).toFixed(2)} CELF/h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(session.tokens_earned || session.tokensEarned || 0).toFixed(4)} CELF
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDuration(session.runtime_seconds || session.runtimeSeconds || 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(session.started_at || session.startedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {session.status === 'active' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onSessionAction(session.id, 'pause')}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onSessionAction(session.id, 'terminate')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Square className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {session.status === 'paused' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onSessionAction(session.id, 'resume')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function AdminMining() {
  const [settings, setSettings] = useState<MiningSettings | null>(null);
  const [sessions, setSessions] = useState<MiningSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [settingsResponse, sessionsResponse] = await Promise.all([
        adminApi.getMiningSettings(),
        adminApi.getMiningSessions({ limit: 50 })
      ]);

      if (settingsResponse.success && settingsResponse.data) {
        // Validate that we have all required settings from database
        const requiredSettings = ['miningRatePerSecond', 'miningIntervalMs', 'maxSessionTime', 'maintenanceMode'];
        const missingSettings = requiredSettings.filter(key => settingsResponse.data[key] === undefined || settingsResponse.data[key] === null);

        if (missingSettings.length > 0) {
          throw new Error(`Missing mining settings in database: ${missingSettings.join(', ')}. Please ensure the admin_settings table is properly configured.`);
        }

        setSettings(settingsResponse.data);
      } else {
        throw new Error('Failed to fetch mining settings from database. Please ensure the admin_settings table exists and contains mining configuration.');
      }

      if (sessionsResponse.success && sessionsResponse.data) {
        setSessions(sessionsResponse.data.sessions);
      }
    } catch (err) {
      console.error('Failed to fetch mining data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load mining data from database');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsUpdate = async (newSettings: Partial<MiningSettings>) => {
    try {
      console.log('Sending mining settings update:', JSON.stringify(newSettings, null, 2));
      const response = await adminApi.updateMiningSettings(newSettings);
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (err) {
      console.error('Failed to update settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to update settings');
    }
  };

  const handleSessionAction = async (sessionId: string, action: string) => {
    try {
      switch (action) {
        case 'pause':
          await adminApi.pauseMiningSession(sessionId);
          break;
        case 'resume':
          await adminApi.resumeMiningSession(sessionId);
          break;
        case 'terminate':
          if (confirm('Are you sure you want to terminate this mining session?')) {
            await adminApi.terminateMiningSession(sessionId);
          } else {
            return;
          }
          break;
        default:
          return;
      }
      
      // Refresh sessions
      fetchData();
    } catch (err) {
      console.error(`Failed to ${action} session:`, err);
      alert(`Failed to ${action} session`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeSessions = sessions?.filter(s => s.status === 'active').length || 0;
  const totalTokensEarned = sessions?.reduce((sum, s) => sum + s.tokensEarned, 0) || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Mining Management</h1>
            <p className="text-secondary">Configure mining settings and monitor sessions</p>
          </div>
          <Button onClick={fetchData} disabled={loading} className="bg-[#9EFF00] text-black hover:bg-[#7ACC00] shadow-glow transition-default">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{activeSessions}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <Pickaxe className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{sessions?.length || 0}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tokens Earned</p>
                <p className="text-2xl font-bold text-gray-900">{totalTokensEarned.toFixed(2)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions && sessions.length > 0 ? (sessions.reduce((sum, s) => sum + s.miningRate, 0) / sessions.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Mining Settings */}
        {loading && !settings ? (
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <p>Loading mining settings from database...</p>
            </div>
          </Card>
        ) : settings ? (
          <MiningSettingsCard
            settings={settings}
            onUpdate={handleSettingsUpdate}
            loading={loading}
          />
        ) : error ? (
          <Card className="p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchData} className="bg-brand-primary text-black hover:bg-brand-primary-dark">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Loading Settings
            </Button>
          </Card>
        ) : null}

        {/* Mining Sessions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Mining Sessions</h2>
          {error ? (
            <Card className="p-6 text-center">
              <p className="text-red-600">{error}</p>
              <Button onClick={fetchData} className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </Card>
          ) : (
            <MiningSessionsTable
              sessions={sessions}
              onSessionAction={handleSessionAction}
              loading={loading}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
