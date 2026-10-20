import { CrescentFinial } from "@/components/AwardMotifs";
import { AWARDS_2026_FINALISTS_ANNOUNCE_DATE } from "@/lib/awards-2026-cycle";

type AwardFinalistDisclosureWatermarkProps = {
  className?: string;
  size?: "card" | "profile" | "peer";
};

export function AwardFinalistDisclosureWatermark({
  className = "",
  size = "card",
}: AwardFinalistDisclosureWatermarkProps) {
  const isProfile = size === "profile";
  const isPeer = size === "peer";

  return (
    <div
      aria-label={`Mosque identity disclosed on ${AWARDS_2026_FINALISTS_ANNOUNCE_DATE}`}
      className={[
        "relative mx-auto w-full overflow-hidden",
        "arch-frame border border-gold-300/55 bg-[linear-gradient(165deg,#1a3a2f_0%,#0f2a22_48%,#16352b_100%)]",
        "shadow-[0_22px_50px_rgba(15,42,34,0.28)]",
        isProfile ? "max-w-[320px]" : isPeer ? "max-w-[160px]" : "max-w-[220px]",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "arch-frame-inner relative flex flex-col items-center justify-center text-center",
          "bg-[radial-gradient(circle_at_50%_22%,rgba(243,217,140,0.22),transparent_55%)]",
          isProfile
            ? "aspect-[0.86] gap-1 px-7 py-9"
            : isPeer
              ? "aspect-[0.86] gap-0.5 px-3 py-4"
              : "aspect-[0.86] gap-1 px-5 py-6",
        ].join(" ")}
      >
        <CrescentFinial
          className={
            isProfile
              ? "h-16 w-auto max-w-[1.35rem]"
              : isPeer
                ? "h-10 w-auto max-w-[0.8rem]"
                : "h-12 w-auto max-w-[1.05rem]"
          }
          opacity={0.95}
        />
        <p
          className={[
            "font-bold uppercase tracking-[0.28em] text-gold-200/80",
            isProfile ? "mt-3 text-[0.62rem]" : isPeer ? "mt-2 text-[0.45rem]" : "mt-2.5 text-[0.55rem]",
          ].join(" ")}
        >
          Named on
        </p>
        <p
          className={[
            "font-black leading-none tracking-[-0.04em] text-[#f3d98c]",
            isProfile
              ? "mt-1.5 text-5xl md:text-[3.25rem]"
              : isPeer
                ? "mt-1 text-xl"
                : "mt-1 text-[2rem]",
          ].join(" ")}
        >
          23
        </p>
        <p
          className={[
            "font-semibold uppercase tracking-[0.18em] text-white/78",
            isProfile ? "mt-1.5 text-sm" : isPeer ? "mt-1 text-[0.55rem]" : "mt-1 text-[0.68rem]",
          ].join(" ")}
        >
          October 2026
        </p>
      </div>
    </div>
  );
}
