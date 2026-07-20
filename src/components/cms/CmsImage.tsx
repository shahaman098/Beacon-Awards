"use client";

import { useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from "react";
import {
  DEFAULT_IMAGE_SCALE,
  DEFAULT_OBJECT_POSITION,
  formatObjectPosition,
  parseObjectPosition,
} from "@/lib/cms-homepage";
import { resolveCmsImage } from "@/lib/cms-image-overrides";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";

type CmsImageProps = {
  src: string;
  alt: string;
  adjustKey?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy" | string;
  quality?: number;
  unoptimized?: boolean;
  /** When false, never show Change/Adjust controls (logos, icons). */
  editable?: boolean;
  /** Called after a successful Change image upload. */
  onSrcChange?: (url: string) => void;
};

/**
 * Public rendering mirrors next/image: fill uses absolute inset on the <img>
 * itself (no wrapper); non-fill keeps caller className/width/height only.
 * Edit-mode wrappers/controls must not change public layout.
 */
export function CmsImage({
  src,
  alt,
  adjustKey,
  className = "",
  fill,
  width,
  height,
  editable = true,
  onSrcChange,
}: CmsImageProps) {
  const { editMode, overrides, setOverride, resetOverride, uploadMedia } =
    useSiteCms();
  const key = adjustKey || src;
  const resolved = resolveCmsImage(overrides, key, src);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef(resolved.objectPosition);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localSrc, setLocalSrc] = useState(resolved.src);
  const [adjusting, setAdjusting] = useState(false);
  const [position, setPosition] = useState(resolved.objectPosition);
  const [scale, setScale] = useState(resolved.imageScale);

  useEffect(() => {
    setLocalSrc(resolved.src);
  }, [resolved.src]);

  useEffect(() => {
    setPosition(resolved.objectPosition);
    positionRef.current = resolved.objectPosition;
  }, [resolved.objectPosition]);

  useEffect(() => {
    setScale(resolved.imageScale);
  }, [resolved.imageScale]);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const url = await uploadMedia(file);
      setLocalSrc(url);
      setOverride(key, { src: url });
      onSrcChange?.(url);
    } catch (uploadError: unknown) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  const scaleValue = Number.parseFloat(scale) || 1;
  // Keep an inline transform while adjusting so group-hover:scale classes cannot fight pan/zoom.
  const imageStyle: CSSProperties = {
    objectPosition: position,
    transform:
      adjusting || scaleValue !== 1 ? `scale(${scaleValue})` : undefined,
    transformOrigin: position,
  };

  function stopParentNavigation(event: SyntheticEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={[
        className,
        // next/image fill semantics — applied on the img, not an extra public wrapper
        fill ? "absolute inset-0 h-full w-full" : "",
        adjusting ? "cursor-grab active:cursor-grabbing select-none" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      draggable={false}
      height={fill ? undefined : height}
      src={localSrc}
      style={imageStyle}
      width={fill ? undefined : width}
    />
  );

  if (!editMode || !editable) {
    return image;
  }

  return (
    <div
      className={
        fill
          ? "absolute inset-0 z-20 overflow-hidden"
          : // Do not force w-full/h-auto — shrink-wrap to the image box.
            "relative z-20 max-w-full overflow-hidden"
      }
      onClick={(event) => {
        // Buttons/anchors wrapping CmsImage must not navigate while editing.
        event.preventDefault();
        event.stopPropagation();
      }}
      ref={frameRef}
    >
      <div
        className={fill ? "absolute inset-0 touch-none" : "relative touch-none"}
        onPointerDown={(event) => {
          event.stopPropagation();
          if (!adjusting) return;
          event.preventDefault();
          const origin = parseObjectPosition(positionRef.current);
          dragRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            originX: origin.x,
            originY: origin.y,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!adjusting || !dragRef.current || !frameRef.current) return;
          const rect = frameRef.current.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return;
          const dx =
            ((event.clientX - dragRef.current.startX) / rect.width) * 100;
          const dy =
            ((event.clientY - dragRef.current.startY) / rect.height) * 100;
          const next = formatObjectPosition(
            dragRef.current.originX - dx,
            dragRef.current.originY - dy,
          );
          positionRef.current = next;
          setPosition(next);
        }}
        onPointerUp={() => {
          if (!adjusting || !dragRef.current) return;
          dragRef.current = null;
          setOverride(key, { objectPosition: positionRef.current });
        }}
      >
        {image}
      </div>

      {adjusting ? (
        <div className="pointer-events-none absolute inset-x-3 top-3 z-30 rounded-md bg-black/80 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white">
          Drag to reposition · zoom below · Save changes when finished
        </div>
      ) : null}

      <div
        className="absolute bottom-3 right-3 z-30 flex max-w-[min(100%,22rem)] flex-wrap justify-end gap-2"
        onClick={stopParentNavigation}
      >
        {adjusting ? (
          <>
            <label className="flex items-center gap-2 rounded-md bg-black/80 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white">
              Zoom
              <input
                className="w-24 accent-emerald-400"
                max={2}
                min={1}
                onChange={(event) => {
                  const next = event.target.value;
                  setScale(next);
                  setOverride(key, { imageScale: next });
                }}
                step={0.05}
                type="range"
                value={scaleValue}
              />
            </label>
            <button
              className="rounded-md bg-black/80 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-black"
              onClick={(event) => {
                stopParentNavigation(event);
                positionRef.current = DEFAULT_OBJECT_POSITION;
                setPosition(DEFAULT_OBJECT_POSITION);
                setScale(DEFAULT_IMAGE_SCALE);
                setLocalSrc(src);
                resetOverride(key);
              }}
              type="button"
            >
              Reset
            </button>
            <button
              className="rounded-md bg-emerald-700 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-emerald-600"
              onClick={(event) => {
                stopParentNavigation(event);
                setAdjusting(false);
              }}
              type="button"
            >
              Done
            </button>
          </>
        ) : (
          <>
            <button
              className="rounded-md bg-black/80 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-black"
              onClick={(event) => {
                stopParentNavigation(event);
                setAdjusting(true);
              }}
              type="button"
            >
              Adjust
            </button>
            <button
              className="rounded-md bg-black/80 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-black"
              disabled={busy}
              onClick={(event) => {
                stopParentNavigation(event);
                inputRef.current?.click();
              }}
              type="button"
            >
              {busy ? "Uploading…" : "Change image"}
            </button>
          </>
        )}
      </div>

      {error ? (
        <span className="absolute bottom-14 left-3 right-3 z-30 rounded bg-black/85 px-2 py-1 text-[0.65rem] text-red-200">
          {error}
        </span>
      ) : null}

      <input
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          void handleFile(file);
        }}
        ref={inputRef}
        type="file"
      />
    </div>
  );
}
