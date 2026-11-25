import { expect, test } from "@playwright/test";
import { MUSIC_LINKS } from "../../src/config/campaign";

const TUTORIAL = "https://www.threads.com/@sapcanhnhathiennga/post/DgHlG-gEmoH";
//const BUY_MSG = "Đường dẫn mua nhạc chính thức sẽ được cập nhật sớm. Cảm ơn bạn đã chờ đợi và ủng hộ SWAN!";

test.describe("homepage", () => {
  test("release-time block is gone and no countdown exists", async ({ page }) => {
    await page.goto("/");
    const body = page.locator("body");
    for (const t of ["CHÍNH THỨC RA MẮT", "20:00 | 25.11.2026", "Ngày phát hành", "Giờ phát hành", "Múi giờ", "UTC+7"])
      await expect(body).not.toContainText(t);
    await expect(page.locator('[role="timer"]')).toHaveCount(0);
  });

  test("shows only the short campaign introduction with exactly two CTAs", async ({ page }) => {
    await page.goto("/");
    const intro = page.getByTestId("home-campaign-intro");
        for (const t of [
      "Dự án của cộng đồng The Wings",
      /THIẾU NÀNG\s*[-—]\s*ĐƯỜNG ĐẾN TOP 1 iTUNES/,
      "Mỗi lượt mua là một bước tiến.",
      "Không chỉ nghe, chúng ta còn có thể cùng nhau đưa Thiếu Nàng lên vị trí cao nhất trên bảng xếp hạng iTunes.",
      "Thiếu Nàng · SWAN",
    ])
      await expect(intro).toContainText(t);
    await expect(intro.getByRole("link")).toHaveCount(2);
    await expect(page.getByTestId("join-mass-buy")).toHaveAttribute("href", "/top-1-itunes/#huong-dan-mass-buy");
    await expect(page.getByTestId("see-purchase-guide")).toHaveAttribute("href", "/top-1-itunes/#mua-itunes");
    for (const id of ["#huong-dan-mass-buy", "#mua-itunes", "#hoi-dap", "#top-1-itunes"]) await expect(page.locator(id)).toHaveCount(0);
    await expect(page.locator('a[href*="#top-1-itunes"]')).toHaveCount(0);
  });

  test("'Cùng lên Top 1' links to the campaign page", async ({ page }) => {
    await page.goto("/");
    const c = page.getByTestId("hero-campaign-cta");
    await expect(c).toContainText("Cùng lên Top 1");
    await expect(c).toHaveAttribute("href", "/top-1-itunes/");
    await c.click();
    await expect(page).toHaveURL(/\/top-1-itunes\/$/);
    await expect(page.locator("h1")).toContainText("ĐƯỜNG ĐẾN TOP 1 iTUNES");
  });

  for (const [testId, anchor, heading] of [
    ["join-mass-buy", "huong-dan-mass-buy", "HƯỚNG DẪN MASS BUY TRÊN iTUNES"],
    ["see-purchase-guide", "mua-itunes", "HƯỚNG DẪN MUA NHẠC TRÊN iTUNES"],
  ] as const) {
    test(`${testId} opens the campaign page at #${anchor}, below the sticky header`, async ({ page }) => {
      await page.goto("/");
      await page.getByTestId(testId).click();
      await expect(page).toHaveURL(new RegExp(`/top-1-itunes/#${anchor}$`));
      const h = page.locator(`#${anchor} h2`).first();
      await expect(h).toHaveText(heading);
      await expect(h).toBeInViewport();
      await expect.poll(async () => (await h.boundingBox())?.y ?? 0).toBeGreaterThan(64);
    });
  }
});

test.describe("campaign page", () => {
  test("direct access, sections and no fabricated stats", async ({ page }) => {
    const res = await page.goto("/top-1-itunes/");
    expect(res?.status()).toBe(200);
        await expect(page.locator("h1")).toContainText(/THIẾU NÀNG\s*[-—]\s*ĐƯỜNG ĐẾN TOP 1 iTUNES/);
    for (const id of ["muc-tieu", "huong-dan-mass-buy", "mua-itunes", "hoi-dap"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
    await expect(page.getByTestId("mass-buy-steps").locator(":scope > li")).toHaveCount(5);
    await expect(page.getByTestId("store-vs-stream")).toContainText("Apple Music");
    await expect(page.getByTestId("verified-result")).toContainText("Chưa có số liệu xác minh");
    await expect(page.locator("main")).not.toContainText("%");
  });

  test("direct link to an anchor scrolls to it", async ({ page }) => {
    await page.goto("/top-1-itunes/#mua-itunes");
    await expect(page.locator("#mua-itunes h2").first()).toBeInViewport();
  });

    test("iTunes CTA opens the official iTunes page in a new tab", async ({ page }) => {
    await page.goto("/top-1-itunes/#mua-itunes");
    const buy = page.getByTestId("itunes-cta");
    await buy.scrollIntoViewIfNeeded();
    await expect(buy).toBeVisible();
    await expect(buy).toContainText("THIẾU NÀNG");
    await expect(buy).toHaveAttribute("href", MUSIC_LINKS.itunesPurchase);
    await expect(buy).toHaveAttribute("href", /^https:\/\/music\.apple\.com\//);
    await expect(buy).toHaveAttribute("target", "_blank");
    await expect(buy).toHaveAttribute("rel", "noopener noreferrer");
    await expect(page.getByTestId("itunes-cta-notice")).toHaveCount(0);
  });

  test("FAQ accordion has 7 items that open and close", async ({ page }) => {
    await page.goto("/top-1-itunes/");
    const items = page.getByTestId("campaign-faq").locator("details");
    await expect(items).toHaveCount(7);
    const last = items.last();
    await last.locator("summary").click();
    await expect(last).toHaveAttribute("open", "");
    await expect(last.locator(`a[href="${TUTORIAL}"]`)).toBeVisible();
    await last.locator("summary").click();
    await expect(last).not.toHaveAttribute("open", "");
  });

  test("nav item opens the page and is marked active", async ({ page, isMobile }) => {
    await page.goto("/lyrics/");
    if (isMobile) {
      await page.getByRole("button", { name: "Mở menu" }).click();
      await page.getByTestId("nav-campaign-mobile").click();
    } else {
      await page.getByTestId("nav-campaign").click();
    }
    await expect(page).toHaveURL(/\/top-1-itunes\/$/);
    if (isMobile) await page.getByRole("button", { name: "Mở menu" }).click();
    await expect(page.getByTestId(isMobile ? "nav-campaign-mobile" : "nav-campaign")).toHaveAttribute("aria-current", "page");
  });

  test("no horizontal overflow", async ({ page }) => {
    await page.goto("/top-1-itunes/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  });
});

test.describe("music video", () => {
  test("official MV CTA opens the official MV in a new tab; tutorial link is exact", async ({ page }) => {
    for (const path of ["/", "/music-video/"]) {
      await page.goto(path);
      const btn = page.getByTestId("official-mv-cta").first();
      await expect(btn).toHaveText(/XEM MV CHÍNH THỨC/);
      await expect(btn).toHaveAttribute("href", "https://youtu.be/uTrRuWajO68");
      await expect(btn).toHaveAttribute("target", "_blank");
      await expect(btn).toHaveAttribute("rel", "noopener noreferrer");
      const link = page.getByTestId("tutorial-link");
      await expect(link).toHaveAttribute("href", TUTORIAL);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
