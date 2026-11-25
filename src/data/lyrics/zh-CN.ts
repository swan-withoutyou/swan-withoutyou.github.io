import type { LanguageLyrics } from "@/types/lyrics";

// Simplified Chinese translation of the Vietnamese lyrics.
// All timestamps are in seconds from the official MV.
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

export const zhCNLyrics: LanguageLyrics = {
  languageName: "简体中文",
  translationStatus: "approved",
  translationSource: "根据官方 MV 越南语字幕翻译",
  sections: [
    {
      id: "verse-1",
      sectionType: "verse",
      heading: "主歌一",
      lines: [
        L("verse-1-l1", "最近，夜晚仿佛越来越漫长", 30.36),
        L("verse-1-l2", "留下许多熟悉的回忆，等待我再次想起"),
        L("verse-1-l3", "秋日更迭了叶色，可曾知道你我相隔多远？", 39.64),
        L("verse-1-l4", "我的心依旧痴痴等待，盼着你经过"),
      ],
    },
    {
      id: "pre-chorus-1",
      sectionType: "pre-chorus",
      heading: "预副歌",
      lines: [
        L("pre-chorus-1-l1", "从未想过，自从你离开身边", 48.68),
        L("pre-chorus-1-l2", "世界竟会如此寂寞"),
        L("pre-chorus-1-l3", "你是否也像我想你一样想念我？", 58.04),
        L("pre-chorus-1-l4", "因为若你是我，或许你就会明白"),
      ],
    },
    {
      id: "chorus-1",
      sectionType: "chorus",
      heading: "副歌",
      lines: [
        L("chorus-1-l1", "我心中的爱，只为你一人", 65.74),
        L("chorus-1-l2", "你是我此生最爱的人"),
        L("chorus-1-l3", "没有人能让我如此日夜期盼", 72.10),
        L("chorus-1-l4", "别让我的心沉溺在梦境里", 76.88),
        L("chorus-1-l5", "若必须失去你，我的整个世界都会崩塌", 81.39, 86.38),
        L("chorus-1-l6", "若必须失去你，我的整个世界都会崩塌", 90.64),
      ],
    },
    {
      id: "verse-2",
      sectionType: "verse",
      heading: "主歌二",
      lines: [
        L("verse-2-l1", "啊，最近你睡得好吗？", 94.79),
        L("verse-2-l2", "没有我陪在身边的每一天，你会想念我吗？"),
        L("verse-2-l3", "再没有人默默为你牵挂", 99.81),
        L("verse-2-l4", "日夜陪在你身边，细心照料你"),
        L("verse-2-l5", "我依然如故", 104.44),
        L("verse-2-l6", "仍被这满心的情绪牵绊"),
        L("verse-2-l7", "心若无法平静，我便无法安然入睡", 107.63),
        L("verse-2-l8", "整日徘徊，只为寻觅那个身影"),
      ],
    },
    {
      id: "pre-chorus-2",
      sectionType: "pre-chorus",
      heading: "预副歌",
      lines: [
        L("pre-chorus-2-l1", "要怎样才能让我们重新靠近？", 113.98),
        L("pre-chorus-2-l2", "像从前那样依偎在彼此怀里"),
        L("pre-chorus-2-l3", "你是否也像我一直期盼你那样，期盼着我？", 123.41),
        L("pre-chorus-2-l4", "因为若你是我，或许你就会明白"),
      ],
    },
    {
      id: "chorus-2",
      sectionType: "chorus",
      heading: "副歌",
      lines: [
        L("chorus-2-l1", "我心中的爱，只为你一人", 130.99),
        L("chorus-2-l2", "你是我此生最爱的人"),
        L("chorus-2-l3", "没有人能让我如此日夜期盼", 137.20),
        L("chorus-2-l4", "别让我的心沉溺在梦境里", 142.00),
        L("chorus-2-l5", "若必须失去你，我的整个世界都会崩塌", 146.66),
      ],
    },
    {
      id: "bridge",
      sectionType: "bridge",
      heading: "桥段", 
      lines: [
        L("bridge-l1", "距离似乎并没有让我改变", 151.39),
        L("bridge-l2", "只让我的爱一天比一天更深"),
        L("bridge-l3", "无论多少季节流转", 159.55),
        L("bridge-l4", "即使秋尽冬来"),
        L("bridge-l5", "我依然如故……依然爱着你", 163.48, 168.82),
      ],
    },
    {
      id: "outro",
      sectionType: "outro",
      heading: "尾声",
      lines: [
        L("outro-l1", "你会不会觉得少了我？", 188.47),
        L("outro-l2", "而我却觉得少了你"),
        L("outro-l3", "别让我的心沉溺在梦境里", 197.79),
        L("outro-l4", "若必须失去你，我的整个世界都会崩塌", 202.57, 208.88),
      ],
    },
  ],
};
