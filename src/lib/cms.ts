import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { CardLink } from "@/lib/content";
import {
  CMS_ADMIN_EMAIL,
  CMS_ADMIN_PASSWORD,
} from "@/lib/cms-credentials";
import {
  HOMEPAGE_CONTENT_ID,
  mergeHomepageContent,
  type HomepageContent,
} from "@/lib/cms-homepage";
import {
  CMS_IMAGE_OVERRIDES_ID,
  emptyImageOverrides,
  mergeImageOverrides,
  type CmsImageOverrides,
} from "@/lib/cms-image-overrides";
import {
  SITE_CHROME_ID,
  mergeSiteChrome,
  type SiteChrome,
} from "@/lib/cms-site-chrome";
import {
  emptyPageContent,
  mergePageContentPayload,
  pageContentId,
  type PageContentPayload,
} from "@/lib/cms-page-content";
import {
  documentToInteriorPage,
  interiorPageToDocument,
  mergePageDocument,
  migrateFieldsToDocument,
  parsePageDocument,
  type PageDocument,
} from "@/lib/cms-page-document";
import type { InteriorPage } from "@/lib/pages";

export type CmsEntryKind = "page" | "post";
export type CmsEntryStatus = "draft" | "published";

export type CmsUser = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type CmsEntry = {
  id: string;
  kind: CmsEntryKind;
  title: string;
  slug: string;
  routeSlug: string;
  intro: string;
  content: string;
  coverImageUrl: string;
  coverImageAlt: string;
  status: CmsEntryStatus;
  publishedAt: string | null;
  authorId: string | null;
  createdAt: string;
  updatedAt: string;
};

type CmsUserRow = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
};

type CmsSessionRow = {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  created_at: string;
};

type CmsEntryRow = {
  id: string;
  kind: CmsEntryKind;
  title: string;
  slug: string;
  route_slug: string;
  intro: string;
  content: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  status: CmsEntryStatus;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

export type CmsEntryInput = {
  kind: CmsEntryKind;
  title: string;
  slug: string;
  intro: string;
  content: string;
  coverImageUrl: string;
  coverImageAlt: string;
  status: CmsEntryStatus;
};

const CMS_ENTRY_SELECT = `id, kind, title, slug, route_slug, intro, content,
  cover_image_url, cover_image_alt, status, published_at, author_id, created_at, updated_at`;

const CMS_SESSION_COOKIE = "bm_cms_session";
const CMS_SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;
const PBKDF2_ITERATIONS = 210_000;
const RESERVED_PAGE_PREFIXES = [
  "api",
  "category",
  "cms",
  "feed",
  "form-submitted",
  "news",
  "wp-admin",
  "wp-json",
  "_next",
];

function normaliseEmail(email: string) {
  return email.trim().toLowerCase();
}

function normaliseWhitespace(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
}

function slugifySegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeCmsPageSlug(value: string) {
  return value
    .split("/")
    .map((segment) => slugifySegment(segment))
    .filter(Boolean)
    .join("/");
}

export function normalizeCmsPostSlug(value: string) {
  return slugifySegment(value);
}

function buildRouteSlug(kind: CmsEntryKind, slug: string) {
  return kind === "post" ? `news/${slug}` : slug;
}

function entryHref(entry: Pick<CmsEntry, "routeSlug">) {
  return `/${entry.routeSlug}/`;
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < hex.length; index += 2) {
    bytes[index / 2] = Number.parseInt(hex.slice(index, index + 2), 16);
  }
  return bytes;
}

function base64Url(bytes: Uint8Array) {
  const binary = Array.from(bytes)
    .map((byte) => String.fromCharCode(byte))
    .join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function randomId(size = 16) {
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return base64Url(bytes);
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

async function sha256Hex(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return bytesToHex(new Uint8Array(digest));
}

async function derivePasswordHash(password: string, salt: Uint8Array) {
  const passwordBytes = new TextEncoder().encode(password);
  const saltBuffer = new Uint8Array(salt).buffer as ArrayBuffer;
  const key = await crypto.subtle.importKey(
    "raw",
    passwordBytes,
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
    },
    key,
    256,
  );
  return bytesToHex(new Uint8Array(bits));
}

async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derived = await derivePasswordHash(password, salt);
  return `pbkdf2_sha256$${PBKDF2_ITERATIONS}$${bytesToHex(salt)}$${derived}`;
}

async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterationsValue, saltHex, hashHex] = storedHash.split("$");
  if (algorithm !== "pbkdf2_sha256") return false;

  const iterations = Number.parseInt(iterationsValue, 10);
  if (!Number.isFinite(iterations) || iterations <= 0) return false;

  const salt = hexToBytes(saltHex);
  const saltBuffer = new Uint8Array(salt).buffer as ArrayBuffer;
  const passwordBytes = new TextEncoder().encode(password);
  const key = await crypto.subtle.importKey(
    "raw",
    passwordBytes,
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: saltBuffer,
      iterations,
    },
    key,
    256,
  );
  return constantTimeEqual(hashHex, bytesToHex(new Uint8Array(bits)));
}

async function getDb() {
  const context = await getCloudflareContext({ async: true });
  if (!context.env.CMS_DB) {
    throw new Error("CMS_DB binding is not configured.");
  }
  return context.env.CMS_DB;
}

export async function tryGetCmsDb() {
  try {
    return await getDb();
  } catch {
    return null;
  }
}

function mapUser(row: CmsUserRow): CmsUser {
  return {
    id: row.id,
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapEntry(row: CmsEntryRow): CmsEntry {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    slug: row.slug,
    routeSlug: row.route_slug,
    intro: row.intro,
    content: row.content,
    coverImageUrl: row.cover_image_url ?? "",
    coverImageAlt: row.cover_image_alt ?? "",
    status: row.status,
    publishedAt: row.published_at,
    authorId: row.author_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function paragraphiseContent(content: string) {
  return normaliseWhitespace(content)
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").trim())
    .filter(Boolean);
}

function cmsEyebrow(kind: CmsEntryKind) {
  return kind === "post" ? "News" : "Beacon Mosque";
}

function cmsBackLink(kind: CmsEntryKind) {
  return kind === "post"
    ? { label: "Back to news", href: "/category/news/" }
    : { label: "Return home", href: "/" };
}

export function cmsEntryToInteriorPage(entry: CmsEntry): InteriorPage {
  return {
    slug: entry.routeSlug,
    title: entry.title,
    eyebrow: cmsEyebrow(entry.kind),
    intro: entry.intro,
    image: entry.coverImageUrl || undefined,
    imageAlt: entry.coverImageAlt || entry.title,
    ctas: [
      cmsBackLink(entry.kind),
      { label: "Explore awards", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        paragraphs:
          paragraphiseContent(entry.content).length > 0
            ? paragraphiseContent(entry.content)
            : [entry.intro || `${entry.title} is available in the CMS archive.`],
      },
    ],
  };
}

export function cmsPostToCard(entry: CmsEntry): CardLink {
  return {
    title: entry.title,
    text: entry.intro,
    href: entryHref(entry),
    meta: entry.publishedAt
      ? new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(entry.publishedAt))
      : "CMS post",
    image: entry.coverImageUrl || undefined,
    imageAlt: entry.coverImageAlt || entry.title,
  };
}

export async function hasCmsUsers() {
  const db = await getDb();
  const count = await db
    .prepare("SELECT COUNT(*) AS count FROM cms_users")
    .first<{ count: number }>();
  return Number(count?.count ?? 0) > 0;
}

export async function listCmsEntries() {
  const db = await getDb();
  const rows = await db
    .prepare(
      `SELECT ${CMS_ENTRY_SELECT}
       FROM cms_entries
       ORDER BY updated_at DESC, created_at DESC`,
    )
    .all<CmsEntryRow>();

  return (rows.results ?? []).map(mapEntry);
}

export async function listPublishedCmsPosts() {
  const db = await getDb();
  const rows = await db
    .prepare(
      `SELECT ${CMS_ENTRY_SELECT}
       FROM cms_entries
       WHERE kind = 'post' AND status = 'published'
       ORDER BY COALESCE(published_at, updated_at) DESC, updated_at DESC`,
    )
    .all<CmsEntryRow>();

  return (rows.results ?? []).map(mapEntry);
}

export async function listPublishedCmsEntriesForSitemap() {
  const db = await getDb();
  const rows = await db
    .prepare(
      `SELECT ${CMS_ENTRY_SELECT}
       FROM cms_entries
       WHERE status = 'published'
       ORDER BY COALESCE(published_at, updated_at) DESC, updated_at DESC`,
    )
    .all<CmsEntryRow>();

  return (rows.results ?? []).map(mapEntry);
}

export async function getCmsEntryById(id: string) {
  const db = await getDb();
  const row = await db
    .prepare(
      `SELECT ${CMS_ENTRY_SELECT}
       FROM cms_entries
       WHERE id = ?1`,
    )
    .bind(id)
    .first<CmsEntryRow>();

  return row ? mapEntry(row) : null;
}

export async function getPublishedCmsEntryByRouteSlug(routeSlug: string) {
  const db = await getDb();
  const row = await db
    .prepare(
      `SELECT ${CMS_ENTRY_SELECT}
       FROM cms_entries
       WHERE route_slug = ?1 AND status = 'published'`,
    )
    .bind(routeSlug)
    .first<CmsEntryRow>();

  return row ? mapEntry(row) : null;
}

async function getUserByEmail(email: string) {
  const db = await getDb();
  return db
    .prepare(
      `SELECT id, email, password_hash, created_at, updated_at
       FROM cms_users
       WHERE email = ?1`,
    )
    .bind(normaliseEmail(email))
    .first<CmsUserRow>();
}

async function getSessionByToken(token: string) {
  const db = await getDb();
  const tokenHash = await sha256Hex(token);
  return db
    .prepare(
      `SELECT id, user_id, token_hash, expires_at, created_at
       FROM cms_sessions
       WHERE token_hash = ?1`,
    )
    .bind(tokenHash)
    .first<CmsSessionRow>();
}

async function pruneExpiredSessions() {
  const db = await getDb();
  await db
    .prepare("DELETE FROM cms_sessions WHERE expires_at <= ?1")
    .bind(new Date().toISOString())
    .run();
}

async function setCmsSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(CMS_SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: CMS_SESSION_TTL_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearCmsSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(CMS_SESSION_COOKIE, "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function ensureCmsAdminUser() {
  const db = await getDb();
  const email = normaliseEmail(CMS_ADMIN_EMAIL);
  const now = new Date().toISOString();
  const existing = await getUserByEmail(email);

  if (existing) {
    const stillValid = await verifyPassword(
      CMS_ADMIN_PASSWORD,
      existing.password_hash,
    );
    if (stillValid) {
      return mapUser(existing);
    }

    const passwordHash = await hashPassword(CMS_ADMIN_PASSWORD);
    await db
      .prepare(
        `UPDATE cms_users
         SET password_hash = ?1,
             updated_at = ?2
         WHERE id = ?3`,
      )
      .bind(passwordHash, now, existing.id)
      .run();

    return mapUser({
      ...existing,
      password_hash: passwordHash,
      updated_at: now,
    });
  }

  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(CMS_ADMIN_PASSWORD);
  try {
    await db
      .prepare(
        `INSERT INTO cms_users (id, email, password_hash, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`,
      )
      .bind(userId, email, passwordHash, now, now)
      .run();
  } catch {
    const raced = await getUserByEmail(email);
    if (raced) return mapUser(raced);
    throw new Error("Could not create CMS admin user.");
  }

  return mapUser({
    id: userId,
    email,
    password_hash: passwordHash,
    created_at: now,
    updated_at: now,
  });
}

export async function createInitialCmsUser(email: string, password: string) {
  void email;
  void password;
  return ensureCmsAdminUser();
}

export async function createCmsSessionToken(userId: string) {
  const db = await getDb();
  const sessionId = crypto.randomUUID();
  const token = randomId(32);
  const tokenHash = await sha256Hex(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + CMS_SESSION_TTL_SECONDS * 1000);

  await db
    .prepare(
      `INSERT INTO cms_sessions (id, user_id, token_hash, expires_at, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5)`,
    )
    .bind(
      sessionId,
      userId,
      tokenHash,
      expiresAt.toISOString(),
      now.toISOString(),
    )
    .run();

  return token;
}

export async function createCmsSession(userId: string) {
  const token = await createCmsSessionToken(userId);
  await setCmsSessionCookie(token);
}

export async function authenticateCmsUser(email: string, password: string) {
  await pruneExpiredSessions();
  await ensureCmsAdminUser();

  const normalisedEmail = normaliseEmail(email);
  if (normalisedEmail !== normaliseEmail(CMS_ADMIN_EMAIL)) {
    return null;
  }

  const user = await getUserByEmail(normalisedEmail);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) return null;

  return mapUser(user);
}

export function validateCmsLoginInput(
  email: string,
  emailConfirm: string,
  password: string,
) {
  const normalisedEmail = normaliseEmail(email);
  const normalisedConfirm = normaliseEmail(emailConfirm);

  if (!normalisedEmail || !normalisedEmail.includes("@")) {
    return "Enter a valid email address.";
  }

  if (normalisedEmail !== normalisedConfirm) {
    return "Email confirmation does not match.";
  }

  if (normalisedEmail !== normaliseEmail(CMS_ADMIN_EMAIL)) {
    return "This email is not authorised for CMS access.";
  }

  if (!password) {
    return "Enter your password.";
  }

  return null;
}

export async function getCurrentCmsUser() {
  await pruneExpiredSessions();
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  if (!sessionToken) return null;

  const session = await getSessionByToken(sessionToken);
  if (!session) return null;
  if (new Date(session.expires_at).getTime() <= Date.now()) {
    await clearCmsSessionCookie();
    return null;
  }

  const db = await getDb();
  const user = await db
    .prepare(
      `SELECT id, email, password_hash, created_at, updated_at
       FROM cms_users
       WHERE id = ?1`,
    )
    .bind(session.user_id)
    .first<CmsUserRow>();

  return user ? mapUser(user) : null;
}

export async function requireCmsUser() {
  const user = await getCurrentCmsUser();
  if (!user) {
    redirect("/cms/login/");
  }

  return user;
}

export async function destroyCurrentCmsSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  if (sessionToken) {
    const tokenHash = await sha256Hex(sessionToken);
    const db = await getDb();
    await db
      .prepare("DELETE FROM cms_sessions WHERE token_hash = ?1")
      .bind(tokenHash)
      .run();
  }

  await clearCmsSessionCookie();
}

export async function assertCmsEntryRouteAvailable(
  kind: CmsEntryKind,
  slug: string,
  existingEntryId?: string,
  reservedRouteSlugs: string[] = [],
) {
  const routeSlug = buildRouteSlug(kind, slug);

  if (!routeSlug) {
    return "Slug is required.";
  }

  if (kind === "page") {
    const firstSegment = routeSlug.split("/")[0] ?? "";
    if (RESERVED_PAGE_PREFIXES.includes(firstSegment)) {
      return `The slug "${firstSegment}" is reserved.`;
    }
  }

  if (reservedRouteSlugs.includes(routeSlug)) {
    return `The route "/${routeSlug}/" is already used by the site.`;
  }

  const db = await getDb();
  const existing = await db
    .prepare(
      `SELECT id
       FROM cms_entries
       WHERE route_slug = ?1`,
    )
    .bind(routeSlug)
    .first<{ id: string }>();

  if (existing && existing.id !== existingEntryId) {
    return `The route "/${routeSlug}/" already exists in the CMS.`;
  }

  return null;
}

export async function saveCmsEntry(
  entryId: string | null,
  input: CmsEntryInput,
  authorId: string,
) {
  const db = await getDb();
  const now = new Date().toISOString();
  const routeSlug = buildRouteSlug(input.kind, input.slug);
  const publishedAt = input.status === "published" ? now : null;

  if (entryId) {
    await db
      .prepare(
        `UPDATE cms_entries
         SET kind = ?1,
             title = ?2,
             slug = ?3,
             route_slug = ?4,
             intro = ?5,
             content = ?6,
             cover_image_url = ?7,
             cover_image_alt = ?8,
             status = ?9,
             published_at = CASE
               WHEN ?9 = 'published' AND published_at IS NULL THEN ?10
               WHEN ?9 = 'published' THEN published_at
               ELSE NULL
             END,
             author_id = ?11,
             updated_at = ?12
         WHERE id = ?13`,
      )
      .bind(
        input.kind,
        input.title,
        input.slug,
        routeSlug,
        input.intro,
        input.content,
        input.coverImageUrl,
        input.coverImageAlt,
        input.status,
        publishedAt,
        authorId,
        now,
        entryId,
      )
      .run();

    return getCmsEntryById(entryId);
  }

  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO cms_entries (
         id,
         kind,
         title,
         slug,
         route_slug,
         intro,
         content,
         cover_image_url,
         cover_image_alt,
         status,
         published_at,
         author_id,
         created_at,
         updated_at
       ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)`,
    )
    .bind(
      id,
      input.kind,
      input.title,
      input.slug,
      routeSlug,
      input.intro,
      input.content,
      input.coverImageUrl,
      input.coverImageAlt,
      input.status,
      publishedAt,
      authorId,
      now,
      now,
    )
    .run();

  return getCmsEntryById(id);
}

export async function deleteCmsEntry(id: string) {
  const db = await getDb();
  await db.prepare("DELETE FROM cms_entries WHERE id = ?1").bind(id).run();
}

export function parseCmsEntryInput(formData: FormData) {
  const requestedKind = formData.get("kind");
  const requestedStatus = formData.get("status");
  const rawTitle = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "");
  const rawIntro = String(formData.get("intro") ?? "");
  const rawContent = String(formData.get("content") ?? "");
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim();
  const coverImageAlt = String(formData.get("coverImageAlt") ?? "").trim();

  const kind: CmsEntryKind = requestedKind === "post" ? "post" : "page";
  const status: CmsEntryStatus =
    requestedStatus === "published" ? "published" : "draft";
  const title = rawTitle.trim();
  const slug =
    kind === "post"
      ? normalizeCmsPostSlug(rawSlug || title)
      : normalizeCmsPageSlug(rawSlug || title);
  const intro = normaliseWhitespace(rawIntro);
  const content = normaliseWhitespace(rawContent);

  return {
    kind,
    status,
    title,
    slug,
    intro,
    content,
    coverImageUrl,
    coverImageAlt,
  } satisfies CmsEntryInput;
}

export function validateCmsUserInput(email: string, password: string) {
  const normalisedEmail = normaliseEmail(email);
  if (!normalisedEmail || !normalisedEmail.includes("@")) {
    return "Enter a valid email address.";
  }

  if (password.length < 10) {
    return "Use a password with at least 10 characters.";
  }

  return null;
}

export function validateCmsEntryInput(input: CmsEntryInput) {
  if (!input.title) return "Title is required.";
  if (!input.slug) return "Slug is required.";
  if (!input.intro) return "Summary is required.";
  if (!input.content) return "Content is required.";
  return null;
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const db = await tryGetCmsDb();
  if (!db) {
    return mergeHomepageContent(null);
  }

  try {
    const row = await db
      .prepare(
        `SELECT payload
         FROM cms_homepage
         WHERE id = ?1`,
      )
      .bind(HOMEPAGE_CONTENT_ID)
      .first<{ payload: string }>();

    if (!row?.payload) {
      return mergeHomepageContent(null);
    }

    return mergeHomepageContent(JSON.parse(row.payload));
  } catch {
    return mergeHomepageContent(null);
  }
}

export async function saveHomepageContent(
  content: HomepageContent,
  userId: string,
) {
  const db = await getDb();
  const now = new Date().toISOString();
  const payload = JSON.stringify(mergeHomepageContent(content));

  await db
    .prepare(
      `INSERT INTO cms_homepage (id, payload, updated_at, updated_by)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(id) DO UPDATE SET
         payload = excluded.payload,
         updated_at = excluded.updated_at,
         updated_by = excluded.updated_by`,
    )
    .bind(HOMEPAGE_CONTENT_ID, payload, now, userId)
    .run();

  return mergeHomepageContent(JSON.parse(payload));
}

export async function getImageOverrides(): Promise<CmsImageOverrides> {
  const db = await tryGetCmsDb();
  if (!db) {
    return emptyImageOverrides();
  }

  try {
    const row = await db
      .prepare(
        `SELECT payload
         FROM cms_homepage
         WHERE id = ?1`,
      )
      .bind(CMS_IMAGE_OVERRIDES_ID)
      .first<{ payload: string }>();

    if (!row?.payload) {
      return emptyImageOverrides();
    }

    return mergeImageOverrides(JSON.parse(row.payload));
  } catch {
    return emptyImageOverrides();
  }
}

export async function saveImageOverrides(
  overrides: CmsImageOverrides,
  userId: string,
) {
  const db = await getDb();
  const now = new Date().toISOString();
  const payload = JSON.stringify(mergeImageOverrides(overrides));

  await db
    .prepare(
      `INSERT INTO cms_homepage (id, payload, updated_at, updated_by)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(id) DO UPDATE SET
         payload = excluded.payload,
         updated_at = excluded.updated_at,
         updated_by = excluded.updated_by`,
    )
    .bind(CMS_IMAGE_OVERRIDES_ID, payload, now, userId)
    .run();

  return mergeImageOverrides(JSON.parse(payload));
}

export async function getSiteChrome(): Promise<SiteChrome> {
  const db = await tryGetCmsDb();
  if (!db) {
    return mergeSiteChrome(null);
  }

  try {
    const row = await db
      .prepare(
        `SELECT payload
         FROM cms_homepage
         WHERE id = ?1`,
      )
      .bind(SITE_CHROME_ID)
      .first<{ payload: string }>();

    if (!row?.payload) {
      return mergeSiteChrome(null);
    }

    return mergeSiteChrome(JSON.parse(row.payload));
  } catch {
    return mergeSiteChrome(null);
  }
}

export async function saveSiteChrome(chrome: SiteChrome, userId: string) {
  const db = await getDb();
  const now = new Date().toISOString();
  const payload = JSON.stringify(mergeSiteChrome(chrome));

  await db
    .prepare(
      `INSERT INTO cms_homepage (id, payload, updated_at, updated_by)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(id) DO UPDATE SET
         payload = excluded.payload,
         updated_at = excluded.updated_at,
         updated_by = excluded.updated_by`,
    )
    .bind(SITE_CHROME_ID, payload, now, userId)
    .run();

  return mergeSiteChrome(JSON.parse(payload));
}

export async function getPageContent(
  routeSlug: string,
): Promise<PageContentPayload> {
  const db = await tryGetCmsDb();
  if (!db) {
    return emptyPageContent();
  }

  try {
    const row = await db
      .prepare(
        `SELECT payload
         FROM cms_homepage
         WHERE id = ?1`,
      )
      .bind(pageContentId(routeSlug))
      .first<{ payload: string }>();

    if (!row?.payload) {
      return emptyPageContent();
    }

    return mergePageContentPayload(JSON.parse(row.payload));
  } catch {
    return emptyPageContent();
  }
}

export async function savePageContent(
  routeSlug: string,
  content: PageContentPayload,
  userId: string,
) {
  const db = await getDb();
  const now = new Date().toISOString();
  const existing = await getPageContent(routeSlug);
  const merged = mergePageContentPayload({
    fields: {
      ...existing.fields,
      ...content.fields,
    },
  });
  const payload = JSON.stringify(merged);

  await db
    .prepare(
      `INSERT INTO cms_homepage (id, payload, updated_at, updated_by)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(id) DO UPDATE SET
         payload = excluded.payload,
         updated_at = excluded.updated_at,
         updated_by = excluded.updated_by`,
    )
    .bind(pageContentId(routeSlug), payload, now, userId)
    .run();

  return merged;
}

export async function applySavedPageContent(
  page: InteriorPage,
): Promise<InteriorPage> {
  return resolveInteriorPage(page);
}

async function readStoredPageDocument(
  routeSlug: string,
): Promise<PageDocument | null> {
  const db = await tryGetCmsDb();
  if (!db) return null;

  try {
    const row = await db
      .prepare(
        `SELECT document
         FROM cms_page_documents
         WHERE route_slug = ?1`,
      )
      .bind(routeSlug)
      .first<{ document: string }>();

    if (!row?.document) return null;
    return parsePageDocument(JSON.parse(row.document));
  } catch {
    return null;
  }
}

/**
 * Merge order: code default → legacy page:{slug} fields → DB document overlay.
 */
export async function getPageDocument(
  routeSlug: string,
  basePage: InteriorPage,
): Promise<PageDocument> {
  const legacy = await getPageContent(routeSlug);
  const fromFields = migrateFieldsToDocument(basePage, legacy.fields);
  const stored = await readStoredPageDocument(routeSlug);
  return mergePageDocument(fromFields, stored);
}

export async function resolveInteriorPage(
  page: InteriorPage,
): Promise<InteriorPage> {
  const document = await getPageDocument(page.slug, page);
  return documentToInteriorPage(document, page.slug, {
    heroVideo: page.heroVideo,
    heroVideoPoster: page.heroVideoPoster,
  });
}

export async function savePageDocument(
  routeSlug: string,
  document: PageDocument,
  userId: string,
  note = "",
) {
  const db = await getDb();
  const now = new Date().toISOString();
  const parsed =
    parsePageDocument(document) ??
    interiorPageToDocument({
      slug: routeSlug,
      title: document.title,
      eyebrow: document.eyebrow,
      intro: document.intro,
      image: document.image,
      imageAlt: document.imageAlt,
      ctas: document.ctas,
      sections: document.sections,
    });
  const payload = JSON.stringify(parsed);
  const revisionId = crypto.randomUUID();

  await db.batch([
    db
      .prepare(
        `INSERT INTO cms_page_documents (route_slug, schema_version, document, updated_at, updated_by)
         VALUES (?1, ?2, ?3, ?4, ?5)
         ON CONFLICT(route_slug) DO UPDATE SET
           schema_version = excluded.schema_version,
           document = excluded.document,
           updated_at = excluded.updated_at,
           updated_by = excluded.updated_by`,
      )
      .bind(routeSlug, parsed.schemaVersion, payload, now, userId),
    db
      .prepare(
        `INSERT INTO cms_page_revisions (id, route_slug, document, created_at, created_by, note)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`,
      )
      .bind(revisionId, routeSlug, payload, now, userId, note),
  ]);

  return parsed;
}

export async function getOptionalCmsUser() {
  try {
    return await getCurrentCmsUser();
  } catch {
    return null;
  }
}
