# Beacon Mosque

Public site for [beaconmosque.com](https://beaconmosque.com) — the **British Beacon Mosque Awards** programme (awards, winners archive, standards/accreditation, training, resources, and news).

This is a **Next.js 16 App Router** rebuild of the former WordPress (Avada) site, deployed to **Cloudflare Workers** via OpenNext. Flagship pages are curated React; archive URLs still resolve via WordPress HTML fallbacks; editors can change copy and images through a Cloudflare D1/R2 CMS.

The npm package name is still `beacon-awards-next`. The Cloudflare Worker is `beaconmosque`.

---

## What runs where

| Layer | Technology | Role |
|--------|------------|------|
| App | Next.js 16 + React 19 | Routes, UI, CMS admin |
| Hosting | Cloudflare Workers (OpenNext) | Production + preview |
| CMS data | D1 (`CMS_DB` → `beaconmosque-cms`) | Sessions, entries, homepage/page/image JSON |
| CMS media | R2 (`CMS_MEDIA` → `beaconmosque-cms-media`) | Uploaded images/video |
| Legacy content | Live fetch from `beaconmosque.com` + `public/wp-content/` | Archive pages and historical media |

---

## Content model (three layers)

Pages are assembled from these sources, in priority order:

```text
1. Curated TypeScript   src/lib/content.ts, pages.ts, legacy-routes.ts
2. CMS overrides        D1 cms_homepage / cms_entries
3. WordPress fallback   sanitized HTML from the live WP site (when needed)
```

### Homepage (`/`)

1. Defaults from `src/lib/content.ts` (`defaultHomepageContent`)
2. Merged with D1 row `cms_homepage.id = "default"`
3. Rendered by `EditableHome` (live-editable when signed in)

### Interior routes (`/[...slug]/`)

`getPage()` in `src/lib/pages.ts` resolves:

1. Exact match in the local `pages` map (curated interiors + expanded legacy award URLs)
2. Else a WordPress sitemap slug → sanitized WP HTML fallback page
3. Else a published CMS entry by `route_slug`
4. Else 404

Saved CMS field edits for a route live in `cms_homepage` with id `page:{routeSlug}` and are applied on top of the resolved page. Some curated routes also optionally inject a WordPress body section (skipped for a denylist of flagship pages).

### News (`/category/news/`)

Static community story cards, with **published CMS posts** prepended. CMS posts publish at `/news/{slug}/`.

---

## Routing map

| Path | Purpose |
|------|---------|
| `/` | Awards homepage |
| `/awards/`, `/winners/`, `/standards/`, `/training/`, `/resources/`, `/contact-us/` | Flagship curated pages |
| `/[...slug]/` | Catch-all interiors, WP archives, CMS pages/posts |
| `/category/news/` | News hub |
| `/news/{slug}/` | CMS posts |
| `/form-submitted/` | Form thank-you |
| `/cms/login/`, `/cms/`, `/cms/new/`, `/cms/[id]/`, `/cms/setup/` | Admin UI |
| `/api/cms/*` | CMS APIs (auth, save, upload, entries) |
| `/cms-media/[...path]/` | Serves R2 uploads |

Trailing slashes are required (`trailingSlash: true`). Homepage and catch-all routes are `force-dynamic` so CMS/session data stay current.

---

## CMS

### Who can log in

Single fixed admin (not public signup). Email and initial password are constants in `src/lib/cms-credentials.ts`. On login/setup, `ensureCmsAdminUser()` syncs the password hash into D1.

- Login: `/cms/login/` → `POST /api/cms/login/`
- Session cookie: `bm_cms_session` (httpOnly, 14 days; `secure` in production)
- Logout: `POST /api/cms/logout/`

Passwords are stored with PBKDF2-SHA256; session tokens are stored as SHA-256 hashes.

### Live visual editor (site-wide)

After sign-in, every public page gets a **Live editor** bar (`SiteCmsAdminBar` via `SiteCmsRoot` / `SiteCmsProvider` in the root layout).

1. Turn on **Edit live page**
2. Click blue-outlined text (`EditableText`) to change copy
3. On images (`CmsImage` / `EditableImage`): **Change image** or **Adjust** (position / scale)
4. **Save changes**:
   - Dirty image overrides → `POST /api/cms/image-overrides/` → D1 id `image-overrides`
   - Homepage content → `POST /api/cms/homepage/` → D1 id `default`
   - Interior page fields → `POST /api/cms/pages/` → D1 id `page:{routeSlug}`

### Pages & posts (dashboard)

Create/edit at `/cms/new/` and `/cms/[id]/` (`CmsEntryForm`). Stored in `cms_entries`. Posts use `route_slug = news/{slug}`. Cover images upload through the media API.

### Media uploads

`POST /api/cms/media/upload/` → R2 (production) or `public/cms-uploads/` (local when R2 is missing). Public URLs: `/cms-media/...` or `/cms-uploads/...`. Catalog rows go in `cms_media`. Limits: images ≤ 8MB, MP4 ≤ 40MB.

### D1 tables

| Migration | Tables / changes |
|-----------|------------------|
| `infra/d1/001_cms.sql` | `cms_users`, `cms_sessions`, `cms_entries` |
| `infra/d1/002_cms_media_homepage.sql` | entry cover columns, `cms_media`, `cms_homepage` |

`cms_homepage` is a generic JSON store:

| Row id | Payload |
|--------|---------|
| `default` | Full homepage content JSON |
| `image-overrides` | Map of image adjust keys → src / position / scale |
| `page:{slug}` | Flat dotted-path field map for that route |

---

## Key source layout

```text
src/
  app/                  Routes (home, catch-all, CMS, APIs, news)
  components/           UI + CMS + visual-editor
  lib/
    content.ts          Homepage/nav/awards static model
    pages.ts            InteriorPage types + curated page map + getPage()
    legacy-routes.ts    Historical award/shortlist URL expansion
    wordpress-*.ts      Live WP fetch, sanitize, optional body injection
    cms*.ts             Auth, entries, homepage/pages/images/media
infra/d1/               SQL migrations for D1
public/                 Static assets (incl. mirrored wp-content uploads)
wp-content/             WordPress-origin reference assets kept alongside the repo
wrangler.jsonc          Worker name, routes, D1 + R2 bindings
open-next.config.ts     Cloudflare OpenNext adapter
```

### Important components

| Component | Role |
|-----------|------|
| `HomeSections` / `EditableHome` | Homepage sections + live edit shell |
| `InteriorPage` / `EditableInteriorPage` | Section renderer + page edit shell |
| `SiteCmsRoot` / `SiteCmsProvider` / `SiteCmsAdminBar` | Session, image overrides, live editor bar |
| `VisualEditorProvider` / `PageEditorProvider` | Register save handlers for home vs interior |
| `EditableText` / `EditableImage` / `CmsImage` | Inline edit targets |
| `CmsShell` / `CmsEntryForm` | Admin dashboard chrome and entry forms |

---

## Local development

```bash
npm install
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

For full CMS behaviour locally, apply D1 migrations (and create R2 once for production-like media):

```bash
npx wrangler d1 execute beaconmosque-cms --local --file=infra/d1/001_cms.sql
npx wrangler d1 execute beaconmosque-cms --local --file=infra/d1/002_cms_media_homepage.sql

# Production / remote (once per environment)
npx wrangler d1 execute beaconmosque-cms --remote --file=infra/d1/001_cms.sql
npx wrangler d1 execute beaconmosque-cms --remote --file=infra/d1/002_cms_media_homepage.sql
npx wrangler r2 bucket create beaconmosque-cms-media
```

Without the R2 binding, uploads fall back to `public/cms-uploads/`. Production should always use `CMS_MEDIA`. Prefer HTTPS or Cloudflare preview for admin sessions (`secure` cookies).

---

## Deploy (Cloudflare)

```bash
npm run preview   # OpenNext build + local Workers preview
npm run deploy    # OpenNext build + deploy Worker
npm run cf-typegen
```

Bindings in `wrangler.jsonc`:

| Binding | Resource |
|---------|----------|
| `ASSETS` | `.open-next/assets` |
| `CMS_DB` | D1 `beaconmosque-cms` |
| `CMS_MEDIA` | R2 `beaconmosque-cms-media` |

Routes: `beaconmosque.com/*`, `www.beaconmosque.com/*`.

---

## End-to-end data flow

```text
Visitor hits /
  → defaultHomepageContent + D1 homepage JSON
  → EditableHome

Visitor hits /some-page/
  → pages map | WP fallback | CMS entry
  → apply page:{slug} field overrides
  → optional WP body section
  → EditableInteriorPage

Admin signed in
  → SiteCmsRoot loads image-overrides
  → Live editor edits text/images
  → Save → D1 (homepage / page fields / image overrides)
  → Uploads → R2 (or local cms-uploads)
```

---

## Repository hygiene

Keep the repo root limited to app config, package metadata, and agent instructions (`AGENTS.md`, `CLAUDE.md`).

Do not drop screenshots, HTML exports, SQL dumps, or ad hoc reports in the root. Prefer:

- `public/` — assets the app serves
- `infra/` — migrations and deploy-adjacent config
- `wp-content/` — WordPress-origin reference material

---

## Agent notes

This is **Next.js 16** with breaking changes vs older mental models. Before writing app code, check guides under `node_modules/next/dist/docs/` (see `AGENTS.md`).
