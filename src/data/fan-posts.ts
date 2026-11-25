import type { FanPost } from "@/types/fansite";

/**
 * Manually approved Threads posts (fallback while automated discovery is unavailable).
 * Add only public posts whose authors are happy to be featured; keep the original permalink.
 * `scripts/threads-sync.ts` can generate entries once Threads API access is granted.
 */
export const approvedFanPosts: FanPost[] = [];
