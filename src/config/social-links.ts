/**
 * Single source of truth for every external URL on the site.
 * Never hard-code these URLs in components — import from here.
 */
export type ExternalLink = {
  url: string;
  label: string;
  /** What we have actually verified about this destination. */
  note?: string;
};

export const socialLinks = {
  spotifyArtist: {
    url: "https://open.spotify.com/track/4piT3QCXKlRnDLvkZ7uRqM",
    label: "Nghe Thiếu Nàng trên Spotify",
  },
  /**
   * Supplied YouTube destination. Verified via YouTube oEmbed (25 Nov 2026):
   * title "SWAN - có lẽ x Prod. Neyun (DRILL VERSION)" by SYE Official.
   * It is NOT the Thiếu Nàng music video, so it is never labelled as such.
   */
  youtubeSupplied: {
    url: "https://youtu.be/XlhmFJ1ZqxU?si=Kzo0QPp2t39GBmNA",
    label: "Xem SWAN trên YouTube",
    note: "có lẽ (Drill Version) — SYE Official",
  },
  /** Verified via YouTube oEmbed: "SWAN - Thiếu Nàng [Teaser]" by SYE Official. */
  thieuNangTeaser: {
    url: "https://www.youtube.com/watch?v=B8cb4a-iNco",
    label: "Thiếu Nàng — Teaser",
  },
  thieuNangMV: {
  url: "https://youtu.be/uTrRuWajO68",
  label: "Thiếu Nàng — MV chính thức",
},
zingMp3: {
  url: "https://zingmp3.vn/album/Thieu-Nang-Single-SWAN/EqoUxTarZMhe.html",
  label: "Nghe Thiếu Nàng trên Zing MP3",
},
tiktokSound: {
  url: "https://www.tiktok.com/music/-7709775560291125300",
  label: "Dùng âm thanh Thiếu Nàng trên TikTok",
},
  syeHoldings: {
    url: "https://www.syeholdings.co/vi/home",
    label: "SYE Holdings — Công ty chủ quản",
  },
  swanArtistProfile: {
    url: "https://www.syeholdings.co/vi/artists/swan",
    label: "Hồ sơ nghệ sĩ SWAN",
  },
  swanFacebook: {
    url: "https://www.facebook.com/SWANNguyen.sye",
    label: "SWAN trên Facebook",
  },
  swanTeamThreads: {
    url: "https://www.threads.com/@doicanhzanzucuaswan",
    label: "Threads của đội ngũ SWAN",
    note: "Tài khoản của ekip SWAN — không phải tài khoản cá nhân của fan.",
  },
  
} as const satisfies Record<string, ExternalLink>;

export type SocialLinkKey = keyof typeof socialLinks;
