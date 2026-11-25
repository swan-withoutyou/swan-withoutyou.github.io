import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell className="flex min-h-[70svh] flex-col items-start justify-center pt-36">
      <p className="text-[0.7rem] uppercase tracking-[0.4em] text-soft">404</p>
      <h1 className="mt-4 font-serif text-6xl">Trang này đang <span className="italic text-lilac">thiếu</span>.</h1>
      <p className="mt-4 text-lilac/70">Không tìm thấy trang bạn cần.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Về trang chủ</Button>
        <Button href="/lyrics/thieu-nang/" variant="ghost">Lời bài hát</Button>
      </div>
    </PageShell>
  );
}
