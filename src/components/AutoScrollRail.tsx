"use client";

import { useEffect, useRef } from "react";

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
  const railRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

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

    const timer = window.setInterval(advance, delayMs);

    return () => window.clearInterval(timer);
  }, [delayMs]);

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
