import { NextResponse } from "next/server";
import {
  getCurrentCmsUser,
  hasCmsUsers,
  saveImageOverrides,
} from "@/lib/cms";
import { mergeImageOverrides } from "@/lib/cms-image-overrides";

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
      overrides?: unknown;
    };
    const overrides = mergeImageOverrides(body.overrides ?? body);
    const saved = await saveImageOverrides(overrides, user.id);
    return NextResponse.json({ ok: true, overrides: saved });
  } catch (error) {
    console.error("CMS image overrides save failed", error);
    return NextResponse.json(
      { error: "Could not save image adjustments." },
      { status: 500 },
    );
  }
}
