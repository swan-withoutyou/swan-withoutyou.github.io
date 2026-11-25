"use client";

import { useEffect, useState } from "react";
import type { Campaign, MetricSnapshot, PlatformCampaign } from "@/types/campaign";
import { LIVE_METRICS_URL, parseMetricsHistory } from "@/lib/metrics";
import { PlatformTracker } from "./PlatformTracker";

const REFRESH_MS = 5 * 60_000;

/**
 * Renders the build-time numbers first (same HTML as the server), then loads the auto-updated
 * metrics file so visitors see the latest YouTube count without a Netlify rebuild.
 * Falls back silently to build-time data if the file can't be loaded or is malformed.
 */
export function LivePlatformTracker({ campaign, p, detailed = false }: { campaign: Campaign; p: PlatformCampaign; detailed?: boolean }) {
  const [history, setHistory] = useState<MetricSnapshot[] | null>(null);
  const enabled = p.platform === "youtube" && LIVE_METRICS_URL !== "";

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const load = async () => {
      try {
        // Bucketed cache-buster: at most one fresh request per 5 minutes per visitor.
        const url = `${LIVE_METRICS_URL}${LIVE_METRICS_URL.includes("?") ? "&" : "?"}t=${Math.floor(Date.now() / REFRESH_MS)}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;
        const h = parseMetricsHistory(await res.json());
        if (!cancelled && h.length) setHistory(h);
      } catch {
        /* network error → keep build-time data */
      }
    };
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [enabled]);

  // Use the live file when its latest snapshot is at least as recent as the build-time data.
  const latest = (h: MetricSnapshot[]) => Math.max(-Infinity, ...h.map((x) => Date.parse(x.recordedAt)));
  const useLive = history !== null && history.length > 0 && latest(history) >= latest(p.history);
  const merged = useLive ? { ...p, history } : p;
  return <PlatformTracker campaign={campaign} p={merged} detailed={detailed} live={useLive} />;
}
