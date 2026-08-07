"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircleQuestion,
  Quote,
  Sparkles,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  ObjectionItem,
  ObjectionsSection,
} from "@/types/dynamic-page";

import { cn } from "@/lib/utils";

import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
} from "../shared/MotionReveal";

import { SectionHeading } from "../shared/SectionHeading";

/* =========================================================
   TYPES
========================================================= */

interface NeuralObjectionsSectionProps {
  section: ObjectionsSection;
  sectionIndex?: number;
}

/* =========================================================
   DESKTOP QUESTION LIST
========================================================= */

function DesktopQuestions({
  items,
  activeIndex,
  onChange,
}: {
  items: ObjectionItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <StaggerContainer
      className={cn(
        "hidden space-y-2",
        "lg:block",
      )}
      stagger={0.07}
    >
      {items.map((item, index) => {
        const isActive =
          activeIndex === index;

        return (
          <StaggerItem
            key={item.objection}
            preset="fade-right"
          >
            <button
              type="button"
              onClick={() =>
                onChange(index)
              }
              onPointerEnter={() =>
                onChange(index)
              }
              aria-pressed={isActive}
              className={cn(
                "group/question",
                "relative flex w-full",
                "items-center gap-5",
                "overflow-hidden",
                "rounded-3xl px-5 py-5",
                "text-left",
                "outline-none",
                "transition-all",
                "duration-300",
                "focus-visible:ring-2",
                "focus-visible:ring-[var(--neural-secondary)]",
                isActive
                  ? [
                      "glass",
                      "border-white/[0.16]",
                      "shadow-[0_30px_95px_-50px_var(--neural-soft)]",
                    ].join(" ")
                  : [
                      "glass",
                      "hover:border-white/[0.14]",
                      "hover:shadow-[0_24px_80px_-58px_var(--neural-soft)]",
                    ].join(" "),
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="active-objection-surface"
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0",
                    "bg-[linear-gradient(100deg,var(--neural-soft),transparent_65%)]",
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
                  "tracking-[0.12em]",
                  isActive
                    ? "text-[var(--neural-secondary)]"
                    : "text-white/22",
                )}
              >
                {String(
                  index + 1,
                ).padStart(2, "0")}
              </span>

              <span
                className={cn(
                  "relative z-10",
                  "flex-1",
                  "text-sm",
                  "font-medium",
                  "leading-relaxed",
                  "transition-colors",
                  "sm:text-base",
                  isActive
                    ? "text-white"
                    : "text-white/48 group-hover/question:text-white/75",
                )}
              >
                {item.objection}
              </span>

              <span
                className={cn(
                  "relative z-10",
                  "grid h-8 w-8",
                  "shrink-0",
                  "place-items-center",
                  "rounded-full",
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
                        "text-white/25",
                        "group-hover/question:border-white/15",
                        "group-hover/question:text-white/60",
                      ].join(" "),
                )}
              >
                <ArrowRight
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5",
                    "transition-transform",
                    "duration-300",
                    isActive &&
                      "translate-x-0.5",
                  )}
                />
              </span>
            </button>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}

/* =========================================================
   DESKTOP ANSWER PANEL
========================================================= */

function DesktopAnswer({
  item,
  index,
  totalItems,
}: {
  item: ObjectionItem;
  index: number;
  totalItems: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative hidden",
        "min-h-[360px]",
        "overflow-hidden",
        "glass rounded-3xl",
        "p-7",
        "shadow-[0_34px_105px_-54px_var(--neural-soft)]",
        "lg:block",
        "xl:p-9",
      )}
    >
      {/* Top gradient border */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0",
          "h-px",
          "bg-[linear-gradient(90deg,transparent,var(--neural-primary),var(--neural-secondary),transparent)]",
        )}
      />

      {/* Background grid */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-0",
          "opacity-20",
          "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]",
          "bg-[size:45px_45px]",
          "[mask-image:linear-gradient(to_bottom,black,transparent)]",
        )}
      />

      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -right-40 -top-40",
          "h-[440px] w-[440px]",
          "rounded-full",
          "bg-[var(--neural-primary)]",
          "opacity-[0.1]",
          "blur-[130px]",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [
                  0.9,
                  1.08,
                  0.9,
                ],
                opacity: [
                  0.06,
                  0.13,
                  0.06,
                ],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={item.objection}
          className={cn(
            "relative z-10 flex",
            "min-h-[340px]",
            "flex-col",
          )}
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 28,
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
                  y: -20,
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
          <div className="flex items-start justify-between gap-5">
            <div
              className={cn(
                "inline-flex",
                "items-center gap-2",
                "rounded-full",
                "border border-white/[0.08]",
                "bg-white/[0.035]",
                "px-3 py-2",
              )}
            >
              <MessageCircleQuestion
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
                Direct answer
              </span>
            </div>

            <span
              className={cn(
                "font-mono",
                "text-[0.62rem]",
                "tracking-[0.12em]",
                "text-white/25",
              )}
            >
              {String(
                index + 1,
              ).padStart(2, "0")}
              /
              {String(
                totalItems,
              ).padStart(2, "0")}
            </span>
          </div>

          <Quote
            aria-hidden="true"
            className={cn(
              "mt-12",
              "h-8 w-8",
              "text-[var(--neural-primary)]",
              "opacity-60",
            )}
          />

          <h3
            className={cn(
              "mt-5 max-w-2xl",
              "text-2xl",
              "font-semibold",
              "leading-[1.15]",
              "tracking-[-0.04em]",
              "text-white",
              "xl:text-4xl",
            )}
          >
            {item.objection}
          </h3>

          <p
            className={cn(
              "mt-7 max-w-2xl",
              "text-base",
              "leading-[1.9]",
              "text-white/50",
              "xl:text-lg",
            )}
          >
            {item.answer}
          </p>

          <div
            className={cn(
              "mt-auto flex",
              "items-center gap-3",
              "border-t",
              "border-white/[0.065]",
              "pt-7",
            )}
          >
            <span
              className={cn(
                "grid h-8 w-8",
                "place-items-center",
                "rounded-full",
                "bg-emerald-400/10",
                "text-emerald-300",
              )}
            >
              <CheckCircle2
                aria-hidden="true"
                className="h-4 w-4"
              />
            </span>

            <span
              className={cn(
                "text-xs",
                "font-medium",
                "text-white/38",
              )}
            >
              Clear scope, measurable delivery and no hidden assumptions
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   MOBILE ACCORDION
========================================================= */

function MobileObjections({
  items,
}: {
  items: ObjectionItem[];
}) {
  return (
    <StaggerContainer
      className="space-y-3 lg:hidden"
      stagger={0.07}
    >
      {items.map((item, index) => (
        <StaggerItem
          key={item.objection}
          preset="fade-up"
        >
          <details
            className={cn(
              "group/mobile-objection",
              "overflow-hidden",
              "glass rounded-3xl",
              "open:border-white/[0.13]",
              "open:shadow-[0_24px_80px_-58px_var(--neural-soft)]",
            )}
          >
            <summary
              className={cn(
                "flex cursor-pointer",
                "list-none items-center",
                "gap-4 px-5 py-5",
                "[&::-webkit-details-marker]:hidden",
              )}
            >
              <span
                className={cn(
                  "font-mono",
                  "text-[0.58rem]",
                  "text-[var(--neural-secondary)]",
                )}
              >
                {String(
                  index + 1,
                ).padStart(2, "0")}
              </span>

              <span
                className={cn(
                  "flex-1",
                  "text-sm",
                  "font-medium",
                  "leading-relaxed",
                  "text-white/75",
                )}
              >
                {item.objection}
              </span>

              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-4 w-4",
                  "shrink-0",
                  "text-white/30",
                  "transition-transform",
                  "duration-300",
                  "group-open/mobile-objection:rotate-180",
                )}
              />
            </summary>

            <div
              className={cn(
                "border-t",
                "border-white/[0.1]",
                "px-5 py-5",
              )}
            >
              <p
                className={cn(
                  "text-sm",
                  "leading-[1.8]",
                  "text-white/45",
                )}
              >
                {item.answer}
              </p>
            </div>
          </details>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function NeuralObjectionsSection({
  section,
  sectionIndex = 6,
}: NeuralObjectionsSectionProps) {
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
      {/* Background glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -right-72 top-1/3",
          "h-[650px] w-[650px]",
          "rounded-full",
          "bg-[var(--neural-primary)]",
          "opacity-[0.055]",
          "blur-[170px]",
        )}
      />

      <div
        className={cn(
          "relative z-10",
          "mx-auto max-w-[1440px]",
        )}
      >
        {/*
          Match the FAQ heading rhythm so the Direct Answers
          content sits tight under the numbered section label.
        */}
        <div className="-mb-16 sm:-mb-14 lg:-mb-56">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={
              section.title ??
              "Questions answered directly"
            }
            index={sectionIndex}
            size="large"
          />
        </div>

        <div
          className={cn(
            "grid",
            "grid-cols-1 gap-5",
            "lg:grid-cols-[0.82fr_1.18fr]",
            "lg:gap-8",
          )}
        >
          <DesktopQuestions
            items={section.items}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
          />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <DesktopAnswer
              item={activeItem}
              index={activeIndex}
              totalItems={
                section.items.length
              }
            />
          </div>

          <MobileObjections
            items={section.items}
          />
        </div>

        <MotionReveal
          preset="fade-up"
          className={cn(
            "mx-auto mt-10",
            "flex w-fit",
            "items-center gap-2",
            "glass rounded-3xl",
            "px-4 py-2",
            "text-[0.6rem]",
            "uppercase",
            "tracking-[0.14em]",
            "text-white/25",
          )}
        >
          <Sparkles
            aria-hidden="true"
            className="h-3 w-3 text-[var(--neural-secondary)]"
          />

          Straight answers before the first sales call
        </MotionReveal>
      </div>
    </section>
  );
}
