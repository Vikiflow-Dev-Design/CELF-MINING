const mongodbService = require('../services/mongodbService');
const { createResponse } = require('../utils/responseUtils');

class WalletController {
  async getBalance(req, res, next) {
    try {
      const userId = req.user.userId;
      const wallet = await mongodbService.findWalletByUserId(userId);

      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      res.json(createResponse(true, 'Balance retrieved successfully', {
        totalBalance: parseFloat(wallet.totalBalance),
        sendableBalance: parseFloat(wallet.sendableBalance),
        nonSendableBalance: parseFloat(wallet.nonSendableBalance),
        pendingBalance: parseFloat(wallet.pendingBalance),
        currentAddress: wallet.currentAddress,
        lastActivity: wallet.lastActivity
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

      // Find sender wallet
      const senderWallet = await mongodbService.findWalletByUserId(userId);
      if (!senderWallet) {
        return res.status(404).json(createResponse(false, 'Sender wallet not found'));
      }

      // Validate sender has sufficient sendable balance
      if (amount > senderWallet.sendableBalance) {
        return res.status(400).json(createResponse(false, 'Insufficient sendable balance'));
      }

      // Find and validate recipient
      const recipient = await mongodbService.findUserByWalletAddress(toAddress);
      if (!recipient) {
        return res.status(404).json(createResponse(false, 'Recipient wallet address not found'));
      }

      const recipientWallet = recipient.wallet;
      if (!recipientWallet) {
        return res.status(404).json(createResponse(false, 'Recipient wallet not found'));
      }

      // Prevent self-sending
      if (userId === recipient.id) {
        return res.status(400).json(createResponse(false, 'Cannot send tokens to yourself'));
      }

      // Create sender transaction (debit)
      const senderTransaction = await mongodbService.createTransaction({
        fromUserId: userId,
        toUserId: recipient.id,
        toAddress,
        amount,
        type: 'send',
        status: 'completed',
        description: description || `Sent to ${recipient.firstName} ${recipient.lastName}`,
        fee: 0 // No fees as requested
      });

      // Create recipient transaction (credit)
      const recipientTransaction = await mongodbService.createTransaction({
        fromUserId: userId,
        toUserId: recipient.id,
        toAddress,
        amount,
        type: 'receive',
        status: 'completed',
        description: description || `Received from ${senderWallet.userId}`,
        fee: 0
      });

      // Update sender wallet (deduct from sendable balance)
      const newSenderSendableBalance = senderWallet.sendableBalance - amount;
      await mongodbService.updateWallet(senderWallet.id, {
        sendableBalance: newSenderSendableBalance,
        totalBalance: newSenderSendableBalance + senderWallet.nonSendableBalance + senderWallet.pendingBalance,
        totalSent: (senderWallet.totalSent || 0) + amount,
        lastActivity: new Date()
      });

      // Update recipient wallet (add to sendable balance)
      const newRecipientSendableBalance = recipientWallet.sendableBalance + amount;
      await mongodbService.updateWallet(recipientWallet.id, {
        sendableBalance: newRecipientSendableBalance,
        totalBalance: newRecipientSendableBalance + recipientWallet.nonSendableBalance + recipientWallet.pendingBalance,
        totalReceived: (recipientWallet.totalReceived || 0) + amount,
        lastActivity: new Date()
      });

      res.status(201).json(createResponse(true, 'Transaction completed successfully', {
        transaction: senderTransaction,
        recipient: {
          name: `${recipient.firstName} ${recipient.lastName}`,
          address: toAddress
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  async exchangeTokens(req, res, next) {
    try {
      const userId = req.user.userId;
      const { amount, fromType, toType } = req.body;

      const wallet = await mongodbService.findWalletByUserId(userId);
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

      // Calculate new balances
      let newSendableBalance = wallet.sendableBalance;
      let newNonSendableBalance = wallet.nonSendableBalance;

      if (fromType === 'sendable' && toType === 'nonSendable') {
        newSendableBalance -= amount;
        newNonSendableBalance += amount;
      } else if (fromType === 'nonSendable' && toType === 'sendable') {
        newNonSendableBalance -= amount;
        newSendableBalance += amount;
      }

      // Update wallet using mongodbService
      const updatedWallet = await mongodbService.updateWallet(wallet.id, {
        sendableBalance: newSendableBalance,
        nonSendableBalance: newNonSendableBalance,
        totalBalance: newSendableBalance + newNonSendableBalance + wallet.pendingBalance,
        lastActivity: new Date()
      });

      res.json(createResponse(true, 'Token exchange completed successfully', {
        newBalance: {
          sendable: updatedWallet.sendableBalance,
          nonSendable: updatedWallet.nonSendableBalance,
          total: updatedWallet.totalBalance
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

      const wallet = await mongodbService.findWalletByUserId(userId);
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      // Add mining reward to non-sendable balance
      const newNonSendableBalance = wallet.nonSendableBalance + amount;
      const newTotalBalance = wallet.sendableBalance + newNonSendableBalance + wallet.pendingBalance;

      await mongodbService.updateWallet(wallet.id, {
        nonSendableBalance: newNonSendableBalance,
        totalBalance: newTotalBalance,
        totalMined: (wallet.totalMined || 0) + amount,
        lastActivity: new Date()
      });

      // Create transaction record
      const transaction = await mongodbService.createTransaction({
        toUserId: userId,
        amount,
        type: 'mining',
        status: 'completed',
        description: 'Mining reward',
        sessionId
      });

      res.json(createResponse(true, 'Mining reward added successfully', {
        newBalance: newTotalBalance,
        transaction
      }));
    } catch (error) {
      next(error);
    }
  }

  async getWalletStats(req, res, next) {
    try {
      const userId = req.user.userId;

      const wallet = await mongodbService.findWalletByUserId(userId);
      if (!wallet) {
        return res.status(404).json(createResponse(false, 'Wallet not found'));
      }

      const totalTransactions = await mongodbService.count('Transaction', {
        $or: [{ fromUserId: userId }, { toUserId: userId }]
      });

      const totalSent = await mongodbService.aggregate('Transaction', [
        { $match: { fromUserId: userId, type: 'send', status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      const totalReceived = await mongodbService.aggregate('Transaction', [
        { $match: { toUserId: userId, type: 'receive', status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      const totalMined = await mongodbService.aggregate('Transaction', [
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
