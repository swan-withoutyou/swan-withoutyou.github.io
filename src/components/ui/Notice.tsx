import type { ReactNode } from "react";

export function Notice({ title, children, tone = "info" }: { title: string; children?: ReactNode; tone?: "info" | "pending" }) {
  return (
    <div
      role="status"
      className={`glass rounded-2xl p-5 text-sm leading-relaxed ${tone === "pending" ? "border-soft/40" : ""}`}
    >
      <p className="flex items-center gap-2 font-medium text-cloud">
        <span aria-hidden className={`size-2 rounded-full ${tone === "pending" ? "bg-soft animate-pulse" : "bg-lilac"}`} />
        {title}
      </p>
      {children && <div className="mt-2 text-lilac/75">{children}</div>}
    </div>
  );
}
