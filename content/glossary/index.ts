import type {
  GlossaryCardData,
  GlossaryCategory,
  GlossaryTerm,
} from "@/types/glossary";

import retrievalAugmentedGenerationData from "./terms/retrieval-augmented-generation.json";

/* =========================================================
   RAW GLOSSARY DATA
========================================================= */

/**
 * Har naye glossary JSON ko:
 *
 * 1. Is file ke top par import karo.
 * 2. Neeche glossaryTerms array mein add karo.
 */

const rawGlossaryTerms = [
  retrievalAugmentedGenerationData,
];

/* =========================================================
   NORMALIZED GLOSSARY TERMS
========================================================= */

export const glossaryTerms: GlossaryTerm[] =
  rawGlossaryTerms.map(
    (term) => term as GlossaryTerm,
  );

/* =========================================================
   PUBLISHED TERMS
========================================================= */

export const publishedGlossaryTerms =
  glossaryTerms
    .filter(
      (term) =>
        term.status === "published",
    )
    .sort((firstTerm, secondTerm) =>
      firstTerm.title.localeCompare(
        secondTerm.title,
        "en",
        {
          sensitivity: "base",
        },
      ),
    );

/* =========================================================
   TERM MAP
========================================================= */

/**
 * Map gives fast slug lookup:
 *
 * glossaryTermMap.get("vector-database")
 */

export const glossaryTermMap = new Map<
  string,
  GlossaryTerm
>(
  publishedGlossaryTerms.map((term) => [
    term.slug,
    term,
  ]),
);

/* =========================================================
   HELPERS
========================================================= */

/**
 * Clean user-provided or route-provided slug.
 */
export function normalizeGlossarySlug(
  slug: string,
): string {
  return decodeURIComponent(slug)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

/**
 * Find one published glossary term by slug.
 */
export function getGlossaryTermBySlug(
  slug: string,
): GlossaryTerm | undefined {
  const normalizedSlug =
    normalizeGlossarySlug(slug);

  return glossaryTermMap.get(
    normalizedSlug,
  );
}

/**
 * Get slugs for generateStaticParams().
 */
export function getAllGlossarySlugs(): string[] {
  return publishedGlossaryTerms.map(
    (term) => term.slug,
  );
}

/**
 * Lightweight card-safe term data.
 */
export function getGlossaryCardData(
  term: GlossaryTerm,
): GlossaryCardData {
  return {
    slug: term.slug,
    title: term.title,
    shortTitle: term.shortTitle,
    abbreviation: term.abbreviation,
    letter: term.letter,
    category: term.category,
    shortDefinition:
      term.shortDefinition,
    featured: term.featured,
    readingTime: term.readingTime,
  };
}

/**
 * All published terms formatted for cards.
 */
export function getAllGlossaryCards(): GlossaryCardData[] {
  return publishedGlossaryTerms.map(
    getGlossaryCardData,
  );
}

/**
 * Featured glossary cards.
 */
export function getFeaturedGlossaryTerms(): GlossaryCardData[] {
  return publishedGlossaryTerms
    .filter((term) => term.featured)
    .map(getGlossaryCardData);
}

/**
 * Find terms by their first letter.
 */
export function getGlossaryTermsByLetter(
  letter: string,
): GlossaryTerm[] {
  const normalizedLetter =
    letter.trim().toUpperCase();

  return publishedGlossaryTerms.filter(
    (term) =>
      term.letter.toUpperCase() ===
      normalizedLetter,
  );
}

/**
 * Find terms by category.
 */
export function getGlossaryTermsByCategory(
  category: GlossaryCategory,
): GlossaryTerm[] {
  return publishedGlossaryTerms.filter(
    (term) =>
      term.category === category,
  );
}

/**
 * Get every category that currently contains
 * at least one published term.
 */
export function getAvailableGlossaryCategories(): GlossaryCategory[] {
  return Array.from(
    new Set(
      publishedGlossaryTerms.map(
        (term) => term.category,
      ),
    ),
  ).sort((firstCategory, secondCategory) =>
    firstCategory.localeCompare(
      secondCategory,
    ),
  );
}

/**
 * Return related terms in the same order
 * as the relatedTerms slug array.
 *
 * Missing/unpublished slugs are safely ignored.
 */
export function getRelatedGlossaryTerms(
  term: GlossaryTerm,
): GlossaryCardData[] {
  if (!term.relatedTerms?.length) {
    return [];
  }

  return term.relatedTerms
    .map((relatedSlug) =>
      getGlossaryTermBySlug(
        relatedSlug,
      ),
    )
    .filter(
      (
        relatedTerm,
      ): relatedTerm is GlossaryTerm =>
        Boolean(relatedTerm),
    )
    .map(getGlossaryCardData);
}

/**
 * Get previous and next terms alphabetically.
 */
export function getAdjacentGlossaryTerms(
  currentSlug: string,
): {
  previous?: GlossaryCardData;
  next?: GlossaryCardData;
} {
  const normalizedSlug =
    normalizeGlossarySlug(
      currentSlug,
    );

  const currentIndex =
    publishedGlossaryTerms.findIndex(
      (term) =>
        term.slug === normalizedSlug,
    );

  if (currentIndex === -1) {
    return {};
  }

  const previousTerm =
    publishedGlossaryTerms[
      currentIndex - 1
    ];

  const nextTerm =
    publishedGlossaryTerms[
      currentIndex + 1
    ];

  return {
    previous: previousTerm
      ? getGlossaryCardData(
          previousTerm,
        )
      : undefined,

    next: nextTerm
      ? getGlossaryCardData(nextTerm)
      : undefined,
  };
}

/* =========================================================
   VALIDATION
========================================================= */

/**
 * Development-time validation for duplicate slugs.
 */
function validateGlossaryTerms(): void {
  if (
    process.env.NODE_ENV ===
    "production"
  ) {
    return;
  }

  const usedSlugs = new Set<string>();

  for (const term of glossaryTerms) {
    const normalizedSlug =
      normalizeGlossarySlug(term.slug);

    if (usedSlugs.has(normalizedSlug)) {
      throw new Error(
        `[Glossary] Duplicate slug detected: "${normalizedSlug}"`,
      );
    }

    usedSlugs.add(normalizedSlug);

    if (
      term.letter.length !== 1
    ) {
      throw new Error(
        `[Glossary] Term "${term.title}" must have a single-character letter.`,
      );
    }

    if (
      !term.seo?.title ||
      !term.seo?.description ||
      !term.seo?.canonical
    ) {
      throw new Error(
        `[Glossary] SEO data is incomplete for "${term.slug}".`,
      );
    }

    const expectedCanonical =
      `/glossary/${normalizedSlug}/`;

    if (
      term.seo.canonical !==
      expectedCanonical
    ) {
      console.warn(
        `[Glossary] Canonical mismatch for "${term.slug}". Expected "${expectedCanonical}", received "${term.seo.canonical}".`,
      );
    }
  }
}

validateGlossaryTerms();