import { redirect } from "next/navigation";
import {
  CmsLabel,
  CmsNotice,
  CmsPanel,
  CmsShell,
  CmsTopLink,
  cmsFieldClassName,
} from "@/components/CmsShell";
import {
  ensureCmsAdminUser,
  getCurrentCmsUser,
} from "@/lib/cms";
import { CMS_ADMIN_EMAIL } from "@/lib/cms-credentials";
import { readCmsSearchParam, type CmsSearchParams } from "@/lib/cms-admin";

export default async function CmsLoginPage({
  searchParams,
}: {
  searchParams: CmsSearchParams;
}) {
  await ensureCmsAdminUser();

  const user = await getCurrentCmsUser();
  if (user) {
    redirect("/cms/");
  }

  const error = await readCmsSearchParam(searchParams, "error");

  return (
    <CmsShell
      actions={<CmsTopLink href="/">Back to site</CmsTopLink>}
      eyebrow="Admin access"
      title="CMS login"
    >
      <div className="mx-auto max-w-xl">
        <CmsPanel
          text="Sign in with your authorised Faith Associates email. Confirm the email address, then enter your password."
          title="Welcome back"
        >
          <form action="/api/cms/login/" className="space-y-5" method="post">
            {error ? <CmsNotice tone="error">{error}</CmsNotice> : null}

            <div>
              <CmsLabel htmlFor="email">Email</CmsLabel>
              <input
                autoComplete="email"
                className={cmsFieldClassName}
                defaultValue={CMS_ADMIN_EMAIL}
                id="email"
                name="email"
                required
                type="email"
              />
            </div>

            <div>
              <CmsLabel htmlFor="emailConfirm">Confirm email</CmsLabel>
              <input
                autoComplete="email"
                className={cmsFieldClassName}
                defaultValue={CMS_ADMIN_EMAIL}
                id="emailConfirm"
                name="emailConfirm"
                required
                type="email"
              />
            </div>

            <div>
              <CmsLabel htmlFor="password">Password</CmsLabel>
              <input
                autoComplete="current-password"
                className={cmsFieldClassName}
                id="password"
                name="password"
                required
                type="password"
              />
            </div>

            <button
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-gold-300 bg-[linear-gradient(135deg,#f3d98c,#d7a948)] px-6 py-3 text-sm font-semibold text-emerald-950 shadow-[0_18px_40px_rgba(216,169,72,0.28)] transition hover:-translate-y-0.5"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </CmsPanel>
      </div>
    </CmsShell>
  );
}
