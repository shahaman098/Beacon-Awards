import { awardCategoryNominationDetails } from "@/lib/content";
import { ghlForms } from "@/lib/ghl-forms";
import { AWARDS_2026_FINALISTS_ANNOUNCE_DATE } from "@/lib/awards-2026-cycle";

export type AwardFinalistVideo2026 = {
  title: string;
  src: string;
  type: "video";
};

export type AwardFinalist2026 = {
  slug: string;
  categoryTitle: string;
  mosqueName: string;
  logo: string;
  logoAlt: string;
  summary: string;
  description: string[];
  videos: AwardFinalistVideo2026[];
  /** GHL vote form embed URL — set when Faith provides per-finalist forms. */
  voteEmbedSrc?: string;
  /** True until Faith supplies the real mosque identity. */
  identityHidden?: boolean;
};

const placeholderLogo = "/assets/interior/awards-gala.jpg";

const romanSlots = ["I", "II", "III"] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildPlaceholderFinalists(categoryTitle: string): AwardFinalist2026[] {
  const categorySlug = slugify(categoryTitle);
  const voteEmbed =
    ghlForms.voting.byCategory[categoryTitle] ?? ghlForms.voting.defaultEmbedSrc;

  return [1, 2, 3].map((slot) => ({
    slug: `${categorySlug}-finalist-${slot}`,
    categoryTitle,
    mosqueName: `${categoryTitle} shortlist ${romanSlots[slot - 1]}`,
    logo: placeholderLogo,
    logoAlt: `${categoryTitle} shortlist place ${slot}, identity to be disclosed`,
    summary: `Named on ${AWARDS_2026_FINALISTS_ANNOUNCE_DATE} for the 9th Beacon Mosque Awards.`,
    description: [
      `This shortlist place in ${categoryTitle} will carry the mosque name, crest and story once the 2026 finalists are announced.`,
      "Public voting for the Beacon Mosque Awards opens from the same page after the shortlist is published.",
    ],
    videos: [],
    voteEmbedSrc: voteEmbed,
    identityHidden: true,
  }));
}

export const awardFinalists2026ByCategory: Record<string, AwardFinalist2026[]> =
  Object.fromEntries(
    awardCategoryNominationDetails.map((category) => [
      category.title,
      buildPlaceholderFinalists(category.title),
    ]),
  );

export const awardFinalists2026: AwardFinalist2026[] = Object.values(
  awardFinalists2026ByCategory,
).flat();

export function finalistPageSlug(finalist: AwardFinalist2026) {
  return `awards/beacon-mosque-awards-2026/finalist/${finalist.slug}`;
}

export function finalistPublicHref(finalist: AwardFinalist2026) {
  return `/${finalistPageSlug(finalist)}/`;
}

export function getAwardFinalist2026BySlug(slug: string) {
  return awardFinalists2026.find((item) => item.slug === slug) ?? null;
}

export function getAwardFinalists2026InCategory(categoryTitle: string) {
  return awardFinalists2026ByCategory[categoryTitle] ?? [];
}

export function categoryPageHrefForFinalist(categoryTitle: string) {
  const category = awardCategoryNominationDetails.find(
    (item) => item.title === categoryTitle,
  );
  return category?.href ?? "/awards/beacon-mosque-awards-2026/";
}

export function finalistSlotLabel(slot: number) {
  return romanSlots[slot - 1] ?? String(slot);
}

/** Display name: real mosque once published, otherwise shortlist place only. */
export function finalistDisplayName(
  finalist: AwardFinalist2026,
  published: boolean,
  slot: number,
) {
  if (published && !finalist.identityHidden) {
    return finalist.mosqueName;
  }
  return `Shortlist ${finalistSlotLabel(slot)}`;
}
