import Link from "next/link";
import { socialLinks } from "@/config/social-links";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SwanMark } from "@/components/ui/SwanMark";
import { fansites } from "@/data/fansites";

const linkCls = "text-lilac/65 transition hover:text-cloud";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-lilac/10 bg-night-deep/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <SwanMark className="size-9 text-soft" />
            <span className="font-serif text-3xl tracking-[0.3em]">SWAN</span>
          </div>
          <p className="mt-4 max-w-xs font-serif text-lg italic text-lilac/70">Thiếu Nàng</p>
          <p className="mt-6 max-w-sm text-xs leading-relaxed text-lilac/50">
            Trang trải nghiệm do Hải Âu xây dựng từ những content của cộng đồng The Wings, nghệ sỹ và SYE để đồng hành cùng “Thiếu Nàng”. Mọi bản quyền âm nhạc, hình ảnh và
            lời bài hát thuộc về SWAN và{" "}
            <ExternalLink href={socialLinks.syeHoldings.url} className="underline decoration-lilac/30 hover:text-cloud">
              SYE Holdings
            </ExternalLink>
            .
          </p>
        </div>

        <FooterCol title="Âm nhạc">
          <li><ExternalLink href={socialLinks.spotifyArtist.url} className={linkCls}>Spotify</ExternalLink></li>
          <li><ExternalLink href={socialLinks.zingMp3.url} className={linkCls}>Zing MP3</ExternalLink></li>
<li><ExternalLink href={socialLinks.tiktokSound.url} className={linkCls}>TikTok</ExternalLink></li>
          <li><ExternalLink href={socialLinks.thieuNangMV.url} className={linkCls}>YouTube</ExternalLink></li>
          <li><Link href="/music-video/" className={linkCls}>MV</Link></li>
          <li><Link href="/lyrics/thieu-nang/" className={linkCls}>Lời bài hát</Link></li>
          <li><Link href="/streaming-guide/" className={linkCls}>Hướng dẫn stream</Link></li>
        </FooterCol>

        <FooterCol title="Cộng đồng">
          {fansites.map((f) => (
            <li key={f.id}><Link href={`/fan-community/#${f.id}`} className={linkCls}>{f.name}</Link></li>
          ))}
          <li><Link href="/fan-content/" className={linkCls}>Góc của The Wings</Link></li>
          <li><Link href="/road-to-1m/" className={linkCls}>Hành trình 1 triệu view</Link></li>
          <li><Link href="/updates/" className={linkCls}>Cập nhật</Link></li>
        </FooterCol>

        <FooterCol title="Chính thức">
          <li><ExternalLink href={socialLinks.swanArtistProfile.url} className={linkCls}>Hồ sơ nghệ sĩ</ExternalLink></li>
          <li><ExternalLink href={socialLinks.swanFacebook.url} className={linkCls}>Facebook</ExternalLink></li>
          <li><ExternalLink href={socialLinks.swanTeamThreads.url} className={linkCls}>Threads (ekip SWAN)</ExternalLink></li>
          <li><ExternalLink href={socialLinks.syeHoldings.url} className={linkCls}>SYE Holdings</ExternalLink></li>
        </FooterCol>
      </div>
      <div className="hairline mx-auto max-w-6xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-lilac/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Hải Âu</p>
        <ul className="flex gap-5">
          <li><Link href="/about/" className="hover:text-cloud">Giới thiệu</Link></li>
          <li><Link href="/privacy/" className="hover:text-cloud">Quyền riêng tư</Link></li>
          <li><Link href="/terms/" className="hover:text-cloud">Điều khoản</Link></li>
        </ul>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-soft">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
