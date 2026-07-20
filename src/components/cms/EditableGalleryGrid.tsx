"use client";

import { useRef, useState } from "react";
import { CmsImage } from "@/components/cms/CmsImage";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";
import { EditableText } from "@/components/visual-editor/EditableText";
import { usePageEditor } from "@/components/visual-editor/PageEditorProvider";
import type { GalleryImage } from "@/lib/pages";

export function EditableGalleryGrid({
  images: initialImages,
  isWinnersGalleryPage,
  sectionIndex,
  routeSlug,
}: {
  images: GalleryImage[];
  isWinnersGalleryPage: boolean;
  sectionIndex: number;
  routeSlug: string;
}) {
  const { editMode, uploadMedia, setOverride } = useSiteCms();
  const { setField } = usePageEditor();
  const [images, setImages] = useState(initialImages);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listPath = `sections.${sectionIndex}.images.__list__`;

  function persistList(next: GalleryImage[]) {
    setImages(next);
    setField(listPath, JSON.stringify(next));
    next.forEach((image, index) => {
      setField(`sections.${sectionIndex}.images.${index}.src`, image.src);
      setField(`sections.${sectionIndex}.images.${index}.alt`, image.alt);
      setField(`sections.${sectionIndex}.images.${index}.title`, image.title);
      // Keep image-override keys stable per gallery slot.
      setOverride(`${routeSlug}:gallery:${sectionIndex}:${index}`, {
        src: image.src,
      });
    });
  }

  async function addImage(file: File) {
    setBusy(true);
    setError(null);
    try {
      const url = await uploadMedia(file);
      const label = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      const next: GalleryImage[] = [
        ...images,
        {
          src: url,
          alt: label || `Gallery image ${images.length + 1}`,
          title: label || `Gallery image ${images.length + 1}`,
        },
      ];
      persistList(next);
    } catch (uploadError: unknown) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  function removeImage(index: number) {
    const next = images.filter((_, i) => i !== index);
    persistList(next);
  }

  return (
    <>
      <div
        className={[
          "grid gap-5",
          isWinnersGalleryPage
            ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-4",
        ].join(" ")}
      >
        {images.map((image, index) => (
          <figure
            className={[
              "group overflow-hidden border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.08)]",
              isWinnersGalleryPage ? "bg-[#111]" : "relative bg-black",
            ].join(" ")}
            key={`${sectionIndex}-${index}-${image.src}`}
          >
            <div
              className={[
                "relative overflow-hidden",
                isWinnersGalleryPage ? "aspect-[4/5] bg-[#0b0b0b]" : "aspect-square",
              ].join(" ")}
            >
              <CmsImage
                adjustKey={`${routeSlug}:gallery:${sectionIndex}:${index}`}
                alt={image.alt}
                className={[
                  "transition duration-500",
                  isWinnersGalleryPage
                    ? "object-cover object-top group-hover:scale-[1.03]"
                    : "object-cover group-hover:scale-105",
                ].join(" ")}
                fill
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                src={image.src}
              />
              {!isWinnersGalleryPage ? (
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(7,21,36,0.82))]" />
              ) : null}
              {editMode ? (
                <button
                  className="absolute left-3 top-3 z-30 rounded-md bg-black/80 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white hover:bg-red-700"
                  onClick={() => removeImage(index)}
                  type="button"
                >
                  Remove
                </button>
              ) : null}
            </div>
            {isWinnersGalleryPage ? (
              <figcaption className="border-t border-black/10 bg-white px-4 py-4">
                <EditableText
                  as="strong"
                  className="block text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-black"
                  path={`sections.${sectionIndex}.images.${index}.title`}
                  value={image.title}
                />
              </figcaption>
            ) : (
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <EditableText
                  as="strong"
                  className="block text-lg font-semibold text-white"
                  path={`sections.${sectionIndex}.images.${index}.title`}
                  value={image.title}
                />
              </figcaption>
            )}
          </figure>
        ))}

        {editMode ? (
          <button
            className="flex min-h-[16rem] flex-col items-center justify-center gap-3 border border-dashed border-[#2271b1] bg-[#2271b1]/8 p-6 text-center transition hover:bg-[#2271b1]/14"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2271b1]">
              {busy ? "Uploading…" : "Add image"}
            </span>
            <span className="max-w-[14rem] text-xs leading-5 text-black/55">
              Upload a new winner poster or gallery photo. Then click Save
              changes.
            </span>
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      ) : null}

      <input
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          void addImage(file);
        }}
        ref={inputRef}
        type="file"
      />
    </>
  );
}
