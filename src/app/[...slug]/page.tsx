import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/InteriorPage";
import { EditableInteriorPage } from "@/components/EditableInteriorPage";
import { getOptionalCmsUser, resolveInteriorPage } from "@/lib/cms";
import { collectEditablePageFields } from "@/lib/cms-page-content";
import { withStableSectionIds } from "@/lib/cms-page-document";
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

  const editable = await resolveInteriorPage(page);
  return pageMetadata(editable);
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const [resolved, user] = await Promise.all([
    resolveInteriorPage(page),
    getOptionalCmsUser(),
  ]);
  const content = await withWordPressBody(resolved);
  const initialDocument = withStableSectionIds(content);
  const initialFields = collectEditablePageFields(content);

  return (
    <EditableInteriorPage
      canEdit={Boolean(user)}
      initialDocument={initialDocument}
      initialEditMode={false}
      initialFields={initialFields}
      key={content.slug}
      page={content}
    >
      <InteriorPage page={content} />
    </EditableInteriorPage>
  );
}
