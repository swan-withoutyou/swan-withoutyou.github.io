import { thieuNang } from "@/data/music";

export function VideoStatus() {
  const official = thieuNang.officialMv;
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs" data-testid="video-status">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 uppercase tracking-[0.2em] ${
          official ? "bg-[#1ed760]/15 text-[#7cf0a6]" : "bg-soft/15 text-lilac"
        }`}
      >
        <span aria-hidden className={`size-1.5 rounded-full ${official ? "bg-[#1ed760]" : "bg-soft animate-pulse"}`} />
        {official ? "MV chính thức" : "Đang hiển thị: video nhá hàng"}
      </span>
      {!official && <span className="text-lilac/60">MV chính thức sẽ được cập nhật ngay khi SYE Official công bố.</span>}
    </div>
  );
}
