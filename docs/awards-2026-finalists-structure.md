# Awards 2026 — finalist & voting structure (for Faith approval)

**Prepared:** 19 October 2026  
**Audience:** Faith Associates (content) · Aman (build)

## Summary

| Item | Approach |
|------|----------|
| Nominations | **Closed** — site copy is **Prepare to vote** |
| Finalist announcement | **23 October 2026** on the main 2026 page (no separate microsite) |
| Category grid | Same page as today (`/awards/beacon-mosque-awards-2026/#award-categories`) — **no gold Nominate overlay** on category cards |
| Per category | Three-column finalist grid (logo, mosque name, short description) on each **category nomination page** |
| Finalist detail | `/awards/beacon-mosque-awards-2026/finalist/{slug}/` — long description, videos, **Vote** (GHL embed) |
| Mosque MBA | Promo block under each finalist grid and on finalist profile pages |

## URLs to review locally

1. **Main 2026 hub** — `/awards/beacon-mosque-awards-2026/`  
   - Hero: Prepare to vote  
   - Categories section (no nominate buttons on images)  
   - Text block: finalists announced **23 October 2026**

2. **Example category** — `/best-run-mosque-2026-nomination/`  
   - **Previous winners** — list only (no nominate CTA)  
   - **Finalists** — 3-column preview (placeholder content until Faith supplies names/logos)

3. **Example finalist profile** — `/awards/beacon-mosque-awards-2026/finalist/best-run-mosque-finalist-1/`  
   - Profile layout, video area, vote placeholder, Mosque MBA promo

## Content Faith needs to supply

For each of **10 categories × 3 finalists**:

- Mosque / institution name  
- Logo (square, min 400×400 PNG or SVG)  
- Short description (~40 words) for the grid  
- Long description (2–4 paragraphs) for the profile page  
- Video file or URL (optional, multiple allowed)  
- GHL public vote form URL (per category or per finalist — confirm with CRM)

Drop content into `src/lib/awards-2026-finalists.ts` (or we can move to CMS once approved).

## Go High Level

- **Vote forms:** paste embed URLs in `src/lib/ghl-forms.ts` → `ghlForms.voting`  
- **Mosque MBA:** paste lead form in `ghlForms.mosqueMba.embedSrc` (mosque.mba automation)  
- See `docs/beacon-mosque-ghl-automation.md` for workflow triggers

## Launch switches

| Variable | Effect |
|----------|--------|
| `NEXT_PUBLIC_AWARDS_2026_FINALISTS_LIVE=true` | Treat finalists as published (links + vote UI) before 23 Oct (staging only) |
| `NEXT_PUBLIC_AWARDS_2026_FINALIST_PREVIEW=false` | Hide 3-column preview before announcement |

## Not in this repo (manual follow-ups)

- Email Faith: React site design examples  
- Email Faith: Kashif videos  
- Faith Associates corporate website change list  
- Deploy to production (user submits)
