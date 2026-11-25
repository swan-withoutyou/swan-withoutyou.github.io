import { MUSIC_LINKS, PLACEHOLDER_MESSAGES } from "@/config/campaign";
import { PlaceholderLinkButton } from "@/components/ui/PlaceholderLinkButton";
import { cta } from "@/components/ui/ctaStyles";

const DEVICES: Array<[string, string]> = [
  ["iPhone / iPad", "Mở ứng dụng iTunes Store."],
  ["Máy Mac", "Mở ứng dụng Nhạc (Music), bật “Hiển thị iTunes Store” trong phần Cài đặt rồi chọn iTunes Store ở thanh bên."],
  ["Máy tính Windows", "Mở ứng dụng iTunes và chọn mục Store."],
];

const CHECKS = [
  "Tên bài hát: Thiếu Nàng",
  "Nghệ sĩ: SWAN",
  "Chọn đúng bài hát (không phải bản khác hay ca khúc trùng tên của nghệ sĩ khác).",
];

export function ItunesPurchaseCTA() {
  return (
    <section id="mua-itunes" aria-labelledby="buy-title" className="scroll-mt-28">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-soft">Mua nhạc</p>
      <h2 id="buy-title" className="mt-3 font-serif text-3xl font-medium sm:text-5xl">HƯỚNG DẪN MUA NHẠC TRÊN iTUNES</h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-lilac/80">
        Cách nhanh nhất là bấm nút bên dưới khi đường dẫn chính thức được cập nhật. Bạn cũng có thể tự tìm bài hát trong iTunes Store theo
        thiết bị của mình.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="glass rounded-[1.5rem] p-6 sm:p-8">
          <h3 className="font-serif text-2xl text-cloud">Mở iTunes Store</h3>
          <dl className="mt-4 space-y-4 text-sm">
            {DEVICES.map(([d, how]) => (
              <div key={d}>
                <dt className="font-medium text-cloud">{d}</dt>
                <dd className="mt-1 leading-relaxed text-lilac/80">{how}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="glass rounded-[1.5rem] p-6 sm:p-8">
          <h3 className="font-serif text-2xl text-cloud">Tìm và kiểm tra đúng bài</h3>
          <p className="mt-4 text-sm leading-relaxed text-lilac/80">Gõ “Thiếu Nàng” hoặc “SWAN” vào ô tìm kiếm, rồi kiểm tra:</p>
          <ul className="mt-3 space-y-2 text-sm text-lilac/85">
            {CHECKS.map((c) => (
              <li key={c} className="flex gap-2.5">
                <span aria-hidden className="text-soft">✓</span>
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-lilac/80">Nhấn vào giá bán bên cạnh bài hát, xác nhận bằng Apple Account và chờ giao dịch hoàn tất.</p>
        </div>
      </div>

      <div className="glass relative mt-8 overflow-hidden rounded-[2rem] p-8 text-center sm:p-12">
        <div aria-hidden className="aurora left-1/2 top-0 size-80 -translate-x-1/2 bg-lavender/35" />
        <div className="relative flex flex-col items-center">
          <p className="max-w-lg text-sm leading-relaxed text-lilac/80">Nút này sẽ mở trang “Thiếu Nàng” chính thức trên iTunes Store.</p>
          <div className="mt-6">
            <PlaceholderLinkButton
              href={MUSIC_LINKS.itunesPurchase}
              className={`${cta.glow} px-5 py-4 text-sm sm:px-8 sm:text-base`}
              placeholderMessage={PLACEHOLDER_MESSAGES.itunes}
              testId="itunes-cta"
            >
              MUA “THIẾU NÀNG” TRÊN iTUNES
            </PlaceholderLinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
