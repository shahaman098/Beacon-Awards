"use client";

import { useCmsEditable } from "@/components/visual-editor/CmsEditableContext";

type EditableTextProps = {
  path: string;
  value: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div" | "figcaption" | "strong";
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
};

/**
 * Renders the exact same element/classes as static copy when not editing.
 * Edit chrome uses outline + box-shadow only (no layout shift).
 * Prefers live field-map values when PageEditor has unsaved/saved overrides.
 */
export function EditableText({
  path,
  value,
  as: Tag = "span",
  className = "",
  style,
  multiline = false,
}: EditableTextProps) {
  const { editMode, setField, resolveValue } = useCmsEditable();
  const display = resolveValue(path, value);

  if (!editMode) {
    return (
      <Tag className={className} style={style}>
        {display}
      </Tag>
    );
  }

  return (
    <Tag
      className={[
        className,
        "relative cursor-text outline outline-2 outline-dashed outline-offset-2 outline-[#2271b1]/90",
      ]
        .filter(Boolean)
        .join(" ")}
      contentEditable
      data-cms-path={path}
      onBlur={(event) => {
        const next = multiline
          ? event.currentTarget.innerText.replace(/\u00a0/g, " ").trimEnd()
          : (event.currentTarget.textContent ?? "").replace(/\s+/g, " ").trim();
        if (next && next !== display) {
          setField(path, next);
        }
      }}
      role="textbox"
      spellCheck
      style={style}
      suppressContentEditableWarning
    >
      {display}
    </Tag>
  );
}
