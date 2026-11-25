import { pageMetadata } from "@/lib/seo/metadata";
import { socialLinks } from "@/config/social-links";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Hướng dẫn stream “Thiếu Nàng”",
  description: "Hướng dẫn xem MV trên YouTube và nghe trên Spotify đúng cách để ủng hộ SWAN.",
  path: "/streaming-guide/",
});

const youtube = [
  "Xem trực tiếp trên YouTube (ứng dụng hoặc trình duyệt) qua link chính thức, đăng nhập tài khoản của bạn.",
  "Xem trọn vẹn video với âm lượng bật, không tắt tiếng và không thu nhỏ quá mức.",
  "Xen kẽ MV với các video khác của SWAN và nội dung khác — hành vi xem tự nhiên được tính tốt hơn việc lặp lại liên tục.",
  "Like, bình luận bằng lời thật lòng, và chia sẻ link MV gốc tới bạn bè.",
  "Tìm kiếm “SWAN Thiếu Nàng” trên YouTube thay vì luôn bấm cùng một link.",
];
const spotify = [
  "Nghe bằng tài khoản Spotify của chính bạn — Free hoặc Premium đều được.",
  "Nghe hết bài hoặc ít nhất 30 giây để được tính một lượt nghe.",
  "Thêm “Thiếu Nàng” vào playlist cá nhân và nghe xen kẽ cùng các bài hát khác.",
  "Theo dõi (Follow) SWAN và lưu bài hát vào Thư viện.",
  "Giữ âm lượng bật; không dùng nhiều thiết bị cùng lúc trên một tài khoản.",
];

export default function StreamingGuidePage() {
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="Hướng dẫn" title={<>Nghe & xem <span className="italic text-lilac">đúng cách</span></>}>
        <p>Mỗi lượt nghe thật đều có ý nghĩa. Dưới đây là cách ủng hộ “Thiếu Nàng” một cách tự nhiên, phù hợp quy định của từng nền tảng.</p>
      </SectionHeading>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Guide title="YouTube" color="#ff4e45" steps={youtube} cta={{ href: socialLinks.thieuNangTeaser.url, label: "Mở “Thiếu Nàng” trên YouTube ↗", variant: "ghost" }} />
        <Guide title="Spotify" color="#1ed760" steps={spotify} cta={{ href: socialLinks.spotifyArtist.url, label: "Mở SWAN trên Spotify ↗", variant: "spotify" }} />
      </div>

      <div className="glass mt-10 rounded-3xl p-8">
        <h2 className="font-serif text-2xl">Những điều không nên làm</h2>
        <p className="mt-3 text-sm leading-relaxed text-lilac/75">
          Không dùng phần mềm tự động, bot, dịch vụ mua view/stream, VPN đổi vùng hàng loạt hay nhiều tab tự phát. Các nền tảng sẽ
          lọc bỏ những lượt này và có thể ảnh hưởng tiêu cực tới nghệ sĩ. Trang web này không cung cấp bất kỳ công cụ tự động nào.
        </p>
      </div>
    </PageShell>
  );
}

function Guide({
  title,
  color,
  steps,
  cta,
}: {
  title: string;
  color: string;
  steps: string[];
  cta: { href: string; label: string; variant: "ghost" | "spotify" };
}) {
  return (
    <section className="glass rounded-[1.75rem] p-8" aria-labelledby={`g-${title}`}>
      <h2 id={`g-${title}`} className="flex items-center gap-3 font-serif text-4xl">
        <span aria-hidden className="size-3 rounded-full" style={{ background: color, boxShadow: `0 0 20px ${color}` }} />
        {title}
      </h2>
      <ol className="mt-8 space-y-5">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-4 text-sm leading-relaxed text-lilac/85">
            <span className="font-serif text-2xl leading-none text-soft">{String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Button href={cta.href} external variant={cta.variant}>{cta.label}</Button>
      </div>
    </section>
  );
}
