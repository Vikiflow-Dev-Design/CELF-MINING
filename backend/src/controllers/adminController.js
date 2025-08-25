const supabaseService = require('../services/supabaseService');
const { createResponse } = require('../utils/responseUtils');

class AdminController {
  // Health check for admin settings
  async checkAdminSettings(req, res, next) {
    try {
      const settings = await supabaseService.getMiningSettings();
      res.json(createResponse(true, 'Admin settings are properly configured', {
        hasSettings: true,
        settingsCount: Object.keys(settings).length
      }));
    } catch (error) {
      console.error('Admin settings health check failed:', error);
      res.status(500).json(createResponse(false, error.message, {
        hasSettings: false,
        error: error.message
      }));
    }
  }

  // Dashboard & Analytics
  async getDashboardStats(req, res, next) {
    try {
      const stats = await supabaseService.getDashboardStats();
      res.json(createResponse(true, 'Dashboard stats retrieved successfully', stats));
    } catch (error) {
      next(error);
    }
  }

  async getRecentActivity(req, res, next) {
    try {
      const { limit = 10 } = req.query;
      const activities = await supabaseService.getRecentActivity(parseInt(limit));
      res.json(createResponse(true, 'Recent activity retrieved successfully', activities));
    } catch (error) {
      next(error);
    }
  }

  async getUserAnalytics(req, res, next) {
    try {
      const { period = '30d' } = req.query;
      const analytics = await supabaseService.getUserAnalytics(period);
      res.json(createResponse(true, 'User analytics retrieved successfully', analytics));
    } catch (error) {
      next(error);
    }
  }

  async getMiningAnalytics(req, res, next) {
    try {
      const { period = '30d' } = req.query;
      const analytics = await supabaseService.getMiningAnalytics(period);
      res.json(createResponse(true, 'Mining analytics retrieved successfully', analytics));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionAnalytics(req, res, next) {
    try {
      const { period = '30d' } = req.query;
      const analytics = await supabaseService.getTransactionAnalytics(period);
      res.json(createResponse(true, 'Transaction analytics retrieved successfully', analytics));
    } catch (error) {
      next(error);
    }
  }

  // User Management
  async getAllUsers(req, res, next) {
    try {
      const { page = 1, limit = 20, search, role, status } = req.query;
      const users = await supabaseService.getAllUsersAdmin({
        page: parseInt(page),
        limit: parseInt(limit),
        search,
        role,
        status
      });
      res.json(createResponse(true, 'Users retrieved successfully', users));
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await supabaseService.getUserByIdAdmin(id);
      
      if (!user) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      res.json(createResponse(true, 'User retrieved successfully', user));
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedUser = await supabaseService.updateUserAdmin(id, updateData);
      
      if (!updatedUser) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      res.json(createResponse(true, 'User updated successfully', updatedUser));
    } catch (error) {
      next(error);
    }
  }

  async suspendUser(req, res, next) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      
      const result = await supabaseService.suspendUser(id, reason);
      
      if (!result) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      res.json(createResponse(true, 'User suspended successfully'));
    } catch (error) {
      next(error);
    }
  }

  async activateUser(req, res, next) {
    try {
      const { id } = req.params;
      
      const result = await supabaseService.activateUser(id);
      
      if (!result) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      res.json(createResponse(true, 'User activated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      
      const result = await supabaseService.deleteUserAdmin(id);
      
      if (!result) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      res.json(createResponse(true, 'User deleted successfully'));
    } catch (error) {
      next(error);
    }
  }

  // Mining Management
  async getMiningSessions(req, res, next) {
    try {
      const { page = 1, limit = 20, status, userId } = req.query;
      const sessions = await supabaseService.getMiningSessions({
        page: parseInt(page),
        limit: parseInt(limit),
        status,
        userId
      });
      res.json(createResponse(true, 'Mining sessions retrieved successfully', sessions));
    } catch (error) {
      next(error);
    }
  }

  async getMiningSettings(req, res, next) {
    try {
      const settings = await supabaseService.getMiningSettings();
      res.json(createResponse(true, 'Mining settings retrieved successfully', settings));
    } catch (error) {
      next(error);
    }
  }

  async updateMiningSettings(req, res, next) {
    try {
      const settings = req.body;
      console.log('Received mining settings update:', JSON.stringify(settings, null, 2));
      const updatedSettings = await supabaseService.updateMiningSettings(settings);
      res.json(createResponse(true, 'Mining settings updated successfully', updatedSettings));
    } catch (error) {
      console.error('Error updating mining settings:', error);
      next(error);
    }
  }

  async terminateMiningSession(req, res, next) {
    try {
      const { id } = req.params;
      const result = await supabaseService.terminateMiningSession(id);
      
      if (!result) {
        return res.status(404).json(createResponse(false, 'Mining session not found'));
      }

      res.json(createResponse(true, 'Mining session terminated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async pauseMiningSession(req, res, next) {
    try {
      const { id } = req.params;
      const result = await supabaseService.pauseMiningSession(id);
      
      if (!result) {
        return res.status(404).json(createResponse(false, 'Mining session not found'));
      }

      res.json(createResponse(true, 'Mining session paused successfully'));
    } catch (error) {
      next(error);
    }
  }

  async resumeMiningSession(req, res, next) {
    try {
      const { id } = req.params;
      const result = await supabaseService.resumeMiningSession(id);
      
      if (!result) {
        return res.status(404).json(createResponse(false, 'Mining session not found'));
      }

      res.json(createResponse(true, 'Mining session resumed successfully'));
    } catch (error) {
      next(error);
    }
  }

  // Content Management
  async getContactSubmissions(req, res, next) {
    try {
      const { page = 1, limit = 20, status } = req.query;
      const submissions = await supabaseService.getContactSubmissions({
        page: parseInt(page),
        limit: parseInt(limit),
        status
      });
      res.json(createResponse(true, 'Contact submissions retrieved successfully', submissions));
    } catch (error) {
      next(error);
    }
  }

  async getContactSubmissionById(req, res, next) {
    try {
      const { id } = req.params;
      const submission = await supabaseService.getContactSubmissionById(id);
      
      if (!submission) {
        return res.status(404).json(createResponse(false, 'Contact submission not found'));
      }

      res.json(createResponse(true, 'Contact submission retrieved successfully', submission));
    } catch (error) {
      next(error);
    }
  }

  async updateContactSubmissionStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const result = await supabaseService.updateContactSubmissionStatus(id, status);
      
      if (!result) {
        return res.status(404).json(createResponse(false, 'Contact submission not found'));
      }

      res.json(createResponse(true, 'Contact submission status updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async deleteContactSubmission(req, res, next) {
    try {
      const { id } = req.params;
      const result = await supabaseService.deleteContactSubmission(id);
      
      if (!result) {
        return res.status(404).json(createResponse(false, 'Contact submission not found'));
      }

      res.json(createResponse(true, 'Contact submission deleted successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getNewsletterSubscriptions(req, res, next) {
    try {
      const { page = 1, limit = 20, status } = req.query;
      const subscriptions = await supabaseService.getNewsletterSubscriptions({
        page: parseInt(page),
        limit: parseInt(limit),
        status
      });
      res.json(createResponse(true, 'Newsletter subscriptions retrieved successfully', subscriptions));
    } catch (error) {
      next(error);
    }
  }

  async deleteNewsletterSubscription(req, res, next) {
    try {
      const { id } = req.params;
      const result = await supabaseService.deleteNewsletterSubscription(id);

      if (!result) {
        return res.status(404).json(createResponse(false, 'Newsletter subscription not found'));
      }

      res.json(createResponse(true, 'Newsletter subscription deleted successfully'));
    } catch (error) {
      next(error);
    }
  }

  // Mentorship Applications
  async getMentorshipApplications(req, res, next) {
    try {
      const { page = 1, limit = 20, status, type } = req.query;
      const applications = await supabaseService.getMentorshipApplications({
        page: parseInt(page),
        limit: parseInt(limit),
        status,
        type
      });
      res.json(createResponse(true, 'Mentorship applications retrieved successfully', applications));
    } catch (error) {
      next(error);
    }
  }

  async getMentorshipApplicationById(req, res, next) {
    try {
      const { id } = req.params;
      const application = await supabaseService.getMentorshipApplicationById(id);

      if (!application) {
        return res.status(404).json(createResponse(false, 'Mentorship application not found'));
      }

      res.json(createResponse(true, 'Mentorship application retrieved successfully', application));
    } catch (error) {
      next(error);
    }
  }

  async updateMentorshipApplicationStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await supabaseService.updateMentorshipApplicationStatus(id, status);

      if (!result) {
        return res.status(404).json(createResponse(false, 'Mentorship application not found'));
      }

      res.json(createResponse(true, 'Mentorship application status updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  // Scholarship Applications
  async getScholarshipApplications(req, res, next) {
    try {
      const { page = 1, limit = 20, status } = req.query;
      const applications = await supabaseService.getScholarshipApplications({
        page: parseInt(page),
        limit: parseInt(limit),
        status
      });
      res.json(createResponse(true, 'Scholarship applications retrieved successfully', applications));
    } catch (error) {
      next(error);
    }
  }

  async getScholarshipApplicationById(req, res, next) {
    try {
      const { id } = req.params;
      const application = await supabaseService.getScholarshipApplicationById(id);

      if (!application) {
        return res.status(404).json(createResponse(false, 'Scholarship application not found'));
      }

      res.json(createResponse(true, 'Scholarship application retrieved successfully', application));
    } catch (error) {
      next(error);
    }
  }

  async updateScholarshipApplicationStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await supabaseService.updateScholarshipApplicationStatus(id, status);

      if (!result) {
        return res.status(404).json(createResponse(false, 'Scholarship application not found'));
      }

      res.json(createResponse(true, 'Scholarship application status updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  // System Settings
  async getSystemSettings(req, res, next) {
    try {
      const settings = await supabaseService.getSystemSettings();
      res.json(createResponse(true, 'System settings retrieved successfully', settings));
    } catch (error) {
      next(error);
    }
  }

  async updateSystemSettings(req, res, next) {
    try {
      const settings = req.body;
      const updatedSettings = await supabaseService.updateSystemSettings(settings);
      res.json(createResponse(true, 'System settings updated successfully', updatedSettings));
    } catch (error) {
      next(error);
    }
  }

  // Security & Audit
  async getAuditLogs(req, res, next) {
    try {
      const { page = 1, limit = 20, action, userId } = req.query;
      const logs = await supabaseService.getAuditLogs({
        page: parseInt(page),
        limit: parseInt(limit),
        action,
        userId
      });
      res.json(createResponse(true, 'Audit logs retrieved successfully', logs));
    } catch (error) {
      next(error);
    }
  }

  async getLoginAttempts(req, res, next) {
    try {
      const { page = 1, limit = 20, success } = req.query;
      const attempts = await supabaseService.getLoginAttempts({
        page: parseInt(page),
        limit: parseInt(limit),
        success: success !== undefined ? success === 'true' : undefined
      });
      res.json(createResponse(true, 'Login attempts retrieved successfully', attempts));
    } catch (error) {
      next(error);
    }
  }

  async getSuspiciousActivities(req, res, next) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const activities = await supabaseService.getSuspiciousActivities({
        page: parseInt(page),
        limit: parseInt(limit)
      });
      res.json(createResponse(true, 'Suspicious activities retrieved successfully', activities));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
