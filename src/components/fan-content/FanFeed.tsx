"use client";

import { useMemo, useState } from "react";
import type { FanPost } from "@/types/fansite";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { formatDateTime } from "@/lib/utils/format";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "swan", label: "SWAN" },
  { id: "thieu-nang", label: "Thiếu Nàng" },
  { id: "image", label: "Hình ảnh" },
  { id: "video", label: "Video" },
  { id: "recent", label: "Mới nhất (7 ngày)" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

export function filterPosts(posts: FanPost[], f: FilterId, now = Date.now()): FanPost[] {
  const approved = posts.filter((p) => p.approved);
  const sorted = [...approved].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  switch (f) {
    case "swan":
    case "thieu-nang":
      return sorted.filter((p) => p.tags.includes(f));
    case "image":
    case "video":
      return sorted.filter((p) => p.mediaType === f);
    case "recent":
      return sorted.filter((p) => now - Date.parse(p.publishedAt) < 7 * 86400_000);
    default:
      return sorted;
  }
}

export function FanFeed({ posts, limit }: { posts: FanPost[]; limit?: number }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = useMemo(() => filterPosts(posts, filter).slice(0, limit), [posts, filter, limit]);

  return (
    <div>
      {!limit && (
        <div role="group" aria-label="Lọc nội dung" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-1.5 text-xs tracking-wide transition ${
                filter === f.id ? "bg-cloud text-night" : "border border-lilac/20 text-lilac/75 hover:text-cloud"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div data-testid="fan-feed-empty" className="glass mt-8 rounded-3xl p-8 text-center sm:p-12">
          <p className="font-serif text-3xl text-cloud">Chưa có bài viết được duyệt</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-lilac/70">
            Những bài Threads công khai về SWAN và “Thiếu Nàng” sẽ xuất hiện ở đây sau khi được đội ngũ kiểm duyệt và có sự
            đồng ý của tác giả.
          </p>
        </div>
      ) : (
        <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((p) => (
            <li key={p.id} className="glass mb-5 break-inside-avoid rounded-2xl p-5">
              <p className="text-sm font-medium text-cloud">{p.authorName}</p>
              <p className="text-xs text-lilac/55">@{p.username}</p>
              {p.mediaUrl && p.mediaType === "image" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.mediaUrl} alt="" loading="lazy" className="mt-4 w-full rounded-xl" />
              )}
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-lilac/85">{p.text}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-lilac/55">
                <time dateTime={p.publishedAt}>{formatDateTime(p.publishedAt)}</time>
                <ExternalLink href={p.permalink} className="hover:text-cloud">
                  Xem trên Threads ↗
                </ExternalLink>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
