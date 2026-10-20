import Link from "@/components/AppLink";
import { AwardFinalistDisclosureWatermark } from "@/components/award-finalists/AwardFinalistDisclosureWatermark";
import { MosqueMbaPromo } from "@/components/award-finalists/MosqueMbaPromo";
import {
  SectionAwardsDecor,
  SectionKicker,
  SiteFooter,
} from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";
import { ButtonLink } from "@/components/ButtonLink";
import { CmsImage } from "@/components/cms/CmsImage";
import {
  AWARDS_2026_FINALISTS_ANNOUNCE_DATE,
  awards2026PrepareToVoteSectionHref,
  finalistsPublishedFor2026,
} from "@/lib/awards-2026-cycle";
import {
  categoryPageHrefForFinalist,
  finalistDisplayName,
  finalistPublicHref,
  finalistSlotLabel,
  getAwardFinalists2026InCategory,
  type AwardFinalist2026,
} from "@/lib/awards-2026-finalists";
import type { InteriorPage as InteriorPageData } from "@/lib/pages";

type AwardFinalist2026DetailPageProps = {
  page: InteriorPageData;
  finalist: AwardFinalist2026;
};

function PeerLink({
  peer,
  published,
  slot,
}: {
  peer: AwardFinalist2026;
  published: boolean;
  slot: number;
}) {
  const showIdentity = published && !peer.identityHidden;

  return (
    <Link
      className={[
        "group grid grid-cols-[auto_1fr_auto] items-center gap-5",
        "border border-black/10 bg-[#fbfaf7] px-5 py-5",
        "transition duration-300",
        "hover:border-gold-400/50 hover:bg-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2",
      ].join(" ")}
      href={finalistPublicHref(peer)}
    >
      <span className="font-black text-2xl tracking-[-0.05em] text-emerald-950/18 group-hover:text-gold-500/70">
        {finalistSlotLabel(slot)}
      </span>
      <span>
        <span className="block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/40">
          Shortlist place
        </span>
        <span className="mt-1 block text-base font-semibold tracking-[-0.02em] text-black">
          {finalistDisplayName(peer, published, slot)}
        </span>
        {!showIdentity ? (
          <span className="mt-1 block text-sm text-black/50">
            Named {AWARDS_2026_FINALISTS_ANNOUNCE_DATE}
          </span>
        ) : null}
      </span>
      <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-emerald-900">
        Open
      </span>
    </Link>
  );
}

export function AwardFinalist2026DetailPage({
  page,
  finalist,
}: AwardFinalist2026DetailPageProps) {
  const published = finalistsPublishedFor2026();
  const showIdentity = published && !finalist.identityHidden;
  const voteEmbedSrc = finalist.voteEmbedSrc;
  const categoryHref = `${categoryPageHrefForFinalist(finalist.categoryTitle)}${awards2026PrepareToVoteSectionHref}`;
  const peersInCategory = getAwardFinalists2026InCategory(finalist.categoryTitle);
  const currentSlot =
    peersInCategory.findIndex((item) => item.slug === finalist.slug) + 1;
  const peers = peersInCategory.filter((item) => item.slug !== finalist.slug);
  const displayName = finalistDisplayName(finalist, published, currentSlot || 1);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#f6f5ef] px-5 pb-20 pt-32 text-black md:px-8 md:pb-24 md:pt-40">
          <SectionAwardsDecor left="Shortlist" right="2026" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-black/45"
            >
              <Link
                className="transition hover:text-emerald-900"
                href="/awards/beacon-mosque-awards-2026/"
              >
                Beacon Mosque Awards 2026
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                className="transition hover:text-emerald-900"
                href={categoryHref}
              >
                {finalist.categoryTitle}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-black/70">{displayName}</span>
            </nav>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-gold-500">
              {showIdentity
                ? page.eyebrow
                : `9th Beacon Mosque Awards · ${finalist.categoryTitle}`}
            </p>

            <h1
              className={[
                "mt-5 max-w-4xl font-black leading-[0.98] tracking-[-0.04em]",
                showIdentity
                  ? "text-4xl md:text-6xl"
                  : "text-5xl md:text-7xl",
              ].join(" ")}
            >
              {showIdentity ? finalist.mosqueName : displayName}
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-black/58">
              {showIdentity
                ? finalist.summary
                : `Place ${finalistSlotLabel(currentSlot || 1)} of three in ${finalist.categoryTitle}. Mosque name, crest and story are named on ${AWARDS_2026_FINALISTS_ANNOUNCE_DATE}.`}
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start lg:gap-12">
              <div className="mx-auto w-full max-w-[320px] lg:mx-0">
                {showIdentity ? (
                  <div className="relative aspect-[0.86] w-full overflow-hidden arch-frame border border-black/8 bg-white shadow-[0_28px_80px_rgba(15,42,34,0.12)]">
                    <div className="arch-frame-inner relative h-full w-full">
                      <CmsImage
                        alt={finalist.logoAlt}
                        className="object-contain p-7"
                        fill
                        priority
                        sizes="(min-width: 1024px) 320px, 82vw"
                        src={finalist.logo}
                      />
                    </div>
                  </div>
                ) : (
                  <AwardFinalistDisclosureWatermark size="profile" />
                )}
              </div>

              <div className="space-y-6 lg:pt-1">
                {showIdentity ? (
                  finalist.description.map((paragraph, index) => (
                    <p
                      className="text-base leading-8 text-black/68 md:text-[1.05rem]"
                      key={index}
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="text-base leading-8 text-black/68 md:text-[1.05rem]">
                      Independent judges will name three mosques in this
                      category. Until announcement day, this page holds your
                      place for the public vote that follows.
                    </p>
                    <p className="text-base leading-8 text-black/68 md:text-[1.05rem]">
                      On {AWARDS_2026_FINALISTS_ANNOUNCE_DATE} the crest and
                      story for this shortlist place will appear here, with the
                      Beacon Mosque Awards vote form beneath.
                    </p>
                    <dl className="grid gap-4 border-y border-black/10 py-5 sm:grid-cols-2">
                      <div>
                        <dt className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/40">
                          Award cycle
                        </dt>
                        <dd className="mt-1.5 text-sm font-semibold text-black">
                          9th Beacon Mosque Awards 2026
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/40">
                          Shortlist place
                        </dt>
                        <dd className="mt-1.5 text-sm font-semibold text-black">
                          {finalistSlotLabel(currentSlot || 1)} of{" "}
                          {peersInCategory.length}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/40">
                          Category
                        </dt>
                        <dd className="mt-1.5 text-sm font-semibold leading-snug text-black [text-wrap:balance]">
                          {finalist.categoryTitle}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/40">
                          Named on
                        </dt>
                        <dd className="mt-1.5 text-sm font-semibold text-black">
                          {AWARDS_2026_FINALISTS_ANNOUNCE_DATE}
                        </dd>
                      </div>
                    </dl>
                  </>
                )}

                <div className="flex flex-wrap gap-3 pt-1">
                  <ButtonLink href={categoryHref} variant="primary">
                    Back to shortlist
                  </ButtonLink>
                  <Link
                    className="inline-flex min-h-12 items-center justify-center border border-black/15 bg-transparent px-5 py-3 text-center text-sm font-semibold text-black transition duration-200 hover:border-black/30 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2"
                    href="/awards/beacon-mosque-awards-2026/"
                  >
                    All 2026 categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showIdentity && finalist.videos.length > 0 ? (
          <section className="relative isolate overflow-hidden bg-white px-5 py-20 text-black md:px-8 md:py-24">
            <SectionAwardsDecor left="Video" right="Shortlist" />
            <div className="relative z-10 mx-auto max-w-[1180px]">
              <SectionKicker>From the shortlist</SectionKicker>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                {finalist.mosqueName} on film
              </h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {finalist.videos.map((video) => (
                  <div key={video.src}>
                    <h3 className="mb-4 text-lg font-semibold text-black">
                      {video.title}
                    </h3>
                    <video
                      className="aspect-video w-full bg-black"
                      controls
                      playsInline
                      preload="metadata"
                      src={video.src}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {peers.length > 0 ? (
          <section className="relative isolate overflow-hidden bg-white px-5 py-16 text-black md:px-8 md:py-20">
            <div className="mx-auto max-w-[1180px]">
              <SectionKicker>{finalist.categoryTitle}</SectionKicker>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
                The other two shortlist places
              </h2>
              <ul className="mt-8 grid gap-4">
                {peers.map((peer) => {
                  const slot =
                    peersInCategory.findIndex((item) => item.slug === peer.slug) +
                    1;
                  return (
                    <li key={peer.slug}>
                      <PeerLink
                        peer={peer}
                        published={published}
                        slot={slot}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}

        <section
          className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-24"
          id="vote"
        >
          <SectionAwardsDecor left="Public" right="Vote" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <SectionKicker>Beacon Mosque Awards vote</SectionKicker>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] [text-wrap:balance] md:text-4xl">
              {showIdentity
                ? `Vote for ${finalist.mosqueName}`
                : "Public vote opens after the shortlist is named"}
            </h2>

            {showIdentity ? (
              <>
                <p className="mt-4 max-w-2xl text-base leading-8 text-black/58">
                  Cast your public vote in {finalist.categoryTitle}. Judges
                  carry the larger weighting; the public vote adds community
                  voice to the final result.
                </p>
                {voteEmbedSrc && !voteEmbedSrc.includes("REPLACE_WITH") ? (
                  <iframe
                    className="mt-8 w-full border border-black/10 bg-white"
                    height={720}
                    src={voteEmbedSrc}
                    title={`Vote for ${finalist.mosqueName}`}
                  />
                ) : (
                  <div className="mt-8 border border-black/12 bg-white px-6 py-12 text-center">
                    <p className="text-base leading-8 text-black/58">
                      The {finalist.categoryTitle} vote form will sit here once
                      Faith Associates publishes the live ballot.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-8 border border-black/10 bg-[#fbfaf7] px-6 py-12 md:px-10 md:py-14">
                <p className="max-w-2xl text-lg font-semibold tracking-[-0.02em] text-black md:text-xl">
                  Voting opens after the shortlist is named on{" "}
                  {AWARDS_2026_FINALISTS_ANNOUNCE_DATE}.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-8 text-black/58">
                  Keep this page. When the mosque for shortlist{" "}
                  {finalistSlotLabel(currentSlot || 1)} is disclosed, the public
                  ballot for {finalist.categoryTitle} will open in this same
                  place.
                </p>
                <div className="mt-8">
                  <ButtonLink href={categoryHref} variant="primary">
                    Return to shortlist
                  </ButtonLink>
                </div>
              </div>
            )}

            <div className="mt-12">
              <MosqueMbaPromo compact />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
