"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { AwardCategoryHighlight } from "@/lib/content";
import { AwardSeal } from "@/components/AwardMotifs";

type AwardsCategoryShowcaseProps = {
  items: AwardCategoryHighlight[];
};

export function AwardsCategoryShowcase({ items }: AwardsCategoryShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAward = items[activeIndex];
  const usesContainedImage = activeAward.imageFit === "contain";

  return (
    <div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
      <div className="relative pl-0 md:pl-8">
        <div
          className={[
            "max-w-[560px] overflow-hidden rounded-[2rem] border border-[#eadfc5] shadow-[0_30px_70px_rgba(0,0,0,0.12)]",
            "bg-black",
          ].join(" ")}
        >
          <div
            className={[
              "relative overflow-hidden",
              usesContainedImage
                ? "aspect-[11/10] bg-[radial-gradient(circle_at_50%_18%,rgba(215,169,72,0.20),transparent_44%),linear-gradient(180deg,#181818,#050505)]"
                : "aspect-[9/10] bg-black",
            ].join(" ")}
          >
            <Image
              alt={activeAward.imageAlt}
              className={[
                "transition duration-500",
                usesContainedImage
                  ? "object-contain p-4 md:p-5 scale-[1.03]"
                  : "object-cover",
              ].join(" ")}
              fill
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 520px, 100vw"
              src={activeAward.image}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.75))]" />
          </div>
          <div className="border-t border-white/10 bg-black p-8 text-white md:p-10">
            <AwardSeal className="h-14 w-14 text-gold-300" />
            <h3 className="mt-6 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              {activeAward.title}
            </h3>
            <p className="mt-5 max-w-lg text-base leading-8 text-white/70">
              {activeAward.summary}
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gold-300"
              href={activeAward.href}
            >
              Nominate now
              <span aria-hidden="true" className="text-xl leading-none">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative pt-2 lg:pl-4">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.24em] text-[#b88b2a]">
          Awards Categories
        </span>
        <p className="mt-4 max-w-[40rem] text-lg leading-9 text-white/56 md:text-[1.5rem] md:leading-[1.85]">
          Explore the Beacon Mosque Awards categories highlighting leadership,
          service, design, teaching, inclusion and long-term community impact.
        </p>
        <div className="mt-10 h-px w-24 bg-[linear-gradient(90deg,#d7a948,transparent)]" />
        <div className="no-scrollbar mt-8 max-h-[31rem] overflow-y-auto pr-3">
          {items.map((award, index) => (
            <button
              aria-pressed={activeIndex === index}
              className={[
                "flex w-full items-start gap-5 border-b px-0 py-5 text-left transition",
                activeIndex === index
                  ? "border-gold-300/80 text-white"
                  : "border-white/10 text-white/32 hover:border-gold-300/60 hover:text-white/78",
              ].join(" ")}
              key={award.title}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span
                className={[
                  "mt-1 block min-w-10 text-sm font-semibold tracking-[0.18em]",
                  activeIndex === index ? "text-[#b88b2a]" : "text-white/24",
                ].join(" ")}
              >
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <span
                className={[
                  "block text-[clamp(1.5rem,2.2vw,2.45rem)] font-semibold leading-[1.02] tracking-[-0.05em]",
                  activeIndex === index ? "text-white" : "text-current",
                ].join(" ")}
              >
                {award.title}
              </span>
            </button>
          ))}
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-6 hidden h-72 w-72 rounded-full border border-gold-300/40 opacity-60 xl:block"
          style={{
            clipPath:
              "path('M145 10C176 14 202 34 215 64C228 94 228 130 244 159C260 189 294 211 296 244C298 278 268 307 235 320C202 333 165 330 133 336C99 343 68 360 41 348C14 336 -8 295 3 264C14 232 58 210 74 181C90 152 79 115 90 84C101 52 115 6 145 10Z')",
          }}
        />
      </div>
    </div>
  );
}
