# Migration Execution Order

Run these files in Supabase SQL Editor in the exact order listed below:

## ✅ Step-by-Step Migration Guide

### 1. **Extensions** (Required First)
```sql
-- File: migrations/001_extensions.sql
-- Creates UUID extension and other PostgreSQL extensions
```

### 2. **Users Table** (Core Dependency)
```sql
-- File: migrations/002_users.sql
-- Creates users table - required by most other tables
```

### 3. **Mobile App Tables**
```sql
-- File: migrations/003_wallets.sql
-- Creates wallets table (depends on users)

-- File: migrations/004_transactions.sql
-- Creates transactions table (depends on users)

-- File: migrations/005_mining_sessions.sql
-- Creates mining_sessions table (depends on users)
```

### 4. **Website Contact & Support**
```sql
-- File: migrations/006_contact_support.sql
-- Creates contact_submissions and support_tickets tables
```

### 5. **Website Newsletter**
```sql
-- File: migrations/007_newsletter.sql
-- Creates newsletter_subscriptions and newsletter_campaigns tables
```

### 6. **Website Mentorship**
```sql
-- File: migrations/008_mentorship.sql
-- Creates mentorship_applications, mentorship_connections, mentorship_sessions tables
```

### 7. **Website Scholarship**
```sql
-- File: migrations/009_scholarship.sql
-- Creates scholarship_applications, scholarship_awards, scholarship_disbursements tables
```

### 8. **Database Functions & Triggers** (Required Last)
```sql
-- File: migrations/010_triggers.sql
-- Creates updated_at triggers for all tables
```

## 🚀 Quick Commands

### Copy-Paste Order for Supabase SQL Editor:

1. Copy content from `migrations/001_extensions.sql` → Run
2. Copy content from `migrations/002_users.sql` → Run  
3. Copy content from `migrations/003_wallets.sql` → Run
4. Copy content from `migrations/004_transactions.sql` → Run
5. Copy content from `migrations/005_mining_sessions.sql` → Run
6. Copy content from `migrations/006_contact_support.sql` → Run
7. Copy content from `migrations/007_newsletter.sql` → Run
8. Copy content from `migrations/008_mentorship.sql` → Run
9. Copy content from `migrations/009_scholarship.sql` → Run
10. Copy content from `migrations/010_triggers.sql` → Run

## ⚠️ Important Notes

- **Never skip steps** - each migration depends on previous ones
- **Run in exact order** - foreign key constraints require proper sequence
- **Check for errors** - if one migration fails, fix it before continuing
- **One at a time** - don't run multiple migrations simultaneously

## ✅ Verification

After completing all migrations, run this to verify:

```sql
-- Check all tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Should return:
-- contact_submissions
-- mentorship_applications  
-- mentorship_connections
-- mentorship_sessions
-- mining_sessions
-- newsletter_campaigns
-- newsletter_subscriptions
-- scholarship_applications
-- scholarship_awards
-- scholarship_disbursements
-- support_tickets
-- transactions
-- users
-- wallets
```

If you see all 14 tables, your migration was successful! 🎉
