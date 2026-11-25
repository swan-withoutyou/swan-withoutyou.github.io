/**
 * Reads the official MV's public view count from the YouTube Data API v3 and appends a snapshot
 * to src/data/metrics/youtube.json. Run every 5 minutes by .github/workflows/youtube-metrics.yml.
 *
 *   YOUTUBE_API_KEY=… node --experimental-strip-types scripts/youtube-metrics.ts
 *
 * - No dependencies (runs on plain Node 22), so the workflow needs no `npm ci`.
 * - recordedAt is the moment the API was read, in Vietnam time (+07:00).
 * - A snapshot is only added when the count changed, so the file stays small.
 * - Snapshots older than 24 h are thinned to the LAST one in each hour (keeps milestone
 *   checks correct: deadlines fall on the hour, and the last reading before each hour is kept).
 * - Exits with an error (and writes nothing) if the API fails or returns no number — never guesses.
 */
import { readFileSync, writeFileSync } from "node:fs";

export type Snapshot = { recordedAt: string; value: number; source?: string };
export type MetricsFile = { videoId: string; source: string; updatedAt: string | null; history: Snapshot[] };

export const METRICS_PATH = "src/data/metrics/youtube.json";
const DAY_MS = 24 * 3600_000;
const HOUR_MS = 3600_000;

/** ISO timestamp in Vietnam time with an explicit +07:00 offset, e.g. 2026-11-25T22:05:00+07:00. */
export function vietnamIso(d: Date): string {
  const shifted = new Date(d.getTime() + 7 * HOUR_MS);
  return `${shifted.toISOString().slice(0, 19)}+07:00`;
}

/** Thins snapshots older than 24 h to the last one per hour; recent ones are kept as-is. */
export function thinHistory(history: Snapshot[], now: Date): Snapshot[] {
  const sorted = [...history].sort((a, b) => Date.parse(a.recordedAt) - Date.parse(b.recordedAt));
  const cutoff = now.getTime() - DAY_MS;
  const lastPerHour = new Map<number, Snapshot>();
  const recent: Snapshot[] = [];
  for (const s of sorted) {
    const t = Date.parse(s.recordedAt);
    if (t >= cutoff) recent.push(s);
    else lastPerHour.set(Math.floor(t / HOUR_MS), s);
  }
  return [...lastPerHour.values(), ...recent];
}

/** Adds a snapshot when the value changed. Returns the new file contents and whether anything changed. */
export function addSnapshot(file: MetricsFile, value: number, now: Date): { file: MetricsFile; changed: boolean } {
  const last = file.history.at(-1);
  if (last && last.value === value) return { file, changed: false };
  const recordedAt = vietnamIso(now);
  const history = thinHistory([...file.history, { recordedAt, value }], now);
  return { file: { ...file, updatedAt: recordedAt, history }, changed: true };
}

export async function fetchViewCount(videoId: string, apiKey: string): Promise<number> {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "statistics");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", apiKey);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const body = (await res.json()) as { items?: Array<{ statistics?: { viewCount?: string } }> };
  const raw = body.items?.[0]?.statistics?.viewCount;
  if (raw === undefined) throw new Error(`No viewCount returned for video ${videoId} (wrong id, private video or hidden stats).`);
  const n = Number(raw);
  if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Invalid viewCount: ${raw}`);
  return n;
}

async function main() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("YOUTUBE_API_KEY is not set.");
  const file = JSON.parse(readFileSync(METRICS_PATH, "utf8")) as MetricsFile;
  const videoId = process.env.YOUTUBE_VIDEO_ID || file.videoId;
  const value = await fetchViewCount(videoId, apiKey);
  const { file: next, changed } = addSnapshot({ ...file, videoId }, value, new Date());
  if (changed) writeFileSync(METRICS_PATH, `${JSON.stringify(next, null, 2)}\n`);
  console.log(changed ? `Recorded ${value} views for ${videoId} at ${next.updatedAt}.` : `No change (${value} views).`);
}

if (process.argv[1]?.endsWith("youtube-metrics.ts")) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
