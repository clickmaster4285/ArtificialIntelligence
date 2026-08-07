import type {
  DynamicPageData,
  DynamicPageSection,
} from "@/types/dynamic-page";

import type {
  ScrollNavigationItem,
} from "../shared/PageScrollIndicator";

import { NeuralCtaSection } from "./NeuralCtaSection";
import { NeuralFaqSection } from "./NeuralFaqSection";
import { NeuralFeatureGrid } from "./NeuralFeatureGrid";
import { NeuralIndustriesSection } from "./NeuralIndustriesSection";
import { NeuralObjectionsSection } from "./NeuralObjectionsSection";
import { NeuralProcessTimeline } from "./NeuralProcessTimeline";
import { NeuralRichTextSection } from "./NeuralRichTextSection";
import { NeuralStatsSection } from "./NeuralStatsSection";
import { NeuralTableSection } from "./NeuralTableSection";
import { NeuralTechnologyOrbit } from "./NeuralTechnologyOrbit";

/* =========================================================
   TYPES
========================================================= */

interface NeuralSectionRendererProps {
  page: DynamicPageData;
}

/* =========================================================
   SECTION LABEL
========================================================= */

/**
 * Generates readable labels for the right-side
 * section navigation.
 */
function getSectionLabel(
  section: DynamicPageSection,
): string {
  if ("title" in section && section.title) {
    return section.title;
  }

  if (
    section.type === "cta" &&
    section.heading
  ) {
    return section.heading;
  }

  if (section.eyebrow) {
    return section.eyebrow;
  }

  return section.id
    .split("-")
    .map((word) => {
      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      );
    })
    .join(" ");
}

/* =========================================================
   ENABLED SECTIONS
========================================================= */

export function getEnabledNeuralSections(
  page: DynamicPageData,
): DynamicPageSection[] {
  return page.sections.filter(
    (section) =>
      section.enabled !== false,
  );
}

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

export function getNeuralNavigationItems(
  page: DynamicPageData,
): ScrollNavigationItem[] {
  return getEnabledNeuralSections(
    page,
  ).map((section) => ({
    id: section.id,
    label: getSectionLabel(section),
  }));
}

/* =========================================================
   SINGLE SECTION RENDERER
========================================================= */

function renderNeuralSection(
  section: DynamicPageSection,
  index: number,
  page: DynamicPageData,
) {
  /*
   * Hero is not part of this array, so the
   * first content section starts from 01.
   */
  const sectionIndex = index + 1;

  switch (section.type) {
    case "feature-grid":
      return (
        <NeuralFeatureGrid
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "technologies":
      return (
        <NeuralTechnologyOrbit
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "table":
      return (
        <NeuralTableSection
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "process":
      return (
        <NeuralProcessTimeline
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "stats":
      return (
        <NeuralStatsSection
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "objections":
      return (
        <NeuralObjectionsSection
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "rich-text":
      return (
        <NeuralRichTextSection
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "industries":
      return (
        <NeuralIndustriesSection
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "faq":
      return (
        <NeuralFaqSection
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      );

    case "cta":
      return (
        <NeuralCtaSection
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
          accent={
            page.appearance.accent
          }
        />
      );

    /*
     * These section types are present in our universal
     * data schema, but their Neural Canvas components
     * will be added when a page actually requires them.
     *
     * Keeping them here ensures TypeScript reminds us
     * which blocks are not connected yet.
     */
    case "comparison":
    case "case-studies":
    case "testimonials":
    case "callout":
      return null;

    default: {
      /*
       * Compile-time exhaustive check.
       *
       * If a new section type is added to the data schema
       * but not handled above, TypeScript will produce
       * an error here.
       */
      const unhandledSection: never =
        section;

      return unhandledSection;
    }
  }
}

/* =========================================================
   COMPLETE PAGE SECTIONS
========================================================= */

export function NeuralSectionRenderer({
  page,
}: NeuralSectionRendererProps) {
  const enabledSections =
    getEnabledNeuralSections(page);

  return (
    <>
      {enabledSections.map(
        (section, index) =>
          renderNeuralSection(
            section,
            index,
            page,
          ),
      )}
    </>
  );
}