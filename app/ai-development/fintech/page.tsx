// app/ai-development/fintech/page.tsx
import React from 'react';
import { PageLayout } from '@/components/locations/PageLayout';
import { HeroSection } from '@/components/locations/sections/Hero';
import { OverviewSection } from '@/components/locations/sections/Overview';
import { PricingSection } from '@/components/locations/sections/PricingTable';
import { ApplicationsSection } from '@/components/locations/sections/Application';
import { ComplianceSection } from '@/components/locations/sections/Compliance';
import { FAQSection } from '@/components/locations/sections/Faq';
import { CTASection } from '@/components/locations/sections/Cta';
import { StatsSection } from '@/components/locations/sections/Stats';
import { getFinTechAICityPageDataBySlug } from '@/data/fintech-ai-city-pages-data';

export const metadata = {
  title: 'AI Development for FinTech | SOC2 & GDPR | ClickMasters',
  description: 'FinTech AI development from $40K. Fraud detection, credit scoring, AML, document processing. SOC2, PCI DSS & GDPR-ready. USA-based senior engineers. Free call.',
};

export default function FinTechMainPage() {
  const pageData = getFinTechAICityPageDataBySlug('fintech');

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
        title={pageData.overview.title}
        content={pageData.overview.content}
        stats={pageData.overview.stats}
      />

      <StatsSection
        title="FinTech AI by the Numbers"
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
        title="The FinTech AI Compliance Architecture"
        description="Every ClickMasters FinTech AI system is delivered with a compliance architecture that addresses the regulatory requirements of US financial services AI."
        items={[
          {
            title: 'SOC 2 Type II Readiness',
            description: 'Infrastructure architecture designed against SOC 2 trust service criteria: availability, confidentiality, processing integrity, security, and privacy controls. Access control documentation, change management procedures, audit logging, and vulnerability management are all implemented as standard.'
          },
          {
            title: 'Model Governance Documentation',
            description: 'For every AI model deployed in a FinTech context: Model Overview Document, Validation Report, Ongoing Monitoring Plan, and Change Management Process.'
          },
          {
            title: 'SHAP-Based Explainability',
            description: 'For models used in consumer credit, underwriting, or eligibility decisions, SHAP values are computed and stored for each decision, enabling adverse action explanation generation that satisfies ECOA and FCRA requirements.'
          },
          {
            title: 'Data Lineage Documentation',
            description: 'Complete documentation of what data was used for training, how it was sourced, how it was processed, and what quality controls were applied.'
          }
        ]}
      />

      <FAQSection items={pageData.faqs} />

      <CTASection
        title={pageData.cta.title}
        description={pageData.cta.description}
        ctaText={pageData.cta.ctaText}
        ctaLink={pageData.cta.ctaLink}
        secondaryText={pageData.cta.secondaryText}
      />
    </PageLayout>
  );
}