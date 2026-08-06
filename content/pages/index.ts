import type { DynamicPageData } from "@/types/dynamic-page";

import { neuralCanvasPages } from "./neural-canvas";

/**
 * Central registry for every data-driven page.
 *
 * Future template registries will be imported here:
 *
 * import { cinematicOrbitPages } from "./cinematic-orbit";
 * import { digitalLabPages } from "./digital-lab";
 * import { editorialFuturePages } from "./editorial-future";
 */
export const allDynamicPages: DynamicPageData[] = [
  ...neuralCanvasPages,

  // Future templates:
  // ...cinematicOrbitPages,
  // ...digitalLabPages,
  // ...editorialFuturePages,
];

/**
 * Only published pages should be publicly accessible
 * and included in static generation/sitemap.
 */
export const publishedDynamicPages =
  allDynamicPages.filter(
    (page) => page.status === "published",
  );

/**
 * Useful for Next.js generateStaticParams().
 */
export const publishedDynamicPageSlugs =
  publishedDynamicPages.map(
    (page) => page.slug,
  );
