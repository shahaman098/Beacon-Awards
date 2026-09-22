"use client";

import { useState } from "react";
import Link from "@/components/AppLink";
import { SectionAwardsDecor } from "@/components/HomeSections";
import { EditableText } from "@/components/visual-editor/EditableText";
import type { PageSection } from "@/lib/pages";

type VideoPlaylistSectionData = Extract<PageSection, { kind: "videoPlaylist" }>;

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5.14v14.72L19 12 8 5.14z" />
    </svg>
  );
}

export function VideoPlaylistSection({
  section,
  sectionIndex = 0,
}: {
  section: VideoPlaylistSectionData;
  sectionIndex?: number;
}) {
  const basePath = `sections.${sectionIndex}`;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = section.items[activeIndex] ?? section.items[0];

  if (!activeItem) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1628] px-5 py-20 text-white md:px-8 md:py-28">
      <SectionAwardsDecor left="Watch" right="Ceremony" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="max-w-xl">
            <span className="section-word-motion block text-[0.68rem] font-bold uppercase tracking-[0.24em] text-gold-200">
              <EditableText
                path={`${basePath}.kicker`}
                value={section.provider ?? "Islam Channel"}
              />
            </span>
            <EditableText
              as="h2"
              className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-5xl"
              path={`${basePath}.title`}
              value={section.title}
            />
          </div>
          {section.text ? (
            <EditableText
              as="p"
              className="max-w-2xl text-base leading-8 text-white/68 md:text-lg md:leading-9"
              multiline
              path={`${basePath}.text`}
              value={section.text}
            />
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-start">
          <article className="overflow-hidden border border-white/10 bg-black/30 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <a
              className="group relative block aspect-video overflow-hidden bg-navy-950"
              href={activeItem.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {activeItem.poster ? (
                <img
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  src={activeItem.poster}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#13233f,#0b1628)]">
                  <span className="text-sm uppercase tracking-[0.24em] text-white/45">
                    Episode preview
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,19,31,0.08),rgba(8,19,31,0.72))]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/12 text-white backdrop-blur-sm transition duration-200 group-hover:scale-105 group-hover:bg-gold-300 group-hover:text-emerald-950">
                  <PlayIcon />
                </span>
              </div>
              {activeItem.duration ? (
                <span className="absolute bottom-4 right-4 rounded bg-black/72 px-2.5 py-1 text-xs font-semibold tracking-[0.08em] text-white">
                  {activeItem.duration}
                </span>
              ) : null}
            </a>

            <div className="space-y-5 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-200">
                  Episode {String(activeIndex + 1).padStart(2, "0")}
                </span>
                {activeItem.duration ? (
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/45">
                    {activeItem.duration}
                  </span>
                ) : null}
              </div>
              <EditableText
                as="h3"
                className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-3xl"
                path={`${basePath}.items.${activeIndex}.title`}
                value={activeItem.title}
              />
              {activeItem.subtitle ? (
                <EditableText
                  as="p"
                  className="max-w-2xl text-sm leading-7 text-white/62 md:text-base"
                  multiline
                  path={`${basePath}.items.${activeIndex}.subtitle`}
                  value={activeItem.subtitle}
                />
              ) : null}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] px-5 py-3 text-sm font-semibold text-emerald-950 transition duration-200 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#f7e3a8,#c99935)]"
                  href={activeItem.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Watch on Islam Channel
                </a>
                {section.seriesHref ? (
                  <Link
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-gold-200/70 hover:bg-white/8"
                    href={section.seriesHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View full series
                  </Link>
                ) : null}
              </div>
            </div>
          </article>

          <aside className="overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            <div className="border-b border-white/10 px-5 py-4 md:px-6">
              <EditableText
                as="p"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-200"
                path={`${basePath}.listLabel`}
                value={`${section.items.length} episodes`}
              />
            </div>
            <ol className="max-h-[34rem] overflow-y-auto">
              {section.items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={item.href}>
                    <button
                      className={[
                        "grid w-full gap-4 border-b border-white/8 px-4 py-4 text-left transition md:grid-cols-[7rem_minmax(0,1fr)] md:items-center md:px-5",
                        isActive
                          ? "bg-white/10"
                          : "hover:bg-white/[0.06]",
                      ].join(" ")}
                      onClick={() => setActiveIndex(index)}
                      type="button"
                    >
                      <div className="relative aspect-video overflow-hidden bg-navy-950">
                        {item.poster ? (
                          <img
                            alt=""
                            className="h-full w-full object-cover"
                            src={item.poster}
                          />
                        ) : null}
                        <span
                          className={[
                            "absolute inset-0 flex items-center justify-center text-[0.62rem] font-semibold uppercase tracking-[0.18em]",
                            isActive ? "text-gold-200" : "text-white/55",
                          ].join(" ")}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {isActive ? (
                          <span className="absolute inset-0 border-2 border-gold-300/80" />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <EditableText
                            as="p"
                            className={[
                              "text-sm font-semibold leading-6 md:text-base",
                              isActive ? "text-white" : "text-white/82",
                            ].join(" ")}
                            path={`${basePath}.items.${index}.title`}
                            value={item.title}
                          />
                          {item.duration ? (
                            <span className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/42">
                              {item.duration}
                            </span>
                          ) : null}
                        </div>
                        {item.subtitle ? (
                          <EditableText
                            as="p"
                            className="mt-1 line-clamp-2 text-xs leading-6 text-white/48"
                            multiline
                            path={`${basePath}.items.${index}.subtitle`}
                            value={item.subtitle}
                          />
                        ) : null}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
