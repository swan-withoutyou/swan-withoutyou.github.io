export const siteConfig = {
  name: "SWAN — Thiếu Nàng",
  shortName: "Thiếu Nàng",
  artist: "SWAN",
  songTitle: "Thiếu Nàng",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://swan-withoutyou.github.io").replace(/\/$/, ""),
  description:
    "Trải nghiệm âm nhạc dành riêng cho “Thiếu Nàng” của SWAN — MV, lời bài hát ba ngôn ngữ, Road to 1M và cộng đồng fan.",
  timezone: "Asia/Ho_Chi_Minh",
  locale: "vi_VN",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
} as const;

export const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/music-video/", label: "MV" },
  { href: "/lyrics/thieu-nang/", label: "Lời bài hát" },
  { href: "/road-to-1m/", label: "Hành trình 1 triệu view" },
  { href: "/fan-content/", label: "Góc của The Wings" },
  { href: "/fan-community/", label: "Cộng đồng fan" },
] as const;

/** Campaign nav item — the standalone /top-1-itunes page. */
export const campaignNav = {
  href: "/top-1-itunes/",
  label: "Chiến dịch đưa Thiếu Nàng lên Top 1 iTunes",
  /** Visible nav text. */
  shortLabel: "Top 1 iTunes",
} as const;
