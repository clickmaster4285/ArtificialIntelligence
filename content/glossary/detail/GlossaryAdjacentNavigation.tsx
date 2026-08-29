"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import type {
  GlossaryCardData,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryAdjacentNavigationProps {
  previous?: GlossaryCardData;
  next?: GlossaryCardData;
  className?: string;
}

/* =========================================================
   NAVIGATION CARD
========================================================= */

function NavigationCard({
  term,
  direction,
}: {
  term: GlossaryCardData;
  direction: "previous" | "next";
}) {
  const isPrevious =
    direction === "previous";

  return (
    <Link
      href={`/glossary/${term.slug}`}
      aria-label={`${isPrevious ? "Previous" : "Next"} glossary term: ${term.title}`}
      className={cn(
        "group/navigation relative",
        "flex min-h-[170px]",
        "flex-col",
        "overflow-hidden",
        "rounded-2xl",
        "border border-white/[0.075]",
        "bg-white/[0.022]",
        "p-5",
        "transition-all",
        "duration-400",
        "hover:-translate-y-1",
        isPrevious
          ? [
              "hover:border-violet-400/25",
              "hover:bg-violet-400/[0.04]",
              "hover:shadow-[0_30px_90px_-55px_rgba(139,92,246,0.75)]",
            ].join(" ")
          : [
              "hover:border-cyan-300/25",
              "hover:bg-cyan-300/[0.035]",
              "hover:shadow-[0_30px_90px_-55px_rgba(34,211,238,0.6)]",
            ].join(" "),
      )}
    >
      {/* Background letter */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute top-1/2",
          "-translate-y-1/2",
          "select-none",
          "text-[8rem]",
          "font-semibold",
          "leading-none",
          "tracking-[-0.08em]",
          "text-white/[0.02]",
          "transition-colors",
          isPrevious
            ? [
                "-right-2",
                "group-hover/navigation:text-violet-300/[0.05]",
              ].join(" ")
            : [
                "-left-2",
                "group-hover/navigation:text-cyan-300/[0.045]",
              ].join(" "),
        )}
      >
        {term.letter}
      </span>

      {/* Accent */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-x-5 top-0",
          "h-px",
          "origin-left",
          "scale-x-0",
          "opacity-0",
          "transition-all",
          "duration-500",
          "group-hover/navigation:scale-x-100",
          "group-hover/navigation:opacity-70",
          isPrevious
            ? "bg-[linear-gradient(90deg,transparent,#a78bfa,transparent)]"
            : "bg-[linear-gradient(90deg,transparent,#22d3ee,transparent)]",
        )}
      />

      {/* Direction */}
      <div
        className={cn(
          "relative z-10",
          "flex items-center gap-2",
          isPrevious
            ? "justify-start"
            : "justify-end",
        )}
      >
        {isPrevious && (
          <ArrowLeft
            aria-hidden="true"
            className={cn(
              "h-3.5 w-3.5",
              "text-violet-300/55",
              "transition-transform",
              "group-hover/navigation:-translate-x-1",
            )}
          />
        )}

        <span
          className={cn(
            "text-[0.6rem]",
            "font-semibold uppercase",
            "tracking-[0.16em]",
            isPrevious
              ? "text-violet-300/55"
              : "text-cyan-300/55",
          )}
        >
          {isPrevious
            ? "Previous term"
            : "Next term"}
        </span>

        {!isPrevious && (
          <ArrowRight
            aria-hidden="true"
            className={cn(
              "h-3.5 w-3.5",
              "text-cyan-300/55",
              "transition-transform",
              "group-hover/navigation:translate-x-1",
            )}
          />
        )}
      </div>

      {/* Term information */}
      <div
        className={cn(
          "relative z-10",
          "mt-auto pt-8",
          !isPrevious &&
            "text-right",
        )}
      >
        {term.abbreviation && (
          <span
            className={cn(
              "mb-1.5 block",
              "font-mono",
              "text-[0.58rem]",
              "font-semibold uppercase",
              "tracking-[0.14em]",
              "text-white/25",
            )}
          >
            {term.abbreviation}
          </span>
        )}

        <h3
          className={cn(
            "text-lg",
            "font-semibold",
            "leading-[1.2]",
            "tracking-[-0.03em]",
            "text-white/68",
            "transition-colors",
            "group-hover/navigation:text-white",
            "sm:text-xl",
          )}
        >
          {term.shortTitle ??
            term.title}
        </h3>

        <span
          className={cn(
            "mt-2 block",
            "text-[0.62rem]",
            "text-white/25",
          )}
        >
          {term.category}
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function GlossaryAdjacentNavigation({
  previous,
  next,
  className,
}: GlossaryAdjacentNavigationProps) {
  const reduceMotion = useReducedMotion();

  if (!previous && !next) {
    return null;
  }

  return (
    <motion.nav
      aria-label="Adjacent glossary terms"
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
        amount: 0.2,
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
        "grid grid-cols-1",
        "gap-4",
        "sm:grid-cols-2",
        className,
      )}
    >
      {previous ? (
        <NavigationCard
          term={previous}
          direction="previous"
        />
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <NavigationCard
          term={next}
          direction="next"
        />
      ) : (
        <div className="hidden sm:block" />
      )}
    </motion.nav>
  );
}