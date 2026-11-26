/**
 * Cloudflare Worker: live YouTube view count for the Road to 1M tracker.
 *
 * GET /  →  { "videoId": "…", "viewCount": 12345, "fetchedAt": "2026-11-26T21:30:05+07:00" }
 *
 * - Asks the YouTube Data API at most once per CACHE_SECONDS (default 60) per instance, and
 *   sends `Cache-Control: public, max-age=60` so Cloudflare's Worker cache shares one answer
 *   with every visitor. YouTube quota use stays ~1,440 calls/day no matter how many fans visit.
 * - The API key is a Worker secret (YOUTUBE_API_KEY) and never reaches the browser.
 * - Query strings are rejected so nobody can bypass the cache with random URLs.
 * - If YouTube fails, the last good value is served (marked "stale": true); never a guess.
 */

let memo = null; // { body: object, at: number }

const VIDEO_ID_RE = /^[A-Za-z0-9_-]{11}$/;

function vietnamIso(ms) {
  return `${new Date(ms + 7 * 3600_000).toISOString().slice(0, 19)}+07:00`;
}

function json(body, status, maxAge) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": maxAge > 0 ? `public, max-age=${maxAge}` : "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function fetchViewCount(videoId, apiKey) {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "statistics");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", apiKey);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API HTTP ${res.status}`);
  const data = await res.json();
  const raw = data?.items?.[0]?.statistics?.viewCount;
  const n = Number(raw);
  if (raw === undefined || !Number.isSafeInteger(n) || n < 0) throw new Error("No valid viewCount");
  return n;
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET", "Access-Control-Max-Age": "86400" },
      });
    }
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, 0);
    if (url.pathname !== "/" || url.search !== "") return json({ error: "not_found" }, 404, 0);

    const videoId = env.VIDEO_ID || "uTrRuWajO68";
    const cacheSeconds = Math.max(30, Number(env.CACHE_SECONDS) || 60);
    if (!env.YOUTUBE_API_KEY || !VIDEO_ID_RE.test(videoId)) return json({ error: "not_configured" }, 500, 0);

    const now = Date.now();
    if (memo && now - memo.at < cacheSeconds * 1000) {
      return json(memo.body, 200, Math.max(1, cacheSeconds - Math.floor((now - memo.at) / 1000)));
    }

    try {
      const viewCount = await fetchViewCount(videoId, env.YOUTUBE_API_KEY);
      const body = { videoId, viewCount, fetchedAt: vietnamIso(now) };
      memo = { body, at: now };
      return json(body, 200, cacheSeconds);
    } catch {
      if (memo) return json({ ...memo.body, stale: true }, 200, 15);
      return json({ error: "upstream_unavailable" }, 502, 0);
    }
  },
};

export default worker;

/** Test helper — resets the in-memory cache. */
export function __resetForTests() {
  memo = null;
}
