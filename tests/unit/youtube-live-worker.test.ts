import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// @ts-expect-error — plain JS Worker module
import worker, { __resetForTests } from "../../worker/youtube-live/src/index.js";
import { liveViewsSchema } from "@/lib/metrics";

const env = { YOUTUBE_API_KEY: "test-key", VIDEO_ID: "uTrRuWajO68", CACHE_SECONDS: "60" };
const req = (path = "/", init?: RequestInit) => new Request(`https://relay.example.workers.dev${path}`, init);
const yt = (viewCount: string) =>
  new Response(JSON.stringify({ items: [{ statistics: { viewCount } }] }), { status: 200, headers: { "content-type": "application/json" } });

describe("YouTube live relay (Cloudflare Worker)", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    __resetForTests();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-26T14:00:00Z"));
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("returns the view count with CORS + 60 s public cache headers", async () => {
    fetchMock.mockResolvedValueOnce(yt("17871"));
    const res = await worker.fetch(req(), env);
    expect(res.status).toBe(200);
    expect(res.headers.get("access-control-allow-origin")).toBe("*");
    expect(res.headers.get("cache-control")).toBe("public, max-age=60");
    const body = await res.json();
    expect(body).toEqual({ videoId: "uTrRuWajO68", viewCount: 17871, fetchedAt: "2026-11-26T21:00:00+07:00" });
    expect(liveViewsSchema.safeParse(body).success).toBe(true);
    const called = new URL(fetchMock.mock.calls[0][0]);
    expect(called.hostname).toBe("www.googleapis.com");
    expect(called.searchParams.get("id")).toBe("uTrRuWajO68");
  });

  it("asks YouTube at most once per minute", async () => {
    fetchMock.mockResolvedValue(yt("100"));
    for (let i = 0; i < 20; i++) await worker.fetch(req(), env);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    vi.setSystemTime(new Date("2026-11-26T14:01:01Z"));
    await worker.fetch(req(), env);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("rejects query strings and other paths/methods without calling YouTube", async () => {
    expect((await worker.fetch(req("/?t=123"), env)).status).toBe(404);
    expect((await worker.fetch(req("/other"), env)).status).toBe(404);
    expect((await worker.fetch(req("/", { method: "POST" }), env)).status).toBe(405);
    expect((await worker.fetch(req("/", { method: "OPTIONS" }), env)).status).toBe(204);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("serves the last good value (marked stale) when YouTube fails, never a guess", async () => {
    fetchMock.mockResolvedValueOnce(yt("500"));
    await worker.fetch(req(), env);
    vi.setSystemTime(new Date("2026-11-26T14:02:00Z"));
    fetchMock.mockResolvedValueOnce(new Response("quota", { status: 403 }));
    const res = await worker.fetch(req(), env);
    expect(await res.json()).toMatchObject({ viewCount: 500, stale: true });
  });

  it("returns 502 when YouTube fails and nothing is cached", async () => {
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 200 }));
    const res = await worker.fetch(req(), env);
    expect(res.status).toBe(502);
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("refuses to run without an API key", async () => {
    const res = await worker.fetch(req(), { VIDEO_ID: "uTrRuWajO68" });
    expect(res.status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
