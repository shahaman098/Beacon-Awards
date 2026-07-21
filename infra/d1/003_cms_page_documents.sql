CREATE TABLE IF NOT EXISTS cms_page_documents (
  route_slug TEXT PRIMARY KEY,
  schema_version INTEGER NOT NULL DEFAULT 1,
  document TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT,
  FOREIGN KEY (updated_by) REFERENCES cms_users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS cms_page_documents_updated_at_idx
  ON cms_page_documents(updated_at DESC);

CREATE TABLE IF NOT EXISTS cms_page_revisions (
  id TEXT PRIMARY KEY,
  route_slug TEXT NOT NULL,
  document TEXT NOT NULL,
  created_at TEXT NOT NULL,
  created_by TEXT,
  note TEXT NOT NULL DEFAULT '',
  FOREIGN KEY (created_by) REFERENCES cms_users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS cms_page_revisions_route_created_idx
  ON cms_page_revisions(route_slug, created_at DESC);
