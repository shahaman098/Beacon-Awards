"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StartAssessmentForm() {
  const router = useRouter();
  const [mosqueName, setMosqueName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/assessment/packs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mosqueName, contactName, contactEmail }),
      });
      const data = (await response.json()) as {
        error?: string;
        pack?: { accessToken: string };
      };

      if (!response.ok || !data.pack?.accessToken) {
        throw new Error(data.error ?? "Could not start the assessment.");
      }

      router.push(`/self-assessment/${data.pack.accessToken}/`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start the assessment.");
      setPending(false);
    }
  }

  return (
    <form
      className="border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8"
      onSubmit={onSubmit}
    >
      <div className="grid gap-5">
        <div>
          <label
            className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black/55"
            htmlFor="mosqueName"
          >
            Mosque name
          </label>
          <input
            className="mt-2 h-12 w-full border border-black/18 bg-white px-4 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
            id="mosqueName"
            name="mosqueName"
            onChange={(event) => setMosqueName(event.target.value)}
            placeholder="e.g. Green Lane Masjid"
            required
            value={mosqueName}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black/55"
              htmlFor="contactName"
            >
              Contact name
            </label>
            <input
              className="mt-2 h-12 w-full border border-black/18 bg-white px-4 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
              id="contactName"
              name="contactName"
              onChange={(event) => setContactName(event.target.value)}
              value={contactName}
            />
          </div>
          <div>
            <label
              className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black/55"
              htmlFor="contactEmail"
            >
              Contact email
            </label>
            <input
              className="mt-2 h-12 w-full border border-black/18 bg-white px-4 text-black outline-none transition focus:border-black focus:ring-2 focus:ring-gold-300/35"
              id="contactEmail"
              name="contactEmail"
              onChange={(event) => setContactEmail(event.target.value)}
              type="email"
              value={contactEmail}
            />
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-5 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </p>
      ) : null}

      <button
        className="mt-6 inline-flex min-h-12 items-center justify-center border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pending}
        type="submit"
      >
        {pending ? "Starting…" : "Start self-assessment"}
      </button>
      <p className="mt-4 text-sm leading-6 text-black/55">
        You will get a private link to share with trustees and lead roles. Anyone
        with the link can update the pack.
      </p>
    </form>
  );
}
