# CELF Backend Database Migrations

This directory contains the database schema split into organized migration files for better maintainability.

## 📁 File Structure

```
supabase/
├── migrations/
│   ├── 001_extensions.sql          # Database extensions
│   ├── 002_users.sql              # Users table
│   ├── 003_wallets.sql            # Wallets table (mobile app)
│   ├── 004_transactions.sql       # Transactions table (mobile app)
│   ├── 005_mining_sessions.sql    # Mining sessions (mobile app)
│   ├── 006_contact_support.sql    # Contact forms & support tickets (website)
│   ├── 007_newsletter.sql         # Newsletter system (website)
│   ├── 008_mentorship.sql         # Mentorship program (website)
│   ├── 009_scholarship.sql        # Scholarship program (website)
│   └── 010_triggers.sql           # Database triggers and functions
├── run_all_migrations.sql         # Master file to run all migrations
├── schema.sql                     # Original monolithic schema (deprecated)
└── README.md                      # This file
```

## 🚀 Quick Setup

### Option 1: Run All Migrations at Once
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the content from `run_all_migrations.sql`
4. Click **Run**

### Option 2: Run Individual Migration Files
Run each migration file in order (001 through 010):

1. **Extensions** (`001_extensions.sql`)
   ```sql
   -- Copy and paste content from 001_extensions.sql
   ```

2. **Users** (`002_users.sql`)
   ```sql
   -- Copy and paste content from 002_users.sql
   ```

3. **Continue with remaining files in order...**

## 📋 Migration Details

### **001_extensions.sql**
- Enables UUID extension
- Sets up other useful PostgreSQL extensions

### **002_users.sql**
- Core users table (simplified, no authentication)
- User roles and preferences
- Basic indexes

### **003_wallets.sql**
- Wallet management for mobile app
- Sendable/non-sendable balance structure
- Address management

### **004_transactions.sql**
- All transaction types (send, receive, mining, etc.)
- Transaction history and status tracking
- Comprehensive indexing

### **005_mining_sessions.sql**
- Mining session tracking for mobile app
- Progress monitoring and statistics
- Achievement and milestone tracking

### **006_contact_support.sql**
- Contact form submissions (website)
- Support ticket system (website)
- Admin assignment and response tracking

### **007_newsletter.sql**
- Newsletter subscription management (website)
- Campaign creation and tracking (website)
- Analytics and statistics

### **008_mentorship.sql**
- Mentor/mentee applications (website)
- Connection matching and management
- Session scheduling and tracking

### **009_scholarship.sql**
- Scholarship applications (website)
- Award management and tracking
- Disbursement scheduling and processing

### **010_triggers.sql**
- Automatic `updated_at` timestamp triggers
- Database functions and utilities

## 🔧 Development Workflow

### **Adding New Tables**
1. Create a new migration file: `011_new_feature.sql`
2. Add the table schema with proper indexes
3. Update `run_all_migrations.sql` to include the new file
4. Test the migration in development

### **Modifying Existing Tables**
1. Create a new migration file: `012_modify_table.sql`
2. Use `ALTER TABLE` statements for modifications
3. Add the migration to the master file
4. Never modify existing migration files

### **Example New Migration**
```sql
-- 011_new_feature.sql
CREATE TABLE new_feature (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_new_feature_name ON new_feature(name);

CREATE TRIGGER update_new_feature_updated_at 
    BEFORE UPDATE ON new_feature 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 📊 Database Schema Overview

### **Mobile App Tables**
- `users` - User accounts
- `wallets` - Wallet management
- `transactions` - Transaction history
- `mining_sessions` - Mining tracking

### **Website Tables**
- `contact_submissions` - Contact forms
- `support_tickets` - Support system
- `newsletter_subscriptions` - Newsletter management
- `newsletter_campaigns` - Campaign tracking
- `mentorship_applications` - Mentorship program
- `mentorship_connections` - Mentor-mentee matching
- `mentorship_sessions` - Session scheduling
- `scholarship_applications` - Scholarship program
- `scholarship_awards` - Award management
- `scholarship_disbursements` - Payment tracking

## 🔍 Verification

After running migrations, verify the setup:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check triggers are created
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- Check indexes
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
```

## 🚨 Important Notes

### **Migration Order**
- Always run migrations in numerical order (001, 002, 003, etc.)
- Dependencies between tables require specific ordering
- Foreign key constraints depend on referenced tables existing first

### **Production Considerations**
- Test all migrations in development first
- Consider downtime for large table modifications
- Backup database before running migrations in production
- Use transactions for complex migrations

### **File Management**
- Never modify existing migration files once they're applied
- Create new migration files for schema changes
- Keep migration files small and focused
- Document complex migrations with comments

## 🆘 Troubleshooting

### **Common Issues**

1. **Extension not found**
   ```
   ERROR: extension "uuid-ossp" does not exist
   ```
   **Solution**: Run `001_extensions.sql` first

2. **Table does not exist**
   ```
   ERROR: relation "users" does not exist
   ```
   **Solution**: Ensure migrations run in correct order

3. **Foreign key constraint fails**
   ```
   ERROR: insert or update on table violates foreign key constraint
   ```
   **Solution**: Check that referenced tables exist and have proper data

### **Reset Database**
If you need to start over:
```sql
-- Drop all tables (be careful!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Then re-run all migrations
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Database Migration Best Practices](https://www.postgresql.org/docs/current/ddl-alter.html)
