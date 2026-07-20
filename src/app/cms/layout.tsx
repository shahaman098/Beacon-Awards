import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "CMS",
    template: `%s - CMS`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
