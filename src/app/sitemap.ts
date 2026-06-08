import type { MetadataRoute } from "next";
import { getPageStaticParams } from "@/lib/pages";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const params = await getPageStaticParams();
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
        priority: joined.startsWith("awards") || joined === "standards" ? 0.8 : 0.6,
      };
    }),
  ];

  return routes;
}
