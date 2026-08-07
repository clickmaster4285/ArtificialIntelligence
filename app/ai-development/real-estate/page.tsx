// app/ai-development/real-estate/page.tsx
import React from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/locations/PageLayout';
import { HeroSection } from '@/components/locations/sections/Hero';
import { OverviewSection } from '@/components/locations/sections/Overview';
import { PricingSection } from '@/components/locations/sections/PricingTable';
import { ApplicationsSection } from '@/components/locations/sections/Application';
import { FAQSection } from '@/components/locations/sections/Faq';
import { CTASection } from '@/components/locations/sections/Cta';
import { StatsSection } from '@/components/locations/sections/Stats';
import { ComplianceSection } from '@/components/locations/sections/Compliance';
import { 
  getRealEstateAICityPageDataBySlug, 
  getAllRealEstateAICityPageSlugs 
} from '@/data/real-estate-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for Real Estate | PropTech AI | ClickMasters',
  description: 'AI development for real estate from $35K. Property valuation, lead scoring, document AI & predictive analytics. Fixed-price. Free PropTech AI consultation.',
};

export default function RealEstateMainPage() {
  const pageData = getRealEstateAICityPageDataBySlug('real-estate');
  const allSlugs = getAllRealEstateAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .filter((s) => s !== 'real-estate')
    .map((s) => s.replace('real-estate-', ''))
    .map((s) => s.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    .sort();

  if (!pageData) {
    return null;
  }

  return (
    <PageLayout withGrain>
      <HeroSection
        tagline={pageData.hero.tagline}
        title={pageData.h1}
        description={pageData.hero.description}
        ctaText={pageData.hero.ctaText}
        ctaLink={pageData.hero.ctaLink}
        startingPrice={pageData.hero.startingPrice}
        badge={pageData.hero.badge}
        stats={pageData.overview.stats}
      />

      <OverviewSection
        title="Real Estate AI: Production Systems for Brokerages, PropTech & Lenders"
        content="Real estate is one of the largest addressable markets for AI investment in the United States  the combination of high transaction values, large data volumes, and significant inefficiency in traditional processes creates compelling ROI potential. According to McKinsey's 2025 Real Estate Technology Report, AI-enabled real estate operations generate 15–20% efficiency gains across the transaction lifecycle, with particular value in property valuation, lead qualification, document processing, and market analysis."
        stats={pageData.overview.stats}
      />

      <StatsSection
        title="Real Estate AI by the Numbers"
        stats={pageData.overview.stats ?? []}
      />

      <PricingSection
        title={pageData.pricing.title}
        description={pageData.pricing.description}
        items={pageData.pricing.items}
        note={pageData.pricing.note}
      />

      <ApplicationsSection
        title={pageData.applications.title}
        description={pageData.applications.description}
        items={pageData.applications.items}
      />

      <ComplianceSection
        title="Real Estate AI: Fair Housing & Regulatory Compliance"
        description="AI systems in real estate must be designed to avoid disparate impact on protected classes. ClickMasters designs all real estate AI with Fair Housing Act compliance as an architectural requirement, not a post-hoc retrofit."
        items={[
          {
            title: 'Fair Housing Act Compliance',
            description: 'Prohibited features (race, color, national origin, religion, sex, familial status, disability) are explicitly excluded. Disparate impact testing using the 4/5ths rule and statistical significance testing is conducted across protected class dimensions before deployment and on an ongoing basis.'
          },
          {
            title: 'ECOA & Regulation B (Mortgage AI)',
            description: 'For mortgage AI, Equal Credit Opportunity Act and Regulation B requirements  including adverse action notice requirements with specific reason codes  are built into the AI\'s output architecture from the start. ECOA-compliant decision explanations for regulatory examination.'
          },
          {
            title: 'MLS & Data Integration',
            description: 'MLS data via RESO Web API and RETS integration. County assessor records via public records integration. CRM integration with Salesforce, HubSpot, Follow Up Boss, Chime, Lofty. Property management platform integration with AppFolio, Buildium, Yardi, RealPage.'
          },
          {
            title: 'AVM Development',
            description: 'Custom AVM development with feature engineering and local calibration. Data sources include MLS transaction history, county assessor records, Census demographic data, walk/transit/bike scores, school ratings, permit data, satellite imagery, and flood zone data.'
          },
          {
            title: 'Lead Scoring Compliance',
            description: 'AI lead scoring designed with protected characteristic exclusions, disparate impact testing, and geographic fairness controls that prevent digital redlining. Compliance documentation included standard for every engagement.'
          },
          {
            title: 'Disparate Impact Monitoring',
            description: 'Ongoing monitoring for disparate impact across protected classes. Regular reporting and model retraining triggers ensure continued compliance as markets and model behavior evolve over time.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your Real Estate AI Project"
        description="ClickMasters responds to every real estate AI inquiry within 24 business hours. Senior engineers with real estate industry domain knowledge. Fair Housing Act compliant design. ECOA/Regulation B mortgage AI. MLS/CRM/PMS/LOS integration. Fixed-price. Full IP. USA-based senior engineers. 24-hour response. 2-week start."
        ctaText="Get Your Free PropTech AI Assessment"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}