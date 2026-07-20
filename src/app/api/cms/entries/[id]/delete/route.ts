import {
  deleteCmsEntry,
  getCmsEntryById,
  hasCmsUsers,
  requireCmsUser,
} from "@/lib/cms";
import { cmsRedirect, cmsRedirectWithMessage } from "@/lib/cms-routes";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await hasCmsUsers())) {
    cmsRedirect(request, "/cms/login/");
  }

  await requireCmsUser();
  const { id } = await params;
  const entry = await getCmsEntryById(id);

  if (!entry) {
    cmsRedirectWithMessage(request, "/cms/", "error", "Entry not found.");
  }

  await deleteCmsEntry(id);
  cmsRedirect(request, "/cms/");
}
