"use client";

import { useEffect, useMemo } from "react";
import type { LanguageLyrics } from "@/types/lyrics";
import { findActiveLineId, hasTimestamps } from "@/lib/lyrics";
import { usePlayer } from "@/components/video/PlayerContext";

/**
 * Derives the active line from the shared player time. Because all languages share
 * line ids, switching language keeps the same line highlighted at the same timestamp.
 */
export function useSyncedLine(lyrics: LanguageLyrics | undefined, container: HTMLElement | null) {
  const player = usePlayer();
  const synced = hasTimestamps(lyrics) && !!player;
  const time = player?.currentTime ?? 0;
  const activeLineId = useMemo(() => (synced ? findActiveLineId(lyrics, time) : null), [synced, lyrics, time]);
  const playing = player?.playing ?? false;

  useEffect(() => {
    if (!activeLineId || !container || !playing) return;
    const el = container.querySelector<HTMLElement>(`[data-line-id="${activeLineId}"]`);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [activeLineId, container, playing]);

  return { synced, activeLineId, seekTo: player?.seekTo };
}

export function SyncBadge({ synced }: { synced: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.25em] text-lilac/60">
      <span aria-hidden className={`size-1.5 rounded-full ${synced ? "bg-[#1ed760]" : "bg-lilac/40"}`} />
      {synced ? "Đồng bộ với MV" : "Chưa có mốc thời gian đồng bộ"}
    </span>
  );
}
