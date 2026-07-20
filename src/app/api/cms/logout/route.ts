import { destroyCurrentCmsSession } from "@/lib/cms";
import { cmsRedirect } from "@/lib/cms-routes";

export async function POST(request: Request) {
  await destroyCurrentCmsSession();
  cmsRedirect(request, "/cms/login/");
}
