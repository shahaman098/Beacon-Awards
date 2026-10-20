import { EditableHome } from "@/components/EditableHome";
import { getHomepageContent } from "@/lib/cms";

export const revalidate = 3600;

export default async function Home() {
  const content = await getHomepageContent();

  return (
    <EditableHome
      canEdit={false}
      content={content}
      editorEmail={null}
      initialEditMode={false}
    />
  );
}
