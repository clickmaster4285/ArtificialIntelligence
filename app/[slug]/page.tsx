// app/[slug]/page.tsx
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

// Import all data sources
import { 
  getAllAIPageSlugs, 
  getAIPageDataBySlug 
} from '@/data/custom-ai-development-company';

import { 
  getAllHireAICityPageSlugs, 
  getHireAICityPageDataBySlug 
} from '@/data/hire-ai-city-pages-data';

import { 
  getAllAIServicePageSlugs, 
  getAIServicePageDataBySlug 
} from '@/data/ai-services-standalone-pages-data';

import {
  getPageDataBySlug as getAIDevelopmentPageDataBySlug,
} from '@/data/ai-development-pages-data';

// Generate static paths for all pages (combining all data sources)
export async function generateStaticParams() {
  const customAIDevSlugs = getAllAIPageSlugs();
  const hireAICitySlugs = getAllHireAICityPageSlugs();
  const aiServiceSlugs = getAllAIServicePageSlugs();
  const aiDevelopmentSlugs = ['ai-development-cost'];
  const allSlugs = [...customAIDevSlugs, ...hireAICitySlugs, ...aiServiceSlugs, ...aiDevelopmentSlugs];
  
  return allSlugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try custom AI development data first
  let pageData = getAIPageDataBySlug(slug);
  let dataSource = 'custom-ai-dev';
  
  // If not found, try hire AI city pages
  if (!pageData) {
    pageData = getHireAICityPageDataBySlug(slug);
    dataSource = 'hire-ai-city';
  }

  // If not found, try AI services pages
  if (!pageData) {
    pageData = getAIServicePageDataBySlug(slug);
    dataSource = 'ai-services';
  }

  // If not found, try top-level AI development pages like /ai-development-cost
  if (!pageData) {
    pageData = getAIDevelopmentPageDataBySlug(slug);
    dataSource = 'ai-development-pages';
  }

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
export default async function AIPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try custom AI development data first
  let pageData = getAIPageDataBySlug(slug);
  let dataSource = 'custom-ai-dev';
  
  // If not found, try hire AI city pages
  if (!pageData) {
    pageData = getHireAICityPageDataBySlug(slug);
    dataSource = 'hire-ai-city';
  }

  // If not found, try AI services pages
  if (!pageData) {
    pageData = getAIServicePageDataBySlug(slug);
    dataSource = 'ai-services';
  }

  // If not found, try top-level AI development pages like /ai-development-cost
  if (!pageData) {
    pageData = getAIDevelopmentPageDataBySlug(slug);
    dataSource = 'ai-development-pages';
  }

  // If page doesn't exist, show 404
  if (!pageData) {
    notFound();
  }

  // ============================================
  // RENDER AI SERVICES PAGES
  // ============================================
  if (dataSource === 'ai-services') {
    const typedData = pageData as any;

    return (
      <PageLayout withGrain>
        <HeroSection
          tagline={typedData.hero.tagline}
          title={typedData.h1}
          description={typedData.hero.description}
          ctaText={typedData.hero.ctaText}
          ctaLink={typedData.hero.ctaLink}
          startingPrice={typedData.hero.startingPrice}
          badge={typedData.hero.badge}
          stats={typedData.overview?.stats}
        />

        {typedData.overview && (
          <OverviewSection
            title={typedData.overview.title}
            content={typedData.overview.content}
            stats={typedData.overview.stats}
          />
        )}

        <StatsSection
          title={typedData.overview?.title || 'Why Companies Choose ClickMasters'}
          stats={typedData.overview?.stats ?? [
            { label: 'Project Start', value: typedData.hero.startingPrice || '$20,000', description: 'Focused projects' },
            { label: 'USA-Based', value: '100%', description: 'Senior engineers only' },
            { label: 'Fixed-Price', value: '✅', description: 'Milestone contracts' },
            { label: 'Full IP', value: '✅', description: 'Transfer on completion' },
          ]}
        />

        <PricingSection
          title={typedData.pricing.title}
          description={typedData.pricing.description}
          items={typedData.pricing.items}
          note={typedData.pricing.note}
        />

        {typedData.whatWeBuild && (
          <ApplicationsSection
            title={typedData.whatWeBuild.title}
            description={typedData.whatWeBuild.description}
            items={typedData.whatWeBuild.items.map((item: any) => ({
              title: item.title,
              description: item.description,
              keyFeatures: item.technologies ? [item.technologies] : undefined,
              typicalOutcome: item.technologies || undefined,
            }))}
          />
        )}

        {typedData.process && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-4">{typedData.process.title}</h2>
              {typedData.process.description && (
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  {typedData.process.description}
                </p>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {typedData.process.steps.map((step: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {typedData.industryApplications && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-4">{typedData.industryApplications.title}</h2>
              {typedData.industryApplications.description && (
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  {typedData.industryApplications.description}
                </p>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {typedData.industryApplications.items.map((item: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{item.industry}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {typedData.technologyStack && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-4">{typedData.technologyStack.title}</h2>
              {typedData.technologyStack.description && (
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  {typedData.technologyStack.description}
                </p>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {typedData.technologyStack.items.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">{item.category}</h3>
                    <p className="text-gray-600 text-sm">{item.technologies}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {typedData.objections && typedData.objections.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Common Questions About This Service</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {typedData.objections.map((item: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <FAQSection items={typedData.faqs} />

        <CTASection
          title={typedData.cta.title}
          description={typedData.cta.description}
          ctaText={typedData.cta.ctaText}
          ctaLink={typedData.cta.ctaLink}
          secondaryText={typedData.cta.secondaryText}
        />
      </PageLayout>
    );
  }

  // ============================================
  // RENDER HIRE AI CITY PAGES
  // ============================================
  if (dataSource === 'hire-ai-city') {
    const typedData = pageData as any;

    return (
      <PageLayout withGrain>
        <HeroSection
          tagline={typedData.hero.tagline}
          title={typedData.h1}
          description={typedData.hero.description}
          ctaText={typedData.hero.ctaText}
          ctaLink={typedData.hero.ctaLink}
          startingPrice={typedData.hero.startingPrice}
          badge={typedData.hero.badge}
          stats={typedData.overview.stats}
        />

        <OverviewSection
          title={typedData.overview.title}
          content={typedData.overview.content}
          stats={typedData.overview.stats}
        />

        <StatsSection
          title={`Hire AI Engineers in ${typedData.h1.replace('Hire an AI Engineer in ', '').trim()}`}
          stats={typedData.overview.stats ?? [
            { label: 'ML Engineer', value: typedData.hero.startingPrice || '$10,000/month', description: 'Dedicated engagement' },
            { label: 'Start Time', value: '2–3 weeks', description: 'From contract signing' },
            { label: 'Time Zone', value: typedData.hero.badge?.split('|').pop()?.trim() || 'US Timezone', description: 'Local coverage' },
          ]}
        />

        <PricingSection
          title={typedData.pricing.title}
          description={typedData.pricing.description}
          items={typedData.pricing.items}
          note={typedData.pricing.note}
        />

        {typedData.applications && (
          <ApplicationsSection
            title={typedData.applications.title}
            description={typedData.applications.description}
            items={typedData.applications.items}
          />
        )}

        {typedData.objections && typedData.objections.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Common Questions About Hiring in {typedData.h1.replace('Hire an AI Engineer in ', '').trim()}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {typedData.objections.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <FAQSection items={typedData.faqs} />

        <CTASection
          title={typedData.cta.title}
          description={typedData.cta.description}
          ctaText={typedData.cta.ctaText}
          ctaLink={typedData.cta.ctaLink}
          secondaryText={typedData.cta.secondaryText}
        />
      </PageLayout>
    );
  }

  // ============================================
  // RENDER CUSTOM AI DEVELOPMENT PAGES (Original)
  // ============================================
  const typedData = pageData as any;
  const pageName = typedData.h1.split('  ')[0].replace('AI Development ', '').replace(' Company', '').trim();

  return (
    <PageLayout withGrain>
      <HeroSection
        tagline={typedData.hero.tagline}
        title={typedData.h1}
        description={typedData.hero.description}
        ctaText={typedData.hero.ctaText}
        ctaLink={typedData.hero.ctaLink}
        startingPrice={typedData.hero.startingPrice}
        badge={typedData.hero.badge}
        stats={typedData.overview.stats}
      />

      <OverviewSection
        title={typedData.overview.title}
        content={typedData.overview.content}
        stats={typedData.overview.stats}
      />

      <StatsSection
        title={`Why Companies Choose ClickMasters for ${pageName}`}
        stats={typedData.overview.stats ?? [
          { label: 'Project Start', value: typedData.hero.startingPrice || '$20,000', description: 'Focused integrations' },
          { label: 'USA-Based', value: '100%', description: 'Senior engineers only' },
          { label: 'Fixed-Price', value: '✅', description: 'Milestone contracts' },
          { label: 'Full IP', value: '✅', description: 'Transfer on completion' },
        ]}
      />

      <PricingSection
        title={typedData.pricing.title}
        description={typedData.pricing.description}
        items={typedData.pricing.items}
        note={typedData.pricing.note}
      />

      {typedData.applications && (
        <ApplicationsSection
          title={typedData.applications.title}
          description={typedData.applications.description}
          items={typedData.applications.items}
        />
      )}

      <FAQSection items={typedData.faqs} />

      <CTASection
        title={typedData.cta.title}
        description={typedData.cta.description}
        ctaText={typedData.cta.ctaText}
        ctaLink={typedData.cta.ctaLink}
        secondaryText={typedData.cta.secondaryText}
      />
    </PageLayout>
  );
}