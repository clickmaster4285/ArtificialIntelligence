// app/ai-development/legaltech/page.tsx
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
import { 
  getLegalTechAICityPageDataBySlug, 
  getAllLegalTechAICityPageSlugs 
} from '@/data/legaltech-ai-city-pages-data';

export const metadata = {
  title: 'LegalTech AI Development | ClickMasters',
  description: 'LegalTech AI development from $30K. AI-native legal products for contract analysis, e-discovery, and legal research startups. Free consultation.',
};

export default function LegalTechMainPage() {
  const pageData = getLegalTechAICityPageDataBySlug('legaltech-new-york');
  const allSlugs = getAllLegalTechAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .map((s) => s.replace('legaltech-', ''))
    .map((s) => s.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    .sort();

  if (!pageData) {
    return null;
  }

  return (
    <PageLayout withGrain>
      <HeroSection
        tagline="AI-Native Legal Products for Legal Tech Startups"
        title="LegalTech AI Development  AI-Native Products for Contract Analysis, E-Discovery & Legal Research"
        description="ClickMasters builds AI-native products for legal technology startups building contract analysis, e-discovery, compliance automation, and legal research tools. LegalTech AI development starts at $30,000. Fixed-price. Full IP. USA-based senior engineers."
        ctaText="Get a Free LegalTech AI Consultation"
        ctaLink="/contact"
        startingPrice="$30,000"
        badge="Fixed-Price | Full IP | 24-Hour Response"
        stats={pageData.overview.stats}
      />

      <OverviewSection
        title="LegalTech AI: Built for Sophisticated Legal Buyers"
        content="Legal tech startups need AI products that hold up to scrutiny from a buyer base  law firms and corporate legal departments  that's unusually sophisticated about both legal substance and AI reliability. A demo that impresses in a sales call but hallucinates on edge cases in production due diligence will not survive a serious legal buyer's evaluation process. ClickMasters builds with confidence scoring and accuracy validation designed specifically to survive scrutiny from technically sophisticated legal buyers."
        stats={pageData.overview.stats}
      />

      {/* City Grid Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">LegalTech AI by City</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            ClickMasters serves legal tech startups across the United States with AI-native products calibrated to local market dynamics and buyer expectations.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cities.map((city) => {
              const slug = city.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={city}
                  href={`/ai-development/legaltech/${slug}/`}
                  className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center transition-all hover:shadow-md"
                >
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{city}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <StatsSection
        title="LegalTech AI by the Numbers"
        stats={pageData.overview.stats ?? []}
      />

      <PricingSection
        title="LegalTech AI Pricing"
        description="LegalTech AI projects start at $30,000 for focused applications. Full pricing by application type below."
        items={pageData.pricing.items}
        note="All projects include confidence scoring and accuracy validation for sophisticated legal buyers."
      />

      <ApplicationsSection
        title="LegalTech AI Use Cases ClickMasters Builds"
        description="ClickMasters builds AI-native legal products for contract analysis, e-discovery, compliance automation, and legal research."
        items={pageData.applications.items}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your LegalTech AI Project"
        description="ClickMasters responds to every LegalTech inquiry within 24 business hours. Our senior AI architects have delivered production AI systems for legal tech startups across the United States. The free consultation is 45 minutes with a named senior engineer  not a sales representative."
        ctaText="Book Your Free LegalTech AI Consultation"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}