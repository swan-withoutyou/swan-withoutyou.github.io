import { pageMetadata } from "@/lib/seo/metadata";
import { thieuNang } from "@/data/music";
import { socialLinks } from "@/config/social-links";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Music — Thiếu Nàng",
  description: "Nghe “Thiếu Nàng” và các ca khúc của SWAN trên Spotify và YouTube.",
  path: "/music/",
});

export default function MusicPage() {
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="Music" title={<>Thiếu Nàng <span className="italic text-lilac">— SWAN</span></>}>
        <p>Phát hành bởi {thieuNang.label}. {thieuNang.releaseDate ? `Ngày phát hành: ${thieuNang.releaseDate}.` : "Ngày phát hành chính thức sẽ được cập nhật khi công bố."}</p>
      </SectionHeading>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-8">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#7cf0a6]">Spotify</p>
          <p className="mt-3 font-serif text-3xl">{socialLinks.spotifyArtist.label}</p>
         
          
        </div>
        <div className="glass rounded-3xl p-8">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#ff8d87]">YouTube</p>
          <p className="mt-3 font-serif text-3xl">{thieuNang.teaser?.title}</p>
          <p className="mt-2 text-sm text-lilac/65">{thieuNang.teaser?.channel}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/music-video/">Xem tại đây</Button>
            <Button href={socialLinks.thieuNangTeaser.url} external variant="ghost">YouTube ↗</Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
