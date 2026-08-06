import type {
  Metadata,
} from "next";

import { notFound } from "next/navigation";

import { DynamicPageTemplate } from "@/components/dynamic-pages/DynamicPageTemplate";

import {
  getAllPublishedSlugs,
  getPublishedPageBySlug,
} from "@/lib/dynamic-pages/page-loader";

import {
  generateDynamicPageSchema,
  getDynamicPageUrl,
  serializeJsonLd,
} from "@/lib/dynamic-pages/page-schema";

/* =========================================================
   TYPES
========================================================= */

interface DynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   ROUTE CONFIGURATION
========================================================= */

/**
 * Only slugs returned by generateStaticParams are valid.
 *
 * Unknown root-level slugs return a real 404 instead of
 * attempting to generate a page at runtime.
 */
export const dynamicParams = false;

/**
 * JSON content changes become available after the next build.
 */
export const revalidate = false;

/* =========================================================
   STATIC PAGE GENERATION
========================================================= */

/**
 * Next.js creates one static page for every published slug.
 *
 * Example:
 *
 * { slug: "llm-development-company" }
 *
 * becomes:
 *
 * /llm-development-company/
 */
export function generateStaticParams() {
  return getAllPublishedSlugs().map(
    (slug) => ({
      slug,
    }),
  );
}

/* =========================================================
   DYNAMIC SEO METADATA
========================================================= */

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;

  const page =
    getPublishedPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",

      description:
        "The requested page could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl =
    getDynamicPageUrl(page);

  const openGraphImages =
    page.seo.openGraphImage
      ? [
          {
            url: page.seo
              .openGraphImage,

            alt: page.hero.title,
          },
        ]
      : undefined;

  return {
    title: page.seo.title,

    description:
      page.seo.description,

    keywords: [
      page.seo.primaryKeyword,

      ...(page.seo
        .secondaryKeywords ?? []),
    ],

    alternates: {
      canonical: pageUrl,
    },

    robots: {
      index:
        page.seo.noIndex !== true,

      follow:
        page.seo.noFollow !== true,

      googleBot: {
        index:
          page.seo.noIndex !== true,

        follow:
          page.seo.noFollow !== true,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",

      url: pageUrl,

      siteName:
        "ClickMasters Artificial Intelligence Company",

      title: page.seo.title,

      description:
        page.seo.description,

      locale: "en_US",

      images: openGraphImages,
    },

    twitter: {
      card:
        page.seo.openGraphImage
          ? "summary_large_image"
          : "summary",

      title: page.seo.title,

      description:
        page.seo.description,

      images:
        page.seo.openGraphImage
          ? [
              page.seo
                .openGraphImage,
            ]
          : undefined,
    },

    category:
      "Artificial Intelligence",
  };
}

/* =========================================================
   PAGE COMPONENT
========================================================= */

export default async function DynamicRootPage({
  params,
}: DynamicPageProps) {
  const { slug } = await params;

  const page =
    getPublishedPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const jsonLd =
    generateDynamicPageSchema(page);

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(jsonLd),
        }}
      />

      {/* Template selected by JSON */}
      <DynamicPageTemplate
        page={page}
      />
    </>
  );
}