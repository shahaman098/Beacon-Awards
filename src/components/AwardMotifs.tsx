type MotifProps = {
  className?: string;
};

function StarIcon({ className = "" }: MotifProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="m12 2.5 2.9 6.15 6.48.98-4.7 4.77 1.11 6.73L12 17.95l-5.79 3.18 1.11-6.73-4.7-4.77 6.48-.98L12 2.5Z" />
    </svg>
  );
}

function LaurelSide({
  className = "",
  flip = false,
}: MotifProps & { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 52 120"
    >
      <g transform={flip ? "translate(52 0) scale(-1 1)" : undefined}>
        <path
          d="M42 106C17 84 9 53 18 14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        {[
          [19, 22, 8, -20],
          [17, 34, 10, -34],
          [16, 48, 12, -45],
          [18, 62, 13, -56],
          [22, 76, 12, -67],
          [29, 91, 10, -82],
        ].map(([cx, cy, rx, rotate]) => (
          <ellipse
            cx={cx}
            cy={cy}
            key={`${cx}-${cy}`}
            rx={rx}
            ry="4.2"
            stroke="currentColor"
            strokeWidth="2"
            transform={`rotate(${rotate} ${cx} ${cy})`}
          />
        ))}
      </g>
    </svg>
  );
}

export function AwardSeal({ className = "" }: MotifProps) {
  return (
    <div
      className={["relative aspect-square text-gold-200", className].join(" ")}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full border border-current/45" />
      <div className="absolute inset-3 rounded-full border border-current/25" />
      <LaurelSide className="absolute left-1 top-1/2 h-[72%] w-[34%] -translate-y-1/2 text-current/85" />
      <LaurelSide
        className="absolute right-1 top-1/2 h-[72%] w-[34%] -translate-y-1/2 text-current/85"
        flip
      />
      <div className="absolute inset-[29%] rounded-full border border-current/30 bg-white/8" />
      <StarIcon className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 text-current" />
    </div>
  );
}

export function StarRating({
  count = 5,
  className = "",
}: MotifProps & { count?: number }) {
  return (
    <div
      className={["flex gap-1.5 text-gold-200", className].join(" ")}
      aria-label={`${count} star rating`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <StarIcon
          className="h-7 w-7 drop-shadow-[0_8px_16px_rgba(216,169,72,0.28)]"
          key={index}
        />
      ))}
    </div>
  );
}

export function AwardCardAccent({ className = "" }: MotifProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "pointer-events-none absolute right-4 top-4 h-12 w-12 rounded-full border border-gold-300/25",
        "before:absolute before:inset-2 before:rounded-full before:border before:border-emerald-800/15",
        "after:absolute after:left-1/2 after:top-1/2 after:h-3 after:w-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-gold-300/45",
        className,
      ].join(" ")}
    />
  );
}

export function HeroAwardPanel() {
  return (
    <div
      className="relative hidden min-h-[360px] overflow-hidden rounded-lg border border-gold-200/35 bg-navy-950/65 p-8 shadow-2xl backdrop-blur lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-3 rounded-lg border border-gold-200/12" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(241,213,138,0.2),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
      <div className="relative flex h-full flex-col items-center justify-center">
        <AwardSeal className="h-44 w-44" />
        <div className="mt-8 h-px w-40 bg-[linear-gradient(90deg,transparent,#f1d58a,transparent)]" />
        <div className="mt-7 grid w-full max-w-xs grid-cols-3 gap-3">
          {[0, 1, 2].map((item) => (
            <div
              className="h-20 rounded-t-full border border-gold-200/25 bg-white/5"
              key={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
