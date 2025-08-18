const mongoose = require('mongoose');

const miningSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Mining session name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  status: {
    type: String,
    enum: ['created', 'active', 'paused', 'completed', 'failed', 'cancelled'],
    default: 'created'
  },
  parameters: {
    algorithm: {
      type: String,
      enum: ['sha256', 'scrypt', 'ethash', 'randomx'],
      default: 'sha256'
    },
    difficulty: {
      type: Number,
      min: 1,
      max: 100,
      default: 1
    },
    poolUrl: {
      type: String,
      trim: true
    },
    walletAddress: {
      type: String,
      trim: true
    },
    workerName: {
      type: String,
      trim: true,
      default: 'worker1'
    },
    threads: {
      type: Number,
      min: 1,
      max: 32,
      default: 1
    },
    intensity: {
      type: Number,
      min: 1,
      max: 10,
      default: 5
    }
  },
  startedAt: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  pausedAt: {
    type: Date,
    default: null
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  results: {
    hashRate: {
      type: Number,
      default: 0
    },
    sharesAccepted: {
      type: Number,
      default: 0
    },
    sharesRejected: {
      type: Number,
      default: 0
    },
    totalHashes: {
      type: Number,
      default: 0
    },
    earnings: {
      type: Number,
      default: 0
    },
    powerConsumption: {
      type: Number,
      default: 0
    }
  },
  metrics: {
    temperature: {
      type: Number,
      default: 0
    },
    fanSpeed: {
      type: Number,
      default: 0
    },
    memoryUsage: {
      type: Number,
      default: 0
    },
    cpuUsage: {
      type: Number,
      default: 0
    }
  },
  logs: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    level: {
      type: String,
      enum: ['info', 'warning', 'error', 'debug'],
      default: 'info'
    },
    message: {
      type: String,
      required: true
    },
    data: mongoose.Schema.Types.Mixed
  }],
  errors: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    code: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    stack: String,
    resolved: {
      type: Boolean,
      default: false
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  configuration: {
    autoRestart: {
      type: Boolean,
      default: false
    },
    maxRuntime: {
      type: Number, // in minutes
      default: null
    },
    stopOnError: {
      type: Boolean,
      default: true
    },
    notifications: {
      onStart: {
        type: Boolean,
        default: true
      },
      onComplete: {
        type: Boolean,
        default: true
      },
      onError: {
        type: Boolean,
        default: true
      }
    }
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

// Indexes
miningSessionSchema.index({ userId: 1, createdAt: -1 });
miningSessionSchema.index({ status: 1 });
miningSessionSchema.index({ startedAt: -1 });
miningSessionSchema.index({ tags: 1 });

// Virtual for duration
miningSessionSchema.virtual('duration').get(function() {
  if (this.startedAt) {
    const endTime = this.completedAt || new Date();
    return Math.floor((endTime - this.startedAt) / 1000); // duration in seconds
  }
  return 0;
});

// Virtual for efficiency
miningSessionSchema.virtual('efficiency').get(function() {
  if (this.results.sharesAccepted + this.results.sharesRejected > 0) {
    return (this.results.sharesAccepted / (this.results.sharesAccepted + this.results.sharesRejected)) * 100;
  }
  return 0;
});

// Pre-save middleware
miningSessionSchema.pre('save', function(next) {
  // Update progress based on status
  if (this.status === 'completed') {
    this.progress = 100;
  } else if (this.status === 'failed' || this.status === 'cancelled') {
    // Keep current progress
  }
  
  next();
});

// Methods
miningSessionSchema.methods.addLog = function(level, message, data = null) {
  this.logs.push({
    level,
    message,
    data,
    timestamp: new Date()
  });
  
  // Keep only last 1000 logs
  if (this.logs.length > 1000) {
    this.logs = this.logs.slice(-1000);
  }
  
  return this.save();
};

miningSessionSchema.methods.addError = function(code, message, stack = null) {
  this.errors.push({
    code,
    message,
    stack,
    timestamp: new Date()
  });
  
  return this.save();
};

module.exports = mongoose.model('MiningSession', miningSessionSchema);
