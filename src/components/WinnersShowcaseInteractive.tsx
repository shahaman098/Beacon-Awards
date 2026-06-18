"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { winnerShowcaseItems, type WinnerShowcaseItem } from "@/lib/content";

type WinnersShowcaseInteractiveProps = {
  intro: string;
};

export function WinnersShowcaseInteractive({
  intro,
}: WinnersShowcaseInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState(7);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem: WinnerShowcaseItem = winnerShowcaseItems[activeIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % winnerShowcaseItems.length,
      );
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const listElement = listRef.current;
    const itemElement = itemRefs.current[activeIndex];

    if (!listElement || !itemElement) return;

    const nextScrollTop =
      itemElement.offsetTop -
      listElement.clientHeight / 2 +
      itemElement.clientHeight / 2;

    listElement.scrollTo({
      top: Math.max(0, nextScrollTop),
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <div className="relative z-10 mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[0.98fr_1.02fr] md:items-center lg:gap-18">
      <div className="relative">
        <div className="relative overflow-hidden bg-black shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <Image
            alt={activeItem.imageAlt}
            className="aspect-[4/5] w-full object-contain object-top bg-black"
            height={920}
            src={activeItem.image}
            width={720}
          />
        </div>
        <div className="absolute -bottom-12 left-6 max-w-[360px] bg-black px-8 py-9 text-white shadow-2xl md:left-14 md:max-w-[390px] md:px-9 md:py-10 lg:left-18 lg:max-w-[420px]">
          <span className="block text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-200">
            {activeItem.eyebrow}
          </span>
          <p className="mt-4 text-[0.98rem] leading-7 text-white/72 md:text-[1.02rem]">
            {activeItem.summary}
          </p>
          <Link
            className="mt-6 inline-flex text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold-200 transition hover:text-white"
            href={activeItem.href}
          >
            View winner
          </Link>
        </div>
      </div>
      <div className="pt-10 md:pt-0">
        <p className="section-word-motion mb-10 max-w-lg text-[1.02rem] leading-8 text-black/45 md:text-[1.08rem]">
          {intro}
        </p>
        <div
          className="no-scrollbar h-[9.5rem] overflow-y-auto pr-2 md:h-[11rem] md:pr-4"
          ref={listRef}
        >
          <div className="space-y-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] md:text-[2.45rem]">
            {winnerShowcaseItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  className={[
                    "block text-left transition-all duration-500 ease-out",
                    isActive
                      ? "translate-x-2 text-black"
                      : "text-black/42 hover:text-black",
                  ].join(" ")}
                  key={item.title}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
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
    </div>
  );
}
