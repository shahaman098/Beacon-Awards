import { tryGetCmsDb, getDb } from "@/lib/cms-db";

export type CmsRedirect = {
  id: string;
  fromPath: string;
  toPath: string;
  statusCode: 301 | 302 | 307 | 308;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
};

type CmsRedirectRow = {
  id: string;
  from_path: string;
  to_path: string;
  status_code: number;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
};

function normalizePath(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "/";
  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const url = new URL(trimmed);
      const path = url.pathname.endsWith("/")
        ? url.pathname
        : `${url.pathname}/`;
      return path || "/";
    }
  } catch {
    // fall through
  }
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

function mapRedirect(row: CmsRedirectRow): CmsRedirect {
  const code = row.status_code;
  const statusCode =
    code === 302 || code === 307 || code === 308 || code === 301
      ? code
      : 301;
  return {
    id: row.id,
    fromPath: row.from_path,
    toPath: row.to_path,
    statusCode,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
  };
}

export async function listCmsRedirects() {
  const db = await tryGetCmsDb();
  if (!db) return [];

  try {
    const rows = await db
      .prepare(
        `SELECT id, from_path, to_path, status_code, created_at, updated_at, updated_by
         FROM cms_redirects
         ORDER BY from_path ASC`,
      )
      .all<CmsRedirectRow>();
    return (rows.results ?? []).map(mapRedirect);
  } catch {
    return [];
  }
}

export async function findCmsRedirect(pathname: string) {
  const db = await tryGetCmsDb();
  if (!db) return null;

  const fromPath = normalizePath(pathname);
  try {
    const row = await db
      .prepare(
        `SELECT id, from_path, to_path, status_code, created_at, updated_at, updated_by
         FROM cms_redirects
         WHERE from_path = ?1`,
      )
      .bind(fromPath)
      .first<CmsRedirectRow>();
    return row ? mapRedirect(row) : null;
  } catch {
    return null;
  }
}

export async function saveCmsRedirect(
  input: {
    id?: string | null;
    fromPath: string;
    toPath: string;
    statusCode?: number;
  },
  userId: string,
) {
  const db = await getDb();
  const now = new Date().toISOString();
  const fromPath = normalizePath(input.fromPath);
  const toPath = normalizePath(input.toPath);
  const statusCode =
    input.statusCode === 302 ||
    input.statusCode === 307 ||
    input.statusCode === 308
      ? input.statusCode
      : 301;

  if (fromPath === toPath) {
    throw new Error("from_path and to_path must differ.");
  }

  const id = input.id?.trim() || crypto.randomUUID();

  await db
    .prepare(
      `INSERT INTO cms_redirects (
         id, from_path, to_path, status_code, created_at, updated_at, updated_by
       ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
       ON CONFLICT(from_path) DO UPDATE SET
         to_path = excluded.to_path,
         status_code = excluded.status_code,
         updated_at = excluded.updated_at,
         updated_by = excluded.updated_by`,
    )
    .bind(id, fromPath, toPath, statusCode, now, now, userId)
    .run();

  return findCmsRedirect(fromPath);
}

export async function deleteCmsRedirect(id: string) {
  const db = await getDb();
  await db.prepare("DELETE FROM cms_redirects WHERE id = ?1").bind(id).run();
}

export { normalizePath as normalizeRedirectPath };
