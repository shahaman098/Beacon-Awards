"use client";

import type { ReactNode } from "react";
import { useCmsEditable } from "@/components/visual-editor/CmsEditableContext";

/** Renders children only while the live CMS editor is active. */
export function CmsEditOnly({ children }: { children: ReactNode }) {
  const { editMode } = useCmsEditable();
  if (!editMode) return null;
  return <>{children}</>;
}
