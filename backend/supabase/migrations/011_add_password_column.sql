-- Add password column to existing users table
-- Run this if you already have a users table without the password column

-- Check if password column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'password'
    ) THEN
        ALTER TABLE users ADD COLUMN password VARCHAR(255);
        
        -- Update the column to be NOT NULL after adding it
        -- (We'll set a temporary password for existing users)
        UPDATE users SET password = '$2a$12$temp.password.hash.for.existing.users' WHERE password IS NULL;
        ALTER TABLE users ALTER COLUMN password SET NOT NULL;
        
        RAISE NOTICE 'Password column added to users table';
    ELSE
        RAISE NOTICE 'Password column already exists in users table';
    END IF;
END $$;
