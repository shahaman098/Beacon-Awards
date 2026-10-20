import {
  ASSESSMENT_DOMAINS,
  type AssessmentDomainId,
  isAssessmentDomainId,
} from "@/lib/assessment-catalog";
import { getDb, tryGetCmsDb } from "@/lib/cms-db";

export type PackStatus = "draft" | "in_review" | "monitoring" | "archived";
export type RagScore = "red" | "amber" | "green" | "unset";
export type ActionStatus = "open" | "in_progress" | "done";

export type AssessmentPack = {
  id: string;
  accessToken: string;
  mosqueName: string;
  contactName: string;
  contactEmail: string;
  status: PackStatus;
  createdAt: string;
  updatedAt: string;
};

export type AssessmentDomainRow = {
  packId: string;
  domainId: AssessmentDomainId;
  rag: RagScore;
  evidenceNotes: string;
  checklistIds: string[];
  updatedAt: string;
};

export type AssessmentAction = {
  id: string;
  packId: string;
  domainId: AssessmentDomainId;
  title: string;
  ownerRole: string;
  dueLabel: string;
  status: ActionStatus;
  createdAt: string;
  updatedAt: string;
};

export type RagSummary = {
  red: number;
  amber: number;
  green: number;
  unset: number;
};

export type AssessmentPackDetail = {
  pack: AssessmentPack;
  domains: AssessmentDomainRow[];
  actions: AssessmentAction[];
  summary: RagSummary;
};

export type AssessmentPackListItem = AssessmentPack & {
  openActions: number;
  summary: RagSummary;
};

type PackRow = {
  id: string;
  access_token: string;
  mosque_name: string;
  contact_name: string;
  contact_email: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type DomainRow = {
  pack_id: string;
  domain_id: string;
  rag: string;
  evidence_notes: string;
  checklist_json: string;
  updated_at: string;
};

type ActionRow = {
  id: string;
  pack_id: string;
  domain_id: string;
  title: string;
  owner_role: string;
  due_label: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const PACK_STATUSES: PackStatus[] = [
  "draft",
  "in_review",
  "monitoring",
  "archived",
];
const RAG_SCORES: RagScore[] = ["red", "amber", "green", "unset"];
const ACTION_STATUSES: ActionStatus[] = ["open", "in_progress", "done"];

function nowIso() {
  return new Date().toISOString();
}

function createAccessToken() {
  return `${crypto.randomUUID().replaceAll("-", "")}${crypto.randomUUID().replaceAll("-", "")}`;
}

function parseChecklist(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function mapPack(row: PackRow): AssessmentPack {
  return {
    id: row.id,
    accessToken: row.access_token,
    mosqueName: row.mosque_name,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    status: isPackStatus(row.status) ? row.status : "draft",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapDomain(row: DomainRow): AssessmentDomainRow | null {
  if (!isAssessmentDomainId(row.domain_id)) return null;
  return {
    packId: row.pack_id,
    domainId: row.domain_id,
    rag: isRagScore(row.rag) ? row.rag : "unset",
    evidenceNotes: row.evidence_notes,
    checklistIds: parseChecklist(row.checklist_json),
    updatedAt: row.updated_at,
  };
}

function mapAction(row: ActionRow): AssessmentAction | null {
  if (!isAssessmentDomainId(row.domain_id)) return null;
  return {
    id: row.id,
    packId: row.pack_id,
    domainId: row.domain_id,
    title: row.title,
    ownerRole: row.owner_role,
    dueLabel: row.due_label,
    status: isActionStatus(row.status) ? row.status : "open",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function isPackStatus(value: string): value is PackStatus {
  return PACK_STATUSES.includes(value as PackStatus);
}

export function isRagScore(value: string): value is RagScore {
  return RAG_SCORES.includes(value as RagScore);
}

export function isActionStatus(value: string): value is ActionStatus {
  return ACTION_STATUSES.includes(value as ActionStatus);
}

export function summariseDomains(domains: AssessmentDomainRow[]): RagSummary {
  const summary: RagSummary = { red: 0, amber: 0, green: 0, unset: 0 };
  for (const domain of ASSESSMENT_DOMAINS) {
    const row = domains.find((item) => item.domainId === domain.id);
    const rag = row?.rag ?? "unset";
    summary[rag] += 1;
  }
  return summary;
}

async function touchPack(packId: string, updatedAt = nowIso()) {
  const db = await getDb();
  await db
    .prepare(`UPDATE assessment_packs SET updated_at = ? WHERE id = ?`)
    .bind(updatedAt, packId)
    .run();
  return updatedAt;
}

export async function createAssessmentPack(input: {
  mosqueName: string;
  contactName?: string;
  contactEmail?: string;
}) {
  const mosqueName = input.mosqueName.trim();
  if (!mosqueName) {
    throw new Error("Mosque name is required.");
  }

  const db = await getDb();
  const id = crypto.randomUUID();
  const accessToken = createAccessToken();
  const now = nowIso();

  await db
    .prepare(
      `INSERT INTO assessment_packs (
        id, access_token, mosque_name, contact_name, contact_email, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, 'draft', ?, ?)`,
    )
    .bind(
      id,
      accessToken,
      mosqueName,
      (input.contactName ?? "").trim(),
      (input.contactEmail ?? "").trim(),
      now,
      now,
    )
    .run();

  const domainStmt = db.prepare(
    `INSERT INTO assessment_domains (
      pack_id, domain_id, rag, evidence_notes, checklist_json, updated_at
    ) VALUES (?, ?, 'unset', '', '[]', ?)`,
  );

  await db.batch(
    ASSESSMENT_DOMAINS.map((domain) =>
      domainStmt.bind(id, domain.id, now),
    ),
  );

  return getAssessmentPackByToken(accessToken);
}

export async function getAssessmentPackByToken(token: string) {
  const db = await tryGetCmsDb();
  if (!db) return null;

  const packRow = await db
    .prepare(`SELECT * FROM assessment_packs WHERE access_token = ? LIMIT 1`)
    .bind(token)
    .first<PackRow>();

  if (!packRow) return null;

  const pack = mapPack(packRow);
  const domainRows = await db
    .prepare(`SELECT * FROM assessment_domains WHERE pack_id = ?`)
    .bind(pack.id)
    .all<DomainRow>();
  const actionRows = await db
    .prepare(
      `SELECT * FROM assessment_actions WHERE pack_id = ? ORDER BY created_at ASC`,
    )
    .bind(pack.id)
    .all<ActionRow>();

  const storedDomains = (domainRows.results ?? [])
    .map(mapDomain)
    .filter((row): row is AssessmentDomainRow => Boolean(row));

  const domains = ASSESSMENT_DOMAINS.map((domain) => {
    return (
      storedDomains.find((row) => row.domainId === domain.id) ?? {
        packId: pack.id,
        domainId: domain.id,
        rag: "unset" as const,
        evidenceNotes: "",
        checklistIds: [],
        updatedAt: pack.updatedAt,
      }
    );
  });

  const actions = (actionRows.results ?? [])
    .map(mapAction)
    .filter((row): row is AssessmentAction => Boolean(row));

  return {
    pack,
    domains,
    actions,
    summary: summariseDomains(domains),
  } satisfies AssessmentPackDetail;
}

export async function listAssessmentPacks(): Promise<AssessmentPackListItem[]> {
  const db = await tryGetCmsDb();
  if (!db) return [];

  const packs = await db
    .prepare(`SELECT * FROM assessment_packs ORDER BY updated_at DESC`)
    .all<PackRow>();

  const items: AssessmentPackListItem[] = [];

  for (const row of packs.results ?? []) {
    const pack = mapPack(row);
    const domainRows = await db
      .prepare(`SELECT domain_id, rag FROM assessment_domains WHERE pack_id = ?`)
      .bind(pack.id)
      .all<{ domain_id: string; rag: string }>();
    const openRow = await db
      .prepare(
        `SELECT COUNT(*) AS count FROM assessment_actions
         WHERE pack_id = ? AND status IN ('open', 'in_progress')`,
      )
      .bind(pack.id)
      .first<{ count: number }>();

    const domains = ASSESSMENT_DOMAINS.map((domain) => {
      const match = (domainRows.results ?? []).find(
        (item) => item.domain_id === domain.id,
      );
      return {
        packId: pack.id,
        domainId: domain.id,
        rag: isRagScore(match?.rag ?? "") ? (match!.rag as RagScore) : "unset",
        evidenceNotes: "",
        checklistIds: [],
        updatedAt: pack.updatedAt,
      };
    });

    items.push({
      ...pack,
      openActions: Number(openRow?.count ?? 0),
      summary: summariseDomains(domains),
    });
  }

  return items;
}

export async function updateAssessmentPackMeta(
  token: string,
  input: {
    mosqueName?: string;
    contactName?: string;
    contactEmail?: string;
    status?: PackStatus;
  },
) {
  const detail = await getAssessmentPackByToken(token);
  if (!detail) return null;

  const mosqueName =
    input.mosqueName !== undefined
      ? input.mosqueName.trim()
      : detail.pack.mosqueName;
  if (!mosqueName) {
    throw new Error("Mosque name is required.");
  }

  const status = input.status ?? detail.pack.status;
  if (!isPackStatus(status)) {
    throw new Error("Invalid pack status.");
  }

  const now = nowIso();
  const db = await getDb();
  await db
    .prepare(
      `UPDATE assessment_packs
       SET mosque_name = ?, contact_name = ?, contact_email = ?, status = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(
      mosqueName,
      input.contactName !== undefined
        ? input.contactName.trim()
        : detail.pack.contactName,
      input.contactEmail !== undefined
        ? input.contactEmail.trim()
        : detail.pack.contactEmail,
      status,
      now,
      detail.pack.id,
    )
    .run();

  return getAssessmentPackByToken(token);
}

export async function upsertAssessmentDomain(
  token: string,
  domainId: AssessmentDomainId,
  input: {
    rag?: RagScore;
    evidenceNotes?: string;
    checklistIds?: string[];
  },
) {
  const detail = await getAssessmentPackByToken(token);
  if (!detail) return null;

  const existing = detail.domains.find((domain) => domain.domainId === domainId);
  const rag = input.rag ?? existing?.rag ?? "unset";
  if (!isRagScore(rag)) {
    throw new Error("Invalid RAG score.");
  }

  const evidenceNotes =
    input.evidenceNotes !== undefined
      ? input.evidenceNotes
      : (existing?.evidenceNotes ?? "");
  const checklistIds =
    input.checklistIds !== undefined
      ? input.checklistIds
      : (existing?.checklistIds ?? []);

  const now = nowIso();
  const db = await getDb();
  await db
    .prepare(
      `INSERT INTO assessment_domains (
        pack_id, domain_id, rag, evidence_notes, checklist_json, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(pack_id, domain_id) DO UPDATE SET
        rag = excluded.rag,
        evidence_notes = excluded.evidence_notes,
        checklist_json = excluded.checklist_json,
        updated_at = excluded.updated_at`,
    )
    .bind(
      detail.pack.id,
      domainId,
      rag,
      evidenceNotes,
      JSON.stringify(checklistIds),
      now,
    )
    .run();

  await touchPack(detail.pack.id, now);
  return getAssessmentPackByToken(token);
}

export async function createAssessmentAction(
  token: string,
  input: {
    domainId: AssessmentDomainId;
    title: string;
    ownerRole?: string;
    dueLabel?: string;
    status?: ActionStatus;
  },
) {
  const detail = await getAssessmentPackByToken(token);
  if (!detail) return null;

  const title = input.title.trim();
  if (!title) {
    throw new Error("Action title is required.");
  }

  const status = input.status ?? "open";
  if (!isActionStatus(status)) {
    throw new Error("Invalid action status.");
  }

  const now = nowIso();
  const id = crypto.randomUUID();
  const db = await getDb();
  await db
    .prepare(
      `INSERT INTO assessment_actions (
        id, pack_id, domain_id, title, owner_role, due_label, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      detail.pack.id,
      input.domainId,
      title,
      (input.ownerRole ?? "").trim(),
      (input.dueLabel ?? "").trim(),
      status,
      now,
      now,
    )
    .run();

  await touchPack(detail.pack.id, now);
  return getAssessmentPackByToken(token);
}

export async function updateAssessmentAction(
  token: string,
  actionId: string,
  input: {
    title?: string;
    ownerRole?: string;
    dueLabel?: string;
    status?: ActionStatus;
    domainId?: AssessmentDomainId;
  },
) {
  const detail = await getAssessmentPackByToken(token);
  if (!detail) return null;

  const existing = detail.actions.find((action) => action.id === actionId);
  if (!existing) return null;

  const title =
    input.title !== undefined ? input.title.trim() : existing.title;
  if (!title) {
    throw new Error("Action title is required.");
  }

  const status = input.status ?? existing.status;
  if (!isActionStatus(status)) {
    throw new Error("Invalid action status.");
  }

  const domainId = input.domainId ?? existing.domainId;
  const now = nowIso();
  const db = await getDb();
  await db
    .prepare(
      `UPDATE assessment_actions
       SET domain_id = ?, title = ?, owner_role = ?, due_label = ?, status = ?, updated_at = ?
       WHERE id = ? AND pack_id = ?`,
    )
    .bind(
      domainId,
      title,
      input.ownerRole !== undefined
        ? input.ownerRole.trim()
        : existing.ownerRole,
      input.dueLabel !== undefined ? input.dueLabel.trim() : existing.dueLabel,
      status,
      now,
      actionId,
      detail.pack.id,
    )
    .run();

  await touchPack(detail.pack.id, now);
  return getAssessmentPackByToken(token);
}

export async function generateActionsFromGaps(token: string) {
  const detail = await getAssessmentPackByToken(token);
  if (!detail) return null;

  const gapDomains = detail.domains.filter(
    (domain) => domain.rag === "red" || domain.rag === "amber",
  );

  const toCreate = gapDomains.filter((domain) => {
    const hasOpen = detail.actions.some(
      (action) =>
        action.domainId === domain.domainId &&
        (action.status === "open" || action.status === "in_progress"),
    );
    return !hasOpen;
  });

  if (toCreate.length === 0) {
    return detail;
  }

  const now = nowIso();
  const db = await getDb();
  const stmt = db.prepare(
    `INSERT INTO assessment_actions (
      id, pack_id, domain_id, title, owner_role, due_label, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'open', ?, ?)`,
  );

  await db.batch(
    toCreate.map((domain) => {
      const catalog = ASSESSMENT_DOMAINS.find(
        (item) => item.id === domain.domainId,
      )!;
      const lead = catalog.leadId;
      const owner =
        lead === "safeguarding"
          ? "Safeguarding Lead"
          : lead === "operations"
            ? "Operations Lead"
            : lead === "premises"
              ? "Premises & Security Lead"
              : "Madrasa / Youth Lead";
      const urgency =
        domain.rag === "red" ? "This quarter" : "Next quarter";
      return stmt.bind(
        crypto.randomUUID(),
        detail.pack.id,
        domain.domainId,
        `Improve ${catalog.title} (${domain.rag.toUpperCase()})`,
        owner,
        urgency,
        now,
        now,
      );
    }),
  );

  await touchPack(detail.pack.id, now);
  return getAssessmentPackByToken(token);
}
