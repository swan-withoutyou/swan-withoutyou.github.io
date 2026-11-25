/** "#", empty or non-https values mean "official link not available yet". */
export function isPlaceholderUrl(url: string | null | undefined): boolean {
  return !url || url.trim() === "#" || !/^https:\/\//i.test(url.trim());
}
