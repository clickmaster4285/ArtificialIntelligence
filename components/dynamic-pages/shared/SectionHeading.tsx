"use client";

import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  MotionReveal,
  TextMaskReveal,
} from "./MotionReveal";

/* =========================================================
   TYPES
========================================================= */

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;

  /**
   * Optional text inside title that receives
   * gradient styling.
   */
  highlightedText?: string;

  align?: "left" | "center";
  size?: "default" | "large";

  /**
   * Optional section number:
   * 01, 02, 03...
   */
  index?: number;

  className?: string;
}

/* =========================================================
   TITLE SPLITTER
========================================================= */

interface TitleParts {
  before: string;
  highlighted: string;
  after: string;
}

function splitTitle(
  title: string,
  highlightedText?: string,
): TitleParts | null {
  if (!highlightedText) {
    return null;
  }

  const titleLowerCase =
    title.toLowerCase();

  const highlightedLowerCase =
    highlightedText.toLowerCase();

  const startIndex =
    titleLowerCase.indexOf(
      highlightedLowerCase,
    );

  if (startIndex === -1) {
    return null;
  }

  return {
    before: title.slice(0, startIndex),

    highlighted: title.slice(
      startIndex,
      startIndex +
        highlightedText.length,
    ),

    after: title.slice(
      startIndex +
        highlightedText.length,
    ),
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export function SectionHeading({
  eyebrow,
  title,
  description,
  highlightedText,
  align = "left",
  size = "default",
  index,
  className,
}: SectionHeadingProps) {
  const titleParts = splitTitle(
    title,
    highlightedText,
  );

  const isCentered =
    align === "center";

  return (
    <div
      className={cn(
        "relative",
        isCentered
          ? "mx-auto text-center"
          : "text-left",
        isCentered
          ? "max-w-[980px]"
          : "max-w-[900px]",
        className,
      )}
    >
      {/* ===============================================
          EYEBROW AND INDEX
      =============================================== */}

      <MotionReveal
        preset="blur"
        duration={0.65}
      >
        <div
          className={cn(
            "mb-0 flex",
            "items-center gap-4",
            isCentered &&
              "justify-center",
          )}
        >
          {typeof index === "number" && (
            <>
              <span
                className={cn(
                  "font-mono",
                  "text-[0.62rem]",
                  "font-medium",
                  "tracking-[0.14em]",
                  "text-white/25",
                )}
              >
                {String(index).padStart(
                  2,
                  "0",
                )}
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  "h-px w-8",
                  "bg-[linear-gradient(90deg,var(--neural-primary),transparent)]",
                )}
              />
            </>
          )}

          {eyebrow && (
            <div
              className={cn(
                "inline-flex",
                "items-center gap-2",
              )}
            >
              <Sparkles
                aria-hidden="true"
                className={cn(
                  "h-3.5 w-3.5",
                  "text-[var(--neural-secondary)]",
                  "drop-shadow-[0_0_10px_var(--neural-secondary)]",
                )}
              />

              <span
                className={cn(
                  "text-[0.65rem]",
                  "font-semibold",
                  "uppercase",
                  "tracking-[0.22em]",
                  "text-white/45",
                  "sm:text-xs",
                )}
              >
                {eyebrow}
              </span>
            </div>
          )}
        </div>
      </MotionReveal>

      {/* ===============================================
          TITLE
      =============================================== */}

      <TextMaskReveal
        duration={1}
        amount={0.3}
      >
        <h2
          className={cn(
            "font-semibold",
            "leading-[1]",
            "tracking-[-0.045em]",
            "text-white",
            size === "large"
              ? [
                  "text-[clamp(2.5rem,4.4vw,5rem)]",
                ]
              : [
                  "text-[clamp(2.15rem,3.6vw,4.1rem)]",
                ],
          )}
        >
          {titleParts ? (
            <>
              {titleParts.before}

              <span
                className={cn(
                  "bg-[linear-gradient(110deg,var(--neural-primary),var(--neural-secondary),var(--neural-highlight))]",
                  "bg-[length:200%_100%]",
                  "bg-clip-text",
                  "text-transparent",
                )}
              >
                {
                  titleParts.highlighted
                }
              </span>

              {titleParts.after}
            </>
          ) : (
            title
          )}
        </h2>
      </TextMaskReveal>

      {/* ===============================================
          DESCRIPTION
      =============================================== */}

      {description && (
        <MotionReveal
          preset="blur"
          delay={0.12}
          duration={0.8}
        >
          <p
            className={cn(
              "mt-1",
              "max-w-[720px]",
              "text-base",
              "leading-[1.8]",
              "text-white/54",
              "sm:text-base",
              "lg:text-[1.05rem]",
              isCentered && "mx-auto",
            )}
          >
            {description}
          </p>
        </MotionReveal>
      )}
    </div>
  );
}
