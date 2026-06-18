"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type StandardsCarouselItem = {
  href: string;
  image: string;
  summary: string;
  title: string;
};

type StandardsCarouselProps = {
  items: StandardsCarouselItem[];
};

const AUTOPLAY_DELAY_MS = 2800;

export function StandardsCarousel({ items }: StandardsCarouselProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    const advance = () => {
      if (pausedRef.current) return;

      const firstCard = rail.querySelector<HTMLElement>("[data-standard-card]");
      if (!firstCard) return;

      const step = firstCard.offsetWidth;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const nextLeft = rail.scrollLeft + step;

      rail.scrollTo({
        left: nextLeft >= maxScroll - 4 ? 0 : nextLeft,
        behavior: "smooth",
      });
    };

    const timer = window.setInterval(advance, AUTOPLAY_DELAY_MS);

    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div
      className="no-scrollbar overflow-x-hidden border border-[#e3d5b4]"
      data-standards-carousel="true"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      ref={railRef}
    >
      <div className="flex min-w-max">
        {items.map((item) => (
          <Link
            className="group flex min-h-[320px] w-[290px] shrink-0 flex-col border-r border-[#e3d5b4] bg-white px-8 py-10 transition hover:bg-[#fdf8ef] last:border-r-0"
            data-standard-card="true"
            href={item.href}
            key={item.title}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8efe0]">
              <Image
                alt=""
                className="h-12 w-12 object-contain"
                height={64}
                src={item.image}
                width={64}
              />
            </div>
            <h3 className="mt-10 text-[1.65rem] font-semibold leading-tight tracking-[-0.04em] text-black">
              {item.title}
            </h3>
            <p className="mt-5 max-w-xs text-base leading-8 text-black/56">
              {item.summary}
            </p>
            <span className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-bold uppercase tracking-[0.2em] text-gold-400">
              Explore
              <span
                aria-hidden="true"
                className="text-xl leading-none transition group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
