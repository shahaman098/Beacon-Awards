import { notFound, redirect } from "next/navigation";
import { CmsEntryForm } from "@/components/CmsEntryForm";
import { CmsPanel, CmsShell, CmsTopLink } from "@/components/CmsShell";
import { getCmsEntryById, hasCmsUsers, requireCmsUser } from "@/lib/cms";
import { readCmsSearchParam, type CmsSearchParams } from "@/lib/cms-admin";

export default async function CmsEditEntryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: CmsSearchParams;
}) {
  if (!(await hasCmsUsers())) {
    redirect("/cms/login/");
  }

  await requireCmsUser();
  const { id } = await params;
  const entry = await getCmsEntryById(id);
  if (!entry) {
    notFound();
  }

  const error = await readCmsSearchParam(searchParams, "error");

  return (
    <CmsShell
      actions={
        <>
          <CmsTopLink href="/cms/">Back to dashboard</CmsTopLink>
          <CmsTopLink href={`/${entry.routeSlug}/`}>View public page</CmsTopLink>
        </>
      }
      eyebrow={entry.kind === "post" ? "Edit post" : "Edit page"}
      title={entry.title}
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <CmsEntryForm
          action="/api/cms/entries/"
          entry={entry}
          error={error}
          submitLabel="Save changes"
        />

        <CmsPanel
          text="Delete removes the entry from the CMS immediately. If it was published, the public route will return 404."
          title="Danger zone"
        >
          <form action={`/api/cms/entries/${entry.id}/delete/`} method="post">
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-rose-300/40 bg-rose-500/10 px-6 py-3 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/16"
              type="submit"
            >
              Delete entry
            </button>
          </form>
        </CmsPanel>
      </div>
    </CmsShell>
  );
}
