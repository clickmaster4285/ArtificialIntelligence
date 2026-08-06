import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

/* =========================================================
   CONFIGURATION
========================================================= */

const projectRoot = process.cwd();

const pagesDirectory = path.join(
  projectRoot,
  "content",
  "pages",
);

const outputFile = path.join(
  projectRoot,
  "content",
  "page-registry.generated.ts",
);

/* =========================================================
   FILE HELPERS
========================================================= */

/**
 * Recursively finds every JSON file inside content/pages.
 *
 * Supported structure:
 *
 * content/pages/neural-canvas/page-one.json
 * content/pages/neural-canvas/page-two.json
 * content/pages/cinematic-orbit/page-three.json
 */
async function findJsonFiles(directory) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findJsonFiles(absolutePath);
      }

      if (
        entry.isFile() &&
        entry.name.toLowerCase().endsWith(".json")
      ) {
        return [absolutePath];
      }

      return [];
    }),
  );

  return nestedFiles.flat();
}

/**
 * Converts Windows paths into import-safe forward-slash paths.
 */
function normalizeImportPath(value) {
  return value.split(path.sep).join("/");
}

/**
 * Makes sure relative imports start with ./ or ../.
 */
function ensureRelativeImport(value) {
  if (value.startsWith(".")) {
    return value;
  }

  return `./${value}`;
}

/**
 * Converts a string into a safe readable TypeScript identifier.
 */
function createImportName(slug, index) {
  const pascalName = slug
    .split("-")
    .filter(Boolean)
    .map((part) => {
      return (
        part.charAt(0).toUpperCase() +
        part.slice(1)
      );
    })
    .join("");

  return `page${pascalName || index}`;
}

/* =========================================================
   BASIC JSON VALIDATION
========================================================= */

function validateBasicPageData(page, filePath) {
  const errors = [];

  if (
    typeof page !== "object" ||
    page === null ||
    Array.isArray(page)
  ) {
    errors.push("Page data must be a JSON object.");

    return errors;
  }

  if (
    typeof page.slug !== "string" ||
    page.slug.trim().length === 0
  ) {
    errors.push("slug is required.");
  } else if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug)
  ) {
    errors.push(
      "slug must use lowercase kebab-case without slashes.",
    );
  }

  if (
    page.status !== "draft" &&
    page.status !== "published"
  ) {
    errors.push(
      'status must be either "draft" or "published".',
    );
  }

  if (
    typeof page.seo !== "object" ||
    page.seo === null
  ) {
    errors.push("seo object is required.");
  } else {
    if (
      typeof page.seo.title !== "string" ||
      page.seo.title.trim().length === 0
    ) {
      errors.push("seo.title is required.");
    }

    if (
      typeof page.seo.description !== "string" ||
      page.seo.description.trim().length === 0
    ) {
      errors.push("seo.description is required.");
    }

    if (
      typeof page.seo.canonical !== "string" ||
      page.seo.canonical.trim().length === 0
    ) {
      errors.push("seo.canonical is required.");
    }
  }

  if (
    typeof page.appearance !== "object" ||
    page.appearance === null
  ) {
    errors.push("appearance object is required.");
  }

  if (
    typeof page.hero !== "object" ||
    page.hero === null
  ) {
    errors.push("hero object is required.");
  } else if (
    typeof page.hero.title !== "string" ||
    page.hero.title.trim().length === 0
  ) {
    errors.push("hero.title is required.");
  }

  if (!Array.isArray(page.sections)) {
    errors.push("sections must be an array.");
  } else if (page.sections.length === 0) {
    errors.push(
      "sections must contain at least one section.",
    );
  }

  if (errors.length > 0) {
    console.error(`\nInvalid page: ${filePath}`);

    errors.forEach((error) => {
      console.error(`  - ${error}`);
    });
  }

  return errors;
}

/* =========================================================
   LOAD AND CHECK JSON FILES
========================================================= */

async function loadPageFiles(files) {
  const loadedPages = [];
  const knownSlugs = new Map();
  let hasErrors = false;

  for (const absoluteFilePath of files) {
    let page;

    try {
      const source = await fs.readFile(
        absoluteFilePath,
        "utf8",
      );

      page = JSON.parse(source);
    } catch (error) {
      hasErrors = true;

      console.error(
        `\nCould not parse JSON: ${absoluteFilePath}`,
      );

      console.error(
        error instanceof Error
          ? `  - ${error.message}`
          : "  - Unknown JSON parsing error.",
      );

      continue;
    }

    const validationErrors = validateBasicPageData(
      page,
      absoluteFilePath,
    );

    if (validationErrors.length > 0) {
      hasErrors = true;
      continue;
    }

    const existingFile = knownSlugs.get(page.slug);

    if (existingFile) {
      hasErrors = true;

      console.error(
        `\nDuplicate slug detected: "${page.slug}"`,
      );

      console.error(`  - First file: ${existingFile}`);
      console.error(`  - Second file: ${absoluteFilePath}`);

      continue;
    }

    knownSlugs.set(page.slug, absoluteFilePath);

    loadedPages.push({
      slug: page.slug,
      status: page.status,
      absoluteFilePath,
    });
  }

  if (hasErrors) {
    throw new Error(
      "Page registry was not generated because page data contains errors.",
    );
  }

  return loadedPages;
}

/* =========================================================
   GENERATE TYPESCRIPT REGISTRY
========================================================= */

function createRegistrySource(pages) {
  const outputDirectory = path.dirname(outputFile);

  const imports = pages.map((page, index) => {
    const importName = createImportName(
      page.slug,
      index,
    );

    const relativePath = path.relative(
      outputDirectory,
      page.absoluteFilePath,
    );

    const importPath = ensureRelativeImport(
      normalizeImportPath(relativePath),
    );

    return {
      ...page,
      importName,
      importPath,
    };
  });

  const importLines = imports
    .map(({ importName, importPath }) => {
      return `import ${importName} from "${importPath}";`;
    })
    .join("\n");

  const pageLines = imports
    .map(({ importName }) => {
      return `  ${importName} as DynamicPageData,`;
    })
    .join("\n");

  return `/**
 * =========================================================
 * AUTO-GENERATED FILE
 * =========================================================
 *
 * Do not edit this file manually.
 *
 * Generate it with:
 * node scripts/generate-page-registry.mjs
 */

import type { DynamicPageData } from "@/types/dynamic-page";

${importLines}

export const dynamicPages: DynamicPageData[] = [
${pageLines}
];

export const dynamicPageSlugs = dynamicPages.map(
  (page) => page.slug,
);

export const publishedDynamicPages = dynamicPages.filter(
  (page) => page.status === "published",
);
`;
}

/* =========================================================
   MAIN
========================================================= */

async function generateRegistry() {
  console.log("Scanning dynamic page JSON files...");

  let jsonFiles;

  try {
    jsonFiles = await findJsonFiles(pagesDirectory);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      throw new Error(
        `Pages directory does not exist: ${pagesDirectory}`,
      );
    }

    throw error;
  }

  jsonFiles.sort((first, second) => {
    return first.localeCompare(second);
  });

  if (jsonFiles.length === 0) {
    throw new Error(
      `No JSON page files found inside: ${pagesDirectory}`,
    );
  }

  const pages = await loadPageFiles(jsonFiles);

  const registrySource = createRegistrySource(pages);

  await fs.writeFile(
    outputFile,
    registrySource,
    "utf8",
  );

  console.log(
    `Generated registry for ${pages.length} page(s).`,
  );

  console.log(`Output: ${outputFile}`);
}

generateRegistry().catch((error) => {
  console.error("\nPage registry generation failed.");

  console.error(
    error instanceof Error
      ? error.message
      : error,
  );

  process.exitCode = 1;
});
