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

export type ImageCard = {
  title: string;
  text: string;
  href: string;
  image: string;
  imageAlt: string;
  actions?: Array<{ label: string; href: string }>;
  dark?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us/",
    children: [
      { label: "Contact Us", href: "/contact-us/" },
      { label: "Privacy Policy", href: "/privacy-policy/" },
    ],
  },
  { label: "Awards", href: "/awards/" },
  { label: "Standards", href: "/standards/" },
  {
    label: "Accreditation",
    href: "/accreditation-process/",
    children: [
      { label: "Accreditation Process", href: "/accreditation-process/" },
      { label: "Accredited Beacon Mosques", href: "/beacon-mosques/" },
      { label: "Rate Your Mosque", href: "/ratings/" },
    ],
  },
  { label: "Resilience Hubs", href: "/mosques-as-resilience-hubs/" },
  { label: "Resources", href: "/resources/" },
  { label: "News", href: "/category/news/" },
];

export const heroStats = [
  { value: "9th", label: "Beacon Mosque Awards 2026" },
  { value: "10", label: "Awards categories" },
  { value: "5 star", label: "Accreditation pathway" },
];

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
  { title: "Community Development", href: "/standards/community-development/", image: "/assets/standards/community.png" },
  { title: "Accountability & Transparency", href: "/standards/accountability-and-transparency/", image: "/assets/standards/accountability.png" },
  { title: "Additional Services", href: "/standards/additional-services/", image: "/assets/standards/additional.png" },
  { title: "Madrassah", href: "/standards/madrassah/", image: "/assets/standards/madrassah.png" },
  { title: "Communication", href: "/standards/communication/", image: "/assets/standards/communication.png" },
  { title: "Management & Governance", href: "/standards/management-governance/", image: "/assets/standards/management.png" },
  { title: "Policies & Procedures", href: "/standards/policies-procedures/", image: "/assets/standards/policies.png" },
  { title: "Facilities Management", href: "/standards/facilities-management/", image: "/assets/standards/facilities.png" },
  { title: "Staffing & Employment", href: "/standards/staffing-employment/", image: "/assets/standards/staffing.png" },
  { title: "Financing & Fundraising", href: "/standards/financing-fundraising/", image: "/assets/standards/financing.png" },
];

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
    src: "/wp-content/uploads/2025/11/12.png",
    alt: "Best Mosque Outreach Service - Wirral Deen Centre, Birkenhead",
    caption: "Best outreach service 2025",
  },
  {
    src: "/assets/interior/cambridge-mosque.jpg",
    alt: "Cambridge Central Mosque exterior",
    caption: "Excellence in mosque design",
  },
  {
    src: "/assets/interior/golden-mosque.jpg",
    alt: "Golden mosque interior with intricate Islamic architecture",
    caption: "Heritage and craftsmanship",
  },
  {
    src: "/wp-content/uploads/2025/11/6.png",
    alt: "Best Mosque Madrassah - Taqwa Institute, Oldham",
    caption: "Best madrassah 2025",
  },
  {
    src: "/assets/interior/standards-wide.jpg",
    alt: "Mosque congregation",
    caption: "Communities at the heart",
  },
  {
    src: "/assets/interior/awards-gala.jpg",
    alt: "Beacon Mosque Awards gala ceremony",
    caption: "The annual awards gala",
  },
];

export type WinnerCard = {
  src: string;
  alt: string;
};

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
