import Image from "next/image";
import Link from "next/link";
import {
  accreditedMosques,
  awards2026CategoriesHref,
  awardArchiveFeatureYears,
  ceremonyGallery,
  featureCards,
  mainNav,
  serviceCards,
  standards,
} from "@/lib/content";
import { AutoScrollRail } from "@/components/AutoScrollRail";
import { ButtonLink } from "@/components/ButtonLink";
import { AwardSeal, StarRating } from "@/components/AwardMotifs";
import { HomeHeroVideo } from "@/components/HomeHeroVideo";
import { WinnersShowcaseInteractive } from "@/components/WinnersShowcaseInteractive";

export function EditorialLink({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      className={[
        "inline-flex min-h-10 items-center justify-center border border-black bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black",
        className,
      ].join(" ")}
      href={href}
    >
      {children}
    </Link>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-word-motion block text-[0.68rem] font-bold uppercase tracking-[0.24em] text-emerald-700">
      {children}
    </span>
  );
}

export function SectionAwardsDecor({
  left = "Nominee",
  right = "Winner",
  tone = "light",
}: {
  left?: string;
  right?: string;
  tone?: "light" | "dark";
}) {
  const lineClass = tone === "dark" ? "bg-gold-200/36" : "bg-gold-400/30";
  const textClass = tone === "dark" ? "text-gold-200/60" : "text-black/18";
  const chipClass =
    tone === "dark"
      ? "border-white/12 bg-white/6 text-white/55"
      : "border-black/10 bg-white/55 text-black/34";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
    >
      <div className="award-float-slow absolute -left-12 top-8 flex items-center gap-4 2xl:left-5">
        <AwardSeal className="h-24 w-24 opacity-50" />
        <div>
          <div className={`h-14 w-px ${lineClass}`} />
          <p
            className={`mt-3 rotate-180 text-[0.6rem] font-bold uppercase tracking-[0.32em] [writing-mode:vertical-rl] ${textClass}`}
          >
            {left}
          </p>
        </div>
      </div>
      <div className="award-float-delayed absolute right-5 bottom-10 grid justify-items-end gap-3">
        <span
          className={`rounded-full border px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] backdrop-blur ${chipClass}`}
        >
          {right}
        </span>
        <StarRating className={tone === "dark" ? "opacity-55" : "opacity-35"} />
      </div>
    </div>
  );
}

export function HomeHero() {
  const heroPoster = "/assets/hero/awards-2025-poster.jpeg";
  const heroVideo =
    "https://beaconmosque.com/wp-content/uploads/2023/05/Beacon-Mosque-Home-Intro-Video.mp4";

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#040816] px-5 pt-20 text-white md:px-8 md:pt-28">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-navy-950">
        <Image
          alt=""
          className="h-full w-full object-cover"
          fill
          priority
          src={heroPoster}
        />
        <HomeHeroVideo poster={heroPoster} src={heroVideo} />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,6,18,0.34),rgba(3,6,18,0.08)_48%,rgba(3,6,18,0.38))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_28%,rgba(39,89,255,0.10),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(10,42,146,0.10),transparent_26%),linear-gradient(180deg,rgba(1,4,14,0.02),rgba(1,4,14,0.22))]" />
      <div className="relative mx-auto flex min-h-[calc(100svh-6.5rem)] max-w-[1720px] flex-col justify-between gap-10 pb-6 md:pb-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-start">
          <div className="pt-4">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/6 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/82 backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gold-300"
              />
              British Beacon Mosque Awards
            </span>
            <h1 className="mt-6 text-[clamp(3.2rem,10vw,8.8rem)] font-bold uppercase leading-[0.86] tracking-[-0.06em] text-white">
              <span className="block">Beacon</span>
              <span
                className="block text-transparent"
                style={{
                  WebkitTextStroke: "1.8px rgba(255,255,255,0.92)",
                }}
              >
                Awards
              </span>
            </h1>
          </div>
          <div className="flex justify-start lg:justify-end">
            <div className="w-full max-w-[360px] border border-white/14 bg-white/5 p-4 backdrop-blur-sm sm:p-6 lg:mt-14">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold-200">
                Awards cycle
              </span>
              <p className="mt-4 text-3xl font-semibold leading-[1.05] text-white sm:text-4xl">
                9th Annual Beacon Mosque Awards 2026
              </p>
              <p className="mt-4 text-sm leading-6 text-white/68 sm:leading-7">
                Celebrating the best of British mosques through service,
                governance, innovation and measurable community impact.
              </p>
              <ButtonLink
                className="mt-6 w-full justify-center sm:w-auto"
                href={awards2026CategoriesHref}
              >
                Submit Your Nomination
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroStatsBand() {
  return null;
}

export function BeaconExcellenceIntroSection() {
  const highlightCards = [
    {
      title: "Winners",
      eyebrow: "Awards archive",
      text: "Explore the latest finalists and winners recognised for measurable community impact, leadership and service excellence.",
      href: "/awards/beacon-mosque-awards-2025/",
      image: "/assets/awards/2025/awards-2025-01.jpg",
      imageAlt: "Beacon Mosque Awards winners artwork",
      mediaMode: "cover",
      mediaClassName: "scale-[1.12]",
    },
    {
      title: "Standards",
      eyebrow: "Beacon framework",
      text: "Review the Beacon Mosque standards that support stronger governance, accountability, communication and community trust.",
      href: "/standards/",
      image: "/assets/interior/standards-wide.jpg",
      imageAlt: "Beacon Mosque standards visual",
      mediaMode: "cover",
      mediaClassName: "",
    },
    {
      title: "Training",
      eyebrow: "Leadership support",
      text: "Access practical training resources, guides and leadership materials to help mosque teams improve delivery and long-term planning.",
      href: "/training/",
      image: "/assets/cards/training-card.png",
      imageAlt: "Beacon Mosque training and leadership support",
      mediaMode: "contain",
      mediaClassName: "",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Recognition" right="Impact" />
      <div className="relative z-10 mx-auto w-full max-w-[1360px]">
        <div className="max-w-[840px]">
          <SectionKicker>National recognition</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            Striving for excellence
          </h2>
          <p className="section-word-motion mt-5 text-sm leading-7 text-black/58 md:text-base">
            Beacon Mosque helps mosques evidence strong practice, celebrate
            outstanding service and share models of leadership that strengthen
            communities across the UK.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlightCards.map((card, index) => (
            <Link
              className="group relative flex min-h-[280px] flex-col justify-between border border-black/10 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:border-black/25 hover:bg-white md:p-6"
              href={card.href}
              key={card.title}
            >
              <div
                className={[
                  "overflow-hidden border border-black/8",
                  card.mediaMode === "contain"
                    ? "bg-white px-4 py-3"
                    : "bg-black/5",
                ].join(" ")}
              >
                <Image
                  alt={card.imageAlt}
                  className={[
                    "aspect-[4/3] w-full transition duration-500",
                    card.mediaMode === "contain"
                      ? "object-contain"
                      : "object-cover group-hover:scale-[1.03]",
                    card.mediaClassName,
                  ].join(" ")}
                  height={720}
                  src={card.image}
                  width={960}
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-emerald-700">
                  {card.eyebrow}
                </span>
                <span className="text-xs font-semibold text-black/28">{`0${index + 1}`}</span>
              </div>
              <div className="mt-7">
                <h3 className="text-[2rem] font-semibold tracking-[-0.04em] text-black md:text-[2.15rem]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-black/60">
                  {card.text}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black">
                Explore
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  +
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwardsFeatureSection() {
  const awards = featureCards[0];

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Nomination" right="Shortlist" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Image
          alt={awards.imageAlt}
          className="aspect-[4/3] w-full object-contain bg-black p-6"
          height={780}
          src={awards.image}
          width={980}
        />
        <div className="max-w-md">
          <SectionKicker>Awards 2026</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            {awards.title}
          </h2>
          <p className="section-word-motion mt-6 text-sm leading-7 text-black/58">
            {awards.text}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <EditorialLink href="/awards/beacon-mosque-awards-2026/">
              View awards
            </EditorialLink>
            <EditorialLink
              className="!bg-white !text-black hover:!bg-black hover:!text-white"
              href={awards2026CategoriesHref}
            >
              Submit nomination
            </EditorialLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PublicationsSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-white px-5 py-16 text-black md:px-8 md:py-24"
      id="events"
    >
      <SectionAwardsDecor left="Programme" right="Ceremony" />
      <div className="relative z-10 mx-auto max-w-[1080px]">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <SectionKicker>Programme</SectionKicker>
            <h2 className="section-word-motion mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Event schedule
            </h2>
          </div>
          <Link
            className="text-xs font-semibold uppercase tracking-[0.14em] text-black hover:text-emerald-700"
            href="/awards/"
          >
            View all
          </Link>
        </div>
        <div className="border-t border-black">
          {[
            [
              "09:30 - 10:30",
              "Awards nominations open",
              "Beacon Mosque Awards",
              "2026 cycle",
            ],
            [
              "10:45 - 12:00",
              "Standards and accreditation briefing",
              "Beacon Mosque",
              "Leadership",
            ],
            [
              "14:00 - 15:30",
              "Winners, finalists and community impact",
              "Awards archive",
              "2025 stories",
            ],
            [
              "17:00 - 18:00",
              "Mosque & Madrassah Expo platform",
              "Partner network",
              "Community",
            ],
          ].map((item) => (
            <div
              className="grid gap-4 border-b border-black/18 py-4 text-xs md:grid-cols-[1fr_2.1fr_1.5fr_1fr]"
              key={item.join("-")}
            >
              <span className="font-semibold">{item[0]}</span>
              <span className="font-semibold">{item[1]}</span>
              <span className="text-black/55">{item[2]}</span>
              <span className="text-black/55">{item[3]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwardsArchiveSection() {
  const archiveYears = [
    ...awardArchiveFeatureYears,
    {
      year: "2018",
      sequence: "1st",
      href: "/awards/2018-british-beacon-mosque-awards/",
      items: [],
    },
  ];
  const archivePreviewByYear: Record<
    string,
    { image: string; imageAlt: string; imageClassName?: string }
  > = {
    "2026": {
      image: "/assets/awards/2026/awards-2026-card.png",
      imageAlt: "Beacon Mosque Awards 2026 archive artwork",
      imageClassName: "object-contain bg-black",
    },
    "2025": {
      image: "/assets/awards/2025/awards-2025-01.jpg",
      imageAlt: "Beacon Mosque Awards 2025 archive artwork",
    },
    "2024": {
      image: "/assets/interior/awards-gala.jpg",
      imageAlt: "Beacon Mosque Awards 2024 archive preview",
    },
    "2023": {
      image: "/assets/awards/2023/awards-2023-01.jpg",
      imageAlt: "Beacon Mosque Awards 2023 archive preview",
    },
    "2022": {
      image: "/assets/awards/2022/award-2022-01.jpg",
      imageAlt: "Beacon Mosque Awards 2022 archive preview",
    },
    "2021": {
      image: "/assets/awards/2021/awards-2021-hero.jpg",
      imageAlt: "Beacon Mosque Awards 2021 archive preview",
    },
    "2020": {
      image: "/assets/awards/2020/awards-2020-hero.jpg",
      imageAlt: "Beacon Mosque Awards 2020 archive preview",
    },
    "2019": {
      image: "/assets/accredited/al-manaar.jpg",
      imageAlt: "Beacon Mosque Awards 2019 archive preview",
    },
    "2018": {
      image: "/assets/awards/2018/awards-2018-hero.jpg",
      imageAlt: "Beacon Mosque Awards 2018 archive preview",
    },
  };
  const archiveCardLayouts = [
    {
      outerClassName:
        "w-[17rem] min-w-[17rem] md:w-[20rem] md:min-w-[20rem] lg:w-[22rem] lg:min-w-[22rem]",
      mediaClassName: "aspect-[3/4]",
      titleClassName: "text-xl md:text-[1.65rem]",
    },
    {
      outerClassName:
        "w-[17rem] min-w-[17rem] md:w-[20rem] md:min-w-[20rem] lg:w-[22rem] lg:min-w-[22rem]",
      mediaClassName: "aspect-[4/5]",
      titleClassName: "text-2xl md:text-[2.2rem]",
    },
    {
      outerClassName:
        "w-[17rem] min-w-[17rem] md:w-[20rem] md:min-w-[20rem] lg:w-[22rem] lg:min-w-[22rem]",
      mediaClassName: "aspect-square",
      titleClassName: "text-[1.7rem] md:text-[1.95rem]",
    },
    {
      outerClassName:
        "w-[17rem] min-w-[17rem] md:w-[20rem] md:min-w-[20rem] lg:w-[22rem] lg:min-w-[22rem]",
      mediaClassName: "aspect-[4/5]",
      titleClassName: "text-2xl md:text-[2.15rem]",
    },
    {
      outerClassName:
        "w-[17rem] min-w-[17rem] md:w-[20rem] md:min-w-[20rem] lg:w-[22rem] lg:min-w-[22rem]",
      mediaClassName: "aspect-[3/4]",
      titleClassName: "text-[1.45rem] md:text-[1.7rem]",
    },
  ] as const;

  return (
    <section className="relative isolate overflow-hidden bg-white px-5 pb-24 pt-8 text-black md:px-8 md:pb-32 md:pt-12">
      <SectionAwardsDecor left="Archive" right="Honours" />
      <div className="relative z-10 mx-auto max-w-[1680px]">
        <AutoScrollRail
          className="no-scrollbar -ml-6 overflow-x-auto overflow-y-hidden pr-2 md:-ml-10 md:pr-3 lg:-ml-12 lg:pr-4"
          contentClassName="flex snap-x snap-mandatory items-start gap-7 md:gap-8 lg:gap-10"
        >
          {archiveYears.map((archive, index) => {
            const layout =
              archiveCardLayouts[index % archiveCardLayouts.length] ??
              archiveCardLayouts[2];

            return (
              <Link
                className={[
                  "group block shrink-0 snap-start",
                  layout.outerClassName,
                ].join(" ")}
                href={archive.href}
                key={archive.year}
              >
                <div
                  className={[
                    "relative overflow-hidden bg-[#f3f1ed]",
                    layout.mediaClassName,
                  ].join(" ")}
                >
                  <Image
                    alt={
                      archivePreviewByYear[archive.year]?.imageAlt ??
                      `Beacon Mosque Awards ${archive.year} archive`
                    }
                    className={[
                      "transition duration-500 group-hover:scale-[1.035]",
                      archivePreviewByYear[archive.year]?.imageClassName ??
                        "object-cover",
                    ].join(" ")}
                    fill
                    sizes="(min-width: 1024px) 460px, (min-width: 768px) 380px, 78vw"
                    src={
                      archivePreviewByYear[archive.year]?.image ??
                      "/assets/awards/2025/awards-2025-01.jpg"
                    }
                  />
                </div>
                <div className="mt-5 flex items-end justify-between gap-5">
                  <p
                    className={[
                      "font-semibold tracking-[-0.04em] text-black",
                      layout.titleClassName,
                    ].join(" ")}
                  >
                    {archive.year}
                  </p>
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
        </AutoScrollRail>
        <div className="mt-12 flex justify-center md:mt-16">
          <ButtonLink
            className="max-w-full px-6 text-center sm:px-8"
            href="/awards/#award-categories"
          >
            Submit Your Nomination for Beacon Mosque Awards 2026
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function WinnersShowcaseSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-28"
      id="winners"
    >
      <SectionAwardsDecor left="Winners" right="Finalists" />
      <WinnersShowcaseInteractive intro="The archive keeps public recognition visible and helps mosque teams learn from strong examples of service, governance and community impact." />
    </section>
  );
}

export function StandardsIntro() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Standards" right="Trust" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div>
          <SectionKicker>Standards</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            Where mosque standards meet public service and trust
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {standards.slice(0, 4).map((standard) => (
            <Link
              className="border-t border-black/18 py-5 transition hover:text-emerald-700"
              href={standard.href}
              key={standard.title}
            >
              <h3 className="text-base font-semibold tracking-[-0.02em]">
                {standard.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QualityStandardsSection() {
  return null;
}

export function ServicesSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-black bg-white py-3 text-black">
      <SectionAwardsDecor left="Service" right="Excellence" />
      <div className="relative z-10 flex gap-8 overflow-hidden whitespace-nowrap text-xs font-semibold">
        {[...serviceCards, ...serviceCards].map((card, index) => (
          <Link
            className="inline-flex items-center gap-3"
            href={card.href}
            key={`${card.title}-${index}`}
          >
            <span aria-hidden="true">+</span>
            {card.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function NetworkSection() {
  const expo = featureCards[1];

  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Network" right="Beacon" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[1fr_0.95fr] md:items-center">
        <div>
          <SectionKicker>National network</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            Beacon Mosque network
          </h2>
          <p className="section-word-motion mt-6 max-w-xl text-sm leading-7 text-black/58">
            A growing network of accredited mosques, award winners and community
            projects demonstrating measurable impact.
          </p>
          <ul className="mt-8 space-y-4">
            {accreditedMosques.map((mosque) => (
              <li className="border-t border-black/12 pt-4" key={mosque.title}>
                <Link
                  className="flex items-center justify-between gap-6 text-sm font-semibold hover:text-emerald-700"
                  href={mosque.href}
                >
                  {mosque.title}
                  <span aria-hidden="true">+</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <Image
            alt={expo.imageAlt}
            className="h-auto w-full"
            height={315}
            src={expo.image}
            width={851}
          />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <SectionKicker>Partner platform</SectionKicker>
              <p className="mt-2 text-sm text-black/58">{expo.title}</p>
            </div>
            <EditorialLink href="/beacon-mosques/">
              View beacon mosques
            </EditorialLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MosqueMbaSection() {
  const programmeStats = [
    ["200+", "online seminars"],
    ["12-18", "months"],
    ["42", "core modules"],
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Leadership" right="Mosque MBA" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(215,169,72,0.12),transparent_22%),radial-gradient(circle_at_88%_24%,rgba(39,89,255,0.1),transparent_26%)]" />
      <div className="relative z-10 mx-auto max-w-[1260px]">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="max-w-[34rem]">
            <SectionKicker>Faith Associates Academy</SectionKicker>
            <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
              Mosque MBA for modern mosque leadership
            </h2>
            <p className="section-word-motion mt-6 max-w-2xl text-base leading-8 text-black/62 md:text-lg md:leading-9">
              A masters-level professional pathway for mosque founders, executives and volunteers building stronger institutions, clearer leadership and sustainable community projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-12 items-center justify-center border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black"
                href="https://mosque.mba/"
                rel="noreferrer"
                target="_blank"
              >
                Visit Mosque MBA
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {programmeStats.map(([value, label]) => (
                <div
                  className="border-t border-black/14 pt-4"
                  key={label}
                >
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-black">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-black/56">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid items-start gap-5">
            <div className="self-start overflow-hidden rounded-[28px] border border-black/10 bg-white p-3 shadow-[0_32px_110px_rgba(0,0,0,0.12)]">
              <Image
                alt="Mosque MBA programme visual"
                className="h-auto w-full rounded-[22px]"
                height={864}
                src="/assets/home/mosque-mba-programme.png"
                width={1536}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "Tailored for mosque leaders",
                "Interactive global learning",
                "Sustainable project design",
              ].map((item) => (
                <div
                  className="flex min-h-[108px] items-end border border-black/10 bg-white p-5 text-lg font-semibold tracking-[-0.03em] text-black shadow-[0_24px_80px_rgba(0,0,0,0.06)]"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AccreditedSection() {
  return null;
}

export function CeremonyGallerySection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f3f1ed] py-20 text-black md:py-28">
      <SectionAwardsDecor left="Gallery" right="Moments" />
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mb-10 max-w-xl">
          <SectionKicker>Gallery</SectionKicker>
          <h2 className="section-word-motion mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
            Ceremony moments and community stories
          </h2>
        </div>
      </div>
      <div className="relative z-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f3f1ed] to-transparent md:w-14"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f3f1ed] to-transparent md:w-14"
        />
        <div className="overflow-hidden px-5 md:px-8">
          <div className="gallery-marquee-track flex w-max gap-5">
            {[0, 1].map((loop) => (
              <div className="flex shrink-0 gap-5" key={loop}>
                {ceremonyGallery.map((item, index) => (
                  <figure
                    className="w-[260px] shrink-0 md:w-[340px]"
                    key={`${item.src}-${loop}-${index}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-white">
                      <Image
                        alt={item.alt}
                        className="object-cover"
                        fill
                        sizes="340px"
                        src={item.src}
                      />
                    </div>
                    <figcaption className="mt-4 text-xs font-semibold">
                      {item.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedSpeakersSection() {
  return null;
}

export function ExperiencePillarsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Pathways" right="Progress" />
      <div className="relative z-10 mx-auto grid max-w-[980px] gap-12 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionKicker>Pathways</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            Recognition, standards and accreditation in one national platform
          </h2>
        </div>
        <div className="space-y-8">
          {[
            [
              "Awards",
              "/awards/",
              "National recognition for mosques, teams and individuals raising the bar.",
            ],
            [
              "Standards",
              "/standards/",
              "Practical benchmarks for governance, communication and service delivery.",
            ],
            [
              "Accreditation",
              "/accreditation-process/",
              "A route for evidencing quality and progressing toward Beacon status.",
            ],
          ].map(([title, href, text]) => (
            <Link
              className="block border-b border-black/14 pb-8 transition hover:text-emerald-700"
              href={href}
              key={title}
            >
              <h3 className="text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
                {title}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-black/58">
                {text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsShowcaseSection() {
  return null;
}

export function FinalCta() {
  return (
    <section className="relative isolate min-h-[520px] overflow-hidden bg-black px-5 py-20 text-center text-white md:px-8 md:py-28">
      <SectionAwardsDecor left="Nominate" right="2026" tone="dark" />
      <Image
        alt="Beacon Mosque Awards final call to action"
        className="object-cover object-[50%_18%]"
        fill
        sizes="100vw"
        src="/wp-content/uploads/2025/12/19-1024x576.jpg"
      />
      <div className="absolute inset-0 bg-black/42" />
      <div className="relative z-10 mx-auto flex min-h-[360px] max-w-3xl flex-col items-center justify-center">
        <SectionKicker>Beacon Mosque Awards 2026</SectionKicker>
        <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
          Presenting the most inspiring mosque excellence stories of the season
        </h2>
        <EditorialLink
          className="mt-7 border-white bg-transparent text-white hover:bg-white hover:text-black"
          href={awards2026CategoriesHref}
        >
          Submit nomination
        </EditorialLink>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const footerNav = mainNav.filter((item) => item.href !== "/");

  return (
    <footer className="overflow-hidden bg-[#05070a] px-5 py-14 text-white md:px-8">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs text-white/55">
            Copyright 2018 - 2026 | Beacon Mosque | All Rights Reserved
          </p>
          <p className="text-sm text-white/78">
            Email:{" "}
            <Link
              className="font-medium text-[#d8c0a6] hover:text-white"
              href="mailto:info@faithassociates.co.uk"
            >
              info@faithassociates.co.uk
            </Link>
          </p>
        </div>
        <Image
          alt="Beacon Mosque"
          className="h-auto w-36"
          height={1120}
          src="/assets/brand/beacon-mosque-white.png"
          width={3820}
        />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-4 text-xs text-white/60">
            {footerNav.slice(0, 5).map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mt-12 flex justify-center gap-[0.35em] text-center text-[clamp(3.2rem,15vw,13rem)] font-black uppercase leading-none tracking-[-0.08em] text-[#d8c0a6]">
        <span>Beacon</span>
        <span>Mosque</span>
      </p>
    </footer>
  );
}
