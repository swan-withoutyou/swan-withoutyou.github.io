import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { thieuNangLyrics } from "@/data/lyrics";
import { canPublishLyrics } from "@/lib/lyrics";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/music/",
    "/music-video/",
    "/top-1-itunes/",
    "/lyrics/",
    "/road-to-1m/",
    "/streaming-guide/",
    "/fan-content/",
    "/fan-community/",
    "/about/",
    "/updates/",
    "/privacy/",
    "/terms/",
  ];
  // The lyrics page is only listed once authorised lyrics are published (it is noindex until then).
  if (canPublishLyrics(thieuNangLyrics)) paths.splice(4, 0, "/lyrics/thieu-nang/");
  return paths.map((p) => ({
    url: `${siteConfig.url}${p}`,
    changeFrequency: p === "/road-to-1m/" ? "daily" : "weekly",
    priority: p === "/" ? 1 : p.startsWith("/lyrics/thieu-nang") || p === "/music-video/" ? 0.9 : 0.6,
  }));
}
