import { pageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Quyền riêng tư",
  description: "Chính sách quyền riêng tư của trang trải nghiệm “Thiếu Nàng”.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="Riêng tư" title="Quyền riêng tư" />
      <div className="mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-lilac/80">
        <p>Trang web không có tài khoản người dùng, không có biểu mẫu và không thu thập thông tin cá nhân của bạn.</p>
        <h2 className="font-serif text-2xl text-cloud">Lưu trữ trên trình duyệt</h2>
        <p>Ngôn ngữ lời bài hát bạn chọn được lưu trong localStorage của trình duyệt để ghi nhớ lựa chọn. Dữ liệu này không rời khỏi thiết bị.</p>
        <h2 className="font-serif text-2xl text-cloud">Nội dung bên thứ ba</h2>
        <p>
          Video chỉ được tải từ YouTube (chế độ youtube-nocookie) khi bạn bấm phát. Ảnh thu nhỏ video được tải từ máy chủ ảnh của
          YouTube. Các liên kết tới Spotify, Facebook, Threads và Messenger mở trong tab mới và tuân theo chính sách của các nền tảng đó.
        </p>
        <h2 className="font-serif text-2xl text-cloud">Thống kê</h2>
        <p>Nếu được bật, Google Analytics 4 được dùng ở chế độ ẩn danh IP để đo lượt truy cập tổng hợp.</p>
      </div>
    </PageShell>
  );
}
