import Link from "next/link";
import { AwardSeal } from "@/components/AwardMotifs";
import { SiteFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";

const recommendedLinks = [
  {
    title: "Beacon Mosque Awards",
    text: "Browse award years, categories, nominations and recognition stories.",
    href: "/awards/",
    meta: "Awards",
  },
  {
    title: "10 Global Standards",
    text: "Explore the quality framework behind Beacon Mosque accreditation.",
    href: "/standards/",
    meta: "Standards",
  },
  {
    title: "Resources",
    text: "Guides, booklets and practical tools for mosque leadership teams.",
    href: "/resources/",
    meta: "Guides",
  },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pattern-dark relative isolate overflow-hidden bg-[linear-gradient(135deg,#071524,#063f35)] px-5 py-20 text-white md:px-8 md:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(216,169,72,0.24),transparent_30%)]" />
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1fr_0.45fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold-200">
                Page not found
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.02] md:text-6xl">
                This Beacon Mosque page is not available
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">
                The route may have moved during the redesign. Continue into the
                awards archive, standards, resources or homepage.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] px-6 py-3 text-sm font-semibold text-emerald-950 shadow-[0_18px_40px_rgba(216,169,72,0.25)]"
                  href="/"
                >
                  Return home
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold-200 hover:bg-white/12"
                  href="/awards/"
                >
                  Explore awards
                </Link>
              </div>
            </div>
            <div className="hidden justify-items-center lg:grid">
              <div className="rounded-lg border border-gold-200/35 bg-navy-950/75 p-8 shadow-2xl backdrop-blur">
                <AwardSeal className="h-36 w-36" />
                <p className="mt-6 text-center text-sm font-bold uppercase tracking-[0.22em] text-gold-200">
                  404
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-cream-100 px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-3">
            {recommendedLinks.map((link) => (
              <Link
                className="group relative block overflow-hidden rounded-lg border border-slate-900/10 bg-white p-7 shadow-[0_12px_32px_rgba(7,21,36,0.06)] transition duration-200 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_24px_60px_rgba(7,21,36,0.14)]"
                href={link.href}
                key={link.href}
              >
                <span className="mb-5 inline-block text-xs font-bold uppercase text-emerald-700">
                  {link.meta}
                </span>
                <h2 className="text-xl font-semibold leading-snug text-slate-950">
                  {link.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {link.text}
                </p>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[linear-gradient(90deg,#d7a948,transparent)] opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
