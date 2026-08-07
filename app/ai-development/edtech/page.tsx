// app/ai-development/edtech/page.tsx
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
  getEdTechAICityPageDataBySlug, 
  getAllEdTechAICityPageSlugs 
} from '@/data/edtech-ai-city-pages-data';

export const metadata = {
  title: 'EdTech AI Development | ClickMasters',
  description: 'EdTech AI development from $25K. Adaptive learning, student support chatbots & assessment AI. FERPA-compliant. Free consultation.',
};

export default function EdTechMainPage() {
  const pageData = getEdTechAICityPageDataBySlug('edtech-boston');
  const allSlugs = getAllEdTechAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .map((s) => s.replace('edtech-', ''))
    .map((s) => s.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    .sort();

  // Define region groupings for cities
  const cityRegions: Record<string, string[]> = {
    'Northeast': ['Boston', 'New York', 'Washington DC', 'Montreal', 'Toronto'],
    'Southeast': ['Atlanta', 'Charlotte', 'Miami', 'Orlando'],
    'South': ['Austin', 'Dallas', 'Houston'],
    'West': ['Denver', 'Los Angeles', 'Phoenix', 'Seattle', 'Vancouver'],
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
        tagline="FERPA-Compliant EdTech AI for Education Technology Startups"
        title="EdTech AI Development  Adaptive Learning, Student Support Chatbots & Assessment AI"
        description="ClickMasters builds AI systems for EdTech startups building adaptive learning, student support chatbots, and assessment products. EdTech AI development starts at $25,000. Fixed-price. Full IP. FERPA-compliant. USA-based senior engineers."
        ctaText="Get a Free EdTech AI Consultation"
        ctaLink="/contact"
        startingPrice="$25,000"
        badge="FERPA-Compliant | Fixed-Price | Full IP"
        stats={pageData.overview.stats}
      />

      <OverviewSection
        title="EdTech AI: Built for Student-Facing Products"
        content="EdTech startups need AI that satisfies FERPA-compliant data handling for any student-facing feature from day one  a requirement that often surprises founders building their first product, since the compliance bar applies even to seemingly low-stakes features like a chatbot answering scheduling questions. ClickMasters builds with FERPA compliance built in as a default rather than an afterthought addressed after a customer's procurement team flags it."
        stats={pageData.overview.stats}
      />

      <StatsSection
        title="EdTech AI by the Numbers"
        stats={pageData.overview.stats ?? []}
      />

      <PricingSection
        title="EdTech AI Pricing"
        description="EdTech AI projects start at $25,000 for focused applications. Full pricing by application type below."
        items={pageData.pricing.items}
        note="All projects include FERPA-compliant data handling and educational content calibration."
      />

      <ApplicationsSection
        title="EdTech AI Use Cases ClickMasters Builds"
        description="ClickMasters builds EdTech AI for adaptive learning, student support chatbots, and assessment products."
        items={pageData.applications.items}
      />

      <ComplianceSection
        title="EdTech AI: FERPA Compliance & Student Data Privacy"
        description="Every ClickMasters EdTech AI system is delivered with FERPA-compliant data handling and student privacy architecture as standard, not as an afterthought."
        items={[
          {
            title: 'FERPA Compliance',
            description: 'FERPA-compliant data handling built into every student-facing feature from the start. Avoiding the common pattern of addressing compliance only after a school district procurement team flags it.'
          },
          {
            title: 'PIPEDA Compliance (Canada)',
            description: 'For Canadian EdTech deployments, PIPEDA-compliant data handling for student-facing features processing Canadian personal data. Native bilingual EN/FR capability for Quebec-based products.'
          },
          {
            title: 'Student Chatbot Guardrails',
            description: 'Explicit boundaries routing anything resembling academic integrity issues or mental health concerns to appropriate human staff. The chatbot is designed to stay within its competency boundaries.'
          },
          {
            title: 'Fairness & Bias Testing',
            description: 'Assessment and outcome prediction models validated against fairness metrics across student demographic groups. Disparate impact testing conducted before deployment and on an ongoing basis.'
          },
          {
            title: 'Data Minimization',
            description: 'Student data handling follows data minimization principles  only the data required for the specific educational feature is collected and processed, not a blanket collection approach.'
          },
          {
            title: 'Adaptive Learning Privacy',
            description: 'Content sequencing models built with student privacy as a core requirement. Learning pace and mastery signals processed with appropriate anonymization and access controls.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your EdTech AI Project"
        description="ClickMasters responds to every EdTech inquiry within 24 business hours. Senior engineers with education technology domain knowledge. FERPA-compliant data handling. PIPEDA compliance for Canadian deployments. Fixed-price. Full IP. USA-based senior engineers. 24-hour response. 2-week start."
        ctaText="Get Your Free EdTech AI Consultation"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}