"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import type {
  GlossaryArticleSection,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

import { GlossaryContentRenderer } from "./GlossaryContentRenderer";
import { GlossaryGradientText } from "../shared/GlossaryGradientText";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryArticleProps {
  sections: GlossaryArticleSection[];
  className?: string;
}

/* =========================================================
   ARTICLE SECTION
========================================================= */

function ArticleSection({
  section,
  index,
}: {
  section: GlossaryArticleSection;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={section.id}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 30,
              filter: "blur(10px)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: 0.75,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={cn(
        "relative",
        "scroll-mt-28",
        "border-b border-white/[0.07]",
        "pb-12",
        "last:border-b-0",
        "last:pb-0",
        "sm:pb-14",
      )}
    >
      {/* Vertical section line */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -left-5 top-0",
          "hidden h-full w-px",
          "bg-gradient-to-b",
          "from-violet-400/25",
          "via-white/[0.04]",
          "to-transparent",
          "lg:block",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [
                  0.45,
                  1,
                  0.45,
                ],
              }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Section heading */}
      <div className="relative">
        <div
          className={cn(
            "mb-4",
            "flex items-center gap-3",
          )}
        >
          <span
            className={cn(
              "font-mono",
              "text-[0.6rem]",
              "font-semibold",
              "tracking-[0.14em]",
              "text-violet-300/65",
            )}
          >
            {String(index + 1).padStart(
              2,
              "0",
            )}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              "bg-[linear-gradient(90deg,#8b5cf6,transparent)]",
            )}
          />

          {section.eyebrow && (
            <span
              className={cn(
                "text-[0.62rem]",
                "font-semibold uppercase",
                "tracking-[0.18em]",
                "text-white/30",
              )}
            >
              {section.eyebrow}
            </span>
          )}
        </div>

        <h2
          className={cn(
            "max-w-[850px]",
            "text-[clamp(2rem,4vw,4rem)]",
            "font-semibold",
            "leading-[1.02]",
            "text-white",
          )}
        >
          <GlossaryGradientText
            text={section.title}
            highlightWordCount={2}
          />
        </h2>

        {section.description && (
          <p
            className={cn(
              "mt-4",
              "max-w-[760px]",
              "text-sm",
              "leading-[1.75]",
              "text-white/45",
              "sm:text-base",
            )}
          >
            {section.description}
          </p>
        )}
      </div>

      {/* Section content */}
      <div className="mt-7">
        <GlossaryContentRenderer
          blocks={section.content}
        />
      </div>
    </motion.section>
  );
}

/* =========================================================
   MAIN ARTICLE
========================================================= */

export function GlossaryArticle({
  sections,
  className,
}: GlossaryArticleProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <article
      className={cn(
        "space-y-12",
        "sm:space-y-14",
        className,
      )}
    >
      {sections.map(
        (section, index) => (
          <ArticleSection
            key={section.id}
            section={section}
            index={index}
          />
        ),
      )}
    </article>
  );
}
