import {
  AccreditedSection,
  AwardsFeatureSection,
  CeremonyGallerySection,
  FinalCta,
  HomeHero,
  HeroStatsBand,
  NetworkSection,
  NewsSection,
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
      <main>
        <HomeHero />
        <HeroStatsBand />
        <AwardsFeatureSection />
        <WinnersShowcaseSection />
        <StandardsIntro />
        <QualityStandardsSection />
        <ServicesSection />
        <NetworkSection />
        <AccreditedSection />
        <CeremonyGallerySection />
        <NewsSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
