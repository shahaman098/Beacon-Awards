import Image from "next/image";
import Link from "next/link";
import { accreditedMosques, standards, type CardLink } from "@/lib/content";
import type { InteriorPage as InteriorPageData, PageForm, PageSection } from "@/lib/pages";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";
import { AwardCardAccent } from "@/components/AwardMotifs";

function TextSection({ section }: { section: Extract<PageSection, { kind: "text" }> }) {
  return (
    <section className="pattern-light bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[960px]">
        {section.title ? <SectionHeader align="left" title={section.title} /> : null}
        <div className="space-y-5 text-lg leading-9 text-slate-600">
          {section.paragraphs.map((paragraph) => (
            <p className="text-slate-600" key={paragraph}>
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
    "group relative block overflow-hidden rounded-lg border border-slate-900/10 bg-white shadow-[0_12px_32px_rgba(7,21,36,0.06)] transition duration-200 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_24px_60px_rgba(7,21,36,0.14)]";
  const content = (
    <>
      {hasImage ? (
        <div className="relative aspect-[1.45] overflow-hidden bg-cream-200">
          <Image
            alt={card.imageAlt ?? ""}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            src={card.image!}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(7,21,36,0.62))]" />
          {card.meta ? (
            <span className="absolute left-5 top-5 rounded-full bg-gold-400/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-950 shadow">
              {card.meta}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="relative p-7">
        <AwardCardAccent />
        {!hasImage && card.meta ? <span className="relative z-10 mb-5 inline-block text-xs font-bold uppercase text-emerald-700">{card.meta}</span> : null}
        <h3 className="relative z-10 text-xl font-semibold leading-snug text-slate-950">{card.title}</h3>
        <p className="relative z-10 mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[linear-gradient(90deg,#d7a948,transparent)] opacity-0 transition group-hover:opacity-100" />
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

function CardsSection({ section }: { section: Extract<PageSection, { kind: "cards" }> }) {
  const hasImages = section.cards.some((card) => card.image);

  return (
    <section className="bg-cream-100 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        {section.title ? <SectionHeader title={section.title} /> : null}
        <div className={["grid gap-5", hasImages ? "lg:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-3"].join(" ")}>
          {section.cards.map((card) => (
            <LinkCard card={card} key={`${card.title}-${card.href}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WordPressSection({ section }: { section: Extract<PageSection, { kind: "wordpress" }> }) {
  return (
    <section className="pattern-light bg-white px-5 py-16 md:px-8 md:py-20">
      <div
        className="wordpress-content mx-auto max-w-[1180px]"
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
    <div className="flex aspect-video items-center justify-center bg-[linear-gradient(135deg,#071524,#063f35)] p-6 text-center text-white">
      <a className="rounded-lg border border-gold-200/45 px-5 py-3 text-sm font-semibold text-gold-200 transition hover:bg-white/10" href={href} rel="noreferrer" target="_blank">
        Open original media
      </a>
    </div>
  );
}

export function MediaSection({ section }: { section: Extract<PageSection, { kind: "media" }> }) {
  return (
    <section className="pattern-light bg-[#fcfaf5] px-5 py-14 md:px-8 md:py-18">
      <div className="mx-auto max-w-[1180px]">
        {section.title ? <SectionHeader align="left" title={section.title} text={section.text} /> : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item) => (
            <figure
              className="overflow-hidden rounded-lg border border-gold-300/25 bg-white shadow-[0_18px_44px_rgba(7,21,36,0.08)]"
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
                <figcaption className="border-t border-gold-300/25 bg-white p-5 text-sm leading-6 text-slate-600">
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
    <section className="pattern-light bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        {section.title ? <SectionHeader title={section.title} text="Visual moments from the Beacon Mosque public archive." /> : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {section.images.map((image, index) => (
            <figure
              className="group relative overflow-hidden rounded-lg border border-gold-300/35 bg-navy-950 shadow-[0_18px_44px_rgba(7,21,36,0.12)]"
              key={image.src}
            >
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
    <section className="pattern-light bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader title={section.title} text={section.text} />
        <div className="grid gap-5 md:grid-cols-2">
          {section.items.map((item) => (
            <article className="rounded-lg border border-gold-300/35 bg-cream-100 p-6 shadow-[0_14px_36px_rgba(7,21,36,0.07)]" key={item.src}>
              <span className="text-xs font-bold uppercase text-emerald-700">30 year plan</span>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.subtitle}</p>
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
    <section className="pattern-dark bg-[linear-gradient(135deg,#071524,#063f35)] px-5 py-16 text-white md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader inverse title="Beacon Mosque standards" text="Explore the quality framework used across the Beacon Mosque accreditation pathway." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {standards.map((standard) => (
            <Link
              className="flex min-h-44 flex-col items-center justify-center gap-4 rounded-lg border border-gold-200/22 bg-white/8 p-5 text-center transition duration-200 hover:-translate-y-1 hover:border-gold-200/60"
              href={standard.href}
              key={standard.title}
            >
              <Image alt="" height={64} src={standard.image} width={64} />
              <span className="text-sm font-semibold leading-tight text-white">{standard.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccreditedSection() {
  return (
    <section className="bg-cream-100 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader title="Accredited Beacon Mosques" text="Mosques recognised through the Beacon Mosque accreditation pathway." />
        <div className="grid gap-6 md:grid-cols-3">
          {accreditedMosques.map((mosque) => (
            <Link className="overflow-hidden rounded-lg border border-slate-900/10 bg-white shadow-lg transition hover:-translate-y-1 hover:border-gold-300" href={mosque.href} key={mosque.title}>
              <div className="relative aspect-[1.42] bg-cream-100">
                <Image alt={mosque.imageAlt} className="object-cover" fill sizes="(min-width: 768px) 33vw, 100vw" src={mosque.image} />
              </div>
              <div className="border-t-2 border-gold-300/60 p-6">
                <h3 className="text-xl font-semibold text-slate-950">{mosque.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{mosque.text}</p>
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
    <section className="pattern-light bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader title={section.title} />
        <div className="grid gap-5 lg:grid-cols-3">
          {section.groups.map((group) => (
            <article className="rounded-lg border border-gold-300/35 bg-cream-100 p-6" key={group.title}>
              <h3 className="text-xl font-semibold text-slate-950">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                {group.items.map((item) => (
                  <li className="relative pl-6" key={item}>
                    <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gold-400" />
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
      <span className="text-sm font-semibold text-slate-700">
        {field.label}
        <span className="ml-1 text-emerald-700" aria-hidden="true">
          *
        </span>
      </span>
      {field.options ? (
        <select
          aria-required="true"
          className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-gold-300/40"
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
          className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-gold-300/40"
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
    <section id={form === "nomination" ? "nomination-form" : undefined} className="bg-cream-100 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.75fr_1fr]">
        <div>
          <SectionHeader align="left" title={title} text={text} />
        </div>
        <form action="/api/forms/" className="rounded-lg border border-gold-300/35 bg-white p-6 shadow-[0_24px_60px_rgba(7,21,36,0.12)]" method="post">
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
            <span className="text-sm font-semibold text-slate-700">{config.messageLabel}</span>
            <textarea
              aria-required="true"
              className="mt-2 min-h-36 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-gold-300/40"
              id={`${form}-message`}
              name="message"
              required
            />
          </label>
          <button className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg border border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] px-5 py-3 text-sm font-semibold text-emerald-950 shadow-[0_18px_40px_rgba(216,169,72,0.22)]" type="submit">
            {config.actionLabel}
          </button>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            Fields marked with an asterisk are required. Your submission is routed through the Beacon Mosque intake workflow.
          </p>
        </form>
      </div>
    </section>
  );
}

function RenderSection({ currentPath, section }: { currentPath: string; section: PageSection }) {
  switch (section.kind) {
    case "text":
      return <TextSection section={section} />;
    case "cards":
      return <CardsSection section={section} />;
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

export function InteriorPage({ page }: { page: InteriorPageData }) {
  const hasHeroVideo = Boolean(page.heroVideo);
  const hasHeroVisual = hasHeroVideo || Boolean(page.image);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pattern-dark relative isolate overflow-hidden bg-[linear-gradient(135deg,#071524,#063f35)] px-5 py-20 text-white md:px-8 md:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(216,169,72,0.24),transparent_30%)]" />
          <div className={["mx-auto max-w-[1180px] items-center gap-12", hasHeroVisual ? "grid lg:grid-cols-[1fr_0.78fr]" : "max-w-[860px]"].join(" ")}>
            <div className={hasHeroVisual ? "" : "max-w-4xl"}>
              {page.eyebrow ? <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold-200">{page.eyebrow}</span> : null}
              <h1 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl">{page.title}</h1>
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
                  <div className="rounded-lg border border-white/14 bg-white/8 p-5 backdrop-blur-sm">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">Awards</span>
                    <p className="mt-3 text-sm leading-7 text-white/76">National recognition for mosques, educators, volunteers, imams and community leadership.</p>
                  </div>
                  <div className="rounded-lg border border-white/14 bg-white/8 p-5 backdrop-blur-sm">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">Standards</span>
                    <p className="mt-3 text-sm leading-7 text-white/76">A practical quality framework covering governance, facilities, communication and service delivery.</p>
                  </div>
                  <div className="rounded-lg border border-white/14 bg-white/8 p-5 backdrop-blur-sm">
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
          <RenderSection currentPath={`/${page.slug}/`} key={`${section.kind}-${index}`} section={section} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
