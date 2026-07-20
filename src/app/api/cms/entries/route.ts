import {
  assertCmsEntryRouteAvailable,
  getCmsEntryById,
  hasCmsUsers,
  parseCmsEntryInput,
  requireCmsUser,
  saveCmsEntry,
  validateCmsEntryInput,
} from "@/lib/cms";
import { cmsRedirect, cmsRedirectWithMessage } from "@/lib/cms-routes";
import { pages } from "@/lib/pages";
import { getWordPressPublicSlugs } from "@/lib/wordpress-source";

function editPath(id: string | null, kind: "page" | "post") {
  return id ? `/cms/${id}/` : `/cms/new/?kind=${kind}`;
}

export async function POST(request: Request) {
  if (!(await hasCmsUsers())) {
    cmsRedirect(request, "/cms/login/");
  }

  const user = await requireCmsUser();
  const formData = await request.formData();
  const entryId = String(formData.get("id") ?? "").trim() || null;
  const input = parseCmsEntryInput(formData);
  const destination = editPath(entryId, input.kind);
  const validationError = validateCmsEntryInput(input);

  if (validationError) {
    cmsRedirectWithMessage(request, destination, "error", validationError);
  }

  const staticRouteSlugs = new Set([
    ...Object.keys(pages),
    ...(await getWordPressPublicSlugs()),
  ]);
  const collisionError = await assertCmsEntryRouteAvailable(
    input.kind,
    input.slug,
    entryId ?? undefined,
    Array.from(staticRouteSlugs),
  );

  if (collisionError) {
    cmsRedirectWithMessage(request, destination, "error", collisionError);
  }

  if (entryId) {
    const existingEntry = await getCmsEntryById(entryId);
    if (!existingEntry) {
      cmsRedirectWithMessage(request, "/cms/", "error", "Entry not found.");
    }
  }

  const entry = await saveCmsEntry(entryId, input, user.id);
  if (!entry) {
    cmsRedirectWithMessage(
      request,
      destination,
      "error",
      "The entry could not be saved.",
    );
  }

  cmsRedirect(request, `/cms/${entry.id}/`);
}
