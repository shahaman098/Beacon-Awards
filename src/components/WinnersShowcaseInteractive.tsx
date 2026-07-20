"use client";

import { CmsImage } from "@/components/cms/CmsImage";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";
import Link from "@/components/AppLink";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { winnerShowcaseItems, type WinnerShowcaseItem } from "@/lib/content";

type WinnersShowcaseInteractiveProps = {
  intro: ReactNode;
};

export function WinnersShowcaseInteractive({
  intro,
}: WinnersShowcaseInteractiveProps) {
  const { editMode } = useSiteCms();
  const [activeIndex, setActiveIndex] = useState(7);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem: WinnerShowcaseItem = winnerShowcaseItems[activeIndex];

  useEffect(() => {
    if (editMode) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % winnerShowcaseItems.length,
      );
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [editMode]);

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
    <div className="relative z-10 mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-14">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-black/8 bg-[#040816] shadow-[0_28px_70px_rgba(8,19,31,0.12)]">
        <div
          className={[
            "relative h-[min(58vh,32rem)] overflow-hidden",
            editMode ? "z-30" : "",
          ].join(" ")}
        >
          <CmsImage
            adjustKey={`winners-showcase:${activeItem.image}`}
            alt={activeItem.imageAlt}
            className="h-full w-full bg-[#040816] object-contain object-top"
            height={1080}
            sizes="(min-width: 1024px) 48vw, 92vw"
            src={activeItem.image}
            width={1080}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(4,8,22,0.88))]" />
        </div>

        <div
          className={[
            "relative z-10 border-t border-white/10 bg-[#040816] px-6 py-6 text-white md:px-8 md:py-7",
            editMode ? "pointer-events-none" : "",
          ].join(" ")}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold-300/35 bg-gold-300/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold-200">
              {activeItem.eyebrow}
            </span>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/42">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(winnerShowcaseItems.length).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white md:text-2xl">
            {activeItem.title}
          </h3>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-white/68 md:text-[1.02rem] md:leading-8">
            {activeItem.summary}
          </p>
          <Link
            className="mt-5 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-200 transition hover:text-white"
            href={activeItem.href}
            tabIndex={editMode ? -1 : undefined}
          >
            View winner
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="flex min-h-0 flex-col justify-center">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-400">
          2025 winners archive
        </p>
        {typeof intro === "string" ? (
          <p className="section-word-motion mt-4 max-w-lg text-base leading-8 text-black/58 md:text-[1.05rem] md:leading-8">
            {intro}
          </p>
        ) : (
          intro
        )}

        <div className="relative mt-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-[linear-gradient(180deg,#f3f1ed,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-[linear-gradient(0deg,#f3f1ed,transparent)]"
          />
          <div
            className="no-scrollbar max-h-[22rem] overflow-y-auto py-4 md:max-h-[26rem]"
            ref={listRef}
          >
            <div className="space-y-1.5" role="listbox" aria-label="Award categories">
              {winnerShowcaseItems.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    aria-selected={isActive}
                    className={[
                      "flex w-full items-center gap-4 rounded-[1rem] border px-4 py-3.5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2",
                      isActive
                        ? "border-black/12 bg-white shadow-[0_12px_32px_rgba(8,19,31,0.06)]"
                        : "border-transparent bg-transparent hover:border-black/8 hover:bg-white/70",
                    ].join(" ")}
                    key={item.title}
                    onClick={() => setActiveIndex(index)}
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    role="option"
                    type="button"
                  >
                    <span
                      className={[
                        "w-8 shrink-0 text-[0.72rem] font-bold tracking-[0.14em]",
                        isActive ? "text-gold-400" : "text-black/28",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={[
                        "min-w-0 flex-1 text-[1.05rem] font-semibold tracking-[-0.03em] md:text-[1.15rem]",
                        isActive ? "text-black" : "text-black/45",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={[
                        "text-sm transition",
                        isActive
                          ? "translate-x-0 text-gold-400 opacity-100"
                          : "translate-x-[-4px] text-black/20 opacity-0",
                      ].join(" ")}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/10 pt-6">
          <Link
            className="inline-flex min-h-11 items-center rounded-full border border-black/14 bg-white px-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black transition hover:border-black/30"
            href="/winners/"
          >
            Browse all winners
          </Link>
          <p className="text-sm text-black/42">
            Auto-rotating through {winnerShowcaseItems.length} categories
          </p>
        </div>
      </div>
    </div>
  );
}
