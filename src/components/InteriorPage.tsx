import { CmsImage } from "@/components/cms/CmsImage";
import { CmsEditSafeLink } from "@/components/cms/CmsEditSafeLink";
import { EditableGalleryGrid } from "@/components/cms/EditableGalleryGrid";
import Link from "@/components/AppLink";
import {
  accreditedMosques,
  getAwardWinnerRecord2024ByCategory,
  getAwardWinnerRecord2025ByCategory,
  getAwardCategoryMedia,
  standards,
  type CardLink,
} from "@/lib/content";
import type {
  InteriorPage as InteriorPageData,
  PageForm,
  PageSection,
} from "@/lib/pages";
import { ButtonLink } from "@/components/ButtonLink";
import { AutoScrollRail } from "@/components/AutoScrollRail";
import { HomeHeroVideo } from "@/components/HomeHeroVideo";
import {
  SectionAwardsDecor,
  SectionKicker,
  SiteFooter,
} from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";
import { AwardCardAccent, AwardSeal } from "@/components/AwardMotifs";
import { EditableText } from "@/components/visual-editor/EditableText";

type SectionTone = "white" | "warm";

function bandClass(tone: SectionTone = "white") {
  return [
    "relative isolate overflow-hidden px-5 py-20 text-black md:px-8 md:py-28",
    tone === "warm" ? "bg-[#f3f1ed]" : "bg-white",
  ].join(" ");
}

function TextSection({
  currentPath,
  section,
  sectionIndex,
  tone = "white",
}: {
  currentPath?: string;
  section: Extract<PageSection, { kind: "text" }>;
  sectionIndex: number;
  tone?: SectionTone;
}) {
  const hasTitle = Boolean(section.title);
  const isAwards2026Intro =
    currentPath === "/awards/beacon-mosque-awards-2026/" && !hasTitle;
  const basePath = `sections.${sectionIndex}`;

  return (
    <section className={bandClass(tone)}>
      <SectionAwardsDecor
        left={hasTitle ? "Context" : "Beacon"}
        right="Standards"
      />
      {hasTitle ? (
        <div className="relative z-10 mx-auto grid max-w-[980px] gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionKicker>Overview</SectionKicker>
            <EditableText
              as="h2"
              className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl"
              path={`${basePath}.title`}
              value={section.title ?? ""}
            />
          </div>
          <div className="space-y-5 text-base leading-8 text-black/62 md:text-lg md:leading-9">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <EditableText
                as="p"
                key={`${basePath}.paragraphs.${paragraphIndex}`}
                multiline
                path={`${basePath}.paragraphs.${paragraphIndex}`}
                value={paragraph}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={[
            "relative z-10 mx-auto max-w-[980px]",
            isAwards2026Intro
              ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px]"
              : "",
          ].join(" ")}
        >
          <div>
            <SectionKicker>Beacon Mosque</SectionKicker>
            <div className="mt-6 max-w-[860px] space-y-5 text-base leading-8 text-black/62 md:text-lg md:leading-9">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <EditableText
                  as="p"
                  key={`${basePath}.paragraphs.${paragraphIndex}`}
                  multiline
                  path={`${basePath}.paragraphs.${paragraphIndex}`}
                  value={paragraph}
                />
              ))}
            </div>
          </div>
          {isAwards2026Intro ? (
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden border border-black/12 bg-black shadow-[0_20px_56px_rgba(0,0,0,0.1)]">
                <CmsImage
                  alt="9th Beacon Mosque Awards 2026 poster"
                  className="h-auto w-full object-cover"
                  height={1024}
                  priority={false}
                  src="/assets/awards/beacon-mosque-awards-2026-poster.png"
                  width={1024}
                />
              </div>
            </aside>
          ) : null}
        </div>
      )}
    </section>
  );
}

function TextPairSection({
  section,
  sectionIndex,
  tone = "white",
}: {
  section: Extract<PageSection, { kind: "textPair" }>;
  sectionIndex: number;
  tone?: SectionTone;
}) {
  const basePath = `sections.${sectionIndex}`;
  return (
    <section className={bandClass(tone)}>
      <SectionAwardsDecor left="Context" right="Standards" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {section.items.map((item, itemIndex) => (
            <div
              className="grid gap-8 md:grid-cols-[0.82fr_1.18fr] lg:grid-cols-1"
              key={`${basePath}.items.${itemIndex}`}
            >
              <div>
                <SectionKicker>Overview</SectionKicker>
                <EditableText
                  as="h2"
                  className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl"
                  path={`${basePath}.items.${itemIndex}.title`}
                  value={item.title}
                />
              </div>
              <div className="space-y-5 text-base leading-8 text-black/62 md:text-lg md:leading-9">
                {item.paragraphs.map((paragraph, paragraphIndex) => (
                  <EditableText
                    as="p"
                    key={`${basePath}.items.${itemIndex}.paragraphs.${paragraphIndex}`}
                    multiline
                    path={`${basePath}.items.${itemIndex}.paragraphs.${paragraphIndex}`}
                    value={paragraph}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkCard({
  card,
  pathPrefix,
}: {
  card: CardLink;
  pathPrefix?: string;
}) {
  const hasImage = Boolean(card.image);
  const isNominationCard = card.meta === "Nominate";
  const isAwardCategoryCard = /category/i.test(card.meta ?? "");
  const imageFit = card.imageFit ?? "cover";
  const ctaLabel = isNominationCard
    ? "Nominate"
    : isAwardCategoryCard
      ? "View"
      : "Open";
  const className =
    "group block overflow-hidden border-t border-black/14 pt-5 text-black transition hover:text-emerald-700";
  const content = (
    <>
      {hasImage ? (
        <div
          className={[
            "relative mb-5 aspect-[1.45] overflow-hidden",
            imageFit === "contain" ? "bg-[#111]" : "bg-white",
          ].join(" ")}
        >
          <CmsImage
            adjustKey={pathPrefix ? `${pathPrefix}.image` : undefined}
            alt={card.imageAlt ?? ""}
            className={[
              "transition duration-500",
              imageFit === "contain"
                ? "object-contain p-4"
                : "object-cover group-hover:scale-105",
            ].join(" ")}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            src={card.image!}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.38))]" />
          {card.meta && !isNominationCard ? (
            <span className="absolute left-4 top-4 bg-gold-400/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black">
              {pathPrefix ? (
                <EditableText path={`${pathPrefix}.meta`} value={card.meta} />
              ) : (
                card.meta
              )}
            </span>
          ) : null}
          {isNominationCard || isAwardCategoryCard ? (
            <span className="absolute inset-0 z-10 flex items-center justify-center">
              <span className="inline-flex min-h-11 items-center justify-center border border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-black shadow-[0_16px_32px_rgba(215,169,72,0.22)] transition group-hover:bg-[linear-gradient(135deg,#f7e3a8,#c99935)]">
                {ctaLabel}
              </span>
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="relative pb-1">
        <AwardCardAccent className="opacity-35" />
        {!hasImage && card.meta ? (
          <span className="relative z-10 mb-4 inline-block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/42">
            {pathPrefix ? (
              <EditableText path={`${pathPrefix}.meta`} value={card.meta} />
            ) : (
              card.meta
            )}
          </span>
        ) : null}
        {pathPrefix ? (
          <EditableText
            as="h3"
            className="relative z-10 text-lg font-semibold leading-snug tracking-[-0.02em] text-current"
            path={`${pathPrefix}.title`}
            value={card.title}
          />
        ) : (
          <h3 className="relative z-10 text-lg font-semibold leading-snug tracking-[-0.02em] text-current">
            {card.title}
          </h3>
        )}
        {card.text || pathPrefix ? (
          pathPrefix ? (
            <EditableText
              as="p"
              className="relative z-10 mt-3 text-sm leading-7 text-black/58"
              multiline
              path={`${pathPrefix}.text`}
              value={card.text ?? ""}
            />
          ) : (
            <p className="relative z-10 mt-3 text-sm leading-7 text-black/58">
              {card.text}
            </p>
          )
        ) : null}
      </div>
      {isNominationCard || isAwardCategoryCard ? null : (
        <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-black/40 transition group-hover:text-emerald-700">
          {ctaLabel}
        </span>
      )}
    </>
  );

  if (/^https?:\/\//.test(card.href)) {
    return (
      <a
        className={className}
        href={card.href}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  if (/^(mailto:|tel:)/.test(card.href)) {
    return (
      <a className={className} href={card.href}>
        {content}
      </a>
    );
  }

  return (
    <CmsEditSafeLink className={className} href={card.href}>
      {content}
    </CmsEditSafeLink>
  );
}

function StoriesMark() {
  return (
    <div
      className="flex items-center gap-4 text-black/18 md:gap-5"
      aria-hidden="true"
    >
      <AwardSeal className="h-20 w-20 shrink-0 text-black/18 md:h-28 md:w-28" />
      <div className="h-20 w-px bg-black/18 md:h-28" />
      <span className="[writing-mode:vertical-rl] text-[10px] font-semibold uppercase tracking-[0.45em] text-black/24 md:text-xs">
        Stories
      </span>
    </div>
  );
}

function FloralMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-[12rem] w-[9rem] text-black/18 md:h-[15rem] md:w-[11rem]"
      fill="none"
      viewBox="0 0 180 260"
    >
      <path
        d="M99 136C118 95 132 56 126 20C155 33 170 61 166 91C163 117 147 139 125 151"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M95 138C105 105 107 70 94 37C121 45 138 69 140 98C142 120 131 142 115 155"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M90 142C78 108 57 80 24 62C20 91 31 120 52 142C67 156 85 164 102 164"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M89 145C63 134 35 133 10 145C21 171 45 188 73 192C92 195 109 190 123 180"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M96 145C120 153 142 170 155 197C129 205 100 201 78 187C62 177 52 162 49 146"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M101 141C129 137 156 122 177 96C184 123 176 150 157 171C142 188 124 197 106 198"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <ellipse
        cx="95"
        cy="145"
        rx="24"
        ry="20"
        stroke="currentColor"
        strokeWidth="2.8"
      />
      <path d="M95 126V166" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M78 136C87 139 97 141 110 141"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M72 151C87 147 99 146 116 148"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function AwardsSectionHeader({
  title,
  variant,
}: {
  title: string;
  variant: "stories" | "floral";
}) {
  return (
    <div className="mb-10 border-b border-black/14 pb-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <SectionKicker>
            {variant === "stories" ? "Archive" : "Categories"}
          </SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="flex justify-end md:shrink-0">
          {variant === "stories" ? <StoriesMark /> : <FloralMark />}
        </div>
      </div>
    </div>
  );
}

function AwardArchiveEditorialCarousel({
  cards,
  eager = false,
  tone = "light",
}: {
  cards: CardLink[];
  eager?: boolean;
  tone?: "light" | "dark";
}) {
  const archivePreviewByYear: Record<
    string,
    {
      image: string;
      imageAlt: string;
      mediaClassName: string;
      imageClassName?: string;
    }
  > = {
    "2026": {
      image: "/assets/awards/2026/awards-2026-archive.jpg",
      imageAlt: "Beacon Mosque Awards 2026 archive preview",
      mediaClassName: "aspect-[5/4]",
      imageClassName: "object-cover object-center",
    },
    "2025": {
      image: "/assets/awards/2025/awards-2025-01.jpg",
      imageAlt: "Beacon Mosque Awards 2025 archive artwork",
      mediaClassName: "aspect-[5/4]",
      imageClassName: "object-[52%_38%]",
    },
    "2024": {
      image: "/assets/interior/awards-gala.jpg",
      imageAlt: "Beacon Mosque Awards 2024 archive preview",
      mediaClassName: "aspect-[5/4]",
      imageClassName: "object-[50%_32%]",
    },
    "2023": {
      image: "/assets/awards/2023/awards-2023-01.jpg",
      imageAlt: "Beacon Mosque Awards 2023 archive preview",
      mediaClassName: "aspect-[5/4]",
      imageClassName: "object-[50%_24%]",
    },
    "2022": {
      image: "/assets/awards/2022/award-2022-01.jpg",
      imageAlt: "Beacon Mosque Awards 2022 archive preview",
      mediaClassName: "aspect-[5/4]",
      imageClassName: "object-[50%_26%]",
    },
    "2021": {
      image: "/assets/awards/2021/awards-2021-hero.jpg",
      imageAlt: "Beacon Mosque Awards 2021 archive preview",
      mediaClassName: "aspect-[5/4]",
      imageClassName: "object-[50%_20%]",
    },
    "2020": {
      image: "/assets/awards/2020/awards-2020-hero.jpg",
      imageAlt: "Beacon Mosque Awards 2020 archive preview",
      mediaClassName: "aspect-[5/4]",
      imageClassName: "object-[50%_24%]",
    },
    "2019": {
      image: "/assets/accredited/al-manaar.jpg",
      imageAlt: "Beacon Mosque Awards 2019 archive preview",
      mediaClassName: "aspect-[5/4]",
    },
    "2018": {
      image: "/assets/awards/2018/awards-2018-hero.jpg",
      imageAlt: "Beacon Mosque Awards 2018 archive preview",
      mediaClassName: "aspect-[5/4]",
      imageClassName: "object-[50%_22%]",
    },
  };

  const isDark = tone === "dark";
  const waveOffsets = [
    "mt-0",
    "mt-10 md:mt-12",
    "mt-5 md:mt-6",
    "mt-14 md:mt-16",
    "mt-2 md:mt-3",
  ];

  return (
    <AutoScrollRail
      className="no-scrollbar overflow-x-auto overflow-y-hidden"
      contentClassName="flex w-max items-start gap-7 pr-3 md:gap-8 md:pr-4 lg:gap-10 lg:pr-5"
    >
      {cards.map((card, index) => {
        const yearMatch = card.title.match(/(20\d{2})/);
        const year = yearMatch?.[1] ?? card.title;
        const preview = archivePreviewByYear[year] ?? {
          image: "/assets/awards/2025/awards-2025-01.jpg",
          imageAlt: `${card.title} archive preview`,
          mediaClassName: "aspect-[5/4]",
          imageClassName: undefined,
        };

        return (
          <CmsEditSafeLink
            className={[
              "group block w-[17rem] min-w-[17rem] shrink-0 snap-start md:w-[20rem] md:min-w-[20rem] lg:w-[22rem] lg:min-w-[22rem]",
              waveOffsets[index % waveOffsets.length],
            ].join(" ")}
            href={card.href}
            key={`${card.title}-${card.href}-${index}`}
          >
            <div
              className={[
                "relative overflow-hidden",
                isDark ? "bg-white/8" : "bg-[#f3f1ed]",
                preview.mediaClassName,
              ].join(" ")}
            >
              <CmsImage
                adjustKey={`awards-archive:${year}`}
                alt={preview.imageAlt}
                className={[
                  "object-cover transition duration-500 group-hover:scale-[1.035]",
                  preview.imageClassName ?? "",
                ].join(" ")}
                fill
                loading={eager ? "eager" : undefined}
                quality={90}
                sizes="(min-width: 1024px) 352px, (min-width: 768px) 320px, 272px"
                src={preview.image}
              />
            </div>
            <div className="mt-5 flex items-end justify-between gap-5">
              <div>
                <p
                  className={[
                    "text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
                    isDark ? "text-white/48" : "text-black/34",
                  ].join(" ")}
                >
                  Beacon Mosque Awards
                </p>
                <p
                  className={[
                    "mt-2 text-[1.95rem] font-semibold tracking-[-0.04em] md:text-[2.15rem]",
                    isDark ? "text-white" : "text-black",
                  ].join(" ")}
                >
                  {year}
                </p>
              </div>
              <span
                aria-hidden="true"
                className={[
                  "text-3xl leading-none transition-transform group-hover:translate-x-1",
                  isDark ? "text-white/84" : "text-black/88",
                ].join(" ")}
              >
                →
              </span>
            </div>
          </CmsEditSafeLink>
        );
      })}
    </AutoScrollRail>
  );
}

function ResourceLibraryCard({
  card,
  index,
  kind,
}: {
  card: CardLink;
  index: number;
  kind: "publication" | "guide";
}) {
  const isExternal = /^https?:\/\//.test(card.href);
  const actionLabel =
    kind === "publication"
      ? "Open booklet"
      : isExternal
        ? "Open guide"
        : "Read guide";
  const metaLabel =
    card.meta ?? (kind === "publication" ? "Publication" : "Guide");
  const content = (
    <article
      className={[
        "group flex h-full flex-col rounded-[1.6rem] border border-black/10 p-6 shadow-[0_18px_48px_rgba(8,19,31,0.05)] transition duration-300 hover:-translate-y-1 hover:border-black/24 hover:shadow-[0_24px_64px_rgba(8,19,31,0.1)]",
        kind === "publication" ? "bg-[#f7f4ee]" : "bg-white",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-10 min-w-[3rem] items-center justify-center rounded-md border border-gold-300/40 bg-white px-3 text-[0.72rem] font-bold tracking-[0.16em] text-black shadow-[inset_0_-1px_0_rgba(0,0,0,0.03)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-emerald-700">
          {metaLabel}
        </span>
      </div>
      <h3 className="mt-5 text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.03em] text-black">
        {card.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-black/60">{card.text}</p>
      <span className="mt-auto pt-8">
        <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition group-hover:bg-white group-hover:text-black">
          {actionLabel}
        </span>
      </span>
    </article>
  );

  if (isExternal) {
    return (
      <a href={card.href} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return <Link href={card.href}>{content}</Link>;
}

function CardsSection({
  currentPath,
  section,
  sectionIndex = 0,
  tone = "warm",
}: {
  currentPath?: string;
  section: Extract<PageSection, { kind: "cards" }>;
  sectionIndex?: number;
  tone?: SectionTone;
}) {
  const basePath = `sections.${sectionIndex}`;
  const hasImages = section.cards.some((card) => card.image);
  const sectionTitle = section.title ?? "";
  const isHeadOfficeSection = sectionTitle === "Head Office";
  const isAwardCategoriesSection =
    sectionTitle === "Nominate Across Our 10 Award Categories for 2026";
  const isResourcesLibrarySection = sectionTitle === "Booklets and guides";
  const isWinnersArchiveSection =
    currentPath === "/winners/" && sectionTitle === "Awards archive";
  const isWinnerProfilesSection =
    currentPath === "/winners/" && sectionTitle === "2025 winner profiles";
  const isHistoricalWinnersSection =
    currentPath === "/winners/" &&
    /^(2024|2023|2022|2021) winners$/.test(sectionTitle);
  const sectionId =
    (currentPath === "/awards/" && sectionTitle === "Nominate 2026") ||
    (currentPath === "/awards/beacon-mosque-awards-2026/" &&
      sectionTitle === "Nominate Across Our 10 Award Categories for 2026")
      ? "award-categories"
      : undefined;
  const sectionClass = isHeadOfficeSection
    ? "relative isolate overflow-hidden bg-[#f3f1ed] px-5 pb-20 pt-10 text-black md:px-8 md:pb-24 md:pt-14"
    : bandClass(tone);
  const awardsHeaderVariant =
    sectionTitle === "Awards archive"
      ? "stories"
      : isAwardCategoriesSection
        ? "floral"
        : null;
  const resourcePublications = isResourcesLibrarySection
    ? section.cards.filter(
        (card) =>
          /booklet/i.test(card.title) || /booklet/i.test(card.meta ?? ""),
      )
    : [];
  const resourceGuides = isResourcesLibrarySection
    ? Array.from(
        section.cards
          .filter(
            (card) =>
              !(
                /booklet/i.test(card.title) || /booklet/i.test(card.meta ?? "")
              ),
          )
          .reduce((map, card) => {
            const existing = map.get(card.title);
            const prefersCurrent =
              !existing ||
              (!/^https?:\/\//.test(card.href) &&
                /^https?:\/\//.test(existing.href));
            if (prefersCurrent) {
              map.set(card.title, card);
            }
            return map;
          }, new Map<string, CardLink>())
          .values(),
      )
    : [];
  const resourceLibraryItems = isResourcesLibrarySection
    ? [
        ...resourcePublications.map((card) => ({
          card,
          kind: "publication" as const,
        })),
        ...resourceGuides.map((card) => ({
          card,
          kind: "guide" as const,
        })),
      ]
    : [];

  return (
    <section className={sectionClass} id={sectionId}>
      <SectionAwardsDecor left={sectionTitle || "Cards"} right="Explore" />
      <div
        className={
          isWinnersArchiveSection
            ? "relative z-10 w-full"
            : "relative z-10 mx-auto max-w-[1180px]"
        }
      >
        {section.title ? (
          awardsHeaderVariant ? (
            <AwardsSectionHeader
              title={section.title}
              variant={awardsHeaderVariant}
            />
          ) : isAwardCategoriesSection ? (
            <div className="mb-10 max-w-3xl">
              <SectionKicker>Explore</SectionKicker>
              <EditableText
                as="h2"
                className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
                path={`${basePath}.title`}
                value={section.title ?? ""}
              />
            </div>
          ) : (
            <div
              className={
                isHeadOfficeSection ? "mb-10 max-w-2xl" : "mb-10 max-w-xl"
              }
            >
              <SectionKicker>Explore</SectionKicker>
              <EditableText
                as="h2"
                className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
                path={`${basePath}.title`}
                value={section.title ?? ""}
              />
            </div>
          )
        ) : null}
        {sectionTitle === "Awards archive" ? (
          <AwardArchiveEditorialCarousel
            cards={section.cards}
            eager={isWinnersArchiveSection}
          />
        ) : (
          <>
            {isHeadOfficeSection ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {section.cards.map((card) => {
                  const actionLabel =
                    card.meta === "Email"
                      ? "Email us"
                      : card.meta === "Phone"
                        ? "Call office"
                        : card.meta === "Visit"
                          ? "View map"
                          : "Open";
                  const cardClasses =
                    "group flex h-full min-h-[17.5rem] flex-col rounded-[1.6rem] border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(8,19,31,0.05)] transition duration-300 hover:-translate-y-1 hover:border-black/24 hover:shadow-[0_24px_64px_rgba(8,19,31,0.1)]";
                  const content = (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {card.meta ? (
                            <span className="inline-block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-emerald-700">
                              {card.meta}
                            </span>
                          ) : null}
                          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-black">
                            {card.title}
                          </h3>
                        </div>
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-300/35 bg-[#f7f4ee] text-black transition group-hover:border-black group-hover:bg-black group-hover:text-white">
                          <span className="text-lg leading-none">→</span>
                        </span>
                      </div>
                      <p className="mt-5 text-base leading-8 text-black/62">
                        {card.text}
                      </p>
                      <span className="mt-auto pt-8">
                        <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition group-hover:bg-white group-hover:text-black">
                          {actionLabel}
                        </span>
                      </span>
                    </>
                  );

                  if (/^https?:\/\//.test(card.href)) {
                    return (
                      <a
                        className={cardClasses}
                        href={card.href}
                        key={`${card.title}-${card.href}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {content}
                      </a>
                    );
                  }

                  if (/^(mailto:|tel:)/.test(card.href)) {
                    return (
                      <a
                        className={cardClasses}
                        href={card.href}
                        key={`${card.title}-${card.href}`}
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link
                      className={cardClasses}
                      href={card.href}
                      key={`${card.title}-${card.href}`}
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            ) : isResourcesLibrarySection ? (
              <div className="space-y-6">
                <section className="border border-black/10 bg-black p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.14)] md:p-7">
                  <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                    <div>
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-200">
                        Resource library
                      </span>
                      <h3 className="mt-4 text-2xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-[2rem]">
                        Guides, awards booklets and long-form resources in one
                        place
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/68">
                        Browse historic awards publications alongside practical
                        leadership guides for mosque governance, open days,
                        inclusion and long-term planning.
                      </p>
                    </div>
                    <div className="grid gap-3 text-sm text-white/74 sm:grid-cols-3 lg:text-right">
                      <div className="border-t border-white/12 pt-3 sm:border-l sm:border-t-0 sm:pl-4">
                        <span className="block">Awards publications</span>
                        <span className="mt-2 block text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold-200/88">
                          {String(resourcePublications.length).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="border-t border-white/12 pt-3 sm:border-l sm:border-t-0 sm:pl-4">
                        <span className="block">Practical guides</span>
                        <span className="mt-2 block text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold-200/88">
                          {String(resourceGuides.length).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="border-t border-white/12 pt-3 sm:border-l sm:border-t-0 sm:pl-4">
                        <span className="block">Total library items</span>
                        <span className="mt-2 block text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold-200/88">
                          {String(section.cards.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="border border-black/10 bg-white p-5 shadow-[0_18px_48px_rgba(8,19,31,0.04)] md:p-6">
                  <div className="mb-5 flex flex-col gap-3 border-b border-black/10 pb-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-emerald-700">
                        Complete library
                      </span>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-black">
                        Booklets and guides
                      </h3>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-black/58">
                      A single resource grid combining awards publications and
                      practical leadership guides for browsing in one place.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {resourceLibraryItems.map(({ card, kind }, index) => (
                      <ResourceLibraryCard
                        card={card}
                        index={index}
                        key={`${card.title}-${card.href}`}
                        kind={kind}
                      />
                    ))}
                  </div>
                </section>
              </div>
            ) : isAwardCategoriesSection ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {section.cards.map((card, cardIndex) => (
                  <LinkCard card={card} key={`${card.title}-${card.href}-${cardIndex}`} pathPrefix={`${basePath}.cards.${cardIndex}`} />
                ))}
              </div>
            ) : isWinnerProfilesSection || isHistoricalWinnersSection ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {section.cards.map((card, cardIndex) => (
                  <CmsEditSafeLink
                    className="group flex h-full flex-col border border-black/10 bg-white p-4 shadow-[0_18px_48px_rgba(8,19,31,0.04)] transition hover:-translate-y-1 hover:border-black/24 hover:shadow-[0_24px_64px_rgba(8,19,31,0.08)]"
                    href={card.href}
                    key={`${card.title}-${card.href}-${cardIndex}`}
                  >
                    {card.image ? (
                      <div
                        className={[
                          "relative mb-4 aspect-[1.35] overflow-hidden",
                          card.imageFit === "contain" ? "bg-[#111]" : "bg-[#f3f1ed]",
                        ].join(" ")}
                      >
                        <CmsImage
                          adjustKey={`${basePath}.cards.${cardIndex}.image`}
                          alt={card.imageAlt ?? card.title}
                          className={[
                            "transition duration-500",
                            card.imageFit === "contain"
                              ? "object-contain p-4"
                              : "object-cover group-hover:scale-[1.03]",
                          ].join(" ")}
                          fill
                          loading="eager"
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          src={card.image}
                        />
                      </div>
                    ) : null}
                    {card.meta ? (
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-emerald-700">
                        {card.meta}
                      </span>
                    ) : null}
                    <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-black">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-black/58">
                      {card.text}
                    </p>
                    <span className="mt-auto pt-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black/42 transition group-hover:text-emerald-700">
                      Open
                    </span>
                  </CmsEditSafeLink>
                ))}
              </div>
            ) : (
              <div
                className={[
                  "grid gap-5",
                  hasImages
                    ? "grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    : "md:grid-cols-2 xl:grid-cols-3",
                ].join(" ")}
              >
                {section.cards.map((card, cardIndex) => (
                  <LinkCard card={card} key={`${card.title}-${card.href}-${cardIndex}`} pathPrefix={`${basePath}.cards.${cardIndex}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function WordPressSection({
  section,
}: {
  section: Extract<PageSection, { kind: "wordpress" }>;
}) {
  return (
    <section className={bandClass("white")}>
      <SectionAwardsDecor left="Archive" right="Content" />
      <div
        className="wordpress-content relative z-10 mx-auto max-w-[1180px]"
        dangerouslySetInnerHTML={{ __html: section.html }}
      />
    </section>
  );
}

function AwardHistorySection({
  section,
  sectionIndex,
  tone = "white",
}: {
  section: Extract<PageSection, { kind: "awardHistory" }>;
  sectionIndex: number;
  tone?: SectionTone;
}) {
  const basePath = `sections.${sectionIndex}`;
  return (
    <section className={bandClass(tone)}>
      <SectionAwardsDecor left="History" right="Winners" />
      <div className="relative z-10 mx-auto max-w-[980px]">
        <div className="mb-10 max-w-2xl">
          <SectionKicker>History</SectionKicker>
          <EditableText
            as="h2"
            className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
            path={`${basePath}.title`}
            value={section.title}
          />
        </div>
        <div className="border-t border-black/14">
          {section.items.map((item, itemIndex) => (
            <article
              className="grid gap-4 border-b border-black/10 py-6 md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-start md:gap-6"
              key={`${item.year}-${item.winner}-${itemIndex}`}
            >
              <EditableText
                as="p"
                className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-emerald-700"
                path={`${basePath}.items.${itemIndex}.year`}
                value={item.year}
              />
              <div>
                <EditableText
                  as="h3"
                  className="text-lg font-semibold leading-snug tracking-[-0.02em] text-black"
                  path={`${basePath}.items.${itemIndex}.winner`}
                  value={item.winner}
                />
                {item.supportingText ? (
                  <EditableText
                    as="p"
                    className="mt-2 text-sm leading-7 text-black/58"
                    multiline
                    path={`${basePath}.items.${itemIndex}.supportingText`}
                    value={item.supportingText}
                  />
                ) : null}
              </div>
              {item.href ? (
                <a
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-black/44 transition hover:text-emerald-700"
                  href={item.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Website
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function shouldUseMediaLinkFallback(src: string) {
  try {
    return new URL(src).hostname.endsWith("fbcdn.net");
  } catch {
    return false;
  }
}

function MediaLinkFallback({ href }: { href: string }) {
  return (
    <div className="flex aspect-video items-center justify-center bg-black p-6 text-center text-white">
      <a
        className="border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-gold-200 transition hover:bg-white hover:text-black"
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        Open original media
      </a>
    </div>
  );
}

export function MediaSection({
  section,
  sectionIndex = 0,
}: {
  section: Extract<PageSection, { kind: "media" }>;
  sectionIndex?: number;
}) {
  const basePath = `sections.${sectionIndex}`;
  return (
    <section className={bandClass("warm")}>
      <SectionAwardsDecor left="Media" right="Archive" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        {section.title ? (
          <div className="mb-10 max-w-xl">
            <SectionKicker>Media</SectionKicker>
            <EditableText
              as="h2"
              className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
              path={`${basePath}.title`}
              value={section.title}
            />
            {section.text ? (
              <EditableText
                as="p"
                className="mt-5 text-sm leading-7 text-black/58"
                multiline
                path={`${basePath}.text`}
                value={section.text}
              />
            ) : null}
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item) => (
            <figure
              className="overflow-hidden border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
              key={`${item.type}-${item.src}`}
            >
              {item.type === "image" &&
              !shouldUseMediaLinkFallback(item.src) ? (
                <CmsImage
                  alt={item.alt ?? item.caption ?? ""}
                  className="aspect-[1.35] w-full bg-navy-950 object-contain"
                  height={720}
                  sizes={
                    item.sizes ??
                    "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  }
                  src={item.src}
                  unoptimized={item.src.toLowerCase().endsWith(".svg")}
                  width={960}
                />
              ) : null}
              {item.type === "image" && shouldUseMediaLinkFallback(item.src) ? (
                <MediaLinkFallback href={item.src} />
              ) : null}
              {item.type === "video" ? (
                <video
                  className="aspect-video w-full bg-navy-950 object-contain"
                  controls
                  playsInline
                  poster={item.poster}
                  preload="metadata"
                >
                  {(item.sources?.length ? item.sources : [item.src]).map(
                    (source) => (
                      <source key={source} src={source} />
                    ),
                  )}
                  <a
                    className="font-semibold text-emerald-800 underline"
                    href={item.src}
                  >
                    Open video
                  </a>
                </video>
              ) : null}
              {item.type === "embed" && item.trustedEmbed ? (
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="aspect-video w-full bg-navy-950"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={item.src}
                  title={item.caption ?? "Embedded media"}
                />
              ) : null}
              {item.type === "link" ||
              (item.type === "embed" && !item.trustedEmbed) ? (
                <MediaLinkFallback href={item.src} />
              ) : null}
              {item.caption || item.alt ? (
                <figcaption className="border-t border-black/10 bg-white p-5 text-sm leading-6 text-black/58">
                  {item.caption || item.alt}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({
  currentPath,
  section,
  sectionIndex = 0,
}: {
  currentPath?: string;
  section: Extract<PageSection, { kind: "gallery" }>;
  sectionIndex?: number;
}) {
  const basePath = `sections.${sectionIndex}`;
  const isWinnersGalleryPage = currentPath === "/winners/";
  const galleryArchiveYear = section.title?.match(/\b(20\d{2})\b/u)?.[1];
  const galleryDescription = isWinnersGalleryPage
    ? `Official winner posters from the Beacon Mosque Awards ${galleryArchiveYear ?? "archive"} archive.`
    : "Visual moments from the Beacon Mosque public archive.";

  return (
    <section className={bandClass("warm")}>
      <SectionAwardsDecor left="Gallery" right="Moments" />
      <div
        className={
          isWinnersGalleryPage
            ? "relative z-10 mx-auto max-w-[1480px]"
            : "relative z-10 mx-auto max-w-[1180px]"
        }
      >
        {section.title ? (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <SectionKicker>Gallery</SectionKicker>
            <EditableText
              as="h2"
              className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
              path={`${basePath}.title`}
              value={section.title ?? ""}
            />
            <p className="mt-5 text-sm leading-7 text-black/58">
              {galleryDescription}
            </p>
          </div>
        ) : null}
        <EditableGalleryGrid
          images={section.images}
          isWinnersGalleryPage={isWinnersGalleryPage}
          routeSlug={currentPath?.replace(/^\/|\/$/g, "") || "page"}
          sectionIndex={sectionIndex}
        />
      </div>
    </section>
  );
}

function AudioSection({
  currentPath,
  section,
  sectionIndex = 0,
}: {
  currentPath?: string;
  section: Extract<PageSection, { kind: "audio" }>;
  sectionIndex?: number;
}) {
  const basePath = `sections.${sectionIndex}`;
  const isResourcesPage = currentPath === "/resources/";
  const decorLeft = isResourcesPage ? "Resources" : "Training";
  const decorRight = isResourcesPage ? "Audio" : "Resources";
  const kicker = isResourcesPage ? "Audio resources" : "Training audio";
  const followUpCopy = isResourcesPage
    ? "Use these audio sessions as part of the wider Beacon Mosque resource library covering long-term planning, spirituality, safety and sustainable mosque development."
    : "Listen through the 30 year plan themes as a structured training sequence covering vision, spirituality, safety and long-term sustainability.";
  const asideLabel = isResourcesPage ? "Audio library" : "Training sequence";

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left={decorLeft} right={decorRight} />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-10 border-b border-black/12 pb-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="max-w-xl">
            <SectionKicker>{kicker}</SectionKicker>
            <EditableText
              as="h2"
              className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
              path={`${basePath}.title`}
              value={section.title}
            />
          </div>
          <div className="space-y-5 text-base leading-8 text-black/62 md:text-lg md:leading-9">
            {section.text ? (
              <EditableText
                as="p"
                multiline
                path={`${basePath}.text`}
                value={section.text}
              />
            ) : null}
            <p>{followUpCopy}</p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:items-start">
          <aside className="border border-black/10 bg-black p-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.14)] md:p-8">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-200">
              {asideLabel}
            </span>
            <h3 className="mt-5 text-3xl font-semibold leading-[1.02] tracking-[-0.04em]">
              Four audio sessions for mosque leadership teams
            </h3>
            <p className="mt-5 text-sm leading-7 text-white/68">
              Use these sessions in board meetings, volunteer inductions or
              planning workshops to anchor conversations in Beacon Mosque’s
              longer-term direction.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/74">
              {section.items.map((item, index) => (
                <div
                  className="flex items-center justify-between border-t border-white/12 pt-3"
                  key={item.src}
                >
                  <span>{item.title}</span>
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-200/88">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </aside>
          <div className="grid gap-5 md:grid-cols-2">
            {section.items.map((item, index) => (
              <article
                className="flex h-full flex-col justify-between border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(8,19,31,0.06)]"
                key={item.src}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-gold-300/50 bg-[#f7f1df] text-[0.72rem] font-bold tracking-[0.16em] text-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-emerald-700">
                      30 year plan
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-black">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-black/58">
                    {item.subtitle}
                  </p>
                </div>
                <div className="mt-8 border-t border-black/10 pt-5">
                  <audio className="w-full" controls preload="none">
                    <source src={item.src} type="audio/mp4" />
                    <a
                      className="font-semibold text-emerald-800 underline"
                      href={item.src}
                    >
                      Open audio resource
                    </a>
                  </audio>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StandardCardIcon({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (title) {
    case "Management & Governance":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <path d="M12 3 4 7v5c0 4.2 3 7.7 8 9 5-1.3 8-4.8 8-9V7l-8-4Z" />
          <path d="M9.5 11.5h5M9.5 14.5h5" />
        </svg>
      );
    case "Policies & Procedures":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <path d="M8 3.5h6l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 20V5a1.5 1.5 0 0 1 1-1.4Z" />
          <path d="M14 3.5V8h4" />
          <path d="m9.5 13 1.7 1.7 3.3-3.4" />
        </svg>
      );
    case "Facilities Management":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <path d="M4 20h16" />
          <path d="M6 20V8l6-4 6 4v12" />
          <path d="M10 12h4M10 16h4" />
        </svg>
      );
    case "Staffing & Employment":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M3.5 19c.8-2.5 2.7-4 4.5-4s3.7 1.5 4.5 4" />
          <path d="M11.5 19c.8-2.5 2.7-4 4.5-4s3.7 1.5 4.5 4" />
        </svg>
      );
    case "Financing & Fundraising":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <path d="M5 18h14" />
          <path d="M7.5 15V9M12 15V6M16.5 15v-3" />
          <path d="m6 7 3.5-2 3 2 5.5-3" />
        </svg>
      );
    case "Community Development":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M5 19c.7-2.2 2.2-3.5 3.8-3.5S11.9 16.8 13 19" />
          <path d="M11 19c.7-2.2 2.2-3.5 3.8-3.5S17.9 16.8 19 19" />
        </svg>
      );
    case "Accountability & Transparency":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <path d="M2.5 12s3.5-5.5 9.5-5.5S21.5 12 21.5 12s-3.5 5.5-9.5 5.5S2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "Additional Services":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <path d="M12 5v14M5 12h14" />
          <path d="M7.5 7.5h9v9h-9Z" />
        </svg>
      );
    case "Madrassah":
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <path d="M4 6.5c2.6-1.5 5-2.2 8-2.2s5.4.7 8 2.2v11c-2.6-1.5-5-2.2-8-2.2s-5.4.7-8 2.2Z" />
          <path d="M12 4.3v13" />
        </svg>
      );
    default:
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          {...shared}
        >
          <path d="M4 7.5h16M4 12h10M4 16.5h16" />
          <path d="M17 10.5 20 12l-3 1.5" />
        </svg>
      );
  }
}

function StandardsLandingPage({ page }: { page: InteriorPageData }) {
  const standardsSectionId = "standards-grid";
  const standardsOrder = [
    "Management & Governance",
    "Policies & Procedures",
    "Facilities Management",
    "Staffing & Employment",
    "Financing & Fundraising",
    "Community Development",
    "Accountability & Transparency",
    "Additional Services",
    "Madrassah",
    "Communication",
  ];
  const orderedStandards = standardsOrder
    .map((title) => standards.find((item) => item.title === title))
    .filter((item): item is (typeof standards)[number] => Boolean(item));
  const standardTones = [
    "bg-[#4c6ef5]",
    "bg-[#12b886]",
    "bg-[#7950f2]",
    "bg-[#fd7e14]",
    "bg-[#e03131]",
    "bg-[#1c7ed6]",
    "bg-[#0ca678]",
    "bg-[#ae3ec9]",
    "bg-[#f59f00]",
    "bg-[#1098ad]",
  ];
  const heroIconTones = standardTones.slice(0, 6);
  const heroIcons = orderedStandards.slice(0, 6).map((standard, index) => ({
    ...standard,
    tone: heroIconTones[index] ?? "bg-[#4c6ef5]",
  }));
  const pathwaySteps = [
    {
      step: "01",
      title: "Review the framework",
      text: "Explore all ten standards and understand what excellence looks like in practice.",
    },
    {
      step: "02",
      title: "Gather evidence",
      text: "Map your mosque's current systems, policies and community impact against each standard.",
    },
    {
      step: "03",
      title: "Pursue accreditation",
      text: "Work with Beacon Mosque toward a clear 3, 4 or 5-star accreditation pathway.",
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="bg-white text-black">
        <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-[#040816] px-5 pb-10 pt-28 text-white md:px-8 md:pb-12 md:pt-32">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,18,0.92),rgba(3,6,18,0.82)_45%,rgba(3,6,18,0.9)),radial-gradient(circle_at_18%_20%,rgba(39,89,255,0.12),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(10,42,146,0.12),transparent_26%),linear-gradient(180deg,rgba(1,4,14,0.2),rgba(1,4,14,0.72))]" />
          <div className="absolute inset-0 opacity-[0.12]" aria-hidden="true">
            <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0,transparent_46%,rgba(240,201,106,0.22)_46%,rgba(240,201,106,0.22)_54%,transparent_54%,transparent_100%),linear-gradient(0deg,transparent_0,transparent_46%,rgba(240,201,106,0.18)_46%,rgba(240,201,106,0.18)_54%,transparent_54%,transparent_100%)] bg-[length:96px_96px]" />
          </div>
          <SectionAwardsDecor
            left="Standards"
            right="Accreditation"
            tone="dark"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1240px]">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <div className="max-w-2xl">
                <SectionKicker>Standards</SectionKicker>
                <EditableText
                  as="h1"
                  className="section-word-motion mt-3 max-w-4xl text-[2.6rem] font-black leading-[0.96] tracking-[-0.05em] md:mt-4 md:text-[3.6rem]"
                  path="title"
                  value={page.title}
                />
                <p className="mt-3 max-w-xl text-base font-medium text-sky-100 md:mt-4 md:text-xl">
                  10 Global Standards to make a Beacon Mosque
                </p>
                <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
                  <ButtonLink href={`#${standardsSectionId}`}>
                    Explore Standards
                  </ButtonLink>
                  <ButtonLink
                    href="/standards/accreditation/"
                    variant="secondary"
                  >
                    About Accreditation
                  </ButtonLink>
                </div>
              </div>
              <div
                aria-label="Beacon Mosque standards icons"
                className="mx-auto hidden w-full max-w-[28rem] grid-cols-3 gap-5 lg:grid"
              >
                {heroIcons.map((item) => (
                  <Link
                    className="group flex aspect-square flex-col items-center justify-center rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-gold-300/40 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-gold-300/70"
                    href={item.href}
                    key={item.title}
                    title={item.title}
                  >
                    <span
                      className={[
                        "flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-full text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition duration-300 group-hover:scale-105",
                        item.tone,
                      ].join(" ")}
                    >
                      <StandardCardIcon
                        className="h-8 w-8"
                        title={item.title}
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden border-b border-black/8 bg-[#f8f9fb] px-5 py-16 md:px-8 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(216,169,72,0.1),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(28,126,214,0.06),transparent_26%)]" />
          <div className="relative z-10 mx-auto grid w-full max-w-[1240px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-400">
                The framework
              </p>
              <p className="mt-4 text-[5.5rem] font-black leading-none tracking-[-0.08em] text-[#040816] md:text-[7rem]">
                10
              </p>
              <p className="mt-3 text-lg font-medium text-black/55 md:text-xl">
                Global standards. One clear pathway.
              </p>
            </div>
            <div className="max-w-2xl">
              <h2 className="section-word-motion text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-[2.6rem]">
                A practical quality system for mosque leadership teams
              </h2>
              <EditableText
                as="p"
                className="mt-5 text-base leading-8 text-black/62 md:text-[1.05rem] md:leading-9"
                multiline
                path="intro"
                value={page.intro}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Governance", detail: "Leadership & trust" },
                  { label: "Operations", detail: "Systems & delivery" },
                  { label: "Community", detail: "Service & impact" },
                ].map((item) => (
                  <div
                    className="border-t border-black/12 pt-4"
                    key={item.label}
                  >
                    <p className="text-sm font-semibold tracking-[-0.02em] text-black">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-black/48">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden bg-white px-5 py-20 md:px-8 md:py-28"
          id={standardsSectionId}
        >
          <SectionAwardsDecor left="Directory" right="Standards" />
          <div className="relative z-10 mx-auto w-full max-w-[1240px]">
            <div className="mb-12 flex flex-col gap-4 border-b border-black/10 pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <SectionKicker>All standards</SectionKicker>
                <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">
                  Explore each standard in detail
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-black/52 md:text-right md:text-base md:leading-8">
                Select a standard to review expectations, evidence themes and
                how it supports Beacon Mosque accreditation.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {orderedStandards.map((standard, index) => {
                const tone = standardTones[index] ?? "bg-[#4c6ef5]";
                return (
                  <Link
                    className="group relative flex min-h-[11.5rem] gap-5 overflow-hidden rounded-[1.4rem] border border-black/8 bg-[#fbfbfc] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:bg-white hover:shadow-[0_20px_48px_rgba(8,19,31,0.08)] focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 md:p-7"
                    href={standard.href}
                    key={standard.title}
                  >
                    <div className="flex shrink-0 flex-col items-center gap-3">
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={[
                          "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_24px_rgba(8,19,31,0.16)] transition duration-300 group-hover:scale-105",
                          tone,
                        ].join(" ")}
                      >
                        <StandardCardIcon
                          className="h-7 w-7"
                          title={standard.title}
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[1.2rem] font-semibold leading-tight tracking-[-0.03em] text-black md:text-[1.35rem]">
                          {standard.title}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 transition duration-300 group-hover:border-gold-400 group-hover:bg-gold-300 group-hover:text-black"
                        >
                          →
                        </span>
                      </div>
                      <p className="mt-3 text-[0.95rem] leading-7 text-black/58 md:leading-8">
                        {standard.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#070b16] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(215,169,72,0.12),transparent_28%),radial-gradient(circle_at_90%_30%,rgba(39,89,255,0.12),transparent_24%)]" />
          <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
            <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0,transparent_46%,rgba(240,201,106,0.2)_46%,rgba(240,201,106,0.2)_54%,transparent_54%),linear-gradient(0deg,transparent_0,transparent_46%,rgba(240,201,106,0.14)_46%,rgba(240,201,106,0.14)_54%,transparent_54%)] bg-[length:88px_88px]" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1240px]">
            <div className="mb-12 max-w-2xl md:mb-16">
              <SectionKicker>Accreditation pathway</SectionKicker>
              <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                From review to recognition in three clear stages
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/68 md:text-lg md:leading-9">
                Use the standards as a working guide, then move into the
                accreditation process with confidence and evidence.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3 md:gap-5">
              {pathwaySteps.map((item) => (
                <div
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-6 md:p-7"
                  key={item.step}
                >
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-200">
                    Step {item.step}
                  </p>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-white md:text-[1.35rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/62 md:text-[0.98rem] md:leading-8">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-10 md:mt-14">
              <ButtonLink href="/accreditation-process/">
                Start Your Beacon Mosque Journey
              </ButtonLink>
              <ButtonLink href="/contact-us/" variant="secondary">
                Speak to the team
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function TrainingLandingPage({ page }: { page: InteriorPageData }) {
  const introSection = page.sections.find(
    (section): section is Extract<PageSection, { kind: "text" }> =>
      section.kind === "text",
  );
  const audioSection = page.sections.find(
    (section): section is Extract<PageSection, { kind: "audio" }> =>
      section.kind === "audio",
  );
  const serviceCards = [
    {
      title: "Mosque MBA leadership pathway",
      text: "A professional development route for mosque founders, executives, trustees and volunteers shaping stronger institutions.",
      href: "https://mosque.mba/",
      image: page.image ?? "/assets/home/mosque-mba-programme.png",
      imageAlt: page.imageAlt ?? "Mosque MBA programme visual",
      external: true,
    },
    {
      title: "Beacon Mosque audio training",
      text:
        audioSection?.text ??
        "Structured audio sessions on long-term vision, spirituality, safety and sustainability for leadership teams.",
      href: "#training-resources",
      image: "/assets/cards/training-card.png",
      imageAlt: "Beacon Mosque training and leadership support",
      external: false,
    },
    {
      title: "Governance and service guides",
      text: "Practical materials for trustees, managers, imams, staff and volunteers improving delivery and long-term planning.",
      href: "/resources/",
      image: "/assets/interior/standards-wide.jpg",
      imageAlt: "Beacon Mosque standards graphic",
      external: false,
    },
  ];

  const networkTiles = [
    {
      title: "Mosque MBA",
      href: "https://mosque.mba/",
      image: "/assets/home/mosque-mba-programme.png",
      imageAlt: "Mosque MBA programme visual",
      imageWrapperClassName: "h-28",
      imageClassName: "scale-[1.2]",
      external: true,
    },
    {
      title: "Mosque Expo",
      href: "https://mosqueexpo.com/",
      image: "/wp-content/uploads/2025/12/Original.png",
      imageAlt: "Mosque Expo 2026 logo",
      imageWrapperClassName: "h-28",
      imageClassName: "scale-[1.04]",
      external: true,
    },
    {
      title: "Mosque Security",
      href: "https://www.mosquesecurity.com/",
      image: "/assets/network/mosque-security-logo.png",
      imageAlt: "Mosque Security logo",
      imageWrapperClassName: "h-28",
      imageClassName: "scale-[1.04]",
      external: true,
    },
    {
      title: "Beacon Awards",
      href: "/awards/",
      image: "/assets/awards/bm-awards-gold.png",
      imageAlt: "Beacon Mosque Awards gold mark",
      external: false,
    },
    {
      title: "Faith Associates Academy",
      href: "/contact-us/",
      image: "/assets/cards/training-card.png",
      imageAlt: "Beacon Mosque training and leadership support",
      external: false,
    },
  ];

  const remainingSections = page.sections.filter(
    (section) => section.kind !== "text",
  );

  return (
    <>
      <SiteHeader />
      <main className="bg-white text-black">
        <section className="relative isolate overflow-hidden bg-[#05070a] px-5 pt-24 text-white md:px-8 md:pt-28">
          <div className="absolute inset-0">
            <CmsImage
              alt="Beacon Mosque training session"
              className="object-cover opacity-30"
              fill
              priority
              sizes="100vw"
              src="/assets/interior/awards-gala.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.42),rgba(5,7,10,0.68)_36%,rgba(5,7,10,0.94))]" />
          </div>
          <SectionAwardsDecor left="Training" right="Leadership" tone="dark" />
          <div className="relative z-10 mx-auto max-w-[1240px] py-18 md:py-22">
            <div className="flex min-h-[16rem] items-end justify-center text-center">
              <div className="max-w-3xl">
                <SectionKicker>{page.eyebrow ?? "Training"}</SectionKicker>
                <EditableText
                  as="h1"
                  className="section-word-motion mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-[4.1rem]"
                  path="title"
                  value={page.title}
                />
                <EditableText
                  as="p"
                  className="mt-5 text-base leading-8 text-white/76 md:text-lg md:leading-9"
                  multiline
                  path="intro"
                  value={page.intro}
                />
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  {page.ctas?.map((cta) => (
                    <ButtonLink
                      href={cta.href}
                      key={cta.href}
                      variant={cta.variant ?? "primary"}
                    >
                      {cta.label}
                    </ButtonLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-white px-5 py-20 md:px-8 md:py-24">
          <SectionAwardsDecor left="Services" right="Training" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div>
                <SectionKicker>Services</SectionKicker>
                <h2 className="section-word-motion mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">
                  Supporting mosque teams through practical leadership and
                  development
                </h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-black/64 md:text-lg md:leading-9">
                {introSection?.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {serviceCards.map((card) => {
                const content = (
                  <>
                    <div className="relative min-h-[31rem] overflow-hidden md:min-h-[33rem]">
                      <CmsImage
                        alt={card.imageAlt}
                        className="object-cover transition duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
                        src={card.image}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.06),rgba(5,7,10,0.28)_42%,rgba(5,7,10,0.88))]" />
                      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(5,7,10,0),rgba(5,7,10,0.9)_22%,rgba(5,7,10,0.96))] px-6 pb-7 pt-16 text-white">
                        <h3 className="max-w-[14rem] text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] md:max-w-[15rem]">
                          {card.title}
                        </h3>
                        <p className="mt-3 max-w-[17rem] text-sm leading-7 text-white/78 md:max-w-[18rem]">
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </>
                );

                const className =
                  "group overflow-hidden rounded-[1.6rem] border border-black/10 bg-black shadow-[0_22px_70px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(0,0,0,0.22)]";

                return card.external ? (
                  <a
                    className={className}
                    href={card.href}
                    key={card.title}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                ) : (
                  <Link className={className} href={card.href} key={card.title}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden bg-[#f8f4ec] px-5 py-18 md:px-8 md:py-22"
          id="training-resources"
        >
          <SectionAwardsDecor left="Network" right="Academy" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {networkTiles.map((tile) => {
                const tileContent = (
                  <div className="flex h-full flex-col items-center justify-center gap-5 rounded-[1.4rem] border border-black/10 bg-white px-6 py-8 text-center shadow-[0_18px_54px_rgba(8,19,31,0.06)]">
                    <div
                      className={[
                        "relative flex h-24 w-full items-center justify-center overflow-hidden",
                        tile.imageWrapperClassName,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <CmsImage
                        alt={tile.imageAlt}
                        className={["object-contain", tile.imageClassName]
                          .filter(Boolean)
                          .join(" ")}
                        fill
                        sizes="220px"
                        src={tile.image}
                      />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-black/72">
                      {tile.title}
                    </p>
                  </div>
                );

                return tile.external ? (
                  <a
                    className="transition hover:-translate-y-1"
                    href={tile.href}
                    key={tile.title}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {tileContent}
                  </a>
                ) : (
                  <Link
                    className="transition hover:-translate-y-1"
                    href={tile.href}
                    key={tile.title}
                  >
                    {tileContent}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {remainingSections.map((section, index) => (
          <RenderSection
            currentPath={`/${page.slug}/`}
            index={index + 1}
            key={`${section.kind}-${index}`}
            section={section}
          />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}

function ResourcesLandingPage({ page }: { page: InteriorPageData }) {
  const audioSection = page.sections.find(
    (section): section is Extract<PageSection, { kind: "audio" }> =>
      section.kind === "audio",
  );
  const librarySection = page.sections.find(
    (section): section is Extract<PageSection, { kind: "cards" }> =>
      section.kind === "cards",
  );

  const resourcePublications =
    librarySection?.cards.filter(
      (card) => /booklet/i.test(card.title) || /booklet/i.test(card.meta ?? ""),
    ) ?? [];
  const resourceGuides =
    librarySection?.cards.filter(
      (card) =>
        !(/booklet/i.test(card.title) || /booklet/i.test(card.meta ?? "")),
    ) ?? [];

  const overviewCards = [
    {
      label: "Audio resources",
      title: "30 year plan sessions",
      text: "Structured audio materials covering vision, spirituality, safety and sustainability for mosque leadership teams.",
      value: String(audioSection?.items.length ?? 0).padStart(2, "0"),
      href: "/resources/#audio-library",
    },
    {
      label: "Awards publications",
      title: "Historic programme booklets",
      text: "Annual Beacon Mosque Awards booklets collected in one place for archive reference and programme review.",
      value: String(resourcePublications.length).padStart(2, "0"),
      href: "/resources/#resource-library",
    },
    {
      label: "Practical guides",
      title: "Leadership and governance tools",
      text: "Guides for open days, inclusion, management, long-term planning and stronger mosque service delivery.",
      value: String(resourceGuides.length).padStart(2, "0"),
      href: "/resources/#resource-library",
    },
  ];

  const featuredResources = [
    resourcePublications[0],
    resourceGuides[0],
    resourceGuides[1],
  ].filter((card): card is CardLink => Boolean(card));

  return (
    <>
      <SiteHeader />
      <main className="bg-white text-black">
        <section className="relative isolate overflow-hidden bg-[#05070a] px-5 pb-18 pt-28 text-white md:px-8 md:pb-22 md:pt-34">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.96),rgba(5,7,10,0.84)_44%,rgba(5,7,10,0.92)),radial-gradient(circle_at_16%_18%,rgba(215,169,72,0.12),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(32,83,170,0.14),transparent_26%)]" />
          <SectionAwardsDecor left="Resources" right="Library" tone="dark" />
          <div className="relative z-10 mx-auto max-w-[1240px]">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-end">
              <div className="max-w-3xl">
                <SectionKicker>{page.eyebrow ?? "Resources"}</SectionKicker>
                <EditableText
                  as="h1"
                  className="section-word-motion mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-[4.2rem]"
                  path="title"
                  value={page.title}
                />
                <EditableText
                  as="p"
                  className="mt-7 text-base leading-8 text-white/76 md:text-lg md:leading-9"
                  multiline
                  path="intro"
                  value={page.intro}
                />
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href="/resources/#resource-library">
                    Browse resource library
                  </ButtonLink>
                  <ButtonLink
                    href="/resources/#audio-library"
                    variant="secondary"
                  >
                    Listen to audio resources
                  </ButtonLink>
                </div>
              </div>

              <div className="grid gap-4 rounded-[2rem] border border-white/12 bg-white/6 p-6 backdrop-blur-sm md:p-7">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="border border-white/10 bg-black/20 px-4 py-5">
                    <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                      {String(resourcePublications.length).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200/86">
                      Publications
                    </p>
                  </div>
                  <div className="border border-white/10 bg-black/20 px-4 py-5">
                    <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                      {String(resourceGuides.length).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200/86">
                      Guides
                    </p>
                  </div>
                  <div className="border border-white/10 bg-black/20 px-4 py-5">
                    <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                      {String(audioSection?.items.length ?? 0).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200/86">
                      Audio sessions
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold-200">
                    Featured resources
                  </p>
                  <div className="mt-5 grid gap-3">
                    {featuredResources.map((card) => {
                      const isExternal = /^https?:\/\//.test(card.href);
                      const row = (
                        <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-3">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {card.title}
                            </p>
                            <p className="mt-1 text-xs leading-6 text-white/60">
                              {card.meta ?? "Resource"}
                            </p>
                          </div>
                          <span className="text-lg leading-none text-gold-200">
                            →
                          </span>
                        </div>
                      );

                      return isExternal ? (
                        <a
                          href={card.href}
                          key={card.title}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {row}
                        </a>
                      ) : (
                        <Link href={card.href} key={card.title}>
                          {row}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#f8f4ec] px-5 py-18 md:px-8 md:py-22">
          <SectionAwardsDecor left="Overview" right="Access" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {overviewCards.map((card) => (
                <Link
                  className="group flex h-full flex-col rounded-[1.6rem] border border-black/10 bg-white p-7 shadow-[0_18px_54px_rgba(8,19,31,0.06)] transition duration-300 hover:-translate-y-1 hover:border-black/18 hover:shadow-[0_26px_72px_rgba(8,19,31,0.09)]"
                  href={card.href}
                  key={card.title}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <span className="inline-flex rounded-full bg-[#f7f1df] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold-500">
                        {card.label}
                      </span>
                      <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-black">
                        {card.title}
                      </h2>
                    </div>
                    <span className="text-3xl font-semibold tracking-[-0.05em] text-black/82">
                      {card.value}
                    </span>
                  </div>
                  <p className="mt-6 text-base leading-8 text-black/62">
                    {card.text}
                  </p>
                  <span className="mt-auto pt-8 text-xs font-semibold uppercase tracking-[0.14em] text-black/42 transition group-hover:text-black">
                    Open section
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {audioSection ? (
          <div id="audio-library">
            <AudioSection
              currentPath="/resources/"
              section={audioSection}
              sectionIndex={Math.max(
                0,
                page.sections.findIndex((section) => section === audioSection),
              )}
            />
          </div>
        ) : null}

        {librarySection ? (
          <div id="resource-library">
            <CardsSection
              currentPath="/resources/"
              section={librarySection}
              sectionIndex={Math.max(
                0,
                page.sections.findIndex((section) => section === librarySection),
              )}
              tone="white"
            />
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}

function StandardsSection() {
  return (
    <section className={bandClass("warm")}>
      <SectionAwardsDecor left="Standards" right="Trust" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <SectionKicker>Standards</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">
            Beacon Mosque standards
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-black/58">
            Explore the quality framework used across the Beacon Mosque
            accreditation pathway.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {standards.map((standard) => (
            <Link
              className="border-t border-black/18 py-5 transition hover:text-emerald-700"
              href={standard.href}
              key={standard.title}
            >
              <span className="text-base font-semibold tracking-[-0.02em]">
                {standard.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccreditedSection() {
  return (
    <section className={bandClass("warm")}>
      <SectionAwardsDecor left="Accredited" right="Beacon" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mb-10 max-w-xl">
          <SectionKicker>Accreditation</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">
            Accredited Beacon Mosques
          </h2>
          <p className="mt-5 text-sm leading-7 text-black/58">
            Mosques recognised through the Beacon Mosque accreditation pathway.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {accreditedMosques.map((mosque) => (
            <Link
              className="group overflow-hidden border-t border-black/14 pt-5 transition hover:text-emerald-700"
              href={mosque.href}
              key={mosque.title}
            >
              <div className="relative aspect-[1.42] bg-white">
                <CmsImage
                  alt={mosque.imageAlt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  src={mosque.image}
                />
              </div>
              <div className="pt-5">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-current">
                  {mosque.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/58">
                  {mosque.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CriteriaSection({
  section,
  sectionIndex,
}: {
  section: Extract<PageSection, { kind: "criteria" }>;
  sectionIndex: number;
}) {
  const basePath = `sections.${sectionIndex}`;
  return (
    <section className={bandClass("white")}>
      <SectionAwardsDecor left="Criteria" right="Rating" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mb-10 max-w-xl">
          <SectionKicker>Criteria</SectionKicker>
          <EditableText
            as="h2"
            className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
            path={`${basePath}.title`}
            value={section.title}
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {section.groups.map((group, groupIndex) => (
            <article
              className="border-t border-black/14 pt-5"
              key={`${basePath}.groups.${groupIndex}`}
            >
              <EditableText
                as="h3"
                className="text-xl font-semibold tracking-[-0.02em] text-black"
                path={`${basePath}.groups.${groupIndex}.title`}
                value={group.title}
              />
              <ul className="mt-5 space-y-3 text-sm leading-6 text-black/58">
                {group.items.map((item, itemIndex) => (
                  <li
                    className="relative pl-6"
                    key={`${basePath}.groups.${groupIndex}.items.${itemIndex}`}
                  >
                    <span className="absolute left-0 top-2 h-2 w-2 bg-gold-400" />
                    <EditableText
                      path={`${basePath}.groups.${groupIndex}.items.${itemIndex}`}
                      value={item}
                    />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormField = {
  label: string;
  name: string;
  type?: string;
  options?: string[];
  defaultValue?: string;
  autoComplete?: string;
};

const formConfigs: Record<
  PageForm,
  {
    actionLabel: string;
    fields: FormField[];
    messageLabel: string;
  }
> = {
  nomination: {
    actionLabel: "Submit nomination",
    fields: [
      {
        label: "Mosque name",
        name: "mosque_name",
        autoComplete: "organization",
      },
      { label: "Nominee name", name: "nominee_name", autoComplete: "name" },
      {
        label: "Award category",
        name: "award_category",
        options: [
          "Best Run Mosque",
          "Best Youth Service",
          "Best Madrassah Service",
          "Best Women's Service",
          "Most Impactful Imam",
          "Best Convert Support Service",
          "Most Impactful Alimah",
          "Best Outreach Services",
          "Best Future Design",
          "Best Mosque Volunteer",
        ],
      },
      { label: "Your name", name: "your_name", autoComplete: "name" },
      {
        label: "Email address",
        name: "email",
        type: "email",
        autoComplete: "email",
      },
    ],
    messageLabel: "Nomination details",
  },
  rating: {
    actionLabel: "Submit rating request",
    fields: [
      {
        label: "Mosque name",
        name: "mosque_name",
        autoComplete: "organization",
      },
      { label: "City", name: "city", autoComplete: "address-level2" },
      {
        label: "Primary contact",
        name: "primary_contact",
        autoComplete: "name",
      },
      {
        label: "Email address",
        name: "email",
        type: "email",
        autoComplete: "email",
      },
      {
        label: "Current star rating",
        name: "current_rating",
        options: ["Not yet accredited", "3 Star", "4 Star", "5 Star"],
      },
    ],
    messageLabel: "Current services",
  },
  contact: {
    actionLabel: "Send message",
    fields: [
      { label: "Name", name: "name", autoComplete: "name" },
      {
        label: "Email address",
        name: "email",
        type: "email",
        autoComplete: "email",
      },
      { label: "Subject", name: "subject" },
    ],
    messageLabel: "Message",
  },
};

function Field({ field }: { field: FormField }) {
  const inputId = `${field.name}-${field.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="text-sm font-semibold text-black/68">
        {field.label}
        <span className="ml-1 text-emerald-700" aria-hidden="true">
          *
        </span>
      </span>
      {field.options ? (
        <select
          aria-required="true"
          className="mt-2 h-12 w-full border border-black/18 bg-white px-4 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
          defaultValue={field.defaultValue ?? ""}
          id={inputId}
          name={field.name}
          required
        >
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          aria-required="true"
          autoComplete={field.autoComplete}
          className="mt-2 h-12 w-full border border-black/18 bg-white px-4 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
          defaultValue={field.defaultValue}
          id={inputId}
          name={field.name}
          required
          type={field.type ?? "text"}
        />
      )}
    </label>
  );
}

function FormSection({
  form,
  title,
  text,
  defaultCategory,
  embedSrc,
  embedHeight,
  sectionIndex,
  sourcePath,
}: {
  form: PageForm;
  title: string;
  text: string;
  defaultCategory?: string;
  embedSrc?: string;
  embedHeight?: number;
  sectionIndex: number;
  sourcePath: string;
}) {
  const basePath = `sections.${sectionIndex}`;
  const config = formConfigs[form];
  const fields = config.fields.map((field) =>
    field.name === "award_category" && defaultCategory
      ? { ...field, defaultValue: defaultCategory }
      : field,
  );

  return (
    <section className={bandClass("warm")}>
      <SectionAwardsDecor left="Contact" right="Enquiry" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.75fr_1fr]">
        <div>
          <SectionKicker>Form</SectionKicker>
          <EditableText
            as="h2"
            className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
            path={`${basePath}.title`}
            value={title}
          />
          <EditableText
            as="p"
            className="mt-5 text-sm leading-7 text-black/58"
            multiline
            path={`${basePath}.text`}
            value={text}
          />
        </div>
        {embedSrc ? (
          <div className="border border-black/10 bg-white p-3 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <iframe
              className="w-full border-0"
              height={embedHeight ?? 700}
              src={embedSrc}
              title={title}
            />
          </div>
        ) : (
        <form
          action="/api/forms/"
          className="border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
          method="post"
        >
          <input name="form_type" type="hidden" value={form} />
          <input name="source_path" type="hidden" value={sourcePath} />
          <label className="hidden" htmlFor={`${form}-website`}>
            Website
            <input
              autoComplete="off"
              id={`${form}-website`}
              name="website"
              tabIndex={-1}
              type="text"
            />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <Field field={field} key={field.name} />
            ))}
          </div>
          <label className="mt-5 block" htmlFor={`${form}-message`}>
            <span className="text-sm font-semibold text-black/68">
              {config.messageLabel}
            </span>
            <textarea
              aria-required="true"
              className="mt-2 min-h-36 w-full border border-black/18 bg-white px-4 py-3 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
              id={`${form}-message`}
              name="message"
              required
            />
          </label>
          <button
            className="mt-6 inline-flex min-h-12 items-center justify-center border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black"
            type="submit"
          >
            {config.actionLabel}
          </button>
          <p className="mt-4 text-xs leading-6 text-black/45">
            Fields marked with an asterisk are required. Your submission is
            routed through the Beacon Mosque intake workflow.
          </p>
        </form>
        )}
      </div>
    </section>
  );
}

function RenderSection({
  currentPath,
  index,
  section,
}: {
  currentPath: string;
  index: number;
  section: PageSection;
}) {
  const tone: SectionTone = index % 2 === 0 ? "white" : "warm";

  switch (section.kind) {
    case "text":
      return (
        <TextSection
          currentPath={currentPath}
          section={section}
          sectionIndex={index}
          tone={tone}
        />
      );
    case "textPair":
      return (
        <TextPairSection
          section={section}
          sectionIndex={index}
          tone={tone}
        />
      );
    case "cards":
      return (
        <CardsSection
          currentPath={currentPath}
          section={section}
          sectionIndex={index}
          tone={tone}
        />
      );
    case "awardHistory":
      return (
        <AwardHistorySection
          section={section}
          sectionIndex={index}
          tone={tone}
        />
      );
    case "wordpress":
      return <WordPressSection section={section} />;
    case "media":
      return <MediaSection section={section} sectionIndex={index} />;
    case "gallery":
      return (
        <GallerySection
          currentPath={currentPath}
          section={section}
          sectionIndex={index}
        />
      );
    case "audio":
      return (
        <AudioSection
          currentPath={currentPath}
          section={section}
          sectionIndex={index}
        />
      );
    case "standards":
      return <StandardsSection />;
    case "accredited":
      return <AccreditedSection />;
    case "criteria":
      return <CriteriaSection section={section} sectionIndex={index} />;
    case "form":
      return (
        <FormSection
          defaultCategory={section.defaultCategory}
          embedHeight={section.embedHeight}
          embedSrc={section.embedSrc}
          form={section.form}
          sectionIndex={index}
          sourcePath={currentPath}
          text={section.text}
          title={section.title}
        />
      );
  }
}

function isAwardProfilePage(page: InteriorPageData) {
  return /^(Winner|Finalist|Shortlisted)\s-/.test(page.eyebrow ?? "");
}

function isAwardCategoryPage(page: InteriorPageData) {
  return /^Awards 20\d{2} category$/.test(page.eyebrow ?? "");
}

function extractEntityNameFromCardTitle(title: string, category: string) {
  const beforeDash = title.includes(" - ") ? title.split(" - ")[0].trim() : "";
  if (beforeDash && beforeDash.toLowerCase() !== category.toLowerCase()) {
    return beforeDash;
  }

  const beforeAction = title
    .match(
      /^(.*?)\s+(wins?|win|nominated|shortlisted|finalists?|finalist|results?|vote|voting)\b/i,
    )?.[1]
    ?.trim();
  if (
    beforeAction &&
    beforeAction.toLowerCase() !== category.toLowerCase() &&
    !/^(best|most)\b/i.test(beforeAction)
  ) {
    return beforeAction;
  }

  return null;
}

function isAwardWinnerPosterImage(src?: string) {
  return Boolean(src && /\/assets\/awards\/20\d{2}\/winners\//.test(src));
}

function AwardCategoryDetailPage({ page }: { page: InteriorPageData }) {
  const archiveYear = page.eyebrow?.match(/20\d{2}/)?.[0] ?? "2025";
  const introSection = page.sections.find(
    (section): section is Extract<PageSection, { kind: "text" }> =>
      section.kind === "text",
  );
  const category =
    introSection?.title ??
    page.title.replace(/^Beacon Mosque\s+20\d{2}\s+/i, "").trim();
  const categoryWinner2024 =
    archiveYear === "2024"
      ? getAwardWinnerRecord2024ByCategory(category)
      : null;
  const categoryWinner2025 =
    archiveYear === "2025"
      ? getAwardWinnerRecord2025ByCategory(category)
      : null;
  const heroMedia = getAwardCategoryMedia(category);
  const heroImageSrc =
    categoryWinner2024?.image ??
    categoryWinner2025?.image ??
    heroMedia?.image ??
    page.image;
  const heroImageAlt =
    categoryWinner2024?.imageAlt ??
    categoryWinner2025?.imageAlt ??
    heroMedia?.imageAlt ??
    page.imageAlt ??
    category;
  const usePosterHeroLayout = isAwardWinnerPosterImage(heroImageSrc);
  const cardSections = page.sections.filter(
    (section): section is Extract<PageSection, { kind: "cards" }> =>
      section.kind === "cards",
  );
  const primaryCardsSection = cardSections.find((section) =>
    /profiles|stories|resources|shortlisted|finalist|voting/i.test(
      section.title ?? "",
    ),
  );
  const preferredCard =
    primaryCardsSection?.cards.find((card) =>
      /winner/i.test(card.meta ?? ""),
    ) ?? primaryCardsSection?.cards[0];
  const winnerName =
    categoryWinner2024?.winnerName ??
    categoryWinner2025?.winnerName ??
    (preferredCard
      ? extractEntityNameFromCardTitle(preferredCard.title, category)
      : null) ??
    "Beacon Mosque Archive";
  const scoreRows = [
    { label: "Great contribution", value: 92 },
    { label: "Great leadership", value: 90 },
    { label: "Great performance", value: 94 },
  ];
  const introSectionIndex = page.sections.findIndex(
    (section) => section.kind === "text",
  );
  const biographyParagraphs = introSection?.paragraphs?.length
    ? introSection.paragraphs
    : [page.intro];
  const biographyPathBase =
    introSectionIndex >= 0
      ? `sections.${introSectionIndex}.paragraphs`
      : null;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#f6f5ef] px-5 pb-24 pt-36 text-black md:px-8 md:pb-28 md:pt-40">
          <SectionAwardsDecor left="Category" right="Winner" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold-500">
              Category winner
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.04em] md:text-6xl">
              {winnerName}
            </h1>
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div
                  className={[
                    "relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.08)]",
                    usePosterHeroLayout
                      ? "mx-auto aspect-square max-w-[420px]"
                      : "aspect-[0.86] bg-white",
                  ].join(" ")}
                >
                  {heroImageSrc ? (
                    <CmsImage
                      alt={heroImageAlt}
                      className={
                        usePosterHeroLayout
                          ? "object-contain"
                          : "object-cover"
                      }
                      fill
                      priority
                      quality={100}
                      sizes={
                        usePosterHeroLayout
                          ? "(min-width: 1024px) 420px, 82vw"
                          : "(min-width: 1024px) 42vw, 100vw"
                      }
                      src={heroImageSrc}
                      unoptimized={usePosterHeroLayout}
                    />
                  ) : null}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {page.ctas?.map((cta) => (
                    <ButtonLink
                      href={cta.href}
                      key={cta.href}
                      variant={cta.variant ?? "primary"}
                    >
                      {cta.label}
                    </ButtonLink>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-6 pt-3">
                  {scoreRows.map((row) => (
                    <div key={row.label}>
                      <div className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-black">
                        <span>{row.label}</span>
                        <span>{row.value}%</span>
                      </div>
                      <div className="h-1.5 bg-black/8">
                        <div
                          className="h-full bg-[#3154f1]"
                          style={{ width: `${row.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid gap-6 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:grid-cols-2">
                  <p className="text-sm leading-7 text-black/58">
                    {winnerName} is presented here as the lead archive record
                    for the {category} category within the Beacon Mosque Awards.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    This category detail page uses the same editorial structure
                    across the archive so each award category opens with a
                    consistent internal page.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    The category pages connect award recognition, mosque
                    leadership and measurable service in one repeatable
                    presentation system.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    Related cards remain below so visitors can continue through
                    profiles, archive routes and other category records.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-20 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Biography
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-black/62 md:text-lg md:leading-9">
                  {biographyParagraphs.map((paragraph, paragraphIndex) =>
                    biographyPathBase ? (
                      <EditableText
                        as="p"
                        key={`${biographyPathBase}.${paragraphIndex}`}
                        multiline
                        path={`${biographyPathBase}.${paragraphIndex}`}
                        value={paragraph}
                      />
                    ) : (
                      <EditableText
                        as="p"
                        key={`intro-${paragraphIndex}`}
                        multiline
                        path="intro"
                        value={paragraph}
                      />
                    ),
                  )}
                  <p>
                    This internal category page keeps the archive presentation
                    consistent while still linking visitors into the full awards
                    history for {archiveYear}.
                  </p>
                </div>
              </div>
              <div className="border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Recognition details
                </h2>
                <div className="mt-8 space-y-5">
                  {[
                    ["Profile type", "Category winner"],
                    ["Mosque name", winnerName],
                    ["Award category", category],
                    ["Archive year", archiveYear],
                  ].map(([label, value]) => (
                    <div className="border-b border-black/10 pb-4" key={label}>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black/38">
                        {label}
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-black">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {cardSections.map((section) => (
          <CardsSection
            key={`${page.slug}-${section.title ?? "cards"}`}
            section={section}
            sectionIndex={Math.max(
              0,
              page.sections.findIndex((item) => item === section),
            )}
            tone="white"
          />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}

function AwardProfileDetailPage({ page }: { page: InteriorPageData }) {
  const winnerName = page.title.split(" - ")[0];
  const category =
    page.eyebrow?.split(" - ").slice(1).join(" - ") || "Beacon Mosque Awards";
  const archiveYear = page.title.match(/20\d{2}/)?.[0] ?? "2025";
  const scoreRows = [
    { label: "Great contribution", value: 92 },
    { label: "Great leadership", value: 90 },
    { label: "Great service", value: 94 },
  ];
  const cardSections = page.sections.filter(
    (section): section is Extract<PageSection, { kind: "cards" }> =>
      section.kind === "cards",
  );
  const usePosterHeroLayout = isAwardWinnerPosterImage(page.image);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#f6f5ef] px-5 pb-24 pt-36 text-black md:px-8 md:pb-28 md:pt-40">
          <SectionAwardsDecor left="Winner" right="Profile" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold-500">
              Winner
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.04em] md:text-6xl">
              {winnerName}
            </h1>
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div
                  className={[
                    "relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.08)]",
                    usePosterHeroLayout
                      ? "mx-auto aspect-square max-w-[420px]"
                      : "aspect-[0.86] bg-white",
                  ].join(" ")}
                >
                  {page.image ? (
                    <CmsImage
                      alt={page.imageAlt ?? winnerName}
                      className={
                        usePosterHeroLayout ? "object-contain" : "object-cover"
                      }
                      fill
                      priority
                      quality={100}
                      sizes={
                        usePosterHeroLayout
                          ? "(min-width: 1024px) 420px, 82vw"
                          : "(min-width: 1024px) 42vw, 100vw"
                      }
                      src={page.image}
                      unoptimized={usePosterHeroLayout}
                    />
                  ) : null}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {page.ctas?.map((cta) => (
                    <ButtonLink
                      href={cta.href}
                      key={cta.href}
                      variant={cta.variant ?? "primary"}
                    >
                      {cta.label}
                    </ButtonLink>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-6 pt-3">
                  {scoreRows.map((row) => (
                    <div key={row.label}>
                      <div className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-black">
                        <span>{row.label}</span>
                        <span>{row.value}%</span>
                      </div>
                      <div className="h-1.5 bg-black/8">
                        <div
                          className="h-full bg-[#3154f1]"
                          style={{ width: `${row.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid gap-6 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:grid-cols-2">
                  <p className="text-sm leading-7 text-black/58">
                    {winnerName} is recognised within the Beacon Mosque Awards
                    archive for sustained community impact, trusted leadership
                    and visible service across mosque life.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    This winner profile follows a consistent editorial format
                    across the archive, highlighting the same standards of
                    contribution, leadership and service for every card detail
                    page.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    The Beacon Mosque Awards recognise institutions whose work
                    strengthens worshippers, families and neighbourhoods through
                    practical excellence and reliable stewardship.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    Each page in this winner series keeps the presentation
                    intentionally minimal so the archive reads as a coherent
                    national record of recognition.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-20 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Biography
                </h2>
                <EditableText
                  as="p"
                  className="mt-6 text-base leading-8 text-black/62 md:text-lg md:leading-9"
                  multiline
                  path="intro"
                  value={page.intro}
                />
                <p className="mt-5 text-base leading-8 text-black/62 md:text-lg md:leading-9">
                  This archive profile presents the recognised winner in a
                  repeatable, editorial page structure that can be reused across
                  every linked winner card without altering the overall
                  experience.
                </p>
              </div>
              <div className="border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Recognition details
                </h2>
                <div className="mt-8 space-y-5">
                  {[
                    ["Profile type", "Winner"],
                    ["Mosque name", winnerName],
                    ["Award category", category],
                    ["Archive year", archiveYear],
                  ].map(([label, value]) => (
                    <div className="border-b border-black/10 pb-4" key={label}>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black/38">
                        {label}
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-black">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {cardSections.map((section) => (
          <CardsSection
            currentPath={`/${page.slug}/`}
            key={`${page.slug}-${section.title ?? "cards"}`}
            section={section}
            sectionIndex={Math.max(
              0,
              page.sections.findIndex((item) => item === section),
            )}
            tone="white"
          />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}

export function InteriorPage({ page }: { page: InteriorPageData }) {
  if (page.slug === "standards") {
    return <StandardsLandingPage page={page} />;
  }

  if (page.slug === "resources") {
    return <ResourcesLandingPage page={page} />;
  }

  if (page.slug === "training") {
    return <TrainingLandingPage page={page} />;
  }

  if (isAwardCategoryPage(page)) {
    return <AwardCategoryDetailPage page={page} />;
  }

  if (isAwardProfilePage(page)) {
    return <AwardProfileDetailPage page={page} />;
  }

  const isAwardsLandingPage = page.slug === "awards";
  const isContactPage = page.slug === "contact-us";
  const isStandardsSubpage = page.slug.startsWith("standards/");
  const isStandardsAccreditationPage = page.slug === "standards/accreditation";
  const hasHeroVideo = Boolean(page.heroVideo);
  const hasHeroVisual = hasHeroVideo || Boolean(page.image);
  const showHeroVisual =
    hasHeroVisual && !isAwardsLandingPage && !isStandardsSubpage && !isContactPage;
  const heroAwardsArchiveSection = isAwardsLandingPage
    ? page.sections.find(
        (section): section is Extract<PageSection, { kind: "cards" }> =>
          section.kind === "cards" && section.title === "Awards archive",
      )
    : undefined;
  const pageSections = heroAwardsArchiveSection
    ? page.sections.filter(
        (section) =>
          !(section.kind === "cards" && section.title === "Awards archive"),
      )
    : page.sections;

  return (
    <>
      <SiteHeader />
      <main>
        <section
          className={[
            "relative isolate overflow-hidden px-5 md:px-8",
            isAwardsLandingPage
              ? "bg-[#f3f1ed] text-black"
              : isStandardsAccreditationPage
                ? "bg-[#f6f5ef] text-black"
                : "pattern-dark bg-black text-white",
            isAwardsLandingPage
              ? "pb-14 pt-24 md:pb-18 md:pt-26"
              : "pb-20 pt-36 md:pb-24 md:pt-40",
          ].join(" ")}
        >
          {isContactPage ? (
            <div className="absolute inset-0 -z-10">
              <CmsImage
                alt="Beacon Mosque training session"
                className="object-cover opacity-30"
                fill
                priority
                sizes="100vw"
                src="/assets/interior/awards-gala.jpg"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.42),rgba(5,7,10,0.68)_36%,rgba(5,7,10,0.94))]" />
            </div>
          ) : null}
          {isAwardsLandingPage ? (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 -z-10 h-28 bg-[linear-gradient(180deg,rgba(5,5,5,0.28)_0%,rgba(5,5,5,0.14)_24%,rgba(215,169,72,0.12)_52%,transparent_100%)] md:h-36"
            />
          ) : null}
          <div
            className={[
              "absolute inset-x-0 bottom-0 -z-10 h-40",
              isAwardsLandingPage
                ? "bg-[linear-gradient(180deg,transparent,rgba(243,241,237,0.96))]"
                : isStandardsAccreditationPage
                  ? "bg-[linear-gradient(180deg,transparent,rgba(246,245,239,0.96))]"
                  : "bg-[linear-gradient(180deg,transparent,rgba(5,5,5,0.92))]",
            ].join(" ")}
          />
          {!isAwardsLandingPage ? (
            <div
              className={[
                "mx-auto max-w-[1180px] items-center gap-12",
                showHeroVisual
                  ? "grid lg:grid-cols-[1fr_0.78fr]"
                  : "max-w-[860px]",
              ].join(" ")}
            >
              <div className={showHeroVisual ? "" : "max-w-4xl"}>
                {page.eyebrow ? (
                  <EditableText
                    as="span"
                    className={[
                      "text-xs font-bold uppercase tracking-[0.24em]",
                      isStandardsAccreditationPage
                        ? "text-gold-500"
                        : "text-gold-200",
                    ].join(" ")}
                    path="eyebrow"
                    value={page.eyebrow}
                  />
                ) : null}
                <EditableText
                  as="h1"
                  className="mt-5 text-4xl font-black leading-[0.98] md:text-6xl"
                  path="title"
                  value={page.title}
                />
                <EditableText
                  as="p"
                  className={[
                    "mt-6 max-w-3xl text-lg leading-8 md:text-xl",
                    isStandardsAccreditationPage
                      ? "text-black/68"
                      : "text-white/78",
                  ].join(" ")}
                  multiline
                  path="intro"
                  value={page.intro}
                />
                {page.ctas?.length ? (
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {page.ctas.map((cta, index) => (
                      <ButtonLink
                        href={cta.href}
                        key={`${cta.href}-${index}`}
                        variant={cta.variant ?? "primary"}
                      >
                        <EditableText
                          path={`ctas.${index}.label`}
                          value={cta.label}
                        />
                      </ButtonLink>
                    ))}
                  </div>
                ) : null}
                {!showHeroVisual ? (
                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    <div
                      className={[
                        "p-5",
                        isStandardsAccreditationPage
                          ? "border border-black/10 bg-white"
                          : "border border-white/14 bg-white/8 backdrop-blur-sm",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "text-xs font-semibold uppercase tracking-[0.22em]",
                          isStandardsAccreditationPage
                            ? "text-gold-500"
                            : "text-gold-200",
                        ].join(" ")}
                      >
                        Awards
                      </span>
                      <p
                        className={[
                          "mt-3 text-sm leading-7",
                          isStandardsAccreditationPage
                            ? "text-black/58"
                            : "text-white/76",
                        ].join(" ")}
                      >
                        National recognition for mosques, educators, volunteers,
                        imams and community leadership.
                      </p>
                    </div>
                    <div
                      className={[
                        "p-5",
                        isStandardsAccreditationPage
                          ? "border border-black/10 bg-white"
                          : "border border-white/14 bg-white/8 backdrop-blur-sm",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "text-xs font-semibold uppercase tracking-[0.22em]",
                          isStandardsAccreditationPage
                            ? "text-gold-500"
                            : "text-gold-200",
                        ].join(" ")}
                      >
                        Standards
                      </span>
                      <p
                        className={[
                          "mt-3 text-sm leading-7",
                          isStandardsAccreditationPage
                            ? "text-black/58"
                            : "text-white/76",
                        ].join(" ")}
                      >
                        A practical quality framework covering governance,
                        facilities, communication and service delivery.
                      </p>
                    </div>
                    <div
                      className={[
                        "p-5",
                        isStandardsAccreditationPage
                          ? "border border-black/10 bg-white"
                          : "border border-white/14 bg-white/8 backdrop-blur-sm",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "text-xs font-semibold uppercase tracking-[0.22em]",
                          isStandardsAccreditationPage
                            ? "text-gold-500"
                            : "text-gold-200",
                        ].join(" ")}
                      >
                        Accreditation
                      </span>
                      <p
                        className={[
                          "mt-3 text-sm leading-7",
                          isStandardsAccreditationPage
                            ? "text-black/58"
                            : "text-white/76",
                        ].join(" ")}
                      >
                        A route for mosque teams to evidence strong practice and
                        improve year by year.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
              {showHeroVisual ? (
                <div className="arch-frame hidden border border-gold-200/40 bg-emerald-950 p-2 shadow-2xl lg:block">
                  {hasHeroVideo ? (
                    <HomeHeroVideo
                      ariaLabel={page.title}
                      className="arch-frame-inner aspect-[0.9] w-full bg-navy-950 object-cover"
                      controls
                      decorative={false}
                      loop
                      muted
                      poster={page.heroVideoPoster}
                      preload="metadata"
                      src={page.heroVideo!}
                    />
                  ) : (
                    <CmsImage
                      alt={page.imageAlt ?? ""}
                      className="arch-frame-inner aspect-[0.9] w-full object-cover"
                      height={720}
                      priority
                      src={page.image!}
                      width={640}
                    />
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
          {heroAwardsArchiveSection ? (
            <div
              className={
                isAwardsLandingPage
                  ? ""
                  : "mt-10 border-t border-white/12 pt-8 md:mt-12 md:pt-9"
              }
            >
              <div className="mb-8">
                <h2
                  className={[
                    "text-center text-3xl font-black uppercase tracking-[0.12em] md:text-5xl",
                    isAwardsLandingPage ? "text-gold-400" : "text-gold-200",
                  ].join(" ")}
                  style={{
                    textShadow: isAwardsLandingPage
                      ? "0 0 14px rgba(228,191,104,0.12)"
                      : "0 0 18px rgba(228,191,104,0.2), 0 0 42px rgba(228,191,104,0.12)",
                  }}
                >
                  {isAwardsLandingPage
                    ? "Awards"
                    : "Explore previous award years"}
                </h2>
                {isAwardsLandingPage ? null : (
                  <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold-200/88">
                      Beacon Mosque Awards
                    </span>
                    <p className="max-w-xl text-sm leading-7 text-white/62">
                      Browse the archive directly from the hero and move through
                      each awards year without dropping into a separate section
                      first.
                    </p>
                  </div>
                )}
              </div>
              <AwardArchiveEditorialCarousel
                cards={heroAwardsArchiveSection.cards}
                tone={isAwardsLandingPage ? "light" : "dark"}
              />
            </div>
          ) : null}
        </section>
        <div className="deferred-content">
          {pageSections.map((section, index) => (
            <RenderSection
              currentPath={`/${page.slug}/`}
              index={index}
              key={`${section.kind}-${index}`}
              section={section}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
