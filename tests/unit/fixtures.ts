import type { LanguageLyrics, MultilingualLyrics } from "@/types/lyrics";

/** Clearly synthetic placeholder text — NOT the song's lyrics. Used only to test structure/behaviour. */
const make = (name: string, prefix: string, status: LanguageLyrics["translationStatus"] = "approved"): LanguageLyrics => ({
  languageName: name,
  translationStatus: status,
  sections: [
    { id: "verse-1", sectionType: "verse", heading: `${prefix} Verse 1`, lines: [
      { id: "verse-1-l1", text: `${prefix} line A`, startTime: 10, endTime: 14 },
      { id: "verse-1-l2", text: `${prefix} line B`, startTime: 14, endTime: 18 },
    ] },
    { id: "chorus-1", sectionType: "chorus", heading: `${prefix} Chorus`, lines: [
      { id: "chorus-1-l1", text: `${prefix} line C`, startTime: 18 },
      { id: "chorus-1-l2", text: `${prefix} line D`, startTime: 22 },
    ] },
  ],
});

export function fixtureLyrics(overrides: Partial<MultilingualLyrics> = {}): MultilingualLyrics {
  return {
    songId: "test-song",
    sourceLanguage: "vi",
    publicationStatus: "published",
    rightsConfirmed: true,
    allowCopy: true,
    languages: { vi: make("Tiếng Việt", "VI"), en: make("English", "EN"), "zh-CN": make("中文", "ZH") },
    ...overrides,
  };
}
