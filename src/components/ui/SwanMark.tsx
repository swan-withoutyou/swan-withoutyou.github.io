/** Original abstract swan-neck line mark used as the site's emblem. */
export function SwanMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <path
        d="M40 12c-6-3-13 1-12 8 1 6 9 8 9 15 0 8-9 14-19 14 7 4 25 5 34-4 6-6 5-15-2-19"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M40 12c2 1 4 3 4 5l5 1-5 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
