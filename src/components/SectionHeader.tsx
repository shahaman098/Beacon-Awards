type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  inverse?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "center",
  inverse = false,
}: SectionHeaderProps) {
  return (
    <div
      className={[
        "section-header mb-9 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      ].join(" ")}
    >
      {eyebrow ? (
        <span
          className={[
            "mb-5 inline-block text-xs font-bold uppercase tracking-[0.22em]",
            inverse ? "text-gold-200" : "text-gold-400",
          ].join(" ")}
        >
          {eyebrow}
        </span>
      ) : null}
      <div
        className={[
          "mb-5 h-px w-32",
          align === "center" ? "mx-auto" : "",
          inverse
            ? "bg-[linear-gradient(90deg,transparent,#f1d58a,transparent)]"
            : "bg-[linear-gradient(90deg,transparent,#d7a948,transparent)]",
        ].join(" ")}
      />
      <h2
        className={[
          "text-3xl font-black leading-[0.98] tracking-[-0.06em] md:text-5xl",
          inverse ? "text-white" : "text-slate-950",
        ].join(" ")}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={[
            "mt-4 text-base leading-8 md:text-lg",
            inverse ? "text-white/72" : "text-slate-600",
          ].join(" ")}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
