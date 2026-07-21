import { InteriorPage } from "@/components/InteriorPage";
import { EditableInteriorPage } from "@/components/EditableInteriorPage";
import {
  cmsPostToCard,
  getOptionalCmsUser,
  listPublishedCmsPosts,
  resolveInteriorPage,
} from "@/lib/cms";
import { collectEditablePageFields } from "@/lib/cms-page-content";
import { withStableSectionIds } from "@/lib/cms-page-document";
import { communityStoryCards, pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

async function getNewsPageBase() {
  const basePage = pages["category/news"];
  const cmsCards = (await listPublishedCmsPosts()).map(cmsPostToCard);

  return {
    ...basePage,
    sections: basePage.sections.map((section) =>
      section.kind === "cards" && section.title === "Latest news"
        ? {
            ...section,
            cards: [...cmsCards, ...communityStoryCards],
          }
        : section,
    ),
  };
}

export async function generateMetadata() {
  const base = await getNewsPageBase();
  const page = await resolveInteriorPage(base);
  return pageMetadata(page);
}

export default async function CategoryNewsPage() {
  const base = await getNewsPageBase();
  const [page, user] = await Promise.all([
    resolveInteriorPage(base),
    getOptionalCmsUser(),
  ]);
  const initialDocument = withStableSectionIds(page);
  const initialFields = collectEditablePageFields(page);

  return (
    <EditableInteriorPage
      canEdit={Boolean(user)}
      initialDocument={initialDocument}
      initialEditMode={false}
      initialFields={initialFields}
      key={page.slug}
      page={page}
    >
      <InteriorPage page={page} />
    </EditableInteriorPage>
  );
}
