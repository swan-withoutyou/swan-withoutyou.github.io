import { expect, test } from "@playwright/test";

const pages = ["/", "/top-1-itunes/", "/music/", "/music-video/", "/lyrics/", "/lyrics/thieu-nang/", "/road-to-1m/", "/streaming-guide/",
  "/fan-content/", "/fan-community/", "/about/", "/updates/", "/privacy/", "/terms/"];

for (const p of pages) {
  test(`${p} renders`, async ({ page }) => {
    const res = await page.goto(p);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });
}

test("lyrics language switcher works without reload", async ({ page }) => {
  await page.goto("/lyrics/thieu-nang/");
  await expect(page.locator("h1")).toContainText("Lời bài hát");
  const marker = await page.evaluate(() => ((window as unknown as { __m: number }).__m = Math.random()));
  for (const [name, lang] of [["English", "en"], ["中文", "zh-CN"], ["Tiếng Việt", "vi"]] as const) {
    await page.getByRole("radio", { name }).first().click();
    await expect(page.getByTestId("lyrics-body").first()).toHaveAttribute("lang", lang);
    await expect(page.getByRole("radio", { name }).first()).toHaveAttribute("aria-checked", "true");
  }
  expect(await page.evaluate(() => (window as unknown as { __m: number }).__m)).toBe(marker);
  await expect(page.locator("[data-line-id]").first()).toBeVisible();
});

test("lyrics page has canonical URL and is indexable now that lyrics are published", async ({ page }) => {
  await page.goto("/lyrics/thieu-nang/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/lyrics\/thieu-nang\/$/);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test("road to 1M shows only the YouTube tracker, with auto-update note", async ({ page }) => {
  await page.goto("/road-to-1m/");
  await expect(page.getByTestId("tracker-youtube")).toBeVisible();
  await expect(page.getByTestId("tracker-spotify")).toHaveCount(0);
  await expect(page.getByTestId("auto-update-note")).toContainText("mỗi 5 phút");
});

test("fan community shows two cards with original QR images", async ({ page }) => {
  await page.goto("/fan-community/");
  await expect(page.getByTestId("fansite-card")).toHaveCount(2);
  for (const n of ["01", "02"]) {
    const img = page.locator(`img[src$="fansite-${n}-messenger-qr.png"]`);
    await expect(img).toBeVisible();
    expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  }
});

test("music video page shows the official MV status", async ({ page }) => {
  await page.goto("/music-video/");
  await expect(page.getByTestId("video-status")).toContainText("MV chính thức");
});

test("sitemap and robots exist", async ({ request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap:");
});
