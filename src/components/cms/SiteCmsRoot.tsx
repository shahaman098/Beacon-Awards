import {
  getImageOverrides,
  getOptionalCmsUser,
} from "@/lib/cms";
import { SiteCmsAdminBar } from "@/components/cms/SiteCmsAdminBar";
import { SiteCmsProvider } from "@/components/cms/SiteCmsProvider";

export async function SiteCmsRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, overrides] = await Promise.all([
    getOptionalCmsUser(),
    getImageOverrides(),
  ]);
  const canEdit = Boolean(user);

  return (
    <SiteCmsProvider
      canEdit={canEdit}
      email={user?.email ?? null}
      initialEditMode={false}
      initialOverrides={overrides}
    >
      {canEdit ? <SiteCmsAdminBar /> : null}
      {children}
    </SiteCmsProvider>
  );
}
