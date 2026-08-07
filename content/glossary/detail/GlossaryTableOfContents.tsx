"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUp,
  ListTree,
} from "lucide-react";

import {
  useEffect,
  useState,
  type MouseEvent,
} from "react";

import type {
  GlossaryArticleSection,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryTableOfContentsProps {
  sections: GlossaryArticleSection[];
  className?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

export function GlossaryTableOfContents({
  sections,
  className,
}: GlossaryTableOfContentsProps) {
  const reduceMotion = useReducedMotion();

  const [activeSection, setActiveSection] =
    useState<string>(
      sections[0]?.id ?? "",
    );

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const sectionElements =
      sections
        .map((section) =>
          document.getElementById(
            section.id,
          ),
        )
        .filter(
          (
            element,
          ): element is HTMLElement =>
            Boolean(element),
        );

    if (
      sectionElements.length === 0
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting,
              )
              .sort(
                (
                  firstEntry,
                  secondEntry,
                ) =>
                  secondEntry
                    .intersectionRatio -
                  firstEntry
                    .intersectionRatio,
              );

          const mostVisibleSection =
            visibleEntries[0];

          if (
            mostVisibleSection?.target
              .id
          ) {
            setActiveSection(
              mostVisibleSection.target
                .id,
            );
          }
        },
        {
          rootMargin:
            "-18% 0px -58% 0px",
          threshold: [
            0,
            0.1,
            0.25,
            0.5,
            0.75,
          ],
        },
      );

    sectionElements.forEach(
      (sectionElement) => {
        observer.observe(
          sectionElement,
        );
      },
    );

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  function handleSectionClick(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault();

    const targetSection =
      document.getElementById(
        sectionId,
      );

    if (!targetSection) {
      return;
    }

    setActiveSection(sectionId);

    targetSection.scrollIntoView({
      behavior: reduceMotion
        ? "auto"
        : "smooth",
      block: "start",
    });

    window.history.replaceState(
      null,
      "",
      `#${sectionId}`,
    );
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion
        ? "auto"
        : "smooth",
    });
  }

  if (sections.length === 0) {
    return null;
  }

  return (
    <motion.aside
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: -24,
              filter: "blur(8px)",
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
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
        "relative",
        "overflow-hidden",
        "rounded-3xl",
        "border border-white/[0.08]",
        "bg-white/[0.025]",
        "p-4",
        "shadow-[0_30px_100px_-65px_rgba(139,92,246,0.75)]",
        "backdrop-blur-2xl",
        "sm:p-5",
        className,
      )}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -left-16 -top-16",
          "h-44 w-44",
          "rounded-full",
          "bg-violet-500/10",
          "blur-[70px]",
        )}
      />

      {/* Heading */}
      <div
        className={cn(
          "relative z-10",
          "flex items-center gap-3",
          "border-b border-white/[0.07]",
          "pb-4",
        )}
      >
        <span
          className={cn(
            "grid h-9 w-9",
            "place-items-center",
            "rounded-xl",
            "border border-violet-400/15",
            "bg-violet-400/[0.07]",
          )}
        >
          <ListTree
            aria-hidden="true"
            className="h-4 w-4 text-violet-300"
          />
        </span>

        <div>
          <h2
            className={cn(
              "text-sm font-semibold",
              "text-white/82",
            )}
          >
            In this article
          </h2>

          <p
            className={cn(
              "mt-0.5",
              "text-[0.64rem]",
              "text-white/30",
            )}
          >
            {sections.length}{" "}
            {sections.length === 1
              ? "section"
              : "sections"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Article table of contents"
        className="relative z-10 mt-3"
      >
        <ol className="space-y-1">
          {sections.map(
            (section, index) => {
              const isActive =
                activeSection ===
                section.id;

              return (
                <li
                  key={section.id}
                  className="relative"
                >
                  <a
                    href={`#${section.id}`}
                    onClick={(event) =>
                      handleSectionClick(
                        event,
                        section.id,
                      )
                    }
                    aria-current={
                      isActive
                        ? "location"
                        : undefined
                    }
                    className={cn(
                      "group/link relative",
                      "flex items-start",
                      "gap-3",
                      "overflow-hidden",
                      "rounded-xl",
                      "px-3 py-3",
                      "transition-all",
                      "duration-300",
                      isActive
                        ? [
                            "bg-violet-400/[0.09]",
                            "text-white",
                          ].join(" ")
                        : [
                            "text-white/38",
                            "hover:bg-white/[0.035]",
                            "hover:text-white/70",
                          ].join(" "),
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-toc-background"
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0",
                          "border border-violet-400/15",
                          "rounded-xl",
                          "bg-[linear-gradient(90deg,rgba(139,92,246,0.1),transparent)]",
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 28,
                        }}
                      />
                    )}

                    <span
                      className={cn(
                        "relative z-10",
                        "mt-0.5",
                        "shrink-0",
                        "font-mono",
                        "text-[0.57rem]",
                        "tracking-[0.1em]",
                        isActive
                          ? "text-violet-300"
                          : "text-white/18",
                      )}
                    >
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "relative z-10",
                        "text-xs",
                        "font-medium",
                        "leading-[1.5]",
                        "tracking-[-0.01em]",
                      )}
                    >
                      {section.title}
                    </span>
                  </a>
                </li>
              );
            },
          )}
        </ol>
      </nav>

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          "group/top relative z-10",
          "mt-4 flex w-full",
          "items-center",
          "justify-between",
          "rounded-xl",
          "border border-white/[0.07]",
          "bg-black/20",
          "px-3 py-3",
          "text-xs",
          "text-white/32",
          "transition-all",
          "duration-300",
          "hover:border-cyan-300/20",
          "hover:bg-cyan-300/[0.05]",
          "hover:text-white/65",
        )}
      >
        <span>Back to top</span>

        <ArrowUp
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5",
            "transition-transform",
            "group-hover/top:-translate-y-0.5",
          )}
        />
      </button>
    </motion.aside>
  );
}