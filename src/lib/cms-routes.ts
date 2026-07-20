import { redirect } from "next/navigation";

export function cmsRedirect(request: Request, pathname: string): never {
  redirect(new URL(pathname, request.url).toString());
}

export function cmsRedirectWithMessage(
  request: Request,
  pathname: string,
  key: "error" | "success",
  message: string,
): never {
  const url = new URL(pathname, request.url);
  url.searchParams.set(key, message);
  redirect(url.toString());
}
