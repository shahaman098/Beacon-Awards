import type { InteriorPage, MediaItem, PageSection } from "@/lib/pages";
import { getWordPressSourcePage, wordPressBodyHasMedia, wordpressOrigin } from "@/lib/wordpress-source";
const mediaAttachmentCache = new Map<string, Promise<MediaItem | null>>();

function shouldUseWordPressBody(page: InteriorPage) {
  const curatedSlugs = new Set([
    "category/news",
    "contact-us",
    "gallery",
    "privacy-policy",
  ]);

  return !curatedSlugs.has(page.slug);
}

function decodeEntities(value: string) {
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
    .replace(/<[^>]+>/g, "");
}

function decodeAttribute(value: string) {
  return decodeEntities(value).replace(/^["']|["']$/g, "").trim();
}

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function resolveWordPressMediaUrl(value?: string | null) {
  if (!value) return null;

  const decoded = decodeAttribute(value)
    .replace(/^url\((.*)\)$/i, "$1")
    .replace(/^["']|["']$/g, "")
    .trim();

  if (
    !decoded ||
    decoded.startsWith("#") ||
    /^(?:about:|data:|javascript:|mailto:|tel:)/i.test(decoded)
  ) {
    return null;
  }

  try {
    if (decoded.startsWith("//")) return `https:${decoded}`;
    if (/^https?:\/\//i.test(decoded)) return decoded;
    if (decoded.startsWith("/")) return new URL(decoded, wordpressOrigin).toString();
    return new URL(decoded, wordpressOrigin).toString();
  } catch {
    return null;
  }
}

function wordpressPageUrl(slug: string) {
  return new URL(slug ? `/${slug}/` : "/", wordpressOrigin).toString();
}

function attrsFromTag(tag: string) {
  const attrs: Record<string, string> = {};
  const attrPattern = /([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;

  for (const match of tag.matchAll(attrPattern)) {
    attrs[match[1].toLowerCase()] = decodeAttribute(match[3] ?? match[4] ?? match[5] ?? "");
  }

  return attrs;
}

function srcSetToUrls(srcSet?: string) {
  if (!srcSet) return [];

  return srcSet
    .split(",")
    .map((candidate) => resolveWordPressMediaUrl(candidate.trim().split(/\s+/)[0]))
    .filter((url): url is string => Boolean(url));
}

function normaliseSrcSet(srcSet?: string) {
  const urls = srcSetToUrls(srcSet);
  return urls.length ? urls.join(", ") : undefined;
}

function firstMediaUrl(...values: Array<string | undefined>) {
  for (const value of values) {
    const src = resolveWordPressMediaUrl(value);
    if (src) return src;
  }

  return null;
}

function imageSourceFromAttrs(attrs: Record<string, string>) {
  const srcSetUrls = [...srcSetToUrls(attrs.srcset), ...srcSetToUrls(attrs["data-srcset"])];
  const src = firstMediaUrl(attrs.src, attrs["data-src"], attrs["data-lazy-src"], attrs["data-original"], srcSetUrls[0]);

  if (src?.endsWith("/wp-content/uploads/2023/06/13765-FA-M-Beacon-Mosque-v4_Facilities-200x200-2.png")) {
    return srcSetUrls.find((url) => url.endsWith("-150x150.png")) ?? srcSetUrls.find((url) => url !== src) ?? src;
  }

  return src;
}

function isUploadLikeUrl(src: string) {
  return /\.(avif|gif|jpe?g|png|webp|svg|mp4|m4v|mov|webm|ogv|pdf)(\?.*)?$/i.test(src) || /\/wp-content\/uploads\//i.test(src);
}

function isVideoUrl(src: string) {
  return /\.(mp4|m4v|mov|webm|ogv)(\?.*)?$/i.test(src);
}

function isTrustedEmbed(src: string) {
  try {
    const hostname = new URL(src).hostname.replace(/^www\./, "");
    return ["youtube.com", "youtu.be", "youtube-nocookie.com", "player.vimeo.com", "vimeo.com"].some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

function isSiteChromeMedia(src: string, alt?: string) {
  const normalized = src.toLowerCase();
  const label = normalise(alt ?? "");

  return (
    normalized.includes("/assets/brand/beacon-mosque") ||
    normalized.includes("/wp-content/themes/avada/assets/images/logo.png") ||
    normalized.includes("/wp-content/uploads/2023/01/beaconmosque") ||
    normalized.includes("/wp-content/uploads/2023/01/beacon-mosque") ||
    normalized.includes("/wp-content/uploads/2023/06/bm-white") ||
    normalized.includes("/wp-content/uploads/2016/11/logo") ||
    (label === "beacon mosque" && normalized.includes("beacon"))
  );
}

function dedupeMedia(items: MediaItem[]) {
  const seen = new Set<string>();
  const result: MediaItem[] = [];

  for (const item of items) {
    const key = `${item.type}:${item.src}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}

function textFromHtml(html: string) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractStyleBackgroundUrls(html: string) {
  const items: MediaItem[] = [];
  const stylePattern = /style\s*=\s*("([^"]*)"|'([^']*)')/gi;

  for (const match of html.matchAll(stylePattern)) {
    const style = decodeAttribute(match[2] ?? match[3] ?? "");
    for (const urlMatch of style.matchAll(/background(?:-image)?\s*:[^;]*url\(([^)]+)\)/gi)) {
      const src = resolveWordPressMediaUrl(urlMatch[1]);
      if (src && isUploadLikeUrl(src) && !isSiteChromeMedia(src)) {
        items.push({ type: isVideoUrl(src) ? "video" : "image", src, caption: "Background media" });
      }
    }
  }

  return items;
}

function extractDataBackgroundUrls(html: string) {
  const items: MediaItem[] = [];
  const dataPattern = /\s(data-bg|data-background|data-background-image|data-lazy-background)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi;

  for (const match of html.matchAll(dataPattern)) {
    const src = resolveWordPressMediaUrl(match[3] ?? match[4] ?? match[5]);
    if (src && isUploadLikeUrl(src) && !isSiteChromeMedia(src)) {
      items.push({ type: isVideoUrl(src) ? "video" : "image", src, caption: "Background media" });
    }
  }

  return items;
}

function extractImages(html: string) {
  const items: MediaItem[] = [];

  for (const figureMatch of html.matchAll(/<figure[\s\S]*?<\/figure>/gi)) {
    const figure = figureMatch[0];
    const img = figure.match(/<img\b[^>]*>/i)?.[0];
    if (!img) continue;

    const attrs = attrsFromTag(img);
    const src = imageSourceFromAttrs(attrs);
    if (!src || isSiteChromeMedia(src, attrs.alt)) continue;

    items.push({
      type: isVideoUrl(src) ? "video" : "image",
      src,
      alt: attrs.alt,
      caption: textFromHtml(figure.match(/<figcaption[\s\S]*?<\/figcaption>/i)?.[0] ?? ""),
      srcSet: normaliseSrcSet(attrs.srcset ?? attrs["data-srcset"]),
      sizes: attrs.sizes,
    });
  }

  for (const imgMatch of html.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = attrsFromTag(imgMatch[0]);
    const src = imageSourceFromAttrs(attrs);
    if (!src || isSiteChromeMedia(src, attrs.alt)) continue;

    items.push({
      type: isVideoUrl(src) ? "video" : "image",
      src,
      alt: attrs.alt,
      caption: attrs.title,
      srcSet: normaliseSrcSet(attrs.srcset ?? attrs["data-srcset"]),
      sizes: attrs.sizes,
    });
  }

  for (const sourceMatch of html.matchAll(/<source\b[^>]*>/gi)) {
    const attrs = attrsFromTag(sourceMatch[0]);
    const src = firstMediaUrl(attrs.src, attrs.srcset, attrs["data-srcset"]);
    if (!src || !isUploadLikeUrl(src) || isSiteChromeMedia(src)) continue;

    items.push({
      type: isVideoUrl(src) ? "video" : "image",
      src,
      srcSet: normaliseSrcSet(attrs.srcset ?? attrs["data-srcset"]),
      sizes: attrs.sizes,
    });
  }

  return items;
}

function extractVideos(html: string) {
  const items: MediaItem[] = [];

  for (const videoMatch of html.matchAll(/<video\b[\s\S]*?<\/video>/gi)) {
    const video = videoMatch[0];
    const attrs = attrsFromTag(video.match(/<video\b[^>]*>/i)?.[0] ?? "");
    const sources = [...video.matchAll(/<source\b[^>]*>/gi)]
      .map((source) => firstMediaUrl(attrsFromTag(source[0]).src, attrsFromTag(source[0])["data-src"]))
      .filter((src): src is string => Boolean(src));
    const src = firstMediaUrl(attrs.src, attrs["data-src"], sources[0]);

    if (src) {
      items.push({
        type: "video",
        src,
        poster: resolveWordPressMediaUrl(attrs.poster) ?? undefined,
        sources: Array.from(new Set([src, ...sources])),
      });
    }
  }

  for (const linkMatch of html.matchAll(/<a\b[^>]*href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))[^>]*>/gi)) {
    const src = resolveWordPressMediaUrl(linkMatch[2] ?? linkMatch[3] ?? linkMatch[4]);
    if (!src || !isUploadLikeUrl(src)) continue;
    items.push({ type: isVideoUrl(src) ? "video" : "link", src });
  }

  return items;
}

function extractEmbeds(html: string) {
  const items: MediaItem[] = [];

  for (const iframeMatch of html.matchAll(/<iframe\b[^>]*>/gi)) {
    const attrs = attrsFromTag(iframeMatch[0]);
    const src = resolveWordPressMediaUrl(attrs.src ?? attrs["data-src"]);
    if (!src) continue;

    items.push({
      type: isTrustedEmbed(src) ? "embed" : "link",
      src,
      caption: attrs.title,
      trustedEmbed: isTrustedEmbed(src),
    });
  }

  return items;
}

function extractMetaImages(html: string) {
  const items: MediaItem[] = [];
  const metaPattern = /<meta\b[^>]*(property|name)\s*=\s*["'](?:og:image|twitter:image)["'][^>]*>/gi;

  for (const match of html.matchAll(metaPattern)) {
    const attrs = attrsFromTag(match[0]);
    const src = resolveWordPressMediaUrl(attrs.content);
    if (src && isUploadLikeUrl(src) && !isSiteChromeMedia(src)) {
      items.push({ type: "image", src, caption: "Featured image" });
    }
  }

  return items;
}

function extractShortcodeAttachmentIds(html: string) {
  const ids = new Set<string>();
  const shortcodePattern = /\[(?:gallery|vc_[^\]]+|rev_slider|wpvideo)[^\]]+\]/gi;

  for (const shortcode of html.matchAll(shortcodePattern)) {
    for (const attr of shortcode[0].matchAll(/\b(?:image|images|ids|include|background_image|poster)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s\]]+))/gi)) {
      const value = decodeAttribute(attr[1] ?? attr[2] ?? attr[3] ?? "");
      for (const id of value.split(/[, ]+/)) {
        if (/^\d+$/.test(id)) ids.add(id);
      }
    }
  }

  return Array.from(ids);
}

async function mediaItemForAttachment(id: string): Promise<MediaItem | null> {
  if (!mediaAttachmentCache.has(id)) {
    mediaAttachmentCache.set(
      id,
      fetch(`${wordpressOrigin}/wp-json/wp/v2/media/${id}`, { cache: "force-cache" })
        .then(async (response) => {
          if (!response.ok) return null;
          const media = await response.json();
          const src = resolveWordPressMediaUrl(media.source_url);
          if (!src || isSiteChromeMedia(src, media.alt_text)) return null;

          return {
            type: isVideoUrl(src) ? "video" : "image",
            src,
            alt: media.alt_text,
            caption: textFromHtml(media.caption?.rendered ?? media.title?.rendered ?? ""),
          } satisfies MediaItem;
        })
        .catch(() => null),
    );
  }

  return mediaAttachmentCache.get(id)!;
}

async function extractShortcodeMedia(html: string) {
  const items = await Promise.all(extractShortcodeAttachmentIds(html).map((id) => mediaItemForAttachment(id)));
  return items.filter((item): item is MediaItem => Boolean(item));
}

export async function extractWordPressMedia(html: string) {
  const items = [
    ...extractMetaImages(html),
    ...extractImages(html),
    ...extractVideos(html),
    ...extractEmbeds(html),
    ...extractStyleBackgroundUrls(html),
    ...extractDataBackgroundUrls(html),
    ...(await extractShortcodeMedia(html)),
  ];

  return dedupeMedia(items).filter((item) => !isSiteChromeMedia(item.src, item.alt));
}

async function getWordPressEnhancements(page: InteriorPage) {
  const source = await getWordPressSourcePage(page.slug);
  if (!source) return null;

  return {
    body:
      shouldUseWordPressBody(page) && source.bodyHtml
        ? ({
            kind: "wordpress",
            html: source.bodyHtml,
            sourceUrl: source.sourceUrl,
          } satisfies Extract<PageSection, { kind: "wordpress" }>)
        : null,
    image: source.image,
    imageAlt: source.imageAlt,
    intro: source.intro,
  };
}

export async function withWordPressBody(page: InteriorPage) {
  if (page.sections.some((section) => section.kind === "wordpress")) {
    return page;
  }

  const enhancements = await getWordPressEnhancements(page);

  if (!enhancements?.body) {
    return page;
  }

  const preservedSections = page.sections.filter((section) =>
    ["form", "cards", "criteria", "standards", "accredited", "audio", "gallery"].includes(section.kind),
  );
  const sections = [
    enhancements.body,
    ...preservedSections,
  ];

  return {
    ...page,
    intro: enhancements.intro || page.intro,
    image: wordPressBodyHasMedia(enhancements.body.html) ? undefined : page.image ?? enhancements.image,
    imageAlt: enhancements.imageAlt ?? page.imageAlt,
    sections,
  };
}

export async function auditWordPressMedia(page: InteriorPage) {
  try {
    const response = await fetch(wordpressPageUrl(page.slug), {
      cache: "force-cache",
    });

    if (!response.ok) {
      return { source: [], unavailable: [`WordPress returned ${response.status}`] };
    }

    return { source: await extractWordPressMedia(await response.text()), unavailable: [] };
  } catch (error) {
    return { source: [], unavailable: [error instanceof Error ? error.message : String(error)] };
  }
}
