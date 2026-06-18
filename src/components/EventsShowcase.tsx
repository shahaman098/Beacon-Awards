"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { EventShowcaseItem } from "@/lib/content";

type EventsShowcaseProps = {
  items: EventShowcaseItem[];
};

export function EventsShowcase({ items }: EventsShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];

  if (!activeItem) return null;

  return (
    <section className="relative overflow-hidden bg-[#110f0f] px-5 py-20 text-white md:px-8 md:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full border border-[#7c3f21]/35 opacity-50"
        style={{
          clipPath:
            "path('M145 10C176 14 202 34 215 64C228 94 228 130 244 159C260 189 294 211 296 244C298 278 268 307 235 320C202 333 165 330 133 336C99 343 68 360 41 348C14 336 -8 295 3 264C14 232 58 210 74 181C90 152 79 115 90 84C101 52 115 6 145 10Z')",
        }}
      />
      <div className="relative mx-auto max-w-[1350px]">
        <div className="mb-12 overflow-hidden">
          <h2 className="text-[clamp(4.5rem,17vw,12rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.96)]">
            Events
          </h2>
        </div>

        <div className="no-scrollbar mb-12 flex gap-4 overflow-x-auto">
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                className={[
                  "min-w-[16rem] shrink-0 border px-8 py-5 text-left transition md:min-w-[18rem]",
                  isActive
                    ? "border-[#ff5b33] bg-[#ff5b33] text-white"
                    : "border-white/10 bg-white/[0.08] text-white hover:border-white/20 hover:bg-white/[0.11]",
                ].join(" ")}
                key={`${item.timeLabel}-${item.dateLabel}`}
                onClick={() => {
                  setActiveIndex(index);
                }}
                type="button"
              >
                <span className="block text-[1rem] font-bold leading-7">
                  {item.timeLabel}
                </span>
                <span className="block text-[1rem] font-bold leading-7">
                  {item.dateLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[24rem] overflow-hidden bg-white/5">
            <Image
              alt={activeItem.imageAlt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              src={activeItem.image}
            />
          </div>
          <div className="flex min-h-[24rem] flex-col justify-center bg-white/[0.08] px-8 py-10 md:px-12">
            <span className="text-sm font-bold uppercase tracking-[0.24em] text-white/82">
              Beacon event
            </span>
            <h3 className="mt-6 text-[clamp(2.4rem,5vw,4rem)] font-black leading-[0.92] tracking-[-0.06em] text-white">
              {activeItem.title}
            </h3>
            <p className="mt-6 max-w-xl text-lg leading-9 text-white/72">
              {activeItem.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#262a34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#303646]"
                href={activeItem.href}
              >
                View details
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#262a34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#303646]"
                href="/contact-us/"
              >
                Contact team
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#262a34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#303646]"
                href="/resources/"
              >
                Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
