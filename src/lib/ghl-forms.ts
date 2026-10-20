/**
 * GoHighLevel form URLs for beaconmosque.com.
 *
 * Get embed and link URLs from GHL:
 * Sites → Forms → [form] → Share → Embed code or Direct link
 *
 * Typical embed format:
 * https://api.leadconnectorhq.com/widget/form/{formId}
 */
export const ghlForms = {
  contact: {
    embedSrc:
      "https://api.leadconnectorhq.com/widget/form/REPLACE_WITH_CONTACT_FORM_ID",
    embedHeight: 700,
  },
  nomination: {
    href: "https://api.leadconnectorhq.com/widget/form/REPLACE_WITH_NOMINATION_FORM_ID",
    embedHeight: 900,
  },
  rating: {
    embedSrc:
      "https://api.leadconnectorhq.com/widget/form/REPLACE_WITH_RATING_FORM_ID",
    embedHeight: 800,
  },
  /** mosque.mba — lead capture / programme enquiries (separate GHL sub-account or location). */
  mosqueMba: {
    embedSrc:
      "https://api.leadconnectorhq.com/widget/form/REPLACE_WITH_MOSQUE_MBA_FORM_ID",
    embedHeight: 720,
    siteHref: "https://mosque.mba/",
  },
  /** Public vote widgets — one embed per category (or shared) from GHL Sites → Forms → Share. */
  voting: {
    defaultEmbedSrc:
      "https://api.leadconnectorhq.com/widget/form/REPLACE_WITH_VOTE_FORM_ID",
    embedHeight: 760,
    byCategory: {} as Record<string, string>,
  },
} as const;

export const nominationForm2026Href = ghlForms.nomination.href;
