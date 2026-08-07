import type {
  DynamicPageData,
  PageTemplate,
} from "@/types/dynamic-page";

import { NeuralCanvasTemplate } from "./neural-canvas/NeuralCanvasTemplate";

/* =========================================================
   TYPES
========================================================= */

interface DynamicPageTemplateProps {
  page: DynamicPageData;
}

/* =========================================================
   TEMPLATE ERROR
========================================================= */

class PageTemplateNotImplementedError extends Error {
  constructor(
    template: PageTemplate,
    slug: string,
  ) {
    super(
      [
        `Template "${template}" is not implemented.`,
        `Page slug: "${slug}".`,
        "",
        "Either:",
        "1. Build and register this template.",
        "2. Change appearance.template in the page JSON.",
      ].join("\n"),
    );

    this.name =
      "PageTemplateNotImplementedError";
  }
}

/* =========================================================
   TEMPLATE SELECTOR
========================================================= */

export function DynamicPageTemplate({
  page,
}: DynamicPageTemplateProps) {
  const template =
    page.appearance.template;

  switch (template) {
    case "neural-canvas":
      return (
        <NeuralCanvasTemplate
          page={page}
        />
      );

    /*
     * These templates are reserved for the next
     * design batches. Their folders/components will
     * be added when development starts on them.
     */
    case "cinematic-orbit":
    case "digital-lab":
    case "editorial-future":
      throw new PageTemplateNotImplementedError(
        template,
        page.slug,
      );

    default: {
      /*
       * TypeScript exhaustive check.
       *
       * If a new PageTemplate value is added in
       * types/dynamic-page.ts but not handled here,
       * TypeScript will report an error.
       */
      const unsupportedTemplate: never =
        template;

      return unsupportedTemplate;
    }
  }
}