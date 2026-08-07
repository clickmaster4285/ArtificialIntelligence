"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

export interface ScrollNavigationItem {
  id: string;
  label: string;
}

interface PageScrollIndicatorProps {
  sections?: ScrollNavigationItem[];
  className?: string;
  showNavigation?: boolean;
}

/* =========================================================
   LABEL HELPER
========================================================= */

function truncateLabel(
  label: string,
  maximumLength = 28,
): string {
  if (label.length <= maximumLength) {
    return label;
  }

  return `${label.slice(
    0,
    maximumLength - 1,
  )}…`;
}

/* =========================================================
   COMPONENT
========================================================= */

export function PageScrollIndicator({
  sections = [],
  className,
  showNavigation = true,
}: PageScrollIndicatorProps) {
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 130,
      damping: 28,
      mass: 0.3,
    },
  );

  const navigationItems = useMemo(
    () =>
      sections.filter(
        (section) =>
          section.id.trim().length > 0 &&
          section.label.trim().length > 0,
      ),
    [sections],
  );

  const [activeSection, setActiveSection] =
    useState<string>(
      navigationItems[0]?.id ?? "",
    );

  /*
   * Observe every section and update the active navigation item.
   *
   * setState is called from the observer callback—not directly
   * inside the effect.
   */
  useEffect(() => {
    if (
      !showNavigation ||
      navigationItems.length === 0
    ) {
      return;
    }

    const visibleSections = new Map<
      string,
      number
    >();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(
              entry.target.id,
              entry.intersectionRatio,
            );
          } else {
            visibleSections.delete(
              entry.target.id,
            );
          }
        });

        const mostVisibleSection = [
          ...visibleSections.entries(),
        ].sort(
          (first, second) =>
            second[1] - first[1],
        )[0];

        if (mostVisibleSection) {
          setActiveSection(
            mostVisibleSection[0],
          );
        }
      },
      {
        root: null,

        /*
         * Current section becomes active around
         * the middle area of the viewport.
         */
        rootMargin: "-28% 0px -52% 0px",

        threshold: [
          0,
          0.15,
          0.3,
          0.5,
          0.75,
          1,
        ],
      },
    );

    navigationItems.forEach((item) => {
      const element =
        document.getElementById(item.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      visibleSections.clear();
    };
  }, [
    navigationItems,
    showNavigation,
  ]);

  const scrollToSection = (
    sectionId: string,
  ) => {
    const element =
      document.getElementById(sectionId);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: reduceMotion
        ? "auto"
        : "smooth",

      block: "start",
    });
  };

  return (
    <>
      {/* ===============================================
          TOP PROGRESS BAR
      =============================================== */}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed",
          "inset-x-0 top-0 z-[100]",
          "h-[3px]",
          "bg-white/[0.035]",
          className,
        )}
      >
        <motion.div
          className={cn(
            "h-full w-full origin-left",
            "bg-[linear-gradient(90deg,#8b5cf6_0%,#22d3ee_52%,#e879f9_100%)]",
            "shadow-[0_0_25px_rgba(139,92,246,0.8)]",
          )}
          style={{
            scaleX: reduceMotion
              ? scrollYProgress
              : smoothProgress,
          }}
        />

        <motion.div
          className={cn(
            "absolute right-0 top-1/2",
            "h-3 w-3",
            "-translate-y-1/2",
            "rounded-full",
            "bg-cyan-300",
            "shadow-[0_0_20px_5px_rgba(34,211,238,0.55)]",
          )}
          style={{
            left: reduceMotion
              ? scrollYProgress
              : smoothProgress,
          }}
        />
      </div>

      {/* ===============================================
          DESKTOP SECTION NAVIGATION
      =============================================== */}

      {showNavigation &&
        navigationItems.length > 1 && (
          <nav
            aria-label="Page sections"
            className={cn(
              "fixed right-5 top-1/2",
              "z-50 hidden",
              "-translate-y-1/2",
              "xl:block",
            )}
          >
            <div
              className={cn(
                "relative flex flex-col",
                "gap-1 rounded-2xl",
                "border border-white/[0.08]",
                "bg-black/45 p-2",
                "shadow-2xl",
                "backdrop-blur-2xl",
              )}
            >
              {navigationItems.map(
                (item, index) => {
                  const isActive =
                    activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          item.id,
                        )
                      }
                      aria-label={`Go to ${item.label}`}
                      aria-current={
                        isActive
                          ? "location"
                          : undefined
                      }
                      className={cn(
                        "group/navigation",
                        "relative flex h-9",
                        "items-center",
                        "justify-end gap-3",
                        "rounded-xl px-2",
                        "text-right",
                        "outline-none",
                        "transition-colors",
                        "focus-visible:ring-2",
                        "focus-visible:ring-violet-300",
                      )}
                    >
                      {/* Hover/active label */}
                      <span
                        className={cn(
                          "pointer-events-none",
                          "absolute right-8",
                          "whitespace-nowrap",
                          "rounded-lg",
                          "border border-white/[0.08]",
                          "bg-black/80",
                          "px-3 py-2",
                          "text-[0.68rem]",
                          "font-medium",
                          "tracking-wide",
                          "text-white/80",
                          "opacity-0",
                          "shadow-xl",
                          "backdrop-blur-xl",
                          "transition-all",
                          "duration-300",
                          "translate-x-2",
                          "group-hover/navigation:translate-x-0",
                          "group-hover/navigation:opacity-100",
                          "group-focus-visible/navigation:translate-x-0",
                          "group-focus-visible/navigation:opacity-100",
                          isActive &&
                            "text-violet-200",
                        )}
                      >
                        <span className="mr-2 font-mono text-white/35">
                          {String(
                            index + 1,
                          ).padStart(2, "0")}
                        </span>

                        {truncateLabel(
                          item.label,
                        )}
                      </span>

                      {/* Navigation dot */}
                      <span
                        className={cn(
                          "relative block",
                          "h-2 w-2",
                          "rounded-full",
                          "border border-white/30",
                          "bg-white/15",
                          "transition-all",
                          "duration-300",
                          isActive
                            ? [
                                "scale-125",
                                "border-violet-200",
                                "bg-violet-300",
                                "shadow-[0_0_18px_4px_rgba(167,139,250,0.55)]",
                              ].join(" ")
                            : [
                                "group-hover/navigation:scale-125",
                                "group-hover/navigation:border-white/70",
                                "group-hover/navigation:bg-white/60",
                              ].join(" "),
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-section-ring"
                            className={cn(
                              "absolute",
                              "-inset-2",
                              "rounded-full",
                              "border",
                              "border-violet-300/35",
                            )}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 28,
                            }}
                          />
                        )}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </nav>
        )}
    </>
  );
}