// Debug Supabase connection
require('dotenv').config();
const config = require('./src/config/config');
const database = require('./src/config/database');

async function debugSupabase() {
  console.log('🔍 Debugging Supabase Configuration\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('  NODE_ENV:', process.env.NODE_ENV);
  console.log('  SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET' : 'MISSING');
  console.log('  SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'SET' : 'MISSING');
  console.log('  SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING');

  // Check config values
  console.log('\n📋 Config Values:');
  console.log('  URL:', config.supabase.url || 'EMPTY');
  console.log('  Anon Key:', config.supabase.anonKey ? 'SET' : 'EMPTY');
  console.log('  Service Role Key:', config.supabase.serviceRoleKey ? 'SET' : 'EMPTY');

  // Test connection
  console.log('\n🔌 Testing Connection...');
  try {
    await database.connect();
    console.log('✅ Database connection successful');

    // Test health check
    console.log('\n🏥 Testing Health Check...');
    const health = await database.healthCheck();
    console.log('Health Status:', JSON.stringify(health, null, 2));

    // Test a simple query
    console.log('\n📊 Testing Simple Query...');
    const client = database.getClient();
    const { data, error } = await client
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      console.log('Query Error:', error);
    } else {
      console.log('✅ Query successful');
    }

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
  }
}

debugSupabase();
