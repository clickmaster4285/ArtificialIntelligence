import type {
  DynamicPageData,
  DynamicPageSection,
  PageLink,
} from "@/types/dynamic-page";

/* =========================================================
   RESULT TYPES
========================================================= */

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface PageValidationResult {
  success: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

/* =========================================================
   BASIC HELPERS
========================================================= */

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => isNonEmptyString(item))
  );
}

function addError(
  errors: ValidationIssue[],
  path: string,
  message: string,
) {
  errors.push({ path, message });
}

function addWarning(
  warnings: ValidationIssue[],
  path: string,
  message: string,
) {
  warnings.push({ path, message });
}

/* =========================================================
   ALLOWED VALUES
========================================================= */

const allowedStatuses = ["draft", "published"] as const;

const allowedTemplates = [
  "neural-canvas",
  "cinematic-orbit",
  "digital-lab",
  "editorial-future",
] as const;

const allowedAccents = [
  "violet",
  "cyan",
  "blue",
  "emerald",
  "orange",
  "rose",
] as const;

const allowedBackgrounds = [
  "neural-grid",
  "particle-field",
  "gradient-mesh",
  "orbital-system",
  "digital-noise",
] as const;

const allowedSectionTypes = [
  "rich-text",
  "feature-grid",
  "process",
  "table",
  "comparison",
  "technologies",
  "stats",
  "objections",
  "faq",
  "industries",
  "case-studies",
  "testimonials",
  "callout",
  "cta",
] as const;

function isAllowedValue(
  value: unknown,
  values: readonly string[],
): value is string {
  return typeof value === "string" && values.includes(value);
}

/* =========================================================
   LINK VALIDATION
========================================================= */

function validateLink(
  value: unknown,
  path: string,
  errors: ValidationIssue[],
) {
  if (!isObject(value)) {
    addError(errors, path, "Link must be an object.");
    return;
  }

  if (!isNonEmptyString(value.label)) {
    addError(errors, `${path}.label`, "Link label is required.");
  }

  if (!isNonEmptyString(value.href)) {
    addError(errors, `${path}.href`, "Link href is required.");
    return;
  }

  const href = value.href.trim();

  const validHref =
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (!validHref) {
    addError(
      errors,
      `${path}.href`,
      "Href must start with /, #, http://, https://, mailto:, or tel:.",
    );
  }

  if (
    value.external !== undefined &&
    typeof value.external !== "boolean"
  ) {
    addError(
      errors,
      `${path}.external`,
      "external must be true or false.",
    );
  }
}

/* =========================================================
   SEO VALIDATION
========================================================= */

function validateSeo(
  value: unknown,
  slug: string | undefined,
  errors: ValidationIssue[],
  warnings: ValidationIssue[],
) {
  const path = "seo";

  if (!isObject(value)) {
    addError(errors, path, "SEO configuration is required.");
    return;
  }

  if (!isNonEmptyString(value.title)) {
    addError(errors, `${path}.title`, "SEO title is required.");
  } else {
    const length = value.title.trim().length;

    if (length < 30) {
      addWarning(
        warnings,
        `${path}.title`,
        `SEO title is short (${length} characters).`,
      );
    }

    if (length > 60) {
      addWarning(
        warnings,
        `${path}.title`,
        `SEO title is long (${length} characters). Recommended maximum is approximately 60.`,
      );
    }
  }

  if (!isNonEmptyString(value.description)) {
    addError(
      errors,
      `${path}.description`,
      "SEO description is required.",
    );
  } else {
    const length = value.description.trim().length;

    if (length < 120) {
      addWarning(
        warnings,
        `${path}.description`,
        `SEO description is short (${length} characters).`,
      );
    }

    if (length > 165) {
      addWarning(
        warnings,
        `${path}.description`,
        `SEO description is long (${length} characters).`,
      );
    }
  }

  if (!isNonEmptyString(value.canonical)) {
    addError(
      errors,
      `${path}.canonical`,
      "Canonical path is required.",
    );
  } else {
    const canonical = value.canonical.trim();

    if (!canonical.startsWith("/")) {
      addError(
        errors,
        `${path}.canonical`,
        "Canonical path must start with /.",
      );
    }

    if (!canonical.endsWith("/")) {
      addWarning(
        warnings,
        `${path}.canonical`,
        "Canonical path should end with / for URL consistency.",
      );
    }

    if (slug && canonical !== `/${slug}/`) {
      addWarning(
        warnings,
        `${path}.canonical`,
        `Canonical should normally be /${slug}/.`,
      );
    }
  }

  if (!isNonEmptyString(value.primaryKeyword)) {
    addError(
      errors,
      `${path}.primaryKeyword`,
      "Primary keyword is required.",
    );
  }

  if (
    value.secondaryKeywords !== undefined &&
    !isStringArray(value.secondaryKeywords)
  ) {
    addError(
      errors,
      `${path}.secondaryKeywords`,
      "Secondary keywords must be an array of non-empty strings.",
    );
  }

  if (
    value.openGraphImage !== undefined &&
    !isNonEmptyString(value.openGraphImage)
  ) {
    addError(
      errors,
      `${path}.openGraphImage`,
      "Open Graph image must be a non-empty path.",
    );
  }
}

/* =========================================================
   APPEARANCE VALIDATION
========================================================= */

function validateAppearance(
  value: unknown,
  errors: ValidationIssue[],
) {
  const path = "appearance";

  if (!isObject(value)) {
    addError(
      errors,
      path,
      "Page appearance configuration is required.",
    );
    return;
  }

  if (!isAllowedValue(value.template, allowedTemplates)) {
    addError(
      errors,
      `${path}.template`,
      `Invalid template. Allowed: ${allowedTemplates.join(", ")}.`,
    );
  }

  if (!isAllowedValue(value.accent, allowedAccents)) {
    addError(
      errors,
      `${path}.accent`,
      `Invalid accent. Allowed: ${allowedAccents.join(", ")}.`,
    );
  }

  if (!isAllowedValue(value.background, allowedBackgrounds)) {
    addError(
      errors,
      `${path}.background`,
      `Invalid background. Allowed: ${allowedBackgrounds.join(", ")}.`,
    );
  }

  const booleanFields = [
    "grain",
    "glow",
    "scrollProgress",
    "customCursor",
  ] as const;

  for (const field of booleanFields) {
    if (
      value[field] !== undefined &&
      typeof value[field] !== "boolean"
    ) {
      addError(
        errors,
        `${path}.${field}`,
        `${field} must be true or false.`,
      );
    }
  }
}

/* =========================================================
   HERO VALIDATION
========================================================= */

function validateHero(
  value: unknown,
  errors: ValidationIssue[],
  warnings: ValidationIssue[],
) {
  const path = "hero";

  if (!isObject(value)) {
    addError(errors, path, "Hero data is required.");
    return;
  }

  if (!isNonEmptyString(value.title)) {
    addError(errors, `${path}.title`, "Hero title is required.");
  }

  if (!isNonEmptyString(value.description)) {
    addError(
      errors,
      `${path}.description`,
      "Hero description is required.",
    );
  }

  validateLink(
    value.primaryCta,
    `${path}.primaryCta`,
    errors,
  );

  if (value.secondaryCta !== undefined) {
    validateLink(
      value.secondaryCta,
      `${path}.secondaryCta`,
      errors,
    );
  }

  if (
    value.highlights !== undefined &&
    !isStringArray(value.highlights)
  ) {
    addError(
      errors,
      `${path}.highlights`,
      "Hero highlights must be an array of strings.",
    );
  }

  if (Array.isArray(value.metrics) && value.metrics.length > 4) {
    addWarning(
      warnings,
      `${path}.metrics`,
      "More than four hero metrics may make the hero visually crowded.",
    );
  }
}

/* =========================================================
   SECTION HELPERS
========================================================= */

function validateBaseSection(
  section: Record<string, unknown>,
  path: string,
  errors: ValidationIssue[],
) {
  if (!isNonEmptyString(section.id)) {
    addError(errors, `${path}.id`, "Section ID is required.");
  } else if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id)
  ) {
    addError(
      errors,
      `${path}.id`,
      "Section ID must use lowercase kebab-case.",
    );
  }

  if (!isAllowedValue(section.type, allowedSectionTypes)) {
    addError(
      errors,
      `${path}.type`,
      `Unsupported section type. Allowed: ${allowedSectionTypes.join(", ")}.`,
    );
  }

  if (
    section.enabled !== undefined &&
    typeof section.enabled !== "boolean"
  ) {
    addError(
      errors,
      `${path}.enabled`,
      "enabled must be true or false.",
    );
  }
}

function validateItemsArray(
  value: unknown,
  path: string,
  errors: ValidationIssue[],
): value is unknown[] {
  if (!Array.isArray(value)) {
    addError(errors, path, "items must be an array.");
    return false;
  }

  if (value.length === 0) {
    addError(errors, path, "items must not be empty.");
    return false;
  }

  return true;
}

/* =========================================================
   SECTION-SPECIFIC VALIDATION
========================================================= */

function validateRichTextSection(
  section: Record<string, unknown>,
  path: string,
  errors: ValidationIssue[],
) {
  if (!Array.isArray(section.blocks) || section.blocks.length === 0) {
    addError(
      errors,
      `${path}.blocks`,
      "Rich-text section requires at least one content block.",
    );
    return;
  }

  section.blocks.forEach((block, index) => {
    const blockPath = `${path}.blocks[${index}]`;

    if (!isObject(block)) {
      addError(errors, blockPath, "Block must be an object.");
      return;
    }

    if (
      !Array.isArray(block.paragraphs) ||
      block.paragraphs.length === 0 ||
      !block.paragraphs.every(isNonEmptyString)
    ) {
      addError(
        errors,
        `${blockPath}.paragraphs`,
        "Each rich-text block requires non-empty paragraphs.",
      );
    }
  });
}

function validateFeatureSection(
  section: Record<string, unknown>,
  path: string,
  errors: ValidationIssue[],
) {
  if (!validateItemsArray(section.items, `${path}.items`, errors)) {
    return;
  }

  section.items.forEach((item, index) => {
    const itemPath = `${path}.items[${index}]`;

    if (!isObject(item)) {
      addError(errors, itemPath, "Feature item must be an object.");
      return;
    }

    if (!isNonEmptyString(item.title)) {
      addError(errors, `${itemPath}.title`, "Feature title is required.");
    }

    if (!isNonEmptyString(item.description)) {
      addError(
        errors,
        `${itemPath}.description`,
        "Feature description is required.",
      );
    }

    if (item.link !== undefined) {
      validateLink(item.link, `${itemPath}.link`, errors);
    }
  });
}

function validateProcessSection(
  section: Record<string, unknown>,
  path: string,
  errors: ValidationIssue[],
) {
  if (!validateItemsArray(section.steps, `${path}.steps`, errors)) {
    return;
  }

  section.steps.forEach((step, index) => {
    const stepPath = `${path}.steps[${index}]`;

    if (!isObject(step)) {
      addError(errors, stepPath, "Process step must be an object.");
      return;
    }

    if (!isNonEmptyString(step.title)) {
      addError(errors, `${stepPath}.title`, "Step title is required.");
    }

    if (!isNonEmptyString(step.description)) {
      addError(
        errors,
        `${stepPath}.description`,
        "Step description is required.",
      );
    }
  });
}

function validateTableSection(
  section: Record<string, unknown>,
  path: string,
  errors: ValidationIssue[],
) {
  if (
    !Array.isArray(section.columns) ||
    section.columns.length === 0
  ) {
    addError(
      errors,
      `${path}.columns`,
      "Table requires at least one column.",
    );
    return;
  }

  const columnKeys = new Set<string>();

  section.columns.forEach((column, index) => {
    const columnPath = `${path}.columns[${index}]`;

    if (!isObject(column)) {
      addError(errors, columnPath, "Column must be an object.");
      return;
    }

    if (!isNonEmptyString(column.key)) {
      addError(errors, `${columnPath}.key`, "Column key is required.");
    } else {
      if (columnKeys.has(column.key)) {
        addError(
          errors,
          `${columnPath}.key`,
          `Duplicate column key: ${column.key}.`,
        );
      }

      columnKeys.add(column.key);
    }

    if (!isNonEmptyString(column.label)) {
      addError(
        errors,
        `${columnPath}.label`,
        "Column label is required.",
      );
    }
  });

  if (!validateItemsArray(section.rows, `${path}.rows`, errors)) {
    return;
  }

  section.rows.forEach((row, rowIndex) => {
    const rowPath = `${path}.rows[${rowIndex}]`;

    if (!isObject(row)) {
      addError(errors, rowPath, "Table row must be an object.");
      return;
    }

    if (!isNonEmptyString(row.id)) {
      addError(errors, `${rowPath}.id`, "Table row ID is required.");
    }

    const cells = row.cells;

    if (!isObject(cells)) {
      addError(
        errors,
        `${rowPath}.cells`,
        "Table row cells must be an object.",
      );
      return;
    }

    columnKeys.forEach((key) => {
      if (!isNonEmptyString(cells[key])) {
        addError(
          errors,
          `${rowPath}.cells.${key}`,
          `Missing value for table column "${key}".`,
        );
      }
    });
  });

  if (section.cta !== undefined) {
    validateLink(section.cta, `${path}.cta`, errors);
  }
}

function validateFaqSection(
  section: Record<string, unknown>,
  path: string,
  errors: ValidationIssue[],
) {
  if (!validateItemsArray(section.items, `${path}.items`, errors)) {
    return;
  }

  const questions = new Set<string>();

  section.items.forEach((item, index) => {
    const itemPath = `${path}.items[${index}]`;

    if (!isObject(item)) {
      addError(errors, itemPath, "FAQ item must be an object.");
      return;
    }

    if (!isNonEmptyString(item.question)) {
      addError(
        errors,
        `${itemPath}.question`,
        "FAQ question is required.",
      );
    } else {
      const normalizedQuestion = item.question
        .trim()
        .toLowerCase();

      if (questions.has(normalizedQuestion)) {
        addError(
          errors,
          `${itemPath}.question`,
          "Duplicate FAQ question.",
        );
      }

      questions.add(normalizedQuestion);
    }

    if (!isNonEmptyString(item.answer)) {
      addError(
        errors,
        `${itemPath}.answer`,
        "FAQ answer is required.",
      );
    }
  });
}

function validateCtaSection(
  section: Record<string, unknown>,
  path: string,
  errors: ValidationIssue[],
) {
  if (!isNonEmptyString(section.heading)) {
    addError(errors, `${path}.heading`, "CTA heading is required.");
  }

  if (!isNonEmptyString(section.text)) {
    addError(errors, `${path}.text`, "CTA text is required.");
  }

  validateLink(
    section.primaryCta,
    `${path}.primaryCta`,
    errors,
  );

  if (section.secondaryCta !== undefined) {
    validateLink(
      section.secondaryCta,
      `${path}.secondaryCta`,
      errors,
    );
  }
}

function validateGenericItemsSection(
  section: Record<string, unknown>,
  path: string,
  errors: ValidationIssue[],
) {
  validateItemsArray(section.items, `${path}.items`, errors);
}

function validateSection(
  value: unknown,
  index: number,
  errors: ValidationIssue[],
) {
  const path = `sections[${index}]`;

  if (!isObject(value)) {
    addError(errors, path, "Section must be an object.");
    return;
  }

  validateBaseSection(value, path, errors);

  switch (value.type) {
    case "rich-text":
      validateRichTextSection(value, path, errors);
      break;

    case "feature-grid":
      validateFeatureSection(value, path, errors);
      break;

    case "process":
      validateProcessSection(value, path, errors);
      break;

    case "table":
      validateTableSection(value, path, errors);
      break;

    case "faq":
      validateFaqSection(value, path, errors);
      break;

    case "cta":
      validateCtaSection(value, path, errors);
      break;

    case "comparison":
    case "technologies":
    case "stats":
    case "objections":
    case "industries":
    case "case-studies":
    case "testimonials":
      validateGenericItemsSection(value, path, errors);
      break;

    case "callout":
      if (!isNonEmptyString(value.text)) {
        addError(errors, `${path}.text`, "Callout text is required.");
      }

      if (value.link !== undefined) {
        validateLink(value.link, `${path}.link`, errors);
      }
      break;
  }
}

/* =========================================================
   MAIN VALIDATOR
========================================================= */

export function validateDynamicPage(
  value: unknown,
): PageValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  if (!isObject(value)) {
    return {
      success: false,
      errors: [
        {
          path: "page",
          message: "Page data must be a JSON object.",
        },
      ],
      warnings,
    };
  }

  let slug: string | undefined;

  if (!isNonEmptyString(value.slug)) {
    addError(errors, "slug", "Page slug is required.");
  } else {
    slug = value.slug.trim();

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      addError(
        errors,
        "slug",
        "Slug must use lowercase kebab-case without slashes.",
      );
    }
  }

  if (!isAllowedValue(value.status, allowedStatuses)) {
    addError(
      errors,
      "status",
      "Status must be draft or published.",
    );
  }

  validateSeo(value.seo, slug, errors, warnings);
  validateAppearance(value.appearance, errors);
  validateHero(value.hero, errors, warnings);

  if (!Array.isArray(value.sections)) {
    addError(errors, "sections", "Sections must be an array.");
  } else {
    if (value.sections.length === 0) {
      addError(
        errors,
        "sections",
        "A page requires at least one content section.",
      );
    }

    const sectionIds = new Set<string>();

    value.sections.forEach((section, index) => {
      validateSection(section, index, errors);

      if (isObject(section) && isNonEmptyString(section.id)) {
        if (sectionIds.has(section.id)) {
          addError(
            errors,
            `sections[${index}].id`,
            `Duplicate section ID: ${section.id}.`,
          );
        }

        sectionIds.add(section.id);
      }
    });

    const ctaCount = value.sections.filter(
      (section) =>
        isObject(section) &&
        section.type === "cta" &&
        section.enabled !== false,
    ).length;

    if (ctaCount === 0) {
      addWarning(
        warnings,
        "sections",
        "Published pages should normally contain a CTA section.",
      );
    }
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
  };
}

/* =========================================================
   ASSERTION/PARSER
========================================================= */

/**
 * Use this when loading JSON.
 *
 * If the JSON is invalid, execution stops with a readable error.
 * If valid, TypeScript treats it as DynamicPageData.
 */
export function parseDynamicPage(
  value: unknown,
  source = "unknown page",
): DynamicPageData {
  const result = validateDynamicPage(value);

  if (!result.success) {
    const formattedErrors = result.errors
      .map(
        (error) =>
          `- ${error.path}: ${error.message}`,
      )
      .join("\n");

    throw new Error(
      `Invalid dynamic page data in ${source}:\n${formattedErrors}`,
    );
  }

  return value as DynamicPageData;
}

/**
 * Optional helper when code only needs a boolean type guard.
 */
export function isDynamicPageData(
  value: unknown,
): value is DynamicPageData {
  return validateDynamicPage(value).success;
}

/**
 * Reusable link guard for renderers or utilities.
 */
export function isPageLink(value: unknown): value is PageLink {
  if (!isObject(value)) {
    return false;
  }

  const errors: ValidationIssue[] = [];

  validateLink(value, "link", errors);

  return errors.length === 0;
}

/**
 * Reusable section guard.
 */
export function isDynamicPageSection(
  value: unknown,
): value is DynamicPageSection {
  if (!isObject(value)) {
    return false;
  }

  const errors: ValidationIssue[] = [];

  validateSection(value, 0, errors);

  return errors.length === 0;
}
