// app/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { PageLayout } from '@/components/locations/PageLayout';
import { HeroSection } from '@/components/locations/sections/Hero';
import { OverviewSection } from '@/components/locations/sections/Overview';
import { PricingSection } from '@/components/locations/sections/PricingTable';
import { ApplicationsSection } from '@/components/locations/sections/Application';
import { ComplianceSection } from '@/components/locations/sections/Compliance';
import { FAQSection } from '@/components/locations/sections/Faq';
import { CTASection } from '@/components/locations/sections/Cta';
import { StatsSection } from '@/components/locations/sections/Stats';
import { 
  getAllAIPageSlugs, 
  getAIPageDataBySlug 
} from '@/data/custom-ai-development-company';

// Generate static paths for all AI development pages
export async function generateStaticParams() {
  const slugs = getAllAIPageSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = getAIPageDataBySlug(slug);

  if (!pageData) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: pageData.meta.title,
    description: pageData.meta.description,
  };
}

// Main page component
export default async function AIDevelopmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = getAIPageDataBySlug(slug);

  // If page doesn't exist, show 404
  if (!pageData) {
    notFound();
  }

  // Extract page name from h1 for dynamic text
  const pageName = pageData.h1.split('  ')[0].replace('AI Development ', '').replace(' Company', '').trim();

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
        title={`Why Companies Choose ClickMasters for ${pageName}`}
        stats={pageData.overview.stats ?? [
          { label: 'Project Start', value: pageData.hero.startingPrice || '$20,000', description: 'Focused integrations' },
          { label: 'USA-Based', value: '100%', description: 'Senior engineers only' },
          { label: 'Fixed-Price', value: '✅', description: 'Milestone contracts' },
          { label: 'Full IP', value: '✅', description: 'Transfer on completion' },
        ]}
      />

      <PricingSection
        title={pageData.pricing.title}
        description={pageData.pricing.description}
        items={pageData.pricing.items}
        note={pageData.pricing.note}
      />

      {pageData.applications && (
        <ApplicationsSection
          title={pageData.applications.title}
          description={pageData.applications.description}
          items={pageData.applications.items}
        />
      )}

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