import Image from "next/image";
import Link from "next/link";
import { accreditedMosques, standards, type CardLink } from "@/lib/content";
import type { InteriorPage as InteriorPageData, PageForm, PageSection } from "@/lib/pages";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionAwardsDecor, SectionKicker, SiteFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";
import { AwardCardAccent, AwardSeal } from "@/components/AwardMotifs";

type SectionTone = "white" | "warm";

function bandClass(tone: SectionTone = "white") {
  return [
    "relative isolate overflow-hidden px-5 py-20 text-black md:px-8 md:py-28",
    tone === "warm" ? "bg-[#f3f1ed]" : "bg-white",
  ].join(" ");
}

function TextSection({ section, tone = "white" }: { section: Extract<PageSection, { kind: "text" }>; tone?: SectionTone }) {
  return (
    <section className={bandClass(tone)}>
      <SectionAwardsDecor left={section.title ? "Context" : "Beacon"} right="Standards" />
      <div className="relative z-10 mx-auto grid max-w-[980px] gap-10 md:grid-cols-[0.82fr_1.18fr]">
        <div>
          <SectionKicker>{section.title ? "Overview" : "Beacon Mosque"}</SectionKicker>
          {section.title ? (
            <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
              {section.title}
            </h2>
          ) : null}
        </div>
        <div className="space-y-5 text-base leading-8 text-black/62 md:text-lg md:leading-9">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkCard({ card }: { card: CardLink }) {
  const hasImage = Boolean(card.image);
  const className =
    "group block overflow-hidden border-t border-black/14 pt-5 text-black transition hover:text-emerald-700";
  const content = (
    <>
      {hasImage ? (
        <div className="relative mb-5 aspect-[1.45] overflow-hidden bg-white">
          <Image
            alt={card.imageAlt ?? ""}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            src={card.image!}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.38))]" />
          {card.meta ? (
            <span className="absolute left-4 top-4 bg-gold-400/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black">
              {card.meta}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="relative pb-1">
        <AwardCardAccent className="opacity-35" />
        {!hasImage && card.meta ? <span className="relative z-10 mb-4 inline-block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/42">{card.meta}</span> : null}
        <h3 className="relative z-10 text-lg font-semibold leading-snug tracking-[-0.02em] text-current">{card.title}</h3>
        <p className="relative z-10 mt-3 text-sm leading-7 text-black/58">{card.text}</p>
      </div>
      <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-black/40 transition group-hover:text-emerald-700">Open</span>
    </>
  );

  if (/^https?:\/\//.test(card.href)) {
    return (
      <a className={className} href={card.href} rel="noreferrer" target="_blank">
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
    <Link className={className} href={card.href}>
      {content}
    </Link>
  );
}

function StoriesMark() {
  return (
    <div className="flex items-center gap-4 text-black/18 md:gap-5" aria-hidden="true">
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
      <ellipse cx="95" cy="145" rx="24" ry="20" stroke="currentColor" strokeWidth="2.8" />
      <path d="M95 126V166" stroke="currentColor" strokeWidth="1.8" />
      <path d="M78 136C87 139 97 141 110 141" stroke="currentColor" strokeWidth="1.8" />
      <path d="M72 151C87 147 99 146 116 148" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function AwardsSectionHeader({ title, variant }: { title: string; variant: "stories" | "floral" }) {
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

function AwardArchiveEditorialCarousel({ cards }: { cards: CardLink[] }) {
  const archivePreviewByYear: Record<
    string,
    {
      image: string;
      imageAlt: string;
      mediaClassName: string;
    }
  > = {
    "2025": {
      image: "/assets/awards/bbma-2025.jpg",
      imageAlt: "Beacon Mosque Awards 2025 archive artwork",
      mediaClassName: "aspect-[4/5]",
    },
    "2024": {
      image: "/assets/interior/awards-gala.jpg",
      imageAlt: "Beacon Mosque Awards 2024 archive preview",
      mediaClassName: "aspect-[4/5]",
    },
    "2023": {
      image: "/assets/interior/cambridge-mosque.jpg",
      imageAlt: "Beacon Mosque Awards 2023 archive preview",
      mediaClassName: "aspect-square",
    },
    "2022": {
      image: "/assets/interior/standards-wide.jpg",
      imageAlt: "Beacon Mosque Awards 2022 archive preview",
      mediaClassName: "aspect-[4/5]",
    },
    "2021": {
      image: "/assets/interior/golden-mosque.jpg",
      imageAlt: "Beacon Mosque Awards 2021 archive preview",
      mediaClassName: "aspect-[3/4]",
    },
    "2020": {
      image: "/assets/interior/about-hero.jpg",
      imageAlt: "Beacon Mosque Awards 2020 archive preview",
      mediaClassName: "aspect-[4/5]",
    },
    "2019": {
      image: "/assets/accredited/al-manaar.jpg",
      imageAlt: "Beacon Mosque Awards 2019 archive preview",
      mediaClassName: "aspect-square",
    },
    "2018": {
      image: "/assets/accredited/al-madina.jpg",
      imageAlt: "Beacon Mosque Awards 2018 archive preview",
      mediaClassName: "aspect-[3/4]",
    },
  };

  return (
    <div className="no-scrollbar -ml-6 flex snap-x snap-mandatory items-start gap-7 overflow-x-auto pr-3 md:-ml-10 md:gap-8 md:pr-4 lg:-ml-12 lg:gap-10 lg:pr-5">
      {cards.map((card) => {
        const yearMatch = card.title.match(/(20\d{2})/);
        const year = yearMatch?.[1] ?? card.title;
        const preview = archivePreviewByYear[year] ?? {
          image: "/assets/awards/bbma-2025.jpg",
          imageAlt: `${card.title} archive preview`,
          mediaClassName: "aspect-[4/5]",
        };

        return (
          <Link
            className="group block w-[17rem] min-w-[17rem] shrink-0 snap-start md:w-[20rem] md:min-w-[20rem] lg:w-[22rem] lg:min-w-[22rem]"
            href={card.href}
            key={`${card.title}-${card.href}`}
          >
            <div className={["relative overflow-hidden bg-[#f3f1ed]", preview.mediaClassName].join(" ")}>
              <Image
                alt={preview.imageAlt}
                className="object-cover transition duration-500 group-hover:scale-[1.035]"
                fill
                sizes="(min-width: 1024px) 352px, (min-width: 768px) 320px, 272px"
                src={preview.image}
              />
            </div>
            <div className="mt-5 flex items-end justify-between gap-5">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-black/34">
                  Awards archive
                </p>
                <p className="mt-2 text-[1.95rem] font-semibold tracking-[-0.04em] text-black md:text-[2.15rem]">
                  {year}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-3xl leading-none text-black/88 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function CardsSection({ section, tone = "warm" }: { section: Extract<PageSection, { kind: "cards" }>; tone?: SectionTone }) {
  const hasImages = section.cards.some((card) => card.image);
  const sectionTitle = section.title ?? "";
  const awardsHeaderVariant =
    sectionTitle === "Awards archive"
      ? "stories"
      : /^Award categories/.test(sectionTitle)
        ? "floral"
        : null;

  return (
    <section className={bandClass(tone)}>
      <SectionAwardsDecor left={sectionTitle || "Cards"} right="Explore" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        {section.title
          ? awardsHeaderVariant
            ? <AwardsSectionHeader title={section.title} variant={awardsHeaderVariant} />
            : (
              <div className="mb-10 max-w-xl">
                <SectionKicker>Explore</SectionKicker>
                <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">
                  {section.title}
                </h2>
              </div>
            )
          : null}
        {sectionTitle === "Awards archive" ? (
          <AwardArchiveEditorialCarousel cards={section.cards} />
        ) : (
          <div className={["grid gap-5", hasImages ? "lg:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-3"].join(" ")}>
            {section.cards.map((card) => (
              <LinkCard card={card} key={`${card.title}-${card.href}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WordPressSection({ section }: { section: Extract<PageSection, { kind: "wordpress" }> }) {
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
      <a className="border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-gold-200 transition hover:bg-white hover:text-black" href={href} rel="noreferrer" target="_blank">
        Open original media
      </a>
    </div>
  );
}

export function MediaSection({ section }: { section: Extract<PageSection, { kind: "media" }> }) {
  return (
    <section className={bandClass("warm")}>
      <SectionAwardsDecor left="Media" right="Archive" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        {section.title ? (
          <div className="mb-10 max-w-xl">
            <SectionKicker>Media</SectionKicker>
            <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">{section.title}</h2>
            {section.text ? <p className="mt-5 text-sm leading-7 text-black/58">{section.text}</p> : null}
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item) => (
            <figure
              className="overflow-hidden border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
              key={`${item.type}-${item.src}`}
            >
              {item.type === "image" && !shouldUseMediaLinkFallback(item.src) ? (
                <Image
                  alt={item.alt ?? item.caption ?? ""}
                  className="aspect-[1.35] w-full bg-navy-950 object-contain"
                  height={720}
                  sizes={item.sizes ?? "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"}
                  src={item.src}
                  unoptimized={item.src.toLowerCase().endsWith(".svg")}
                  width={960}
                />
              ) : null}
              {item.type === "image" && shouldUseMediaLinkFallback(item.src) ? <MediaLinkFallback href={item.src} /> : null}
              {item.type === "video" ? (
                <video
                  className="aspect-video w-full bg-navy-950 object-contain"
                  controls
                  playsInline
                  poster={item.poster}
                  preload="metadata"
                >
                  {(item.sources?.length ? item.sources : [item.src]).map((source) => (
                    <source key={source} src={source} />
                  ))}
                  <a className="font-semibold text-emerald-800 underline" href={item.src}>
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
              {item.type === "link" || (item.type === "embed" && !item.trustedEmbed) ? (
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

function GallerySection({ section }: { section: Extract<PageSection, { kind: "gallery" }> }) {
  return (
    <section className={bandClass("warm")}>
      <SectionAwardsDecor left="Gallery" right="Moments" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        {section.title ? (
          <div className="mb-10 max-w-xl">
            <SectionKicker>Gallery</SectionKicker>
            <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">{section.title}</h2>
            <p className="mt-5 text-sm leading-7 text-black/58">Visual moments from the Beacon Mosque public archive.</p>
          </div>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {section.images.map((image, index) => (
            <figure className="group relative overflow-hidden border border-black/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.08)]" key={image.src}>
              <div className="relative aspect-square">
                <Image
                  alt={image.alt}
                  className="object-cover transition duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  src={image.src}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(7,21,36,0.82))]" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="block text-xs font-bold uppercase tracking-[0.22em] text-gold-200">Gallery {String(index + 1).padStart(2, "0")}</span>
                <strong className="mt-2 block text-lg font-semibold text-white">{image.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudioSection({ section }: { section: Extract<PageSection, { kind: "audio" }> }) {
  return (
    <section className={bandClass("white")}>
      <SectionAwardsDecor left="Audio" right="Vision" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mb-10 max-w-xl">
          <SectionKicker>Audio</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">{section.title}</h2>
          <p className="mt-5 text-sm leading-7 text-black/58">{section.text}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {section.items.map((item) => (
            <article className="border-t border-black/14 pt-5" key={item.src}>
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/42">30 year plan</span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-black/58">{item.subtitle}</p>
              <audio className="mt-5 w-full" controls preload="none">
                <source src={item.src} type="audio/mp4" />
                <a className="font-semibold text-emerald-800 underline" href={item.src}>
                  Open audio resource
                </a>
              </audio>
            </article>
          ))}
        </div>
      </div>
    </section>
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
            Explore the quality framework used across the Beacon Mosque accreditation pathway.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {standards.map((standard) => (
            <Link
              className="border-t border-black/18 py-5 transition hover:text-emerald-700"
              href={standard.href}
              key={standard.title}
            >
              <Image alt="" className="mb-4 h-9 w-9 object-contain" height={64} src={standard.image} width={64} />
              <span className="text-base font-semibold tracking-[-0.02em]">{standard.title}</span>
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
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">Accredited Beacon Mosques</h2>
          <p className="mt-5 text-sm leading-7 text-black/58">Mosques recognised through the Beacon Mosque accreditation pathway.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {accreditedMosques.map((mosque) => (
            <Link className="group overflow-hidden border-t border-black/14 pt-5 transition hover:text-emerald-700" href={mosque.href} key={mosque.title}>
              <div className="relative aspect-[1.42] bg-white">
                <Image alt={mosque.imageAlt} className="object-cover" fill sizes="(min-width: 768px) 33vw, 100vw" src={mosque.image} />
              </div>
              <div className="pt-5">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-current">{mosque.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{mosque.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CriteriaSection({ section }: { section: Extract<PageSection, { kind: "criteria" }> }) {
  return (
    <section className={bandClass("white")}>
      <SectionAwardsDecor left="Criteria" right="Rating" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mb-10 max-w-xl">
          <SectionKicker>Criteria</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">{section.title}</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {section.groups.map((group) => (
            <article className="border-t border-black/14 pt-5" key={group.title}>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-black">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-black/58">
                {group.items.map((item) => (
                  <li className="relative pl-6" key={item}>
                    <span className="absolute left-0 top-2 h-2 w-2 bg-gold-400" />
                    {item}
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
      { label: "Mosque name", name: "mosque_name", autoComplete: "organization" },
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
      { label: "Email address", name: "email", type: "email", autoComplete: "email" },
    ],
    messageLabel: "Nomination details",
  },
  rating: {
    actionLabel: "Submit rating request",
    fields: [
      { label: "Mosque name", name: "mosque_name", autoComplete: "organization" },
      { label: "City", name: "city", autoComplete: "address-level2" },
      { label: "Primary contact", name: "primary_contact", autoComplete: "name" },
      { label: "Email address", name: "email", type: "email", autoComplete: "email" },
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
      { label: "Email address", name: "email", type: "email", autoComplete: "email" },
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
  sourcePath,
}: {
  form: PageForm;
  title: string;
  text: string;
  defaultCategory?: string;
  sourcePath: string;
}) {
  const config = formConfigs[form];
  const fields = config.fields.map((field) =>
    field.name === "award_category" && defaultCategory ? { ...field, defaultValue: defaultCategory } : field,
  );

  return (
    <section id={form === "nomination" ? "nomination-form" : undefined} className={bandClass("warm")}>
      <SectionAwardsDecor left="Contact" right="Enquiry" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.75fr_1fr]">
        <div>
          <SectionKicker>Form</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">{title}</h2>
          <p className="mt-5 text-sm leading-7 text-black/58">{text}</p>
        </div>
        <form action="/api/forms/" className="border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]" method="post">
          <input name="form_type" type="hidden" value={form} />
          <input name="source_path" type="hidden" value={sourcePath} />
          <label className="hidden" htmlFor={`${form}-website`}>
            Website
            <input autoComplete="off" id={`${form}-website`} name="website" tabIndex={-1} type="text" />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <Field field={field} key={field.name} />
            ))}
          </div>
          <label className="mt-5 block" htmlFor={`${form}-message`}>
            <span className="text-sm font-semibold text-black/68">{config.messageLabel}</span>
            <textarea
              aria-required="true"
              className="mt-2 min-h-36 w-full border border-black/18 bg-white px-4 py-3 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
              id={`${form}-message`}
              name="message"
              required
            />
          </label>
          <button className="mt-6 inline-flex min-h-12 items-center justify-center border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black" type="submit">
            {config.actionLabel}
          </button>
          <p className="mt-4 text-xs leading-6 text-black/45">
            Fields marked with an asterisk are required. Your submission is routed through the Beacon Mosque intake workflow.
          </p>
        </form>
      </div>
    </section>
  );
}

function RenderSection({ currentPath, index, section }: { currentPath: string; index: number; section: PageSection }) {
  const tone: SectionTone = index % 2 === 0 ? "white" : "warm";

  switch (section.kind) {
    case "text":
      return <TextSection section={section} tone={tone} />;
    case "cards":
      return <CardsSection section={section} tone={tone} />;
    case "wordpress":
      return <WordPressSection section={section} />;
    case "media":
      return <MediaSection section={section} />;
    case "gallery":
      return <GallerySection section={section} />;
    case "audio":
      return <AudioSection section={section} />;
    case "standards":
      return <StandardsSection />;
    case "accredited":
      return <AccreditedSection />;
    case "criteria":
      return <CriteriaSection section={section} />;
    case "form":
      return <FormSection defaultCategory={section.defaultCategory} form={section.form} sourcePath={currentPath} text={section.text} title={section.title} />;
  }
}

function isAwardProfilePage(page: InteriorPageData) {
  return /^(Winner|Finalist|Shortlisted)\s-/.test(page.eyebrow ?? "");
}

function AwardProfileDetailPage({ page }: { page: InteriorPageData }) {
  const winnerName = page.title.split(" - ")[0];
  const category = page.eyebrow?.split(" - ").slice(1).join(" - ") || "Beacon Mosque Awards";
  const archiveYear = page.title.match(/20\d{2}/)?.[0] ?? "2025";
  const scoreRows = [
    { label: "Great contribution", value: 92 },
    { label: "Great leadership", value: 90 },
    { label: "Great service", value: 94 },
  ];
  const relatedSection = page.sections.find((section): section is Extract<PageSection, { kind: "cards" }> => section.kind === "cards");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#f6f5ef] px-5 pb-24 pt-36 text-black md:px-8 md:pb-28 md:pt-40">
          <SectionAwardsDecor left="Winner" right="Profile" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold-500">Winner</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.04em] md:text-6xl">
              {winnerName}
            </h1>
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="relative aspect-[0.86] overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,0.08)]">
                  {page.image ? (
                    <Image
                      alt={page.imageAlt ?? winnerName}
                      className="object-cover"
                      fill
                      priority
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      src={page.image}
                    />
                  ) : null}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {page.ctas?.map((cta) => (
                    <ButtonLink href={cta.href} key={cta.href} variant={cta.variant ?? "primary"}>
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
                        <div className="h-full bg-[#3154f1]" style={{ width: `${row.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid gap-6 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:grid-cols-2">
                  <p className="text-sm leading-7 text-black/58">
                    {winnerName} is recognised within the Beacon Mosque Awards archive for sustained community impact, trusted leadership and visible service across mosque life.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    This winner profile follows a consistent editorial format across the archive, highlighting the same standards of contribution, leadership and service for every card detail page.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    The Beacon Mosque Awards recognise institutions whose work strengthens worshippers, families and neighbourhoods through practical excellence and reliable stewardship.
                  </p>
                  <p className="text-sm leading-7 text-black/58">
                    Each page in this winner series keeps the presentation intentionally minimal so the archive reads as a coherent national record of recognition.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-20 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Biography</h2>
                <p className="mt-6 text-base leading-8 text-black/62 md:text-lg md:leading-9">
                  {page.intro}
                </p>
                <p className="mt-5 text-base leading-8 text-black/62 md:text-lg md:leading-9">
                  This archive profile presents the recognised winner in a repeatable, editorial page structure that can be reused across every linked winner card without altering the overall experience.
                </p>
              </div>
              <div className="border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Recognition details</h2>
                <div className="mt-8 space-y-5">
                  {[
                    ["Profile type", "Winner"],
                    ["Mosque name", winnerName],
                    ["Award category", category],
                    ["Archive year", archiveYear],
                  ].map(([label, value]) => (
                    <div className="border-b border-black/10 pb-4" key={label}>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black/38">{label}</p>
                      <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-black">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {relatedSection ? <CardsSection section={relatedSection} tone="white" /> : null}
      </main>
      <SiteFooter />
    </>
  );
}

export function InteriorPage({ page }: { page: InteriorPageData }) {
  if (isAwardProfilePage(page)) {
    return <AwardProfileDetailPage page={page} />;
  }

  const hasHeroVideo = Boolean(page.heroVideo);
  const hasHeroVisual = hasHeroVideo || Boolean(page.image);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pattern-dark relative isolate overflow-hidden bg-[linear-gradient(135deg,#050505,#18120a)] px-5 pb-20 pt-36 text-white md:px-8 md:pb-24 md:pt-40">
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent,rgba(5,5,5,0.92))]" />
          <div className={["mx-auto max-w-[1180px] items-center gap-12", hasHeroVisual ? "grid lg:grid-cols-[1fr_0.78fr]" : "max-w-[860px]"].join(" ")}>
            <div className={hasHeroVisual ? "" : "max-w-4xl"}>
              {page.eyebrow ? <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold-200">{page.eyebrow}</span> : null}
              <h1 className="mt-5 text-4xl font-black leading-[0.98] md:text-6xl">{page.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">{page.intro}</p>
              {page.ctas?.length ? (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {page.ctas.map((cta) => (
                    <ButtonLink href={cta.href} key={cta.href} variant={cta.variant ?? "primary"}>
                      {cta.label}
                    </ButtonLink>
                  ))}
                </div>
              ) : null}
              {!hasHeroVisual ? (
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="border border-white/14 bg-white/8 p-5 backdrop-blur-sm">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">Awards</span>
                    <p className="mt-3 text-sm leading-7 text-white/76">National recognition for mosques, educators, volunteers, imams and community leadership.</p>
                  </div>
                  <div className="border border-white/14 bg-white/8 p-5 backdrop-blur-sm">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">Standards</span>
                    <p className="mt-3 text-sm leading-7 text-white/76">A practical quality framework covering governance, facilities, communication and service delivery.</p>
                  </div>
                  <div className="border border-white/14 bg-white/8 p-5 backdrop-blur-sm">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">Accreditation</span>
                    <p className="mt-3 text-sm leading-7 text-white/76">A route for mosque teams to evidence strong practice and improve year by year.</p>
                  </div>
                </div>
              ) : null}
            </div>
            {hasHeroVisual ? (
              <div className="arch-frame hidden border border-gold-200/40 bg-emerald-950 p-2 shadow-2xl lg:block">
                {hasHeroVideo ? (
                  <video
                    aria-label={page.title}
                    autoPlay
                    className="arch-frame-inner aspect-[0.9] w-full bg-navy-950 object-cover"
                    controls
                    loop
                    muted
                    playsInline
                    poster={page.heroVideoPoster}
                    preload="metadata"
                  >
                    <source src={page.heroVideo!} type="video/mp4" />
                  </video>
                ) : (
                  <Image alt={page.imageAlt ?? ""} className="arch-frame-inner aspect-[0.9] w-full object-cover" height={720} priority src={page.image!} width={640} />
                )}
              </div>
            ) : null}
          </div>
        </section>
        {page.sections.map((section, index) => (
          <RenderSection currentPath={`/${page.slug}/`} index={index} key={`${section.kind}-${index}`} section={section} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
