import {
  accreditedMosques,
  awardCategoryNominationDetails,
  awardWinners2024,
  getAwardWinnerRecord2024ByCategory,
  getAwardWinnerRecord2024ByHref,
  awardWinners2025,
  type AwardCategoryPreviousWinner,
  getAwardWinnerRecord2025ByCategory,
  getAwardWinnerRecord2025ByHref,
  getAwardCategoryMedia,
  newsCards,
  nominationForm2026Href,
  standards,
  type CardLink,
} from "@/lib/content";
import { legacyRouteItems, type LegacyRouteItem } from "@/lib/legacy-routes";
import {
  getWordPressFallbackPage,
  getWordPressPublicSlugs,
} from "@/lib/wordpress-source";

export type PageForm = "contact" | "rating" | "nomination";

export type PageSection =
  | { kind: "text"; title?: string; paragraphs: string[] }
  | { kind: "cards"; title?: string; cards: CardLink[] }
  | {
      kind: "awardHistory";
      title: string;
      items: AwardCategoryPreviousWinner[];
    }
  | { kind: "media"; title?: string; text?: string; items: MediaItem[] }
  | { kind: "wordpress"; html: string; sourceUrl?: string }
  | { kind: "gallery"; title?: string; images: GalleryImage[] }
  | { kind: "audio"; title: string; text?: string; items: AudioResource[] }
  | { kind: "standards" }
  | { kind: "accredited" }
  | {
      kind: "criteria";
      title: string;
      groups: Array<{ title: string; items: string[] }>;
    }
  | {
      kind: "form";
      form: PageForm;
      title: string;
      text: string;
      defaultCategory?: string;
    };

export type AudioResource = {
  title: string;
  subtitle: string;
  src: string;
};

export type MediaItem = {
  type: "image" | "video" | "embed" | "link";
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
  srcSet?: string;
  sizes?: string;
  sources?: string[];
  trustedEmbed?: boolean;
};

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
};

export type InteriorPage = {
  slug: string;
  title: string;
  eyebrow?: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  heroVideo?: string;
  heroVideoPoster?: string;
  ctas?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }>;
  sections: PageSection[];
};

const awardCategoryNominations = awardCategoryNominationDetails.map(
  ({ title, href }) => ({
    title,
    href,
  }),
);

const awardCategories = awardCategoryNominations.map(
  (category) => category.title,
);

const awardCategoryCards: CardLink[] = awardCategoryNominations.map(
  (category) => ({
    ...(getAwardCategoryMedia(category.title) ?? {}),
    title: category.title,
    text:
      awardCategoryNominationDetails.find((item) => item.title === category.title)
        ?.summary ??
      "Recognising outstanding community service, leadership and measurable excellence.",
    href: category.href,
    meta: "Nominate",
  }),
);

const awardRecognitionProfiles2025Raw = [
  {
    title: "Morden Islamic Centre (Charity no. 1112379) - Best Run Mosque 2025",
    href: "/morden-islamic-centre-best-run-mosque-2025/",
    category: "Best Run Mosque",
    status: "Finalist",
    summary:
      "Recognised in the 2025 Beacon Mosque Awards for excellent mosque leadership, service delivery and community contribution.",
  },
  {
    title: "Bobber Mill Community Centre - Best Run Mosque 2025",
    href: "/bobber-mill-community-centre-best-run-mosque-2025/",
    category: "Best Run Mosque",
    status: "Finalist",
    summary:
      "Recognised in the 2025 awards for strong mosque service and community-centred work.",
  },
  {
    title: "Cheadle Masjid - Best Run Mosque Finalist 2025",
    href: "/cheadle-masjid-shortlisted-mosque-best-run-mosque2025/",
    category: "Best Run Mosque",
    status: "Finalist",
    summary: "A 2025 finalist profile in the Best Run Mosque category.",
  },
  {
    title: "Masjid Ash-Shifa - Best Run Mosque 2025 Shortlisted Mosques",
    href: "/best-run-mosque-2025-shortlisted-masjid-ash-shifa/",
    category: "Best Run Mosque",
    status: "Shortlisted",
    summary: "A shortlisted mosque profile for the 2025 Best Run Mosque award.",
  },
  {
    title: "Lozells Central Mosque - Best Run Mosque 2025 Shortlisted Mosques",
    href: "/modern-islamic-centre-mosque-2025-shortlisted-mosques-lozells-central-mosque/",
    category: "Best Run Mosque",
    status: "Shortlisted",
    summary: "A shortlisted mosque profile for the 2025 Best Run Mosque award.",
  },
  {
    title:
      "Bilal Masjid Trust - Shortlisted for Best Youth Services Mosque 2025",
    href: "/best-youth-services-2025-shortlisted-mosques-bilal-masjid-trust/",
    category: "Best Youth Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile for youth service excellence in the 2025 awards.",
  },
  {
    title:
      "Lantern Academy / Goldon Mosque - Shortlisted for Best Youth Services Mosque 2025",
    href: "/lantern-academy-shortlisted-for-best-youth-services-mosque-2025/",
    category: "Best Youth Service",
    status: "Shortlisted",
    summary:
      "A shortlisted youth services profile from the 2025 Beacon Mosque Awards.",
  },
  {
    title:
      "Lozells Central Mosque - Shortlisted for Best Youth Services Mosque 2025",
    href: "/lozells-central-mosque-shortlisted-for-best-youth-services-mosque-2025/",
    category: "Best Youth Service",
    status: "Shortlisted",
    summary:
      "A shortlisted youth services profile from the 2025 Beacon Mosque Awards.",
  },
  {
    title:
      "Al-Abbas Islamic Centre - Shortlisted for Best Madrassah Services 2025",
    href: "/al-abbas-islamic-centre-mosque-shortlisted-for-best-madrassah-services-2025/",
    category: "Best Madrassah Service",
    status: "Shortlisted",
    summary: "A shortlisted madrassah services profile from the 2025 awards.",
  },
  {
    title:
      "Taqwa Institute - Shortlisted for Best Madrassah Services Mosque 2025",
    href: "/taqwa-institute-shortlisted-for-best-madrassah-services-2025/",
    category: "Best Madrassah Service",
    status: "Shortlisted",
    summary: "A shortlisted madrassah services profile from the 2025 awards.",
  },
  {
    title: "Al-Manaar MCHC - Shortlisted for Best Women's Services Mosque 2025",
    href: "/al-manaar-mchc-shortlisted-for-best-womens-services-mosque-2025/",
    category: "Best Women's Service",
    status: "Shortlisted",
    summary: "A shortlisted women's services profile from the 2025 awards.",
  },
  {
    title:
      "Masjid Al Falaah - Shortlisted for Best Women's Services Mosque 2025",
    href: "/masjid-ai-falaah-shortlisted-for-best-womens-services-mosque-2025/",
    category: "Best Women's Service",
    status: "Shortlisted",
    summary: "A shortlisted women's services profile from the 2025 awards.",
  },
  {
    title: "Purley Masjid - Shortlisted for Best Women's Services Mosque 2025",
    href: "/purley-masjid-shortlisted-for-best-womens-services-mosque-2025/",
    category: "Best Women's Service",
    status: "Shortlisted",
    summary: "A shortlisted women's services profile from the 2025 awards.",
  },
  {
    title: "Purley Masjid - Best Future Design Mosque 2025",
    href: "/purley-masjid-best-future-design-mosque-2025/",
    category: "Best Future Design",
    status: "Finalist",
    summary:
      "Recognised for future design and for work that connects mosque facilities with wider community engagement.",
  },
  {
    title: "BMHC - Best Future Design Mosque 2025",
    href: "/bmhc-best-future-design-mosque-2025/",
    category: "Best Future Design",
    status: "Finalist",
    summary: "A 2025 Best Future Design profile from the Beacon Mosque Awards.",
  },
  {
    title: "ICOB - Islamic Centre of Britain - Best Future Design Mosque 2025",
    href: "/icob-islamic-centre-of-britain-best-future-design-mosque-2025/",
    category: "Best Future Design",
    status: "Winner",
    summary: "A 2025 Best Future Design profile from the Beacon Mosque Awards.",
  },
  {
    title: "Sketty Mosque and Community Centre - Best Outreach Services 2025",
    href: "/sketty-mosque-and-community-centre-best-outreach-services-2025/",
    category: "Best Outreach Services",
    status: "Finalist",
    summary:
      "Recognised for outreach, community support, youth activity, education and civic partnership work.",
  },
  {
    title: "The City Retreat - Best Outreach Services 2025",
    href: "/the-city-retreat-best-outreach-services-2025/",
    category: "Best Outreach Services",
    status: "Finalist",
    summary:
      "A 2025 Best Outreach Services profile from the Beacon Mosque Awards.",
  },
  {
    title: "Wirrel Deen Centre Bearkhead - Best Outreach Services 2025",
    href: "/wirrel-dean-centre-bearkhead-best-outreach-services-2025/",
    category: "Best Outreach Services",
    status: "Winner",
    summary:
      "A 2025 Best Outreach Services profile from the Beacon Mosque Awards.",
  },
  {
    title:
      "Mohammad Akram - Markazi Jamia Ghausia - Best Best Mosque Volunteer 2025",
    href: "/mohammad-akram-best-best-mosque-volunteer-2025/",
    category: "Best Mosque Volunteer",
    status: "Finalist",
    summary:
      "A volunteer profile recognising decades of service to Markazi Jamia Ghausia Masjid in Nelson.",
  },
  {
    title: "Jamiyat Tabligh Ul Islam (JTI) - Best Best Mosque Volunteer 2025",
    href: "/jamiyat-tabligh-ul-islam-jti-best-best-mosque-volunteer-2025/",
    category: "Best Mosque Volunteer",
    status: "Finalist",
    summary:
      "A 2025 Best Mosque Volunteer profile from the Beacon Mosque Awards.",
  },
  {
    title: "Sabia Rehman - Finalist for Most Impactful Alimah 2025",
    href: "/sabia-rehman-finalist-for-most-impactful-alimah-2025/",
    category: "Most Impactful Alimah",
    status: "Finalist",
    summary:
      "Recognised for Islamic learning, chaplaincy, end-of-life care advocacy and community teaching.",
  },
  {
    title:
      "Muftiyah Nasima Umm Hamza - Finalist for Most Impactful Alimah 2025",
    href: "/mufiyah-nasima-umm-hamza-finalist-for-most-impactful-alimah-2025/",
    category: "Most Impactful Alimah",
    status: "Finalist",
    summary: "A 2025 finalist profile in the Most Impactful Alimah category.",
  },
  {
    title: "Ustadah Nabeela Ali - Finalist for Most Impactful Alimah 2025",
    href: "/ustadah-nabeela-finalist-for-most-impactful-alimah-2025/",
    category: "Most Impactful Alimah",
    status: "Finalist",
    summary: "A 2025 finalist profile in the Most Impactful Alimah category.",
  },
  {
    title: "Imam Fazal Hassan - Shortlisted for Most Impactful Imam 2025",
    href: "/imama-fazal-hassan-shortlisted-for-most-impactful-imam-2025/",
    category: "Most Impactful Imam",
    status: "Shortlisted",
    summary: "A shortlisted imam profile from the 2025 Beacon Mosque Awards.",
  },
  {
    title:
      "Shaykh Dr. Saalim Al-Azhari - Shortlisted for Most Impactful Imam 2025",
    href: "/shaykh-dr-saalim-ai-azhari-shortlisted-for-most-impactful-imam-2025-2/",
    category: "Most Impactful Imam",
    status: "Shortlisted",
    summary: "A shortlisted imam profile from the 2025 Beacon Mosque Awards.",
  },
  {
    title: "Ustadh Mohammed Shoaib - Shortlisted for Most Impactful Imam 2025",
    href: "/ustadh-mohammed-shoaib-shortlisted-for-most-impactful-imam-2025/",
    category: "Most Impactful Imam",
    status: "Shortlisted",
    summary:
      "Recognised for Islamic education, mentorship, youth development and community leadership.",
  },
  {
    title:
      "Islamic Association of North London (IANL) - Finalist for Best Convert System 2025",
    href: "/islamic-associates-north-london-finalist-for-best-convert-system-2025/",
    category: "Best Convert Support Service",
    status: "Finalist",
    summary: "A 2025 finalist profile in the Best Convert Support category.",
  },
  {
    title: "Jamia Almaarif - Finalist for Best Convert System 2025",
    href: "/jamia-almaarif-finalist-for-best-convert-system-2025/",
    category: "Best Convert Support Service",
    status: "Finalist",
    summary: "A 2025 finalist profile in the Best Convert Support category.",
  },
  {
    title: "London Central Mosque - Finalist for Best Convert System 2025",
    href: "/london-central-mosque-finalist-for-best-convert-system/",
    category: "Best Convert Support Service",
    status: "Finalist",
    summary: "A 2025 finalist profile in the Best Convert Support category.",
  },
];

const awardRecognitionProfiles2025 = awardRecognitionProfiles2025Raw.map(
  (profile) => {
    const winner = getAwardWinnerRecord2025ByHref(profile.href);

    if (!winner) {
      return profile;
    }

    return {
      ...profile,
      title: `${winner.winnerName} - ${winner.title} 2025`,
      status: "Winner",
      summary: winner.summary,
    };
  },
);

const featuredAwardRecognitionProfiles2025 = awardRecognitionProfiles2025.filter(
  (profile) => profile.status === "Winner",
);

const awardRecognitionCards2025: CardLink[] =
  featuredAwardRecognitionProfiles2025.map((profile) => {
    const winner = getAwardWinnerRecord2025ByHref(profile.href);

    return {
      title: profile.title,
      text: profile.summary,
      href: profile.href,
      meta: profile.status,
      image: winner?.image,
      imageAlt: winner?.imageAlt,
    };
  });

const winnerCards2025: CardLink[] = featuredAwardRecognitionProfiles2025.map(
  (profile) => {
    const winner = getAwardWinnerRecord2025ByHref(profile.href);

    return {
      title: winner?.winnerName ?? profile.title,
      text:
        winner?.summary ??
        `${profile.category} winner for 2025.`,
      href: profile.href,
      meta: profile.category,
      image: winner?.image,
      imageAlt: winner?.imageAlt,
    };
  },
);

const awardCategoryPages2025 = [
  { title: "Best Run Mosque", href: "/beacon-mosque-award-2025-voting/" },
  {
    title: "Best Youth Service",
    href: "/beacon-mosque-award-2025-youth-voting/",
  },
  {
    title: "Best Madrassah Service",
    href: "/beacon-mosque-award-2025-voting-madrassah/",
  },
  { title: "Best Women's Service", href: "/beacon-mosque-award-2025-women/" },
  { title: "Most Impactful Imam", href: "/beacon-mosque-award-2025-imam/" },
  {
    title: "Best Convert Support Service",
    href: "/beacon-mosque-award-2025-convert/",
  },
  {
    title: "Most Impactful Alimah",
    href: "/beacon-mosque-award-2025-voting-alimah/",
  },
  {
    title: "Best Outreach Services",
    href: "/beacon-mosque-award-2025-voting-outreach/",
  },
  {
    title: "Best Future Design",
    href: "/beacon-mosque-award-2025-voting-future-design/",
  },
  {
    title: "Best Mosque Volunteer",
    href: "/beacon-mosque-award-2025-voting-volunteer/",
  },
];

const awardCategoryHref2025 = Object.fromEntries(
  awardCategoryPages2025.map((category) => [category.title, category.href]),
);

const awardRecognitionProfiles2024Raw = [
  {
    title: "Bilal Academy Shortlisted Mosque - Best Run Mosque 2024",
    href: "/bilal-academy-shortlisted-mosque-best-run-mosque2024/",
    category: "Best Run Mosque",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Run Mosque category.",
  },
  {
    title: "Chesham Mosque Shortlisted Mosque - Best Run Mosque 2024",
    href: "/chesham-mosque-shortlisted-mosque-best-run-mosque2024/",
    category: "Best Run Mosque",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Run Mosque category.",
  },
  {
    title: "Golden Mosque Shortlisted Mosque - Best Run Mosque 2024",
    href: "/golden-mosque-shortlisted-mosque-best-run-mosque2024-2/",
    category: "Best Run Mosque",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Run Mosque category.",
  },
  {
    title:
      "Aberdeen Mosque & Islamic Centre Shortlisted Mosque - Best Youth Service 2024",
    href: "/abderdeen-mosque-islamic-centre-shortlisted-mosque-best-youth-service-2024/",
    category: "Best Youth Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Youth Service category.",
  },
  {
    title:
      "Bracknell Islamic Cultural Society Shortlisted Mosque - Best Youth Service 2024",
    href: "/bracknell-islamic-cultural-society-shortlisted-mosque-best-youth-service-2024/",
    category: "Best Youth Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Youth Service category.",
  },
  {
    title:
      "Masjid Millat-E-Islamia Shortlisted Mosque - Best Youth Service 2024",
    href: "/masjid-millat-e-islamia-shortlisted-mosque-best-youth-service-2024/",
    category: "Best Youth Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Youth Service category.",
  },
  {
    title: "Al Furqan - Shortlisted - Best Madrassah Service 2024",
    href: "/al-furqan-madrassah-shortlisted-mosque-2024/",
    category: "Best Madrassah Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Best Madrassah Service category.",
  },
  {
    title:
      "Bayt Al Qaim Islamic Centre - Shortlisted - Best Madrassah Service 2024",
    href: "/bayt-al-qaim-islamic-centre-shortlisted-best-madrassah-service-2024-2/",
    category: "Best Madrassah Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Best Madrassah Service category.",
  },
  {
    title: "Masjid Muadh Ibn Jabal - Shortlisted - Best Madrassah Service 2024",
    href: "/masjid-muadh-ibn-jabal-shortlisted-best-madrassah-service-2024/",
    category: "Best Madrassah Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Best Madrassah Service category.",
  },
  {
    title: "The Hub - Shortlisted - Best Madrassah Service 2024",
    href: "/the-hub-madrassah-shortlisted-mosque-2024/",
    category: "Best Madrassah Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Best Madrassah Service category.",
  },
  {
    title: "Hayes Muslim Centre - Shortlisted Best Madrassah Service 2024",
    href: "/shortlisted-best-madrassah-service-2024-hayes-muslim-centre/",
    category: "Best Madrassah Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Best Madrassah Service category.",
  },
  {
    title:
      "Al Furqan Islamic Centre Shortlisted Mosque - Best Women's Service 2024",
    href: "/al-furqan-shortlisted-mosque-best-womens-service-2024/",
    category: "Best Women's Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Women's Service category.",
  },
  {
    title: "Jamia Al Maarif Shortlisted Mosque - Best Women's Service 2024",
    href: "/jamia-al-maarif-shortlisted-mosque-best-womens-service-2024/",
    category: "Best Women's Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Women's Service category.",
  },
  {
    title:
      "Nelson Community Mosque Shortlisted Mosque - Best Women's Service 2024",
    href: "/nelson-community-mosque-shortlisted-mosque-best-youth-service-2024/",
    category: "Best Women's Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Women's Service category.",
  },
  {
    title:
      "Ameenia Sultania Educational Trust Shortlisted Mosque - Best Future Design 2024",
    href: "/ameenia-sultania-educational-trust-shortlisted-mosque-best-future-design-2024/",
    category: "Best Future Design",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Future Design category.",
  },
  {
    title: "Quba Masjid Shortlisted Mosque - Best Future Design 2024",
    href: "/quba-masjid-shortlisted-mosque-best-future-design-2024/",
    category: "Best Future Design",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Future Design category.",
  },
  {
    title: "Salaam Centre Shortlisted Mosque - Best Future Design 2024",
    href: "/salaam-centre-shortlisted-mosque-best-future-design-2024/",
    category: "Best Future Design",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Future Design category.",
  },
  {
    title: "East London Mosque Shortlisted Mosque - Best Convert Care 2024",
    href: "/east-london-mosque-shortlisted-mosque-best-convert-service-2024/",
    category: "Best Convert Support Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Convert Care category.",
  },
  {
    title: "Green Lane Masjid Shortlisted Mosque - Best Convert Care 2024",
    href: "/green-lane-masjid-shortlisted-mosque-best-convert-care-service-2024/",
    category: "Best Convert Support Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Convert Care category.",
  },
  {
    title: "The Olton Project Shortlisted Mosque - Best Convert Care 2024",
    href: "/the-olton-project-shortlisted-mosque-best-convert-care-service-2024/",
    category: "Best Convert Support Service",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Best Convert Care category.",
  },
  {
    title: "Al Manaar Shortlisted Mosque - Best Innovation Service 2024",
    href: "/al-manaar-shortlisted-mosque-best-innovation-service-2024/",
    category: "Best Innovative Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Best Innovative Service category.",
  },
  {
    title:
      "Central Jamia Mosque Madni Shortlisted Mosque - Best Innovation Service 2024",
    href: "/central-jamia-masjid-shortlisted-mosque-best-innovation-service-2024/",
    category: "Best Innovative Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Best Innovative Service category.",
  },
  {
    title:
      "Wycombe Islamic Mission Shortlisted Mosque - Best Innovation Service 2024",
    href: "/wycombe-islamic-mission-shortlisted-mosque-best-innovation-service-2024/",
    category: "Best Innovative Service",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Best Innovative Service category.",
  },
  {
    title: "Adam Kelwick - Shortlisted - Most Impactful Imam 2024",
    href: "/adam-kelwick-shortlisted-most-impactful-imam-2024/",
    category: "Most Impactful Imam",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Most Impactful Imam category.",
  },
  {
    title: "Mufti Muhammad Tosir Miah - Shortlisted - Most Impactful Imam 2024",
    href: "/mufti-muhammad-tosir-miah-shortlisted-most-impactful-imam-2024/",
    category: "Most Impactful Imam",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Most Impactful Imam category.",
  },
  {
    title: "Shaykh Omar Ali - Shortlisted - Most Impactful Imam 2024",
    href: "/shaykh-omar-ali-shortlisted-most-impactful-imam-2024/",
    category: "Most Impactful Imam",
    status: "Shortlisted",
    summary: "A shortlisted profile in the 2024 Most Impactful Imam category.",
  },
  {
    title: "Fatima Qasmi Shortlisted Most Impactful Alimah 2024",
    href: "/fatima-qasmi-shortlisted-most-impactful-alimah-2024/",
    category: "Most Impactful Alimah",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Most Impactful Alimah category.",
  },
  {
    title: "Saleha Islam Shortlisted Most Impactful Alimah 2024",
    href: "/saleha-islam-shortlisted-most-impactful-alimah-2024/",
    category: "Most Impactful Alimah",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Most Impactful Alimah category.",
  },
  {
    title: "Ustadha Nagebah Hayel Shortlisted Most Impactful Alimah 2024",
    href: "/ustadha-nagebah-hayel-shortlisted-most-impactful-alimah-2024/",
    category: "Most Impactful Alimah",
    status: "Shortlisted",
    summary:
      "A shortlisted profile in the 2024 Most Impactful Alimah category.",
  },
  {
    title: "Best Mosque Volunteer Shortlist 2024",
    href: "/best-mosque-volunteer-shortlist-2024/",
    category: "Best Mosque Volunteer",
    status: "Shortlisted",
    summary: "A 2024 shortlist page in the Best Mosque Volunteer category.",
  },
];

const awardRecognitionProfiles2024 = awardRecognitionProfiles2024Raw.map(
  (profile) => {
    const winner = getAwardWinnerRecord2024ByHref(profile.href);

    if (!winner) {
      return profile;
    }

    return {
      ...profile,
      title: `${winner.winnerName} - ${winner.title} 2024`,
      status: "Winner",
      summary: winner.summary,
    };
  },
);

const awardRecognitionCards2024: CardLink[] = awardRecognitionProfiles2024.map(
  (profile) => {
    const winner = getAwardWinnerRecord2024ByHref(profile.href);

    return {
      title: profile.title,
      text: profile.summary,
      href: profile.href,
      meta: profile.status,
      image: winner?.image,
      imageAlt: winner?.imageAlt,
    };
  },
);

const awardCategoryPages2024 = [
  { title: "Best Run Mosque", href: "/best-run-mosque-2024/" },
  { title: "Best Youth Service", href: "/best-youth-service-2024/" },
  { title: "Best Madrassah Service", href: "/best-madrassah-service-2024/" },
  { title: "Best Women's Service", href: "/best-womens-service-2024/" },
  { title: "Most Impactful Imam", href: "/most-impactful-imam-2024/" },
  {
    title: "Best Convert Support Service",
    href: "/best-convert-support-service-2024/",
  },
  { title: "Most Impactful Alimah", href: "/most-impactful-alimah-2024/" },
  { title: "Best Innovative Service", href: "/most-innovative-service-2024/" },
  { title: "Best Future Design", href: "/best-future-design-award-2024/" },
  { title: "Best Mosque Volunteer", href: "/best-mosque-volunteer-2024/" },
];

const awardCategoryHref2024 = Object.fromEntries(
  awardCategoryPages2024.map((category) => [category.title, category.href]),
);

const awardCategoryPages2023 = [
  { title: "Best Run Mosque", href: "/best-run-mosque-2023/" },
  { title: "Best Youth Service", href: "/best-youth-service-2023/" },
  { title: "Best Madrassah Service", href: "/best-madrassah-service-2023/" },
  { title: "Best Women's Service", href: "/best-womens-service-2023/" },
  { title: "Most Impactful Imam", href: "/most-impactful-imam-2023/" },
  {
    title: "Best Convert Support Service",
    href: "/best-convert-support-service-2023/",
  },
  { title: "Most Impactful Alimah", href: "/most-impactful-alimah-2023/" },
  { title: "Best Outreach Services", href: "/best-outreach-service-2023/" },
  { title: "Best Future Design", href: "/best-future-design-award-2023/" },
  { title: "Best Mosque Volunteer", href: "/best-mosque-volunteer-2023/" },
  { title: "Best Green Initiative", href: "/best-green-initiative-2023/" },
  { title: "Best Overseas Mosque", href: "/best-overseas-mosque-2023/" },
  { title: "Most Innovative Service", href: "/most-innovative-service-2023/" },
];

const awardCategoryHref2023 = Object.fromEntries(
  awardCategoryPages2023.map((category) => [category.title, category.href]),
);

const awardCategoryPages2022 = [
  { title: "Best Run Mosque", href: "/best-run-mosque-2022/" },
  { title: "Best Youth Service", href: "/best-youth-service-2022/" },
  { title: "Best Madrassah Service", href: "/best-madrassah-service-2022/" },
  { title: "Best Women's Service", href: "/best-womens-service-2022/" },
  { title: "Most Impactful Imam", href: "/most-impactful-imam-2022/" },
  {
    title: "Best Convert Support Service",
    href: "/best-convert-support-service-2022/",
  },
  { title: "Most Impactful Alimah", href: "/most-impactful-alimah-2022/" },
  { title: "Best Outreach Service", href: "/best-outreach-service-2022/" },
  { title: "Best Future Design", href: "/best-future-design-award-2022/" },
  { title: "Best Mosque Volunteer", href: "/best-mosque-volunteer-2022/" },
  { title: "Best Green Initiative", href: "/best-green-initiative-2022/" },
  { title: "Most Innovative Service", href: "/most-innovative-service-2022/" },
];

const awardCategoryHref2022 = Object.fromEntries(
  awardCategoryPages2022.map((category) => [category.title, category.href]),
);

const awardFinalistPages2022 = [
  {
    title: "Best Run Mosque 2022 Finalists",
    href: "/best-run-mosque-2022-finalists/",
    category: "Best Run Mosque",
  },
  {
    title: "Best Youth Service 2022 Finalists",
    href: "/best-youth-service-2022-finalists/",
    category: "Best Youth Service",
  },
  {
    title: "Best Madrassah Service 2022 Finalists",
    href: "/best-madrassah-service-2022-finalists/",
    category: "Best Madrassah Service",
  },
  {
    title: "Best Women's Service 2022 Finalists",
    href: "/best-womens-service-2022-finalists/",
    category: "Best Women's Service",
  },
  {
    title: "Most Impactful Imam 2022 Finalists",
    href: "/most-impactful-imam-2022-finalists/",
    category: "Most Impactful Imam",
  },
  {
    title: "Best Convert Support Service Award 2022 Finalists",
    href: "/best-convert-support-service-2022-finalists/",
    category: "Best Convert Support Service",
  },
  {
    title: "Most Impactful Alimah 2022 Finalists",
    href: "/most-impactful-alimah-2022-finalists/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Best Outreach Service 2022 Finalists",
    href: "/best-outreach-service-2022-finalists/",
    category: "Best Outreach Service",
  },
  {
    title: "Best Future Design Award 2022 Finalists",
    href: "/best-future-design-2022-finalists/",
    category: "Best Future Design",
  },
  {
    title: "Best Mosque Volunteer Award 2022 Finalists",
    href: "/best-mosque-volunteer-2022-finalists/",
    category: "Best Mosque Volunteer",
  },
  {
    title: "Most Innovative Service 2022 Finalists",
    href: "/most-innovative-service-2022-finalists/",
    category: "Most Innovative Service",
  },
];

const awardVotePages2022 = [
  {
    title: "Best Run Mosque 2022 Vote",
    href: "/best-run-mosque-2022-vote/",
    category: "Best Run Mosque",
  },
  {
    title: "Best Youth Service 2022 Vote",
    href: "/best-youth-service-2022-vote/",
    category: "Best Youth Service",
  },
  {
    title: "Best Madrassah Service 2022 Vote",
    href: "/best-madrassah-service-2022-vote/",
    category: "Best Madrassah Service",
  },
  {
    title: "Best Women's Service 2022 Vote",
    href: "/best-womens-service-2022-vote/",
    category: "Best Women's Service",
  },
  {
    title: "Most Impactful Imam 2022 Vote",
    href: "/most-impactful-imam-2022-vote/",
    category: "Most Impactful Imam",
  },
  {
    title: "Best Convert Support 2022 Vote",
    href: "/best-convert-support-2022-vote/",
    category: "Best Convert Support Service",
  },
  {
    title: "Most Impactful Alimah 2022 Vote",
    href: "/most-impactful-alimah-2022-vote/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Best Outreach Service 2022 Vote",
    href: "/best-outreach-service-2022-vote/",
    category: "Best Outreach Service",
  },
  {
    title: "Best Future Design 2022 Vote",
    href: "/best-future-design-2022-vote/",
    category: "Best Future Design",
  },
  {
    title: "Best Mosque Volunteer 2022 Vote",
    href: "/best-mosque-volunteer-2022-vote/",
    category: "Best Mosque Volunteer",
  },
  {
    title: "Most Innovative Service 2022 Vote",
    href: "/most-innovative-service-2022-vote/",
    category: "Most Innovative Service",
  },
];

const awardRecognitionProfiles2022 = [
  {
    title: "Hounslow Muslim Centre - Shortlisted - Best Run Mosque 2022",
    href: "/hounslow-muslim-centre-shortlisted-best-run-mosque-2022/",
    category: "Best Run Mosque",
  },
  {
    title:
      "Maidenhead Mosque & Islamic Centre - Shortlisted - Best Run Mosque 2022",
    href: "/maidenhead-mosque-islamic-centre-shortlisted-best-run-mosque-2022/",
    category: "Best Run Mosque",
  },
  {
    title: "Leeds Grand Mosque - Shortlisted - Best Run Mosque 2022",
    href: "/leeds-grand-mosque-shortlisted-best-run-mosque-2022/",
    category: "Best Run Mosque",
  },
  {
    title: "Bilal Academy - Shortlisted - Best Run Mosque 2022",
    href: "/bilal-academy-shortlisted-best-run-mosque-2022/",
    category: "Best Run Mosque",
  },
  {
    title: "Al-Hayat Centre - Shortlisted - Best Youth Service 2022",
    href: "/al-hayat-centre-shortlisted-best-youth-service-2022/",
    category: "Best Youth Service",
  },
  {
    title: "Masjid Al-Falaah - Shortlisted - Best Youth Service 2022",
    href: "/masjid-al-falaah-shortlisted-best-youth-service-2022/",
    category: "Best Youth Service",
  },
  {
    title: "EMCA Mosque & Centre - Shortlisted - Best Youth Service 2022",
    href: "/emca-mosque-centre-shortlisted-best-youth-service-2022/",
    category: "Best Youth Service",
  },
  {
    title: "Lantern Academy - Shortlisted - Best Madrassah Service 2022",
    href: "/lantern-academy-shortlisted-best-madrassah-service-2022/",
    category: "Best Madrassah Service",
  },
  {
    title:
      "Bayt Al Qaim Islamic Centre - Shortlisted - Best Madrassah Service 2022",
    href: "/bayt-al-qaim-islamic-centre-shortlisted-best-madrassah-service-2022/",
    category: "Best Madrassah Service",
  },
  {
    title: "Al-Rahma Mosque - Shortlisted - Best Madrassah Service 2022",
    href: "/al-rahma-mosque-shortlisted-best-madrassah-service-2022/",
    category: "Best Madrassah Service",
  },
  {
    title: "Al-Madani Masjid - Shortlisted - Best Madrassah Service 2022",
    href: "/al-madani-masjid-shortlisted-best-madrassah-service-2022/",
    category: "Best Madrassah Service",
  },
  {
    title: "Al-Hayat Centre - Shortlisted - Best Madrassah Service 2022",
    href: "/al-hayat-centre-shortlisted-best-madrassah-service-2022/",
    category: "Best Madrassah Service",
  },
  {
    title: "Guidance Hub - Shortlisted - Best Women's Service 2022",
    href: "/guidance-hub-shortlisted-best-womens-service-2022/",
    category: "Best Women's Service",
  },
  {
    title: "Dawatal Islam Mosque - Shortlisted - Best Women's Service 2022",
    href: "/dawatal-islam-mosque-shortlisted-best-womens-service-2022/",
    category: "Best Women's Service",
  },
  {
    title:
      "Minhaj Ul Quran Birmingham - Shortlisted - Best Women's Service 2022",
    href: "/minhaj-ul-quran-birmingham-shortlisted-best-womens-service-2022/",
    category: "Best Women's Service",
  },
  {
    title:
      "Shaykh Rizwan Hussain al-Azhari (Al-Hayat Centre) - Shortlisted - Most Impactful Imam 2022",
    href: "/rizwan-hussain-al-hayat-centre-shortlisted-most-impactful-imam-2022/",
    category: "Most Impactful Imam",
  },
  {
    title:
      "Qari Is'Haaq Jasat (London Islamic Cultural Society) - Shortlisted - Most Impactful Imam 2022",
    href: "/ishaaq-jasat-shortlisted-most-impactful-imam-2022/",
    category: "Most Impactful Imam",
  },
  {
    title:
      "Imam Ebrahim Esakjee (Bilal Academy) - Shortlisted - Most Impactful Imam 2022",
    href: "/ebrahim-esakjee-shortlisted-most-impactful-imam-2022/",
    category: "Most Impactful Imam",
  },
  {
    title:
      "York Mosque & Islamic Centre - Shortlisted - Best Convert Support 2022",
    href: "/york-mosque-islamic-centre-shortlisted-best-convert-support-2022/",
    category: "Best Convert Support Service",
  },
  {
    title: "Jamia Almaarif - Shortlisted - Best Convert Support 2022",
    href: "/jamia-almaarif-shortlisted-best-convert-support-2022/",
    category: "Best Convert Support Service",
  },
  {
    title: "Hockwell Ring Masjid - Shortlisted - Best Convert Support 2022",
    href: "/hockwell-ring-masjid-shortlisted-best-convert-support-2022/",
    category: "Best Convert Support Service",
  },
  {
    title:
      "Ustadha Uzma Minhas (Hubb Education) - Shortlisted - Most Impactful Alimah 2022",
    href: "/uzma-minhas-shortlisted-most-impactful-alimah-2022/",
    category: "Most Impactful Alimah",
  },
  {
    title:
      "Ustadha Sidrah Ahmed (Al-Hayat Centre) - Shortlisted - Most Impactful Alimah 2022",
    href: "/sidrah-ahmed-shortlisted-most-impactful-alimah-2022/",
    category: "Most Impactful Alimah",
  },
  {
    title:
      "Ustadha Ameena Blake (Markfield Institute) - Shortlisted - Most Impactful Alimah 2022",
    href: "/ameena-blake-shortlisted-most-impactful-alimah-2022/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Dawatal Islam Mosque - Shortlisted - Best Outreach Service 2022",
    href: "/dawatal-islam-mosque-shortlisted-best-outreach-service-2022/",
    category: "Best Outreach Service",
  },
  {
    title: "Nelson Community Masjid - Shortlisted - Best Outreach Service 2022",
    href: "/nelson-community-masjid-shortlisted-best-outreach-service-2022/",
    category: "Best Outreach Service",
  },
  {
    title: "Bashir Ahmed Masjid - Shortlisted - Best Outreach Service 2022",
    href: "/bashir-ahmed-masjid-shortlisted-best-outreach-service-2022/",
    category: "Best Outreach Service",
  },
  {
    title: "Al-Manaar - Shortlisted - Best Outreach Service 2022",
    href: "/al-manaar-shortlisted-best-outreach-service-2022/",
    category: "Best Outreach Service",
  },
  {
    title:
      "UK Albanian Muslim Community & Cultural Centre - Shortlisted - Best Future Design 2022",
    href: "/uk-albanian-muslim-community-cultural-centre-shortlisted-best-future-design-2022/",
    category: "Best Future Design",
  },
  {
    title: "Madinat al Zahra - Shortlisted - Best Future Design 2022",
    href: "/madinat-al-zahra-shortlisted-best-future-design-2022/",
    category: "Best Future Design",
  },
  {
    title:
      "Iqra Learning Centre Glasgow - Shortlisted - Best Future Design 2022",
    href: "/iqra-learning-centre-glasgow-shortlisted-best-future-design-2022/",
    category: "Best Future Design",
  },
  {
    title:
      "Mahmood M Sacha (Masjid-E-Umar) - Shortlisted - Best Mosque Volunteer 2022",
    href: "/mahmood-m-sacha-shortlisted-best-mosque-volunteer-2022/",
    category: "Best Mosque Volunteer",
  },
  {
    title:
      "Noor Miah (Shah Jalal Mosque) - Shortlisted - Best Mosque Volunteer 2022",
    href: "/noor-miah-shortlisted-best-mosque-volunteer-2022/",
    category: "Best Mosque Volunteer",
  },
  {
    title:
      "Abdul Raoof Malik (Easton Jamia Masjid) - Shortlisted - Best Mosque Volunteer 2022",
    href: "/abdul-raoof-malik-shortlisted-best-mosque-volunteer-2022/",
    category: "Best Mosque Volunteer",
  },
  {
    title:
      "Safiyya Dhorat (Masjid Nuh) - Shortlisted - Best Mosque Volunteer 2022",
    href: "/safiyya-dhorat-shortlisted-best-mosque-volunteer-2022/",
    category: "Best Mosque Volunteer",
  },
  {
    title: "Leeds Grand Mosque - Shortlisted - Most Innovative Service 2022",
    href: "/leeds-grand-mosque-shortlisted-most-innovative-service-2022/",
    category: "Most Innovative Service",
  },
  {
    title:
      "Hounslow Jamia Masjid & Islamic Centre - Shortlisted - Most Innovative Service 2022",
    href: "/hounslow-jamia-masjid-islamic-centre-shortlisted-most-innovative-service-2022/",
    category: "Most Innovative Service",
  },
  {
    title:
      "Al-Madina Mosque Barking - Shortlisted - Most Innovative Service 2022",
    href: "/al-madina-mosque-barking-shortlisted-most-innovative-service-2022/",
    category: "Most Innovative Service",
  },
].map((profile) => ({
  ...profile,
  status: "Shortlisted",
  summary: `A shortlisted profile in the 2022 ${profile.category} category.`,
}));

const awardRecognitionCards2022: CardLink[] = awardRecognitionProfiles2022.map(
  (profile) => ({
    title: profile.title,
    text: profile.summary,
    href: profile.href,
    meta: profile.status,
  }),
);

const awardFinalistCards2022: CardLink[] = awardFinalistPages2022.map(
  (page) => ({
    title: page.title,
    text: `Finalists recognised in the 2022 ${page.category} category.`,
    href: page.href,
    meta: "2022 finalists",
  }),
);

const awardVoteCards2022: CardLink[] = awardVotePages2022.map((page) => ({
  title: page.title,
  text: `Voting page for the 2022 ${page.category} category.`,
  href: page.href,
  meta: "2022 vote",
}));

const awardCategoryPages2021 = [
  {
    title: "Best Run Mosque",
    href: "/best-run-mosque-2021/",
    aliases: ["/best-run-mosque-2021-b-2/"],
  },
  {
    title: "Best Youth Service",
    href: "/best-youth-service-2021/",
    aliases: ["/best-youth-service-2021-b/"],
  },
  {
    title: "Best Madrassah Service",
    href: "/best-madrassah-service-2021/",
    aliases: ["/best-madrassah-service-2021-b/"],
  },
  {
    title: "Best Women's Service",
    href: "/best-womens-service-2021/",
    aliases: ["/best-womens-service-2021-b/"],
  },
  {
    title: "Most Impactful Imam",
    href: "/most-impactful-imam-2021/",
    aliases: ["/most-impactful-imam-2021-b/"],
  },
  {
    title: "Most Impactful Alimah",
    href: "/most-impactful-alimah-2021/",
    aliases: ["/most-impactful-alimah-2021-b/"],
  },
  {
    title: "Best Outreach Service",
    href: "/best-outreach-service-2021/",
    aliases: ["/best-outreach-service-2021-b/"],
  },
  { title: "Best Elderly Service", href: "/best-elderly-service-2021/" },
  {
    title: "Best Green Initiative",
    href: "/best-green-initiative-2021/",
    aliases: ["/best-green-initiative-2021-b/"],
  },
  {
    title: "Most Innovative Service",
    href: "/most-innovative-service-2021/",
    aliases: ["/most-innovative-service-2021-b/"],
  },
];

const awardCategoryHref2021 = Object.fromEntries(
  awardCategoryPages2021.map((category) => [category.title, category.href]),
);
awardCategoryHref2021["Best Future Design"] = "/best-future-design-2021-vote/";

const awardVotePages2021 = [
  {
    title: "Best Run Mosque 2021 Vote",
    href: "/best-run-mosque-2021-vote/",
    category: "Best Run Mosque",
  },
  {
    title: "Best Youth Service 2021 Vote",
    href: "/best-youth-service-2021-vote/",
    category: "Best Youth Service",
  },
  {
    title: "Best Madrassah Service 2021 Vote",
    href: "/best-madrassah-service-2021-vote/",
    category: "Best Madrassah Service",
  },
  {
    title: "Best Women's Service 2021 Vote",
    href: "/best-womens-service-2021-vote/",
    category: "Best Women's Service",
  },
  {
    title: "Most Impactful Imam 2021 Vote",
    href: "/most-impactful-imam-2021-vote/",
    category: "Most Impactful Imam",
  },
  {
    title: "Most Impactful Alimah 2021 Vote",
    href: "/most-impactful-alimah-2021-vote/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Best Outreach Service 2021 Vote",
    href: "/best-outreach-service-2021-vote/",
    category: "Best Outreach Service",
  },
  {
    title: "Best Elderly Service 2021 Vote",
    href: "/best-elderly-service-2021-vote/",
    category: "Best Elderly Service",
  },
  {
    title: "Best Green Initiative 2021 Vote",
    href: "/best-green-initiative-2021-vote/",
    category: "Best Green Initiative",
  },
  {
    title: "Most Innovative Service 2021 Vote",
    href: "/best-innovative-service-2021-vote/",
    category: "Most Innovative Service",
  },
  {
    title: "Best Future Design 2021 Vote",
    href: "/best-future-design-2021-vote/",
    category: "Best Future Design",
  },
];

const awardResultPages2021 = [
  {
    title: "Best Run Mosque 2021 Results",
    href: "/best-run-mosque-2021-results/",
    category: "Best Run Mosque",
  },
  {
    title: "Best Youth Service 2021 Results",
    href: "/youth-2021-results/",
    category: "Best Youth Service",
  },
  {
    title: "Best Madrassah Service 2021 Results",
    href: "/madrassah-2021-results/",
    category: "Best Madrassah Service",
  },
  {
    title: "Best Women's Service 2021 Results",
    href: "/womens-2021-results/",
    category: "Best Women's Service",
  },
  {
    title: "Most Impactful Imam 2021 Results",
    href: "/imam-2021-results/",
    category: "Most Impactful Imam",
  },
  {
    title: "Most Impactful Alimah 2021 Results",
    href: "/alimah-2021-results/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Best Outreach Service 2021 Results",
    href: "/outreach-2021-results/",
    category: "Best Outreach Service",
  },
  {
    title: "Best Green Initiative 2021 Results",
    href: "/green-2021-results/",
    category: "Best Green Initiative",
  },
  {
    title: "Best Innovative Service 2021 Results",
    href: "/innovative-2021-results/",
    category: "Most Innovative Service",
  },
  {
    title: "Best Future Design 2021 Results",
    href: "/future-design-2021-results/",
    category: "Best Future Design",
  },
];

const awardRecognitionProfiles2021 = [
  {
    title:
      "Sri Lankan Muslim Cultural Centre - Shortlisted - Best Run Mosque 2021",
    href: "/sri-lankan-muslim-cultural-centre-shortlisted-best-run-mosque-2021/",
    category: "Best Run Mosque",
  },
  {
    title: "Golden Mosque - Shortlisted - Best Run Mosque 2021",
    href: "/golden-mosque-shortlisted-best-run-mosque-2021/",
    category: "Best Run Mosque",
  },
  {
    title: "Al Manaar - Shortlisted - Best Run Mosque 2021",
    href: "/al-manaar-shortlisted-best-run-mosque-2021/",
    category: "Best Run Mosque",
  },
  {
    title: "MCEC Palmers Green - Shortlisted - Best Run Mosque 2021",
    href: "/mcec-palmers-green-shortlisted-best-run-mosque-2021/",
    category: "Best Run Mosque",
  },
  {
    title: "The Emaan Trust - Shortlisted - Best Youth Service 2021",
    href: "/the-emaan-trust-shortlisted-best-youth-service-2021/",
    category: "Best Youth Service",
  },
  {
    title: "Al Manaar - Shortlisted - Best Youth Service 2021",
    href: "/al-manaar-shortlisted-best-youth-service-2021/",
    category: "Best Youth Service",
  },
  {
    title: "Lantern Academy - Shortlisted - Best Youth Service 2021",
    href: "/lantern-academy-shortlisted-best-youth-service-2021/",
    category: "Best Youth Service",
  },
  {
    title:
      "Aisha Mosque & Islamic Centre - Shortlisted - Best Youth Service 2021",
    href: "/aisha-mosque-islamic-centre-shortlisted-best-youth-service-2021/",
    category: "Best Youth Service",
  },
  {
    title: "Muhammadi Madrasah - Shortlisted - Best Madrassah Service 2021",
    href: "/muhammadi-madrasah-shortlisted-best-madrassah-service-2021/",
    category: "Best Madrassah Service",
  },
  {
    title: "Lantern Academy - Shortlisted - Best Madrassah Service 2021",
    href: "/lantern-academy-shortlisted-best-madrassah-service-2021/",
    category: "Best Madrassah Service",
  },
  {
    title: "Al-Mustafa Centre - Shortlisted - Best Madrassah Service 2021",
    href: "/al-mustafa-centre-shortlisted-best-madrassah-service-2021/",
    category: "Best Madrassah Service",
  },
  {
    title: "Finsbury Park Mosque - Shortlisted - Best Women's Service 2021",
    href: "/finsbury-park-mosque-shortlisted-best-womens-service-2021/",
    category: "Best Women's Service",
  },
  {
    title: "Rumi's Cave - Shortlisted - Best Women's Service 2021",
    href: "/rumis-cave-shortlisted-best-womens-service-2021/",
    category: "Best Women's Service",
  },
  {
    title:
      "Muslimah Education Center & Arrahman Mosque Women's Forum - Shortlisted - Best Women's Service 2021",
    href: "/muslimah-education-center-arrahman-mosque-womens-forum-shortlisted-best-womens-service-2021/",
    category: "Best Women's Service",
  },
  {
    title: "Three Meem Foundation - Shortlisted - Best Women's Service 2021",
    href: "/three-meem-foundation-shortlisted-best-womens-service-2021/",
    category: "Best Women's Service",
  },
  {
    title: "Sheikh Nuru Mohammed - Shortlisted - Most Impactful Imam 2021",
    href: "/sheikh-nuru-mohammed-shortlisted-most-impactful-imam-2021/",
    category: "Most Impactful Imam",
  },
  {
    title: "Imam Is'Haaq Jasat - Shortlisted - Most Impactful Imam 2021",
    href: "/imam-ishaaq-shortlisted-most-impactful-imam-2021/",
    category: "Most Impactful Imam",
  },
  {
    title: "Musharraf Hussain - Shortlisted - Most Impactful Imam 2021",
    href: "/musharraf-hussain-shortlisted-most-impactful-imam-2021/",
    category: "Most Impactful Imam",
  },
  {
    title: "Adam Kelwick - Shortlisted - Most Impactful Imam 2021",
    href: "/adam-kelwick-shortlisted-most-impactful-imam-2021/",
    category: "Most Impactful Imam",
  },
  {
    title:
      "Sr Sherifat Muhammad Kamal - Shortlisted - Most Impactful Alimah 2021",
    href: "/sr-sherifat-muhammad-kamal-shortlisted-most-impactful-alimah-2021/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Maysoon Shafiq - Shortlisted - Most Impactful Alimah 2021",
    href: "/maysoon-shafiq-shortlisted-most-impactful-alimah-2021/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Ustadhah Misba Khan - Shortlisted - Most Impactful Alimah 2021",
    href: "/ustadhah-misba-khan-shortlisted-most-impactful-alimah-2021/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Ustadhah Nagheba - Shortlisted - Most Impactful Alimah 2021",
    href: "/ustadhah-nagheba-shortlisted-most-impactful-alimah-2021/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Al-Rahma Mosque - Shortlisted - Best Outreach Service 2021",
    href: "/al-rahma-mosque-shortlisted-best-outreach-service-2021/",
    category: "Best Outreach Service",
  },
  {
    title: "Al-Abbas Islamic Centre - Shortlisted - Best Outreach Service 2021",
    href: "/al-abbas-islamic-centre-shortlisted-best-outreach-service-2021/",
    category: "Best Outreach Service",
  },
  {
    title:
      "The Mosque and Islamic Centre of Brent - Shortlisted - Best Outreach Service 2021",
    href: "/the-mosque-and-islamic-centre-of-brent-shortlisted-best-outreach-service-2021/",
    category: "Best Outreach Service",
  },
  {
    title:
      "Jamiyat Tabligh-ul-Islam Bradford Central Mosque - Shortlisted - Best Outreach Service 2021",
    href: "/jamiyat-tabligh-ul-islam-bradford-central-mosque-shortlisted-best-outreach-service-2021/",
    category: "Best Outreach Service",
  },
  {
    title: "Hockwell Ring Masjid - Shortlisted - Best Elderly Service 2021",
    href: "/hockwell-ring-masjid-shortlisted-best-elderly-service-2021/",
    category: "Best Elderly Service",
  },
  {
    title: "The Muath Trust - Shortlisted - Best Elderly Service 2021",
    href: "/the-muath-trust-shortlisted-best-elderly-service-2021/",
    category: "Best Elderly Service",
  },
  {
    title: "Jamia Masjid Bilal - Shortlisted - Best Green Initiative 2021",
    href: "/jamia-masjid-bilal-shortlisted-best-green-initiative-2021/",
    category: "Best Green Initiative",
  },
  {
    title: "Easton Mosque - Shortlisted - Best Green Initiative 2021",
    href: "/eastside-community-trust-shortlisted-best-green-initiative-2021/",
    category: "Best Green Initiative",
  },
  {
    title: "Minhaj-Ul-Quran - Shortlisted - Most Innovative Service 2021",
    href: "/minhaj-ul-quran-shortlisted-most-innovative-service-2021/",
    category: "Most Innovative Service",
  },
  {
    title:
      "Al Madina Mosque Barking - Shortlisted - Most Innovative Service 2021",
    href: "/al-madina-mosque-barking-shortlisted-most-innovative-service-2021/",
    category: "Most Innovative Service",
  },
  {
    title:
      "Central Mosque of Brent - Shortlisted - Most Innovative Service 2021",
    href: "/central-mosque-of-brent-shortlisted-best-innovative-service-2021/",
    category: "Most Innovative Service",
  },
  {
    title: "Rumi Mosque - Shortlisted - Most Innovative Service 2021",
    href: "/rumi-mosque-shortlisted-best-innovative-service-2021/",
    category: "Most Innovative Service",
  },
  {
    title:
      "Old Kent Road Mosque and Islamic Cultural Centre - Shortlisted - Best Future Design 2021",
    href: "/old-kent-road-mosque-and-islamic-cultural-centre-shortlisted-best-future-design-2021/",
    category: "Best Future Design",
  },
  {
    title: "Newcastle Central Mosque - Shortlisted Best Future Design 2021",
    href: "/broughton-mosque-designed-by-luca-poian-shortlisted-best-future-design-2021/",
    category: "Best Future Design",
  },
  {
    title: "Al-Mustafa Centre - Shortlisted - Best Future Design 2021",
    href: "/al-mustafa-centre-shortlisted-best-future-design-2021/",
    category: "Best Future Design",
  },
].map((profile) => ({
  ...profile,
  status: "Shortlisted",
  summary: `A shortlisted profile in the 2021 ${profile.category} category.`,
}));

const awardRecognitionCards2021: CardLink[] = awardRecognitionProfiles2021.map(
  (profile) => ({
    title: profile.title,
    text: profile.summary,
    href: profile.href,
    meta: profile.status,
  }),
);

const awardVoteCards2021: CardLink[] = awardVotePages2021.map((page) => ({
  title: page.title,
  text: `Voting page for the 2021 ${page.category} category.`,
  href: page.href,
  meta: "2021 vote",
}));

const awardResultCards2021: CardLink[] = awardResultPages2021.map((page) => ({
  title: page.title,
  text: `Results page for the 2021 ${page.category} category.`,
  href: page.href,
  meta: "2021 results",
}));

const awardCategoryPages2020 = [
  { title: "Best Run Mosque", href: "/best-run-mosque/" },
  { title: "Best Youth Service", href: "/best-youth-service-vote-now/" },
  {
    title: "Best Madrassah Service",
    href: "/best-madrassah-service-vote-now/",
  },
  { title: "Best Women's Service", href: "/best-womens-service-vote-now/" },
  { title: "Most Impactful Imam", href: "/most-impactful-imam-vote-now/" },
  { title: "Most Impactful Alimah", href: "/most-impactful-alimah/" },
  { title: "Best Outreach Service", href: "/best-outreach-service-vote-now/" },
  { title: "Best Elderly Service", href: "/best-elderly-service-vote-now/" },
  { title: "Best Green Initiative", href: "/best-green-initiative-vote-now/" },
  {
    title: "Most Innovative Service",
    href: "/most-innovative-service-vote-now/",
  },
  {
    title: "Best Mosque COVID-19 Response",
    href: "/best-mosque-covid-19-response/",
  },
  { title: "Best Volunteer", href: "/best-volunteer/" },
];

const awardCategoryHref2020 = Object.fromEntries(
  awardCategoryPages2020.map((category) => [category.title, category.href]),
);

const awardVotePages2020 = [
  {
    title: "Best Run Mosque - Vote Now",
    href: "/best-run-mosque-vote-now/",
    category: "Best Run Mosque",
  },
  {
    title: "Best Youth Service - Vote Now",
    href: "/best-youth-service-vote-now/",
    category: "Best Youth Service",
  },
  {
    title: "Best Madrassah Service - Vote Now",
    href: "/best-madrassah-service-vote-now/",
    category: "Best Madrassah Service",
  },
  {
    title: "Best Women's Service - Vote Now",
    href: "/best-womens-service-vote-now/",
    category: "Best Women's Service",
  },
  {
    title: "Most Impactful Imam - Vote Now",
    href: "/most-impactful-imam-vote-now/",
    category: "Most Impactful Imam",
  },
  {
    title: "Most Impactful Alimah - Vote Now",
    href: "/most-impactful-alimah-vote-now/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Best Outreach Service - Vote Now",
    href: "/best-outreach-service-vote-now/",
    category: "Best Outreach Service",
  },
  {
    title: "Best Elderly Service - Vote Now",
    href: "/best-elderly-service-vote-now/",
    category: "Best Elderly Service",
  },
  {
    title: "Best Green Initiative - Vote Now",
    href: "/best-green-initiative-vote-now/",
    category: "Best Green Initiative",
  },
  {
    title: "Most Innovative Service - Vote Now",
    href: "/most-innovative-service-vote-now/",
    category: "Most Innovative Service",
  },
  {
    title: "COVID-19 Response - Vote Now",
    href: "/covid-19-response-vote-now/",
    category: "Best Mosque COVID-19 Response",
  },
];

const awardProgrammePages2020 = [
  {
    title:
      "Atelier UWA Architects - Sponsoring the 3rd British Beacon Mosque Awards 2020",
    href: "/atelier-uwa-architects-sponsoring-the-3rd-british-beacon-mosque-awards-2020/",
    meta: "2020 sponsor",
  },
  {
    title: "3rd British Beacon Mosque Awards Judges Panel",
    href: "/3rd-british-beacon-mosque-awards-judges-panel/",
    meta: "2020 judges",
  },
];

const awardRecognitionProfiles2020 = [
  {
    title: "MKSI Leicester - Shortlisted Best Run Mosque 2020",
    href: "/mksi-leicester-shortlisted-best-run-mosque/",
    category: "Best Run Mosque",
  },
  {
    title: "ASCC - Shortlisted Best Run Mosque 2020",
    href: "/ascc-shortlisted-best-run-mosque/",
    category: "Best Run Mosque",
  },
  {
    title: "Minhaj Ul Quran - Shortlisted Best Run Mosque",
    href: "/minhaj-ul-quran-shortlisted-best-run-mosque/",
    category: "Best Run Mosque",
  },
  {
    title: "Green Lane Masjid - Shortlisted Best Run Mosque 2020",
    href: "/green-lane-mosque-shortlisted-best-run-mosque/",
    category: "Best Run Mosque",
  },
  {
    title: "Al Madina Mosque Barking London - Shortlisted Best Run Mosque 2020",
    href: "/al-madina-mosque-shortlisted-best-run-mosque-2/",
    category: "Best Run Mosque",
  },
  {
    title: "Shortlisted Best Youth Service - Hayes Muslim Centre",
    href: "/shortlisted-best-youth-service-hayes-muslim-centre/",
    category: "Best Youth Service",
  },
  {
    title: "Khizra Mosque - Shortlisted Best Youth Service",
    href: "/khizra-mosque-shortlisted-best-youth-service/",
    category: "Best Youth Service",
  },
  {
    title: "3 Meem Foundation - Shortlisted Best Youth Service",
    href: "/3-meem-foundation-shortlisted-best-youth-service/",
    category: "Best Youth Service",
  },
  {
    title: "Bahu Trust - Shortlisted Best Youth Service",
    href: "/bahu-trust-shortlisted-best-youth-service/",
    category: "Best Youth Service",
  },
  {
    title: "Guidance Hub - Shortlisted Mosque Best Madrassah Service",
    href: "/guidance-hub-shortlisted-mosque-best-madrassah-service-2/",
    category: "Best Madrassah Service",
  },
  {
    title: "Lantern Academy - Shortlisted Best Madrassah Service 2020",
    href: "/lantern-academy-shortlisted-best-madrassah-service/",
    category: "Best Madrassah Service",
  },
  {
    title: "Al Hira - Shortlisted Mosque for Best Madrassah Service 2020",
    href: "/al-hira-shortlisted-mosque-for-best-madrassah-service/",
    category: "Best Madrassah Service",
  },
  {
    title: "LICS - Shortlisted Mosque for Best Madrassah Service",
    href: "/lics-shortlisted-mosque-for-best-madrassah-service/",
    category: "Best Madrassah Service",
  },
  {
    title: "Guidance Hub - Shortlisted Mosque Best Madrassah Service 2020",
    href: "/guidance-hub-shortlisted-mosque-best-madrassah-service/",
    category: "Best Madrassah Service",
  },
  {
    title: "JMIC - Shortlisted Best Women's Service",
    href: "/jmic-shortlisted-best-womens-service/",
    category: "Best Women's Service",
  },
  {
    title: "ASCC - Shortlisted Best Women's Service",
    href: "/ascc-shortlisted-best-womens-service/",
    category: "Best Women's Service",
  },
  {
    title: "Guidance Hub - Shortlisted Best Women's Service",
    href: "/guidance-hub-shortlisted-best-womens-service/",
    category: "Best Women's Service",
  },
  {
    title: "Shortlisted Most Impactful Imam - Shaykh Rizwan",
    href: "/shortlisted-most-impactful-imam-shaykh-rizwan/",
    category: "Most Impactful Imam",
  },
  {
    title: "Shaykh Aslam - Shortlisted Most Impactful Imam",
    href: "/shaykh-aslam-shortlisted-most-impactful-imam/",
    category: "Most Impactful Imam",
  },
  {
    title: "Imam Ijaz Shami - Shortlisted Most Impactful Imam",
    href: "/imam-ijaz-shami-shortlisted-most-impactful-imam/",
    category: "Most Impactful Imam",
  },
  {
    title: "Shaykh Mansoor - Shortlisted Most Impactful Imam",
    href: "/shaykh-mansoor-shortlisted-most-impactful-imam/",
    category: "Most Impactful Imam",
  },
  {
    title: "Shaykh Rafiq Sufi - Shortlisted Most Impactful Imam",
    href: "/shaykh-rafiq-sufi-shortlisted-most-impactful-imam/",
    category: "Most Impactful Imam",
  },
  {
    title: "Shaykh Mufti Razza - Shortlisted Most Impactful Imam",
    href: "/shaykh-mufti-razza-shortlisted-most-impactful-imam/",
    category: "Most Impactful Imam",
  },
  {
    title: "Ustadah Sidra Ahmed - Shortlisted Most Impactful Alimah",
    href: "/ustadah-sidra-ahmed-shortlisted-most-impactful-alimah/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Ustadah Rukhia Bi - Most Impactful Alimah",
    href: "/ustadah-rukhia-bi-most-impactful-alimah/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Noshin Gul - Most Impactful Alimah",
    href: "/noshin-gul-most-impactful-alimah/",
    category: "Most Impactful Alimah",
  },
  {
    title: "Maidenhead Mosque - Shortlisted Best Outreach Programme",
    href: "/maidenhead-mosque-shortlisted-best-outreach-programme/",
    category: "Best Outreach Service",
  },
  {
    title: "Bahu Trust - Shortlisted Best Outreach Service",
    href: "/bahu-trust-shortlisted-best-outreach-service/",
    category: "Best Outreach Service",
  },
  {
    title: "Masjid Al Falaah - Shortlisted Best Outreach Programme",
    href: "/masjid-al-falaah-shortlisted-best-outreach-programme/",
    category: "Best Outreach Service",
  },
  {
    title: "WISE Mosque - Shortlisted Best Elderly Service",
    href: "/wise-mosque-shortlisted-best-elderly-service/",
    category: "Best Elderly Service",
  },
  {
    title: "Worthing Mosque - Shortlisted Best Elderly Service",
    href: "/worthing-mosque-shortlisted-best-elderly-service/",
    category: "Best Elderly Service",
  },
  {
    title: "Glasgow Mosque - Shortlisted Best Elderly Service",
    href: "/glasgow-mosque-shortlisted-best-elderly-service/",
    category: "Best Elderly Service",
  },
  {
    title: "York Mosque - Shortlisted Best Green Initiative",
    href: "/york-mosque-shortlisted-best-green-initiative/",
    category: "Best Green Initiative",
  },
  {
    title: "Khizra Mosque - Best Green Initiative Shortlist",
    href: "/khizra-mosque-best-green-initiative-shortlist/",
    category: "Best Green Initiative",
  },
  {
    title: "Al Madina Mosque - Shortlisted Best Green Initiative",
    href: "/al-madina-mosque-shortlisted-best-green-initiative/",
    category: "Best Green Initiative",
  },
  {
    title: "Al Markaz Ul Islami - Shortlisted Most Innovative Service",
    href: "/al-markaz-ul-islami-shortlisted-most-innovative-service/",
    category: "Most Innovative Service",
  },
  {
    title: "Khizra Mosque - Shortlisted Most Innovative Service",
    href: "/khizra-mosque-shortlisted-most-innovative-service/",
    category: "Most Innovative Service",
  },
  {
    title: "Woking Mosque - Shortlisted COVID Response",
    href: "/woking-mosque-shortlisted-covid-response/",
    category: "Best Mosque COVID-19 Response",
  },
  {
    title: "Masjid Al Falaah - COVID Response",
    href: "/masjid-al-falaah-covid-response/",
    category: "Best Mosque COVID-19 Response",
  },
  {
    title: "East London Mosque - Shortlisted COVID Response",
    href: "/east-london-mosque-shortlisted-covid-response/",
    category: "Best Mosque COVID-19 Response",
  },
  {
    title: "Finsbury Park Mosque - Best COVID-19 Response",
    href: "/finsbury-park-mosque-covid-response/",
    category: "Best Mosque COVID-19 Response",
  },
  {
    title: "Green Lane Mosque - COVID Response 2020",
    href: "/green-lane-mosque-covid-response/",
    category: "Best Mosque COVID-19 Response",
  },
].map((profile) => ({
  ...profile,
  status: "Shortlisted",
  summary: `A shortlisted profile in the 2020 ${profile.category} category.`,
}));

const awardRecognitionCards2020: CardLink[] = awardRecognitionProfiles2020.map(
  (profile) => ({
    title: profile.title,
    text: profile.summary,
    href: profile.href,
    meta: profile.status,
  }),
);

const awardVoteCards2020: CardLink[] = awardVotePages2020.map((page) => ({
  title: page.title,
  text: `Voting page for the 2020 ${page.category} category.`,
  href: page.href,
  meta: "2020 vote",
}));

const awardProgrammeCards2020: CardLink[] = awardProgrammePages2020.map(
  (page) => ({
    title: page.title,
    text: `Programme information from the third Beacon Mosque Awards cycle.`,
    href: page.href,
    meta: page.meta,
  }),
);

const awardStoryPages2019 = [
  {
    title:
      "Turkey President Tayyip Erdogan attends opening of 2019 Beacon Mosque Winner in Cambridge",
    href: "/blog/turkey-president-tayyip-erdogan-attends-opening-of-2019-beacon-mosque-winner-in-cambridge/",
    summary:
      "A 2019 Beacon Mosque winner story connected to the opening of Cambridge Central Mosque.",
    meta: "2019 winner story",
  },
  {
    title:
      "1000 registered to attend Mosque Expo & 2nd Beacon Mosque Awards 2019",
    href: "/blog/1000-registered-to-attend-mosque-expo-2nd-beacon-mosque-awards-2019/",
    summary:
      "A programme story for Mosque Expo and the second British Beacon Mosque Awards in 2019.",
    meta: "2019 programme",
  },
  {
    title: "Mevlana Rumi Mosque's journey to becoming a Beacon Mosque",
    href: "/news/mevlana-rumi-mosques-journey-to-becoming-a-beacon-mosque/",
    summary:
      "A recognition story following Mevlana Rumi Mosque's journey as one of the early Beacon Mosque award recipients.",
    meta: "Beacon mosque story",
  },
  {
    title:
      "First Mosques in the UK awarded Beacon Mosque awarded plaques of excellence",
    href: "/uncategorized/first-mosques-in-the-uk-awarded-beacon-mosque-awarded-plaques-of-excellence/",
    summary:
      "A historic recognition story about the first mosques receiving Beacon Mosque plaques of excellence.",
    meta: "Recognition story",
  },
];

const awardStoryCards2019: CardLink[] = awardStoryPages2019.map((story) => ({
  title: story.title,
  text: story.summary,
  href: story.href,
  meta: story.meta,
}));

const awardStoryPages2018 = [
  {
    title:
      "Wessex Jamat - Al Mahdi Centre nominated for Best Green Initiative at 2018 Beacon Mosque Awards",
    href: "/uncategorized/wessex-jamat-al-mahdi-centre-nominated-for-best-green-initiative-at-2018-beacon-mosque-awards/",
    summary:
      "A founding-year nomination story in the 2018 Best Green Initiative category.",
    meta: "2018 nomination",
  },
  {
    title:
      "Mevlana Rumi Mosque wins Best Charity Project at 2018 British Beacon Mosque Awards",
    href: "/blog/mevlana-rumi-mosque-wins-best-charity-project-at-2018-british-beacon-mosque-awards/",
    summary:
      "A 2018 winner story recognising Mevlana Rumi Mosque in the Best Charity Project category.",
    meta: "2018 winner",
  },
  {
    title:
      "Green Lane Mosque Nominated for Best Charity Project at 2018 Beacon Mosque Awards",
    href: "/blog/green-lane-mosque-nominated-for-best-charity-project-at-2018-beacon-mosque-awards/",
    summary: "A 2018 nomination story in the Best Charity Project category.",
    meta: "2018 nomination",
  },
  {
    title:
      "Al Madina Mosque Nominated For Best Charity Project at 2018 British Beacon Mosque Awards",
    href: "/blog/al-madina-mosque-nominated-for-best-charity-project-at-2018-british-beacon-mosque-awards/",
    summary:
      "A 2018 nomination story recognising Al Madina Mosque's charity work.",
    meta: "2018 nomination",
  },
  {
    title:
      "Wirral Deen Centre Nominated For Best Innovative Service at 2018 British Beacon Mosque Awards",
    href: "/blog/wirral-deen-centre-nominated-for-best-innovative-service-at-2018-british-beacon-mosque-awards/",
    summary: "A 2018 nomination story in the Best Innovative Service category.",
    meta: "2018 nomination",
  },
  {
    title:
      "Khizra Mosque nominated for best Innovative Service at Beacon Mosque Awards 2018",
    href: "/blog/khizra-mosque-nominated-for-best-innovative-service-at-beacon-mosque-awards-2018/",
    summary:
      "A 2018 nomination story recognising Khizra Mosque's innovative service work.",
    meta: "2018 nomination",
  },
  {
    title:
      "Madina institute win Best Innovative Service at 2018 British Beacon Mosque Awards",
    href: "/blog/madina-institute-win-best-innovative-service-at-2018-british-beacon-mosque-awards/",
    summary: "A 2018 winner story in the Best Innovative Service category.",
    meta: "2018 winner",
  },
  {
    title:
      "Rumi Mosque wins Best Charity Project at 2018 British Beacon Mosque Awards",
    href: "/blog/rumi-mosque-wins-best-charity-project-at-2018-british-beacon-mosque-awards/",
    summary:
      "A 2018 winner story recognising Rumi Mosque in the Best Charity Project category.",
    meta: "2018 winner",
  },
  {
    title:
      "Sultan Bahu Trust win Best Green Initiative at 2018 British Beacon Mosque Awards",
    href: "/blog/sultan-bahu-trust-win-best-green-initiative-at-2018-british-beacon-mosque-awards/",
    summary: "A 2018 winner story in the Best Green Initiative category.",
    meta: "2018 winner",
  },
  {
    title:
      "Wessex Jamaat wins Most Impactful Imam at 2018 British Beacon Mosque Awards",
    href: "/blog/wessex-jamaat-wins-most-impactful-imam-at-2018-british-beacon-mosque-awards/",
    summary: "A 2018 winner story in the Most Impactful Imam category.",
    meta: "2018 winner",
  },
  {
    title:
      "Khizra Mosque wins Best Womens Service at 2018 British Beacon Mosque Awards",
    href: "/blog/khizra-mosque-wins-best-womens-service-at-2018-british-beacon-mosque-awards/",
    summary: "A 2018 winner story in the Best Women's Service category.",
    meta: "2018 winner",
  },
  {
    title:
      "Finsbury Park wins Best Outreach Service at 2018 British Beacon Mosque Awards",
    href: "/blog/finsbury-park-wins-best-outreach-service-at-2018-british-beacon-mosque-awards/",
    summary: "A 2018 winner story in the Best Outreach Service category.",
    meta: "2018 winner",
  },
  {
    title:
      "Hayes Muslim Centre win Best Elderly Service at 2018 British Beacon Mosque Awards",
    href: "/uncategorized/hayes-muslim-centre-win-best-elderly-service-at-2018-british-beacon-mosque-awards/",
    summary: "A 2018 winner story in the Best Elderly Service category.",
    meta: "2018 winner",
  },
  {
    title:
      "Rumi Mosque wins Best Madrassah Service at 2018 British Beacon Mosque Awards",
    href: "/blog/rumi-mosque-wins-best-madrassah-service-at-2018-british-beacon-mosque-awards/",
    summary: "A 2018 winner story in the Best Madrassah Service category.",
    meta: "2018 winner",
  },
  {
    title:
      "Al Madina Mosque wins Best Youth Service 2018 at Beacon Mosque Awards",
    href: "/blog/al-madina-mosque-wins-best-youth-service-2018-at-beacon-mosque-awards/",
    summary: "A 2018 winner story in the Best Youth Service category.",
    meta: "2018 winner",
  },
  {
    title:
      "Al Manaar wins Britain's Best Run Mosque at 2018 British Beacon Mosque Awards",
    href: "/blog/al-manaar-wins-britains-best-run-mosque-of-2018-award/",
    summary: "A 2018 winner story in the Best Run Mosque category.",
    meta: "2018 winner",
  },
];

const awardStoryCards2018: CardLink[] = awardStoryPages2018.map((story) => ({
  title: story.title,
  text: story.summary,
  href: story.href,
  meta: story.meta,
}));

const awardCategoryPages2018 = [
  {
    title: "Best Youth Service",
    href: "/best-youth-service/",
    keywords: ["Best Youth Service"],
    summary:
      "Youth provision recognised in the first British Beacon Mosque Awards cycle.",
  },
  {
    title: "Best Madrassah Service",
    href: "/best-madrassah-project/",
    keywords: ["Best Madrassah Service", "Madrassah"],
    summary:
      "Madrassah teaching, learning and pastoral service from the founding awards year.",
  },
  {
    title: "Best Elderly Service",
    href: "/best-elderly-service/",
    keywords: ["Best Elderly Service"],
    summary:
      "Recognition for mosque support, dignity and care for older community members.",
  },
  {
    title: "Best Outreach Service",
    href: "/best-outrech-programme/",
    keywords: ["Best Outreach Service", "Outreach"],
    summary:
      "Outreach and public-facing service recognised in the 2018 awards archive.",
  },
  {
    title: "Best Women's Service",
    href: "/best-womens-service/",
    keywords: [
      "Best Womens Service",
      "Best Women's Service",
      "Women's Service",
    ],
    summary:
      "Women's provision and community service from the first Beacon Mosque Awards.",
  },
  {
    title: "Most Impactful Imam",
    href: "/most-impactful-imam/",
    keywords: ["Most Impactful Imam"],
    summary:
      "Leadership, scholarship and community impact recognised in the 2018 awards cycle.",
  },
  {
    title: "Best Green Initiative",
    href: "/best-green-initiative/",
    keywords: ["Best Green Initiative"],
    summary:
      "Environmental responsibility and sustainability initiatives from the founding year.",
  },
  {
    title: "Best Charity Project",
    href: "/best-charity-project/",
    keywords: ["Best Charity Project"],
    summary:
      "Charitable service and practical community support recognised in 2018.",
  },
  {
    title: "Most Innovative Service",
    href: "/most-innovative-service/",
    keywords: [
      "Best Innovative Service",
      "Most Innovative Service",
      "Innovative Service",
    ],
    summary:
      "Creative service models and new approaches from the first awards cycle.",
  },
];

const awardCategoryCards2018: CardLink[] = awardCategoryPages2018.map(
  (category) => ({
    ...(getAwardCategoryMedia(category.title) ?? {}),
    title: category.title,
    text: category.summary,
    href: category.href,
    meta: "2018 category",
  }),
);

const awardCategoryCardsForYear = (year: string): CardLink[] => {
  if (year === "2018") {
    return awardCategoryCards2018;
  }

  return (
    year === "2024"
      ? awardCategoryPages2024.map((category) => category.title)
      : year === "2023"
        ? awardCategoryPages2023.map((category) => category.title)
        : year === "2022"
          ? awardCategoryPages2022.map((category) => category.title)
          : year === "2021"
            ? [
                ...awardCategoryPages2021.map((category) => category.title),
                "Best Future Design",
              ]
            : year === "2020"
              ? awardCategoryPages2020.map((category) => category.title)
              : awardCategories
  ).map((title) => ({
    ...(getAwardCategoryMedia(title) ?? {}),
    title,
    text: `Recognised as part of the Beacon Mosque Awards ${year} programme.`,
    href:
      year === "2025"
        ? awardCategoryHref2025[title]
        : year === "2024"
          ? awardCategoryHref2024[title]
          : year === "2023"
            ? awardCategoryHref2023[title]
            : year === "2022"
              ? awardCategoryHref2022[title]
              : year === "2021"
                ? awardCategoryHref2021[title]
                : year === "2020"
                  ? awardCategoryHref2020[title]
                  : (awardArchiveHrefByYear[year] ??
                    `/awards/beacon-mosque-awards-${year}/`),
    meta: `${year} category`,
  }));
};

const normalizeAwardCategory = (value: string) =>
  value
    .toLowerCase()
    .replace(/^(best|most)\s+/g, "")
    .replace(/services/g, "service")
    .replace(/programme/g, "service")
    .replace(/program/g, "service")
    .replace(/womens/g, "women's")
    .replace(/innovative/g, "innovation")
    .replace(/\s+/g, " ")
    .trim();

const findWinnerCardsForOtherYears = (
  category: string,
  currentYear?: string,
): CardLink[] => {
  const normalizedCategory = normalizeAwardCategory(category);
  const winnerCardsByYear = [
    { year: "2025", cards: winnerCards2025 },
    { year: "2024", cards: winnerCards2024 },
    { year: "2023", cards: winnerCards2023 },
    { year: "2022", cards: winnerCards2022 },
    { year: "2021", cards: winnerCards2021 },
  ];

  return winnerCardsByYear
    .filter(({ year }) => year !== currentYear)
    .flatMap(({ year, cards }) =>
      cards
        .filter(
          (card) =>
            card.meta &&
            normalizeAwardCategory(card.meta) === normalizedCategory,
        )
        .map((card) => ({
          ...card,
          meta: `${year} winner`,
        })),
    );
};

const slugifyLegacyWinnerValue = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const legacyWinnerProfileHref = (
  year: string,
  category: string,
  title: string,
) =>
  `/winners/${year}/${slugifyLegacyWinnerValue(category)}-${slugifyLegacyWinnerValue(title)}/`;

const awardProgrammeFunding =
  "The Beacon Mosque initiative and British Beacon Mosque Awards were established in 2018 after a decade-long process of research and development. The programme has been supported by Muslim philanthropy, donations, lillah and sponsorship, with deep gratitude to the well-wishers and supporters who have helped strengthen mosques and the communities they serve.";

const awardsArchiveYears = [
  {
    year: "2026",
    sequence: "9th",
    href: "/awards/beacon-mosque-awards-2026/",
    text: "Current 2026 Beacon Mosque Awards page covering the ninth awards cycle, nominations and programme details.",
  },
  {
    year: "2025",
    sequence: "8th",
    href: "/awards/beacon-mosque-awards-2025/",
    text: "Official 2025 awards archive with booklet access and the award categories recognised at the ceremony.",
  },
  {
    year: "2024",
    sequence: "7th",
    href: "/awards/awards2024/",
    text: "Historic 2024 archive for the seventh Beacon Mosque Awards cycle.",
  },
  {
    year: "2023",
    sequence: "6th",
    href: "/awards/awards2023/",
    text: "Historic 2023 archive for the sixth Beacon Mosque Awards cycle.",
  },
  {
    year: "2022",
    sequence: "5th",
    href: "/awards/british-beacon-mosque-awards-2022/",
    text: "Historic 2022 archive for the fifth Beacon Mosque Awards cycle.",
  },
  {
    year: "2021",
    sequence: "4th",
    href: "/british-beacon-mosque-awards-2021/",
    text: "Historic 2021 archive for the fourth Beacon Mosque Awards cycle.",
  },
  {
    year: "2020",
    sequence: "3rd",
    href: "/2020-british-beacon-mosque-awards/",
    text: "Historic 2020 archive for the third Beacon Mosque Awards cycle.",
  },
  {
    year: "2019",
    sequence: "2nd",
    href: "/awards/2019-british-beacon-mosque-awards/",
    text: "Historic 2019 archive for the second Beacon Mosque Awards cycle.",
  },
  {
    year: "2018",
    sequence: "1st",
    href: "/awards/2018-british-beacon-mosque-awards/",
    text: "Founding 2018 archive marking the first British Beacon Mosque Awards cycle.",
  },
];

const awardArchiveHrefByYear = Object.fromEntries(
  awardsArchiveYears.map(({ year, href }) => [year, href]),
);

const awardsArchive: CardLink[] = awardsArchiveYears.map(
  ({ year, sequence, href, text }) => ({
    title: `${sequence} Beacon Mosque Awards ${year}`,
    text,
    href,
    meta: year === "2025" ? "Booklet" : "Awards archive",
  }),
);

const historicAwardArchiveDetails: Record<
  string,
  {
    sequence: string;
    intro: string;
    paragraphs: string[];
  }
> = {
  "2024": {
    sequence: "7th",
    intro:
      "The 7th Beacon Mosque Awards 2024 archive preserves a completed awards cycle celebrating mosque excellence across the UK.",
    paragraphs: [
      "The 2024 awards cycle continued the Beacon Mosque tradition of recognising mosques, madrassahs, imams, alimahs and volunteers whose work strengthens worshippers, families and neighbourhoods.",
      "This archive keeps the seventh awards year available as part of the wider Beacon Mosque Awards history, alongside the categories used to recognise excellent service.",
      awardProgrammeFunding,
    ],
  },
  "2023": {
    sequence: "6th",
    intro:
      "The 6th Beacon Mosque Awards 2023 archive records a landmark awards year for mosque leadership, service and future design.",
    paragraphs: [
      "The 2023 awards brought together mosque leaders, imams, alimahs, volunteers and community organisations to celebrate outstanding work delivered by mosques across the country.",
      "This archive keeps the sixth awards year available for visitors following award stories, category recognition and the continuing history of the British Beacon Mosque Awards.",
      awardProgrammeFunding,
    ],
  },
  "2022": {
    sequence: "5th",
    intro:
      "The 5th Beacon Mosque Awards 2022 archive preserves the fifth annual celebration of excellent mosque service.",
    paragraphs: [
      "The 2022 awards cycle recognised the institutions and people improving mosque governance, education, youth provision, outreach, facilities and community support.",
      "This archive keeps the fifth awards year available as a reference point in the Beacon Mosque Awards journey from its founding programme to the current national awards platform.",
      awardProgrammeFunding,
    ],
  },
  "2021": {
    sequence: "4th",
    intro:
      "The 4th Beacon Mosque Awards 2021 archive preserves a year of recognition for mosques and community leaders.",
    paragraphs: [
      "The 2021 awards cycle highlighted the continuing impact of mosque teams, scholars, educators and volunteers delivering essential service for their communities.",
      "This archive keeps the fourth awards year available and connects the historic awards programme with wider Beacon Mosque recognition work.",
      awardProgrammeFunding,
    ],
  },
  "2020": {
    sequence: "3rd",
    intro:
      "The 3rd Beacon Mosque Awards 2020 archive preserves an important awards cycle in the programme's early national growth.",
    paragraphs: [
      "The 2020 awards cycle continued to recognise strong mosque practice across service, leadership, education, facilities, outreach and volunteer contribution.",
      "This archive keeps the third awards year available as part of the Beacon Mosque Awards record and the programme's ongoing commitment to quality standards.",
      awardProgrammeFunding,
    ],
  },
  "2019": {
    sequence: "2nd",
    intro:
      "The 2nd Beacon Mosque Awards 2019 archive preserves the second annual awards cycle after the programme's launch.",
    paragraphs: [
      "The 2019 awards cycle built on the first British Beacon Mosque Awards by recognising mosque teams and community contributors working toward excellent service.",
      "This archive keeps the second awards year available for visitors exploring the development of the Beacon Mosque Awards and its recognition categories.",
      awardProgrammeFunding,
    ],
  },
  "2018": {
    sequence: "1st",
    intro:
      "The 1st Beacon Mosque Awards 2018 archive marks the founding year of the British Beacon Mosque Awards.",
    paragraphs: [
      "The 2018 awards cycle launched the public awards programme after years of research and development into mosque quality, management and community service.",
      "This archive keeps the founding awards year available as the starting point for the Beacon Mosque Awards history and the accreditation-focused work that followed.",
      awardProgrammeFunding,
    ],
  },
};

const planAudioResources = [
  {
    title: "What is the vision?",
    subtitle: "Beacon Mosque 2020-2050 / 30 Year Plan audio resource.",
    src: "https://beaconmosque.com/wp-content/uploads/2019/02/AUDIO-2020-08-24-02-24-03.m4a",
  },
  {
    title: "Spirituality",
    subtitle: "Beacon Mosque 2020-2050 / 30 Year Plan audio resource.",
    src: "https://beaconmosque.com/wp-content/uploads/2019/02/AUDIO-2020-08-24-02-24-14.m4a",
  },
  {
    title: "Safety",
    subtitle: "Beacon Mosque 2020-2050 / 30 Year Plan audio resource.",
    src: "https://beaconmosque.com/wp-content/uploads/2019/02/AUDIO-2020-08-24-02-24-14-2.m4a",
  },
  {
    title: "Sustainability",
    subtitle: "Beacon Mosque 2020-2050 / 30 Year Plan audio resource.",
    src: "https://beaconmosque.com/wp-content/uploads/2019/02/AUDIO-2020-08-24-02-24-15.m4a",
  },
];

const resourceCards: CardLink[] = [
  {
    title: "Beacon Mosque Awards 2025 Booklet",
    text: "8th British Beacon Mosque Awards 2025 booklet.",
    href: "https://faithassociates.co.uk/publications/8th-british-beacon-mosque-awards-2025-booklet/",
    meta: "Awards booklet",
  },
  {
    title: "Beacon Mosque Awards 2024 Booklet",
    text: "7th British Beacon Mosque Awards 2024 booklet.",
    href: "https://faithassociates.co.uk/publications/7th-british-beacon-mosque-awards-2024-booklet/",
    meta: "Awards booklet",
  },
  {
    title: "Beacon Mosque Awards 2023 Booklet",
    text: "6th British Beacon Mosque Awards 2023 booklet.",
    href: "https://faithassociates.co.uk/publications/6th-british-beacon-mosque-awards-2023-booklet/",
    meta: "Awards booklet",
  },
  {
    title: "Beacon Mosque Awards 2022 Booklet",
    text: "5th British Beacon Mosque Awards 2022 booklet.",
    href: "https://faithassociates.co.uk/publications/5th-british-beacon-mosque-awards-2022-booklet/",
    meta: "Awards booklet",
  },
  {
    title: "Beacon Mosque Awards 2021 Booklet",
    text: "4th British Beacon Mosque Awards 2021 booklet.",
    href: "https://faithassociates.co.uk/publications/4th-british-beacon-mosque-awards-2021-booklet/",
    meta: "Awards booklet",
  },
  {
    title: "Beacon Mosque Awards 2020 Booklet",
    text: "3rd British Beacon Mosque Awards 2020 booklet.",
    href: "https://faithassociates.co.uk/publications/3rd-british-beacon-mosque-awards-2020-booklet/",
    meta: "Booklet",
  },
  {
    title: "Mosque Open Day Guide",
    text: "Guidance for welcoming communities and strengthening public engagement.",
    href: "https://faithassociates.co.uk/publications/mosque-open-day-guide/",
    meta: "Guide",
  },
  {
    title: "Women in Mosque Management Guide",
    text: "Practical guidance for inclusive mosque leadership and management practice.",
    href: "https://faithassociates.co.uk/publications/muslim-womens-guide-to-mosque-governance-management-and-service-delivery/",
    meta: "Guide",
  },
  {
    title: "Mosque Management Guide",
    text: "Resources for governance, operations and quality improvement.",
    href: "https://faithassociates.co.uk/publications/mosque-management-toolkit/",
    meta: "Guide",
  },
];

type ReferenceArticle = {
  title: string;
  href: string;
  meta: string;
  summary: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  sourceLabel?: string;
};

const mosqueResourceArticles: ReferenceArticle[] = [
  {
    title: "Beacon Mosques 30 Year Vision 2020-2050",
    href: "/mosque-resources/beacon-mosques-30-year-vision-2020-2050/",
    meta: "Long-term vision",
    summary:
      "A long-range plan for mosques that looks toward spiritually grounded, safe and sustainable community institutions.",
    paragraphs: [
      "The Beacon Mosques 30 Year Vision sets out a long-term direction for mosques from 2020 to 2050, connecting mosque leadership with planning, service quality and community resilience.",
      "The vision encourages mosque teams to think beyond immediate operational needs and to build institutions that can serve worshippers, neighbours and future generations.",
      "Its themes include spirituality, safety, sustainability and the practical work needed to help mosques become trusted civic and community anchors.",
    ],
    image: "/assets/interior/standards-wide.jpg",
    imageAlt: "Beacon Mosque standards graphic",
    sourceLabel: "Vision guide",
  },
  {
    title: "Women in Mosque Management Guide",
    href: "/mosque-resources/women-in-mosque-management-guide/",
    meta: "Inclusive leadership",
    summary:
      "Guidance for improving women's participation in mosque governance, management and service delivery.",
    paragraphs: [
      "The Women in Mosque Management Guide supports mosque leadership teams that want to strengthen inclusive governance and improve access to services.",
      "The guide focuses on practical participation, including representation, consultation, facilities, programming and the management systems that help women contribute meaningfully to mosque life.",
      "It sits alongside the Beacon Mosque standards by encouraging accountable leadership, better communication and service design shaped by the full community.",
    ],
    image: "/assets/interior/about-hero.jpg",
    imageAlt: "Beacon Mosque interior architectural detail",
    sourceLabel: "Management guide",
  },
  {
    title: "Mosque Open Day Guide",
    href: "/mosque-resources/mosque-open-day-guide/",
    meta: "Community engagement",
    summary:
      "A practical guide for mosques hosting open days, welcoming visitors and building stronger local relationships.",
    paragraphs: [
      "The Mosque Open Day Guide helps mosque teams plan visitor experiences that are warm, organised and informative.",
      "Open days can strengthen relationships with neighbours, schools, civic partners and local faith groups by making mosque life easier to understand and approach.",
      "The guide supports preparation, volunteer roles, visitor flow, communication and follow-up so open days become part of wider community engagement rather than one-off events.",
    ],
    image: "/assets/interior/golden-mosque.jpg",
    imageAlt: "Mosque dome at sunset",
    sourceLabel: "Engagement guide",
  },
  {
    title: "Mosque Management Guide",
    href: "/mosque-resources/mosque-management-guide/",
    meta: "Governance toolkit",
    summary:
      "A governance and operations guide for mosque trustees, managers, imams, staff and volunteers.",
    paragraphs: [
      "The Mosque Management Guide supports the day-to-day and strategic responsibilities involved in running a mosque well.",
      "It brings together themes that align with the Beacon Mosque standards, including governance, policies, staffing, facilities, finance, communication and community development.",
      "The guide is designed for trustees, management teams, imams, staff and volunteers who want clear structures and better evidence of responsible service delivery.",
    ],
    image: "/assets/interior/standards-wide.jpg",
    imageAlt: "Beacon Mosque standards graphic",
    sourceLabel: "Management guide",
  },
];

const mosqueResourceCards: CardLink[] = mosqueResourceArticles.map(
  (article) => ({
    title: article.title,
    text: article.summary,
    href: article.href,
    meta: article.meta,
  }),
);

const allResourceCards: CardLink[] = [...resourceCards, ...mosqueResourceCards];

const galleryImages: GalleryImage[] = [
  {
    src: "/wp-content/uploads/2016/11/gallery-9.jpg",
    alt: "Beacon Mosque gallery image",
    title: "Community space",
  },
  {
    src: "/wp-content/uploads/2016/11/gallery-10.jpg",
    alt: "Beacon Mosque gallery image",
    title: "Gathering and service",
  },
  {
    src: "/wp-content/uploads/2016/11/gallery-11.jpg",
    alt: "Beacon Mosque gallery image",
    title: "Mosque environment",
  },
  {
    src: "/wp-content/uploads/2016/11/gallery-12.jpg",
    alt: "Beacon Mosque gallery image",
    title: "Welcoming spaces",
  },
];

const resilienceModes: CardLink[] = [
  {
    title: "Everyday",
    text: "A trusted point for preparedness messaging, community wellbeing and year-round support.",
    href: "/mosques-as-resilience-hubs/",
    meta: "Mode",
  },
  {
    title: "Disruption",
    text: "A place for gathering people, assessing impact, coordinating information and accessing resources.",
    href: "/mosques-as-resilience-hubs/",
    meta: "Mode",
  },
  {
    title: "Recovery",
    text: "A continuing space for information, support networks, volunteers and aid coordination.",
    href: "/mosques-as-resilience-hubs/",
    meta: "Mode",
  },
];

const resilienceExamples: CardLink[] = [
  "Responding to Floods",
  "Winter Support",
  "Emergency Support",
  "Food Banks",
  "Medical Support",
  "Community Gardens",
].map((title) => ({
  title,
  text: "A practical service example that helps mosques support community resilience.",
  href: "/mosques-as-resilience-hubs/",
  meta: "Example",
}));

const resilienceOptionCriteria = [
  {
    title: "Base",
    items: [
      "Strong community support and leadership.",
      "A site that is well trusted by the community.",
      "Buildings that can support community needs across everyday, disruption and recovery modes.",
      "Resilient energy systems, resilient communication systems and core programming co-developed with the community.",
    ],
  },
  {
    title: "Optimal",
    items: [
      "Meets the Base Hub criteria while adding wider services and resilience improvements.",
      "May include on-site water capture and filtration.",
      "May include air filtration systems, solar power with battery backup and community gardens.",
    ],
  },
  {
    title: "Ideal",
    items: [
      "Meets ambitious year-round goals developed with community members and partners.",
      "May include on-site greywater reuse and biophilic design standards.",
      "May include net zero energy and community solar benefits for the surrounding area.",
    ],
  },
];

const contactCards: CardLink[] = [
  {
    title: "Email Beacon Mosque",
    text: "Contact the team about accreditation, awards, resources or community excellence support.",
    href: "mailto:info@beaconmosque.com",
    meta: "Email",
  },
  {
    title: "Call Beacon Mosque",
    text: "Speak to the Beacon Mosque team through the head office contact number.",
    href: "tel:01494416202",
    meta: "Phone",
  },
  {
    title: "Head Office",
    text: "41 Baker Street, High Wycombe, HP11 2RX.",
    href: "https://www.google.com/maps/search/?api=1&query=41%20Baker%20Street%2C%20High%20Wycombe%20HP11%202RX",
    meta: "Visit",
  },
];

const accreditationCriteria = [
  {
    title: "3-Star Beacon Mosque Criteria",
    items: [
      "A well-functioning management structure that is followed and held accountable.",
      "Appropriate policies and procedures covering the basic aspects of mosque management.",
      "A purpose-built mosque building meeting health and safety guidelines.",
      "Adequate financial management and evidence of decision-making processes.",
      "A madrassah, maktab or supplementary school providing Islamic education for children.",
    ],
  },
  {
    title: "4-Star Beacon Mosque Criteria",
    items: [
      "Good working practices across management, procedures, staffing and recruitment.",
      "Financial reserves to cover six months of operating costs.",
      "A fair number of services for mosque membership and the wider Muslim community.",
      "A variety of services for women, elderly, vulnerable members and new Muslims.",
      "Strong online presence showcasing activities and services to wider audiences.",
    ],
  },
  {
    title: "5-Star Beacon Mosque Criteria",
    items: [
      "Excellent governance that can sustain the loss of key leadership personnel.",
      "Comprehensive policies, insurance and legal cover for staff and volunteers.",
      "Dedicated space for additional services, community use and family events.",
      "Exceptional financial management and evidence of self-sufficiency.",
      "An extended range of services, strong scrutiny and consistent online communication.",
    ],
  },
];

const standardDetails: Record<
  string,
  {
    intro: string;
    summary: string[];
    groups: Array<{ title: string; items: string[] }>;
  }
> = {
  "standards/community-development": {
    intro:
      "A Beacon Mosque nurtures strong communities, families and neighbourhood relationships beyond ritual worship.",
    summary: [
      "Islam is not limited to rituals and religious worship; it is a complete way of life that supports strong communities and families.",
      "This standard helps mosques prepare for community work, choose meaningful projects and work in partnership with mainstream institutions.",
    ],
    groups: [
      {
        title: "What is community development?",
        items: [
          "Understand local needs and build programmes that strengthen the wider community.",
          "Use mosque leadership, members and volunteers to support constructive local change.",
        ],
      },
      {
        title: "Preparing for community work",
        items: [
          "Assess whether the mosque has the capacity, people and governance to deliver community activity.",
          "Plan projects that are realistic, accountable and beneficial to the local area.",
        ],
      },
      {
        title: "Partnerships",
        items: [
          "Work with public, voluntary and mainstream institutions where partnership improves outcomes.",
          "Build trust through clear communication, shared expectations and consistent delivery.",
        ],
      },
    ],
  },
  "standards/accountability-and-transparency": {
    intro:
      "A Beacon Mosque is answerable to Allah, its congregation, its donors, its regulators and the wider community.",
    summary: [
      "Accountability and transparency help mosque management demonstrate integrity, responsible decision-making and public trust.",
      "This standard focuses on clear reporting, monitoring, evaluation and quality assurance across mosque activity.",
    ],
    groups: [
      {
        title: "Transparency",
        items: [
          "Communicate decisions, finances and activities clearly to members and stakeholders.",
          "Keep governance information accessible so worshippers and supporters can understand how the mosque is run.",
        ],
      },
      {
        title: "Monitoring and evaluation",
        items: [
          "Track whether projects and services are achieving their intended outcomes.",
          "Use feedback and evidence to improve services and management practice.",
        ],
      },
      {
        title: "Quality assurance",
        items: [
          "Review policies, procedures and delivery standards on a consistent basis.",
          "Use structured checks to maintain quality, safety and accountability.",
        ],
      },
    ],
  },
  "standards/additional-services": {
    intro:
      "A Beacon Mosque extends beyond core prayer facilities by offering services that meet the needs of its community.",
    summary: [
      "Additional services are supplementary programmes that broaden the mosque's contribution to education, support, outreach and wellbeing.",
      "This standard encourages mosques to identify practical services that match their capacity and community needs.",
    ],
    groups: [
      {
        title: "Educational programmes",
        items: [
          "Provide structured learning opportunities for adults, families, young people and new Muslims.",
          "Design programmes that support religious knowledge, life skills and community confidence.",
        ],
      },
      {
        title: "Outreach and support",
        items: [
          "Offer counselling, pastoral support and community outreach where appropriate expertise is available.",
          "Build pathways for youth, family and special needs support.",
        ],
      },
      {
        title: "Health and wellbeing",
        items: [
          "Use the mosque as a trusted space for wellbeing initiatives and signposting.",
          "Partner with relevant services where professional support is needed.",
        ],
      },
    ],
  },
  "standards/madrassah": {
    intro:
      "A Beacon Mosque supports a madrassah or supplementary school that provides safe, structured Islamic education.",
    summary: [
      "The madrassah standard focuses on mission, philosophy, timetable, subject coverage and the quality of children's Islamic education.",
      "It encourages mosques to run education provision with clarity, safeguarding, consistency and an understanding of learner needs.",
    ],
    groups: [
      {
        title: "Philosophy and mission",
        items: [
          "Define what the madrassah aims to achieve for children, families and the mosque community.",
          "Connect religious learning with character, confidence and responsible community life.",
        ],
      },
      {
        title: "Madrassah time",
        items: [
          "Use timetables that are manageable for students, staff and families.",
          "Create a learning environment that balances discipline, care and consistency.",
        ],
      },
      {
        title: "Subjects offered",
        items: [
          "Provide appropriate Qur'an, Islamic studies and related learning suited to age and ability.",
          "Review subject coverage so the programme remains purposeful and coherent.",
        ],
      },
    ],
  },
  "standards/communication": {
    intro:
      "A Beacon Mosque communicates clearly with worshippers, neighbours, media partners and the wider public.",
    summary: [
      "Communications help a mosque explain its work, promote services and build trusted relationships.",
      "This standard covers media engagement, website presence and communication systems that keep communities informed.",
    ],
    groups: [
      {
        title: "Promoting your mosque in the media",
        items: [
          "Develop responsible media engagement that represents the mosque accurately.",
          "Use communications to share services, events and positive community contribution.",
        ],
      },
      {
        title: "Developing a mosque website",
        items: [
          "Maintain a useful online presence with current information, service details and contact routes.",
          "Make digital communication accessible to members, visitors and external partners.",
        ],
      },
      {
        title: "Internal communication",
        items: [
          "Keep trustees, staff, volunteers and worshippers informed through consistent channels.",
          "Use clear messaging to reduce confusion and improve participation.",
        ],
      },
    ],
  },
  "standards/management-governance": {
    intro:
      "A Beacon Mosque has a clear vision, responsible governance and management structures that support long-term trust.",
    summary: [
      "Management and governance begin with vision, aims and objectives, then extend into charity structure, committee practice and meetings.",
      "This standard also highlights the importance of involving young people and women in mosque life and decision-making.",
    ],
    groups: [
      {
        title: "Vision, aims and objectives",
        items: [
          "Set a clear purpose for the mosque and translate it into practical objectives.",
          "Use strategy to guide services, staffing, finances and community priorities.",
        ],
      },
      {
        title: "Charity and governance structure",
        items: [
          "Choose and maintain an organisational structure suitable for mosque responsibilities.",
          "Understand trustee duties, charity obligations and management accountability.",
        ],
      },
      {
        title: "Committee and meetings",
        items: [
          "Run effective meetings with records, decisions and follow-up actions.",
          "Broaden participation and ensure leadership is sustainable across generations.",
        ],
      },
    ],
  },
  "standards/policies-procedures": {
    intro:
      "A Beacon Mosque uses clear policies and procedures to guide safe, lawful and consistent practice.",
    summary: [
      "Policies and procedures help mosque teams fulfil legal duties and make expectations clear to trustees, staff, volunteers and users.",
      "This standard covers governing documents, equal opportunities, health and safety, child protection and related procedures.",
    ],
    groups: [
      {
        title: "Developing policies",
        items: [
          "Identify who is responsible for drafting, approving, reviewing and applying policies.",
          "Make policies practical enough for staff and volunteers to use day to day.",
        ],
      },
      {
        title: "Core legal duties",
        items: [
          "Maintain governing documents and understand the mosque's legal responsibilities.",
          "Use policies to support compliance, safeguarding and fair treatment.",
        ],
      },
      {
        title: "Safety and protection",
        items: [
          "Keep health and safety, equal opportunities and child protection processes current.",
          "Train relevant people so procedures are understood and followed.",
        ],
      },
    ],
  },
  "standards/facilities-management": {
    intro:
      "A Beacon Mosque provides facilities that are safe, user-friendly and suitable for worshippers and community users.",
    summary: [
      "Facilities management focuses on the practical experience of people using the mosque, including accessibility, cleanliness and environmental responsibility.",
      "This standard supports mosques in caring for buildings while planning improvements that serve the community well.",
    ],
    groups: [
      {
        title: "User-friendly facilities",
        items: [
          "Create spaces that are safe, welcoming, accessible and easy to use.",
          "Review entrances, prayer areas, washing facilities, signage and general visitor experience.",
        ],
      },
      {
        title: "Maintenance",
        items: [
          "Keep building checks, repairs and cleaning routines organised and documented.",
          "Plan maintenance before small issues become major operational risks.",
        ],
      },
      {
        title: "Environment",
        items: [
          "Consider energy use, waste, sustainability and responsible management of resources.",
          "Use environmental improvements where they reduce cost and support community wellbeing.",
        ],
      },
    ],
  },
  "standards/staffing-employment": {
    intro:
      "A Beacon Mosque appoints, supports and manages staff and volunteers fairly and responsibly.",
    summary: [
      "Staffing and employment covers recruitment, shortlisting, interviews, appointment decisions and volunteer management.",
      "This standard helps mosque teams create fair processes and maintain good working relationships.",
    ],
    groups: [
      {
        title: "Choosing and appointing people",
        items: [
          "Define roles clearly before advertising or appointing staff and volunteers.",
          "Use fair recruitment processes that match people to responsibilities.",
        ],
      },
      {
        title: "Shortlisting and interviews",
        items: [
          "Shortlist consistently against role criteria and keep appropriate records.",
          "Use interviews to assess suitability, skills, safeguarding awareness and values.",
        ],
      },
      {
        title: "Volunteer management",
        items: [
          "Support volunteers with clear expectations, supervision and appreciation.",
          "Keep volunteer involvement safe, organised and aligned with mosque policies.",
        ],
      },
    ],
  },
  "standards/financing-fundraising": {
    intro:
      "A Beacon Mosque manages finances and fundraising with planning, transparency and accountability.",
    summary: [
      "A well-run mosque depends on sound financial management, budget planning and responsible fundraising.",
      "This standard encourages forecasting, reserves, donor trust and clear oversight of income and expenditure.",
    ],
    groups: [
      {
        title: "Budget and forecasting",
        items: [
          "Plan income and expenditure so trustees understand the mosque's financial position.",
          "Use forecasting to prepare for running costs, projects, staffing and maintenance.",
        ],
      },
      {
        title: "Fundraising",
        items: [
          "Raise funds responsibly, with clear purposes and appropriate donor communication.",
          "Protect public trust by recording income and using funds for their stated purpose.",
        ],
      },
      {
        title: "Financial accountability",
        items: [
          "Keep financial records, reporting and approvals organised.",
          "Review finances regularly so decisions are evidence-based and sustainable.",
        ],
      },
    ],
  },
};

const newsDetails: Record<
  string,
  {
    intro: string;
    paragraphs: string[];
    sourceLabel?: string;
  }
> = {
  "burhan-centre-madrassah-triumphs-in-the-eman-cup-2024-at-lords": {
    intro:
      "Burhan Centre Madrassah from Manchester won the EMAN Cup 2024 after a national inter-madrassah cricket tournament culminating at Lord's.",
    paragraphs: [
      "The EMAN Cup 2024, a national inter-madrassah cricket tournament sponsored by the England and Wales Cricket Board, brought cricket into urban communities and involved more than 50 organisations and hundreds of young participants.",
      "The tournament began at the Park Avenue Dome complex in Bradford and was inaugurated by Adil Rashid. Faith Associates, working with the ECB, organised regional heats in Bradford, Manchester, Birmingham, West London and East London.",
      "Regional champions then competed in the final at Lord's on 12 May 2024, giving young players the chance to play at one of cricket's most iconic venues.",
      "Burhan Centre Madrassah from Manchester emerged as champions after a tense final against Essex representatives. The event used pairs cricket rules and highlighted talent, sportsmanship and participation across diverse communities.",
      "The project created opportunities for boys and girls aged 8-11 to play cricket at major venues, including Park Avenue Dome, Emirates Old Trafford and Lord's Cricket Ground.",
      "Faith Associates described the EMAN Cup as a transformative project with the potential to create a sustainable pathway for new cricket players within key communities.",
    ],
    sourceLabel: "EMAN Cup 2024",
  },
  "fattah-cup-inter-madrassah-football-tournament": {
    intro:
      "The Fattah Cup Inter-Madrassah Football Tournament brought together young players, mosques and community volunteers across London.",
    paragraphs: [
      "The Fattah Cup Inter-Madrassah Football Tournament, part of the FIFA Forward Project, was delivered in London with 13 institutions and 30 teams taking part.",
      "Organised by Faith Associates in partnership with the London Football Association, Middlesex FA and England Football, the event ran across three age groups: 8-10, 10-12 and 12-14.",
      "Faith Associates worked with participating institutions after the project launch at Wembley Stadium, supporting management and volunteers with Football Association training and accreditation.",
      "More than 50 new volunteers from participating mosques were involved, helping mosques continue delivering football sessions for children in their communities.",
      "The tournament welcomed more than 350 attendees, including children, parents, volunteers, management teams and stakeholders from London and Middlesex.",
      "Al Manaar Mosque, an accredited five-star Beacon Mosque, won the 8-10 and 12-14 tournaments, while the Sri Lankan Muslim Cultural Centre won the 10-12 tournament.",
    ],
    sourceLabel: "Fattah Cup",
  },
  "news/birmingham-mosque-wins-beacon-best-future-design-award": {
    intro:
      "A Birmingham mosque won the Beacon Best Future Design Award at the 6th Annual British Beacon Mosque Awards 2023.",
    paragraphs: [
      "Hundreds of Muslims gathered at the 6th Annual British Beacon Mosque Awards 2023 on Saturday 25 November to celebrate mosques, madrassahs, imams, scholars and volunteers.",
      "The awards brought together mosque leaders, imams, alimahs, volunteers and groups from across the UK to recognise excellent work being delivered by mosques.",
      "During the ceremony, Al-Abbas Islamic Centre in Birmingham won a national award for the plans for its future building.",
      "The proposed building for Al-Abbas Islamic Centre is intended to accommodate 270 people praying, or 350 people seated comfortably.",
      "Easton Jamia Mosque, the largest mosque in Bristol, also received the Beacon Mosque Award for Best Sisters Facility in the UK.",
      "The Beacon Mosque initiative and British Beacon Mosque Awards were established in 2018 after a decade-long process of research and development.",
    ],
    sourceLabel: "British Beacon Mosque Awards 2023",
  },
  "british-beacon-mosque-awards-2021-finalists-named-in-the-queens-honours-list":
    {
      intro:
        "An archive recognition item from the Beacon Mosque news listing celebrating British Beacon Mosque Awards 2021 finalists named in the Queen's Honours List.",
      paragraphs: [
        "This recognition story links the awards programme with national civic recognition.",
        "The item highlights how British Beacon Mosque Awards finalists and community leaders can be recognised beyond the awards ceremony itself, including through national honours.",
        "It shows how mosque service, leadership and community contribution can be recognised through both sector awards and national honours.",
        "For current recognition stories, award winners and finalists, visitors can continue through the news archive or awards pages.",
      ],
      sourceLabel: "Awards archive",
    },
};

const referenceNewsArticles: ReferenceArticle[] = [
  {
    title: "Blackburn Mosque Bereavement Team Win Best Volunteer Award",
    href: "/news/blackburn-mosque-bereavement-team-win-best-volunteer-award/",
    meta: "Volunteer award",
    summary:
      "A Blackburn mosque bereavement team was recognised for compassionate volunteer service to families and the wider community.",
    paragraphs: [
      "The Beacon Mosque news archive records recognition for a Blackburn mosque bereavement team whose work supported families at moments of grief and practical need.",
      "Bereavement services require trusted volunteers, sensitive communication and dependable organisation between mosque teams, families and local partners.",
      "The story reflects the wider purpose of the Beacon Mosque Awards: recognising service that is rooted in faith, carried through by volunteers and felt directly by communities.",
    ],
    sourceLabel: "Community service",
  },
  {
    title: "Easton Mosque Wins National Award for its Space for Women",
    href: "/news/easton-mosque-wins-national-award-for-its-space-for-women/",
    meta: "Inclusive facilities",
    summary:
      "Easton Mosque was recognised nationally for facilities and services that improved space for women.",
    paragraphs: [
      "Easton Mosque's national recognition highlighted the importance of thoughtful, inclusive mosque facilities and service design.",
      "Spaces for women form part of a wider quality agenda covering access, dignity, consultation and participation in mosque life.",
      "The Beacon Mosque Awards use stories like this to show how facilities, governance and community voice can work together to improve worshipper experience.",
    ],
    sourceLabel: "Awards recognition",
  },
  {
    title:
      "British Beacon Mosque Awards 2021 Finalists Named in the Queen's Honours",
    href: "/news/british-beacon-mosque-awards-2021-finalists-named-in-the-queens-honours/",
    meta: "National honours",
    summary:
      "A recognition story connecting Beacon Mosque Awards finalists with national civic honours.",
    paragraphs: [
      "This archive item celebrates British Beacon Mosque Awards 2021 finalists whose community contribution was also recognised through national honours.",
      "The story underlines how mosque leadership, volunteering and public service can be recognised beyond the awards ceremony itself.",
      "Beacon Mosque keeps this route available for visitors following the 2021 recognition archive and the wider awards programme.",
    ],
    sourceLabel: "Awards archive",
  },
  {
    title: "Mosques Across the UK Receive Prestigious Beacon Mosque Award 2021",
    href: "/news/mosques-across-the-uk-receive-prestigious-beacon-mosque-award-2021/",
    meta: "Awards 2021",
    summary:
      "Mosques across the UK were recognised through the 2021 Beacon Mosque Awards for leadership, service and community impact.",
    paragraphs: [
      "The 2021 Beacon Mosque Awards recognised mosques, leaders, educators and volunteers working to improve mosque service across the UK.",
      "The awards highlighted examples of strong governance, youth provision, women's services, outreach, education and volunteer contribution.",
      "The archive page keeps the 2021 recognition story accessible as part of the continuing British Beacon Mosque Awards record.",
    ],
    sourceLabel: "Awards 2021",
  },
  {
    title:
      "Winners of the British Beacon Mosque Awards 2020 Celebrate with their Trophies",
    href: "/news/winners-of-the-british-beacon-mosque-awards-2020-celebrate-with-their-trophies/",
    meta: "Awards 2020",
    summary:
      "British Beacon Mosque Awards 2020 winners celebrated their trophies after a year of recognised service.",
    paragraphs: [
      "The 2020 award winners were celebrated for delivering excellent mosque service across categories covering leadership, education, facilities and community work.",
      "Trophy presentation stories help preserve the people and institutions behind each awards cycle, making the archive useful for winners, finalists and visitors.",
      "The Beacon Mosque Awards continue to recognise work that strengthens Islamic service and public benefit in local communities.",
    ],
    sourceLabel: "Awards 2020",
  },
  {
    title:
      "Caring Schoolgirl Raises More Than £10,000 to Help Injured Children in Hospital",
    href: "/news/caring-schoolgirl-raises-more-than-10000-to-help-injured-children-in-hospital/",
    meta: "Community fundraising",
    summary:
      "A community fundraising story highlighting care for injured children and the generosity of young people.",
    paragraphs: [
      "This news archive story records a schoolgirl's fundraising effort to help injured children in hospital.",
      "The story sits within the Beacon Mosque community news collection because it reflects compassion, initiative and practical support for vulnerable people.",
      "Community fundraising, when organised with care and accountability, is part of the wider public benefit that faith communities can encourage.",
    ],
    sourceLabel: "Community story",
  },
  {
    title: "Worthing Mosque Donates Grocery Boxes to the Elderly",
    href: "/news/worthing-mosque-donates-grocery-boxes-to-the-elderly/",
    meta: "Food support",
    summary:
      "Worthing Mosque supported elderly residents by donating grocery boxes during a period of community need.",
    paragraphs: [
      "Worthing Mosque's grocery box donations showed how mosque volunteers can respond quickly to the needs of elderly residents.",
      "Food support programmes depend on coordination, safeguarding, delivery planning and trust between volunteers and local households.",
      "The story is part of the Beacon Mosque archive of community resilience, showing mosques as practical support points in difficult periods.",
    ],
    sourceLabel: "Community resilience",
  },
  {
    title:
      "Cambridge Central Mosque Brings Touch of Goodwill to Help Royal Papworth Hospital Staff on Coronavirus Frontline",
    href: "/news/cambridge-central-mosque-brings-touch-of-goodwill-to-help-royal-papworth-hospital-staff-on-coronavirus-frontline/",
    meta: "Frontline support",
    summary:
      "Cambridge Central Mosque supported Royal Papworth Hospital staff during the coronavirus frontline response.",
    paragraphs: [
      "Cambridge Central Mosque's support for Royal Papworth Hospital staff reflected the important role faith communities played during the coronavirus response.",
      "The story highlights goodwill, local coordination and practical care for frontline workers carrying heavy responsibilities.",
      "Beacon Mosque keeps these community response stories accessible because they show how mosque teams can support public services during disruption.",
    ],
    sourceLabel: "Coronavirus response",
  },
  {
    title: "Mosque Council Leaders Praise Oldham Voluntary Heroes",
    href: "/news/mosque-council-leaders-praise-oldham-voluntary-heroes/",
    meta: "Volunteer support",
    summary:
      "Mosque and council leaders praised voluntary heroes in Oldham for their community support work.",
    paragraphs: [
      "Oldham voluntary heroes were praised by mosque and council leaders for supporting residents during a period of intense community need.",
      "The story reflects how mosque-linked volunteers can work with civic partners to identify needs, distribute support and maintain community morale.",
      "It remains part of the Beacon Mosque news archive as an example of local leadership and volunteer service.",
    ],
    sourceLabel: "Civic partnership",
  },
  {
    title: "Park Road Mosque in Banbury Providing Food Packs for Community",
    href: "/news/park-road-mosque-in-banbury-providing-food-packs-for-community/",
    meta: "Food packs",
    summary:
      "Park Road Mosque in Banbury provided food packs for people in the local community.",
    paragraphs: [
      "Park Road Mosque in Banbury provided food packs to support households affected by hardship and disruption.",
      "The work shows the practical value of trusted community institutions that can coordinate volunteers, identify need and distribute essential supplies.",
      "Beacon Mosque includes this story in the archive of mosque community support and resilience activity.",
    ],
    sourceLabel: "Community resilience",
  },
  {
    title: "Sikh Volunteers Sanitise Jama Masjid",
    href: "/news/sikh-volunteers-sanitise-jama-masjid/",
    meta: "Interfaith support",
    summary:
      "Sikh volunteers supported Jama Masjid by helping sanitise the mosque during a public health response.",
    paragraphs: [
      "This archive story records Sikh volunteers helping sanitise Jama Masjid as part of a shared public health response.",
      "The act of service shows how neighbours from different faith communities can support one another with practical care and respect.",
      "Stories of interfaith support sit naturally within Beacon Mosque's wider focus on trust, community partnership and public benefit.",
    ],
    sourceLabel: "Interfaith partnership",
  },
  {
    title:
      "Royal Couple Visits Shah Jahan Mosque in Woking to Pack Emergency Food Parcels",
    href: "/news/royal-couple-visits-shah-jahan-mosque-in-woking-to-pack-emergency-food-parcels/",
    meta: "Emergency parcels",
    summary:
      "The Shah Jahan Mosque in Woking hosted a royal visit connected to emergency food parcel support.",
    paragraphs: [
      "The Shah Jahan Mosque in Woking was recognised through a visit connected to the packing of emergency food parcels.",
      "Emergency food support is one of the clearest ways mosque teams and volunteers can respond to hardship in their local area.",
      "The story remains available as part of the Beacon Mosque record of community response work during periods of disruption.",
    ],
    sourceLabel: "Community resilience",
  },
  {
    title: "Kanoute Raises £1m to Build Seville's First Mosque in 700 Years",
    href: "/news/kanoute-raises-1m-to-build-sevilles-first-mosque-in-700-years/",
    meta: "International story",
    summary:
      "A fundraising story about raising support to build Seville's first mosque in centuries.",
    paragraphs: [
      "This archive item records a major fundraising story connected to building a mosque in Seville after centuries without one.",
      "The story reflects the importance of mosque spaces as places of worship, identity, service and community gathering.",
      "Beacon Mosque includes selected international mosque stories where they connect with the wider development of Muslim community institutions.",
    ],
    sourceLabel: "Mosque development",
  },
  {
    title:
      "Volunteer Helps Save Life of Man She'd Been Delivering Food to During Lockdown",
    href: "/news/volunteer-helps-save-life-of-man-shed-been-delivering-food-to-during-lockdown/",
    meta: "Lockdown support",
    summary:
      "A lockdown volunteer helped save the life of someone she had been delivering food to.",
    paragraphs: [
      "This story shows how regular volunteer contact during lockdown could become a lifeline for isolated or vulnerable people.",
      "Food delivery, welfare checks and trusted relationships enabled volunteers to spot urgent problems and respond quickly.",
      "The Beacon Mosque archive preserves the story as a strong example of community care during a public health crisis.",
    ],
    sourceLabel: "Volunteer service",
  },
  {
    title: "Delight as Mosque Donation Funds New PPE for Huddersfield Hospice",
    href: "/news/delight-as-mosque-donation-funds-new-ppe-for-huddersfield-hospice/",
    meta: "Healthcare support",
    summary:
      "A mosque donation helped fund PPE for a Huddersfield hospice during a period of health-sector pressure.",
    paragraphs: [
      "A mosque donation funded new PPE for a Huddersfield hospice at a time when protective equipment was urgently needed.",
      "The story reflects how faith communities can support healthcare providers through fundraising, donations and practical solidarity.",
      "Beacon Mosque keeps this item available within the wider record of mosque-led community and health support.",
    ],
    sourceLabel: "Healthcare support",
  },
  {
    title:
      "More Than 350 Families Helped by Woking Mosque Volunteers During Coronavirus Crisis",
    href: "/news/more-than-350-families-helped-by-woking-mosque-volunteers-during-coronavirus-crisis/",
    meta: "Coronavirus response",
    summary:
      "Woking mosque volunteers helped more than 350 families during the coronavirus crisis.",
    paragraphs: [
      "Woking mosque volunteers helped more than 350 families during the coronavirus crisis through practical support and organised local outreach.",
      "Large-scale family support required volunteer coordination, food and essentials distribution, communication and sensitivity to household circumstances.",
      "The story remains an important example of mosque-led community resilience during a national emergency.",
    ],
    sourceLabel: "Community resilience",
  },
  {
    title: "Cambridge Central Mosque Helping Local Community",
    href: "/news/cambridge-central-mosque-helping-local-community/",
    meta: "Local support",
    summary:
      "Cambridge Central Mosque supported local residents through community help and practical outreach.",
    paragraphs: [
      "Cambridge Central Mosque's local community support showed how mosque teams can use their facilities, volunteers and networks for wider public benefit.",
      "The story connects with the wider Beacon Mosque emphasis on community development, additional services and communication.",
      "It remains available for visitors exploring examples of mosques serving beyond worship provision.",
    ],
    sourceLabel: "Community support",
  },
  {
    title:
      "We Want to Build a Community Bridge: Norwich Mosque Throws Open its Doors to the Public",
    href: "/news/we-want-to-build-a-community-bridge-norwich-mosque-throws-open-its-doors-to-the-public/",
    meta: "Open mosque",
    summary:
      "A Norwich mosque opened its doors to the public to build stronger community relationships.",
    paragraphs: [
      "A Norwich mosque opened its doors to the public with the aim of building a stronger community bridge.",
      "Open mosque activity helps neighbours, schools, civic partners and local residents understand mosque life and meet the people behind local Muslim institutions.",
      "The story aligns with Beacon Mosque guidance on communication, outreach and accessible community engagement.",
    ],
    sourceLabel: "Community engagement",
  },
  {
    title: "This Mosque in Sepang Provides Free Groceries for the Needy",
    href: "/news/this-mosque-in-sepang-provides-free-groceries-for-the-needy/",
    meta: "International support",
    summary: "A mosque in Sepang provided free groceries for people in need.",
    paragraphs: [
      "This international archive story highlights a mosque in Sepang providing free groceries for people in need.",
      "The example shows how mosque spaces can become reliable points for food support, dignity and community care.",
      "Beacon Mosque includes selected global examples where they illustrate practical service models relevant to mosque communities.",
    ],
    sourceLabel: "Community service",
  },
  {
    title: "York Mosque Helps City's Homeless",
    href: "/news/york-mosque-helps-citys-homeless/",
    meta: "Homeless support",
    summary:
      "York Mosque supported people experiencing homelessness through practical community help.",
    paragraphs: [
      "York Mosque helped people experiencing homelessness through community support rooted in care, dignity and local responsibility.",
      "Homeless support can include food, shelter partnerships, donations, outreach and collaboration with local organisations.",
      "The story remains available as part of the Beacon Mosque archive because it demonstrates how mosques can serve vulnerable people in their city.",
    ],
    sourceLabel: "Community service",
  },
];

const referenceBlogArticles: ReferenceArticle[] = [
  {
    title:
      "Beacon Mosques and UK Council of Mosques Launch Guidance on Coronavirus",
    href: "/blog/beacon-mosques-uk-council-of-mosques-come-together-to-launch-guidance-on-coronavirus/",
    meta: "Coronavirus guidance",
    summary:
      "Beacon Mosques and the UK Council of Mosques came together to share guidance during the coronavirus response.",
    paragraphs: [
      "This blog archive page records joint guidance work by Beacon Mosques and the UK Council of Mosques during the coronavirus response.",
      "The guidance supported mosque leaders as they navigated public health responsibilities, community communication and practical decisions affecting worshippers.",
      "It remains available as part of the mosque resilience and public health archive.",
    ],
    sourceLabel: "Guidance archive",
  },
  {
    title: "Mosques in France Due to Close Over Spread of Coronavirus",
    href: "/blog/mosques-in-france-due-to-close-over-spread-of-coronavirus/",
    meta: "Coronavirus update",
    summary:
      "A public health update from the archive about mosque closures in France during the spread of coronavirus.",
    paragraphs: [
      "This archive update recorded mosque closures in France during the spread of coronavirus.",
      "The story illustrates the scale of public health disruption facing Muslim communities and mosque leaders during the pandemic.",
      "Beacon Mosque keeps the route available as part of the wider archive of mosque-related coronavirus updates and guidance.",
    ],
    sourceLabel: "Public health archive",
  },
];

const referenceNewsCards: CardLink[] = referenceNewsArticles.map((article) => ({
  title: article.title,
  text: article.summary,
  href: article.href,
  meta: article.meta,
}));

const referenceBlogCards: CardLink[] = referenceBlogArticles.map((article) => ({
  title: article.title,
  text: article.summary,
  href: article.href,
  meta: article.meta,
}));

const communityStoryCards: CardLink[] = [
  ...newsCards,
  ...referenceNewsCards,
  ...referenceBlogCards,
];

const accreditedDetails: Record<
  string,
  {
    rating: string;
    intro: string;
    paragraphs: string[];
    groups: Array<{ title: string; items: string[] }>;
  }
> = {
  "rumi-mosque-four-star-accredited-mosque": {
    rating: "Four Star Accredited",
    intro:
      "Mevlana Rumi Mosque is one of the first recognised Beacon Mosques and has achieved four-star certified Beacon Mosque Accreditation.",
    paragraphs: [
      "The Beacon Mosque initiative fosters, encourages and promotes the revival of the prophetic mosque, with Faith Associates offering expert advice through practitioners with 20 years of mosque management experience.",
      "Mevlana Rumi Mosque is a community hub that provides worship facilities while also serving its congregation and the wider community.",
      "Its services include support for the needy, outreach programmes, education facilities and a sports hub for young people.",
      "The mosque was recognised for best charity work and best madrassah service at the 2018 British Beacon Mosque Awards.",
      "Faith Associates officially awarded Mevlana Rumi Mosque with its accreditation plaque during a ceremony attended by mosque leaders, teachers, imams, volunteers and the wider community.",
    ],
    groups: [
      {
        title: "Accreditation",
        items: [
          "Four-star Beacon Mosque accreditation.",
          "Recognised as one of the first Beacon Mosques.",
          "Awarded an official accreditation plaque by Faith Associates.",
        ],
      },
      {
        title: "Community services",
        items: [
          "Support for people in need.",
          "Outreach programmes for the wider community.",
          "Education facilities and youth sports provision.",
        ],
      },
      {
        title: "Awards recognition",
        items: [
          "Best charity work recognition.",
          "Best madrassah service recognition.",
          "British Beacon Mosque Awards 2018 winner.",
        ],
      },
    ],
  },
  "al-manaar-mosque-five-star-accredited": {
    rating: "Five Star Accredited",
    intro:
      "Al Manaar Islamic Centre is one of the first recognised Beacon Mosques and has achieved five-star certified Beacon Mosque Accreditation.",
    paragraphs: [
      "The Beacon Mosque initiative fosters, encourages and promotes the revival of the prophetic mosque through a three-tier accreditation pathway: three star, four star and five star standards.",
      "Al Manaar Mosque serves as a community hub that goes beyond worship facilities, supporting its congregation and the wider community.",
      "Its services include homeless shelter provision, outreach programmes and sports facilities for young people.",
      "Al Manaar was at the heart of emergency efforts after the Grenfell disaster, with continued support for victims and the wider West London community.",
      "Faith Associates awarded Al Manaar Mosque, the Muslim Cultural Heritage Centre, with its five-star accreditation plaque in a ceremony attended by mosque leaders, councillors, imams, volunteers, worshippers and the wider community.",
      "The centre's community kitchen was also linked to the Grenfell recipe book project, reflecting its role as a trusted local community space.",
    ],
    groups: [
      {
        title: "Accreditation",
        items: [
          "Five-star Beacon Mosque accreditation.",
          "Official accreditation plaque awarded by Faith Associates.",
          "Recognised as one of the first Beacon Mosques.",
        ],
      },
      {
        title: "Community services",
        items: [
          "Homeless shelter provision.",
          "Outreach programmes and youth sports facilities.",
          "Grenfell disaster emergency response and ongoing support.",
        ],
      },
      {
        title: "Awards recognition",
        items: [
          "Best Run Mosque award winner at the 2018 British Beacon Mosque Awards.",
          "Recognised for community leadership and service.",
          "Hosted interfaith and community engagement initiatives.",
        ],
      },
    ],
  },
  "al-madina-mosque-barking-five-star-accredited": {
    rating: "Five Star Accredited",
    intro:
      "Al Madina Mosque Barking is one of the first recognised Beacon Mosques and has achieved five-star certified Beacon Mosque Accreditation.",
    paragraphs: [
      "The Beacon Mosque initiative supports mosques in building sustainable, inclusive and forward-looking institutions through clear quality standards.",
      "Al Madina Mosque serves as a community hub that provides worship facilities while supporting its congregation and the wider community.",
      "The mosque's services include support for the less fortunate, outreach programmes and sports facilities for young people.",
      "Al Madina Mosque won Best Youth Service 2018 at the British Beacon Mosque Awards for its youth provision.",
      "Faith Associates officially awarded Al Madina Mosque with its five-star accreditation plaque during a ceremony attended by mosque leaders, councillors, imams, volunteers, worshippers and the wider community.",
    ],
    groups: [
      {
        title: "Accreditation",
        items: [
          "Five-star Beacon Mosque accreditation.",
          "Recognised as one of the first Beacon Mosques.",
          "Awarded an official accreditation plaque by Faith Associates.",
        ],
      },
      {
        title: "Community services",
        items: [
          "Support for the less fortunate.",
          "Outreach programmes for local communities.",
          "Sports facilities and youth-focused provision.",
        ],
      },
      {
        title: "Awards recognition",
        items: [
          "Best Youth Service 2018 winner.",
          "British Beacon Mosque Awards recognition.",
          "Recognised for service to young people and the wider community.",
        ],
      },
    ],
  },
};

const winnerCards2024: CardLink[] = [
  {
    title: "Bilal Academy - Walsall",
    text: "Best Run Mosque winner for 2024.",
    href: "/bilal-academy-shortlisted-mosque-best-run-mosque2024/",
    meta: "Best Run Mosque",
    image: "/assets/awards/2024/winners/best-run-mosque-bilal-academy-walsall.png",
    imageAlt: "Best Run Mosque 2024 winner Bilal Academy Walsall",
  },
  {
    title: "Aberdeen Mosque and Islamic Centre",
    text: "Best Youth Service winner for 2024.",
    href: "/abderdeen-mosque-islamic-centre-shortlisted-mosque-best-youth-service-2024/",
    meta: "Best Youth Service",
    image: "/assets/awards/2024/winners/best-youth-service-aberdeen-mosque-and-islamic-centre.png",
    imageAlt: "Best Youth Service 2024 winner Aberdeen Mosque and Islamic Centre",
  },
  {
    title: "DEEN Central / The Hub - Solihull",
    text: "Best Madrassah Service winner for 2024.",
    href: "/the-hub-madrassah-shortlisted-mosque-2024/",
    meta: "Best Madrassah Service",
    image: "/assets/awards/2024/winners/best-madrassah-service-deen-central-the-hub-solihull.png",
    imageAlt: "Best Madrassah Service 2024 winner DEEN Central The Hub Solihull",
  },
  {
    title: "Nelson Community Mosque",
    text: "Best Women's Service winner for 2024.",
    href: "/nelson-community-mosque-shortlisted-mosque-best-youth-service-2024/",
    meta: "Best Women's Service",
    image: "/wp-content/uploads/2024/04/Best-Womens-Service-scaled-1-669x272.jpg",
    imageAlt: "Best Women's Service 2024 winner Nelson Community Mosque",
  },
  {
    title: "Adam Kelwick",
    text: "Most Impactful Imam winner for 2024.",
    href: "/adam-kelwick-shortlisted-most-impactful-imam-2024/",
    meta: "Most Impactful Imam",
    image: "/assets/awards/2024/winners/most-impactful-imam-imam-adam-kelwick.png",
    imageAlt: "Most Impactful Imam 2024 winner Imam Adam Kelwick",
  },
  {
    title: "The Olton Project - Birmingham",
    text: "Best Convert Support Service winner for 2024.",
    href: "/the-olton-project-shortlisted-mosque-best-convert-care-service-2024/",
    meta: "Best Convert Support Service",
    image: "/assets/awards/2024/winners/best-convert-support-service-the-olton-project-birmingham.png",
    imageAlt: "Best Convert Support Service 2024 winner The Olton Project Birmingham",
  },
  {
    title: "Shaykha Saleha Bukhari Islam",
    text: "Most Impactful Alimah winner for 2024.",
    href: "/saleha-islam-shortlisted-most-impactful-alimah-2024/",
    meta: "Most Impactful Alimah",
    image: "/assets/awards/2024/winners/most-impactful-alimah-shaykha-saleha-bukhari-islam.png",
    imageAlt: "Most Impactful Alimah 2024 winner Shaykha Saleha Bukhari Islam",
  },
  {
    title: "Central Jamia Masjid - Halifax",
    text: "Best Innovative Service winner for 2024.",
    href: "/central-jamia-masjid-shortlisted-mosque-best-innovation-service-2024/",
    meta: "Best Innovative Service",
    image: "/assets/awards/2024/winners/best-innovative-service-central-jamia-masjid-halifax.png",
    imageAlt: "Best Innovative Service 2024 winner Central Jamia Masjid Halifax",
  },
  {
    title: "The Salaam Centre - London",
    text: "Best Future Design winner for 2024.",
    href: "/salaam-centre-shortlisted-mosque-best-future-design-2024/",
    meta: "Best Future Design",
    image: "/assets/awards/2024/winners/best-future-design-the-salaam-centre-london.png",
    imageAlt: "Best Future Design 2024 winner The Salaam Centre London",
  },
  {
    title: "Bilal Mosque",
    text: "Best Mosque Volunteer winner for 2024.",
    href: "/best-mosque-volunteer-shortlist-2024/",
    meta: "Best Mosque Volunteer",
    image: "/wp-content/uploads/2024/04/Best-Mosque-Volunteer-scaled-1-700x441.jpg",
    imageAlt: "Best Mosque Volunteer 2024 winner Bilal Mosque",
  },
];

const winnerCards2023: CardLink[] = [
  {
    title: "Ashton Central Mosque",
    text: "Best Run Mosque winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Best Run Mosque",
      "Ashton Central Mosque",
    ),
    meta: "Best Run Mosque",
    image: "/assets/awards/2023/awards-2023-01.jpg",
    imageAlt: "Best Run Mosque 2023 winner",
  },
  {
    title: "Al-Manaar MCHC",
    text: "Best Youth Service winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Best Youth Service",
      "Al-Manaar MCHC",
    ),
    meta: "Best Youth Service",
    image: "/assets/awards/2023/awards-2023-02.jpg",
    imageAlt: "Best Youth Service 2023 winner",
  },
  {
    title: "Al-Arqam Arabic School",
    text: "Best Madrassah Service winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Best Madrassah Service",
      "Al-Arqam Arabic School",
    ),
    meta: "Best Madrassah Service",
    image: "/assets/awards/2023/awards-2023-03.jpg",
    imageAlt: "Best Madrassah Service 2023 winner",
  },
  {
    title: "Easton Jamia Masjid",
    text: "Best Women's Service winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Best Women's Service",
      "Easton Jamia Masjid",
    ),
    meta: "Best Women's Service",
    image: "/assets/awards/2023/awards-2023-04.jpg",
    imageAlt: "Best Women's Service 2023 winner",
  },
  {
    title: "Imam Ghulam Mohyuddin",
    text: "Most Impactful Imam winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Most Impactful Imam",
      "Imam Ghulam Mohyuddin",
    ),
    meta: "Most Impactful Imam",
    image: "/assets/awards/2023/awards-2023-05.jpg",
    imageAlt: "Most Impactful Imam 2023 winner",
  },
  {
    title: "Leeds Grand Mosque",
    text: "Best Convert Support Service winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Best Convert Support Service",
      "Leeds Grand Mosque",
    ),
    meta: "Best Convert Support Service",
    image: "/assets/awards/2023/awards-2023-02.jpg",
    imageAlt: "Best Convert Support Service 2023 winner",
  },
  {
    title: "Ustadha Aniqa Rashid",
    text: "Most Impactful Alimah winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Most Impactful Alimah",
      "Ustadha Aniqa Rashid",
    ),
    meta: "Most Impactful Alimah",
    image: "/assets/awards/2023/awards-2023-04.jpg",
    imageAlt: "Most Impactful Alimah 2023 winner",
  },
  {
    title: "Muslim Welfare House Mosque",
    text: "Best Outreach Service winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Best Outreach Service",
      "Muslim Welfare House Mosque",
    ),
    meta: "Best Outreach Service",
    image: "/assets/awards/2023/awards-2023-01.jpg",
    imageAlt: "Best Outreach Service 2023 winner",
  },
  {
    title: "Al-Abbas Islamic Centre",
    text: "Best Future Design winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Best Future Design",
      "Al-Abbas Islamic Centre",
    ),
    meta: "Best Future Design",
    image: "/assets/awards/2023/awards-2023-05.jpg",
    imageAlt: "Best Future Design 2023 winner",
  },
  {
    title: "Mohammed Ali Dhorat",
    text: "Best Mosque Volunteer winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Best Mosque Volunteer",
      "Mohammed Ali Dhorat",
    ),
    meta: "Best Mosque Volunteer",
    image: "/assets/awards/2023/awards-2023-03.jpg",
    imageAlt: "Best Mosque Volunteer 2023 winner",
  },
  {
    title: "Central Mosque of Brent",
    text: "Most Innovative Service winner for 2023.",
    href: legacyWinnerProfileHref(
      "2023",
      "Most Innovative Service",
      "Central Mosque of Brent",
    ),
    meta: "Most Innovative Service",
    image: "/assets/awards/2023/awards-2023-02.jpg",
    imageAlt: "Most Innovative Service 2023 winner",
  },
];

const awardsGallery2025Sources = [
  "/wp-content/uploads/2025/12/02.jpg",
  "/wp-content/uploads/2025/12/03.jpg",
  "/wp-content/uploads/2025/12/04.jpg",
  "/wp-content/uploads/2025/12/05.jpg",
  "/wp-content/uploads/2025/12/06.jpg",
  "/wp-content/uploads/2025/12/08.jpg",
  "/wp-content/uploads/2025/12/09.jpg",
  "/wp-content/uploads/2025/12/10.jpg",
  "/wp-content/uploads/2025/12/11.jpg",
  "/wp-content/uploads/2025/12/12.jpg",
  "/wp-content/uploads/2025/12/13.jpg",
  "/wp-content/uploads/2025/12/14.jpg",
  "/wp-content/uploads/2025/12/15.jpg",
  "/wp-content/uploads/2025/12/16.jpg",
  "/wp-content/uploads/2025/12/17.jpg",
  "/wp-content/uploads/2025/12/18.jpg",
  "/wp-content/uploads/2025/12/19.jpg",
  "/wp-content/uploads/2025/12/21.jpg",
  "/wp-content/uploads/2025/12/22.jpg",
  "/wp-content/uploads/2025/12/23.jpg",
  "/wp-content/uploads/2025/12/24.jpg",
  "/wp-content/uploads/2025/12/25.jpg",
  "/wp-content/uploads/2025/12/26.jpg",
  "/wp-content/uploads/2025/12/27.jpg",
  "/wp-content/uploads/2025/12/28.jpg",
  "/wp-content/uploads/2025/12/29.jpg",
  "/wp-content/uploads/2025/12/30.jpg",
  "/wp-content/uploads/2025/12/31-540x272.jpg",
  "/wp-content/uploads/2025/12/32.jpg",
  "/wp-content/uploads/2025/12/33.jpg",
  "/wp-content/uploads/2025/12/34.jpg",
  "/wp-content/uploads/2025/12/35.jpg",
  "/wp-content/uploads/2025/12/36.jpg",
  "/wp-content/uploads/2025/12/592741567_10235806383712995_1037420585446427501_n.jpg",
  "/wp-content/uploads/2025/12/7.jpg",
  "/wp-content/uploads/2025/12/Original.png",
  "/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-26-at-17.38.01-1086x1536.jpeg",
  "/wp-content/uploads/2025/12/Youth-service.jpeg",
] as const;

const awardsGallery2025: GalleryImage[] = awardsGallery2025Sources.map(
  (src, index) => ({
    src,
    alt: `Beacon Mosque Awards 2025 gallery image ${index + 1}`,
    title: `2025 gallery image ${index + 1}`,
  }),
);

const awardsGallery2023: GalleryImage[] = [
  {
    src: "/assets/awards/2023/awards-2023-01.jpg",
    alt: "Winner portrait at the British Beacon Mosque Awards 2023",
    title: "2023 winner portrait",
  },
  {
    src: "/assets/awards/2023/awards-2023-02.jpg",
    alt: "Awards visit portrait from the Beacon Mosque Awards 2023 archive",
    title: "Archive recognition visit",
  },
  {
    src: "/assets/awards/2023/awards-2023-03.jpg",
    alt: "Certificate presentation from the Beacon Mosque Awards 2023 archive",
    title: "Certificate presentation",
  },
  {
    src: "/assets/awards/2023/awards-2023-04.jpg",
    alt: "Community certificate moment from the Beacon Mosque Awards 2023 archive",
    title: "Community recognition",
  },
  {
    src: "/assets/awards/2023/awards-2023-05.jpg",
    alt: "Group awards visit from the Beacon Mosque Awards 2023 archive",
    title: "Group recognition visit",
  },
];

const awardsGallery2022: GalleryImage[] = [
  {
    src: "/assets/awards/2022/award-2022-01.jpg",
    alt: "Women winners on stage at the Beacon Mosque Awards 2022",
    title: "Women winners on stage",
  },
  {
    src: "/assets/awards/2022/award-2022-02.jpg",
    alt: "Guests meeting at the Beacon Mosque Awards 2022",
    title: "Guests and community leaders",
  },
  {
    src: "/assets/awards/2022/award-2022-03.jpg",
    alt: "A family winner portrait at the Beacon Mosque Awards 2022",
    title: "Winner portrait",
  },
  {
    src: "/assets/awards/2022/award-2022-04.jpg",
    alt: "Women holding a trophy at the Beacon Mosque Awards 2022",
    title: "Category winner celebration",
  },
  {
    src: "/assets/awards/2022/award-2022-05.jpg",
    alt: "Community members at the Beacon Mosque Awards 2022",
    title: "Community recognition",
  },
  {
    src: "/assets/awards/2022/award-2022-06.jpg",
    alt: "Youth category winners at the Beacon Mosque Awards 2022",
    title: "Youth service winners",
  },
  {
    src: "/assets/awards/2022/award-2022-07.jpg",
    alt: "Women celebrating with a trophy at the Beacon Mosque Awards 2022",
    title: "Team winner portrait",
  },
  {
    src: "/assets/awards/2022/award-2022-08.jpg",
    alt: "Audience view of the Beacon Mosque Awards 2022 ceremony",
    title: "Awards ceremony hall",
  },
];

const awardsGallery2018: GalleryImage[] = [
  {
    src: "/assets/awards/2018/awards-2018-hero.jpg",
    alt: "Founding-year guests at the British Beacon Mosque Awards 2018",
    title: "Founding awards evening",
  },
];

const awardsGallery2020: GalleryImage[] = [
  {
    src: "/assets/awards/2020/awards-2020-hero.jpg",
    alt: "Winner portrait at the British Beacon Mosque Awards 2020",
    title: "2020 winner portrait",
  },
];

const awardsGallery2021: GalleryImage[] = [
  {
    src: "/assets/awards/2021/awards-2021-hero.jpg",
    alt: "Winners and presenters at the British Beacon Mosque Awards 2021",
    title: "2021 winners portrait",
  },
];

const winnerCards2022: CardLink[] = [
  {
    title: "Maidenhead Mosque",
    text: "Best Run Mosque winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Best Run Mosque",
      "Maidenhead Mosque",
    ),
    meta: "Best Run Mosque",
    image: "/assets/awards/2022/award-2022-08.jpg",
    imageAlt: "Best Run Mosque winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "EMCA Mosque & Centre",
    text: "Best Youth Service winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Best Youth Service",
      "EMCA Mosque & Centre",
    ),
    meta: "Best Youth Service",
    image: "/assets/awards/2022/award-2022-06.jpg",
    imageAlt: "Best Youth Service winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "Lantern Academy",
    text: "Best Madrassah Service winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Best Madrassah Service",
      "Lantern Academy",
    ),
    meta: "Best Madrassah Service",
    image: "/assets/awards/2022/award-2022-03.jpg",
    imageAlt: "Best Madrassah Service winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "Guidance Hub",
    text: "Best Women's Service winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Best Women's Service",
      "Guidance Hub",
    ),
    meta: "Best Women's Service",
    image: "/assets/awards/2022/award-2022-01.jpg",
    imageAlt: "Best Women's Service winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "Imam Ebrahim Esakjee",
    text: "Most Impactful Imam winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Most Impactful Imam",
      "Imam Ebrahim Esakjee",
    ),
    meta: "Most Impactful Imam",
    image: "/assets/awards/2022/award-2022-02.jpg",
    imageAlt: "Most Impactful Imam winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "York Mosque & Islamic Centre",
    text: "Best Convert Support Service winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Best Convert Support Service",
      "York Mosque & Islamic Centre",
    ),
    meta: "Best Convert Support Service",
    image: "/assets/awards/2022/award-2022-05.jpg",
    imageAlt:
      "Best Convert Support Service winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "Ustadha Ameena Blake",
    text: "Most Impactful Alimah winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Most Impactful Alimah",
      "Ustadha Ameena Blake",
    ),
    meta: "Most Impactful Alimah",
    image: "/assets/awards/2022/award-2022-04.jpg",
    imageAlt: "Most Impactful Alimah winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "Nelson Community Masjid",
    text: "Best Outreach Service winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Best Outreach Service",
      "Nelson Community Masjid",
    ),
    meta: "Best Outreach Service",
    image: "/assets/awards/2022/award-2022-07.jpg",
    imageAlt: "Best Outreach Service winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "Madinat al Zahra",
    text: "Best Future Design winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Best Future Design",
      "Madinat al Zahra",
    ),
    meta: "Best Future Design",
    image: "/assets/awards/2022/award-2022-08.jpg",
    imageAlt: "Best Future Design winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "Noor Miah",
    text: "Best Mosque Volunteer winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Best Mosque Volunteer",
      "Noor Miah",
    ),
    meta: "Best Mosque Volunteer",
    image: "/assets/awards/2022/award-2022-07.jpg",
    imageAlt: "Best Mosque Volunteer winner at the Beacon Mosque Awards 2022",
  },
  {
    title: "Al-Madina Mosque Barking",
    text: "Most Innovative Service winner for 2022.",
    href: legacyWinnerProfileHref(
      "2022",
      "Most Innovative Service",
      "Al-Madina Mosque Barking",
    ),
    meta: "Most Innovative Service",
    image: "/assets/awards/2022/award-2022-03.jpg",
    imageAlt: "Most Innovative Service winner at the Beacon Mosque Awards 2022",
  },
];

const winnerCards2021: CardLink[] = [
  {
    title: "Sri Lankan Muslim Cultural Centre",
    text: "Best Run Mosque winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Best Run Mosque",
      "Sri Lankan Muslim Cultural Centre",
    ),
    meta: "Best Run Mosque",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Best Run Mosque winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Lantern Academy",
    text: "Best Youth Service winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Best Youth Service",
      "Lantern Academy",
    ),
    meta: "Best Youth Service",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Best Youth Service winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Al-Mustafa Centre",
    text: "Best Madrassah Service winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Best Madrassah Service",
      "Al-Mustafa Centre",
    ),
    meta: "Best Madrassah Service",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Best Madrassah Service winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Al-Rahma Mosque",
    text: "Best Outreach Programme winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Best Outreach Programme",
      "Al-Rahma Mosque",
    ),
    meta: "Best Outreach Programme",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Best Outreach Programme winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Rumi's Cave",
    text: "Best Women's Service winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Best Women's Service",
      "Rumi's Cave",
    ),
    meta: "Best Women's Service",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Best Women's Service winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Shaykh Nuru Mohammad",
    text: "Most Impactful Imam winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Most Impactful Imam",
      "Shaykh Nuru Mohammad",
    ),
    meta: "Most Impactful Imam",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Most Impactful Imam winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Easton Jamia Mosque",
    text: "Best Green Initiative winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Best Green Initiative",
      "Easton Jamia Mosque",
    ),
    meta: "Best Green Initiative",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Best Green Initiative winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Maysoon Shafiq",
    text: "Most Impactful Alimah winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Most Impactful Alimah",
      "Maysoon Shafiq",
    ),
    meta: "Most Impactful Alimah",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Most Impactful Alimah winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Revive FM",
    text: "Most Innovative Service winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Most Innovative Service",
      "Revive FM",
    ),
    meta: "Most Innovative Service",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Most Innovative Service winner at the Beacon Mosque Awards 2021",
  },
  {
    title: "Al-Mustafa Centre",
    text: "Best Future Design winner for 2021.",
    href: legacyWinnerProfileHref(
      "2021",
      "Best Future Design",
      "Al-Mustafa Centre",
    ),
    meta: "Best Future Design",
    image: "/assets/awards/2021/awards-2021-hero.jpg",
    imageAlt: "Best Future Design winner at the Beacon Mosque Awards 2021",
  },
];

const pageMap: Record<string, InteriorPage> = {
  "about-us": {
    slug: "about-us",
    title: "Developing Beacon Mosques Globally",
    eyebrow: "About us",
    intro:
      "Improve the status of your Mosque by achieving the Beacon Mosque Standards.",
    image: "/assets/interior/about-hero.jpg",
    imageAlt: "Beacon Mosque interior architectural detail",
    ctas: [
      { label: "Email Beacon Mosque", href: "/contact-us/" },
      {
        label: "See our 10 Standards",
        href: "/standards/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        paragraphs: [
          "Following the review of thousands of Mosques across the globe for the past 20 years, Beacon Mosque was established as a global benchmark of quality for Mosques.",
          "Rating the Mosque from a 3 Star to a 4 Star or 5 Star position helps Mosques achieve globally recognised standards, while helping worshippers and management appreciate what can and should be achieved to deliver an exemplary experience.",
          "Faith Associates through its strategic projects and programmes has been working towards achieving key United Nations Sustainability Goals.",
        ],
      },
      { kind: "standards" },
    ],
  },
  awards: {
    slug: "awards",
    title: "Beacon Mosque Awards",
    eyebrow: "Awards",
    intro:
      "The 9th annual Beacon Mosque Awards will be held in November 2026, awarding and recognising the amazing efforts of Mosques across the UK.",
    heroVideo:
      "https://beaconmosque.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-05-at-12.31.47.mp4",
    heroVideoPoster: "/assets/interior/awards-gala.jpg",
    ctas: [
      {
        label: "Submit Your Nomination for the 9th Beacon Mosque Awards 2026",
        href: nominationForm2026Href,
      },
    ],
    sections: [
      { kind: "cards", title: "Awards archive", cards: awardsArchive },
      { kind: "cards", title: "Award categories", cards: awardCategoryCards },
    ],
  },
  winners: {
    slug: "winners",
    title: "Winners",
    eyebrow: "Recognition archive",
    intro:
      "Browse Beacon Mosque Awards winners across the awards archive.",
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      { label: "Explore Awards Archive", href: "/awards/" },
      {
        label: "View 2026 Awards",
        href: "/awards/beacon-mosque-awards-2026/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: "Recognition through the years",
        paragraphs: [
          "The winners archive highlights mosques, madrassahs, imams, alimahs and volunteers recognised for service, leadership and measurable community impact.",
          "Use the year-by-year winner sections below to browse official Beacon Mosque winner imagery alongside the recognised institutions and individuals.",
        ],
      },
      {
        kind: "gallery",
        title: "2025 official winner gallery",
        images: awardWinners2025.map((image, index) => ({
          src: image.src,
          alt: image.alt,
          title: /8th British Beacon Mosque Awards 2025 winner/i.test(image.alt)
            ? `2025 winner portrait ${String(index + 1).padStart(2, "0")}`
            : image.alt,
        })),
      },
      {
        kind: "gallery",
        title: "2024 official winner gallery",
        images: awardWinners2024.map((image, index) => ({
          src: image.src,
          alt: image.alt,
          title: /2024 winner/i.test(image.alt)
            ? `2024 winner portrait ${String(index + 1).padStart(2, "0")}`
            : image.alt,
        })),
      },
      {
        kind: "cards",
        title: "2025 winner profiles",
        cards: awardRecognitionCards2025,
      },
      {
        kind: "cards",
        title: "2024 winners",
        cards: winnerCards2024,
      },
      {
        kind: "cards",
        title: "2023 winners",
        cards: winnerCards2023,
      },
      {
        kind: "cards",
        title: "2022 winners",
        cards: winnerCards2022,
      },
      {
        kind: "cards",
        title: "2021 winners",
        cards: winnerCards2021,
      },
      {
        kind: "cards",
        title: "Awards archive",
        cards: awardsArchive,
      },
    ],
  },
  "awards/beacon-mosque-awards-2026": {
    slug: "awards/beacon-mosque-awards-2026",
    title: "9th Beacon Mosque Awards 2026",
    eyebrow: "Nominations open",
    intro:
      "The 9th Annual Beacon Mosque Awards Ceremony & Gala Dinner returns this November 2026 and nominations are now open.",
    image: "/wp-content/uploads/2026/04/04.png",
    imageAlt: "British Beacon Mosque Awards 2026 programme artwork",
    heroVideo: "/wp-content/uploads/WhatsApp-Video-2026-03-05-at-12.31.47.mp4",
    heroVideoPoster: "/wp-content/uploads/2026/04/04.png",
    ctas: [{ label: "Submit your nomination", href: nominationForm2026Href }],
    sections: [
      {
        kind: "text",
        paragraphs: [
          "The Beacon Mosque Awards 2026 celebrate outstanding mosques, madrassahs, imams, alimahs and volunteers across 10 categories.",
          "Independent judges select the winners from a shortlist of finalists, ensuring a fair and trusted process.",
          "Submit your nomination and help recognise the people and institutions making a real difference in our communities.",
          awardProgrammeFunding,
        ],
      },
      {
        kind: "cards",
        title: "Nominate Across Our 10 Award Categories for 2026",
        cards: awardCategoryCards,
      },
      {
        kind: "form",
        form: "nomination",
        title: "Enter your Mosque details",
        text: "Share the nominee, category and supporting details for consideration by the Beacon Mosque Awards team.",
      },
    ],
  },
  nominate: {
    slug: "nominate",
    title: "Nominate The Mosque",
    eyebrow: "Nominations",
    intro:
      "Submit a mosque, madrassah, imam, alimah or volunteer for consideration by the Beacon Mosque Awards team.",
    image: "/assets/hero/awards-2025-poster.jpeg",
    imageAlt: "British Beacon Mosque Awards programme artwork",
    ctas: [
      { label: "View Awards 2026", href: "/awards/beacon-mosque-awards-2026/" },
      {
        label: "Explore award categories",
        href: "/awards/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: "Nominate The Mosque",
        paragraphs: [
          "Nominate a mosque through the dedicated Beacon Mosque Awards nomination pathway.",
          "Use the form below to share the nominee, award category and supporting details for review.",
        ],
      },
      { kind: "cards", title: "Award categories", cards: awardCategoryCards },
      {
        kind: "form",
        form: "nomination",
        title: "Enter nomination details",
        text: "Share the nominee, category and supporting details for consideration by the Beacon Mosque Awards team.",
      },
    ],
  },
  "awards/beacon-mosque-awards-2025": {
    slug: "awards/beacon-mosque-awards-2025",
    title: "8th Beacon Mosque Awards 2025",
    eyebrow: "Awards archive",
    intro:
      "The 8th Annual Beacon Mosque Awards 2025 recognised Mosques, Madrassahs, Imams, Alimahs and volunteers across 10 categories.",
    image: "/assets/awards/2025/bbma-2025-identity.png",
    imageAlt: "8th Annual British Beacon Mosque Awards 2025 identity artwork",
    ctas: [
      {
        label: "Download booklet",
        href: "/wp-content/uploads/2025/11/Booklet-British-Beacon-Mosque-Awards-2025a-1.pdf",
      },
    ],
    sections: [
      {
        kind: "cards",
        title: "Award categories for 2025",
        cards: awardCategoryCardsForYear("2025"),
      },
      {
        kind: "gallery",
        title: "2025 awards gallery",
        images: awardsGallery2025,
      },
      {
        kind: "text",
        title: "Awards archive",
        paragraphs: [
          "The 2025 ceremony and gala dinner brought together the Beacon Mosque Awards community to recognise excellent mosque service and leadership.",
          "Independent judges selected winners from shortlisted finalists, helping the awards maintain credibility and public trust.",
          awardProgrammeFunding,
        ],
      },
      {
        kind: "cards",
        title: "2025 winner profiles",
        cards: awardRecognitionCards2025,
      },
    ],
  },
  standards: {
    slug: "standards",
    title: "10 Global Standards to make a Beacon Mosque",
    eyebrow: "Standards",
    intro:
      "Beacon Mosque standards help mosques build excellent governance, safeguarding, facilities, communication and community service.",
    image: "/assets/interior/standards-wide.jpg",
    imageAlt: "Beacon Mosque standards graphic",
    sections: [
      {
        kind: "text",
        paragraphs: [
          "The standards provide a practical framework for mosque leadership teams to evidence quality, strengthen systems and improve the worshipper and community experience.",
        ],
      },
      { kind: "standards" },
    ],
  },
  "accreditation-process": {
    slug: "accreditation-process",
    title: "Accreditation Process",
    eyebrow: "Accreditation",
    intro:
      "The Beacon Mosque initiative gives mosque leadership the ability to rate their Mosque against clear criteria to achieve 3, 4 or 5-star accreditation.",
    image: "/assets/interior/accredited-mosques.jpg",
    imageAlt: "Accredited Beacon Mosques graphic",
    ctas: [
      { label: "Rate your Mosque", href: "/ratings/" },
      {
        label: "Contact Beacon Mosque",
        href: "/contact-us/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: "Global Initiative",
        paragraphs: [
          "3, 4 and 5-star Mosque accreditation is open globally for Mosques to apply for and attain a kitemark of excellence for their institution.",
          "The optimal utilisation of a Mosque is achieved when leadership, management and members understand that the Mosque is not simply a place for prayer, but a focal point for the entire community to serve, safeguard and support.",
        ],
      },
      {
        kind: "cards",
        title: "How to become an accredited Beacon Mosque",
        cards: [
          {
            title: "Enquire",
            text: "Complete the Rate Your Mosque form or contact Beacon Mosque to begin.",
            href: "/ratings/",
            meta: "01",
          },
          {
            title: "Audit",
            text: "The team liaises with the Mosque to assess against the ten Beacon Mosque Standards.",
            href: "/standards/",
            meta: "02",
          },
          {
            title: "Certification",
            text: "After the audit, the Mosque is advised of its rating and receives formal certification.",
            href: "/beacon-mosques/",
            meta: "03",
          },
        ],
      },
      {
        kind: "criteria",
        title: "Star rating criteria",
        groups: accreditationCriteria,
      },
    ],
  },
  "standards/accreditation": {
    slug: "standards/accreditation",
    title: "Accreditation",
    eyebrow: "Beacon Mosque Standards",
    intro:
      "The Beacon Mosque initiative offers mosque leadership the ability to rate their mosque against a set criteria to achieve 3, 4 or 5-star accreditation.",
    image: "/assets/interior/accredited-mosques.jpg",
    imageAlt: "Accredited Beacon Mosque recognition",
    ctas: [
      { label: "Rate your Mosque", href: "/ratings/" },
      {
        label: "Contact Beacon Mosque",
        href: "/contact-us/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: "Accreditation Process",
        paragraphs: [
          "A 5-star rated Beacon Mosque truly serves both its congregation and the wider community through an efficient, inclusive and sustainable provision of services.",
          "The optimal utilisation of a mosque is achieved when leadership, management and members understand that it is not simply a place for prayer, but a focal point for the entire community to serve, safeguard and support.",
        ],
      },
      {
        kind: "text",
        title: "Global Initiative",
        paragraphs: [
          "3, 4 and 5-star mosque accreditation is open globally for mosques to apply for and attain a kitemark of excellence for their institution.",
        ],
      },
      {
        kind: "cards",
        title: "How to become an accredited Beacon Mosque",
        cards: [
          {
            title: "Enquire",
            text: "Complete the online Rate Your Mosque form or contact Beacon Mosque on 01494 416 202 to begin the process.",
            href: "/ratings/",
            meta: "01",
          },
          {
            title: "Audit",
            text: "Our team liaises with the mosque and assesses it against the ten Beacon Mosque Standards.",
            href: "/standards/",
            meta: "02",
          },
          {
            title: "Certification",
            text: "Once the audit is completed, the mosque is advised of its star rating and receives formal certification.",
            href: "/beacon-mosques/",
            meta: "03",
          },
        ],
      },
      {
        kind: "criteria",
        title: "Beacon Mosque star rating criteria",
        groups: accreditationCriteria,
      },
      {
        kind: "text",
        title: "Why Beacon Mosque exists",
        paragraphs: [
          "Beacon Mosque has been developed to recognise the role mosques and Islamic centres play in the life of towns and cities.",
          "Beacon Mosques and their services have a measurable impact on the social and cultural fabric of the communities they serve, and this framework helps recognise strong practice so others can learn from it.",
        ],
      },
    ],
  },
  "beacon-mosques": {
    slug: "beacon-mosques",
    title: "Accredited Beacon Mosques",
    eyebrow: "Accreditation",
    intro:
      "Mosques that have been awarded star ratings and are recognised as Beacon Mosques.",
    image: "/assets/interior/cambridge-mosque.jpg",
    imageAlt: "Mosque exterior",
    ctas: [{ label: "Get Accredited", href: "/accreditation-process/" }],
    sections: [{ kind: "accredited" }],
  },
  ratings: {
    slug: "ratings",
    title: "Rate Your Mosque",
    eyebrow: "Accreditation",
    intro:
      "Using the Beacon Mosque Accreditation criteria, you can assess whether your Mosque meets the requirements of a 3-star, 4-star or 5-star Beacon Mosque.",
    sections: [
      {
        kind: "text",
        paragraphs: [
          "The form below asks a few simple questions on your capacity and current procedures. It takes less than 5 minutes to complete, after which Beacon Mosque can provide feedback along with a provisional accreditation indication.",
        ],
      },
      {
        kind: "criteria",
        title: "What the assessment considers",
        groups: accreditationCriteria,
      },
      {
        kind: "form",
        form: "rating",
        title: "Rate your Mosque",
        text: "Answer the options that best represent your Mosque.",
      },
    ],
  },
  "mosques-as-resilience-hubs": {
    slug: "mosques-as-resilience-hubs",
    title: "Mosques as Resilience Hubs",
    eyebrow: "Community resilience",
    intro:
      "Mosques can serve as trusted community-serving facilities that support residents, coordinate communication, distribute resources and strengthen quality of life.",
    image: "/assets/interior/golden-mosque.jpg",
    imageAlt: "Mosque dome at sunset",
    sections: [
      {
        kind: "text",
        title: "What are Resilience Hubs?",
        paragraphs: [
          "Resilience Hubs are community-serving facilities enhanced to support residents, coordinate communication, distribute resources and reduce carbon pollution while improving quality of life.",
          "They can meet a wide range of physical and social needs by using trusted community spaces and surrounding infrastructure.",
        ],
      },
      {
        kind: "cards",
        title: "Three Resilience Hub Modes",
        cards: resilienceModes,
      },
      {
        kind: "text",
        title: "How Mosques Can Become Resilience Hubs",
        paragraphs: [
          "Mosques can provide essential services and support during emergencies and disasters, while strengthening community cohesion and preparedness.",
          "They can function as gathering centres, offer shelter, food and medical assistance, and use their existing networks and volunteer base for emergency response training and awareness.",
        ],
      },
      {
        kind: "text",
        title: "Three Options for Resilience Hubs",
        paragraphs: [
          "Resilience Hubs can be understood through three operating options: Base, Optimal and Ideal. Each option builds on the same principle of trusted community space serving everyday needs, disruption response and recovery.",
        ],
      },
      {
        kind: "criteria",
        title: "Resilience Hub options",
        groups: resilienceOptionCriteria,
      },
      {
        kind: "cards",
        title: "Examples of Mosques as Resilience Hubs",
        cards: resilienceExamples,
      },
    ],
  },
  resources: {
    slug: "resources",
    title: "Resources",
    eyebrow: "Guides and booklets",
    intro:
      "Beacon Mosque resources support mosque leaders with long-term planning, open days, management, awards information and inclusive leadership.",
    image: "/assets/interior/standards-wide.jpg",
    imageAlt: "Beacon Mosque standards graphic",
    sections: [
      {
        kind: "audio",
        title: "Beacon Mosque 2020-2050 / 30 Year Plan",
        text: "Audio resources covering the long-term Beacon Mosque vision, spirituality, safety and sustainability.",
        items: planAudioResources,
      },
      { kind: "cards", title: "Booklets and guides", cards: allResourceCards },
    ],
  },
  training: {
    slug: "training",
    title: "Training",
    eyebrow: "Leadership development",
    intro:
      "Training pathways, audio sessions and practical guides for trustees, managers, imams, staff and volunteers building stronger mosques.",
    image: "/assets/home/mosque-mba-programme.png",
    imageAlt: "Mosque MBA programme visual",
    ctas: [
      { label: "Visit Mosque MBA", href: "https://mosque.mba/" },
      {
        label: "Browse resources",
        href: "/resources/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: "Professional and practical formation",
        paragraphs: [
          "Beacon Mosque training combines structured leadership development with practical resources for day-to-day mosque governance, management and community service.",
          "From the Mosque MBA pathway to shorter audio and written materials, the aim is to help teams improve institutional clarity, delivery and long-term planning.",
        ],
      },
      {
        kind: "audio",
        title: "Beacon Mosque 2020-2050 / 30 Year Plan",
        text: "Audio sessions covering long-term vision, spirituality, safety and sustainability for mosque leadership teams.",
        items: planAudioResources,
      },
      {
        kind: "cards",
        title: "Training guides and materials",
        cards: allResourceCards.slice(0, 8),
      },
    ],
  },
  "category/news": {
    slug: "category/news",
    title: "News",
    eyebrow: "Stories and updates",
    intro:
      "Stories from award winners, accredited mosques and national community initiatives.",
    sections: [
      { kind: "cards", title: "Latest news", cards: communityStoryCards },
    ],
  },
  gallery: {
    slug: "gallery",
    title: "Our Gallery",
    eyebrow: "Beacon Mosque archive",
    intro:
      "A visual archive of mosque spaces, community gathering and Beacon Mosque activity.",
    image: "/wp-content/uploads/2016/11/gallery-9.jpg",
    imageAlt: "Beacon Mosque gallery image",
    ctas: [
      { label: "Explore awards", href: "/awards/" },
      { label: "View standards", href: "/standards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "gallery",
        title: "See our gallery",
        images: galleryImages,
      },
      {
        kind: "cards",
        title: "Continue exploring",
        cards: [
          {
            title: "Beacon Mosque Awards",
            text: "Explore the awards archive and current nomination pathway.",
            href: "/awards/",
            meta: "Awards",
          },
          {
            title: "Beacon Mosque Standards",
            text: "Review the 10 quality standards for mosque leadership, management and service.",
            href: "/standards/",
            meta: "Standards",
          },
          {
            title: "Accredited Beacon Mosques",
            text: "View mosques recognised through the Beacon Mosque accreditation pathway.",
            href: "/beacon-mosques/",
            meta: "Accreditation",
          },
        ],
      },
    ],
  },
  "contact-us": {
    slug: "contact-us",
    title: "Contact Us",
    eyebrow: "Get in touch",
    intro: "Visit us or send us a message.",
    image: "/assets/interior/about-hero.jpg",
    imageAlt: "Beacon Mosque interior architectural detail",
    ctas: [
      { label: "Email Beacon Mosque", href: "mailto:info@beaconmosque.com" },
      {
        label: "Call Beacon Mosque",
        href: "tel:01494416202",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: "Visit us or send us a message",
        paragraphs: [
          "Contact Beacon Mosque to discuss accreditation, awards, resources or community excellence support.",
          "The Beacon Mosque head office is based at 41 Baker Street, High Wycombe, HP11 2RX.",
        ],
      },
      { kind: "cards", title: "Head Office", cards: contactCards },
      {
        kind: "form",
        form: "contact",
        title: "Send a message",
        text: "Use this form to contact Beacon Mosque.",
      },
    ],
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    eyebrow: "Privacy",
    intro:
      "Beacon Mosque is committed to protecting and respecting your privacy and complying with GDPR principles.",
    sections: [
      {
        kind: "text",
        title: "Our Privacy Policy",
        paragraphs: [
          "The policy sets out the basis on which Beacon Mosque will process personal data collected from you, or that you provide through your use of the website or mailing list.",
          "Beacon Mosque aims to process information fairly and transparently. If you have questions or want to suggest improvements to privacy information, please contact us.",
        ],
      },
      {
        kind: "text",
        title: "Cookies and Visitors",
        paragraphs: [
          "Cookies are small text files downloaded to your device when you visit a website. Beacon Mosque may use cookies to store anonymous browsing information and understand how visitors use the website.",
          "Standard internet log information and visitor behaviour patterns may be collected through analytics and CRM tools in a way that does not identify visitors.",
        ],
      },
      {
        kind: "text",
        title: "Your Information",
        paragraphs: [
          "Depending on services you interact with, Beacon Mosque may hold details such as name, address, email address, telephone number, Gift Aid status, encrypted payment tokens, website visit details, communication history, marketing preferences, organisational relationships, social media profile information and data acquired by third parties.",
          "Beacon Mosque will take reasonable steps, including appropriate policies, procedures and security features, to keep data secure and handle it in accordance with the Privacy Policy.",
        ],
      },
      {
        kind: "text",
        title: "Mailing List Sign-up",
        paragraphs: [
          "When you subscribe to the mailing list, Beacon Mosque collects personal information to tell you about events and activities you have expressed interest in, contact you when additional information is needed, confirm records are correct and check periodically that you are satisfied with services.",
          "Beacon Mosque does not rent or trade email lists with other organisations and businesses. MailChimp and YMLP may be used to deliver mailing list news and gather email opening and click statistics that help monitor and improve communication.",
          "You can unsubscribe from the mailing list at any time by clicking the unsubscribe link in an email or by emailing info@faithassociates.co.uk.",
        ],
      },
      {
        kind: "text",
        title: "Links and Access",
        paragraphs: [
          "Faith Associates websites may contain links to third-party websites and social media features. Those sites are not governed by this Privacy Policy, so visitors should check the relevant privacy statements for those services.",
          "You are entitled to access the personal information held about you. Email access requests to info@faithassociates.co.uk.",
        ],
      },
    ],
  },
};

awardCategoryNominations.forEach((category) => {
  const slug = category.href.replace(/^\/|\/$/g, "");
  const detail = awardCategoryNominationDetails.find(
    (item) => item.title === category.title,
  );
  const winnerCardsFromOtherYears = findWinnerCardsForOtherYears(
    category.title,
    "2026",
  );

  if (!detail) {
    throw new Error(
      `Missing nomination detail content for ${category.title}`,
    );
  }

  pageMap[slug] = {
    slug,
    title: category.title,
    eyebrow: "Awards 2026 nomination",
    intro: detail.summary,
    image:
      getAwardCategoryMedia(category.title)?.image ??
      "/assets/awards/beacon-mosque-awards-2026-poster.png",
    imageAlt:
      getAwardCategoryMedia(category.title)?.imageAlt ??
      `${category.title} category artwork`,
    ctas: [
      { label: "Nominate", href: detail.nominateHref },
      {
        label: "View all award categories",
        href: "/awards/beacon-mosque-awards-2026/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: category.title,
        paragraphs: [...detail.introParagraphs, ...detail.judgingParagraphs],
      },
      {
        kind: "text",
        title: "Important note",
        paragraphs: [detail.note],
      },
      {
        kind: "awardHistory",
        title: "Previous winners",
        items: detail.previousWinners,
      },
      ...(winnerCardsFromOtherYears.length
        ? [
            {
              kind: "cards" as const,
              title: `Winners from other years in ${category.title}`,
              cards: winnerCardsFromOtherYears,
            },
          ]
        : []),
      {
        kind: "cards",
        title: "Other award categories",
        cards: awardCategoryCards.filter((card) => card.href !== category.href),
      },
    ],
  };
});

featuredAwardRecognitionProfiles2025.forEach((profile) => {
  const slug = profile.href.replace(/^\/|\/$/g, "");
  const winner = getAwardWinnerRecord2025ByHref(profile.href);
  const winnerCardsFromOtherYears = winner
    ? findWinnerCardsForOtherYears(profile.category, "2025")
    : [];
  const relatedProfiles = awardRecognitionCards2025
    .filter((card) => card.href !== profile.href)
    .filter(
        (card) =>
        featuredAwardRecognitionProfiles2025.find(
          (item) => item.href === card.href,
        )
          ?.category === profile.category,
    )
    .slice(0, 6);

  pageMap[slug] = {
    slug,
    title: profile.title,
    eyebrow: `${profile.status} - ${profile.category}`,
    intro: profile.summary,
    image: winner?.image ?? "/assets/awards/2025/bbma-2025-identity.png",
    imageAlt: winner?.imageAlt ?? "British Beacon Mosque Awards 2025 identity",
    ctas: [
      {
        label: "Back to Awards 2025",
        href: "/awards/beacon-mosque-awards-2025/",
      },
      { label: "View awards archive", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: profile.category,
        paragraphs: [
          `${profile.title} was listed as a ${profile.status.toLowerCase()} in the ${profile.category} category for the 2025 Beacon Mosque Awards.`,
          profile.summary,
          "The Beacon Mosque Awards recognise mosques, madrassahs, imams, alimahs and volunteers whose work strengthens Islamic service, leadership, education and community life.",
        ],
      },
      ...(winner
        ? [
            ...(winnerCardsFromOtherYears.length
              ? [
                  {
                    kind: "cards" as const,
                    title: `Winners from other years in ${profile.category}`,
                    cards: winnerCardsFromOtherYears,
                  },
                ]
              : []),
            {
              kind: "cards" as const,
              title: "2025 winner categories",
              cards: awardCategoryCardsForYear("2025").filter(
                (card) => card.title !== profile.category,
              ),
            },
          ]
        : [
            {
              kind: "cards" as const,
              title: relatedProfiles.length
                ? `More ${profile.category} profiles`
                : "More 2025 award profiles",
              cards: relatedProfiles.length
                ? relatedProfiles
                : awardRecognitionCards2025
                    .filter((card) => card.href !== profile.href)
                    .slice(0, 6),
            },
          ]),
    ],
  };
});

standards.forEach((standard) => {
  const slug = standard.href.replace(/^\/|\/$/g, "");
  const detail = standardDetails[slug];

  if (!detail) {
    throw new Error(`Missing standard detail content for ${slug}`);
  }

  pageMap[slug] = {
    slug,
    title: standard.title,
    eyebrow: "Beacon Mosque Standard",
    intro: detail.intro,
    image: "/assets/interior/standards-wide.jpg",
    imageAlt: "Beacon Mosque standards graphic",
    ctas: [
      { label: "View all standards", href: "/standards/" },
      {
        label: "Start accreditation",
        href: "/accreditation-process/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: "Standard overview",
        paragraphs: [
          `${standard.quote} ${standard.reference}`,
          ...detail.summary,
        ],
      },
      {
        kind: "criteria",
        title: "What this standard covers",
        groups: detail.groups,
      },
      { kind: "standards" },
    ],
  };
});

newsCards.forEach((card) => {
  const slug = card.href.replace(/^\/|\/$/g, "");
  const detail = newsDetails[slug];

  if (!detail) {
    throw new Error(`Missing news detail content for ${slug}`);
  }

  pageMap[slug] = {
    slug,
    title: card.title,
    eyebrow: card.meta,
    intro: detail.intro,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      { label: "Back to news", href: "/category/news/" },
      { label: "Explore awards", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: detail.sourceLabel,
        paragraphs: detail.paragraphs,
      },
      {
        kind: "cards",
        title: "Related stories",
        cards: newsCards.filter((item) => item.href !== card.href),
      },
    ],
  };
});

[...referenceNewsArticles, ...referenceBlogArticles].forEach((article) => {
  const slug = article.href.replace(/^\/|\/$/g, "");
  const relatedStories = communityStoryCards
    .filter((item) => item.href !== article.href)
    .slice(0, 8);

  pageMap[slug] = {
    slug,
    title: article.title,
    eyebrow: article.meta,
    intro: article.summary,
    image: article.image ?? "/assets/interior/awards-gala.jpg",
    imageAlt: article.imageAlt ?? "Beacon Mosque awards ceremony",
    ctas: [
      { label: "Back to news", href: "/category/news/" },
      { label: "Explore awards", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: article.sourceLabel ?? "News story",
        paragraphs: article.paragraphs,
      },
      {
        kind: "cards",
        title: "Related stories",
        cards: relatedStories,
      },
    ],
  };
});

mosqueResourceArticles.forEach((article) => {
  const slug = article.href.replace(/^\/|\/$/g, "");
  const relatedResources = allResourceCards
    .filter((item) => item.href !== article.href)
    .slice(0, 8);

  pageMap[slug] = {
    slug,
    title: article.title,
    eyebrow: article.meta,
    intro: article.summary,
    image: article.image,
    imageAlt: article.imageAlt,
    ctas: [
      { label: "Back to resources", href: "/resources/" },
      { label: "View standards", href: "/standards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: article.sourceLabel ?? "Resource guide",
        paragraphs: article.paragraphs,
      },
      {
        kind: "cards",
        title: "More resources",
        cards: relatedResources,
      },
    ],
  };
});

accreditedMosques.forEach((mosque) => {
  const slug = mosque.href.replace(/^\/|\/$/g, "");
  const detail = accreditedDetails[slug];

  if (!detail) {
    throw new Error(`Missing accredited mosque detail content for ${slug}`);
  }

  pageMap[slug] = {
    slug,
    title: mosque.title,
    eyebrow: detail.rating,
    intro: detail.intro,
    image: mosque.image,
    imageAlt: mosque.imageAlt,
    ctas: [
      { label: "View accreditation process", href: "/accreditation-process/" },
      {
        label: "See all accredited mosques",
        href: "/beacon-mosques/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: "Kite-Mark Quality for Mosques",
        paragraphs: detail.paragraphs,
      },
      {
        kind: "criteria",
        title: "Accreditation profile",
        groups: detail.groups,
      },
      {
        kind: "standards",
      },
      {
        kind: "cards",
        title: "Other accredited Beacon Mosques",
        cards: accreditedMosques
          .filter((item) => item.href !== mosque.href)
          .map((item) => ({
            title: item.title,
            text: item.text,
            href: item.href,
            meta: "Accredited",
          })),
      },
    ],
  };
});

awardCategoryPages2025.forEach((category) => {
  const slug = category.href.replace(/^\/|\/$/g, "");
  const winner = getAwardWinnerRecord2025ByCategory(category.title);
  const winnerCardsFromOtherYears = winner
    ? findWinnerCardsForOtherYears(category.title, "2025")
    : [];

  pageMap[slug] = {
    slug,
    title: `Beacon Mosque 2025 ${category.title}`,
    eyebrow: "Awards 2025 category",
    intro: `Explore the 2025 Beacon Mosque Awards profiles listed in the ${category.title} category.`,
    image: winner?.image ?? "/assets/awards/2025/bbma-2025-identity.png",
    imageAlt: winner?.imageAlt ?? "British Beacon Mosque Awards 2025 identity",
    ctas: [
      {
        label: "Back to Awards 2025",
        href: "/awards/beacon-mosque-awards-2025/",
      },
      {
        label: "Nominate for 2026",
        href:
          awardCategoryNominations.find((item) => item.title === category.title)
            ?.href ?? "/awards/beacon-mosque-awards-2026/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: category.title,
        paragraphs: [
          `The ${category.title} category recognises excellence in service, leadership and measurable community contribution.`,
          winner
            ? `${winner.winnerName} is presented here as the 2025 winner for this category.`
            : "The 2025 profiles below include the winner from this category.",
          "The 2025 profiles below include the winner from this category.",
        ],
      },
      ...(winnerCardsFromOtherYears.length
        ? [
            {
              kind: "cards" as const,
              title: `Winners from other years in ${category.title}`,
              cards: winnerCardsFromOtherYears,
            },
          ]
        : []),
      {
        kind: "cards",
        title: "2025 winner categories",
        cards: awardCategoryCardsForYear("2025").filter(
          (card) => card.href !== category.href,
        ),
      },
    ],
  };
});

awardRecognitionProfiles2024.forEach((profile) => {
  const slug = profile.href.replace(/^\/|\/$/g, "");
  const winner = getAwardWinnerRecord2024ByHref(profile.href);
  const winnerCardsFromOtherYears = winner
    ? findWinnerCardsForOtherYears(profile.category, "2024")
    : [];
  const relatedProfiles = awardRecognitionCards2024
    .filter((card) => card.href !== profile.href)
    .filter(
      (card) =>
        awardRecognitionProfiles2024.find((item) => item.href === card.href)
          ?.category === profile.category,
    )
    .slice(0, 6);

  pageMap[slug] = {
    slug,
    title: profile.title,
    eyebrow: `${profile.status} - ${profile.category}`,
    intro: profile.summary,
    image: winner?.image ?? "/assets/interior/awards-gala.jpg",
    imageAlt: winner?.imageAlt ?? "Beacon Mosque awards ceremony",
    ctas: [
      { label: "Back to Awards 2024", href: "/awards/awards2024/" },
      { label: "View awards archive", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: profile.category,
        paragraphs: [
          `${profile.title} was listed as ${profile.status.toLowerCase()} in the ${profile.category} category for the 2024 Beacon Mosque Awards.`,
          profile.summary,
          "The Beacon Mosque Awards recognise mosques, madrassahs, imams, alimahs and volunteers whose work strengthens Islamic service, leadership, education and community life.",
        ],
      },
      ...(winner
        ? [
            ...(winnerCardsFromOtherYears.length
              ? [
                  {
                    kind: "cards" as const,
                    title: `Winners from other years in ${profile.category}`,
                    cards: winnerCardsFromOtherYears,
                  },
                ]
              : []),
            {
              kind: "cards" as const,
              title: "2024 winner categories",
              cards: awardCategoryCardsForYear("2024").filter(
                (card) => card.title !== profile.category,
              ),
            },
          ]
        : [
            {
              kind: "cards" as const,
              title: relatedProfiles.length
                ? `More ${profile.category} profiles`
                : "More 2024 award profiles",
              cards: relatedProfiles.length
                ? relatedProfiles
                : awardRecognitionCards2024
                    .filter((card) => card.href !== profile.href)
                    .slice(0, 6),
            },
          ]),
    ],
  };
});

awardCategoryPages2024.forEach((category) => {
  const slug = category.href.replace(/^\/|\/$/g, "");
  const winner = getAwardWinnerRecord2024ByCategory(category.title);
  const categoryProfiles = awardRecognitionCards2024.filter(
    (card) =>
      awardRecognitionProfiles2024.find((profile) => profile.href === card.href)
        ?.category === category.title,
  );

  pageMap[slug] = {
    slug,
    title: `Beacon Mosque 2024 ${category.title}`,
    eyebrow: "Awards 2024 category",
    intro: `Explore the 2024 Beacon Mosque Awards profiles listed in the ${category.title} category.`,
    image: winner?.image ?? "/assets/interior/awards-gala.jpg",
    imageAlt: winner?.imageAlt ?? "Beacon Mosque awards ceremony",
    ctas: [
      { label: "Back to Awards 2024", href: "/awards/awards2024/" },
      {
        label: "View Awards 2025",
        href: "/awards/beacon-mosque-awards-2025/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: category.title,
        paragraphs: [
          `The ${category.title} category recognised excellence in service, leadership and measurable community contribution during the 2024 awards cycle.`,
          winner
            ? `${winner.winnerName} is presented here as the 2024 winner for this category.`
            : "The profiles below include shortlisted mosques and individuals from this category.",
          "The profiles below include shortlisted mosques and individuals from this category.",
        ],
      },
      {
        kind: "cards",
        title: `${category.title} profiles`,
        cards: categoryProfiles.length
          ? categoryProfiles
          : [
              {
                title: category.title,
                text: "This category formed part of the 2024 Beacon Mosque Awards recognition programme.",
                href: "/awards/awards2024/",
                meta: "2024 category",
              },
            ],
      },
      {
        kind: "cards",
        title: "Other 2024 categories",
        cards: awardCategoryCardsForYear("2024").filter(
          (card) => card.href !== category.href,
        ),
      },
    ],
  };
});

awardCategoryPages2023.forEach((category) => {
  const slug = category.href.replace(/^\/|\/$/g, "");

  pageMap[slug] = {
    slug,
    title: `Beacon Mosque 2023 ${category.title}`,
    eyebrow: "Awards 2023 category",
    intro: `Explore the ${category.title} category from the 2023 Beacon Mosque Awards.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      { label: "Back to Awards 2023", href: "/awards/awards2023/" },
      {
        label: "View Awards 2024",
        href: "/awards/awards2024/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: category.title,
        paragraphs: [
          `The ${category.title} category formed part of the 2023 Beacon Mosque Awards recognition programme.`,
          "The annual awards celebrated mosques, madrassahs, imams, alimahs and volunteers whose work strengthened Islamic service, leadership, education and community life.",
        ],
      },
      {
        kind: "cards",
        title: "2023 award categories",
        cards: awardCategoryCardsForYear("2023").filter(
          (card) => card.href !== category.href,
        ),
      },
      {
        kind: "cards",
        title: "Continue through the awards archive",
        cards: awardsArchive
          .filter((card) => card.href !== "/awards/awards2023/")
          .slice(0, 6),
      },
    ],
  };
});

[
  {
    year: "2023",
    awardsHref: "/awards/awards2023/",
    cards: winnerCards2023,
  },
  {
    year: "2022",
    awardsHref: "/awards/british-beacon-mosque-awards-2022/",
    cards: winnerCards2022,
  },
  {
    year: "2021",
    awardsHref: "/british-beacon-mosque-awards-2021/",
    cards: winnerCards2021,
  },
].forEach(({ year, awardsHref, cards }) => {
  cards.forEach((card) => {
    const slug = card.href.replace(/^\/|\/$/g, "");
    const category = card.meta ?? `${year} winner`;

    pageMap[slug] = {
      slug,
      title: card.title,
      eyebrow: `${year} winner - ${category}`,
      intro: card.text,
      image: card.image ?? "/assets/interior/awards-gala.jpg",
      imageAlt: card.imageAlt ?? `${card.title} ${year} winner`,
      ctas: [
        { label: `Back to Awards ${year}`, href: awardsHref },
        { label: "View awards archive", href: "/awards/", variant: "secondary" },
      ],
      sections: [
        {
          kind: "text",
          title: category,
          paragraphs: [
            `${card.title} is presented here as the ${year} winner in the ${category} category.`,
            card.text,
            "The Beacon Mosque Awards recognise mosques, madrassahs, imams, alimahs and volunteers whose work strengthens Islamic service, leadership, education and community life.",
          ],
        },
        {
          kind: "cards",
          title: `Other ${year} winners`,
          cards: cards.filter((item) => item.href !== card.href),
        },
        ...(findWinnerCardsForOtherYears(category, year).length
          ? [
              {
                kind: "cards" as const,
                title: `Winners from other years in ${category}`,
                cards: findWinnerCardsForOtherYears(category, year),
              },
            ]
          : []),
      ],
    };
  });
});

awardCategoryPages2022.forEach((category) => {
  const slug = category.href.replace(/^\/|\/$/g, "");
  const categoryProfiles = awardRecognitionCards2022.filter(
    (card) =>
      awardRecognitionProfiles2022.find((profile) => profile.href === card.href)
        ?.category === category.title,
  );
  const categoryResources = [
    ...awardFinalistCards2022,
    ...awardVoteCards2022,
  ].filter((card) => {
    const finalist = awardFinalistPages2022.find(
      (page) => page.href === card.href,
    );
    const vote = awardVotePages2022.find((page) => page.href === card.href);
    return (finalist ?? vote)?.category === category.title;
  });

  const page: InteriorPage = {
    slug,
    title: `Beacon Mosque 2022 ${category.title}`,
    eyebrow: "Awards 2022 category",
    intro: `Explore the ${category.title} category from the 2022 Beacon Mosque Awards.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: "Back to Awards 2022",
        href: "/awards/british-beacon-mosque-awards-2022/",
      },
      {
        label: "View Awards 2023",
        href: "/awards/awards2023/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: category.title,
        paragraphs: [
          `The ${category.title} category formed part of the 2022 Beacon Mosque Awards recognition programme.`,
          "This archive page keeps the category, finalist and shortlisted profile links available in the modern awards design system.",
        ],
      },
      {
        kind: "cards",
        title: categoryProfiles.length
          ? `${category.title} shortlisted profiles`
          : "2022 category resources",
        cards: categoryProfiles.length
          ? categoryProfiles
          : [
              {
                title: category.title,
                text: "This category formed part of the 2022 Beacon Mosque Awards recognition programme.",
                href: "/awards/british-beacon-mosque-awards-2022/",
                meta: "2022 category",
              },
            ],
      },
      ...(categoryResources.length
        ? [
            {
              kind: "cards" as const,
              title: "Finalist and voting pages",
              cards: categoryResources,
            },
          ]
        : []),
      {
        kind: "cards",
        title: "Other 2022 categories",
        cards: awardCategoryCardsForYear("2022").filter(
          (card) => card.href !== category.href,
        ),
      },
    ],
  };

  pageMap[slug] = page;

  if (category.title === "Best Run Mosque") {
    pageMap["best-run-mosque-2022-2"] = {
      ...page,
      slug: "best-run-mosque-2022-2",
    };
  }
});

awardRecognitionProfiles2022.forEach((profile) => {
  const slug = profile.href.replace(/^\/|\/$/g, "");
  const relatedProfiles = awardRecognitionCards2022
    .filter(
      (card) =>
        awardRecognitionProfiles2022.find((item) => item.href === card.href)
          ?.category === profile.category,
    )
    .filter((card) => card.href !== profile.href);

  pageMap[slug] = {
    slug,
    title: profile.title,
    eyebrow: `${profile.status} 2022 profile`,
    intro: profile.summary,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: `View ${profile.category}`,
        href:
          awardCategoryHref2022[profile.category] ??
          "/awards/british-beacon-mosque-awards-2022/",
      },
      {
        label: "Back to Awards 2022",
        href: "/awards/british-beacon-mosque-awards-2022/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: profile.category,
        paragraphs: [
          `${profile.title} was recognised as a shortlisted profile in the 2022 Beacon Mosque Awards.`,
          "The profile remains part of the historic awards archive celebrating Islamic service, leadership, education and community excellence.",
        ],
      },
      {
        kind: "cards",
        title: relatedProfiles.length
          ? `More ${profile.category} profiles`
          : "More 2022 award profiles",
        cards: relatedProfiles.length
          ? relatedProfiles
          : awardRecognitionCards2022
              .filter((card) => card.href !== profile.href)
              .slice(0, 6),
      },
    ],
  };
});

[...awardFinalistPages2022, ...awardVotePages2022].forEach((summaryPage) => {
  const slug = summaryPage.href.replace(/^\/|\/$/g, "");
  const categoryProfiles = awardRecognitionCards2022.filter(
    (card) =>
      awardRecognitionProfiles2022.find((profile) => profile.href === card.href)
        ?.category === summaryPage.category,
  );
  const isVotePage = summaryPage.href.includes("-vote/");

  pageMap[slug] = {
    slug,
    title: summaryPage.title,
    eyebrow: isVotePage ? "Awards 2022 voting" : "Awards 2022 finalists",
    intro: `${summaryPage.title} from the 2022 Beacon Mosque Awards archive.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: `View ${summaryPage.category}`,
        href:
          awardCategoryHref2022[summaryPage.category] ??
          "/awards/british-beacon-mosque-awards-2022/",
      },
      {
        label: "Back to Awards 2022",
        href: "/awards/british-beacon-mosque-awards-2022/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: summaryPage.category,
        paragraphs: [
          `${summaryPage.title} is part of the fifth Beacon Mosque Awards archive.`,
          isVotePage
            ? "The voting route is retained as a historic reference point and is presented here with the related category archive."
            : "The finalists route is retained as a historic reference point and is presented here with related shortlisted profiles.",
        ],
      },
      {
        kind: "cards",
        title: categoryProfiles.length
          ? `${summaryPage.category} shortlisted profiles`
          : "2022 category",
        cards: categoryProfiles.length
          ? categoryProfiles
          : [
              {
                title: summaryPage.category,
                text: "This category formed part of the 2022 Beacon Mosque Awards.",
                href:
                  awardCategoryHref2022[summaryPage.category] ??
                  "/awards/british-beacon-mosque-awards-2022/",
                meta: "2022 category",
              },
            ],
      },
    ],
  };
});

pageMap["beacon-mosque-awards-2022-media-wall"] = {
  slug: "beacon-mosque-awards-2022-media-wall",
  title: "Beacon Mosque Awards 2022 Media Wall",
  eyebrow: "Awards 2022 media",
  intro:
    "A historic media wall route from the 2022 Beacon Mosque Awards archive.",
  image: awardsGallery2022[7].src,
  imageAlt: awardsGallery2022[7].alt,
  ctas: [
    {
      label: "Back to Awards 2022",
      href: "/awards/british-beacon-mosque-awards-2022/",
    },
    { label: "View Awards Archive", href: "/awards/", variant: "secondary" },
  ],
  sections: [
    {
      kind: "text",
      title: "2022 awards media",
      paragraphs: [
        "The 2022 media wall route is retained as part of the historic Beacon Mosque Awards archive.",
        "The fifth awards cycle celebrated mosques, leaders, educators, alimahs, volunteers and community services recognised for excellence.",
      ],
    },
    {
      kind: "gallery",
      title: "2022 ceremony gallery",
      images: awardsGallery2022,
    },
    {
      kind: "cards",
      title: "2022 award categories",
      cards: awardCategoryCardsForYear("2022"),
    },
    {
      kind: "cards",
      title: "2022 shortlisted profiles",
      cards: awardRecognitionCards2022.slice(0, 12),
    },
  ],
};

awardCategoryPages2021.forEach((category) => {
  const slug = category.href.replace(/^\/|\/$/g, "");
  const categoryProfiles = awardRecognitionCards2021.filter(
    (card) =>
      awardRecognitionProfiles2021.find((profile) => profile.href === card.href)
        ?.category === category.title,
  );
  const categoryResources = [
    ...awardVoteCards2021,
    ...awardResultCards2021,
  ].filter((card) => {
    const vote = awardVotePages2021.find((page) => page.href === card.href);
    const result = awardResultPages2021.find((page) => page.href === card.href);
    return (vote ?? result)?.category === category.title;
  });

  const page: InteriorPage = {
    slug,
    title: `Beacon Mosque 2021 ${category.title}`,
    eyebrow: "Awards 2021 category",
    intro: `Explore the ${category.title} category from the 2021 Beacon Mosque Awards.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: "Back to Awards 2021",
        href: "/british-beacon-mosque-awards-2021/",
      },
      {
        label: "View Awards 2022",
        href: "/awards/british-beacon-mosque-awards-2022/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: category.title,
        paragraphs: [
          `The ${category.title} category formed part of the 2021 Beacon Mosque Awards recognition programme.`,
          "This page keeps the category, voting, results and shortlisted profile links available inside the modern awards archive.",
        ],
      },
      {
        kind: "cards",
        title: categoryProfiles.length
          ? `${category.title} shortlisted profiles`
          : "2021 category resources",
        cards: categoryProfiles.length
          ? categoryProfiles
          : [
              {
                title: category.title,
                text: "This category formed part of the 2021 Beacon Mosque Awards recognition programme.",
                href: "/british-beacon-mosque-awards-2021/",
                meta: "2021 category",
              },
            ],
      },
      ...(categoryResources.length
        ? [
            {
              kind: "cards" as const,
              title: "Voting and results pages",
              cards: categoryResources,
            },
          ]
        : []),
      {
        kind: "cards",
        title: "Other 2021 categories",
        cards: awardCategoryCardsForYear("2021").filter(
          (card) => card.href !== category.href,
        ),
      },
    ],
  };

  pageMap[slug] = page;
  category.aliases?.forEach((alias) => {
    const aliasSlug = alias.replace(/^\/|\/$/g, "");
    pageMap[aliasSlug] = {
      ...page,
      slug: aliasSlug,
    };
  });
});

awardRecognitionProfiles2021.forEach((profile) => {
  const slug = profile.href.replace(/^\/|\/$/g, "");
  const relatedProfiles = awardRecognitionCards2021
    .filter(
      (card) =>
        awardRecognitionProfiles2021.find((item) => item.href === card.href)
          ?.category === profile.category,
    )
    .filter((card) => card.href !== profile.href);

  pageMap[slug] = {
    slug,
    title: profile.title,
    eyebrow: `${profile.status} 2021 profile`,
    intro: profile.summary,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: `View ${profile.category}`,
        href:
          awardCategoryHref2021[profile.category] ??
          "/british-beacon-mosque-awards-2021/",
      },
      {
        label: "Back to Awards 2021",
        href: "/british-beacon-mosque-awards-2021/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: profile.category,
        paragraphs: [
          `${profile.title} was recognised as a shortlisted profile in the 2021 Beacon Mosque Awards.`,
          "The profile remains part of the historic awards archive celebrating Islamic service, leadership, education and community excellence.",
        ],
      },
      {
        kind: "cards",
        title: relatedProfiles.length
          ? `More ${profile.category} profiles`
          : "More 2021 award profiles",
        cards: relatedProfiles.length
          ? relatedProfiles
          : awardRecognitionCards2021
              .filter((card) => card.href !== profile.href)
              .slice(0, 6),
      },
    ],
  };
});

[...awardVotePages2021, ...awardResultPages2021].forEach((summaryPage) => {
  const slug = summaryPage.href.replace(/^\/|\/$/g, "");
  const categoryProfiles = awardRecognitionCards2021.filter(
    (card) =>
      awardRecognitionProfiles2021.find((profile) => profile.href === card.href)
        ?.category === summaryPage.category,
  );
  const isVotePage = summaryPage.href.includes("-vote/");

  pageMap[slug] = {
    slug,
    title: summaryPage.title,
    eyebrow: isVotePage ? "Awards 2021 voting" : "Awards 2021 results",
    intro: `${summaryPage.title} from the 2021 Beacon Mosque Awards archive.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: `View ${summaryPage.category}`,
        href:
          awardCategoryHref2021[summaryPage.category] ??
          "/british-beacon-mosque-awards-2021/",
      },
      {
        label: "Back to Awards 2021",
        href: "/british-beacon-mosque-awards-2021/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: summaryPage.category,
        paragraphs: [
          `${summaryPage.title} is part of the fourth Beacon Mosque Awards archive.`,
          isVotePage
            ? "The voting route is retained as a historic reference point and is presented here with the related category archive."
            : "The results route is retained as a historic reference point and is presented here with related shortlisted profiles.",
        ],
      },
      {
        kind: "cards",
        title: categoryProfiles.length
          ? `${summaryPage.category} shortlisted profiles`
          : "2021 category",
        cards: categoryProfiles.length
          ? categoryProfiles
          : [
              {
                title: summaryPage.category,
                text: "This category formed part of the 2021 Beacon Mosque Awards.",
                href:
                  awardCategoryHref2021[summaryPage.category] ??
                  "/british-beacon-mosque-awards-2021/",
                meta: "2021 category",
              },
            ],
      },
    ],
  };
});

awardCategoryPages2020.forEach((category) => {
  const slug = category.href.replace(/^\/|\/$/g, "");
  const categoryProfiles = awardRecognitionCards2020.filter(
    (card) =>
      awardRecognitionProfiles2020.find((profile) => profile.href === card.href)
        ?.category === category.title,
  );
  const categoryResources = awardVoteCards2020.filter(
    (card) =>
      awardVotePages2020.find((page) => page.href === card.href)?.category ===
      category.title,
  );

  pageMap[slug] = {
    slug,
    title: `Beacon Mosque 2020 ${category.title}`,
    eyebrow: "Awards 2020 category",
    intro: `Explore the ${category.title} category from the 2020 Beacon Mosque Awards.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: "Back to Awards 2020",
        href: "/2020-british-beacon-mosque-awards/",
      },
      {
        label: "View Awards 2021",
        href: "/british-beacon-mosque-awards-2021/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: category.title,
        paragraphs: [
          `The ${category.title} category formed part of the 2020 Beacon Mosque Awards recognition programme.`,
          "This page keeps the category, voting and shortlisted profile links available inside the modern awards archive.",
        ],
      },
      {
        kind: "cards",
        title: categoryProfiles.length
          ? `${category.title} shortlisted profiles`
          : "2020 category resources",
        cards: categoryProfiles.length
          ? categoryProfiles
          : [
              {
                title: category.title,
                text: "This category formed part of the 2020 Beacon Mosque Awards recognition programme.",
                href: "/2020-british-beacon-mosque-awards/",
                meta: "2020 category",
              },
            ],
      },
      ...(categoryResources.length
        ? [
            {
              kind: "cards" as const,
              title: "Voting page",
              cards: categoryResources,
            },
          ]
        : []),
      {
        kind: "cards",
        title: "Other 2020 categories",
        cards: awardCategoryCardsForYear("2020").filter(
          (card) => card.href !== category.href,
        ),
      },
    ],
  };
});

awardRecognitionProfiles2020.forEach((profile) => {
  const slug = profile.href.replace(/^\/|\/$/g, "");
  const relatedProfiles = awardRecognitionCards2020
    .filter(
      (card) =>
        awardRecognitionProfiles2020.find((item) => item.href === card.href)
          ?.category === profile.category,
    )
    .filter((card) => card.href !== profile.href);

  pageMap[slug] = {
    slug,
    title: profile.title,
    eyebrow: `${profile.status} 2020 profile`,
    intro: profile.summary,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: `View ${profile.category}`,
        href:
          awardCategoryHref2020[profile.category] ??
          "/2020-british-beacon-mosque-awards/",
      },
      {
        label: "Back to Awards 2020",
        href: "/2020-british-beacon-mosque-awards/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: profile.category,
        paragraphs: [
          `${profile.title} was recognised as a shortlisted profile in the 2020 Beacon Mosque Awards.`,
          "The profile remains part of the historic awards archive celebrating Islamic service, leadership, education and community excellence.",
        ],
      },
      {
        kind: "cards",
        title: relatedProfiles.length
          ? `More ${profile.category} profiles`
          : "More 2020 award profiles",
        cards: relatedProfiles.length
          ? relatedProfiles
          : awardRecognitionCards2020
              .filter((card) => card.href !== profile.href)
              .slice(0, 6),
      },
    ],
  };
});

awardVotePages2020.forEach((summaryPage) => {
  const slug = summaryPage.href.replace(/^\/|\/$/g, "");
  const categoryProfiles = awardRecognitionCards2020.filter(
    (card) =>
      awardRecognitionProfiles2020.find((profile) => profile.href === card.href)
        ?.category === summaryPage.category,
  );

  pageMap[slug] = {
    slug,
    title: summaryPage.title,
    eyebrow: "Awards 2020 voting",
    intro: `${summaryPage.title} from the 2020 Beacon Mosque Awards archive.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: `View ${summaryPage.category}`,
        href:
          awardCategoryHref2020[summaryPage.category] ??
          "/2020-british-beacon-mosque-awards/",
      },
      {
        label: "Back to Awards 2020",
        href: "/2020-british-beacon-mosque-awards/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: summaryPage.category,
        paragraphs: [
          `${summaryPage.title} is part of the third Beacon Mosque Awards archive.`,
          "The voting route is retained as a historic reference point and is presented here with related category profiles.",
        ],
      },
      {
        kind: "cards",
        title: categoryProfiles.length
          ? `${summaryPage.category} shortlisted profiles`
          : "2020 category",
        cards: categoryProfiles.length
          ? categoryProfiles
          : [
              {
                title: summaryPage.category,
                text: "This category formed part of the 2020 Beacon Mosque Awards.",
                href:
                  awardCategoryHref2020[summaryPage.category] ??
                  "/2020-british-beacon-mosque-awards/",
                meta: "2020 category",
              },
            ],
      },
    ],
  };
});

awardProgrammePages2020.forEach((programmePage) => {
  const slug = programmePage.href.replace(/^\/|\/$/g, "");

  pageMap[slug] = {
    slug,
    title: programmePage.title,
    eyebrow: programmePage.meta,
    intro: `${programmePage.title} from the 2020 Beacon Mosque Awards archive.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: "Back to Awards 2020",
        href: "/2020-british-beacon-mosque-awards/",
      },
      { label: "View Awards Archive", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: "2020 awards programme",
        paragraphs: [
          `${programmePage.title} is retained as part of the third Beacon Mosque Awards programme archive.`,
          "The 2020 awards cycle recognised mosque service, leadership and community excellence during an exceptional year for UK mosques.",
        ],
      },
      {
        kind: "cards",
        title: "2020 award categories",
        cards: awardCategoryCardsForYear("2020"),
      },
    ],
  };
});

awardStoryPages2019.forEach((story) => {
  const slug = story.href.replace(/^\/|\/$/g, "");

  pageMap[slug] = {
    slug,
    title: story.title,
    eyebrow: story.meta,
    intro: story.summary,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: "Back to Awards 2019",
        href: "/awards/2019-british-beacon-mosque-awards/",
      },
      { label: "View Awards Archive", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: "2019 awards story",
        paragraphs: [
          `${story.title} is retained as part of the second Beacon Mosque Awards archive.`,
          "The story sits within the wider awards history celebrating mosque excellence, service, leadership and recognition across UK Muslim communities.",
        ],
      },
      {
        kind: "cards",
        title: "More 2019 awards stories",
        cards: awardStoryCards2019.filter((card) => card.href !== story.href),
      },
      {
        kind: "cards",
        title: "Continue through the awards archive",
        cards: awardsArchive
          .filter(
            (card) =>
              card.href !== "/awards/2019-british-beacon-mosque-awards/",
          )
          .slice(0, 6),
      },
    ],
  };
});

awardStoryPages2018.forEach((story) => {
  const slug = story.href.replace(/^\/|\/$/g, "");

  pageMap[slug] = {
    slug,
    title: story.title,
    eyebrow: story.meta,
    intro: story.summary,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: "Back to Awards 2018",
        href: "/awards/2018-british-beacon-mosque-awards/",
      },
      { label: "View Awards Archive", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: "2018 awards story",
        paragraphs: [
          `${story.title} is retained as part of the first British Beacon Mosque Awards archive.`,
          "The story documents the founding awards cycle, where UK mosques, imams, community services and leaders were recognised for excellence.",
        ],
      },
      {
        kind: "cards",
        title: "More 2018 awards stories",
        cards: awardStoryCards2018
          .filter((card) => card.href !== story.href)
          .slice(0, 8),
      },
      {
        kind: "cards",
        title: "Continue through the awards archive",
        cards: awardsArchive
          .filter(
            (card) =>
              card.href !== "/awards/2018-british-beacon-mosque-awards/",
          )
          .slice(0, 6),
      },
    ],
  };
});

awardCategoryPages2018.forEach((category) => {
  const slug = category.href.replace(/^\/|\/$/g, "");
  const searchText = (card: CardLink) =>
    `${card.title} ${card.text}`.toLowerCase();
  const categoryStories = awardStoryCards2018.filter((card) =>
    category.keywords.some((keyword) =>
      searchText(card).includes(keyword.toLowerCase()),
    ),
  );

  pageMap[slug] = {
    slug,
    title: `Beacon Mosque 2018 ${category.title}`,
    eyebrow: "Awards 2018 category",
    intro: `${category.summary} Explore the category in the founding British Beacon Mosque Awards archive.`,
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: "Back to Awards 2018",
        href: "/awards/2018-british-beacon-mosque-awards/",
      },
      { label: "View Awards Archive", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: category.title,
        paragraphs: [
          `${category.title} was part of the first British Beacon Mosque Awards cycle in 2018, recognising excellent mosque service and community impact.`,
          "This category archive connects the original public route with the dedicated winner and nomination stories retained from the founding awards year.",
        ],
      },
      {
        kind: "cards",
        title: "2018 category stories",
        cards: categoryStories.length
          ? categoryStories
          : awardStoryCards2018.slice(0, 6),
      },
      {
        kind: "cards",
        title: "Other 2018 categories",
        cards: awardCategoryCards2018.filter(
          (card) => card.href !== category.href,
        ),
      },
    ],
  };
});

for (const [year, detail] of Object.entries(historicAwardArchiveDetails)) {
  const primarySlug = (
    awardArchiveHrefByYear[year] ?? `/awards/beacon-mosque-awards-${year}/`
  ).replace(/^\/|\/$/g, "");
  const archivePage: InteriorPage = {
    slug: primarySlug,
    title: `${detail.sequence} Beacon Mosque Awards ${year}`,
    eyebrow: "Awards archive",
    intro: detail.intro,
    image:
      year === "2024"
        ? awardWinners2024[0].src
        : year === "2023"
        ? awardsGallery2023[0].src
        : year === "2022"
        ? awardsGallery2022[0].src
        : year === "2021"
          ? awardsGallery2021[0].src
        : year === "2020"
          ? awardsGallery2020[0].src
        : year === "2018"
          ? awardsGallery2018[0].src
          : "/assets/interior/awards-gala.jpg",
    imageAlt:
      year === "2024"
        ? awardWinners2024[0].alt
        : year === "2023"
        ? awardsGallery2023[0].alt
        : year === "2022"
        ? awardsGallery2022[0].alt
        : year === "2021"
          ? awardsGallery2021[0].alt
        : year === "2020"
          ? awardsGallery2020[0].alt
        : year === "2018"
          ? awardsGallery2018[0].alt
          : "Beacon Mosque awards ceremony",
    sections: [
      {
        kind: "cards",
        title: `Award categories for ${year}`,
        cards: awardCategoryCardsForYear(year),
      },
      ...(year === "2022"
        ? [
            {
              kind: "gallery" as const,
              title: "2022 awards gallery",
              images: awardsGallery2022,
            },
          ]
        : []),
      ...(year === "2024"
        ? [
            {
              kind: "gallery" as const,
              title: "2024 official winner gallery",
              images: awardWinners2024.map((image, index) => ({
                src: image.src,
                alt: image.alt,
                title: /2024 winner/i.test(image.alt)
                  ? `2024 winner portrait ${String(index + 1).padStart(2, "0")}`
                  : image.alt,
              })),
            },
          ]
        : []),
      ...(year === "2023"
        ? [
            {
              kind: "gallery" as const,
              title: "2023 awards gallery",
              images: awardsGallery2023,
            },
          ]
        : []),
      ...(year === "2021"
        ? [
            {
              kind: "gallery" as const,
              title: "2021 awards gallery",
              images: awardsGallery2021,
            },
          ]
        : []),
      ...(year === "2020"
        ? [
            {
              kind: "gallery" as const,
              title: "2020 awards gallery",
              images: awardsGallery2020,
            },
          ]
        : []),
      ...(year === "2018"
        ? [
            {
              kind: "gallery" as const,
              title: "2018 awards gallery",
              images: awardsGallery2018,
            },
          ]
        : []),
      {
        kind: "text",
        title: "Awards archive",
        paragraphs: detail.paragraphs,
      },
      ...(year === "2024"
        ? [
            {
              kind: "cards" as const,
              title: "2024 shortlisted profiles",
              cards: awardRecognitionCards2024,
            },
          ]
        : []),
      ...(year === "2022"
        ? [
            {
              kind: "cards" as const,
              title: "2022 media",
              cards: [
                {
                  title: "Beacon Mosque Awards 2022 Media Wall",
                  text: "Historic media wall route from the fifth Beacon Mosque Awards cycle.",
                  href: "/beacon-mosque-awards-2022-media-wall/",
                  meta: "2022 media",
                },
              ],
            },
            {
              kind: "cards" as const,
              title: "2022 finalist and voting pages",
              cards: [...awardFinalistCards2022, ...awardVoteCards2022],
            },
            {
              kind: "cards" as const,
              title: "2022 shortlisted profiles",
              cards: awardRecognitionCards2022,
            },
          ]
        : []),
      ...(year === "2021"
        ? [
            {
              kind: "cards" as const,
              title: "2021 voting and results pages",
              cards: [...awardVoteCards2021, ...awardResultCards2021],
            },
            {
              kind: "cards" as const,
              title: "2021 shortlisted profiles",
              cards: awardRecognitionCards2021,
            },
          ]
        : []),
      ...(year === "2020"
        ? [
            {
              kind: "cards" as const,
              title: "2020 programme pages",
              cards: awardProgrammeCards2020,
            },
            {
              kind: "cards" as const,
              title: "2020 voting pages",
              cards: awardVoteCards2020,
            },
            {
              kind: "cards" as const,
              title: "2020 shortlisted profiles",
              cards: awardRecognitionCards2020,
            },
          ]
        : []),
      ...(year === "2019"
        ? [
            {
              kind: "cards" as const,
              title: "2019 awards stories",
              cards: awardStoryCards2019,
            },
          ]
        : []),
      ...(year === "2018"
        ? [
            {
              kind: "cards" as const,
              title: "2018 awards stories",
              cards: awardStoryCards2018,
            },
          ]
        : []),
    ],
  };

  pageMap[primarySlug] = archivePage;
  pageMap[`awards/beacon-mosque-awards-${year}`] = {
    ...archivePage,
    slug: `awards/beacon-mosque-awards-${year}`,
  };
}

const legacyAwardCategoryPatterns: Array<{
  category: string;
  pattern: RegExp;
}> = [
  {
    category: "Best Convert Support Service",
    pattern: /best convert (care|support|system)/i,
  },
  {
    category: "Most Impactful Alimah",
    pattern: /most impact(?:ful|ul) alimah|\balimah\b/i,
  },
  { category: "Most Impactful Imam", pattern: /most impactful imam|\bimam\b/i },
  {
    category: "Best Innovative Service",
    pattern:
      /best innovation service|best innovative service|most innovative service/i,
  },
  {
    category: "Best Madrassah Service",
    pattern: /best madrassah|madrassah service|madrassah services/i,
  },
  {
    category: "Best Women's Service",
    pattern:
      /best women'?s service|best womens service|women'?s services|\bwomen\b/i,
  },
  {
    category: "Best Youth Service",
    pattern: /best youth service|best youth services/i,
  },
  { category: "Best Future Design", pattern: /best future design/i },
  {
    category: "Best Mosque Volunteer",
    pattern: /best mosque volunteer|volunteer/i,
  },
  { category: "Best Outreach Services", pattern: /best outreach|outreach/i },
  { category: "Best Elderly Service", pattern: /best elderly service/i },
  { category: "Best Green Initiative", pattern: /best green initiative/i },
  { category: "Best Run Mosque", pattern: /best run mosque/i },
];

function legacyAwardYear(item: LegacyRouteItem) {
  return (
    item.title.match(/20\d{2}/)?.[0] ??
    item.route.match(/20\d{2}/)?.[0] ??
    "2024"
  );
}

function legacyAwardStatus(item: LegacyRouteItem) {
  if (/winner/i.test(item.title)) return "Winner";
  if (/finalist/i.test(item.title)) return "Finalist";
  if (/shortlist/i.test(`${item.title} ${item.route}`)) return "Shortlisted";
  return "Recognition";
}

function legacyAwardCategory(title: string) {
  const normalizedTitle = title.replace(/[-_]+/g, " ");
  return (
    legacyAwardCategoryPatterns.find(({ pattern }) =>
      pattern.test(normalizedTitle),
    )?.category ?? "Beacon Mosque Awards"
  );
}

function legacyAwardCardsForYear(year: string) {
  if (year === "2025") return awardRecognitionCards2025;
  if (year === "2024") return awardRecognitionCards2024;
  return [];
}

function legacyAwardProfilesForYear(year: string) {
  if (year === "2025") return featuredAwardRecognitionProfiles2025;
  if (year === "2024") return awardRecognitionProfiles2024;
  return [];
}

function legacyAwardCardsByCategory(year: string, category: string) {
  const cards = legacyAwardCardsForYear(year);
  const source = legacyAwardProfilesForYear(year);
  const categoryCards = cards.filter(
    (card) =>
      source.find((profile) => profile.href === card.href)?.category ===
      category,
  );
  return categoryCards.length ? categoryCards : cards.slice(0, 8);
}

function isLegacyAwardShortlistHub(item: LegacyRouteItem) {
  return (
    /(shortlist|shortlisted mosque|shortlisted mosques)/i.test(item.title) &&
    (/^(best|most)\b/i.test(item.title) ||
      /^Beacon Mosque 20\d{2}/i.test(item.title))
  );
}

function isLegacyAwardActionPage(item: LegacyRouteItem) {
  const text = `${item.title} ${item.route}`;
  return (
    /20(24|25|26)/.test(text) &&
    (/nomination|nominatioin|voting|vote/i.test(text) ||
      isLegacyAwardShortlistHub(item))
  );
}

function isLegacyAwardProfile(item: LegacyRouteItem) {
  return (
    /(shortlist|shortlisted|finalist|winner)/i.test(
      `${item.title} ${item.route}`,
    ) &&
    /20(24|25)/.test(item.title) &&
    !isLegacyAwardShortlistHub(item)
  );
}

legacyRouteItems.forEach((item) => {
  const slug = item.route.replace(/^\/|\/$/g, "");

  if (pageMap[slug] || !isLegacyAwardActionPage(item)) return;

  const year = legacyAwardYear(item);
  const category = legacyAwardCategory(`${item.title} ${item.route}`);
  const archiveHref =
    awardArchiveHrefByYear[year] ?? "/awards/beacon-mosque-awards-2026/";
  const isNomination = /nomination|nominatioin/i.test(
    `${item.title} ${item.route}`,
  );
  const isVoting = /voting|vote/i.test(`${item.title} ${item.route}`);
  const categoryCards = legacyAwardCardsByCategory(year, category);
  const ctas = [
    { label: `Back to Awards ${year}`, href: archiveHref },
    {
      label: "View awards archive",
      href: "/awards/",
      variant: "secondary" as const,
    },
  ];

  pageMap[slug] = {
    slug,
    title: item.title,
    eyebrow: isNomination
      ? "Awards nomination"
      : isVoting
        ? "Awards voting"
        : "Awards shortlist",
    intro: `${item.title} is retained as part of the Beacon Mosque Awards ${year} public programme.`,
    image:
      year === "2025"
        ? "/assets/awards/2025/bbma-2025-identity.png"
        : "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas,
    sections: [
      {
        kind: "text",
        title: category,
        paragraphs: [
          `${item.title} connects visitors to the ${category} area of the Beacon Mosque Awards ${year} programme.`,
          isNomination
            ? "This route preserves the original nomination intent and keeps the award category available through the redesigned frontend experience."
            : isVoting
              ? "This route preserves the original voting-page intent and links the category back to the wider awards archive."
              : "This route preserves the original shortlist-page intent and presents related recognition profiles in the awards design system.",
          "The Beacon Mosque Awards celebrate excellent mosque service, leadership, education, outreach and community achievement across the UK.",
        ],
      },
      ...(isNomination
        ? [
            {
              kind: "form" as const,
              form: "nomination" as const,
              title: `${category} nomination details`,
              text: "Share the nominee, mosque or institution, contact details and supporting evidence for consideration by the Beacon Mosque Awards team.",
              defaultCategory:
                category === "Beacon Mosque Awards" ? undefined : category,
            },
          ]
        : []),
      {
        kind: "cards",
        title:
          category === "Beacon Mosque Awards"
            ? `${year} award profiles`
            : `${category} profiles`,
        cards: categoryCards,
      },
      {
        kind: "cards",
        title: `${year} award categories`,
        cards: awardCategoryCardsForYear(year).slice(0, 10),
      },
    ],
  };
});

legacyRouteItems.forEach((item) => {
  const slug = item.route.replace(/^\/|\/$/g, "");

  if (pageMap[slug] || !isLegacyAwardProfile(item)) return;

  const year = legacyAwardYear(item);
  const status = legacyAwardStatus(item);
  const category = legacyAwardCategory(`${item.title} ${item.route}`);
  const profileCards = legacyAwardCardsForYear(year);
  const profileSource = legacyAwardProfilesForYear(year);
  const relatedProfiles = profileCards
    .filter((card) => card.href !== item.route)
    .filter(
      (card) =>
        profileSource.find((profile) => profile.href === card.href)
          ?.category === category,
    )
    .slice(0, 6);
  const archiveHref = awardArchiveHrefByYear[year] ?? "/awards/";

  pageMap[slug] = {
    slug,
    title: item.title,
    eyebrow: `${status} - ${category}`,
    intro: `${item.title} is retained as part of the ${year} Beacon Mosque Awards recognition archive.`,
    image:
      year === "2025"
        ? "/assets/awards/2025/bbma-2025-identity.png"
        : "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      { label: `Back to Awards ${year}`, href: archiveHref },
      { label: "View awards archive", href: "/awards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: category,
        paragraphs: [
          `${item.title} is a ${status.toLowerCase()} record in the ${category} category for the ${year} Beacon Mosque Awards.`,
          "This page preserves the original public recognition route while presenting it in the modern Beacon Mosque awards design system.",
          "The Beacon Mosque Awards recognise mosques, madrassahs, imams, alimahs and volunteers whose work strengthens Islamic service, leadership, education and community life.",
        ],
      },
      {
        kind: "cards",
        title: relatedProfiles.length
          ? `Related ${category} profiles`
          : `${year} award profiles`,
        cards: relatedProfiles.length
          ? relatedProfiles
          : profileCards.slice(0, 6),
      },
      {
        kind: "cards",
        title: `${year} award categories`,
        cards: awardCategoryCardsForYear(year).slice(0, 10),
      },
    ],
  };
});

function isLegacyPublicPost(item: LegacyRouteItem) {
  return item.kind === "post" && item.title.trim() !== "1";
}

function legacyPostContext(item: LegacyRouteItem) {
  const text = `${item.title} ${item.route}`;

  if (/guide|khutbah|safeguarding|coronavirus|covid/i.test(text)) {
    return {
      eyebrow: "Resource archive",
      title: "Guidance archive",
      image: "/assets/interior/standards-wide.jpg",
      imageAlt: "Beacon Mosque standards and resources",
      backLabel: "Back to resources",
      backHref: "/resources/",
      secondaryLabel: "View standards",
      secondaryHref: "/standards/",
      cards: allResourceCards.slice(0, 8),
      paragraphs: [
        `${item.title} is retained as part of the Beacon Mosque guidance and resource archive.`,
        "The resource supports mosque leaders, trustees and community teams with practical reference material connected to mosque service, safeguarding, youth engagement, public health or community communication.",
        "This redesigned page keeps the original route available while presenting it within the modern Beacon Mosque standards and awards design system.",
      ],
    };
  }

  if (/award|winner|expo|plaque/i.test(text)) {
    return {
      eyebrow: "Awards story",
      title: "Awards archive story",
      image: "/assets/interior/awards-gala.jpg",
      imageAlt: "Beacon Mosque awards ceremony",
      backLabel: "View awards archive",
      backHref: "/awards/",
      secondaryLabel: "Back to news",
      secondaryHref: "/category/news/",
      cards: [...awardsArchive, ...communityStoryCards].slice(0, 8),
      paragraphs: [
        `${item.title} is retained as part of the Beacon Mosque awards and recognition archive.`,
        "The story connects visitors to the wider Beacon Mosque record of mosque excellence, award ceremonies, community recognition and public milestones.",
        "This page preserves the original public route while aligning the content with the modern Islamic awards visual system.",
      ],
    };
  }

  return {
    eyebrow: item.category === "news" ? "News archive" : "Community story",
    title: "Community update",
    image: "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque community story",
    backLabel: "Back to news",
    backHref: "/category/news/",
    secondaryLabel: "Explore awards",
    secondaryHref: "/awards/",
    cards: communityStoryCards.slice(0, 8),
    paragraphs: [
      `${item.title} is retained as part of the Beacon Mosque public news archive.`,
      "The update reflects mosque life, community service, leadership, education, sport, outreach or public engagement connected to the wider Beacon Mosque mission.",
      "This redesigned page keeps the original route accessible with clearer hierarchy and related stories for continued browsing.",
    ],
  };
}

legacyRouteItems.forEach((item) => {
  const slug = item.route.replace(/^\/|\/$/g, "");

  if (pageMap[slug] || !isLegacyPublicPost(item)) return;

  const context = legacyPostContext(item);
  const relatedCards = context.cards
    .filter((card) => card.href !== item.route)
    .slice(0, 6);

  pageMap[slug] = {
    slug,
    title: item.title,
    eyebrow: context.eyebrow,
    intro: context.paragraphs[0],
    image: context.image,
    imageAlt: context.imageAlt,
    ctas: [
      { label: context.backLabel, href: context.backHref },
      {
        label: context.secondaryLabel,
        href: context.secondaryHref,
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: context.title,
        paragraphs: context.paragraphs,
      },
      ...(relatedCards.length
        ? [
            {
              kind: "cards" as const,
              title: "Related links",
              cards: relatedCards,
            },
          ]
        : []),
    ],
  };
});

function isLegacyAwardTopicPage(item: LegacyRouteItem) {
  const text = `${item.title} ${item.route}`;
  return (
    item.kind === "page" &&
    (/awardstestdraft/i.test(text) ||
      /\bbest[-\s]/i.test(text) ||
      /most impactful/i.test(text) ||
      /shortlist|shortlisted/i.test(text) ||
      /mosque-2025|mosque 2025/i.test(text)) &&
    !/nomination|nominatioin|voting|vote/i.test(text)
  );
}

legacyRouteItems.forEach((item) => {
  const slug = item.route.replace(/^\/|\/$/g, "");

  if (pageMap[slug] || !isLegacyAwardTopicPage(item)) return;

  const year = legacyAwardYear(item);
  const category = legacyAwardCategory(`${item.title} ${item.route}`);
  const categoryCards = legacyAwardCardsByCategory(year, category);
  const archiveHref = awardArchiveHrefByYear[year] ?? "/awards/";
  const isSpecificCategory = category !== "Beacon Mosque Awards";

  pageMap[slug] = {
    slug,
    title: item.title,
    eyebrow: isSpecificCategory ? "Awards category" : "Awards archive",
    intro: `${item.title} is retained as part of the Beacon Mosque Awards public archive.`,
    image:
      year === "2025"
        ? "/assets/awards/2025/bbma-2025-identity.png"
        : "/assets/interior/awards-gala.jpg",
    imageAlt: "Beacon Mosque awards ceremony",
    ctas: [
      {
        label: year ? `Back to Awards ${year}` : "View awards archive",
        href: archiveHref,
      },
      {
        label: "Explore current awards",
        href: "/awards/beacon-mosque-awards-2026/",
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: isSpecificCategory ? category : "Awards archive",
        paragraphs: [
          isSpecificCategory
            ? `${item.title} connects visitors to the ${category} area of the Beacon Mosque Awards archive.`
            : `${item.title} is retained as an awards archive route for visitors following older Beacon Mosque pages.`,
          "The redesigned page keeps the original public route available while replacing the generic archive shell with the modern Islamic awards design system.",
          "Use the related links to continue through award categories, recognition profiles and the broader Beacon Mosque Awards archive.",
        ],
      },
      {
        kind: "cards",
        title: isSpecificCategory ? `${category} profiles` : "Award years",
        cards: isSpecificCategory ? categoryCards : awardsArchive.slice(0, 8),
      },
      {
        kind: "cards",
        title: `${year} award categories`,
        cards: awardCategoryCardsForYear(year).slice(0, 10),
      },
    ],
  };
});

function legacyOperationalContext(item: LegacyRouteItem) {
  const text = `${item.title} ${item.route}`;

  if (/leadership forum/i.test(text)) {
    return {
      eyebrow: "Leadership forum",
      title: "Beacon Mosque leadership",
      image: "/assets/interior/about-hero.jpg",
      imageAlt: "Beacon Mosque interior architectural detail",
      backLabel: "View standards",
      backHref: "/standards/",
      secondaryLabel: "Explore resources",
      secondaryHref: "/resources/",
      cards: [
        {
          title: "Management & Governance",
          text: "Standards for accountable mosque leadership, governance and participation.",
          href: "/standards/management-governance/",
          meta: "Standard",
        },
        {
          title: "Women in Mosque Management Guide",
          text: "Practical guidance for inclusive mosque leadership and management practice.",
          href: "/mosque-resources/women-in-mosque-management-guide/",
          meta: "Guide",
        },
        {
          title: "Mosque Management Guide",
          text: "Resources for governance, operations and quality improvement.",
          href: "/mosque-resources/mosque-management-guide/",
          meta: "Guide",
        },
      ],
      paragraphs: [
        "The Beacon Mosque Leadership Forum route is retained as part of the leadership and governance area of the Beacon Mosque archive.",
        "It connects mosque leaders, trustees and management teams with the standards, guidance and long-term service model behind the Beacon Mosque initiative.",
        "The redesigned page keeps the original route available while aligning it with the modern Islamic awards and excellence visual system.",
      ],
    };
  }

  return {
    eyebrow: "Community resilience",
    title: /directory/i.test(text)
      ? "Mosque directory and mobilisation"
      : "COVID-19 response archive",
    image: "/assets/interior/golden-mosque.jpg",
    imageAlt: "Mosque dome at sunset",
    backLabel: "Resilience hubs",
    backHref: "/mosques-as-resilience-hubs/",
    secondaryLabel: "View resources",
    secondaryHref: "/resources/",
    cards: [
      ...resilienceModes,
      ...resilienceExamples,
      {
        title: "Beacon Mosques 30 Year Vision 2020-2050",
        text: "A long-range plan for spiritually grounded, safe and sustainable mosque institutions.",
        href: "/mosque-resources/beacon-mosques-30-year-vision-2020-2050/",
        meta: "Vision",
      },
    ],
    paragraphs: [
      `${item.title} is retained as part of the Beacon Mosque community resilience and public health response archive.`,
      "The route preserves material connected to mosque mobilisation, COVID-19 response, community communication and the role of mosques as trusted support points during disruption.",
      "The redesigned page links this historic content to the broader Resilience Hubs model and Beacon Mosque resources.",
    ],
  };
}

function isLegacyOperationalPage(item: LegacyRouteItem) {
  return /leadership forum|mosque mobilisation|covid-19 mosque directory|uk mosques.*covid-19 response/i.test(
    `${item.title} ${item.route}`,
  );
}

legacyRouteItems.forEach((item) => {
  const slug = item.route.replace(/^\/|\/$/g, "");

  if (pageMap[slug] || !isLegacyOperationalPage(item)) return;

  const context = legacyOperationalContext(item);

  pageMap[slug] = {
    slug,
    title: item.title,
    eyebrow: context.eyebrow,
    intro: context.paragraphs[0],
    image: context.image,
    imageAlt: context.imageAlt,
    ctas: [
      { label: context.backLabel, href: context.backHref },
      {
        label: context.secondaryLabel,
        href: context.secondaryHref,
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: context.title,
        paragraphs: context.paragraphs,
      },
      {
        kind: "cards",
        title:
          context.eyebrow === "Leadership forum"
            ? "Leadership resources"
            : "Resilience links",
        cards: context.cards,
      },
      ...(context.eyebrow === "Community resilience"
        ? [
            {
              kind: "criteria" as const,
              title: "Resilience Hub options",
              groups: resilienceOptionCriteria,
            },
          ]
        : []),
    ],
  };
});

function legacyUtilityContext(item: LegacyRouteItem) {
  const text = `${item.title} ${item.route}`;

  if (/cart|checkout|shop|my account/i.test(text)) {
    return {
      eyebrow: "Legacy service route",
      title: "Store and account archive",
      image: "/assets/interior/awards-gala.jpg",
      imageAlt: "Beacon Mosque awards ceremony",
      backLabel: "Explore awards",
      backHref: "/awards/",
      secondaryLabel: "View resources",
      secondaryHref: "/resources/",
      cards: [
        {
          title: "Beacon Mosque Awards",
          text: "Explore the current awards archive, nomination pathway and recognition programme.",
          href: "/awards/",
          meta: "Awards",
        },
        {
          title: "Resources",
          text: "Guides, booklets and practical resources for mosque leaders and teams.",
          href: "/resources/",
          meta: "Guides",
        },
        {
          title: "Contact Us",
          text: "Get in touch with the Beacon Mosque team about awards, standards or accreditation.",
          href: "/contact-us/",
          meta: "Contact",
        },
      ],
      paragraphs: [
        `${item.title} is retained as a legacy service route from the original Beacon Mosque website.`,
        "The redesigned frontend preserves the URL while directing visitors toward the active awards, resources and contact areas.",
        "This keeps old public links usable without reintroducing WordPress commerce or account plugin templates into the modern Next.js build.",
      ],
    };
  }

  if (/home-beta|sample-home/i.test(text)) {
    return {
      eyebrow: "Legacy home route",
      title: "Beacon Mosque homepage archive",
      image: "/assets/interior/awards-gala.jpg",
      imageAlt: "Beacon Mosque awards ceremony",
      backLabel: "Go to homepage",
      backHref: "/",
      secondaryLabel: "Explore awards",
      secondaryHref: "/awards/",
      cards: [
        {
          title: "Home",
          text: "Return to the redesigned Beacon Mosque homepage and modern awards experience.",
          href: "/",
          meta: "Homepage",
        },
        {
          title: "Awards",
          text: "Browse award years, categories, winners and nomination pathways.",
          href: "/awards/",
          meta: "Awards",
        },
        {
          title: "Standards",
          text: "Review the quality framework behind Beacon Mosque accreditation.",
          href: "/standards/",
          meta: "Standards",
        },
      ],
      paragraphs: [
        `${item.title} is retained as a legacy homepage variant from the original website.`,
        "The route now points visitors into the redesigned Beacon Mosque experience while preserving old public links.",
        "The current homepage defines the modern Islamic awards design system for the Next.js frontend.",
      ],
    };
  }

  if (item.title.trim() === "1") {
    return {
      eyebrow: "Legacy placeholder",
      title: "Archived placeholder post",
      image: "/assets/interior/about-hero.jpg",
      imageAlt: "Beacon Mosque interior architectural detail",
      backLabel: "Back to news",
      backHref: "/category/news/",
      secondaryLabel: "Explore awards",
      secondaryHref: "/awards/",
      cards: communityStoryCards.slice(0, 6),
      paragraphs: [
        "This placeholder post route is retained so older public links continue to resolve in the redesigned frontend.",
        "The original item did not carry meaningful public content, so this page directs visitors toward active Beacon Mosque stories, awards and resources.",
        "Keeping the route inside the React page map preserves site coverage without relying on WordPress placeholder templates.",
      ],
    };
  }

  return {
    eyebrow: "Legacy test route",
    title: /video/i.test(text)
      ? "Media test archive"
      : "Development test archive",
    image: "/assets/interior/standards-wide.jpg",
    imageAlt: "Beacon Mosque standards graphic",
    backLabel: "Go to homepage",
    backHref: "/",
    secondaryLabel: "View standards",
    secondaryHref: "/standards/",
    cards: [
      {
        title: "Home",
        text: "Return to the redesigned Beacon Mosque homepage.",
        href: "/",
        meta: "Homepage",
      },
      {
        title: "Gallery",
        text: "View the Beacon Mosque visual archive.",
        href: "/gallery/",
        meta: "Gallery",
      },
      {
        title: "Standards",
        text: "Explore the Beacon Mosque quality standards.",
        href: "/standards/",
        meta: "Standards",
      },
    ],
    paragraphs: [
      `${item.title} is retained as a legacy test route from the original website.`,
      "The route is kept available for link parity, but the redesigned frontend now directs visitors toward meaningful Beacon Mosque pages.",
      "This avoids exposing a generic WordPress-style test shell while preserving the route in the static Next.js site.",
    ],
  };
}

function isLegacyUtilityRoute(item: LegacyRouteItem) {
  return (
    /cart|checkout|shop|my account|home-beta|sample-home|test|video-test|wasim-test-page/i.test(
      `${item.title} ${item.route}`,
    ) || item.title.trim() === "1"
  );
}

legacyRouteItems.forEach((item) => {
  const slug = item.route.replace(/^\/|\/$/g, "");

  if (pageMap[slug] || !isLegacyUtilityRoute(item)) return;

  const context = legacyUtilityContext(item);

  pageMap[slug] = {
    slug,
    title: item.title === "1" ? "Archived placeholder post" : item.title,
    eyebrow: context.eyebrow,
    intro: context.paragraphs[0],
    image: context.image,
    imageAlt: context.imageAlt,
    ctas: [
      { label: context.backLabel, href: context.backHref },
      {
        label: context.secondaryLabel,
        href: context.secondaryHref,
        variant: "secondary",
      },
    ],
    sections: [
      {
        kind: "text",
        title: context.title,
        paragraphs: context.paragraphs,
      },
      {
        kind: "cards",
        title: "Recommended links",
        cards: context.cards,
      },
    ],
  };
});

function legacyArchiveMeta(item: LegacyRouteItem) {
  if (item.category === "news")
    return {
      eyebrow: "News archive",
      backLabel: "Back to news",
      backHref: "/category/news/",
      cards: communityStoryCards.slice(0, 8),
    };
  if (item.category === "blog")
    return {
      eyebrow: "Blog archive",
      backLabel: "Back to resources",
      backHref: "/resources/",
      cards: allResourceCards.slice(0, 8),
    };
  if (
    item.category === "mosque-resources" ||
    item.route.includes("guide") ||
    item.route.includes("resource")
  ) {
    return {
      eyebrow: "Resource archive",
      backLabel: "Back to resources",
      backHref: "/resources/",
      cards: allResourceCards.slice(0, 8),
    };
  }
  if (
    item.route.includes("award") ||
    item.route.includes("shortlist") ||
    item.route.includes("mosque-2025") ||
    item.route.includes("mosque-2024")
  ) {
    return {
      eyebrow: "Awards archive",
      backLabel: "View awards archive",
      backHref: "/awards/",
      cards: awardsArchive.slice(0, 8),
    };
  }
  return {
    eyebrow: "Beacon Mosque archive",
    backLabel: "Back to home",
    backHref: "/",
    cards: [...awardsArchive, ...allResourceCards].slice(0, 8),
  };
}

function legacyArchiveImage(item: LegacyRouteItem) {
  if (
    item.category === "news" ||
    item.route.includes("award") ||
    item.route.includes("shortlist")
  )
    return "/assets/interior/awards-gala.jpg";
  if (
    item.category === "blog" ||
    item.route.includes("guide") ||
    item.route.includes("resource")
  )
    return "/assets/interior/standards-wide.jpg";
  return "/assets/interior/about-hero.jpg";
}

legacyRouteItems.forEach((item) => {
  const slug = item.route.replace(/^\/|\/$/g, "");

  if (pageMap[slug]) return;

  const meta = legacyArchiveMeta(item);
  const relatedCards = meta.cards
    .filter((card) => card.href !== item.route)
    .slice(0, 6);

  pageMap[slug] = {
    slug,
    title: item.title,
    eyebrow: meta.eyebrow,
    intro: `${item.title} is part of the Beacon Mosque public archive.`,
    image: legacyArchiveImage(item),
    imageAlt: "Beacon Mosque archive",
    ctas: [
      { label: meta.backLabel, href: meta.backHref },
      { label: "Explore standards", href: "/standards/", variant: "secondary" },
    ],
    sections: [
      {
        kind: "text",
        title: item.kind === "post" ? "Archive story" : "Archive page",
        paragraphs: [
          "Beacon Mosque keeps this public archive page available for visitors exploring past awards, resources and community updates.",
          "Use the related links below to continue into the awards, standards, resources and news areas.",
        ],
      },
      ...(relatedCards.length
        ? [
            {
              kind: "cards" as const,
              title: "Continue exploring",
              cards: relatedCards,
            },
          ]
        : []),
    ],
  };
});

export const pages = pageMap;

export async function getPage(slugSegments: string[]) {
  const slug = slugSegments.join("/");
  return pages[slug] ?? (await getWordPressFallbackPage(slug));
}

export async function getPageStaticParams() {
  const slugs = Array.from(
    new Set([...Object.keys(pages), ...(await getWordPressPublicSlugs())]),
  );
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}
