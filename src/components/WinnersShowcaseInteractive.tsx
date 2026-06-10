"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { winnerShowcaseItems, type WinnerShowcaseItem } from "@/lib/content";

type WinnersShowcaseInteractiveProps = {
  intro: string;
};

export function WinnersShowcaseInteractive({
  intro,
}: WinnersShowcaseInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeItem: WinnerShowcaseItem = winnerShowcaseItems[activeIndex];

  return (
    <div className="relative z-10 mx-auto grid max-w-[980px] gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
      <div className="relative">
        <div className="relative bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8">
          <Image
            alt={activeItem.imageAlt}
            className="aspect-[4/5] w-full object-contain bg-white"
            height={720}
            src={activeItem.image}
            width={560}
          />
        </div>
        <div className="absolute -bottom-10 left-6 max-w-[320px] bg-black p-8 text-white shadow-2xl md:left-16">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.24em] text-gold-200">
            {activeItem.eyebrow}
          </span>
          <p className="mt-4 text-sm leading-6 text-white/72">{activeItem.summary}</p>
          <Link
            className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-gold-200 transition hover:text-white"
            href={activeItem.href}
          >
            View winner
          </Link>
        </div>
      </div>
      <div className="pt-8 md:pt-0">
        <p className="section-word-motion mb-8 max-w-md text-sm leading-7 text-black/45">
          {intro}
        </p>
        <div className="space-y-2 text-xl font-semibold leading-tight tracking-[-0.03em] md:text-2xl">
          {winnerShowcaseItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                className={[
                  "block text-left transition",
                  isActive ? "text-black" : "text-black/42 hover:text-black",
                ].join(" ")}
                key={item.title}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
