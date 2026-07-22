"use client";

import {
  AwardsArchiveSection,
  BeaconExcellenceIntroSection,
  EditorialLink,
  ExperiencePillarsSection,
  EventsShowcaseSection,
  MosqueMbaSection,
  NetworkSection,
  SectionAwardsDecor,
  SectionKicker,
  ServicesSection,
  SiteFooter,
  StandardsIntro,
} from "@/components/HomeSections";
import { ButtonLink } from "@/components/ButtonLink";
import { HomeHeroVideo } from "@/components/HomeHeroVideo";
import { SiteHeader } from "@/components/SiteHeader";
import { WinnersShowcaseInteractive } from "@/components/WinnersShowcaseInteractive";
import { EditableImage } from "@/components/visual-editor/EditableImage";
import { EditableText } from "@/components/visual-editor/EditableText";
import {
  useVisualEditor,
  VisualEditorProvider,
} from "@/components/visual-editor/VisualEditorProvider";
import type { HomepageContent } from "@/lib/cms-homepage";

function EditableHomeHero() {
  const { content, editMode, setField, uploadMedia } = useVisualEditor();
  if (!content) return null;
  const { hero } = content;

  async function replaceMedia(path: "hero.posterUrl" | "hero.videoUrl", file: File) {
    const url = await uploadMedia(file);
    // Preview only until Save changes is clicked.
    setField(path, url);
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#040816] px-5 pt-20 text-white md:px-8 md:pt-28">
      <div className="absolute inset-0 -z-20 overflow-hidden bg-navy-950">
        <EditableImage
          alt=""
          className="object-cover"
          fill
          imageScale={hero.posterScale}
          objectFit={hero.posterObjectFit}
          objectPosition={hero.posterObjectPosition}
          path="hero.posterUrl"
          src={hero.posterUrl}
        />
        <div
          className={
            editMode
              ? "pointer-events-none absolute inset-0"
              : "absolute inset-0"
          }
        >
          <HomeHeroVideo
            poster={hero.posterUrl}
            preload="metadata"
            src={hero.videoUrl}
          />
        </div>
      </div>
      {editMode ? (
        <div className="absolute bottom-6 right-6 z-30 flex flex-wrap gap-2">
          <label className="cursor-pointer rounded-md bg-[#2271b1] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white shadow-lg">
            Replace hero video
            <input
              accept="video/mp4"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file) return;
                void replaceMedia("hero.videoUrl", file);
              }}
              type="file"
            />
          </label>
        </div>
      ) : null}
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
              <EditableText path="hero.badge" value={hero.badge} />
            </span>
            <h1 className="mt-6 text-[clamp(3.2rem,10vw,8.8rem)] font-bold uppercase leading-[0.86] tracking-[-0.06em] text-white">
              <EditableText
                as="span"
                className="block"
                path="hero.titleLine1"
                value={hero.titleLine1}
              />
              <EditableText
                as="span"
                className="block text-transparent"
                path="hero.titleLine2"
                style={{ WebkitTextStroke: "1.8px rgba(255,255,255,0.92)" }}
                value={hero.titleLine2}
              />
            </h1>
          </div>
          <div className="flex justify-start lg:justify-end">
            <div className="w-full max-w-[360px] border border-white/14 bg-white/5 p-4 backdrop-blur-sm sm:p-6 lg:mt-14">
              <EditableText
                as="span"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold-200"
                path="hero.cycleLabel"
                value={hero.cycleLabel}
              />
              <EditableText
                as="p"
                className="mt-4 text-3xl font-semibold leading-[1.05] text-white sm:text-4xl"
                multiline
                path="hero.cycleHeading"
                value={hero.cycleHeading}
              />
              <EditableText
                as="p"
                className="mt-4 text-sm leading-6 text-white/68 sm:leading-7"
                multiline
                path="hero.body"
                value={hero.body}
              />
              <ButtonLink
                className="mt-6 w-full justify-center sm:w-auto"
                href={hero.ctaHref}
              >
                <EditableText path="hero.ctaLabel" value={hero.ctaLabel} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditableAwardsFeatureSection() {
  const { content } = useVisualEditor();
  const awards = content?.featureCards[0];
  if (!content || !awards) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Nomination" right="Shortlist" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black p-6">
          <EditableImage
            alt={awards.imageAlt}
            className="object-contain"
            fill
            imageScale={awards.imageScale}
            objectFit={awards.objectFit ?? "contain"}
            objectPosition={awards.objectPosition}
            path="featureCards.0.image"
            src={awards.image}
          />
        </div>
        <div className="max-w-md">
          <SectionKicker>
            <EditableText
              path="awardsFeature.kicker"
              value={content.awardsFeature.kicker}
            />
          </SectionKicker>
          <EditableText
            as="h2"
            className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl"
            multiline
            path="featureCards.0.title"
            value={awards.title}
          />
          <EditableText
            as="p"
            className="section-word-motion mt-6 text-sm leading-7 text-black/58"
            multiline
            path="featureCards.0.text"
            value={awards.text}
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <EditorialLink href={awards.href}>
              <EditableText
                path="awardsFeature.viewLabel"
                value={content.awardsFeature.viewLabel}
              />
            </EditorialLink>
            <EditorialLink
              className="!bg-white !text-black hover:!bg-black hover:!text-white"
              href={content.hero.ctaHref}
            >
              <EditableText
                path="awardsFeature.nominateLabel"
                value={content.awardsFeature.nominateLabel}
              />
            </EditorialLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditableWinnersShowcaseSection() {
  const { content } = useVisualEditor();
  if (!content) return null;

  return (
    <section
      className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-28"
      id="winners"
    >
      <SectionAwardsDecor left="Winners" right="Finalists" />
      <WinnersShowcaseInteractive
        intro={
          <EditableText
            as="p"
            className="section-word-motion mt-4 max-w-lg text-base leading-8 text-black/58 md:text-[1.05rem] md:leading-8"
            multiline
            path="winnersIntro"
            value={content.winnersIntro}
          />
        }
        items={content.winnerShowcaseItems}
      />
    </section>
  );
}

function EditableCeremonyGallerySection() {
  const { content, editMode } = useVisualEditor();
  if (!content) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f1ed] py-20 text-black md:py-28">
      <SectionAwardsDecor left="Gallery" right="Moments" />
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mb-10 max-w-xl">
          <SectionKicker>
            <EditableText
              path="galleryKicker"
              value={content.galleryKicker}
            />
          </SectionKicker>
          <EditableText
            as="h2"
            className="section-word-motion mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl"
            multiline
            path="galleryHeading"
            value={content.galleryHeading}
          />
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
          <div
            className={[
              "flex w-max gap-5",
              editMode ? "" : "gallery-marquee-track",
            ].join(" ")}
          >
            {[0, 1].map((loop) => (
              <div className="flex shrink-0 gap-5" key={loop}>
                {content.galleryItems.map((item, index) => (
                  <figure
                    className="w-[260px] shrink-0 md:w-[340px]"
                    key={`${item.src}-${loop}-${index}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <EditableImage
                        alt={item.alt}
                        className="object-cover"
                        fill
                        imageScale={item.imageScale}
                        objectFit={item.objectFit}
                        objectPosition={item.objectPosition}
                        path={`galleryItems.${index}.src`}
                        src={item.src}
                      />
                    </div>
                    <EditableText
                      as="figcaption"
                      className="mt-4 text-xs font-semibold"
                      path={`galleryItems.${index}.caption`}
                      value={item.caption}
                    />
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

function EditableFinalCta() {
  const { content, editMode } = useVisualEditor();
  if (!content) return null;
  const { finalCta } = content;

  return (
    <section className="relative isolate min-h-[520px] overflow-hidden bg-black px-5 py-20 text-center text-white md:px-8 md:py-28">
      <SectionAwardsDecor left="Nominate" right="2026" tone="dark" />
      <div className="absolute inset-0">
        <EditableImage
          alt={finalCta.imageAlt}
          className="object-cover"
          fill
          imageScale={finalCta.imageScale}
          objectFit={finalCta.objectFit}
          objectPosition={finalCta.objectPosition}
          path="finalCta.image"
          src={finalCta.image}
        />
      </div>
      <div
        className={[
          "absolute inset-0 bg-black/42",
          editMode ? "pointer-events-none z-[15]" : "",
        ].join(" ")}
      />
      <div className="relative z-10 mx-auto flex min-h-[360px] max-w-3xl flex-col items-center justify-center">
        <EditableText
          as="span"
          className="section-word-motion block text-[0.68rem] font-bold uppercase tracking-[0.24em] text-emerald-300"
          path="finalCta.kicker"
          value={finalCta.kicker}
        />
        <EditableText
          as="h2"
          className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl"
          multiline
          path="finalCta.heading"
          value={finalCta.heading}
        />
        <EditorialLink
          className="mt-7 border-white bg-transparent text-white hover:bg-white hover:text-black"
          href={finalCta.buttonHref}
        >
          <EditableText
            path="finalCta.buttonLabel"
            value={finalCta.buttonLabel}
          />
        </EditorialLink>
      </div>
    </section>
  );
}

function EditableHomeInner() {
  const { content } = useVisualEditor();
  if (!content) return null;

  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white text-black">
        <EditableHomeHero />
        <div className="deferred-content">
          <BeaconExcellenceIntroSection content={content.excellenceIntro} />
          <EditableAwardsFeatureSection />
          <AwardsArchiveSection content={content.awardsArchive} />
          <EditableWinnersShowcaseSection />
          <StandardsIntro content={content.standardsIntro} />
          <ServicesSection content={content.services} />
          <NetworkSection
            content={content.network}
            expo={content.featureCards[1]}
          />
          <MosqueMbaSection content={content.mosqueMba} />
          <EditableCeremonyGallerySection />
          <ExperiencePillarsSection content={content.experiencePillars} />
          <EventsShowcaseSection />
          <EditableFinalCta />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function EditableHome({
  content,
  canEdit,
  initialEditMode = false,
}: {
  content: HomepageContent;
  canEdit: boolean;
  editorEmail?: string | null;
  initialEditMode?: boolean;
}) {
  return (
    <VisualEditorProvider
      canEdit={canEdit}
      initialContent={content}
      initialEditMode={initialEditMode}
    >
      <EditableHomeInner />
    </VisualEditorProvider>
  );
}
