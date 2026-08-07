// app/ai-development/manufacturing/page.tsx
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
  getManufacturingAICityPageDataBySlug, 
  getAllManufacturingAICityPageSlugs 
} from '@/data/manufacturing-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for Manufacturing | ClickMasters AI',
  description: 'AI development for manufacturing from $40K. Defect detection, predictive maintenance, demand forecasting & quality control. PyTorch & SageMaker. Free consultation.',
};

export default function ManufacturingMainPage() {
  const pageData = getManufacturingAICityPageDataBySlug('manufacturing');
  const allSlugs = getAllManufacturingAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .filter((s) => s !== 'manufacturing')
    .map((s) => s.replace('manufacturing-', ''))
    .map((s) => s.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    .sort();

  // Define region groupings for cities
  const cityRegions: Record<string, string[]> = {
    'Northeast': ['Boston', 'New York', 'Washington DC', 'Montreal', 'Toronto'],
    'Southeast': ['Atlanta', 'Charlotte', 'Miami'],
    'South': ['Austin', 'Dallas', 'Houston'],
    'West': ['Denver', 'Los Angeles', 'Phoenix', 'San Francisco', 'Seattle', 'Vancouver'],
    'Midwest': ['Chicago', 'Cincinnati', 'Detroit', 'Calgary'],
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
        title="Manufacturing AI: Production Systems for Discrete & Process Manufacturers"
        content="Manufacturing has historically been one of the slower industries to adopt AI  the operational technology (OT) environment, the safety requirements of industrial settings, and the physical-world consequences of AI system failures all create barriers that software-only industries don't face. In 2026, those barriers have largely been addressed through maturing industrial AI platforms, edge computing capable of production-speed inference, and a growing body of successful production deployments. According to McKinsey's 2025 Global AI Survey, manufacturing now ranks as the second-highest industry for AI value creation (after financial services), with predictive maintenance, quality inspection, and supply chain optimization identified as the three highest-value manufacturing AI applications."
        stats={pageData.overview.stats}
      />

      {/* City Grid Section by Region */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Manufacturing AI by City</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            ClickMasters serves discrete and process manufacturers across North America with city-specific AI solutions calibrated to local industrial sectors and regulatory environments.
          </p>
          
          {Object.entries(groupedCities).map(([region, regionCities]) => (
            <div key={region} className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                {region}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {regionCities.map((city) => {
                  const slug = city.toLowerCase().replace(/\s+/g, '-');
                  const finalSlug = slug === 'washington-dc' ? 'washington-dc' : slug;
                  return (
                    <Link
                      key={city}
                      href={`/ai-development/manufacturing/${finalSlug}/`}
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
        title="Manufacturing AI by the Numbers"
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
        title="Manufacturing AI: Data Engineering & Compliance Architecture"
        description="Every ClickMasters manufacturing AI system is delivered with the data engineering and compliance architecture that industrial environments require."
        items={[
          {
            title: 'Historian Integration',
            description: 'Integration with OSIsoft PI System via PI Web API, AVEVA Data Hub, Ignition JDBC, and GE Proficy historian connections. Direct experience with industrial historian data quality issues including sensor outages, calibration events, and tag naming conventions.'
          },
          {
            title: 'MES & ERP Integration',
            description: 'Integration with manufacturing execution systems (Camstar, Critical Manufacturing, custom MES) and ERP systems (SAP PP/QM/PM modules, Oracle Manufacturing Cloud, Infor CloudSuite, Plex). Production history, quality data, and material data joined for ML models.'
          },
          {
            title: 'Edge Deployment for Production Speed',
            description: 'Vision inspection systems running at 200–500 units/hour using NVIDIA Jetson Orin edge hardware with TensorRT-optimized models achieving sub-200ms inference latency. Edge inference ensures production line speed without cloud round-trip latency.'
          },
          {
            title: 'IATF 16949 Compliance (Automotive)',
            description: 'Measurement system analysis (Gage R&R equivalent studies) for vision inspection systems used in automotive quality applications. Production of measurement capability documentation required by IATF 16949 for new inspection methods.'
          },
          {
            title: 'FDA 21 CFR Part 11 (Pharmaceutical)',
            description: 'Electronic records and electronic signatures requirements for AI systems used in pharmaceutical manufacturing quality decisions. Production of 21 CFR Part 11-compliant audit trail documentation for pharma manufacturing AI.'
          },
          {
            title: 'CMMC & ITAR (Defense)',
            description: 'CMMC-aware infrastructure considerations for defense contractor manufacturing AI. ITAR-appropriate data handling for controlled technical data where required. Infrastructure designed for federal procurement compliance posture.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your Manufacturing AI Project"
        description="ClickMasters responds to every manufacturing AI inquiry within 24 business hours. Senior engineers with industrial AI experience. Computer vision quality inspection, predictive maintenance, demand forecasting, process optimization, and OEE improvement. USA-based. Fixed-price. Full IP. 24-hour response. 2-week start."
        ctaText="Get Your Free Manufacturing AI Assessment"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}