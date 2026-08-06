// app/ai-development/insurance/page.tsx
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
import { ObjectionsSection } from '@/components/locations/sections/Objections';
import { 
  getInsuranceAICityPageDataBySlug, 
  getAllInsuranceAICityPageSlugs 
} from '@/data/insurance-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for Insurance | ClickMasters AI',
  description: 'AI development for insurance from $40K. Claims automation, fraud detection, underwriting AI & chatbots. HIPAA & SOC2-ready. USA-based. Fixed-price. Free call.',
};

export default function InsuranceMainPage() {
  const pageData = getInsuranceAICityPageDataBySlug('insurance');
  const allSlugs = getAllInsuranceAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .filter((s) => s !== 'insurance')
    .map((s) => s.replace('insurance-', ''))
    .map((s) => s.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    .sort();

  if (!pageData) {
    return null;
  }

  // Define region groupings for cities
  const cityRegions: Record<string, string[]> = {
    'Northeast': ['Boston', 'New York', 'Washington DC', 'Montreal', 'Toronto'],
    'Southeast': ['Atlanta', 'Charlotte', 'Miami'],
    'South': ['Austin', 'Dallas', 'Houston'],
    'West': ['Denver', 'Los Angeles', 'Phoenix', 'San Francisco', 'Seattle'],
    'Canada': ['Calgary', 'Montreal', 'Toronto', 'Vancouver'],
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
        title="Insurance AI: Production Systems for Carriers & InsurTech"
        content="Insurance AI has moved from experimentation to production deployment across the industry. According to McKinsey's 2025 Insurance AI Report, insurance carriers that have deployed production AI systems in claims, underwriting, and customer service are generating 15–30% combined expense ratio improvement compared to carriers still relying on manual processes. The carriers generating the highest returns have focused on three consistent investment categories: claims straight-through processing, fraud detection at first notice of loss, and underwriting automation for standard risk classes."
        stats={pageData.overview.stats}
      />

      {/* City Grid Section by Region */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Insurance AI by City</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            ClickMasters serves insurance carriers and insurtech startups across North America, with city-specific AI solutions calibrated to local market dynamics, catastrophe risk profiles, and regulatory environments.
          </p>
          
          {Object.entries(groupedCities).map(([region, regionCities]) => (
            <div key={region} className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                {region}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {regionCities.map((city) => {
                  const slug = city.toLowerCase().replace(/\s+/g, '-');
                  // Handle special cases
                  const finalSlug = slug === 'washington-dc' ? 'washington-dc' : slug;
                  return (
                    <Link
                      key={city}
                      href={`/ai-development/insurance/${finalSlug}/`}
                      className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-center transition-all hover:shadow-md"
                    >
                      <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{city}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <StatsSection
        title="Insurance AI by the Numbers"
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

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your Insurance AI Project"
        description="ClickMasters responds to every insurance AI inquiry within 24 business hours. Senior engineers with insurance industry domain knowledge. NAIC-aligned governance documentation. HIPAA compliance for healthcare and workers comp AI. SOC 2-ready infrastructure. Fixed-price milestone contracts. Full IP transfer."
        ctaText="Get Your Free Insurance AI Assessment"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}