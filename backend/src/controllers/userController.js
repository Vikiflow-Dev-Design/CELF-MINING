const bcrypt = require('bcryptjs');
const supabaseService = require('../services/supabaseService');
const { createResponse } = require('../utils/responseUtils');

class UserController {
  async getProfile(req, res, next) {
    try {
      const user = await supabaseService.findUserById(req.user.userId);

      if (!user) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      // Don't return password
      const { password, ...userProfile } = user;

      res.json(createResponse(true, 'Profile retrieved successfully', {
        user: {
          id: userProfile.id,
          email: userProfile.email,
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          role: userProfile.role,
          isActive: userProfile.is_active,
          createdAt: userProfile.created_at,
          preferences: userProfile.preferences
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { firstName, lastName, email } = req.body;
      const userId = req.user.userId;

      // Check if email is being changed and if it's already taken
      if (email) {
        const existingUser = await supabaseService.findUserByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json(createResponse(false, 'Email is already taken'));
        }
      }

      const updateData = {};
      if (firstName) updateData.first_name = firstName;
      if (lastName) updateData.last_name = lastName;
      if (email) updateData.email = email;

      const updatedUser = await supabaseService.updateUser(userId, updateData);

      res.json(createResponse(true, 'Profile updated successfully', {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.first_name,
          lastName: updatedUser.last_name,
          role: updatedUser.role
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.userId;

      const user = await supabaseService.findUserById(userId);
      if (!user) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json(createResponse(false, 'Current password is incorrect'));
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      await supabaseService.updateUser(userId, { password: hashedNewPassword });

      res.json(createResponse(true, 'Password changed successfully'));
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      // Mock account deletion (authentication disabled)
      res.json(createResponse(true, 'Account deleted successfully (mock response)'));
    } catch (error) {
      next(error);
    }
  }

  // Admin routes
  async getAllUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Mock users list (authentication disabled)
      const mockUsers = [
        {
          id: '1',
          email: 'user1@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'user',
          isActive: true,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '2',
          email: 'user2@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'user',
          isActive: true,
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];

      res.json(createResponse(true, 'Users retrieved successfully (mock data)', {
        users: mockUsers,
        pagination: {
          page,
          limit,
          total: 2,
          pages: 1
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      // Mock user by ID (authentication disabled)
      const mockUser = {
        id,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        isActive: true,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      };

      res.json(createResponse(true, 'User retrieved successfully (mock data)', { user: mockUser }));
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      // Mock role update (authentication disabled)
      const mockUser = {
        id,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role,
        updatedAt: new Date().toISOString()
      };

      res.json(createResponse(true, 'User role updated successfully (mock response)', { user: mockUser }));
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      // Mock user deletion (authentication disabled)
      res.json(createResponse(true, 'User deleted successfully (mock response)'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
