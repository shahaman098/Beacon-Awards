# Best Run Mosque review sample — 23 October 2026

Latest shareable category: https://beaconmosque-design-review-2026.amanks.workers.dev/awards/beacon-mosque-awards-2026/design-preview/categories/best-run-mosque/

This version preview was created for the user's request to review one completed category before confirming the direction. It includes Al Manaar, Leeds Grand Mosque and the Muslim Cultural & Welfare Association of Sutton. Each profile has six gallery images, fuller supplied About text and fitted, uncropped header images. The three profiles contain five native videos in total (two, one and two respectively).

The About and media provenance remains recorded in `2026-finalist-content-audit.json` and `leeds-gallery-sources.json`. The attached judges document was read as reference material; its content was not added to the finalist profiles.

Cloudflare Worker version: `b4e49068-5199-46d1-a505-6a0ffc0b89af`. Its version-preview link was withdrawn on 23 October 2026, when preview URLs were turned off for the review worker to take down photos the Nusratul Islam Masjid asked us to remove; the current review site is https://beaconmosque-design-review-2026.amanks.workers.dev. The snapshot has both voting flags set to false and shows demonstration ballots. No version was activated for ordinary review-host traffic, no database migration was run, and this task performed no main-domain deployment or Git push.

The Next.js/TypeScript and OpenNext builds passed. Desktop and mobile browser checks covered the category's three profiles, each with six gallery items, a loaded contained header and no horizontal overflow or broken loaded image. The Leeds community film decoded and reached playback. Screenshot: `best-run-category-review-leeds.png` in this chat's visualization artifacts.

Initial published checks found that media requests returned a whole file instead of a partial response. The shared checkout's review asset handler was updated concurrently while preparing this snapshot. The final version includes `review-assets.mjs` and the generated video-size manifest. All five edge tests passed; separate checks verified bounded, open-ended and suffix ranges, unsatisfiable ranges and stale validators. Real requests for the first 1 KiB of all five category videos now return HTTP 206, the expected Content-Range and exactly 1,024 bytes.

The final published HTTP suite passed against this immutable version: ten categories, thirty expanded profiles, 229 image/poster assets and forty playable video assets, including partial requests for every local video. The published Leeds film was observed at its completed duration with decoded frames and no media error. The category is left open in the browser. Final category screenshot: `best-run-category-review.png`.

## Background-box feedback

The organiser requested removal of background boxes. Shared review styles now remove the filled image backdrops, gallery section fill, contact-panel fill and top border, category/finalist/peer card fills and outlines, and the finalist-card hover shadow. Review and editorial notes also blend into the page. Fitted, uncropped images, native video controls and buttons remain usable.

Published as version preview `0759b868-40f2-4527-b446-a27acb5fd853` at the latest shareable alias above. The Next.js/TypeScript and OpenNext builds, whitespace check and local all-category HTTP suite passed. Local desktop (1280 px) and mobile (390 px) checks confirmed transparent panels/cards, retained contained images and no horizontal overflow. Published browser checks confirmed the transparent profile panels and gallery at 1280 px. Screenshot: `finalist-gallery-no-boxes.png`. No production traffic activation or main-domain deployment was performed.
