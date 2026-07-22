"use client";

import Link from "@/components/AppLink";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";

export function SiteCmsAdminBar() {
  const {
    canEdit,
    editMode,
    dirty,
    saving,
    status,
    email,
    setEditMode,
    save,
    publish,
    previewHref,
  } = useSiteCms();

  if (!canEdit || !email) return null;

  return (
    <div className="sticky top-0 z-[80] border-b border-black/10 bg-[#1d2327] text-white">
      <div className="mx-auto flex max-w-[1720px] flex-wrap items-center gap-3 px-4 py-2.5 text-xs md:px-8">
        <span className="font-semibold uppercase tracking-[0.18em] text-[#d8c0a6]">
          Live editor
        </span>
        <span className="text-white/55">{email}</span>
        {editMode ? (
          <span className="rounded-full bg-[#2271b1] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
            Editing this page
          </span>
        ) : null}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Link
            className="rounded-md border border-white/15 px-3 py-1.5 font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:border-white/35 hover:text-white"
            href="/cms/"
          >
            Dashboard
          </Link>
          {previewHref ? (
            <Link
              className="rounded-md border border-white/15 px-3 py-1.5 font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:border-white/35 hover:text-white"
              href={previewHref}
              target="_blank"
            >
              View preview
            </Link>
          ) : null}
          <button
            className={[
              "rounded-md px-3 py-1.5 font-semibold uppercase tracking-[0.14em] transition",
              editMode
                ? "border border-white/20 text-white/85 hover:border-white/40"
                : "bg-[#d8c0a6] text-black",
            ].join(" ")}
            onClick={() => setEditMode(!editMode)}
            type="button"
          >
            {editMode ? "Preview site" : "Edit live page"}
          </button>
          {editMode ? (
            <>
              <button
                className="rounded-md border border-white/20 px-3 py-1.5 font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!dirty || saving}
                onClick={() => {
                  void save();
                }}
                type="button"
              >
                {saving ? "Saving…" : "Save draft"}
              </button>
              <button
                className="rounded-md bg-emerald-600 px-3 py-1.5 font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={saving}
                onClick={() => {
                  void publish();
                }}
                type="button"
              >
                {saving ? "Publishing…" : "Publish"}
              </button>
            </>
          ) : null}
          {status ? <span className="text-white/60">{status}</span> : null}
        </div>
      </div>
      {editMode ? (
        <div className="border-t border-white/10 bg-[#2271b1] px-4 py-2 text-[0.7rem] font-medium tracking-[0.04em] text-white md:px-8">
          Save draft keeps changes private. Publish copies the draft to the
          public page. Use View preview with <code>?preview=1</code> while signed
          in.
        </div>
      ) : null}
    </div>
  );
}
