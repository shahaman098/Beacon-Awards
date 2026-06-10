import {
  AccreditedSection,
  AwardsArchiveSection,
  AwardsFeatureSection,
  BeaconExcellenceIntroSection,
  CeremonyGallerySection,
  ExperiencePillarsSection,
  EventsShowcaseSection,
  FeaturedSpeakersSection,
  FinalCta,
  HomeHero,
  HeroStatsBand,
  NetworkSection,
  NewsSection,
  PublicationsSection,
  QualityStandardsSection,
  ServicesSection,
  SiteFooter,
  StandardsIntro,
  WinnersShowcaseSection,
} from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";

export default async function Home() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white text-black">
        <HomeHero />
        <HeroStatsBand />
        <BeaconExcellenceIntroSection />
        <AwardsFeatureSection />
        <PublicationsSection />
        <AwardsArchiveSection />
        <WinnersShowcaseSection />
        <StandardsIntro />
        <QualityStandardsSection />
        <ServicesSection />
        <NetworkSection />
        <AccreditedSection />
        <CeremonyGallerySection />
        <FeaturedSpeakersSection />
        <ExperiencePillarsSection />
        <EventsShowcaseSection />
        <NewsSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
