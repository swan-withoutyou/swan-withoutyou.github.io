import type { LanguageLyrics } from "@/types/lyrics";

// English translation of the Vietnamese lyrics.
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

export const enLyrics: LanguageLyrics = {
  languageName: "English",
  translationStatus: "approved",
  translationSource: "Translated from the Vietnamese official MV subtitles",
  sections: [
    {
      id: "verse-1",
      sectionType: "verse",
      heading: "Verse 1",
      lines: [
        L("verse-1-l1", "Lately, the nights seem to grow longer", 30.36),
        L("verse-1-l2", "Leaving me with countless familiar memories to retrospect"),
        L("verse-1-l3", "Do the autumn skies know how far apart we've grown?", 39.64),
        L("verse-1-l4", "My heart still waits foolishly, hoping you'll come by"),
      ],
    },
    {
      id: "pre-chorus-1",
      sectionType: "pre-chorus",
      heading: "Pre-Chorus",
      lines: [
        L("pre-chorus-1-l1", "I never knew that, with you gone, the world could feel", 48.68),
        L("pre-chorus-1-l2", "So utterly lonely"),
        L("pre-chorus-1-l3", "Do you miss me the way I miss you?", 58.04),
        L("pre-chorus-1-l4", "Because if you were me, perhaps you'd understand"),
      ],
    },
    {
      id: "chorus-1",
      sectionType: "chorus",
      heading: "Chorus",
      lines: [
        L("chorus-1-l1", "The love in my heart is meant for you alone", 65.74),
        L("chorus-1-l2", "The one I love most in this world"),
        L("chorus-1-l3", "No one else has ever kept me longing day and night like this", 72.10),
        L("chorus-1-l4", "Don't leave my heart lost in a dream", 76.88),
        L("chorus-1-l5", "For my whole world would fall apart if I had to be without you", 81.39, 86.38),
        L("chorus-1-l6", "For my whole world would fall apart if I had to be without you", 90.64),
      ],
    },
    {
      id: "verse-2",
      sectionType: "verse",
      heading: "Verse 2",
      lines: [
        L("verse-2-l1", "Ah, have you been sleeping well lately?", 94.79),
        L("verse-2-l2", "Now that I'm no longer by your side, do you ever miss me?"),
        L("verse-2-l3", "There's no one left to quietly worry about you", 99.81),
        L("verse-2-l4", "To stay by your side, caring for you day and night"),
        L("verse-2-l5", "I'm still the same", 104.44),
        L("verse-2-l6", "Still weighed down by all these feelings"),
        L("verse-2-l7", "I can't sleep peacefully while my heart is unsettled", 107.63),
        L("verse-2-l8", "All day, I keep wandering, searching for a familiar silhouette"),
      ],
    },
    {
      id: "pre-chorus-2",
      sectionType: "pre-chorus",
      heading: "Pre-Chorus",
      lines: [
        L("pre-chorus-2-l1", "What can we do to be close to each other again?", 113.98),
        L("pre-chorus-2-l2", "To nestle in each other's arms like before"),
        L("pre-chorus-2-l3", "Do you long for me as I still long for you?", 123.41),
        L("pre-chorus-2-l4", "Because if you were me, perhaps you'd understand"),
      ],
    },
    {
      id: "chorus-2",
      sectionType: "chorus",
      heading: "Chorus",
      lines: [
        L("chorus-2-l1", "The love in my heart is meant for you alone", 130.99),
        L("chorus-2-l2", "The one I love most in this world"),
        L("chorus-2-l3", "No one else has ever kept me longing day and night like this", 137.20),
        L("chorus-2-l4", "Don't leave my heart lost in a dream", 142.00),
        L("chorus-2-l5", "For my whole world would fall apart if I had to be without you", 146.66),
      ],
    },
    {
      id: "bridge",
      sectionType: "bridge",
      heading: "Bridge",
      lines: [
        L("bridge-l1", "It seems the distance hasn't changed me", 151.39),
        L("bridge-l2", "It has only made my love grow stronger every day"),
        L("bridge-l3", "No matter how many seasons pass", 159.55),
        L("bridge-l4", "Even as autumn fades and winter arrives"),
        L("bridge-l5", "I'm still the same… still in love with you", 163.48, 168.82),
      ],
    },
    {
      id: "outro",
      sectionType: "outro",
      heading: "Outro",
      lines: [
        L("outro-l1", "Do you feel my absence?", 188.47),
        L("outro-l2", "Because I feel yours"),
        L("outro-l3", "Don't leave my heart lost in a dream", 197.79),
        L("outro-l4", "For my whole world would fall apart if I had to be without you", 202.57, 208.88),
      ],
    },
  ],
};
