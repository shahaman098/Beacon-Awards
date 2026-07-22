import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDb() {
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
