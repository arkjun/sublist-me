import type { LocalizedNames, ServiceCategory } from '../schema'

export interface ServiceProviderSeed {
  slug: string
  names: LocalizedNames
  url: string
  logoUrl?: string
  categories: ServiceCategory[]
}

export const serviceProviderSeeds: ServiceProviderSeed[] = [
  // ========== OTT / Streaming ==========
  {
    slug: 'netflix',
    names: { ko: '넷플릭스', en: 'Netflix', ja: 'ネットフリックス' },
    url: 'https://www.netflix.com',
    categories: ['ott'],
  },
  {
    slug: 'youtube-premium',
    names: { ko: '유튜브 프리미엄', en: 'YouTube Premium', ja: 'YouTube Premium' },
    url: 'https://www.youtube.com/premium',
    categories: ['ott', 'music'],
  },
  {
    slug: 'disney-plus',
    names: { ko: '디즈니+', en: 'Disney+', ja: 'Disney+' },
    url: 'https://www.disneyplus.com',
    categories: ['ott'],
  },
  {
    slug: 'amazon-prime-video',
    names: { ko: '아마존 프라임 비디오', en: 'Amazon Prime Video', ja: 'Amazonプライム・ビデオ' },
    url: 'https://www.primevideo.com',
    categories: ['ott'],
  },
  {
    slug: 'apple-tv-plus',
    names: { ko: 'Apple TV+', en: 'Apple TV+', ja: 'Apple TV+' },
    url: 'https://tv.apple.com',
    categories: ['ott'],
  },
  {
    slug: 'hbo-max',
    names: { ko: 'Max', en: 'Max', ja: 'Max' },
    url: 'https://www.max.com',
    categories: ['ott'],
  },
  {
    slug: 'wavve',
    names: { ko: '웨이브', en: 'Wavve', ja: 'Wavve' },
    url: 'https://www.wavve.com',
    categories: ['ott'],
  },
  {
    slug: 'tving',
    names: { ko: '티빙', en: 'Tving', ja: 'Tving' },
    url: 'https://www.tving.com',
    categories: ['ott'],
  },
  {
    slug: 'watcha',
    names: { ko: '왓챠', en: 'Watcha', ja: 'WATCHA' },
    url: 'https://watcha.com',
    categories: ['ott'],
  },
  {
    slug: 'coupang-play',
    names: { ko: '쿠팡플레이', en: 'Coupang Play', ja: 'Coupang Play' },
    url: 'https://www.coupangplay.com',
    categories: ['ott'],
  },

  // ========== Music ==========
  {
    slug: 'spotify',
    names: { ko: '스포티파이', en: 'Spotify', ja: 'Spotify' },
    url: 'https://www.spotify.com',
    categories: ['music'],
  },
  {
    slug: 'apple-music',
    names: { ko: 'Apple Music', en: 'Apple Music', ja: 'Apple Music' },
    url: 'https://music.apple.com',
    categories: ['music'],
  },
  {
    slug: 'youtube-music',
    names: { ko: '유튜브 뮤직', en: 'YouTube Music', ja: 'YouTube Music' },
    url: 'https://music.youtube.com',
    categories: ['music'],
  },
  {
    slug: 'melon',
    names: { ko: '멜론', en: 'Melon', ja: 'Melon' },
    url: 'https://www.melon.com',
    categories: ['music'],
  },
  {
    slug: 'genie',
    names: { ko: '지니뮤직', en: 'Genie Music', ja: 'Genie Music' },
    url: 'https://www.genie.co.kr',
    categories: ['music'],
  },
  {
    slug: 'bugs',
    names: { ko: '벅스', en: 'Bugs', ja: 'Bugs' },
    url: 'https://music.bugs.co.kr',
    categories: ['music'],
  },
  {
    slug: 'flo',
    names: { ko: 'FLO', en: 'FLO', ja: 'FLO' },
    url: 'https://www.music-flo.com',
    categories: ['music'],
  },
  {
    slug: 'amazon-music',
    names: { ko: '아마존 뮤직', en: 'Amazon Music', ja: 'Amazon Music' },
    url: 'https://music.amazon.com',
    categories: ['music'],
  },

  // ========== Gaming ==========
  {
    slug: 'xbox-game-pass',
    names: { ko: 'Xbox Game Pass', en: 'Xbox Game Pass', ja: 'Xbox Game Pass' },
    url: 'https://www.xbox.com/gamepass',
    categories: ['gaming'],
  },
  {
    slug: 'playstation-plus',
    names: { ko: 'PlayStation Plus', en: 'PlayStation Plus', ja: 'PlayStation Plus' },
    url: 'https://www.playstation.com/ps-plus',
    categories: ['gaming'],
  },
  {
    slug: 'nintendo-switch-online',
    names: { ko: 'Nintendo Switch Online', en: 'Nintendo Switch Online', ja: 'Nintendo Switch Online' },
    url: 'https://www.nintendo.com/switch/online',
    categories: ['gaming'],
  },
  {
    slug: 'ea-play',
    names: { ko: 'EA Play', en: 'EA Play', ja: 'EA Play' },
    url: 'https://www.ea.com/ea-play',
    categories: ['gaming'],
  },
  {
    slug: 'geforce-now',
    names: { ko: '지포스 나우', en: 'GeForce NOW', ja: 'GeForce NOW' },
    url: 'https://www.nvidia.com/geforce-now',
    categories: ['gaming', 'cloud'],
  },

  // ========== Shopping / Membership ==========
  {
    slug: 'amazon-prime',
    names: { ko: '아마존 프라임', en: 'Amazon Prime', ja: 'Amazonプライム' },
    url: 'https://www.amazon.com/prime',
    categories: ['shopping'],
  },
  {
    slug: 'coupang-rocket-wow',
    names: { ko: '쿠팡 로켓와우', en: 'Coupang Rocket WOW', ja: 'Coupang Rocket WOW' },
    url: 'https://www.coupang.com/np/rocketwow',
    categories: ['shopping'],
  },
  {
    slug: 'naver-plus',
    names: { ko: '네이버 플러스 멤버십', en: 'Naver Plus Membership', ja: 'Naver Plus Membership' },
    url: 'https://nid.naver.com/membership',
    categories: ['shopping'],
  },
  {
    slug: 'ssg-universe',
    names: { ko: 'SSG 유니버스', en: 'SSG Universe', ja: 'SSG Universe' },
    url: 'https://www.ssg.com',
    categories: ['shopping'],
  },

  // ========== Productivity ==========
  {
    slug: 'microsoft-365',
    names: { ko: 'Microsoft 365', en: 'Microsoft 365', ja: 'Microsoft 365' },
    url: 'https://www.microsoft.com/microsoft-365',
    categories: ['productivity'],
  },
  {
    slug: 'google-one',
    names: { ko: 'Google One', en: 'Google One', ja: 'Google One' },
    url: 'https://one.google.com',
    categories: ['productivity', 'cloud'],
  },
  {
    slug: 'notion',
    names: { ko: '노션', en: 'Notion', ja: 'Notion' },
    url: 'https://www.notion.so',
    categories: ['productivity'],
  },
  {
    slug: 'dropbox',
    names: { ko: '드롭박스', en: 'Dropbox', ja: 'Dropbox' },
    url: 'https://www.dropbox.com',
    categories: ['productivity', 'cloud'],
  },
  {
    slug: 'evernote',
    names: { ko: '에버노트', en: 'Evernote', ja: 'Evernote' },
    url: 'https://evernote.com',
    categories: ['productivity'],
  },
  {
    slug: 'adobe-creative-cloud',
    names: { ko: 'Adobe Creative Cloud', en: 'Adobe Creative Cloud', ja: 'Adobe Creative Cloud' },
    url: 'https://www.adobe.com/creativecloud',
    categories: ['productivity'],
  },
  {
    slug: 'figma',
    names: { ko: '피그마', en: 'Figma', ja: 'Figma' },
    url: 'https://www.figma.com',
    categories: ['productivity'],
  },
  {
    slug: 'canva',
    names: { ko: '캔바', en: 'Canva', ja: 'Canva' },
    url: 'https://www.canva.com',
    categories: ['productivity'],
  },
  {
    slug: 'slack',
    names: { ko: '슬랙', en: 'Slack', ja: 'Slack' },
    url: 'https://slack.com',
    categories: ['productivity'],
  },
  {
    slug: 'zoom',
    names: { ko: '줌', en: 'Zoom', ja: 'Zoom' },
    url: 'https://zoom.us',
    categories: ['productivity'],
  },

  // ========== Cloud Storage ==========
  {
    slug: 'icloud-plus',
    names: { ko: 'iCloud+', en: 'iCloud+', ja: 'iCloud+' },
    url: 'https://www.icloud.com',
    categories: ['cloud'],
  },
  {
    slug: 'onedrive',
    names: { ko: 'OneDrive', en: 'OneDrive', ja: 'OneDrive' },
    url: 'https://onedrive.live.com',
    categories: ['cloud'],
  },

  // ========== News ==========
  {
    slug: 'nyt',
    names: { ko: '뉴욕타임스', en: 'The New York Times', ja: 'ニューヨーク・タイムズ' },
    url: 'https://www.nytimes.com',
    categories: ['news'],
  },
  {
    slug: 'wsj',
    names: { ko: '월스트리트저널', en: 'The Wall Street Journal', ja: 'ウォール・ストリート・ジャーナル' },
    url: 'https://www.wsj.com',
    categories: ['news'],
  },
  {
    slug: 'nikkei',
    names: { ko: '니케이', en: 'Nikkei', ja: '日本経済新聞' },
    url: 'https://www.nikkei.com',
    categories: ['news'],
  },
  {
    slug: 'economist',
    names: { ko: '이코노미스트', en: 'The Economist', ja: 'エコノミスト' },
    url: 'https://www.economist.com',
    categories: ['news'],
  },

  // ========== Fitness ==========
  {
    slug: 'apple-fitness-plus',
    names: { ko: 'Apple Fitness+', en: 'Apple Fitness+', ja: 'Apple Fitness+' },
    url: 'https://www.apple.com/apple-fitness-plus',
    categories: ['fitness'],
  },
  {
    slug: 'peloton',
    names: { ko: '펠로톤', en: 'Peloton', ja: 'Peloton' },
    url: 'https://www.onepeloton.com',
    categories: ['fitness'],
  },
  {
    slug: 'nike-training-club',
    names: { ko: '나이키 트레이닝 클럽', en: 'Nike Training Club', ja: 'Nike Training Club' },
    url: 'https://www.nike.com/ntc-app',
    categories: ['fitness'],
  },

  // ========== Education ==========
  {
    slug: 'coursera',
    names: { ko: '코세라', en: 'Coursera', ja: 'Coursera' },
    url: 'https://www.coursera.org',
    categories: ['education'],
  },
  {
    slug: 'udemy',
    names: { ko: '유데미', en: 'Udemy', ja: 'Udemy' },
    url: 'https://www.udemy.com',
    categories: ['education'],
  },
  {
    slug: 'skillshare',
    names: { ko: '스킬쉐어', en: 'Skillshare', ja: 'Skillshare' },
    url: 'https://www.skillshare.com',
    categories: ['education'],
  },
  {
    slug: 'masterclass',
    names: { ko: '마스터클래스', en: 'MasterClass', ja: 'MasterClass' },
    url: 'https://www.masterclass.com',
    categories: ['education'],
  },
  {
    slug: 'duolingo',
    names: { ko: '듀오링고', en: 'Duolingo', ja: 'Duolingo' },
    url: 'https://www.duolingo.com',
    categories: ['education'],
  },
  {
    slug: 'linkedin-learning',
    names: { ko: '링크드인 러닝', en: 'LinkedIn Learning', ja: 'LinkedIn Learning' },
    url: 'https://www.linkedin.com/learning',
    categories: ['education'],
  },

  // ========== Finance ==========
  {
    slug: 'toss-prime',
    names: { ko: '토스 프라임', en: 'Toss Prime', ja: 'Toss Prime' },
    url: 'https://toss.im',
    categories: ['finance'],
  },

  // ========== Food Delivery ==========
  {
    slug: 'baemin-club',
    names: { ko: '배민클럽', en: 'Baemin Club', ja: '配達の民族Club' },
    url: 'https://www.baemin.com',
    categories: ['food'],
  },
  {
    slug: 'yogiyo-super',
    names: { ko: '요기요 슈퍼클럽', en: 'Yogiyo Super Club', ja: 'Yogiyo Super Club' },
    url: 'https://www.yogiyo.co.kr',
    categories: ['food'],
  },

  // ========== AI / Tech ==========
  {
    slug: 'chatgpt-plus',
    names: { ko: 'ChatGPT Plus', en: 'ChatGPT Plus', ja: 'ChatGPT Plus' },
    url: 'https://chat.openai.com',
    categories: ['productivity'],
  },
  {
    slug: 'claude-pro',
    names: { ko: 'Claude Pro', en: 'Claude Pro', ja: 'Claude Pro' },
    url: 'https://claude.ai',
    categories: ['productivity'],
  },
  {
    slug: 'github-copilot',
    names: { ko: 'GitHub Copilot', en: 'GitHub Copilot', ja: 'GitHub Copilot' },
    url: 'https://github.com/features/copilot',
    categories: ['productivity'],
  },
  {
    slug: 'midjourney',
    names: { ko: '미드저니', en: 'Midjourney', ja: 'Midjourney' },
    url: 'https://www.midjourney.com',
    categories: ['productivity'],
  },
]
