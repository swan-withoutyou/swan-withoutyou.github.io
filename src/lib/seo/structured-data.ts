import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social-links";
import type { Track } from "@/data/music";

/** MusicRecording schema with verified fields only (no release date or credits until confirmed). */
export function musicRecordingLd(track: Track, path: string) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    url: `${siteConfig.url}${path}`,
    byArtist: {
      "@type": "MusicGroup",
      name: track.artist,
      sameAs: [socialLinks.swanArtistProfile.url, socialLinks.spotifyArtist.url, socialLinks.swanFacebook.url],
    },
    recordLabel: { "@type": "Organization", name: track.label, url: socialLinks.syeHoldings.url },
    inLanguage: "vi",
  };
  if (track.releaseDate) data.datePublished = track.releaseDate;
  return data;
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.path}`,
    })),
  };
}
