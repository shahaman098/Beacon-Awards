import {
  createAssessmentAction,
  generateActionsFromGaps,
  isActionStatus,
  updateAssessmentAction,
} from "@/lib/assessment";
import { isAssessmentDomainId } from "@/lib/assessment-catalog";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { token } = await context.params;

  try {
    const body = (await request.json()) as {
      generateFromGaps?: boolean;
      domainId?: string;
      title?: string;
      ownerRole?: string;
      dueLabel?: string;
      status?: string;
    };

    if (body.generateFromGaps) {
      const detail = await generateActionsFromGaps(token);
      if (!detail) {
        return NextResponse.json(
          { error: "Assessment pack not found." },
          { status: 404 },
        );
      }
      return NextResponse.json(detail);
    }

    if (!body.domainId || !isAssessmentDomainId(body.domainId)) {
      return NextResponse.json({ error: "Valid domainId is required." }, { status: 400 });
    }

    if (body.status !== undefined && !isActionStatus(body.status)) {
      return NextResponse.json({ error: "Invalid action status." }, { status: 400 });
    }

    const detail = await createAssessmentAction(token, {
      domainId: body.domainId,
      title: body.title ?? "",
      ownerRole: body.ownerRole,
      dueLabel: body.dueLabel,
      status: body.status,
    });

    if (!detail) {
      return NextResponse.json({ error: "Assessment pack not found." }, { status: 404 });
    }

    return NextResponse.json(detail, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create action.";
    const status = message.includes("CMS_DB") ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const { token } = await context.params;

  try {
    const body = (await request.json()) as {
      actionId?: string;
      domainId?: string;
      title?: string;
      ownerRole?: string;
      dueLabel?: string;
      status?: string;
    };

    if (!body.actionId) {
      return NextResponse.json({ error: "actionId is required." }, { status: 400 });
    }

    if (body.domainId !== undefined && !isAssessmentDomainId(body.domainId)) {
      return NextResponse.json({ error: "Unknown domain." }, { status: 400 });
    }

    if (body.status !== undefined && !isActionStatus(body.status)) {
      return NextResponse.json({ error: "Invalid action status." }, { status: 400 });
    }

    const detail = await updateAssessmentAction(token, body.actionId, {
      domainId: body.domainId,
      title: body.title,
      ownerRole: body.ownerRole,
      dueLabel: body.dueLabel,
      status: body.status,
    });

    if (!detail) {
      return NextResponse.json(
        { error: "Assessment pack or action not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(detail);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not update action.";
    const status = message.includes("CMS_DB") ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
