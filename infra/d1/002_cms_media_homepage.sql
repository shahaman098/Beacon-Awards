ALTER TABLE cms_entries ADD COLUMN cover_image_url TEXT NOT NULL DEFAULT '';
ALTER TABLE cms_entries ADD COLUMN cover_image_alt TEXT NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS cms_media (
  id TEXT PRIMARY KEY,
  object_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  content_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  created_by TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (created_by) REFERENCES cms_users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS cms_media_created_at_idx
  ON cms_media(created_at DESC);

CREATE TABLE IF NOT EXISTS cms_homepage (
  id TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT,
  FOREIGN KEY (updated_by) REFERENCES cms_users(id) ON DELETE SET NULL
);
