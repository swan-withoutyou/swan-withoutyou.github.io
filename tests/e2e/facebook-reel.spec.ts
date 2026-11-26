import { expect, test } from "@playwright/test";

const REEL = "https://www.facebook.com/reel/1113704614825274";

test("Road to 1M shows the Facebook reel: right column on desktop, below the tracker on mobile", async ({ page, isMobile }) => {
  // Don't load the real Facebook player in tests.
  await page.route("https://www.facebook.com/plugins/**", (route) => route.fulfill({ body: "<html><body>reel</body></html>", contentType: "text/html" }));
  await page.goto("/road-to-1m/");

  const reel = page.getByTestId("facebook-reel");
  const tracker = page.getByTestId("tracker-youtube");
  await expect(reel).toBeAttached();
  await expect(reel.getByRole("link", { name: /Xem trên Facebook/ })).toHaveAttribute("href", REEL);

  const r = (await reel.boundingBox())!;
  const t = (await tracker.boundingBox())!;
  if (isMobile) {
    expect(r.y).toBeGreaterThan(t.y + t.height - 1); // below the tracker
  } else {
    expect(r.x).toBeGreaterThan(t.x + t.width - 1); // to the right of the tracker
  }

  // Loads and autoplays once scrolled into view.
  await reel.scrollIntoViewIfNeeded();
  const frame = reel.locator("iframe");
  await expect(frame).toHaveAttribute("src", /facebook\.com\/plugins\/video\.php/);
  const src = new URL((await frame.getAttribute("src"))!);
  expect(src.searchParams.get("href")).toBe(REEL);
  expect(src.searchParams.get("autoplay")).toBe("true");
  await expect(frame).toHaveAttribute("allow", /autoplay/);
});

test("on mobile the reel is not loaded until the visitor scrolls to it", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/road-to-1m/");
  await expect(page.getByTestId("facebook-reel").locator("iframe")).toHaveCount(0);
});
