const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  // Achievement identification
  achievementId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Basic information
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  
  // Category for grouping achievements
  category: {
    type: String,
    enum: ['mining', 'social', 'wallet', 'milestone'],
    required: true,
    index: true
  },
  
  // Progress tracking
  maxProgress: {
    type: Number,
    required: true,
    min: 1
  },
  
  // Reward information
  reward: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Visual representation
  icon: {
    type: String,
    required: true,
    trim: true
  },
  
  // Helper information
  tips: [{
    type: String,
    trim: true,
    maxlength: 200
  }],
  requirements: [{
    type: String,
    trim: true,
    maxlength: 200
  }],
  
  // Achievement status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Achievement type for tracking logic
  trackingType: {
    type: String,
    enum: ['manual', 'automatic'],
    default: 'automatic'
  },
  
  // Conditions for automatic tracking
  conditions: {
    // For mining achievements
    miningSessionsRequired: {
      type: Number,
      min: 0
    },
    miningAmountRequired: {
      type: Number,
      min: 0
    },
    
    // For social achievements
    referralsRequired: {
      type: Number,
      min: 0
    },
    
    // For wallet achievements
    transactionsRequired: {
      type: Number,
      min: 0
    },
    balanceRequired: {
      type: Number,
      min: 0
    },
    
    // For milestone achievements
    totalTokensRequired: {
      type: Number,
      min: 0
    },
    
    // Custom conditions (for complex achievements)
    customConditions: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  
  // Ordering and display
  sortOrder: {
    type: Number,
    default: 0
  },
  
  // Metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better performance
achievementSchema.index({ category: 1, isActive: 1 });
achievementSchema.index({ sortOrder: 1 });
achievementSchema.index({ isActive: 1, sortOrder: 1 });

// Static methods
achievementSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ sortOrder: 1 });
};

achievementSchema.statics.findActiveAchievements = function() {
  return this.find({ isActive: true }).sort({ category: 1, sortOrder: 1 });
};

achievementSchema.statics.findByAchievementId = function(achievementId) {
  return this.findOne({ achievementId, isActive: true });
};

// Instance methods
achievementSchema.methods.checkConditions = function(userStats) {
  const conditions = this.conditions;
  
  // Check mining conditions
  if (conditions.miningSessionsRequired && userStats.miningSessionsCount < conditions.miningSessionsRequired) {
    return false;
  }
  
  if (conditions.miningAmountRequired && userStats.totalMined < conditions.miningAmountRequired) {
    return false;
  }
  
  // Check social conditions
  if (conditions.referralsRequired && userStats.referralsCount < conditions.referralsRequired) {
    return false;
  }
  
  // Check wallet conditions
  if (conditions.transactionsRequired && userStats.transactionsCount < conditions.transactionsRequired) {
    return false;
  }
  
  if (conditions.balanceRequired && userStats.totalBalance < conditions.balanceRequired) {
    return false;
  }
  
  // Check milestone conditions
  if (conditions.totalTokensRequired && userStats.totalTokens < conditions.totalTokensRequired) {
    return false;
  }
  
  return true;
};

module.exports = mongoose.model('Achievement', achievementSchema);
