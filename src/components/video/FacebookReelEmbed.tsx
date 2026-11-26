"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Public Facebook reel/video URL, e.g. https://www.facebook.com/reel/1113704614825274 */
  url: string;
  title: string;
  caption?: string;
};

/** Builds the official Facebook video-plugin embed URL. */
export function facebookEmbedSrc(url: string, autoplay: boolean): string {
  const src = new URL("https://www.facebook.com/plugins/video.php");
  src.searchParams.set("href", url);
  src.searchParams.set("show_text", "false");
  src.searchParams.set("width", "360");
  src.searchParams.set("autoplay", autoplay ? "true" : "false");
  return src.toString();
}

/**
 * Vertical (9:16) Facebook reel. The player is only loaded once it scrolls into view, and then
 * autoplays. Browsers only allow autoplay without sound, so it starts muted; visitors tap for sound.
 */
export function FacebookReelEmbed({ url, title, caption }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="mx-auto w-full max-w-[360px]" data-testid="facebook-reel">
      <div ref={box} className="glass relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem]">
        {visible ? (
          <iframe
            src={facebookEmbedSrc(url, true)}
            title={title}
            className="absolute inset-0 size-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-lilac/60" aria-hidden>
            Đang tải video…
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-lilac/65">
        {caption && <span>{caption}</span>}
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-cloud underline decoration-lilac/40 underline-offset-4 hover:decoration-cloud">
          Xem trên Facebook ↗
        </a>
      </figcaption>
    </figure>
  );
}
