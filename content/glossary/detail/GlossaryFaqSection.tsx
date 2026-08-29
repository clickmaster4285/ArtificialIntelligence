"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  HelpCircle,
  Plus,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  GlossaryFaqItem,
  GlossaryFaqSection as GlossaryFaqSectionData,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryFaqSectionProps {
  faqs: GlossaryFaqSectionData;
  className?: string;
}

interface GlossaryFaqItemProps {
  item: GlossaryFaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

/* =========================================================
   FAQ ITEM
========================================================= */

function GlossaryFaqItemCard({
  item,
  index,
  isOpen,
  onToggle,
}: GlossaryFaqItemProps) {
  const reduceMotion = useReducedMotion();

  const buttonId =
    `glossary-faq-button-${index}`;

  const panelId =
    `glossary-faq-panel-${index}`;

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 22,
              filter: "blur(7px)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: Math.min(
          index * 0.055,
          0.28,
        ),
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={cn(
        "group/faq relative",
        "overflow-hidden",
        "rounded-2xl",
        "border",
        "backdrop-blur-xl",
        "transition-[border-color,background-color,box-shadow,transform]",
        "duration-300",
        isOpen
          ? [
              "border-violet-400/25",
              "bg-violet-400/[0.055]",
              "shadow-[0_28px_90px_-55px_rgba(139,92,246,0.7)]",
            ].join(" ")
          : [
              "border-white/[0.07]",
              "bg-white/[0.02]",
              "hover:-translate-y-0.5",
              "hover:border-white/[0.13]",
              "hover:bg-white/[0.032]",
            ].join(" "),
      )}
    >
      {/* Active background */}
      {isOpen && (
        <motion.div
          layoutId="active-glossary-faq"
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute inset-0",
            "bg-[radial-gradient(circle_at_12%_20%,rgba(139,92,246,0.12),transparent_38%)]",
          )}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 28,
          }}
        />
      )}

      {/* Top accent */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-x-5 top-0",
          "h-px",
          "bg-[linear-gradient(90deg,transparent,#a78bfa,#22d3ee,transparent)]",
          "opacity-0",
          "transition-opacity",
          "duration-300",
          isOpen
            ? "opacity-70"
            : "group-hover/faq:opacity-40",
        )}
      />

      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "relative z-10",
          "flex w-full",
          "items-start",
          "gap-3",
          "px-4 py-4",
          "text-left",
          "outline-none",
          "sm:gap-5",
          "sm:px-5 sm:py-5",
          "focus-visible:ring-2",
          "focus-visible:ring-inset",
          "focus-visible:ring-violet-400/60",
        )}
      >
        {/* Number */}
        <span
          className={cn(
            "mt-1 shrink-0",
            "font-mono",
            "text-[0.58rem]",
            "tracking-[0.12em]",
            "transition-colors",
            isOpen
              ? "text-violet-300"
              : "text-white/20",
          )}
        >
          {String(index + 1).padStart(
            2,
            "0",
          )}
        </span>

        {/* Question */}
        <span
          className={cn(
            "flex-1",
            "text-base",
            "font-semibold",
            "leading-[1.45]",
            "tracking-[-0.025em]",
            "transition-colors",
            "sm:text-lg",
            isOpen
              ? "text-white/90"
              : [
                  "text-white/55",
                  "group-hover/faq:text-white/78",
                ].join(" "),
          )}
        >
          {item.question}
        </span>

        {/* Icon */}
        <span
          className={cn(
            "grid h-8 w-8",
            "shrink-0",
            "place-items-center",
            "rounded-full",
            "border",
            "transition-all",
            "duration-300",
            isOpen
              ? [
                  "rotate-45",
                  "border-violet-400/30",
                  "bg-violet-400/[0.12]",
                  "text-violet-200",
                  "shadow-[0_0_24px_rgba(139,92,246,0.16)]",
                ].join(" ")
              : [
                  "border-white/[0.08]",
                  "bg-white/[0.025]",
                  "text-white/30",
                  "group-hover/faq:border-white/[0.15]",
                  "group-hover/faq:text-white/65",
                ].join(" "),
          )}
        >
          <Plus
            aria-hidden="true"
            className="h-4 w-4"
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className={cn(
              "relative z-10",
              "overflow-hidden",
            )}
            initial={
              reduceMotion
                ? false
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
                duration: 0.42,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              },
              opacity: {
                duration: 0.25,
              },
            }}
          >
            <div
              className={cn(
                "pb-5 pl-11 pr-4",
                "sm:pb-6",
                "sm:pl-[4.55rem]",
                "sm:pr-14",
              )}
            >
              <p
                className={cn(
                  "max-w-[820px]",
                  "text-sm",
                  "leading-[1.75]",
                  "text-white/52",
                  "sm:text-[0.96rem]",
                )}
              >
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* =========================================================
   MAIN FAQ SECTION
========================================================= */

export function GlossaryFaqSection({
  faqs,
  className,
}: GlossaryFaqSectionProps) {
  const reduceMotion = useReducedMotion();

  const [openQuestion, setOpenQuestion] =
    useState<string | null>(
      faqs.items[0]?.question ?? null,
    );

  if (faqs.items.length === 0) {
    return null;
  }

  return (
    <section
      id="frequently-asked-questions"
      className={cn(
        "relative",
        "scroll-mt-28",
        className,
      )}
    >
      {/* Compact heading */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 24,
                filter: "blur(8px)",
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.25,
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
      >
        <div
          className={cn(
            "mb-3",
            "flex items-center gap-3",
          )}
        >
          <span
            className={cn(
              "grid h-8 w-8",
              "place-items-center",
              "rounded-lg",
              "border border-violet-400/15",
              "bg-violet-400/[0.07]",
            )}
          >
            <HelpCircle
              aria-hidden="true"
              className="h-3.5 w-3.5 text-violet-300"
            />
          </span>

          <span
            className={cn(
              "text-[0.62rem]",
              "font-semibold uppercase",
              "tracking-[0.18em]",
              "text-violet-300/65",
            )}
          >
            {faqs.eyebrow ??
              "Common questions"}
          </span>
        </div>

        <h2
          className={cn(
            "max-w-[850px]",
            "text-[clamp(2rem,4vw,4rem)]",
            "font-semibold",
            "leading-[1]",
            "tracking-[-0.05em]",
            "text-white",
          )}
        >
          {faqs.title ??
            "Frequently asked questions"}
        </h2>
      </motion.div>

      {/* FAQ cards */}
      <div className="mt-7 grid gap-3">
        {faqs.items.map(
          (item, index) => {
            const isOpen =
              openQuestion ===
              item.question;

            return (
              <GlossaryFaqItemCard
                key={`${item.question}-${index}`}
                item={item}
                index={index}
                isOpen={isOpen}
                onToggle={() => {
                  setOpenQuestion(
                    isOpen
                      ? null
                      : item.question,
                  );
                }}
              />
            );
          },
        )}
      </div>
    </section>
  );
}