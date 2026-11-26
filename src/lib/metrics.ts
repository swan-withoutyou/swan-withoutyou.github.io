import { z } from "zod";
import type { MetricSnapshot } from "@/types/campaign";

/** Shape of src/data/metrics/youtube.json (written by scripts/youtube-metrics.ts). */
export const metricsFileSchema = z.object({
  videoId: z.string(),
  source: z.string(),
  updatedAt: z.string().nullable(),
  history: z.array(
    z.object({
      recordedAt: z.iso.datetime({ offset: true }),
      value: z.number().int().nonnegative(),
      source: z.string().optional(),
    }),
  ),
});

export type MetricsFile = z.infer<typeof metricsFileSchema>;

/** Validated history, or [] for anything malformed — never shows unverified numbers. */
export function parseMetricsHistory(raw: unknown): MetricSnapshot[] {
  const r = metricsFileSchema.safeParse(raw);
  return r.success ? r.data.history.map((s) => ({ ...s, source: s.source ?? r.data.source })) : [];
}

/**
 * Public URL of the live metrics file (raw GitHub). Set NEXT_PUBLIC_YOUTUBE_METRICS_URL in Netlify, e.g.
 * https://raw.githubusercontent.com/<user>/<repo>/<branch>/src/data/metrics/youtube.json
 * When empty, the site only shows the numbers present at build time.
 */
export const LIVE_METRICS_URL = process.env.NEXT_PUBLIC_YOUTUBE_METRICS_URL ?? "";

/** Response of the Cloudflare Worker relay (worker/youtube-live). */
export const liveViewsSchema = z.object({
  videoId: z.string(),
  viewCount: z.number().int().nonnegative(),
  fetchedAt: z.iso.datetime({ offset: true }),
  stale: z.boolean().optional(),
});

/** A live reading as a display-only snapshot (source "live"; never stored in history). */
export function parseLiveSnapshot(raw: unknown): MetricSnapshot | null {
  const r = liveViewsSchema.safeParse(raw);
  return r.success ? { recordedAt: r.data.fetchedAt, value: r.data.viewCount, source: "live" } : null;
}

/** URL of the live relay. Empty → no real-time numbers (the 5-minute history is still used). */
export const LIVE_VIEWS_URL = process.env.NEXT_PUBLIC_YOUTUBE_LIVE_URL ?? "";
