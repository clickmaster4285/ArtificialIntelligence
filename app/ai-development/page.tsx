
// src/app/ai-development/page.tsx

import { aiDevelopmentLandingData } from '@/data/ai-development-pages-data';
import { ServiceLayout } from '@/components/services/layout';
import { ServiceHero } from '@/components/services/Hero';
import { ServiceOverview } from '@/components/services/Overview';
import { ServicePricing } from '@/components/services/PricingTable';
import { ServiceApplications } from '@/components/services/ServiceApplication';
import { ServiceFAQs } from '@/components/services/Faq';
import { ServiceCTA } from '@/components/services/Cta';
import { ServiceDropdownNav } from '@/components/services/ServiceDropdownNav';
import { generateServiceSchema } from '@/lib/schema';

export default function AIDevelopmentLandingPage() {
  const pageData = aiDevelopmentLandingData;
  const schema = generateServiceSchema(pageData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLayout>
        <ServiceDropdownNav />
        <ServiceHero data={pageData.hero} h1={pageData.h1} />
        <ServiceOverview data={pageData.overview} />
        <ServicePricing data={pageData.pricing} />
        <ServiceApplications data={pageData.applications} />
        <ServiceFAQs data={pageData.faqs} />
        <ServiceCTA data={pageData.cta} />
      </ServiceLayout>
    </>
  );
}