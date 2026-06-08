"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HomeHeroSlideshowProps = {
  slides: Array<{ src: string; alt: string }>;
};

const SLIDE_INTERVAL_MS = 3500;

export function HomeHeroSlideshow({ slides }: HomeHeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const canRotate = slides.length > 1;

  useEffect(() => {
    if (!canRotate) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [canRotate, slides.length]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          className={[
            "absolute inset-0 transition-opacity duration-700",
            index === activeIndex ? "opacity-100" : "opacity-0",
          ].join(" ")}
          key={slide.src}
        >
          <Image
            alt={slide.alt}
            className="arch-frame-lg-inner h-full w-full object-cover"
            fill
            priority={index === 0}
            sizes="320px"
            src={slide.src}
          />
        </div>
      ))}
      {canRotate ? (
        <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <span
              aria-hidden="true"
              className={[
                "h-2 rounded-full border border-gold-200/70 transition-all",
                index === activeIndex ? "w-6 bg-gold-200" : "w-2 bg-white/20",
              ].join(" ")}
              key={`${slide.src}-dot`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
