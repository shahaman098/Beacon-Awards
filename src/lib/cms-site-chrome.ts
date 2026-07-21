import { mainNav, type NavItem } from "@/lib/content";
import type { PageForm } from "@/lib/pages";

export const SITE_CHROME_ID = "site-chrome";

export type SiteChromeNavItem = {
  label: string;
  href: string;
};

export type SiteChromeFormField = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  options?: string[];
  defaultValue?: string;
};

export type SiteChromeFormConfig = {
  actionLabel: string;
  messageLabel: string;
  fields: SiteChromeFormField[];
};

export type SiteChromeFormSubmittedCopy = {
  receivedTitle: string;
  receivedText: string;
  missingTitle: string;
  missingText: string;
  invalidTitle: string;
  invalidText: string;
  deliveryErrorTitle: string;
  deliveryErrorText: string;
  returnHomeLabel: string;
  returnFormLabel: string;
};

export type SiteChrome = {
  mainNav: SiteChromeNavItem[];
  footerNav: SiteChromeNavItem[];
  ctaLabel: string;
  ctaHref: string;
  footerEmail: string;
  formSubmitted: SiteChromeFormSubmittedCopy;
  forms: Record<PageForm, SiteChromeFormConfig>;
};

export function defaultSiteChrome(): SiteChrome {
  return {
    mainNav: mainNav.map((item) => ({ label: item.label, href: item.href })),
    footerNav: mainNav
      .filter((item) => item.href !== "/")
      .slice(0, 5)
      .map((item) => ({ label: item.label, href: item.href })),
    ctaLabel: "Let's talk",
    ctaHref: "/contact-us/",
    footerEmail: "info@faithassociates.co.uk",
    formSubmitted: {
      receivedTitle: "Submission received",
      receivedText: "Thank you. Your details have been received by Beacon Mosque.",
      missingTitle: "Please complete the form",
      missingText:
        "One or more required fields were missing. Please go back and complete every field before submitting.",
      invalidTitle: "Submission could not be processed",
      invalidText:
        "The form type was not recognised. Please return to the relevant page and try again.",
      deliveryErrorTitle: "Submission delivery failed",
      deliveryErrorText:
        "The form was submitted, but the configured intake endpoint did not accept it. Please try again or contact Beacon Mosque directly.",
      returnHomeLabel: "Return home",
      returnFormLabel: "Return to form",
    },
    forms: {
      nomination: {
        actionLabel: "Submit nomination",
        messageLabel: "Nomination details",
        fields: [
          {
            label: "Mosque name",
            name: "mosque_name",
            autoComplete: "organization",
          },
          {
            label: "Nominee name",
            name: "nominee_name",
            autoComplete: "name",
          },
          {
            label: "Award category",
            name: "award_category",
            options: [
              "Best Run Mosque",
              "Best Youth Service",
              "Best Madrassah Service",
              "Best Women's Service",
              "Most Impactful Imam",
              "Best Convert Support Service",
              "Most Impactful Alimah",
              "Best Outreach Services",
              "Best Future Design",
              "Best Mosque Volunteer",
            ],
          },
          { label: "Your name", name: "your_name", autoComplete: "name" },
          {
            label: "Email address",
            name: "email",
            type: "email",
            autoComplete: "email",
          },
        ],
      },
      rating: {
        actionLabel: "Submit rating request",
        messageLabel: "Current services",
        fields: [
          {
            label: "Mosque name",
            name: "mosque_name",
            autoComplete: "organization",
          },
          { label: "City", name: "city", autoComplete: "address-level2" },
          {
            label: "Primary contact",
            name: "primary_contact",
            autoComplete: "name",
          },
          {
            label: "Email address",
            name: "email",
            type: "email",
            autoComplete: "email",
          },
          {
            label: "Current star rating",
            name: "current_rating",
            options: ["Not yet accredited", "3 Star", "4 Star", "5 Star"],
          },
        ],
      },
      contact: {
        actionLabel: "Send message",
        messageLabel: "Message",
        fields: [
          { label: "Name", name: "name", autoComplete: "name" },
          {
            label: "Email address",
            name: "email",
            type: "email",
            autoComplete: "email",
          },
          { label: "Subject", name: "subject" },
        ],
      },
    },
  };
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function mergeNavItems(
  raw: unknown,
  defaults: SiteChromeNavItem[],
): SiteChromeNavItem[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaults;
  return raw.map((item, index) => {
    const fallback = defaults[index] ?? defaults[0] ?? { label: "Link", href: "/" };
    const row =
      item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      label: asString(row.label, fallback.label),
      href: asString(row.href, fallback.href),
    };
  });
}

function mergeFormFields(
  raw: unknown,
  defaults: SiteChromeFormField[],
): SiteChromeFormField[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaults;
  return raw.map((item, index) => {
    const fallback = defaults[index] ?? defaults[0];
    const row =
      item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const options = Array.isArray(row.options)
      ? row.options.filter((option): option is string => typeof option === "string")
      : fallback.options;
    return {
      label: asString(row.label, fallback.label),
      name: asString(row.name, fallback.name),
      type: typeof row.type === "string" ? row.type : fallback.type,
      autoComplete:
        typeof row.autoComplete === "string"
          ? row.autoComplete
          : fallback.autoComplete,
      options,
      defaultValue:
        typeof row.defaultValue === "string"
          ? row.defaultValue
          : fallback.defaultValue,
    };
  });
}

function mergeFormConfig(
  raw: unknown,
  defaults: SiteChromeFormConfig,
): SiteChromeFormConfig {
  const row =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    actionLabel: asString(row.actionLabel, defaults.actionLabel),
    messageLabel: asString(row.messageLabel, defaults.messageLabel),
    fields: mergeFormFields(row.fields, defaults.fields),
  };
}

function mergeFormSubmitted(
  raw: unknown,
  defaults: SiteChromeFormSubmittedCopy,
): SiteChromeFormSubmittedCopy {
  const row =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    receivedTitle: asString(row.receivedTitle, defaults.receivedTitle),
    receivedText: asString(row.receivedText, defaults.receivedText),
    missingTitle: asString(row.missingTitle, defaults.missingTitle),
    missingText: asString(row.missingText, defaults.missingText),
    invalidTitle: asString(row.invalidTitle, defaults.invalidTitle),
    invalidText: asString(row.invalidText, defaults.invalidText),
    deliveryErrorTitle: asString(
      row.deliveryErrorTitle,
      defaults.deliveryErrorTitle,
    ),
    deliveryErrorText: asString(
      row.deliveryErrorText,
      defaults.deliveryErrorText,
    ),
    returnHomeLabel: asString(row.returnHomeLabel, defaults.returnHomeLabel),
    returnFormLabel: asString(row.returnFormLabel, defaults.returnFormLabel),
  };
}

export function mergeSiteChrome(partial: unknown): SiteChrome {
  const defaults = defaultSiteChrome();
  if (!partial || typeof partial !== "object") return defaults;
  const raw = partial as Record<string, unknown>;
  const formsRaw =
    raw.forms && typeof raw.forms === "object"
      ? (raw.forms as Record<string, unknown>)
      : {};

  return {
    mainNav: mergeNavItems(raw.mainNav, defaults.mainNav),
    footerNav: mergeNavItems(raw.footerNav, defaults.footerNav),
    ctaLabel: asString(raw.ctaLabel, defaults.ctaLabel),
    ctaHref: asString(raw.ctaHref, defaults.ctaHref),
    footerEmail: asString(raw.footerEmail, defaults.footerEmail),
    formSubmitted: mergeFormSubmitted(raw.formSubmitted, defaults.formSubmitted),
    forms: {
      nomination: mergeFormConfig(formsRaw.nomination, defaults.forms.nomination),
      rating: mergeFormConfig(formsRaw.rating, defaults.forms.rating),
      contact: mergeFormConfig(formsRaw.contact, defaults.forms.contact),
    },
  };
}

export function setSiteChromeField(
  chrome: SiteChrome,
  path: string,
  value: string,
): SiteChrome {
  const next = structuredClone(chrome);
  const parts = path.split(".");

  if (parts[0] === "ctaLabel") {
    next.ctaLabel = value;
    return next;
  }
  if (parts[0] === "ctaHref") {
    next.ctaHref = value;
    return next;
  }
  if (parts[0] === "footerEmail") {
    next.footerEmail = value;
    return next;
  }

  if (parts[0] === "formSubmitted" && parts[1]) {
    const key = parts[1] as keyof SiteChromeFormSubmittedCopy;
    if (key in next.formSubmitted) {
      next.formSubmitted[key] = value;
    }
    return next;
  }

  if (
    (parts[0] === "mainNav" || parts[0] === "footerNav") &&
    parts[1] === "__add__"
  ) {
    next[parts[0]].push({ label: "New link", href: "/" });
    return next;
  }

  if (
    (parts[0] === "mainNav" || parts[0] === "footerNav") &&
    parts[1] === "__remove__" &&
    parts[2]
  ) {
    const index = Number.parseInt(parts[2], 10);
    if (Number.isFinite(index) && next[parts[0]][index]) {
      next[parts[0]].splice(index, 1);
    }
    return next;
  }

  if (
    (parts[0] === "mainNav" || parts[0] === "footerNav") &&
    parts[1] &&
    parts[2]
  ) {
    const list = next[parts[0]];
    const index = Number.parseInt(parts[1], 10);
    if (Number.isFinite(index) && list[index]) {
      if (parts[2] === "label" || parts[2] === "href") {
        list[index][parts[2]] = value;
      }
    }
    return next;
  }

  if (parts[0] === "forms" && parts[1] && parts[2]) {
    const formKey = parts[1] as PageForm;
    if (!next.forms[formKey]) return next;
    if (parts[2] === "actionLabel" || parts[2] === "messageLabel") {
      next.forms[formKey][parts[2]] = value;
      return next;
    }
    if (parts[2] === "fields" && parts[3] && parts[4]) {
      const index = Number.parseInt(parts[3], 10);
      const field = next.forms[formKey].fields[index];
      if (!field) return next;
      if (parts[4] === "label" || parts[4] === "name") {
        field[parts[4]] = value;
      } else if (parts[4] === "options" && parts[5]) {
        const optionIndex = Number.parseInt(parts[5], 10);
        if (field.options && Number.isFinite(optionIndex)) {
          field.options[optionIndex] = value;
        }
      }
    }
  }

  return next;
}

export function toNavItems(items: SiteChromeNavItem[]): NavItem[] {
  return items.map((item) => ({ label: item.label, href: item.href }));
}
