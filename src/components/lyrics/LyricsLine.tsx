"use client";

import type { LyricsLine as Line } from "@/types/lyrics";

export function LyricsLine({
  line,
  active,
  seekable,
  onSeek,
}: {
  line: Line;
  active: boolean;
  seekable: boolean;
  onSeek?: (t: number) => void;
}) {
  const base = `block rounded-lg px-2 -mx-2 py-1 transition-all duration-500 ease-cine ${
    active ? "text-cloud bg-white/[0.06] title-glow scale-[1.01] origin-left" : "text-lilac/80"
  }`;
  if (seekable && line.startTime !== undefined) {
    return (
      <button
        type="button"
        data-line-id={line.id}
        aria-current={active ? "true" : undefined}
        onClick={() => onSeek?.(line.startTime as number)}
        className={`${base} w-full text-left hover:text-cloud`}
      >
        {line.text}
      </button>
    );
  }
  return (
    <span data-line-id={line.id} aria-current={active ? "true" : undefined} className={base}>
      {line.text}
    </span>
  );
}
