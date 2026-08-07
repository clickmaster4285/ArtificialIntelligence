/* =========================================================
   GLOSSARY CORE TYPES
========================================================= */

export type GlossaryStatus =
  | "draft"
  | "published";

export type GlossaryCategory =
  | "Artificial Intelligence"
  | "Machine Learning"
  | "Large Language Models"
  | "Generative AI"
  | "RAG"
  | "Natural Language Processing"
  | "Computer Vision"
  | "Data Engineering"
  | "MLOps"
  | "AI Security"
  | "AI Governance"
  | "Other";

/* =========================================================
   SEO
========================================================= */

export interface GlossarySeo {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

/* =========================================================
   LINKS
========================================================= */

export interface GlossaryLink {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
}

/* =========================================================
   CONTENT ELEMENTS
========================================================= */

export interface GlossaryBulletList {
  type: "bullet-list";
  title?: string;
  items: string[];
}

export interface GlossaryNumberedList {
  type: "numbered-list";
  title?: string;
  items: string[];
}

export interface GlossaryParagraph {
  type: "paragraph";
  text: string;
}

export interface GlossaryCallout {
  type: "callout";
  title?: string;
  text: string;
  variant?:
    | "info"
    | "success"
    | "warning"
    | "highlight";
}

export interface GlossaryQuote {
  type: "quote";
  text: string;
  author?: string;
  role?: string;
}

export interface GlossaryCodeBlock {
  type: "code";
  code: string;
  language?: string;
  caption?: string;
}

export interface GlossaryTable {
  type: "table";
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GlossaryKeyValueItem {
  label: string;
  value: string;
}

export interface GlossaryKeyValueGrid {
  type: "key-value-grid";
  title?: string;
  items: GlossaryKeyValueItem[];
}

export type GlossaryContentBlock =
  | GlossaryParagraph
  | GlossaryBulletList
  | GlossaryNumberedList
  | GlossaryCallout
  | GlossaryQuote
  | GlossaryCodeBlock
  | GlossaryTable
  | GlossaryKeyValueGrid;

/* =========================================================
   ARTICLE SECTIONS
========================================================= */

export interface GlossaryArticleSection {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  content: GlossaryContentBlock[];
}

/* =========================================================
   FAQ
========================================================= */

export interface GlossaryFaqItem {
  question: string;
  answer: string;
}

export interface GlossaryFaqSection {
  title?: string;
  eyebrow?: string;
  items: GlossaryFaqItem[];
}

/* =========================================================
   RELATED TERM
========================================================= */

export interface GlossaryRelatedTerm {
  slug: string;
  title: string;
  shortDefinition: string;
  category?: GlossaryCategory;
}

/* =========================================================
   GLOSSARY TERM
========================================================= */

export interface GlossaryTerm {
  /**
   * URL:
   * /glossary/retrieval-augmented-generation
   */
  slug: string;

  status: GlossaryStatus;

  title: string;

  /**
   * Optional shorter name used inside cards.
   */
  shortTitle?: string;

  /**
   * Example: RAG
   */
  abbreviation?: string;

  /**
   * Used for A–Z navigation and sorting.
   * Example: "R"
   */
  letter: string;

  category: GlossaryCategory;

  /**
   * Short description displayed on glossary cards.
   */
  shortDefinition: string;

  /**
   * Prominent definition displayed near the top
   * of the glossary detail page.
   */
  definition: string;

  /**
   * Optional hero introduction.
   */
  introduction?: string;

  /**
   * Useful for highlighted cards on the listing page.
   */
  featured?: boolean;

  /**
   * Search aliases and alternative spellings.
   */
  aliases?: string[];

  /**
   * Estimated reading time displayed on detail pages.
   * Example: "6 min read"
   */
  readingTime?: string;

  /**
   * ISO date format: YYYY-MM-DD
   */
  publishedAt?: string;

  /**
   * ISO date format: YYYY-MM-DD
   */
  updatedAt?: string;

  seo: GlossarySeo;

  /**
   * Main article content.
   */
  sections: GlossaryArticleSection[];

  /**
   * Optional questions associated with this term.
   */
  faqs?: GlossaryFaqSection;

  /**
   * Slugs of related glossary pages.
   */
  relatedTerms?: string[];

  /**
   * Optional article references.
   */
  references?: GlossaryReference[];

  /**
   * Detail-page final CTA.
   */
  cta?: GlossaryCta;
}

/* =========================================================
   REFERENCES
========================================================= */

export interface GlossaryReference {
  label: string;
  href: string;
  publisher?: string;
}

/* =========================================================
   CTA
========================================================= */

export interface GlossaryCta {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLink: GlossaryLink;
  secondaryLink?: GlossaryLink;
}

/* =========================================================
   LANDING PAGE CONFIGURATION
========================================================= */

export interface GlossaryLandingHero {
  eyebrow?: string;
  title: string;
  highlightedText?: string;
  description: string;
  searchPlaceholder?: string;
  popularSearches?: string[];
}

export interface GlossaryLandingSeo {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  ogImage?: string;
}

export interface GlossaryLandingConfig {
  seo: GlossaryLandingSeo;
  hero: GlossaryLandingHero;
  featuredTitle?: string;
  allTermsTitle?: string;
  termsPerPage: number;
}

/* =========================================================
   FILTERING AND PAGINATION
========================================================= */

export interface GlossaryFilters {
  search?: string;
  letter?: string;
  category?: GlossaryCategory | "All";
}

export interface GlossaryPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedGlossaryTerms {
  terms: GlossaryTerm[];
  pagination: GlossaryPagination;
}

/* =========================================================
   CARD-SAFE DATA
========================================================= */

export interface GlossaryCardData {
  slug: string;
  title: string;
  shortTitle?: string;
  abbreviation?: string;
  letter: string;
  category: GlossaryCategory;
  shortDefinition: string;
  featured?: boolean;
  readingTime?: string;
}

/* =========================================================
   TYPE GUARDS
========================================================= */

export function isPublishedGlossaryTerm(
  term: GlossaryTerm,
): boolean {
  return term.status === "published";
}

export function isGlossaryCategory(
  value: string,
): value is GlossaryCategory {
  const categories: GlossaryCategory[] = [
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models",
    "Generative AI",
    "RAG",
    "Natural Language Processing",
    "Computer Vision",
    "Data Engineering",
    "MLOps",
    "AI Security",
    "AI Governance",
    "Other",
  ];

  return categories.includes(
    value as GlossaryCategory,
  );
}