-- D1 handles transactions automatically, so we remove BEGIN/COMMIT
-- Add password_hash column to users table
ALTER TABLE users ADD COLUMN password_hash TEXT;
