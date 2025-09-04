const taskService = require('../services/taskService');
const { Task, UserTask } = require('../models');
const { validationResult } = require('express-validator');

class TaskController {
  /**
   * Get all tasks (same for all users)
   * GET /api/tasks
   */
  async getUserTasks(req, res) {
    try {
      const { category } = req.query;

      // Get all active tasks from database
      let tasks = await Task.findActiveTasks();

      // Transform tasks to match mobile app format
      tasks = tasks.map(task => ({
        id: task.taskId,
        title: task.title,
        description: task.description,
        category: task.category,
        progress: 0, // All users start with 0 progress
        maxProgress: task.maxProgress,
        reward: task.reward,
        isCompleted: false, // All users start with incomplete tasks
        icon: task.icon,
        tips: task.tips,
        requirements: task.requirements,
        rewardClaimed: false
      }));

      // Filter by category if specified
      if (category && category !== 'all') {
        tasks = tasks.filter(task => task.category === category);
      }

      // Mock stats (same for all users)
      const stats = {
        totalTasks: tasks.length,
        completedTasks: 0,
        unclaimedRewards: 0,
        totalUnclaimedRewardValue: 0,
        completionPercentage: 0
      };

      res.json({
        success: true,
        data: {
          tasks,
          stats,
          categories: [
            { key: 'all', label: 'All', icon: 'apps', color: '#007AFF' },
            { key: 'mining', label: 'Mining', icon: 'diamond', color: '#FF9500' },
            { key: 'social', label: 'Social', icon: 'people', color: '#34C759' },
            { key: 'wallet', label: 'Wallet', icon: 'card', color: '#007AFF' },
            { key: 'milestone', label: 'Milestone', icon: 'trophy', color: '#FF3B30' }
          ]
        }
      });
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get tasks',
        error: error.message
      });
    }
  }

  /**
   * Get specific task details (same for all users)
   * GET /api/tasks/:taskId
   */
  async getTaskDetails(req, res) {
    try {
      const { taskId } = req.params;

      // Find task by taskId
      const task = await Task.findOne({ taskId, isActive: true });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      // Transform task to match mobile app format
      const taskDetails = {
        id: task.taskId,
        title: task.title,
        description: task.description,
        category: task.category,
        progress: 0, // All users start with 0 progress
        maxProgress: task.maxProgress,
        reward: task.reward,
        isCompleted: false, // All users start with incomplete tasks
        icon: task.icon,
        tips: task.tips,
        requirements: task.requirements,
        rewardClaimed: false
      };

      res.json({
        success: true,
        data: taskDetails
      });
    } catch (error) {
      console.error('Error getting task details:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to get task details',
        error: error.message
      });
    }
  }

  /**
   * Claim task reward (mock implementation for demo)
   * POST /api/tasks/:taskId/claim
   */
  async claimReward(req, res) {
    try {
      const { taskId } = req.params;

      // Find task by taskId
      const task = await Task.findOne({ taskId, isActive: true });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      // Mock successful reward claim
      res.json({
        success: true,
        data: {
          success: true,
          reward: task.reward,
          message: `Successfully claimed ${task.reward} CELF tokens!`
        }
      });
    } catch (error) {
      console.error('Error claiming task reward:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to claim reward',
        error: error.message
      });
    }
  }

  /**
   * Get user task statistics
   * GET /api/tasks/stats
   */
  async getUserStats(req, res) {
    try {
      const userId = req.user.id;
      const stats = await taskService.getUserTaskStats(userId);

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error getting user task stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get task statistics',
        error: error.message
      });
    }
  }

  /**
   * Initialize tasks for a user (usually called during registration)
   * POST /api/tasks/initialize
   */
  async initializeUserTasks(req, res) {
    try {
      const userId = req.user.id;
      const count = await taskService.initializeUserTasks(userId);

      res.json({
        success: true,
        message: `Initialized ${count} tasks`,
        data: { initializedCount: count }
      });
    } catch (error) {
      console.error('Error initializing user tasks:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to initialize tasks',
        error: error.message
      });
    }
  }

  // Admin endpoints

  /**
   * Get all tasks (admin only)
   * GET /api/admin/tasks
   */
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.findActiveTasks();

      res.json({
        success: true,
        data: tasks
      });
    } catch (error) {
      console.error('Error getting all tasks:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get tasks',
        error: error.message
      });
    }
  }

  /**
   * Create new task (admin only)
   * POST /api/admin/tasks
   */
  async createTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const task = new Task(req.body);
      await task.save();

      res.status(201).json({
        success: true,
        data: task,
        message: 'Task created successfully'
      });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create task',
        error: error.message
      });
    }
  }

  /**
   * Update task (admin only)
   * PUT /api/admin/tasks/:id
   */
  async updateTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const task = await Task.findByIdAndUpdate(id, req.body, { 
        new: true, 
        runValidators: true 
      });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.json({
        success: true,
        data: task,
        message: 'Task updated successfully'
      });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update task',
        error: error.message
      });
    }
  }

  /**
   * Delete task (admin only)
   * DELETE /api/admin/tasks/:id
   */
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndUpdate(id, { isActive: false }, { new: true });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete task',
        error: error.message
      });
    }
  }

  /**
   * Update user task progress (admin only)
   * PUT /api/admin/users/:userId/tasks/:taskId/progress
   */
  async updateUserProgress(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { userId, taskId } = req.params;
      const { progress } = req.body;

      const result = await taskService.updateTaskProgress(
        userId, 
        taskId, 
        progress, 
        'admin', 
        { updatedBy: req.user.id }
      );

      res.json({
        success: true,
        data: result,
        message: 'Task progress updated successfully'
      });
    } catch (error) {
      console.error('Error updating user task progress:', error);
      
      let statusCode = 500;
      if (error.message.includes('not found')) statusCode = 404;

      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TaskController();
