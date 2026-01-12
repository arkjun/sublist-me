-- Service Providers Seed Data
-- Generated at: 2026-01-12T06:32:00.642Z
-- Total providers: 59


INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '2b8cd8ba-f3b3-4644-8eef-f07fff45772a',
  'netflix',
  '{"ko":"넷플릭스","en":"Netflix","ja":"ネットフリックス"}',
  'https://www.netflix.com',
  'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
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
  '47865f43-ffa0-4e73-8bd4-abfff0875241',
  'youtube-premium',
  '{"ko":"유튜브 프리미엄","en":"YouTube Premium","ja":"YouTube Premium"}',
  'https://www.youtube.com/premium',
  'https://www.youtube.com/s/desktop/f506bd45/img/favicon_144x144.png',
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
  'd8db64c4-55aa-4147-99f3-0daf3192de29',
  'disney-plus',
  '{"ko":"디즈니+","en":"Disney+","ja":"Disney+"}',
  'https://www.disneyplus.com',
  'https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927571f8fcb51a7a7/original',
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
  '0d9b6a10-4fa4-464f-8085-98994a012498',
  'amazon-prime-video',
  '{"ko":"아마존 프라임 비디오","en":"Amazon Prime Video","ja":"Amazonプライム・ビデオ"}',
  'https://www.primevideo.com',
  'https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png',
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
  '68528e02-9124-4a31-9248-621ebd83623d',
  'apple-tv-plus',
  '{"ko":"Apple TV+","en":"Apple TV+","ja":"Apple TV+"}',
  'https://tv.apple.com',
  'https://tv.apple.com/assets/knowledge-graph/tv.png',
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
  '7050bebb-e5fa-4123-aba7-e8ece6e48667',
  'hbo-max',
  '{"ko":"Max","en":"Max","ja":"Max"}',
  'https://www.max.com',
  'https://play.max.com/img/max-h-w-l.svg',
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
  '67aa5daa-66ba-4255-bae5-0e8e2b588014',
  'wavve',
  '{"ko":"웨이브","en":"Wavve","ja":"Wavve"}',
  'https://www.wavve.com',
  'https://www.wavve.com/favicon.ico',
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
  'f687e2c5-9cb1-4227-b117-46f1dcb1b016',
  'tving',
  '{"ko":"티빙","en":"Tving","ja":"Tving"}',
  'https://www.tving.com',
  'https://www.tving.com/img/tving-favicon-160@3x.png',
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
  '525fe9ff-f082-47bd-a163-1291fa778b0d',
  'watcha',
  '{"ko":"왓챠","en":"Watcha","ja":"WATCHA"}',
  'https://watcha.com',
  'https://watcha.com/favicon.ico',
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
  'e7010b6a-98d6-40a6-bf99-45bb8d757c3d',
  'coupang-play',
  '{"ko":"쿠팡플레이","en":"Coupang Play","ja":"Coupang Play"}',
  'https://www.coupangplay.com',
  'https://image6.coupangcdn.com/image/coupangplay/favicon/favicon.ico',
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
  '419b3a18-59c1-460f-99a6-29c3e0271920',
  'spotify',
  '{"ko":"스포티파이","en":"Spotify","ja":"Spotify"}',
  'https://www.spotify.com',
  'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
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
  'b8724cb0-7875-4c16-9385-d4a37560cda1',
  'apple-music',
  '{"ko":"Apple Music","en":"Apple Music","ja":"Apple Music"}',
  'https://music.apple.com',
  'https://music.apple.com/assets/knowledge-graph/music.png',
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
  'f7d9c027-0148-46fa-9454-911c38f6fec6',
  'youtube-music',
  '{"ko":"유튜브 뮤직","en":"YouTube Music","ja":"YouTube Music"}',
  'https://music.youtube.com',
  'https://music.youtube.com/img/on_platform_logo_dark.svg',
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
  '9dbe6a91-b5cd-4205-8ad0-884205c324bb',
  'melon',
  '{"ko":"멜론","en":"Melon","ja":"Melon"}',
  'https://www.melon.com',
  'https://cdnimg.melon.co.kr/resource/image/web/common/logo_melon142x99.png',
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
  '83f9b39b-bf68-4207-9367-e9f2638c347c',
  'genie',
  '{"ko":"지니뮤직","en":"Genie Music","ja":"Genie Music"}',
  'https://www.genie.co.kr',
  'https://www.genie.co.kr/favicon.ico',
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
  '776a4091-366f-4ebe-9ff7-869a59b239a5',
  'bugs',
  '{"ko":"벅스","en":"Bugs","ja":"Bugs"}',
  'https://music.bugs.co.kr',
  'https://file.bugsm.co.kr/bdesign/sns/1200x630_bugs.png',
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
  'abca9d46-93d3-41e3-8e1f-989fe5424727',
  'flo',
  '{"ko":"FLO","en":"FLO","ja":"FLO"}',
  'https://www.music-flo.com',
  'https://www.music-flo.com/favicon.ico',
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
  '223094f1-18a7-468c-9dca-0414db0be15f',
  'amazon-music',
  '{"ko":"아마존 뮤직","en":"Amazon Music","ja":"Amazon Music"}',
  'https://music.amazon.com',
  'https://m.media-amazon.com/images/G/01/music/logo/1.0/amazon_music_410x82px.svg',
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
  'ac183358-3ab8-42b9-bbb7-49b6a74aab30',
  'xbox-game-pass',
  '{"ko":"Xbox Game Pass","en":"Xbox Game Pass","ja":"Xbox Game Pass"}',
  'https://www.xbox.com/gamepass',
  'https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png',
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
  'e981d47e-b948-4fee-9fe6-800afdd95c92',
  'playstation-plus',
  '{"ko":"PlayStation Plus","en":"PlayStation Plus","ja":"PlayStation Plus"}',
  'https://www.playstation.com/ps-plus',
  'https://gmedia.playstation.com/is/image/SIEPDC/ps-plus-black-badge-01-22sep20',
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
  '102dd528-7b48-4220-bbba-d62f656d9aff',
  'nintendo-switch-online',
  '{"ko":"Nintendo Switch Online","en":"Nintendo Switch Online","ja":"Nintendo Switch Online"}',
  'https://www.nintendo.com/switch/online',
  'https://assets.nintendo.com/image/upload/f_auto/q_auto/c_fill,w_800/ncom/en_US/switch/online-service/posters/nso-logo',
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
  'deff300d-0f59-4606-959f-4d68b518ab4d',
  'ea-play',
  '{"ko":"EA Play","en":"EA Play","ja":"EA Play"}',
  'https://www.ea.com/ea-play',
  'https://media.contentapi.ea.com/content/dam/eacom/subscription/ea-play/common/embed-code/color/ea-play-logo-coral-embed-code.svg',
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
  '5fb1e138-7a05-4233-a300-f90da062308b',
  'geforce-now',
  '{"ko":"지포스 나우","en":"GeForce NOW","ja":"GeForce NOW"}',
  'https://www.nvidia.com/geforce-now',
  'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-now/gfn-ultimate-ecosystem-text-nv-gf-wmfg-2560-d.jpg',
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
  '8370e2ed-3201-4295-8298-8954ff6c0303',
  'amazon-prime',
  '{"ko":"아마존 프라임","en":"Amazon Prime","ja":"Amazonプライム"}',
  'https://www.amazon.com/prime',
  'https://m.media-amazon.com/images/G/01/kfw/landing/2023/MEMBER/PrimeCard_Stacked_Logo_1x.png',
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
  'dfabc4af-8dd3-4b14-8e65-81eb6eb18161',
  'coupang-rocket-wow',
  '{"ko":"쿠팡 로켓와우","en":"Coupang Rocket WOW","ja":"Coupang Rocket WOW"}',
  'https://www.coupang.com/np/rocketwow',
  'https://image7.coupangcdn.com/image/coupang/favicon/v2/favicon.ico',
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
  '1e7543cc-9857-457a-953b-75125e9c69fc',
  'naver-plus',
  '{"ko":"네이버 플러스 멤버십","en":"Naver Plus Membership","ja":"Naver Plus Membership"}',
  'https://nid.naver.com/membership',
  'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
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
  'b7fa2e5d-b5d2-4f33-b60d-01b772f7c1fd',
  'ssg-universe',
  '{"ko":"SSG 유니버스","en":"SSG Universe","ja":"SSG Universe"}',
  'https://www.ssg.com',
  'https://sui.ssgcdn.com/ui/common/img/sns/ssg.png',
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
  'f1b6cb16-b754-4fec-a15b-c9da12dc064d',
  'microsoft-365',
  '{"ko":"Microsoft 365","en":"Microsoft 365","ja":"Microsoft 365"}',
  'https://www.microsoft.com/microsoft-365',
  'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b',
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
  '59885093-f7f8-45f3-857b-c165d6276d0a',
  'google-one',
  '{"ko":"Google One","en":"Google One","ja":"Google One"}',
  'https://one.google.com',
  'https://www.gstatic.com/images/branding/product/2x/google_one_512dp.png',
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
  'c727a7fb-1a40-4b62-9604-910010d52bc2',
  'notion',
  '{"ko":"노션","en":"Notion","ja":"Notion"}',
  'https://www.notion.so',
  'https://www.notion.so/images/favicon.ico',
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
  '302eb392-21c9-4b0c-a587-aa0c3da0ce38',
  'dropbox',
  '{"ko":"드롭박스","en":"Dropbox","ja":"Dropbox"}',
  'https://www.dropbox.com',
  'https://cfl.dropboxstatic.com/static/metaserver/static/images/logo_catalog/dropbox_opengraph_image@2x-vflwsK445.png',
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
  'd4c2b5fc-953c-4540-baf0-b776e1f2ced8',
  'evernote',
  '{"ko":"에버노트","en":"Evernote","ja":"Evernote"}',
  'https://evernote.com',
  'https://images.prismic.io/evernote/aOTBRp5xUNkB1qqj_OG-HP.png?auto=format,compress',
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
  '6bff2d2e-b9ab-483e-8f14-a19f1e2c9872',
  'adobe-creative-cloud',
  '{"ko":"Adobe Creative Cloud","en":"Adobe Creative Cloud","ja":"Adobe Creative Cloud"}',
  'https://www.adobe.com/creativecloud',
  'https://www.adobe.com/cc-shared/assets/img/product-icons/svg/creative-cloud.svg',
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
  'b95f9ccf-32c4-478a-9219-7b72933609da',
  'figma',
  '{"ko":"피그마","en":"Figma","ja":"Figma"}',
  'https://www.figma.com',
  'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png',
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
  '32d06c93-f5cd-4975-ad01-5a8597ce299e',
  'canva',
  '{"ko":"캔바","en":"Canva","ja":"Canva"}',
  'https://www.canva.com',
  'https://static.canva.com/static/images/canva-logo-1200x630.png',
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
  '77fdf6e2-4290-46c8-a0a2-35212da0eafe',
  'slack',
  '{"ko":"슬랙","en":"Slack","ja":"Slack"}',
  'https://slack.com',
  'https://a.slack-edge.com/38f0e7c/marketing/img/nav/slack-salesforce-logo-nav-black.png',
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
  'd6677b4e-9813-4e68-8d6d-ccbe3cd12fa4',
  'zoom',
  '{"ko":"줌","en":"Zoom","ja":"Zoom"}',
  'https://zoom.us',
  'https://st1.zoom.us/zoom.ico',
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
  'a2096cc6-7975-49c6-8776-6098e3ecfce7',
  'icloud-plus',
  '{"ko":"iCloud+","en":"iCloud+","ja":"iCloud+"}',
  'https://www.icloud.com',
  'https://www.apple.com/v/icloud/b/images/overview/icloud_icon__lrfw0gouxxaa_large.png',
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
  'd25d0fd2-0b27-4d4f-90b5-5cc2e7563b22',
  'onedrive',
  '{"ko":"OneDrive","en":"OneDrive","ja":"OneDrive"}',
  'https://onedrive.live.com',
  'https://onedrive.live.com/favicon.ico',
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
  '5b82ce06-780e-471f-920d-12911a569e52',
  'nyt',
  '{"ko":"뉴욕타임스","en":"The New York Times","ja":"ニューヨーク・タイムズ"}',
  'https://www.nytimes.com',
  'https://www.nytimes.com/vi-assets/static-assets/apple-touch-icon-28865b72953380a40aa43318108876cb.png',
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
  '990eef7b-5db4-40ff-bf98-cbed97907390',
  'wsj',
  '{"ko":"월스트리트저널","en":"The Wall Street Journal","ja":"ウォール・ストリート・ジャーナル"}',
  'https://www.wsj.com',
  'https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png',
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
  '4466fd8c-de92-4638-b752-3ea2e579e2ec',
  'nikkei',
  '{"ko":"니케이","en":"Nikkei","ja":"日本経済新聞"}',
  'https://www.nikkei.com',
  'https://www.nikkei.com/favicon.ico',
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
  '998b29ae-2be9-474c-a5a0-6b31c88c1dd1',
  'economist',
  '{"ko":"이코노미스트","en":"The Economist","ja":"エコノミスト"}',
  'https://www.economist.com',
  'https://www.economist.com/engassets/google-search-logo.png',
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
  '0033fbeb-be8c-43c5-992f-b1656bb93209',
  'apple-fitness-plus',
  '{"ko":"Apple Fitness+","en":"Apple Fitness+","ja":"Apple Fitness+"}',
  'https://www.apple.com/apple-fitness-plus',
  'https://www.apple.com/v/apple-fitness-plus/ac/images/meta/apple-fitness-plus__cidrqiun6tle_og.png',
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
  'd4e4db02-bcbe-46e4-b1b7-da2f6b7d177b',
  'peloton',
  '{"ko":"펠로톤","en":"Peloton","ja":"Peloton"}',
  'https://www.onepeloton.com',
  'https://www.onepeloton.com/favicon.ico',
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
  '8ba56124-4a4b-4714-8337-06a83f44d823',
  'nike-training-club',
  '{"ko":"나이키 트레이닝 클럽","en":"Nike Training Club","ja":"Nike Training Club"}',
  'https://www.nike.com/ntc-app',
  'https://www.nike.com/favicon.ico',
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
  '99539da4-d833-4e89-9aa1-3ebf2967b9b5',
  'coursera',
  '{"ko":"코세라","en":"Coursera","ja":"Coursera"}',
  'https://www.coursera.org',
  'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png',
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
  '00530c24-894b-45ff-a6b9-992b6fd4a574',
  'udemy',
  '{"ko":"유데미","en":"Udemy","ja":"Udemy"}',
  'https://www.udemy.com',
  'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg',
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
  'fbd6756a-91a3-463f-a569-4eb17263db51',
  'skillshare',
  '{"ko":"스킬쉐어","en":"Skillshare","ja":"Skillshare"}',
  'https://www.skillshare.com',
  'https://www.skillshare.com/favicon.ico',
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
  'c521d75d-307b-4fba-bfaf-5c93ba9d41a2',
  'masterclass',
  '{"ko":"마스터클래스","en":"MasterClass","ja":"MasterClass"}',
  'https://www.masterclass.com',
  'https://www.masterclass.com/favicon.ico',
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
  '7d6fa9b5-8efe-4c55-8e69-38c5f162f32b',
  'duolingo',
  '{"ko":"듀오링고","en":"Duolingo","ja":"Duolingo"}',
  'https://www.duolingo.com',
  'https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81f6c3239a5b2ac4ef05eb4ccb.svg',
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
  '259b526d-a87c-4814-a972-0f7466bf5845',
  'linkedin-learning',
  '{"ko":"링크드인 러닝","en":"LinkedIn Learning","ja":"LinkedIn Learning"}',
  'https://www.linkedin.com/learning',
  'https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca',
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
  '50dc4b0e-a1e0-49dc-8961-25b898b19e5e',
  'toss-prime',
  '{"ko":"토스 프라임","en":"Toss Prime","ja":"Toss Prime"}',
  'https://toss.im',
  'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
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
  'a3c4beb2-4f1a-4949-929e-63a3c13c01bb',
  'baemin-club',
  '{"ko":"배민클럽","en":"Baemin Club","ja":"配達の民族Club"}',
  'https://www.baemin.com',
  'https://www.baemin.com/_next/static/media/baemin-og_thumbnail.31be89ff.png',
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
  'ae7e24e8-6b51-40f5-b6f1-c19487245fce',
  'yogiyo-super',
  '{"ko":"요기요 슈퍼클럽","en":"Yogiyo Super Club","ja":"Yogiyo Super Club"}',
  'https://www.yogiyo.co.kr',
  'https://www.yogiyo.co.kr/favicon.ico',
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
  '5362f55c-f654-45db-9d83-841b051f4e81',
  'chatgpt-plus',
  '{"ko":"ChatGPT Plus","en":"ChatGPT Plus","ja":"ChatGPT Plus"}',
  'https://chat.openai.com',
  'https://cdn.oaistatic.com/assets/apple-touch-icon-mz9nytnj.webp',
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
  '1869e8ce-8e3c-49ed-942b-e6595855ffa5',
  'claude-pro',
  '{"ko":"Claude Pro","en":"Claude Pro","ja":"Claude Pro"}',
  'https://claude.ai',
  'https://claude.ai/apple-touch-icon.png',
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
  '3ee58907-b6df-4d4a-abc3-f9248697c5b0',
  'github-copilot',
  '{"ko":"GitHub Copilot","en":"GitHub Copilot","ja":"GitHub Copilot"}',
  'https://github.com/features/copilot',
  'https://images.ctfassets.net/8aevphvgewt8/5IdZ8KizWhMOGixAmVSw0g/f81f5f263a88eabe5d3e102300d44a88/github-copilot-social-img.png',
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
  '1aa0e6de-6f4c-4a62-963a-1d9e028c18b1',
  'midjourney',
  '{"ko":"미드저니","en":"Midjourney","ja":"Midjourney"}',
  'https://www.midjourney.com',
  'https://www.midjourney.com/favicon.ico',
  '["productivity"]',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');
