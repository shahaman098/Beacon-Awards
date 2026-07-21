"use client";

import { useState } from "react";
import { CmsEditOnly } from "@/components/visual-editor/CmsEditOnly";
import { usePageEditor } from "@/components/visual-editor/PageEditorProvider";
import {
  ADDABLE_SECTION_KINDS,
  ADDABLE_SECTION_LABELS,
  type AddableSectionKind,
} from "@/lib/cms-page-document";

function toolbarButtonClass(disabled?: boolean) {
  return [
    "rounded border border-[#2271b1]/40 bg-white px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#1d2327]",
    disabled
      ? "cursor-not-allowed opacity-40"
      : "hover:border-[#2271b1] hover:bg-[#f0f6fc]",
  ].join(" ");
}

export function SectionAddPicker({ afterIndex }: { afterIndex: number }) {
  const { structureEditable, addSection } = usePageEditor();
  const [open, setOpen] = useState(false);

  if (!structureEditable) return null;

  return (
    <CmsEditOnly>
      <div className="relative z-20 mx-auto flex max-w-[1180px] justify-center px-5 py-2 md:px-8">
        {open ? (
          <div className="flex flex-wrap items-center justify-center gap-2 rounded border border-dashed border-[#2271b1]/50 bg-[#f6f7f7] px-3 py-2 shadow-sm">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#2271b1]">
              Add section
            </span>
            {ADDABLE_SECTION_KINDS.map((kind) => (
              <button
                className={toolbarButtonClass()}
                key={kind}
                onClick={() => {
                  addSection(kind as AddableSectionKind, afterIndex);
                  setOpen(false);
                }}
                type="button"
              >
                {ADDABLE_SECTION_LABELS[kind]}
              </button>
            ))}
            <button
              className={toolbarButtonClass()}
              onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="rounded border border-dashed border-[#2271b1]/45 bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#2271b1] hover:bg-[#f0f6fc]"
            onClick={() => setOpen(true)}
            type="button"
          >
            + Add section
          </button>
        )}
      </div>
    </CmsEditOnly>
  );
}

export function SectionStructureChrome({
  index,
  total,
  kind,
  children,
}: {
  index: number;
  total: number;
  kind: string;
  children: React.ReactNode;
}) {
  const { structureEditable, moveSection, removeSection } = usePageEditor();

  if (!structureEditable) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <CmsEditOnly>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center">
          <div className="pointer-events-auto mt-2 flex flex-wrap items-center gap-2 rounded border border-[#2271b1]/35 bg-white/95 px-2 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <span className="px-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#2271b1]">
              {kind}
            </span>
            <button
              className={toolbarButtonClass(index === 0)}
              disabled={index === 0}
              onClick={() => moveSection(index, index - 1)}
              type="button"
            >
              Move up
            </button>
            <button
              className={toolbarButtonClass(index >= total - 1)}
              disabled={index >= total - 1}
              onClick={() => moveSection(index, index + 1)}
              type="button"
            >
              Move down
            </button>
            <button
              className={[
                toolbarButtonClass(),
                "border-red-300 text-red-700 hover:border-red-500 hover:bg-red-50",
              ].join(" ")}
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.confirm("Remove this section?")
                ) {
                  removeSection(index);
                }
              }}
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      </CmsEditOnly>
      <div className={structureEditable ? "ring-1 ring-[#2271b1]/15" : undefined}>
        {children}
      </div>
    </div>
  );
}
