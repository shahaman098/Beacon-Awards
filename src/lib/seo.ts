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
  const image = absoluteUrl(imageSource);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} - ${siteName}`,
      description,
      images: [{ url: image }],
      siteName,
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${siteName}`,
      description,
      images: [image],
    },
  };
}
