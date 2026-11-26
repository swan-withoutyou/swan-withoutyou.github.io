import type { Campaign, PlatformCampaign } from "@/types/campaign";
import { milestoneDeadline, milestoneState, summarize } from "@/lib/campaign";
import { formatCompact, formatDateTime, formatNumber } from "@/lib/utils/format";
import { socialLinks } from "@/config/social-links";
import { Button } from "@/components/ui/Button";

const ICON: Record<PlatformCampaign["platform"], string> = { youtube: "#ff4e45", spotify: "#1ed760" };

const HISTORY_ROWS = 24;

export function PlatformTracker({
  campaign,
  p,
  detailed = false,
  live = false,
  realtime = false,
}: {
  campaign: Campaign;
  p: PlatformCampaign;
  detailed?: boolean;
  /** True when numbers are refreshed from the auto-updated metrics file. */
  live?: boolean;
  /** True when the current number comes from the real-time relay (updated every minute). */
  realtime?: boolean;
}) {
  const recorded = p.history.filter((h) => h.source !== "live");
  const s = summarize(p);
  const percent = s.state === "recorded" ? s.percent : 0;
  const cta = socialLinks[p.ctaKey];

  return (
    <article
      data-testid={`tracker-${p.platform}`}
      className="glass relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8"
      aria-labelledby={`tracker-${p.platform}-h`}
    >
      <div aria-hidden className="absolute -right-20 -top-20 size-60 rounded-full blur-3xl" style={{ background: `${ICON[p.platform]}22` }} />
      <header className="flex items-center justify-between gap-4">
        <h3 id={`tracker-${p.platform}-h`} className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-lilac/80">
          <span aria-hidden className="size-2.5 rounded-full" style={{ background: ICON[p.platform] }} />
          {p.label}
        </h3>
        <span className="text-xs text-lilac/55">
          Mục tiêu {formatCompact(p.target)} {p.unit} · {p.windowDays} ngày
        </span>
      </header>

      <div className="mt-8">
        {s.state === "awaiting" ? (
          <p data-testid="awaiting" className="font-serif text-3xl text-cloud/90 sm:text-4xl">
            Đang chờ cập nhật số liệu đầu tiên
          </p>
        ) : (
          <p className="font-serif text-5xl text-cloud tabular-nums sm:text-6xl">
            {formatNumber(s.current)}
            <span className="ml-2 font-sans text-sm text-lilac/60">{p.unit}</span>
          </p>
        )}
        <div
          className="mt-6 h-2 overflow-hidden rounded-full bg-lilac/10"
          role="progressbar"
          aria-label={`Tiến độ ${p.label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={s.state === "recorded" ? percent : undefined}
          aria-valuetext={s.state === "recorded" ? `${percent}%` : "Chưa có số liệu"}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-lavender via-soft to-cloud transition-[width] duration-1000 ease-cine"
            style={{ width: `${percent}%` }}
          />
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-4 text-xs">
          <Stat label="Tiến độ" value={s.state === "recorded" ? `${percent}%` : "—"} />
          <Stat label="Còn lại" value={s.state === "recorded" ? formatCompact(s.remaining) : "—"} />
          <Stat label="Cập nhật" value={s.state === "recorded" ? formatDateTime(s.lastUpdated) : "—"} />
        </dl>
        {p.platform === "youtube" && (
          <p data-testid="auto-update-note" className="mt-4 flex items-center gap-2 text-xs text-lilac/55">
            <span
              aria-hidden
              className={`size-1.5 rounded-full ${realtime ? "bg-[#ff3b5c] motion-safe:animate-pulse" : live ? "bg-[#1ed760]" : "bg-lilac/40"}`}
            />
            {realtime ? "Trực tiếp từ YouTube · cập nhật mỗi phút" : "Tự động cập nhật mỗi 5 phút từ YouTube"}
          </p>
        )}
      </div>

      {detailed && (
        <>
          <h4 className="mt-10 text-[0.68rem] uppercase tracking-[0.3em] text-soft">Cột mốc</h4>
          <ol className="mt-4 space-y-3">
            {p.milestones.map((m) => {
              const deadline = milestoneDeadline(campaign.startsAt, m.withinHours);
              const st = milestoneState(p.history, m.target, deadline);
              return (
                <li key={m.id} className="flex items-center justify-between gap-4 rounded-xl border border-lilac/10 px-4 py-3 text-sm">
                  <span>
                    <span className="font-medium text-cloud">{formatNumber(m.target)} {p.unit}</span>
                    <span className="ml-2 text-lilac/60">· {m.label}</span>
                  </span>
                  <span className="text-right text-xs text-lilac/60">
                    {deadline ? formatDateTime(deadline.toISOString()) : "Chờ giờ phát hành"}
                    <MilestoneBadge state={st} />
                  </span>
                </li>
              );
            })}
          </ol>

          <h4 className="mt-10 text-[0.68rem] uppercase tracking-[0.3em] text-soft">Lịch sử cập nhật</h4>
          {recorded.length > HISTORY_ROWS && (
            <p className="mt-2 text-xs text-lilac/55">{HISTORY_ROWS} bản ghi gần nhất.</p>
          )}
          {recorded.length === 0 ? (
            <p className="mt-3 text-sm text-lilac/60">Chưa có bản ghi nào.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-lilac/55">
                  <tr><th className="py-2 font-normal">Thời điểm (GMT+7)</th><th className="py-2 text-right font-normal">{p.unit}</th></tr>
                </thead>
                <tbody>
                  {[...recorded].reverse().slice(0, HISTORY_ROWS).map((h) => (
                    <tr key={h.recordedAt} className="border-t border-lilac/10">
                      <td className="py-2 text-lilac/80">{formatDateTime(h.recordedAt)}</td>
                      <td className="py-2 text-right tabular-nums">{formatNumber(h.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <div className="mt-8">
        <Button href={cta.url} external variant={p.platform === "spotify" ? "spotify" : "ghost"}>
          {p.platform === "spotify" ? "Nghe trên Spotify" : "Xem trên YouTube"} ↗
        </Button>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-lilac/50">{label}</dt>
      <dd className="mt-1 text-cloud/90">{value}</dd>
    </div>
  );
}

function MilestoneBadge({ state }: { state: ReturnType<typeof milestoneState> }) {
  const map = {
    reached: ["Đã đạt", "bg-[#1ed760]/20 text-[#7cf0a6]"],
    missed: ["Chưa đạt", "bg-white/5 text-lilac/60"],
    open: ["Đang diễn ra", "bg-soft/20 text-lilac"],
    unknown: ["Chờ dữ liệu", "bg-white/5 text-lilac/55"],
  } as const;
  const [label, cls] = map[state];
  return <span className={`ml-3 inline-block rounded-full px-2.5 py-0.5 ${cls}`}>{label}</span>;
}
