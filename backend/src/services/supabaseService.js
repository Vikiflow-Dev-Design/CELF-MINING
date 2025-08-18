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
