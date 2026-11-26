"use client";

import { useEffect, useState } from "react";
import type { Campaign, MetricSnapshot, PlatformCampaign } from "@/types/campaign";
import { LIVE_METRICS_URL, LIVE_VIEWS_URL, parseLiveSnapshot, parseMetricsHistory } from "@/lib/metrics";
import { PlatformTracker } from "./PlatformTracker";

const HISTORY_REFRESH_MS = 5 * 60_000;
const LIVE_REFRESH_MS = 60_000;

const latest = (h: MetricSnapshot[]) => Math.max(-Infinity, ...h.map((x) => Date.parse(x.recordedAt)));

/**
 * Renders the build-time numbers first (same HTML as the server), then:
 * 1. loads the auto-recorded history file (every 5 min) — milestones + history table;
 * 2. polls the real-time relay (every 60 s, only while the tab is visible) — current number.
 * Each source is used only if it is newer than what is already shown; failures fall back silently.
 */
export function LivePlatformTracker({ campaign, p, detailed = false }: { campaign: Campaign; p: PlatformCampaign; detailed?: boolean }) {
  const [history, setHistory] = useState<MetricSnapshot[] | null>(null);
  const [liveSnap, setLiveSnap] = useState<MetricSnapshot | null>(null);
  const isYouTube = p.platform === "youtube";
  const historyEnabled = isYouTube && LIVE_METRICS_URL !== "";
  const liveEnabled = isYouTube && LIVE_VIEWS_URL !== "";

  useEffect(() => {
    if (!historyEnabled) return;
    let cancelled = false;
    const load = async () => {
      try {
        // Bucketed cache-buster: at most one fresh request per 5 minutes per visitor.
        const url = `${LIVE_METRICS_URL}${LIVE_METRICS_URL.includes("?") ? "&" : "?"}t=${Math.floor(Date.now() / HISTORY_REFRESH_MS)}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;
        const h = parseMetricsHistory(await res.json());
        if (!cancelled && h.length) setHistory(h);
      } catch {
        /* network error → keep current data */
      }
    };
    load();
    const id = setInterval(load, HISTORY_REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [historyEnabled]);

  useEffect(() => {
    if (!liveEnabled) return;
    let cancelled = false;
    const load = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        // No cache-buster: the relay's shared 60 s cache is what keeps YouTube quota safe.
        const res = await fetch(LIVE_VIEWS_URL);
        if (!res.ok) return;
        const snap = parseLiveSnapshot(await res.json());
        if (!cancelled && snap) setLiveSnap(snap);
      } catch {
        /* relay unavailable → keep showing recorded data */
      }
    };
    load();
    const id = setInterval(load, LIVE_REFRESH_MS);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [liveEnabled]);

  const fileIsNewer = history !== null && history.length > 0 && latest(history) >= latest(p.history);
  const base = fileIsNewer ? history : p.history;
  const realtime = liveSnap !== null && Date.parse(liveSnap.recordedAt) > latest(base);
  const shown = realtime ? [...base, liveSnap] : base;

  return (
    <PlatformTracker campaign={campaign} p={{ ...p, history: shown }} detailed={detailed} live={fileIsNewer || realtime} realtime={realtime} />
  );
}
