"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { Plus } from "lucide-react";
import { useState } from "react";

import type {
  FaqItem,
  FaqSection,
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

interface NeuralFaqSectionProps {
  section: FaqSection;
  sectionIndex?: number;
}

/* =========================================================
   FAQ ITEM
========================================================= */

function FaqAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <StaggerItem preset="fade-up">
      <article
        className={cn(
          "group/faq relative",
          "overflow-hidden",
          "glass rounded-3xl",
          "transition-[border-color,box-shadow,transform]",
          "duration-300",
          isOpen
            ? [
                "border-[var(--neural-primary)]/35",
                "shadow-[0_34px_105px_-50px_var(--neural-primary)]",
              ].join(" ")
            : [
                "hover:-translate-y-0.5",
                "hover:border-white/[0.14]",
                "hover:shadow-[0_28px_90px_-58px_var(--neural-soft)]",
              ].join(" "),
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-5 top-0 h-px",
            "bg-[linear-gradient(90deg,transparent,var(--neural-secondary),transparent)]",
            "opacity-0 transition-opacity duration-300",
            "group-hover/faq:opacity-60",
            isOpen && "opacity-80",
          )}
        />

        {isOpen && (
          <motion.div
            layoutId="active-faq-background"
            aria-hidden="true"
            className={cn(
              "pointer-events-none",
              "absolute inset-0",
              "bg-[radial-gradient(circle_at_12%_22%,var(--neural-soft),transparent_34%)]",
            )}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
          />
        )}

        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "relative z-10 flex",
            "w-full items-start",
            "gap-4 px-4 py-4",
            "text-left",
            "outline-none",
            "sm:gap-6",
            "sm:px-5 sm:py-5",
            "focus-visible:ring-2",
            "focus-visible:ring-inset",
            "focus-visible:ring-[var(--neural-secondary)]",
          )}
        >
          <span
            className={cn(
              "mt-1 shrink-0",
              "font-mono",
              "text-[0.6rem]",
              "tracking-[0.13em]",
              isOpen
                ? "text-[var(--neural-secondary)]"
                : "text-white/20",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={cn(
              "flex-1",
              "text-base",
              "font-semibold",
              "leading-[1.45]",
              "tracking-[-0.02em]",
              "transition-colors",
              "sm:text-xl",
              isOpen
                ? "text-white"
                : "text-white/55 group-hover/faq:text-white/80",
            )}
          >
            {item.question}
          </span>

          <span
            className={cn(
              "relative grid",
              "h-8 w-8 shrink-0",
              "place-items-center",
              "rounded-full",
              "border",
              "transition-all",
              "duration-300",
              isOpen
                ? [
                    "border-[var(--neural-primary)]",
                    "bg-[var(--neural-soft)]",
                    "text-[var(--neural-secondary)]",
                    "shadow-[0_0_22px_var(--neural-soft)]",
                  ].join(" ")
                : [
                    "border-white/[0.08]",
                    "bg-white/[0.025]",
                    "text-white/30",
                    "group-hover/faq:border-white/15",
                    "group-hover/faq:text-white/60",
                  ].join(" "),
            )}
          >
            <Plus
              aria-hidden="true"
              className={cn(
                "h-4 w-4",
                "transition-transform",
                "duration-300",
                isOpen && "rotate-45",
              )}
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="relative z-10 overflow-hidden"
              initial={
                reduceMotion
                  ? undefined
                  : {
                      height: 0,
                      opacity: 0,
                    }
              }
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      height: 0,
                      opacity: 0,
                    }
              }
              transition={{
                height: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 0.28,
                },
              }}
            >
              <div
                className={cn(
                  "pb-7 pl-12 pr-4",
                  "sm:pb-6 sm:pl-[4.9rem]",
                  "sm:pr-14",
                )}
              >
                <p
                  className={cn(
                    "max-w-3xl",
                    "text-sm",
                    "leading-[1.7]",
                    "text-white/55",
                    "sm:text-base",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </StaggerItem>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function NeuralFaqSection({
  section,
  sectionIndex = 9,
}: NeuralFaqSectionProps) {
  const [openQuestion, setOpenQuestion] =
    useState<string | null>(
      section.items[0]?.question ?? null,
    );

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
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute right-0 top-1/4",
          "h-[600px] w-[600px]",
          "translate-x-1/2",
          "rounded-full",
          "bg-[var(--neural-primary)]",
          "opacity-[0.05]",
          "blur-[170px]",
        )}
      />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/*
          Only this wrapper is added.

          It reduces SectionHeading's bottom whitespace without
          moving or clipping the FAQ accordion itself.
        */}
        <div className="-mb-16 sm:-mb-14 lg:-mb-56">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={
              section.title ??
              "Frequently asked questions"
            }
            align="center"
            index={sectionIndex}
            size="large"
          />
        </div>

        <div className="mx-auto max-w-[980px]">
          <StaggerContainer
            className="grid gap-3 sm:gap-4"
            stagger={0.055}
            amount={0.05}
          >
            {section.items.map(
              (item, index) => (
                <FaqAccordionItem
                  key={item.question}
                  item={item}
                  index={index}
                  isOpen={
                    openQuestion ===
                    item.question
                  }
                  onToggle={() =>
                    setOpenQuestion(
                      openQuestion ===
                        item.question
                        ? null
                        : item.question,
                    )
                  }
                />
              ),
            )}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}