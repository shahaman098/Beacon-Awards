import type { CmsEntry } from "@/lib/cms";
import { CmsMediaField } from "@/components/CmsMediaField";
import { CmsLabel, CmsNotice, CmsPanel, cmsFieldClassName } from "@/components/CmsShell";

export function CmsEntryForm({
  action,
  defaultKind = "page",
  entry,
  error,
  submitLabel,
}: {
  action: string;
  defaultKind?: "page" | "post";
  entry?: CmsEntry | null;
  error?: string;
  submitLabel: string;
}) {
  return (
    <CmsPanel
      text="Use draft mode while preparing content. Published pages appear on their public URL immediately after saving. For the homepage, use Edit page on the live site."
      title={entry ? "Edit entry" : "Create entry"}
    >
      <form action={action} className="space-y-6" method="post">
        {entry ? <input name="id" type="hidden" value={entry.id} /> : null}
        {error ? <CmsNotice tone="error">{error}</CmsNotice> : null}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <CmsLabel htmlFor="kind">Type</CmsLabel>
            <select
              className={cmsFieldClassName}
              defaultValue={entry?.kind ?? defaultKind}
              id="kind"
              name="kind"
            >
              <option value="page">Page</option>
              <option value="post">Post</option>
            </select>
          </div>

          <div>
            <CmsLabel htmlFor="status">Status</CmsLabel>
            <select
              className={cmsFieldClassName}
              defaultValue={entry?.status ?? "draft"}
              id="status"
              name="status"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <CmsLabel htmlFor="title">Title</CmsLabel>
            <input
              className={cmsFieldClassName}
              defaultValue={entry?.title ?? ""}
              id="title"
              name="title"
              placeholder="Beacon Mosque article or page title"
              required
              type="text"
            />
          </div>

          <div>
            <CmsLabel htmlFor="slug">Slug</CmsLabel>
            <input
              className={cmsFieldClassName}
              defaultValue={entry?.slug ?? ""}
              id="slug"
              name="slug"
              placeholder="best-community-story"
              required
              type="text"
            />
          </div>
        </div>

        <div>
          <CmsLabel htmlFor="intro">Summary</CmsLabel>
          <textarea
            className={`${cmsFieldClassName} min-h-28`}
            defaultValue={entry?.intro ?? ""}
            id="intro"
            name="intro"
            placeholder="Short introduction used on the public page and in archive cards."
            required
          />
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <CmsMediaField
            defaultValue={entry?.coverImageUrl ?? ""}
            help="Shown on the public page and news cards."
            label="Cover image"
            name="coverImageUrl"
          />
          <div>
            <CmsLabel htmlFor="coverImageAlt">Cover image alt text</CmsLabel>
            <input
              className={cmsFieldClassName}
              defaultValue={entry?.coverImageAlt ?? ""}
              id="coverImageAlt"
              name="coverImageAlt"
              placeholder="Describe the cover image"
              type="text"
            />
          </div>
        </div>

        <div>
          <CmsLabel htmlFor="content">Body</CmsLabel>
          <textarea
            className={`${cmsFieldClassName} min-h-[20rem]`}
            defaultValue={entry?.content ?? ""}
            id="content"
            name="content"
            placeholder="Write the body content here. Separate paragraphs with blank lines."
            required
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] px-6 py-3 text-sm font-semibold text-emerald-950 shadow-[0_18px_40px_rgba(216,169,72,0.28)] transition hover:-translate-y-0.5"
            type="submit"
          >
            {submitLabel}
          </button>
          {entry ? (
            <span className="text-xs uppercase tracking-[0.18em] text-white/44">
              Public path: /{entry.routeSlug}/
            </span>
          ) : (
            <span className="text-xs uppercase tracking-[0.18em] text-white/44">
              Pages publish to /slug/ and posts publish to /news/slug/
            </span>
          )}
        </div>
      </form>
    </CmsPanel>
  );
}
