import { CampaignHero } from "./CampaignHero";
import { CampaignTarget } from "./CampaignTarget";
import { MassBuyGuide } from "./MassBuyGuide";
import { ItunesPurchaseCTA } from "./ItunesPurchaseCTA";
import { CampaignFAQ } from "./CampaignFAQ";

const SECTIONS: Array<[string, string]> = [
  ["#muc-tieu", "Mục tiêu"],
  ["#huong-dan-mass-buy", "Hướng dẫn Mass Buy"],
  ["#mua-itunes", "Mua nhạc trên iTunes"],
  ["#hoi-dap", "Hỏi đáp"],
];

/** Full campaign experience for the /top-1-itunes page. */
export function ItunesCampaign({ thumbnail }: { thumbnail?: string }) {
  return (
    <div className="space-y-16 sm:space-y-24">
      <div>
        <CampaignHero thumbnail={thumbnail} onCampaignPage />
        <nav aria-label="Các phần của chiến dịch" className="mt-6 flex flex-wrap gap-2">
          {SECTIONS.map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-lilac/20 px-4 py-2 text-xs tracking-wide text-lilac/80 transition hover:border-soft hover:text-cloud">
              {label}
            </a>
          ))}
        </nav>
      </div>
      <CampaignTarget />
      <MassBuyGuide />
      <ItunesPurchaseCTA />
      <CampaignFAQ />
    </div>
  );
}
