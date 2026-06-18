import Link from "next/link";
import { SiteFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";

const formNames: Record<string, string> = {
  contact: "message",
  nomination: "nomination",
  rating: "rating request",
};

const statusCopy: Record<string, { title: string; text: string }> = {
  received: {
    title: "Submission received",
    text: "Thank you. Your details have been received by Beacon Mosque.",
  },
  missing: {
    title: "Please complete the form",
    text: "One or more required fields were missing. Please go back and complete every field before submitting.",
  },
  invalid: {
    title: "Submission could not be processed",
    text: "The form type was not recognised. Please return to the relevant page and try again.",
  },
  "delivery-error": {
    title: "Submission delivery failed",
    text: "The form was submitted, but the configured intake endpoint did not accept it. Please try again or contact Beacon Mosque directly.",
  },
};

function safeReturnPath(value?: string) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export default async function FormSubmittedPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string; returnTo?: string; status?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "received";
  const content = statusCopy[status] ?? statusCopy.received;
  const formName = formNames[params.form ?? ""] ?? "submission";
  const returnTo = safeReturnPath(params.returnTo);

  return (
    <>
      <SiteHeader />
      <main className="pattern-dark flex min-h-[62vh] items-center bg-[linear-gradient(135deg,#071524,#063f35)] px-5 py-20 text-white md:px-8">
        <section className="mx-auto max-w-[820px] text-center">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-gold-200/50 bg-white/10 text-2xl font-semibold text-gold-200">
            BM
          </div>
          <p className="text-sm font-bold uppercase text-gold-200">
            {formName}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/78">
            {content.text}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] px-6 py-3 text-sm font-semibold text-emerald-950 shadow-[0_18px_40px_rgba(216,169,72,0.25)]"
              href="/"
            >
              Return home
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold-200 hover:bg-white/12"
              href={returnTo}
            >
              Return to form
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
