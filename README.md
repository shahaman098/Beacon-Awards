# Beacon Mosque

Beacon Mosque is a Next.js 16 App Router project with WordPress-backed content and a large set of local QA/reference artifacts.

## Repository Layout

- `src/` - application code for routes, components, and content loaders
- `public/` - static assets served by Next.js, including site verification files
- `wp-content/` - WordPress-origin content and assets kept alongside the project
- `docs/` - exported HTML snapshots and cleanup reports
- `qa/` - local screenshots and browser verification output
- `data/` - local data dumps and large non-source artifacts
- `infra/` - deployment-adjacent files and backups

## Root Policy

Keep the repository root limited to app config, package metadata, and agent instructions.

Do not add screenshots, exports, SQL dumps, or ad hoc reports to the root. Place them in the folders above instead.

## Development

```bash
npm run dev
```

The app entrypoint is under `src/app/`.
