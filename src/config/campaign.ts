/**
 * Campaign links and settings — the ONLY place to edit them.
 *
 * officialMV / itunesPurchase stay "#" until the official URLs are published.
 * A "#" (or empty) value means "not available yet": the button stays visible but shows a
 * Vietnamese notice instead of navigating. Paste the real https URL here and every button
 * becomes a normal external link automatically.
 */
export const MUSIC_LINKS = {
  officialMV: "https://youtu.be/uTrRuWajO68",
  itunesPurchase: "https://music.apple.com/vn/album/thi%E1%BA%BFu-n%C3%A0ng-single/6836665522",
  massBuyTutorial: "https://www.threads.com/@sapcanhnhathiennga/post/DgHlG-gEmoH",
} as const;

export const CAMPAIGN_CONFIG = {
  artist: "SWAN",
  song: "Thiếu Nàng",
  campaignGoal: "TOP 1 iTunes",
  campaignName: "Road to #1 iTunes",
  campaignStatus: "Đang triển khai",
  /** Real time "Thiếu Nàng" went on sale on iTunes. Unknown → null (never guessed). */
  itunesListedAt: null as string | null,
  /** Verified chart data only, entered by a person. null = none. */
  verifiedRank: null as { rank: number; storefront: string; recordedAt: string } | null,
} as const;

/** Internal routes for the standalone campaign page (trailingSlash is on in next.config). */
export const CAMPAIGN_ROUTES = {
  page: "/top-1-itunes/",
  massBuy: "/top-1-itunes/#huong-dan-mass-buy",
  buy: "/top-1-itunes/#mua-itunes",
} as const;

export const PLACEHOLDER_MESSAGES = {
  mv: "Đường dẫn MV chính thức sẽ được cập nhật sớm. Cảm ơn bạn đã chờ đợi và ủng hộ SWAN!",
  itunes: "Đường dẫn mua nhạc chính thức sẽ được cập nhật sớm. Cảm ơn bạn đã chờ đợi và ủng hộ SWAN!",
} as const;
