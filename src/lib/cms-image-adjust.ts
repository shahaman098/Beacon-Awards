import {
  DEFAULT_OBJECT_POSITION,
  formatObjectPosition,
  parseObjectPosition,
} from "@/lib/cms-homepage";

export type CmsObjectFit = "cover" | "contain";

export const DEFAULT_OBJECT_FIT: CmsObjectFit = "cover";
export const MIN_IMAGE_SCALE = 0.5;
export const MAX_IMAGE_SCALE = 3;
export const IMAGE_SCALE_STEP = 0.05;
export const IMAGE_NUDGE_PERCENT = 5;

export const POSITION_PRESETS = [
  { label: "Center", value: "50% 50%" },
  { label: "Top", value: "50% 0%" },
  { label: "Bottom", value: "50% 100%" },
  { label: "Left", value: "0% 50%" },
  { label: "Right", value: "100% 50%" },
] as const;

export function parseObjectFit(value: unknown): CmsObjectFit {
  return value === "contain" ? "contain" : DEFAULT_OBJECT_FIT;
}

export function clampImageScale(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(MAX_IMAGE_SCALE, Math.max(MIN_IMAGE_SCALE, value));
}

export function formatImageScale(value: number) {
  const clamped = clampImageScale(value);
  const rounded = Math.round(clamped * 100) / 100;
  return String(rounded);
}

export function imageScalePercentLabel(scale: number) {
  return `${Math.round(clampImageScale(scale) * 100)}%`;
}

export function nudgeObjectPosition(
  position: string,
  dxPercent: number,
  dyPercent: number,
) {
  const origin = parseObjectPosition(position || DEFAULT_OBJECT_POSITION);
  return formatObjectPosition(origin.x + dxPercent, origin.y + dyPercent);
}

/** Accepts http(s) URLs or site-relative paths like `/assets/...`. */
export function isValidImageSrc(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed.length > 1;
  }
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function normalizeImageSrc(value: string) {
  return value.trim();
}
