import Image from "next/image";
import Link from "next/link";
import {
  accreditedMosques,
  awardWinners2025,
  ceremonyGallery,
  featureCards,
  heroStats,
  mainNav,
  newsCards,
  serviceCards,
  standards,
  type CardLink,
  type ImageCard,
} from "@/lib/content";
import { ButtonLink } from "@/components/ButtonLink";
import { HomeHeroSlideshow } from "@/components/HomeHeroSlideshow";
import { HomeHeroVideo } from "@/components/HomeHeroVideo";
import { SectionHeader } from "@/components/SectionHeader";
import { AwardCardAccent, AwardSeal, StarRating } from "@/components/AwardMotifs";

function Card({ card }: { card: CardLink }) {
  return (
    <Link
      className="group relative block overflow-hidden rounded-lg border border-slate-900/10 bg-white/82 p-7 shadow-[0_12px_32px_rgba(7,21,36,0.06)] transition duration-200 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_24px_60px_rgba(7,21,36,0.14)]"
      href={card.href}
    >
      <AwardCardAccent />
      {card.meta ? (
        <span className="relative z-10 mb-5 inline-block text-xs font-bold uppercase text-emerald-700">
          {card.meta}
        </span>
      ) : null}
      <h3 className="relative z-10 text-xl font-semibold leading-snug text-slate-950">{card.title}</h3>
      <p className="relative z-10 mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[linear-gradient(90deg,#d7a948,transparent)] opacity-0 transition group-hover:opacity-100" />
    </Link>
  );
}

function NewsCard({ card }: { card: CardLink }) {
  return (
    <Link
      className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-900/10 bg-white shadow-[0_12px_32px_rgba(7,21,36,0.06)] transition duration-200 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_24px_60px_rgba(7,21,36,0.14)]"
      href={card.href}
    >
      {card.image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
          <Image
            alt={card.imageAlt ?? ""}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            src={card.image}
          />
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(7,21,36,0.55))]" />
          {card.meta ? (
            <span className="absolute left-4 top-4 rounded-full bg-gold-400/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-950 shadow">
              {card.meta}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug text-slate-950 transition group-hover:text-emerald-700">
          {card.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{card.text}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          Read story
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

function FeatureCard({ card }: { card: ImageCard }) {
  return (
    <article
      className={[
        "grid overflow-hidden rounded-lg border shadow-[0_16px_40px_rgba(7,21,36,0.08)] md:grid-cols-[280px_1fr]",
        card.dark
          ? "border-gold-300/25 bg-[linear-gradient(135deg,#063f35,#071524)] text-white"
          : "border-gold-300/35 bg-white/86 text-slate-950",
      ].join(" ")}
    >
      <div className="relative min-h-64 w-full overflow-hidden bg-cream-100 md:min-h-full">
        <Image
          alt={card.imageAlt}
          className="object-contain p-5"
          fill
          sizes="(min-width: 768px) 280px, 100vw"
          src={card.image}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,21,36,0.14))]"
        />
      </div>
      <div className="relative p-8">
        <span className="absolute left-0 top-9 h-12 w-0.5 bg-gold-400" />
        <h3 className="text-2xl font-semibold leading-tight">{card.title}</h3>
        <p className={["mt-4 leading-8", card.dark ? "text-white/76" : "text-slate-600"].join(" ")}>
          {card.text}
        </p>
        {card.actions ? (
          <div className="mt-6 flex flex-wrap gap-4">
            {card.actions.map((action) => (
              <Link
                className={[
                  "text-sm font-bold",
                  card.dark ? "text-gold-200" : "text-emerald-700",
                ].join(" ")}
                href={action.href}
                key={`${action.href}-${action.label}`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function HomeHero() {
  const heroPoster = "/assets/hero/awards-2025-poster.jpeg";
  const heroVideo = "https://beaconmosque.com/wp-content/uploads/2023/05/Beacon-Mosque-Home-Intro-Video.mp4";
  const heroSlides = [
    { src: "/wp-content/uploads/2025/12/02-700x441.jpg", alt: "Beacon Mosque awards visual 1" },
    { src: "/wp-content/uploads/2025/12/03-460x295.jpg", alt: "Beacon Mosque awards visual 2" },
    { src: "/wp-content/uploads/2025/12/05-768x432.jpg", alt: "Beacon Mosque awards visual 3" },
    { src: "/wp-content/uploads/2025/12/06-600x338.jpg", alt: "Beacon Mosque awards visual 4" },
    { src: "/wp-content/uploads/2025/12/17.jpg", alt: "Beacon Mosque awards visual 5" },
    { src: "/wp-content/uploads/2025/12/19-1024x576.jpg", alt: "Beacon Mosque awards visual 6" },
    { src: "/wp-content/uploads/2025/12/26-1024x576.jpg", alt: "Beacon Mosque awards visual 7" },
    { src: "/wp-content/uploads/2025/12/27-700x441.jpg", alt: "Beacon Mosque awards visual 8" },
  ];

  return (
    <section className="pattern-dark relative isolate overflow-hidden bg-navy-950 px-5 py-16 text-white md:px-8 md:py-24">
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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,21,36,0.95),rgba(6,63,53,0.86)_52%,rgba(7,21,36,0.78))]" />
      <div className="absolute inset-0 -z-10 islamic-pattern-dark opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(216,169,72,0.30),transparent_30%),radial-gradient(circle_at_80%_12%,rgba(15,138,104,0.24),transparent_34%)]" />
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1fr_0.82fr]">
        <div className="relative">
          <span className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold-200/40 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-200 backdrop-blur">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-300" />
            British Beacon Mosque Awards
          </span>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.03] text-white md:text-6xl">
            Celebrating <span className="text-gold-200">excellence</span> in British mosques
          </h1>
          <div className="mt-5 max-w-xl gold-divider" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            Beacon Mosque helps mosques raise standards, evidence strong practice and share models of service that strengthen communities across the UK and beyond.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/awards/beacon-mosque-awards-2026/">Submit Your Nomination</ButtonLink>
            <ButtonLink href="/awards/beacon-mosque-awards-2025/" variant="secondary">
              View Winners and Finalists
            </ButtonLink>
          </div>
          <div className="mt-8 hidden items-center gap-4 sm:flex">
            <AwardSeal className="h-14 w-14" />
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-gold-200">Next awards cycle</span>
              <Link className="text-base font-semibold text-white hover:text-gold-200" href="/awards/beacon-mosque-awards-2026/">
                9th Beacon Mosque Awards 2026 &mdash; nominations open
              </Link>
            </div>
          </div>
        </div>
        <div className="relative hidden justify-self-center lg:block">
          <span
            aria-hidden="true"
            className="absolute -inset-6 rounded-[12px_12px_280px_280px] bg-[radial-gradient(circle_at_50%_30%,rgba(241,213,138,0.35),transparent_65%)] blur-2xl"
          />
          <div className="arch-frame-lg relative w-[420px] max-w-[42vw] border border-gold-200/50 bg-emerald-950 p-3 shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
            <span aria-hidden="true" className="arch-frame-lg absolute inset-1.5 border border-gold-200/30" />
            <div className="arch-frame-lg-inner relative z-10 aspect-[0.67] overflow-hidden">
              <HomeHeroSlideshow slides={heroSlides} />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-4 left-1/2 flex h-8 w-8 -translate-x-1/2 rotate-45 items-center justify-center border border-gold-200/60 bg-emerald-950"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroStatsBand() {
  return (
    <section className="pattern-dark bg-[linear-gradient(90deg,#063f35,#071524)] px-5 py-6 text-white md:px-8">
      <div className="mx-auto grid max-w-[1180px] overflow-hidden rounded-lg border border-gold-200/25 bg-white/7 sm:grid-cols-3">
        {heroStats.map((stat) => (
          <div className="border-b border-gold-200/20 p-5 sm:border-b-0 sm:border-r last:border-0" key={stat.label}>
            <strong className="block text-2xl font-bold text-gold-200">{stat.value}</strong>
            <span className="mt-2 block text-sm font-medium leading-5 text-white/74">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AwardsFeatureSection() {
  return (
    <section className="relative bg-cream-100 px-5 py-20 md:px-8 md:py-24">
      <span aria-hidden="true" className="islamic-pattern absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1180px]">
        <SectionHeader
          title="9th Annual British Beacon Mosque Awards 2025"
          text="The 2025 awards celebrate the best of British mosques, highlighting service, governance, innovation and community impact."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {featureCards.map((card) => (
            <FeatureCard card={card} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function StandardsIntro() {
  return (
    <section className="pattern-light relative bg-white px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            Our Mission
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
            Establishing global mosque standards
          </h2>
          <div className="mt-5 max-w-md gold-divider" aria-hidden="true" />
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Beacon Mosque is committed to highlighting excellent practices, promoting effective governance and helping to establish benchmarks of quality for other Mosques and Islamic Centres to try and emulate.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink className="focus:ring-offset-white" href="/standards/">
              Explore standards
            </ButtonLink>
            <ButtonLink className="focus:ring-offset-white" href="/accreditation-process/" variant="secondary">
              Accreditation process
            </ButtonLink>
          </div>
          <div className="mt-8 inline-flex items-center gap-4 rounded-lg border border-gold-300/40 bg-cream-100 px-5 py-4">
            <Image
              alt="Beacon Mosque"
              className="h-12 w-auto"
              height={91}
              src="/assets/brand/beacon-mosque.png"
              width={250}
            />
            <StarRating className="!gap-1" />
          </div>
        </div>
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute -inset-4 rounded-[12px_12px_240px_240px] bg-[radial-gradient(circle_at_50%_20%,rgba(216,169,72,0.32),transparent_70%)] blur-xl"
          />
          <div className="arch-frame-lg relative overflow-hidden border-2 border-gold-300/50 bg-emerald-950 shadow-[0_30px_70px_rgba(7,21,36,0.20)]">
            <Image
              alt="Heritage mosque architecture detail"
              className="arch-frame-lg h-[440px] w-full object-cover"
              height={840}
              src="/assets/interior/golden-mosque.jpg"
              width={620}
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(7,21,36,0.65))]"
            />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <AwardSeal className="h-16 w-16" />
              <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-gold-200">
                Five star Beacon standard
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="relative bg-cream-100 px-5 py-20 md:px-8 md:py-24">
      <span aria-hidden="true" className="islamic-pattern absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            title="Support for every stage"
            text="Practical pathways for accreditation, advice, training and community excellence."
          />
          <Link className="text-sm font-bold text-emerald-700 underline underline-offset-4" href="/resources/">
            Resources
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((card) => (
            <Card card={card} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function QualityStandardsSection() {
  return (
    <section className="pattern-dark relative overflow-hidden bg-[linear-gradient(135deg,#071524,#063f35)] px-5 py-20 text-white md:px-8 md:py-24">
      <span aria-hidden="true" className="islamic-pattern-dark absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1180px]">
        <SectionHeader
          inverse
          title="Attaining Quality Standards"
          text="Each standard points mosque leadership teams toward clear evidence, better systems and stronger community outcomes."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {standards.map((standard) => (
            <Link
              className="group flex min-h-44 flex-col items-center justify-center gap-4 rounded-lg border border-gold-200/22 bg-white/8 p-5 text-center transition duration-200 hover:-translate-y-1 hover:border-gold-200/60 hover:bg-white/12 hover:shadow-[0_22px_45px_rgba(0,0,0,0.22)]"
              href={standard.href}
              key={standard.title}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-200/30 bg-white/5 transition group-hover:border-gold-200/60">
                <Image alt="" className="h-9 w-9" height={64} src={standard.image} width={64} />
              </span>
              <span className="text-sm font-semibold leading-tight text-white">{standard.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NetworkSection() {
  return (
    <section className="bg-cream-100 px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            National network
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
            Beacon Mosque network
          </h2>
          <div className="mt-5 max-w-md gold-divider" aria-hidden="true" />
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A growing network of accredited mosques, award winners and community projects demonstrating measurable impact.
          </p>
          <ul className="mt-7 space-y-4 text-base leading-7 text-slate-600">
            {[
              "Quality standards for mosque leadership and management",
              "Awards categories that surface practical excellence",
              "Resources for mosques developing stronger public services",
            ].map((item) => (
              <li className="relative border-t border-slate-900/10 pt-4 pl-8" key={item}>
                <span className="absolute left-1 top-7 h-2.5 w-2.5 rounded-full bg-gold-400 shadow-[0_0_0_5px_rgba(216,169,72,0.16)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg border border-gold-300/35 bg-white p-6 shadow-[0_24px_60px_rgba(7,21,36,0.16)]">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,#d7a948,transparent)]" />
            <Image
              alt="Mosque and Madrassah Expo cover artwork"
              className="rounded-md"
              height={315}
              src="/wp-content/uploads/2025/12/Original.png"
              width={851}
            />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Partner platform</span>
                <p className="mt-1 text-sm leading-6 text-slate-600">Mosque &amp; Madrassah Expo</p>
              </div>
              <ButtonLink className="focus:ring-offset-white" href="/beacon-mosques/">
                View beacon mosques
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
  return (
    <section className="pattern-light bg-white px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            title="Latest news and award stories"
            text="Current stories from award winners, accredited mosques and national community initiatives."
          />
          <Link className="text-sm font-bold text-emerald-700 underline underline-offset-4" href="/category/news/">
            All news
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {newsCards.map((card) => (
            <NewsCard card={card} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CeremonyGallerySection() {
  return (
    <section className="relative overflow-hidden bg-cream-100 px-5 py-20 md:px-8 md:py-24">
      <span aria-hidden="true" className="islamic-pattern absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1180px]">
        <SectionHeader
          title="Inside the ceremonies"
          text="Moments from past Beacon Mosque Awards ceremonies, accredited mosques and community gatherings."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {ceremonyGallery.map((item, index) => (
            <figure
              className={[
                "group relative overflow-hidden rounded-lg border border-gold-300/30 bg-emerald-950 shadow-[0_16px_40px_rgba(7,21,36,0.10)]",
                index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square",
              ].join(" ")}
              key={item.src + index}
            >
              <Image
                alt={item.alt}
                className="object-cover transition duration-500 group-hover:scale-105"
                fill
                sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                src={item.src}
              />
              {item.caption ? (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,21,36,0.75))]"
                  />
                  <figcaption className="absolute bottom-3 left-4 right-4 text-xs font-semibold uppercase tracking-wider text-gold-200 md:text-sm">
                    {item.caption}
                  </figcaption>
                </>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WinnersShowcaseSection() {
  return (
    <section className="pattern-dark relative overflow-hidden bg-[linear-gradient(135deg,#071524,#063f35)] px-5 py-20 text-white md:px-8 md:py-24">
      <span aria-hidden="true" className="islamic-pattern-dark absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-3 rounded-full border border-gold-200/40 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-200 backdrop-blur">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-300" />
              8th BBMA 2025
            </span>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
              Meet the 2025 Beacon Mosque Award winners
            </h2>
            <div className="mt-5 max-w-md gold-divider" aria-hidden="true" />
            <p className="mt-6 text-base leading-8 text-white/76 md:text-lg">
              Mosques, madrassahs and individuals recognised at the 8th British Beacon Mosque Awards 2025, hosted by Faith Associates.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold-200 hover:text-gold-300"
            href="/awards/beacon-mosque-awards-2025/"
          >
            All winners &amp; finalists <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {awardWinners2025.map((winner) => (
            <figure
              className="group relative aspect-square overflow-hidden rounded-lg border border-gold-200/30 bg-navy-950 shadow-[0_18px_44px_rgba(0,0,0,0.30)] transition duration-300 hover:-translate-y-1 hover:border-gold-200/60 hover:shadow-[0_28px_60px_rgba(0,0,0,0.40)]"
              key={winner.src}
            >
              <Image
                alt={winner.alt}
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                src={winner.src}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 ring-1 ring-inset ring-gold-200/10 transition group-hover:ring-gold-200/30"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AccreditedSection() {
  return (
    <section className="relative bg-white px-5 py-20 md:px-8 md:py-24">
      <div className="relative mx-auto max-w-[1180px]">
        <SectionHeader
          title="Accredited Beacon Mosques"
          text="Recognised mosques demonstrating quality, service and leadership through the Beacon Mosque accreditation pathway."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {accreditedMosques.map((mosque) => (
            <Link
              className="group overflow-hidden rounded-lg border border-slate-900/10 bg-white shadow-[0_12px_32px_rgba(7,21,36,0.07)] transition duration-200 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_24px_60px_rgba(7,21,36,0.14)]"
              href={mosque.href}
              key={mosque.title}
            >
              <div className="relative aspect-[1.42] overflow-hidden bg-cream-100">
                <Image
                  alt={mosque.imageAlt}
                  className="object-cover transition duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  src={mosque.image}
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-700/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                  <span aria-hidden="true">&#9733;</span> Accredited
                </span>
              </div>
              <div className="border-t-2 border-gold-300/60 p-6">
                <h3 className="text-xl font-semibold text-slate-950 transition group-hover:text-emerald-700">{mosque.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{mosque.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="pattern-dark relative isolate overflow-hidden px-5 py-20 text-white md:px-8 md:py-24">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="100vw"
          src="/assets/interior/awards-gala.jpg"
        />
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(7,21,36,0.92),rgba(6,63,53,0.88)_55%,rgba(7,21,36,0.78))]"
      />
      <span aria-hidden="true" className="islamic-pattern-dark absolute inset-0 -z-10 opacity-50" />
      <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <AwardSeal className="mb-6 h-16 w-16" />
          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
            Help set the standard for mosque excellence
          </h2>
          <div className="mt-5 max-w-md gold-divider" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Nominate a mosque, review the standards or contact Beacon Mosque to start the accreditation conversation.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <ButtonLink href="/awards/beacon-mosque-awards-2026/">Submit Your Nomination</ButtonLink>
          <ButtonLink href="/contact-us/" variant="light">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const footerNav = mainNav.filter((item) => item.href !== "/");

  return (
    <footer className="bg-[linear-gradient(180deg,#071524,#0b1e30)] px-5 py-14 text-white md:px-8 md:py-16">
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.1fr_0.7fr_0.95fr]">
        <div>
          <Image
            alt="Beacon Mosque"
            className="h-auto w-64"
            height={1120}
            src="/assets/brand/beacon-mosque-white.png"
            width={3820}
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/76">
            Beacon Mosque has been developed to recognize the role Mosques and Islamic Centres play in the life of towns and cities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/contact-us/" variant="light">
              Contact Us
            </ButtonLink>
            <ButtonLink href="/standards/" variant="secondary">
              View Standards
            </ButtonLink>
          </div>
        </div>
        <div className="grid gap-3 content-start">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-200">Explore</h2>
          <nav aria-label="Footer">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link className="text-sm text-white/76 transition hover:text-gold-200" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-white/6 transition hover:border-gold-200/30" href="https://mosqueexpo.com/" rel="noreferrer" target="_blank">
            <Image
              alt="Mosque and Madrassah Expo"
              className="h-auto w-full"
              height={315}
              src="/assets/network/mosque-expo-cover.png"
              width={851}
            />
          </Link>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/6 p-6">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-200">Awards</span>
          <Image
            alt="British Beacon Mosque Awards"
            className="mt-5 h-auto w-64 md:w-72"
            height={182}
            src="/assets/awards/bm-awards-gold.png"
            width={500}
          />
          <p className="mt-5 text-sm leading-7 text-white/76">
            Submit a nomination for the 9th Beacon Mosque Awards 2026 and continue the accreditation conversation.
          </p>
          <ButtonLink className="mt-6 flex w-full sm:w-auto" href="/awards/beacon-mosque-awards-2026/">
            Submit Your Nomination for the 9th Beacon Mosque Awards 2026
          </ButtonLink>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1180px] border-t border-white/10 pt-6 text-sm text-white/70 md:flex md:items-center md:justify-between md:text-left">
        <p>Copyright 2018 - 2026 | Beacon Mosque | All Rights Reserved</p>
        <p className="mt-2 md:mt-0">Built around awards, standards, accreditation and community resources.</p>
      </div>
    </footer>
  );
}
