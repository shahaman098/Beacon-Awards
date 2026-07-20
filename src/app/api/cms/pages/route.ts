import { NextResponse } from "next/server";
import {
  getCurrentCmsUser,
  hasCmsUsers,
  savePageContent,
} from "@/lib/cms";
import { mergePageContentPayload } from "@/lib/cms-page-content";

export async function POST(request: Request) {
  try {
    if (!(await hasCmsUsers())) {
      return NextResponse.json({ error: "CMS is not set up." }, { status: 403 });
    }

    const user = await getCurrentCmsUser();
    if (!user) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }

    const body = (await request.json()) as {
      routeSlug?: unknown;
      fields?: unknown;
      content?: unknown;
    };

    const routeSlug =
      typeof body.routeSlug === "string" ? body.routeSlug.trim() : "";
    if (!routeSlug) {
      return NextResponse.json(
        { error: "routeSlug is required." },
        { status: 400 },
      );
    }

    const content = mergePageContentPayload(body.content ?? { fields: body.fields });
    const saved = await savePageContent(routeSlug, content, user.id);
    return NextResponse.json({ ok: true, content: saved });
  } catch (error) {
    console.error("CMS page content save failed", error);
    return NextResponse.json(
      { error: "Could not save page content." },
      { status: 500 },
    );
  }
}
