-- Add username column to users table
ALTER TABLE users ADD COLUMN username TEXT;

-- Set default username for existing users (user- + first 8 chars of id)
UPDATE users SET username = 'user-' || SUBSTR(id, 1, 8) WHERE username IS NULL;

-- Create unique index on username
CREATE UNIQUE INDEX idx_users_username ON users(username);
