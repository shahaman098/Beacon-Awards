import { NextResponse } from "next/server";
import {
  getCurrentCmsUser,
  hasCmsUsers,
  saveSiteChrome,
} from "@/lib/cms";
import { mergeSiteChrome } from "@/lib/cms-site-chrome";

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
      chrome?: unknown;
    };
    const chrome = mergeSiteChrome(body.chrome ?? body);
    const saved = await saveSiteChrome(chrome, user.id);
    return NextResponse.json({ ok: true, chrome: saved });
  } catch (error) {
    console.error("CMS site chrome save failed", error);
    return NextResponse.json(
      { error: "Could not save site chrome." },
      { status: 500 },
    );
  }
}
