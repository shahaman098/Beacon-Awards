"use client";

import { useSiteCms } from "@/components/cms/SiteCmsProvider";
import {
  SectionAwardsDecor,
  SectionKicker,
} from "@/components/HomeSections";
import { CmsEditableProvider } from "@/components/visual-editor/CmsEditableContext";
import { EditableText } from "@/components/visual-editor/EditableText";
import type { PageForm } from "@/lib/pages";

type FormField = {
  label: string;
  name: string;
  type?: string;
  options?: string[];
  defaultValue?: string;
  autoComplete?: string;
};

const formConfigs: Record<
  PageForm,
  {
    actionLabel: string;
    fields: FormField[];
    messageLabel: string;
  }
> = {
  nomination: {
    actionLabel: "Submit nomination",
    fields: [
      {
        label: "Mosque name",
        name: "mosque_name",
        autoComplete: "organization",
      },
      { label: "Nominee name", name: "nominee_name", autoComplete: "name" },
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
    messageLabel: "Nomination details",
  },
  rating: {
    actionLabel: "Submit rating request",
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
    messageLabel: "Current services",
  },
  contact: {
    actionLabel: "Send message",
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
    messageLabel: "Message",
  },
};

function Field({
  field,
  form,
  fieldIndex,
  editMode,
}: {
  field: FormField;
  form: PageForm;
  fieldIndex: number;
  editMode: boolean;
}) {
  const inputId = `${field.name}-${field.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="text-sm font-semibold text-black/68">
        {editMode ? (
          <EditableText
            path={`forms.${form}.fields.${fieldIndex}.label`}
            value={field.label}
          />
        ) : (
          field.label
        )}
        <span className="ml-1 text-emerald-700" aria-hidden="true">
          *
        </span>
      </span>
      {field.options ? (
        <select
          aria-required="true"
          className="mt-2 h-12 w-full border border-black/18 bg-white px-4 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
          defaultValue={field.defaultValue ?? ""}
          id={inputId}
          name={field.name}
          required
        >
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          aria-required="true"
          autoComplete={field.autoComplete}
          className="mt-2 h-12 w-full border border-black/18 bg-white px-4 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
          defaultValue={field.defaultValue}
          id={inputId}
          name={field.name}
          required
          type={field.type ?? "text"}
        />
      )}
      {editMode && field.options ? (
        <div className="mt-2 space-y-1 rounded border border-dashed border-[#2271b1]/40 p-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#2271b1]">
            Options
          </p>
          {field.options.map((option, optionIndex) => (
            <EditableText
              as="div"
              className="text-xs text-black/70"
              key={`${option}-${optionIndex}`}
              path={`forms.${form}.fields.${fieldIndex}.options.${optionIndex}`}
              value={option}
            />
          ))}
        </div>
      ) : null}
    </label>
  );
}

export function FormSection({
  form,
  title,
  text,
  defaultCategory,
  embedSrc,
  embedHeight,
  sectionIndex,
  sourcePath,
}: {
  form: PageForm;
  title: string;
  text: string;
  defaultCategory?: string;
  embedSrc?: string;
  embedHeight?: number;
  sectionIndex: number;
  sourcePath: string;
}) {
  const basePath = `sections.${sectionIndex}`;
  const { editMode, chrome, setChromeField } = useSiteCms();
  const config = chrome.forms[form] ?? formConfigs[form];
  const fields = config.fields.map((field) =>
    field.name === "award_category" && defaultCategory
      ? { ...field, defaultValue: defaultCategory }
      : field,
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f1ed] px-5 py-20 text-black md:px-8 md:py-28">
      <SectionAwardsDecor left="Contact" right="Enquiry" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.75fr_1fr]">
        <div>
          <SectionKicker>Form</SectionKicker>
          <EditableText
            as="h2"
            className="section-word-motion mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
            path={`${basePath}.title`}
            value={title}
          />
          <EditableText
            as="p"
            className="mt-5 text-sm leading-7 text-black/58"
            multiline
            path={`${basePath}.text`}
            value={text}
          />
        </div>
        {embedSrc ? (
          <div className="border border-black/10 bg-white p-3 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <iframe
              className="w-full border-0"
              height={embedHeight ?? 700}
              src={embedSrc}
              title={title}
            />
          </div>
        ) : (
          <form
            action="/api/forms/"
            className="border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
            method="post"
          >
            <input name="form_type" type="hidden" value={form} />
            <input name="source_path" type="hidden" value={sourcePath} />
            <label className="hidden" htmlFor={`${form}-website`}>
              Website
              <input
                autoComplete="off"
                id={`${form}-website`}
                name="website"
                tabIndex={-1}
                type="text"
              />
            </label>
            <CmsEditableProvider editMode={editMode} setField={setChromeField}>
              <div className="grid gap-5 md:grid-cols-2">
                {fields.map((field, fieldIndex) => (
                  <Field
                    editMode={editMode}
                    field={field}
                    fieldIndex={fieldIndex}
                    form={form}
                    key={`${field.name}-${fieldIndex}`}
                  />
                ))}
              </div>
              <label className="mt-5 block" htmlFor={`${form}-message`}>
                <span className="text-sm font-semibold text-black/68">
                  {editMode ? (
                    <EditableText
                      path={`forms.${form}.messageLabel`}
                      value={config.messageLabel}
                    />
                  ) : (
                    config.messageLabel
                  )}
                </span>
                <textarea
                  aria-required="true"
                  className="mt-2 min-h-36 w-full border border-black/18 bg-white px-4 py-3 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
                  id={`${form}-message`}
                  name="message"
                  required
                />
              </label>
              <button
                className="mt-6 inline-flex min-h-12 items-center justify-center border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black"
                type="submit"
              >
                {editMode ? (
                  <EditableText
                    path={`forms.${form}.actionLabel`}
                    value={config.actionLabel}
                  />
                ) : (
                  config.actionLabel
                )}
              </button>
            </CmsEditableProvider>
            <p className="mt-4 text-xs leading-6 text-black/45">
              Fields marked with an asterisk are required. Your submission is
              routed through the Beacon Mosque intake workflow.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

