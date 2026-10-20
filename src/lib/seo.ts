import type { Metadata } from "next";
import type { InteriorPage } from "@/lib/pages";

export const siteUrl = "https://beaconmosque.com";
export const siteName = "Beacon Mosque";
export const siteDescription =
  "Beacon Mosque celebrates mosque excellence through awards, accreditation, standards, resources and community recognition.";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function routePath(slug: string) {
  return slug ? `/${slug}/` : "/";
}

export function pageMetadata(page: InteriorPage): Metadata {
  const path = routePath(page.slug);
  const title = page.metaTitle?.trim() || page.title;
  const description = page.metaDescription?.trim() || page.intro;
  const imageSource =
    page.ogImage?.trim() ||
    page.image ||
    "/assets/hero/awards-2025-poster.jpeg";
  // Query helps WhatsApp / iMessage refetch when share artwork changes.
  const image = absoluteUrl(
    imageSource.includes("?")
      ? imageSource
      : `${imageSource}?v=awards-2026-prepare`,
  );
  const shareTitle = title.includes(siteName) ? title : `${title} - ${siteName}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: shareTitle,
      description,
      images: [
        {
          url: image,
          width: 1024,
          height: 1024,
          alt: page.imageAlt || title,
        },
      ],
      siteName,
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
