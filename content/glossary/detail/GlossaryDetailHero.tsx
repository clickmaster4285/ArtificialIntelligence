"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import {
  useRef,
} from "react";

import type {
  GlossaryTerm,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

import { GlossaryBackground } from "../shared/GlossaryBackground";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryDetailHeroProps {
  term: GlossaryTerm;
}

/* =========================================================
   HELPERS
========================================================= */

function formatGlossaryDate(
  dateValue?: string,
): string | null {
  if (!dateValue) {
    return null;
  }

  const date = new Date(
    `${dateValue}T00:00:00.000Z`,
  );

  if (
    Number.isNaN(date.getTime())
  ) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(date);
}

/* =========================================================
   COMPONENT
========================================================= */

export function GlossaryDetailHero({
  term,
}: GlossaryDetailHeroProps) {
  const heroRef =
    useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: [
      "start start",
      "end start",
    ],
  });

  const rawContentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 100],
  );

  const contentY = useSpring(
    rawContentY,
    {
      stiffness: 90,
      damping: 26,
    },
  );

  const contentOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.78, 1],
      [1, 0.65, 0],
    );

  const formattedDate =
    formatGlossaryDate(
      term.updatedAt ??
        term.publishedAt,
    );

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative isolate",
        "overflow-hidden",
        "border-b border-white/[0.07]",
        "bg-[#030305]",
      )}
    >
      <GlossaryBackground
        intensity="strong"
        className="z-[-4]"
      />

      {/* Top line */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-x-0 top-0",
          "h-px",
          "bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.75),rgba(34,211,238,0.65),transparent)]",
        )}
      />

      {/* Large decorative letter */}
      <motion.span
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -right-[0.08em]",
          "top-1/2",
          "-translate-y-1/2",
          "select-none",
          "text-[clamp(18rem,38vw,42rem)]",
          "font-semibold",
          "leading-none",
          "tracking-[-0.1em]",
          "text-white/[0.018]",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                y: [
                  "-50%",
                  "-52%",
                  "-48%",
                  "-50%",
                ],
                rotate: [
                  0,
                  1.5,
                  -1,
                  0,
                ],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {term.letter}
      </motion.span>

      <motion.div
        style={
          reduceMotion
            ? undefined
            : {
                y: contentY,
                opacity:
                  contentOpacity,
              }
        }
        className={cn(
          "relative z-10",
          "mx-auto w-full",
          "max-w-[1500px]",
          "px-5 pb-14 pt-8",
          "sm:px-8 sm:pb-16",
          "sm:pt-10",
          "lg:px-12 lg:pb-20",
          "lg:pt-12",
          "xl:px-16",
        )}
      >
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -20,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
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
            "flex flex-wrap",
            "items-center gap-2",
            "text-xs",
            "text-white/30",
          )}
        >
          <Link
            href="/glossary"
            className={cn(
              "group/back",
              "inline-flex",
              "items-center gap-2",
              "transition-colors",
              "hover:text-white/75",
            )}
          >
            <ArrowLeft
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5",
                "transition-transform",
                "group-hover/back:-translate-x-0.5",
              )}
            />

            AI Glossary
          </Link>

          <span
            aria-hidden="true"
            className="text-white/15"
          >
            /
          </span>

          <span
            aria-current="page"
            className="text-white/48"
          >
            {term.shortTitle ??
              term.title}
          </span>
        </motion.nav>

        <div
          className={cn(
            "mt-12 grid",
            "grid-cols-1",
            "gap-10",
            "lg:grid-cols-[minmax(0,1fr)_310px]",
            "lg:items-end",
            "lg:gap-14",
          )}
        >
          {/* Main content */}
          <div>
            {/* Category and abbreviation */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.08,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="flex flex-wrap items-center gap-2"
            >
              <span
                className={cn(
                  "rounded-full",
                  "border border-violet-400/20",
                  "bg-violet-400/[0.08]",
                  "px-3 py-1.5",
                  "text-[0.62rem]",
                  "font-semibold uppercase",
                  "tracking-[0.15em]",
                  "text-violet-200/75",
                )}
              >
                {term.category}
              </span>

              {term.abbreviation && (
                <span
                  className={cn(
                    "rounded-full",
                    "border border-cyan-300/15",
                    "bg-cyan-300/[0.06]",
                    "px-3 py-1.5",
                    "font-mono",
                    "text-[0.62rem]",
                    "font-semibold uppercase",
                    "tracking-[0.15em]",
                    "text-cyan-200/70",
                  )}
                >
                  {term.abbreviation}
                </span>
              )}

              {term.featured && (
                <span
                  className={cn(
                    "inline-flex",
                    "items-center gap-1.5",
                    "rounded-full",
                    "border border-white/[0.07]",
                    "bg-white/[0.025]",
                    "px-3 py-1.5",
                    "text-[0.62rem]",
                    "font-semibold uppercase",
                    "tracking-[0.14em]",
                    "text-white/45",
                  )}
                >
                  <Sparkles
                    aria-hidden="true"
                    className="h-3 w-3 text-violet-300"
                  />

                  Essential concept
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 32,
                      filter:
                        "blur(14px)",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.9,
                delay: 0.14,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className={cn(
                "mt-5",
                "max-w-[1050px]",
                "text-[clamp(3rem,7vw,7.4rem)]",
                "font-semibold",
                "leading-[0.88]",
                "tracking-[-0.07em]",
                "text-white",
              )}
            >
              {term.title}
            </motion.h1>

            {/* Introduction */}
            {term.introduction && (
              <motion.p
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 22,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.28,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className={cn(
                  "mt-6",
                  "max-w-[820px]",
                  "text-base",
                  "leading-[1.8]",
                  "text-white/52",
                  "sm:text-lg",
                )}
              >
                {term.introduction}
              </motion.p>
            )}
          </div>

          {/* Article metadata */}
          <motion.aside
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 28,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
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
              "border border-white/[0.09]",
              "bg-white/[0.03]",
              "p-5",
              "shadow-[0_30px_100px_-55px_rgba(139,92,246,0.7)]",
              "backdrop-blur-2xl",
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none",
                "absolute -right-16 -top-16",
                "h-40 w-40",
                "rounded-full",
                "bg-violet-500/15",
                "blur-[65px]",
              )}
            />

            <span
              className={cn(
                "relative",
                "text-[0.6rem]",
                "font-semibold uppercase",
                "tracking-[0.18em]",
                "text-white/30",
              )}
            >
              Knowledge entry
            </span>

            <div
              className={cn(
                "relative mt-4",
                "grid gap-3",
              )}
            >
              <div
                className={cn(
                  "flex items-center",
                  "gap-3",
                  "rounded-xl",
                  "border border-white/[0.06]",
                  "bg-black/20",
                  "px-3 py-3",
                )}
              >
                <BookOpen
                  aria-hidden="true"
                  className="h-4 w-4 text-violet-300"
                />

                <div>
                  <span className="block text-[0.56rem] uppercase tracking-[0.13em] text-white/25">
                    Category
                  </span>

                  <strong className="mt-0.5 block text-xs font-medium text-white/68">
                    {term.category}
                  </strong>
                </div>
              </div>

              <div
                className={cn(
                  "flex items-center",
                  "gap-3",
                  "rounded-xl",
                  "border border-white/[0.06]",
                  "bg-black/20",
                  "px-3 py-3",
                )}
              >
                <Clock3
                  aria-hidden="true"
                  className="h-4 w-4 text-cyan-300"
                />

                <div>
                  <span className="block text-[0.56rem] uppercase tracking-[0.13em] text-white/25">
                    Reading time
                  </span>

                  <strong className="mt-0.5 block text-xs font-medium text-white/68">
                    {term.readingTime ??
                      "Quick read"}
                  </strong>
                </div>
              </div>

              {formattedDate && (
                <div
                  className={cn(
                    "flex items-center",
                    "gap-3",
                    "rounded-xl",
                    "border border-white/[0.06]",
                    "bg-black/20",
                    "px-3 py-3",
                  )}
                >
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4 text-fuchsia-300"
                  />

                  <div>
                    <span className="block text-[0.56rem] uppercase tracking-[0.13em] text-white/25">
                      Last updated
                    </span>

                    <strong className="mt-0.5 block text-xs font-medium text-white/68">
                      {formattedDate}
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </div>

        {/* Definition card */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                  scale: 0.985,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.85,
            delay: 0.4,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className={cn(
            "relative mt-10",
            "overflow-hidden",
            "rounded-3xl",
            "border border-violet-400/20",
            "bg-[linear-gradient(110deg,rgba(139,92,246,0.12),rgba(255,255,255,0.025),rgba(34,211,238,0.06))]",
            "p-5",
            "shadow-[0_35px_110px_-55px_rgba(139,92,246,0.75)]",
            "backdrop-blur-2xl",
            "sm:p-7",
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-x-8 top-0",
              "h-px",
              "bg-[linear-gradient(90deg,transparent,#a78bfa,#22d3ee,transparent)]",
              "opacity-75",
            )}
          />

          <span
            className={cn(
              "text-[0.62rem]",
              "font-semibold uppercase",
              "tracking-[0.19em]",
              "text-violet-200/65",
            )}
          >
            Definition
          </span>

          <p
            className={cn(
              "mt-3",
              "max-w-[1200px]",
              "text-lg",
              "font-medium",
              "leading-[1.55]",
              "tracking-[-0.025em]",
              "text-white/82",
              "sm:text-xl",
              "lg:text-2xl",
            )}
          >
            {term.definition}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}