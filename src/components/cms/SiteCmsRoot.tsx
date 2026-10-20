import { SiteCmsAdminBar } from "@/components/cms/SiteCmsAdminBar";
import { SiteCmsProvider } from "@/components/cms/SiteCmsProvider";
import { SiteCmsSessionLoader } from "@/components/cms/SiteCmsSessionLoader";
import { emptyImageOverrides } from "@/lib/cms-image-overrides";
import { mergeSiteChrome } from "@/lib/cms-site-chrome";

export function SiteCmsRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteCmsProvider
      canEdit={false}
      email={null}
      initialChrome={mergeSiteChrome(null)}
      initialOverrides={emptyImageOverrides()}
    >
      <SiteCmsSessionLoader />
      <SiteCmsAdminBar />
      {children}
    </SiteCmsProvider>
  );
}
