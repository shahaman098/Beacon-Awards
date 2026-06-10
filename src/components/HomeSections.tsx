import Image from "next/image";
import Link from "next/link";
import {
  accreditedMosques,
  awardWinners2025,
  ceremonyGallery,
  featureCards,
  mainNav,
  newsCards,
  serviceCards,
  standards,
  type CardLink,
} from "@/lib/content";
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
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
      <div className="award-float-slow absolute -left-12 top-8 flex items-center gap-4 2xl:left-5">
        <AwardSeal className="h-24 w-24 opacity-50" />
        <div>
          <div className={`h-14 w-px ${lineClass}`} />
          <p className={`mt-3 rotate-180 text-[0.6rem] font-bold uppercase tracking-[0.32em] [writing-mode:vertical-rl] ${textClass}`}>
            {left}
          </p>
        </div>
      </div>
      <div className="award-float-delayed absolute right-5 bottom-10 grid justify-items-end gap-3">
        <span className={`rounded-full border px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] backdrop-blur ${chipClass}`}>
          {right}
        </span>
        <StarRating className={tone === "dark" ? "opacity-55" : "opacity-35"} />
      </div>
    </div>
  );
}

export function HomeHero() {
  const heroPoster = "/assets/hero/awards-2025-poster.jpeg";
  const heroVideo = "https://beaconmosque.com/wp-content/uploads/2023/05/Beacon-Mosque-Home-Intro-Video.mp4";

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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,6,18,0.78),rgba(3,6,18,0.52)_48%,rgba(3,6,18,0.82))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_28%,rgba(39,89,255,0.24),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(10,42,146,0.28),transparent_24%),linear-gradient(180deg,rgba(1,4,14,0.10),rgba(1,4,14,0.68))]" />
      <div className="relative mx-auto flex min-h-[calc(100svh-6.5rem)] max-w-[1720px] flex-col justify-between gap-10 pb-6 md:pb-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-start">
          <div className="pt-4">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/6 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/82 backdrop-blur-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-300" />
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
                Celebrating the best of British mosques through service, governance, innovation and measurable community impact.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 border-t border-white/12 pt-6 lg:max-w-[62%]">
          <div className="max-w-2xl">
            <p className="text-sm leading-7 text-white/76 sm:text-lg sm:leading-8">
              Beacon Mosque helps mosques raise standards, evidence strong practice and share models of service that strengthen communities across the UK and beyond.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink className="min-w-[220px]" href="/awards/beacon-mosque-awards-2026/">
                Submit Your Nomination
              </ButtonLink>
              <Link
                className="inline-flex min-h-12 items-center justify-center border border-white/22 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
                href="/awards/beacon-mosque-awards-2025/"
              >
                View Winners and Finalists
              </Link>
            </div>
            <div className="mt-8 lg:hidden">
              <p className="text-[clamp(3rem,14vw,4.6rem)] font-bold leading-none text-white">9TH</p>
              <p className="mt-2 text-[clamp(1.8rem,8vw,3rem)] font-semibold uppercase leading-none text-white/94">
                2026
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/62">
                October awards cycle
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-6 right-0 hidden text-right lg:block">
          <p className="text-[clamp(4rem,8vw,6.8rem)] font-bold leading-none text-white">9TH</p>
          <p className="mt-2 text-[clamp(2rem,3vw,3.6rem)] font-semibold uppercase leading-none text-white/94">
            2026
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/62">
            October awards cycle
          </p>
        </div>
      </div>
    </section>
  );
}

export function HeroStatsBand() {
  return null;
}

export function BeaconExcellenceIntroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Recognition" right="Impact" />
      <div className="relative z-10 mx-auto grid max-w-[980px] gap-12 md:grid-cols-[0.85fr_1fr] md:items-start">
        <div className="relative mx-auto w-full max-w-[330px] md:mt-10">
          <Image
            alt="Beacon Mosque Awards attendees"
            className="aspect-[4/5] w-full object-cover"
            height={820}
            src="/assets/interior/awards-gala.jpg"
            width={650}
          />
        </div>
        <div>
          <div className="max-w-md">
            <SectionKicker>National recognition</SectionKicker>
            <h2 className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">
              Striving for excellence
            </h2>
            <p className="section-word-motion mt-5 text-sm leading-7 text-black/58">
              Beacon Mosque helps mosques evidence strong practice, celebrate outstanding service and share models of leadership that strengthen communities across the UK.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-[0.85fr_1fr] md:items-end">
            <Image
              alt="Beacon Mosque ceremony moment"
              className="aspect-[4/3] w-full object-cover"
              height={560}
              src="/wp-content/uploads/2025/12/05-768x432.jpg"
              width={760}
            />
            <p className="section-word-motion text-center text-xl font-semibold leading-tight tracking-[-0.03em] md:text-2xl">
              Attend our awards programme to stay informed about excellent mosques, leaders and volunteers.
            </p>
          </div>
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
          <p className="section-word-motion mt-6 text-sm leading-7 text-black/58">{awards.text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <EditorialLink href="/awards/beacon-mosque-awards-2026/">View awards</EditorialLink>
            <EditorialLink className="!bg-white !text-black hover:!bg-black hover:!text-white" href="/awards/beacon-mosque-awards-2026/">
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
    <section className="relative isolate overflow-hidden bg-white px-5 py-16 text-black md:px-8 md:py-24" id="events">
      <SectionAwardsDecor left="Programme" right="Ceremony" />
      <div className="relative z-10 mx-auto max-w-[1080px]">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <SectionKicker>Programme</SectionKicker>
            <h2 className="section-word-motion mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">Event schedule</h2>
          </div>
          <Link className="text-xs font-semibold uppercase tracking-[0.14em] text-black hover:text-emerald-700" href="/awards/">
            View all
          </Link>
        </div>
        <div className="border-t border-black">
          {[
            ["09:30 - 10:30", "Awards nominations open", "Beacon Mosque Awards", "2026 cycle"],
            ["10:45 - 12:00", "Standards and accreditation briefing", "Beacon Mosque", "Leadership"],
            ["14:00 - 15:30", "Winners, finalists and community impact", "Awards archive", "2025 stories"],
            ["17:00 - 18:00", "Mosque & Madrassah Expo platform", "Partner network", "Community"],
          ].map((item) => (
            <div className="grid gap-4 border-b border-black/18 py-4 text-xs md:grid-cols-[1fr_2.1fr_1.5fr_1fr]" key={item.join("-")}>
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
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 pb-20 text-black md:px-8 md:pb-28">
      <SectionAwardsDecor left="Archive" right="Honours" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="no-scrollbar flex gap-5 overflow-x-auto pb-3 md:justify-end">
          {awardWinners2025.slice(0, 5).map((winner, index) => (
            <Link className="group block min-w-[220px]" href="/awards/beacon-mosque-awards-2025/" key={`${winner.src}-${index}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f1ed]">
                <Image
                  alt={winner.alt}
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
                  fill
                  sizes="220px"
                  src={winner.src}
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 text-xs font-semibold">
                <span>{winner.alt.replace(" - ", " ")}</span>
                <span aria-hidden="true">+</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WinnersShowcaseSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-28" id="winners">
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
            <Link className="border-t border-black/18 py-5 transition hover:text-emerald-700" href={standard.href} key={standard.title}>
              <Image alt="" className="mb-4 h-9 w-9 object-contain" height={64} src={standard.image} width={64} />
              <h3 className="text-base font-semibold tracking-[-0.02em]">{standard.title}</h3>
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
          <Link className="inline-flex items-center gap-3" href={card.href} key={`${card.title}-${index}`}>
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
            A growing network of accredited mosques, award winners and community projects demonstrating measurable impact.
          </p>
          <ul className="mt-8 space-y-4">
            {accreditedMosques.map((mosque) => (
              <li className="border-t border-black/12 pt-4" key={mosque.title}>
                <Link className="flex items-center justify-between gap-6 text-sm font-semibold hover:text-emerald-700" href={mosque.href}>
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
            <EditorialLink href="/beacon-mosques/">View beacon mosques</EditorialLink>
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
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f3f1ed] to-transparent md:w-14" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f3f1ed] to-transparent md:w-14" />
        <div className="overflow-hidden px-5 md:px-8">
          <div className="gallery-marquee-track flex w-max gap-5">
            {[0, 1].map((loop) => (
              <div className="flex shrink-0 gap-5" key={loop}>
                {ceremonyGallery.map((item, index) => (
                  <figure className="w-[260px] shrink-0 md:w-[340px]" key={`${item.src}-${loop}-${index}`}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-white">
                      <Image alt={item.alt} className="object-cover" fill sizes="340px" src={item.src} />
                    </div>
                    <figcaption className="mt-4 text-xs font-semibold">{item.caption}</figcaption>
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
            ["Awards", "/awards/", "National recognition for mosques, teams and individuals raising the bar."],
            ["Standards", "/standards/", "Practical benchmarks for governance, communication and service delivery."],
            ["Accreditation", "/accreditation-process/", "A route for evidencing quality and progressing toward Beacon status."],
          ].map(([title, href, text]) => (
            <Link className="block border-b border-black/14 pb-8 transition hover:text-emerald-700" href={href} key={title}>
              <h3 className="text-4xl font-semibold tracking-[-0.06em] md:text-6xl">{title}</h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-black/58">{text}</p>
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

function NewsItem({ card }: { card: CardLink }) {
  return (
    <Link className="block border-t border-black/14 pt-5 transition hover:text-emerald-700" href={card.href}>
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/42">{card.meta}</span>
      <h3 className="mt-3 text-base font-semibold leading-snug tracking-[-0.02em]">{card.title}</h3>
    </Link>
  );
}

export function NewsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Stories" right="Updates" />
      <div className="relative z-10 mx-auto grid max-w-[1080px] gap-12 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionKicker>News & stories</SectionKicker>
          <h2 className="section-word-motion mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">From our blog</h2>
        </div>
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {newsCards.map((card) => (
            <NewsItem card={card} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative isolate min-h-[520px] overflow-hidden bg-black px-5 py-20 text-center text-white md:px-8 md:py-28">
      <SectionAwardsDecor left="Nominate" right="2026" tone="dark" />
      <Image
        alt="Beacon Mosque Awards final call to action"
        className="object-cover"
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
        <EditorialLink className="mt-7 border-white bg-transparent text-white hover:bg-white hover:text-black" href="/awards/beacon-mosque-awards-2026/">
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
        <p className="text-xs text-white/55">Copyright 2018 - 2026 | Beacon Mosque | All Rights Reserved</p>
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
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mt-12 text-[clamp(3.2rem,15vw,13rem)] font-black uppercase leading-none tracking-[-0.08em] text-[#d8c0a6]">
        Beacon Mosque
      </p>
    </footer>
  );
}
