"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import type {
  GlossaryCta,
  GlossaryLink,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryDetailCtaProps {
  cta: GlossaryCta;
  className?: string;
}

/* =========================================================
   CTA LINK
========================================================= */

function CtaLink({
  link,
  variant,
}: {
  link: GlossaryLink;
  variant: "primary" | "secondary";
}) {
  const isPrimary =
    variant === "primary";

  const className = cn(
    "group/link",
    "inline-flex min-h-12",
    "items-center",
    "justify-center gap-2.5",
    "rounded-xl",
    "px-5 py-3",
    "text-sm font-semibold",
    "transition-all",
    "duration-300",
    "active:scale-[0.98]",
    isPrimary
      ? [
          "bg-white",
          "text-black",
          "hover:bg-violet-200",
          "hover:shadow-[0_0_40px_rgba(196,181,253,0.28)]",
        ].join(" ")
      : [
          "border border-white/[0.1]",
          "bg-white/[0.035]",
          "text-white/60",
          "backdrop-blur-xl",
          "hover:border-cyan-300/25",
          "hover:bg-cyan-300/[0.06]",
          "hover:text-white",
        ].join(" "),
  );

  const content = (
    <>
      <span>{link.label}</span>

      {link.external ? (
        <ExternalLink
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            "transition-transform",
            "group-hover/link:translate-x-0.5",
            "group-hover/link:-translate-y-0.5",
          )}
        />
      ) : (
        <ArrowRight
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            "transition-transform",
            "group-hover/link:translate-x-1",
          )}
        />
      )}
    </>
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          link.ariaLabel ??
          link.label
        }
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      aria-label={
        link.ariaLabel ??
        link.label
      }
      className={className}
    >
      {content}
    </Link>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function GlossaryDetailCta({
  cta,
  className,
}: GlossaryDetailCtaProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 30,
              scale: 0.985,
              filter: "blur(10px)",
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.85,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={cn(
        "group/cta relative",
        "overflow-hidden",
        "rounded-[2rem]",
        "border border-violet-400/20",
        "bg-[linear-gradient(115deg,rgba(139,92,246,0.14),rgba(255,255,255,0.025)_48%,rgba(34,211,238,0.075))]",
        "px-5 py-9",
        "shadow-[0_40px_130px_-60px_rgba(139,92,246,0.85)]",
        "backdrop-blur-2xl",
        "sm:px-8 sm:py-12",
        "lg:px-12 lg:py-14",
        className,
      )}
    >
      {/* Animated top line */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-10 top-0",
          "h-px",
          "origin-left",
          "bg-[linear-gradient(90deg,transparent,#c084fc,#6366f1,#22d3ee,transparent)]",
        )}
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        whileInView={{
          scaleX: 1,
          opacity: 0.9,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.25,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      />

      {/* Violet glow */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -left-24 -top-24",
          "h-72 w-72",
          "rounded-full",
          "bg-violet-500/15",
          "blur-[100px]",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 55, 0],
                y: [0, 30, 0],
                scale: [
                  1,
                  1.12,
                  1,
                ],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan glow */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -bottom-28 -right-20",
          "h-72 w-72",
          "rounded-full",
          "bg-cyan-400/10",
          "blur-[110px]",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -45, 0],
                y: [0, -25, 0],
                scale: [
                  0.95,
                  1.08,
                  0.95,
                ],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-0",
          "opacity-[0.16]",
          "bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]",
          "bg-[size:44px_44px]",
          "[mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]",
        )}
      />

      <div
        className={cn(
          "relative z-10",
          "mx-auto",
          "max-w-[980px]",
          "text-center",
        )}
      >
        {/* Eyebrow */}
        {cta.eyebrow && (
          <div
            className={cn(
              "mx-auto mb-5",
              "inline-flex",
              "items-center gap-2",
              "rounded-full",
              "border border-violet-400/20",
              "bg-violet-400/[0.08]",
              "px-3 py-2",
            )}
          >
            <Sparkles
              aria-hidden="true"
              className="h-3.5 w-3.5 text-violet-300"
            />

            <span
              className={cn(
                "text-[0.62rem]",
                "font-semibold uppercase",
                "tracking-[0.18em]",
                "text-violet-100/65",
              )}
            >
              {cta.eyebrow}
            </span>
          </div>
        )}

        {/* Title */}
        <h2
          className={cn(
            "text-[clamp(2.25rem,5vw,5.2rem)]",
            "font-semibold",
            "leading-[0.96]",
            "tracking-[-0.06em]",
            "text-white",
          )}
        >
          {cta.title}
        </h2>

        {/* Description */}
        {cta.description && (
          <p
            className={cn(
              "mx-auto mt-5",
              "max-w-[700px]",
              "text-sm",
              "leading-[1.75]",
              "text-white/48",
              "sm:text-base",
            )}
          >
            {cta.description}
          </p>
        )}

        {/* Buttons */}
        <div
          className={cn(
            "mt-7",
            "flex flex-wrap",
            "items-center",
            "justify-center",
            "gap-3",
          )}
        >
          <CtaLink
            link={cta.primaryLink}
            variant="primary"
          />

          {cta.secondaryLink && (
            <CtaLink
              link={cta.secondaryLink}
              variant="secondary"
            />
          )}
        </div>
      </div>
    </motion.section>
  );
}