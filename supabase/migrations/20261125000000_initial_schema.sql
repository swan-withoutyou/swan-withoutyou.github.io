-- SWAN "Thiếu Nàng" — initial schema.
-- Public (anon) role can only READ published / approved rows. All writes go through the
-- service-role key, which is used server-side only (scripts / CI), never in the browser.

create extension if not exists "pgcrypto";

-- ---------- Enums ----------
create type publication_status as enum ('draft', 'pending_rights', 'published', 'unpublished');
create type translation_status as enum ('draft', 'review', 'approved', 'published');
create type lyrics_language as enum ('vi', 'en', 'zh-CN');
create type streaming_platform as enum ('youtube', 'spotify');
create type video_role as enum ('teaser', 'official_mv', 'other');

-- ---------- campaigns ----------
create table campaigns (
  id text primary key,
  title text not null,
  starts_at timestamptz,
  timezone text not null default 'Asia/Ho_Chi_Minh',
  status publication_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table campaign_targets (
  id uuid primary key default gen_random_uuid(),
  campaign_id text not null references campaigns(id) on delete cascade,
  platform streaming_platform not null,
  target bigint not null check (target > 0),
  window_days int not null check (window_days > 0),
  unique (campaign_id, platform)
);

create table campaign_milestones (
  id text primary key,
  campaign_id text not null references campaigns(id) on delete cascade,
  platform streaming_platform not null,
  target bigint not null check (target > 0),
  within_hours int not null check (within_hours > 0),
  label text not null
);
create index on campaign_milestones (campaign_id, platform);

-- ---------- music_tracks ----------
create table music_tracks (
  id text primary key,
  title text not null,
  artist text not null,
  label text,
  release_date date,
  spotify_track_url text check (spotify_track_url is null or spotify_track_url like 'https://%'),
  credits jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table track_videos (
  id uuid primary key default gen_random_uuid(),
  track_id text not null references music_tracks(id) on delete cascade,
  youtube_id text not null,
  url text not null check (url like 'https://%'),
  title text not null,
  channel text not null,
  role video_role not null,
  verified_at date,
  unique (track_id, youtube_id)
);
-- At most one official MV and one teaser per track.
create unique index track_videos_one_role on track_videos (track_id, role) where role in ('teaser', 'official_mv');

-- ---------- lyrics ----------
-- Song-level rights state.
create table lyrics_publications (
  track_id text primary key references music_tracks(id) on delete cascade,
  publication_status publication_status not null default 'pending_rights',
  rights_confirmed boolean not null default false,
  allow_copy boolean not null default false,
  updated_at timestamptz not null default now()
);

create table lyrics_translations (
  id uuid primary key default gen_random_uuid(),
  track_id text not null references music_tracks(id) on delete cascade,
  language_code lyrics_language not null,
  translation_status translation_status not null default 'draft',
  rights_confirmed boolean not null default false,
  source_language lyrics_language not null default 'vi',
  translation_source text,
  approved_at timestamptz,
  published_at timestamptz,
  unique (track_id, language_code),
  check (translation_status not in ('approved', 'published') or approved_at is not null)
);

-- Sections are shared across languages (stable ids); headings are per language.
create table lyrics_sections (
  track_id text not null references music_tracks(id) on delete cascade,
  id text not null check (id ~ '^[a-z0-9-]+$'),
  section_type text not null,
  position int not null,
  primary key (track_id, id),
  unique (track_id, position)
);

create table lyrics_section_headings (
  translation_id uuid not null references lyrics_translations(id) on delete cascade,
  track_id text not null,
  section_id text not null,
  heading text not null,
  primary key (translation_id, section_id),
  foreign key (track_id, section_id) references lyrics_sections(track_id, id) on delete cascade
);

-- Line identity is shared; the text + timestamps live per translation.
create table lyrics_line_ids (
  track_id text not null,
  section_id text not null,
  id text not null check (id ~ '^[a-z0-9-]+$'),
  position int not null,
  start_time numeric(8,3) check (start_time is null or start_time >= 0),
  end_time numeric(8,3),
  primary key (track_id, id),
  unique (track_id, section_id, position),
  foreign key (track_id, section_id) references lyrics_sections(track_id, id) on delete cascade,
  check (end_time is null or (start_time is not null and end_time > start_time))
);

create table lyrics_lines (
  translation_id uuid not null references lyrics_translations(id) on delete cascade,
  track_id text not null,
  line_id text not null,
  text text not null check (length(text) > 0),
  primary key (translation_id, line_id),
  foreign key (track_id, line_id) references lyrics_line_ids(track_id, id) on delete cascade
);

-- ---------- streaming_metrics ----------
create table streaming_metrics (
  id uuid primary key default gen_random_uuid(),
  campaign_id text not null references campaigns(id) on delete cascade,
  platform streaming_platform not null,
  value bigint not null check (value >= 0),
  recorded_at timestamptz not null,
  source text,
  created_at timestamptz not null default now(),
  unique (campaign_id, platform, recorded_at)
);
create index on streaming_metrics (campaign_id, platform, recorded_at desc);

-- ---------- fansites ----------
create table fansites (
  id text primary key,
  sort_order int not null unique,
  name text not null,
  tagline text not null default '',
  description text not null default '',
  logo_path text,
  threads_url text check (threads_url is null or threads_url like 'https://%'),
  qr_image_path text check (qr_image_path is null or qr_image_path like '/images/fansites/%'),
  qr_alt text not null default '',
  messenger_invite_url text check (messenger_invite_url is null or messenger_invite_url like 'https://%')
);

-- ---------- fan_posts ----------
create table fan_posts (
  id text primary key,                 -- Threads media id
  author_name text not null,
  username text not null,
  text text not null default '',
  media_type text not null check (media_type in ('text', 'image', 'video')),
  media_url text,
  permalink text not null unique check (permalink like 'https://www.threads.%'),
  published_at timestamptz not null,
  tags text[] not null default '{}',
  approved boolean not null default false,
  fetched_at timestamptz not null default now()
);
create index on fan_posts (approved, published_at desc);

-- ---------- campaign_updates ----------
create table campaign_updates (
  id text primary key,
  campaign_id text references campaigns(id) on delete set null,
  title text not null,
  body text not null,
  published boolean not null default false,
  published_at timestamptz not null default now()
);
create index on campaign_updates (published, published_at desc);

-- ---------- Row Level Security ----------
alter table campaigns enable row level security;
alter table campaign_targets enable row level security;
alter table campaign_milestones enable row level security;
alter table music_tracks enable row level security;
alter table track_videos enable row level security;
alter table lyrics_publications enable row level security;
alter table lyrics_translations enable row level security;
alter table lyrics_sections enable row level security;
alter table lyrics_section_headings enable row level security;
alter table lyrics_line_ids enable row level security;
alter table lyrics_lines enable row level security;
alter table streaming_metrics enable row level security;
alter table fansites enable row level security;
alter table fan_posts enable row level security;
alter table campaign_updates enable row level security;

-- Public, non-sensitive reference data.
create policy "public read campaigns" on campaigns for select using (status = 'published');
create policy "public read targets" on campaign_targets for select using (true);
create policy "public read milestones" on campaign_milestones for select using (true);
create policy "public read tracks" on music_tracks for select using (true);
create policy "public read videos" on track_videos for select using (true);
create policy "public read metrics" on streaming_metrics for select using (true);
create policy "public read fansites" on fansites for select using (true);
create policy "public read approved posts" on fan_posts for select using (approved);
create policy "public read published updates" on campaign_updates for select using (published);
create policy "public read lyrics publication" on lyrics_publications for select using (true);

-- Lyrics: only when the song is published with rights confirmed AND the language is approved/published.
create or replace function lyrics_translation_is_public(t_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from lyrics_translations t
    join lyrics_publications p on p.track_id = t.track_id
    where t.id = t_id
      and p.publication_status = 'published'
      and p.rights_confirmed
      and t.translation_status in ('approved', 'published')
  );
$$;

create policy "public read approved translations" on lyrics_translations
  for select using (lyrics_translation_is_public(id));
create policy "public read approved lines" on lyrics_lines
  for select using (lyrics_translation_is_public(translation_id));
create policy "public read approved headings" on lyrics_section_headings
  for select using (lyrics_translation_is_public(translation_id));
create policy "public read section structure" on lyrics_sections for select using (
  exists (select 1 from lyrics_publications p where p.track_id = lyrics_sections.track_id
          and p.publication_status = 'published' and p.rights_confirmed));
create policy "public read line structure" on lyrics_line_ids for select using (
  exists (select 1 from lyrics_publications p where p.track_id = lyrics_line_ids.track_id
          and p.publication_status = 'published' and p.rights_confirmed));

-- No insert/update/delete policies: only the service role (which bypasses RLS) can write.
