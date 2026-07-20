import { InteriorPage } from "@/components/InteriorPage";
import { EditableInteriorPage } from "@/components/EditableInteriorPage";
import {
  applySavedPageContent,
  cmsPostToCard,
  getOptionalCmsUser,
  listPublishedCmsPosts,
} from "@/lib/cms";
import { communityStoryCards, pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

async function getNewsPage() {
  const basePage = pages["category/news"];
  const cmsCards = (await listPublishedCmsPosts()).map(cmsPostToCard);

  const page = {
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

  return applySavedPageContent(page);
}

export async function generateMetadata() {
  return pageMetadata(await getNewsPage());
}

export default async function CategoryNewsPage() {
  const [page, user] = await Promise.all([
    getNewsPage(),
    getOptionalCmsUser(),
  ]);

  return (
    <EditableInteriorPage
      canEdit={Boolean(user)}
      initialEditMode={false}
      key={page.slug}
      page={page}
    >
      <InteriorPage page={page} />
    </EditableInteriorPage>
  );
}
