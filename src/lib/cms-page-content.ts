import type { InteriorPage } from "@/lib/pages";

export type PageContentPayload = {
  fields: Record<string, string>;
};

export function pageContentId(routeSlug: string) {
  const normalized = routeSlug.replace(/^\/+|\/+$/g, "");
  return `page:${normalized || "home"}`;
}

export function emptyPageContent(): PageContentPayload {
  return { fields: {} };
}

export function mergePageContentPayload(partial: unknown): PageContentPayload {
  if (!partial || typeof partial !== "object") return emptyPageContent();
  const raw = partial as Record<string, unknown>;
  const fieldsRaw =
    raw.fields && typeof raw.fields === "object"
      ? (raw.fields as Record<string, unknown>)
      : raw;
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(fieldsRaw)) {
    if (!key || key === "fields") continue;
    if (typeof value === "string") {
      fields[key] = value;
    }
  }
  return { fields };
}

function setAtPath(root: unknown, path: string, value: string): boolean {
  const parts = path.split(".").filter(Boolean);
  if (parts.length === 0) return false;

  let current: unknown = root;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const part = parts[i];
    const index = Number.parseInt(part, 10);
    const nextPart = parts[i + 1];
    const nextIsIndex = Number.isFinite(Number.parseInt(nextPart, 10));

    if (Array.isArray(current) && Number.isFinite(index)) {
      if (current[index] == null) {
        current[index] = nextIsIndex ? [] : {};
      }
      current = current[index];
    } else if (current && typeof current === "object") {
      const record = current as Record<string, unknown>;
      if (record[part] == null) {
        record[part] = nextIsIndex ? [] : {};
      }
      current = record[part];
    } else {
      return false;
    }
    if (current == null) return false;
  }

  const last = parts[parts.length - 1];
  const lastIndex = Number.parseInt(last, 10);
  if (Array.isArray(current) && Number.isFinite(lastIndex)) {
    current[lastIndex] = value;
    return true;
  }
  if (current && typeof current === "object") {
    (current as Record<string, unknown>)[last] = value;
    return true;
  }
  return false;
}

function ensureGalleryImageSlot(
  page: InteriorPage,
  sectionIndex: number,
  imageIndex: number,
) {
  const section = page.sections[sectionIndex];
  if (!section || section.kind !== "gallery") return;
  while (section.images.length <= imageIndex) {
    const n = section.images.length + 1;
    section.images.push({
      src: "",
      alt: `Gallery image ${n}`,
      title: `Gallery image ${n}`,
    });
  }
}

export function setPageField(
  page: InteriorPage,
  path: string,
  value: string,
): InteriorPage {
  const next = structuredClone(page);

  // Full gallery list replace: sections.N.images.__list__
  const listMatch = path.match(/^sections\.(\d+)\.images\.__list__$/);
  if (listMatch) {
    const sectionIndex = Number(listMatch[1]);
    const section = next.sections[sectionIndex];
    if (section?.kind === "gallery") {
      try {
        const parsed = JSON.parse(value) as unknown;
        if (Array.isArray(parsed)) {
          section.images = parsed
            .filter((item) => item && typeof item === "object")
            .map((item, index) => {
              const row = item as Record<string, unknown>;
              return {
                src: typeof row.src === "string" ? row.src : "",
                alt:
                  typeof row.alt === "string"
                    ? row.alt
                    : `Gallery image ${index + 1}`,
                title:
                  typeof row.title === "string"
                    ? row.title
                    : `Gallery image ${index + 1}`,
              };
            })
            .filter((item) => item.src);
        }
      } catch {
        // ignore invalid JSON
      }
    }
    return next;
  }

  const imageMatch = path.match(/^sections\.(\d+)\.images\.(\d+)\./);
  if (imageMatch) {
    ensureGalleryImageSlot(next, Number(imageMatch[1]), Number(imageMatch[2]));
  }

  setAtPath(next, path, value);
  return next;
}

export function applyPageContentFields(
  page: InteriorPage,
  fields: Record<string, string>,
): InteriorPage {
  if (!fields || Object.keys(fields).length === 0) return page;
  let next = structuredClone(page);

  // Apply gallery list replacements first, then individual fields.
  const entries = Object.entries(fields);
  entries.sort(([a], [b]) => {
    const aList = a.includes(".__list__") ? 0 : 1;
    const bList = b.includes(".__list__") ? 0 : 1;
    return aList - bList;
  });

  for (const [path, value] of entries) {
    if (typeof value !== "string") continue;
    next = setPageField(next, path, value);
  }

  // Drop empty gallery slots created by partial paths.
  next.sections = next.sections.map((section) => {
    if (section.kind !== "gallery") return section;
    return {
      ...section,
      images: section.images.filter((image) => Boolean(image.src)),
    };
  });

  return next;
}

export function collectEditablePageFields(page: InteriorPage): Record<string, string> {
  const fields: Record<string, string> = {
    title: page.title,
    intro: page.intro,
  };
  if (page.eyebrow) fields.eyebrow = page.eyebrow;
  if (page.image) fields.image = page.image;
  if (page.imageAlt) fields.imageAlt = page.imageAlt;

  page.ctas?.forEach((cta, index) => {
    fields[`ctas.${index}.label`] = cta.label;
    fields[`ctas.${index}.href`] = cta.href;
  });

  page.sections.forEach((section, sectionIndex) => {
    const base = `sections.${sectionIndex}`;
    switch (section.kind) {
      case "text":
        if (section.title) fields[`${base}.title`] = section.title;
        section.paragraphs.forEach((paragraph, paragraphIndex) => {
          fields[`${base}.paragraphs.${paragraphIndex}`] = paragraph;
        });
        break;
      case "textPair":
        section.items.forEach((item, itemIndex) => {
          fields[`${base}.items.${itemIndex}.title`] = item.title;
          item.paragraphs.forEach((paragraph, paragraphIndex) => {
            fields[`${base}.items.${itemIndex}.paragraphs.${paragraphIndex}`] =
              paragraph;
          });
        });
        break;
      case "cards":
        if (section.title) fields[`${base}.title`] = section.title;
        section.cards.forEach((card, cardIndex) => {
          fields[`${base}.cards.${cardIndex}.title`] = card.title;
          fields[`${base}.cards.${cardIndex}.href`] = card.href;
          if (card.text) fields[`${base}.cards.${cardIndex}.text`] = card.text;
          if (card.meta) fields[`${base}.cards.${cardIndex}.meta`] = card.meta;
          if (card.image) fields[`${base}.cards.${cardIndex}.image`] = card.image;
          if (card.imageAlt)
            fields[`${base}.cards.${cardIndex}.imageAlt`] = card.imageAlt;
        });
        break;
      case "awardHistory":
        fields[`${base}.title`] = section.title;
        section.items.forEach((item, itemIndex) => {
          fields[`${base}.items.${itemIndex}.year`] = item.year;
          fields[`${base}.items.${itemIndex}.winner`] = item.winner;
          if (item.supportingText) {
            fields[`${base}.items.${itemIndex}.supportingText`] =
              item.supportingText;
          }
        });
        break;
      case "media":
        if (section.title) fields[`${base}.title`] = section.title;
        if (section.text) fields[`${base}.text`] = section.text;
        section.items.forEach((item, itemIndex) => {
          if (item.caption) {
            fields[`${base}.items.${itemIndex}.caption`] = item.caption;
          } else if (item.alt) {
            fields[`${base}.items.${itemIndex}.caption`] = item.alt;
          }
        });
        break;
      case "gallery":
        if (section.title) fields[`${base}.title`] = section.title;
        fields[`${base}.images.__list__`] = JSON.stringify(section.images);
        section.images.forEach((image, imageIndex) => {
          fields[`${base}.images.${imageIndex}.src`] = image.src;
          fields[`${base}.images.${imageIndex}.title`] = image.title;
          fields[`${base}.images.${imageIndex}.alt`] = image.alt;
        });
        break;
      case "audio":
        fields[`${base}.title`] = section.title;
        if (section.text) fields[`${base}.text`] = section.text;
        section.items.forEach((item, itemIndex) => {
          fields[`${base}.items.${itemIndex}.title`] = item.title;
          fields[`${base}.items.${itemIndex}.subtitle`] = item.subtitle;
        });
        break;
      case "criteria":
        fields[`${base}.title`] = section.title;
        section.groups.forEach((group, groupIndex) => {
          fields[`${base}.groups.${groupIndex}.title`] = group.title;
          group.items.forEach((item, itemIndex) => {
            fields[`${base}.groups.${groupIndex}.items.${itemIndex}`] = item;
          });
        });
        break;
      case "form":
        fields[`${base}.title`] = section.title;
        fields[`${base}.text`] = section.text;
        break;
      case "wordpress":
        fields[`${base}.html`] = section.html;
        break;
      default:
        break;
    }
  });

  return fields;
}
