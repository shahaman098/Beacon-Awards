import { EditableHome } from "@/components/EditableHome";
import {
  getHomepageContent,
  getOptionalCmsUser,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, user] = await Promise.all([
    getHomepageContent(),
    getOptionalCmsUser(),
  ]);

  return (
    <EditableHome
      canEdit={Boolean(user)}
      content={content}
      editorEmail={user?.email ?? null}
      initialEditMode={false}
    />
  );
}
