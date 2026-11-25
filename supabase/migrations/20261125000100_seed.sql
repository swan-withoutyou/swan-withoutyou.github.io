-- Seed with verified facts only. No lyrics, no metrics, no invented URLs.
insert into campaigns (id, title, starts_at, status) values ('road-to-1m', 'Road to 1M', null, 'published');

insert into campaign_targets (campaign_id, platform, target, window_days) values
  ('road-to-1m', 'youtube', 1000000, 30),
  ('road-to-1m', 'spotify', 1000000, 30);

insert into campaign_milestones (id, campaign_id, platform, target, within_hours, label) values
  ('yt-1', 'road-to-1m', 'youtube', 50000, 2, '2 giờ đầu'),
  ('yt-2', 'road-to-1m', 'youtube', 100000, 48, '48 giờ đầu'),
  ('yt-3', 'road-to-1m', 'youtube', 1000000, 720, '30 ngày đầu'),
  ('sp-1', 'road-to-1m', 'spotify', 1000000, 720, '30 ngày đầu');

insert into music_tracks (id, title, artist, label) values ('thieu-nang', 'Thiếu Nàng', 'SWAN', 'SYE Holdings');

insert into track_videos (track_id, youtube_id, url, title, channel, role, verified_at) values
  ('thieu-nang', 'B8cb4a-iNco', 'https://www.youtube.com/watch?v=B8cb4a-iNco', 'SWAN - Thiếu Nàng [Teaser]', 'SYE Official', 'teaser', '2026-11-25'),
  ('thieu-nang', 'XlhmFJ1ZqxU', 'https://youtu.be/XlhmFJ1ZqxU?si=Kzo0QPp2t39GBmNA', 'SWAN - có lẽ x Prod. Neyun (DRILL VERSION)', 'SYE Official', 'other', '2026-11-25');

insert into lyrics_publications (track_id, publication_status, rights_confirmed, allow_copy)
  values ('thieu-nang', 'pending_rights', false, false);

insert into lyrics_translations (track_id, language_code, translation_status) values
  ('thieu-nang', 'vi', 'draft'), ('thieu-nang', 'en', 'draft'), ('thieu-nang', 'zh-CN', 'draft');

insert into fansites (id, sort_order, name, tagline, qr_image_path, qr_alt) values
  ('sap-canh-thien-nga', 1, 'Sạp Cánh Thiên Nga', 'Fansite 01', '/images/fansites/fansite-01-messenger-qr.png', 'Mã QR tham gia nhóm Messenger của Sạp Cánh Thiên Nga'),
  ('swniverse', 2, 'swniverse', 'Fansite 02', '/images/fansites/fansite-02-messenger-qr.png', 'Mã QR tham gia nhóm Messenger của swniverse');
