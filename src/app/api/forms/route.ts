import { NextResponse, type NextRequest } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const formLabels = {
  contact: "Contact message",
  nomination: "Awards nomination",
  rating: "Mosque rating request",
} as const;

const requiredFields = {
  contact: ["name", "email", "subject", "message"],
  nomination: ["mosque_name", "nominee_name", "award_category", "your_name", "email", "message"],
  rating: ["mosque_name", "city", "primary_contact", "email", "current_rating", "message"],
} as const;

type FormType = keyof typeof formLabels;

function isFormType(value: FormDataEntryValue | null): value is FormType {
  return typeof value === "string" && value in formLabels;
}

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function safeReturnPath(formData: FormData) {
  const value = formValue(formData, "source_path");
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function redirectTo(request: NextRequest, params: Record<string, string>) {
  const referer = request.headers.get("referer");
  const origin = request.headers.get("origin") ?? (referer ? new URL(referer).origin : new URL(request.url).origin);
  const url = new URL("/form-submitted/", origin);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return NextResponse.redirect(url, 303);
}

async function saveLocalSubmission(payload: unknown) {
  const directory = path.join(process.cwd(), ".data");
  await mkdir(directory, { recursive: true });
  await appendFile(path.join(directory, "form-submissions.jsonl"), `${JSON.stringify(payload)}\n`, "utf8");
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const returnTo = safeReturnPath(formData);

  if (formValue(formData, "website")) {
    return redirectTo(request, { status: "received", form: "contact", returnTo });
  }

  const formType = formData.get("form_type");
  if (!isFormType(formType)) {
    return redirectTo(request, { status: "invalid", form: "contact", returnTo });
  }

  const missing = requiredFields[formType].filter((field) => !formValue(formData, field));
  if (missing.length > 0) {
    return redirectTo(request, { status: "missing", form: formType, returnTo });
  }

  const payload = {
    formType,
    formLabel: formLabels[formType],
    submittedAt: new Date().toISOString(),
    source: request.headers.get("referer") ?? "",
    sourcePath: returnTo,
    fields: Object.fromEntries(
      requiredFields[formType].map((field) => [field, formValue(formData, field)]),
    ),
  };

  const webhookUrl = process.env.BEACON_FORM_WEBHOOK_URL;

  try {
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        return redirectTo(request, { status: "delivery-error", form: formType, returnTo });
      }

      return redirectTo(request, { status: "received", form: formType, returnTo });
    }

    await saveLocalSubmission(payload);
    return redirectTo(request, { status: "received", form: formType, returnTo });
  } catch {
    return redirectTo(request, { status: "delivery-error", form: formType, returnTo });
  }
}
