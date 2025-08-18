const supabaseService = require('../services/supabaseService');
const { createResponse } = require('../utils/responseUtils');

class WalletController {
  async getBalance(req, res, next) {
    try {
      const userId = req.user.userId;
      const wallet = await supabaseService.findWalletByUserId(userId);

      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      res.json(createResponse(true, 'Balance retrieved successfully', {
        totalBalance: parseFloat(wallet.total_balance),
        sendableBalance: parseFloat(wallet.sendable_balance),
        nonSendableBalance: parseFloat(wallet.non_sendable_balance),
        pendingBalance: parseFloat(wallet.pending_balance),
        currentAddress: wallet.current_address,
        lastActivity: wallet.last_activity
      }));
    } catch (error) {
      next(error);
    }
  }

  async getBalanceBreakdown(req, res, next) {
    try {
      const userId = req.user.userId;
      const wallet = await Wallet.findOne({ userId });

      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      res.json(createResponse(true, 'Balance breakdown retrieved successfully', {
        sendable: wallet.sendableBalance,
        nonSendable: wallet.nonSendableBalance,
        pending: wallet.pendingBalance,
        total: wallet.totalBalance
      }));
    } catch (error) {
      next(error);
    }
  }

  async getAddresses(req, res, next) {
    try {
      const userId = req.user.userId;
      const wallet = await Wallet.findOne({ userId });

      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      res.json(createResponse(true, 'Addresses retrieved successfully', {
        addresses: wallet.addresses,
        currentAddress: wallet.currentAddress
      }));
    } catch (error) {
      next(error);
    }
  }

  async addAddress(req, res, next) {
    try {
      const userId = req.user.userId;
      const { address, label } = req.body;

      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      // Check if address already exists
      const existingAddress = wallet.addresses.find(addr => addr.address === address);
      if (existingAddress) {
        return res.status(400).json(createResponse(false, 'Address already exists'));
      }

      wallet.addresses.push({
        address,
        label: label || `Address ${wallet.addresses.length + 1}`,
        isDefault: wallet.addresses.length === 0
      });

      await wallet.save();

      res.status(201).json(createResponse(true, 'Address added successfully', {
        address: wallet.addresses[wallet.addresses.length - 1]
      }));
    } catch (error) {
      next(error);
    }
  }

  async setDefaultAddress(req, res, next) {
    try {
      const userId = req.user.userId;
      const { address } = req.params;

      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      // Update default address
      wallet.addresses.forEach(addr => {
        addr.isDefault = addr.address === address;
      });

      wallet.currentAddress = address;
      await wallet.save();

      res.json(createResponse(true, 'Default address updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req, res, next) {
    try {
      const userId = req.user.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const transactions = await Transaction.find({
        $or: [{ fromUserId: userId }, { toUserId: userId }]
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('fromUserId', 'firstName lastName')
        .populate('toUserId', 'firstName lastName');

      const total = await Transaction.countDocuments({
        $or: [{ fromUserId: userId }, { toUserId: userId }]
      });

      res.json(createResponse(true, 'Transactions retrieved successfully', {
        transactions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req, res, next) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const transaction = await Transaction.findOne({
        _id: id,
        $or: [{ fromUserId: userId }, { toUserId: userId }]
      })
        .populate('fromUserId', 'firstName lastName')
        .populate('toUserId', 'firstName lastName');

      if (!transaction) {
        return res.status(404).json(createResponse(false, 'Transaction not found'));
      }

      res.json(createResponse(true, 'Transaction retrieved successfully', { transaction }));
    } catch (error) {
      next(error);
    }
  }

  async sendTokens(req, res, next) {
    try {
      const userId = req.user.userId;
      const { toAddress, amount, description } = req.body;

      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      if (amount > wallet.sendableBalance) {
        return res.status(400).json(createResponse(false, 'Insufficient sendable balance'));
      }

      // Create transaction
      const transaction = new Transaction({
        fromUserId: userId,
        toAddress,
        amount,
        type: 'send',
        status: 'pending',
        description: description || `Sent to ${toAddress.slice(0, 8)}...`,
        fee: 0.001 // Mock fee
      });

      await transaction.save();

      // Update wallet balance
      wallet.sendableBalance -= (amount + transaction.fee);
      wallet.pendingBalance += amount;
      wallet.totalBalance = wallet.sendableBalance + wallet.nonSendableBalance + wallet.pendingBalance;
      await wallet.save();

      // Simulate transaction processing
      setTimeout(async () => {
        transaction.status = 'completed';
        transaction.hash = `0x${Math.random().toString(16).substr(2, 64)}`;
        await transaction.save();

        wallet.pendingBalance -= amount;
        wallet.totalBalance = wallet.sendableBalance + wallet.nonSendableBalance + wallet.pendingBalance;
        await wallet.save();
      }, 3000);

      res.status(201).json(createResponse(true, 'Transaction initiated successfully', { transaction }));
    } catch (error) {
      next(error);
    }
  }

  async exchangeTokens(req, res, next) {
    try {
      const userId = req.user.userId;
      const { amount, fromType, toType } = req.body;

      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      if (fromType === toType) {
        return res.status(400).json(createResponse(false, 'Cannot exchange to the same token type'));
      }

      if (fromType === 'sendable' && amount > wallet.sendableBalance) {
        return res.status(400).json(createResponse(false, 'Insufficient sendable balance'));
      }

      if (fromType === 'nonSendable' && amount > wallet.nonSendableBalance) {
        return res.status(400).json(createResponse(false, 'Insufficient non-sendable balance'));
      }

      // Perform exchange
      if (fromType === 'sendable' && toType === 'nonSendable') {
        wallet.sendableBalance -= amount;
        wallet.nonSendableBalance += amount;
      } else if (fromType === 'nonSendable' && toType === 'sendable') {
        wallet.nonSendableBalance -= amount;
        wallet.sendableBalance += amount;
      }

      await wallet.save();

      res.json(createResponse(true, 'Token exchange completed successfully', {
        newBalance: {
          sendable: wallet.sendableBalance,
          nonSendable: wallet.nonSendableBalance,
          total: wallet.totalBalance
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  async getExchangeRates(req, res, next) {
    try {
      // Mock exchange rates
      const rates = {
        CELF_USD: 0.25,
        sendableToNonSendable: 1.0,
        nonSendableToSendable: 1.0
      };

      res.json(createResponse(true, 'Exchange rates retrieved successfully', { rates }));
    } catch (error) {
      next(error);
    }
  }

  async addMiningReward(req, res, next) {
    try {
      const userId = req.user.userId;
      const { amount, sessionId } = req.body;

      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      // Add mining reward to non-sendable balance
      wallet.nonSendableBalance += amount;
      wallet.totalBalance = wallet.sendableBalance + wallet.nonSendableBalance + wallet.pendingBalance;
      await wallet.save();

      // Create transaction record
      const transaction = new Transaction({
        toUserId: userId,
        amount,
        type: 'mining',
        status: 'completed',
        description: 'Mining reward',
        sessionId
      });

      await transaction.save();

      res.json(createResponse(true, 'Mining reward added successfully', {
        newBalance: wallet.totalBalance,
        transaction
      }));
    } catch (error) {
      next(error);
    }
  }

  async getWalletStats(req, res, next) {
    try {
      const userId = req.user.userId;

      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      const totalTransactions = await Transaction.countDocuments({
        $or: [{ fromUserId: userId }, { toUserId: userId }]
      });

      const totalSent = await Transaction.aggregate([
        { $match: { fromUserId: userId, type: 'send', status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      const totalReceived = await Transaction.aggregate([
        { $match: { toUserId: userId, type: 'receive', status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      const totalMined = await Transaction.aggregate([
        { $match: { toUserId: userId, type: 'mining', status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      const stats = {
        totalBalance: wallet.totalBalance,
        totalTransactions,
        totalSent: totalSent[0]?.total || 0,
        totalReceived: totalReceived[0]?.total || 0,
        totalMined: totalMined[0]?.total || 0
      };

      res.json(createResponse(true, 'Wallet statistics retrieved successfully', { stats }));
    } catch (error) {
      next(error);
    }
  }

  async getPreferences(req, res, next) {
    try {
      const userId = req.user.userId;
      const wallet = await Wallet.findOne({ userId });

      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      res.json(createResponse(true, 'Preferences retrieved successfully', {
        preferences: wallet.preferences
      }));
    } catch (error) {
      next(error);
    }
  }

  async updatePreferences(req, res, next) {
    try {
      const userId = req.user.userId;
      const { currency, notifications } = req.body;

      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      if (currency) wallet.preferences.currency = currency;
      if (notifications !== undefined) wallet.preferences.notifications = notifications;

      await wallet.save();

      res.json(createResponse(true, 'Preferences updated successfully', {
        preferences: wallet.preferences
      }));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WalletController();
