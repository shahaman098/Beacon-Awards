import {
  awards2026CategoriesHref,
  ceremonyGallery,
  featureCards,
  serviceCards,
  standards,
} from "@/lib/content";

export type HomepageFeatureCard = {
  title: string;
  text: string;
  href: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
  imageScale: string;
  dark?: boolean;
};

export type HomepageGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  objectPosition: string;
  imageScale: string;
};

export type HomepageExcellenceCard = {
  title: string;
  eyebrow: string;
  text: string;
  href: string;
  image: string;
  imageAlt: string;
  fit: "cover" | "contain";
  objectPosition: string;
  imageScale: string;
};

export type HomepageContent = {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    cycleLabel: string;
    cycleHeading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    videoUrl: string;
    posterUrl: string;
    posterObjectPosition: string;
    posterScale: string;
  };
  featureCards: HomepageFeatureCard[];
  excellenceIntro: {
    kicker: string;
    heading: string;
    body: string;
    cards: HomepageExcellenceCard[];
  };
  awardsArchive: {
    ctaLabel: string;
  };
  winnersIntro: string;
  standardsIntro: {
    kicker: string;
    heading: string;
    standardTitles: string[];
  };
  services: {
    titles: string[];
  };
  network: {
    kicker: string;
    heading: string;
    body: string;
    partnerKicker: string;
    ctaLabel: string;
  };
  mosqueMba: {
    kicker: string;
    heading: string;
    body: string;
    ctaLabel: string;
    image: string;
    imageAlt: string;
    objectPosition: string;
    imageScale: string;
    stats: Array<{ value: string; label: string }>;
    pills: string[];
  };
  experiencePillars: {
    kicker: string;
    heading: string;
    body: string;
    pathways: Array<{ title: string; text: string; href: string }>;
  };
  galleryHeading: string;
  galleryItems: HomepageGalleryItem[];
  finalCta: {
    kicker: string;
    heading: string;
    buttonLabel: string;
    buttonHref: string;
    image: string;
    imageAlt: string;
    objectPosition: string;
    imageScale: string;
  };
  footerEmail: string;
};

export const HOMEPAGE_CONTENT_ID = "default";
export const DEFAULT_OBJECT_POSITION = "50% 50%";
export const DEFAULT_IMAGE_SCALE = "1";

export function imagePositionPath(imagePath: string) {
  if (imagePath === "hero.posterUrl") return "hero.posterObjectPosition";
  if (imagePath === "mosqueMba.image") return "mosqueMba.objectPosition";
  if (imagePath.endsWith(".image")) {
    return imagePath.replace(/\.image$/, ".objectPosition");
  }
  if (imagePath.endsWith(".src")) {
    return imagePath.replace(/\.src$/, ".objectPosition");
  }
  return `${imagePath}ObjectPosition`;
}

export function imageScalePath(imagePath: string) {
  if (imagePath === "hero.posterUrl") return "hero.posterScale";
  if (imagePath === "mosqueMba.image") return "mosqueMba.imageScale";
  if (imagePath.endsWith(".image")) {
    return imagePath.replace(/\.image$/, ".imageScale");
  }
  if (imagePath.endsWith(".src")) {
    return imagePath.replace(/\.src$/, ".imageScale");
  }
  return `${imagePath}Scale`;
}

export function parseObjectPosition(value: string | undefined) {
  const match = (value || DEFAULT_OBJECT_POSITION)
    .trim()
    .match(/^(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%$/);
  if (!match) return { x: 50, y: 50 };
  return {
    x: Math.min(100, Math.max(0, Number(match[1]))),
    y: Math.min(100, Math.max(0, Number(match[2]))),
  };
}

export function formatObjectPosition(x: number, y: number) {
  return `${Math.round(Math.min(100, Math.max(0, x)))}% ${Math.round(Math.min(100, Math.max(0, y)))}%`;
}

export function defaultHomepageContent(): HomepageContent {
  return {
    hero: {
      badge: "British Beacon Mosque Awards",
      titleLine1: "Beacon",
      titleLine2: "Awards",
      cycleLabel: "Awards cycle",
      cycleHeading: "9th Annual Beacon Mosque Awards 2026",
      body: "Celebrating the best of British mosques through service, governance, innovation and measurable community impact.",
      ctaLabel: "Submit Your Nomination",
      ctaHref: awards2026CategoriesHref,
      videoUrl:
        "/wp-content/uploads/2023/05/Beacon-Mosque-Home-Intro-Video.mp4",
      posterUrl: "/assets/hero/awards-2025-poster.jpeg",
      posterObjectPosition: DEFAULT_OBJECT_POSITION,
      posterScale: DEFAULT_IMAGE_SCALE,
    },
    featureCards: featureCards.map((card) => ({
      title: card.title,
      text: card.text,
      href: card.href,
      image: card.image,
      imageAlt: card.imageAlt,
      objectPosition: DEFAULT_OBJECT_POSITION,
      imageScale: DEFAULT_IMAGE_SCALE,
      dark: card.dark,
    })),
    excellenceIntro: {
      kicker: "National recognition",
      heading: "Striving for excellence",
      body: "Beacon Mosque helps mosques evidence strong practice, celebrate outstanding service and share models of leadership that strengthen communities across the UK.",
      cards: [
        {
          title: "Winners",
          eyebrow: "Awards archive",
          text: "Explore the latest finalists and winners recognised for measurable community impact, leadership and service excellence.",
          href: "/awards/beacon-mosque-awards-2025/",
          image: "/assets/awards/2025/awards-2025-01.jpg",
          imageAlt: "Beacon Mosque Awards winners artwork",
          fit: "cover",
          objectPosition: DEFAULT_OBJECT_POSITION,
          imageScale: DEFAULT_IMAGE_SCALE,
        },
        {
          title: "Standards",
          eyebrow: "Beacon framework",
          text: "Review the Beacon Mosque standards that support stronger governance, accountability, communication and community trust.",
          href: "/standards/",
          image: "/assets/cards/standards-card.jpg",
          imageAlt: "Beacon Mosque standards visual",
          fit: "contain",
          objectPosition: DEFAULT_OBJECT_POSITION,
          imageScale: DEFAULT_IMAGE_SCALE,
        },
        {
          title: "Training",
          eyebrow: "Leadership support",
          text: "Access practical training resources, guides and leadership materials to help mosque teams improve delivery and long-term planning.",
          href: "/training/",
          image: "/assets/cards/training-card.jpg",
          imageAlt: "Beacon Mosque training and leadership support",
          fit: "cover",
          objectPosition: DEFAULT_OBJECT_POSITION,
          imageScale: DEFAULT_IMAGE_SCALE,
        },
      ],
    },
    awardsArchive: {
      ctaLabel: "Submit Your Nomination for Beacon Mosque Awards 2026",
    },
    winnersIntro:
      "The archive keeps public recognition visible and helps mosque teams learn from strong examples of service, governance and community impact.",
    standardsIntro: {
      kicker: "Standards",
      heading: "Where mosque standards meet public service and trust",
      standardTitles: standards.slice(0, 4).map((item) => item.title),
    },
    services: {
      titles: serviceCards.map((card) => card.title),
    },
    network: {
      kicker: "National network",
      heading: "Beacon Mosque network",
      body: "A growing network of accredited mosques, award winners and community projects demonstrating measurable impact.",
      partnerKicker: "Partner platform",
      ctaLabel: "View beacon mosques",
    },
    mosqueMba: {
      kicker: "Faith Associates Academy",
      heading: "Mosque MBA for modern mosque leadership",
      body: "A masters-level professional pathway for mosque founders, executives and volunteers building stronger institutions, clearer leadership and sustainable community projects.",
      ctaLabel: "Visit Mosque MBA",
      image: "/assets/home/mosque-mba-programme.png",
      imageAlt: "Mosque MBA programme visual",
      objectPosition: DEFAULT_OBJECT_POSITION,
      imageScale: DEFAULT_IMAGE_SCALE,
      stats: [
        { value: "200+", label: "online seminars" },
        { value: "12-18", label: "months" },
        { value: "42", label: "core modules" },
      ],
      pills: [
        "Tailored for mosque leaders",
        "Interactive global learning",
        "Sustainable project design",
      ],
    },
    experiencePillars: {
      kicker: "Pathways",
      heading: "One platform. Three ways forward.",
      body: "Awards, standards and accreditation work together so mosques can celebrate excellence, strengthen practice and evidence quality.",
      pathways: [
        {
          title: "Awards",
          href: "/awards/",
          text: "National recognition for mosques, teams and individuals raising the bar.",
        },
        {
          title: "Standards",
          href: "/standards/",
          text: "Practical benchmarks for governance, communication and service delivery.",
        },
        {
          title: "Accreditation",
          href: "/accreditation-process/",
          text: "A route for evidencing quality and progressing toward Beacon status.",
        },
      ],
    },
    galleryHeading: "Ceremony moments and community stories",
    galleryItems: ceremonyGallery.map((item) => ({
      src: item.src,
      alt: item.alt,
      caption: item.caption ?? "",
      objectPosition: DEFAULT_OBJECT_POSITION,
      imageScale: DEFAULT_IMAGE_SCALE,
    })),
    finalCta: {
      kicker: "Beacon Mosque Awards 2026",
      heading:
        "Presenting the most inspiring mosque excellence stories of the season",
      buttonLabel: "Submit nomination",
      buttonHref: awards2026CategoriesHref,
      image: "/wp-content/uploads/2025/12/19-1024x576.jpg",
      imageAlt: "Beacon Mosque Awards final call to action",
      objectPosition: "50% 18%",
      imageScale: DEFAULT_IMAGE_SCALE,
    },
    footerEmail: "info@faithassociates.co.uk",
  };
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function asBool(value: unknown, fallback?: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function mergeExcellenceCards(
  raw: unknown,
  defaults: HomepageExcellenceCard[],
): HomepageExcellenceCard[] {
  const list = Array.isArray(raw) ? raw : defaults;
  return list.map((card, index) => {
    const fallback = defaults[index] ?? defaults[0];
    const item =
      card && typeof card === "object"
        ? (card as Record<string, unknown>)
        : {};
    const fit =
      item.fit === "contain" || item.fit === "cover" ? item.fit : fallback.fit;
    return {
      title: asString(item.title, fallback.title),
      eyebrow: asString(item.eyebrow, fallback.eyebrow),
      text: asString(item.text, fallback.text),
      href: asString(item.href, fallback.href),
      image: asString(item.image, fallback.image),
      imageAlt: asString(item.imageAlt, fallback.imageAlt),
      fit,
      objectPosition: asString(item.objectPosition, fallback.objectPosition),
      imageScale: asString(item.imageScale, fallback.imageScale),
    };
  });
}

export function mergeHomepageContent(partial: unknown): HomepageContent {
  const defaults = defaultHomepageContent();
  if (!partial || typeof partial !== "object") return defaults;

  const raw = partial as Record<string, unknown>;
  const heroRaw =
    raw.hero && typeof raw.hero === "object"
      ? (raw.hero as Record<string, unknown>)
      : {};
  const finalRaw =
    raw.finalCta && typeof raw.finalCta === "object"
      ? (raw.finalCta as Record<string, unknown>)
      : {};
  const excellenceRaw =
    raw.excellenceIntro && typeof raw.excellenceIntro === "object"
      ? (raw.excellenceIntro as Record<string, unknown>)
      : {};
  const archiveRaw =
    raw.awardsArchive && typeof raw.awardsArchive === "object"
      ? (raw.awardsArchive as Record<string, unknown>)
      : {};
  const standardsRaw =
    raw.standardsIntro && typeof raw.standardsIntro === "object"
      ? (raw.standardsIntro as Record<string, unknown>)
      : {};
  const servicesRaw =
    raw.services && typeof raw.services === "object"
      ? (raw.services as Record<string, unknown>)
      : {};
  const networkRaw =
    raw.network && typeof raw.network === "object"
      ? (raw.network as Record<string, unknown>)
      : {};
  const mbaRaw =
    raw.mosqueMba && typeof raw.mosqueMba === "object"
      ? (raw.mosqueMba as Record<string, unknown>)
      : {};
  const pillarsRaw =
    raw.experiencePillars && typeof raw.experiencePillars === "object"
      ? (raw.experiencePillars as Record<string, unknown>)
      : {};

  const featureCardsRaw = Array.isArray(raw.featureCards)
    ? raw.featureCards
    : defaults.featureCards;
  const galleryRaw = Array.isArray(raw.galleryItems)
    ? raw.galleryItems
    : defaults.galleryItems;

  const standardTitlesRaw = Array.isArray(standardsRaw.standardTitles)
    ? standardsRaw.standardTitles
    : defaults.standardsIntro.standardTitles;
  const serviceTitlesRaw = Array.isArray(servicesRaw.titles)
    ? servicesRaw.titles
    : defaults.services.titles;
  const mbaStatsRaw = Array.isArray(mbaRaw.stats)
    ? mbaRaw.stats
    : defaults.mosqueMba.stats;
  const mbaPillsRaw = Array.isArray(mbaRaw.pills)
    ? mbaRaw.pills
    : defaults.mosqueMba.pills;
  const pathwaysRaw = Array.isArray(pillarsRaw.pathways)
    ? pillarsRaw.pathways
    : defaults.experiencePillars.pathways;

  return {
    hero: {
      badge: asString(heroRaw.badge, defaults.hero.badge),
      titleLine1: asString(heroRaw.titleLine1, defaults.hero.titleLine1),
      titleLine2: asString(heroRaw.titleLine2, defaults.hero.titleLine2),
      cycleLabel: asString(heroRaw.cycleLabel, defaults.hero.cycleLabel),
      cycleHeading: asString(heroRaw.cycleHeading, defaults.hero.cycleHeading),
      body: asString(heroRaw.body, defaults.hero.body),
      ctaLabel: asString(heroRaw.ctaLabel, defaults.hero.ctaLabel),
      ctaHref: asString(heroRaw.ctaHref, defaults.hero.ctaHref),
      videoUrl: asString(heroRaw.videoUrl, defaults.hero.videoUrl),
      posterUrl: asString(heroRaw.posterUrl, defaults.hero.posterUrl),
      posterObjectPosition: asString(
        heroRaw.posterObjectPosition,
        defaults.hero.posterObjectPosition,
      ),
      posterScale: asString(heroRaw.posterScale, defaults.hero.posterScale),
    },
    featureCards: featureCardsRaw.map((card, index) => {
      const fallback = defaults.featureCards[index] ?? defaults.featureCards[0];
      const item =
        card && typeof card === "object"
          ? (card as Record<string, unknown>)
          : {};
      return {
        title: asString(item.title, fallback.title),
        text: asString(item.text, fallback.text),
        href: asString(item.href, fallback.href),
        image: asString(item.image, fallback.image),
        imageAlt: asString(item.imageAlt, fallback.imageAlt),
        objectPosition: asString(
          item.objectPosition,
          fallback.objectPosition,
        ),
        imageScale: asString(item.imageScale, fallback.imageScale),
        dark: asBool(item.dark, fallback.dark),
      };
    }),
    excellenceIntro: {
      kicker: asString(excellenceRaw.kicker, defaults.excellenceIntro.kicker),
      heading: asString(excellenceRaw.heading, defaults.excellenceIntro.heading),
      body: asString(excellenceRaw.body, defaults.excellenceIntro.body),
      cards: mergeExcellenceCards(
        excellenceRaw.cards,
        defaults.excellenceIntro.cards,
      ),
    },
    awardsArchive: {
      ctaLabel: asString(archiveRaw.ctaLabel, defaults.awardsArchive.ctaLabel),
    },
    winnersIntro: asString(raw.winnersIntro, defaults.winnersIntro),
    standardsIntro: {
      kicker: asString(standardsRaw.kicker, defaults.standardsIntro.kicker),
      heading: asString(standardsRaw.heading, defaults.standardsIntro.heading),
      standardTitles: standardTitlesRaw.map((title, index) =>
        asString(
          title,
          defaults.standardsIntro.standardTitles[index] ??
            defaults.standardsIntro.standardTitles[0],
        ),
      ),
    },
    services: {
      titles: serviceTitlesRaw.map((title, index) =>
        asString(
          title,
          defaults.services.titles[index] ?? defaults.services.titles[0],
        ),
      ),
    },
    network: {
      kicker: asString(networkRaw.kicker, defaults.network.kicker),
      heading: asString(networkRaw.heading, defaults.network.heading),
      body: asString(networkRaw.body, defaults.network.body),
      partnerKicker: asString(
        networkRaw.partnerKicker,
        defaults.network.partnerKicker,
      ),
      ctaLabel: asString(networkRaw.ctaLabel, defaults.network.ctaLabel),
    },
    mosqueMba: {
      kicker: asString(mbaRaw.kicker, defaults.mosqueMba.kicker),
      heading: asString(mbaRaw.heading, defaults.mosqueMba.heading),
      body: asString(mbaRaw.body, defaults.mosqueMba.body),
      ctaLabel: asString(mbaRaw.ctaLabel, defaults.mosqueMba.ctaLabel),
      image: asString(mbaRaw.image, defaults.mosqueMba.image),
      imageAlt: asString(mbaRaw.imageAlt, defaults.mosqueMba.imageAlt),
      objectPosition: asString(
        mbaRaw.objectPosition,
        defaults.mosqueMba.objectPosition,
      ),
      imageScale: asString(mbaRaw.imageScale, defaults.mosqueMba.imageScale),
      stats: mbaStatsRaw.map((stat, index) => {
        const fallback = defaults.mosqueMba.stats[index] ?? defaults.mosqueMba.stats[0];
        const item =
          stat && typeof stat === "object"
            ? (stat as Record<string, unknown>)
            : {};
        return {
          value: asString(item.value, fallback.value),
          label: asString(item.label, fallback.label),
        };
      }),
      pills: mbaPillsRaw.map((pill, index) =>
        asString(pill, defaults.mosqueMba.pills[index] ?? defaults.mosqueMba.pills[0]),
      ),
    },
    experiencePillars: {
      kicker: asString(pillarsRaw.kicker, defaults.experiencePillars.kicker),
      heading: asString(pillarsRaw.heading, defaults.experiencePillars.heading),
      body: asString(pillarsRaw.body, defaults.experiencePillars.body),
      pathways: pathwaysRaw.map((pathway, index) => {
        const fallback =
          defaults.experiencePillars.pathways[index] ??
          defaults.experiencePillars.pathways[0];
        const item =
          pathway && typeof pathway === "object"
            ? (pathway as Record<string, unknown>)
            : {};
        return {
          title: asString(item.title, fallback.title),
          text: asString(item.text, fallback.text),
          href: asString(item.href, fallback.href),
        };
      }),
    },
    galleryHeading: asString(raw.galleryHeading, defaults.galleryHeading),
    galleryItems: galleryRaw.map((item, index) => {
      const fallback =
        defaults.galleryItems[index] ?? defaults.galleryItems[0];
      const galleryItem =
        item && typeof item === "object"
          ? (item as Record<string, unknown>)
          : {};
      return {
        src: asString(galleryItem.src, fallback.src),
        alt: asString(galleryItem.alt, fallback.alt),
        caption: asString(galleryItem.caption, fallback.caption),
        objectPosition: asString(
          galleryItem.objectPosition,
          fallback.objectPosition,
        ),
        imageScale: asString(galleryItem.imageScale, fallback.imageScale),
      };
    }),
    finalCta: {
      kicker: asString(finalRaw.kicker, defaults.finalCta.kicker),
      heading: asString(finalRaw.heading, defaults.finalCta.heading),
      buttonLabel: asString(finalRaw.buttonLabel, defaults.finalCta.buttonLabel),
      buttonHref: asString(finalRaw.buttonHref, defaults.finalCta.buttonHref),
      image: asString(finalRaw.image, defaults.finalCta.image),
      imageAlt: asString(finalRaw.imageAlt, defaults.finalCta.imageAlt),
      objectPosition: asString(
        finalRaw.objectPosition,
        defaults.finalCta.objectPosition,
      ),
      imageScale: asString(finalRaw.imageScale, defaults.finalCta.imageScale),
    },
    footerEmail: asString(raw.footerEmail, defaults.footerEmail),
  };
}

function setNestedString(
  target: Record<string, unknown>,
  key: string,
  value: string,
) {
  target[key] = value;
}

export function setHomepageField(
  content: HomepageContent,
  path: string,
  value: string,
): HomepageContent {
  const next = structuredClone(content);
  const parts = path.split(".");

  if (parts[0] === "hero" && parts[1]) {
    (next.hero as Record<string, string>)[parts[1]] = value;
    return next;
  }

  if (parts[0] === "finalCta" && parts[1]) {
    (next.finalCta as Record<string, string>)[parts[1]] = value;
    return next;
  }

  if (parts[0] === "winnersIntro") {
    next.winnersIntro = value;
    return next;
  }

  if (parts[0] === "galleryHeading") {
    next.galleryHeading = value;
    return next;
  }

  if (parts[0] === "footerEmail") {
    next.footerEmail = value;
    return next;
  }

  if (parts[0] === "awardsArchive" && parts[1]) {
    (next.awardsArchive as Record<string, string>)[parts[1]] = value;
    return next;
  }

  if (parts[0] === "network" && parts[1]) {
    (next.network as Record<string, string>)[parts[1]] = value;
    return next;
  }

  if (parts[0] === "mosqueMba") {
    if (parts[1] === "stats" && parts[2] && parts[3]) {
      const index = Number.parseInt(parts[2], 10);
      if (Number.isFinite(index) && next.mosqueMba.stats[index]) {
        (next.mosqueMba.stats[index] as Record<string, string>)[parts[3]] =
          value;
      }
      return next;
    }
    if (parts[1] === "pills" && parts[2]) {
      const index = Number.parseInt(parts[2], 10);
      if (Number.isFinite(index) && next.mosqueMba.pills[index] != null) {
        next.mosqueMba.pills[index] = value;
      }
      return next;
    }
    if (parts[1]) {
      (next.mosqueMba as Record<string, unknown>)[parts[1]] = value;
      return next;
    }
  }

  if (parts[0] === "excellenceIntro") {
    if (parts[1] === "cards" && parts[2] && parts[3]) {
      const index = Number.parseInt(parts[2], 10);
      if (Number.isFinite(index) && next.excellenceIntro.cards[index]) {
        const key = parts[3];
        if (key === "fit") {
          next.excellenceIntro.cards[index].fit =
            value === "contain" ? "contain" : "cover";
        } else {
          (next.excellenceIntro.cards[index] as Record<string, string>)[key] =
            value;
        }
      }
      return next;
    }
    if (parts[1]) {
      setNestedString(
        next.excellenceIntro as unknown as Record<string, unknown>,
        parts[1],
        value,
      );
      return next;
    }
  }

  if (parts[0] === "standardsIntro") {
    if (parts[1] === "standardTitles" && parts[2]) {
      const index = Number.parseInt(parts[2], 10);
      if (
        Number.isFinite(index) &&
        next.standardsIntro.standardTitles[index] != null
      ) {
        next.standardsIntro.standardTitles[index] = value;
      }
      return next;
    }
    if (parts[1]) {
      (next.standardsIntro as unknown as Record<string, string>)[parts[1]] =
        value;
      return next;
    }
  }

  if (parts[0] === "services" && parts[1] === "titles" && parts[2]) {
    const index = Number.parseInt(parts[2], 10);
    if (Number.isFinite(index) && next.services.titles[index] != null) {
      next.services.titles[index] = value;
    }
    return next;
  }

  if (parts[0] === "experiencePillars") {
    if (parts[1] === "pathways" && parts[2] && parts[3]) {
      const index = Number.parseInt(parts[2], 10);
      if (Number.isFinite(index) && next.experiencePillars.pathways[index]) {
        (next.experiencePillars.pathways[index] as Record<string, string>)[
          parts[3]
        ] = value;
      }
      return next;
    }
    if (parts[1]) {
      (next.experiencePillars as unknown as Record<string, string>)[parts[1]] =
        value;
      return next;
    }
  }

  if (parts[0] === "featureCards" && parts[1] && parts[2]) {
    const index = Number.parseInt(parts[1], 10);
    if (Number.isFinite(index) && next.featureCards[index]) {
      const key = parts[2];
      if (key === "dark") {
        next.featureCards[index].dark = value === "true";
      } else {
        (next.featureCards[index] as Record<string, string | boolean | undefined>)[
          key
        ] = value;
      }
    }
    return next;
  }

  if (parts[0] === "galleryItems" && parts[1] && parts[2]) {
    const index = Number.parseInt(parts[1], 10);
    if (Number.isFinite(index) && next.galleryItems[index]) {
      (next.galleryItems[index] as Record<string, string>)[parts[2]] = value;
    }
  }

  return next;
}
