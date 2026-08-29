"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import type {
  PointerEvent,
} from "react";

import type {
  GlossaryCardData,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryCardProps {
  term: GlossaryCardData;
  index?: number;
  featured?: boolean;
  className?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

export function GlossaryCard({
  term,
  index = 0,
  featured = false,
  className,
}: GlossaryCardProps) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const normalizedX = useMotionValue(0);
  const normalizedY = useMotionValue(0);

  const smoothX = useSpring(
    normalizedX,
    {
      stiffness: 170,
      damping: 22,
      mass: 0.45,
    },
  );

  const smoothY = useSpring(
    normalizedY,
    {
      stiffness: 170,
      damping: 22,
      mass: 0.45,
    },
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-4, 4],
  );

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [4, -4],
  );

  function handlePointerMove(
    event: PointerEvent<HTMLElement>,
  ) {
    if (
      reduceMotion ||
      event.pointerType === "touch"
    ) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const localX =
      event.clientX - bounds.left;

    const localY =
      event.clientY - bounds.top;

    pointerX.set(localX);
    pointerY.set(localY);

    normalizedX.set(
      localX / bounds.width - 0.5,
    );

    normalizedY.set(
      localY / bounds.height - 0.5,
    );
  }

  function resetCardPosition() {
    normalizedX.set(0);
    normalizedY.set(0);
  }

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 28,
              scale: 0.97,
              filter: "blur(8px)",
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
        amount: 0.14,
      }}
      transition={{
        duration: 0.65,
        delay: Math.min(
          index * 0.055,
          0.35,
        ),
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={cn(
        "h-full",
        "[perspective:1200px]",
        className,
      )}
    >
      <motion.div
        onPointerMove={
          handlePointerMove
        }
        onPointerLeave={
          resetCardPosition
        }
        onPointerCancel={
          resetCardPosition
        }
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle:
                  "preserve-3d",
              }
        }
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -7,
              }
        }
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
        }}
        className={cn(
          "group/card relative",
          "h-full min-h-[300px]",
          "overflow-hidden",
          "rounded-3xl",
          "border border-white/[0.085]",
          "bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]",
          "p-5",
          "shadow-[0_32px_100px_-62px_rgba(139,92,246,0.8)]",
          "backdrop-blur-2xl",
          "transition-[border-color,box-shadow]",
          "duration-500",
          "hover:border-violet-400/30",
          "hover:shadow-[0_38px_110px_-48px_rgba(139,92,246,0.75)]",
          "sm:min-h-[330px]",
          "sm:p-6",
          featured &&
            [
              "md:min-h-[360px]",
              "border-violet-400/20",
              "bg-[linear-gradient(145deg,rgba(139,92,246,0.11),rgba(34,211,238,0.025),rgba(255,255,255,0.018))]",
            ].join(" "),
        )}
      >
        {/* Full card link */}
        <Link
          href={`/glossary/${term.slug}`}
          aria-label={`Read about ${term.title}`}
          className="absolute inset-0 z-30"
        >
          <span className="sr-only">
            Read about {term.title}
          </span>
        </Link>

        {/* Cursor spotlight */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className={cn(
              "pointer-events-none",
              "absolute left-0 top-0",
              "h-72 w-72",
              "-translate-x-1/2",
              "-translate-y-1/2",
              "rounded-full",
              "bg-[radial-gradient(circle,rgba(139,92,246,0.22),rgba(34,211,238,0.07)_38%,transparent_70%)]",
              "opacity-0",
              "blur-xl",
              "transition-opacity",
              "duration-300",
              "group-hover/card:opacity-100",
            )}
            style={{
              x: pointerX,
              y: pointerY,
            }}
          />
        )}

        {/* Top animated accent */}
        <motion.div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-5 top-0",
            "h-px",
            "origin-left",
            "bg-[linear-gradient(90deg,transparent,#a78bfa,#22d3ee,transparent)]",
          )}
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 0.75,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: index * 0.06,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        />

        {/* Grid texture */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute inset-0",
            "opacity-0",
            "transition-opacity",
            "duration-500",
            "group-hover/card:opacity-100",
            "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]",
            "bg-[size:30px_30px]",
            "[mask-image:linear-gradient(to_bottom,black,transparent_82%)]",
          )}
        />

        {/* Background letter */}
        <motion.span
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute -right-4 top-4",
            "select-none",
            "text-[8.5rem]",
            "font-semibold",
            "leading-none",
            "tracking-[-0.08em]",
            "text-white/[0.025]",
            "transition-colors",
            "duration-500",
            "group-hover/card:text-violet-300/[0.055]",
            "sm:text-[10rem]",
          )}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -5, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        >
          {term.letter}
        </motion.span>

        {/* Top row */}
        <div
          className={cn(
            "relative z-10",
            "flex items-start",
            "justify-between",
            "gap-4",
          )}
          style={{
            transform:
              "translateZ(28px)",
          }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full",
                "border border-violet-400/20",
                "bg-violet-400/[0.08]",
                "px-2.5 py-1",
                "text-[0.58rem]",
                "font-semibold uppercase",
                "tracking-[0.14em]",
                "text-violet-200/75",
              )}
            >
              {term.category}
            </span>

            {(featured ||
              term.featured) && (
              <span
                className={cn(
                  "inline-flex",
                  "items-center gap-1.5",
                  "rounded-full",
                  "border border-cyan-300/15",
                  "bg-cyan-300/[0.06]",
                  "px-2.5 py-1",
                  "text-[0.58rem]",
                  "font-semibold uppercase",
                  "tracking-[0.14em]",
                  "text-cyan-200/70",
                )}
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-2.5 w-2.5"
                />

                Essential
              </span>
            )}
          </div>

          <span
            className={cn(
              "grid h-10 w-10",
              "shrink-0",
              "place-items-center",
              "rounded-full",
              "border border-white/[0.08]",
              "bg-white/[0.025]",
              "text-white/35",
              "transition-all",
              "duration-300",
              "group-hover/card:border-violet-400/25",
              "group-hover/card:bg-violet-400/[0.1]",
              "group-hover/card:text-white",
              "group-hover/card:shadow-[0_0_28px_rgba(139,92,246,0.2)]",
            )}
          >
            <ArrowUpRight
              aria-hidden="true"
              className={cn(
                "h-4 w-4",
                "transition-transform",
                "duration-300",
                "group-hover/card:translate-x-0.5",
                "group-hover/card:-translate-y-0.5",
              )}
            />
          </span>
        </div>

        {/* Content */}
        <div
          className={cn(
            "relative z-10",
            "mt-16",
          )}
          style={{
            transform:
              "translateZ(38px)",
          }}
        >
          {term.abbreviation && (
            <span
              className={cn(
                "mb-3 block",
                "font-mono",
                "text-xs font-semibold",
                "uppercase",
                "tracking-[0.18em]",
                "text-cyan-300/70",
              )}
            >
              {term.abbreviation}
            </span>
          )}

          <h3
            className={cn(
              "max-w-[520px]",
              "text-xl",
              "font-semibold",
              "leading-[1.08]",
              "tracking-[-0.04em]",
              "text-white/92",
              "transition-colors",
              "duration-300",
              "group-hover/card:text-white",
              "sm:text-2xl",
              featured &&
                "lg:text-[1.8rem]",
            )}
          >
            {term.shortTitle ??
              term.title}
          </h3>

          <p
            className={cn(
              "mt-4",
              "line-clamp-3",
              "max-w-[540px]",
              "text-sm",
              "leading-[1.7]",
              "text-white/48",
              "transition-colors",
              "duration-300",
              "group-hover/card:text-white/62",
              "sm:text-[0.94rem]",
            )}
          >
            {term.shortDefinition}
          </p>
        </div>

        {/* Footer */}
        <div
          className={cn(
            "relative z-10",
            "mt-7 flex",
            "items-center",
            "justify-between",
            "gap-4",
            "border-t border-white/[0.06]",
            "pt-4",
          )}
          style={{
            transform:
              "translateZ(32px)",
          }}
        >
          <span
            className={cn(
              "inline-flex",
              "items-center gap-2",
              "text-xs",
              "text-white/30",
            )}
          >
            <BookOpen
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            {term.readingTime ??
              "Quick read"}
          </span>

          <span
            className={cn(
              "text-[0.62rem]",
              "font-semibold uppercase",
              "tracking-[0.13em]",
              "text-white/30",
              "transition-colors",
              "group-hover/card:text-violet-200/75",
            )}
          >
            Explore term
          </span>
        </div>

        {/* Bottom glow */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute inset-x-0 bottom-0",
            "h-1/2",
            "bg-[linear-gradient(to_top,rgba(139,92,246,0.09),transparent)]",
            "opacity-0",
            "transition-opacity",
            "duration-500",
            "group-hover/card:opacity-100",
          )}
        />
      </motion.div>
    </motion.article>
  );
}