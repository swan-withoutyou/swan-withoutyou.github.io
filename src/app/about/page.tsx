import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { socialLinks } from "@/config/social-links";
import { thieuNang } from "@/data/music";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalLink } from "@/components/ui/ExternalLink";

export const metadata = pageMetadata({
  title: "Giới thiệu",
  description: "Đây là trang giới thiệu về “Thiếu Nàng” — dự án phi lợi nhuận đồng hành cùng SWAN và SYE Holdings.",
  path: "/about/",
});

const linkCls = "text-cloud underline decoration-lilac/40 underline-offset-4 hover:decoration-cloud";

export default function AboutPage() {
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="Giới thiệu" title={<>Về <span className="italic text-lilac">Thiếu Nàng</span></>}>
        <p>
          Đây là trang trải nghiệm âm nhạc dành riêng cho “{thieuNang.title}” của {thieuNang.artist} — nơi MV, lời bài hát ba
          ngôn ngữ, chiến dịch "Hành trình 1 triệu view" và "Góc của The Wings".
        </p>
      </SectionHeading>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-8">
          <h2 className="font-serif text-3xl">SWAN</h2>
          <p className="mt-3 text-sm leading-relaxed text-lilac/75">
            Thông tin chính thức về nghệ sĩ có tại{" "}
            <ExternalLink href={socialLinks.swanArtistProfile.url} className={linkCls}>hồ sơ nghệ sĩ trên SYE Holdings</ExternalLink>,{" "}
            <ExternalLink href={socialLinks.swanFacebook.url} className={linkCls}>Facebook</ExternalLink> và{" "}
            <ExternalLink href={socialLinks.swanTeamThreads.url} className={linkCls}>Threads của ekip SWAN</ExternalLink>.
          </p>
        </div>
        <div className="glass rounded-3xl p-8">
          <h2 className="font-serif text-3xl">Công ty chủ quản</h2>
          <p className="mt-3 text-sm leading-relaxed text-lilac/75">
            <ExternalLink href={socialLinks.syeHoldings.url} className={linkCls}>{socialLinks.syeHoldings.label}</ExternalLink>. Mọi
            bản quyền âm nhạc, hình ảnh và lời bài hát thuộc về SWAN và SYE Holdings.
          </p>
        </div>
        <div className="glass rounded-3xl p-8 md:col-span-2">
          <h2 className="font-serif text-3xl">Nguyên tắc nội dung</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-lilac/75">
            <li>• Lời bài hát chỉ được đăng khi có xác nhận quyền công bố; bản dịch chỉ hiển thị khi đã được duyệt.</li>
            <li>• Số liệu Hành trình 1 triệu được cập nhật thủ công từ nền tảng chính thức — không ước tính, không bịa số.</li>
            <li>• Nội dung Threads của fan chỉ hiển thị khi đã được duyệt và luôn dẫn về bài gốc.</li>
            <li>• Không có quyên góp, thanh toán hay công cụ tăng lượt nghe nhân tạo.</li>
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/streaming-guide/" className={linkCls}>Hướng dẫn stream đúng cách →</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
