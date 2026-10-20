"use client";

import type {
  ActionStatus,
  AssessmentAction,
  AssessmentDomainRow,
  AssessmentPackDetail,
  PackStatus,
  RagScore,
} from "@/lib/assessment";
import {
  ASSESSMENT_DOMAINS,
  ASSESSMENT_LEADS,
  getAssessmentDomain,
  type AssessmentDomainId,
} from "@/lib/assessment-catalog";
import { useMemo, useState, useTransition } from "react";

type TabId = "overview" | "domain" | "actions" | "review" | "monitoring";

const RAG_OPTIONS: { value: RagScore; label: string }[] = [
  { value: "green", label: "Green" },
  { value: "amber", label: "Amber" },
  { value: "red", label: "Red" },
  { value: "unset", label: "Not scored" },
];

const PACK_STATUS_OPTIONS: { value: PackStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "in_review", label: "Trustee review" },
  { value: "monitoring", label: "Quarterly monitoring" },
  { value: "archived", label: "Archived" },
];

const ACTION_STATUS_OPTIONS: { value: ActionStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
];

function ragClass(rag: RagScore) {
  if (rag === "green") return "border-emerald-600/30 bg-emerald-50 text-emerald-900";
  if (rag === "amber") return "border-amber-500/40 bg-amber-50 text-amber-950";
  if (rag === "red") return "border-rose-500/35 bg-rose-50 text-rose-900";
  return "border-black/10 bg-black/[0.03] text-black/55";
}

function statusLabel(status: PackStatus) {
  return PACK_STATUS_OPTIONS.find((item) => item.value === status)?.label ?? status;
}

export function AssessmentWorkspace({
  initialDetail,
}: {
  initialDetail: AssessmentPackDetail;
}) {
  const [detail, setDetail] = useState(initialDetail);
  const [tab, setTab] = useState<TabId>("overview");
  const [activeDomainId, setActiveDomainId] = useState<AssessmentDomainId>(
    ASSESSMENT_DOMAINS[0].id,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const token = detail.pack.accessToken;
  const activeDomain = getAssessmentDomain(activeDomainId)!;
  const activeRow =
    detail.domains.find((domain) => domain.domainId === activeDomainId) ??
    ({
      packId: detail.pack.id,
      domainId: activeDomainId,
      rag: "unset",
      evidenceNotes: "",
      checklistIds: [],
      updatedAt: detail.pack.updatedAt,
    } satisfies AssessmentDomainRow);

  const openActions = useMemo(
    () =>
      detail.actions.filter(
        (action) => action.status === "open" || action.status === "in_progress",
      ),
    [detail.actions],
  );

  function applyDetail(next: AssessmentPackDetail) {
    setDetail(next);
  }

  async function apiJson(url: string, init?: RequestInit) {
    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
    const data = (await response.json()) as AssessmentPackDetail & {
      error?: string;
    };
    if (!response.ok) {
      throw new Error(data.error ?? "Request failed.");
    }
    return data;
  }

  function run(label: string, work: () => Promise<AssessmentPackDetail>) {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        const next = await work();
        applyDetail(next);
        setMessage(label);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  function openDomain(domainId: AssessmentDomainId) {
    setActiveDomainId(domainId);
    setTab("domain");
  }

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="flex flex-col gap-4 border-b border-black/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-800">
            {statusLabel(detail.pack.status)}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-black md:text-4xl">
            {detail.pack.mosqueName}
          </h1>
          <p className="mt-2 text-sm text-black/55">
            Private pack link — share only with trustees and lead roles.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {(
            [
              ["Green", detail.summary.green, "green"],
              ["Amber", detail.summary.amber, "amber"],
              ["Red", detail.summary.red, "red"],
              ["Unset", detail.summary.unset, "unset"],
            ] as const
          ).map(([label, count, rag]) => (
            <div
              className={`border px-3 py-3 ${ragClass(rag)}`}
              key={label}
            >
              <p className="text-2xl font-semibold tracking-[-0.04em]">{count}</p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["overview", "Overview"],
            ["domain", "Domain scoring"],
            ["actions", "Action plan"],
            ["review", "Trustee review"],
            ["monitoring", "Monitoring"],
          ] as const
        ).map(([id, label]) => (
          <button
            className={[
              "inline-flex min-h-10 items-center border px-4 text-xs font-semibold uppercase tracking-[0.14em] transition",
              tab === id
                ? "border-black bg-black text-white"
                : "border-black/15 bg-white text-black/70 hover:border-black",
            ].join(" ")}
            key={id}
            onClick={() => setTab(id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {(message || error) && (
        <p
          className={[
            "mt-5 border px-4 py-3 text-sm",
            error
              ? "border-rose-200 bg-rose-50 text-rose-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-900",
          ].join(" ")}
        >
          {error ?? message}
          {pending ? " Saving…" : null}
        </p>
      )}

      {tab === "overview" ? (
        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {ASSESSMENT_LEADS.map((lead) => (
            <article
              className="border border-black/10 bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.04)]"
              key={lead.id}
            >
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-black">
                {lead.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-black/60">{lead.summary}</p>
              <ul className="mt-5 space-y-2">
                {lead.domainIds.map((domainId) => {
                  const domain = getAssessmentDomain(domainId)!;
                  const row = detail.domains.find((item) => item.domainId === domainId);
                  const rag = row?.rag ?? "unset";
                  return (
                    <li key={domainId}>
                      <button
                        className="flex w-full items-center justify-between gap-3 border border-black/8 bg-[#faf9f6] px-3 py-3 text-left transition hover:border-black/25"
                        onClick={() => openDomain(domainId)}
                        type="button"
                      >
                        <span className="text-sm font-medium text-black">
                          {domain.title}
                        </span>
                        <span
                          className={`inline-flex min-w-16 justify-center border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${ragClass(rag)}`}
                        >
                          {rag}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </section>
      ) : null}

      {tab === "domain" ? (
        <DomainScorePanel
          key={`${activeRow.domainId}:${activeRow.updatedAt}`}
          disabled={pending}
          onSelectDomain={setActiveDomainId}
          onSave={(payload) =>
            run("Domain saved.", () =>
              apiJson(`/api/assessment/packs/${token}/domains/${activeDomainId}/`, {
                method: "PATCH",
                body: JSON.stringify(payload),
              }),
            )
          }
          row={activeRow}
          title={activeDomain.title}
          checklist={activeDomain.checklist}
          summary={activeDomain.summary}
          domains={detail.domains}
          activeDomainId={activeDomainId}
        />
      ) : null}

      {tab === "actions" ? (
        <ActionPlanPanel
          actions={detail.actions}
          disabled={pending}
          onCreate={(payload) =>
            run("Action added.", () =>
              apiJson(`/api/assessment/packs/${token}/actions/`, {
                method: "POST",
                body: JSON.stringify(payload),
              }),
            )
          }
          onGenerate={() =>
            run("Actions generated from Red/Amber gaps.", () =>
              apiJson(`/api/assessment/packs/${token}/actions/`, {
                method: "POST",
                body: JSON.stringify({ generateFromGaps: true }),
              }),
            )
          }
          onUpdate={(payload) =>
            run("Action updated.", () =>
              apiJson(`/api/assessment/packs/${token}/actions/`, {
                method: "PATCH",
                body: JSON.stringify(payload),
              }),
            )
          }
        />
      ) : null}

      {tab === "review" ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-black/10 bg-white p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">
              Trustee review snapshot
            </h2>
            <p className="mt-2 text-sm leading-6 text-black/60">
              Overall RAG across twelve domains, with open actions for board
              scrutiny.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["Green", detail.summary.green],
                  ["Amber", detail.summary.amber],
                  ["Red", detail.summary.red],
                  ["Unset", detail.summary.unset],
                ] as const
              ).map(([label, count]) => (
                <div className="border border-black/10 bg-[#faf9f6] px-4 py-3" key={label}>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-black/45">
                    {label}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold">{count}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-black/50">
                Open actions ({openActions.length})
              </h3>
              <ul className="mt-3 space-y-2">
                {openActions.length === 0 ? (
                  <li className="text-sm text-black/55">No open actions.</li>
                ) : (
                  openActions.map((action) => (
                    <li
                      className="border border-black/8 bg-[#faf9f6] px-3 py-3 text-sm"
                      key={action.id}
                    >
                      <p className="font-medium text-black">{action.title}</p>
                      <p className="mt-1 text-black/55">
                        {getAssessmentDomain(action.domainId)?.title} ·{" "}
                        {action.ownerRole || "Unassigned"} ·{" "}
                        {action.dueLabel || "No due date"}
                      </p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          <div className="border border-black/10 bg-[#f3f1ed] p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">Pack status</h2>
            <p className="mt-2 text-sm leading-6 text-black/60">
              Move the pack from draft into trustee review, then quarterly
              monitoring.
            </p>
            <label className="mt-5 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black/55">
              Status
              <select
                className="mt-2 h-12 w-full border border-black/18 bg-white px-4 text-sm text-black"
                disabled={pending}
                onChange={(event) =>
                  run("Pack status updated.", () =>
                    apiJson(`/api/assessment/packs/${token}/`, {
                      method: "PATCH",
                      body: JSON.stringify({
                        status: event.target.value as PackStatus,
                      }),
                    }),
                  )
                }
                value={detail.pack.status}
              >
                {PACK_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-5 text-sm text-black/60">
              <p>
                Contact: {detail.pack.contactName || "—"}
                {detail.pack.contactEmail
                  ? ` · ${detail.pack.contactEmail}`
                  : ""}
              </p>
              <p className="mt-2">
                Updated{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(detail.pack.updatedAt))}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {tab === "monitoring" ? (
        <section className="mt-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.03em]">
                Quarterly monitoring
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
                Track open and in-progress actions each quarter. Mark items done
                as evidence is completed.
              </p>
            </div>
            <p className="text-sm font-medium text-black/70">
              {openActions.length} active ·{" "}
              {detail.actions.filter((action) => action.status === "done").length}{" "}
              done
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {detail.actions.length === 0 ? (
              <li className="border border-dashed border-black/15 px-5 py-8 text-center text-sm text-black/55">
                No actions yet. Generate them from Red/Amber domains on the Action
                plan tab.
              </li>
            ) : (
              detail.actions.map((action) => (
                <li
                  className="flex flex-col gap-3 border border-black/10 bg-white p-4 md:flex-row md:items-center md:justify-between"
                  key={action.id}
                >
                  <div>
                    <p className="font-medium text-black">{action.title}</p>
                    <p className="mt-1 text-sm text-black/55">
                      {getAssessmentDomain(action.domainId)?.title} ·{" "}
                      {action.ownerRole || "Unassigned"} ·{" "}
                      {action.dueLabel || "No due date"}
                    </p>
                  </div>
                  <select
                    className="h-11 border border-black/18 bg-white px-3 text-sm"
                    disabled={pending}
                    onChange={(event) =>
                      run("Action status updated.", () =>
                        apiJson(`/api/assessment/packs/${token}/actions/`, {
                          method: "PATCH",
                          body: JSON.stringify({
                            actionId: action.id,
                            status: event.target.value as ActionStatus,
                          }),
                        }),
                      )
                    }
                    value={action.status}
                  >
                    {ACTION_STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </li>
              ))
            )}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function DomainScorePanel({
  activeDomainId,
  title,
  summary,
  checklist,
  row,
  domains,
  disabled,
  onSelectDomain,
  onSave,
}: {
  activeDomainId: AssessmentDomainId;
  title: string;
  summary: string;
  checklist: { id: string; label: string }[];
  row: AssessmentDomainRow;
  domains: AssessmentDomainRow[];
  disabled: boolean;
  onSelectDomain: (domainId: AssessmentDomainId) => void;
  onSave: (payload: {
    rag: RagScore;
    evidenceNotes: string;
    checklistIds: string[];
  }) => void;
}) {
  const [rag, setRag] = useState<RagScore>(row.rag);
  const [notes, setNotes] = useState(row.evidenceNotes);
  const [checked, setChecked] = useState<string[]>(row.checklistIds);

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="border border-black/10 bg-[#faf9f6] p-3">
        <p className="px-2 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-black/45">
          Domains
        </p>
        <ul className="space-y-1">
          {ASSESSMENT_DOMAINS.map((domain) => {
            const domainRag =
              domains.find((item) => item.domainId === domain.id)?.rag ?? "unset";
            return (
              <li key={domain.id}>
                <button
                  className={[
                    "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition",
                    domain.id === activeDomainId
                      ? "bg-black text-white"
                      : "text-black/70 hover:bg-black/5",
                  ].join(" ")}
                  onClick={() => onSelectDomain(domain.id)}
                  type="button"
                >
                  <span>{domain.title}</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.1em] opacity-70">
                    {domainRag === "unset" ? "—" : domainRag[0]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="border border-black/10 bg-white p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-black/60">{summary}</p>

        <div className="mt-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black/55">
            RAG score
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {RAG_OPTIONS.map((option) => (
              <button
                className={[
                  "min-h-10 border px-4 text-xs font-semibold uppercase tracking-[0.14em]",
                  rag === option.value
                    ? ragClass(option.value) + " border-black/30"
                    : "border-black/12 bg-white text-black/60",
                ].join(" ")}
                key={option.value}
                onClick={() => setRag(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black/55">
            Evidence checklist
          </p>
          <ul className="mt-3 space-y-2">
            {checklist.map((item) => {
              const isChecked = checked.includes(item.id);
              return (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-start gap-3 border border-black/8 bg-[#faf9f6] px-3 py-3 text-sm">
                    <input
                      checked={isChecked}
                      className="mt-1"
                      onChange={() =>
                        setChecked((current) =>
                          isChecked
                            ? current.filter((id) => id !== item.id)
                            : [...current, item.id],
                        )
                      }
                      type="checkbox"
                    />
                    <span>{item.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6">
          <label
            className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black/55"
            htmlFor="evidenceNotes"
          >
            Evidence notes
          </label>
          <textarea
            className="mt-2 min-h-32 w-full border border-black/18 bg-white px-4 py-3 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-gold-300/35"
            id="evidenceNotes"
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Policies, dates, locations of records, gaps to close…"
            value={notes}
          />
        </div>

        <button
          className="mt-6 inline-flex min-h-12 items-center justify-center border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black disabled:opacity-50"
          disabled={disabled}
          onClick={() =>
            onSave({
              rag,
              evidenceNotes: notes,
              checklistIds: checked,
            })
          }
          type="button"
        >
          Save domain
        </button>
      </div>
    </section>
  );
}

function ActionPlanPanel({
  actions,
  disabled,
  onGenerate,
  onCreate,
  onUpdate,
}: {
  actions: AssessmentAction[];
  disabled: boolean;
  onGenerate: () => void;
  onCreate: (payload: {
    domainId: AssessmentDomainId;
    title: string;
    ownerRole: string;
    dueLabel: string;
  }) => void;
  onUpdate: (payload: {
    actionId: string;
    status?: ActionStatus;
    ownerRole?: string;
    dueLabel?: string;
    title?: string;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [domainId, setDomainId] = useState<AssessmentDomainId>(
    ASSESSMENT_DOMAINS[0].id,
  );
  const [ownerRole, setOwnerRole] = useState("");
  const [dueLabel, setDueLabel] = useState("");

  return (
    <section className="mt-8 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.03em]">Action plan</h2>
          <p className="mt-2 text-sm leading-6 text-black/60">
            Seed actions from Red and Amber domains, then assign owners and due
            windows.
          </p>
        </div>
        <button
          className="inline-flex min-h-11 items-center justify-center border border-black/80 bg-white px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white disabled:opacity-50"
          disabled={disabled}
          onClick={onGenerate}
          type="button"
        >
          Generate from Red / Amber
        </button>
      </div>

      <form
        className="grid gap-3 border border-black/10 bg-[#faf9f6] p-4 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          onCreate({ domainId, title, ownerRole, dueLabel });
          setTitle("");
          setOwnerRole("");
          setDueLabel("");
        }}
      >
        <input
          className="h-11 border border-black/18 bg-white px-3 text-sm"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Action title"
          required
          value={title}
        />
        <select
          className="h-11 border border-black/18 bg-white px-3 text-sm"
          onChange={(event) =>
            setDomainId(event.target.value as AssessmentDomainId)
          }
          value={domainId}
        >
          {ASSESSMENT_DOMAINS.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.title}
            </option>
          ))}
        </select>
        <input
          className="h-11 border border-black/18 bg-white px-3 text-sm"
          onChange={(event) => setOwnerRole(event.target.value)}
          placeholder="Owner role"
          value={ownerRole}
        />
        <input
          className="h-11 border border-black/18 bg-white px-3 text-sm"
          onChange={(event) => setDueLabel(event.target.value)}
          placeholder="Due (e.g. This quarter)"
          value={dueLabel}
        />
        <button
          className="inline-flex h-11 items-center justify-center border border-black bg-black px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white disabled:opacity-50"
          disabled={disabled}
          type="submit"
        >
          Add
        </button>
      </form>

      <ul className="space-y-3">
        {actions.length === 0 ? (
          <li className="border border-dashed border-black/15 px-5 py-8 text-center text-sm text-black/55">
            No actions yet.
          </li>
        ) : (
          actions.map((action) => (
            <li
              className="grid gap-3 border border-black/10 bg-white p-4 md:grid-cols-[1.4fr_1fr_1fr_140px]"
              key={action.id}
            >
              <div>
                <p className="font-medium text-black">{action.title}</p>
                <p className="mt-1 text-sm text-black/55">
                  {getAssessmentDomain(action.domainId)?.title}
                </p>
              </div>
              <input
                className="h-11 border border-black/18 bg-white px-3 text-sm"
                defaultValue={action.ownerRole}
                disabled={disabled}
                onBlur={(event) => {
                  if (event.target.value !== action.ownerRole) {
                    onUpdate({
                      actionId: action.id,
                      ownerRole: event.target.value,
                    });
                  }
                }}
                placeholder="Owner"
              />
              <input
                className="h-11 border border-black/18 bg-white px-3 text-sm"
                defaultValue={action.dueLabel}
                disabled={disabled}
                onBlur={(event) => {
                  if (event.target.value !== action.dueLabel) {
                    onUpdate({
                      actionId: action.id,
                      dueLabel: event.target.value,
                    });
                  }
                }}
                placeholder="Due"
              />
              <select
                className="h-11 border border-black/18 bg-white px-3 text-sm"
                disabled={disabled}
                onChange={(event) =>
                  onUpdate({
                    actionId: action.id,
                    status: event.target.value as ActionStatus,
                  })
                }
                value={action.status}
              >
                {ACTION_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
