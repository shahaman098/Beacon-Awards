import { NextResponse } from "next/server";
import {
  getCurrentCmsUser,
  getPageDocument,
  hasCmsUsers,
  listPageRevisions,
  publishPageDocument,
  restorePageRevision,
  savePageContent,
  savePageDocument,
} from "@/lib/cms";
import { mergePageContentPayload } from "@/lib/cms-page-content";
import {
  addSectionToDocument,
  isAddableSectionKind,
  parsePageDocument,
  removeSectionFromDocument,
  reorderSectionsByIds,
  reorderSectionsInDocument,
} from "@/lib/cms-page-document";
import { getPage } from "@/lib/pages";

async function loadBasePage(routeSlug: string) {
  const segments = routeSlug.split("/").filter(Boolean);
  return getPage(segments);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const routeSlug = (searchParams.get("routeSlug") ?? "").trim();
    if (!routeSlug) {
      return NextResponse.json(
        { error: "routeSlug is required." },
        { status: 400 },
      );
    }

    const base = await loadBasePage(routeSlug);
    if (!base) {
      return NextResponse.json({ error: "Page not found." }, { status: 404 });
    }

    const preview = searchParams.get("preview") === "1";
    const user = preview ? await getCurrentCmsUser() : null;
    const document = await getPageDocument(routeSlug, base, {
      preview: Boolean(preview && user),
    });

    if (searchParams.get("revisions") === "1") {
      const authUser = await getCurrentCmsUser();
      if (!authUser) {
        return NextResponse.json({ error: "Sign in required." }, { status: 401 });
      }
      const revisions = await listPageRevisions(routeSlug);
      return NextResponse.json({ ok: true, document, routeSlug, revisions });
    }

    return NextResponse.json({ ok: true, document, routeSlug });
  } catch (error) {
    console.error("CMS page document read failed", error);
    return NextResponse.json(
      { error: "Could not load page document." },
      { status: 500 },
    );
  }
}

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
      routeSlug?: unknown;
      fields?: unknown;
      content?: unknown;
      document?: unknown;
      op?: unknown;
      kind?: unknown;
      afterIndex?: unknown;
      index?: unknown;
      from?: unknown;
      to?: unknown;
      sectionIds?: unknown;
      note?: unknown;
      action?: unknown;
      revisionId?: unknown;
    };

    const routeSlug =
      typeof body.routeSlug === "string" ? body.routeSlug.trim() : "";
    if (!routeSlug) {
      return NextResponse.json(
        { error: "routeSlug is required." },
        { status: 400 },
      );
    }

    const action = typeof body.action === "string" ? body.action : "save";
    const note = typeof body.note === "string" ? body.note : "";

    if (action === "restore") {
      const revisionId =
        typeof body.revisionId === "string" ? body.revisionId.trim() : "";
      if (!revisionId) {
        return NextResponse.json(
          { error: "revisionId is required." },
          { status: 400 },
        );
      }
      const restored = await restorePageRevision(routeSlug, revisionId, user.id);
      return NextResponse.json({ ok: true, document: restored, action: "restore" });
    }

    if (action === "publish") {
      const parsed =
        body.document != null ? parsePageDocument(body.document) : null;
      if (body.document != null && !parsed) {
        return NextResponse.json(
          { error: "Invalid page document." },
          { status: 400 },
        );
      }
      if (parsed) {
        await savePageDocument(routeSlug, parsed, user.id, note || "pre-publish");
      }
      const published = await publishPageDocument(
        routeSlug,
        user.id,
        parsed,
        note || "publish",
      );
      return NextResponse.json({
        ok: true,
        document: published,
        action: "publish",
      });
    }

    const base = await loadBasePage(routeSlug);
    if (!base) {
      return NextResponse.json({ error: "Page not found." }, { status: 404 });
    }

    const current = await getPageDocument(routeSlug, base, { preview: true });

    // Full document save → draft
    if (body.document != null) {
      const parsed = parsePageDocument(body.document);
      if (!parsed) {
        return NextResponse.json(
          { error: "Invalid page document." },
          { status: 400 },
        );
      }
      const saved = await savePageDocument(routeSlug, parsed, user.id, note);
      return NextResponse.json({ ok: true, document: saved, action: "draft" });
    }

    // Structural ops → draft
    if (typeof body.op === "string") {
      let next = current;
      switch (body.op) {
        case "add": {
          if (typeof body.kind !== "string" || !isAddableSectionKind(body.kind)) {
            return NextResponse.json(
              { error: "Invalid section kind." },
              { status: 400 },
            );
          }
          const afterIndex =
            typeof body.afterIndex === "number" ? body.afterIndex : undefined;
          next = addSectionToDocument(current, body.kind, afterIndex);
          break;
        }
        case "remove": {
          if (typeof body.index !== "number") {
            return NextResponse.json(
              { error: "index is required for remove." },
              { status: 400 },
            );
          }
          next = removeSectionFromDocument(current, body.index);
          break;
        }
        case "reorder": {
          if (Array.isArray(body.sectionIds)) {
            const sectionIds = body.sectionIds.filter(
              (id): id is string => typeof id === "string",
            );
            next = reorderSectionsByIds(current, sectionIds);
          } else if (
            typeof body.from === "number" &&
            typeof body.to === "number"
          ) {
            next = reorderSectionsInDocument(current, body.from, body.to);
          } else {
            return NextResponse.json(
              { error: "reorder requires from/to or sectionIds." },
              { status: 400 },
            );
          }
          break;
        }
        default:
          return NextResponse.json(
            { error: `Unknown op "${body.op}".` },
            { status: 400 },
          );
      }

      const saved = await savePageDocument(
        routeSlug,
        next,
        user.id,
        note || `op:${body.op}`,
      );
      return NextResponse.json({ ok: true, document: saved, action: "draft" });
    }

    // Legacy field-map save (Phase 1 compatibility)
    const content = mergePageContentPayload(
      body.content ?? { fields: body.fields },
    );
    const savedFields = await savePageContent(routeSlug, content, user.id);
    return NextResponse.json({ ok: true, content: savedFields });
  } catch (error) {
    console.error("CMS page content save failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not save page content.",
      },
      { status: 500 },
    );
  }
}
