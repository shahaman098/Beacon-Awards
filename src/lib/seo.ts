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
  const image = page.image ? absoluteUrl(page.image) : absoluteUrl("/assets/hero/awards-2025-poster.jpeg");

  return {
    title: page.title,
    description: page.intro,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${page.title} - ${siteName}`,
      description: page.intro,
      images: [{ url: image }],
      siteName,
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} - ${siteName}`,
      description: page.intro,
      images: [image],
    },
  };
}
