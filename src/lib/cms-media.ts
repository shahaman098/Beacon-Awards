import { getCloudflareContext } from "@opennextjs/cloudflare";

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const VIDEO_TYPES = new Set(["video/mp4"]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 40 * 1024 * 1024;

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "video/mp4": "mp4",
};

export type CmsMediaRecord = {
  id: string;
  objectKey: string;
  url: string;
  contentType: string;
  byteSize: number;
  createdBy: string | null;
  createdAt: string;
};

function extensionFor(contentType: string, filename: string) {
  const fromType = EXT_BY_TYPE[contentType];
  if (fromType) return fromType;
  const fromName = filename.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]{2,5}$/.test(fromName)) return fromName;
  return "bin";
}

function sniffContentType(bytes: Uint8Array, fallback: string) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  if (
    bytes.length >= 6 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return "image/gif";
  }
  if (
    bytes.length >= 12 &&
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70
  ) {
    return "video/mp4";
  }
  return fallback;
}

export function validateCmsMediaFile(contentType: string, byteSize: number) {
  if (IMAGE_TYPES.has(contentType)) {
    if (byteSize > MAX_IMAGE_BYTES) {
      return "Images must be 8MB or smaller.";
    }
    return null;
  }
  if (VIDEO_TYPES.has(contentType)) {
    if (byteSize > MAX_VIDEO_BYTES) {
      return "Videos must be 40MB or smaller.";
    }
    return null;
  }
  return "Only JPEG, PNG, WebP, GIF, and MP4 uploads are allowed.";
}

async function getEnv() {
  try {
    const context = await getCloudflareContext({ async: true });
    return context.env;
  } catch {
    return null;
  }
}

export async function storeCmsMediaFile({
  file,
  userId,
}: {
  file: File;
  userId: string;
}): Promise<{ error: string } | { media: CmsMediaRecord }> {
  const buffer = new Uint8Array(await file.arrayBuffer());
  const contentType = sniffContentType(
    buffer,
    file.type || "application/octet-stream",
  );
  const validationError = validateCmsMediaFile(contentType, buffer.byteLength);
  if (validationError) {
    return { error: validationError };
  }

  const year = new Date().getUTCFullYear();
  const id = crypto.randomUUID();
  const ext = extensionFor(contentType, file.name || "");
  const objectKey = `cms/${year}/${id}.${ext}`;
  const now = new Date().toISOString();
  const env = await getEnv();

  let url: string;

  if (env?.CMS_MEDIA) {
    await env.CMS_MEDIA.put(objectKey, buffer, {
      httpMetadata: { contentType },
    });
    url = `/cms-media/${objectKey}`;
  } else {
    const { mkdir, writeFile } = await import("node:fs/promises");
    const path = await import("node:path");
    const publicDir = path.join(process.cwd(), "public", "cms-uploads");
    const absolutePath = path.join(publicDir, ...objectKey.split("/"));
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, buffer);
    url = `/cms-uploads/${objectKey}`;
  }

  const media: CmsMediaRecord = {
    id,
    objectKey,
    url,
    contentType,
    byteSize: buffer.byteLength,
    createdBy: userId,
    createdAt: now,
  };

  if (env?.CMS_DB) {
    try {
      await env.CMS_DB.prepare(
        `INSERT INTO cms_media (
           id, object_key, url, content_type, byte_size, created_by, created_at
         ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`,
      )
        .bind(
          media.id,
          media.objectKey,
          media.url,
          media.contentType,
          media.byteSize,
          media.createdBy,
          media.createdAt,
        )
        .run();
    } catch (error) {
      console.warn("CMS media catalog insert skipped", error);
    }
  }

  return { media };
}

export async function listCmsMedia({
  limit = 40,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
} = {}) {
  const env = await getEnv();
  if (!env?.CMS_DB) {
    return { items: [] as CmsMediaRecord[], total: 0 };
  }

  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const safeOffset = Math.max(offset, 0);

  try {
    const countRow = await env.CMS_DB.prepare(
      `SELECT COUNT(*) AS count FROM cms_media`,
    ).first<{ count: number }>();
    const rows = await env.CMS_DB.prepare(
      `SELECT id, object_key, url, content_type, byte_size, created_by, created_at
       FROM cms_media
       ORDER BY created_at DESC
       LIMIT ?1 OFFSET ?2`,
    )
      .bind(safeLimit, safeOffset)
      .all<{
        id: string;
        object_key: string;
        url: string;
        content_type: string;
        byte_size: number;
        created_by: string | null;
        created_at: string;
      }>();

    const items = (rows.results ?? []).map(
      (row): CmsMediaRecord => ({
        id: row.id,
        objectKey: row.object_key,
        url: row.url,
        contentType: row.content_type,
        byteSize: row.byte_size,
        createdBy: row.created_by,
        createdAt: row.created_at,
      }),
    );

    return { items, total: Number(countRow?.count ?? items.length) };
  } catch {
    return { items: [], total: 0 };
  }
}

export async function deleteCmsMedia(id: string) {
  const env = await getEnv();
  if (!env?.CMS_DB) {
    return { error: "CMS database is not available." };
  }

  try {
    const row = await env.CMS_DB.prepare(
      `SELECT id, object_key, url FROM cms_media WHERE id = ?1`,
    )
      .bind(id)
      .first<{ id: string; object_key: string; url: string }>();

    if (!row) {
      return { error: "Media not found." };
    }

    if (env.CMS_MEDIA) {
      try {
        await env.CMS_MEDIA.delete(row.object_key);
      } catch (error) {
        console.warn("CMS media R2 delete skipped", error);
      }
    } else if (row.url.startsWith("/cms-uploads/")) {
      try {
        const { unlink } = await import("node:fs/promises");
        const path = await import("node:path");
        const absolutePath = path.join(
          process.cwd(),
          "public",
          ...row.url.split("/").filter(Boolean),
        );
        await unlink(absolutePath);
      } catch (error) {
        console.warn("CMS media local delete skipped", error);
      }
    }

    await env.CMS_DB.prepare(`DELETE FROM cms_media WHERE id = ?1`)
      .bind(id)
      .run();

    return { ok: true as const };
  } catch (error) {
    console.error("CMS media delete failed", error);
    return { error: "Could not delete media." };
  }
}

export async function readCmsMediaObject(objectKey: string) {
  if (!objectKey || objectKey.includes("..") || objectKey.startsWith("/")) {
    return null;
  }

  const env = await getEnv();
  if (!env?.CMS_MEDIA) return null;

  const object = await env.CMS_MEDIA.get(objectKey);
  if (!object) return null;

  return {
    body: object.body,
    contentType: object.httpMetadata?.contentType || "application/octet-stream",
    size: object.size,
  };
}
