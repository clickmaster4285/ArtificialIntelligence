"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

import {
  Activity,
  ArrowUpRight,
  Gauge,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useRef,
} from "react";

import type {
  MetricItem,
  StatsSection,
} from "@/types/dynamic-page";

import { cn } from "@/lib/utils";

import {
  StaggerContainer,
  StaggerItem,
} from "../shared/MotionReveal";

import { SectionHeading } from "../shared/SectionHeading";

/* =========================================================
   TYPES
========================================================= */

interface NeuralStatsSectionProps {
  section: StatsSection;
  sectionIndex?: number;
}

interface ParsedMetric {
  numeric: boolean;
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
}

/* =========================================================
   VALUE PARSER
========================================================= */

/**
 * Supported examples:
 *
 * 100%  → prefix: "", value: 100, suffix: "%"
 * $20K  → prefix: "$", value: 20, suffix: "K"
 * 99.9% → prefix: "", value: 99.9, suffix: "%"
 * 24h   → prefix: "", value: 24, suffix: "h"
 * Fixed → treated as text
 */
function parseMetricValue(
  input: string,
): ParsedMetric {
  const trimmed = input.trim();

  const match = trimmed.match(
    /^([^0-9.-]*)(-?\d+(?:\.\d+)?)(.*)$/,
  );

  if (!match) {
    return {
      numeric: false,
      prefix: "",
      value: 0,
      suffix: trimmed,
      decimals: 0,
    };
  }

  const numericValue = Number(
    match[2],
  );

  if (!Number.isFinite(numericValue)) {
    return {
      numeric: false,
      prefix: "",
      value: 0,
      suffix: trimmed,
      decimals: 0,
    };
  }

  const decimalPart =
    match[2].split(".")[1];

  return {
    numeric: true,
    prefix: match[1],
    value: numericValue,
    suffix: match[3],
    decimals:
      decimalPart?.length ?? 0,
  };
}

/* =========================================================
   ANIMATED VALUE
========================================================= */

function AnimatedMetricValue({
  value,
}: {
  value: string;
}) {
  const elementRef =
    useRef<HTMLSpanElement>(null);

  const reduceMotion = useReducedMotion();

  const isInView = useInView(
    elementRef,
    {
      once: true,
      amount: 0.65,
    },
  );

  const parsed = parseMetricValue(value);

  const animatedValue =
    useMotionValue(
      reduceMotion || !parsed.numeric
        ? parsed.value
        : 0,
    );

  const displayValue = useTransform(
    animatedValue,
    (latest) => {
      if (!parsed.numeric) {
        return value;
      }

      const formatted =
        latest.toLocaleString("en-US", {
          minimumFractionDigits:
            parsed.decimals,

          maximumFractionDigits:
            parsed.decimals,
        });

      return `${parsed.prefix}${formatted}${parsed.suffix}`;
    },
  );

  useEffect(() => {
    if (
      !isInView ||
      !parsed.numeric ||
      reduceMotion
    ) {
      return;
    }

    const controls = animate(
      animatedValue,
      parsed.value,
      {
        duration: 1.8,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      },
    );

    return () => {
      controls.stop();
    };
  }, [
    animatedValue,
    isInView,
    parsed.numeric,
    parsed.value,
    reduceMotion,
  ]);

  if (!parsed.numeric) {
    return (
      <motion.span
        ref={elementRef}
        initial={
          reduceMotion
            ? undefined
            : {
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }
        }
        viewport={{
          once: true,
          amount: 0.7,
        }}
        transition={{
          duration: 0.8,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      >
        {value}
      </motion.span>
    );
  }

  return (
    <motion.span ref={elementRef}>
      {displayValue}
    </motion.span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  item,
  index,
}: {
  item: MetricItem;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <StaggerItem
      className="h-full"
      preset="fade-scale"
    >
      <motion.article
        className={cn(
          "group/stat relative",
          "flex h-full",
          "min-h-[230px]",
          "flex-col overflow-hidden",
          "glass rounded-3xl",
          "p-5",
          "shadow-[0_28px_90px_-58px_var(--neural-secondary)]",
          "transition-[border-color,box-shadow,transform]",
          "duration-500",
          "hover:border-[var(--neural-secondary)]/35",
          "hover:shadow-[0_40px_120px_-46px_var(--neural-secondary)]",
          "sm:min-h-[260px]",
          "sm:p-6",
        )}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -8,
                rotateX: 2,
                rotateY:
                  index % 2 === 0
                    ? -2
                    : 2,
              }
        }
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
        }}
        style={{
          transformPerspective: 1000,
        }}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-6 top-0 h-px",
            "bg-[linear-gradient(90deg,transparent,var(--neural-secondary),transparent)]",
            "opacity-45 transition-opacity duration-500",
            "group-hover/stat:opacity-90",
          )}
        />

        {/* Top indicator */}
        <div
          className={cn(
            "relative z-10 flex",
            "items-center",
            "justify-between",
          )}
        >
          <span
            className={cn(
              "font-mono",
              "text-[0.62rem]",
              "tracking-[0.15em]",
              "text-white/25",
            )}
          >
            METRIC{" "}
            {String(index + 1).padStart(
              2,
              "0",
            )}
          </span>

          <span
            className={cn(
              "grid h-10 w-10",
              "place-items-center",
              "rounded-xl",
              "border border-white/[0.08]",
              "bg-white/[0.035]",
              "text-[var(--neural-secondary)]",
              "transition-all",
              "duration-500",
              "group-hover/stat:bg-[var(--neural-soft)]",
              "group-hover/stat:shadow-[0_0_30px_var(--neural-soft)]",
            )}
          >
            {index % 2 === 0 ? (
              <Activity
                aria-hidden="true"
                className="h-4 w-4"
              />
            ) : (
              <Gauge
                aria-hidden="true"
                className="h-4 w-4"
              />
            )}
          </span>
        </div>

        {/* Metric */}
        <div className="relative z-10 mt-auto">
          <strong
            className={cn(
              "block",
              "bg-[linear-gradient(120deg,#fff,var(--neural-secondary),var(--neural-highlight))]",
              "bg-clip-text",
              "text-[clamp(3.5rem,6vw,6.5rem)]",
              "font-semibold",
              "leading-none",
              "tracking-[-0.075em]",
              "text-transparent",
            )}
          >
            <AnimatedMetricValue
              value={item.value}
            />
          </strong>

          <div
            className={cn(
              "mt-6 flex",
              "items-start",
              "justify-between gap-4",
            )}
          >
            <div>
              <h3
                className={cn(
                  "text-base",
                  "font-semibold",
                  "tracking-[-0.02em]",
                  "text-white/80",
                )}
              >
                {item.label}
              </h3>

              {item.description && (
                <p
                  className={cn(
                    "mt-2 max-w-sm",
                    "text-xs",
                    "leading-relaxed",
                    "text-white/48",
                    "sm:text-sm",
                  )}
                >
                  {item.description}
                </p>
              )}
            </div>

            <ArrowUpRight
              aria-hidden="true"
              className={cn(
                "mt-1 h-4 w-4",
                "shrink-0",
                "text-white/20",
                "transition-all",
                "duration-300",
                "group-hover/stat:-translate-y-1",
                "group-hover/stat:translate-x-1",
                "group-hover/stat:text-[var(--neural-secondary)]",
              )}
            />
          </div>
        </div>

        {/* Animated chart line */}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 90"
          preserveAspectRatio="none"
          className={cn(
            "pointer-events-none",
            "absolute inset-x-0",
            "bottom-20",
            "h-24 w-full",
            "opacity-[0.09]",
            "transition-opacity",
            "duration-500",
            "group-hover/stat:opacity-[0.2]",
          )}
        >
          <defs>
            <linearGradient
              id={`stat-gradient-${index}`}
              x1="0"
              x2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--neural-primary)"
              />

              <stop
                offset="100%"
                stopColor="var(--neural-secondary)"
              />
            </linearGradient>
          </defs>

          <motion.path
            d="M0 78 C35 72, 45 54, 78 58 S125 72, 150 44 S205 20, 230 36 S270 18, 300 8"
            fill="none"
            stroke={`url(#stat-gradient-${index})`}
            strokeWidth="2"
            initial={{
              pathLength: 0,
            }}
            whileInView={{
              pathLength: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.8,
              delay: index * 0.12,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          />
        </svg>

        {/* Ambient hover glow */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute -bottom-40",
            "-right-40",
            "h-80 w-80",
            "rounded-full",
            "bg-[var(--neural-primary)]",
            "opacity-0",
            "blur-[110px]",
            "transition-opacity",
            "duration-500",
            "group-hover/stat:opacity-[0.1]",
          )}
        />
      </motion.article>
    </StaggerItem>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function NeuralStatsSection({
  section,
  sectionIndex = 5,
}: NeuralStatsSectionProps) {
  if (section.items.length === 0) {
    return null;
  }

  return (
    <section
      id={section.id}
      className={cn(
        "relative isolate",
        "overflow-hidden",
        "border-b border-white/[0.065]",
        "bg-[#050507]",
        "px-5 py-8",
        "sm:px-8 sm:py-10",
        "lg:px-12 lg:py-12",
      )}
    >
      {/* Background typography */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute left-1/2 top-1/2",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "whitespace-nowrap",
          "text-[20vw]",
          "font-semibold",
          "tracking-[-0.09em]",
          "text-white/[0.012]",
          "select-none",
        )}
      >
        IMPACT
      </div>

      {/* Ambient lighting */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute left-1/2 top-0",
          "h-[500px] w-[900px]",
          "-translate-x-1/2",
          "rounded-full",
          "bg-[var(--neural-primary)]",
          "opacity-[0.045]",
          "blur-[160px]",
        )}
      />

      <div
        className={cn(
          "relative z-10",
          "mx-auto max-w-[1440px]",
        )}
      >
        <div className="-mb-16 sm:-mb-14 lg:-mb-56">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={
              section.title ??
              "Measured impact"
            }
            index={sectionIndex}
            size="large"
          />
        </div>

        <StaggerContainer
          className={cn(
            "mt-0 grid",
            "grid-cols-1 gap-4",
            "sm:mt-1",
            "sm:grid-cols-2",
            "xl:grid-cols-4",
          )}
          stagger={0.1}
          amount={0.15}
        >
          {section.items.map(
            (item, index) => (
              <StatCard
                key={`${item.value}-${item.label}`}
                item={item}
                index={index}
              />
            ),
          )}
        </StaggerContainer>

        <div
          className={cn(
            "mx-auto mt-10",
            "flex w-fit",
            "items-center gap-2",
            "rounded-full",
            "border border-white/[0.065]",
            "bg-white/[0.025]",
            "px-4 py-2",
            "text-[0.62rem]",
            "uppercase",
            "tracking-[0.14em]",
            "text-white/28",
          )}
        >
          <Sparkles
            aria-hidden="true"
            className="h-3 w-3 text-[var(--neural-secondary)]"
          />

          Designed around measurable production outcomes
        </div>
      </div>
    </section>
  );
}
