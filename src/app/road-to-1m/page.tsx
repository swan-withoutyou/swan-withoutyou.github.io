import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { roadTo1M } from "@/data/campaign";
import { formatDateTime } from "@/lib/utils/format";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LivePlatformTracker } from "@/components/campaign/LivePlatformTracker";
import { Notice } from "@/components/ui/Notice";
import { FacebookReelEmbed } from "@/components/video/FacebookReelEmbed";
import { socialLinks } from "@/config/social-links";

export const metadata = pageMetadata({
  title: "Hành trình 1 triệu — Thiếu Nàng",
  description: "Theo dõi chiến dịch Hành trình 1 triệu cho “Thiếu Nàng”: 1 triệu lượt xem MV trên YouTube trong 30 ngày đầu.",
  path: "/road-to-1m/",
});

export default function RoadTo1MPage() {
  return (
    <PageShell className="pt-36">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-16">
        {/* LEFT column: all the page content */}
        <div className="min-w-0">
          <SectionHeading as="h1" eyebrow="Chiến dịch · 30 ngày" title={<>Hành trình <span className="italic text-lilac">1 triệu</span></>}>
            <p>
              Mục tiêu: 1.000.000 lượt xem MV “Thiếu Nàng” trên YouTube trong 30 ngày đầu. Số liệu được lấy tự động từ YouTube mỗi 5
              phút, theo giờ Việt Nam (GMT+7).
            </p>
          </SectionHeading>

          <div className="mt-8 max-w-2xl">
            <Notice title={roadTo1M.startsAt ? `Bắt đầu: ${formatDateTime(roadTo1M.startsAt)}` : "Chờ giờ phát hành MV chính thức"} tone="pending">
              {roadTo1M.startsAt
                ? "Hạn chót của từng cột mốc được tính từ thời điểm trên."
                : "Hạn chót các cột mốc sẽ được tính khi giờ công chiếu MV được xác nhận. Chưa có số liệu nào được ghi nhận."}
            </Notice>
          </div>

          <div className="mt-12 grid gap-6">
            {roadTo1M.platforms.map((p) => (
              <LivePlatformTracker key={p.platform} campaign={roadTo1M} p={p} detailed />
            ))}
          </div>

          <p className="mt-12 text-sm text-lilac/65">
            Muốn góp sức?{" "}
            <Link href="/streaming-guide/" className="text-cloud underline decoration-lilac/40 underline-offset-4">
              Xem hướng dẫn nghe & xem đúng cách →
            </Link>
          </p>
        </div>
        {/* end of LEFT column */}

        {/* RIGHT column on desktop / bottom on mobile: the Facebook reel */}
        <aside aria-label="Video" className="lg:sticky lg:top-28 lg:self-start">
          <FacebookReelEmbed
            url={socialLinks.roadTo1MReel.url}
            title="Video Thiếu Nàng trên Facebook"
            caption={socialLinks.roadTo1MReel.label}
          />
        </aside>
      </div>
    </PageShell>
  );
}