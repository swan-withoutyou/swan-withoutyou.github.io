import type { MetricSnapshot, PlatformCampaign } from "@/types/campaign";

export type ProgressSummary =
  | { state: "awaiting" }
  | {
      state: "recorded";
      current: number;
      target: number;
      percent: number;
      remaining: number;
      lastUpdated: string;
    };

export function latestSnapshot(history: MetricSnapshot[]): MetricSnapshot | null {
  if (history.length === 0) return null;
  return [...history].sort((a, b) => Date.parse(a.recordedAt) - Date.parse(b.recordedAt)).at(-1) ?? null;
}

/** Never returns 0 as a measurement when nothing has been recorded. */
export function summarize(p: PlatformCampaign): ProgressSummary {
  const latest = latestSnapshot(p.history);
  if (!latest) return { state: "awaiting" };
  const percent = Math.min(100, (latest.value / p.target) * 100);
  return {
    state: "recorded",
    current: latest.value,
    target: p.target,
    percent: Math.round(percent * 10) / 10,
    remaining: Math.max(0, p.target - latest.value),
    lastUpdated: latest.recordedAt,
  };
}

export function milestoneDeadline(startsAt: string | null, withinHours: number): Date | null {
  if (!startsAt) return null;
  return new Date(Date.parse(startsAt) + withinHours * 3600_000);
}

export type MilestoneState = "reached" | "missed" | "open" | "unknown";

/** A milestone counts as reached only if a recorded snapshot at/before the deadline met the target. */
export function milestoneState(
  history: MetricSnapshot[],
  target: number,
  deadline: Date | null,
  now: Date = new Date(),
): MilestoneState {
  if (!deadline) return history.some((s) => s.value >= target) ? "reached" : "unknown";
  const inWindow = history.filter((s) => Date.parse(s.recordedAt) <= deadline.getTime());
  if (inWindow.some((s) => s.value >= target)) return "reached";
  if (now.getTime() > deadline.getTime()) return history.length ? "missed" : "unknown";
  return "open";
}
