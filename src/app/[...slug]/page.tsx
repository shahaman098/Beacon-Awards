import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/InteriorPage";
import { getPage, getPageStaticParams } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { withWordPressBody } from "@/lib/wordpress-content";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getPageStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {};
  }

  return pageMetadata(page);
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return <InteriorPage page={await withWordPressBody(page)} />;
}

export const dynamicParams = false;
