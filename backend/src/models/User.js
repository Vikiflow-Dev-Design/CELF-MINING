const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 255,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: false, // Optional for Clerk integration
    minlength: 6
  },
  profileImageUrl: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  profile: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // Clerk integration fields
  clerkId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values while maintaining uniqueness
    index: true
  },
  externalId: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password; // Never return password in JSON
      return ret;
    }
  }
});

// Indexes for better performance (email and clerkId already have unique indexes)
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to hash password if provided
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const bcrypt = require('bcryptjs');
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) {
    return false;
  }
  
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find by Clerk ID
userSchema.statics.findByClerkId = function(clerkId) {
  return this.findOne({ clerkId });
};

module.exports = mongoose.model('User', userSchema);
