"use client";

import { useEffect } from "react";
import { useSiteCmsOptional } from "@/components/cms/SiteCmsProvider";
import type { CmsImageOverrides } from "@/lib/cms-image-overrides";
import type { SiteChrome } from "@/lib/cms-site-chrome";

type SessionPayload = {
  authenticated: true;
  email: string;
  overrides: CmsImageOverrides;
  chrome: SiteChrome;
};

function hasCmsSessionCookie() {
  return document.cookie.split(";").some((part) => {
    return part.trim().startsWith("bm_cms_session=");
  });
}

export function SiteCmsSessionLoader() {
  const cms = useSiteCmsOptional();

  useEffect(() => {
    if (!cms?.hydrateSession || !hasCmsSessionCookie()) return;

    let cancelled = false;

    void fetch("/api/cms/session/", { credentials: "same-origin" })
      .then(async (response) => {
        if (!response.ok || cancelled) return null;
        return (await response.json()) as SessionPayload;
      })
      .then((payload) => {
        if (!payload?.authenticated || cancelled) return;
        cms.hydrateSession(payload);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [cms]);

  return null;
}
