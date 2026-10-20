import type { Metadata } from "next";
import { CmsContentArchiveSection } from "@/components/HomeSections";
import { SiteFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";
import {
  cmsEntryToArchiveCard,
  listPublishedCmsEntries,
} from "@/lib/cms";
import { absoluteUrl, siteName } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Content archive";
  const description =
    "All published pages and posts created in the Beacon Mosque CMS.";
  const image = absoluteUrl("/assets/hero/awards-2025-poster.jpeg");

  return {
    alternates: {
      canonical: "/content/",
    },
    description,
    openGraph: {
      description,
      images: [{ url: image }],
      siteName,
      title: `${title} - ${siteName}`,
      type: "website",
      url: "/content/",
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

export default async function ContentArchivePage() {
  const cards = (await listPublishedCmsEntries()).map(cmsEntryToArchiveCard);

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-white text-black">
        <section className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 pt-20 pb-14 md:px-8 md:pt-28 md:pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(215,169,72,0.12),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(39,89,255,0.08),transparent_28%)]" />
          <div className="relative mx-auto max-w-[1360px]">
            <span className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-black/70 backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gold-300"
              />
              Content archive
            </span>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-black">
                  Everything published through the CMS
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60 md:text-base">
                  Pages and posts created in the CMS show up here as soon as
                  they are published. Each item also keeps its own public
                  route, so the same content can be reached from the homepage,
                  archive, and direct links.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:justify-self-end lg:w-full lg:max-w-md">
                <div className="rounded-[24px] border border-black/10 bg-white px-5 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.05)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-400">
                    Published items
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black">
                    {cards.length}
                  </p>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white px-5 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.05)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-400">
                    Public routes
                  </p>
                  <p className="mt-3 text-sm leading-7 text-black/60">
                    Pages map to <span className="font-semibold">/slug/</span>.
                    Posts map to <span className="font-semibold">/news/slug/</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CmsContentArchiveSection
          body="Use this archive to confirm that new pages and posts really exist on the public site after you publish them."
          ctaHref="/cms/"
          ctaLabel="Open CMS dashboard"
          entries={cards}
          heading="Published pages and posts"
        />
      </main>
      <SiteFooter />
    </>
  );
}
