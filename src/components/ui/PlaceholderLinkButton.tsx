"use client";

import { useId, useState, type ReactNode } from "react";
import { isPlaceholderUrl } from "@/lib/links";

type Props = { href: string; children: ReactNode; className: string; placeholderMessage: string; testId?: string };

/**
 * A normal external link once a real URL is configured. While the URL is still "#", it stays
 * visible and shows a Vietnamese notice instead of navigating (no jump to the top of the page).
 */
export function PlaceholderLinkButton({ href, children, className, placeholderMessage, testId }: Props) {
  const [shown, setShown] = useState(false);
  const id = useId();

  if (!isPlaceholderUrl(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-testid={testId}>
        {children}
        <span className="sr-only"> (mở trong tab mới)</span>
      </a>
    );
  }

  return (
    <span className="relative inline-flex flex-col items-center">
      <a
        href="#"
        role="button"
        aria-describedby={shown ? id : undefined}
        data-testid={testId}
        data-placeholder="true"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setShown(true);
        }}
      >
        {children}
      </a>
      <span
        id={id}
        role="status"
        aria-live="polite"
        data-testid={testId ? `${testId}-notice` : undefined}
        className={`mt-3 max-w-sm rounded-2xl border border-soft/40 bg-night/90 px-4 py-3 text-center text-sm leading-relaxed text-lilac backdrop-blur-md ${shown ? "block" : "hidden"}`}
      >
        {shown ? placeholderMessage : ""}
      </span>
    </span>
  );
}
