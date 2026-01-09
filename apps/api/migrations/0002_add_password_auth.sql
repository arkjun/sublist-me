-- Disable foreign key constraints to avoid issues during table recreation
PRAGMA foreign_keys=OFF;

-- Start transaction
BEGIN TRANSACTION;

-- Create new users table with desired schema
CREATE TABLE IF NOT EXISTS new_users (
  id TEXT PRIMARY KEY,
  google_id TEXT UNIQUE, -- Removed NOT NULL
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  picture TEXT,
  password_hash TEXT, -- Added password_hash
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Copy data from old table to new table
INSERT INTO new_users (id, google_id, email, name, picture, created_at)
SELECT id, google_id, email, name, picture, created_at FROM users;

-- Drop old table
DROP TABLE users;

-- Rename new table to users
ALTER TABLE new_users RENAME TO users;

-- Recreate indices
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Commit transaction
COMMIT;

-- Re-enable foreign key constraints
PRAGMA foreign_keys=ON;
