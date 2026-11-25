import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { CAMPAIGN_CONFIG, CAMPAIGN_ROUTES, MUSIC_LINKS } from "@/config/campaign";
import { campaignNav } from "@/config/site";
import { isPlaceholderUrl } from "@/lib/links";

describe("campaign configuration", () => {
  it("uses the official MV link; iTunes stays '#' until announced", () => {
    expect(MUSIC_LINKS.officialMV).toBe("https://youtu.be/uTrRuWajO68");
    expect(isPlaceholderUrl(MUSIC_LINKS.officialMV)).toBe(false);
    expect(MUSIC_LINKS.itunesPurchase).toBe("#");
    expect(isPlaceholderUrl(MUSIC_LINKS.itunesPurchase)).toBe(true);
  });

  it("uses the exact Threads tutorial URL", () => {
    expect(MUSIC_LINKS.massBuyTutorial).toBe("https://www.threads.com/@sapcanhnhathiennga/post/DgHlG-gEmoH");
  });

  it("points navigation and CTAs at the standalone page, never a homepage anchor", () => {
    expect(campaignNav.href).toBe("/top-1-itunes/");
    expect(campaignNav.shortLabel).toBe("Top 1 iTunes");
    expect(CAMPAIGN_ROUTES).toEqual({
      page: "/top-1-itunes/",
      massBuy: "/top-1-itunes/#huong-dan-mass-buy",
      buy: "/top-1-itunes/#mua-itunes",
    });
  });

  it("treats only real https URLs as live links", () => {
    expect(isPlaceholderUrl("")).toBe(true);
    expect(isPlaceholderUrl(" # ")).toBe(true);
    expect(isPlaceholderUrl("javascript:alert(1)")).toBe(true);
    expect(isPlaceholderUrl("https://music.apple.com/vn/album/x")).toBe(false);
  });

  it("does not invent an iTunes listing time or chart data", () => {
    expect(CAMPAIGN_CONFIG.itunesListedAt).toBeNull();
    expect(CAMPAIGN_CONFIG.verifiedRank).toBeNull();
  });

  it("has no release-time / countdown component", () => {
    expect(readdirSync("src/components/release")).toEqual(["OfficialMvCTA.tsx"]);
  });
});
