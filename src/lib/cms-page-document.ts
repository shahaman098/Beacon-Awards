import { applyPageContentFields } from "@/lib/cms-page-content";
import type { InteriorPage, PageForm, PageSection } from "@/lib/pages";

export const PAGE_DOCUMENT_SCHEMA_VERSION = 1 as const;

export type AddableSectionKind =
  | "text"
  | "textPair"
  | "cards"
  | "gallery"
  | "media"
  | "criteria"
  | "form"
  | "audio"
  | "awardHistory";

export type LockedSectionKind = "wordpress" | "standards" | "accredited";

export type PageSectionKind = PageSection["kind"];

export type IdentifiedPageSection = PageSection & { id: string };

export type PageDocument = {
  schemaVersion: typeof PAGE_DOCUMENT_SCHEMA_VERSION;
  title: string;
  eyebrow?: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  ctas?: InteriorPage["ctas"];
  /** Optional SEO overrides (Phase E). */
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  sections: IdentifiedPageSection[];
};

/**
 * True when the document has at least one non-WordPress section.
 * Used to stop remote WP HTML from clobbering CMS-owned page content.
 */
export function documentHasCmsOwnedSections(
  document: Pick<PageDocument, "sections"> | Pick<InteriorPage, "sections">,
): boolean {
  return document.sections.some((section) => section.kind !== "wordpress");
}

/** Seed document for a newly created CMS page/post entry. */
export function createDefaultPageDocument(input: {
  title: string;
  intro: string;
  content?: string;
}): PageDocument {
  const paragraphs = (input.content ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").trim())
    .filter(Boolean);

  return {
    schemaVersion: PAGE_DOCUMENT_SCHEMA_VERSION,
    title: input.title.trim() || "Untitled page",
    intro: input.intro.trim() || "Add a short introduction.",
    sections: [
      {
        id: createSectionId(),
        kind: "text",
        title: "Main content",
        paragraphs:
          paragraphs.length > 0
            ? paragraphs
            : ["Add your content here."],
      },
    ],
  };
}

export const ADDABLE_SECTION_KINDS: readonly AddableSectionKind[] = [
  "text",
  "textPair",
  "cards",
  "gallery",
  "media",
  "criteria",
  "form",
  "audio",
  "awardHistory",
] as const;

export const LOCKED_SECTION_KINDS: readonly LockedSectionKind[] = [
  "wordpress",
  "standards",
  "accredited",
] as const;

export const ADDABLE_SECTION_LABELS: Record<AddableSectionKind, string> = {
  text: "Text",
  textPair: "Text pair",
  cards: "Cards",
  gallery: "Gallery",
  media: "Media",
  criteria: "Criteria",
  form: "Form",
  audio: "Audio",
  awardHistory: "Award history",
};

const ADDABLE_KIND_SET = new Set<string>(ADDABLE_SECTION_KINDS);

export function isAddableSectionKind(kind: string): kind is AddableSectionKind {
  return ADDABLE_KIND_SET.has(kind);
}

export function createSectionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `sec_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
  }
  return `sec_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function sectionIdFrom(section: PageSection, index: number, existing?: unknown) {
  if (typeof existing === "string" && existing.trim()) {
    return existing.trim();
  }
  if (
    section &&
    typeof section === "object" &&
    "id" in section &&
    typeof (section as { id?: unknown }).id === "string" &&
    (section as { id: string }).id.trim()
  ) {
    return (section as { id: string }).id.trim();
  }
  return `sec-${index}-${section.kind}`;
}

export function defaultSectionTemplate(
  kind: AddableSectionKind,
): IdentifiedPageSection {
  const id = createSectionId();
  switch (kind) {
    case "text":
      return {
        id,
        kind: "text",
        title: "New section",
        paragraphs: ["Add your content here."],
      };
    case "textPair":
      return {
        id,
        kind: "textPair",
        items: [
          { title: "Column one", paragraphs: ["Add your content here."] },
          { title: "Column two", paragraphs: ["Add your content here."] },
        ],
      };
    case "cards":
      return {
        id,
        kind: "cards",
        title: "Cards",
        cards: [
          {
            title: "Card title",
            text: "Short description",
            href: "/",
          },
        ],
      };
    case "gallery":
      return {
        id,
        kind: "gallery",
        title: "Gallery",
        images: [],
      };
    case "media":
      return {
        id,
        kind: "media",
        title: "Media",
        text: "",
        items: [],
      };
    case "criteria":
      return {
        id,
        kind: "criteria",
        title: "Criteria",
        groups: [{ title: "Group", items: ["Criterion one"] }],
      };
    case "form":
      return {
        id,
        kind: "form",
        form: "contact" satisfies PageForm,
        title: "Contact form",
        text: "Send a message to the Beacon Mosque team.",
      };
    case "audio":
      return {
        id,
        kind: "audio",
        title: "Audio",
        text: "",
        items: [],
      };
    case "awardHistory":
      return {
        id,
        kind: "awardHistory",
        title: "Award history",
        items: [],
      };
  }
}

function stripSectionId(section: IdentifiedPageSection): PageSection {
  const { id: _id, ...rest } = section;
  return rest as PageSection;
}

export function documentToInteriorPage(
  document: PageDocument,
  slug: string,
  extras?: Pick<InteriorPage, "heroVideo" | "heroVideoPoster">,
): InteriorPage {
  return {
    slug,
    title: document.title,
    eyebrow: document.eyebrow,
    intro: document.intro,
    image: document.image,
    imageAlt: document.imageAlt,
    metaTitle: document.metaTitle,
    metaDescription: document.metaDescription,
    ogImage: document.ogImage,
    ctas: document.ctas,
    heroVideo: extras?.heroVideo,
    heroVideoPoster: extras?.heroVideoPoster,
    sections: document.sections.map(stripSectionId),
  };
}

export function interiorPageToDocument(page: InteriorPage): PageDocument {
  return withStableSectionIds(page);
}

export function withStableSectionIds(page: InteriorPage): PageDocument {
  return {
    schemaVersion: PAGE_DOCUMENT_SCHEMA_VERSION,
    title: page.title,
    ...(page.eyebrow ? { eyebrow: page.eyebrow } : {}),
    intro: page.intro,
    ...(page.image ? { image: page.image } : {}),
    ...(page.imageAlt ? { imageAlt: page.imageAlt } : {}),
    ...(page.metaTitle ? { metaTitle: page.metaTitle } : {}),
    ...(page.metaDescription ? { metaDescription: page.metaDescription } : {}),
    ...(page.ogImage ? { ogImage: page.ogImage } : {}),
    ...(page.ctas?.length ? { ctas: page.ctas } : {}),
    sections: page.sections.map((section, index) => {
      const raw = section as PageSection & { id?: string };
      return {
        ...section,
        id: sectionIdFrom(section, index, raw.id),
      };
    }),
  };
}

export function migrateFieldsToDocument(
  page: InteriorPage,
  fields: Record<string, string>,
): PageDocument {
  const merged = applyPageContentFields(page, fields);
  return withStableSectionIds(merged);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseCtas(value: unknown): InteriorPage["ctas"] | undefined {
  if (!Array.isArray(value)) return undefined;
  const ctas: NonNullable<InteriorPage["ctas"]> = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const label = typeof item.label === "string" ? item.label : "";
    const href = typeof item.href === "string" ? item.href : "";
    if (!label || !href) continue;
    const variant =
      item.variant === "primary" || item.variant === "secondary"
        ? item.variant
        : undefined;
    ctas.push(variant ? { label, href, variant } : { label, href });
  }
  return ctas.length > 0 ? ctas : undefined;
}

function parseSection(raw: unknown, index: number): IdentifiedPageSection | null {
  if (!isRecord(raw) || typeof raw.kind !== "string") return null;
  const kind = raw.kind as PageSectionKind;
  const id = sectionIdFrom({ kind } as PageSection, index, raw.id);

  switch (kind) {
    case "text": {
      const paragraphs = Array.isArray(raw.paragraphs)
        ? raw.paragraphs.filter((item): item is string => typeof item === "string")
        : [];
      return {
        id,
        kind: "text",
        ...(typeof raw.title === "string" ? { title: raw.title } : {}),
        paragraphs:
          paragraphs.length > 0 ? paragraphs : ["Add your content here."],
      };
    }
    case "textPair": {
      const items = Array.isArray(raw.items)
        ? raw.items.filter(isRecord).map((item) => ({
            title: typeof item.title === "string" ? item.title : "Untitled",
            paragraphs: Array.isArray(item.paragraphs)
              ? item.paragraphs.filter(
                  (paragraph): paragraph is string =>
                    typeof paragraph === "string",
                )
              : [],
          }))
        : [];
      return {
        id,
        kind: "textPair",
        items:
          items.length > 0
            ? items
            : [{ title: "Column", paragraphs: ["Add your content here."] }],
      };
    }
    case "cards": {
      const cards: Extract<PageSection, { kind: "cards" }>["cards"] =
        Array.isArray(raw.cards)
          ? raw.cards.filter(isRecord).map((card) => ({
              title: typeof card.title === "string" ? card.title : "Card",
              text: typeof card.text === "string" ? card.text : "",
              href: typeof card.href === "string" ? card.href : "/",
              ...(typeof card.meta === "string" ? { meta: card.meta } : {}),
              ...(typeof card.image === "string" ? { image: card.image } : {}),
              ...(typeof card.imageAlt === "string"
                ? { imageAlt: card.imageAlt }
                : {}),
            }))
          : [];
      return {
        id,
        kind: "cards",
        ...(typeof raw.title === "string" ? { title: raw.title } : {}),
        cards,
      };
    }
    case "awardHistory": {
      const items = Array.isArray(raw.items)
        ? raw.items.filter(isRecord).map((item) => ({
            year: typeof item.year === "string" ? item.year : "",
            winner: typeof item.winner === "string" ? item.winner : "",
            ...(typeof item.href === "string" ? { href: item.href } : {}),
            ...(typeof item.supportingText === "string"
              ? { supportingText: item.supportingText }
              : {}),
          }))
        : [];
      return {
        id,
        kind: "awardHistory",
        title: typeof raw.title === "string" ? raw.title : "Award history",
        items,
      };
    }
    case "media": {
      const items: Extract<PageSection, { kind: "media" }>["items"] = [];
      if (Array.isArray(raw.items)) {
        for (const item of raw.items) {
          if (!isRecord(item)) continue;
          const type =
            item.type === "image" ||
            item.type === "video" ||
            item.type === "embed" ||
            item.type === "link"
              ? item.type
              : ("image" as const);
          items.push({
            type,
            src: typeof item.src === "string" ? item.src : "",
            ...(typeof item.alt === "string" ? { alt: item.alt } : {}),
            ...(typeof item.caption === "string"
              ? { caption: item.caption }
              : {}),
            ...(typeof item.poster === "string" ? { poster: item.poster } : {}),
          });
        }
      }
      return {
        id,
        kind: "media",
        ...(typeof raw.title === "string" ? { title: raw.title } : {}),
        ...(typeof raw.text === "string" ? { text: raw.text } : {}),
        items,
      };
    }
    case "wordpress":
      return {
        id,
        kind: "wordpress",
        html: typeof raw.html === "string" ? raw.html : "",
        ...(typeof raw.sourceUrl === "string"
          ? { sourceUrl: raw.sourceUrl }
          : {}),
      };
    case "gallery": {
      const images = Array.isArray(raw.images)
        ? raw.images
            .filter(isRecord)
            .map((image, imageIndex) => ({
              src: typeof image.src === "string" ? image.src : "",
              alt:
                typeof image.alt === "string"
                  ? image.alt
                  : `Gallery image ${imageIndex + 1}`,
              title:
                typeof image.title === "string"
                  ? image.title
                  : `Gallery image ${imageIndex + 1}`,
            }))
            .filter((image) => Boolean(image.src))
        : [];
      return {
        id,
        kind: "gallery",
        ...(typeof raw.title === "string" ? { title: raw.title } : {}),
        images,
      };
    }
    case "audio": {
      const items = Array.isArray(raw.items)
        ? raw.items.filter(isRecord).map((item) => ({
            title: typeof item.title === "string" ? item.title : "Audio",
            subtitle: typeof item.subtitle === "string" ? item.subtitle : "",
            src: typeof item.src === "string" ? item.src : "",
          }))
        : [];
      return {
        id,
        kind: "audio",
        title: typeof raw.title === "string" ? raw.title : "Audio",
        ...(typeof raw.text === "string" ? { text: raw.text } : {}),
        items,
      };
    }
    case "standards":
      return { id, kind: "standards" };
    case "accredited":
      return { id, kind: "accredited" };
    case "criteria": {
      const groups = Array.isArray(raw.groups)
        ? raw.groups.filter(isRecord).map((group) => ({
            title: typeof group.title === "string" ? group.title : "Group",
            items: Array.isArray(group.items)
              ? group.items.filter(
                  (item): item is string => typeof item === "string",
                )
              : [],
          }))
        : [];
      return {
        id,
        kind: "criteria",
        title: typeof raw.title === "string" ? raw.title : "Criteria",
        groups: groups.length > 0 ? groups : [{ title: "Group", items: [] }],
      };
    }
    case "form": {
      const form: PageForm =
        raw.form === "rating" || raw.form === "nomination"
          ? raw.form
          : "contact";
      return {
        id,
        kind: "form",
        form,
        title: typeof raw.title === "string" ? raw.title : "Form",
        text: typeof raw.text === "string" ? raw.text : "",
        ...(typeof raw.defaultCategory === "string"
          ? { defaultCategory: raw.defaultCategory }
          : {}),
        ...(typeof raw.embedSrc === "string" ? { embedSrc: raw.embedSrc } : {}),
        ...(typeof raw.embedHeight === "number"
          ? { embedHeight: raw.embedHeight }
          : {}),
      };
    }
    default:
      return null;
  }
}

export function parsePageDocument(partial: unknown): PageDocument | null {
  if (!isRecord(partial)) return null;
  if (typeof partial.title !== "string" || typeof partial.intro !== "string") {
    return null;
  }
  if (!Array.isArray(partial.sections)) return null;

  const sections = partial.sections
    .map((section, index) => parseSection(section, index))
    .filter((section): section is IdentifiedPageSection => Boolean(section));

  return {
    schemaVersion: PAGE_DOCUMENT_SCHEMA_VERSION,
    title: partial.title,
    ...(typeof partial.eyebrow === "string" ? { eyebrow: partial.eyebrow } : {}),
    intro: partial.intro,
    ...(typeof partial.image === "string" ? { image: partial.image } : {}),
    ...(typeof partial.imageAlt === "string"
      ? { imageAlt: partial.imageAlt }
      : {}),
    ...(typeof partial.metaTitle === "string"
      ? { metaTitle: partial.metaTitle }
      : {}),
    ...(typeof partial.metaDescription === "string"
      ? { metaDescription: partial.metaDescription }
      : {}),
    ...(typeof partial.ogImage === "string" ? { ogImage: partial.ogImage } : {}),
    ...(parseCtas(partial.ctas) ? { ctas: parseCtas(partial.ctas) } : {}),
    sections,
  };
}

export function mergePageDocument(
  base: PageDocument,
  overlay: PageDocument | null | undefined,
): PageDocument {
  if (!overlay) return base;
  return {
    schemaVersion: PAGE_DOCUMENT_SCHEMA_VERSION,
    title: overlay.title || base.title,
    eyebrow: overlay.eyebrow ?? base.eyebrow,
    intro: overlay.intro || base.intro,
    image: overlay.image ?? base.image,
    imageAlt: overlay.imageAlt ?? base.imageAlt,
    metaTitle: overlay.metaTitle ?? base.metaTitle,
    metaDescription: overlay.metaDescription ?? base.metaDescription,
    ogImage: overlay.ogImage ?? base.ogImage,
    ctas: overlay.ctas ?? base.ctas,
    sections: overlay.sections.length > 0 ? overlay.sections : base.sections,
  };
}

/** Special layouts stay structure-locked (no add/remove/reorder chrome). */
export function isPageStructureLocked(page: InteriorPage): boolean {
  if (
    page.slug === "standards" ||
    page.slug === "resources" ||
    page.slug === "training"
  ) {
    return true;
  }
  if (/^Awards 20\d{2} category$/.test(page.eyebrow ?? "")) {
    return true;
  }
  if (/^(Winner|Finalist|Shortlisted)\s-/.test(page.eyebrow ?? "")) {
    return true;
  }
  return false;
}

export function addSectionToDocument(
  document: PageDocument,
  kind: AddableSectionKind,
  afterIndex?: number,
): PageDocument {
  const section = defaultSectionTemplate(kind);
  const sections = [...document.sections];
  const insertAt =
    typeof afterIndex === "number" && Number.isFinite(afterIndex)
      ? Math.min(Math.max(afterIndex + 1, 0), sections.length)
      : sections.length;
  sections.splice(insertAt, 0, section);
  return { ...document, sections };
}

export function removeSectionFromDocument(
  document: PageDocument,
  index: number,
): PageDocument {
  if (index < 0 || index >= document.sections.length) return document;
  return {
    ...document,
    sections: document.sections.filter((_, i) => i !== index),
  };
}

export function reorderSectionsInDocument(
  document: PageDocument,
  from: number,
  to: number,
): PageDocument {
  if (
    from < 0 ||
    to < 0 ||
    from >= document.sections.length ||
    to >= document.sections.length ||
    from === to
  ) {
    return document;
  }
  const sections = [...document.sections];
  const [moved] = sections.splice(from, 1);
  sections.splice(to, 0, moved);
  return { ...document, sections };
}

export function reorderSectionsByIds(
  document: PageDocument,
  sectionIds: string[],
): PageDocument {
  if (sectionIds.length !== document.sections.length) return document;
  const byId = new Map(document.sections.map((section) => [section.id, section]));
  const next: IdentifiedPageSection[] = [];
  for (const id of sectionIds) {
    const section = byId.get(id);
    if (!section) return document;
    next.push(section);
  }
  return { ...document, sections: next };
}

export function identifiedSectionsFromPage(
  page: InteriorPage,
): IdentifiedPageSection[] {
  return withStableSectionIds(page).sections;
}

export function applyIdentifiedSections(
  page: InteriorPage,
  sections: IdentifiedPageSection[],
): InteriorPage {
  return {
    ...page,
    sections: sections.map(stripSectionId),
  };
}

export function pageFromDocumentState(
  slug: string,
  document: PageDocument,
  extras?: Pick<InteriorPage, "heroVideo" | "heroVideoPoster">,
): InteriorPage {
  return documentToInteriorPage(document, slug, extras);
}
