import {
  getAssessmentPackByToken,
  isPackStatus,
  updateAssessmentPackMeta,
} from "@/lib/assessment";
import { assessmentUrl, notifyCrm } from "@/lib/crm";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { token } = await context.params;
  const detail = await getAssessmentPackByToken(token);

  if (!detail) {
    return NextResponse.json({ error: "Assessment pack not found." }, { status: 404 });
  }

  return NextResponse.json(detail);
}

export async function PATCH(request: Request, context: RouteContext) {
  const { token } = await context.params;

  try {
    const body = (await request.json()) as {
      mosqueName?: string;
      contactName?: string;
      contactEmail?: string;
      status?: string;
    };

    if (body.status !== undefined && !isPackStatus(body.status)) {
      return NextResponse.json({ error: "Invalid pack status." }, { status: 400 });
    }

    const existing = await getAssessmentPackByToken(token);
    if (!existing) {
      return NextResponse.json({ error: "Assessment pack not found." }, { status: 404 });
    }

    const detail = await updateAssessmentPackMeta(token, {
      mosqueName: body.mosqueName,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      status: body.status,
    });

    if (!detail) {
      return NextResponse.json({ error: "Assessment pack not found." }, { status: 404 });
    }

    if (body.status !== undefined && body.status !== existing.pack.status) {
      void notifyCrm({
        eventType: "assessment.status_changed",
        packId: detail.pack.id,
        previousStatus: existing.pack.status,
        packStatus: detail.pack.status,
        assessmentUrl: assessmentUrl(detail.pack.accessToken),
        mosqueName: detail.pack.mosqueName,
        contactName: detail.pack.contactName,
        contactEmail: detail.pack.contactEmail,
        summary: detail.summary,
      });
    }

    return NextResponse.json(detail);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not update assessment pack.";
    const status = message.includes("CMS_DB") ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
