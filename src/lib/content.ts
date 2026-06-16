export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type CardLink = {
  title: string;
  text: string;
  href: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type SpeakerProfile = {
  image: string;
  imageAlt: string;
  name: string;
  role: string;
};

export type EventShowcaseItem = {
  dateLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  summary: string;
  timeLabel: string;
  title: string;
};

export type ImageCard = {
  title: string;
  text: string;
  href: string;
  image: string;
  imageAlt: string;
  actions?: Array<{ label: string; href: string }>;
  dark?: boolean;
};

export type AwardCategoryHighlight = {
  title: string;
  href: string;
  summary: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
};

export type PublicationFeature = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  span?: "narrow" | "medium" | "wide";
};

export type AwardArchiveFeatureYear = {
  year: string;
  sequence: string;
  href: string;
  items: Array<{
    title: string;
    subtitle: string;
    href: string;
    image: string;
    imageAlt: string;
  }>;
};

export type StandardFeature = {
  title: string;
  href: string;
  image: string;
  quote: string;
  reference: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Awards", href: "/awards/" },
  { label: "Winners", href: "/#winners" },
  { label: "Standards", href: "/standards/" },
  { label: "Resources", href: "/resources/" },
  { label: "Training", href: "/resources/" },
  { label: "Contact", href: "/contact-us/" },
];

export const heroStats = [
  { value: "9th", label: "Beacon Mosque Awards 2026" },
  { value: "10", label: "Awards categories" },
  { value: "5 star", label: "Accreditation pathway" },
];

export const awardCategoryHighlights = [
  {
    title: "Best Run Mosque",
    href: "/best-run-mosque-2026-nomination/",
    summary: "Recognising the mosque that demonstrates outstanding governance, service delivery and all-round organisational excellence.",
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque Awards audience gathered for the ceremony",
    imageFit: "cover",
  },
  {
    title: "Best Youth Service",
    href: "/best-youth-service-nominatioin-2026/",
    summary: "Celebrating mosques creating meaningful, sustained impact through youth programmes, mentoring and leadership pathways.",
    image: "/wp-content/uploads/2025/11/14.png",
    imageAlt: "Beacon Mosque Awards winner artwork for youth-focused recognition",
    imageFit: "contain",
  },
  {
    title: "Best Madrassah Service",
    href: "/best-madrassah-award-nomination-2026/",
    summary: "Highlighting excellence in teaching quality, safeguarding, curriculum delivery and family engagement in madrassah life.",
    image: "/wp-content/uploads/2025/11/6.png",
    imageAlt: "Beacon Mosque Awards winner artwork for madrassah service",
    imageFit: "contain",
  },
  {
    title: "Best Women's Service",
    href: "/best-womens-service-nomination-mosque-2026/",
    summary: "Honouring mosques that create strong, visible and well-supported services for women across the community.",
    image: "/wp-content/uploads/2025/11/12.png",
    imageAlt: "Beacon Mosque Awards winner artwork celebrating women's service",
    imageFit: "contain",
  },
  {
    title: "Most Impactful Imam",
    href: "/most-impactful-imam-nomination-2026/",
    summary: "Recognising an imam whose teaching, leadership and community care have made a lasting practical impact.",
    image: "/wp-content/uploads/2025/11/13.png",
    imageAlt: "Beacon Mosque Awards winner artwork for impactful imam recognition",
    imageFit: "contain",
  },
  {
    title: "Best Convert Support Service",
    href: "/best-convert-care-nomination-mosque-2026/",
    summary: "Celebrating mosques that provide thoughtful, sustained care and belonging for new Muslims and their families.",
    image: "/wp-content/uploads/2025/11/15.png",
    imageAlt: "Beacon Mosque Awards winner artwork for convert support service",
    imageFit: "contain",
  },
  {
    title: "Most Impactful Alimah",
    href: "/most-impactful-alimah-nomination-2026/",
    summary: "Honouring an alimah whose scholarship, mentoring and public service are strengthening faith and community life.",
    image: "/wp-content/uploads/2025/11/16.png",
    imageAlt: "Beacon Mosque Awards winner artwork for impactful alimah recognition",
    imageFit: "contain",
  },
  {
    title: "Best Outreach Services",
    href: "/best-outreach-service-nomination-2026/",
    summary: "Highlighting standout outreach programmes that connect mosques with neighbours, civic partners and wider society.",
    image: "/wp-content/uploads/2025/11/17.png",
    imageAlt: "Beacon Mosque Awards winner artwork for outreach services",
    imageFit: "contain",
  },
  {
    title: "Best Future Design",
    href: "/best-future-design-nomination-mosque-2026/",
    summary: "Showcasing visionary mosque design ideas that strengthen worship, learning, accessibility and community presence.",
    image: "/wp-content/uploads/2026/04/04.png",
    imageAlt: "9th Annual British Beacon Mosque Awards 2026 artwork",
    imageFit: "contain",
  },
  {
    title: "Best Mosque Volunteer",
    href: "/best-mosque-volunteer-nomination-2026/",
    summary: "Recognising a volunteer whose service, reliability and generosity have become essential to mosque life.",
    image: "/wp-content/uploads/2025/11/7.png",
    imageAlt: "Beacon Mosque Awards winner artwork for mosque volunteer recognition",
    imageFit: "contain",
  },
] satisfies AwardCategoryHighlight[];

export const publicationFeatures = [
  {
    title: "Beacon Mosque Awards 2025 Booklet",
    href: "https://faithassociates.co.uk/publications/8th-british-beacon-mosque-awards-2025-booklet/",
    image: "/wp-content/uploads/2026/04/04.png",
    imageAlt: "British Beacon Mosque Awards 2026 booklet artwork",
    span: "medium",
  },
  {
    title: "Beacon Mosque Awards 2024 Booklet",
    href: "https://faithassociates.co.uk/publications/7th-british-beacon-mosque-awards-2024-booklet/",
    image: "/wp-content/uploads/2025/11/17.png",
    imageAlt: "Beacon Mosque Awards 2024 booklet feature artwork",
    span: "medium",
  },
  {
    title: "Beacon Mosque Awards 2023 Booklet",
    href: "https://faithassociates.co.uk/publications/6th-british-beacon-mosque-awards-2023-booklet/",
    image: "/wp-content/uploads/2025/11/16.png",
    imageAlt: "Beacon Mosque Awards 2023 booklet feature artwork",
    span: "medium",
  },
  {
    title: "Beacon Mosque Awards 2022 Booklet",
    href: "https://faithassociates.co.uk/publications/5th-british-beacon-mosque-awards-2022-booklet/",
    image: "/wp-content/uploads/2025/11/15.png",
    imageAlt: "Beacon Mosque Awards 2022 booklet feature artwork",
    span: "medium",
  },
  {
    title: "Beacon Mosque Awards 2021 Booklet",
    href: "https://faithassociates.co.uk/publications/4th-british-beacon-mosque-awards-2021-booklet/",
    image: "/wp-content/uploads/2025/11/14.png",
    imageAlt: "Beacon Mosque Awards 2021 booklet feature artwork",
    span: "medium",
  },
  {
    title: "Beacon Mosque Awards 2020 Booklet",
    href: "https://faithassociates.co.uk/publications/3rd-british-beacon-mosque-awards-2020-booklet/",
    image: "/wp-content/uploads/2025/11/13.png",
    imageAlt: "Beacon Mosque Awards 2020 booklet feature artwork",
    span: "medium",
  },
  {
    title: "Women in Mosque Management Guide",
    href: "/mosque-resources/women-in-mosque-management-guide/",
    image: "/assets/interior/about-hero.jpg",
    imageAlt: "Mosque interior architectural detail",
    span: "wide",
  },
  {
    title: "Mosque Open Day Guide",
    href: "/mosque-resources/mosque-open-day-guide/",
    image: "/assets/interior/golden-mosque.jpg",
    imageAlt: "Golden mosque dome and sky",
    span: "medium",
  },
  {
    title: "Mosque Management Guide",
    href: "/mosque-resources/mosque-management-guide/",
    image: "/assets/interior/standards-wide.jpg",
    imageAlt: "Beacon Mosque standards publication visual",
    span: "wide",
  },
  {
    title: "Beacon Mosques 30 Year Vision 2020-2050",
    href: "/mosque-resources/beacon-mosques-30-year-vision-2020-2050/",
    image: "/assets/interior/cambridge-mosque.jpg",
    imageAlt: "Cambridge mosque exterior for long term vision resource",
    span: "medium",
  },
] satisfies PublicationFeature[];

export const awardArchiveFeatureYears = [
  {
    year: "2025",
    sequence: "8th",
    href: "/awards/beacon-mosque-awards-2025/",
    items: [
      {
        title: "Best Run Mosque",
        subtitle: "2025 category",
        href: "/beacon-mosque-award-2025-voting/",
        image: "/wp-content/uploads/2025/11/6.png",
        imageAlt: "Beacon Mosque Awards 2025 category artwork",
      },
      {
        title: "Best Youth Service",
        subtitle: "2025 category",
        href: "/beacon-mosque-award-2025-youth-voting/",
        image: "/wp-content/uploads/2025/11/14.png",
        imageAlt: "Beacon Mosque Awards youth service artwork",
      },
      {
        title: "Best Future Design",
        subtitle: "2025 category",
        href: "/beacon-mosque-award-2025-voting-future-design/",
        image: "/wp-content/uploads/2026/04/04.png",
        imageAlt: "Beacon Mosque Awards future design artwork",
      },
      {
        title: "Most Impactful Imam",
        subtitle: "2025 category",
        href: "/beacon-mosque-award-2025-imam/",
        image: "/wp-content/uploads/2025/11/13.png",
        imageAlt: "Beacon Mosque Awards imam category artwork",
      },
    ],
  },
  {
    year: "2024",
    sequence: "7th",
    href: "/awards/awards2024/",
    items: [
      {
        title: "Best Run Mosque",
        subtitle: "2024 archive",
        href: "/best-run-mosque-2024/",
        image: "/wp-content/uploads/2025/11/8.png",
        imageAlt: "2024 archive image for Best Run Mosque",
      },
      {
        title: "Best Youth Service",
        subtitle: "2024 archive",
        href: "/best-youth-service-2024/",
        image: "/wp-content/uploads/2025/11/9.png",
        imageAlt: "2024 archive image for Best Youth Service",
      },
      {
        title: "Best Women's Service",
        subtitle: "2024 archive",
        href: "/best-womens-service-2024/",
        image: "/wp-content/uploads/2025/11/12.png",
        imageAlt: "2024 archive image for Best Women's Service",
      },
      {
        title: "Best Future Design",
        subtitle: "2024 archive",
        href: "/best-future-design-award-2024/",
        image: "/wp-content/uploads/2025/11/10.png",
        imageAlt: "2024 archive image for Best Future Design",
      },
    ],
  },
  {
    year: "2023",
    sequence: "6th",
    href: "/awards/awards2023/",
    items: [
      {
        title: "Best Run Mosque",
        subtitle: "2023 category",
        href: "/best-run-mosque-2023/",
        image: "/assets/interior/awards-gala.jpg",
        imageAlt: "Awards gala archive image",
      },
      {
        title: "Best Youth Service",
        subtitle: "2023 category",
        href: "/best-youth-service-2023/",
        image: "/assets/interior/cambridge-mosque.jpg",
        imageAlt: "Cambridge mosque archive image",
      },
      {
        title: "Best Outreach Services",
        subtitle: "2023 category",
        href: "/best-outreach-service-2023/",
        image: "/assets/interior/standards-wide.jpg",
        imageAlt: "Mosque congregation archive image",
      },
      {
        title: "Best Future Design",
        subtitle: "2023 category",
        href: "/best-future-design-award-2023/",
        image: "/assets/interior/golden-mosque.jpg",
        imageAlt: "Golden mosque archive image",
      },
    ],
  },
  {
    year: "2022",
    sequence: "5th",
    href: "/awards/british-beacon-mosque-awards-2022/",
    items: [
      {
        title: "Best Run Mosque",
        subtitle: "2022 category",
        href: "/best-run-mosque-2022/",
        image: "/wp-content/uploads/2025/11/11.png",
        imageAlt: "2022 archive image for Best Run Mosque",
      },
      {
        title: "Best Youth Service",
        subtitle: "2022 category",
        href: "/best-youth-service-2022/",
        image: "/wp-content/uploads/2025/11/15.png",
        imageAlt: "2022 archive image for Best Youth Service",
      },
      {
        title: "Best Future Design",
        subtitle: "2022 category",
        href: "/best-future-design-award-2022/",
        image: "/wp-content/uploads/2025/11/16.png",
        imageAlt: "2022 archive image for Best Future Design",
      },
      {
        title: "Best Mosque Volunteer",
        subtitle: "2022 category",
        href: "/best-mosque-volunteer-2022/",
        image: "/wp-content/uploads/2025/11/7.png",
        imageAlt: "2022 archive image for Best Mosque Volunteer",
      },
    ],
  },
  {
    year: "2021",
    sequence: "4th",
    href: "/british-beacon-mosque-awards-2021/",
    items: [
      {
        title: "Best Run Mosque",
        subtitle: "2021 category",
        href: "/best-run-mosque-2021/",
        image: "/assets/awards/bbma-2025.jpg",
        imageAlt: "Awards ceremony visual for 2021 archive",
      },
      {
        title: "Best Youth Service",
        subtitle: "2021 category",
        href: "/best-youth-service-2021/",
        image: "/assets/interior/awards-gala.jpg",
        imageAlt: "Audience at awards gala",
      },
      {
        title: "Best Women's Service",
        subtitle: "2021 category",
        href: "/best-womens-service-2021/",
        image: "/assets/interior/about-hero.jpg",
        imageAlt: "Mosque interior detail for 2021 archive",
      },
      {
        title: "Best Future Design",
        subtitle: "2021 category",
        href: "/best-future-design-2021-vote/",
        image: "/assets/interior/cambridge-mosque.jpg",
        imageAlt: "Mosque architecture for future design archive",
      },
    ],
  },
  {
    year: "2020",
    sequence: "3rd",
    href: "/2020-british-beacon-mosque-awards/",
    items: [
      {
        title: "Best Run Mosque",
        subtitle: "2020 category",
        href: "/best-run-mosque/",
        image: "/assets/interior/standards-wide.jpg",
        imageAlt: "2020 archive crowd image",
      },
      {
        title: "Best Youth Service",
        subtitle: "2020 category",
        href: "/best-youth-service-vote-now/",
        image: "/assets/interior/golden-mosque.jpg",
        imageAlt: "2020 archive youth category visual",
      },
      {
        title: "COVID-19 Response",
        subtitle: "2020 category",
        href: "/best-mosque-covid-19-response/",
        image: "/assets/interior/about-hero.jpg",
        imageAlt: "2020 archive covid response visual",
      },
      {
        title: "Most Innovative Service",
        subtitle: "2020 category",
        href: "/most-innovative-service-vote-now/",
        image: "/assets/interior/cambridge-mosque.jpg",
        imageAlt: "2020 archive innovation visual",
      },
    ],
  },
  {
    year: "2019",
    sequence: "2nd",
    href: "/awards/2019-british-beacon-mosque-awards/",
    items: [
      {
        title: "Cambridge winner opening",
        subtitle: "2019 winner story",
        href: "/blog/turkey-president-tayyip-erdogan-attends-opening-of-2019-beacon-mosque-winner-in-cambridge/",
        image: "/assets/interior/cambridge-mosque.jpg",
        imageAlt: "Cambridge mosque visual for 2019 awards story",
      },
      {
        title: "Mosque Expo 2019",
        subtitle: "2019 programme story",
        href: "/blog/1000-registered-to-attend-mosque-expo-2nd-beacon-mosque-awards-2019/",
        image: "/wp-content/uploads/2025/12/Original.png",
        imageAlt: "Mosque Expo visual for 2019 programme story",
      },
      {
        title: "Rumi Mosque journey",
        subtitle: "Beacon mosque story",
        href: "/news/mevlana-rumi-mosques-journey-to-becoming-a-beacon-mosque/",
        image: "/assets/accredited/rumi-logo.png",
        imageAlt: "Rumi Mosque visual for Beacon Mosque story",
      },
      {
        title: "Plaques of excellence",
        subtitle: "Historic recognition",
        href: "/uncategorized/first-mosques-in-the-uk-awarded-beacon-mosque-awarded-plaques-of-excellence/",
        image: "/assets/interior/awards-gala.jpg",
        imageAlt: "Historic awards recognition visual",
      },
    ],
  },
] satisfies AwardArchiveFeatureYear[];

export const featureCards: ImageCard[] = [
  {
    title: "9th Annual Beacon Mosque Awards 2026",
    text: "Explore the 2026 Beacon Mosque Awards programme and nomination pathway celebrating excellence among Mosques, Madrassahs, Imams, Alimahs and volunteers across 10 categories.",
    href: "/awards/beacon-mosque-awards-2026/",
    image: "/wp-content/uploads/2026/04/04.png",
    imageAlt: "British Beacon Mosque Awards 2026 artwork",
    actions: [
      { label: "Awards 2026", href: "/awards/beacon-mosque-awards-2026/" },
      { label: "Submit nomination", href: "/awards/beacon-mosque-awards-2026/" },
    ],
  },
  {
    title: "Mosque & Madrassah Expo",
    text: "A connected national platform for mosque leaders, suppliers, educators and community partners.",
    href: "https://mosqueexpo.com/",
    image: "/wp-content/uploads/2025/12/Original.png",
    imageAlt: "Mosque and Madrassah Expo identity",
    actions: [{ label: "Visit Mosque Expo", href: "https://mosqueexpo.com/" }],
    dark: true,
  },
];

export const serviceCards: CardLink[] = [
  {
    meta: "01",
    title: "Accreditation",
    text: "A practical route for mosques to assess quality standards and evidence excellent practice.",
    href: "/accreditation-process/",
  },
  {
    meta: "02",
    title: "Advice & Guidance",
    text: "Guidance and resources to help leadership teams strengthen governance and service delivery.",
    href: "/resources/",
  },
  {
    meta: "03",
    title: "Training",
    text: "Learning support for trustees, managers, imams, staff and volunteers.",
    href: "/resources/",
  },
  {
    meta: "04",
    title: "News",
    text: "Stories from award winners, accredited mosques and national community initiatives.",
    href: "/category/news/",
  },
];

export const standards = [
  {
    title: "Community Development",
    href: "/standards/community-development/",
    image: "/assets/standards/community.png",
    quote:
      "Certainly a mosque founded on piety from the very first day is more deserving that you should stand in it: in it are men who love that they should be purified.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Accountability & Transparency",
    href: "/standards/accountability-and-transparency/",
    image: "/assets/standards/accountability.png",
    quote:
      "God wants to make [all this] clear unto you, and to guide you onto the [righteous] ways of life of those who preceded you, and to turn unto you in His mercy: for God is all-knowing, wise.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Additional Services",
    href: "/standards/additional-services/",
    image: "/assets/standards/additional.png",
    quote:
      "He governs all that exists, from the celestial space to the earth; and in the end all shall ascend unto Him [for judgment] on a Day the length whereof will be [like] a thousand years of your reckoning",
    reference: "(Quran chapter 32: verse 5)",
  },
  {
    title: "Madrassah",
    href: "/standards/madrassah/",
    image: "/assets/standards/madrassah.png",
    quote:
      "He governs all that exists, from the celestial space to the earth; and in the end all shall ascend unto Him [for judgment] on a Day the length whereof will be [like] a thousand years of your reckoning",
    reference: "(Quran chapter 32: verse 5)",
  },
  {
    title: "Communication",
    href: "/standards/communication/",
    image: "/assets/standards/communication.png",
    quote:
      "True piety does not consist in turning your faces towards the east or the west - but truly pious is he who believes in God, and the Last Day; and the angels, and revelation, and the prophets; and spends his substance",
    reference: "(Quran chapter 2: verse 177)",
  },
  {
    title: "Management & Governance",
    href: "/standards/management-governance/",
    image: "/assets/standards/management.png",
    quote:
      "Certainly a mosque founded on piety from the very first day is more deserving that you should stand in it: in it are men who love that they should be purified.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Policies & Procedures",
    href: "/standards/policies-procedures/",
    image: "/assets/standards/policies.png",
    quote:
      "God wants to make [all this] clear unto you, and to guide you onto the [righteous] ways of life of those who preceded you, and to turn unto you in His mercy: for God is all-knowing, wise.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Facilities Management",
    href: "/standards/facilities-management/",
    image: "/assets/standards/facilities.png",
    quote:
      "He governs all that exists, from the celestial space to the earth; and in the end all shall ascend unto Him [for judgment] on a Day the length whereof will be [like] a thousand years of your reckoning",
    reference: "(Quran chapter 32: verse 5)",
  },
  {
    title: "Staffing & Employment",
    href: "/standards/staffing-employment/",
    image: "/assets/standards/staffing.png",
    quote:
      "Certainly a mosque founded on piety from the very first day is more deserving that you should stand in it: in it are men who love that they should be purified.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Financing & Fundraising",
    href: "/standards/financing-fundraising/",
    image: "/assets/standards/financing.png",
    quote:
      "True piety does not consist in turning your faces towards the east or the west - but truly pious is he who believes in God, and the Last Day; and the angels, and revelation, and the prophets; and spends his substance",
    reference: "(Quran chapter 2: verse 177)",
  },
] satisfies StandardFeature[];

export const newsCards: CardLink[] = [
  {
    meta: "Community sport",
    title: "Burhan Centre Madrassah Triumphs in the EMAN Cup 2024 at Lords",
    text: "A national inter-madrassah cricket tournament concluded with young champions at Lord's.",
    href: "/burhan-centre-madrassah-triumphs-in-the-eman-cup-2024-at-lords/",
    image: "/wp-content/uploads/2016/11/gallery-9.jpg",
    imageAlt: "Young madrassah cricketers celebrating at Lord's",
  },
  {
    meta: "Youth service",
    title: "Fattah Cup Inter-Madrassah Football Tournament Delivered",
    text: "Faith Associates delivered a London football tournament uniting 13 institutions and 30 teams.",
    href: "/fattah-cup-inter-madrassah-football-tournament/",
    image: "/wp-content/uploads/2016/11/gallery-10.jpg",
    imageAlt: "Inter-madrassah football tournament action",
  },
  {
    meta: "Award winner",
    title: "Birmingham Mosque Wins Beacon Best Future Design Award",
    text: "Al-Abbas Islamic Centre was recognised nationally for its future building plans.",
    href: "/news/birmingham-mosque-wins-beacon-best-future-design-award/",
    image: "/wp-content/uploads/2016/11/gallery-11.jpg",
    imageAlt: "Beacon Mosque award winners on stage",
  },
  {
    meta: "Recognition",
    title: "British Beacon Mosque Awards 2021 Finalists named in the Queen's Honours List",
    text: "A recognition story connecting Beacon Mosque Awards finalists with national honours.",
    href: "/british-beacon-mosque-awards-2021-finalists-named-in-the-queens-honours-list/",
    image: "/wp-content/uploads/2016/11/gallery-12.jpg",
    imageAlt: "Beacon Mosque Awards ceremony moment",
  },
];

export const ceremonyGallery: GalleryItem[] = [
  {
    src: "/wp-content/uploads/2025/12/02-700x441.jpg",
    alt: "Audience members seated during a Beacon Mosque event",
    caption: "Audience and discussion",
  },
  {
    src: "/wp-content/uploads/2025/12/19-1024x576.jpg",
    alt: "Large stage and auditorium lighting at an awards event",
    caption: "Main stage atmosphere",
  },
  {
    src: "/wp-content/uploads/2025/12/26-1024x576.jpg",
    alt: "Close-up event portrait with dramatic lighting",
    caption: "Event portraits",
  },
  {
    src: "/wp-content/uploads/2025/12/27-700x441.jpg",
    alt: "Award ceremony ticket held under bright lights",
    caption: "Arrival moments",
  },
  {
    src: "/assets/interior/awards-gala.jpg",
    alt: "Beacon Mosque Awards gala with a lit stage and audience seating",
    caption: "Ceremony hall",
  },
  {
    src: "/wp-content/uploads/2025/12/05-768x432.jpg",
    alt: "Speaker addressing attendees at a public event",
    caption: "Community voices",
  },
];

export type WinnerCard = {
  src: string;
  alt: string;
};

export type WinnerShowcaseItem = {
  title: string;
  href: string;
  label: string;
  summary: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
};

export const featuredSpeakers = [
  {
    image: "/wp-content/uploads/2025/12/26-1024x576.jpg",
    imageAlt: "Beacon Mosque featured speaker at the awards ceremony",
    name: "Awards Presenter",
    role: "Speaker",
  },
  {
    image: "/wp-content/uploads/2025/12/03-460x295.jpg",
    imageAlt: "Beacon Mosque featured guest speaking on stage",
    name: "Community Voice",
    role: "Speaker",
  },
  {
    image: "/wp-content/uploads/2025/12/27-700x441.jpg",
    imageAlt: "Beacon Mosque featured speaker holding an award",
    name: "Standards Advocate",
    role: "Speaker",
  },
  {
    image: "/wp-content/uploads/2025/12/17.jpg",
    imageAlt: "Beacon Mosque featured panel and award recipients",
    name: "Leadership Panel",
    role: "Speaker",
  },
] satisfies SpeakerProfile[];

export const eventShowcaseItems = [
  {
    timeLabel: "18:00 - 22:45",
    dateLabel: "24 - 28 May",
    title: "Beacon Awards evening",
    summary:
      "An evening programme celebrating mosque excellence, national recognition and the stories behind standout service across the Beacon Mosque network.",
    href: "/awards/beacon-mosque-awards-2026/",
    image: "/wp-content/uploads/2025/12/26-1024x576.jpg",
    imageAlt: "Beacon Mosque event feature image",
  },
  {
    timeLabel: "18:00 - 22:45",
    dateLabel: "24 - 28 June",
    title: "Standards and leadership forum",
    summary:
      "A focused session on governance, practical standards and the systems mosque leadership teams need to strengthen trust and delivery.",
    href: "/standards/",
    image: "/wp-content/uploads/2025/12/19-1024x576.jpg",
    imageAlt: "Beacon Mosque standards and leadership forum",
  },
  {
    timeLabel: "18:00 - 22:45",
    dateLabel: "24 - 28 July",
    title: "Accreditation pathway briefing",
    summary:
      "A guided walkthrough of the accreditation journey, with evidence frameworks, examples of strong practice and progression milestones.",
    href: "/accreditation-process/",
    image: "/wp-content/uploads/2025/12/17.jpg",
    imageAlt: "Beacon Mosque accreditation pathway event",
  },
  {
    timeLabel: "18:00 - 22:45",
    dateLabel: "24 - 28 August",
    title: "Community impact showcase",
    summary:
      "A closing showcase featuring outreach, madrassah excellence and community projects that demonstrate measurable Beacon Mosque impact.",
    href: "/resources/",
    image: "/wp-content/uploads/2025/12/27-700x441.jpg",
    imageAlt: "Beacon Mosque community impact showcase event",
  },
] satisfies EventShowcaseItem[];

export const awardWinners2025: WinnerCard[] = [
  { src: "/wp-content/uploads/2025/11/6.png", alt: "Best Mosque Madrassah - Taqwa Institute, Oldham" },
  { src: "/wp-content/uploads/2025/11/7.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
  { src: "/wp-content/uploads/2025/11/8.png", alt: "Best Mosque Madrassah - Taqwa Institute, Oldham" },
  { src: "/wp-content/uploads/2025/11/9.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
  { src: "/wp-content/uploads/2025/11/10.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
  { src: "/wp-content/uploads/2025/11/11.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
  { src: "/wp-content/uploads/2025/11/12.png", alt: "Best Mosque Outreach Service - Wirral Deen Centre, Birkenhead" },
  { src: "/wp-content/uploads/2025/11/13.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
  { src: "/wp-content/uploads/2025/11/14.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
  { src: "/wp-content/uploads/2025/11/15.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
  { src: "/wp-content/uploads/2025/11/16.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
  { src: "/wp-content/uploads/2025/11/17.png", alt: "8th British Beacon Mosque Awards 2025 winner" },
];

export const winnerShowcaseItems: WinnerShowcaseItem[] = [
  {
    title: "Amazing services",
    label: "Amazing services",
    href: "/awards/beacon-mosque-awards-2025/",
    eyebrow: "2025 winners",
    summary: "Recognising mosque teams delivering practical, visible and deeply valued services for their communities.",
    image: "/wp-content/uploads/2025/11/10.png",
    imageAlt: "Beacon Mosque Awards 2025 winner for community service recognition",
  },
  {
    title: "Excellent governance",
    label: "Excellent governance",
    href: "/awards/beacon-mosque-awards-2025/",
    eyebrow: "2025 winners",
    summary: "Celebrating strong leadership, accountability and the governance standards that help mosques operate with trust.",
    image: "/wp-content/uploads/2025/11/11.png",
    imageAlt: "Beacon Mosque Awards 2025 winner for governance excellence",
  },
  {
    title: "Community outreach",
    label: "Community outreach",
    href: "/awards/beacon-mosque-awards-2025/",
    eyebrow: "2025 winners",
    summary: "Explore recognised mosques, madrassahs, imams, alimahs and volunteers from the 8th British Beacon Mosque Awards.",
    image: "/wp-content/uploads/2025/11/12.png",
    imageAlt: "Best Mosque Outreach Service - Wirral Deen Centre, Birkenhead",
  },
  {
    title: "Youth programmes",
    label: "Youth programmes",
    href: "/awards/beacon-mosque-awards-2025/",
    eyebrow: "2025 winners",
    summary: "Highlighting youth-focused programmes that build confidence, belonging, learning and future leadership pathways.",
    image: "/wp-content/uploads/2025/11/14.png",
    imageAlt: "Beacon Mosque Awards 2025 winner for youth programme recognition",
  },
  {
    title: "Volunteer impact",
    label: "Volunteer impact",
    href: "/awards/beacon-mosque-awards-2025/",
    eyebrow: "2025 winners",
    summary: "Honouring volunteers whose commitment, consistency and service help mosque life function at its best.",
    image: "/wp-content/uploads/2025/11/15.png",
    imageAlt: "Beacon Mosque Awards 2025 winner for volunteer impact recognition",
  },
];

export const accreditedMosques = [
  {
    title: "Melvani Rumi Mosque",
    text: "Melvani Rumi Mosque has been awarded the four star Beacon Mosque accreditation and is now recognised as a Beacon Mosque.",
    href: "/rumi-mosque-four-star-accredited-mosque/",
    image: "/assets/accredited/rumi-logo.png",
    imageAlt: "Rumi Mosque logo",
  },
  {
    title: "Al Manaar",
    text: "Al Manaar Islamic Centre has been awarded the five star Beacon Mosque accreditation and is now recognised as a Beacon Mosque.",
    href: "/al-manaar-mosque-five-star-accredited/",
    image: "/assets/accredited/al-manaar.jpg",
    imageAlt: "Al Manaar Beacon Mosque winners",
  },
  {
    title: "Al Madina Mosque",
    text: "Al Madina Mosque has been awarded the five star Beacon Mosque accreditation and is now recognised as a Beacon Mosque.",
    href: "/al-madina-mosque-barking-five-star-accredited/",
    image: "/assets/accredited/al-madina.jpg",
    imageAlt: "Al Madina Mosque Beacon Mosque winners",
  },
];
