import type { SiteChromeSocialLink } from "@/lib/cms-site-chrome";

export function SocialNetworkIcon({
  className = "h-4 w-4",
  network,
}: {
  className?: string;
  network: string;
}) {
  switch (network) {
    case "facebook":
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2h1.5V2.14C17.17 2.09 15.83 2 14.61 2 11.89 2 10 3.66 10 6.7V9.5H7.5v4H10V22h4z" />
        </svg>
      );
    case "twitter":
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2H21.5l-7.19 8.22L22.5 22h-6.59l-5.16-6.74L5.1 22H1.83l7.69-8.79L1.5 2h6.75l4.66 6.17L18.244 2zm-1.16 18.08h1.83L7.03 3.82H5.07l12.014 16.26z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6.94 8.5H3.56V21h3.38V8.5zM5.25 3A1.97 1.97 0 0 0 3.28 5c0 1.09.88 1.98 1.97 1.98A1.98 1.98 0 0 0 7.22 5 1.97 1.97 0 0 0 5.25 3zM20.72 13.34c0-3.44-1.84-5.04-4.29-5.04-1.98 0-2.87 1.09-3.36 1.85V8.5H9.72c.05 1.01 0 12.5 0 12.5h3.35v-7c0-.37.03-.74.14-1 .3-.74.98-1.5 2.12-1.5 1.5 0 2.1 1.14 2.1 2.81V21h3.35v-7.66z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.92A3.12 3.12 0 1 1 12 8.88a3.12 3.12 0 0 1 0 6.24z" />
          <path d="M17.52 6.72a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0z" />
          <path d="M12 2.4c-2.61 0-2.94.01-3.96.06-1.02.05-1.71.21-2.32.45a4.68 4.68 0 0 0-1.69 1.1 4.68 4.68 0 0 0-1.1 1.69c-.24.61-.4 1.3-.45 2.32C2.41 9.04 2.4 9.37 2.4 12s.01 2.96.06 3.98c.05 1.02.21 1.71.45 2.32a4.68 4.68 0 0 0 1.1 1.69 4.68 4.68 0 0 0 1.69 1.1c.61.24 1.3.4 2.32.45 1.02.05 1.35.06 3.98.06s2.96-.01 3.98-.06c1.02-.05 1.71-.21 2.32-.45a4.68 4.68 0 0 0 1.69-1.1 4.68 4.68 0 0 0 1.1-1.69c.24-.61.4-1.3.45-2.32.05-1.02.06-1.35.06-3.98s-.01-2.96-.06-3.98c-.05-1.02-.21-1.71-.45-2.32a4.68 4.68 0 0 0-1.1-1.69 4.68 4.68 0 0 0-1.69-1.1c-.61-.24-1.3-.4-2.32-.45C14.96 2.41 14.63 2.4 12 2.4zm0 1.68c2.57 0 2.87.01 3.88.06.94.04 1.45.2 1.79.33.45.17.77.38 1.11.72.34.34.55.66.72 1.11.13.34.29.85.33 1.79.05 1.01.06 1.31.06 3.88s-.01 2.87-.06 3.88c-.04.94-.2 1.45-.33 1.79-.17.45-.38.77-.72 1.11-.34.34-.66.55-1.11.72-.34.13-.85.29-1.79.33-1.01.05-1.31.06-3.88.06s-2.87-.01-3.88-.06c-.94-.04-1.45-.2-1.79-.33a2.99 2.99 0 0 1-1.11-.72 2.99 2.99 0 0 1-.72-1.11c-.13-.34-.29-.85-.33-1.79-.05-1.01-.06-1.31-.06-3.88s.01-2.87.06-3.88c.04-.94.2-1.45.33-1.79.17-.45.38-.77.72-1.11.34-.34.66-.55 1.11-.72.34-.13.85-.29 1.79-.33 1.01-.05 1.31-.06 3.88-.06z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.5 7.2a3.02 3.02 0 0 0-2.12-2.14C19.5 4.6 12 4.6 12 4.6s-7.5 0-9.38.46A3.02 3.02 0 0 0 .5 7.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 4.8 3.02 3.02 0 0 0 2.12 2.14C4.5 19.4 12 19.4 12 19.4s7.5 0 9.38-.46a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-4.8zM9.75 15.02V8.98L15.82 12l-6.07 3.02z" />
        </svg>
      );
    default:
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
        </svg>
      );
  }
}

export function SocialIconLinks({
  className = "",
  iconClassName = "h-4 w-4",
  itemClassName = "",
  lightSurface = false,
  links,
}: {
  className?: string;
  iconClassName?: string;
  itemClassName?: string;
  lightSurface?: boolean;
  links: SiteChromeSocialLink[];
}) {
  if (links.length === 0) return null;

  const linkClass = [
    "inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
    lightSurface
      ? "border-black/14 text-black/72 hover:border-black/35 hover:bg-black/5 hover:text-black"
      : "border-white/18 text-[#d8c0a6] hover:border-[#d8c0a6]/70 hover:bg-white/5 hover:text-white",
    itemClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul aria-label="Social media" className={["flex items-center gap-2", className].join(" ")}>
      {links.map((item) => (
        <li key={`${item.network}-${item.href}`}>
          <a
            aria-label={item.label}
            className={linkClass}
            href={item.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <SocialNetworkIcon className={iconClassName} network={item.network} />
          </a>
        </li>
      ))}
    </ul>
  );
}
