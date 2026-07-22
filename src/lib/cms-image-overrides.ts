import {
  DEFAULT_IMAGE_SCALE,
  DEFAULT_OBJECT_POSITION,
} from "@/lib/cms-homepage";
import {
  DEFAULT_OBJECT_FIT,
  parseObjectFit,
  type CmsObjectFit,
} from "@/lib/cms-image-adjust";

export type CmsImageOverride = {
  src?: string;
  objectPosition: string;
  imageScale: string;
  objectFit?: CmsObjectFit;
};

export type CmsImageOverrides = Record<string, CmsImageOverride>;

export const CMS_IMAGE_OVERRIDES_ID = "image-overrides";

export function emptyImageOverrides(): CmsImageOverrides {
  return {};
}

export function mergeImageOverrides(partial: unknown): CmsImageOverrides {
  if (!partial || typeof partial !== "object") return emptyImageOverrides();
  const next: CmsImageOverrides = {};
  for (const [key, value] of Object.entries(partial as Record<string, unknown>)) {
    if (!key || !value || typeof value !== "object") continue;
    const item = value as Record<string, unknown>;
    const objectFit = parseObjectFit(item.objectFit);
    next[key] = {
      src: typeof item.src === "string" && item.src ? item.src : undefined,
      objectPosition:
        typeof item.objectPosition === "string" && item.objectPosition
          ? item.objectPosition
          : DEFAULT_OBJECT_POSITION,
      imageScale:
        typeof item.imageScale === "string" && item.imageScale
          ? item.imageScale
          : DEFAULT_IMAGE_SCALE,
      ...(objectFit !== DEFAULT_OBJECT_FIT ? { objectFit } : {}),
    };
  }
  return next;
}

export function resolveCmsImage(
  overrides: CmsImageOverrides,
  adjustKey: string,
  fallbackSrc: string,
) {
  const override = overrides[adjustKey];
  return {
    src: override?.src || fallbackSrc,
    objectPosition: override?.objectPosition || DEFAULT_OBJECT_POSITION,
    imageScale: override?.imageScale || DEFAULT_IMAGE_SCALE,
    objectFit: parseObjectFit(override?.objectFit),
  };
}
