import { pageMetadata } from "@/lib/seo/metadata";
import { approvedFanPosts } from "@/data/fan-posts";
import { socialLinks } from "@/config/social-links";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FanFeed } from "@/components/fan-content/FanFeed";
import { ExternalLink } from "@/components/ui/ExternalLink";

export const metadata = pageMetadata({
  title: "Góc của The Wings",
  description: "Bộ sưu tập bài viết Threads công khai của fan về SWAN và “Thiếu Nàng”",
  path: "/fan-content/",
});

export default function FanContentPage() {
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="" title={<>Góc <span className="italic text-lilac">fan</span></>}>
        <p>
          Những khoảnh khắc fan chia sẻ về SWAN và “Thiếu Nàng” trên Threads. Mọi nội dung thuộc về tác giả gốc — bấm vào từng bài để
          xem trên Threads. Theo dõi thêm tại{" "}
          <ExternalLink href={socialLinks.swanTeamThreads.url} className="text-cloud underline decoration-lilac/40 underline-offset-4">
            Threads của ekip SWAN.
          </ExternalLink>
          {" "}
          <br />
          <br />
          Chưa biết cách chạy số cho "Thiếu Nàng" trên Threads? Xem hướng dẫn chi tiết từ 
          {" "}<ExternalLink href="https://www.threads.com/@swn.swandata/post/DY7QoFnk74D" className="text-cloud underline decoration-lilac/40 underline-offset-4">
             đây
          </ExternalLink>
                    
        </p>
      </SectionHeading>
      <div className="mt-12">
        <FanFeed posts={approvedFanPosts} />
      </div>
      
    </PageShell>
  );
}
