import type { MultilingualLyrics } from "@/types/lyrics";
import { viLyrics } from "./vi";
import { enLyrics } from "./en";
import { zhCNLyrics } from "./zh-CN";

export const thieuNangLyrics: MultilingualLyrics = {
  songId: "thieu-nang",
  sourceLanguage: "vi",
  // Flip to "published" + rightsConfirmed: true only after written confirmation from the rights holder.
  publicationStatus: "pending_rights",
  rightsConfirmed: false,
  allowCopy: false,
  languages: { vi: viLyrics, en: enLyrics, "zh-CN": zhCNLyrics },
};
