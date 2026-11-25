import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink } from "./ExternalLink";

const styles = {
  primary:
    "bg-cloud text-night hover:bg-lilac shadow-[0_10px_40px_-10px_rgb(169_155_239/0.7)] hover:shadow-[0_14px_50px_-8px_rgb(169_155_239/0.9)]",
  ghost: "border border-lilac/30 text-cloud hover:border-lilac/70 hover:bg-white/5",
  spotify: "bg-[#1ed760] text-[#0b1a10] hover:bg-[#3be477]",
} as const;

type Props = { href: string; children: ReactNode; variant?: keyof typeof styles; external?: boolean; className?: string };

export function Button({ href, children, variant = "primary", external, className = "" }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition duration-500 ease-cine hover:-translate-y-0.5 ${styles[variant]} ${className}`;
  return external ? (
    <ExternalLink href={href} className={cls}>
      {children}
    </ExternalLink>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
