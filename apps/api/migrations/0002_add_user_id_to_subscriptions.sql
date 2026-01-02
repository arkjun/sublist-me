-- subscriptions 테이블에 user_id 컬럼 추가
ALTER TABLE subscriptions ADD COLUMN user_id TEXT REFERENCES users(id) ON DELETE CASCADE;

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
