CREATE TABLE IF NOT EXISTS cms_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cms_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES cms_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS cms_sessions_user_id_idx
  ON cms_sessions(user_id);

CREATE INDEX IF NOT EXISTS cms_sessions_expires_at_idx
  ON cms_sessions(expires_at);

CREATE TABLE IF NOT EXISTS cms_entries (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('page', 'post')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  route_slug TEXT NOT NULL UNIQUE,
  intro TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  published_at TEXT,
  author_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES cms_users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS cms_entries_kind_slug_idx
  ON cms_entries(kind, slug);

CREATE INDEX IF NOT EXISTS cms_entries_status_idx
  ON cms_entries(status, updated_at DESC);

CREATE INDEX IF NOT EXISTS cms_entries_route_slug_status_idx
  ON cms_entries(route_slug, status);
