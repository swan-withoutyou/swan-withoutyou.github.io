import { pageMetadata } from "@/lib/seo/metadata";
import { featuredVideo } from "@/data/music";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbLd } from "@/lib/seo/structured-data";
import { ItunesCampaign } from "@/components/itunes/ItunesCampaign";
import { CAMPAIGN_ROUTES } from "@/config/campaign";

export const metadata = pageMetadata({
  title: "Thiếu Nàng — Đường đến Top 1 iTunes",
  description:
    "Chiến dịch của cộng đồng fan SWAN: cùng đưa “Thiếu Nàng” lên Top 1 iTunes. Hướng dẫn Mass Buy, cách mua nhạc trên iTunes và giải đáp thắc mắc.",
  path: CAMPAIGN_ROUTES.page,
});

export default function Top1ItunesPage() {
  const video = featuredVideo();
  return (
    <PageShell className="pt-28">
      <JsonLd data={breadcrumbLd([{ name: "Trang chủ", path: "/" }, { name: "Top 1 iTunes", path: CAMPAIGN_ROUTES.page }])} />
      <Breadcrumbs items={[{ href: "/", label: "Trang chủ" }, { label: "Top 1 iTunes" }]} />
      <div className="mt-8">
        <ItunesCampaign thumbnail={video ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : undefined} />
      </div>
    </PageShell>
  );
}
