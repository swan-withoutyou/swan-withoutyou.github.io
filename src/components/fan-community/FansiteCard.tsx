import type { Fansite } from "@/types/fansite";
import { asset } from "@/lib/utils/paths";
import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function FansiteCard({ site, compact = false }: { site: Fansite; compact?: boolean }) {
  const initials = site.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article id={site.id} data-testid="fansite-card" className="glass scroll-mt-28 overflow-hidden rounded-[2rem]">
      <div className={`grid gap-0 ${compact ? "" : "md:grid-cols-[1fr_1.05fr]"}`}>
        <div className="flex flex-col p-7 sm:p-9">
          <div className="flex items-center gap-4">
            {site.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset(site.logo)} alt="" className="size-14 rounded-full object-cover ring-1 ring-lilac/30" />
            ) : (
              <span aria-hidden className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-lavender to-violet font-serif text-xl ring-1 ring-lilac/30">
                {initials}
              </span>
            )}
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.32em] text-soft">{site.tagline}</p>
              <h3 className="font-serif text-3xl text-cloud">{site.name}</h3>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-lilac/75">{site.description}</p>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {compact && (
              <Link
                href={`/fan-community/#${site.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-cloud px-5 py-2.5 text-sm font-medium text-night transition hover:bg-lilac"
              >
                Quét mã QR tham gia →
              </Link>
            )}
            {!compact && site.messengerInviteUrl ? (
              <ExternalLink
                href={site.messengerInviteUrl}
                className="inline-flex items-center gap-2 rounded-full bg-cloud px-5 py-2.5 text-sm font-medium text-night transition hover:bg-lilac"
              >
                Tham gia nhóm Messenger ↗
              </ExternalLink>
            ) : !compact ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-lilac/25 px-5 py-2.5 text-xs text-lilac/60 md:hidden">
                Chưa có link mời trực tiếp — hãy quét mã QR bằng máy khác hoặc lưu ảnh mã QR
              </span>
            ) : null}
            {site.threadsUrl && (
              <ExternalLink
                href={site.threadsUrl}
                className="inline-flex items-center gap-2 rounded-full border border-lilac/25 px-5 py-2.5 text-sm text-lilac/85 transition hover:border-lilac/60 hover:text-cloud"
              >
                Threads ↗
              </ExternalLink>
            )}
          </div>
        </div>

        {!compact && (
          <figure className="relative flex flex-col items-center justify-center bg-cloud/[0.97] p-6 sm:p-8">
            {site.qrImage ? (
              <>
                {/* Original QR asset, rendered unmodified (no crop / filter) so it stays scannable. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(site.qrImage)}
                  alt={site.qrAlt}
                  width={360}
                  height={360}
                  loading="lazy"
                  className="h-auto w-full max-w-[18rem] rounded-xl"
                />
                <figcaption className="mt-4 text-center text-xs text-night/70">
                  Quét mã bằng camera điện thoại để tham gia nhóm Messenger
                </figcaption>
              </>
            ) : (
              <div className="grid aspect-square w-full max-w-[16rem] place-items-center rounded-xl border-2 border-dashed border-night/20 text-center text-xs text-night/60">
                Mã QR chưa được cung cấp
              </div>
            )}
          </figure>
        )}
      </div>
    </article>
  );
}
