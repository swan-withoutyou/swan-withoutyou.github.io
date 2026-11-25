import { MUSIC_LINKS } from "@/config/campaign";

export const FAQ_ITEMS: Array<{ q: string; a: string; link?: { href: string; label: string } }> = [
  {
    q: "Mass Buy trên iTunes là gì?",
    a: "Là khi nhiều người hâm mộ cùng mua một ca khúc trên iTunes Store trong cùng một khoảng thời gian để thể hiện sự ủng hộ dành cho nghệ sĩ và góp phần thúc đẩy thứ hạng của ca khúc.",
  },
  {
    q: "Mua nhạc trên iTunes khác gì với nghe trên Apple Music?",
    a: "Mua trên iTunes Store là trả tiền một lần để sở hữu bài hát. Apple Music là dịch vụ nghe nhạc theo gói đăng ký. Nghe trên Apple Music không được tính là mua bài hát.",
  },
  {
    q: "Fan ở nước ngoài có thể tham gia không?",
    a: "Có thể, nếu bài hát được bán tại quốc gia/vùng của Apple Account của bạn. Mỗi quốc gia/vùng có cửa hàng và bảng xếp hạng iTunes riêng.",
  },
  {
    q: "Có bắt buộc phải mua nhiều lần không?",
    a: "Không. Một lượt mua đã là sự ủng hộ đầy ý nghĩa. Việc mua lại nhiều lần từ cùng một tài khoản không chắc chắn được tính thêm. Hãy chỉ chi tiêu trong khả năng của bạn.",
  },
  {
    q: "Làm thế nào để xác nhận đã mua thành công?",
    a: "Kiểm tra bài hát trong thư viện nhạc đã mua, hoặc xem lịch sử mua hàng trong phần cài đặt Apple Account. Apple cũng thường gửi biên nhận qua email.",
  },
  {
    q: "Chiến dịch có đảm bảo Thiếu Nàng đạt Top 1 iTunes không?",
    a: "Không. Thứ hạng phụ thuộc vào nhiều yếu tố và quy tắc xếp hạng của Apple tại từng cửa hàng khu vực. Chiến dịch là nỗ lực chung của cộng đồng fan để ủng hộ SWAN.",
  },
  {
    q: "Tôi có thể xem hướng dẫn Mass Buy ở đâu?",
    a: "Ngay trên trang này, ở phần “Hướng dẫn Mass Buy trên iTunes”. Bạn cũng có thể xem hướng dẫn chi tiết từ Sạp Cánh Thiên Nga trên Threads.",
    link: { href: MUSIC_LINKS.massBuyTutorial, label: "Xem hướng dẫn trên Threads ↗" },
  },
];

/** Native <details> accordion: keyboard + screen-reader accessible, works without JavaScript. */
export function CampaignFAQ() {
  return (
    <section id="hoi-dap" aria-labelledby="faq-title" className="scroll-mt-28">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-soft">Hỏi đáp</p>
      <h2 id="faq-title" className="mt-3 font-serif text-3xl font-medium sm:text-5xl">NHỮNG ĐIỀU BẠN CÓ THỂ MUỐN BIẾT</h2>
      <div className="mt-8 space-y-3" data-testid="campaign-faq">
        {FAQ_ITEMS.map((f, i) => (
          <details key={f.q} className="glass group rounded-2xl open:border-soft/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-cloud sm:p-6 [&::-webkit-details-marker]:hidden">
              <span className="font-medium">
                <span className="mr-3 font-serif text-soft">{String(i + 1).padStart(2, "0")}</span>
                {f.q}
              </span>
              <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full border border-lilac/25 text-lilac transition duration-500 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-5 pb-6 text-sm leading-relaxed text-lilac/80 sm:px-6 sm:pl-[3.4rem]">
              <p>{f.a}</p>
              {f.link && (
                <a href={f.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-cloud underline decoration-soft/50 underline-offset-4 hover:decoration-cloud">
                  {f.link.label}
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
