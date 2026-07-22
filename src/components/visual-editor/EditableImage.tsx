"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  DEFAULT_IMAGE_SCALE,
  DEFAULT_OBJECT_POSITION,
  formatObjectPosition,
  imageFitPath,
  imagePositionPath,
  imageScalePath,
  parseObjectPosition,
} from "@/lib/cms-homepage";
import {
  DEFAULT_OBJECT_FIT,
  IMAGE_SCALE_STEP,
  clampImageScale,
  formatImageScale,
  isValidImageSrc,
  normalizeImageSrc,
  nudgeObjectPosition,
  parseObjectFit,
  type CmsObjectFit,
} from "@/lib/cms-image-adjust";
import { ImageAdjustControls } from "@/components/cms/ImageAdjustControls";
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
  objectFit?: CmsObjectFit;
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
  objectFit: objectFitProp,
}: EditableImageProps) {
  const { editMode, setField, uploadMedia } = useVisualEditor();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef(objectPosition);
  const scaleRef = useRef(imageScale);
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
  const [objectFit, setObjectFit] = useState<CmsObjectFit>(
    parseObjectFit(objectFitProp),
  );
  const [showUrlPaste, setShowUrlPaste] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");

  const positionPath = imagePositionPath(path);
  const scalePath = imageScalePath(path);
  const fitPath = imageFitPath(path);

  useEffect(() => {
    setLocalSrc(src);
  }, [src]);

  useEffect(() => {
    setPosition(objectPosition);
    positionRef.current = objectPosition;
  }, [objectPosition]);

  useEffect(() => {
    setScale(imageScale);
    scaleRef.current = imageScale;
  }, [imageScale]);

  useEffect(() => {
    setObjectFit(parseObjectFit(objectFitProp));
  }, [objectFitProp]);

  const scaleValue = clampImageScale(Number.parseFloat(scale) || 1);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !adjusting) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY > 0 ? -IMAGE_SCALE_STEP : IMAGE_SCALE_STEP;
      const current = clampImageScale(
        Number.parseFloat(scaleRef.current) || 1,
      );
      const next = formatImageScale(current + delta);
      scaleRef.current = next;
      setScale(next);
      setField(scalePath, next);
    };

    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, [adjusting, scalePath, setField]);

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

  function applyImageUrl(raw: string) {
    if (!isValidImageSrc(raw)) {
      setError("Use an http(s) URL or a site path starting with /.");
      return;
    }
    const url = normalizeImageSrc(raw);
    setError(null);
    setLocalSrc(url);
    setField(path, url);
    setShowUrlPaste(false);
    setUrlDraft("");
  }

  function commitPosition(next: string) {
    positionRef.current = next;
    setPosition(next);
    setField(positionPath, next);
  }

  const imageStyle: CSSProperties = {
    objectPosition: position,
    // Prefer explicit fit from props/overrides; otherwise leave className in control.
    ...(objectFitProp != null || objectFit !== DEFAULT_OBJECT_FIT
      ? { objectFit }
      : {}),
    transform:
      adjusting || scaleValue !== 1 ? `scale(${scaleValue})` : undefined,
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
    >
      <div
        className={
          fill
            ? "absolute inset-0 overflow-hidden"
            : "relative max-w-full overflow-hidden"
        }
        ref={frameRef}
      >
        <div
          className={
            fill ? "absolute inset-0 touch-none" : "relative touch-none"
          }
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
            setField(positionPath, positionRef.current);
          }}
        >
          {image}
        </div>
        {adjusting ? (
          <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-emerald-400/80" />
        ) : null}
      </div>

      <div
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
      >
        <ImageAdjustControls
          adjusting={adjusting}
          busy={busy}
          error={error}
          objectFit={objectFit}
          onApplyUrl={() => applyImageUrl(urlDraft)}
          onDone={() => setAdjusting(false)}
          onNudge={(dx, dy) => {
            commitPosition(nudgeObjectPosition(positionRef.current, dx, dy));
          }}
          onObjectFitChange={(fit) => {
            setObjectFit(fit);
            setField(fitPath, fit);
          }}
          onPickFile={() => inputRef.current?.click()}
          onPreset={(next) => commitPosition(next)}
          onReset={() => {
            positionRef.current = DEFAULT_OBJECT_POSITION;
            scaleRef.current = DEFAULT_IMAGE_SCALE;
            setPosition(DEFAULT_OBJECT_POSITION);
            setScale(DEFAULT_IMAGE_SCALE);
            setObjectFit(DEFAULT_OBJECT_FIT);
            setField(positionPath, DEFAULT_OBJECT_POSITION);
            setField(scalePath, DEFAULT_IMAGE_SCALE);
            setField(fitPath, DEFAULT_OBJECT_FIT);
          }}
          onScaleChange={(nextRaw) => {
            const next = formatImageScale(Number.parseFloat(nextRaw) || 1);
            scaleRef.current = next;
            setScale(next);
            setField(scalePath, next);
          }}
          onToggleAdjust={() => {
            setShowUrlPaste(false);
            setAdjusting(true);
          }}
          onToggleUrlPaste={() => {
            setError(null);
            setShowUrlPaste((current) => !current);
          }}
          onUrlDraftChange={setUrlDraft}
          scaleValue={scaleValue}
          showUrlPaste={showUrlPaste}
          urlDraft={urlDraft}
        />
      </div>

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
