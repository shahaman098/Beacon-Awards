type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
};

export type CrmFormType = "contact" | "nomination" | "rating";

export type CrmFormSubmittedEvent = {
  eventType: "form.submitted";
  formType: CrmFormType;
  formLabel: string;
  sourcePath: string;
  source: string;
  fields: Record<string, string>;
};

export type CrmAssessmentStartedEvent = {
  eventType: "assessment.started";
  packId: string;
  packStatus: string;
  assessmentUrl: string;
  mosqueName: string;
  contactName: string;
  contactEmail: string;
  summary: {
    red: number;
    amber: number;
    green: number;
    unset: number;
  };
};

export type CrmAssessmentStatusChangedEvent = {
  eventType: "assessment.status_changed";
  packId: string;
  previousStatus: string;
  packStatus: string;
  assessmentUrl: string;
  mosqueName: string;
  contactName: string;
  contactEmail: string;
  summary: {
    red: number;
    amber: number;
    green: number;
    unset: number;
  };
};

export type CrmAssessmentDomainScoredEvent = {
  eventType: "assessment.domain_scored";
  packId: string;
  packStatus: string;
  domainId: string;
  domainTitle: string;
  previousRag: string;
  rag: string;
  assessmentUrl: string;
  mosqueName: string;
  contactName: string;
  contactEmail: string;
  summary: {
    red: number;
    amber: number;
    green: number;
    unset: number;
  };
};

export type CrmEvent =
  | CrmFormSubmittedEvent
  | CrmAssessmentStartedEvent
  | CrmAssessmentStatusChangedEvent
  | CrmAssessmentDomainScoredEvent;

export type CrmEventEnvelope = {
  eventType: CrmEvent["eventType"];
  eventId: string;
  occurredAt: string;
  source: string;
  contact: ContactPayload;
  tags: string[];
  payload: Record<string, unknown>;
};

const formTags: Record<CrmFormType, string[]> = {
  contact: ["beacon-website", "beacon-form-contact"],
  nomination: ["beacon-website", "beacon-nomination"],
  rating: ["beacon-website", "beacon-rating-request"],
};

function parseContactName(name: string): Pick<ContactPayload, "firstName" | "lastName"> {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function slugifyTag(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function contactFromAssessment(input: {
  mosqueName: string;
  contactName: string;
  contactEmail: string;
}): ContactPayload {
  const { firstName, lastName } = parseContactName(input.contactName);
  return {
    firstName,
    lastName,
    email: input.contactEmail.trim(),
    phone: "",
    companyName: input.mosqueName.trim(),
  };
}

function contactFromFormEvent(event: CrmFormSubmittedEvent): ContactPayload {
  const fields = event.fields;

  if (event.formType === "contact") {
    return {
      ...parseContactName(fields.name ?? ""),
      email: fields.email ?? "",
      phone: "",
      companyName: "",
    };
  }

  if (event.formType === "nomination") {
    return {
      ...parseContactName(fields.your_name ?? ""),
      email: fields.email ?? "",
      phone: "",
      companyName: fields.mosque_name ?? "",
    };
  }

  return {
    ...parseContactName(fields.primary_contact ?? ""),
    email: fields.email ?? "",
    phone: "",
    companyName: fields.mosque_name ?? "",
  };
}

function tagsForFormEvent(event: CrmFormSubmittedEvent): string[] {
  const tags = [...formTags[event.formType]];

  if (event.formType === "nomination" && event.fields.award_category) {
    tags.push(`category-${slugifyTag(event.fields.award_category)}`);
  }

  return tags;
}

export function buildCrmEnvelope(event: CrmEvent): CrmEventEnvelope {
  const base = {
    eventId: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    source: "beaconmosque.com",
  };

  if (event.eventType === "form.submitted") {
    return {
      ...base,
      eventType: event.eventType,
      contact: contactFromFormEvent(event),
      tags: tagsForFormEvent(event),
      payload: {
        formType: event.formType,
        formLabel: event.formLabel,
        sourcePath: event.sourcePath,
        source: event.source,
        fields: event.fields,
      },
    };
  }

  if (event.eventType === "assessment.started") {
    return {
      ...base,
      eventType: event.eventType,
      contact: contactFromAssessment(event),
      tags: ["beacon-website", "beacon-assessment", "programme-safeguarding"],
      payload: {
        packId: event.packId,
        packStatus: event.packStatus,
        assessmentUrl: event.assessmentUrl,
        mosqueName: event.mosqueName,
        contactName: event.contactName,
        contactEmail: event.contactEmail,
        summary: event.summary,
      },
    };
  }

  if (event.eventType === "assessment.status_changed") {
    return {
      ...base,
      eventType: event.eventType,
      contact: contactFromAssessment(event),
      tags: ["beacon-website", "beacon-assessment", "programme-safeguarding"],
      payload: {
        packId: event.packId,
        previousStatus: event.previousStatus,
        packStatus: event.packStatus,
        assessmentUrl: event.assessmentUrl,
        mosqueName: event.mosqueName,
        contactName: event.contactName,
        contactEmail: event.contactEmail,
        summary: event.summary,
      },
    };
  }

  const tags = ["beacon-website", "beacon-assessment", "programme-safeguarding"];
  if (event.rag === "red") {
    tags.push("rag-red");
  } else if (event.rag === "amber") {
    tags.push("rag-amber");
  }

  return {
    ...base,
    eventType: event.eventType,
    contact: contactFromAssessment(event),
    tags,
    payload: {
      packId: event.packId,
      packStatus: event.packStatus,
      domainId: event.domainId,
      domainTitle: event.domainTitle,
      previousRag: event.previousRag,
      rag: event.rag,
      assessmentUrl: event.assessmentUrl,
      mosqueName: event.mosqueName,
      contactName: event.contactName,
      contactEmail: event.contactEmail,
      summary: event.summary,
    },
  };
}

export function assessmentUrl(token: string, siteUrl?: string) {
  const base = (siteUrl ?? process.env.BEACON_SITE_URL ?? "https://beaconmosque.com").replace(
    /\/$/,
    "",
  );
  return `${base}/self-assessment/${token}/`;
}

export async function notifyCrm(event: CrmEvent): Promise<boolean> {
  const webhookUrl = process.env.BEACON_CRM_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  const envelope = buildCrmEnvelope(event);

  try {
    const response = await fetch(webhookUrl, {
      body: JSON.stringify(envelope),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    return response.ok;
  } catch {
    return false;
  }
}
