"use client";

import Link from "@/components/AppLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CmsImage } from "@/components/cms/CmsImage";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";
import { SocialIconLinks } from "@/components/SocialIcons";
import { CmsEditableProvider } from "@/components/visual-editor/CmsEditableContext";
import { EditableText } from "@/components/visual-editor/EditableText";
import { type SiteChromeNavItem } from "@/lib/cms-site-chrome";
import { type NavItem } from "@/lib/content";

function isActiveNavItem(item: NavItem, pathname: string, hash: string) {
  const [hrefPath, hrefHash] = item.href.split("#");
  const normalizedPath = hrefPath || "/";

  if (hrefHash) {
    return pathname === normalizedPath && hash === `#${hrefHash}`;
  }

  if (normalizedPath === "/") {
    return pathname === "/" && !hash;
  }

  return pathname === normalizedPath || pathname.startsWith(normalizedPath);
}

function NavLabel({
  editMode,
  href,
  index,
  item,
  className,
}: {
  editMode: boolean;
  href: string;
  index: number;
  item: SiteChromeNavItem;
  className?: string;
}) {
  if (!editMode) {
    return <span className={className}>{item.label}</span>;
  }

  return (
    <span className={["inline-flex flex-col items-start gap-1", className].filter(Boolean).join(" ")}>
      <EditableText path={`mainNav.${index}.label`} value={item.label} />
      <EditableText
        as="span"
        className="text-[0.55rem] font-normal normal-case tracking-normal text-current/50"
        path={`mainNav.${index}.href`}
        value={href}
      />
    </span>
  );
}

function DesktopNavLink({
  currentHash,
  currentPath,
  editMode,
  index,
  item,
  lightSurface = false,
  onRemove,
}: {
  currentHash: string;
  currentPath: string;
  editMode: boolean;
  index: number;
  item: SiteChromeNavItem;
  lightSurface?: boolean;
  onRemove?: () => void;
}) {
  const navItem = { label: item.label, href: item.href };
  const isActive = isActiveNavItem(navItem, currentPath, currentHash);
  const className = [
    "relative flex h-full items-center px-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors",
    lightSurface
      ? isActive
        ? "text-gold-400 hover:text-black"
        : "text-black/78 hover:text-black"
      : isActive
        ? "text-gold-200 hover:text-white"
        : "text-white/82 hover:text-white",
  ].join(" ");

  const content = (
    <>
      <span
        className={[
          "absolute bottom-5 left-4 right-4 h-0.5 origin-left transition-transform duration-300 group-hover:scale-x-100",
          lightSurface
            ? isActive
              ? "scale-x-100 bg-gold-400"
              : "scale-x-0 bg-black"
            : isActive
              ? "scale-x-100 bg-gold-300"
              : "scale-x-0 bg-white",
        ].join(" ")}
      />
      <NavLabel
        editMode={editMode}
        href={item.href}
        index={index}
        item={item}
      />
    </>
  );

  return (
    <li className="group relative flex h-full items-center">
      {editMode ? (
        <div
          aria-current={isActive ? "page" : undefined}
          className={`${className} flex-col justify-center gap-1`}
        >
          {content}
          {onRemove ? (
            <button
              className="text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-red-500/80 hover:text-red-600"
              onClick={onRemove}
              type="button"
            >
              Remove
            </button>
          ) : null}
        </div>
      ) : (
        <Link
          aria-current={isActive ? "page" : undefined}
          className={className}
          href={item.href}
        >
          {content}
        </Link>
      )}
    </li>
  );
}

function MobileNavLink({
  currentHash,
  currentPath,
  editMode,
  index,
  item,
  lightSurface = false,
  onRemove,
}: {
  currentHash: string;
  currentPath: string;
  editMode: boolean;
  index: number;
  item: SiteChromeNavItem;
  lightSurface?: boolean;
  onRemove?: () => void;
}) {
  const navItem = { label: item.label, href: item.href };
  const isActive = isActiveNavItem(navItem, currentPath, currentHash);
  const borderClass = lightSurface
    ? "border-b border-black/10"
    : "border-b border-white/10";
  const textClass = [
    "block py-3 text-sm font-medium",
    lightSurface
      ? isActive
        ? "text-gold-400"
        : "text-black/84"
      : isActive
        ? "text-gold-200"
        : "text-white/88",
  ].join(" ");

  return (
    <li className={borderClass}>
      {editMode ? (
        <div aria-current={isActive ? "page" : undefined} className={textClass}>
          <NavLabel
            editMode={editMode}
            href={item.href}
            index={index}
            item={item}
          />
          {onRemove ? (
            <button
              className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-red-500/80 hover:text-red-600"
              onClick={onRemove}
              type="button"
            >
              Remove
            </button>
          ) : null}
        </div>
      ) : (
        <Link
          aria-current={isActive ? "page" : undefined}
          className={textClass}
          href={item.href}
        >
          {item.label}
        </Link>
      )}
    </li>
  );
}

export function SiteHeader() {
  const { editMode, chrome, setChromeField } = useSiteCms();
  const navItems = chrome.mainNav;
  const socialLinks = chrome.socialLinks ?? [];
  const currentPath = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const isAwardsLandingPage =
    currentPath === "/awards" || currentPath === "/awards/";
  const isAwardsSubpage =
    currentPath.startsWith("/awards/") && !isAwardsLandingPage;
  const isLightSurface = isAwardsLandingPage || isAwardsSubpage;
  const logoSrc = isLightSurface
    ? "/assets/brand/beacon-mosque.png"
    : "/assets/brand/beacon-mosque-header.png";
  const logoAdjustKey = isLightSurface
    ? "brand:header-light"
    : "brand:header-dark";

  useEffect(() => {
    const updateStickyState = () => {
      setIsSticky(window.scrollY > 24);
    };

    updateStickyState();
    window.addEventListener("scroll", updateStickyState, { passive: true });

    return () => window.removeEventListener("scroll", updateStickyState);
  }, []);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <CmsEditableProvider editMode={editMode} setField={setChromeField}>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50",
          isLightSurface ? "text-black" : "text-white",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-[88px] w-full items-center justify-between px-5 transition-all duration-300 md:px-8 lg:px-10",
            isSticky
              ? isLightSurface
                ? "w-full max-w-none border-y border-black/10 bg-[#f3f2f0]/92 shadow-2xl shadow-black/8 backdrop-blur-xl"
                : "w-full max-w-none border-y border-white/12 bg-black/50 shadow-2xl shadow-black/25 backdrop-blur-xl"
              : isAwardsSubpage
                ? "border-b border-black/10 bg-[#f3f2f0]/96 backdrop-blur-sm"
                : isAwardsLandingPage
                  ? "bg-transparent"
                  : "bg-transparent",
          ].join(" ")}
        >
          <div className="flex min-w-0 items-center gap-8 xl:gap-12">
            <Link
              aria-label="Beacon Mosque home"
              className="relative flex h-[46px] w-[188px] shrink-0 items-center"
              href="/"
              onClick={(event) => {
                if (editMode) event.preventDefault();
              }}
            >
              <CmsImage
                adjustKey={logoAdjustKey}
                alt="Beacon Mosque"
                className="h-auto w-[188px]"
                height={91}
                priority
                src={logoSrc}
                width={600}
              />
            </Link>
            <nav
              aria-label="Primary navigation"
              className="hidden h-full xl:block"
            >
              <ul className="flex h-full items-stretch">
                {navItems.map((item, index) => (
                  <DesktopNavLink
                    currentHash={currentHash}
                    currentPath={currentPath}
                    editMode={editMode}
                    index={index}
                    item={item}
                    key={`${item.label}-${item.href}-${index}`}
                    lightSurface={isLightSurface}
                    onRemove={
                      editMode
                        ? () =>
                            setChromeField(`mainNav.__remove__.${index}`, "")
                        : undefined
                    }
                  />
                ))}
                {editMode ? (
                  <li className="flex h-full items-center px-2">
                    <button
                      className="rounded-md border border-dashed border-current/40 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-70 transition hover:opacity-100"
                      onClick={() => setChromeField("mainNav.__add__", "")}
                      type="button"
                    >
                      Add link
                    </button>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <SocialIconLinks
              lightSurface={isLightSurface}
              links={socialLinks}
            />
            {editMode ? (
              <div className="inline-flex h-14 flex-col items-center justify-center bg-[linear-gradient(135deg,#f1d58a,#d7a948)] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-black">
                <EditableText path="ctaLabel" value={chrome.ctaLabel} />
                <EditableText
                  as="span"
                  className="text-[0.55rem] font-normal normal-case tracking-normal text-black/55"
                  path="ctaHref"
                  value={chrome.ctaHref}
                />
              </div>
            ) : (
              <Link
                className="inline-flex h-14 items-center justify-center bg-[linear-gradient(135deg,#f1d58a,#d7a948)] px-8 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[linear-gradient(135deg,#f6dfa0,#c99935)]"
                href={chrome.ctaHref}
              >
                {chrome.ctaLabel}
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3 lg:hidden">
            <SocialIconLinks
              className="hidden sm:flex"
              lightSurface={isLightSurface}
              links={socialLinks}
            />
            <details className="group">
              <summary
                aria-label="Toggle menu"
                className={[
                  "flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border text-2xl",
                  isLightSurface
                    ? "border-black/14 text-black/82"
                    : "border-white/18 text-white/88",
                ].join(" ")}
              >
                <span aria-hidden="true" className="group-open:hidden">
                  =
                </span>
                <span aria-hidden="true" className="hidden group-open:inline">
                  x
                </span>
              </summary>
              <nav
                aria-label="Mobile navigation"
                className={[
                  "absolute inset-x-0 top-[calc(100%+12px)] px-5 shadow-2xl backdrop-blur",
                  isLightSurface
                    ? "border border-black/10 bg-[#f3f2f0]/98"
                    : "border border-white/10 bg-black/96",
                ].join(" ")}
              >
                <ul>
                  {navItems.map((item, index) => (
                    <MobileNavLink
                      currentHash={currentHash}
                      currentPath={currentPath}
                      editMode={editMode}
                      index={index}
                      item={item}
                      key={`${item.label}-${item.href}-${index}`}
                      lightSurface={isLightSurface}
                      onRemove={
                        editMode
                          ? () =>
                              setChromeField(`mainNav.__remove__.${index}`, "")
                          : undefined
                      }
                    />
                  ))}
                  {editMode ? (
                    <li className="py-3">
                      <button
                        className="rounded-md border border-dashed border-current/40 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-70 transition hover:opacity-100"
                        onClick={() => setChromeField("mainNav.__add__", "")}
                        type="button"
                      >
                        Add link
                      </button>
                    </li>
                  ) : null}
                </ul>
                <div className="border-t border-current/10 py-4 sm:hidden">
                  <SocialIconLinks
                    lightSurface={isLightSurface}
                    links={socialLinks}
                  />
                </div>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </CmsEditableProvider>
  );
}
