/**
 * Records a short walkthrough of the 2026 prepare-to-vote / finalist pages.
 * Output: out/prepare-to-vote-walkthrough.webm
 */
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "/opt/homebrew/lib/node_modules/@playwright/cli/node_modules/playwright",
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const base = process.env.WALKTHROUGH_BASE_URL || "http://localhost:3000";

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrollThrough(page, pixels = 900, steps = 4) {
  for (let i = 0; i < steps; i += 1) {
    await page.evaluate((y) => window.scrollBy(0, y), Math.round(pixels / steps));
    await wait(700);
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: outDir,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();
  const video = page.video();

  try {
    // 1) 2026 hub — hero prepare to vote
    await page.goto(`${base}/awards/beacon-mosque-awards-2026/`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await wait(1800);

    // 2) Category grid
    await page.goto(`${base}/awards/beacon-mosque-awards-2026/#award-categories`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await wait(1200);
    await scrollThrough(page, 1100, 5);

    // 3) Category page — shortlist + previous winners
    await page.goto(`${base}/best-run-mosque-2026-nomination/`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await wait(1400);
    await scrollThrough(page, 1600, 6);

    // 4) Finalist structure / profile
    await page.goto(
      `${base}/awards/beacon-mosque-awards-2026/finalist/best-run-mosque-finalist-1/`,
      {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      },
    );
    await wait(1400);
    await scrollThrough(page, 1400, 5);
    await wait(1000);
  } finally {
    await context.close();
    await browser.close();
  }

  if (!video) {
    throw new Error("No video handle from Playwright context");
  }

  const rawPath = await video.path();
  const target = path.join(outDir, "prepare-to-vote-walkthrough.webm");
  const { rename, copyFile } = await import("node:fs/promises");
  try {
    await rename(rawPath, target);
  } catch {
    await copyFile(rawPath, target);
  }

  // Stable mp4 for email / WhatsApp where possible
  const mp4 = path.join(outDir, "prepare-to-vote-walkthrough.mp4");
  const { spawnSync } = await import("node:child_process");
  const ffmpeg = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      target,
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      mp4,
    ],
    { encoding: "utf8" },
  );

  console.log(
    JSON.stringify(
      {
        webm: target,
        mp4: ffmpeg.status === 0 ? mp4 : null,
        ffmpegError: ffmpeg.status === 0 ? null : ffmpeg.stderr?.slice(-500),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
