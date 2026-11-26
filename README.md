# SWAN — “Thiếu Nàng” · Music Video & Multilingual Lyrics Experience

A cinematic microsite for **“Thiếu Nàng” by SWAN** (SYE Holdings): music video, lyrics in **Tiếng Việt · English · 中文**, the Road to 1M campaign, Threads fan content and the two SWAN fansites.

> **Content rule:** this repo ships **no lyrics, no streaming numbers, no invented URLs**. Everything that depends on the rights holder stays in a clearly labelled “pending / awaiting” state until real, authorised data is added.

---

## 1. Overview

| Route | Purpose |
|---|---|
| `/` | Hero, featured video, lyrics preview, platforms, Road to 1M, fan content, fan community |
| `/music-video/` | Large player (YouTube IFrame API), fullscreen, credits, links |
| `/lyrics/thieu-nang/` | **Canonical lyrics page.** Language switcher, section nav, synced highlighting, copy button |
| `/road-to-1m/` | YouTube + Spotify trackers, milestones, history |
| `/streaming-guide/` | How to stream properly (no bots / automation) |
| `/fan-content/` | Approved Threads posts with filters |
| `/fan-community/` | Sạp Cánh Thiên Nga + swniverse cards with original Messenger QR images |
| `/music/`, `/lyrics/`, `/about/`, `/updates/`, `/privacy/`, `/terms/` | Supporting pages |
| `/sitemap.xml`, `/robots.txt` | SEO |

## 2. Tech stack

Next.js 16 (App Router, **static export**) · React 19 · TypeScript · Tailwind CSS 4 · Zod · Vitest + Testing Library · Playwright · Supabase (PostgreSQL schema + RLS, optional) · Netlify or GitHub Pages hosting · GA4 (optional).

**Why static export?** The site is deployed on Netlify / GitHub Pages and all content changes are infrequent, editorial and must be reviewed (lyrics approval, metric snapshots, fan-post approval). Shipping data as typed files means every change is reviewed in a commit, there is no runtime secret on the web server, and pages are fully server-rendered HTML (good for SEO). Server-side work (Threads sync) runs as a script with secrets kept outside the browser bundle. Supabase migrations are included so you can move the data into a database later.

## 3. Architecture

```
src/
  app/                    routes (+ sitemap.ts, robots.ts, not-found.tsx)
  components/
    lyrics/               LyricsViewer, LanguageSelector, LyricsSection, LyricsLine, SyncedLyrics
    video/                YouTubePlayer (click-to-load facade + IFrame API), PlayerContext, VideoStatus
    campaign/ fan-content/ fan-community/ layout/ ui/
  config/social-links.ts  ← every external URL lives here (single source of truth)
  config/site.ts          site URL, nav, timezone
  data/                   music.ts, campaign.ts, fansites.ts, fan-posts.ts, updates.ts, lyrics/{vi,en,zh-CN}.ts
  lib/                    lyrics.ts (gating, validation, sync), campaign.ts, seo/, validation/schemas.ts
  types/
supabase/migrations/      schema + RLS + seed (verified facts only)
scripts/threads-sync.ts   official Threads API → fan_posts (approved=false)
tests/unit, tests/e2e
```

**Lyrics → video sync:** `PlayerProvider` holds the current playback time. The YouTube player sits outside the lyrics tree, so switching language never reloads or seeks the video. All languages share line ids, so the active line id at time *t* is the same in every language.

## 4. Installation

```bash
npm ci
cp .env.example .env.local   # fill in NEXT_PUBLIC_SITE_URL at least
npm run dev                  # http://localhost:3000
```

## 5. Environment variables

| Name | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build | Canonical URLs, sitemap, OG. **Set to your Netlify/custom domain.** |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | build | GA4 (`G-…`). Empty = off. |
| `BASE_PATH` | build | Only for GitHub project pages served under `/repo`. |
| `NEXT_PUBLIC_YOUTUBE_METRICS_URL` | build | Raw GitHub URL of `src/data/metrics/youtube.json` for live Road to 1M numbers. |
| `YOUTUBE_API_KEY` | GitHub Actions secret | YouTube Data API v3 key for the 5-minute view-count job. |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | script/CI only | Threads sync writes. **Never** expose to the browser. |
| `THREADS_ACCESS_TOKEN`, `THREADS_USER_ID` | script/CI only | Threads API. |

## 6–7. Supabase configuration & migrations (optional)

```bash
supabase link --project-ref <ref>
supabase db push          # applies supabase/migrations/*
```
RLS is enabled on every table. The `anon` role can only read published campaigns, approved fan posts, published updates and **only lyrics whose song is `published` + `rights_confirmed` and whose language is `approved`/`published`**. There are no write policies — writes use the service-role key server-side.

## 8. How to add Vietnamese lyrics (source of truth)

Only use text supplied/authorised by SWAN / SYE Holdings. Edit `src/data/lyrics/vi.ts`:

```ts
export const viLyrics: LanguageLyrics = {
  languageName: "Tiếng Việt",
  translationStatus: "approved",
  translationSource: "SYE Holdings",
  sections: [
    { id: "verse-1", sectionType: "verse", heading: "Verse 1", lines: [
      { id: "verse-1-l1", text: "…" },
      { id: "verse-1-l2", text: "…" },
    ]},
    { id: "chorus-1", sectionType: "chorus", heading: "Điệp khúc", lines: [ /* … */ ] },
  ],
};
```
Ids: lowercase `a-z0-9-`, unique, never renamed once published. Only add sections that exist in the song.

## 9–10. English / Chinese translations

Edit `src/data/lyrics/en.ts` / `zh-CN.ts`. **Copy the exact same section ids, line ids and order** from `vi.ts`; translate `heading` and `text` only. Do not publish machine translation as approved. `npm test` fails if the structure differs from Vietnamese.

## 11. Approving & publishing

Two independent gates:
1. **Song rights** (`src/data/lyrics/index.ts`): set `publicationStatus: "published"` and `rightsConfirmed: true` only after written confirmation. `allowCopy: true` enables the copy button.
2. **Per language**: `translationStatus` `draft → review → approved/published`. Only `approved`/`published` non-empty languages are rendered or sent to the browser.

When published, the lyrics page automatically becomes indexable (drops `noindex`) and is added to the sitemap. Until then it shows a clear “pending rights” state in all three languages.

## 12. Lyric timestamps

Add `startTime` / `endTime` (seconds from the start of the **official MV**) to the Vietnamese lines, and the same values to the matching line ids in the translations. Measure them from the real video; never estimate. With timestamps present the page shows “Đồng bộ với MV”, highlights + auto-scrolls the active line, and clicking a line seeks the video.

## 13. Configuring the music video

`src/data/music.ts`. Currently verified (YouTube oEmbed, 25 Nov 2026):
- `teaser` → `B8cb4a-iNco` “SWAN - Thiếu Nàng [Teaser]” (SYE Official) — featured until the MV exists.
- `otherVideos` → `XlhmFJ1ZqxU` “SWAN - có lẽ x Prod. Neyun (DRILL VERSION)” — **not** the Thiếu Nàng MV, kept separate.

When the official MV is published, set `officialMv: { youtubeId, url, title, channel, role: "official_mv", verifiedAt }`, `releaseDate`, `spotifyTrackUrl` and `credits`. Point the Road to 1M YouTube CTA at it (`ctaKey` in `data/campaign.ts`, add a key in `config/social-links.ts`).

## 14. Fansite QR assets

Originals live in `public/images/fansites/fansite-0{1,2}-messenger-qr.png` and are served unmodified (a unit test checks their checksums). Both currently decode to `q.me-qr.com` redirect links. To replace one, drop the new original file in the same path (and update the checksum in `tests/unit/config.test.ts`). Set `messengerInviteUrl` / `threadsUrl` / `logo` in `src/data/fansites.ts` **only** with URLs supplied by the fansite admins — on mobile the “Join group” button appears once an invite URL exists.

## 15. Road to 1M — automatic YouTube views

The tracker is **YouTube only**: 1,000,000 views of the official MV in 30 days, counted from 20:00 25/11/2026 GMT+7.

**How it works**
1. `.github/workflows/youtube-metrics.yml` runs **every 5 minutes**. GitHub can delay scheduled runs by a few minutes.
2. It runs `scripts/youtube-metrics.ts`. The script reads the public view count of `uTrRuWajO68` from the official **YouTube Data API v3**. If the number changed, it appends `{ recordedAt, value }` to `src/data/metrics/youtube.json`, with `recordedAt` set automatically to the read time in GMT+7.
3. The workflow commits the file with `[skip netlify]`, so Netlify doesn't rebuild and no build minutes are used.
4. The website loads that file directly from GitHub when someone opens the page, and again every 5 minutes while it stays open. If the file can't be loaded, the page shows the numbers from the last build.

Snapshots older than 24 hours are thinned to the last one per hour to keep the file small. Milestone checks stay correct.

**One-time setup**
1. **API key:** in Google Cloud Console, create a project, go to *APIs & Services*, and enable **YouTube Data API v3**. Under *Credentials*, click **Create API key** and restrict the key to "YouTube Data API v3". It's free, and one call every 5 minutes is far below the daily quota.
2. **GitHub secret:** in the repo, go to Settings → Secrets and variables → Actions → **New repository secret**. Name it `YOUTUBE_API_KEY` and paste the key as the value.
3. **Branch:** scheduled workflows only run from the repository's **default branch**, and this one commits to the default branch. If Netlify deploys a different branch, add a repository **variable** `METRICS_BRANCH` set to that branch name. The workflow file must still exist on the default branch.
4. **Netlify:** in Site settings → Environment variables, add
   `NEXT_PUBLIC_YOUTUBE_METRICS_URL = https://raw.githubusercontent.com/huynhthihan/swan-withoutyou.github.io/<branch>/src/data/metrics/youtube.json`
   and redeploy once. The repository must be public for this URL to work.
5. In GitHub's **Actions** tab, open "YouTube views (Road to 1M)" and click **Run workflow** to record the first number right away.

Optional: a repository variable `YOUTUBE_VIDEO_ID` overrides the video ID. GitHub pauses scheduled workflows after 60 days without repository activity; re-enable them in the Actions tab if that happens.

### Real-time view count (Cloudflare Worker relay)

The tracker can also show YouTube's latest public count, refreshed **every minute**, on top of the 5-minute history.

```
YouTube Data API ──(max 1×/min)──▶ Cloudflare Worker (shared 60 s cache) ──▶ every visitor's page (polls every 60 s)
```

- `worker/youtube-live/` contains the Worker (`src/index.js`) and its config (`wrangler.jsonc`, with `"cache": { "enabled": true }`).
- The Worker asks YouTube at most once a minute and shares that answer with all visitors (about 1,440 YouTube calls/day, whatever the traffic). The API key is a Worker secret and never reaches the browser.
- The live number is display-only, labelled "Trực tiếp từ YouTube". History and milestones still come from the 5-minute job. If the relay is down, the page shows the recorded data.
- YouTube itself refreshes its public counter in batches, so the number changes when YouTube updates it, not every second.

**Setup (one time)**
1. Use a **separate Google Cloud project and API key** for the relay, so live traffic can never use up the quota of the 5-minute recording job. Restrict the key to "YouTube Data API v3".
2. Create a free Cloudflare account, then in a terminal:
   ```bash
   cd worker/youtube-live
   npx wrangler@latest login
   npx wrangler@latest secret put YOUTUBE_API_KEY     # paste the relay key
   npx wrangler@latest deploy
   ```
   Wrangler prints the URL, e.g. `https://swan-youtube-live.<your-subdomain>.workers.dev`.
3. Open that URL in a browser. You should see `{"videoId":"uTrRuWajO68","viewCount":…,"fetchedAt":"…"}`.
4. GitHub repo → Settings → Secrets and variables → Actions → **Variables** → New variable `YOUTUBE_LIVE_URL` = the Worker URL **with a trailing `/`**.
5. Push any change (or re-run "CI & GitHub Pages") so the site is rebuilt with the relay address.

To change the video, edit `VIDEO_ID` in `wrangler.jsonc` and deploy again.

## 16. Threads API

Uses the official Threads Graph API only. Keyword search needs the **`threads_keyword_search`** permission (Meta App Review). Without it, automated discovery does **not** work — curate posts manually in `src/data/fan-posts.ts` (public posts, with permission, original permalink, `approved: true`). With access + Supabase: `npm run threads:sync` stores candidates as `approved=false` for human review.

## 17–18. Local development & testing

```bash
npm run dev
npm run typecheck && npm run lint
npm test                    # Vitest unit + component tests
NEXT_PUBLIC_YOUTUBE_METRICS_URL=https://metrics.example.com/test-metrics/youtube.json npm run build && npm run test:e2e   # Playwright (desktop + mobile) against ./out
# If Playwright can't download its browser: PW_CHROMIUM_PATH=/path/to/chrome npm run test:e2e
```

## 19. Production deployment

**Netlify** (recommended): New site → import this GitHub repo. `netlify.toml` already sets build `npm run build`, publish `out`, Node 22 and security headers. Add `NEXT_PUBLIC_SITE_URL` (your Netlify URL/domain) in Site settings → Environment variables, then redeploy.

**GitHub Pages**: repo Settings → Pages → Source: *GitHub Actions*. `.github/workflows/ci.yml` tests, builds and deploys `out/` on every push to `main`.

## 20. Top 1 iTunes campaign

- **Route:** `/top-1-itunes/` (`src/app/top-1-itunes/page.tsx`). Sections: intro → `#muc-tieu` → `#huong-dan-mass-buy` → `#mua-itunes` → `#hoi-dap`.
- **Homepage:** shows only the campaign introduction (`CampaignHero`), which links to `/top-1-itunes/#huong-dan-mass-buy` and `/top-1-itunes/#mua-itunes`. The hero's “Cùng lên Top 1” button and the “Top 1 iTunes” nav item link to `/top-1-itunes/`.
- **Single source of copy:** `CampaignHero` is shared by the homepage and the campaign page, so the intro text is written once.
- **Links:** everything is in **`src/config/campaign.ts`**:

```ts
export const MUSIC_LINKS = {
  officialMV: "#",       // ← paste the official YouTube MV URL (https://…)
  itunesPurchase: "#",   // ← paste the official iTunes Store URL (https://music.apple.com/…)
  massBuyTutorial: "https://www.threads.com/@sapcanhnhathiennga/post/DgHlG-gEmoH",
};
```

While a link is `#`, its button stays visible and shows a fixed Vietnamese notice instead of navigating. Replace `#` with a real `https://` URL and it becomes a normal link that opens in a new tab. No component changes are needed.

- Optional: `CAMPAIGN_CONFIG.itunesListedAt` (real on-sale time) and `verifiedRank` (verified chart position). Both are `null` until confirmed; nothing is estimated.
- There is no release-time block, countdown or timer on the site.

## Outstanding external dependencies

- Official MV URL and iTunes purchase URL (currently `#`).

- Official MV URL and iTunes purchase URL (currently `#`).

- Authorised Vietnamese lyrics + rights confirmation; approved EN / 中文 translations; timestamps.
- Official MV URL, release date, Spotify track URL, credits.
- YouTube API key + `NEXT_PUBLIC_YOUTUBE_METRICS_URL` for automatic Road to 1M numbers.
- Fansite logos, Threads URLs and direct Messenger invite links.
- Threads API app + `threads_keyword_search` approval (or manual curation).
- GA4 ID, custom domain.
