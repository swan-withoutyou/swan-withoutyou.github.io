import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

/** What the page shows from build-time data (the committed metrics file), used for fallback checks. */
function buildTimeExpectation(): { awaiting: true } | { awaiting: false; text: string } {
  const file = JSON.parse(readFileSync("src/data/metrics/youtube.json", "utf8")) as { history: Array<{ value: number }> };
  const last = file.history.at(-1);
  return last ? { awaiting: false, text: new Intl.NumberFormat("vi-VN").format(last.value) } : { awaiting: true };
}

async function expectBuildTimeData(page: import("@playwright/test").Page) {
  const t = page.getByTestId("tracker-youtube");
  const e = buildTimeExpectation();
  if (e.awaiting) await expect(t.getByTestId("awaiting")).toBeVisible();
  else await expect(t).toContainText(e.text);
}

// The e2e build sets NEXT_PUBLIC_YOUTUBE_METRICS_URL to this test address (see README → Testing).
const LIVE = "**/test-metrics/youtube.json*";

/** ISO time in GMT+7, `minutesAgo` before now — always newer than anything in the build. */
function vnIso(minutesAgo: number): string {
  return `${new Date(Date.now() - minutesAgo * 60_000 + 7 * 3600_000).toISOString().slice(0, 19)}+07:00`;
}

test("tracker loads the latest auto-recorded YouTube views without a rebuild", async ({ page }) => {
  await page.route(LIVE, (route) =>
    route.fulfill({
      json: {
        videoId: "uTrRuWajO68",
        source: "YouTube Data API v3",
        updatedAt: vnIso(0),
        history: [
          { recordedAt: vnIso(10), value: 248_000 },
          { recordedAt: vnIso(0), value: 250_000 },
        ],
      },
      headers: { "access-control-allow-origin": "*" },
    }),
  );
  await page.goto("/road-to-1m/");
  const t = page.getByTestId("tracker-youtube");
  await expect(t).toContainText("250.000");
  await expect(t).toContainText("25%");
  await expect(t.getByTestId("auto-update-note")).toBeVisible();
});

test("ignores a live file that is older than the data already on the page", async ({ page }) => {
  await page.route(LIVE, (route) =>
    route.fulfill({
      json: {
        videoId: "uTrRuWajO68",
        source: "YouTube Data API v3",
        updatedAt: "2026-11-25T20:05:00+07:00",
        history: [{ recordedAt: "2026-11-25T20:05:00+07:00", value: 7 }],
      },
      headers: { "access-control-allow-origin": "*" },
    }),
  );
  await page.goto("/road-to-1m/");
  await expectBuildTimeData(page);
});

test("falls back to build-time data when the live file is unavailable", async ({ page }) => {
  await page.route(LIVE, (route) => route.fulfill({ status: 404, body: "" }));
  await page.goto("/road-to-1m/");
  await expectBuildTimeData(page);
});

test("rejects malformed live data", async ({ page }) => {
  await page.route(LIVE, (route) => route.fulfill({ json: { history: [{ recordedAt: "x", value: -5 }] } }));
  await page.goto("/road-to-1m/");
  await expectBuildTimeData(page);
  await expect(page.getByTestId("tracker-youtube")).not.toContainText("-5");
});
