/**
 * Every root-level data-driven page uses this contract.
 *
 * Example routes:
 * /llm-development-company/
 * /generative-ai-development-company/
 * /rag-development-services/
 */

/* =========================================================
   SHARED TYPES
========================================================= */

export type PageStatus = "draft" | "published";

export type PageTemplate =
  | "neural-canvas"
  | "cinematic-orbit"
  | "digital-lab"
  | "editorial-future";

export type PageAccent =
  | "violet"
  | "cyan"
  | "blue"
  | "emerald"
  | "orange"
  | "rose";

export type SectionTone =
  | "default"
  | "surface"
  | "contrast"
  | "transparent";

export type SectionWidth =
  | "narrow"
  | "content"
  | "wide"
  | "full";

export type AnimationPreset =
  | "none"
  | "fade-up"
  | "fade-scale"
  | "blur-reveal"
  | "stagger"
  | "horizontal-reveal"
  | "pinned-scroll"
  | "parallax"
  | "mask-reveal";

export interface PageLink {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
}

export interface PageImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

/* =========================================================
   SEO
========================================================= */

export interface PageSeo {
  title: string;
  description: string;

  /**
   * Example:
   * /llm-development-company/
   */
  canonical: string;

  primaryKeyword: string;
  secondaryKeywords?: string[];

  /**
   * Absolute or public-relative image path.
   */
  openGraphImage?: string;

  noIndex?: boolean;
  noFollow?: boolean;
}

export interface PageSchemaSettings {
  service?: boolean;
  organization?: boolean;
  breadcrumbs?: boolean;
  faq?: boolean;
}

/* =========================================================
   GLOBAL PAGE APPEARANCE
========================================================= */

export interface PageAppearance {
  template: PageTemplate;
  accent: PageAccent;

  /**
   * Controls the large animated visual used by the template.
   */
  background:
    | "neural-grid"
    | "particle-field"
    | "gradient-mesh"
    | "orbital-system"
    | "digital-noise";

  grain?: boolean;
  glow?: boolean;
  scrollProgress?: boolean;
  customCursor?: boolean;
}

/* =========================================================
   HERO
========================================================= */

export interface HeroSection {
  eyebrow?: string;
  title: string;

  /**
   * A shorter phrase that receives gradient/reveal treatment.
   */
  highlightedText?: string;

  description: string;

  primaryCta: PageLink;
  secondaryCta?: PageLink;

  trustText?: string;
  metrics?: MetricItem[];

  visual?: {
    type:
      | "neural-sphere"
      | "model-orbit"
      | "particle-brain"
      | "code-terminal"
      | "abstract-canvas";

    label?: string;
    modelNames?: string[];
  };
}

/* =========================================================
   BASE SECTION
========================================================= */

interface BaseSection {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;

  tone?: SectionTone;
  width?: SectionWidth;
  animation?: AnimationPreset;

  /**
   * Entire section can be disabled without deleting its data.
   */
  enabled?: boolean;
}

/* =========================================================
   RICH TEXT SECTION
========================================================= */

export interface RichTextBlock {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
  links?: PageLink[];
}

export interface RichTextSection extends BaseSection {
  type: "rich-text";

  layout?:
    | "single-column"
    | "two-column"
    | "sticky-heading"
    | "editorial";

  blocks: RichTextBlock[];
}

/* =========================================================
   FEATURE/CAPABILITY CARDS
========================================================= */

export interface FeatureCard {
  title: string;
  description: string;

  icon?:
    | "brain"
    | "database"
    | "network"
    | "sparkles"
    | "shield"
    | "code"
    | "workflow"
    | "chart"
    | "search"
    | "bot"
    | "cloud"
    | "layers";

  label?: string;
  metric?: string;
  link?: PageLink;
}

export interface FeatureGridSection extends BaseSection {
  type: "feature-grid";

  variant?:
    | "bento"
    | "spotlight"
    | "numbered"
    | "glass"
    | "horizontal"
    | "orbit";

  columns?: 2 | 3 | 4;
  items: FeatureCard[];
}

/* =========================================================
   PROCESS/TIMELINE
========================================================= */

export interface ProcessStep {
  number?: string;
  title: string;
  description: string;
  duration?: string;
  deliverables?: string[];
}

export interface ProcessSection extends BaseSection {
  type: "process";

  variant?:
    | "vertical-timeline"
    | "horizontal-steps"
    | "pinned-cards"
    | "scroll-path";

  steps: ProcessStep[];
}

/* =========================================================
   PRICING/DATA TABLE
========================================================= */

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface TableRow {
  id: string;

  /**
   * Each key should match a column key.
   */
  cells: Record<string, string>;

  highlighted?: boolean;
  badge?: string;
}

export interface TableSection extends BaseSection {
  type: "table";

  variant?:
    | "pricing"
    | "comparison"
    | "technical"
    | "minimal";

  columns: TableColumn[];
  rows: TableRow[];

  note?: string;
  cta?: PageLink;
}

/* =========================================================
   COMPARISON
========================================================= */

export interface ComparisonItem {
  feature: string;
  values: Record<string, string | boolean>;
}

export interface ComparisonSection extends BaseSection {
  type: "comparison";

  columns: Array<{
    key: string;
    label: string;
    recommended?: boolean;
  }>;

  items: ComparisonItem[];
}

/* =========================================================
   TECHNOLOGY/MODEL CLOUD
========================================================= */

export interface TechnologyItem {
  name: string;
  category?: string;
  description?: string;
  icon?: string;
}

export interface TechnologySection extends BaseSection {
  type: "technologies";

  variant?:
    | "orbit"
    | "marquee"
    | "grid"
    | "constellation";

  items: TechnologyItem[];
}

/* =========================================================
   STATISTICS
========================================================= */

export interface StatsSection extends BaseSection {
  type: "stats";

  variant?:
    | "counter-grid"
    | "horizontal-strip"
    | "floating-cards";

  items: MetricItem[];
}

/* =========================================================
   OBJECTIONS / Q&A CARDS
========================================================= */

export interface ObjectionItem {
  objection: string;
  answer: string;
}

export interface ObjectionsSection extends BaseSection {
  type: "objections";

  variant?:
    | "stacked"
    | "reveal-cards"
    | "conversation";

  items: ObjectionItem[];
}

/* =========================================================
   FAQ
========================================================= */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection extends BaseSection {
  type: "faq";

  variant?:
    | "accordion"
    | "split"
    | "indexed";

  items: FaqItem[];
}

/* =========================================================
   INDUSTRIES
========================================================= */

export interface IndustryItem {
  name: string;
  description: string;
  href?: string;
  icon?: string;
}

export interface IndustriesSection extends BaseSection {
  type: "industries";

  variant?:
    | "cards"
    | "interactive-list"
    | "radial"
    | "marquee";

  items: IndustryItem[];
}

/* =========================================================
   CASE STUDIES
========================================================= */

export interface CaseStudyItem {
  title: string;
  industry?: string;
  description: string;
  result?: string;
  metrics?: MetricItem[];
  image?: PageImage;
  href?: string;
}

export interface CaseStudiesSection extends BaseSection {
  type: "case-studies";

  variant?:
    | "pinned-scroll"
    | "horizontal"
    | "stacked"
    | "carousel";

  items: CaseStudyItem[];
}

/* =========================================================
   TESTIMONIALS
========================================================= */

export interface TestimonialItem {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: PageImage;
}

export interface TestimonialsSection extends BaseSection {
  type: "testimonials";

  variant?:
    | "spotlight"
    | "marquee"
    | "cards"
    | "cinematic";

  items: TestimonialItem[];
}

/* =========================================================
   CALLOUT
========================================================= */

export interface CalloutSection extends BaseSection {
  type: "callout";

  text: string;
  icon?: "info" | "warning" | "sparkles" | "shield";
  link?: PageLink;
}

/* =========================================================
   CTA
========================================================= */

export interface CtaSection extends BaseSection {
  type: "cta";

  heading?: string;
  text?: string;

  primaryCta: PageLink;
  secondaryCta?: PageLink;

  contactEmail?: string;
  trustText?: string;

  variant?:
    | "glowing-panel"
    | "full-screen"
    | "orbital"
    | "minimal";
}

/* =========================================================
   SECTION UNION
========================================================= */

/**
 * The `type` property is the discriminator.
 *
 * This enables safe rendering:
 *
 * switch (section.type) {
 *   case "faq":
 *     section.items;
 *     break;
 * }
 */
export type DynamicPageSection =
  | RichTextSection
  | FeatureGridSection
  | ProcessSection
  | TableSection
  | ComparisonSection
  | TechnologySection
  | StatsSection
  | ObjectionsSection
  | FaqSection
  | IndustriesSection
  | CaseStudiesSection
  | TestimonialsSection
  | CalloutSection
  | CtaSection;

/* =========================================================
   COMPLETE PAGE
========================================================= */

export interface DynamicPageData {
  /**
   * Must be globally unique.
   * Do not include leading/trailing slashes.
   */
  slug: string;

  status: PageStatus;

  seo: PageSeo;
  schema?: PageSchemaSettings;
  appearance: PageAppearance;
  hero: HeroSection;

  /**
   * Sections render in this exact order.
   * Any section type can be omitted.
   */
  sections: DynamicPageSection[];

  /**
   * Optional relationships for internal linking.
   */
  relatedPages?: Array<{
    title: string;
    description?: string;
    href: string;
  }>;
}
