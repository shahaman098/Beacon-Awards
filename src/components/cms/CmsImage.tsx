"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from "react";
import {
  DEFAULT_IMAGE_SCALE,
  DEFAULT_OBJECT_POSITION,
  formatObjectPosition,
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
  type CmsObjectFit,
} from "@/lib/cms-image-adjust";
import { resolveCmsImage } from "@/lib/cms-image-overrides";
import { ImageAdjustControls } from "@/components/cms/ImageAdjustControls";
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
  /** Called after a successful Change image upload or URL paste. */
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
  const scaleRef = useRef(resolved.imageScale);
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
  const [objectFit, setObjectFit] = useState<CmsObjectFit>(resolved.objectFit);
  const [showUrlPaste, setShowUrlPaste] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");

  useEffect(() => {
    setLocalSrc(resolved.src);
  }, [resolved.src]);

  useEffect(() => {
    setPosition(resolved.objectPosition);
    positionRef.current = resolved.objectPosition;
  }, [resolved.objectPosition]);

  useEffect(() => {
    setScale(resolved.imageScale);
    scaleRef.current = resolved.imageScale;
  }, [resolved.imageScale]);

  useEffect(() => {
    setObjectFit(resolved.objectFit);
  }, [resolved.objectFit]);

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
      setOverride(key, { imageScale: next });
    };

    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, [adjusting, key, setOverride]);

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

  function applyImageUrl(raw: string) {
    if (!isValidImageSrc(raw)) {
      setError("Use an http(s) URL or a site path starting with /.");
      return;
    }
    const url = normalizeImageSrc(raw);
    setError(null);
    setLocalSrc(url);
    setOverride(key, { src: url });
    onSrcChange?.(url);
    setShowUrlPaste(false);
    setUrlDraft("");
  }

  function commitPosition(next: string) {
    positionRef.current = next;
    setPosition(next);
    setOverride(key, { objectPosition: next });
  }

  // Keep an inline transform while adjusting so group-hover:scale classes cannot fight pan/zoom.
  // Only force objectFit when non-default so public className (e.g. object-cover) still wins.
  const imageStyle: CSSProperties = {
    objectPosition: position,
    ...(objectFit !== DEFAULT_OBJECT_FIT ? { objectFit } : {}),
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

      <div onClick={stopParentNavigation} onPointerDown={stopParentNavigation}>
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
            setOverride(key, { objectFit: fit });
          }}
          onPickFile={() => inputRef.current?.click()}
          onPreset={(next) => commitPosition(next)}
          onReset={() => {
            positionRef.current = DEFAULT_OBJECT_POSITION;
            scaleRef.current = DEFAULT_IMAGE_SCALE;
            setPosition(DEFAULT_OBJECT_POSITION);
            setScale(DEFAULT_IMAGE_SCALE);
            setObjectFit(DEFAULT_OBJECT_FIT);
            setLocalSrc(src);
            resetOverride(key);
          }}
          onScaleChange={(nextRaw) => {
            const next = formatImageScale(Number.parseFloat(nextRaw) || 1);
            scaleRef.current = next;
            setScale(next);
            setOverride(key, { imageScale: next });
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
