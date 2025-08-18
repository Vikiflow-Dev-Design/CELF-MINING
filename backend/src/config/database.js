const { createClient } = require('@supabase/supabase-js');
const config = require('./config');

class Database {
  constructor() {
    this.supabase = null;
    this.adminSupabase = null;
  }

  /**
   * Initialize Supabase clients
   */
  async connect() {
    try {
      const { url, anonKey, serviceRoleKey } = config.supabase;

      if (!url || !anonKey || !serviceRoleKey) {
        throw new Error('Missing Supabase configuration. Please check your environment variables.');
      }

      // Create client for general operations (with anon key)
      this.supabase = createClient(url, anonKey);

      // Create admin client for privileged operations (with service role key)
      this.adminSupabase = createClient(url, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });

      console.log(`🗄️  Connected to Supabase: ${url}`);

      // Test the connection
      await this.testConnection();

      return this.supabase;
    } catch (error) {
      console.error('❌ Supabase connection error:', error);
      process.exit(1);
    }
  }

  /**
   * Test Supabase connection
   */
  async testConnection() {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('count')
        .limit(1);

      if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist, which is fine
        throw error;
      }

      console.log('✅ Supabase connection test successful');
    } catch (error) {
      console.warn('⚠️  Supabase connection test failed (this is normal if tables don\'t exist yet):', error.message);
    }
  }

  /**
   * Disconnect from Supabase (cleanup)
   */
  async disconnect() {
    try {
      // Supabase doesn't require explicit disconnection like MongoDB
      // Just clear the references
      this.supabase = null;
      this.adminSupabase = null;
      console.log('🗄️  Disconnected from Supabase');
    } catch (error) {
      console.error('❌ Supabase disconnection error:', error);
    }
  }

  /**
   * Get Supabase client (for general operations)
   */
  getClient() {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized. Call connect() first.');
    }
    return this.supabase;
  }

  /**
   * Get Supabase admin client (for privileged operations)
   */
  getAdminClient() {
    if (!this.adminSupabase) {
      throw new Error('Supabase admin client not initialized. Call connect() first.');
    }
    return this.adminSupabase;
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    return {
      state: this.supabase ? 'connected' : 'disconnected',
      url: config.supabase.url,
      hasAdminClient: !!this.adminSupabase
    };
  }

  /**
   * Setup process event handlers for graceful shutdown
   */
  setupEventHandlers() {
    // Application termination
    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  /**
   * Health check for Supabase connection
   */
  async healthCheck() {
    try {
      const status = this.getConnectionStatus();

      if (status.state !== 'connected') {
        throw new Error(`Supabase not connected. Current state: ${status.state}`);
      }

      // Perform a simple query to test connection
      const { error } = await this.supabase
        .from('users')
        .select('count')
        .limit(1);

      if (error && error.code !== 'PGRST116') { // Table doesn't exist is OK
        throw error;
      }

      return {
        status: 'healthy',
        connection: status,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        connection: this.getConnectionStatus(),
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get database statistics (Supabase doesn't provide detailed stats like MongoDB)
   */
  async getStats() {
    try {
      // For Supabase, we can get basic table information
      const { data: tables, error } = await this.adminSupabase
        .rpc('get_table_stats'); // This would need to be a custom function in Supabase

      if (error) {
        console.warn('Could not get Supabase stats:', error.message);
        return {
          message: 'Supabase stats not available',
          timestamp: new Date().toISOString()
        };
      }

      return {
        tables: tables || [],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting Supabase stats:', error);
      return {
        message: 'Supabase stats not available',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Create singleton instance
const database = new Database();

module.exports = database;
