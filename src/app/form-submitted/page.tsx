import { FormSubmittedContent } from "@/components/FormSubmittedContent";
import { SiteFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";

function safeReturnPath(value?: string) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export default async function FormSubmittedPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string; returnTo?: string; status?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "received";
  const returnTo = safeReturnPath(params.returnTo);

  return (
    <>
      <SiteHeader />
      <FormSubmittedContent
        form={params.form}
        returnTo={returnTo}
        status={status}
      />
      <SiteFooter />
    </>
  );
}
