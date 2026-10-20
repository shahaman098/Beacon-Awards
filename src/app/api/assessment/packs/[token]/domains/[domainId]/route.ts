import { getAssessmentPackByToken, isRagScore, upsertAssessmentDomain } from "@/lib/assessment";
import { ASSESSMENT_DOMAINS, isAssessmentDomainId } from "@/lib/assessment-catalog";
import { assessmentUrl, notifyCrm } from "@/lib/crm";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ token: string; domainId: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { token, domainId } = await context.params;

  if (!isAssessmentDomainId(domainId)) {
    return NextResponse.json({ error: "Unknown domain." }, { status: 404 });
  }

  try {
    const body = (await request.json()) as {
      rag?: string;
      evidenceNotes?: string;
      checklistIds?: string[];
    };

    if (body.rag !== undefined && !isRagScore(body.rag)) {
      return NextResponse.json({ error: "Invalid RAG score." }, { status: 400 });
    }

    if (
      body.checklistIds !== undefined &&
      (!Array.isArray(body.checklistIds) ||
        body.checklistIds.some((item) => typeof item !== "string"))
    ) {
      return NextResponse.json(
        { error: "checklistIds must be an array of strings." },
        { status: 400 },
      );
    }

    const existing = await getAssessmentPackByToken(token);
    if (!existing) {
      return NextResponse.json({ error: "Assessment pack not found." }, { status: 404 });
    }

    const previousDomain = existing.domains.find((domain) => domain.domainId === domainId);
    const previousRag = previousDomain?.rag ?? "unset";

    const detail = await upsertAssessmentDomain(token, domainId, {
      rag: body.rag,
      evidenceNotes: body.evidenceNotes,
      checklistIds: body.checklistIds,
    });

    if (!detail) {
      return NextResponse.json({ error: "Assessment pack not found." }, { status: 404 });
    }

    const updatedDomain = detail.domains.find((domain) => domain.domainId === domainId);
    const rag = updatedDomain?.rag ?? "unset";

    if (body.rag !== undefined && rag !== previousRag) {
      const domainMeta = ASSESSMENT_DOMAINS.find((domain) => domain.id === domainId);
      void notifyCrm({
        eventType: "assessment.domain_scored",
        packId: detail.pack.id,
        packStatus: detail.pack.status,
        domainId,
        domainTitle: domainMeta?.title ?? domainId,
        previousRag,
        rag,
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
      error instanceof Error ? error.message : "Could not update domain.";
    const status = message.includes("CMS_DB") ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
