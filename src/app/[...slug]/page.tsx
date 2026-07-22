import { notFound, permanentRedirect, redirect } from "next/navigation";
import { InteriorPage } from "@/components/InteriorPage";
import { EditableInteriorPage } from "@/components/EditableInteriorPage";
import {
  getOptionalCmsUser,
  resolveInteriorPage,
  resolveInteriorPageForRequest,
} from "@/lib/cms";
import { collectEditablePageFields } from "@/lib/cms-page-content";
import {
  documentHasCmsOwnedSections,
  withStableSectionIds,
} from "@/lib/cms-page-document";
import { findCmsRedirect } from "@/lib/cms-redirects";
import { getPage, getPageStaticParams } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { withWordPressBody } from "@/lib/wordpress-content";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getPageStaticParams();
}

function routePathFromSegments(slug: string[]) {
  return `/${slug.filter(Boolean).join("/")}/`;
}

function wantsPreview(
  searchParams?: Record<string, string | string[] | undefined>,
) {
  const value = searchParams?.preview;
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "1" || raw === "true";
}

function wantsEditMode(
  searchParams?: Record<string, string | string[] | undefined>,
) {
  const value = searchParams?.edit;
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "1" || raw === "true";
}

async function applyRedirectIfAny(pathname: string) {
  const match = await findCmsRedirect(pathname);
  if (!match) return;
  if (match.statusCode === 301 || match.statusCode === 308) {
    permanentRedirect(match.toPath);
  }
  redirect(match.toPath);
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearch = searchParams ? await searchParams : undefined;
  await applyRedirectIfAny(routePathFromSegments(slug));

  const page = await getPage(slug);
  if (!page) {
    return {};
  }

  const user = await getOptionalCmsUser();
  const preview = Boolean(user && wantsPreview(resolvedSearch));
  const editable = await resolveInteriorPageForRequest(page, { preview });
  return pageMetadata(editable);
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearch = searchParams ? await searchParams : undefined;
  await applyRedirectIfAny(routePathFromSegments(slug));

  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const user = await getOptionalCmsUser();
  const preview = Boolean(user && wantsPreview(resolvedSearch));
  const editMode = Boolean(user && wantsEditMode(resolvedSearch));

  const resolved = await resolveInteriorPageForRequest(page, { preview });
  // CMS-owned documents (real sections) must not be overwritten by remote WP HTML.
  const content = documentHasCmsOwnedSections(resolved)
    ? resolved
    : await withWordPressBody(resolved);
  const initialDocument = withStableSectionIds(content);
  const initialFields = collectEditablePageFields(content);

  return (
    <EditableInteriorPage
      canEdit={Boolean(user)}
      initialDocument={initialDocument}
      initialEditMode={editMode}
      initialFields={initialFields}
      key={`${content.slug}:${preview ? "preview" : "live"}`}
      page={content}
    >
      <InteriorPage page={content} />
    </EditableInteriorPage>
  );
}
