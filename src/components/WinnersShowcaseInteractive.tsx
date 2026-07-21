"use client";

import { CmsImage } from "@/components/cms/CmsImage";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";
import Link from "@/components/AppLink";
import { EditableText } from "@/components/visual-editor/EditableText";
import { useVisualEditor } from "@/components/visual-editor/VisualEditorProvider";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  winnerShowcaseItems as defaultWinnerShowcaseItems,
  type WinnerShowcaseItem,
} from "@/lib/content";

type WinnersShowcaseInteractiveProps = {
  intro: ReactNode;
  items?: WinnerShowcaseItem[];
};

export function WinnersShowcaseInteractive({
  intro,
  items = defaultWinnerShowcaseItems,
}: WinnersShowcaseInteractiveProps) {
  const { editMode } = useSiteCms();
  const { setField } = useVisualEditor();
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const showcaseItems =
    items.length > 0 ? items : defaultWinnerShowcaseItems;
  const safeIndex = Math.min(activeIndex, showcaseItems.length - 1);
  const activeItem: WinnerShowcaseItem = showcaseItems[safeIndex];

  useEffect(() => {
    if (editMode) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % showcaseItems.length,
      );
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [editMode, showcaseItems.length]);

  useEffect(() => {
    const listElement = listRef.current;
    const itemElement = itemRefs.current[safeIndex];

    if (!listElement || !itemElement) return;

    const nextScrollTop =
      itemElement.offsetTop -
      listElement.clientHeight / 2 +
      itemElement.clientHeight / 2;

    listElement.scrollTo({
      top: Math.max(0, nextScrollTop),
      behavior: "smooth",
    });
  }, [safeIndex]);

  return (
    <div className="relative z-10 mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[0.98fr_1.02fr] md:items-center lg:gap-18">
      <div className="relative">
        <div
          className={[
            "relative overflow-hidden bg-black shadow-[0_24px_80px_rgba(0,0,0,0.08)]",
            editMode ? "z-30" : "",
          ].join(" ")}
        >
          <CmsImage
            adjustKey={`winners-showcase:${activeItem.image}`}
            alt={activeItem.imageAlt}
            className="aspect-[4/5] w-full bg-black object-contain object-top"
            height={920}
            onSrcChange={(url) => {
              setField(`winnerShowcaseItems.${safeIndex}.image`, url);
            }}
            src={activeItem.image}
            width={720}
          />
        </div>
        <div
          className={[
            "absolute -bottom-12 left-6 max-w-[360px] bg-black px-8 py-9 text-white shadow-2xl md:left-14 md:max-w-[390px] md:px-9 md:py-10 lg:left-18 lg:max-w-[420px]",
            editMode ? "pointer-events-none z-10" : "z-20",
          ].join(" ")}
        >
          <EditableText
            as="span"
            className="block text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-200"
            path={`winnerShowcaseItems.${safeIndex}.eyebrow`}
            value={activeItem.eyebrow}
          />
          <EditableText
            as="p"
            className="mt-4 text-[0.98rem] leading-7 text-white/72 md:text-[1.02rem]"
            multiline
            path={`winnerShowcaseItems.${safeIndex}.summary`}
            value={activeItem.summary}
          />
          {editMode ? (
            <div className="pointer-events-auto mt-6 space-y-2">
              <EditableText
                as="span"
                className="inline-flex text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold-200"
                path={`winnerShowcaseItems.${safeIndex}.title`}
                value={activeItem.title}
              />
              <EditableText
                as="span"
                className="block text-[0.65rem] text-white/45 normal-case tracking-normal"
                path={`winnerShowcaseItems.${safeIndex}.href`}
                value={activeItem.href}
              />
            </div>
          ) : (
            <Link
              className="mt-6 inline-flex text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold-200 transition hover:text-white"
              href={activeItem.href}
            >
              View winner
            </Link>
          )}
        </div>
      </div>
      <div className="pt-10 md:pt-0">
        {typeof intro === "string" ? (
          <p className="section-word-motion mb-10 max-w-lg text-[1.02rem] leading-8 text-black/45 md:text-[1.08rem]">
            {intro}
          </p>
        ) : (
          intro
        )}
        <div
          className="no-scrollbar h-[9.5rem] overflow-y-auto pr-2 md:h-[11rem] md:pr-4"
          ref={listRef}
        >
          <div className="space-y-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] md:text-[2.45rem]">
            {showcaseItems.map((item, index) => {
              const isActive = index === safeIndex;

              return (
                <button
                  className={[
                    "block w-full text-left transition-all duration-500 ease-out",
                    isActive
                      ? "translate-x-2 text-black"
                      : "text-black/42 hover:text-black",
                  ].join(" ")}
                  key={`${item.title}-${index}`}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  {editMode ? (
                    <EditableText
                      path={`winnerShowcaseItems.${index}.label`}
                      value={item.label}
                    />
                  ) : (
                    item.label
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
