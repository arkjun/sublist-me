import type { LocalizedNames, ServiceCategory } from '../schema';

export interface ServiceProviderSeed {
  slug: string;
  names: LocalizedNames;
  url: string;
  logoUrl?: string;
  categories: ServiceCategory[];
}

export const serviceProviderSeeds: ServiceProviderSeed[] = [
  // ========== OTT / Streaming ==========
  {
    slug: 'netflix',
    names: { ko: '넷플릭스', en: 'Netflix', ja: 'ネットフリックス' },
    url: 'https://www.netflix.com',
    logoUrl:
      'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
    categories: ['ott'],
  },
  {
    slug: 'youtube-premium',
    names: {
      ko: '유튜브 프리미엄',
      en: 'YouTube Premium',
      ja: 'YouTube Premium',
    },
    url: 'https://www.youtube.com/premium',
    logoUrl:
      'https://www.youtube.com/s/desktop/f506bd45/img/favicon_144x144.png',
    categories: ['ott', 'music'],
  },
  {
    slug: 'disney-plus',
    names: { ko: '디즈니+', en: 'Disney+', ja: 'Disney+' },
    url: 'https://www.disneyplus.com',
    logoUrl:
      'https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927571f8fcb51a7a7/original',
    categories: ['ott'],
  },
  {
    slug: 'amazon-prime-video',
    names: {
      ko: '아마존 프라임 비디오',
      en: 'Amazon Prime Video',
      ja: 'Amazonプライム・ビデオ',
    },
    url: 'https://www.primevideo.com',
    logoUrl:
      'https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png',
    categories: ['ott'],
  },
  {
    slug: 'apple-tv-plus',
    names: { ko: 'Apple TV+', en: 'Apple TV+', ja: 'Apple TV+' },
    url: 'https://tv.apple.com',
    logoUrl: 'https://tv.apple.com/assets/knowledge-graph/tv.png',
    categories: ['ott'],
  },
  {
    slug: 'hbo-max',
    names: { ko: 'Max', en: 'Max', ja: 'Max' },
    url: 'https://www.max.com',
    logoUrl: 'https://play.max.com/img/max-h-w-l.svg',
    categories: ['ott'],
  },
  {
    slug: 'wavve',
    names: { ko: '웨이브', en: 'Wavve', ja: 'Wavve' },
    url: 'https://www.wavve.com',
    logoUrl: 'https://www.wavve.com/favicon.ico',
    categories: ['ott'],
  },
  {
    slug: 'tving',
    names: { ko: '티빙', en: 'Tving', ja: 'Tving' },
    url: 'https://www.tving.com',
    logoUrl: 'https://www.tving.com/img/tving-favicon-160@3x.png',
    categories: ['ott'],
  },
  {
    slug: 'watcha',
    names: { ko: '왓챠', en: 'Watcha', ja: 'WATCHA' },
    url: 'https://watcha.com',
    logoUrl: 'https://watcha.com/favicon.ico',
    categories: ['ott'],
  },
  {
    slug: 'coupang-play',
    names: { ko: '쿠팡플레이', en: 'Coupang Play', ja: 'Coupang Play' },
    url: 'https://www.coupangplay.com',
    logoUrl:
      'https://image6.coupangcdn.com/image/coupangplay/favicon/favicon.ico',
    categories: ['ott'],
  },

  // ========== Music ==========
  {
    slug: 'spotify',
    names: { ko: '스포티파이', en: 'Spotify', ja: 'Spotify' },
    url: 'https://www.spotify.com',
    logoUrl:
      'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
    categories: ['music'],
  },
  {
    slug: 'apple-music',
    names: { ko: 'Apple Music', en: 'Apple Music', ja: 'Apple Music' },
    url: 'https://music.apple.com',
    logoUrl: 'https://music.apple.com/assets/knowledge-graph/music.png',
    categories: ['music'],
  },
  {
    slug: 'youtube-music',
    names: { ko: '유튜브 뮤직', en: 'YouTube Music', ja: 'YouTube Music' },
    url: 'https://music.youtube.com',
    logoUrl: 'https://music.youtube.com/img/on_platform_logo_dark.svg',
    categories: ['music'],
  },
  {
    slug: 'melon',
    names: { ko: '멜론', en: 'Melon', ja: 'Melon' },
    url: 'https://www.melon.com',
    logoUrl:
      'https://cdnimg.melon.co.kr/resource/image/web/common/logo_melon142x99.png',
    categories: ['music'],
  },
  {
    slug: 'genie',
    names: { ko: '지니뮤직', en: 'Genie Music', ja: 'Genie Music' },
    url: 'https://www.genie.co.kr',
    logoUrl: 'https://www.genie.co.kr/favicon.ico',
    categories: ['music'],
  },
  {
    slug: 'bugs',
    names: { ko: '벅스', en: 'Bugs', ja: 'Bugs' },
    url: 'https://music.bugs.co.kr',
    logoUrl: 'https://file.bugsm.co.kr/bdesign/sns/1200x630_bugs.png',
    categories: ['music'],
  },
  {
    slug: 'flo',
    names: { ko: 'FLO', en: 'FLO', ja: 'FLO' },
    url: 'https://www.music-flo.com',
    logoUrl: 'https://www.music-flo.com/favicon.ico',
    categories: ['music'],
  },
  {
    slug: 'amazon-music',
    names: { ko: '아마존 뮤직', en: 'Amazon Music', ja: 'Amazon Music' },
    url: 'https://music.amazon.com',
    logoUrl:
      'https://m.media-amazon.com/images/G/01/music/logo/1.0/amazon_music_410x82px.svg',
    categories: ['music'],
  },

  // ========== Gaming ==========
  {
    slug: 'xbox-game-pass',
    names: { ko: 'Xbox Game Pass', en: 'Xbox Game Pass', ja: 'Xbox Game Pass' },
    url: 'https://www.xbox.com/gamepass',
    logoUrl:
      'https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png',
    categories: ['gaming'],
  },
  {
    slug: 'playstation-plus',
    names: {
      ko: 'PlayStation Plus',
      en: 'PlayStation Plus',
      ja: 'PlayStation Plus',
    },
    url: 'https://www.playstation.com/ps-plus',
    logoUrl:
      'https://gmedia.playstation.com/is/image/SIEPDC/ps-plus-black-badge-01-22sep20',
    categories: ['gaming'],
  },
  {
    slug: 'nintendo-switch-online',
    names: {
      ko: 'Nintendo Switch Online',
      en: 'Nintendo Switch Online',
      ja: 'Nintendo Switch Online',
    },
    url: 'https://www.nintendo.com/switch/online',
    logoUrl:
      'https://assets.nintendo.com/image/upload/f_auto/q_auto/c_fill,w_800/ncom/en_US/switch/online-service/posters/nso-logo',
    categories: ['gaming'],
  },
  {
    slug: 'ea-play',
    names: { ko: 'EA Play', en: 'EA Play', ja: 'EA Play' },
    url: 'https://www.ea.com/ea-play',
    logoUrl:
      'https://media.contentapi.ea.com/content/dam/eacom/subscription/ea-play/common/embed-code/color/ea-play-logo-coral-embed-code.svg',
    categories: ['gaming'],
  },
  {
    slug: 'geforce-now',
    names: { ko: '지포스 나우', en: 'GeForce NOW', ja: 'GeForce NOW' },
    url: 'https://www.nvidia.com/geforce-now',
    logoUrl:
      'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-now/gfn-ultimate-ecosystem-text-nv-gf-wmfg-2560-d.jpg',
    categories: ['gaming', 'cloud'],
  },

  // ========== Shopping / Membership ==========
  {
    slug: 'amazon-prime',
    names: { ko: '아마존 프라임', en: 'Amazon Prime', ja: 'Amazonプライム' },
    url: 'https://www.amazon.com/prime',
    logoUrl:
      'https://m.media-amazon.com/images/G/01/kfw/landing/2023/MEMBER/PrimeCard_Stacked_Logo_1x.png',
    categories: ['shopping'],
  },
  {
    slug: 'coupang-rocket-wow',
    names: {
      ko: '쿠팡 로켓와우',
      en: 'Coupang Rocket WOW',
      ja: 'Coupang Rocket WOW',
    },
    url: 'https://www.coupang.com/np/rocketwow',
    logoUrl:
      'https://image7.coupangcdn.com/image/coupang/favicon/v2/favicon.ico',
    categories: ['shopping'],
  },
  {
    slug: 'naver-plus',
    names: {
      ko: '네이버 플러스 멤버십',
      en: 'Naver Plus Membership',
      ja: 'Naver Plus Membership',
    },
    url: 'https://nid.naver.com/membership',
    logoUrl:
      'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    categories: ['shopping'],
  },
  {
    slug: 'ssg-universe',
    names: { ko: 'SSG 유니버스', en: 'SSG Universe', ja: 'SSG Universe' },
    url: 'https://www.ssg.com',
    logoUrl: 'https://sui.ssgcdn.com/ui/common/img/sns/ssg.png',
    categories: ['shopping'],
  },

  // ========== Productivity ==========
  {
    slug: 'microsoft-365',
    names: { ko: 'Microsoft 365', en: 'Microsoft 365', ja: 'Microsoft 365' },
    url: 'https://www.microsoft.com/microsoft-365',
    logoUrl:
      'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b',
    categories: ['productivity'],
  },
  {
    slug: 'google-one',
    names: { ko: 'Google One', en: 'Google One', ja: 'Google One' },
    url: 'https://one.google.com',
    logoUrl:
      'https://www.gstatic.com/images/branding/product/2x/google_one_512dp.png',
    categories: ['productivity', 'cloud'],
  },
  {
    slug: 'notion',
    names: { ko: '노션', en: 'Notion', ja: 'Notion' },
    url: 'https://www.notion.so',
    logoUrl: 'https://www.notion.so/images/favicon.ico',
    categories: ['productivity'],
  },
  {
    slug: 'dropbox',
    names: { ko: '드롭박스', en: 'Dropbox', ja: 'Dropbox' },
    url: 'https://www.dropbox.com',
    logoUrl:
      'https://cfl.dropboxstatic.com/static/metaserver/static/images/logo_catalog/dropbox_opengraph_image@2x-vflwsK445.png',
    categories: ['productivity', 'cloud'],
  },
  {
    slug: 'evernote',
    names: { ko: '에버노트', en: 'Evernote', ja: 'Evernote' },
    url: 'https://evernote.com',
    logoUrl:
      'https://images.prismic.io/evernote/aOTBRp5xUNkB1qqj_OG-HP.png?auto=format,compress',
    categories: ['productivity'],
  },
  {
    slug: 'adobe-creative-cloud',
    names: {
      ko: 'Adobe Creative Cloud',
      en: 'Adobe Creative Cloud',
      ja: 'Adobe Creative Cloud',
    },
    url: 'https://www.adobe.com/creativecloud',
    logoUrl:
      'https://www.adobe.com/cc-shared/assets/img/product-icons/svg/creative-cloud.svg',
    categories: ['productivity'],
  },
  {
    slug: 'figma',
    names: { ko: '피그마', en: 'Figma', ja: 'Figma' },
    url: 'https://www.figma.com',
    logoUrl:
      'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png',
    categories: ['productivity'],
  },
  {
    slug: 'canva',
    names: { ko: '캔바', en: 'Canva', ja: 'Canva' },
    url: 'https://www.canva.com',
    logoUrl: 'https://static.canva.com/static/images/canva-logo-1200x630.png',
    categories: ['productivity'],
  },
  {
    slug: 'slack',
    names: { ko: '슬랙', en: 'Slack', ja: 'Slack' },
    url: 'https://slack.com',
    logoUrl:
      'https://a.slack-edge.com/38f0e7c/marketing/img/nav/slack-salesforce-logo-nav-black.png',
    categories: ['productivity'],
  },
  {
    slug: 'zoom',
    names: { ko: '줌', en: 'Zoom', ja: 'Zoom' },
    url: 'https://zoom.us',
    logoUrl: 'https://st1.zoom.us/zoom.ico',
    categories: ['productivity'],
  },

  // ========== Cloud Storage ==========
  {
    slug: 'icloud-plus',
    names: { ko: 'iCloud+', en: 'iCloud+', ja: 'iCloud+' },
    url: 'https://www.icloud.com',
    logoUrl:
      'https://www.apple.com/v/icloud/b/images/overview/icloud_icon__lrfw0gouxxaa_large.png',
    categories: ['cloud'],
  },
  {
    slug: 'onedrive',
    names: { ko: 'OneDrive', en: 'OneDrive', ja: 'OneDrive' },
    url: 'https://onedrive.live.com',
    logoUrl: 'https://onedrive.live.com/favicon.ico',
    categories: ['cloud'],
  },

  // ========== News ==========
  {
    slug: 'nyt',
    names: {
      ko: '뉴욕타임스',
      en: 'The New York Times',
      ja: 'ニューヨーク・タイムズ',
    },
    url: 'https://www.nytimes.com',
    logoUrl:
      'https://www.nytimes.com/vi-assets/static-assets/apple-touch-icon-28865b72953380a40aa43318108876cb.png',
    categories: ['news'],
  },
  {
    slug: 'wsj',
    names: {
      ko: '월스트리트저널',
      en: 'The Wall Street Journal',
      ja: 'ウォール・ストリート・ジャーナル',
    },
    url: 'https://www.wsj.com',
    logoUrl: 'https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png',
    categories: ['news'],
  },
  {
    slug: 'nikkei',
    names: { ko: '니케이', en: 'Nikkei', ja: '日本経済新聞' },
    url: 'https://www.nikkei.com',
    logoUrl: 'https://www.nikkei.com/favicon.ico',
    categories: ['news'],
  },
  {
    slug: 'economist',
    names: { ko: '이코노미스트', en: 'The Economist', ja: 'エコノミスト' },
    url: 'https://www.economist.com',
    logoUrl: 'https://www.economist.com/engassets/google-search-logo.png',
    categories: ['news'],
  },

  // ========== Fitness ==========
  {
    slug: 'apple-fitness-plus',
    names: { ko: 'Apple Fitness+', en: 'Apple Fitness+', ja: 'Apple Fitness+' },
    url: 'https://www.apple.com/apple-fitness-plus',
    logoUrl:
      'https://www.apple.com/v/apple-fitness-plus/ac/images/meta/apple-fitness-plus__cidrqiun6tle_og.png',
    categories: ['fitness'],
  },
  {
    slug: 'peloton',
    names: { ko: '펠로톤', en: 'Peloton', ja: 'Peloton' },
    url: 'https://www.onepeloton.com',
    logoUrl: 'https://www.onepeloton.com/favicon.ico',
    categories: ['fitness'],
  },
  {
    slug: 'nike-training-club',
    names: {
      ko: '나이키 트레이닝 클럽',
      en: 'Nike Training Club',
      ja: 'Nike Training Club',
    },
    url: 'https://www.nike.com/ntc-app',
    logoUrl: 'https://www.nike.com/favicon.ico',
    categories: ['fitness'],
  },

  // ========== Education ==========
  {
    slug: 'coursera',
    names: { ko: '코세라', en: 'Coursera', ja: 'Coursera' },
    url: 'https://www.coursera.org',
    logoUrl:
      'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png',
    categories: ['education'],
  },
  {
    slug: 'udemy',
    names: { ko: '유데미', en: 'Udemy', ja: 'Udemy' },
    url: 'https://www.udemy.com',
    logoUrl: 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg',
    categories: ['education'],
  },
  {
    slug: 'skillshare',
    names: { ko: '스킬쉐어', en: 'Skillshare', ja: 'Skillshare' },
    url: 'https://www.skillshare.com',
    logoUrl: 'https://www.skillshare.com/favicon.ico',
    categories: ['education'],
  },
  {
    slug: 'masterclass',
    names: { ko: '마스터클래스', en: 'MasterClass', ja: 'MasterClass' },
    url: 'https://www.masterclass.com',
    logoUrl: 'https://www.masterclass.com/favicon.ico',
    categories: ['education'],
  },
  {
    slug: 'duolingo',
    names: { ko: '듀오링고', en: 'Duolingo', ja: 'Duolingo' },
    url: 'https://www.duolingo.com',
    logoUrl:
      'https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81f6c3239a5b2ac4ef05eb4ccb.svg',
    categories: ['education'],
  },
  {
    slug: 'linkedin-learning',
    names: {
      ko: '링크드인 러닝',
      en: 'LinkedIn Learning',
      ja: 'LinkedIn Learning',
    },
    url: 'https://www.linkedin.com/learning',
    logoUrl: 'https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca',
    categories: ['education'],
  },

  // ========== Finance ==========
  {
    slug: 'toss-prime',
    names: { ko: '토스 프라임', en: 'Toss Prime', ja: 'Toss Prime' },
    url: 'https://toss.im',
    logoUrl: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
    categories: ['finance'],
  },

  // ========== Food Delivery ==========
  {
    slug: 'baemin-club',
    names: { ko: '배민클럽', en: 'Baemin Club', ja: '配達の民族Club' },
    url: 'https://www.baemin.com',
    logoUrl:
      'https://www.baemin.com/_next/static/media/baemin-og_thumbnail.31be89ff.png',
    categories: ['food'],
  },
  {
    slug: 'yogiyo-super',
    names: {
      ko: '요기요 슈퍼클럽',
      en: 'Yogiyo Super Club',
      ja: 'Yogiyo Super Club',
    },
    url: 'https://www.yogiyo.co.kr',
    logoUrl: 'https://www.yogiyo.co.kr/favicon.ico',
    categories: ['food'],
  },

  // ========== AI / Tech ==========
  {
    slug: 'chatgpt-plus',
    names: { ko: 'ChatGPT Plus', en: 'ChatGPT Plus', ja: 'ChatGPT Plus' },
    url: 'https://chat.openai.com',
    logoUrl: 'https://cdn.oaistatic.com/assets/apple-touch-icon-mz9nytnj.webp',
    categories: ['productivity'],
  },
  {
    slug: 'claude-pro',
    names: { ko: 'Claude Pro', en: 'Claude Pro', ja: 'Claude Pro' },
    url: 'https://claude.ai',
    logoUrl: 'https://claude.ai/apple-touch-icon.png',
    categories: ['productivity'],
  },
  {
    slug: 'github-copilot',
    names: { ko: 'GitHub Copilot', en: 'GitHub Copilot', ja: 'GitHub Copilot' },
    url: 'https://github.com/features/copilot',
    logoUrl:
      'https://images.ctfassets.net/8aevphvgewt8/5IdZ8KizWhMOGixAmVSw0g/f81f5f263a88eabe5d3e102300d44a88/github-copilot-social-img.png',
    categories: ['productivity'],
  },
  {
    slug: 'midjourney',
    names: { ko: '미드저니', en: 'Midjourney', ja: 'Midjourney' },
    url: 'https://www.midjourney.com',
    logoUrl: 'https://www.midjourney.com/favicon.ico',
    categories: ['productivity'],
  },
];
