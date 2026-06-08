import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "light";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] text-emerald-950 shadow-[0_18px_40px_rgba(216,169,72,0.28)] hover:bg-[linear-gradient(135deg,#f7e3a8,#c99935)]",
  secondary:
    "border-white/35 bg-white/12 text-white hover:border-gold-200/80 hover:bg-white/18",
  light:
    "border-white/30 bg-white/10 text-white hover:border-gold-200/70 hover:bg-white/16",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonLinkProps) {
  const isHttp = /^https?:/.test(href);
  const hasProtocol = /^(https?:|mailto:|tel:)/.test(href);

  const classes = [
    "inline-flex min-h-12 items-center justify-center rounded-lg border px-5 py-3 text-center text-sm font-semibold leading-tight transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 focus:ring-offset-emerald-950",
    variants[variant],
    className,
  ].join(" ");

  if (isHttp) {
    return (
      <a className={classes} href={href} onClick={onClick} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  if (hasProtocol) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
