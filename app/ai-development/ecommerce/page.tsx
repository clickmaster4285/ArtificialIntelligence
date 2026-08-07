// app/ai-development/ecommerce/page.tsx
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
  getEcommerceAICityPageDataBySlug, 
  getAllEcommerceAICityPageSlugs 
} from '@/data/ecommerce-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for eCommerce | ClickMasters AI',
  description: 'eCommerce AI development from $30K. Recommendation engines, visual search, demand forecasting & personalization. USA-based. Fixed-price. Free eCommerce AI call.',
};

export default function EcommerceMainPage() {
  const pageData = getEcommerceAICityPageDataBySlug('ecommerce');
  const allSlugs = getAllEcommerceAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .filter((s) => s !== 'ecommerce')
    .map((s) => s.replace('ecommerce-', ''))
    .map((s) => s.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    .sort();

  // Define region groupings for cities
  const cityRegions: Record<string, string[]> = {
    'Northeast': ['Boston', 'New York', 'Washington DC', 'Montreal', 'Toronto'],
    'Southeast': ['Atlanta', 'Miami'],
    'South': ['Austin', 'Dallas', 'Houston'],
    'West': ['Denver', 'Los Angeles', 'Phoenix', 'San Francisco', 'Seattle', 'Vancouver'],
    'Midwest': ['Chicago', 'Calgary'],
  };

  // Create a map of city to region
  const cityToRegion: Record<string, string> = {};
  Object.entries(cityRegions).forEach(([region, cityList]) => {
    cityList.forEach((city) => {
      cityToRegion[city] = region;
    });
  });

  // Group cities by region
  const groupedCities: Record<string, string[]> = {};
  cities.forEach((city) => {
    const region = cityToRegion[city] || 'Other';
    if (!groupedCities[region]) {
      groupedCities[region] = [];
    }
    groupedCities[region].push(city);
  });

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
        title="eCommerce AI: Built for Measurable Revenue Impact"
        content="eCommerce AI is exceptional among AI investment categories for one reason: the business impact is directly measurable against revenue metrics that are already tracked. A recommendation engine either increases conversion rate, average order value, or revenue-per-session  metrics you already measure, with A/B testing infrastructure that makes the AI system's contribution quantifiable. The payback math for the most common eCommerce AI systems is compelling: recommendation engines pay back in 4–8 weeks, demand forecasting in under 3 weeks, and customer service AI in under 6 weeks."
        stats={pageData.overview.stats}
      />

      <StatsSection
        title="eCommerce AI by the Numbers"
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
        title="eCommerce AI: Production Requirements & Data Privacy"
        description="Every ClickMasters eCommerce AI system is delivered with the production requirements and data privacy architecture that consumer-facing applications demand."
        items={[
          {
            title: 'A/B Testing Infrastructure',
            description: 'Built-in A/B testing infrastructure from day one. Proper holdout group design, pre-registration of success metrics, and statistical analysis that accounts for eCommerce-specific factors like seasonality, novelty effects, and network effects.'
          },
          {
            title: 'Real-Time Feature Serving',
            description: 'Feature store architecture that precomputes and caches user features for sub-millisecond latency at inference time. User purchase history, browsing history, demographic signals, geographic signals, and real-time behavioral signals available at page-load speed.'
          },
          {
            title: 'Cold Start Strategies',
            description: 'Explicit cold start strategies for new users (popularity-based, category-affinity models) and new items (content-based similarity to established items). Recommendation systems that work for new products and new customers from day one.'
          },
          {
            title: 'Latency & Scale Requirements',
            description: 'Sub-100ms inference latency for consumer-facing applications. Auto-scaling serving infrastructure designed for peak traffic (10-20x normal volume during seasonal sales). Load tested at 3x peak estimated traffic before deployment.'
          },
          {
            title: 'Privacy-by-Design',
            description: 'Data minimization (collect only behavioral signals necessary for the specific AI function). Purpose limitation (data collected for recommendations not used for unrelated purposes). GDPR and CCPA compliance for customer behavioral data.'
          },
          {
            title: 'Model Drift Monitoring',
            description: 'eCommerce-specific model monitoring: recommendation diversity, catalog coverage, seasonal calibration that prevents promotional-period purchase patterns from degrading the model. Data drift detection on user behavior distributions.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your eCommerce AI Project"
        description="ClickMasters responds to every eCommerce inquiry within 24 business hours. The free consultation is 45 minutes with a senior engineer who understands eCommerce AI specifically  recommendation systems, personalization, demand forecasting, and the production requirements of consumer-facing applications."
        ctaText="Get Your Free eCommerce AI Consultation"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}