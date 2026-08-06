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
  Bot,
  Brain,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  Database,
  Layers3,
  Network,
  Search,
  Shield,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import Link from "next/link";

import type {
  PointerEvent,
} from "react";

import type {
  FeatureCard,
  FeatureGridSection,
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

interface NeuralFeatureGridProps {
  section: FeatureGridSection;
  sectionIndex?: number;
}

/* =========================================================
   ICON MAP
========================================================= */

type FeatureIconName = NonNullable<
  FeatureCard["icon"]
>;

const iconMap: Record<
  FeatureIconName,
  LucideIcon
> = {
  brain: Brain,
  database: Database,
  network: Network,
  sparkles: Sparkles,
  shield: Shield,
  code: Code2,
  workflow: Workflow,
  chart: ChartNoAxesCombined,
  search: Search,
  bot: Bot,
  cloud: Cloud,
  layers: Layers3,
};

/**
 * Resolve an icon safely from JSON content.
 *
 * JSON values are runtime data, so an unknown, missing, or differently-cased
 * icon name must never leave the component undefined. Unknown values use the
 * Sparkles fallback instead of crashing the complete page.
 */
function getFeatureIcon(
  iconName?: string | null,
): LucideIcon {
  if (!iconName) {
    return Sparkles;
  }

  const normalizedIconName =
    iconName.trim().toLowerCase() as FeatureIconName;

  return iconMap[normalizedIconName] ?? Sparkles;
}

/* =========================================================
   BENTO SIZING
========================================================= */

function getBentoCardClass(
  variant: FeatureGridSection["variant"],
  index: number,
  itemCount: number,
): string {
  if (variant !== "bento") {
    return "";
  }

  /*
   * Special layout for four cards:
   *
   * ┌───────────────┬───────┐
   * │ Large Card    │ Card 2│
   * ├───────┬───────┴───────┤
   * │Card 3 │ Large Card 4  │
   * └───────┴───────────────┘
   */
  if (itemCount === 4) {
    if (index === 0) {
      return "lg:col-span-2 lg:row-span-2";
    }

    if (index === 3) {
      return "lg:col-span-2";
    }
  }

  /*
   * Generic bento pattern for larger grids.
   */
  if (index % 6 === 0) {
    return "lg:col-span-2";
  }

  if (index % 6 === 3) {
    return "lg:col-span-2";
  }

  return "";
}

/* =========================================================
   FEATURE CARD
========================================================= */

function NeuralFeatureCard({
  item,
  index,
  variant,
  itemCount,
}: {
  item: FeatureCard;
  index: number;
  variant: FeatureGridSection["variant"];
  itemCount: number;
}) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const normalizedX =
    useMotionValue(0);

  const normalizedY =
    useMotionValue(0);

  const smoothX = useSpring(
    normalizedX,
    {
      stiffness: 180,
      damping: 20,
      mass: 0.45,
    },
  );

  const smoothY = useSpring(
    normalizedY,
    {
      stiffness: 180,
      damping: 20,
      mass: 0.45,
    },
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-5, 5],
  );

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [5, -5],
  );

  const Icon = getFeatureIcon(
    item.icon,
  );

  const handlePointerMove = (
    event: PointerEvent<HTMLElement>,
  ) => {
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
  };

  const resetCard = () => {
    normalizedX.set(0);
    normalizedY.set(0);
  };

  const cardContent = (
    <>
      {/* Cursor spotlight */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute left-0 top-0",
            "h-64 w-64",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "rounded-full",
            "bg-[radial-gradient(circle,var(--neural-soft)_0%,transparent_68%)]",
            "opacity-0",
            "blur-2xl",
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

      {/* Top animated line */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0",
          "h-px",
          "origin-left",
          "bg-[linear-gradient(90deg,transparent,var(--neural-primary),var(--neural-secondary),transparent)]",
          "opacity-0",
          "group-hover/card:opacity-100",
        )}
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.1,
          delay: index * 0.07,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      />

      {/* Background grid pattern */}
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
          "bg-[size:32px_32px]",
          "[mask-image:linear-gradient(to_bottom,black,transparent)]",
        )}
      />

      {/* Number and label */}
      <div
        className={cn(
          "relative z-10 flex",
          "items-start",
          "justify-between gap-4",
        )}
        style={{
          transform:
            "translateZ(28px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-mono",
              "text-[0.65rem]",
              "tracking-[0.12em]",
              "text-white/25",
            )}
          >
            {String(index + 1).padStart(
              2,
              "0",
            )}
          </span>

          {item.label && (
            <span
              className={cn(
                "rounded-full",
                "border border-white/[0.08]",
                "bg-white/[0.035]",
                "px-2.5 py-1",
                "text-[0.58rem]",
                "font-semibold",
                "uppercase",
                "tracking-[0.15em]",
                "text-white/40",
              )}
            >
              {item.label}
            </span>
          )}
        </div>

        <div
          className={cn(
            "grid h-11 w-11",
            "shrink-0",
            "place-items-center",
            "rounded-xl",
            "border border-white/[0.09]",
            "bg-white/[0.045]",
            "text-[var(--neural-secondary)]",
            "shadow-[inset_0_0_18px_rgba(255,255,255,0.025)]",
            "transition-all",
            "duration-500",
            "group-hover/card:border-[var(--neural-primary)]/30",
            "group-hover/card:bg-[var(--neural-soft)]",
            "group-hover/card:shadow-[0_0_35px_var(--neural-soft)]",
          )}
        >
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
          />
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "relative z-10 mt-auto",
          "pt-14",
        )}
        style={{
          transform:
            "translateZ(38px)",
        }}
      >
        {item.metric && (
          <span
            className={cn(
              "mb-3 block",
              "text-xs",
              "font-semibold",
              "tracking-wide",
              "text-[var(--neural-secondary)]",
            )}
          >
            {item.metric}
          </span>
        )}

        <h3
          className={cn(
            "max-w-xl",
            "text-xl",
            "font-semibold",
            "leading-tight",
            "tracking-[-0.035em]",
            "text-white/95",
            "sm:text-2xl",
            variant === "bento" &&
              index === 0 &&
              "lg:text-4xl",
          )}
        >
          {item.title}
        </h3>

        <p
          className={cn(
            "mt-4 max-w-xl",
            "text-sm",
            "leading-[1.7]",
            "text-white/55",
            "sm:text-[0.96rem]",
          )}
        >
          {item.description}
        </p>

        {item.link && (
          <div
            className={cn(
              "mt-7 inline-flex",
              "items-center gap-2",
              "text-xs",
              "font-semibold",
              "text-white/65",
              "transition-colors",
              "group-hover/card:text-white",
            )}
          >
            {item.link.label}

            <ArrowUpRight
              aria-hidden="true"
              className={cn(
                "h-4 w-4",
                "transition-transform",
                "duration-300",
                "group-hover/card:translate-x-1",
                "group-hover/card:-translate-y-1",
              )}
            />
          </div>
        )}
      </div>

      {/* Bottom ambient gradient */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-x-0 bottom-0",
          "h-1/2",
          "bg-[linear-gradient(to_top,var(--neural-soft),transparent)]",
          "opacity-0",
          "transition-opacity",
          "duration-500",
          "group-hover/card:opacity-40",
        )}
      />
    </>
  );

  const cardClassName = cn(
    "group/card relative",
    "flex min-h-[240px]",
    "flex-col overflow-hidden",
    "glass rounded-3xl",
    "p-5",
    "shadow-[0_28px_90px_-58px_var(--neural-primary)]",
    "transition-[border-color,box-shadow,transform]",
    "duration-500",
    "hover:border-[var(--neural-primary)]/35",
    "hover:shadow-[0_40px_120px_-46px_var(--neural-primary)]",
    "sm:min-h-[270px]",
    "sm:p-6",
    getBentoCardClass(
      variant,
      index,
      itemCount,
    ),
  );

  return (
    <StaggerItem
      className={cn(
        "h-full",
        "[perspective:1200px]",
        getBentoCardClass(
          variant,
          index,
          itemCount,
        ),
      )}
      preset="fade-scale"
    >
      <motion.article
        className={cardClassName}
        onPointerMove={
          handlePointerMove
        }
        onPointerLeave={resetCard}
        onPointerCancel={resetCard}
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
                y: -8,
              }
        }
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
        }}
      >
        {item.link ? (
          <Link
            href={item.link.href}
            aria-label={
              item.link.ariaLabel ??
              item.link.label
            }
            target={
              item.link.external
                ? "_blank"
                : undefined
            }
            rel={
              item.link.external
                ? "noopener noreferrer"
                : undefined
            }
            className="absolute inset-0 z-20"
          >
            <span className="sr-only">
              {item.link.label}
            </span>
          </Link>
        ) : null}

        {cardContent}
      </motion.article>
    </StaggerItem>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function NeuralFeatureGrid({
  section,
  sectionIndex = 1,
}: NeuralFeatureGridProps) {
  const columns =
    section.columns ?? 3;

  const usesFaqTightHeading = true;

  const gridColumns = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }[columns];

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
      {/* Ambient section glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -left-64 top-1/4",
          "h-[520px] w-[520px]",
          "rounded-full",
          "bg-[var(--neural-primary)]",
          "opacity-[0.06]",
          "blur-[140px]",
        )}
      />

      <div
        className={cn(
          "relative z-10",
          "mx-auto",
          "max-w-[1440px]",
        )}
      >
        <div
          className={cn(
            usesFaqTightHeading &&
              "-mb-16 sm:-mb-14 lg:-mb-56",
          )}
        >
          <SectionHeading
            eyebrow={section.eyebrow}
            title={
              section.title ??
              "Our capabilities"
            }
            description={
              usesFaqTightHeading
                ? undefined
                : section.description
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
            gridColumns,
            section.variant ===
              "bento" &&
              "lg:auto-rows-[minmax(180px,auto)]",
          )}
          stagger={0.09}
          amount={0.1}
        >
          {section.items.map(
            (item, index) => (
              <NeuralFeatureCard
                key={`${section.id}-${item.title}`}
                item={item}
                index={index}
                variant={
                  section.variant
                }
                itemCount={
                  section.items.length
                }
              />
            ),
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}