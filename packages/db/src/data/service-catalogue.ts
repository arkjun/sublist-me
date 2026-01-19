import type { LocalizedNames, ServiceCategory } from '../schema';

// 서비스 카탈로그 아이템 타입
export interface ServiceCatalogueItem {
  slug: string;
  names: LocalizedNames;
  url: string;
  logoUrl?: string;
  category: ServiceCategory;
}

// 카테고리 정보 타입
export interface CategoryInfo {
  id: ServiceCategory;
  names: LocalizedNames;
  icon: string; // lucide-react 아이콘 이름
  order: number;
}

// 카테고리 정보
export const CATEGORY_INFO: CategoryInfo[] = [
  {
    id: 'ott',
    names: {
      ko: 'OTT / 스트리밍',
      en: 'OTT / Streaming',
      ja: 'OTT / ストリーミング',
    },
    icon: 'Tv',
    order: 1,
  },
  {
    id: 'music',
    names: { ko: '음악', en: 'Music', ja: '音楽' },
    icon: 'Music',
    order: 2,
  },
  {
    id: 'gaming',
    names: { ko: '게이밍', en: 'Gaming', ja: 'ゲーミング' },
    icon: 'Gamepad2',
    order: 3,
  },
  {
    id: 'shopping',
    names: {
      ko: '쇼핑 / 멤버십',
      en: 'Shopping / Membership',
      ja: 'ショッピング / 会員',
    },
    icon: 'ShoppingBag',
    order: 4,
  },
  {
    id: 'productivity',
    names: { ko: '생산성', en: 'Productivity', ja: '生産性' },
    icon: 'Briefcase',
    order: 5,
  },
  {
    id: 'cloud',
    names: {
      ko: '클라우드 스토리지',
      en: 'Cloud Storage',
      ja: 'クラウドストレージ',
    },
    icon: 'Cloud',
    order: 6,
  },
  {
    id: 'news',
    names: { ko: '뉴스', en: 'News', ja: 'ニュース' },
    icon: 'Newspaper',
    order: 7,
  },
  {
    id: 'fitness',
    names: { ko: '피트니스', en: 'Fitness', ja: 'フィットネス' },
    icon: 'Dumbbell',
    order: 8,
  },
  {
    id: 'education',
    names: { ko: '교육', en: 'Education', ja: '教育' },
    icon: 'GraduationCap',
    order: 9,
  },
  {
    id: 'finance',
    names: { ko: '금융', en: 'Finance', ja: '金融' },
    icon: 'Wallet',
    order: 10,
  },
  {
    id: 'food',
    names: { ko: '음식 배달', en: 'Food Delivery', ja: 'フードデリバリー' },
    icon: 'UtensilsCrossed',
    order: 11,
  },
  {
    id: 'security',
    names: { ko: '보안', en: 'Security', ja: 'セキュリティ' },
    icon: 'Shield',
    order: 12,
  },
  {
    id: 'other',
    names: { ko: '기타', en: 'Other', ja: 'その他' },
    icon: 'MoreHorizontal',
    order: 13,
  },
];

// 서비스 카탈로그
export const SERVICE_CATALOGUE: ServiceCatalogueItem[] = [
  // ========== OTT / Streaming ==========
  {
    slug: 'netflix',
    names: { ko: '넷플릭스', en: 'Netflix', ja: 'ネットフリックス' },
    url: 'https://www.netflix.com',
    logoUrl:
      'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
    category: 'ott',
  },
  {
    slug: 'youtube-premium',
    names: {
      ko: '유튜브 프리미엄',
      en: 'YouTube Premium',
      ja: 'YouTube Premium',
    },
    url: 'https://www.youtube.com/premium',
    logoUrl: 'https://cdn.simpleicons.org/youtube',
    category: 'ott',
  },
  {
    slug: 'disney-plus',
    names: { ko: '디즈니+', en: 'Disney+', ja: 'Disney+' },
    url: 'https://www.disneyplus.com',
    logoUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAZlBMVEX////z9vfd5ujX4eTQ3N8bbHwATWIAUGQAXW9kkZyyx8wAWmyjvcO8ztKKqrLv8/Tj6+0AUmZGgI2ct74AV2pNhZFlkp0ARl17oanH1tkAVWiXs7qBpa0wdIIAWGsOaHgAYXKov8XDi+0wAAAAs0lEQVR4Ac3ORQKEMBAEwMYhPgnu/P+R64bdty6RUfwpzw98D4fCKL5J0owdJHBxr5UqSpIs3DXVeDKKkzU45XJyOFI82lgqsaerZ8eaMuz4SYNntO12QcZ71jyKh3a9VZPROKXUUiSBJq/xox6UdNwFrI6SAEijVRCAbBkAU/nAPK/mde+gDIBwXO+7WN20Cx501AZYCaYhdY+LGmnBlpo5zSkR2QA7pupYpzqpccTHn7sCJ04JJcbrCv4AAAAASUVORK5CYII=',
    category: 'ott',
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
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAilBMVEUFeP8AdP8Ad/9fov8Aev8gf/8rhf+01/82if8Adv9wq//N4//f7f+Gtv+oyf+w0v91sP/S5v/l8f+81//q9f+Fs/9ppf/X6f8Acv/B1v+Cuf/K3f+Iu/98sf++2f9Bj/9jnf+TwP+yzf9zqP9Rmf+jzP8Ab/8Aaf+cxP9Tnf/G3P9Mlf////8Abf8vOGooAAABHElEQVR4AcWPVXbEMAwAJVOjOA2Dl8IM9z9eGbyv/d8xewwSPBpk8B+MvVcu3seP1R0SBagnh0mUhBLIes7V3rOvn4IwipM0ywstf++aLFHpKRPR+cIjfvGuhYu/8lZW8cl9k2V9qd9kU5ElvSJrO1He2vrUn3Idqd9n8TaQEYreY33DSCIrESlx7Mtx6uZxNMyMCLYMYF58tSatszbmduFoSSiWuI/a2ff11Qu9PhXs1xo/aTd9yd3A84eznnZpSVz2vC9unm7nUjtRuRLYbEJW1DuK1RXK2n4VmDMSI0BiDEl018q+iTxRx5sCYGREOLcGLIybJrnC40CnS2Z/Qbizyk/3D3RnNoR7yECV39xeIgLBHxihMcjgsbwCDZYVxYRdCUMAAAAASUVORK5CYII=',
    category: 'ott',
  },
  {
    slug: 'apple-tv-plus',
    names: { ko: 'Apple TV+', en: 'Apple TV+', ja: 'Apple TV+' },
    url: 'https://tv.apple.com',
    logoUrl: 'https://tv.apple.com/assets/knowledge-graph/tv.png',
    category: 'ott',
  },
  {
    slug: 'wavve',
    names: { ko: '웨이브', en: 'Wavve', ja: 'Wavve' },
    url: 'https://www.wavve.com',
    logoUrl: 'https://www.wavve.com/favicon.ico',
    category: 'ott',
  },
  {
    slug: 'tving',
    names: { ko: '티빙', en: 'Tving', ja: 'Tving' },
    url: 'https://www.tving.com',
    logoUrl: 'https://www.tving.com/img/tving-favicon-160@3x.png',
    category: 'ott',
  },
  {
    slug: 'watcha',
    names: { ko: '왓챠', en: 'Watcha', ja: 'WATCHA' },
    url: 'https://watcha.com',
    logoUrl: 'https://watcha.com/favicon.ico',
    category: 'ott',
  },
  {
    slug: 'coupang-play',
    names: { ko: '쿠팡플레이', en: 'Coupang Play', ja: 'Coupang Play' },
    url: 'https://www.coupangplay.com',
    logoUrl: 'https://assets.coupangplay.com/favicon.ico',
    category: 'ott',
  },

  // ========== Music ==========
  {
    slug: 'spotify',
    names: { ko: '스포티파이', en: 'Spotify', ja: 'Spotify' },
    url: 'https://www.spotify.com',
    logoUrl:
      'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
    category: 'music',
  },
  {
    slug: 'apple-music',
    names: { ko: 'Apple Music', en: 'Apple Music', ja: 'Apple Music' },
    url: 'https://music.apple.com',
    logoUrl: 'https://music.apple.com/assets/knowledge-graph/music.png',
    category: 'music',
  },
  {
    slug: 'youtube-music',
    names: { ko: '유튜브 뮤직', en: 'YouTube Music', ja: 'YouTube Music' },
    url: 'https://music.youtube.com',
    logoUrl: 'https://cdn.simpleicons.org/youtubemusic',
    category: 'music',
  },
  {
    slug: 'melon',
    names: { ko: '멜론', en: 'Melon', ja: 'Melon' },
    url: 'https://www.melon.com',
    logoUrl:
      'https://cdnimg.melon.co.kr/resource/image/web/common/logo_melon142x99.png',
    category: 'music',
  },
  {
    slug: 'genie',
    names: { ko: '지니뮤직', en: 'Genie Music', ja: 'Genie Music' },
    url: 'https://www.genie.co.kr',
    logoUrl: 'https://www.genie.co.kr/resources/favicon_32.ico',
    category: 'music',
  },
  {
    slug: 'bugs',
    names: { ko: '벅스', en: 'Bugs', ja: 'Bugs' },
    url: 'https://music.bugs.co.kr',
    logoUrl: 'https://file.bugsm.co.kr/wbugs/common/faviconBugs.ico',
    category: 'music',
  },
  {
    slug: 'flo',
    names: { ko: 'FLO', en: 'FLO', ja: 'FLO' },
    url: 'https://www.music-flo.com',
    logoUrl: 'https://www.music-flo.com/favicon.ico',
    category: 'music',
  },
  {
    slug: 'amazon-music',
    names: { ko: '아마존 뮤직', en: 'Amazon Music', ja: 'Amazon Music' },
    url: 'https://music.amazon.com',
    logoUrl:
      'https://m.media-amazon.com/images/G/01/music/logo/1.0/smile_256x256.png',
    category: 'music',
  },

  // ========== Gaming ==========
  {
    slug: 'xbox-game-pass',
    names: { ko: 'Xbox Game Pass', en: 'Xbox Game Pass', ja: 'Xbox Game Pass' },
    url: 'https://www.xbox.com/gamepass',
    logoUrl:
      'https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png',
    category: 'gaming',
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
    category: 'gaming',
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
    category: 'gaming',
  },
  {
    slug: 'ea-play',
    names: { ko: 'EA Play', en: 'EA Play', ja: 'EA Play' },
    url: 'https://www.ea.com/ea-play',
    logoUrl:
      'https://media.contentapi.ea.com/content/dam/eacom/subscription/ea-play/common/embed-code/color/ea-play-logo-coral-embed-code.svg',
    category: 'gaming',
  },
  {
    slug: 'geforce-now',
    names: { ko: '지포스 나우', en: 'GeForce NOW', ja: 'GeForce NOW' },
    url: 'https://www.nvidia.com/geforce-now',
    logoUrl: 'https://gfn.co.kr/favicon.ico',
    category: 'gaming',
  },
  {
    slug: 'google-play-pass',
    names: {
      ko: '구글 플레이 패스',
      en: 'Google Play Pass',
      ja: 'Google Play Pass',
    },
    url: 'https://play.google.com/store/pass',
    logoUrl: 'https://cdn.simpleicons.org/googleplay',
    category: 'gaming',
  },

  // ========== Shopping / Membership ==========
  {
    slug: 'amazon-prime',
    names: { ko: '아마존 프라임', en: 'Amazon Prime', ja: 'Amazonプライム' },
    url: 'https://www.amazon.com/prime',
    logoUrl: 'https://m.media-amazon.com/images/I/51IiESUZAaL.png',
    category: 'shopping',
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
    category: 'shopping',
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
    category: 'shopping',
  },
  {
    slug: 'ssg-universe',
    names: { ko: 'SSG 유니버스', en: 'SSG Universe', ja: 'SSG Universe' },
    url: 'https://www.ssg.com',
    logoUrl: 'https://sui.ssgcdn.com/ui/common/img/sns/ssg.png',
    category: 'shopping',
  },

  // ========== Productivity ==========
  {
    slug: 'microsoft-365',
    names: { ko: 'Microsoft 365', en: 'Microsoft 365', ja: 'Microsoft 365' },
    url: 'https://www.microsoft.com/microsoft-365',
    logoUrl:
      'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b',
    category: 'productivity',
  },
  {
    slug: 'google-one',
    names: { ko: 'Google One', en: 'Google One', ja: 'Google One' },
    url: 'https://one.google.com',
    logoUrl: 'https://one.google.com/about/public/favicon-32x32.png',
    category: 'cloud',
  },
  {
    slug: 'notion',
    names: { ko: '노션', en: 'Notion', ja: 'Notion' },
    url: 'https://www.notion.so',
    logoUrl: 'https://www.notion.so/images/favicon.ico',
    category: 'productivity',
  },
  {
    slug: 'dropbox',
    names: { ko: '드롭박스', en: 'Dropbox', ja: 'Dropbox' },
    url: 'https://www.dropbox.com',
    logoUrl:
      'https://cfl.dropboxstatic.com/static/metaserver/static/images/logo_catalog/dropbox_opengraph_image@2x-vflwsK445.png',
    category: 'cloud',
  },
  {
    slug: 'evernote',
    names: { ko: '에버노트', en: 'Evernote', ja: 'Evernote' },
    url: 'https://evernote.com',
    logoUrl:
      'https://images.prismic.io/evernote/aOTBRp5xUNkB1qqj_OG-HP.png?auto=format,compress',
    category: 'productivity',
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
    category: 'productivity',
  },
  {
    slug: 'figma',
    names: { ko: '피그마', en: 'Figma', ja: 'Figma' },
    url: 'https://www.figma.com',
    logoUrl:
      'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png',
    category: 'productivity',
  },
  {
    slug: 'canva',
    names: { ko: '캔바', en: 'Canva', ja: 'Canva' },
    url: 'https://www.canva.com',
    logoUrl:
      'https://static.canva.com/domain-assets/canva/static/images/favicon-1.ico',
    category: 'productivity',
  },
  {
    slug: 'slack',
    names: { ko: '슬랙', en: 'Slack', ja: 'Slack' },
    url: 'https://slack.com',
    logoUrl:
      'https://a.slack-edge.com/38f0e7c/marketing/img/nav/slack-salesforce-logo-nav-black.png',
    category: 'productivity',
  },
  {
    slug: 'zoom',
    names: { ko: '줌', en: 'Zoom', ja: 'Zoom' },
    url: 'https://zoom.us',
    logoUrl: 'https://st1.zoom.us/zoom.ico',
    category: 'productivity',
  },
  {
    slug: 'chatgpt',
    names: { ko: 'ChatGPT Plus', en: 'ChatGPT Plus', ja: 'ChatGPT Plus' },
    url: 'https://chat.openai.com',
    logoUrl: 'https://cdn.oaistatic.com/assets/apple-touch-icon-mz9nytnj.webp',
    category: 'productivity',
  },
  {
    slug: 'claude',
    names: { ko: 'Claude', en: 'Claude', ja: 'Claude' },
    url: 'https://claude.ai',
    logoUrl: 'https://cdn.simpleicons.org/claude',
    category: 'productivity',
  },
  {
    slug: 'github-copilot',
    names: { ko: 'GitHub Copilot', en: 'GitHub Copilot', ja: 'GitHub Copilot' },
    url: 'https://github.com/features/copilot',
    logoUrl: 'https://github.githubassets.com/favicons/favicon.svg',
    category: 'productivity',
  },
  {
    slug: 'ticktick',
    names: { ko: 'TickTick', en: 'TickTick', ja: 'TickTick' },
    url: 'https://ticktick.com',
    logoUrl: 'https://cdn.simpleicons.org/ticktick',
    category: 'productivity',
  },

  // ========== Cloud Storage ==========
  {
    slug: 'icloud-plus',
    names: { ko: 'iCloud+', en: 'iCloud+', ja: 'iCloud+' },
    url: 'https://www.icloud.com',
    logoUrl:
      'https://www.icloud.com/system/icloud.com/2546Build54/favicons/default-favicon-light-180x180.png',
    category: 'cloud',
  },
  {
    slug: 'onedrive',
    names: { ko: 'OneDrive', en: 'OneDrive', ja: 'OneDrive' },
    url: 'https://onedrive.live.com',
    logoUrl: 'https://onedrive.live.com/favicon.ico',
    category: 'cloud',
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
    category: 'news',
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
    category: 'news',
  },
  {
    slug: 'nikkei',
    names: { ko: '니케이', en: 'Nikkei', ja: '日本経済新聞' },
    url: 'https://www.nikkei.com',
    logoUrl: 'https://www.nikkei.com/favicon.ico',
    category: 'news',
  },
  {
    slug: 'economist',
    names: { ko: '이코노미스트', en: 'The Economist', ja: 'エコノミスト' },
    url: 'https://www.economist.com',
    logoUrl: 'https://www.economist.com/engassets/google-search-logo.png',
    category: 'news',
  },

  // ========== Fitness ==========
  {
    slug: 'apple-fitness-plus',
    names: { ko: 'Apple Fitness+', en: 'Apple Fitness+', ja: 'Apple Fitness+' },
    url: 'https://www.apple.com/apple-fitness-plus',
    logoUrl:
      'https://www.apple.com/v/apple-fitness-plus/ac/images/meta/apple-fitness-plus__cidrqiun6tle_og.png',
    category: 'fitness',
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
    category: 'fitness',
  },

  // ========== Education ==========
  {
    slug: 'coursera',
    names: { ko: '코세라', en: 'Coursera', ja: 'Coursera' },
    url: 'https://www.coursera.org',
    logoUrl:
      'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png',
    category: 'education',
  },
  {
    slug: 'udemy',
    names: { ko: '유데미', en: 'Udemy', ja: 'Udemy' },
    url: 'https://www.udemy.com',
    logoUrl: 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg',
    category: 'education',
  },
  {
    slug: 'skillshare',
    names: { ko: '스킬쉐어', en: 'Skillshare', ja: 'Skillshare' },
    url: 'https://www.skillshare.com',
    logoUrl: 'https://www.skillshare.com/favicon.ico',
    category: 'education',
  },
  {
    slug: 'masterclass',
    names: { ko: '마스터클래스', en: 'MasterClass', ja: 'MasterClass' },
    url: 'https://www.masterclass.com',
    logoUrl: 'https://www.masterclass.com/favicon.ico',
    category: 'education',
  },
  {
    slug: 'duolingo',
    names: { ko: '듀오링고', en: 'Duolingo', ja: 'Duolingo' },
    url: 'https://www.duolingo.com',
    logoUrl:
      'https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81f6c3239a5b2ac4ef05eb4ccb.svg',
    category: 'education',
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
    category: 'education',
  },

  // ========== Finance ==========
  {
    slug: 'toss-prime',
    names: { ko: '토스 프라임', en: 'Toss Prime', ja: 'Toss Prime' },
    url: 'https://toss.im',
    logoUrl: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
    category: 'finance',
  },

  // ========== Food Delivery ==========
  {
    slug: 'baemin-club',
    names: { ko: '배민클럽', en: 'Baemin Club', ja: '配達の民族Club' },
    url: 'https://www.baemin.com',
    logoUrl:
      'https://www.baemin.com/_next/static/media/baemin-og_thumbnail.31be89ff.png',
    category: 'food',
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
    category: 'food',
  },

  // ========== Security ==========
  {
    slug: '1password',
    names: { ko: '1Password', en: '1Password', ja: '1Password' },
    url: 'https://1password.com',
    logoUrl: 'https://cdn.simpleicons.org/1password',
    category: 'security',
  },
  {
    slug: 'nordvpn',
    names: { ko: 'NordVPN', en: 'NordVPN', ja: 'NordVPN' },
    url: 'https://nordvpn.com',
    logoUrl: 'https://cdn.simpleicons.org/nordvpn',
    category: 'security',
  },
];

// 유틸리티 함수: slug로 서비스 찾기
const SERVICE_BY_SLUG = new Map(SERVICE_CATALOGUE.map((s) => [s.slug, s]));

export function getServiceBySlug(
  slug: string,
): ServiceCatalogueItem | undefined {
  return SERVICE_BY_SLUG.get(slug);
}

// 유틸리티 함수: 카테고리별 서비스 목록
export function getServicesByCategory(
  category: ServiceCategory,
): ServiceCatalogueItem[] {
  return SERVICE_CATALOGUE.filter((s) => s.category === category);
}

// 유틸리티 함수: 모든 카테고리 (정렬됨)
export function getAllCategories(): CategoryInfo[] {
  return [...CATEGORY_INFO].sort((a, b) => a.order - b.order);
}

// 유틸리티 함수: 서비스가 있는 카테고리만 반환
export function getCategoriesWithServices(): CategoryInfo[] {
  const categoriesWithServices = new Set(
    SERVICE_CATALOGUE.map((s) => s.category),
  );
  return getAllCategories().filter((c) => categoriesWithServices.has(c.id));
}

// 유틸리티 함수: logoUrl로 서비스 slug 찾기
const SERVICE_BY_LOGO_URL = new Map(
  SERVICE_CATALOGUE.filter((s) => s.logoUrl).map((s) => [s.logoUrl, s.slug]),
);

export function getSlugByLogoUrl(logoUrl: string): string | undefined {
  return SERVICE_BY_LOGO_URL.get(logoUrl);
}
