// app/ai-development/proptech/page.tsx
import React from 'react';
import { PageLayout } from '@/components/locations/PageLayout';
import { HeroSection } from '@/components/locations/sections/Hero';
import { OverviewSection } from '@/components/locations/sections/Overview';
import { PricingSection } from '@/components/locations/sections/PricingTable';
import { ApplicationsSection } from '@/components/locations/sections/Application';
import { FAQSection } from '@/components/locations/sections/Faq';
import { CTASection } from '@/components/locations/sections/Cta';
import { StatsSection } from '@/components/locations/sections/Stats';
import { ObjectionsSection } from '@/components/locations/sections/Objections';
import { getPropTechAICityPageDataBySlug } from '@/data/proptech-ai-city-pages-data';

// Main page data uses the key "proptech" (we don't have one, but we'll use the first city as template)
// Since we don't have a main proptech page in the data, we'll create one from Houston as a template
// or we can show a city selector/overview page.
// For now, we'll redirect to Houston or show a list of cities.

export const metadata = {
  title: 'PropTech AI Development | ClickMasters',
  description: 'PropTech AI development from $28K. Property valuation, market analytics, buyer matching for real estate startups. Free PropTech AI quote.',
};

// We don't have a main "proptech" entry in the data, so we'll use Houston as the default
export default function PropTechMainPage() {
  // Use Houston data as the main page template
  const pageData = getPropTechAICityPageDataBySlug('proptech-houston');

  if (!pageData) {
    return null;
  }

  // Rebrand the hero for the main page
  const mainHero = {
    tagline: 'PropTech AI Development  Built for Real Estate Startups',
    title: 'PropTech AI Development  Property Valuation, Market Analytics & Buyer Matching',
    description: 'ClickMasters builds AI systems for PropTech startups building property valuation, market analytics, and buyer-matching products. From flood-risk-aware valuation in Houston to luxury property valuation in Miami, we build AI calibrated to your market\'s specific dynamics. PropTech AI development starts at $28,000. Fixed-price. Full IP. USA-based senior engineers.',
    ctaText: 'Get a Free PropTech AI Consultation',
    ctaLink: '/contact',
    startingPrice: '$28,000',
    badge: 'Fixed-Price | Full IP | 24-Hour Response',
  };

  return (
    <PageLayout withGrain>
      <HeroSection
        tagline={mainHero.tagline}
        title={mainHero.title}
        description={mainHero.description}
        ctaText={mainHero.ctaText}
        ctaLink={mainHero.ctaLink}
        startingPrice={mainHero.startingPrice}
        badge={mainHero.badge}
        stats={pageData.overview.stats}
      />

      <OverviewSection
        title="PropTech AI: Built for Real Estate Market Dynamics"
        content="PropTech AI is fundamentally different from generic AI development because real estate markets are local, illiquid, and shaped by distinct regulatory, physical, and economic factors that vary dramatically by city. A valuation model built for Houston's flood-prone, sprawling market won't work for Boston's historic student housing market. ClickMasters builds PropTech AI calibrated to your specific market's dynamics, with the documentation institutional buyers and enterprise partners require."
        stats={pageData.overview.stats}
      />

      <StatsSection
        title="PropTech AI by the Numbers"
        stats={pageData.overview.stats ?? []}
      />

      <PricingSection
        title={pageData.pricing.title}
        description={pageData.pricing.description}
        items={pageData.pricing.items}
        note={pageData.pricing.note}
      />

      <ApplicationsSection
        title="PropTech AI Use Cases ClickMasters Builds"
        description="ClickMasters builds PropTech AI for property valuation, market analytics, buyer matching, and more."
        items={pageData.applications.items}
      />

      {/* City-specific objections section */}
      {pageData.objections && pageData.objections.length > 0 && (
        <ObjectionsSection
          title="Buyer Objections, Answered Directly"
          items={pageData.objections}
        />
      )}

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your PropTech AI Project"
        description="ClickMasters responds to every PropTech inquiry within 24 business hours. Our senior AI architects have delivered production AI systems for real estate startups across the United States. The free consultation is 45 minutes with a named senior engineer  not a sales representative."
        ctaText="Book Your Free PropTech AI Consultation"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}