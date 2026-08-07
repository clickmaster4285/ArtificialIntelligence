// app/ai-development/logistics/page.tsx
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
  getLogisticsAICityPageDataBySlug, 
  getAllLogisticsAICityPageSlugs 
} from '@/data/logistics-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for Logistics | Supply Chain AI | ClickMasters',
  description: 'AI development for logistics from $40K. Demand forecasting, route optimization, warehouse AI & supply chain visibility. Fixed-price. Free logistics AI call.',
};

export default function LogisticsMainPage() {
  const pageData = getLogisticsAICityPageDataBySlug('logistics');
  const allSlugs = getAllLogisticsAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .filter((s) => s !== 'logistics')
    .map((s) => s.replace('logistics-', ''))
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
        title="Logistics AI: Production Systems for Supply Chain Operations"
        content="Logistics and supply chain operations generate more data per dollar of revenue than almost any other industry. Every shipment produces location traces, transit events, exception records, and delivery confirmations. Every warehouse produces pick, pack, and shipping records, plus equipment sensor data and labor time records. Every order produces demand data that, aggregated and analyzed correctly, reveals demand patterns that manual planning cannot efficiently detect. According to McKinsey's 2025 Supply Chain Report, logistics and supply chain AI is generating $1.3–$2.0 trillion in global value annually."
        stats={pageData.overview.stats}
      />

      <StatsSection
        title="Logistics AI by the Numbers"
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
        title="Logistics AI: Data Engineering & Compliance Architecture"
        description="Every ClickMasters logistics AI system is delivered with the data engineering and compliance architecture that logistics operations require."
        items={[
          {
            title: 'TMS Integration',
            description: 'Integration with major Transportation Management Systems: McLeodSoftware, Roper TMW, Blue Yonder TMS, Oracle TMS, SAP TM. Shipment history, carrier performance data, and rate data for ML training.'
          },
          {
            title: 'WMS Integration',
            description: 'Integration with major Warehouse Management Systems: Manhattan WMOS, Blue Yonder WMS, SAP EWM, Oracle WMS, HighJump, Deposco. Order, inventory, and labor data for warehouse AI.'
          },
          {
            title: 'Telematics Integration',
            description: 'Integration with major ELD/telematics systems: Samsara, Verizon Connect, KeepTruckin/Motive, Omnitracs. Real-time location and trip data for route optimization and ETA prediction AI.'
          },
          {
            title: 'ERP Integration',
            description: 'Integration with major ERP systems: SAP, Oracle, Microsoft Dynamics. Demand, inventory, and financial data for demand forecasting AI. BAPI, RFC, IDocs, and REST API support.'
          },
          {
            title: 'ELD Data Privacy Compliance',
            description: 'FMCSA ELD rule compliance for driver-facing AI systems. Design respects regulatory and contractual limits on driver data use while delivering operational optimization.'
          },
          {
            title: 'SOC 2-Ready Infrastructure',
            description: 'Logistics AI systems designed to SOC 2 Trust Service Criteria as standard for 3PLs and logistics technology companies serving enterprise customers with SOC 2 requirements.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your Logistics AI Project"
        description="ClickMasters responds to every logistics AI inquiry within 24 business hours. Senior engineers with logistics and supply chain domain knowledge. TMS/WMS/ERP/telematics integration. FMCSA ELD compliance. SOC 2-ready infrastructure. Fixed-price milestone contracts. Full IP transfer. 24-hour response. 2-week start."
        ctaText="Get Your Free Logistics AI Assessment"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}