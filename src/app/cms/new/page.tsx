import { redirect } from "next/navigation";
import { CmsEntryForm } from "@/components/CmsEntryForm";
import { CmsShell, CmsTopLink } from "@/components/CmsShell";
import { hasCmsUsers, requireCmsUser } from "@/lib/cms";
import { readCmsSearchParam, type CmsSearchParams } from "@/lib/cms-admin";

export default async function CmsNewEntryPage({
  searchParams,
}: {
  searchParams: CmsSearchParams;
}) {
  if (!(await hasCmsUsers())) {
    redirect("/cms/login/");
  }

  await requireCmsUser();
  const requestedKind = await readCmsSearchParam(searchParams, "kind");
  const error = await readCmsSearchParam(searchParams, "error");
  const kind = requestedKind === "post" ? "post" : "page";

  return (
    <CmsShell
      actions={
        <>
          <CmsTopLink href="/cms/">Back to dashboard</CmsTopLink>
          <CmsTopLink href={kind === "post" ? "/category/news/" : "/"}>
            {kind === "post" ? "Open news" : "Open homepage"}
          </CmsTopLink>
        </>
      }
      eyebrow="Content creation"
      title={`Create ${kind}`}
    >
      <CmsEntryForm
        action="/api/cms/entries/"
        defaultKind={kind}
        error={error}
        submitLabel={`Save ${kind}`}
      />
    </CmsShell>
  );
}
