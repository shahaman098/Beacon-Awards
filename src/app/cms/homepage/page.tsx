import { redirect } from "next/navigation";
import { getCurrentCmsUser, hasCmsUsers } from "@/lib/cms";

/** Homepage editing happens on the live site, not a form. */
export default async function CmsHomepagePage() {
  if (!(await hasCmsUsers())) {
    redirect("/cms/login/");
  }

  const user = await getCurrentCmsUser();
  if (!user) {
    redirect("/cms/login/");
  }

  redirect("/");
}
