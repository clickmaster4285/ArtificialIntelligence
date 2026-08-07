import type {
  GlossaryCardData,
  GlossaryCategory,
  GlossaryFilters,
  GlossaryPagination,
  GlossaryTerm,
  PaginatedGlossaryTerms,
} from "@/types/glossary";

/* =========================================================
   CONSTANTS
========================================================= */

export const GLOSSARY_ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;

export type GlossaryLetter =
  (typeof GLOSSARY_ALPHABET)[number];

/* =========================================================
   NORMALIZATION
========================================================= */

export function normalizeSearchValue(
  value?: string | null,
): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function normalizeLetter(
  value?: string | null,
): string {
  const normalizedValue = (
    value ?? ""
  )
    .trim()
    .toUpperCase();

  if (
    normalizedValue === "ALL" ||
    normalizedValue === ""
  ) {
    return "ALL";
  }

  return GLOSSARY_ALPHABET.includes(
    normalizedValue as GlossaryLetter,
  )
    ? normalizedValue
    : "ALL";
}

export function normalizePageNumber(
  value?: string | number | null,
): number {
  const parsedValue =
    typeof value === "number"
      ? value
      : Number.parseInt(
          value ?? "1",
          10,
        );

  if (
    !Number.isFinite(parsedValue) ||
    parsedValue < 1
  ) {
    return 1;
  }

  return Math.floor(parsedValue);
}

/* =========================================================
   SEARCH
========================================================= */

function createTermSearchText(
  term: GlossaryTerm,
): string {
  return normalizeSearchValue(
    [
      term.title,
      term.shortTitle,
      term.abbreviation,
      term.category,
      term.shortDefinition,
      term.definition,
      ...(term.aliases ?? []),
      ...(term.seo.keywords ?? []),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

export function searchGlossaryTerms(
  terms: GlossaryTerm[],
  query?: string | null,
): GlossaryTerm[] {
  const normalizedQuery =
    normalizeSearchValue(query);

  if (!normalizedQuery) {
    return terms;
  }

  const queryWords =
    normalizedQuery.split(" ");

  return terms.filter((term) => {
    const searchableText =
      createTermSearchText(term);

    return queryWords.every((word) =>
      searchableText.includes(word),
    );
  });
}

/* =========================================================
   LETTER FILTER
========================================================= */

export function filterTermsByLetter(
  terms: GlossaryTerm[],
  letter?: string | null,
): GlossaryTerm[] {
  const normalizedLetter =
    normalizeLetter(letter);

  if (normalizedLetter === "ALL") {
    return terms;
  }

  return terms.filter(
    (term) =>
      term.letter
        .trim()
        .toUpperCase() ===
      normalizedLetter,
  );
}

/* =========================================================
   CATEGORY FILTER
========================================================= */

export function filterTermsByCategory(
  terms: GlossaryTerm[],
  category?:
    | GlossaryCategory
    | "All"
    | string
    | null,
): GlossaryTerm[] {
  const normalizedCategory =
    normalizeSearchValue(category);

  if (
    !normalizedCategory ||
    normalizedCategory === "all"
  ) {
    return terms;
  }

  return terms.filter(
    (term) =>
      normalizeSearchValue(
        term.category,
      ) === normalizedCategory,
  );
}

/* =========================================================
   COMBINED FILTERING
========================================================= */

export function filterGlossaryTerms(
  terms: GlossaryTerm[],
  filters: GlossaryFilters,
): GlossaryTerm[] {
  let filteredTerms = [...terms];

  filteredTerms = searchGlossaryTerms(
    filteredTerms,
    filters.search,
  );

  filteredTerms = filterTermsByLetter(
    filteredTerms,
    filters.letter,
  );

  filteredTerms =
    filterTermsByCategory(
      filteredTerms,
      filters.category,
    );

  return filteredTerms.sort(
    (firstTerm, secondTerm) =>
      firstTerm.title.localeCompare(
        secondTerm.title,
        "en",
        {
          sensitivity: "base",
        },
      ),
  );
}

/* =========================================================
   PAGINATION
========================================================= */

export function paginateGlossaryTerms(
  terms: GlossaryTerm[],
  requestedPage: number,
  itemsPerPage: number,
): PaginatedGlossaryTerms {
  const safeItemsPerPage = Math.max(
    1,
    Math.floor(itemsPerPage),
  );

  const totalItems = terms.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalItems / safeItemsPerPage,
    ),
  );

  const currentPage = Math.min(
    Math.max(
      1,
      normalizePageNumber(
        requestedPage,
      ),
    ),
    totalPages,
  );

  const startIndex =
    (currentPage - 1) *
    safeItemsPerPage;

  const paginatedTerms = terms.slice(
    startIndex,
    startIndex + safeItemsPerPage,
  );

  const pagination: GlossaryPagination =
    {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage:
        safeItemsPerPage,
      hasPreviousPage:
        currentPage > 1,
      hasNextPage:
        currentPage < totalPages,
    };

  return {
    terms: paginatedTerms,
    pagination,
  };
}

/* =========================================================
   COMPLETE QUERY
========================================================= */

export function queryGlossaryTerms({
  terms,
  filters = {},
  page = 1,
  itemsPerPage = 12,
}: {
  terms: GlossaryTerm[];
  filters?: GlossaryFilters;
  page?: number;
  itemsPerPage?: number;
}): PaginatedGlossaryTerms {
  const filteredTerms =
    filterGlossaryTerms(
      terms,
      filters,
    );

  return paginateGlossaryTerms(
    filteredTerms,
    page,
    itemsPerPage,
  );
}

/* =========================================================
   ACTIVE LETTERS
========================================================= */

export function getActiveGlossaryLetters(
  terms: GlossaryTerm[],
): string[] {
  return Array.from(
    new Set(
      terms.map((term) =>
        term.letter
          .trim()
          .toUpperCase(),
      ),
    ),
  ).sort();
}

export function hasTermsForLetter(
  activeLetters: string[],
  letter: string,
): boolean {
  return activeLetters.includes(
    letter.trim().toUpperCase(),
  );
}

/* =========================================================
   CATEGORY COUNTS
========================================================= */

export interface GlossaryCategoryCount {
  category:
    | GlossaryCategory
    | "All";
  count: number;
}

export function getGlossaryCategoryCounts(
  terms: GlossaryTerm[],
): GlossaryCategoryCount[] {
  const categoryCounts = new Map<
    GlossaryCategory,
    number
  >();

  for (const term of terms) {
    const currentCount =
      categoryCounts.get(
        term.category,
      ) ?? 0;

    categoryCounts.set(
      term.category,
      currentCount + 1,
    );
  }

  const sortedCategories =
    Array.from(
      categoryCounts.entries(),
    )
      .sort(
        (
          [firstCategory],
          [secondCategory],
        ) =>
          firstCategory.localeCompare(
            secondCategory,
          ),
      )
      .map(
        ([category, count]) => ({
          category,
          count,
        }),
      );

  return [
    {
      category: "All",
      count: terms.length,
    },
    ...sortedCategories,
  ];
}

/* =========================================================
   CARD CONVERSION
========================================================= */

export function convertTermsToCards(
  terms: GlossaryTerm[],
): GlossaryCardData[] {
  return terms.map((term) => ({
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
  }));
}