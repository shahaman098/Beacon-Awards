"use client";

import { useCmsEditable } from "@/components/visual-editor/CmsEditableContext";

type EditableHtmlProps = {
  path: string;
  html: string;
  className?: string;
};

/**
 * Public: renders HTML as today. Edit mode: contentEditable HTML surface.
 */
export function EditableHtml({ path, html, className = "" }: EditableHtmlProps) {
  const { editMode, setField, resolveValue } = useCmsEditable();
  const display = resolveValue(path, html);

  if (!editMode) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: display }}
      />
    );
  }

  return (
    <div
      className={[
        className,
        "relative min-h-[12rem] cursor-text outline outline-2 outline-dashed outline-offset-2 outline-[#2271b1]/90",
      ]
        .filter(Boolean)
        .join(" ")}
      contentEditable
      data-cms-path={path}
      dangerouslySetInnerHTML={{ __html: display }}
      onBlur={(event) => {
        const next = event.currentTarget.innerHTML.trim();
        if (next && next !== display) {
          setField(path, next);
        }
      }}
      role="textbox"
      spellCheck
      suppressContentEditableWarning
    />
  );
}
