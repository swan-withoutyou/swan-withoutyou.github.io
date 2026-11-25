"use client";

import { useRef } from "react";
import type { LyricsLanguage } from "@/types/lyrics";
import { LANGUAGE_OPTIONS } from "@/lib/lyrics";

type Props = {
  value: LyricsLanguage;
  onChange: (lang: LyricsLanguage) => void;
  available: Record<LyricsLanguage, boolean>;
  compact?: boolean;
};

/** Accessible radiogroup of the three lyric languages (arrow keys move between options). */
export function LanguageSelector({ value, onChange, available, compact = false }: Props) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + LANGUAGE_OPTIONS.length) % LANGUAGE_OPTIONS.length;
    onChange(LANGUAGE_OPTIONS[next].code);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Chọn ngôn ngữ lời bài hát"
      className="inline-flex rounded-full border border-lilac/20 bg-night/60 p-1 backdrop-blur-md"
    >
      {LANGUAGE_OPTIONS.map((opt, i) => {
        const active = opt.code === value;
        return (
          <button
            key={opt.code}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            lang={opt.htmlLang}
            data-lang={opt.code}
            onClick={() => onChange(opt.code)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative rounded-full transition duration-500 ease-cine ${
              compact ? "px-3.5 py-1.5 text-xs" : "px-5 py-2 text-sm"
            } ${active ? "bg-cloud text-night shadow-[0_6px_24px_-6px_rgb(169_155_239/0.9)]" : "text-lilac/75 hover:text-cloud"}`}
          >
            {compact ? opt.short : opt.label}
            {!available[opt.code] && (
              <span
                aria-hidden
                title="Chưa có nội dung"
                className={`absolute right-1.5 top-1.5 size-1.5 rounded-full ${active ? "bg-lavender" : "bg-soft/60"}`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
