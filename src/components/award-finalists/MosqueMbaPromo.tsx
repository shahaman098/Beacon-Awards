import Link from "@/components/AppLink";
import { MosqueMbaPoster } from "@/components/award-finalists/MosqueMbaPoster";
import { SectionKicker } from "@/components/HomeSections";

export function MosqueMbaPromo({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={[
        "overflow-hidden rounded-[1.6rem] border border-black/10 bg-[#f7f4ee]",
        compact ? "p-5 md:p-6" : "p-6 md:p-8",
      ].join(" ")}
    >
      <div className="rounded-2xl border border-black/10 bg-white p-2 shadow-[0_18px_48px_rgba(8,19,31,0.08)] md:p-3">
        <MosqueMbaPoster />
      </div>
      <div
        className={[
          "mt-6 flex flex-col gap-5",
          compact ? "" : "md:flex-row md:items-end md:justify-between md:gap-8",
        ].join(" ")}
      >
        <div className="max-w-xl">
          <SectionKicker>Leadership</SectionKicker>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-black md:text-2xl">
            Mosque MBA for modern mosque leadership
          </h3>
          {!compact ? (
            <p className="mt-3 text-sm leading-7 text-black/62 md:text-base">
              Strengthen governance, planning and service delivery through the
              Mosque MBA pathway.
            </p>
          ) : null}
        </div>
        <Link
          className="inline-flex min-h-11 shrink-0 items-center justify-center border border-black bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black md:self-end"
          href="https://mosque.mba/"
        >
          Visit Mosque MBA
        </Link>
      </div>
    </aside>
  );
}
