import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/InteriorPage";
import { EditableInteriorPage } from "@/components/EditableInteriorPage";
import {
  applySavedPageContent,
  getOptionalCmsUser,
  getPageContent,
} from "@/lib/cms";
import { applyPageContentFields } from "@/lib/cms-page-content";
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

  const [saved, user] = await Promise.all([
    getPageContent(page.slug),
    getOptionalCmsUser(),
  ]);
  const withCms = applyPageContentFields(page, saved.fields);
  const content = await withWordPressBody(withCms);

  return (
    <EditableInteriorPage
      canEdit={Boolean(user)}
      initialEditMode={false}
      initialFields={saved.fields}
      key={content.slug}
      page={content}
    >
      <InteriorPage page={content} />
    </EditableInteriorPage>
  );
}
