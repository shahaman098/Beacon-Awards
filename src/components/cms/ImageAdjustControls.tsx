"use client";

import {
  IMAGE_NUDGE_PERCENT,
  IMAGE_SCALE_STEP,
  MAX_IMAGE_SCALE,
  MIN_IMAGE_SCALE,
  POSITION_PRESETS,
  imageScalePercentLabel,
  type CmsObjectFit,
} from "@/lib/cms-image-adjust";

const btn =
  "min-h-10 min-w-10 rounded-md bg-black/80 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white hover:bg-black disabled:opacity-60";
const btnActive = "bg-emerald-700 hover:bg-emerald-600";
const chip =
  "min-h-9 min-w-9 rounded-md bg-black/70 px-2.5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white hover:bg-black";

type ImageAdjustControlsProps = {
  adjusting: boolean;
  busy: boolean;
  error: string | null;
  scaleValue: number;
  objectFit: CmsObjectFit;
  showUrlPaste: boolean;
  urlDraft: string;
  onToggleAdjust: () => void;
  onDone: () => void;
  onReset: () => void;
  onPickFile: () => void;
  onScaleChange: (next: string) => void;
  onObjectFitChange: (fit: CmsObjectFit) => void;
  onPreset: (position: string) => void;
  onNudge: (dx: number, dy: number) => void;
  onToggleUrlPaste: () => void;
  onUrlDraftChange: (value: string) => void;
  onApplyUrl: () => void;
};

export function ImageAdjustControls({
  adjusting,
  busy,
  error,
  scaleValue,
  objectFit,
  showUrlPaste,
  urlDraft,
  onToggleAdjust,
  onDone,
  onReset,
  onPickFile,
  onScaleChange,
  onObjectFitChange,
  onPreset,
  onNudge,
  onToggleUrlPaste,
  onUrlDraftChange,
  onApplyUrl,
}: ImageAdjustControlsProps) {
  return (
    <>
      {adjusting ? (
        <div className="pointer-events-none absolute inset-x-2 top-2 z-30 max-w-md rounded-md bg-black/80 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white sm:inset-x-3 sm:top-3">
          Drag · scroll zoom · Save when finished
        </div>
      ) : null}

      <div className="absolute inset-x-2 bottom-2 z-30 flex max-w-full flex-col items-stretch gap-1.5 sm:inset-x-3 sm:bottom-3 sm:items-end">
        {adjusting ? (
          <div className="flex w-full max-w-lg flex-col gap-1.5 rounded-lg bg-black/85 p-2 shadow-lg sm:w-auto">
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex min-h-10 flex-1 items-center gap-2 px-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white sm:flex-none">
                Zoom
                <input
                  className="h-8 w-[7.5rem] accent-emerald-400 sm:w-32"
                  max={MAX_IMAGE_SCALE}
                  min={MIN_IMAGE_SCALE}
                  onChange={(event) => onScaleChange(event.target.value)}
                  step={IMAGE_SCALE_STEP}
                  type="range"
                  value={scaleValue}
                />
                <span className="min-w-[2.75rem] tabular-nums text-emerald-300">
                  {imageScalePercentLabel(scaleValue)}
                </span>
              </label>
              <div className="flex flex-wrap gap-1">
                <button
                  className={`${chip} ${objectFit === "cover" ? btnActive : ""}`}
                  onClick={() => onObjectFitChange("cover")}
                  type="button"
                >
                  Cover
                </button>
                <button
                  className={`${chip} ${objectFit === "contain" ? btnActive : ""}`}
                  onClick={() => onObjectFitChange("contain")}
                  type="button"
                >
                  Contain
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="px-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/70">
                Position
              </span>
              {POSITION_PRESETS.map((preset) => (
                <button
                  className={chip}
                  key={preset.label}
                  onClick={() => onPreset(preset.value)}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="px-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/70">
                Nudge
              </span>
              <button
                aria-label={`Nudge left ${IMAGE_NUDGE_PERCENT}%`}
                className={chip}
                onClick={() => onNudge(-IMAGE_NUDGE_PERCENT, 0)}
                type="button"
              >
                ←
              </button>
              <button
                aria-label={`Nudge up ${IMAGE_NUDGE_PERCENT}%`}
                className={chip}
                onClick={() => onNudge(0, -IMAGE_NUDGE_PERCENT)}
                type="button"
              >
                ↑
              </button>
              <button
                aria-label={`Nudge down ${IMAGE_NUDGE_PERCENT}%`}
                className={chip}
                onClick={() => onNudge(0, IMAGE_NUDGE_PERCENT)}
                type="button"
              >
                ↓
              </button>
              <button
                aria-label={`Nudge right ${IMAGE_NUDGE_PERCENT}%`}
                className={chip}
                onClick={() => onNudge(IMAGE_NUDGE_PERCENT, 0)}
                type="button"
              >
                →
              </button>
              <span className="px-1 text-[0.6rem] text-white/50">
                ±{IMAGE_NUDGE_PERCENT}%
              </span>
            </div>

            <div className="flex flex-wrap justify-end gap-1.5">
              <button className={btn} onClick={onReset} type="button">
                Reset
              </button>
              <button
                className={`${btn} ${btnActive}`}
                onClick={onDone}
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-lg flex-col items-stretch gap-1.5 sm:w-auto sm:items-end">
            {showUrlPaste ? (
              <div className="flex w-full flex-col gap-1.5 rounded-lg bg-black/85 p-2 sm:flex-row sm:items-center">
                <input
                  className="min-h-10 flex-1 rounded-md border border-white/20 bg-black/40 px-3 py-2 text-[0.75rem] text-white outline-none placeholder:text-white/40 focus:border-emerald-400"
                  onChange={(event) => onUrlDraftChange(event.target.value)}
                  placeholder="https://… or /assets/…"
                  type="url"
                  value={urlDraft}
                />
                <div className="flex flex-wrap gap-1.5">
                  <button className={btn} onClick={onApplyUrl} type="button">
                    Use URL
                  </button>
                  <button
                    className={btn}
                    onClick={onToggleUrlPaste}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap justify-end gap-1.5">
              <button className={btn} onClick={onToggleAdjust} type="button">
                Adjust
              </button>
              <button
                className={btn}
                disabled={busy}
                onClick={onPickFile}
                type="button"
              >
                {busy ? "Uploading…" : "Change image"}
              </button>
              <button className={btn} onClick={onToggleUrlPaste} type="button">
                Paste URL
              </button>
            </div>
          </div>
        )}

        {error ? (
          <span className="rounded bg-black/85 px-2 py-1 text-[0.65rem] text-red-200">
            {error}
          </span>
        ) : null}
      </div>
    </>
  );
}
