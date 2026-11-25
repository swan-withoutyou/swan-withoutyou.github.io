import { describe, expect, it } from "vitest";
import { milestoneDeadline, milestoneState, summarize } from "@/lib/campaign";
import { roadTo1M } from "@/data/campaign";
import type { PlatformCampaign } from "@/types/campaign";

const base: PlatformCampaign = { ...roadTo1M.platforms[0], history: [] };

describe("Road to 1M", () => {
  it("shows awaiting (not zero) when nothing has been recorded", () => {
    expect(summarize(base)).toEqual({ state: "awaiting" });
  });

  it("tracks YouTube only, with the agreed milestones", () => {
  expect(roadTo1M.platforms.map((p) => p.platform)).toEqual(["youtube"]);
  expect(roadTo1M.platforms.map((p) => p.target)).toEqual([1_000_000]);
  expect(roadTo1M.platforms[0].milestones.map((m) => [m.target, m.withinHours])).toEqual([
    [50_000, 2], [100_000, 48], [1_000_000, 720],
  ]);
});

  it("summarises from the latest snapshot regardless of insertion order", () => {
    const s = summarize({
      ...base,
      history: [
        { recordedAt: "2026-12-02T10:00:00+07:00", value: 250_000 },
        { recordedAt: "2026-12-01T22:00:00+07:00", value: 60_000 },
      ],
    });
    expect(s).toMatchObject({ state: "recorded", current: 250_000, percent: 25, remaining: 750_000 });
  });

  it("evaluates milestone deadlines from the campaign start", () => {
    const start = "2026-12-01T20:00:00+07:00";
    const d = milestoneDeadline(start, 2)!;
    expect(d.toISOString()).toBe("2026-12-01T15:00:00.000Z");
    const hist = [{ recordedAt: "2026-12-01T21:30:00+07:00", value: 51_000 }];
    expect(milestoneState(hist, 50_000, d)).toBe("reached");
    expect(milestoneState([], 50_000, d, new Date("2026-12-01T21:00:00+07:00"))).toBe("open");
    expect(milestoneState([], 50_000, null)).toBe("unknown");
  });
});
