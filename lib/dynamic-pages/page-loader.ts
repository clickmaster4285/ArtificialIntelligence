import "server-only";

import {
  allDynamicPages,
  publishedDynamicPages,
} from "@/content/pages";

import type {
  DynamicPageData,
  FaqSection,
} from "@/types/dynamic-page";

import {
  parseDynamicPage,
  validateDynamicPage,
} from "./validate-page";

/* =========================================================
   ERROR CLASS
========================================================= */

export class DynamicPageRegistryError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "DynamicPageRegistryError";
  }
}

/* =========================================================
   SLUG NORMALIZATION
========================================================= */

/**
 * Accepts:
 *
 * llm-development-company
 * /llm-development-company
 * /llm-development-company/
 *
 * Returns:
 *
 * llm-development-company
 */
export function normalizePageSlug(slug: string): string {
  return slug
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

/* =========================================================
   REGISTRY CREATION
========================================================= */

/**
 * Validates every registered JSON page once when this module
 * is loaded by the Next.js server/build process.
 */
function createPageRegistry(
  pages: DynamicPageData[],
): Map<string, DynamicPageData> {
  const registry = new Map<string, DynamicPageData>();

  for (const rawPage of pages) {
    const source = rawPage.slug
      ? `page with slug "${rawPage.slug}"`
      : "unknown dynamic page";

    const page = parseDynamicPage(
      rawPage,
      source,
    );

    const normalizedSlug = normalizePageSlug(
      page.slug,
    );

    if (registry.has(normalizedSlug)) {
      throw new DynamicPageRegistryError(
        [
          `Duplicate dynamic page slug detected: "${normalizedSlug}".`,
          "",
          "Every page must have a globally unique slug.",
          "Check the template registry files inside content/pages.",
        ].join("\n"),
      );
    }

    registry.set(normalizedSlug, page);
  }

  return registry;
}

/**
 * Private in-memory registry.
 *
 * This prevents repeated array searching for every metadata,
 * route and sitemap request.
 */
const pageRegistry = createPageRegistry(
  allDynamicPages,
);

/* =========================================================
   PAGE RETRIEVAL
========================================================= */

/**
 * Returns any registered page, including drafts.
 *
 * Use this only in internal/admin/build utilities.
 */
export function getDynamicPageBySlug(
  slug: string,
): DynamicPageData | undefined {
  const normalizedSlug = normalizePageSlug(slug);

  if (!normalizedSlug) {
    return undefined;
  }

  return pageRegistry.get(normalizedSlug);
}

/**
 * Returns a page only when its status is published.
 *
 * This is the function public Next.js routes should use.
 */
export function getPublishedPageBySlug(
  slug: string,
): DynamicPageData | undefined {
  const page = getDynamicPageBySlug(slug);

  if (!page || page.status !== "published") {
    return undefined;
  }

  return page;
}

/* =========================================================
   PAGE LISTS
========================================================= */

/**
 * Returns a new array so callers cannot mutate the
 * original central registry.
 */
export function getAllDynamicPages(): DynamicPageData[] {
  return [...allDynamicPages];
}

/**
 * Used by generateStaticParams() and sitemap generation.
 */
export function getAllPublishedPages(): DynamicPageData[] {
  return [...publishedDynamicPages];
}

/**
 * Returns all published root-level slugs.
 */
export function getAllPublishedSlugs(): string[] {
  return publishedDynamicPages.map(
    (page) => page.slug,
  );
}

/* =========================================================
   SEO / SCHEMA HELPERS
========================================================= */

/**
 * Combines FAQs from every FAQ section on a page.
 *
 * A page can have:
 *
 * - no FAQ section;
 * - one FAQ section;
 * - multiple FAQ sections.
 */
export function getPageFaqs(
  page: DynamicPageData,
): FaqSection["items"] {
  return page.sections.flatMap((section) => {
    if (
      section.type === "faq" &&
      section.enabled !== false
    ) {
      return section.items;
    }

    return [];
  });
}

/**
 * Returns only enabled sections.
 *
 * This lets a developer temporarily disable a section:
 *
 * {
 *   "type": "faq",
 *   "enabled": false
 * }
 */
export function getEnabledPageSections(
  page: DynamicPageData,
): DynamicPageData["sections"] {
  return page.sections.filter(
    (section) => section.enabled !== false,
  );
}

/* =========================================================
   DEVELOPMENT VALIDATION REPORT
========================================================= */

export interface RegistryValidationReport {
  valid: boolean;

  pages: Array<{
    slug: string;
    valid: boolean;
    errors: string[];
    warnings: string[];
  }>;
}

/**
 * Useful for a future validation command or admin screen.
 */
export function getRegistryValidationReport():
  RegistryValidationReport {
  const pageReports = allDynamicPages.map(
    (page) => {
      const result = validateDynamicPage(page);

      return {
        slug: page.slug,
        valid: result.success,

        errors: result.errors.map(
          (error) =>
            `${error.path}: ${error.message}`,
        ),

        warnings: result.warnings.map(
          (warning) =>
            `${warning.path}: ${warning.message}`,
        ),
      };
    },
  );

  return {
    valid: pageReports.every(
      (page) => page.valid,
    ),

    pages: pageReports,
  };
}