import type { Metadata } from "next";
import { StartAssessmentForm } from "@/components/assessment/StartAssessmentForm";
import { SiteFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl, siteName } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Self-assessment";
  const description =
    "Mosque safeguarding and operations self-assessment — score twelve domains, gather evidence, and track an action plan.";
  const image = absoluteUrl("/assets/hero/awards-2025-poster.jpeg");

  return {
    alternates: { canonical: "/self-assessment/" },
    description,
    openGraph: {
      description,
      images: [{ url: image }],
      siteName,
      title: `${title} - ${siteName}`,
      type: "website",
      url: "/self-assessment/",
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

export default function SelfAssessmentLandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-white text-black">
        <section className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 pt-20 pb-14 md:px-8 md:pt-28 md:pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(215,169,72,0.12),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(39,89,255,0.08),transparent_28%)]" />
          <div className="relative mx-auto max-w-[1180px]">
            <span className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-black/70">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gold-300"
              />
              Governance toolkit
            </span>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-black">
              Mosque self-assessment
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60 md:text-base">
              Trustees appoint four leads. Each lead scores three domains,
              gathers evidence, and feeds one pack. RAG scores drive the action
              plan, trustee review, and quarterly monitoring.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                How the pack works
              </h2>
              <ol className="mt-6 space-y-4">
                {[
                  {
                    step: "01",
                    title: "Score twelve domains",
                    text: "Safeguarding, operations, premises and madrasa/youth leads RAG each area.",
                  },
                  {
                    step: "02",
                    title: "Gather evidence",
                    text: "Use the checklist and notes so trustees can see what sits behind each score.",
                  },
                  {
                    step: "03",
                    title: "Plan and monitor",
                    text: "Generate actions from Red and Amber gaps, then track them through quarterly review.",
                  },
                ].map((item) => (
                  <li className="border border-black/10 bg-[#faf9f6] p-5" key={item.step}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-400">
                      {item.step}
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.02em]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-black/60">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <StartAssessmentForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
