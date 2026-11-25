import type { Campaign } from "@/types/campaign";
import youtubeMetrics from "./metrics/youtube.json";
import { parseMetricsHistory } from "@/lib/metrics";

/**
 * Road to 1M — YouTube only.
 * View counts are recorded automatically every 5 minutes by .github/workflows/youtube-metrics.yml
 * into src/data/metrics/youtube.json. Never add estimated numbers. Times use +07:00 (Asia/Ho_Chi_Minh).
 */
export const roadTo1M: Campaign = {
  id: "road-to-1m",
  title: "Hành trình 1 triệu",
  // Official MV premiere: 20:00, 25/11/2026 (GMT+7). Milestone deadlines count from here.
  startsAt: "2026-11-25T20:00:00+07:00",
  platforms: [
    {
      platform: "youtube",
      label: "YouTube",
      unit: "lượt xem",
      target: 1_000_000,
      windowDays: 30,
      ctaKey: "thieuNangMV",
     milestones: [
  { id: "yt-1", target: 50_000, withinHours: 24, label: "1 ngày đầu" },
  { id: "yt-2", target: 100_000, withinHours: 48, label: "2 ngày đầu" },
  { id: "yt-3", target: 1_000_000, withinHours: 24 * 30, label: "30 ngày đầu" },
],
      history: parseMetricsHistory(youtubeMetrics),
    },
  ],
};
