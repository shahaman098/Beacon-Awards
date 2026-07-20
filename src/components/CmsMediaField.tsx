"use client";

import { useRef, useState } from "react";
import { CmsLabel, cmsFieldClassName } from "@/components/CmsShell";

export function CmsMediaField({
  name,
  label,
  defaultValue = "",
  accept = "image/jpeg,image/png,image/webp,image/gif",
  help,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  accept?: string;
  help?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isVideo = value.toLowerCase().endsWith(".mp4");

  return (
    <div>
      <CmsLabel htmlFor={name}>{label}</CmsLabel>
      <input name={name} type="hidden" value={value} />
      <div className="space-y-3">
        <input
          className={cmsFieldClassName}
          id={name}
          onChange={(event) => setValue(event.target.value)}
          placeholder="/assets/... or uploaded URL"
          type="url"
          value={value}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/14 bg-white/8 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-gold-300 hover:text-gold-200 disabled:opacity-50"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            {busy ? "Uploading…" : "Upload file"}
          </button>
          {help ? (
            <span className="text-xs text-white/45">{help}</span>
          ) : null}
        </div>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        {value ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            {isVideo ? (
              <video className="max-h-48 w-full object-cover" controls src={value} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                className="max-h-48 w-full object-cover"
                src={value}
              />
            )}
          </div>
        ) : null}
      </div>
      <input
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          setBusy(true);
          setError(null);
          const body = new FormData();
          body.set("file", file);
          void fetch("/api/cms/media/upload/", {
            method: "POST",
            body,
            credentials: "include",
          })
            .then(async (response) => {
              const payload = (await response.json()) as {
                url?: string;
                error?: string;
              };
              if (!response.ok || !payload.url) {
                throw new Error(payload.error || "Upload failed.");
              }
              setValue(payload.url);
            })
            .catch((uploadError: unknown) => {
              setError(
                uploadError instanceof Error
                  ? uploadError.message
                  : "Upload failed.",
              );
            })
            .finally(() => setBusy(false));
        }}
        ref={inputRef}
        type="file"
      />
    </div>
  );
}
