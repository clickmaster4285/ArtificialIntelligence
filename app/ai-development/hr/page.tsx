// app/ai-development/hr/page.tsx
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
  getHRAICityPageDataBySlug, 
  getAllHRAICityPageSlugs 
} from '@/data/hr-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for HR & HRTech | ClickMasters',
  description: 'AI development for HR from $30K. Candidate screening, attrition prediction, HR chatbots & workforce analytics. Fixed-price. EEOC-compliant. Free HR AI call.',
};

export default function HRMainPage() {
  const pageData = getHRAICityPageDataBySlug('hr-technology');
  const allSlugs = getAllHRAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .filter((s) => s !== 'hr-technology')
    .map((s) => s.replace('hr-', ''))
    .map((s) => s.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    .sort();

  // Define region groupings for cities
  const cityRegions: Record<string, string[]> = {
    'Northeast': ['Boston', 'New York', 'Washington DC', 'Montreal', 'Toronto'],
    'Southeast': ['Atlanta', 'Charlotte', 'Miami'],
    'South': ['Austin', 'Dallas', 'Houston'],
    'West': ['Denver', 'Los Angeles', 'Phoenix', 'San Francisco', 'Seattle', 'Vancouver'],
    'Midwest': ['Chicago', 'Columbus', 'Calgary'],
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
        title="HR AI: EEOC-Compliant Systems for Talent & Workforce"
        content="HR AI operates in a uniquely high-stakes compliance environment: Title VII of the Civil Rights Act, the EEOC's AI guidance on employment decisions, and emerging state-level AI-in-hiring legislation create requirements that HR AI must be built to satisfy from the architecture up. ClickMasters builds HR AI with regulatory compliance as an architectural requirement, not a retrofit. Every HR AI engagement includes disparate impact testing, adverse action explainability design, and audit trail infrastructure."
        stats={pageData.overview.stats}
      />

      {/* City Grid Section by Region */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">HR AI by City</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            ClickMasters serves HR departments and HRTech companies across North America with city-specific HR AI solutions calibrated to local workforce dynamics and industry sectors.
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
                      href={`/ai-development/hr/${finalSlug}/`}
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
        title="HR AI by the Numbers"
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
        title="HR AI: EEOC Compliance & Fairness Architecture"
        description="Every ClickMasters HR AI system is delivered with EEOC-compliant design, disparate impact testing, and adverse action documentation as standard requirements."
        items={[
          {
            title: 'EEOC AI Guidance Compliance',
            description: 'Design follows EEOC\'s 2023 guidance on AI and automated systems in employment decisions: job-relevance validation for screening criteria, disparate impact testing, human-in-the-loop requirements, and adverse action explanation documentation.'
          },
          {
            title: 'NYC Local Law 144 Compliance',
            description: 'Bias audit documentation for Automated Employment Decision Tools (AEDT) used in NYC hiring or promotion decisions. Independent auditor-ready documentation with results suitable for publication.'
          },
          {
            title: 'Disparate Impact Testing',
            description: 'Testing using the 4/5ths (80%) rule and Fisher\'s exact test for statistical significance across gender, race, and other protected class categories. Testing conducted before deployment and on an ongoing basis.'
          },
          {
            title: 'Human-In-The-Loop Design',
            description: 'Human review required for all consequential employment decisions. AI provides recommendations with documented reasoning; humans make final decisions. Explicit human oversight designed into workflow from the start.'
          },
          {
            title: 'HRIS & ATS Integration',
            description: 'Integration with Workday, ADP, UKG, BambooHR, SAP SuccessFactors, Oracle HCM, and ATS platforms including Greenhouse, Lever, iCIMS, and Workable. Real-time data access for candidate screening and attrition prediction.'
          },
          {
            title: 'PIPEDA Compliance (Canada)',
            description: 'For Canadian HR deployments, PIPEDA-compliant data handling for employee and applicant personal data. Canadian privacy law compliance built in from the start for Toronto, Montreal, Vancouver, and Calgary engagements.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your HR AI Project"
        description="ClickMasters responds to every HR AI inquiry within 24 business hours. Senior engineers with HR domain knowledge. EEOC-compliant by design. Disparate impact testing standard. Workday, ADP, UKG, BambooHR, SAP SuccessFactors integration. Fixed-price. Full IP. USA-based. 24-hour response. 2-week start."
        ctaText="Get Your Free HR AI Assessment"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}