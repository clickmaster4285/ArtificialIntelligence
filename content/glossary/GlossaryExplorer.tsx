"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  BookOpen,
  SearchX,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import type {
  GlossaryCardData,
  GlossaryPagination as GlossaryPaginationData,
} from "@/types/glossary";

import type {
  GlossaryCategoryCount,
} from "@/lib/glossary/glossary-filter";

import { cn } from "@/lib/utils";

import { GlossaryCard } from "./GlossaryCard";
import { GlossaryFilters } from "./GlossaryFilters";
import { GlossaryPagination } from "./GlossaryPagination";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryExplorerProps {
  terms: GlossaryCardData[];
  featuredTerms?: GlossaryCardData[];
  pagination: GlossaryPaginationData;
  activeLetters: string[];
  categories: GlossaryCategoryCount[];
  searchQuery?: string;
  activeLetter?: string;
  activeCategory?: string;
  featuredTitle?: string;
  allTermsTitle?: string;
}

/* =========================================================
   SECTION HEADING
========================================================= */

function ExplorerHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
              filter: "blur(8px)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="max-w-[760px]"
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8",
            "bg-[linear-gradient(90deg,#8b5cf6,transparent)]",
          )}
        />

        <span
          className={cn(
            "text-[0.62rem]",
            "font-semibold uppercase",
            "tracking-[0.2em]",
            "text-violet-300/75",
          )}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        className={cn(
          "text-[clamp(2.25rem,4.5vw,4.8rem)]",
          "font-semibold",
          "leading-[0.98]",
          "tracking-[-0.055em]",
          "text-white",
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4",
            "max-w-[650px]",
            "text-sm",
            "leading-[1.75]",
            "text-white/45",
            "sm:text-base",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function GlossaryEmptyState({
  searchQuery,
}: {
  searchQuery?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
              scale: 0.98,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.65,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={cn(
        "relative",
        "overflow-hidden",
        "rounded-3xl",
        "border border-white/[0.08]",
        "bg-white/[0.022]",
        "px-5 py-16",
        "text-center",
        "backdrop-blur-xl",
        "sm:px-8 sm:py-20",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute left-1/2 top-1/2",
          "h-72 w-72",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "rounded-full",
          "bg-violet-500/10",
          "blur-[100px]",
        )}
      />

      <div className="relative z-10">
        <span
          className={cn(
            "mx-auto grid",
            "h-14 w-14",
            "place-items-center",
            "rounded-2xl",
            "border border-violet-400/20",
            "bg-violet-400/[0.08]",
          )}
        >
          <SearchX
            aria-hidden="true"
            className="h-6 w-6 text-violet-300"
          />
        </span>

        <h3
          className={cn(
            "mt-5",
            "text-2xl",
            "font-semibold",
            "tracking-[-0.035em]",
            "text-white",
          )}
        >
          No matching terms found
        </h3>

        <p
          className={cn(
            "mx-auto mt-3",
            "max-w-lg",
            "text-sm",
            "leading-[1.7]",
            "text-white/42",
          )}
        >
          {searchQuery
            ? `We could not find a glossary term matching “${searchQuery}”. Try another search or reset the active filters.`
            : "No glossary terms match the selected filters. Try another letter or category."}
        </p>

        <Link
          href="/glossary"
          className={cn(
            "mt-6 inline-flex",
            "items-center gap-2",
            "rounded-xl",
            "bg-white",
            "px-5 py-3",
            "text-sm font-semibold",
            "text-black",
            "transition-all",
            "duration-300",
            "hover:bg-violet-200",
            "hover:shadow-[0_0_35px_rgba(196,181,253,0.22)]",
          )}
        >
          Reset glossary

          <BookOpen
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function GlossaryExplorer({
  terms,
  featuredTerms = [],
  pagination,
  activeLetters,
  categories,
  searchQuery = "",
  activeLetter = "ALL",
  activeCategory = "All",
  featuredTitle = "Essential concepts",
  allTermsTitle = "Explore the complete glossary",
}: GlossaryExplorerProps) {
  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    activeLetter.toUpperCase() !==
      "ALL" ||
    activeCategory.toLowerCase() !==
      "all";

  const shouldShowFeatured =
    !hasActiveFilters &&
    pagination.currentPage === 1 &&
    featuredTerms.length > 0;

  return (
    <section
      className={cn(
        "relative isolate",
        "overflow-hidden",
        "border-b border-white/[0.065]",
        "bg-[#050507]",
        "px-5 py-12",
        "sm:px-8 sm:py-16",
        "lg:px-12 lg:py-20",
      )}
    >
      {/* Background effects */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -left-64 top-40",
          "h-[500px] w-[500px]",
          "rounded-full",
          "bg-violet-500/[0.07]",
          "blur-[145px]",
        )}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -right-64 bottom-20",
          "h-[500px] w-[500px]",
          "rounded-full",
          "bg-cyan-400/[0.055]",
          "blur-[150px]",
        )}
      />

      <div
        className={cn(
          "relative z-10",
          "mx-auto",
          "max-w-[1440px]",
        )}
      >
        {/* Filters */}
        <GlossaryFilters
          activeLetter={activeLetter}
          activeCategory={
            activeCategory
          }
          searchQuery={searchQuery}
          activeLetters={activeLetters}
          categories={categories}
          totalResults={
            pagination.totalItems
          }
        />

        {/* Featured terms */}
        {shouldShowFeatured && (
          <div className="mt-14">
            <div
              className={cn(
                "flex flex-col",
                "justify-between",
                "gap-5",
                "sm:flex-row",
                "sm:items-end",
              )}
            >
              <ExplorerHeading
                eyebrow="Start here"
                title={featuredTitle}
                description="Foundational ideas shaping modern artificial intelligence systems."
              />

              <span
                className={cn(
                  "inline-flex",
                  "w-fit items-center gap-2",
                  "rounded-full",
                  "border border-cyan-300/15",
                  "bg-cyan-300/[0.055]",
                  "px-3 py-2",
                  "text-[0.62rem]",
                  "font-semibold uppercase",
                  "tracking-[0.14em]",
                  "text-cyan-200/60",
                )}
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />

                Curated concepts
              </span>
            </div>

            <div
              className={cn(
                "mt-7 grid",
                "grid-cols-1",
                "gap-4",
                "md:grid-cols-2",
              )}
            >
              {featuredTerms
                .slice(0, 4)
                .map(
                  (term, index) => (
                    <GlossaryCard
                      key={`featured-${term.slug}`}
                      term={term}
                      index={index}
                      featured
                    />
                  ),
                )}
            </div>
          </div>
        )}

        {/* Complete glossary heading */}
        <div
          className={cn(
            shouldShowFeatured
              ? "mt-20"
              : "mt-14",
          )}
        >
          <ExplorerHeading
            eyebrow={
              hasActiveFilters
                ? "Filtered results"
                : "Knowledge library"
            }
            title={
              hasActiveFilters
                ? `${pagination.totalItems} ${
                    pagination.totalItems ===
                    1
                      ? "term"
                      : "terms"
                  } discovered`
                : allTermsTitle
            }
            description={
              hasActiveFilters
                ? "Results update according to your active search, letter and category filters."
                : "Browse practical definitions covering the technologies, methods and ideas behind modern AI."
            }
          />
        </div>

        {/* Cards or empty state */}
        {terms.length > 0 ? (
          <>
            <div
              className={cn(
                "mt-8 grid",
                "grid-cols-1",
                "gap-4",
                "md:grid-cols-2",
                "xl:grid-cols-3",
              )}
            >
              {terms.map(
                (term, index) => (
                  <GlossaryCard
                    key={term.slug}
                    term={term}
                    index={index}
                  />
                ),
              )}
            </div>

            <GlossaryPagination
              pagination={pagination}
              searchQuery={searchQuery}
              activeLetter={
                activeLetter
              }
              activeCategory={
                activeCategory
              }
            />
          </>
        ) : (
          <div className="mt-8">
            <GlossaryEmptyState
              searchQuery={
                searchQuery
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}