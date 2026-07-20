import { NextResponse } from "next/server";
import { getCurrentCmsUser, hasCmsUsers } from "@/lib/cms";
import { storeCmsMediaFile } from "@/lib/cms-media";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!(await hasCmsUsers())) {
      return NextResponse.json({ error: "CMS is not set up." }, { status: 403 });
    }

    const user = await getCurrentCmsUser();
    if (!user) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
    }

    const result = await storeCmsMediaFile({ file, userId: user.id });
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      url: result.media.url,
      contentType: result.media.contentType,
      id: result.media.id,
    });
  } catch (error) {
    console.error("CMS media upload failed", error);
    return NextResponse.json(
      { error: "Upload failed. Check CMS database and media storage." },
      { status: 500 },
    );
  }
}
