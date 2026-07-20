import { NextResponse } from "next/server";
import {
  getCurrentCmsUser,
  hasCmsUsers,
  saveHomepageContent,
} from "@/lib/cms";
import { mergeHomepageContent } from "@/lib/cms-homepage";

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
      content?: unknown;
    };
    const content = mergeHomepageContent(body.content ?? body);
    const saved = await saveHomepageContent(content, user.id);
    return NextResponse.json({ ok: true, content: saved });
  } catch (error) {
    console.error("CMS homepage save failed", error);
    return NextResponse.json(
      { error: "Could not save homepage content." },
      { status: 500 },
    );
  }
}
