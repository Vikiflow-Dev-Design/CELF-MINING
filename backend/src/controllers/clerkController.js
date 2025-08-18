const supabaseService = require('../services/supabaseService');
const { createResponse } = require('../utils/responseUtils');

class ClerkController {
  async handleUserWebhook(req, res, next) {
    try {
      const { type, data } = req.body;

      switch (type) {
        case 'user.created':
          await this.handleUserCreated(data);
          break;
        case 'user.updated':
          await this.handleUserUpdated(data);
          break;
        case 'user.deleted':
          await this.handleUserDeleted(data);
          break;
        default:
          console.log(`Unhandled user webhook type: ${type}`);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error handling user webhook:', error);
      next(error);
    }
  }

  async handleSessionWebhook(req, res, next) {
    try {
      const { type, data } = req.body;

      switch (type) {
        case 'session.created':
          await this.handleSessionCreated(data);
          break;
        case 'session.ended':
          await this.handleSessionEnded(data);
          break;
        default:
          console.log(`Unhandled session webhook type: ${type}`);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error handling session webhook:', error);
      next(error);
    }
  }

  async handleUserCreated(userData) {
    try {
      const { id: clerkUserId, email_addresses, first_name, last_name, profile_image_url } = userData;

      const primaryEmail = email_addresses.find(email => email.id === userData.primary_email_address_id);

      if (!primaryEmail) {
        throw new Error('No primary email found for user');
      }

      // Create user in our database
      const user = await supabaseService.createUser({
        clerk_user_id: clerkUserId,
        email: primaryEmail.email_address,
        first_name: first_name || '',
        last_name: last_name || '',
        profile_image_url: profile_image_url,
        is_email_verified: primaryEmail.verification?.status === 'verified',
        auth_provider: 'clerk'
      });

      // Create wallet for the user
      const walletAddress = `celf${Math.random().toString(36).substr(2, 40)}`;
      const wallet = await supabaseService.createWallet({
        user_id: user.id,
        current_address: walletAddress,
        addresses: JSON.stringify([{
          address: walletAddress,
          label: 'Main Wallet',
          isDefault: true
        }]),
        sendable_balance: 5.0000, // Initial sendable balance
        non_sendable_balance: 0,
        pending_balance: 0
      });

      console.log(`User created: ${user.email} with wallet: ${wallet.current_address}`);
    } catch (error) {
      console.error('Error creating user from Clerk webhook:', error);
      throw error;
    }
  }

  async handleUserUpdated(userData) {
    try {
      const { id: clerkUserId, email_addresses, first_name, last_name, profile_image_url } = userData;
      
      const user = await User.findOne({ clerkUserId });
      if (!user) {
        console.log(`User not found for Clerk ID: ${clerkUserId}`);
        return;
      }

      const primaryEmail = email_addresses.find(email => email.id === userData.primary_email_address_id);
      
      if (primaryEmail) {
        user.email = primaryEmail.email_address;
        user.isEmailVerified = primaryEmail.verification?.status === 'verified';
      }

      user.firstName = first_name || user.firstName;
      user.lastName = last_name || user.lastName;
      user.profileImageUrl = profile_image_url || user.profileImageUrl;

      await user.save();

      console.log(`User updated: ${user.email}`);
    } catch (error) {
      console.error('Error updating user from Clerk webhook:', error);
      throw error;
    }
  }

  async handleUserDeleted(userData) {
    try {
      const { id: clerkUserId } = userData;
      
      const user = await User.findOne({ clerkUserId });
      if (!user) {
        console.log(`User not found for deletion: ${clerkUserId}`);
        return;
      }

      // Delete user's wallet
      await Wallet.deleteOne({ userId: user._id });

      // Delete user
      await User.deleteOne({ clerkUserId });

      console.log(`User deleted: ${clerkUserId}`);
    } catch (error) {
      console.error('Error deleting user from Clerk webhook:', error);
      throw error;
    }
  }

  async handleSessionCreated(sessionData) {
    try {
      const { user_id: clerkUserId } = sessionData;
      
      const user = await User.findOne({ clerkUserId });
      if (user) {
        user.lastLogin = new Date();
        await user.save();
      }
    } catch (error) {
      console.error('Error handling session created:', error);
    }
  }

  async handleSessionEnded(sessionData) {
    try {
      // Handle session end if needed
      console.log('Session ended for user:', sessionData.user_id);
    } catch (error) {
      console.error('Error handling session ended:', error);
    }
  }

  async syncUser(req, res, next) {
    try {
      const { clerkUserId, email, firstName, lastName } = req.body;

      let user = await User.findOne({ clerkUserId });
      
      if (!user) {
        // Create new user
        user = new User({
          clerkUserId,
          email,
          firstName: firstName || '',
          lastName: lastName || '',
          authProvider: 'clerk',
          isEmailVerified: true
        });

        await user.save();

        // Create wallet
        const wallet = new Wallet({
          userId: user._id,
          addresses: [{
            address: `celf${Math.random().toString(36).substr(2, 40)}`,
            label: 'Main Wallet',
            isDefault: true
          }],
          sendableBalance: 5.0000,
          nonSendableBalance: 0,
          pendingBalance: 0
        });

        wallet.currentAddress = wallet.addresses[0].address;
        wallet.totalBalance = wallet.sendableBalance + wallet.nonSendableBalance + wallet.pendingBalance;
        
        await wallet.save();
      } else {
        // Update existing user
        user.email = email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        await user.save();
      }

      res.json(createResponse(true, 'User synchronized successfully', { user }));
    } catch (error) {
      next(error);
    }
  }

  async getUserByClerkId(req, res, next) {
    try {
      const { clerkUserId } = req.params;

      const user = await User.findOne({ clerkUserId });
      if (!user) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      res.json(createResponse(true, 'User retrieved successfully', { user }));
    } catch (error) {
      next(error);
    }
  }

  async updateUserFromClerk(req, res, next) {
    try {
      const { clerkUserId } = req.params;
      const { email, firstName, lastName, profileImageUrl } = req.body;

      const user = await User.findOne({ clerkUserId });
      if (!user) {
        return res.status(404).json(createResponse(false, 'User not found'));
      }

      if (email) user.email = email;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (profileImageUrl) user.profileImageUrl = profileImageUrl;

      await user.save();

      res.json(createResponse(true, 'User updated successfully', { user }));
    } catch (error) {
      next(error);
    }
  }

  // Helper method for webhook signature verification (to be implemented)
  verifyWebhookSignature(signature, timestamp, payload) {
    // TODO: Implement Clerk webhook signature verification
    // This should use Clerk's webhook secret to verify the signature
    return true; // For now, always return true in development
  }
}

module.exports = new ClerkController();
