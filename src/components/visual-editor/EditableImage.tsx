"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_IMAGE_SCALE,
  DEFAULT_OBJECT_POSITION,
  formatObjectPosition,
  imagePositionPath,
  imageScalePath,
  parseObjectPosition,
} from "@/lib/cms-homepage";
import { useVisualEditor } from "@/components/visual-editor/VisualEditorProvider";

type EditableImageProps = {
  path: string;
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  objectPosition?: string;
  imageScale?: string;
};

export function EditableImage({
  path,
  src,
  alt,
  className = "",
  fill,
  width,
  height,
  objectPosition = DEFAULT_OBJECT_POSITION,
  imageScale = DEFAULT_IMAGE_SCALE,
}: EditableImageProps) {
  const { editMode, setField, uploadMedia } = useVisualEditor();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef(objectPosition);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localSrc, setLocalSrc] = useState(src);
  const [adjusting, setAdjusting] = useState(false);
  const [position, setPosition] = useState(objectPosition);
  const [scale, setScale] = useState(imageScale);

  const positionPath = imagePositionPath(path);
  const scalePath = imageScalePath(path);

  useEffect(() => {
    setLocalSrc(src);
  }, [src]);

  useEffect(() => {
    setPosition(objectPosition);
    positionRef.current = objectPosition;
  }, [objectPosition]);

  useEffect(() => {
    setScale(imageScale);
  }, [imageScale]);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const url = await uploadMedia(file);
      setLocalSrc(url);
      setField(path, url);
    } catch (uploadError: unknown) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  const scaleValue = Number.parseFloat(scale) || 1;
  const imageStyle: React.CSSProperties = {
    objectPosition: position,
    transform: scaleValue === 1 ? undefined : `scale(${scaleValue})`,
    transformOrigin: position,
  };

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={[
        className,
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

  // Public view: plain img with next/image-like fill/className semantics (no wrapper).
  if (!editMode) {
    return image;
  }

  return (
    <div
      className={
        fill
          ? "absolute inset-0 z-20 overflow-hidden"
          : "relative z-20 max-w-full overflow-hidden"
      }
      ref={frameRef}
    >
      <div
        className={fill ? "absolute inset-0 touch-none" : "relative touch-none"}
        onPointerDown={(event) => {
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
          const dx = ((event.clientX - dragRef.current.startX) / rect.width) * 100;
          const dy = ((event.clientY - dragRef.current.startY) / rect.height) * 100;
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
          setField(positionPath, positionRef.current);
        }}
      >
        {image}
      </div>

      {adjusting ? (
        <div className="pointer-events-none absolute inset-x-3 top-3 z-30 rounded-md bg-black/80 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white">
          Drag to reposition · zoom below · Save changes when finished
        </div>
      ) : null}

      <div className="absolute bottom-3 right-3 z-30 flex max-w-[min(100%,22rem)] flex-wrap justify-end gap-2">
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
                  setField(scalePath, next);
                }}
                step={0.05}
                type="range"
                value={scaleValue}
              />
            </label>
            <button
              className="rounded-md bg-black/80 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-black"
              onClick={() => {
                positionRef.current = DEFAULT_OBJECT_POSITION;
                setPosition(DEFAULT_OBJECT_POSITION);
                setScale(DEFAULT_IMAGE_SCALE);
                setField(positionPath, DEFAULT_OBJECT_POSITION);
                setField(scalePath, DEFAULT_IMAGE_SCALE);
              }}
              type="button"
            >
              Reset
            </button>
            <button
              className="rounded-md bg-emerald-700 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-emerald-600"
              onClick={() => setAdjusting(false)}
              type="button"
            >
              Done
            </button>
          </>
        ) : (
          <>
            <button
              className="rounded-md bg-black/80 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-black"
              onClick={() => setAdjusting(true)}
              type="button"
            >
              Adjust
            </button>
            <button
              className="rounded-md bg-black/80 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-black"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
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
