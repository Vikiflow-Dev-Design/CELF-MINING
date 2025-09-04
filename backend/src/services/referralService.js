/**
 * Referral Service
 * Handles all referral-related business logic
 */

const crypto = require('crypto');
const User = require('../models/User');
const Referral = require('../models/Referral');
const Transaction = require('../models/Transaction');
const mongodbService = require('./mongodbService');

class ReferralService {
  
  /**
   * Generate a unique referral code for a user
   */
  static generateReferralCode(firstName, lastName) {
    const namePrefix = (firstName.substring(0, 2) + lastName.substring(0, 2)).toUpperCase();
    const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `${namePrefix}${randomSuffix}`;
  }

  /**
   * Create referral code for existing user
   */
  static async createReferralCodeForUser(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      if (user.referralCode) {
        return user.referralCode;
      }

      let referralCode;
      let isUnique = false;
      let attempts = 0;

      // Generate unique referral code
      while (!isUnique && attempts < 10) {
        referralCode = this.generateReferralCode(user.firstName, user.lastName);
        const existingUser = await User.findOne({ referralCode });
        if (!existingUser) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        throw new Error('Failed to generate unique referral code');
      }

      user.referralCode = referralCode;
      await user.save();

      console.log(`✅ ReferralService: Created referral code ${referralCode} for user ${user.email}`);
      return referralCode;
    } catch (error) {
      console.error('❌ ReferralService: Error creating referral code:', error);
      throw error;
    }
  }

  /**
   * Process referral signup
   */
  static async processReferralSignup(refereeId, referralCode, metadata = {}) {
    try {
      console.log(`🔍 ReferralService: Processing referral signup for ${refereeId} with code ${referralCode}`);

      // Find referrer by code
      const referrer = await User.findOne({ referralCode });
      if (!referrer) {
        console.log(`⚠️  ReferralService: Invalid referral code: ${referralCode}`);
        return null;
      }

      // Prevent self-referral
      if (referrer._id.toString() === refereeId.toString()) {
        console.log(`⚠️  ReferralService: Self-referral attempt blocked`);
        return null;
      }

      // Check if referral already exists
      const existingReferral = await Referral.findOne({ refereeId });
      if (existingReferral) {
        console.log(`⚠️  ReferralService: User already has a referral record`);
        return existingReferral;
      }

      // Create referral record
      const referral = new Referral({
        referrerId: referrer._id,
        refereeId,
        referralCode,
        status: 'completed',
        referrerReward: { amount: 5 }, // 5 CELF for referrer
        refereeReward: { amount: 5 },  // 5 CELF for referee
        source: metadata.source || 'mobile_app',
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent
      });

      await referral.save();

      // Update referee's referredBy field
      await User.findByIdAndUpdate(refereeId, { referredBy: referrer._id });

      console.log(`✅ ReferralService: Referral created successfully`);
      return referral;
    } catch (error) {
      console.error('❌ ReferralService: Error processing referral signup:', error);
      throw error;
    }
  }

  /**
   * Give referral rewards
   */
  static async giveReferralRewards(referralId) {
    try {
      const referral = await Referral.findById(referralId)
        .populate('referrerId', 'firstName lastName email')
        .populate('refereeId', 'firstName lastName email');

      if (!referral) {
        throw new Error('Referral not found');
      }

      if (referral.status === 'rewarded') {
        console.log(`⚠️  ReferralService: Rewards already given for referral ${referralId}`);
        return referral;
      }

      console.log(`💰 ReferralService: Giving rewards for referral ${referralId}`);

      // Give reward to referrer
      if (!referral.referrerReward.given) {
        const referrerWallet = await mongodbService.findWalletByUserId(referral.referrerId._id);
        if (referrerWallet) {
          const newBalance = referrerWallet.sendableBalance + referral.referrerReward.amount;
          await mongodbService.updateWallet(referrerWallet.id, {
            sendableBalance: newBalance,
            totalBalance: newBalance + referrerWallet.nonSendableBalance + referrerWallet.pendingBalance,
            totalReceived: (referrerWallet.totalReceived || 0) + referral.referrerReward.amount
          });

          // Create transaction record
          await mongodbService.createTransaction({
            toUserId: referral.referrerId._id,
            amount: referral.referrerReward.amount,
            type: 'referral',
            status: 'completed',
            description: `Referral reward for inviting ${referral.refereeId.firstName} ${referral.refereeId.lastName}`,
            fee: 0
          });

          console.log(`✅ ReferralService: Gave ${referral.referrerReward.amount} CELF to referrer ${referral.referrerId.email}`);
        }
      }

      // Give reward to referee
      if (!referral.refereeReward.given) {
        const refereeWallet = await mongodbService.findWalletByUserId(referral.refereeId._id);
        if (refereeWallet) {
          const newBalance = refereeWallet.sendableBalance + referral.refereeReward.amount;
          await mongodbService.updateWallet(refereeWallet.id, {
            sendableBalance: newBalance,
            totalBalance: newBalance + refereeWallet.nonSendableBalance + refereeWallet.pendingBalance,
            totalReceived: (refereeWallet.totalReceived || 0) + referral.refereeReward.amount
          });

          // Create transaction record
          await mongodbService.createTransaction({
            toUserId: referral.refereeId._id,
            amount: referral.refereeReward.amount,
            type: 'referral',
            status: 'completed',
            description: `Referral bonus for joining through ${referral.referrerId.firstName} ${referral.referrerId.lastName}`,
            fee: 0
          });

          console.log(`✅ ReferralService: Gave ${referral.refereeReward.amount} CELF to referee ${referral.refereeId.email}`);
        }
      }

      // Mark referral as rewarded
      await referral.markRewarded();

      // Update referrer stats
      await User.findByIdAndUpdate(referral.referrerId._id, {
        $inc: {
          'referralStats.successfulReferrals': 1,
          'referralStats.totalEarned': referral.referrerReward.amount
        },
        $set: {
          'referralStats.lastReferralDate': new Date()
        }
      });

      console.log(`✅ ReferralService: Referral rewards completed for ${referralId}`);
      return referral;
    } catch (error) {
      console.error('❌ ReferralService: Error giving referral rewards:', error);
      throw error;
    }
  }

  /**
   * Get user's referral statistics
   */
  static async getUserReferralStats(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Ensure user has referral code
      if (!user.referralCode) {
        await this.createReferralCodeForUser(userId);
        user.referralCode = await User.findById(userId).select('referralCode').referralCode;
      }

      const referralStats = await Referral.getStats(userId);
      const referrals = await Referral.findByReferrer(userId);

      return {
        referralCode: user.referralCode,
        referralLink: `${process.env.APP_URL || 'https://celf.app'}/signup?ref=${user.referralCode}`,
        stats: referralStats,
        referrals: referrals.map(ref => ({
          id: ref._id,
          referee: {
            name: `${ref.refereeId.firstName} ${ref.refereeId.lastName}`,
            email: ref.refereeId.email
          },
          status: ref.status,
          reward: ref.referrerReward.amount,
          date: ref.createdAt
        }))
      };
    } catch (error) {
      console.error('❌ ReferralService: Error getting referral stats:', error);
      throw error;
    }
  }

  /**
   * Validate referral code
   */
  static async validateReferralCode(referralCode) {
    try {
      const referrer = await User.findOne({ referralCode }).select('firstName lastName email');
      return referrer ? {
        valid: true,
        referrer: {
          name: `${referrer.firstName} ${referrer.lastName}`,
          email: referrer.email
        }
      } : { valid: false };
    } catch (error) {
      console.error('❌ ReferralService: Error validating referral code:', error);
      return { valid: false };
    }
  }
}

module.exports = ReferralService;
