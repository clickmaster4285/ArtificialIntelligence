// app/ai-development/legal/page.tsx
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
  getLegalAICityPageDataBySlug, 
  getAllLegalAICityPageSlugs 
} from '@/data/legal-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for Legal & LegalTech | ClickMasters AI',
  description: 'LegalTech AI from $35K. Contract review NLP, legal research AI, due diligence automation & document processing. Attorney-review design. Free legal AI call.',
};

export default function LegalMainPage() {
  const pageData = getLegalAICityPageDataBySlug('legal');
  const allSlugs = getAllLegalAICityPageSlugs();
  
  // Extract city names from slugs
  const cities = allSlugs
    .filter((s) => s !== 'legal')
    .map((s) => s.replace('legal-', ''))
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
        title="Legal AI: Built for Law Firms, Legal Departments & LegalTech"
        content="Legal AI differs from general enterprise AI in ways that shape both the technical architecture and the deployment approach. Attorney-client privilege, professional responsibility rules, high-stakes output quality, and legal language specificity all require specialized approaches. ClickMasters addresses this through data handling agreements that maintain confidentiality, human-review requirements that satisfy supervision obligations, rigorous evaluation standards, and fine-tuned NLP models on domain-specific legal corpora."
        stats={pageData.overview.stats}
      />

      <StatsSection
        title="Legal AI by the Numbers"
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
        title="Legal AI: Professional Responsibility & Compliance Architecture"
        description="Every ClickMasters legal AI system is delivered with the professional responsibility and compliance architecture that legal work requires."
        items={[
          {
            title: 'Attorney-Review-in-the-Loop Design',
            description: 'Every legal AI system is explicitly a decision support tool, not an autonomous reviewer. The attorney reviews and approves or overrides every AI-flagged item. The AI accelerates the review; the attorney remains accountable for its conclusions.'
          },
          {
            title: 'Privilege-Aware Data Handling',
            description: 'Data handling agreements executed before any privileged client data is shared. For privilege-sensitive work, systems keep data within client-controlled infrastructure. Data disposition at project completion is documented.'
          },
          {
            title: 'Citation Grounding & Verification',
            description: 'Mandatory RAG grounding  every cited authority must appear in retrieved documents. Citation verification confirms quoted text exists in the source. Explicit output filtering blocks un-grounded citation claims.'
          },
          {
            title: 'Adversarial Testing for Legal Failure Modes',
            description: 'Legal AI systems tested against adversarial examples specifically designed to probe for failure modes that create legal liability: unusual clause structures, fabricated citations, and privilege documents that should be flagged.'
          },
          {
            title: 'CLM & DMS Integration',
            description: 'Integration with iManage, NetDocuments, and other legal document management platforms via their APIs. Integration with contract lifecycle management platforms for workflow embedding.'
          },
          {
            title: 'PIPEDA & Canadian Privacy Compliance',
            description: 'For Canadian legal deployments, PIPEDA-compliant data handling as a baseline. Systems designed for Bay Street law firms and Canadian corporate legal departments with Canadian privacy law requirements.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title="Start Your Legal AI Project"
        description="ClickMasters responds to every legal AI inquiry within 24 business hours. Senior engineers with legal NLP expertise. Attorney-review-in-the-loop design. Privilege-aware data handling. Fine-tuned legal NLP models. Full IP transfer. 24-hour response. 2-week start."
        ctaText="Get Your Free Legal AI Consultation"
        ctaLink="/contact"
        secondaryText="24-hour response • 2-week start"
      />
    </PageLayout>
  );
}