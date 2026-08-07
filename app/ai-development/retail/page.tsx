// app/ai-development/retail/page.tsx
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
  getRetailAICityPageDataBySlug, 
  getAllRetailAICityPageSlugs 
} from '@/data/retail-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for Retail | Retail AI Solutions | ClickMasters',
  description: 'AI development for retail from $35K. Demand forecasting, personalization, inventory optimization & computer vision. Fixed-price. Free retail AI consultation.',
};

export default function RetailMainPage() {
  const pageData = getRetailAICityPageDataBySlug('retail');
  const allSlugs = getAllRetailAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .filter((s) => s !== 'retail')
    .map((s) => s.replace('retail-', ''))
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
        title="Retail AI: Production Systems for Retailers & Brands"
        content="Retail is one of the highest-ROI AI investment categories  the combination of large data volumes, direct revenue impact, and measurable operational metrics makes retail AI one of the easiest categories for which to build a compelling business case. According to McKinsey's 2025 Retail AI Report, AI-enabled retailers achieve 10–20% revenue lift from personalization, 15–25% inventory cost reduction from ML forecasting, and 8–12% margin improvement from AI-optimized pricing."
        stats={pageData.overview.stats}
      />

      <StatsSection
        title="Retail AI by the Numbers"
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
        title="Retail AI Technology & Integration"
        description="Retail AI requires integration with the retail technology stack. ClickMasters has integration experience across the major retail platforms including POS systems, eCommerce platforms, ERP systems, and CDPs."
        items={[
          {
            title: 'POS Integration',
            description: 'Square, Lightspeed, Shopify POS, NCR Counterpoint, Oracle Retail MICROS. POS transaction data is the primary training data source for demand forecasting, CLV, and churn models.'
          },
          {
            title: 'eCommerce Platforms',
            description: 'Shopify, Magento 2, BigCommerce, WooCommerce, Salesforce Commerce Cloud. Behavioral event data (product views, search queries, add-to-cart events) flows from eCommerce platforms for personalization model training.'
          },
          {
            title: 'ERP & Inventory Systems',
            description: 'NetSuite, SAP, Oracle ERP, Microsoft Dynamics 365, Brightpearl. Inventory data for supply chain AI and demand forecasting with real-time integration.'
          },
          {
            title: 'CRM & CDP Platforms',
            description: 'Salesforce Marketing Cloud, HubSpot, Klaviyo, Attentive, Segment CDP. CLV scores and personalization outputs are consumed by CRM and CDP for activation in email, SMS, and paid media.'
          },
          {
            title: 'Replenishment Systems',
            description: 'Blue Yonder (JDA), Manhattan Associates, NetSuite Demand Planning. ML forecast outputs flow directly into replenishment systems for automated purchase order generation.'
          },
          {
            title: 'Measurement & A/B Testing',
            description: 'Every retail AI deployment includes built-in A/B testing capability that directly measures revenue lift, inventory reduction, or conversion improvement against a control group.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your Retail AI Project"
        description="ClickMasters responds to every retail AI inquiry within 24 business hours. Senior engineers with retail industry domain knowledge. Shopify/Magento/BigCommerce integration. Fixed-price. Full IP. USA-based senior engineers. 24-hour response. 2-week start."
        ctaText="Get Your Free Retail AI Assessment"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}