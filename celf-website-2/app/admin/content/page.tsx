'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/src/components/admin/admin-layout';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { adminApi, ContactSubmission } from '@/src/lib/admin-api';
import {
  FileText,
  Mail,
  Users,
  GraduationCap,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Eye,
  Trash2
} from 'lucide-react';

interface ContentTabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function ContentTabs({ activeTab, onTabChange }: ContentTabProps) {
  const tabs = [
    { id: 'contact', label: 'Contact Forms', icon: MessageSquare },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'scholarship', label: 'Scholarships', icon: GraduationCap }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-brand-primary/50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

interface ContactFormsProps {
  loading: boolean;
}

function ContactForms({ loading }: ContactFormsProps) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const fetchSubmissions = async () => {
    try {
      const response = await adminApi.getContactSubmissions({ limit: 50 });
      if (response.success && response.data && response.data.submissions) {
        setSubmissions(response.data.submissions);
      } else {
        setSubmissions([]); // Set empty array if no data
      }
    } catch (err) {
      console.error('Failed to fetch contact submissions:', err);
      setSubmissions([]); // Set empty array on error
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await adminApi.updateContactSubmissionStatus(id, status);
      fetchSubmissions();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      try {
        await adminApi.deleteContactSubmission(id);
        fetchSubmissions();
      } catch (err) {
        console.error('Failed to delete submission:', err);
      }
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Contact Form Submissions</h3>
        <Button onClick={fetchSubmissions} size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id} className="p-4 bg-card border-accent hover:border-accent-hover hover:shadow-glow transition-default">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-text-primary">{submission.name}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-1">{submission.email}</p>
                  <p className="text-sm font-medium text-text-primary mb-2">{submission.subject}</p>
                  <p className="text-sm text-text-secondary line-clamp-2">{submission.message}</p>
                  <p className="text-xs text-text-muted mt-2">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col space-y-1 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(submission.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Submission Detail */}
        {selectedSubmission && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Submission Details</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedSubmission(null)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-sm text-gray-900">{selectedSubmission.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{selectedSubmission.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <p className="text-sm text-gray-900">{selectedSubmission.subject}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="flex space-x-2 mt-2">
                  {['pending', 'in_progress', 'resolved', 'closed'].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedSubmission.status === status ? 'default' : 'outline'}
                      onClick={() => handleStatusUpdate(selectedSubmission.id, status)}
                    >
                      {status.replace('_', ' ')}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Submitted</label>
                <p className="text-sm text-gray-900">
                  {new Date(selectedSubmission.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function NewsletterManagement() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getNewsletterSubscriptions({ limit: 100 });
      if (response.success && response.data && response.data.subscriptions) {
        setSubscriptions(response.data.subscriptions);
      } else {
        setSubscriptions([]); // Set empty array if no data
      }
    } catch (err) {
      console.error('Failed to fetch newsletter subscriptions:', err);
      setSubscriptions([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading newsletter subscriptions...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Newsletter Subscriptions</h3>
        <Button onClick={fetchSubscriptions} size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="p-6">
        <div className="text-center py-8">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Newsletter management coming soon</p>
          <p className="text-sm text-gray-500 mt-2">
            Total subscriptions: {subscriptions.length}
          </p>
        </div>
      </Card>
    </div>
  );
}

function MentorshipManagement() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Mentorship Applications</h3>
      <Card className="p-6">
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Mentorship application management coming soon</p>
        </div>
      </Card>
    </div>
  );
}

function ScholarshipManagement() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Scholarship Applications</h3>
      <Card className="p-6">
        <div className="text-center py-8">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Scholarship application management coming soon</p>
        </div>
      </Card>
    </div>
  );
}

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('contact');
  const [loading, setLoading] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contact':
        return <ContactForms loading={loading} />;
      case 'newsletter':
        return <NewsletterManagement />;
      case 'mentorship':
        return <MentorshipManagement />;
      case 'scholarship':
        return <ScholarshipManagement />;
      default:
        return <ContactForms loading={loading} />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-text-primary to-brand-primary bg-clip-text text-transparent mb-2">Content Management</h1>
          <p className="text-text-secondary text-lg">Manage website content and user submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/30">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">Contact Forms</p>
                <p className="text-2xl font-bold text-text-primary">0</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center border border-green-500/30">
                <Mail className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">Newsletter</p>
                <p className="text-2xl font-bold text-text-primary">0</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">Mentorship</p>
                <p className="text-2xl font-bold text-text-primary">0</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-background-card/80 to-background-card/40 border border-border-accent/30 shadow-xl backdrop-blur-xl">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/30">
                <GraduationCap className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">Scholarships</p>
                <p className="text-2xl font-bold text-text-primary">0</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <Card className="p-6">
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
