import { NextResponse } from "next/server";
import {
  getCurrentCmsUser,
  getImageOverrides,
  getSiteChrome,
} from "@/lib/cms";

export async function GET() {
  const user = await getCurrentCmsUser();
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const [overrides, chrome] = await Promise.all([
    getImageOverrides(),
    getSiteChrome(),
  ]);

  return NextResponse.json({
    authenticated: true,
    email: user.email,
    overrides,
    chrome,
  });
}
