import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { thieuNang, featuredVideo } from "@/data/music";
import { thieuNangLyrics } from "@/data/lyrics";
import { allUnavailableReasons, canPublishLyrics, getPublicLyrics } from "@/lib/lyrics";
import { socialLinks } from "@/config/social-links";
import { PageShell } from "@/components/layout/PageShell";
import { PlayerProvider } from "@/components/video/PlayerContext";
import { YouTubePlayer } from "@/components/video/YouTubePlayer";
import { LyricsViewer } from "@/components/lyrics/LyricsViewer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbLd, musicRecordingLd } from "@/lib/seo/structured-data";

const PATH = "/lyrics/thieu-nang/";

export async function generateMetadata(): Promise<Metadata> {
  const published = canPublishLyrics(thieuNangLyrics);
  return pageMetadata({
    title: "Thiếu Nàng Lyrics – Lời bài hát | SWAN",
    description: published
      ? "Lời bài hát Thiếu Nàng của SWAN — bản gốc Tiếng Việt cùng bản dịch English lyrics và 中文 歌词, đồng bộ với MV."
      : "Lời bài hát Thiếu Nàng (Thieu Nang lyrics) của SWAN — Tiếng Việt, English và 中文. Lời chính thức sẽ được đăng khi được phép công bố.",
    path: PATH,
    // Keep the page out of the index until there is real, authorised lyrics content on it.
    noindex: !published,
  });
}

export default function LyricsPage() {
  const video = featuredVideo();
  const publicLyrics = getPublicLyrics(thieuNangLyrics);

  return (
    <PlayerProvider>
      <JsonLd data={musicRecordingLd(thieuNang, PATH)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Trang chủ", path: "/" },
          { name: "Lời bài hát", path: "/lyrics/" },
          { name: "Thiếu Nàng", path: PATH },
        ])}
      />
      <PageShell className="pt-28">
        <Breadcrumbs items={[{ href: "/", label: "Trang chủ" }, { href: "/lyrics/", label: "Lời bài hát" }, { label: "Thiếu Nàng" }]} />

        <header className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-soft">SWAN · Lời bài hát</p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.95] font-medium sm:text-7xl">
              Lời bài hát
              <span className="mt-2 block text-3xl italic text-lilac sm:text-4xl">Thiếu Nàng | SWAN</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-lilac/75">
              Lời gốc tiếng Việt cùng bản dịch tiếng Anh và tiếng Trung (giản thể) cho “Thiếu Nàng” của SWAN. Chọn ngôn ngữ ngay bên dưới —
              khi MV đang phát, dòng đang hát sẽ được làm nổi bật.
            </p>
          </div>
          {video && (
            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <YouTubePlayer videoId={video.youtubeId} title={video.title} badge={video.role === "teaser" ? "Video nhá hàng" : "MV chính thức"} />
            </div>
          )}
        </header>

        <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_18rem]">
          <div className="min-w-0">
            <LyricsViewer lyrics={publicLyrics} reasons={allUnavailableReasons(thieuNangLyrics)} allowCopy={thieuNangLyrics.allowCopy} />
          </div>

          <aside className="space-y-8 text-sm lg:sticky lg:top-40 lg:self-start">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-[0.68rem] uppercase tracking-[0.3em] text-soft">Nghe &amp; xem</h2>
              <div className="mt-4 flex flex-col gap-3">
                <Button href={socialLinks.spotifyArtist.url} external variant="spotify">Nghe trên Spotify ↗</Button>
                {video && <Button href={video.url} external variant="ghost">Xem trên YouTube ↗</Button>}
                <Button href="/music-video/" variant="ghost">Xem MV →</Button>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h2 className="text-[0.68rem] uppercase tracking-[0.3em] text-soft">Ê-kíp thực hiện</h2>
              {thieuNang.credits.length ? (
                <ul className="mt-3 space-y-1">{thieuNang.credits.map((c) => <li key={c.role + c.name}>{c.role}: {c.name}</li>)}</ul>
              ) : (
                <p className="mt-3 text-lilac/65">Trình bày: SWAN · {thieuNang.label}. Thông tin sáng tác & sản xuất sẽ được cập nhật khi xác nhận.</p>
              )}
            </div>
            <div className="glass rounded-2xl p-6">
              <h2 className="text-[0.68rem] uppercase tracking-[0.3em] text-soft">Chiến dịch</h2>
              <ul className="mt-3 space-y-2">
                <li><Link className="text-lilac/80 hover:text-cloud" href="/road-to-1m/">Hành trình 1 triệu view →</Link></li>
                <li><Link className="text-lilac/80 hover:text-cloud" href="/streaming-guide/">Hướng dẫn stream →</Link></li>
                <li><Link className="text-lilac/80 hover:text-cloud" href="/fan-community/">Cộng đồng fan →</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </PageShell>
    </PlayerProvider>
  );
}
