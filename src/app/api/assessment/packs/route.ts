import { createAssessmentPack } from "@/lib/assessment";
import { assessmentUrl, notifyCrm } from "@/lib/crm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      mosqueName?: string;
      contactName?: string;
      contactEmail?: string;
    };

    const detail = await createAssessmentPack({
      mosqueName: body.mosqueName ?? "",
      contactName: body.contactName,
      contactEmail: body.contactEmail,
    });

    if (!detail) {
      return NextResponse.json(
        { error: "Could not create assessment pack." },
        { status: 500 },
      );
    }

    void notifyCrm({
      eventType: "assessment.started",
      packId: detail.pack.id,
      packStatus: detail.pack.status,
      assessmentUrl: assessmentUrl(detail.pack.accessToken),
      mosqueName: detail.pack.mosqueName,
      contactName: detail.pack.contactName,
      contactEmail: detail.pack.contactEmail,
      summary: detail.summary,
    });

    return NextResponse.json(detail, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create assessment pack.";
    const status = message.includes("CMS_DB") ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
