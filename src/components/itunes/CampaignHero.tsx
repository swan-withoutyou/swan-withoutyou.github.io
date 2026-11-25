import Link from "next/link";
import { CAMPAIGN_CONFIG, CAMPAIGN_ROUTES } from "@/config/campaign";
import { cta } from "@/components/ui/ctaStyles";

/**
 * Campaign introduction — the single source for this copy. Used as a short teaser on the
 * homepage (links to /top-1-itunes/) and as the intro of the campaign page (same-page anchors).
 */
export function CampaignHero({ thumbnail, onCampaignPage = false }: { thumbnail?: string; onCampaignPage?: boolean }) {
  const Heading = onCampaignPage ? "h1" : "h2";
  const massBuyHref = onCampaignPage ? "#huong-dan-mass-buy" : CAMPAIGN_ROUTES.massBuy;
  const buyHref = onCampaignPage ? "#mua-itunes" : CAMPAIGN_ROUTES.buy;
  return (
    <div className="relative isolate overflow-hidden rounded-[2.25rem] ring-1 ring-lilac/15">
      {thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbnail} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 size-full object-cover opacity-25 blur-[3px] saturate-75" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-violet/90 via-night/85 to-night-deep" />
      <div aria-hidden className="stars absolute inset-0 -z-10 opacity-60" />

      <div className="grid items-center gap-8 p-7 sm:p-12 lg:grid-cols-[1.25fr_1fr] lg:p-16">
        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-soft">Dự án của cộng đồng The Wings</p>
          <Heading id="itunes-campaign-title" className="mt-5 font-serif text-4xl font-medium leading-[1.05] sm:text-6xl">
            THIẾU NÀNG <span className="block italic text-lilac"> - ĐƯỜNG ĐẾN TOP 1 iTUNES </span>
          </Heading>
          <p className="mt-6 font-serif text-xl italic text-cloud sm:text-2xl">
            Mỗi lượt mua là một bước tiến. Cùng đưa "Thiếu Nàng" lên top 1 iTunes - 22:00 ngày 25/11/2026
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-lilac/80">
            Không chỉ nghe, chúng ta còn có thể cùng nhau đưa "Thiếu Nàng" lên vị trí cao nhất trên bảng xếp hạng iTunes. Mỗi lượt
            mua hợp lệ đều là một sự ủng hộ dành cho âm nhạc của SWAN.
          </p>
          <p className="mt-6 text-xs tracking-[0.3em] text-lilac/70">
            {CAMPAIGN_CONFIG.song} · {CAMPAIGN_CONFIG.artist}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={massBuyHref} className={cta.glow} data-testid="join-mass-buy">THAM GIA MASS BUY</Link>
            <Link href={buyHref} className={cta.ghost} data-testid="see-purchase-guide">XEM HƯỚNG DẪN MUA NHẠC</Link>
          </div>
        </div>

        <div aria-hidden className="relative mx-auto grid aspect-square w-full max-w-[19rem] place-items-center">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,#7667c9,#a99bef,#f7f5ff,#a99bef,#7667c9)] opacity-70 blur-2xl motion-safe:animate-[spin_24s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-cloud/25 bg-night/70 backdrop-blur-md" />
          <div className="relative text-center">
            <span className="block text-[0.65rem] uppercase tracking-[0.5em] text-soft">Mục tiêu</span>
            <span className="title-glow block font-serif text-[7.5rem] leading-none text-cloud sm:text-[9rem]">#1</span>
            <span className="block text-sm font-medium uppercase tracking-[0.35em] text-lilac">iTunes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
