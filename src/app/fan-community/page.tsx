import { pageMetadata } from "@/lib/seo/metadata";
import { fansites } from "@/data/fansites";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FansiteCard } from "@/components/fan-community/FansiteCard";

export const metadata = pageMetadata({
  title: "Fan Community — Fansite SWAN",
  description: "Tham gia cộng đồng fan SWAN: Sạp Cánh Thiên Nga và swniverse — quét mã QR để vào nhóm Messenger.",
  path: "/fan-community/",
});

export default function FanCommunityPage() {
  const sorted = [...fansites].sort((a, b) => a.order - b.order);
  return (
    <PageShell className="pt-36">
      <SectionHeading as="h1" eyebrow="Cộng đồng fan" title={<>Hai đôi cánh, <span className="italic text-lilac">một bầu trời</span></>}>
        <p>Hai fansite đồng hành cùng SWAN. Quét mã QR bằng camera điện thoại để tham gia nhóm Messenger của từng fansite.</p>
      </SectionHeading>
      <div className="mt-14 space-y-8">
        {sorted.map((f) => (
          <FansiteCard key={f.id} site={f} />
        ))}
      </div>
    </PageShell>
  );
}
