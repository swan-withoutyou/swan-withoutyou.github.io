import type { Campaign } from "@/types/campaign";

/**
 * Road to 1M. Metrics are entered manually — append snapshots to `history`.
 * Never add estimated numbers. Times use the +07:00 (Asia/Ho_Chi_Minh) offset.
 */
export const roadTo1M: Campaign = {
  id: "road-to-1m",
  title: "Hành trình 1 triệu",
  startsAt: null, // set to the official MV premiere time, e.g. "2026-12-01T20:00:00+07:00"
  platforms: [
    {
      platform: "youtube",
      label: "YouTube",
      unit: "lượt xem",
      target: 1_000_000,
      windowDays: 30,
      ctaKey: "thieuNangTeaser",
      milestones: [
        { id: "yt-1", target: 50_000, withinHours: 2, label: "2 giờ đầu" },
        { id: "yt-2", target: 100_000, withinHours: 48, label: "48 giờ đầu" },
        { id: "yt-3", target: 1_000_000, withinHours: 24 * 30, label: "30 ngày đầu" },
      ],
      history: [],
    },
    {
      platform: "spotify",
      label: "Spotify",
      unit: "lượt nghe",
      target: 1_000_000,
      windowDays: 30,
      ctaKey: "spotifyArtist",
      milestones: [{ id: "sp-1", target: 1_000_000, withinHours: 24 * 30, label: "30 ngày đầu" }],
      history: [],
    },
  ],
};
