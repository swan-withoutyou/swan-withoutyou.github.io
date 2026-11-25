export type Fansite = {
  id: string;
  order: number;
  name: string;
  tagline: string;
  description: string;
  /** Path under /public, or null for a monogram avatar. */
  logo: string | null;
  threadsUrl: string | null;
  /** Original QR image supplied by the owner. Never regenerated. */
  qrImage: string | null;
  qrAlt: string;
  /** Direct Messenger invite URL. Only set when supplied by the owner. */
  messengerInviteUrl: string | null;
};

export type FanPost = {
  id: string;
  authorName: string;
  username: string;
  text: string;
  mediaType: "text" | "image" | "video";
  mediaUrl?: string;
  publishedAt: string;
  permalink: string;
  tags: Array<"swan" | "thieu-nang">;
  approved: boolean;
};

export type CampaignUpdate = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
};
