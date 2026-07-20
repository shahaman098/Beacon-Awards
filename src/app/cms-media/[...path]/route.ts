import { readCmsMediaObject } from "@/lib/cms-media";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { path = [] } = await context.params;
  const objectKey = path.join("/");
  const object = await readCmsMediaObject(objectKey);

  if (!object || !object.body) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": object.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(object.size),
    },
  });
}
