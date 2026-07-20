import { cmsRedirect } from "@/lib/cms-routes";

export async function POST(request: Request) {
  cmsRedirect(request, "/cms/login/");
}
