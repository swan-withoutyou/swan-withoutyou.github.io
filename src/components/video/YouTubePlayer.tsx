"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePlayer } from "./PlayerContext";

/* Minimal typings for the YouTube IFrame Player API. */
type YTPlayer = {
  getCurrentTime(): number;
  getPlayerState(): number;
  seekTo(s: number, allowSeekAhead: boolean): void;
  playVideo(): void;
  destroy(): void;
};
type YTNamespace = {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId: string;
      host?: string;
      playerVars?: Record<string, number | string>;
      events?: { onReady?: () => void; onStateChange?: (e: { data: number }) => void };
    },
  ) => YTPlayer;
};
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT as YTNamespace);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

type Props = {
  videoId: string;
  title: string;
  /** Badge shown on the poster, e.g. "Teaser". */
  badge?: string;
  priority?: boolean;
};

/**
 * Click-to-load YouTube player (facade). Avoids loading YouTube until the user
 * asks to play, then reports playback time to PlayerContext for synced lyrics.
 */
export function YouTubePlayer({ videoId, title, badge, priority = false }: Props) {
  const player = usePlayer();
  const [activated, setActivated] = useState(false);
  const [thumb, setThumb] = useState<string | null>(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
  const frameRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ytRef = useRef<YTPlayer | null>(null);
  const domId = useId().replace(/:/g, "");

  const setPlayback = player?.setPlayback;
  const registerSeek = player?.registerSeek;

  useEffect(() => {
    if (!activated || !frameRef.current) return;
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !frameRef.current) return;
      const p = new YT.Player(frameRef.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: () => {
            p.playVideo();
            registerSeek?.((t) => {
              p.seekTo(t, true);
              p.playVideo();
            });
          },
          onStateChange: (e) => setPlayback?.(p.getCurrentTime(), e.data === 1),
        },
      });
      ytRef.current = p;
      timer = setInterval(() => {
        try {
          setPlayback?.(p.getCurrentTime(), p.getPlayerState() === 1);
        } catch {
          /* player not ready yet */
        }
      }, 250);
    });
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      registerSeek?.(null);
      ytRef.current?.destroy();
      ytRef.current = null;
    };
  }, [activated, videoId, setPlayback, registerSeek]);

  const fullscreen = useCallback(() => {
    const el = wrapRef.current;
    if (el?.requestFullscreen) el.requestFullscreen().catch(() => {});
  }, []);

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className="relative aspect-video w-full overflow-hidden rounded-[1.75rem] bg-night-deep shadow-[0_40px_120px_-30px_rgb(118_103_201/0.55)] ring-1 ring-lilac/15"
      >
        {activated ? (
          <div ref={frameRef} id={`yt-${domId}`} className="absolute inset-0 size-full [&>iframe]:size-full" title={title} />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            className="group absolute inset-0 size-full cursor-pointer"
            aria-label={`Phát video: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {thumb && <img
              src={thumb}
              alt=""
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              onError={() => setThumb((t) => (t?.includes("maxresdefault") ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null))}
              className="absolute inset-0 size-full object-cover opacity-80 transition duration-1000 ease-cine group-hover:scale-[1.03] group-hover:opacity-95"
            />}
            <span className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cloud/40 bg-cloud/10 backdrop-blur-md transition duration-500 ease-cine group-hover:scale-110 group-hover:bg-cloud/25 sm:size-24">
              <svg viewBox="0 0 24 24" className="ml-1 size-8 fill-cloud" aria-hidden>
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-left">
              <span className="font-serif text-xl text-cloud sm:text-2xl">{title}</span>
              {badge && (
                <span className="shrink-0 rounded-full border border-soft/50 bg-night/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-lilac">
                  {badge}
                </span>
              )}
            </span>
          </button>
        )}
      </div>
      {activated && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={fullscreen}
            className="rounded-full border border-lilac/20 px-4 py-1.5 text-xs tracking-wide text-lilac/80 transition hover:border-lilac/50 hover:text-cloud"
          >
            ⤢ Toàn màn hình
          </button>
        </div>
      )}
    </div>
  );
}
