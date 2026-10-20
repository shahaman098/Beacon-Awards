import Link from "@/components/AppLink";
import { CmsPanel, CmsShell, CmsTopLink } from "@/components/CmsShell";
import { listAssessmentPacks } from "@/lib/assessment";
import { hasCmsUsers, requireCmsUser } from "@/lib/cms";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CmsAssessmentsPage() {
  if (!(await hasCmsUsers())) {
    redirect("/cms/login/");
  }

  const user = await requireCmsUser();
  const packs = await listAssessmentPacks();

  return (
    <CmsShell
      actions={
        <>
          <CmsTopLink href="/cms/">Dashboard</CmsTopLink>
          <CmsTopLink href="/self-assessment/">Start pack</CmsTopLink>
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
      title="Self-assessments"
    >
      <CmsPanel
        text="Private packs created from the public self-assessment tool. Open a pack to review RAG scores, evidence and action plans."
        title="Assessment packs"
      >
        {packs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/12 px-6 py-10 text-center text-white/60">
            No assessment packs yet. Start one from the public self-assessment
            page.
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-left">
              <thead className="bg-white/6 text-xs uppercase tracking-[0.16em] text-gold-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">Mosque</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">RAG</th>
                  <th className="px-4 py-3 font-semibold">Open actions</th>
                  <th className="px-4 py-3 font-semibold">Updated</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6 bg-black/20 text-sm text-white/82">
                {packs.map((pack) => (
                  <tr key={pack.id}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-white">{pack.mosqueName}</p>
                      <p className="mt-1 text-xs text-white/40">
                        {pack.contactName || pack.contactEmail || "No contact"}
                      </p>
                    </td>
                    <td className="px-4 py-4 uppercase tracking-[0.14em] text-white/60">
                      {pack.status.replaceAll("_", " ")}
                    </td>
                    <td className="px-4 py-4 text-white/70">
                      G{pack.summary.green} · A{pack.summary.amber} · R
                      {pack.summary.red} · U{pack.summary.unset}
                    </td>
                    <td className="px-4 py-4 text-white/70">{pack.openActions}</td>
                    <td className="px-4 py-4 text-white/58">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(pack.updatedAt))}
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        className="text-gold-200 underline-offset-2 hover:underline"
                        href={`/self-assessment/${pack.accessToken}/`}
                      >
                        Open pack
                      </Link>
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
