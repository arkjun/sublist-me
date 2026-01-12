-- Service Providers Seed Data
-- Generated at: 2026-01-12T05:19:00.120Z
-- Total providers: 59


INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '289193eb-a702-4706-8c9a-9ee4a2ee26c8',
  'netflix',
  '{"ko":"넷플릭스","en":"Netflix","ja":"ネットフリックス"}',
  'https://www.netflix.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '93be3e87-c574-414b-b0ff-9e0e74fbb3af',
  'youtube-premium',
  '{"ko":"유튜브 프리미엄","en":"YouTube Premium","ja":"YouTube Premium"}',
  'https://www.youtube.com/premium',
  '',
  '["ott","music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'c94a733f-cd66-454f-bb8a-3c372047d81c',
  'disney-plus',
  '{"ko":"디즈니+","en":"Disney+","ja":"Disney+"}',
  'https://www.disneyplus.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '5d56f4cb-05a8-47e7-baca-aaa1f6932409',
  'amazon-prime-video',
  '{"ko":"아마존 프라임 비디오","en":"Amazon Prime Video","ja":"Amazonプライム・ビデオ"}',
  'https://www.primevideo.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '9c33d695-05d2-468d-ab64-055f3ac706c5',
  'apple-tv-plus',
  '{"ko":"Apple TV+","en":"Apple TV+","ja":"Apple TV+"}',
  'https://tv.apple.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '653f651f-ea46-4a90-849a-db36a083f346',
  'hbo-max',
  '{"ko":"Max","en":"Max","ja":"Max"}',
  'https://www.max.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '61eab8d7-eb5a-480c-9e88-ce782e2d40cc',
  'wavve',
  '{"ko":"웨이브","en":"Wavve","ja":"Wavve"}',
  'https://www.wavve.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '69330995-f0f1-4c85-903d-a653cd554694',
  'tving',
  '{"ko":"티빙","en":"Tving","ja":"Tving"}',
  'https://www.tving.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '7e11c2cc-0229-4ae4-ac0a-a66da98a5f50',
  'watcha',
  '{"ko":"왓챠","en":"Watcha","ja":"WATCHA"}',
  'https://watcha.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '555ede84-75a3-4568-aee8-f4300661028a',
  'coupang-play',
  '{"ko":"쿠팡플레이","en":"Coupang Play","ja":"Coupang Play"}',
  'https://www.coupangplay.com',
  '',
  '["ott"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'dc39a5a1-15ad-4aa9-b9b7-0858a20b5a8a',
  'spotify',
  '{"ko":"스포티파이","en":"Spotify","ja":"Spotify"}',
  'https://www.spotify.com',
  '',
  '["music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '564503de-19e3-4054-8cce-012aa4322e19',
  'apple-music',
  '{"ko":"Apple Music","en":"Apple Music","ja":"Apple Music"}',
  'https://music.apple.com',
  '',
  '["music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '07f60ef5-8d82-4a0a-9c79-21ef64dc916a',
  'youtube-music',
  '{"ko":"유튜브 뮤직","en":"YouTube Music","ja":"YouTube Music"}',
  'https://music.youtube.com',
  '',
  '["music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'f311a278-0ee4-4aac-8759-07b587585996',
  'melon',
  '{"ko":"멜론","en":"Melon","ja":"Melon"}',
  'https://www.melon.com',
  '',
  '["music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'f19500e3-4619-4dc4-86a3-9837c76f8764',
  'genie',
  '{"ko":"지니뮤직","en":"Genie Music","ja":"Genie Music"}',
  'https://www.genie.co.kr',
  '',
  '["music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '15d3c302-557a-4c95-ac09-a09a2f51ff0f',
  'bugs',
  '{"ko":"벅스","en":"Bugs","ja":"Bugs"}',
  'https://music.bugs.co.kr',
  '',
  '["music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '2b58b868-aa41-40e0-9e11-b513dbdcbbbc',
  'flo',
  '{"ko":"FLO","en":"FLO","ja":"FLO"}',
  'https://www.music-flo.com',
  '',
  '["music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '874631fb-c88e-4974-843f-70bee0aa9354',
  'amazon-music',
  '{"ko":"아마존 뮤직","en":"Amazon Music","ja":"Amazon Music"}',
  'https://music.amazon.com',
  '',
  '["music"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '1186a818-9f4d-4c84-95be-fb67c5f495a0',
  'xbox-game-pass',
  '{"ko":"Xbox Game Pass","en":"Xbox Game Pass","ja":"Xbox Game Pass"}',
  'https://www.xbox.com/gamepass',
  '',
  '["gaming"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '5a499b52-92e3-4613-9703-ddf8545c0864',
  'playstation-plus',
  '{"ko":"PlayStation Plus","en":"PlayStation Plus","ja":"PlayStation Plus"}',
  'https://www.playstation.com/ps-plus',
  '',
  '["gaming"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'd4dc0cd3-4a2a-418a-898a-728c8823ed73',
  'nintendo-switch-online',
  '{"ko":"Nintendo Switch Online","en":"Nintendo Switch Online","ja":"Nintendo Switch Online"}',
  'https://www.nintendo.com/switch/online',
  '',
  '["gaming"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '23f40971-a0c2-4b7e-a996-8742fca2ee94',
  'ea-play',
  '{"ko":"EA Play","en":"EA Play","ja":"EA Play"}',
  'https://www.ea.com/ea-play',
  '',
  '["gaming"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'e846b9eb-5e3f-432e-9ec5-d996d62cedef',
  'geforce-now',
  '{"ko":"지포스 나우","en":"GeForce NOW","ja":"GeForce NOW"}',
  'https://www.nvidia.com/geforce-now',
  '',
  '["gaming","cloud"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '40d9d9b8-c7d8-410c-9ede-c7bb04a24737',
  'amazon-prime',
  '{"ko":"아마존 프라임","en":"Amazon Prime","ja":"Amazonプライム"}',
  'https://www.amazon.com/prime',
  '',
  '["shopping"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'c9a80309-6c15-4d25-817d-5acb44591f9b',
  'coupang-rocket-wow',
  '{"ko":"쿠팡 로켓와우","en":"Coupang Rocket WOW","ja":"Coupang Rocket WOW"}',
  'https://www.coupang.com/np/rocketwow',
  '',
  '["shopping"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'dabce335-7124-49cb-8e0f-df27cacc6256',
  'naver-plus',
  '{"ko":"네이버 플러스 멤버십","en":"Naver Plus Membership","ja":"Naver Plus Membership"}',
  'https://nid.naver.com/membership',
  '',
  '["shopping"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'f2f8a109-23a9-4d42-ad26-d05178ef125a',
  'ssg-universe',
  '{"ko":"SSG 유니버스","en":"SSG Universe","ja":"SSG Universe"}',
  'https://www.ssg.com',
  '',
  '["shopping"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '09eed8a5-2b3b-4b3b-9f34-a83e6a098419',
  'microsoft-365',
  '{"ko":"Microsoft 365","en":"Microsoft 365","ja":"Microsoft 365"}',
  'https://www.microsoft.com/microsoft-365',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'ad6666b7-645e-4178-aaf3-e41cd4866762',
  'google-one',
  '{"ko":"Google One","en":"Google One","ja":"Google One"}',
  'https://one.google.com',
  '',
  '["productivity","cloud"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'a50d9d83-14cd-4c23-83ca-b447d0268f72',
  'notion',
  '{"ko":"노션","en":"Notion","ja":"Notion"}',
  'https://www.notion.so',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '30776673-a993-48ab-ac1d-0aecfe95e425',
  'dropbox',
  '{"ko":"드롭박스","en":"Dropbox","ja":"Dropbox"}',
  'https://www.dropbox.com',
  '',
  '["productivity","cloud"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '1a6507ab-4b78-4bf1-83cc-c0077c8e7f15',
  'evernote',
  '{"ko":"에버노트","en":"Evernote","ja":"Evernote"}',
  'https://evernote.com',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '275b8862-079b-4e7d-8e4a-0b7589c8c355',
  'adobe-creative-cloud',
  '{"ko":"Adobe Creative Cloud","en":"Adobe Creative Cloud","ja":"Adobe Creative Cloud"}',
  'https://www.adobe.com/creativecloud',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '69f0c37d-f44e-44b5-97d6-3cca62745a7a',
  'figma',
  '{"ko":"피그마","en":"Figma","ja":"Figma"}',
  'https://www.figma.com',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '3edc9fcf-f666-477f-8db8-6a2da3da8a75',
  'canva',
  '{"ko":"캔바","en":"Canva","ja":"Canva"}',
  'https://www.canva.com',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '70115d31-31d5-404d-a8b2-3dc5e95c4f97',
  'slack',
  '{"ko":"슬랙","en":"Slack","ja":"Slack"}',
  'https://slack.com',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '8c74cb45-3f33-4fac-b952-fbff040f6afe',
  'zoom',
  '{"ko":"줌","en":"Zoom","ja":"Zoom"}',
  'https://zoom.us',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '65896509-6f24-48c8-a93f-61f1b9729a54',
  'icloud-plus',
  '{"ko":"iCloud+","en":"iCloud+","ja":"iCloud+"}',
  'https://www.icloud.com',
  '',
  '["cloud"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '11c9b36c-2513-4885-9f89-38cf332f11be',
  'onedrive',
  '{"ko":"OneDrive","en":"OneDrive","ja":"OneDrive"}',
  'https://onedrive.live.com',
  '',
  '["cloud"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'd5bf2bcc-cc4a-4180-bc56-b56bbdb7410e',
  'nyt',
  '{"ko":"뉴욕타임스","en":"The New York Times","ja":"ニューヨーク・タイムズ"}',
  'https://www.nytimes.com',
  '',
  '["news"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '59fbdb64-b593-42ec-8e2a-3cdb736419d5',
  'wsj',
  '{"ko":"월스트리트저널","en":"The Wall Street Journal","ja":"ウォール・ストリート・ジャーナル"}',
  'https://www.wsj.com',
  '',
  '["news"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '5293eb22-4cd2-4ce2-aefb-fd20e8a2b716',
  'nikkei',
  '{"ko":"니케이","en":"Nikkei","ja":"日本経済新聞"}',
  'https://www.nikkei.com',
  '',
  '["news"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'fc2245ba-d74e-44f8-8ca0-0449bc823f83',
  'economist',
  '{"ko":"이코노미스트","en":"The Economist","ja":"エコノミスト"}',
  'https://www.economist.com',
  '',
  '["news"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'f76f3f94-9ec4-49e4-b347-7c3813d18cb8',
  'apple-fitness-plus',
  '{"ko":"Apple Fitness+","en":"Apple Fitness+","ja":"Apple Fitness+"}',
  'https://www.apple.com/apple-fitness-plus',
  '',
  '["fitness"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '87e4b566-e1e1-408d-924a-74e9992519da',
  'peloton',
  '{"ko":"펠로톤","en":"Peloton","ja":"Peloton"}',
  'https://www.onepeloton.com',
  '',
  '["fitness"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '01cf4100-b725-44a3-b698-3d9871f04575',
  'nike-training-club',
  '{"ko":"나이키 트레이닝 클럽","en":"Nike Training Club","ja":"Nike Training Club"}',
  'https://www.nike.com/ntc-app',
  '',
  '["fitness"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '210372c4-7519-4e2e-aa2b-70643ae619ba',
  'coursera',
  '{"ko":"코세라","en":"Coursera","ja":"Coursera"}',
  'https://www.coursera.org',
  '',
  '["education"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '4d29d40b-b640-443d-a030-bac04686744b',
  'udemy',
  '{"ko":"유데미","en":"Udemy","ja":"Udemy"}',
  'https://www.udemy.com',
  '',
  '["education"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '151c30f3-aa65-4794-9323-73ef50b3421a',
  'skillshare',
  '{"ko":"스킬쉐어","en":"Skillshare","ja":"Skillshare"}',
  'https://www.skillshare.com',
  '',
  '["education"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'fa0119cf-7fd3-4220-98c9-7ba4b6f1b153',
  'masterclass',
  '{"ko":"마스터클래스","en":"MasterClass","ja":"MasterClass"}',
  'https://www.masterclass.com',
  '',
  '["education"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'c2cd6f85-553f-4d16-bc4f-eba41765bbbf',
  'duolingo',
  '{"ko":"듀오링고","en":"Duolingo","ja":"Duolingo"}',
  'https://www.duolingo.com',
  '',
  '["education"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '848360e5-9a0b-414d-b008-ae47a0944cb8',
  'linkedin-learning',
  '{"ko":"링크드인 러닝","en":"LinkedIn Learning","ja":"LinkedIn Learning"}',
  'https://www.linkedin.com/learning',
  '',
  '["education"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '23cb8dfd-7564-4dfe-a28d-1eb755459ec3',
  'toss-prime',
  '{"ko":"토스 프라임","en":"Toss Prime","ja":"Toss Prime"}',
  'https://toss.im',
  '',
  '["finance"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'a2a38780-1d45-4028-a9b4-a15c96fdbbc0',
  'baemin-club',
  '{"ko":"배민클럽","en":"Baemin Club","ja":"配達の民族Club"}',
  'https://www.baemin.com',
  '',
  '["food"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'b0b27b44-eb58-4693-a249-f5e3f952d422',
  'yogiyo-super',
  '{"ko":"요기요 슈퍼클럽","en":"Yogiyo Super Club","ja":"Yogiyo Super Club"}',
  'https://www.yogiyo.co.kr',
  '',
  '["food"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '66aa2363-0d9a-4e21-b380-8a0fb3540fd2',
  'chatgpt-plus',
  '{"ko":"ChatGPT Plus","en":"ChatGPT Plus","ja":"ChatGPT Plus"}',
  'https://chat.openai.com',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'f558f8dd-86af-4b89-bab9-5b32de8457af',
  'claude-pro',
  '{"ko":"Claude Pro","en":"Claude Pro","ja":"Claude Pro"}',
  'https://claude.ai',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  'c3f269f2-3ee5-43a4-8b7f-1a8b00c6f000',
  'github-copilot',
  '{"ko":"GitHub Copilot","en":"GitHub Copilot","ja":"GitHub Copilot"}',
  'https://github.com/features/copilot',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');

INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '79fa3114-8782-4cb5-8439-f5de72c3f336',
  'midjourney',
  '{"ko":"미드저니","en":"Midjourney","ja":"Midjourney"}',
  'https://www.midjourney.com',
  '',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');
