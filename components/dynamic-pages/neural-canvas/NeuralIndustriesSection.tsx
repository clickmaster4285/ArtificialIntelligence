"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  Building2,
  HeartPulse,
  Landmark,
  Scale,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import {
  useState,
} from "react";

import type {
  IndustryItem,
  IndustriesSection,
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

interface NeuralIndustriesSectionProps {
  section: IndustriesSection;
  sectionIndex?: number;
}

/* =========================================================
   ICON SELECTION
========================================================= */

function IndustryIconGlyph({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const iconIndex = index % 5;

  switch (iconIndex) {
    case 0:
      return <Landmark aria-hidden className={className} />;
    case 1:
      return <HeartPulse aria-hidden className={className} />;
    case 2:
      return <Scale aria-hidden className={className} />;
    case 3:
      return <ShoppingBag aria-hidden className={className} />;
    default:
      return <Building2 aria-hidden className={className} />;
  }
}

/* =========================================================
   DESKTOP INDUSTRY LIST
========================================================= */

function DesktopIndustryList({
  items,
  activeIndex,
  onChange,
}: {
  items: IndustryItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <StaggerContainer
      className="hidden lg:block"
      stagger={0.07}
    >
      {items.map((item, index) => {
        const isActive =
          activeIndex === index;

        const content = (
          <>
            {isActive && (
              <motion.span
                layoutId="active-industry-background"
                aria-hidden="true"
                className={cn(
                  "absolute inset-0",
                  "bg-[linear-gradient(100deg,var(--neural-soft),transparent_78%)]",
                )}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                }}
              />
            )}

            <span
              className={cn(
                "relative z-10",
                "font-mono",
                "text-[0.62rem]",
                "tracking-[0.14em]",
                isActive
                  ? "text-[var(--neural-secondary)]"
                  : "text-white/20",
              )}
            >
              {String(
                index + 1,
              ).padStart(2, "0")}
            </span>

            <span
              className={cn(
                "relative z-10",
                "grid h-11 w-11",
                "shrink-0",
                "place-items-center",
                "rounded-xl",
                "border",
                "transition-all",
                "duration-300",
                isActive
                  ? [
                      "border-[var(--neural-primary)]",
                      "bg-[var(--neural-soft)]",
                      "text-[var(--neural-secondary)]",
                    ].join(" ")
                  : [
                      "border-white/[0.07]",
                      "bg-white/[0.025]",
                      "text-white/30",
                    ].join(" "),
              )}
            >
              <IndustryIconGlyph
                index={index}
                className="h-5 w-5"
              />
            </span>

            <span
              className={cn(
                "relative z-10 flex-1",
                "text-xl",
                "font-semibold",
                "tracking-[-0.035em]",
                "transition-colors",
                "xl:text-2xl",
                isActive
                  ? "text-white"
                  : "text-white/40 group-hover/industry:text-white/75",
              )}
            >
              {item.name}
            </span>

            <ArrowUpRight
              aria-hidden="true"
              className={cn(
                "relative z-10",
                "h-5 w-5",
                "shrink-0",
                "transition-all",
                "duration-300",
                isActive
                  ? [
                      "-translate-y-1",
                      "translate-x-1",
                      "text-[var(--neural-secondary)]",
                    ].join(" ")
                  : [
                      "text-white/15",
                      "group-hover/industry:-translate-y-1",
                      "group-hover/industry:translate-x-1",
                      "group-hover/industry:text-white/50",
                    ].join(" "),
              )}
            />
          </>
        );

        const sharedClassName = cn(
          "group/industry",
          "relative flex w-full",
          "items-center gap-5",
          "overflow-hidden",
          "border-b border-white/[0.065]",
          "px-4 py-6",
          "text-left",
          "outline-none",
          "transition-colors",
          "duration-300",
          "first:border-t",
          "first:border-white/[0.065]",
          "focus-visible:ring-2",
          "focus-visible:ring-inset",
          "focus-visible:ring-[var(--neural-secondary)]",
        );

        return (
          <StaggerItem
            key={item.name}
            preset="fade-right"
          >
            {item.href ? (
              <Link
                href={item.href}
                onPointerEnter={() =>
                  onChange(index)
                }
                onFocus={() =>
                  onChange(index)
                }
                className={
                  sharedClassName
                }
              >
                {content}
              </Link>
            ) : (
              <button
                type="button"
                onPointerEnter={() =>
                  onChange(index)
                }
                onFocus={() =>
                  onChange(index)
                }
                onClick={() =>
                  onChange(index)
                }
                className={
                  sharedClassName
                }
              >
                {content}
              </button>
            )}
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}

/* =========================================================
   ACTIVE INDUSTRY PANEL
========================================================= */

function ActiveIndustryPanel({
  item,
  index,
}: {
  item: IndustryItem;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative hidden",
        "min-h-[380px]",
        "overflow-hidden",
        "glass rounded-3xl",
        "p-7",
        "shadow-[0_34px_105px_-54px_var(--neural-soft)]",
        "lg:block",
        "xl:p-9",
      )}
    >
      {/* Technical grid */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-0",
          "opacity-30",
          "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]",
          "bg-[size:48px_48px]",
          "[mask-image:radial-gradient(circle_at_70%_30%,black,transparent_72%)]",
        )}
      />

      {/* Animated orbital visual */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute right-8 top-8",
          "h-52 w-52",
          "opacity-70",
        )}
      >
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className={cn(
              "absolute rounded-full",
              "border",
              ring === 1
                ? "border-dashed border-white/[0.12]"
                : "border-white/[0.07]",
            )}
            style={{
              inset: `${ring * 14}%`,
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate:
                      ring % 2 === 0
                        ? 360
                        : -360,
                  }
            }
            transition={{
              duration:
                18 + ring * 7,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {ring === 1 && (
              <span
                className={cn(
                  "absolute left-1/2 top-0",
                  "h-2 w-2",
                  "-translate-x-1/2",
                  "-translate-y-1/2",
                  "rounded-full",
                  "bg-[var(--neural-secondary)]",
                  "shadow-[0_0_18px_var(--neural-secondary)]",
                )}
              />
            )}
          </motion.div>
        ))}

        <div
          className={cn(
            "absolute inset-[34%]",
            "grid place-items-center",
            "rounded-full",
            "border border-white/[0.1]",
            "bg-[var(--neural-soft)]",
            "text-[var(--neural-secondary)]",
            "backdrop-blur-xl",
          )}
        >
          <IndustryIconGlyph
            index={index}
            className="h-7 w-7"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.name}
          className={cn(
            "relative z-10 flex",
            "min-h-[380px]",
            "flex-col",
          )}
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 25,
                  filter: "blur(12px)",
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: -18,
                  filter: "blur(8px)",
                }
          }
          transition={{
            duration: 0.48,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <div
            className={cn(
              "inline-flex w-fit",
              "items-center gap-2",
              "rounded-full",
              "border border-white/[0.08]",
              "bg-white/[0.035]",
              "px-3 py-2",
            )}
          >
            <Sparkles
              aria-hidden="true"
              className="h-3.5 w-3.5 text-[var(--neural-secondary)]"
            />

            <span
              className={cn(
                "text-[0.58rem]",
                "font-semibold",
                "uppercase",
                "tracking-[0.16em]",
                "text-white/40",
              )}
            >
              Industry intelligence
            </span>
          </div>

          <div className="mt-auto max-w-xl">
            <span
              className={cn(
                "font-mono",
                "text-[0.65rem]",
                "tracking-[0.15em]",
                "text-[var(--neural-secondary)]",
              )}
            >
              SECTOR{" "}
              {String(
                index + 1,
              ).padStart(2, "0")}
            </span>

            <h3
              className={cn(
                "mt-5",
                "text-4xl",
                "font-semibold",
                "leading-[1]",
                "tracking-[-0.055em]",
                "text-white",
                "xl:text-6xl",
              )}
            >
              {item.name}
            </h3>

            <p
              className={cn(
                "mt-6",
                "text-base",
                "leading-[1.85]",
                "text-white/48",
                "xl:text-lg",
              )}
            >
              {item.description}
            </p>

            {item.href && (
              <Link
                href={item.href}
                className={cn(
                  "group/panel-link",
                  "mt-8 inline-flex",
                  "items-center gap-2",
                  "text-sm",
                  "font-semibold",
                  "text-white/65",
                  "transition-colors",
                  "hover:text-white",
                )}
              >
                Explore this industry

                <ArrowUpRight
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4",
                    "transition-transform",
                    "duration-300",
                    "group-hover/panel-link:-translate-y-1",
                    "group-hover/panel-link:translate-x-1",
                  )}
                />
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   MOBILE CARDS
========================================================= */

function MobileIndustryCards({
  items,
}: {
  items: IndustryItem[];
}) {
  return (
    <StaggerContainer
      className="grid gap-4 lg:hidden"
      stagger={0.08}
    >
      {items.map((item, index) => {
        const content = (
          <>
            <div className="flex items-start justify-between gap-4">
              <span
                className={cn(
                  "grid h-11 w-11",
                  "place-items-center",
                  "rounded-xl",
                  "border border-white/[0.08]",
                  "bg-[var(--neural-soft)]",
                  "text-[var(--neural-secondary)]",
                )}
              >
                <IndustryIconGlyph
                  index={index}
                  className="h-5 w-5"
                />
              </span>

              <span
                className={cn(
                  "font-mono",
                  "text-[0.58rem]",
                  "text-white/20",
                )}
              >
                {String(
                  index + 1,
                ).padStart(2, "0")}
              </span>
            </div>

            <h3
              className={cn(
                "mt-8 text-2xl",
                "font-semibold",
                "tracking-[-0.04em]",
                "text-white",
              )}
            >
              {item.name}
            </h3>

            <p
              className={cn(
                "mt-4 text-sm",
                "leading-[1.8]",
                "text-white/42",
              )}
            >
              {item.description}
            </p>

            {item.href && (
              <div
                className={cn(
                  "mt-6 flex",
                  "items-center gap-2",
                  "text-xs",
                  "font-semibold",
                  "text-white/55",
                )}
              >
                Explore

                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            )}
          </>
        );

        return (
          <StaggerItem
            key={item.name}
            preset="fade-scale"
          >
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "glass block rounded-3xl",
                  "shadow-[0_24px_80px_-58px_var(--neural-primary)]",
                  "p-5",
                )}
              >
                {content}
              </Link>
            ) : (
              <article
                className={cn(
                  "glass rounded-3xl",
                  "shadow-[0_24px_80px_-58px_var(--neural-primary)]",
                  "p-5",
                )}
              >
                {content}
              </article>
            )}
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function NeuralIndustriesSection({
  section,
  sectionIndex = 8,
}: NeuralIndustriesSectionProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  if (section.items.length === 0) {
    return null;
  }

  const activeItem =
    section.items[activeIndex] ??
    section.items[0];

  return (
    <section
      id={section.id}
      className={cn(
        "relative isolate",
        "overflow-hidden",
        "border-b border-white/[0.065]",
        "bg-[#07070a]",
        "px-5 py-8",
        "sm:px-8 sm:py-10",
        "lg:px-12 lg:py-12",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -left-72 top-1/3",
          "h-[650px] w-[650px]",
          "rounded-full",
          "bg-[var(--neural-primary)]",
          "opacity-[0.05]",
          "blur-[170px]",
        )}
      />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="-mb-16 sm:-mb-14 lg:-mb-56">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={
              section.title ??
              "Industry expertise"
            }
            index={sectionIndex}
            size="large"
          />
        </div>

        <div
          className={cn(
            "mt-0 grid",
            "grid-cols-1 gap-6",
            "sm:mt-1",
            "lg:grid-cols-[0.85fr_1.15fr]",
          )}
        >
          <DesktopIndustryList
            items={section.items}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
          />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <ActiveIndustryPanel
              item={activeItem}
              index={activeIndex}
            />
          </div>

          <MobileIndustryCards
            items={section.items}
          />
        </div>
      </div>
    </section>
  );
}
