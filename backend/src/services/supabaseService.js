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

  // ==========================================
  // ADMIN-SPECIFIC METHODS
  // ==========================================

  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    const client = this.getAdminClient();

    // Get user counts
    const { count: totalUsers } = await client
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: activeUsers } = await client
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // Get mining session counts
    const { count: activeMining } = await client
      .from('mining_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Get transaction counts for today
    const today = new Date().toISOString().split('T')[0];
    const { count: todayTransactions } = await client
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today);

    // Get total CELF mined
    const { data: totalMined } = await client
      .from('transactions')
      .select('amount')
      .eq('type', 'mining')
      .eq('status', 'completed');

    const totalCelfMined = totalMined?.reduce((sum, tx) => sum + parseFloat(tx.amount), 0) || 0;

    // Get pending applications
    const { count: pendingMentorship } = await client
      .from('mentorship_applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: pendingScholarship } = await client
      .from('scholarship_applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: pendingContact } = await client
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    return {
      users: {
        total: totalUsers || 0,
        active: activeUsers || 0,
        inactive: (totalUsers || 0) - (activeUsers || 0)
      },
      mining: {
        activeSessions: activeMining || 0,
        totalCelfMined: totalCelfMined
      },
      transactions: {
        today: todayTransactions || 0
      },
      applications: {
        pendingMentorship: pendingMentorship || 0,
        pendingScholarship: pendingScholarship || 0,
        pendingContact: pendingContact || 0
      }
    };
  }

  /**
   * Get recent activity
   */
  async getRecentActivity(limit = 10) {
    const client = this.getAdminClient();

    // Get recent user registrations
    const { data: recentUsers } = await client
      .from('users')
      .select('id, first_name, last_name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    // Get recent transactions
    const { data: recentTransactions } = await client
      .from('transactions')
      .select('id, type, amount, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    // Get recent mining sessions
    const { data: recentMining } = await client
      .from('mining_sessions')
      .select('id, user_id, status, tokens_earned, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    // Combine and sort all activities
    const activities = [
      ...(recentUsers?.map(user => ({
        type: 'user_registration',
        id: user.id,
        description: `New user registered: ${user.first_name} ${user.last_name}`,
        timestamp: user.created_at
      })) || []),
      ...(recentTransactions?.map(tx => ({
        type: 'transaction',
        id: tx.id,
        description: `${tx.type} transaction: ${tx.amount} CELF (${tx.status})`,
        timestamp: tx.created_at
      })) || []),
      ...(recentMining?.map(session => ({
        type: 'mining_session',
        id: session.id,
        description: `Mining session ${session.status}: ${session.tokens_earned} CELF earned`,
        timestamp: session.created_at
      })) || [])
    ];

    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  /**
   * Get user analytics
   */
  async getUserAnalytics(period = '30d') {
    const client = this.getAdminClient();

    // Calculate date range
    const days = parseInt(period.replace('d', ''));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get user registrations over time
    const { data: registrations } = await client
      .from('users')
      .select('created_at')
      .gte('created_at', startDate.toISOString());

    // Group by date
    const registrationsByDate = {};
    registrations?.forEach(user => {
      const date = user.created_at.split('T')[0];
      registrationsByDate[date] = (registrationsByDate[date] || 0) + 1;
    });

    // Get user roles distribution
    const { data: roleDistribution } = await client
      .from('users')
      .select('role');

    const roles = {};
    roleDistribution?.forEach(user => {
      roles[user.role] = (roles[user.role] || 0) + 1;
    });

    return {
      registrationsByDate,
      roleDistribution: roles,
      totalUsers: registrations?.length || 0
    };
  }

  /**
   * Get mining analytics
   */
  async getMiningAnalytics(period = '30d') {
    const client = this.getAdminClient();

    const days = parseInt(period.replace('d', ''));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get mining sessions
    const { data: sessions } = await client
      .from('mining_sessions')
      .select('*')
      .gte('created_at', startDate.toISOString());

    // Get mining transactions
    const { data: miningTransactions } = await client
      .from('transactions')
      .select('amount, created_at')
      .eq('type', 'mining')
      .eq('status', 'completed')
      .gte('created_at', startDate.toISOString());

    // Calculate metrics
    const totalSessions = sessions?.length || 0;
    const activeSessions = sessions?.filter(s => s.status === 'active').length || 0;
    const completedSessions = sessions?.filter(s => s.status === 'completed').length || 0;
    const totalTokensMined = miningTransactions?.reduce((sum, tx) => sum + parseFloat(tx.amount), 0) || 0;

    // Group mining by date
    const miningByDate = {};
    miningTransactions?.forEach(tx => {
      const date = tx.created_at.split('T')[0];
      miningByDate[date] = (miningByDate[date] || 0) + parseFloat(tx.amount);
    });

    return {
      totalSessions,
      activeSessions,
      completedSessions,
      totalTokensMined,
      miningByDate,
      averageTokensPerSession: totalSessions > 0 ? totalTokensMined / totalSessions : 0
    };
  }

  /**
   * Get transaction analytics
   */
  async getTransactionAnalytics(period = '30d') {
    const client = this.getAdminClient();

    const days = parseInt(period.replace('d', ''));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: transactions } = await client
      .from('transactions')
      .select('*')
      .gte('created_at', startDate.toISOString());

    // Calculate metrics
    const totalTransactions = transactions?.length || 0;
    const completedTransactions = transactions?.filter(tx => tx.status === 'completed').length || 0;
    const pendingTransactions = transactions?.filter(tx => tx.status === 'pending').length || 0;
    const failedTransactions = transactions?.filter(tx => tx.status === 'failed').length || 0;

    // Group by type
    const transactionsByType = {};
    transactions?.forEach(tx => {
      transactionsByType[tx.type] = (transactionsByType[tx.type] || 0) + 1;
    });

    // Group by date
    const transactionsByDate = {};
    transactions?.forEach(tx => {
      const date = tx.created_at.split('T')[0];
      transactionsByDate[date] = (transactionsByDate[date] || 0) + 1;
    });

    // Calculate total volume
    const totalVolume = transactions?.reduce((sum, tx) => sum + parseFloat(tx.amount), 0) || 0;

    return {
      totalTransactions,
      completedTransactions,
      pendingTransactions,
      failedTransactions,
      transactionsByType,
      transactionsByDate,
      totalVolume,
      successRate: totalTransactions > 0 ? (completedTransactions / totalTransactions) * 100 : 0
    };
  }

  // ==========================================
  // USER MANAGEMENT METHODS
  // ==========================================

  /**
   * Get all users with admin privileges
   */
  async getAllUsersAdmin({ page = 1, limit = 20, search, role, status }) {
    const client = this.getAdminClient();

    let query = client
      .from('users')
      .select(`
        id, email, first_name, last_name, role, is_active,
        last_login, created_at, updated_at
      `, { count: 'exact' });

    // Apply filters
    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (role) {
      query = query.eq('role', role);
    }

    if (status !== undefined) {
      query = query.eq('is_active', status === 'active');
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    // Order by creation date
    query = query.order('created_at', { ascending: false });

    const { data: users, error, count } = await query;

    if (error) {
      console.error('Error fetching users:', error);
      // Return empty results on error to allow admin to work
      return {
        users: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0
        }
      };
    }

    return {
      users: users || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    };
  }

  /**
   * Get user by ID with admin details
   */
  async getUserByIdAdmin(userId) {
    const client = this.getAdminClient();

    const { data: user, error } = await client
      .from('users')
      .select(`
        *,
        wallets(*),
        mining_sessions(count),
        transactions(count)
      `)
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching user: ${error.message}`);
    }

    return user;
  }

  /**
   * Update user with admin privileges
   */
  async updateUserAdmin(userId, updateData) {
    const client = this.getAdminClient();

    // Prepare update data
    const allowedFields = ['first_name', 'last_name', 'email', 'role', 'is_active'];
    const filteredData = {};

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key];
      }
    });

    filteredData.updated_at = new Date().toISOString();

    const { data: user, error } = await client
      .from('users')
      .update(filteredData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error updating user: ${error.message}`);
    }

    return user;
  }

  /**
   * Suspend user
   */
  async suspendUser(userId, reason) {
    const client = this.getAdminClient();

    const { data: user, error } = await client
      .from('users')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error suspending user: ${error.message}`);
    }

    // TODO: Add audit log entry
    return user;
  }

  /**
   * Activate user
   */
  async activateUser(userId) {
    const client = this.getAdminClient();

    const { data: user, error } = await client
      .from('users')
      .update({
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error activating user: ${error.message}`);
    }

    return user;
  }

  /**
   * Delete user (admin only)
   */
  async deleteUserAdmin(userId) {
    const client = this.getAdminClient();

    const { data: user, error } = await client
      .from('users')
      .delete()
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error deleting user: ${error.message}`);
    }

    return user;
  }

  // ==========================================
  // MINING MANAGEMENT METHODS
  // ==========================================

  /**
   * Get mining sessions with admin privileges
   */
  async getMiningSessions({ page = 1, limit = 20, status, userId }) {
    const client = this.getAdminClient();

    let query = client
      .from('mining_sessions')
      .select('*', { count: 'exact' });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    if (userId) {
      query = query.eq('user_id', userId);
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    // Order by creation date
    query = query.order('created_at', { ascending: false });

    const { data: sessions, error, count } = await query;

    if (error) {
      console.error('Error fetching mining sessions:', error);
      // Return empty sessions on error to allow admin to work
      return {
        sessions: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0
        }
      };
    }

    return {
      sessions: sessions || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    };
  }

  /**
   * Get mining settings
   */
  async getMiningSettings() {
    const client = this.getAdminClient();

    try {
      const { data: settings, error } = await client
        .from('admin_settings')
        .select('setting_key, setting_value')
        .eq('category', 'mining')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching mining settings:', error);
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          throw new Error('Admin settings table does not exist. Please run the SQL migration: 013_admin_settings.sql');
        }
        throw new Error(`Error fetching mining settings: ${error.message}`);
      }

      if (!settings || settings.length === 0) {
        throw new Error('No mining settings found in database. Please run the SQL migration: 013_admin_settings.sql to populate default settings.');
      }

      // Convert array of settings to object
      const settingsObj = {};
      settings?.forEach(setting => {
        const key = setting.setting_key.replace('mining_', '');
        let value = setting.setting_value;

        // Parse JSON values
        if (typeof value === 'string') {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // Keep as string if not valid JSON
          }
        }

        // Map database keys to expected frontend keys
        switch (key) {
          case 'default_rate':
            settingsObj.defaultMiningRate = parseFloat(value);
            break;
          case 'max_session_time':
            settingsObj.maxSessionTime = parseInt(value);
            break;
          case 'speed_multiplier':
            settingsObj.miningSpeed = parseFloat(value);
            break;
          case 'reward_multiplier':
            settingsObj.rewardMultiplier = parseFloat(value);
            break;
          case 'maintenance_mode':
            settingsObj.maintenanceMode = value === true || value === 'true';
            break;
          case 'min_tokens':
            settingsObj.minTokensToMine = parseFloat(value);
            break;
          case 'max_tokens_per_session':
            settingsObj.maxTokensPerSession = parseInt(value);
            break;
          case 'cooldown_period':
            settingsObj.cooldownPeriod = parseInt(value);
            break;
          case 'daily_limit':
            settingsObj.dailyLimit = parseInt(value);
            break;
          case 'referral_bonus':
            settingsObj.referralBonus = parseFloat(value);
            break;
          case 'auto_claim':
            settingsObj.autoClaim = value === true || value === 'true';
            break;
          case 'notification_enabled':
            settingsObj.notificationEnabled = value === true || value === 'true';
            break;
        }
      });

      // Return only database values, no defaults
      return {
        defaultMiningRate: settingsObj.defaultMiningRate,
        maxSessionTime: settingsObj.maxSessionTime,
        miningSpeed: settingsObj.miningSpeed,
        rewardMultiplier: settingsObj.rewardMultiplier,
        maintenanceMode: settingsObj.maintenanceMode,
        minTokensToMine: settingsObj.minTokensToMine,
        maxTokensPerSession: settingsObj.maxTokensPerSession,
        cooldownPeriod: settingsObj.cooldownPeriod,
        dailyLimit: settingsObj.dailyLimit,
        referralBonus: settingsObj.referralBonus,
        autoClaim: settingsObj.autoClaim,
        notificationEnabled: settingsObj.notificationEnabled
      };
    } catch (error) {
      console.error('Error in getMiningSettings:', error);
      throw error; // Don't return defaults, let the error propagate
    }
  }

  /**
   * Update mining settings
   */
  async updateMiningSettings(settings) {
    const client = this.getAdminClient();

    try {
      // Map frontend keys to database keys
      const settingsToUpdate = [];

      if (settings.defaultMiningRate !== undefined) {
        settingsToUpdate.push({
          setting_key: 'mining_default_rate',
          setting_value: settings.defaultMiningRate.toString()
        });
      }

      if (settings.maxSessionTime !== undefined) {
        settingsToUpdate.push({
          setting_key: 'mining_max_session_time',
          setting_value: settings.maxSessionTime.toString()
        });
      }

      if (settings.miningSpeed !== undefined) {
        settingsToUpdate.push({
          setting_key: 'mining_speed_multiplier',
          setting_value: settings.miningSpeed.toString()
        });
      }

      if (settings.rewardMultiplier !== undefined) {
        settingsToUpdate.push({
          setting_key: 'mining_reward_multiplier',
          setting_value: settings.rewardMultiplier.toString()
        });
      }

      if (settings.maintenanceMode !== undefined) {
        settingsToUpdate.push({
          setting_key: 'mining_maintenance_mode',
          setting_value: settings.maintenanceMode.toString()
        });
      }

      if (settings.minTokensToMine !== undefined) {
        settingsToUpdate.push({
          setting_key: 'mining_min_tokens',
          setting_value: settings.minTokensToMine.toString()
        });
      }

      if (settings.maxTokensPerSession !== undefined) {
        settingsToUpdate.push({
          setting_key: 'mining_max_tokens_per_session',
          setting_value: settings.maxTokensPerSession.toString()
        });
      }

      // Update each setting
      for (const setting of settingsToUpdate) {
        const { error } = await client
          .from('admin_settings')
          .update({
            setting_value: setting.setting_value,
            updated_at: new Date().toISOString()
          })
          .eq('setting_key', setting.setting_key);

        if (error) {
          console.error(`Error updating setting ${setting.setting_key}:`, error);
          throw new Error(`Error updating setting ${setting.setting_key}: ${error.message}`);
        }
      }

      // Return updated settings
      return await this.getMiningSettings();
    } catch (error) {
      console.error('Error in updateMiningSettings:', error);
      throw error;
    }
  }

  /**
   * Terminate mining session
   */
  async terminateMiningSession(sessionId) {
    const client = this.getAdminClient();

    const { data: session, error } = await client
      .from('mining_sessions')
      .update({
        status: 'cancelled',
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error terminating mining session: ${error.message}`);
    }

    return session;
  }

  /**
   * Pause mining session
   */
  async pauseMiningSession(sessionId) {
    const client = this.getAdminClient();

    const { data: session, error } = await client
      .from('mining_sessions')
      .update({
        status: 'paused',
        paused_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error pausing mining session: ${error.message}`);
    }

    return session;
  }

  /**
   * Resume mining session
   */
  async resumeMiningSession(sessionId) {
    const client = this.getAdminClient();

    const { data: session, error } = await client
      .from('mining_sessions')
      .update({
        status: 'active',
        paused_at: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error resuming mining session: ${error.message}`);
    }

    return session;
  }

  // ==========================================
  // CONTENT MANAGEMENT METHODS
  // ==========================================

  /**
   * Get contact submissions
   */
  async getContactSubmissions({ page = 1, limit = 20, status }) {
    const client = this.getAdminClient();

    let query = client
      .from('contact_submissions')
      .select('*');

    if (status) {
      query = query.eq('status', status);
    }

    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);
    query = query.order('created_at', { ascending: false });

    const { data: submissions, error, count } = await query;

    if (error) {
      throw new Error(`Error fetching contact submissions: ${error.message}`);
    }

    return {
      submissions: submissions || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    };
  }

  /**
   * Get contact submission by ID
   */
  async getContactSubmissionById(submissionId) {
    const client = this.getAdminClient();

    const { data: submission, error } = await client
      .from('contact_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error fetching contact submission: ${error.message}`);
    }

    return submission;
  }

  /**
   * Update contact submission status
   */
  async updateContactSubmissionStatus(submissionId, status) {
    const client = this.getAdminClient();

    const { data: submission, error } = await client
      .from('contact_submissions')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error updating contact submission status: ${error.message}`);
    }

    return submission;
  }

  /**
   * Delete contact submission
   */
  async deleteContactSubmission(submissionId) {
    const client = this.getAdminClient();

    const { data: submission, error } = await client
      .from('contact_submissions')
      .delete()
      .eq('id', submissionId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error deleting contact submission: ${error.message}`);
    }

    return submission;
  }

  // Newsletter management methods
  async getNewsletterSubscriptions({ page = 1, limit = 20, status }) {
    const client = this.getAdminClient();

    try {
      let query = client
        .from('newsletter_subscriptions')
        .select('*', { count: 'exact' });

      // Apply filters
      if (status) {
        query = query.eq('status', status);
      }

      // Apply pagination
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      // Order by creation date
      query = query.order('created_at', { ascending: false });

      const { data: subscriptions, error, count } = await query;

      if (error) {
        console.error('Error fetching newsletter subscriptions:', error);
        // Return empty results on error
        return {
          subscriptions: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0
          }
        };
      }

      return {
        subscriptions: subscriptions || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error) {
      console.error('Error in getNewsletterSubscriptions:', error);
      return {
        subscriptions: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0
        }
      };
    }
  }

  async deleteNewsletterSubscription(id) {
    const client = this.getAdminClient();

    try {
      const { error } = await client
        .from('newsletter_subscriptions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting newsletter subscription:', error);
        throw new Error(`Error deleting newsletter subscription: ${error.message}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error in deleteNewsletterSubscription:', error);
      throw error;
    }
  }

  // Mentorship application methods
  async getMentorshipApplications({ page = 1, limit = 20, status, type }) {
    const client = this.getAdminClient();

    try {
      let query = client
        .from('mentorship_applications')
        .select('*', { count: 'exact' });

      // Apply filters
      if (status) {
        query = query.eq('status', status);
      }
      if (type) {
        query = query.eq('type', type);
      }

      // Apply pagination
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      // Order by creation date
      query = query.order('created_at', { ascending: false });

      const { data: applications, error, count } = await query;

      if (error) {
        console.error('Error fetching mentorship applications:', error);
        return {
          applications: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }

      return {
        applications: applications || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error) {
      console.error('Error in getMentorshipApplications:', error);
      return {
        applications: [],
        pagination: { page, limit, total: 0, totalPages: 0 }
      };
    }
  }

  async getMentorshipApplicationById(id) {
    return this.findById('mentorship_applications', id);
  }

  async updateMentorshipApplicationStatus(id, status) {
    return this.update('mentorship_applications', id, { status });
  }

  // Scholarship application methods
  async getScholarshipApplications({ page = 1, limit = 20, status }) {
    const client = this.getAdminClient();

    try {
      let query = client
        .from('scholarship_applications')
        .select('*', { count: 'exact' });

      // Apply filters
      if (status) {
        query = query.eq('status', status);
      }

      // Apply pagination
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      // Order by creation date
      query = query.order('created_at', { ascending: false });

      const { data: applications, error, count } = await query;

      if (error) {
        console.error('Error fetching scholarship applications:', error);
        return {
          applications: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }

      return {
        applications: applications || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error) {
      console.error('Error in getScholarshipApplications:', error);
      return {
        applications: [],
        pagination: { page, limit, total: 0, totalPages: 0 }
      };
    }
  }

  async getScholarshipApplicationById(id) {
    return this.findById('scholarship_applications', id);
  }

  async updateScholarshipApplicationStatus(id, status) {
    return this.update('scholarship_applications', id, { status });
  }

  // System settings methods
  async getSystemSettings() {
    return {
      siteName: 'CELF Platform',
      maintenanceMode: false,
      registrationEnabled: true,
      miningEnabled: true,
      maxUsersPerDay: 1000,
      emailNotifications: true
    };
  }

  async updateSystemSettings(settings) {
    return {
      ...await this.getSystemSettings(),
      ...settings,
      updatedAt: new Date().toISOString()
    };
  }

  // Security methods (placeholder)
  async getAuditLogs({ page = 1, limit = 20 }) {
    return { logs: [], pagination: { page, limit, total: 0, totalPages: 0 } };
  }

  async getLoginAttempts({ page = 1, limit = 20 }) {
    return { attempts: [], pagination: { page, limit, total: 0, totalPages: 0 } };
  }

  async getSuspiciousActivities({ page = 1, limit = 20 }) {
    return { activities: [], pagination: { page, limit, total: 0, totalPages: 0 } };
  }

  // Helper methods for backward compatibility
  async findById(table, id) {
    const client = this.getAdminClient();
    try {
      const { data, error } = await client
        .from(table)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(`Error finding ${table} by id:`, error);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Error in findById for ${table}:`, error);
      return null;
    }
  }

  async update(table, id, updateData) {
    const client = this.getAdminClient();
    try {
      const { data, error } = await client
        .from(table)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating ${table}:`, error);
        throw new Error(`Error updating ${table}: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error(`Error in update for ${table}:`, error);
      throw error;
    }
  }

  async create(table, createData) {
    const client = this.getAdminClient();
    try {
      const { data, error } = await client
        .from(table)
        .insert(createData)
        .select()
        .single();

      if (error) {
        console.error(`Error creating ${table}:`, error);
        throw new Error(`Error creating ${table}: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error(`Error in create for ${table}:`, error);
      throw error;
    }
  }
}

// Create singleton instance
const supabaseService = new SupabaseService();

module.exports = supabaseService;
