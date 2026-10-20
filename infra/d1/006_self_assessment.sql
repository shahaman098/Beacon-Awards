CREATE TABLE IF NOT EXISTS assessment_packs (
  id TEXT PRIMARY KEY,
  access_token TEXT NOT NULL UNIQUE,
  mosque_name TEXT NOT NULL,
  contact_name TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (
    status IN ('draft', 'in_review', 'monitoring', 'archived')
  ) DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS assessment_packs_updated_at_idx
  ON assessment_packs(updated_at DESC);

CREATE INDEX IF NOT EXISTS assessment_packs_status_idx
  ON assessment_packs(status);

CREATE TABLE IF NOT EXISTS assessment_domains (
  pack_id TEXT NOT NULL,
  domain_id TEXT NOT NULL,
  rag TEXT NOT NULL CHECK (
    rag IN ('red', 'amber', 'green', 'unset')
  ) DEFAULT 'unset',
  evidence_notes TEXT NOT NULL DEFAULT '',
  checklist_json TEXT NOT NULL DEFAULT '[]',
  updated_at TEXT NOT NULL,
  PRIMARY KEY (pack_id, domain_id),
  FOREIGN KEY (pack_id) REFERENCES assessment_packs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS assessment_domains_rag_idx
  ON assessment_domains(pack_id, rag);

CREATE TABLE IF NOT EXISTS assessment_actions (
  id TEXT PRIMARY KEY,
  pack_id TEXT NOT NULL,
  domain_id TEXT NOT NULL,
  title TEXT NOT NULL,
  owner_role TEXT NOT NULL DEFAULT '',
  due_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (
    status IN ('open', 'in_progress', 'done')
  ) DEFAULT 'open',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (pack_id) REFERENCES assessment_packs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS assessment_actions_pack_idx
  ON assessment_actions(pack_id, status);

CREATE INDEX IF NOT EXISTS assessment_actions_domain_idx
  ON assessment_actions(pack_id, domain_id);
