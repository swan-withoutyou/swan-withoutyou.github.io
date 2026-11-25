import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Lyrics — Lời bài hát SWAN",
  description: "Lời bài hát các ca khúc của SWAN với bản dịch English và 中文.",
  path: "/lyrics/",
});

export default function LyricsIndex() {
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="Lời bài hát" title="Lời bài hát" />
      <ul className="mt-12">
        <li>
          <Link href="/lyrics/thieu-nang/" className="glass group flex items-center justify-between rounded-3xl p-8 transition hover:-translate-y-1">
            <span>
              <span className="block font-serif text-4xl">Thiếu Nàng</span>
              <span className="mt-2 block text-sm text-lilac/60">SWAN · Tiếng Việt · tiếng Anh · tiếng Trung</span>
            </span>
            <span aria-hidden className="text-2xl text-lilac/50 transition group-hover:translate-x-1 group-hover:text-cloud">→</span>
          </Link>
        </li>
      </ul>
    </PageShell>
  );
}
