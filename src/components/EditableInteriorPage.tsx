"use client";

import { PageEditorProvider } from "@/components/visual-editor/PageEditorProvider";
import type { InteriorPage as InteriorPageData } from "@/lib/pages";
import type { ReactNode } from "react";

/**
 * Client shell for live page editing. Pass the server-rendered page as children
 * so InteriorPage stays an RSC and keeps its original layout.
 */
export function EditableInteriorPage({
  canEdit,
  page,
  children,
  initialEditMode = false,
  initialFields,
}: {
  canEdit: boolean;
  page: InteriorPageData;
  children: ReactNode;
  initialEditMode?: boolean;
  initialFields?: Record<string, string>;
}) {
  return (
    <PageEditorProvider
      canEdit={canEdit}
      initialEditMode={initialEditMode}
      initialFields={initialFields}
      initialPage={page}
    >
      {children}
    </PageEditorProvider>
  );
}
