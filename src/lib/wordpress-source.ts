import { parse, type HTMLElement } from "node-html-parser";
import type { InteriorPage } from "@/lib/pages";

export const wordpressOrigin = "https://beaconmosque.com";

const publicSitemaps = [
  "page-sitemap.xml",
  "post-sitemap.xml",
  "finalist-sitemap.xml",
  "category-sitemap.xml",
] as const;

const publicSlugCache = new Map<string, Promise<string[]>>();
const sourcePageCache = new Map<string, Promise<WordPressSourcePage | null>>();

export type WordPressSourcePage = {
  slug: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  bodyHtml: string;
  sourceUrl: string;
  unavailableReason?: string;
};

export function wordPressBodyHasMedia(html: string) {
  return /<(?:img|picture|video|iframe|figure|source)\b/i.test(html) || /background(?:-image)?\s*:/i.test(html);
}

function routeFromSlug(slug: string) {
  return slug ? `/${slug}/` : "/";
}

function slugFromRoute(route: string) {
  return route.replace(/^\/|\/$/g, "");
}

function isMeaningfulRoute(pathname: string) {
  if (pathname === "/" || pathname === "") return false;
  if (/^\/(?:author|tag)\//.test(pathname)) return false;
  if (/^\/(?:wp-json|wp-admin|feed)\b/.test(pathname)) return false;
  return true;
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&rsquo;|&#8217;/g, "'")
    .replace(/&lsquo;|&#8216;/g, "'")
    .replace(/&rdquo;|&#8221;/g, "\"")
    .replace(/&ldquo;|&#8220;/g, "\"")
    .replace(/&ndash;|&#8211;/g, "-")
    .replace(/&mdash;|&#8212;/g, "-")
    .replace(/&hellip;|&#8230;/g, "...")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .trim();
}

function textContent(node?: HTMLElement | null) {
  return decodeHtml(node?.textContent.replace(/\s+/g, " ") ?? "");
}

function normalizeUrl(value?: string | null, { internal = false }: { internal?: boolean } = {}) {
  if (!value) return null;

  const clean = decodeHtml(value)
    .replace(/^url\((.*)\)$/i, "$1")
    .replace(/^["']|["']$/g, "")
    .trim();

  if (!clean || clean.startsWith("#") || /^(?:data:|javascript:|mailto:|tel:)/i.test(clean)) {
    return clean || null;
  }

  try {
    const url = new URL(clean, wordpressOrigin);
    if (internal && url.origin === wordpressOrigin) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return url.toString();
  } catch {
    return clean;
  }
}

function normalizeSrcSet(value?: string | null) {
  if (!value) return null;

  const normalized = value
    .split(",")
    .map((candidate) => candidate.trim())
    .filter(Boolean)
    .map((candidate) => {
      const [src, descriptor] = candidate.split(/\s+/, 2);
      const normalizedSrc = normalizeUrl(src);
      return normalizedSrc ? `${normalizedSrc}${descriptor ? ` ${descriptor}` : ""}` : null;
    })
    .filter((candidate): candidate is string => Boolean(candidate))
    .join(", ");

  return normalized || null;
}

function removeSelectors(root: HTMLElement, selectors: string[]) {
  selectors.forEach((selector) => {
    root.querySelectorAll(selector).forEach((node) => node.remove());
  });
}

function elementHasMeaningfulContent(node: HTMLElement) {
  if (node.querySelector("img, picture, video, iframe, figure, form, input, textarea, select, button")) {
    return true;
  }

  const style = node.getAttribute("style") ?? "";
  if (/background(?:-image)?\s*:/i.test(style)) return true;

  return textContent(node).length > 0;
}

function isShortcodeNoise(value: string) {
  return /\[(?:\/?(?:vc_|button|image_with_text|contact-form-7|fusion_|qode_)[^\]]*)\]/i.test(value);
}

function pruneEmptyElements(root: HTMLElement) {
  const elements = root.querySelectorAll("*").reverse();

  elements.forEach((node) => {
    if (["img", "picture", "video", "iframe", "source", "input", "textarea", "select", "button", "br", "hr"].includes(node.tagName.toLowerCase())) {
      return;
    }

    if (!elementHasMeaningfulContent(node)) {
      node.remove();
    }
  });
}

function removeShortcodeNoise(root: HTMLElement) {
  root.querySelectorAll("p, div, span").forEach((node) => {
    if (node.querySelector("img, picture, video, iframe, figure, form, input, textarea, select, button")) {
      return;
    }

    const text = textContent(node);
    if (text && isShortcodeNoise(text)) {
      node.remove();
    }
  });
}

function rewriteElementAttributes(root: HTMLElement) {
  root.querySelectorAll("*").forEach((node) => {
    Object.keys(node.attributes).forEach((name) => {
      if (/^on/i.test(name) || name === "srcdoc") {
        node.removeAttribute(name);
      }
    });

    [
      "src",
      "poster",
      "data-src",
      "data-lazy-src",
      "data-bg",
      "data-background",
      "data-background-image",
      "data-lazy-background",
    ].forEach((name) => {
      const value = node.getAttribute(name);
      const normalized = normalizeUrl(value);
      if (!value || !normalized) return;
      node.setAttribute(name, normalized);
    });

    ["srcset", "data-srcset"].forEach((name) => {
      const value = node.getAttribute(name);
      const normalized = normalizeSrcSet(value);
      if (!value || !normalized) return;
      node.setAttribute(name, normalized);
    });

    const resolvedSrc =
      node.getAttribute("data-src") ||
      node.getAttribute("data-lazy-src") ||
      node.getAttribute("src");
    if (resolvedSrc) {
      const normalizedSrc = normalizeUrl(resolvedSrc);
      if (normalizedSrc && (!node.getAttribute("src") || /^data:|^about:blank$/i.test(node.getAttribute("src") ?? ""))) {
        node.setAttribute("src", normalizedSrc);
      }
    }

    const resolvedSrcSet = node.getAttribute("data-srcset") || node.getAttribute("srcset");
    if (resolvedSrcSet) {
      const normalizedSrcSet = normalizeSrcSet(resolvedSrcSet);
      if (
        normalizedSrcSet &&
        (!node.getAttribute("srcset") || /^data:|^about:blank$/i.test(node.getAttribute("srcset") ?? ""))
      ) {
        node.setAttribute("srcset", normalizedSrcSet);
      }
    }

    const resolvedPoster = node.getAttribute("data-poster") || node.getAttribute("poster");
    if (resolvedPoster) {
      const normalizedPoster = normalizeUrl(resolvedPoster);
      if (
        normalizedPoster &&
        (!node.getAttribute("poster") || /^data:|^about:blank$/i.test(node.getAttribute("poster") ?? ""))
      ) {
        node.setAttribute("poster", normalizedPoster);
      }
    }

    const href = node.getAttribute("href");
    if (href) {
      const normalizedHref = normalizeUrl(href, { internal: true });
      if (normalizedHref) {
        node.setAttribute("href", normalizedHref);
      }
    }

    const style = node.getAttribute("style");
    if (style?.includes("url(")) {
      node.setAttribute(
        "style",
        style.replace(/url\(([^)]+)\)/gi, (_, value: string) => {
          const normalized = normalizeUrl(value);
          return normalized ? `url("${normalized}")` : "none";
        }),
      );
    }
  });
}

function dropDuplicateTitle(root: HTMLElement, title: string) {
  const heading = root.querySelector("h1, h2");
  if (!heading) return;

  if (textContent(heading).toLowerCase() === title.toLowerCase()) {
    heading.remove();
  }
}

function collectIntro(root: HTMLElement) {
  const paragraphs = root.querySelectorAll("p, li");
  const candidate =
    paragraphs
      .map((node) => textContent(node))
      .find((text) => text.length > 24 && !isShortcodeNoise(text)) ?? "";

  return candidate.length > 24 ? candidate : "";
}

function guessTitle(document: HTMLElement, contentRoot: HTMLElement, fallbackSlug: string) {
  const mainHeading = contentRoot.querySelector("h1");
  if (mainHeading) return textContent(mainHeading);

  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
  if (ogTitle) return decodeHtml(ogTitle.replace(/\s*-\s*Beacon Mosque$/i, ""));

  const titleTag = document.querySelector("title")?.textContent ?? "";
  const cleaned = decodeHtml(titleTag.replace(/\s*-\s*Beacon Mosque$/i, ""));
  if (cleaned) return cleaned;

  return fallbackSlug
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase()) ?? "Beacon Mosque";
}

function findContentRoot(document: HTMLElement) {
  return (
    document.querySelector("main .post-content") ??
    document.querySelector("main article .post-content") ??
    document.querySelector("main #content .post-content") ??
    document.querySelector("main") ??
    document
  );
}

function sanitizeWordPressBody(html: string, slug: string) {
  const document = parse(html);
  const contentRoot = findContentRoot(document);
  const title = guessTitle(document, contentRoot, slug);
  const image = normalizeUrl(document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? null) ?? undefined;
  const imageAlt = decodeHtml(document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content") ?? "") || undefined;

  removeSelectors(contentRoot, [
    "script",
    "style",
    "noscript",
    "svg",
    ".rich-snippet-hidden",
    ".fusion-meta-info",
    ".fusion-sharing-box",
    ".related-posts",
    ".fusion-rollover",
    ".fusion-page-title-bar",
    ".fusion-tb-meta",
    ".fusion-post-content-container .updated",
    ".post-content > .vcard",
    ".post-content > .updated",
    ".post-content > .entry-title",
    "#comments",
    ".comment-respond",
    ".awb-zohrapopup",
    ".fusion-social-share",
  ]);

  rewriteElementAttributes(contentRoot);
  dropDuplicateTitle(contentRoot, title);
  removeShortcodeNoise(contentRoot);
  pruneEmptyElements(contentRoot);

  return {
    title,
    intro: collectIntro(contentRoot),
    image,
    imageAlt,
    bodyHtml: contentRoot.innerHTML.trim(),
  };
}

async function fetchSitemapSlugs(name: string) {
  if (!publicSlugCache.has(name)) {
    publicSlugCache.set(
      name,
      fetch(`${wordpressOrigin}/${name}`, { cache: "force-cache" })
        .then(async (response) => {
          if (!response.ok) return [];
          const xml = await response.text();

          return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
            .map((match) => match[1].trim())
            .map((url) => {
              const pathname = new URL(url).pathname;
              return pathname.endsWith("/") ? pathname : `${pathname}/`;
            })
            .filter(isMeaningfulRoute)
            .map(slugFromRoute);
        })
        .catch(() => []),
    );
  }

  return publicSlugCache.get(name)!;
}

export async function getWordPressPublicSlugs() {
  const slugSets = await Promise.all(publicSitemaps.map((name) => fetchSitemapSlugs(name)));
  return Array.from(new Set(slugSets.flat())).sort();
}

export async function getWordPressSourcePage(slug: string): Promise<WordPressSourcePage | null> {
  if (!sourcePageCache.has(slug)) {
    sourcePageCache.set(
      slug,
      fetch(new URL(routeFromSlug(slug), wordpressOrigin), { cache: "force-cache" })
        .then(async (response) => {
          if (!response.ok) {
            return null;
          }

          const html = await response.text();
          const sanitized = sanitizeWordPressBody(html, slug);

          return {
            slug,
            title: sanitized.title,
            intro: sanitized.intro,
            image: sanitized.image,
            imageAlt: sanitized.imageAlt,
            bodyHtml: sanitized.bodyHtml,
            sourceUrl: new URL(routeFromSlug(slug), wordpressOrigin).toString(),
          } satisfies WordPressSourcePage;
        })
        .catch(() => null),
    );
  }

  return sourcePageCache.get(slug)!;
}

export async function getWordPressFallbackPage(slug: string): Promise<InteriorPage | null> {
  const source = await getWordPressSourcePage(slug);
  if (!source) return null;
  const showHeroImage = source.image && !wordPressBodyHasMedia(source.bodyHtml);

  return {
    slug,
    title: source.title,
    eyebrow: slug.startsWith("news/") || slug.startsWith("uncategorized/") ? "News archive" : "Beacon Mosque archive",
    intro: source.intro || `${source.title} remains available as part of the Beacon Mosque public archive.`,
    image: showHeroImage ? source.image : undefined,
    imageAlt: source.imageAlt,
    sections: source.bodyHtml ? [{ kind: "wordpress", html: source.bodyHtml, sourceUrl: source.sourceUrl }] : [],
  };
}
