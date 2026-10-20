import type { Metadata } from "next";
import { AssessmentWorkspace } from "@/components/assessment/AssessmentWorkspace";
import { SiteFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";
import { getAssessmentPackByToken } from "@/lib/assessment";
import { absoluteUrl, siteName } from "@/lib/seo";
import Link from "@/components/AppLink";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { token } = await params;
  const detail = await getAssessmentPackByToken(token);
  const title = detail
    ? `${detail.pack.mosqueName} self-assessment`
    : "Self-assessment pack";
  const description =
    "Private mosque self-assessment pack — RAG scoring, evidence and action plan.";
  const image = absoluteUrl("/assets/hero/awards-2025-poster.jpeg");

  return {
    robots: { index: false, follow: false },
    description,
    openGraph: {
      description,
      images: [{ url: image }],
      siteName,
      title: `${title} - ${siteName}`,
      type: "website",
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
      title: `${title} - ${siteName}`,
    },
  };
}

export default async function SelfAssessmentPackPage({ params }: PageProps) {
  const { token } = await params;
  const detail = await getAssessmentPackByToken(token);

  if (!detail) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-white text-black">
        <section className="border-b border-black/10 bg-[#f3f1ed] px-5 pt-20 pb-6 md:px-8 md:pt-28">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3">
            <Link
              className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55 transition hover:text-black"
              href="/self-assessment/"
            >
              ← All self-assessments
            </Link>
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">
              Keep this URL private
            </p>
          </div>
        </section>
        <section className="px-5 py-10 md:px-8 md:py-14">
          <AssessmentWorkspace initialDetail={detail} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
