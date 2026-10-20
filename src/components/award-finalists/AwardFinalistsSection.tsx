"use client";

import Link from "@/components/AppLink";
import { CmsImage } from "@/components/cms/CmsImage";
import { MosqueMbaPromo } from "@/components/award-finalists/MosqueMbaPromo";
import {
  SectionAwardsDecor,
  SectionKicker,
} from "@/components/HomeSections";
import { AwardFinalistDisclosureWatermark } from "@/components/award-finalists/AwardFinalistDisclosureWatermark";
import {
  AWARDS_2026_FINALISTS_ANNOUNCE_DATE,
  AWARDS_2026_PREPARE_TO_VOTE_SECTION_ID,
  finalistsPublishedFor2026,
  showFinalistStructurePreview,
} from "@/lib/awards-2026-cycle";
import {
  awardFinalists2026ByCategory,
  finalistDisplayName,
  finalistPublicHref,
  finalistSlotLabel,
  type AwardFinalist2026,
} from "@/lib/awards-2026-finalists";

type SectionTone = "white" | "warm";

function bandClass(tone: SectionTone = "white") {
  return tone === "warm"
    ? "relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:pb-28 md:pt-24"
    : "relative isolate overflow-hidden bg-white px-5 py-20 text-black md:px-8 md:pb-28 md:pt-24";
}

type AwardFinalistsSectionProps = {
  categoryTitle: string;
  title?: string;
  tone?: SectionTone;
  showMosqueMbaPromo?: boolean;
};

function FinalistCard({
  finalist,
  published,
  slot,
}: {
  finalist: AwardFinalist2026;
  published: boolean;
  slot: number;
}) {
  const href = finalistPublicHref(finalist);
  const showIdentity = published && !finalist.identityHidden;
  const name = finalistDisplayName(finalist, published, slot);

  return (
    <Link
      className={[
        "group relative flex h-full flex-col",
        "border border-black/10 bg-[#fbfaf7]",
        "px-6 pb-7 pt-6",
        "transition duration-300",
        "hover:border-gold-400/55 hover:bg-white",
        "hover:shadow-[0_26px_60px_rgba(15,42,34,0.1)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2",
      ].join(" ")}
      href={href}
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-black/8 pb-4">
        <span className="font-black text-[1.65rem] leading-none tracking-[-0.05em] text-emerald-950/18 transition group-hover:text-gold-500/70">
          {finalistSlotLabel(slot)}
        </span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-black/42">
          Shortlist place
        </span>
      </div>

      <div className="relative mx-auto mt-7 w-full">
        {showIdentity ? (
          <div className="relative mx-auto aspect-[0.86] w-full max-w-[220px] overflow-hidden arch-frame border border-black/8 bg-white">
            <div className="arch-frame-inner relative h-full w-full">
              <CmsImage
                alt={finalist.logoAlt}
                className="object-contain p-5 transition duration-500 group-hover:scale-[1.02]"
                fill
                sizes="220px"
                src={finalist.logo}
              />
            </div>
          </div>
        ) : (
          <AwardFinalistDisclosureWatermark />
        )}
      </div>

      <div className="mt-7 flex flex-1 flex-col text-center">
        <h3 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-black">
          {name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-black/55">
          {showIdentity
            ? finalist.summary
            : `Mosque name and crest named on ${AWARDS_2026_FINALISTS_ANNOUNCE_DATE}.`}
        </p>
        <span className="mt-6 inline-flex items-center justify-center gap-2 border-t border-black/8 pt-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-900 transition group-hover:text-gold-700">
          {showIdentity ? "Read profile & vote" : "Hold this shortlist page"}
        </span>
      </div>
    </Link>
  );
}

export function AwardFinalistsSection({
  categoryTitle,
  title,
  tone = "white",
  showMosqueMbaPromo = true,
}: AwardFinalistsSectionProps) {
  const published = finalistsPublishedFor2026();
  const preview = showFinalistStructurePreview();
  const finalists = awardFinalists2026ByCategory[categoryTitle] ?? [];

  if (!preview && !published) {
    return null;
  }

  const sectionTitle = title ?? "The 2026 shortlist";

  return (
    <section
      className={`${bandClass(tone)} scroll-mt-28`}
      id={AWARDS_2026_PREPARE_TO_VOTE_SECTION_ID}
    >
      <SectionAwardsDecor left="Shortlist" right="2026" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>9th Beacon Mosque Awards</SectionKicker>
          <h2 className="section-word-motion mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-black [text-wrap:balance] md:text-5xl">
            {sectionTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-black/58 md:text-[1.05rem]">
            {published && finalists.every((item) => !item.identityHidden) ? (
              <>
                Three mosques shortlisted for {categoryTitle}. Open a profile to
                read their story and cast your public vote.
              </>
            ) : (
              <>
                Three places on the {categoryTitle} shortlist. Mosque names and
                crests are named on{" "}
                <span className="font-semibold text-black/78">
                  {AWARDS_2026_FINALISTS_ANNOUNCE_DATE}
                </span>
                . Open a page now so you can return straight to the vote.
              </>
            )}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {finalists.map((finalist, index) => (
            <div
              className="section-word-motion"
              key={finalist.slug}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <FinalistCard
                finalist={finalist}
                published={published}
                slot={index + 1}
              />
            </div>
          ))}
        </div>

        {showMosqueMbaPromo ? (
          <div className="mt-14">
            <MosqueMbaPromo />
          </div>
        ) : null}
      </div>
    </section>
  );
}
