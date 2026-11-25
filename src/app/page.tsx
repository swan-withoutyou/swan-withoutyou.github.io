import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { thieuNang, featuredVideo } from "@/data/music";
import { thieuNangLyrics } from "@/data/lyrics";
import { roadTo1M } from "@/data/campaign";
import { fansites } from "@/data/fansites";
import { approvedFanPosts } from "@/data/fan-posts";
import { socialLinks } from "@/config/social-links";
import { allUnavailableReasons, getPublicLyrics } from "@/lib/lyrics";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { YouTubePlayer } from "@/components/video/YouTubePlayer";
import { PlayerProvider } from "@/components/video/PlayerContext";
import { LyricsViewer } from "@/components/lyrics/LyricsViewer";
import { PlatformTracker } from "@/components/campaign/PlatformTracker";
import { FansiteCard } from "@/components/fan-community/FansiteCard";
import { FanFeed } from "@/components/fan-content/FanFeed";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { OfficialMvCTA } from "@/components/release/OfficialMvCTA";
import { MusicVideoTutorialLink } from "@/components/video/MusicVideoTutorialLink";
import { CampaignHero } from "@/components/itunes/CampaignHero";
import { CAMPAIGN_ROUTES } from "@/config/campaign";

export const metadata = pageMetadata({
  title: "SWAN — Thiếu Nàng | Trải nghiệm âm nhạc chính thức",
  description:
    "Thiếu Nàng — SWAN. Xem MV, đọc lời bài hát ba ngôn ngữ, chung tay đưa Thiếu Nàng lên Top 1 iTunes, đồng hành Hành trình 1 triệu và kết nối cộng đồng fan.",
  path: "/",
});

export default function HomePage() {
  const video = featuredVideo();
  const publicLyrics = getPublicLyrics(thieuNangLyrics);
  const reasons = allUnavailableReasons(thieuNangLyrics);

  return (
    <>
      {/* A — Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-20 pt-32 sm:items-center sm:pb-0">
        {video && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
            alt=""
            aria-hidden
            fetchPriority="high"
            className="reveal absolute inset-0 -z-10 size-full scale-105 object-cover opacity-35 blur-[2px] saturate-[0.85]"
          />
        )}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-night/40 via-night/70 to-night-deep" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_40%,transparent,rgb(14_12_34/0.85))]" />

        <PageShell>
          <p className="reveal text-[0.7rem] font-medium uppercase tracking-[0.5em] text-soft">SWAN · SYE Holdings</p>
          <h1 className="reveal reveal-d1 title-glow mt-6 font-serif text-[clamp(3.6rem,13vw,11rem)] leading-[0.88] font-medium tracking-tight">
            THIẾU
            <br />
            <span className="italic text-lilac">NÀNG</span>
          </h1>
          <p className="reveal reveal-d2 mt-8 max-w-md text-base leading-relaxed text-lilac/80 sm:text-lg">
            Một khoảng trống mang tên một người. Bước vào thế giới của “Thiếu Nàng” qua thước phim, qua từng câu hát, bằng
            ba ngôn ngữ.
          </p>
          <div className="reveal reveal-d3 mt-10 flex flex-wrap gap-3">
            <Button href="/music-video/">▶ Xem MV</Button>
            <Button href="/lyrics/thieu-nang/" variant="ghost">
              Khám phá lời bài hát
            </Button>
            <Button href={socialLinks.spotifyArtist.url} external variant="spotify">
              Nghe trên Spotify
            </Button>
          </div>
          <Link
            href={CAMPAIGN_ROUTES.page}
            data-testid="hero-campaign-cta"
            className="reveal reveal-d3 group mt-6 inline-flex items-center gap-3 rounded-full border border-soft/50 bg-night/40 py-2 pl-2 pr-5 text-sm text-cloud backdrop-blur-md transition hover:border-soft hover:bg-soft/15"
          >
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-lavender to-soft font-serif text-base text-night">#1</span>
            Cùng lên Top 1
            <span aria-hidden className="transition group-hover:translate-x-1">→</span>
          </Link>
        </PageShell>
        <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.4em] text-lilac/40 sm:flex">
          Cuộn xuống
          <span className="h-10 w-px bg-gradient-to-b from-lilac/50 to-transparent" />
        </div>
      </section>

      {/* B — Featured video */}
      <section id="video" className="relative py-24 sm:py-32">
        <PageShell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="MV" title="Thước phim “Thiếu Nàng”">
              {thieuNang.officialMv ? (
                <p>MV chính thức trên kênh {thieuNang.officialMv.channel}.</p>
              ) : (
                <p>
                  Đường dẫn MV chính thức sẽ được cập nhật tại đây. Trong lúc chờ đợi, hãy xem <strong className="text-cloud">video nhá hàng chính thức</strong>{" "}
                  từ kênh {thieuNang.teaser?.channel}.
                </p>
              )}
            </SectionHeading>
            {video && (
              <ExternalLink href={video.url} className="text-sm text-lilac/70 underline decoration-lilac/30 underline-offset-4 hover:text-cloud">
                Mở trên YouTube ↗
              </ExternalLink>
            )}
          </div>
          {video && (
            <div className="mt-12">
              <PlayerProvider>
                <YouTubePlayer videoId={video.youtubeId} title={video.title} badge={video.role === "teaser" ? "Video nhá hàng" : "MV chính thức"} />
              </PlayerProvider>
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <OfficialMvCTA />
          </div>
          <div className="mt-6">
            <MusicVideoTutorialLink />
          </div>
        </PageShell>
      </section>

      {/* Top 1 iTunes — short introduction only; full campaign lives on /top-1-itunes/ */}
      <section aria-label="Chiến dịch Top 1 iTunes" data-testid="home-campaign-intro" className="py-24 sm:py-32">
        <PageShell>
          <CampaignHero thumbnail={video ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : undefined} />
        </PageShell>
      </section>

      {/* C — Lyrics preview */}
      <section className="relative py-24">
        <PageShell className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading eyebrow="Lời bài hát" title={<>Lời bài hát,<br /><span className="italic text-lilac">ba ngôn ngữ</span></>}>
            <p>Tiếng Việt là bản gốc, kèm bản dịch tiếng Anh và tiếng Trung đã được duyệt — chuyển đổi tức thì, không tải lại trang.</p>
            <div className="mt-8">
              <Button href="/lyrics/thieu-nang/" variant="ghost">Xem toàn bộ lời bài hát →</Button>
            </div>
          </SectionHeading>
          <LyricsViewer lyrics={publicLyrics} reasons={reasons} allowCopy={false} variant="preview" />
        </PageShell>
      </section>

      {/* D — Platforms */}
      <section className="py-16">
        <PageShell>
          <div className="glass grid gap-6 rounded-[2rem] p-8 sm:grid-cols-2 sm:p-12">
            <PlatformLink
              href={socialLinks.spotifyArtist.url}
              title={socialLinks.spotifyArtist.label}
              sub="Hồ sơ nghệ sĩ SWAN trên Spotify"
              dot="#1ed760"
            />
            <PlatformLink
              href={socialLinks.thieuNangTeaser.url}
              title="Xem “Thiếu Nàng” trên YouTube"
              sub={`${thieuNang.teaser?.title} · ${thieuNang.teaser?.channel}`}
              dot="#ff4e45"
            />
          </div>
        </PageShell>
      </section>

      {/* E — Road to 1M */}
      <section className="py-24">
        <PageShell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Chiến dịch" title="Hành trình 1 triệu view">
              <p>Một triệu lượt xem trên YouTube và một triệu lượt nghe trên Spotify trong 30 ngày đầu.</p>
            </SectionHeading>
            <Link href="/road-to-1m/" className="text-sm text-lilac/70 underline decoration-lilac/30 underline-offset-4 hover:text-cloud">
              Chi tiết chiến dịch →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {roadTo1M.platforms.map((p) => (
              <PlatformTracker key={p.platform} campaign={roadTo1M} p={p} />
            ))}
          </div>
        </PageShell>
      </section>

      {/* F — Fan content */}
      <section className="py-24">
        <PageShell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Threads" title="Góc của The Wings" />
            <Link href="/fan-content/" className="text-sm text-lilac/70 underline decoration-lilac/30 underline-offset-4 hover:text-cloud">
              Xem tất cả →
            </Link>
          </div>
          <FanFeed posts={approvedFanPosts} limit={6} />
        </PageShell>
      </section>

      {/* G — Fan community */}
      <section className="py-24">
        <PageShell>
          <SectionHeading eyebrow="Cộng đồng fan" title="Hai đôi cánh, một bầu trời">
            <p>Tham gia cộng đồng của hai fansite SWAN để cùng nhau đồng hành với “Thiếu Nàng”.</p>
          </SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {fansites.map((f) => (
              <FansiteCard key={f.id} site={f} compact />
            ))}
          </div>
        </PageShell>
      </section>
    </>
  );
}

function PlatformLink({ href, title, sub, dot }: { href: string; title: string; sub: string; dot: string }) {
  return (
    <ExternalLink href={href} className="group flex items-center justify-between gap-6 rounded-2xl p-4 transition hover:bg-white/5">
      <span className="flex items-center gap-4">
        <span aria-hidden className="size-3 rounded-full" style={{ background: dot, boxShadow: `0 0 24px ${dot}` }} />
        <span>
          <span className="block font-serif text-2xl text-cloud">{title}</span>
          <span className="mt-1 block text-xs text-lilac/60">{sub}</span>
        </span>
      </span>
      <span aria-hidden className="text-xl text-lilac/50 transition group-hover:translate-x-1 group-hover:text-cloud">↗</span>
    </ExternalLink>
  );
}
