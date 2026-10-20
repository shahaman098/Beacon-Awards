export type AssessmentLeadId =
  | "safeguarding"
  | "operations"
  | "premises"
  | "madrasa";

export type AssessmentDomainId =
  | "policies"
  | "incidents"
  | "training"
  | "programmes"
  | "volunteers"
  | "comms"
  | "site"
  | "access"
  | "hate"
  | "madrasa"
  | "youth"
  | "pastoral";

export type ChecklistItem = {
  id: string;
  label: string;
};

export type AssessmentDomain = {
  id: AssessmentDomainId;
  title: string;
  leadId: AssessmentLeadId;
  summary: string;
  checklist: ChecklistItem[];
};

export type AssessmentLead = {
  id: AssessmentLeadId;
  title: string;
  summary: string;
  domainIds: AssessmentDomainId[];
};

export const ASSESSMENT_LEADS: AssessmentLead[] = [
  {
    id: "safeguarding",
    title: "Safeguarding Lead",
    summary:
      "Policies, incident handling and safer recruitment for everyone who uses the mosque.",
    domainIds: ["policies", "incidents", "training"],
  },
  {
    id: "operations",
    title: "Operations Lead",
    summary:
      "Programmes, people and records that keep day-to-day delivery accountable.",
    domainIds: ["programmes", "volunteers", "comms"],
  },
  {
    id: "premises",
    title: "Premises & Security Lead",
    summary:
      "Site safety, access control and protective security for worshippers and visitors.",
    domainIds: ["site", "access", "hate"],
  },
  {
    id: "madrasa",
    title: "Madrasa / Youth Lead",
    summary:
      "Education, youth activities and pastoral support with clear safeguarding practice.",
    domainIds: ["madrasa", "youth", "pastoral"],
  },
];

export const ASSESSMENT_DOMAINS: AssessmentDomain[] = [
  {
    id: "policies",
    title: "Policies & Procedures",
    leadId: "safeguarding",
    summary:
      "Written safeguarding and related policies that trustees, staff and volunteers can follow.",
    checklist: [
      { id: "policies-adopted", label: "Safeguarding policy adopted by trustees" },
      { id: "policies-reviewed", label: "Policies reviewed within the last 12 months" },
      { id: "policies-accessible", label: "Policies accessible to staff and volunteers" },
      { id: "policies-code", label: "Code of conduct for adults working with children/adults at risk" },
    ],
  },
  {
    id: "incidents",
    title: "Incident Reporting & Escalation",
    leadId: "safeguarding",
    summary:
      "Clear routes to report concerns, escalate risk and record what happened.",
    checklist: [
      { id: "incidents-route", label: "Named reporting route and escalation path" },
      { id: "incidents-log", label: "Incident / concern log in use" },
      { id: "incidents-contacts", label: "Local authority / LADO contacts available" },
      { id: "incidents-lessons", label: "Lessons learned after serious incidents" },
    ],
  },
  {
    id: "training",
    title: "Training & Safer Recruitment",
    leadId: "safeguarding",
    summary:
      "Induction, safeguarding training and safer recruitment checks for roles that need them.",
    checklist: [
      { id: "training-induction", label: "Safeguarding induction for new starters" },
      { id: "training-refresh", label: "Refresher training schedule in place" },
      { id: "training-dbs", label: "DBS / vetting checks for eligible roles" },
      { id: "training-references", label: "References taken for roles working with children" },
    ],
  },
  {
    id: "programmes",
    title: "Programmes & Events",
    leadId: "operations",
    summary:
      "Risk-aware planning for regular programmes and one-off community events.",
    checklist: [
      { id: "programmes-risk", label: "Risk assessments for regular programmes" },
      { id: "programmes-events", label: "Event planning checklist used for large gatherings" },
      { id: "programmes-ratios", label: "Registers kept for children / vulnerable users" },
      { id: "programmes-brief", label: "Briefings for volunteers before events" },
    ],
  },
  {
    id: "volunteers",
    title: "Volunteers & Staff",
    leadId: "operations",
    summary:
      "Role clarity, supervision and wellbeing for paid staff and volunteers.",
    checklist: [
      { id: "volunteers-roles", label: "Written role descriptions" },
      { id: "volunteers-supervision", label: "Named supervisor / line contact" },
      { id: "volunteers-rota", label: "Rota and cover arrangements documented" },
      { id: "volunteers-concerns", label: "Route for staff/volunteer concerns" },
    ],
  },
  {
    id: "comms",
    title: "Communications & Records",
    leadId: "operations",
    summary:
      "Clear communication channels and secure handling of personal data and records.",
    checklist: [
      { id: "comms-channels", label: "Trusted channels for community updates" },
      { id: "comms-privacy", label: "Privacy notice / data handling basics in place" },
      { id: "comms-records", label: "Records retained and stored securely" },
      { id: "comms-photos", label: "Consent practice for photos and publicity" },
    ],
  },
  {
    id: "site",
    title: "Site Safety",
    leadId: "premises",
    summary:
      "Fire, first aid, maintenance and everyday site hazards managed systematically.",
    checklist: [
      { id: "site-fire", label: "Fire risk assessment and drills current" },
      { id: "site-first-aid", label: "First aid kits and trained first aiders" },
      { id: "site-hazards", label: "Hazard reporting and maintenance log" },
      { id: "site-evacuation", label: "Evacuation plan known to key volunteers" },
    ],
  },
  {
    id: "access",
    title: "Access Control / CCTV / Large Events",
    leadId: "premises",
    summary:
      "Who can enter, how CCTV is used, and how crowds are managed safely.",
    checklist: [
      { id: "access-entry", label: "Entry control during busy prayer times" },
      { id: "access-cctv", label: "CCTV policy and retention understood" },
      { id: "access-stewards", label: "Stewards identified for large events" },
      { id: "access-keys", label: "Key / access fob register maintained" },
    ],
  },
  {
    id: "hate",
    title: "Hate Crime / Protective Security",
    leadId: "premises",
    summary:
      "Preparedness for hate crime, suspicious activity and protective security measures.",
    checklist: [
      { id: "hate-reporting", label: "Hate crime reporting guidance available" },
      { id: "hate-contacts", label: "Police / security contacts listed" },
      { id: "hate-walkrounds", label: "Periodic security walk-rounds recorded" },
      { id: "hate-briefings", label: "Staff briefed on suspicious behaviour response" },
    ],
  },
  {
    id: "madrasa",
    title: "Madrasa",
    leadId: "madrasa",
    summary:
      "Safe Islamic education with clear ratios, registers and classroom expectations.",
    checklist: [
      { id: "madrasa-register", label: "Attendance register for each session" },
      { id: "madrasa-ratios", label: "Adult-to-child ratios defined" },
      { id: "madrasa-pickup", label: "Collection / pickup arrangements clear" },
      { id: "madrasa-behaviour", label: "Behaviour expectations shared with families" },
    ],
  },
  {
    id: "youth",
    title: "Youth Activities",
    leadId: "madrasa",
    summary:
      "Youth programmes planned with safeguarding, consent and supervision in mind.",
    checklist: [
      { id: "youth-consent", label: "Parental consent for off-site / overnight activities" },
      { id: "youth-supervision", label: "Adequate adult supervision on activities" },
      { id: "youth-risk", label: "Activity risk assessments completed" },
      { id: "youth-social", label: "Social media / messaging boundaries agreed" },
    ],
  },
  {
    id: "pastoral",
    title: "Pastoral / One-to-One Support",
    leadId: "madrasa",
    summary:
      "One-to-one and pastoral conversations conducted safely and appropriately.",
    checklist: [
      { id: "pastoral-visibility", label: "One-to-one meetings in visible / open settings" },
      { id: "pastoral-boundaries", label: "Boundaries guidance for pastoral workers" },
      { id: "pastoral-referrals", label: "Referral path when needs exceed mosque capacity" },
      { id: "pastoral-notes", label: "Proportionate notes kept when required" },
    ],
  },
];

export function getAssessmentDomain(domainId: string) {
  return ASSESSMENT_DOMAINS.find((domain) => domain.id === domainId) ?? null;
}

export function getAssessmentLead(leadId: string) {
  return ASSESSMENT_LEADS.find((lead) => lead.id === leadId) ?? null;
}

export function domainsForLead(leadId: AssessmentLeadId) {
  return ASSESSMENT_DOMAINS.filter((domain) => domain.leadId === leadId);
}

export function isAssessmentDomainId(value: string): value is AssessmentDomainId {
  return ASSESSMENT_DOMAINS.some((domain) => domain.id === value);
}
