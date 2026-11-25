"use client";

import type { LyricsSection as Section } from "@/types/lyrics";
import { LyricsLine } from "./LyricsLine";

export function LyricsSection({
  section,
  activeLineId,
  isActiveSection,
  seekable,
  onSeek,
}: {
  section: Section;
  activeLineId: string | null;
  isActiveSection: boolean;
  seekable: boolean;
  onSeek?: (t: number) => void;
}) {
  const isChorus = /chorus|điệp|hook/i.test(section.sectionType);
  return (
    <section
      id={`lyrics-${section.id}`}
      data-section-id={section.id}
      aria-labelledby={`lyrics-h-${section.id}`}
      className={`relative scroll-mt-40 border-l pl-5 transition-colors duration-700 sm:pl-7 ${
        isActiveSection ? "border-soft" : "border-lilac/10"
      }`}
    >
      <h3
        id={`lyrics-h-${section.id}`}
        className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-soft/90"
      >
        {section.heading}
      </h3>
      <p
        className={`space-y-1 font-serif leading-[1.65] ${
          isChorus ? "text-[1.35rem] italic sm:text-[1.6rem]" : "text-[1.2rem] sm:text-[1.4rem]"
        }`}
      >
        {section.lines.map((ln) => (
          <LyricsLine key={ln.id} line={ln} active={ln.id === activeLineId} seekable={seekable} onSeek={onSeek} />
        ))}
      </p>
    </section>
  );
}
