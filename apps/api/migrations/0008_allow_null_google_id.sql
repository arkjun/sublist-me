-- google_id를 NULL 허용으로 변경
-- SQLite에서는 ALTER COLUMN으로 NOT NULL 제거가 불가하므로 테이블 재생성 필요

-- 1. 임시 테이블 생성 (google_id에서 NOT NULL 제거)
CREATE TABLE users_new (
  id TEXT PRIMARY KEY,
  google_id TEXT UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  picture TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  password_hash TEXT,
  username TEXT
);

-- 2. 데이터 복사
INSERT INTO users_new (id, google_id, email, name, picture, created_at, password_hash, username)
SELECT id, google_id, email, name, picture, created_at, password_hash, username FROM users;

-- 3. 기존 테이블 삭제
DROP TABLE users;

-- 4. 새 테이블 이름 변경
ALTER TABLE users_new RENAME TO users;

-- 5. 인덱스 재생성
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_email ON users(email);
CREATE UNIQUE INDEX idx_users_username ON users(username);
