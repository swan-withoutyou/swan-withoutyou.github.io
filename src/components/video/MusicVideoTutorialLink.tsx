import { MUSIC_LINKS } from "@/config/campaign";

/** Fan-support tutorial by Sạp Cánh Thiên Nga (Threads). Visually distinct from MV playback CTAs. */
export function MusicVideoTutorialLink() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-soft/40 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm leading-relaxed text-lilac/80">
        Bạn chưa biết cách tham gia và ủng hộ Thiếu Nàng? Xem hướng dẫn chi tiết tại đây nhé!
      </p>
      <a
        href={MUSIC_LINKS.massBuyTutorial}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="tutorial-link"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-soft/60 px-5 py-2.5 text-sm font-medium text-cloud transition duration-500 ease-cine hover:-translate-y-0.5 hover:bg-soft/15"
      >
        <span aria-hidden>✦</span> XEM ↗<span className="sr-only"> (mở Threads trong tab mới)</span>
      </a>
    </div>
  );
}
