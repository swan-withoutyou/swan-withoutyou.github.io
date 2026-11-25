import { MassBuyStepCard } from "./MassBuyStepCard";

export const MASS_BUY_STEPS: Array<{ title: string; items: string[] }> = [
  { title: "Chuẩn bị", items: ["Chuẩn bị thiết bị Apple tương thích và Apple Account.", "Kiểm tra khu vực (quốc gia/vùng) của tài khoản và phương thức thanh toán."] },
  { title: "Tìm kiếm", items: ["Mở iTunes Store và tìm kiếm “Thiếu Nàng” hoặc “SWAN”."] },
  { title: "Kiểm tra", items: ["Kiểm tra đúng tên bài hát “Thiếu Nàng” và nghệ sĩ SWAN trước khi mua."] },
  { title: "Hoàn tất giao dịch", items: ["Nhấn mua, xác nhận bằng Apple Account và chờ giao dịch hoàn tất."] },
  { title: "Xác nhận", items: ["Kiểm tra bài hát trong thư viện nhạc đã mua hoặc trong lịch sử giao dịch."] },
];

export function MassBuyGuide() {
  return (
    <section id="huong-dan-mass-buy" aria-labelledby="mass-buy-title" className="scroll-mt-28">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-soft">Mass Buy</p>
      <h2 id="mass-buy-title" className="mt-3 font-serif text-3xl font-medium sm:text-5xl">HƯỚNG DẪN MASS BUY TRÊN iTUNES</h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-lilac/80">
        Mass Buy là khi nhiều người hâm mộ cùng mua một ca khúc trên iTunes trong cùng một khoảng thời gian để thể hiện sự ủng hộ dành cho
        nghệ sĩ. Chỉ cần làm theo 5 bước đơn giản dưới đây.
      </p>
      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" data-testid="mass-buy-steps">
        {MASS_BUY_STEPS.map((s, i) => (
          <MassBuyStepCard key={s.title} step={i + 1} title={s.title} items={s.items} />
        ))}
      </ol>

      <div className="mt-10 grid gap-5 md:grid-cols-2" data-testid="store-vs-stream">
        <div className="glass rounded-[1.5rem] p-6">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-soft">Mua nhạc</p>
          <h3 className="mt-2 font-serif text-2xl text-cloud">iTunes Store</h3>
          <p className="mt-3 text-sm leading-relaxed text-lilac/80">
            Bạn trả tiền một lần để sở hữu bài hát. Đây là hình thức được tính cho bảng xếp hạng iTunes mà chiến dịch hướng tới.
          </p>
        </div>
        <div className="glass rounded-[1.5rem] p-6">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-soft">Nghe nhạc</p>
          <h3 className="mt-2 font-serif text-2xl text-cloud">Apple Music</h3>
          <p className="mt-3 text-sm leading-relaxed text-lilac/80">
            Dịch vụ nghe nhạc theo gói đăng ký. Nghe trên Apple Music <strong className="text-cloud">không</strong> phải là mua bài hát
            trên iTunes Store.
          </p>
        </div>
      </div>

      <div role="note" className="mt-8 rounded-2xl border border-soft/30 bg-soft/[0.07] p-5 text-sm leading-relaxed text-lilac/85">
        <p className="font-medium text-cloud">Tham gia đúng cách và an toàn</p>
        <ul className="mt-3 space-y-2">
          <li>• Việc ghi nhận lượt mua và thứ hạng phụ thuộc vào quy định của Apple và từng cửa hàng khu vực (storefront). Mua nhiều lần từ cùng một tài khoản không chắc chắn được tính thêm.</li>
          <li>• Không tạo tài khoản ảo, không can thiệp phương thức thanh toán và không lách giới hạn khu vực.</li>
          <li>• Tuyệt đối không chia sẻ mật khẩu Apple Account hay thông tin thanh toán cho bất kỳ ai, kể cả người tự nhận là ban tổ chức.</li>
          <li>• Tham gia là hoàn toàn tự nguyện — chỉ chi tiêu trong ngân sách của bạn.</li>
          <li>• Chiến dịch không đảm bảo Thiếu Nàng sẽ đạt Top 1; mỗi lượt mua là một lời ủng hộ chân thành dành cho SWAN.</li>
        </ul>
      </div>
    </section>
  );
}
