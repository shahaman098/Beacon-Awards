"use client";

import { useEffect, useRef } from "react";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";

type AutoScrollRailProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  delayMs?: number;
};

export function AutoScrollRail({
  children,
  className = "",
  contentClassName = "",
  delayMs = 2800,
}: AutoScrollRailProps) {
  const { editMode } = useSiteCms();
  const railRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail || editMode) return;

    // Always start with the first card fully in view (e.g. 2026 on homepage).
    rail.scrollLeft = 0;

    const advance = () => {
      if (pausedRef.current) return;

      const inner = rail.firstElementChild as HTMLDivElement | null;
      if (!inner) return;

      const cards = Array.from(inner.children) as HTMLElement[];
      const firstCard = cards[0];
      const secondCard = cards[1];

      if (!firstCard) return;

      const step =
        secondCard != null
          ? secondCard.offsetLeft - firstCard.offsetLeft
          : firstCard.offsetWidth;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const nextLeft = rail.scrollLeft + step;

      rail.scrollTo({
        left: nextLeft >= maxScroll - 4 ? 0 : nextLeft,
        behavior: "smooth",
      });
    };

    let intervalId = 0;
    // Give visitors a beat to see the lead card before auto-advance.
    const startTimer = window.setTimeout(() => {
      advance();
      intervalId = window.setInterval(advance, delayMs);
    }, Math.max(delayMs, 3600));

    return () => {
      window.clearTimeout(startTimer);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [delayMs, editMode]);

  return (
    <div
      className={className}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      ref={railRef}
    >
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
