import Image from "next/image";
import Link from "next/link";
import { mainNav, type NavItem } from "@/lib/content";

function DesktopNavLink({ item }: { item: NavItem }) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <li className="group relative flex h-full items-center">
      <Link
        className="flex h-full items-center px-4 text-sm font-normal text-[#333333] transition-colors hover:text-[#1678a3]"
        href={item.href}
      >
        {item.label}
      </Link>
      {hasChildren ? (
        <ul className="invisible absolute left-0 top-full z-50 w-56 border-t-3 border-[#1678a3] bg-white py-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                className="block px-4 py-3 text-sm text-[#333333] transition hover:bg-[#3080a3] hover:text-white"
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

function MobileNavLink({ item }: { item: NavItem }) {
  if (!item.children?.length) {
    return (
      <li className="border-b border-slate-200">
        <Link className="block py-3 text-sm font-medium text-slate-800" href={item.href}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-slate-200">
      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-medium text-slate-800">
          <Link href={item.href}>{item.label}</Link>
          <span aria-hidden="true" className="text-slate-500">+</span>
        </summary>
        <ul className="pb-3 pl-4">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link className="block py-2 text-sm text-slate-600" href={child.href}>
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
  return (
    <header className="relative z-50 bg-white text-slate-900 shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-[92px] max-w-[1200px] items-center justify-between px-7">
        <Link aria-label="Beacon Mosque home" className="flex shrink-0 items-center" href="/">
          <Image
            alt="Beacon Mosque"
            className="h-auto w-[188px]"
            height={91}
            priority
            src="/assets/brand/beacon-mosque.png"
            width={600}
          />
        </Link>
        <nav aria-label="Primary navigation" className="hidden h-full lg:block">
          <ul className="flex h-full items-stretch">
            {mainNav.map((item) => (
              <DesktopNavLink item={item} key={item.href} />
            ))}
          </ul>
        </nav>
        <details className="group lg:hidden">
          <summary
            aria-label="Toggle menu"
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center text-2xl text-slate-500"
          >
            <span aria-hidden="true" className="group-open:hidden">=</span>
            <span aria-hidden="true" className="hidden group-open:inline">x</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full border-t border-slate-200 bg-white px-5 shadow-lg"
          >
            <ul>
              {mainNav.map((item) => (
                <MobileNavLink item={item} key={item.href} />
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
