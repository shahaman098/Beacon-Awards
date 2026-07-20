import Link from "@/components/AppLink";

export function CmsShell({
  title,
  eyebrow,
  children,
  actions,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#050505,#111111)] px-5 py-10 text-white md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
              {title}
            </h1>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}

export function CmsPanel({
  title,
  text,
  children,
}: {
  title?: string;
  text?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur md:p-8">
      {title ? (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">
            {title}
          </h2>
          {text ? (
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68">{text}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function CmsLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gold-300"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export const cmsFieldClassName =
  "w-full rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-gold-300 focus:ring-2 focus:ring-gold-300/30";

export function CmsNotice({
  tone,
  children,
}: {
  tone: "error" | "success" | "info";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "error"
      ? "border-rose-300/30 bg-rose-500/10 text-rose-100"
      : tone === "success"
        ? "border-emerald-300/30 bg-emerald-500/10 text-emerald-100"
        : "border-gold-300/30 bg-gold-300/10 text-gold-100";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${toneClass}`}>
      {children}
    </div>
  );
}

export function CmsTopLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/76 transition hover:border-gold-300 hover:text-gold-200"
      href={href}
    >
      {children}
    </Link>
  );
}
