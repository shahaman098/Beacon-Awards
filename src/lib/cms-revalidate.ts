import { revalidatePath } from "next/cache";

export function revalidatePublicPaths(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}

export function revalidateEntireSite() {
  revalidatePath("/", "layout");
}

export function revalidateSiteContent() {
  revalidatePublicPaths(["/", "/category/news/"]);
}

export function revalidateInteriorRoute(routeSlug: string) {
  revalidatePublicPaths([`/${routeSlug}/`]);
}
