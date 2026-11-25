/**
 * Threads → fan_posts sync (official Meta Threads API only; no scraping).
 *
 * Status of permissions (checked Nov 2026): keyword search (`/keyword_search`) requires the
 * `threads_keyword_search` permission, which needs Meta App Review. Without it the API can only
 * read the authenticated account's own posts. Until approved, curate posts manually in
 * src/data/fan-posts.ts. This script only stores candidates as approved=false — a human must approve.
 *
 * Usage: THREADS_ACCESS_TOKEN=… SUPABASE_URL=… SUPABASE_SERVICE_ROLE_KEY=… THREADS_USER_ID=… npm run threads:sync
 */
import { serverEnvSchema, threadsPostSchema } from "../src/lib/validation/schemas";

const SEARCH_TERMS = ["SWAN", "Thiếu Nàng", "Thieu Nang"];
const FIELDS = "id,text,username,permalink,timestamp,media_type,media_url";

function tagsFor(text: string): string[] {
  const t = text.toLowerCase();
  const tags: string[] = [];
  if (t.includes("swan")) tags.push("swan");
  if (t.includes("thiếu nàng") || t.includes("thieu nang")) tags.push("thieu-nang");
  return tags;
}

function mediaType(m: string): "text" | "image" | "video" {
  if (m === "IMAGE" || m === "CAROUSEL_ALBUM") return "image";
  if (m === "VIDEO") return "video";
  return "text";
}

async function main() {
  const env = serverEnvSchema.safeParse(process.env);
  if (!env.success) {
    console.error("Missing/invalid env vars:", env.error.issues.map((i) => i.path.join(".")).join(", "));
    process.exit(1);
  }
  const { THREADS_ACCESS_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = env.data;

  const rows: Record<string, unknown>[] = [];
  for (const q of SEARCH_TERMS) {
    const url = new URL("https://graph.threads.net/v1.0/keyword_search");
    url.searchParams.set("q", q);
    url.searchParams.set("search_type", "RECENT");
    url.searchParams.set("fields", FIELDS);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${THREADS_ACCESS_TOKEN}` } });
    if (res.status === 403 || res.status === 400) {
      console.error(`Keyword search unavailable for "${q}" (HTTP ${res.status}). The app likely lacks threads_keyword_search.`);
      console.error("Automated discovery is NOT working — keep using the manual approved list.");
      process.exit(2);
    }
    if (!res.ok) throw new Error(`Threads API ${res.status}`);
    const body = (await res.json()) as { data?: unknown[] };
    for (const raw of body.data ?? []) {
      const p = threadsPostSchema.safeParse(raw);
      if (!p.success) continue;
      rows.push({
        id: p.data.id,
        author_name: p.data.username,
        username: p.data.username,
        text: p.data.text,
        media_type: mediaType(p.data.media_type),
        media_url: p.data.media_url ?? null,
        permalink: p.data.permalink,
        published_at: p.data.timestamp,
        tags: tagsFor(p.data.text),
        approved: false,
      });
    }
  }

  // Upsert without touching `approved` on existing rows (ignore duplicates).
  const res = await fetch(`${SUPABASE_URL}/rest/v1/fan_posts?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
  console.log(`Stored ${rows.length} candidate posts (approved=false).`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
