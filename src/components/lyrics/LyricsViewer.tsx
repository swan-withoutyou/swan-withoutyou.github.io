"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { LYRICS_LANGUAGES, type LanguageLyrics, type LyricsLanguage } from "@/types/lyrics";
import { LANGUAGE_OPTIONS, type UnavailableReason } from "@/lib/lyrics";
import { LanguageSelector } from "./LanguageSelector";
import { LyricsSection } from "./LyricsSection";
import { SyncBadge, useSyncedLine } from "./SyncedLyrics";

type Props = {
  /** Only publicly publishable languages are passed from the server. */
  lyrics: Partial<Record<LyricsLanguage, LanguageLyrics>>;
  reasons: Record<LyricsLanguage, UnavailableReason | null>;
  allowCopy: boolean;
  variant?: "full" | "preview";
  previewLineCount?: number;
};

const STORAGE_KEY = "swan:lyrics-lang";

const MESSAGES: Record<UnavailableReason, Record<LyricsLanguage, { title: string; body: string }>> = {
  pending_rights: {
    vi: {
      title: "Đang chờ MV xuất hiện",
      body: "Lời chính thức của “Thiếu Nàng” sẽ xuất hiện tại đây khi MV được đăng tải.",
    },
    en: {
      title: "Waiting for the MV to appear",
      body: "The official lyrics of 'Thiếu Nàng' (Without You) will appear here when the MV is uploaded.",
    },
    "zh-CN": {
      title: "等待 MV 出现",
      body: "《Thiếu Nàng》的官方歌词将在 MV 发布后显示于此。",
    },
  },
  not_approved: {
    vi: { title: "Lời bài hát chưa được duyệt", body: "Phiên bản tiếng Việt đang chờ duyệt trước khi công bố." },
    en: {
      title: "English translation not yet available",
      body: "An authorised English translation is still in preparation or review.",
    },
    "zh-CN": { title: "中文译词暂未提供", body: "经授权的中文译词仍在准备或审核中。" },
  },
  empty: {
    vi: { title: "Chưa có nội dung", body: "Lời bài hát chưa được cập nhật." },
    en: { title: "Translation unavailable", body: "No authorised English translation has been supplied yet." },
    "zh-CN": { title: "暂无译词", body: "尚未提供经授权的中文译词。" },
  },
};

export function LyricsViewer({ lyrics, reasons, allowCopy, variant = "full", previewLineCount = 4 }: Props) {
  const [lang, setLang] = useState<LyricsLanguage>("vi");
  const [copied, setCopied] = useState(false);
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const anchorRef = useRef<{ id: string; top: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const attachContainer = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
    if (el) setContainer(el);
  }, []);

  const current = lyrics[lang];
  const available = Object.fromEntries(LYRICS_LANGUAGES.map((l) => [l, !!lyrics[l]])) as Record<LyricsLanguage, boolean>;
  const reason = current ? null : (reasons[lang] ?? "empty");
  const htmlLang = LANGUAGE_OPTIONS.find((o) => o.code === lang)?.htmlLang ?? "vi";

  const { synced, activeLineId, seekTo } = useSyncedLine(current, container);

  // Restore last chosen language (per browser) after hydration.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LyricsLanguage | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage
      if (saved && (LYRICS_LANGUAGES as readonly string[]).includes(saved)) setLang(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  /** Before switching, remember which line is at the top of the viewport so we can keep it in place. */
  const changeLang = useCallback(
    (next: LyricsLanguage) => {
      if (next === lang) return;
      const root = containerRef.current;
      if (root) {
        const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-line-id]"));
        const first = lines.find((el) => el.getBoundingClientRect().top >= 80);
        anchorRef.current = first ? { id: first.dataset.lineId as string, top: first.getBoundingClientRect().top } : null;
      }
      setLang(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
    },
    [lang],
  );

  // Keep the same line at the same screen position after the language swap.
  useLayoutEffect(() => {
    const a = anchorRef.current;
    anchorRef.current = null;
    const root = containerRef.current;
    if (!a || !root) return;
    const el = root.querySelector<HTMLElement>(`[data-line-id="${a.id}"]`);
    if (el) window.scrollBy({ top: el.getBoundingClientRect().top - a.top, behavior: "instant" as ScrollBehavior });
  }, [lang]);

  // Current-section highlighting while reading (when not driven by video sync).
  useEffect(() => {
    if (!container || variant === "preview" || typeof IntersectionObserver === "undefined") return;
    const sections = container.querySelectorAll<HTMLElement>("[data-section-id]");
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setVisibleSection((vis[0].target as HTMLElement).dataset.sectionId ?? null);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [container, lang, variant, current]);

  const activeSectionId =
    (activeLineId && current?.sections.find((s) => s.lines.some((l) => l.id === activeLineId))?.id) || visibleSection;

  const copy = async () => {
    if (!current) return;
    const text = current.sections.map((s) => `[${s.heading}]\n${s.lines.map((l) => l.text).join("\n")}`).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  const sections =
    variant === "preview" && current
      ? (() => {
          let left = previewLineCount;
          return current.sections
            .map((s) => {
              const lines = s.lines.slice(0, Math.max(0, left));
              left -= lines.length;
              return { ...s, lines };
            })
            .filter((s) => s.lines.length);
        })()
      : current?.sections;

  return (
    <div className="relative">
      <div
        className={`flex flex-wrap items-center gap-4 ${
          variant === "full" ? "sticky top-16 z-30 -mx-5 bg-night/80 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8" : ""
        }`}
      >
        <LanguageSelector value={lang} onChange={changeLang} available={available} compact={variant === "preview"} />
        {variant === "full" && (
          <div className="flex flex-1 flex-wrap items-center justify-end gap-4">
            <SyncBadge synced={synced} />
            {allowCopy && current && (
              <button
                type="button"
                onClick={copy}
                className="rounded-full border border-lilac/25 px-4 py-1.5 text-xs text-lilac/85 transition hover:border-lilac/60 hover:text-cloud"
              >
                {copied ? "Đã sao chép ✓" : "Sao chép lời"}
              </button>
            )}
          </div>
        )}
      </div>

      {variant === "full" && current && current.sections.length > 1 && (
        <nav aria-label="Các đoạn của bài hát" className="mt-6 flex flex-wrap gap-2">
          {current.sections.map((s) => (
            <a
              key={s.id}
              href={`#lyrics-${s.id}`}
              aria-current={activeSectionId === s.id ? "true" : undefined}
              className={`rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] transition ${
                activeSectionId === s.id ? "bg-soft/20 text-cloud" : "text-lilac/60 hover:text-cloud"
              }`}
            >
              {s.heading}
            </a>
          ))}
        </nav>
      )}

      <div
        ref={attachContainer}
        key={lang}
        lang={htmlLang}
        aria-live="polite"
        data-testid="lyrics-body"
        data-lang={lang}
        className="lyrics-fade mt-8"
      >
        {sections && sections.length ? (
          <div className="space-y-10">
            {sections.map((s) => (
              <LyricsSection
                key={s.id}
                section={s}
                activeLineId={activeLineId}
                isActiveSection={activeSectionId === s.id}
                seekable={synced}
                onSeek={seekTo}
              />
            ))}
          </div>
        ) : (
          <UnavailableState lang={lang} reason={reason ?? "empty"} compact={variant === "preview"} />
        )}
      </div>
    </div>
  );
}

function UnavailableState({ lang, reason, compact }: { lang: LyricsLanguage; reason: UnavailableReason; compact: boolean }) {
  const m = MESSAGES[reason][lang];
  return (
    <div
      role="status"
      data-testid="lyrics-unavailable"
      data-reason={reason}
      className={`glass relative overflow-hidden rounded-3xl ${compact ? "p-6" : "p-8 sm:p-12"}`}
    >
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-lavender/20 blur-3xl" />
      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-soft">
        {reason === "pending_rights" ? "Chờ xác nhận bản quyền" : "Chưa có bản dịch"}
      </p>
      <p className={`mt-3 font-serif text-cloud ${compact ? "text-2xl" : "text-3xl sm:text-4xl"}`}>{m.title}</p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-lilac/75">{m.body}</p>
      {!compact && (
        <div aria-hidden className="mt-8 space-y-3">
          {[78, 64, 86, 52].map((w, i) => (
            <div key={i} className="h-3 rounded-full bg-lilac/[0.07]" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}
    </div>
  );
}
