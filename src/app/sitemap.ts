import type { MetadataRoute } from "next";
import { listPublishedCmsEntriesForSitemap } from "@/lib/cms";
import { getPageStaticParams } from "@/lib/pages";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const params = await getPageStaticParams();
  const cmsEntries = await listPublishedCmsEntriesForSitemap();
  const routes = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...params.map(({ slug }) => {
      const joined = slug.join("/");
      return {
        url: absoluteUrl(`/${joined}/`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority:
          joined.startsWith("awards") || joined === "standards" ? 0.8 : 0.6,
      };
    }),
    ...cmsEntries.map((entry) => ({
      url: absoluteUrl(`/${entry.routeSlug}/`),
      lastModified: entry.updatedAt,
      changeFrequency:
        entry.kind === "post"
          ? ("weekly" as const)
          : ("monthly" as const),
      priority: entry.kind === "post" ? 0.7 : 0.6,
    })),
  ];

  return routes;
}
