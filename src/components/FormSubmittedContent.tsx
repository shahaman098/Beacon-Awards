"use client";

import Link from "@/components/AppLink";
import { useSiteCms } from "@/components/cms/SiteCmsProvider";
import { CmsEditableProvider } from "@/components/visual-editor/CmsEditableContext";
import { EditableText } from "@/components/visual-editor/EditableText";
import type { SiteChromeFormSubmittedCopy } from "@/lib/cms-site-chrome";

const formNames: Record<string, string> = {
  contact: "message",
  nomination: "nomination",
  rating: "rating request",
};

type StatusKey = "received" | "missing" | "invalid" | "delivery-error";

function statusPaths(status: StatusKey): {
  titlePath: keyof SiteChromeFormSubmittedCopy;
  textPath: keyof SiteChromeFormSubmittedCopy;
} {
  switch (status) {
    case "missing":
      return { titlePath: "missingTitle", textPath: "missingText" };
    case "invalid":
      return { titlePath: "invalidTitle", textPath: "invalidText" };
    case "delivery-error":
      return {
        titlePath: "deliveryErrorTitle",
        textPath: "deliveryErrorText",
      };
    default:
      return { titlePath: "receivedTitle", textPath: "receivedText" };
  }
}

export function FormSubmittedContent({
  form,
  returnTo,
  status,
}: {
  form?: string;
  returnTo: string;
  status: string;
}) {
  const { editMode, chrome, setChromeField } = useSiteCms();
  const copy = chrome.formSubmitted;
  const statusKey = (
    ["received", "missing", "invalid", "delivery-error"].includes(status)
      ? status
      : "received"
  ) as StatusKey;
  const { titlePath, textPath } = statusPaths(statusKey);
  const formName = formNames[form ?? ""] ?? "submission";

  return (
    <CmsEditableProvider editMode={editMode} setField={setChromeField}>
      <main className="pattern-dark flex min-h-[62vh] items-center bg-[linear-gradient(135deg,#071524,#063f35)] px-5 py-20 text-white md:px-8">
        <section className="mx-auto max-w-[820px] text-center">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-gold-200/50 bg-white/10 text-2xl font-semibold text-gold-200">
            BM
          </div>
          <p className="text-sm font-bold uppercase text-gold-200">{formName}</p>
          <EditableText
            as="h1"
            className="mt-4 text-4xl font-bold leading-tight md:text-6xl"
            path={`formSubmitted.${titlePath}`}
            value={copy[titlePath]}
          />
          <EditableText
            as="p"
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/78"
            multiline
            path={`formSubmitted.${textPath}`}
            value={copy[textPath]}
          />
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] px-6 py-3 text-sm font-semibold text-emerald-950 shadow-[0_18px_40px_rgba(216,169,72,0.25)]"
              href="/"
            >
              <EditableText
                path="formSubmitted.returnHomeLabel"
                value={copy.returnHomeLabel}
              />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold-200 hover:bg-white/12"
              href={returnTo}
            >
              <EditableText
                path="formSubmitted.returnFormLabel"
                value={copy.returnFormLabel}
              />
            </Link>
          </div>
        </section>
      </main>
    </CmsEditableProvider>
  );
}
