import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/InteriorPage";
import { EditableInteriorPage } from "@/components/EditableInteriorPage";
import {
  applySavedPageContent,
  getOptionalCmsUser,
} from "@/lib/cms";
import { getPage, getPageStaticParams } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { withWordPressBody } from "@/lib/wordpress-content";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getPageStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {};
  }

  const editable = await applySavedPageContent(page);
  return pageMetadata(editable);
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const [content, user] = await Promise.all([
    (async () => {
      const withCms = await applySavedPageContent(page);
      return withWordPressBody(withCms);
    })(),
    getOptionalCmsUser(),
  ]);

  return (
    <EditableInteriorPage
      canEdit={Boolean(user)}
      initialEditMode={false}
      key={content.slug}
      page={content}
    >
      <InteriorPage page={content} />
    </EditableInteriorPage>
  );
}
