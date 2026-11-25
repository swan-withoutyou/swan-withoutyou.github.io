"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type PlayerState = {
  currentTime: number;
  playing: boolean;
  setPlayback: (t: number, playing: boolean) => void;
  registerSeek: (fn: ((t: number) => void) | null) => void;
  seekTo: (t: number) => void;
};

const Ctx = createContext<PlayerState | null>(null);

/**
 * Shares the YouTube playback position with the lyrics viewer.
 * The player lives outside the lyrics component tree, so switching lyric
 * language never touches the video and playback position is preserved.
 */
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTime, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const seekRef = useRef<((t: number) => void) | null>(null);

  const setPlayback = useCallback((t: number, p: boolean) => {
    setTime(t);
    setPlaying(p);
  }, []);
  const registerSeek = useCallback((fn: ((t: number) => void) | null) => {
    seekRef.current = fn;
  }, []);
  const seekTo = useCallback((t: number) => seekRef.current?.(t), []);

  const value = useMemo(
    () => ({ currentTime, playing, setPlayback, registerSeek, seekTo }),
    [currentTime, playing, setPlayback, registerSeek, seekTo],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlayer() {
  return useContext(Ctx);
}
