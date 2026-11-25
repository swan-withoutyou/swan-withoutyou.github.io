import type { LanguageLyrics } from "@/types/lyrics";

/**
 * SOURCE OF TRUTH — original Vietnamese lyrics of "Thiếu Nàng".
 *
 * Intentionally empty: lyrics must come from the rights holder (SWAN / SYE Holdings).
 * Do not type lyrics from memory or copy them from third-party sites.
 * See README → "How to add Vietnamese lyrics".
 *
 * Example shape (replace with the authorised text):
 *   { id: "verse-1", sectionType: "verse", heading: "Verse 1",
 *     lines: [{ id: "verse-1-l1", text: "…", startTime: 12.4, endTime: 15.1 }] }
 */
export const viLyrics: LanguageLyrics = {
  languageName: "Tiếng Việt",
  translationStatus: "draft",
  sections: [],
};
