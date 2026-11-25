import { pageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Điều khoản sử dụng",
  description: "Điều khoản sử dụng trang trải nghiệm “Thiếu Nàng”.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="Điều khoản" title="Điều khoản sử dụng" />
      <div className="mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-lilac/80">
        <h2 className="font-serif text-2xl text-cloud">Bản quyền</h2>
        <p>
          Âm nhạc, video, hình ảnh và lời bài hát “Thiếu Nàng” thuộc quyền sở hữu của SWAN và SYE Holdings. Lời bài hát và bản dịch
          chỉ được hiển thị khi đã được chủ sở hữu cho phép. Nội dung Threads thuộc về tác giả gốc.
        </p>
        <h2 className="font-serif text-2xl text-cloud">Stream đúng cách</h2>
        <p>
          Trang web không hỗ trợ và không khuyến khích bot, phần mềm tự động hay bất kỳ hình thức tăng lượt xem/nghe nhân tạo nào. Hãy
          nghe và xem theo điều khoản của YouTube và Spotify.
        </p>
        <h2 className="font-serif text-2xl text-cloud">Liên kết ngoài</h2>
        <p>Các liên kết và mã QR dẫn tới nền tảng bên thứ ba. Chúng tôi không chịu trách nhiệm cho nội dung trên các nền tảng đó.</p>
      </div>
    </PageShell>
  );
}
