import { InteriorPage } from "@/components/InteriorPage";
import { EditableInteriorPage } from "@/components/EditableInteriorPage";
import {
  cmsPostToCard,
  getOptionalCmsUser,
  getPageContent,
  listPublishedCmsPosts,
} from "@/lib/cms";
import { applyPageContentFields } from "@/lib/cms-page-content";
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
  const saved = await getPageContent(base.slug);
  return pageMetadata(applyPageContentFields(base, saved.fields));
}

export default async function CategoryNewsPage() {
  const base = await getNewsPageBase();
  const [saved, user] = await Promise.all([
    getPageContent(base.slug),
    getOptionalCmsUser(),
  ]);
  const page = applyPageContentFields(base, saved.fields);

  return (
    <EditableInteriorPage
      canEdit={Boolean(user)}
      initialEditMode={false}
      initialFields={saved.fields}
      key={page.slug}
      page={page}
    >
      <InteriorPage page={page} />
    </EditableInteriorPage>
  );
}
