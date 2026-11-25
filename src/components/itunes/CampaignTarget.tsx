import { CAMPAIGN_CONFIG } from "@/config/campaign";
import { formatDateTime } from "@/lib/utils/format";

const ROWS: Array<[string, string]> = [
  ["Mục tiêu", CAMPAIGN_CONFIG.campaignGoal],
  ["Nghệ sĩ", CAMPAIGN_CONFIG.artist],
  ["Ca khúc", CAMPAIGN_CONFIG.song],
  ["Chiến dịch", CAMPAIGN_CONFIG.campaignName],
  ["Trạng thái", CAMPAIGN_CONFIG.campaignStatus],
];

/** Campaign facts + clearly separated "verified result" panel. Never shows invented numbers. */
export function CampaignTarget() {
  const v = CAMPAIGN_CONFIG.verifiedRank;
  return (
    <div id="muc-tieu" className="scroll-mt-28">
    <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-soft">Mục tiêu</p>
    <h2 className="mt-3 font-serif text-3xl font-medium sm:text-5xl">MỤC TIÊU CỦA CHÚNG MÌNH</h2>
    <p className="mt-4 max-w-2xl text-base leading-relaxed text-lilac/80">
      Cộng đồng fan SWAN cùng nhau hướng tới một mục tiêu: đưa “Thiếu Nàng” lên vị trí số 1 trên bảng xếp hạng iTunes. Đây là dự án do fan
      tự nguyện thực hiện để lan tỏa âm nhạc của SWAN — mỗi người góp một phần nhỏ, trong khả năng của mình.
    </p>
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="glass rounded-[1.75rem] p-7 sm:p-9">
        <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-soft">Thông tin chiến dịch</h3>
        <dl className="mt-6 divide-y divide-lilac/10" data-testid="campaign-info">
          {ROWS.map(([k, val]) => (
            <div key={k} className="flex items-center justify-between gap-6 py-3.5">
              <dt className="text-sm text-lilac/65">{k}</dt>
              <dd className={`text-right ${k === "Mục tiêu" ? "font-serif text-2xl text-cloud" : "text-cloud"}`}>
                {k === "Trạng thái" ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-soft/15 px-3 py-1 text-xs">
                    <span aria-hidden className="size-1.5 rounded-full bg-soft motion-safe:animate-pulse" />
                    {val}
                  </span>
                ) : (
                  val
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs leading-relaxed text-lilac/60">
          Chiến dịch tập trung sự ủng hộ trong <strong className="text-lilac">24 giờ đầu tiên</strong> kể từ khi Thiếu Nàng chính thức lên
          kệ iTunes.{" "}
          {CAMPAIGN_CONFIG.itunesListedAt
            ? `Ca khúc lên kệ lúc ${formatDateTime(CAMPAIGN_CONFIG.itunesListedAt)} (giờ Việt Nam).`
            : "Thời điểm lên kệ sẽ được thông báo khi có xác nhận chính thức."}
        </p>
      </div>

      <div className="glass relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 sm:p-9" data-testid="verified-result">
        <div>
          <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-soft">Kết quả đã xác minh</h3>
          {v ? (
            <p className="mt-6 font-serif text-5xl text-cloud">
              #{v.rank} <span className="text-base text-lilac/70">iTunes {v.storefront}</span>
            </p>
          ) : (
            <>
              <p className="mt-6 font-serif text-3xl text-cloud">Chưa có số liệu xác minh</p>
              <p className="mt-3 text-sm leading-relaxed text-lilac/70">
                Thứ hạng chỉ được cập nhật tại đây khi đã kiểm chứng trên bảng xếp hạng iTunes. Chúng mình không đăng số liệu ước
                tính.
              </p>
            </>
          )}
        </div>
        {/* Decorative journey line — a path to the goal, not a progress measurement. */}
        <div aria-hidden className="mt-8">
          <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.3em] text-lilac/50">
            <span>Khởi hành</span>
            <span>Top 1</span>
          </div>
          <div className="relative mt-2 h-px bg-gradient-to-r from-lilac/10 via-soft/60 to-cloud">
            <span className="absolute -top-1.5 right-0 size-3 rounded-full bg-cloud shadow-[0_0_20px_rgb(247_245_255/0.9)]" />
          </div>
        </div>
        {v && <p className="mt-4 text-xs text-lilac/55">Cập nhật: {formatDateTime(v.recordedAt)}</p>}
      </div>
    </div>
    </div>
  );
}
