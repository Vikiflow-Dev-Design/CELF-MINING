# Supabase Setup Guide for CELF Backend

This guide will help you set up Supabase as the database for the CELF backend API.

## 🚀 Quick Start

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `celf-backend` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users
6. Click "Create new project"

### 2. Get Your Supabase Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-ref.supabase.co`)
   - **anon public** key
   - **service_role secret** key

### 3. Update Environment Variables

Update your `.env` file with the Supabase credentials:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Run Database Schema

You have two options for setting up the database schema:

#### **Option A: Run All Migrations at Once (Recommended)**
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the entire content from `backend/supabase/run_all_migrations.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute all migrations

#### **Option B: Run Individual Migration Files**
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Follow the step-by-step guide in `backend/supabase/migration_order.md`
4. Run each migration file in order (001 through 010)

This will create all the necessary tables, indexes, and triggers for the CELF backend.

**Note**: The old `schema.sql` file is deprecated. Use the new migration files for better organization and maintainability.

## 📊 Database Schema Overview

The schema includes the following main tables:

### Core Tables
- **users** - User accounts (supports both Clerk and local auth)
- **wallets** - User wallets with sendable/non-sendable balances
- **transactions** - All transaction history
- **mining_sessions** - Mining session tracking

### Website Tables
- **contact_submissions** - Contact form submissions
- **support_tickets** - Support ticket system
- **newsletter_subscriptions** - Newsletter management
- **newsletter_campaigns** - Newsletter campaigns

### Program Tables
- **mentorship_applications** - Mentorship program applications
- **mentorship_connections** - Mentor-mentee connections
- **mentorship_sessions** - Mentorship session scheduling
- **scholarship_applications** - Scholarship applications
- **scholarship_awards** - Scholarship awards
- **scholarship_disbursements** - Scholarship disbursements

## 🔧 Configuration

### Row Level Security (RLS)

For production, you should enable Row Level Security on sensitive tables:

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid()::text = clerk_user_id);

-- Enable RLS on wallets table
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

-- Create policy for wallets
CREATE POLICY "Users can view own wallet" ON wallets
    FOR SELECT USING (user_id IN (
        SELECT id FROM users WHERE clerk_user_id = auth.uid()::text
    ));
```

### Realtime Subscriptions

Enable realtime for tables that need live updates:

```sql
-- Enable realtime for mining sessions (for live mining progress)
ALTER PUBLICATION supabase_realtime ADD TABLE mining_sessions;

-- Enable realtime for transactions (for live transaction updates)
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
```

## 🔐 Security Best Practices

### 1. Environment Variables
- Never commit your service role key to version control
- Use different projects for development and production
- Rotate keys regularly

### 2. Database Policies
- Implement Row Level Security for all user-facing tables
- Use the service role key only for admin operations
- Validate all inputs on both client and server side

### 3. API Security
- Use the anon key for general operations
- Use the service role key only for privileged operations
- Implement proper authentication middleware

## 🧪 Testing the Setup

After setting up Supabase, test the connection:

```bash
# Start the backend server
npm run dev

# Check the health endpoint
curl http://localhost:5000/health
```

You should see a response indicating that Supabase is connected.

## 📝 Common Issues

### Connection Errors
- **Issue**: "Missing Supabase configuration"
- **Solution**: Ensure all environment variables are set correctly

### Schema Errors
- **Issue**: "relation does not exist"
- **Solution**: Make sure you've run the complete schema.sql file

### Permission Errors
- **Issue**: "insufficient_privilege"
- **Solution**: Check that you're using the service role key for admin operations

## 🔄 Migration from MongoDB

If you're migrating from MongoDB:

1. Export your existing data from MongoDB
2. Transform the data to match the new schema
3. Import the data using Supabase's bulk insert features
4. Update your application code to use the new Supabase service

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Support

If you encounter issues:

1. Check the Supabase dashboard logs
2. Review the backend server logs
3. Verify your environment variables
4. Check the database schema in Supabase

For additional help, refer to the main README.md or create an issue in the repository.
