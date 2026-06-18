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

export type AwardCategoryPreviousWinner = {
  year: string;
  winner: string;
  href?: string;
  supportingText?: string;
};

export type AwardCategoryNominationDetail = {
  title: string;
  href: string;
  summary: string;
  introParagraphs: string[];
  judgingParagraphs: string[];
  nominateHref: string;
  note: string;
  previousWinners: AwardCategoryPreviousWinner[];
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
  description: string;
  quote: string;
  reference: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Awards", href: "/awards/" },
  { label: "Winners", href: "/winners/" },
  { label: "Standards", href: "/standards/" },
  { label: "Resources", href: "/resources/" },
  { label: "Training", href: "/training/" },
  { label: "Contact", href: "/contact-us/" },
];

export const heroStats = [
  { value: "9th", label: "Beacon Mosque Awards 2026" },
  { value: "10", label: "Awards categories" },
  { value: "5 star", label: "Accreditation pathway" },
];

export const nominationForm2026Href =
  "https://forms.zohopublic.eu/info157/form/BeaconMosqueAwards2026NominationForm/formperma/VWlTCVb_wxgDlI_mYQ2gYFzp7SlpGg3mn1XcgJTbnbQ";
export const awards2026CategoriesHref =
  "/awards/beacon-mosque-awards-2026/#award-categories";

const awardCategoryNominationNote =
  "Beacon Mosque Award winners are decided by an independent panel of judges who review the submitted evidence from shortlisted finalists in detail, with the public vote providing a smaller weighting.";

const awardCategoryMediaByKey = {
  "best run mosque": {
    image: "/assets/categories/best-run-mosque.png",
    imageAlt: "Best Run Mosque category image",
  },
  "best youth service": {
    image: "/assets/categories/best-youth-service.png",
    imageAlt: "Best Youth Service category image",
  },
  "best madrassah service": {
    image: "/assets/categories/best-madrassah-service.png",
    imageAlt: "Best Madrassah Service category image",
  },
  "best womens service": {
    image: "/assets/categories/best-womens-service.png",
    imageAlt: "Best Women's Service category image",
  },
  "most impactful imam": {
    image: "/assets/categories/most-impactful-imam.png",
    imageAlt: "Most Impactful Imam category image",
  },
  "best convert support service": {
    image: "/assets/categories/best-convert-support-service.png",
    imageAlt: "Best Convert Support Service category image",
  },
  "best charity project": {
    image: "/assets/categories/best-outreach-service.png",
    imageAlt: "Best Charity Project category image",
  },
  "best elderly service": {
    image: "/assets/categories/best-outreach-service.png",
    imageAlt: "Best Elderly Service category image",
  },
  "best green initiative": {
    image: "/assets/categories/best-future-design.png",
    imageAlt: "Best Green Initiative category image",
  },
  "best innovative service": {
    image: "/assets/categories/best-future-design.png",
    imageAlt: "Best Innovative Service category image",
  },
  "most innovative service": {
    image: "/assets/categories/best-future-design.png",
    imageAlt: "Most Innovative Service category image",
  },
  "best mosque covid 19 response": {
    image: "/assets/categories/best-outreach-service.png",
    imageAlt: "Best Mosque COVID-19 Response category image",
  },
  "best overseas mosque": {
    image: "/assets/categories/best-run-mosque.png",
    imageAlt: "Best Overseas Mosque category image",
  },
  "most impactful alimah": {
    image: "/assets/categories/most-impactful-alimah.png",
    imageAlt: "Most Impactful Alimah category image",
  },
  "best volunteer": {
    image: "/assets/categories/best-mosque-volunteer.png",
    imageAlt: "Best Volunteer category image",
  },
  "best outreach service": {
    image: "/assets/categories/best-outreach-service.png",
    imageAlt: "Best Outreach Service category image",
  },
  "best outreach services": {
    image: "/assets/categories/best-outreach-service.png",
    imageAlt: "Best Outreach Service category image",
  },
  "best future design": {
    image: "/assets/categories/best-future-design.png",
    imageAlt: "Best Future Design category image",
  },
  "best mosque volunteer": {
    image: "/assets/categories/best-mosque-volunteer.png",
    imageAlt: "Best Mosque Volunteer category image",
  },
} as const;

export function getAwardCategoryMedia(title: string) {
  const key = title
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  return awardCategoryMediaByKey[key as keyof typeof awardCategoryMediaByKey] ?? null;
}

export const awardCategoryNominationDetails = [
  {
    title: "Best Run Mosque",
    href: "/best-run-mosque-2026-nomination/",
    summary:
      "This category recognises mosques demonstrating outstanding leadership, management and all-round service delivery.",
    introParagraphs: [
      "This category awards Mosques who have demonstrated outstanding qualities in leadership and management with leaders that have either been selected or elected by the congregation to innovate and deliver outstanding facilities that service all.",
    ],
    judgingParagraphs: [
      "Judges will be reviewing evidence related to management competence and in organising events, programmes, services, handling complaints, working with different communities, sharing their expertise, approachability and integrity.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "Cheadle Masjid - Manchester" },
      {
        year: "2024",
        winner: "Bilal Academy",
        href: "https://beaconmosque.com/bilal-academy-shortlisted-mosque-best-run-mosque2024/",
      },
      { year: "2023", winner: "Ashton Central Mosque" },
      {
        year: "2022",
        winner: "Maidenhead Mosque",
        href: "https://www.maidenheadmosque.org/",
      },
      {
        year: "2021",
        winner: "Sri Lankan Muslim Cultural Centre, London",
        href: "https://www.slmcc.co.uk/",
      },
      {
        year: "2020",
        winner: "Al Madina Mosque Barking, London",
        href: "https://www.barkingmosque.org.uk/",
      },
      {
        year: "2019",
        winner: "Green Lane Masjid, Birmingham",
        href: "https://www.greenlanemasjid.org/",
      },
      {
        year: "2018",
        winner: "Al-Manaar MCHC, London",
        href: "https://almanaar.org.uk/",
      },
    ],
  },
  {
    title: "Best Youth Service",
    href: "/best-youth-service-nominatioin-2026/",
    summary:
      "This category recognises mosques that have developed strong programmes and facilities for young people in their communities.",
    introParagraphs: [
      "This category recognises Mosques that have developed programmes and/or facilities for young people in their community.",
    ],
    judgingParagraphs: [
      "Judges will assess testimonies from youths using the services and facilities.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "Lozells Central Mosque Birmingham" },
      {
        year: "2024",
        winner: "Aberdeen Mosque and Islamic Centre",
        href: "https://beaconmosque.com/best-youth-service-shortlisted-mosques-2024/",
      },
      { year: "2023", winner: "Al Manaar MCHC" },
      { year: "2022", winner: "EMCA Mosque & Centre, London" },
      { year: "2021", winner: "Lantern Academy, Rochdale" },
      { year: "2020", winner: "Hayes Muslim Centre, London" },
      { year: "2019", winner: "Guidance Hub, Manchester" },
      { year: "2018", winner: "Al Madina Mosque Barking, London" },
    ],
  },
  {
    title: "Best Madrassah Service",
    href: "/best-madrassah-award-nomination-2026/",
    summary:
      "This category recognises mosques offering dedicated educational provision and strong Quran-centred learning environments.",
    introParagraphs: [
      "This category awards Mosques offering a dedicated educational provision either on the same site or at an external location.",
    ],
    judgingParagraphs: [
      "Judges will assess evidence related to the development and maintenance of a safe and comprehensive learning environment for students, providing them with learning opportunities and resources to connect with the Quran.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "Taqwa Institute - Oldham" },
      {
        year: "2024",
        winner: "Deen Central",
        href: "https://www.facebook.com/BeaconMosque/photos/winner-of-the-best-madrassah-service-2024-deen-central-well-deserved-award-for-t/883179360640414/",
      },
      { year: "2023", winner: "Al Arqam Arabic School" },
      {
        year: "2022",
        winner: "Maidenhead Mosque",
        href: "https://www.maidenheadmosque.org/",
      },
      {
        year: "2021",
        winner: "Sri Lankan Muslim Cultural Centre, London",
        href: "https://www.slmcc.co.uk/",
      },
      {
        year: "2020",
        winner: "Al Madina Mosque Barking, London",
        href: "https://www.barkingmosque.org.uk/",
      },
      {
        year: "2019",
        winner: "Green Lane Masjid, Birmingham",
        href: "https://www.greenlanemasjid.org/",
      },
      {
        year: "2018",
        winner: "Al-Manaar MCHC, London",
        href: "https://almanaar.org.uk/",
      },
    ],
  },
  {
    title: "Best Women's Service",
    href: "/best-womens-service-nomination-mosque-2026/",
    summary:
      "This category recognises mosques supporting the spiritual, emotional and intellectual needs of women and girls.",
    introParagraphs: [
      "This category awards Mosques working to support the spiritual, emotional and/or intellectual needs of women in the local community.",
    ],
    judgingParagraphs: [
      "Judges will assess programmes, services and outstanding facilities that cater exclusively for women and girls.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "Al-Manaar - London" },
      { year: "2024", winner: "Nelson Community Mosque" },
      { year: "2023", winner: "Easton Jamia Masjid" },
      { year: "2022", winner: "Guidance Hub, Manchester" },
      { year: "2021", winner: "Rumi's Cave, London" },
      { year: "2020", winner: "Ashford and Staines Mosque" },
      { year: "2019", winner: "Al Madina Mosque Barking, London" },
      { year: "2018", winner: "Khizra Mosque, Manchester" },
    ],
  },
  {
    title: "Most Impactful Imam",
    href: "/most-impactful-imam-nomination-2026/",
    summary:
      "This category recognises imams whose leadership, teaching and community work have made a measurable practical impact.",
    introParagraphs: [
      "This category awards Imams that have demonstrated a positive impact in the Mosque and wider community through their work, relating to changes in behaviour, community perceptions, contributions to community activities or programmes that are changing peoples lives as well as interfaith programmes and regular visits to schools, hospitals and prisons.",
    ],
    judgingParagraphs: [
      "Judges will assess evidence and testimonials to demonstrate impact.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "Shaykh Dr. Saalim Al-Azhari" },
      {
        year: "2024",
        winner: "Adam Kelwick - Al-Rahma Mosque",
        href: "https://beaconmosque.com/adam-kelwick-shortlisted-most-impactful-imam-2024/",
      },
      {
        year: "2023",
        winner: "Imam Ghulam Mohyuddin of Ashton Central Mosque in Ashton-under-Lyne",
      },
      {
        year: "2022",
        winner: "Imam Ebrahim Esakjee Bilal Academy - Walsall",
        href: "https://bilalacademy.co.uk/",
      },
      {
        year: "2021",
        winner:
          "Shaykh Nuru Mohammad - Al-Abbas Islamic Centre, Birmingham",
        href: "https://www.ksmnet.org/",
      },
      {
        year: "2020",
        winner: "Imam Ijaz Shaami - Netherton Islamic Trust, Dudley",
        href: "https://www.facebook.com/NethertonIslamicTrust/",
      },
      {
        year: "2019",
        winner: "Imam Mohammed Hammad - Iqra Learning Centre, Coventry",
        href: "https://www.iqracentre.org/",
      },
      {
        year: "2018",
        winner: "Shaykh Fazle Abbas Datoo - Wessex Jamaat, Fareham",
        href: "https://www.almahdi.org.uk/",
      },
    ],
  },
  {
    title: "Best Convert Support Service",
    href: "/best-convert-care-nomination-mosque-2026/",
    summary:
      "This category recognises mosques providing high-quality ongoing welcome, care and support for new Muslims.",
    introParagraphs: [
      "This category, introduced in 2022, recognises Mosques for services provided for the benefit of new Muslims and how new brothers and sisters are welcomed to Islam through the quality of their ongoing support.",
    ],
    judgingParagraphs: [
      "Judges will assess the quality, consistency and long-term benefit of the support offered to new Muslims, including welcome, belonging, learning and pastoral care.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "The London Central Mosque" },
      {
        year: "2024",
        winner: "The Olton Project",
        href: "https://beaconmosque.com/best-convert-care-shortlisted-mosque-2024/",
      },
      {
        year: "2023",
        winner: "Leeds Grand Mosque",
        href: "http://newtoislam.co.uk/",
      },
      {
        year: "2022",
        winner: "York Mosque & Islamic Centre",
        href: "https://www.yorkmosque.com/",
      },
    ],
  },
  {
    title: "Most Impactful Alimah",
    href: "/most-impactful-alimah-nomination-2026/",
    summary:
      "This category recognises alimahs whose teaching, mentorship and public service are driving meaningful community change.",
    introParagraphs: [
      "This category recognises Alimahs who have demonstrated exceptional dedication and influence within their communities, inspiring positive change through teaching, mentorship, and service.",
      "It celebrates those who are driving transformation through their educational work, outreach activities, and social initiatives, helping to empower women, strengthen families, and uplift communities across the UK.",
    ],
    judgingParagraphs: [
      "Judges will assess evidence and testimonials highlighting the Alimah's impact on education, faith, and community development.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "Shaykha Sabia Rehman" },
      { year: "2024", winner: "Shaykha Saleha Bukhari Islam" },
      { year: "2023", winner: "Ustadha Aniqa Rashid" },
      {
        year: "2022",
        winner: "Ustadha Ameena Blake",
        supportingText: "Markfield Institute, Sheffield",
      },
      {
        year: "2021",
        winner: "Ustadha Maysoon Shafiq",
        supportingText: "Al Mu'Minun (The Believers), Huddersfield",
      },
      {
        year: "2020",
        winner: "Ustadha Noshin Gul",
        supportingText: "Guidance Hub, Manchester",
      },
    ],
  },
  {
    title: "Best Outreach Services",
    href: "/best-outreach-service-nomination-2026/",
    summary:
      "This category recognises mosques delivering sustained outreach that benefits worshippers, neighbours and the wider community.",
    introParagraphs: [
      "This category recognises Mosques that have developed and sustained outstanding outreach initiatives which make a real impact on worshippers and the wider community.",
      "The outreach may take many forms, including educational, social, charitable, or interfaith engagement, and should demonstrate innovation, inclusivity, and measurable benefit to those it serves.",
    ],
    judgingParagraphs: [
      "Judges will review evidence of sustained outreach, innovation, inclusivity and measurable community benefit across the programmes and partnerships delivered.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "Wirral Deen Centre - Birkenhead/Liverpool" },
    ],
  },
  {
    title: "Best Future Design",
    href: "/best-future-design-nomination-mosque-2026/",
    summary:
      "This category recognises visionary mosque design projects that combine beauty, sustainability and strong community use.",
    introParagraphs: [
      "This category, introduced in 2021, recognises Mosques who are in the process of developing new, innovative facilities and buildings for their place of worship.",
      "This includes Mosques that have recently been built or will be built in the near future, showcasing effective delivery of beauty, high-quality design and sustainability as well as encompassing services outside prayer for the wider community.",
    ],
    judgingParagraphs: [
      "Judges will assess evidence of design quality, delivery, sustainability and the extent to which the proposed or completed building supports worship, learning, accessibility and wider community life.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      { year: "2025", winner: "ICOB - Islamic Centre of Britain" },
      {
        year: "2024",
        winner: "The Salaam Centre",
        href: "https://beaconmosque.com/best-future-design-shortlisted-mosque-2024/",
      },
      { year: "2023", winner: "Al-Abbas Islamic Center (KSIMC)" },
      {
        year: "2022",
        winner: "Madinat al Zahra, Bradford",
        href: "https://madinatalzahra.org/",
      },
      {
        year: "2021",
        winner: "Al-Mustafa Centre, Bradford",
        href: "https://almustafacentre.org/",
      },
    ],
  },
  {
    title: "Best Mosque Volunteer",
    href: "/best-mosque-volunteer-nomination-2026/",
    summary:
      "This category recognises volunteers whose time, effort and reliability make a sustained difference to mosque life.",
    introParagraphs: [
      "This category recognises the commitment of Mosque volunteers, recognising the time, effort and hard work for the benefit of the Mosque and local community.",
    ],
    judgingParagraphs: [
      "Judges will assess evidence of long-term service, reliability, initiative and the practical impact of the volunteer's contribution to the mosque and its wider community.",
    ],
    nominateHref: nominationForm2026Href,
    note: awardCategoryNominationNote,
    previousWinners: [
      {
        year: "2025",
        winner: "Mohammed Wasim - Jamiyat Tabligh Ul Islam (JTI)",
      },
      {
        year: "2024",
        winner: "Bilal Mosque",
        href: "https://beaconmosque.com/best-mosque-volunteer-shortlist-2024",
      },
      { year: "2023", winner: "Mohammed Ali Dhorat" },
      { year: "2022", winner: "Noor Miah, Shah Jalal Masjid, Burnley" },
    ],
  },
] satisfies AwardCategoryNominationDetail[];

const awardCategoryNominationDetailsByTitle = Object.fromEntries(
  awardCategoryNominationDetails.map((detail) => [detail.title, detail]),
);

export function getAwardCategoryNominationDetail(title: string) {
  return (
    awardCategoryNominationDetailsByTitle[
      title as keyof typeof awardCategoryNominationDetailsByTitle
    ] ?? null
  );
}

export const awardCategoryHighlights = awardCategoryNominationDetails.map(
  (detail) => ({
    title: detail.title,
    href: detail.href,
    summary: detail.summary,
    image: getAwardCategoryMedia(detail.title)!.image,
    imageAlt: getAwardCategoryMedia(detail.title)!.imageAlt,
    imageFit: "cover" as const,
  }),
) satisfies AwardCategoryHighlight[];

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
    year: "2026",
    sequence: "9th",
    href: "/awards/beacon-mosque-awards-2026/",
    items: [
      {
        title: "Best Run Mosque",
        subtitle: "2026 category",
        href: "/best-run-mosque-2026-nomination/",
        image: "/assets/categories/best-run-mosque.png",
        imageAlt: "Best Run Mosque category artwork for 2026 nominations",
      },
      {
        title: "Best Youth Service",
        subtitle: "2026 category",
        href: "/best-youth-service-nominatioin-2026/",
        image: "/assets/categories/best-youth-service.png",
        imageAlt: "Best Youth Service category artwork for 2026 nominations",
      },
      {
        title: "Best Madrassah Service",
        subtitle: "2026 category",
        href: "/best-madrassah-award-nomination-2026/",
        image: "/assets/categories/best-madrassah-service.png",
        imageAlt:
          "Best Madrassah Service category artwork for 2026 nominations",
      },
      {
        title: "Most Impactful Imam",
        subtitle: "2026 category",
        href: "/most-impactful-imam-nomination-2026/",
        image: "/assets/categories/most-impactful-imam.png",
        imageAlt: "Most Impactful Imam category artwork for 2026 nominations",
      },
    ],
  },
  {
    year: "2025",
    sequence: "8th",
    href: "/awards/beacon-mosque-awards-2025/",
    items: [
      {
        title: "Best Run Mosque",
        subtitle: "2025 category",
        href: "/beacon-mosque-award-2025-voting/",
        image: "/assets/awards/2025/awards-2025-01.jpg",
        imageAlt: "Beacon Mosque Awards 2025 category artwork",
      },
      {
        title: "Best Youth Service",
        subtitle: "2025 category",
        href: "/beacon-mosque-award-2025-youth-voting/",
        image: "/assets/awards/2025/awards-2025-02.jpg",
        imageAlt: "Beacon Mosque Awards youth service artwork",
      },
      {
        title: "Best Future Design",
        subtitle: "2025 category",
        href: "/beacon-mosque-award-2025-voting-future-design/",
        image: "/assets/awards/2025/awards-2025-01.jpg",
        imageAlt: "Beacon Mosque Awards future design artwork",
      },
      {
        title: "Most Impactful Imam",
        subtitle: "2025 category",
        href: "/beacon-mosque-award-2025-imam/",
        image: "/assets/awards/2025/awards-2025-02.jpg",
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
        image: "/assets/awards/2023/awards-2023-01.jpg",
        imageAlt: "Awards gala archive image",
      },
      {
        title: "Best Youth Service",
        subtitle: "2023 category",
        href: "/best-youth-service-2023/",
        image: "/assets/awards/2023/awards-2023-02.jpg",
        imageAlt: "Cambridge mosque archive image",
      },
      {
        title: "Best Outreach Services",
        subtitle: "2023 category",
        href: "/best-outreach-service-2023/",
        image: "/assets/awards/2023/awards-2023-04.jpg",
        imageAlt: "Mosque congregation archive image",
      },
      {
        title: "Best Future Design",
        subtitle: "2023 category",
        href: "/best-future-design-award-2023/",
        image: "/assets/awards/2023/awards-2023-05.jpg",
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
        image: "/assets/awards/2022/award-2022-08.jpg",
        imageAlt: "2022 archive image for Best Run Mosque",
      },
      {
        title: "Best Youth Service",
        subtitle: "2022 category",
        href: "/best-youth-service-2022/",
        image: "/assets/awards/2022/award-2022-06.jpg",
        imageAlt: "2022 archive image for Best Youth Service",
      },
      {
        title: "Best Future Design",
        subtitle: "2022 category",
        href: "/best-future-design-award-2022/",
        image: "/assets/awards/2022/award-2022-03.jpg",
        imageAlt: "2022 archive image for Best Future Design",
      },
      {
        title: "Best Mosque Volunteer",
        subtitle: "2022 category",
        href: "/best-mosque-volunteer-2022/",
        image: "/assets/awards/2022/award-2022-07.jpg",
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
        image: "/assets/awards/2021/awards-2021-hero.jpg",
        imageAlt: "Awards ceremony visual for 2021 archive",
      },
      {
        title: "Best Youth Service",
        subtitle: "2021 category",
        href: "/best-youth-service-2021/",
        image: "/assets/awards/2021/awards-2021-hero.jpg",
        imageAlt: "Audience at awards gala",
      },
      {
        title: "Best Women's Service",
        subtitle: "2021 category",
        href: "/best-womens-service-2021/",
        image: "/assets/awards/2021/awards-2021-hero.jpg",
        imageAlt: "Mosque interior detail for 2021 archive",
      },
      {
        title: "Best Future Design",
        subtitle: "2021 category",
        href: "/best-future-design-2021-vote/",
        image: "/assets/awards/2021/awards-2021-hero.jpg",
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
        image: "/assets/awards/2020/awards-2020-hero.jpg",
        imageAlt: "2020 archive crowd image",
      },
      {
        title: "Best Youth Service",
        subtitle: "2020 category",
        href: "/best-youth-service-vote-now/",
        image: "/assets/awards/2020/awards-2020-hero.jpg",
        imageAlt: "2020 archive youth category visual",
      },
      {
        title: "COVID-19 Response",
        subtitle: "2020 category",
        href: "/best-mosque-covid-19-response/",
        image: "/assets/awards/2020/awards-2020-hero.jpg",
        imageAlt: "2020 archive covid response visual",
      },
      {
        title: "Most Innovative Service",
        subtitle: "2020 category",
        href: "/most-innovative-service-vote-now/",
        image: "/assets/awards/2020/awards-2020-hero.jpg",
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
    image: "/assets/awards/2026/awards-2026-card.png",
    imageAlt: "British Beacon Mosque Awards 2026 artwork",
    actions: [
      { label: "Awards 2026", href: "/awards/beacon-mosque-awards-2026/" },
      {
        label: "Submit nomination",
        href: awards2026CategoriesHref,
      },
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
    href: "/training/",
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
    description:
      "Strengthen families, neighbourhood relationships and meaningful partnership beyond ritual worship.",
    quote:
      "Certainly a mosque founded on piety from the very first day is more deserving that you should stand in it: in it are men who love that they should be purified.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Accountability & Transparency",
    href: "/standards/accountability-and-transparency/",
    description:
      "Demonstrate integrity through clear reporting, evaluation and quality assurance across mosque activity.",
    quote:
      "God wants to make [all this] clear unto you, and to guide you onto the [righteous] ways of life of those who preceded you, and to turn unto you in His mercy: for God is all-knowing, wise.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Additional Services",
    href: "/standards/additional-services/",
    description:
      "Broaden the mosque's contribution through practical education, support, outreach and wellbeing services.",
    quote:
      "He governs all that exists, from the celestial space to the earth; and in the end all shall ascend unto Him [for judgment] on a Day the length whereof will be [like] a thousand years of your reckoning",
    reference: "(Quran chapter 32: verse 5)",
  },
  {
    title: "Madrassah",
    href: "/standards/madrassah/",
    description:
      "Provide safe, structured Islamic education with clarity, safeguarding and consistency for children and families.",
    quote:
      "He governs all that exists, from the celestial space to the earth; and in the end all shall ascend unto Him [for judgment] on a Day the length whereof will be [like] a thousand years of your reckoning",
    reference: "(Quran chapter 32: verse 5)",
  },
  {
    title: "Communication",
    href: "/standards/communication/",
    description:
      "Build trusted relationships through clear media, digital and internal communication systems.",
    quote:
      "True piety does not consist in turning your faces towards the east or the west - but truly pious is he who believes in God, and the Last Day; and the angels, and revelation, and the prophets; and spends his substance",
    reference: "(Quran chapter 2: verse 177)",
  },
  {
    title: "Management & Governance",
    href: "/standards/management-governance/",
    description:
      "Support long-term trust with clear vision, responsible governance and sustainable leadership structures.",
    quote:
      "Certainly a mosque founded on piety from the very first day is more deserving that you should stand in it: in it are men who love that they should be purified.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Policies & Procedures",
    href: "/standards/policies-procedures/",
    description:
      "Guide safe, lawful and consistent practice through practical policies and clearly understood procedures.",
    quote:
      "God wants to make [all this] clear unto you, and to guide you onto the [righteous] ways of life of those who preceded you, and to turn unto you in His mercy: for God is all-knowing, wise.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Facilities Management",
    href: "/standards/facilities-management/",
    description:
      "Create safe, welcoming and well-maintained facilities that serve worshippers and community users well.",
    quote:
      "He governs all that exists, from the celestial space to the earth; and in the end all shall ascend unto Him [for judgment] on a Day the length whereof will be [like] a thousand years of your reckoning",
    reference: "(Quran chapter 32: verse 5)",
  },
  {
    title: "Staffing & Employment",
    href: "/standards/staffing-employment/",
    description:
      "Appoint, support and manage staff and volunteers fairly with clear expectations and responsible oversight.",
    quote:
      "Certainly a mosque founded on piety from the very first day is more deserving that you should stand in it: in it are men who love that they should be purified.",
    reference: "(Quran chapter 9: verse 108.)",
  },
  {
    title: "Financing & Fundraising",
    href: "/standards/financing-fundraising/",
    description:
      "Manage budgets, donor trust and fundraising with planning, transparency and accountable oversight.",
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
    title:
      "British Beacon Mosque Awards 2021 Finalists named in the Queen's Honours List",
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

export type AwardWinnerRecord = {
  category: string;
  href: string;
  image: string;
  imageAlt: string;
  label: string;
  summary: string;
  title: string;
  winnerName: string;
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

export const awardWinnerRecords2025: AwardWinnerRecord[] = [
  {
    category: "Most Impactful Imam",
    href: "/shaykh-dr-saalim-ai-azhari-shortlisted-for-most-impactful-imam-2025-2/",
    image:
      "/assets/awards/2025/winners/most-impactful-imam-shaykh-dr-saalim-al-azhari.png",
    imageAlt:
      "Most Impactful Imam 2025 winner Shaykh Dr. Saalim Al-Azhari holding the Beacon Mosque Awards trophy",
    label: "Most impactful imam",
    summary:
      "Shaykh Dr. Saalim Al-Azhari was recognised as the 2025 winner in the Most Impactful Imam category.",
    title: "Most Impactful Imam",
    winnerName: "Shaykh Dr. Saalim Al-Azhari",
  },
  {
    category: "Best Run Mosque",
    href: "/cheadle-masjid-shortlisted-mosque-best-run-mosque2025/",
    image:
      "/assets/awards/2025/winners/best-run-mosque-cheadle-masjid-manchester.png",
    imageAlt:
      "Best Run Mosque 2025 winner Cheadle Masjid Manchester receiving the Beacon Mosque Awards trophy",
    label: "Best run mosque",
    summary:
      "Cheadle Masjid Manchester was recognised as the 2025 winner in the Best Run Mosque category.",
    title: "Best Run Mosque",
    winnerName: "Cheadle Masjid Manchester",
  },
  {
    category: "Best Mosque Volunteer",
    href: "/jamiyat-tabligh-ul-islam-jti-best-best-mosque-volunteer-2025/",
    image:
      "/assets/awards/2025/winners/best-mosque-volunteer-mohammed-wasim-jti.png",
    imageAlt:
      "Best Mosque Volunteer 2025 winner Mohammed Wasim of Jamiyat Tabligh Ul Islam receiving the Beacon Mosque Awards trophy",
    label: "Best mosque volunteer",
    summary:
      "Mohammed Wasim of Jamiyat Tabligh Ul Islam (JTI) was recognised as the 2025 winner in the Best Mosque Volunteer category.",
    title: "Best Mosque Volunteer",
    winnerName: "Mohammed Wasim - Jamiyat Tabligh Ul Islam (JTI)",
  },
  {
    category: "Most Impactful Alimah",
    href: "/sabia-rehman-finalist-for-most-impactful-alimah-2025/",
    image:
      "/assets/awards/2025/winners/most-impactful-alimah-shaykha-sabia-rehman.png",
    imageAlt:
      "Most Impactful Alimah 2025 winner Shaykha Sabia Rehman holding the Beacon Mosque Awards trophy",
    label: "Most impactful alimah",
    summary:
      "Shaykha Sabia Rehman was recognised as the 2025 winner in the Most Impactful Alimah category.",
    title: "Most Impactful Alimah",
    winnerName: "Shaykha Sabia Rehman",
  },
  {
    category: "Best Madrassah Service",
    href: "/taqwa-institute-shortlisted-for-best-madrassah-services-2025/",
    image:
      "/assets/awards/2025/winners/best-madrassah-service-taqwa-institute-oldham.png",
    imageAlt:
      "Best Madrassah Service 2025 winner Taqwa Institute Oldham receiving the Beacon Mosque Awards trophy",
    label: "Best madrassah service",
    summary:
      "Taqwa Institute Oldham was recognised as the 2025 winner in the Best Madrassah Service category.",
    title: "Best Madrassah Service",
    winnerName: "Taqwa Institute - Oldham",
  },
  {
    category: "Best Convert Support Service",
    href: "/london-central-mosque-finalist-for-best-convert-system/",
    image:
      "/assets/awards/2025/winners/best-convert-support-service-london-central-mosque.png",
    imageAlt:
      "Best Convert Support Service 2025 winner The London Central Mosque holding the Beacon Mosque Awards trophy",
    label: "Best convert support service",
    summary:
      "The London Central Mosque was recognised as the 2025 winner in the Best Convert Support Service category.",
    title: "Best Convert Support Service",
    winnerName: "The London Central Mosque",
  },
  {
    category: "Best Future Design",
    href: "/icob-islamic-centre-of-britain-best-future-design-mosque-2025/",
    image: "/assets/awards/2025/winners/best-future-design-icob.png",
    imageAlt:
      "Best Future Design 2025 winner ICOB Islamic Centre of Britain receiving the Beacon Mosque Awards trophy",
    label: "Best future design",
    summary:
      "ICOB Islamic Centre of Britain was recognised as the 2025 winner in the Best Future Design category.",
    title: "Best Future Design",
    winnerName: "ICOB - Islamic Centre of Britain",
  },
  {
    category: "Best Women's Service",
    href: "/al-manaar-mchc-shortlisted-for-best-womens-services-mosque-2025/",
    image:
      "/assets/awards/2025/winners/best-womens-service-al-manaar-london.png",
    imageAlt:
      "Best Women's Service 2025 winner Al-Manaar London receiving the Beacon Mosque Awards trophy",
    label: "Best women's service",
    summary:
      "Al-Manaar London was recognised as the 2025 winner in the Best Women's Service category.",
    title: "Best Women's Service",
    winnerName: "Al-Manaar - London",
  },
  {
    category: "Best Outreach Services",
    href: "/wirrel-dean-centre-bearkhead-best-outreach-services-2025/",
    image:
      "/assets/awards/2025/winners/best-outreach-services-wirral-deen-centre-birkenhead.png",
    imageAlt:
      "Best Outreach Services 2025 winner Wirral Deen Centre Birkenhead receiving the Beacon Mosque Awards trophy",
    label: "Best outreach services",
    summary:
      "Wirral Deen Centre Birkenhead was recognised as the 2025 winner in the Best Outreach Services category.",
    title: "Best Outreach Services",
    winnerName: "Wirral Deen Centre - Birkenhead",
  },
  {
    category: "Best Youth Service",
    href: "/lozells-central-mosque-shortlisted-for-best-youth-services-mosque-2025/",
    image:
      "/assets/awards/2025/winners/best-youth-service-lozells-central-mosque-birmingham.png",
    imageAlt:
      "Best Youth Service 2025 winner Lozells Central Mosque Birmingham receiving the Beacon Mosque Awards trophy",
    label: "Best youth service",
    summary:
      "Lozells Central Mosque Birmingham was recognised as the 2025 winner in the Best Youth Service category.",
    title: "Best Youth Service",
    winnerName: "Lozells Central Mosque Birmingham",
  },
];

const awardWinnerRecords2025ByCategory = Object.fromEntries(
  awardWinnerRecords2025.map((winner) => [winner.category, winner]),
);

const awardWinnerRecords2025ByHref = Object.fromEntries(
  awardWinnerRecords2025.map((winner) => [winner.href, winner]),
);

export const awardWinnerRecords2024: AwardWinnerRecord[] = [
  {
    category: "Best Women's Service",
    href: "/nelson-community-mosque-shortlisted-mosque-best-youth-service-2024/",
    image: "/wp-content/uploads/2024/04/Best-Womens-Service-scaled-1-669x272.jpg",
    imageAlt:
      "Best Women's Service 2024 winner Nelson Community Mosque receiving the Beacon Mosque Awards trophy",
    label: "Best women's service",
    summary:
      "Nelson Community Mosque was recognised as the 2024 winner in the Best Women's Service category.",
    title: "Best Women's Service",
    winnerName: "Nelson Community Mosque",
  },
  {
    category: "Most Impactful Imam",
    href: "/adam-kelwick-shortlisted-most-impactful-imam-2024/",
    image:
      "/assets/awards/2024/winners/most-impactful-imam-imam-adam-kelwick.png",
    imageAlt:
      "Most Impactful Imam 2024 winner Imam Adam Kelwick holding the Beacon Mosque Awards trophy",
    label: "Most impactful imam",
    summary:
      "Imam Adam Kelwick was recognised as the 2024 winner in the Most Impactful Imam category.",
    title: "Most Impactful Imam",
    winnerName: "Imam Adam Kelwick",
  },
  {
    category: "Best Youth Service",
    href: "/abderdeen-mosque-islamic-centre-shortlisted-mosque-best-youth-service-2024/",
    image:
      "/assets/awards/2024/winners/best-youth-service-aberdeen-mosque-and-islamic-centre.png",
    imageAlt:
      "Best Youth Service 2024 winner Aberdeen Mosque and Islamic Centre receiving the Beacon Mosque Awards trophy",
    label: "Best youth service",
    summary:
      "Aberdeen Mosque and Islamic Centre was recognised as the 2024 winner in the Best Youth Service category.",
    title: "Best Youth Service",
    winnerName: "Aberdeen Mosque and Islamic Centre",
  },
  {
    category: "Best Convert Support Service",
    href: "/the-olton-project-shortlisted-mosque-best-convert-care-service-2024/",
    image:
      "/assets/awards/2024/winners/best-convert-support-service-the-olton-project-birmingham.png",
    imageAlt:
      "Best Convert Support Service 2024 winner The Olton Project Birmingham receiving the Beacon Mosque Awards trophy",
    label: "Best convert support service",
    summary:
      "The Olton Project Birmingham was recognised as the 2024 winner in the Best Convert Support Service category.",
    title: "Best Convert Support Service",
    winnerName: "The Olton Project - Birmingham",
  },
  {
    category: "Best Innovative Service",
    href: "/central-jamia-masjid-shortlisted-mosque-best-innovation-service-2024/",
    image:
      "/assets/awards/2024/winners/best-innovative-service-central-jamia-masjid-halifax.png",
    imageAlt:
      "Best Innovative Service 2024 winner Central Jamia Masjid Halifax receiving the Beacon Mosque Awards trophy",
    label: "Best innovative service",
    summary:
      "Central Jamia Masjid Halifax was recognised as the 2024 winner in the Best Innovative Service category.",
    title: "Best Innovative Service",
    winnerName: "Central Jamia Masjid - Halifax",
  },
  {
    category: "Most Impactful Alimah",
    href: "/saleha-islam-shortlisted-most-impactful-alimah-2024/",
    image:
      "/assets/awards/2024/winners/most-impactful-alimah-shaykha-saleha-bukhari-islam.png",
    imageAlt:
      "Most Impactful Alimah 2024 winner Shaykha Saleha Bukhari Islam receiving the Beacon Mosque Awards trophy",
    label: "Most impactful alimah",
    summary:
      "Shaykha Saleha Bukhari Islam was recognised as the 2024 winner in the Most Impactful Alimah category.",
    title: "Most Impactful Alimah",
    winnerName: "Shaykha Saleha Bukhari Islam",
  },
  {
    category: "Best Mosque Volunteer",
    href: "/best-mosque-volunteer-shortlist-2024/",
    image: "/wp-content/uploads/2024/04/Best-Mosque-Volunteer-scaled-1-700x441.jpg",
    imageAlt:
      "Best Mosque Volunteer 2024 winner Bilal Mosque receiving the Beacon Mosque Awards trophy",
    label: "Best mosque volunteer",
    summary:
      "Bilal Mosque was recognised as the 2024 winner in the Best Mosque Volunteer category.",
    title: "Best Mosque Volunteer",
    winnerName: "Bilal Mosque",
  },
  {
    category: "Best Future Design",
    href: "/salaam-centre-shortlisted-mosque-best-future-design-2024/",
    image:
      "/assets/awards/2024/winners/best-future-design-the-salaam-centre-london.png",
    imageAlt:
      "Best Future Design 2024 winner The Salaam Centre London receiving the Beacon Mosque Awards trophy",
    label: "Best future design",
    summary:
      "The Salaam Centre London was recognised as the 2024 winner in the Best Future Design category.",
    title: "Best Future Design",
    winnerName: "The Salaam Centre - London",
  },
  {
    category: "Best Run Mosque",
    href: "/bilal-academy-shortlisted-mosque-best-run-mosque2024/",
    image:
      "/assets/awards/2024/winners/best-run-mosque-bilal-academy-walsall.png",
    imageAlt:
      "Best Run Mosque 2024 winner Bilal Academy Walsall receiving the Beacon Mosque Awards trophy",
    label: "Best run mosque",
    summary:
      "Bilal Academy Walsall was recognised as the 2024 winner in the Best Run Mosque category.",
    title: "Best Run Mosque",
    winnerName: "Bilal Academy - Walsall",
  },
  {
    category: "Best Madrassah Service",
    href: "/the-hub-madrassah-shortlisted-mosque-2024/",
    image:
      "/assets/awards/2024/winners/best-madrassah-service-deen-central-the-hub-solihull.png",
    imageAlt:
      "Best Madrassah Service 2024 winner DEEN Central The Hub Solihull receiving the Beacon Mosque Awards trophy",
    label: "Best madrassah service",
    summary:
      "DEEN Central / The Hub Solihull was recognised as the 2024 winner in the Best Madrassah Service category.",
    title: "Best Madrassah Service",
    winnerName: "DEEN Central / The Hub - Solihull",
  },
];

const awardWinnerRecords2024ByCategory = Object.fromEntries(
  awardWinnerRecords2024.map((winner) => [winner.category, winner]),
);

const awardWinnerRecords2024ByHref = Object.fromEntries(
  awardWinnerRecords2024.map((winner) => [winner.href, winner]),
);

export function getAwardWinnerRecord2025ByCategory(category: string) {
  return (
    awardWinnerRecords2025ByCategory[
      category as keyof typeof awardWinnerRecords2025ByCategory
    ] ?? null
  );
}

export function getAwardWinnerRecord2025ByHref(href: string) {
  return (
    awardWinnerRecords2025ByHref[
      href as keyof typeof awardWinnerRecords2025ByHref
    ] ?? null
  );
}

export function getAwardWinnerRecord2024ByCategory(category: string) {
  return (
    awardWinnerRecords2024ByCategory[
      category as keyof typeof awardWinnerRecords2024ByCategory
    ] ?? null
  );
}

export function getAwardWinnerRecord2024ByHref(href: string) {
  return (
    awardWinnerRecords2024ByHref[
      href as keyof typeof awardWinnerRecords2024ByHref
    ] ?? null
  );
}

export const awardWinners2025: WinnerCard[] = awardWinnerRecords2025.map(
  (winner) => ({
    src: winner.image,
    alt: `${winner.title} 2025 winner - ${winner.winnerName}`,
  }),
);

export const awardWinners2024: WinnerCard[] = awardWinnerRecords2024.map(
  (winner) => ({
    src: winner.image,
    alt: `${winner.title} 2024 winner - ${winner.winnerName}`,
  }),
);

export const winnerShowcaseItems: WinnerShowcaseItem[] =
  awardWinnerRecords2025.map((winner) => ({
    title: winner.title,
    label: winner.label,
    href: winner.href,
    eyebrow: "2025 winner",
    summary: winner.summary,
    image: winner.image,
    imageAlt: winner.imageAlt,
  }));

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
