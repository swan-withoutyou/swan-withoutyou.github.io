import type { LanguageLyrics } from "@/types/lyrics";

// startTime and endTime are measured in seconds from the official MV.
const L = (
  id: string,
  text: string,
  startTime?: number,
  endTime?: number,
) => ({
  id,
  text,
  ...(startTime !== undefined ? { startTime } : {}),
  ...(endTime !== undefined ? { endTime } : {}),
});

export const viLyrics: LanguageLyrics = {
  languageName: "Tiếng Việt",
  translationStatus: "approved",
  translationSource: "SWAN / SYE Holdings",
  sections: [
    // VERSE 1 — Lines 1–4 | Cues 1–2
    {
      id: "verse-1",
      sectionType: "verse",
      heading: "Đoạn 1",
      lines: [
        L("verse-1-l1", "Dạo này màn đêm cứ trôi dài thêm", 30.36),
        L("verse-1-l2", "Để lại anh với bao thân quen đang đợi nhớ đến"),
        L("verse-1-l3", "Trời thu thay lá có hay mình cách xa", 39.64),
        L("verse-1-l4", "Để lòng anh mãi ngu ngơ trông mong nàng ghé qua"),
      ],
    },

    // PRE-CHORUS 1 — Lines 5–8 | Cues 3–4
    {
      id: "pre-chorus-1",
      sectionType: "pre-chorus",
      heading: "Tiền điệp khúc",
      lines: [
        L("pre-chorus-1-l1", "Chẳng thể ngờ thế gian kể từ ngày vắng em", 48.68),
        L("pre-chorus-1-l2", "Hóa ra lại buồn tênh đến thế"),
        L("pre-chorus-1-l3", "Liệu nàng có nhớ anh như anh nhớ em", 58.04),
        L("pre-chorus-1-l4", "Bởi vì nếu nàng là anh thì có lẽ nàng sẽ thấy"),
      ],
    },

    // CHORUS 1 — Lines 9–14 | Cues 5–9
    {
      id: "chorus-1",
      sectionType: "chorus",
      heading: "Điệp khúc",
      lines: [
        L("chorus-1-l1", "Tình trong anh, chỉ dành duy nhất em thôi", 65.74),
        L("chorus-1-l2", "Người anh yêu nhất trên đời"),
        L("chorus-1-l3", "Chẳng một ai khiến anh đêm ngày chờ mong đến thế", 72.10),
        L("chorus-1-l4", "Đừng để trái tim anh sống trong mơ màng", 76.88),
        L("chorus-1-l5", "Vì cả thế giới sẽ vỡ tan nếu phải ‘thiếu nàng’", 81.39, 86.38),
        L("chorus-1-l6", "Vì cả thế giới sẽ vỡ tan nếu phải ‘thiếu nàng’", 90.64),
      ],
    },

    // VERSE 2 — Lines 15–22 | Cues 10–13
    {
      id: "verse-2",
      sectionType: "verse",
      heading: "Đoạn 2",
      lines: [
        L("verse-2-l1", "Ah, dạo này em có yên giấc không", 94.79),
        L("verse-2-l2", "Từng ngày không còn anh ở bên, em có nhớ mong"),
        L("verse-2-l3", "Chẳng còn ai âm thầm lắng lo", 99.81),
        L("verse-2-l4", "Ở cạnh bên em ngày đêm chăm sóc ân cần"),
        L("verse-2-l5", "Anh vẫn vậy", 104.44),
        L("verse-2-l6", "Còn bận lòng với đống cảm xúc này"),
        L("verse-2-l7", "Chẳng thể nào ngủ yên khi tim chưa yên bình", 107.63),
        L("verse-2-l8", "Cả ngày anh cứ loay hoay đi tìm một bóng hình"),
      ],
    },

    // PRE-CHORUS 2 — Lines 23–26 | Cues 14–15
    {
      id: "pre-chorus-2",
      sectionType: "pre-chorus",
      heading: "Tiền điệp khúc",
      lines: [
        L("pre-chorus-2-l1", "Phải làm sao để ta được gần lại với nhau", 113.98),
        L("pre-chorus-2-l2", "Nép trong vòng tay như lúc trước"),
        L("pre-chorus-2-l3", "Liệu nàng có ngóng trông như anh vẫn mong", 123.41),
        L("pre-chorus-2-l4", "Bởi vì nếu nàng là anh thì có lẽ nàng sẽ thấy"),
      ],
    },

    // CHORUS 2 — Lines 27–31 | Cues 16–19
    {
      id: "chorus-2",
      sectionType: "chorus",
      heading: "Điệp khúc",
      lines: [
        L("chorus-2-l1", "Tình trong anh, chỉ dành duy nhất em thôi", 130.99),
        L("chorus-2-l2", "Người anh yêu nhất trên đời"),
        L("chorus-2-l3", "Chẳng một ai khiến anh đêm ngày chờ mong đến thế", 137.20),
        L("chorus-2-l4", "Đừng để trái tim anh sống trong mơ màng", 142.00),
        L("chorus-2-l5", "Vì cả thế giới sẽ vỡ tan nếu phải “thiếu nàng”", 146.66),
      ],
    },

    // BRIDGE — Lines 32–36 | Cues 20–22
    {
      id: "bridge",
      sectionType: "bridge",
      heading: "Cầu nối",
      lines: [
        L("bridge-l1", "Dường như khoảng cách chẳng khiến anh đổi thay", 151.39),
        L("bridge-l2", "Chỉ làm tình thêm lớn hơn mỗi ngày"),
        L("bridge-l3", "Dù cho bao mùa trôi qua", 159.55),
        L("bridge-l4", "Cả khi thu tàn đông sang"),
        L("bridge-l5", "Anh vẫn thế… vẫn yêu em", 163.48, 168.82),
      ],
    },

    // OUTRO — Lines 37–40 | Cues 23–25
    {
      id: "outro",
      sectionType: "outro",
      heading: "Kết",
      lines: [
        L("outro-l1", "Nàng thấy thiếu anh không", 188.47),
        L("outro-l2", "Còn anh thấy thiếu nàng"),
        L("outro-l3", "Đừng để trái tim anh sống trong mơ màng", 197.79),
        L("outro-l4", "Vì cả thế giới sẽ vỡ tan nếu phải 'thiếu nàng'", 202.57, 208.88),
      ],
    },
  ],
};