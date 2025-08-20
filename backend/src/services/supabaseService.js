const database = require('../config/database');

class SupabaseService {
  constructor() {
    this.supabase = null;
    this.adminSupabase = null;
  }

  /**
   * Initialize the service with database clients
   */
  init() {
    this.supabase = database.getClient();
    this.adminSupabase = database.getAdminClient();
  }

  /**
   * Get Supabase client
   */
  getClient() {
    if (!this.supabase) {
      this.init();
    }
    return this.supabase;
  }

  /**
   * Get admin Supabase client
   */
  getAdminClient() {
    if (!this.adminSupabase) {
      this.init();
    }
    return this.adminSupabase;
  }

  /**
   * Generic create operation
   */
  async create(table, data) {
    const { data: result, error } = await this.getClient()
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating ${table}: ${error.message}`);
    }

    return result;
  }

  /**
   * Generic find by ID operation
   */
  async findById(table, id) {
    const { data, error } = await this.getClient()
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Error finding ${table} by ID: ${error.message}`);
    }

    return data;
  }

  /**
   * Generic find operation with filters
   */
  async find(table, filters = {}, options = {}) {
    let query = this.getClient().from(table).select(options.select || '*');

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });

    // Apply sorting
    if (options.orderBy) {
      const { column, ascending = false } = options.orderBy;
      query = query.order(column, { ascending });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error finding ${table}: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Generic find one operation
   */
  async findOne(table, filters = {}) {
    const results = await this.find(table, filters, { limit: 1 });
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Generic update operation
   */
  async update(table, id, data) {
    const { data: result, error } = await this.getClient()
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating ${table}: ${error.message}`);
    }

    return result;
  }

  /**
   * Generic delete operation
   */
  async delete(table, id) {
    const { error } = await this.getClient()
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting ${table}: ${error.message}`);
    }

    return true;
  }

  /**
   * Count records in a table
   */
  async count(table, filters = {}) {
    let query = this.getClient()
      .from(table)
      .select('*', { count: 'exact', head: true });

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });

    const { count, error } = await query;

    if (error) {
      throw new Error(`Error counting ${table}: ${error.message}`);
    }

    return count || 0;
  }

  /**
   * Execute a custom query
   */
  async query(sql, params = []) {
    const { data, error } = await this.getAdminClient()
      .rpc('execute_sql', { sql_query: sql, params });

    if (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }

    return data;
  }

  /**
   * User-specific operations
   */
  async findUserByEmail(email) {
    return this.findOne('users', { email });
  }

  async createUser(userData) {
    return this.create('users', userData);
  }

  async findUserById(userId) {
    return this.findById('users', userId);
  }

  async updateUser(userId, updateData) {
    return this.update('users', userId, updateData);
  }

  /**
   * Delete a single user and all related data
   * @param {string} userId - User ID to delete
   * @returns {object} Deletion summary
   */
  async deleteUser(userId) {
    const client = this.getClient();

    try {
      // Start a transaction-like operation by collecting all related data first
      const user = await this.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Get related data counts for summary
      const wallet = await this.findWalletByUserId(userId);
      const miningSessions = await this.find('mining_sessions', { user_id: userId });
      const fromTransactions = await this.find('transactions', { from_user_id: userId });
      const toTransactions = await this.find('transactions', { to_user_id: userId });

      // Delete related data (order matters due to foreign key constraints)
      // 1. Mining sessions (CASCADE will handle this, but we'll be explicit)
      await client.from('mining_sessions').delete().eq('user_id', userId);

      // 2. Update transactions to set user references to NULL (as per schema)
      await client.from('transactions').update({ from_user_id: null }).eq('from_user_id', userId);
      await client.from('transactions').update({ to_user_id: null }).eq('to_user_id', userId);

      // 3. Update contact submissions and support tickets assigned_to field
      await client.from('contact_submissions').update({ assigned_to: null }).eq('assigned_to', userId);
      await client.from('support_tickets').update({ assigned_to: null }).eq('assigned_to', userId);

      // 4. Delete wallet (CASCADE will handle this)
      if (wallet) {
        await client.from('wallets').delete().eq('user_id', userId);
      }

      // 5. Finally delete the user
      const { error } = await client.from('users').delete().eq('id', userId);
      if (error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }

      return {
        deletedUser: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        },
        relatedDataDeleted: {
          wallet: wallet ? 1 : 0,
          miningSessions: miningSessions.length,
          transactionsUpdated: fromTransactions.length + toTransactions.length
        }
      };
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  /**
   * Delete multiple users by their IDs
   * @param {string[]} userIds - Array of user IDs to delete
   * @returns {object} Deletion summary
   */
  async deleteMultipleUsers(userIds) {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Error('User IDs array is required and cannot be empty');
    }

    const client = this.getClient();
    const deletionResults = [];
    const errors = [];

    for (const userId of userIds) {
      try {
        const result = await this.deleteUser(userId);
        deletionResults.push(result);
      } catch (error) {
        errors.push({
          userId,
          error: error.message
        });
      }
    }

    return {
      successful: deletionResults,
      failed: errors,
      summary: {
        totalRequested: userIds.length,
        successful: deletionResults.length,
        failed: errors.length
      }
    };
  }

  /**
   * Delete all users (DANGEROUS - Admin only)
   * @param {object} options - Deletion options
   * @returns {object} Deletion summary
   */
  async deleteAllUsers(options = {}) {
    const { excludeAdmins = true, confirmationToken } = options;

    // Safety check - require confirmation token
    if (confirmationToken !== 'DELETE_ALL_USERS_CONFIRMED') {
      throw new Error('Confirmation token required for bulk deletion');
    }

    const client = this.getClient();

    try {
      // Get all users (optionally excluding admins)
      let query = client.from('users').select('id, email, role, first_name, last_name');

      if (excludeAdmins) {
        query = query.neq('role', 'admin');
      }

      const { data: users, error } = await query;
      if (error) {
        throw new Error(`Error fetching users: ${error.message}`);
      }

      if (users.length === 0) {
        return {
          message: 'No users found to delete',
          deletedCount: 0
        };
      }

      // Delete all related data first
      const userIds = users.map(user => user.id);

      // 1. Delete mining sessions
      await client.from('mining_sessions').delete().in('user_id', userIds);

      // 2. Update transactions to remove user references
      await client.from('transactions').update({ from_user_id: null }).in('from_user_id', userIds);
      await client.from('transactions').update({ to_user_id: null }).in('to_user_id', userIds);

      // 3. Update contact submissions and support tickets
      await client.from('contact_submissions').update({ assigned_to: null }).in('assigned_to', userIds);
      await client.from('support_tickets').update({ assigned_to: null }).in('assigned_to', userIds);

      // 4. Delete wallets
      await client.from('wallets').delete().in('user_id', userIds);

      // 5. Delete users
      const { error: deleteError } = await client.from('users').delete().in('id', userIds);
      if (deleteError) {
        throw new Error(`Error deleting users: ${deleteError.message}`);
      }

      return {
        message: `Successfully deleted ${users.length} users`,
        deletedCount: users.length,
        deletedUsers: users.map(user => ({
          id: user.id,
          email: user.email,
          role: user.role,
          name: `${user.first_name} ${user.last_name}`
        })),
        excludedAdmins: excludeAdmins
      };
    } catch (error) {
      throw new Error(`Failed to delete all users: ${error.message}`);
    }
  }

  /**
   * Get user deletion preview (what will be deleted)
   * @param {string} userId - User ID to preview deletion for
   * @returns {object} Preview of what will be deleted
   */
  async getUserDeletionPreview(userId) {
    try {
      const user = await this.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const wallet = await this.findWalletByUserId(userId);
      const miningSessions = await this.find('mining_sessions', { user_id: userId });
      const fromTransactions = await this.find('transactions', { from_user_id: userId });
      const toTransactions = await this.find('transactions', { to_user_id: userId });
      const assignedContacts = await this.find('contact_submissions', { assigned_to: userId });
      const assignedTickets = await this.find('support_tickets', { assigned_to: userId });

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          createdAt: user.created_at
        },
        relatedData: {
          wallet: wallet ? {
            id: wallet.id,
            totalBalance: wallet.total_balance,
            sendableBalance: wallet.sendable_balance
          } : null,
          miningSessions: {
            count: miningSessions.length,
            totalTokensEarned: miningSessions.reduce((sum, session) => sum + parseFloat(session.tokens_earned || 0), 0)
          },
          transactions: {
            sentCount: fromTransactions.length,
            receivedCount: toTransactions.length,
            totalCount: fromTransactions.length + toTransactions.length
          },
          assignments: {
            contactSubmissions: assignedContacts.length,
            supportTickets: assignedTickets.length
          }
        }
      };
    } catch (error) {
      throw new Error(`Failed to get deletion preview: ${error.message}`);
    }
  }

  /**
   * Wallet-specific operations
   */
  async findWalletByUserId(userId) {
    return this.findOne('wallets', { user_id: userId });
  }

  async createWallet(walletData) {
    return this.create('wallets', walletData);
  }

  async updateWalletBalance(userId, balanceUpdate) {
    const wallet = await this.findWalletByUserId(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const updatedData = {
      ...balanceUpdate,
      last_activity: new Date().toISOString()
    };

    return this.update('wallets', wallet.id, updatedData);
  }

  /**
   * Transaction-specific operations
   */
  async createTransaction(transactionData) {
    return this.create('transactions', transactionData);
  }

  async findTransactionsByUser(userId, options = {}) {
    const { data, error } = await this.getClient()
      .from('transactions')
      .select('*')
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .limit(options.limit || 50);

    if (error) {
      throw new Error(`Error finding transactions: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Mining session operations
   */
  async findMiningSessionsByUser(userId, options = {}) {
    return this.find('mining_sessions', { user_id: userId }, {
      orderBy: { column: 'created_at', ascending: false },
      ...options
    });
  }

  async findActiveMiningSession(userId) {
    return this.findOne('mining_sessions', { 
      user_id: userId, 
      status: 'active' 
    });
  }

  async createMiningSession(sessionData) {
    return this.create('mining_sessions', sessionData);
  }

  /**
   * Contact and support operations
   */
  async createContactSubmission(submissionData) {
    return this.create('contact_submissions', submissionData);
  }

  async createSupportTicket(ticketData) {
    return this.create('support_tickets', ticketData);
  }

  /**
   * Newsletter operations
   */
  async findNewsletterSubscription(email) {
    return this.findOne('newsletter_subscriptions', { email });
  }

  async createNewsletterSubscription(subscriptionData) {
    return this.create('newsletter_subscriptions', subscriptionData);
  }

  async updateNewsletterSubscription(email, updateData) {
    const subscription = await this.findNewsletterSubscription(email);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return this.update('newsletter_subscriptions', subscription.id, updateData);
  }

  /**
   * Mentorship operations
   */
  async createMentorshipApplication(applicationData) {
    return this.create('mentorship_applications', applicationData);
  }

  async findMentorshipApplicationsByEmail(email) {
    return this.find('mentorship_applications', { email });
  }

  /**
   * Scholarship operations
   */
  async createScholarshipApplication(applicationData) {
    return this.create('scholarship_applications', applicationData);
  }

  async findScholarshipApplicationsByEmail(email) {
    return this.find('scholarship_applications', { email });
  }

  /**
   * Batch operations
   */
  async batchInsert(table, dataArray) {
    const { data, error } = await this.getClient()
      .from(table)
      .insert(dataArray)
      .select();

    if (error) {
      throw new Error(`Error batch inserting into ${table}: ${error.message}`);
    }

    return data;
  }

  /**
   * Aggregation operations
   */
  async aggregate(table, aggregations, filters = {}) {
    // This would need custom RPC functions in Supabase for complex aggregations
    // For now, we'll implement basic counting
    return this.count(table, filters);
  }
}

// Create singleton instance
const supabaseService = new SupabaseService();

module.exports = supabaseService;
