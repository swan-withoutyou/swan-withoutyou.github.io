export type VideoAsset = {
  youtubeId: string;
  url: string;
  title: string;
  channel: string;
  role: "teaser" | "official_mv" | "other";
  verifiedAt: string;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  label: string;
  /** Null until an official release date is published by the label. */
  releaseDate: string | null;
  officialMv: VideoAsset | null;
  teaser: VideoAsset | null;
  /** Other supplied SWAN videos — shown as such, never as the Thiếu Nàng MV. */
  otherVideos: VideoAsset[];
  spotifyTrackUrl: string | null;
  credits: Array<{ role: string; name: string }>;
};

export const thieuNang: Track = {
  id: "thieu-nang",
  title: "Thiếu Nàng",
  artist: "SWAN",
  label: "SYE Holdings",
  releaseDate: null,
  officialMv: null,
  teaser: {
    youtubeId: "B8cb4a-iNco",
    url: "https://www.youtube.com/watch?v=B8cb4a-iNco",
    title: "SWAN - Thiếu Nàng [Teaser]",
    channel: "SYE Official",
    role: "teaser",
    verifiedAt: "2026-11-25",
  },
  otherVideos: [
    {
      youtubeId: "x3PrjAEnGuvsJD89874oM",
      url: "https://www.youtube.com/playlist?list=PLhaC1_LDZIF_x3PrjAEnGuvsJD89874oM",
      title: "MV có sự tham gia của SWAN",
      channel: "Nhiều bên",
      role: "other",
      verifiedAt: "2026-11-25",
    },
  ],
  spotifyTrackUrl: null,
  credits: [],
};

/** The video to feature: the official MV when configured, otherwise the teaser. */
export function featuredVideo(t: Track = thieuNang): VideoAsset | null {
  return t.officialMv ?? t.teaser;
}
