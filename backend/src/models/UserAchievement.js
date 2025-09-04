const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Achievement reference
  achievementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true,
    index: true
  },
  
  // Achievement identifier for easier queries
  achievementKey: {
    type: String,
    required: true,
    index: true
  },
  
  // Progress tracking
  progress: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Completion status
  isCompleted: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // Completion timestamp
  completedAt: {
    type: Date,
    sparse: true
  },
  
  // Reward claim status
  rewardClaimed: {
    type: Boolean,
    default: false
  },
  
  // Reward claim timestamp
  rewardClaimedAt: {
    type: Date,
    sparse: true
  },
  
  // Progress history for detailed tracking
  progressHistory: [{
    progress: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    source: {
      type: String,
      enum: ['mining', 'transaction', 'referral', 'manual', 'bonus'],
      required: true
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }],
  
  // Metadata for additional tracking
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

// Compound indexes for better performance
userAchievementSchema.index({ userId: 1, achievementKey: 1 }, { unique: true });
userAchievementSchema.index({ userId: 1, isCompleted: 1 });
userAchievementSchema.index({ userId: 1, rewardClaimed: 1 });
userAchievementSchema.index({ achievementId: 1, isCompleted: 1 });

// Pre-save middleware to handle completion logic
userAchievementSchema.pre('save', async function(next) {
  // If this is a new completion
  if (this.isModified('isCompleted') && this.isCompleted && !this.completedAt) {
    this.completedAt = new Date();
  }
  
  // If reward is being claimed
  if (this.isModified('rewardClaimed') && this.rewardClaimed && !this.rewardClaimedAt) {
    this.rewardClaimedAt = new Date();
  }
  
  next();
});

// Static methods
userAchievementSchema.statics.findUserAchievements = function(userId, options = {}) {
  const query = { userId };
  
  if (options.completed !== undefined) {
    query.isCompleted = options.completed;
  }
  
  if (options.rewardClaimed !== undefined) {
    query.rewardClaimed = options.rewardClaimed;
  }
  
  return this.find(query)
    .populate('achievementId')
    .sort({ createdAt: -1 });
};

userAchievementSchema.statics.findUserAchievementByKey = function(userId, achievementKey) {
  return this.findOne({ userId, achievementKey }).populate('achievementId');
};

userAchievementSchema.statics.getUserStats = function(userId) {
  return this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalAchievements: { $sum: 1 },
        completedAchievements: {
          $sum: { $cond: ['$isCompleted', 1, 0] }
        },
        unclaimedRewards: {
          $sum: {
            $cond: [
              { $and: ['$isCompleted', { $eq: ['$rewardClaimed', false] }] },
              1,
              0
            ]
          }
        }
      }
    }
  ]);
};

userAchievementSchema.statics.getCompletedAchievements = function(userId) {
  return this.find({ userId, isCompleted: true })
    .populate('achievementId')
    .sort({ completedAt: -1 });
};

userAchievementSchema.statics.getUnclaimedRewards = function(userId) {
  return this.find({ 
    userId, 
    isCompleted: true, 
    rewardClaimed: false 
  }).populate('achievementId');
};

// Instance methods
userAchievementSchema.methods.updateProgress = function(newProgress, source = 'manual', details = {}) {
  // Add to progress history
  this.progressHistory.push({
    progress: newProgress,
    source,
    details,
    timestamp: new Date()
  });
  
  // Update current progress
  this.progress = Math.max(this.progress, newProgress);
  
  return this.save();
};

userAchievementSchema.methods.incrementProgress = function(amount = 1, source = 'manual', details = {}) {
  const newProgress = this.progress + amount;
  return this.updateProgress(newProgress, source, details);
};

userAchievementSchema.methods.checkCompletion = async function() {
  if (this.isCompleted) {
    return false; // Already completed
  }
  
  // Populate achievement if not already populated
  if (!this.achievementId.maxProgress) {
    await this.populate('achievementId');
  }
  
  if (this.progress >= this.achievementId.maxProgress) {
    this.isCompleted = true;
    this.completedAt = new Date();
    await this.save();
    return true;
  }
  
  return false;
};

userAchievementSchema.methods.claimReward = async function() {
  if (!this.isCompleted) {
    throw new Error('Achievement not completed');
  }
  
  if (this.rewardClaimed) {
    throw new Error('Reward already claimed');
  }
  
  this.rewardClaimed = true;
  this.rewardClaimedAt = new Date();
  
  return this.save();
};

module.exports = mongoose.model('UserAchievement', userAchievementSchema);
