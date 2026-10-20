import { notFound, permanentRedirect, redirect } from "next/navigation";
import { InteriorPage } from "@/components/InteriorPage";
import { EditableInteriorPage } from "@/components/EditableInteriorPage";
import { resolveInteriorPage } from "@/lib/cms";
import { collectEditablePageFields } from "@/lib/cms-page-content";
import {
  documentHasCmsOwnedSections,
  withStableSectionIds,
} from "@/lib/cms-page-document";
import { findCmsRedirect } from "@/lib/cms-redirects";
import { getPage } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { withWordPressBody } from "@/lib/wordpress-content";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export const revalidate = 3600;

function routePathFromSegments(slug: string[]) {
  return `/${slug.filter(Boolean).join("/")}/`;
}

async function applyRedirectIfAny(pathname: string) {
  const match = await findCmsRedirect(pathname);
  if (!match) return;
  if (match.statusCode === 301 || match.statusCode === 308) {
    permanentRedirect(match.toPath);
  }
  redirect(match.toPath);
}

async function resolvePageContent(slug: string[]) {
  const page = await getPage(slug);
  if (!page) return null;

  const resolved = await resolveInteriorPage(page);
  const content = documentHasCmsOwnedSections(resolved)
    ? resolved
    : await withWordPressBody(resolved);

  return content;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  await applyRedirectIfAny(routePathFromSegments(slug));

  const content = await resolvePageContent(slug);
  if (!content) {
    return {};
  }

  return pageMetadata(content);
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  await applyRedirectIfAny(routePathFromSegments(slug));

  const content = await resolvePageContent(slug);
  if (!content) {
    notFound();
  }

  const initialDocument = withStableSectionIds(content);
  const initialFields = collectEditablePageFields(content);

  return (
    <EditableInteriorPage
      canEdit={false}
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
