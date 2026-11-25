import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-soft">{eyebrow}</p>}
      <Tag className="font-serif text-4xl leading-[1.05] font-medium text-cloud sm:text-5xl">{title}</Tag>
      {children && <div className="mt-4 text-base leading-relaxed text-lilac/80">{children}</div>}
    </div>
  );
}
