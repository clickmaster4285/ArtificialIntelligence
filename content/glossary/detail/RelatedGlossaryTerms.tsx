"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  Network,
} from "lucide-react";

import Link from "next/link";

import type {
  GlossaryCardData,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface RelatedGlossaryTermsProps {
  terms: GlossaryCardData[];
  title?: string;
  className?: string;
}

/* =========================================================
   RELATED TERM CARD
========================================================= */

function RelatedTermCard({
  term,
  index,
}: {
  term: GlossaryCardData;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
              scale: 0.98,
              filter: "blur(7px)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        delay: Math.min(
          index * 0.07,
          0.28,
        ),
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="h-full"
    >
      <Link
        href={`/glossary/${term.slug}`}
        className={cn(
          "group/term relative",
          "flex h-full",
          "min-h-[230px]",
          "flex-col",
          "overflow-hidden",
          "rounded-2xl",
          "border border-white/[0.075]",
          "bg-white/[0.022]",
          "p-5",
          "shadow-[0_26px_90px_-60px_rgba(139,92,246,0.7)]",
          "backdrop-blur-xl",
          "transition-all",
          "duration-400",
          "hover:-translate-y-1",
          "hover:border-violet-400/25",
          "hover:bg-violet-400/[0.045]",
          "hover:shadow-[0_34px_100px_-52px_rgba(139,92,246,0.8)]",
        )}
      >
        {/* Top accent */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute inset-x-5 top-0",
            "h-px",
            "origin-left",
            "scale-x-0",
            "bg-[linear-gradient(90deg,transparent,#a78bfa,#22d3ee,transparent)]",
            "opacity-0",
            "transition-all",
            "duration-500",
            "group-hover/term:scale-x-100",
            "group-hover/term:opacity-70",
          )}
        />

        {/* Decorative letter */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute -right-2 top-2",
            "select-none",
            "text-[7.5rem]",
            "font-semibold",
            "leading-none",
            "tracking-[-0.08em]",
            "text-white/[0.025]",
            "transition-colors",
            "duration-500",
            "group-hover/term:text-violet-300/[0.055]",
          )}
        >
          {term.letter}
        </span>

        {/* Category */}
        <div
          className={cn(
            "relative z-10",
            "flex items-start",
            "justify-between",
            "gap-4",
          )}
        >
          <span
            className={cn(
              "rounded-full",
              "border border-white/[0.07]",
              "bg-white/[0.025]",
              "px-2.5 py-1",
              "text-[0.56rem]",
              "font-semibold uppercase",
              "tracking-[0.13em]",
              "text-white/35",
              "transition-all",
              "group-hover/term:border-violet-400/18",
              "group-hover/term:text-violet-100/65",
            )}
          >
            {term.category}
          </span>

          <span
            className={cn(
              "grid h-8 w-8",
              "shrink-0",
              "place-items-center",
              "rounded-full",
              "border border-white/[0.07]",
              "bg-white/[0.02]",
              "text-white/25",
              "transition-all",
              "duration-300",
              "group-hover/term:border-cyan-300/20",
              "group-hover/term:bg-cyan-300/[0.06]",
              "group-hover/term:text-cyan-100",
            )}
          >
            <ArrowRight
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5",
                "transition-transform",
                "group-hover/term:translate-x-0.5",
              )}
            />
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-auto pt-10">
          {term.abbreviation && (
            <span
              className={cn(
                "mb-2 block",
                "font-mono",
                "text-[0.62rem]",
                "font-semibold uppercase",
                "tracking-[0.15em]",
                "text-cyan-300/55",
              )}
            >
              {term.abbreviation}
            </span>
          )}

          <h3
            className={cn(
              "text-lg",
              "font-semibold",
              "leading-[1.15]",
              "tracking-[-0.035em]",
              "text-white/82",
              "transition-colors",
              "group-hover/term:text-white",
              "sm:text-xl",
            )}
          >
            {term.shortTitle ??
              term.title}
          </h3>

          <p
            className={cn(
              "mt-3",
              "line-clamp-2",
              "text-sm",
              "leading-[1.65]",
              "text-white/38",
              "transition-colors",
              "group-hover/term:text-white/54",
            )}
          >
            {term.shortDefinition}
          </p>
        </div>

        {/* Bottom glow */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute inset-x-0 bottom-0",
            "h-1/2",
            "bg-[linear-gradient(to_top,rgba(139,92,246,0.09),transparent)]",
            "opacity-0",
            "transition-opacity",
            "duration-500",
            "group-hover/term:opacity-100",
          )}
        />
      </Link>
    </motion.article>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function RelatedGlossaryTerms({
  terms,
  title = "Continue exploring",
  className,
}: RelatedGlossaryTermsProps) {
  const reduceMotion = useReducedMotion();

  if (terms.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "relative",
        className,
      )}
    >
      {/* Heading */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 22,
                filter: "blur(7px)",
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.3,
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
        className={cn(
          "flex flex-col",
          "justify-between",
          "gap-4",
          "sm:flex-row",
          "sm:items-end",
        )}
      >
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span
              className={cn(
                "grid h-8 w-8",
                "place-items-center",
                "rounded-lg",
                "border border-violet-400/15",
                "bg-violet-400/[0.07]",
              )}
            >
              <Network
                aria-hidden="true"
                className="h-3.5 w-3.5 text-violet-300"
              />
            </span>

            <span
              className={cn(
                "text-[0.62rem]",
                "font-semibold uppercase",
                "tracking-[0.18em]",
                "text-violet-300/65",
              )}
            >
              Connected concepts
            </span>
          </div>

          <h2
            className={cn(
              "text-[clamp(2rem,4vw,4rem)]",
              "font-semibold",
              "leading-[1]",
              "tracking-[-0.05em]",
              "text-white",
            )}
          >
            {title}
          </h2>
        </div>

        <Link
          href="/glossary"
          className={cn(
            "group/all",
            "inline-flex w-fit",
            "items-center gap-2",
            "rounded-full",
            "border border-white/[0.08]",
            "bg-white/[0.025]",
            "px-4 py-2.5",
            "text-xs",
            "text-white/45",
            "transition-all",
            "duration-300",
            "hover:border-violet-400/25",
            "hover:bg-violet-400/[0.07]",
            "hover:text-white/75",
          )}
        >
          View all terms

          <ArrowRight
            aria-hidden="true"
            className={cn(
              "h-3.5 w-3.5",
              "transition-transform",
              "group-hover/all:translate-x-0.5",
            )}
          />
        </Link>
      </motion.div>

      {/* Cards */}
      <div
        className={cn(
          "mt-7 grid",
          "grid-cols-1",
          "gap-4",
          "md:grid-cols-2",
          "xl:grid-cols-3",
        )}
      >
        {terms
          .slice(0, 6)
          .map((term, index) => (
            <RelatedTermCard
              key={term.slug}
              term={term}
              index={index}
            />
          ))}
      </div>
    </section>
  );
}