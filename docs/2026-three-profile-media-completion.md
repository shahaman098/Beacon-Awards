# Didsbury, Mostafa and Imad — media completion

Checked 23 October 2026 against the submission folders linked by the current judging spreadsheet, including each available social-media subfolder and the social links in the supplied evidence.

| Profile | Selected gallery | Native films | Source |
| --- | --- | --- | --- |
| Didsbury Youth | Six uncropped activity stills | Three complete films | The three specific official reels linked in the supplied Didsbury evidence: football with Alfurqan Youth, September Qiyam Night, and the May post-Ramadan/pre-exam Qiyam Night. |
| Shaykh Dr Mostafa al-Shaybani | Five teaching stills and the supplied speaker portrait | Five complete teaching films | The nominee's Drive Instagram folder and voting/logo folder. The original posts for the additional clips explicitly co-author with `shaykhshaybani`; the earlier December clip also names him. |
| Imam Imad Ud-Din | One original teaching photograph, four official activity photographs and one community-film still | One complete community film | Masjid Ghousia's official account linked by the supplied evidence PDF. The new photographs show Thorpe Park, Twinlakes and the Summer Vibes paintball/teamwork session. The film is Jaloos 2026, jointly published by Masjid Ghousia and Faizan-e-Madina Peterborough. |

The new Didsbury and Imad originals are from official social accounts reached through the supplied Drive evidence. They are not represented as extra files physically stored in Drive. The linked Drive folders themselves still contain the limited selections previously reported. Mostafa's additional originals are present in his Drive submission.

The Imad film is captioned as jointly published organisational community context. It does not identify an unnamed participant as Imam Imad or claim he is the speaker. Two Facebook clips advertising other named speakers were excluded. The public Scouts and feeding-neighbours reels exposed descriptions but did not provide reliable anonymous playback, so they are not presented as playable films here. Raw testimonials, private messages and account-analytics screenshots from the evidence PDF were excluded.

The Imad page also includes a new source-backed section on the January–August 2026 youth programme, education, college chaplaincy and rough-sleeper care packages. Its existing supplied About summary is retained.

All seven newly added films were fully decoded without audio/video errors. Every published film has H.264 video and AAC audio, native controls, inline playback, no autoplay and `preload="none"`. The social films retain their complete content and audio; separate delivery tracks were combined, with browser-friendly encoding where required. Every film is below the 25 MiB asset limit. Gallery stills retain the complete frame; original photographs are copied without editing.

Canonical post/Drive sources, evidence-document references, frame times, dimensions and output checksums are recorded in [the source manifest](2026-three-profile-media-sources.json). Signed CDN delivery URLs and raw source documents are not published.

The update is built in an isolated review snapshot. A separate, concurrent submission-archive rollout remains intact in the working checkout and is excluded from this snapshot. Main-domain routes and ordinary review-host traffic are not changed by the version-preview upload.

## Published review

Version: `effc0458-bd21-4d7d-9610-abf27b03a616`. Its version-preview link was withdrawn on 23 October 2026, when preview URLs were turned off for the review worker to take down photos the Nusratul Islam Masjid asked us to remove; the current review site is https://beaconmosque-design-review-2026.amanks.workers.dev.

- [Didsbury Youth](https://beaconmosque-design-review-2026.amanks.workers.dev/awards/beacon-mosque-awards-2026/design-preview/categories/best-youth-service/didsbury-youth/)
- [Shaykh Dr Mostafa al-Shaybani](https://beaconmosque-design-review-2026.amanks.workers.dev/awards/beacon-mosque-awards-2026/design-preview/categories/most-impactful-imam/mostafa-al-shaybani/)
- [Imam Imad Ad Din](https://beaconmosque-design-review-2026.amanks.workers.dev/awards/beacon-mosque-awards-2026/design-preview/categories/most-impactful-imam/imam-imad-ad-din/)

Next.js/TypeScript and OpenNext production builds passed. The published HTTP suite passed for ten categories, thirty profiles, 242 image/poster assets and forty-eight referenced native films. All fifteen new image outputs matched their source-manifest SHA-256 checksums. Each of the seven new films returned exact prefix and suffix byte ranges matching the local file. Published page checks confirmed six selected gallery items on each profile, nine native films across these three profiles, contained covers and no horizontal overflow at 1280px and 390px. Didsbury and Mostafa's social links now use the accounts explicitly supplied by their nomination documents.

Only a version preview was uploaded. No ordinary review-host or main-domain traffic was activated, no database was bound or migrated, and no Git push was performed. The existing local server at port 3000 belongs to the current workspace and continues running.

Published browser playback and seeking checks are saved in `.data/finalist-audit/three-profile-published-browser-checks.json`. Imad’s film was observed playing with no media error, rather than being accepted from its link alone. Screenshot: `didsbury-completed-activity-gallery.png` in this chat’s visualization artifacts. Temporary responsive emulation was reset after verification.
