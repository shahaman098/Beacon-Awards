import Link from "@/components/AppLink";
import { CmsPanel, CmsShell, CmsTopLink } from "@/components/CmsShell";
import { hasCmsUsers, listCmsEntries, requireCmsUser } from "@/lib/cms";
import { redirect } from "next/navigation";

export default async function CmsDashboardPage() {
  if (!(await hasCmsUsers())) {
    redirect("/cms/login/");
  }

  const user = await requireCmsUser();
  const entries = await listCmsEntries();

  return (
    <CmsShell
      actions={
        <>
          <CmsTopLink href="/">Edit live site</CmsTopLink>
          <CmsTopLink href="/cms/new/?kind=page">New page</CmsTopLink>
          <CmsTopLink href="/cms/new/?kind=post">New post</CmsTopLink>
          <form action="/api/cms/logout/" method="post">
            <button
              className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/76 transition hover:border-gold-300 hover:text-gold-200"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </>
      }
      eyebrow={user.email}
      title="CMS dashboard"
    >
      <CmsPanel
        text="Text and images are edited on the live site. After login, open any public page — blue outlines mark what you can click and change, then use Save changes."
        title="Entries"
      >
        {entries.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/12 px-6 py-10 text-center text-white/60">
            No entries yet. Create your first page or post from the dashboard.
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-left">
              <thead className="bg-white/6 text-xs uppercase tracking-[0.16em] text-gold-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Path</th>
                  <th className="px-4 py-3 font-semibold">Updated</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6 bg-black/20 text-sm text-white/82">
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-white">{entry.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">
                        {entry.slug}
                      </p>
                    </td>
                    <td className="px-4 py-4 uppercase tracking-[0.14em] text-white/60">
                      {entry.kind}
                    </td>
                    <td className="px-4 py-4 uppercase tracking-[0.14em] text-white/60">
                      {entry.status}
                    </td>
                    <td className="px-4 py-4 text-white/70">/{entry.routeSlug}/</td>
                    <td className="px-4 py-4 text-white/58">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(entry.updatedAt))}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
                        <Link
                          className="text-gold-200 transition hover:text-gold-300"
                          href={`/cms/${entry.id}/`}
                        >
                          Edit
                        </Link>
                        <Link
                          className="text-white/56 transition hover:text-white"
                          href={`/${entry.routeSlug}/`}
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CmsPanel>
    </CmsShell>
  );
}
