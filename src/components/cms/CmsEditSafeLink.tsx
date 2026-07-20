"use client";

import type { ReactNode } from "react";
import Link from "@/components/AppLink";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";

/**
 * Renders a normal AppLink for visitors. In CMS edit mode, renders a non-navigating
 * wrapper so nested CmsImage Adjust/Change controls are not swallowed by the link.
 */
export function CmsEditSafeLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { editMode } = useSiteCms();

  if (editMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
