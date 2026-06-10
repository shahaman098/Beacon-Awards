import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

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
    icon: "/favicon.ico",
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
    <html lang="en" className={`${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
