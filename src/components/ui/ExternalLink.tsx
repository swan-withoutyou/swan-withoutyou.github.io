import type { AnchorHTMLAttributes, ReactNode } from "react";

/** Safe external link: new tab, no opener, no referrer leakage. */
export function ExternalLink({
  href,
  children,
  className,
  ...rest
}: { href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <span className="sr-only"> (mở trong tab mới)</span>
    </a>
  );
}
