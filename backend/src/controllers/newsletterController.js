const mongodbService = require('../services/mongodbService');
const { createResponse } = require('../utils/responseUtils');

class NewsletterController {
  async subscribe(req, res, next) {
    try {
      const { email, firstName, lastName, preferences } = req.body;

      const mockSubscription = {
        id: 'mock-subscription-id',
        email,
        firstName,
        lastName,
        status: 'active',
        preferences: preferences || { frequency: 'weekly', topics: [], format: 'html' },
        subscribedAt: new Date().toISOString()
      };

      res.status(201).json(createResponse(true, 'Successfully subscribed to newsletter', { subscription: mockSubscription }));
    } catch (error) {
      next(error);
    }
  }

  async unsubscribe(req, res, next) {
    try {
      const { email, reason } = req.body;

      const mockResult = {
        email,
        status: 'unsubscribed',
        reason,
        unsubscribedAt: new Date().toISOString()
      };

      res.json(createResponse(true, 'Successfully unsubscribed from newsletter', mockResult));
    } catch (error) {
      next(error);
    }
  }

  async unsubscribeByToken(req, res, next) {
    try {
      const { token } = req.params;

      res.json(createResponse(true, 'Successfully unsubscribed from newsletter', { token }));
    } catch (error) {
      next(error);
    }
  }

  async updatePreferences(req, res, next) {
    try {
      const { email, preferences } = req.body;

      const mockSubscription = {
        email,
        preferences,
        updatedAt: new Date().toISOString()
      };

      res.json(createResponse(true, 'Preferences updated successfully', { subscription: mockSubscription }));
    } catch (error) {
      next(error);
    }
  }

  async getSubscriptionStatus(req, res, next) {
    try {
      const { email } = req.params;

      const mockStatus = {
        email,
        status: 'active',
        subscribedAt: new Date(Date.now() - 86400000).toISOString(),
        preferences: { frequency: 'weekly', topics: ['updates', 'mining'], format: 'html' }
      };

      res.json(createResponse(true, 'Subscription status retrieved successfully', mockStatus));
    } catch (error) {
      next(error);
    }
  }

  async getSubscribers(req, res, next) {
    try {
      const mockSubscribers = [
        {
          id: '1',
          email: 'user1@example.com',
          firstName: 'John',
          lastName: 'Doe',
          status: 'active',
          subscribedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '2',
          email: 'user2@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          status: 'active',
          subscribedAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];

      res.json(createResponse(true, 'Subscribers retrieved successfully', {
        subscribers: mockSubscribers,
        pagination: { page: 1, limit: 10, total: 2, pages: 1 }
      }));
    } catch (error) {
      next(error);
    }
  }

  async getSubscriberStats(req, res, next) {
    try {
      const mockStats = {
        totalSubscribers: 1250,
        activeSubscribers: 1180,
        unsubscribed: 70,
        growthRate: 5.2,
        topTopics: ['updates', 'mining', 'announcements']
      };

      res.json(createResponse(true, 'Subscriber statistics retrieved successfully', { stats: mockStats }));
    } catch (error) {
      next(error);
    }
  }

  async createCampaign(req, res, next) {
    try {
      const { subject, content, scheduledFor, targetAudience } = req.body;

      const mockCampaign = {
        id: 'mock-campaign-id',
        subject,
        content,
        status: 'draft',
        scheduledFor,
        targetAudience,
        createdAt: new Date().toISOString()
      };

      res.status(201).json(createResponse(true, 'Campaign created successfully', { campaign: mockCampaign }));
    } catch (error) {
      next(error);
    }
  }

  async getCampaigns(req, res, next) {
    try {
      const mockCampaigns = [
        {
          id: '1',
          subject: 'CELF Monthly Update',
          status: 'sent',
          scheduledFor: new Date(Date.now() - 86400000).toISOString(),
          stats: { sent: 1180, opened: 590, clicked: 118 }
        },
        {
          id: '2',
          subject: 'New Mining Features',
          status: 'draft',
          createdAt: new Date().toISOString()
        }
      ];

      res.json(createResponse(true, 'Campaigns retrieved successfully', {
        campaigns: mockCampaigns,
        pagination: { page: 1, limit: 10, total: 2, pages: 1 }
      }));
    } catch (error) {
      next(error);
    }
  }

  async getCampaignById(req, res, next) {
    try {
      const { id } = req.params;

      const mockCampaign = {
        id,
        subject: 'CELF Monthly Update',
        content: 'Welcome to our monthly update...',
        status: 'sent',
        stats: { sent: 1180, opened: 590, clicked: 118, bounced: 5 },
        createdAt: new Date(Date.now() - 172800000).toISOString()
      };

      res.json(createResponse(true, 'Campaign retrieved successfully', { campaign: mockCampaign }));
    } catch (error) {
      next(error);
    }
  }

  async updateCampaign(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const mockCampaign = {
        id,
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      res.json(createResponse(true, 'Campaign updated successfully', { campaign: mockCampaign }));
    } catch (error) {
      next(error);
    }
  }

  async sendCampaign(req, res, next) {
    try {
      const { id } = req.params;

      const mockResult = {
        campaignId: id,
        status: 'sending',
        recipientCount: 1180,
        sentAt: new Date().toISOString()
      };

      res.json(createResponse(true, 'Campaign sent successfully', mockResult));
    } catch (error) {
      next(error);
    }
  }

  async getOpenAnalytics(req, res, next) {
    try {
      const { campaignId } = req.params;

      const mockAnalytics = {
        campaignId,
        totalSent: 1180,
        totalOpened: 590,
        openRate: 50.0,
        uniqueOpens: 580,
        opensByDay: [
          { date: '2024-01-15', opens: 120 },
          { date: '2024-01-16', opens: 200 },
          { date: '2024-01-17', opens: 150 }
        ]
      };

      res.json(createResponse(true, 'Open analytics retrieved successfully', { analytics: mockAnalytics }));
    } catch (error) {
      next(error);
    }
  }

  async getClickAnalytics(req, res, next) {
    try {
      const { campaignId } = req.params;

      const mockAnalytics = {
        campaignId,
        totalClicks: 118,
        clickRate: 10.0,
        uniqueClicks: 115,
        topLinks: [
          { url: 'https://celf.com/mining', clicks: 45 },
          { url: 'https://celf.com/wallet', clicks: 32 },
          { url: 'https://celf.com/about', clicks: 25 }
        ]
      };

      res.json(createResponse(true, 'Click analytics retrieved successfully', { analytics: mockAnalytics }));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NewsletterController();
