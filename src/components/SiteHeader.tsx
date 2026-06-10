"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, type NavItem } from "@/lib/content";

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

function DesktopNavLink({ currentHash, currentPath, item }: { currentHash: string; currentPath: string; item: NavItem }) {
  const hasChildren = Boolean(item.children?.length);
  const isActive = isActiveNavItem(item, currentPath, currentHash);

  return (
    <li className="group relative flex h-full items-center">
      <Link
        aria-current={isActive ? "page" : undefined}
        className={[
          "relative flex h-full items-center px-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-white",
          isActive ? "text-gold-200" : "text-white/82",
        ].join(" ")}
        href={item.href}
      >
        <span
          className={[
            "absolute bottom-5 left-4 right-4 h-0.5 origin-left transition-transform duration-300 group-hover:scale-x-100",
            isActive ? "scale-x-100 bg-gold-300" : "scale-x-0 bg-white",
          ].join(" ")}
        />
        {item.label}
      </Link>
      {hasChildren ? (
        <ul className="invisible absolute left-0 top-full z-50 mt-3 w-64 rounded-2xl border border-white/10 bg-black/96 py-3 opacity-0 shadow-2xl shadow-black/40 backdrop-blur transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                className="block px-5 py-3 text-sm font-medium text-white/78 transition hover:bg-white/8 hover:text-white"
                href={child.href}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function MobileNavLink({ currentHash, currentPath, item }: { currentHash: string; currentPath: string; item: NavItem }) {
  const isActive = isActiveNavItem(item, currentPath, currentHash);

  if (!item.children?.length) {
    return (
      <li className="border-b border-white/10">
        <Link
          aria-current={isActive ? "page" : undefined}
          className={[
            "block py-3 text-sm font-medium",
            isActive ? "text-gold-200" : "text-white/88",
          ].join(" ")}
          href={item.href}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-white/10">
      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-medium text-white/88">
          <Link href={item.href}>{item.label}</Link>
          <span aria-hidden="true" className="text-white/60">+</span>
        </summary>
        <ul className="pb-3 pl-4">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link className="block py-2 text-sm text-white/68" href={child.href}>
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}

export function SiteHeader() {
  const currentPath = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [isSticky, setIsSticky] = useState(false);

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
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <div
        className={[
          "mx-auto flex h-[88px] max-w-[1880px] items-center justify-between px-5 transition-all duration-300 md:px-8 lg:px-10",
          isSticky
            ? "w-full max-w-none border-y border-white/12 bg-black/70 shadow-2xl shadow-black/25 backdrop-blur-xl"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="flex min-w-0 items-center gap-8 xl:gap-12">
          <Link aria-label="Beacon Mosque home" className="flex shrink-0 items-center" href="/">
          <Image
            alt="Beacon Mosque"
            className="h-auto w-[188px]"
            height={91}
            priority
            src="/assets/brand/beacon-mosque-header.png"
            width={600}
          />
        </Link>
          <nav aria-label="Primary navigation" className="hidden h-full xl:block">
            <ul className="flex h-full items-stretch">
            {mainNav.map((item) => (
              <DesktopNavLink currentHash={currentHash} currentPath={currentPath} item={item} key={item.href} />
            ))}
            </ul>
          </nav>
        </div>
        <div className="hidden items-center lg:flex">
          <Link
            className="inline-flex h-14 items-center justify-center bg-[linear-gradient(135deg,#f1d58a,#d7a948)] px-8 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[linear-gradient(135deg,#f6dfa0,#c99935)]"
            href="/contact-us/"
          >
            Let&apos;s talk
          </Link>
        </div>
        <details className="group lg:hidden">
          <summary
            aria-label="Toggle menu"
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/18 text-2xl text-white/88"
          >
            <span aria-hidden="true" className="group-open:hidden">=</span>
            <span aria-hidden="true" className="hidden group-open:inline">x</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-[calc(100%+12px)] border border-white/10 bg-black/96 px-5 shadow-2xl backdrop-blur"
          >
            <ul>
              {mainNav.map((item) => (
                <MobileNavLink currentHash={currentHash} currentPath={currentPath} item={item} key={item.href} />
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
