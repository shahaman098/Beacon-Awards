import type { Metadata } from "next";
import { SiteCmsRoot } from "@/components/cms/SiteCmsRoot";
import { absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  applicationName: siteName,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    images: [{ url: absoluteUrl("/assets/hero/awards-2025-poster.jpeg") }],
    siteName,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [absoluteUrl("/assets/hero/awards-2025-poster.jpeg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <SiteCmsRoot>{children}</SiteCmsRoot>
      </body>
    </html>
  );
}
