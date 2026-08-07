// app/ai-development/hr/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
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
  getAllHRAICityPageSlugs,
  getHRAICityPageDataBySlug,
} from '@/data/hr-ai-city-pages-data';

// Generate static paths for all HR AI city pages
export async function generateStaticParams() {
  const slugs = getAllHRAICityPageSlugs();
  // Map "hr-chicago" -> "chicago"
  const citySlugs = slugs.filter((s) => s !== 'hr-technology').map((s) => s.replace('hr-', ''));
  return citySlugs.map((slug) => ({ slug }));
}

// Generate metadata for each city page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Page data keys are prefixed with "hr-", map the URL slug back to the data key
  const dataKey = `hr-${slug}`;
  const pageData = getHRAICityPageDataBySlug(dataKey);

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
export default async function HRAICityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Map the URL slug (e.g. "chicago") to the data key (e.g. "hr-chicago")
  const dataKey = `hr-${slug}`;
  const pageData = getHRAICityPageDataBySlug(dataKey);

  // If page doesn't exist, show 404
  if (!pageData) {
    notFound();
  }

  // Extract city name from h1 for dynamic text
  const cityName = pageData.h1.split(' — ')[0].replace('HR AI Development in ', '');

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
        title={`HR AI in ${cityName}: Key Metrics`}
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

      {pageData.objections && pageData.objections.length > 0 && (
        <ObjectionsSection
          title="Buyer Objections, Answered Directly"
          items={pageData.objections}
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