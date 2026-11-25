import { pageMetadata } from "@/lib/seo/metadata";
import { campaignUpdates } from "@/data/updates";
import { formatDate } from "@/lib/utils/format";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Cập nhật chiến dịch",
  description: "Tin tức và cập nhật mới nhất về “Thiếu Nàng” của SWAN và chiến dịch Hành trình 1 triệu.",
  path: "/updates/",
});

export default function UpdatesPage() {
  const items = [...campaignUpdates].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="Tin mới" title={<>Cập nhật <span className="italic text-lilac">chiến dịch</span></>} />
      {items.length ? (
        <ol className="mt-14 space-y-6 border-l border-lilac/15 pl-6 sm:pl-10">
          {items.map((u) => (
            <li key={u.id} id={u.id} className="relative">
              <span aria-hidden className="absolute -left-[1.85rem] top-2 size-2.5 rounded-full bg-soft sm:-left-[2.85rem]" />
              <time dateTime={u.publishedAt} className="text-[0.7rem] uppercase tracking-[0.3em] text-soft">
                {formatDate(u.publishedAt)}
              </time>
              <h2 className="mt-2 font-serif text-3xl">{u.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-lilac/75">{u.body}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-14 text-lilac/70">Chưa có cập nhật nào.</p>
      )}
    </PageShell>
  );
}
