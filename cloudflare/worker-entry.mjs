import openNextWorker from "../.open-next/worker.js";

const BLOCKED_PATH =
  /^\/(?:\.env|wp-login\.php|wp-load\.php|wp-admin|wp-json|wp\.serviceworker|userfiles|index\.php|read-document|__vite_rsc)/i;

export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;

    if (BLOCKED_PATH.test(path)) {
      return new Response("Not Found", {
        status: 404,
        headers: { "cache-control": "public, max-age=86400" },
      });
    }

    return openNextWorker.fetch(request, env, ctx);
  },
};
