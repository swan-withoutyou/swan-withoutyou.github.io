export const LYRICS_LANGUAGES = ["vi", "en", "zh-CN"] as const;
export type LyricsLanguage = (typeof LYRICS_LANGUAGES)[number];

export type TranslationStatus = "draft" | "review" | "approved" | "published";
/** Rights state for the song's lyrics as a whole. */
export type PublicationStatus = "draft" | "pending_rights" | "published" | "unpublished";

export type LyricsLine = {
  id: string;
  text: string;
  /** Seconds from the start of the official MV. Never estimate these. */
  startTime?: number;
  endTime?: number;
};

export type LyricsSection = {
  id: string;
  sectionType: string;
  heading: string;
  lines: LyricsLine[];
};

export type LanguageLyrics = {
  languageName: string;
  sections: LyricsSection[];
  translationStatus: TranslationStatus;
  /** Who produced / authorised this version (e.g. "SYE Holdings"). */
  translationSource?: string;
};

export type MultilingualLyrics = {
  songId: string;
  sourceLanguage: "vi";
  publicationStatus: PublicationStatus;
  rightsConfirmed: boolean;
  /** Whether the copy-lyrics button is permitted by the rights holder. */
  allowCopy: boolean;
  languages: Record<LyricsLanguage, LanguageLyrics>;
};
