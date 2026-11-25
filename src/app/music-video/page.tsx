import { pageMetadata } from "@/lib/seo/metadata";
import { thieuNang, featuredVideo } from "@/data/music";
import { thieuNangLyrics } from "@/data/lyrics";
import { allUnavailableReasons, getPublicLyrics } from "@/lib/lyrics";
import { socialLinks } from "@/config/social-links";
import { PageShell } from "@/components/layout/PageShell";
import { PlayerProvider } from "@/components/video/PlayerContext";
import { YouTubePlayer } from "@/components/video/YouTubePlayer";
import { VideoStatus } from "@/components/video/VideoStatus";
import { LyricsViewer } from "@/components/lyrics/LyricsViewer";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbLd } from "@/lib/seo/structured-data";
import { OfficialMvCTA } from "@/components/release/OfficialMvCTA";
import { MusicVideoTutorialLink } from "@/components/video/MusicVideoTutorialLink";
import { campaignNav } from "@/config/site";

export const metadata = pageMetadata({
  title: "MV Thiếu Nàng",
  description: "Xem “Thiếu Nàng” của SWAN — teaser chính thức và MV, kèm lời bài hát đồng bộ ba ngôn ngữ.",
  path: "/music-video/",
});

export default function MusicVideoPage() {
  const video = featuredVideo();
  return (
    <PageShell className="pt-28">
      <JsonLd data={breadcrumbLd([{ name: "Trang chủ", path: "/" }, { name: "MV", path: "/music-video/" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Trang chủ" }, { label: "MV" }]} />
      <h1 className="mt-6 font-serif text-5xl font-medium sm:text-7xl">
        Thiếu Nàng <span className="italic text-lilac">— MV</span>
      </h1>
      <div className="mt-5">
        <VideoStatus />
      </div>


      <PlayerProvider>
        <div className="mt-10 grid gap-10 xl:grid-cols-[1.6fr_1fr]">
          <div>
            {video ? (
              <YouTubePlayer videoId={video.youtubeId} title={video.title} badge={video.role === "teaser" ? "Video nhá hàng" : "MV chính thức"} priority />
            ) : (
              <p>Chưa có video.</p>
            )}
            <div className="mt-8 flex flex-wrap items-start gap-3">
              <OfficialMvCTA />
            {/*video && <Button href={video.url} external variant="ghost">Mở trên YouTube ↗</Button>*/}
              <Button href={socialLinks.spotifyArtist.url} external variant="spotify">Nghe trên Spotify</Button>
              <Button href="/lyrics/thieu-nang/" variant="ghost">Lời bài hát →</Button>
            </div>
            <div className="mt-6">
              <MusicVideoTutorialLink />
            </div>
            <div className="mt-4">
              <Button href={campaignNav.href} variant="ghost">#1 Chiến dịch Top 1 iTunes →</Button>
            </div>
          </div>
          <aside aria-label="Lời bài hát" className="xl:max-h-[75vh] xl:overflow-y-auto xl:pr-2">
            <LyricsViewer
              lyrics={getPublicLyrics(thieuNangLyrics)}
              reasons={allUnavailableReasons(thieuNangLyrics)}
              allowCopy={false}
              variant="preview"
              previewLineCount={Infinity}
            />
          </aside>
        </div>
      </PlayerProvider>

      <section className="mt-24 grid gap-10 md:grid-cols-2">
        <div className="glass rounded-3xl p-8">
          <h2 className="font-serif text-3xl">Ê-kíp thực hiện</h2>
          {thieuNang.credits.length ? (
            <dl className="mt-6 space-y-3 text-sm">
              {thieuNang.credits.map((c) => (
                <div key={c.role + c.name} className="flex justify-between gap-6 border-b border-lilac/10 pb-3">
                  <dt className="text-lilac/60">{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-lilac/65">Thông tin ê-kíp sản xuất sẽ được cập nhật khi được xác nhận chính thức.</p>
          )}
        </div>
        <div className="glass rounded-3xl p-8">
          <h2 className="font-serif text-3xl">Video khác của SWAN</h2>
          <ul className="mt-6 space-y-4 text-sm">
            {thieuNang.otherVideos.map((v) => (
              <li key={v.youtubeId}>
                <ExternalLink href={v.url} className="group block rounded-xl border border-lilac/10 p-4 transition hover:border-lilac/40">
                  <span className="block text-cloud group-hover:underline">{v.title}</span>
                  <span className="mt-1 block text-xs text-lilac/55">{v.channel} · không phải MV “Thiếu Nàng”</span>
                </ExternalLink>
              </li>
            ))}
            <li>
              <ExternalLink href={socialLinks.swanArtistProfile.url} className="text-lilac/70 underline decoration-lilac/30 hover:text-cloud">
                Hồ sơ nghệ sĩ SWAN — SYE Holdings ↗
              </ExternalLink>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
