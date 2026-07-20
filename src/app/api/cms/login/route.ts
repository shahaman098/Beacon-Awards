import {
  authenticateCmsUser,
  createCmsSessionToken,
  ensureCmsAdminUser,
  validateCmsLoginInput,
} from "@/lib/cms";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await ensureCmsAdminUser();
  } catch (error) {
    console.error("CMS admin ensure failed", error);
    return NextResponse.redirect(
      new URL(
        "/cms/login/?error=" +
          encodeURIComponent("CMS database is not ready. Try again."),
        request.url,
      ),
    );
  }

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const emailConfirm = String(formData.get("emailConfirm") ?? "");
  const password = String(formData.get("password") ?? "");
  const validationError = validateCmsLoginInput(email, emailConfirm, password);

  if (validationError) {
    return NextResponse.redirect(
      new URL(
        `/cms/login/?error=${encodeURIComponent(validationError)}`,
        request.url,
      ),
    );
  }

  const user = await authenticateCmsUser(email, password);

  if (!user) {
    return NextResponse.redirect(
      new URL(
        `/cms/login/?error=${encodeURIComponent("Invalid email or password.")}`,
        request.url,
      ),
    );
  }

  const token = await createCmsSessionToken(user.id);
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("bm_cms_session", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
