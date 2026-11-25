import { LYRICS_LANGUAGES, type LanguageLyrics, type LyricsLanguage, type MultilingualLyrics } from "@/types/lyrics";

export const LANGUAGE_OPTIONS: Array<{ code: LyricsLanguage; label: string; short: string; htmlLang: string }> = [
  { code: "vi", label: "Tiếng Việt", short: "VI", htmlLang: "vi" },
  { code: "en", label: "English", short: "EN", htmlLang: "en" },
  { code: "zh-CN", label: "中文", short: "中文", htmlLang: "zh-CN" },
];

/** Full lyrics may be shown publicly only when rights are confirmed and the song is published. */
export function canPublishLyrics(l: MultilingualLyrics): boolean {
  return l.publicationStatus === "published" && l.rightsConfirmed;
}

/** A single language is shown only if publishable overall, approved/published, and non-empty. */
export function isLanguageAvailable(l: MultilingualLyrics, lang: LyricsLanguage): boolean {
  if (!canPublishLyrics(l)) return false;
  const v = l.languages[lang];
  return (v.translationStatus === "approved" || v.translationStatus === "published") && v.sections.length > 0;
}

export type UnavailableReason = "pending_rights" | "not_approved" | "empty";

export function unavailableReason(l: MultilingualLyrics, lang: LyricsLanguage): UnavailableReason | null {
  if (!canPublishLyrics(l)) return "pending_rights";
  const v = l.languages[lang];
  if (v.translationStatus !== "approved" && v.translationStatus !== "published") return "not_approved";
  if (v.sections.length === 0) return "empty";
  return null;
}

/** Returns only the content safe to send to the browser / render in HTML. */
export function getPublicLyrics(l: MultilingualLyrics): Partial<Record<LyricsLanguage, LanguageLyrics>> {
  const out: Partial<Record<LyricsLanguage, LanguageLyrics>> = {};
  for (const lang of LYRICS_LANGUAGES) if (isLanguageAvailable(l, lang)) out[lang] = l.languages[lang];
  return out;
}

/** Structural ids (section + line) in order — used to check translations line up with the source. */
export function structureSignature(v: LanguageLyrics): string[] {
  return v.sections.flatMap((s) => [`s:${s.id}`, ...s.lines.map((ln) => `l:${ln.id}`)]);
}

/**
 * Validates that every non-empty translation shares the Vietnamese structure exactly.
 * Returns a list of human-readable problems (empty when valid).
 */
export function validateLyricsStructure(l: MultilingualLyrics): string[] {
  const problems: string[] = [];
  const source = structureSignature(l.languages.vi);
  const seen = new Set<string>();
  for (const id of source) {
    if (seen.has(id)) problems.push(`Duplicate id in vi: ${id}`);
    seen.add(id);
  }
  for (const lang of LYRICS_LANGUAGES) {
    if (lang === "vi") continue;
    const sig = structureSignature(l.languages[lang]);
    if (sig.length === 0) continue; // translation not yet supplied
    if (sig.join("|") !== source.join("|")) problems.push(`${lang} structure does not match vi (ids/order differ)`);
  }
  for (const lang of LYRICS_LANGUAGES) {
    for (const s of l.languages[lang].sections)
      for (const ln of s.lines) {
        if ((ln.startTime === undefined) !== (ln.endTime === undefined) && ln.endTime !== undefined)
          problems.push(`${lang}:${ln.id} has endTime without startTime`);
        if (ln.startTime !== undefined && ln.endTime !== undefined && ln.endTime <= ln.startTime)
          problems.push(`${lang}:${ln.id} endTime must be after startTime`);
      }
  }
  return problems;
}

/** Finds the line active at `t` seconds, using startTime and (endTime or next line's start). */
export function findActiveLineId(v: LanguageLyrics | undefined, t: number): string | null {
  if (!v) return null;
  const lines = v.sections.flatMap((s) => s.lines).filter((ln) => ln.startTime !== undefined);
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const end = ln.endTime ?? lines[i + 1]?.startTime ?? Infinity;
    if (t >= (ln.startTime as number) && t < end) return ln.id;
  }
  return null;
}

export function hasTimestamps(v: LanguageLyrics | undefined): boolean {
  return !!v && v.sections.some((s) => s.lines.some((ln) => ln.startTime !== undefined));
}

export function allUnavailableReasons(l: MultilingualLyrics): Record<LyricsLanguage, UnavailableReason | null> {
  return { vi: unavailableReason(l, "vi"), en: unavailableReason(l, "en"), "zh-CN": unavailableReason(l, "zh-CN") };
}
