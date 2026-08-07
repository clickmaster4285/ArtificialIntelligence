"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryBackgroundProps {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
  showGrid?: boolean;
  showOrbs?: boolean;
  showParticles?: boolean;
}

/* =========================================================
   STATIC PARTICLE DATA
========================================================= */

/**
 * Static values are used instead of Math.random()
 * to prevent hydration mismatch.
 */
const particles = [
  {
    left: "7%",
    top: "18%",
    size: 3,
    duration: 8,
    delay: 0,
  },
  {
    left: "14%",
    top: "68%",
    size: 2,
    duration: 11,
    delay: 1.2,
  },
  {
    left: "23%",
    top: "36%",
    size: 4,
    duration: 9,
    delay: 0.7,
  },
  {
    left: "31%",
    top: "82%",
    size: 2,
    duration: 12,
    delay: 2,
  },
  {
    left: "39%",
    top: "15%",
    size: 3,
    duration: 10,
    delay: 1.5,
  },
  {
    left: "48%",
    top: "58%",
    size: 2,
    duration: 8,
    delay: 0.4,
  },
  {
    left: "57%",
    top: "29%",
    size: 4,
    duration: 13,
    delay: 2.4,
  },
  {
    left: "66%",
    top: "76%",
    size: 3,
    duration: 9,
    delay: 0.9,
  },
  {
    left: "74%",
    top: "12%",
    size: 2,
    duration: 11,
    delay: 1.8,
  },
  {
    left: "82%",
    top: "49%",
    size: 4,
    duration: 10,
    delay: 0.3,
  },
  {
    left: "89%",
    top: "84%",
    size: 2,
    duration: 12,
    delay: 2.7,
  },
  {
    left: "94%",
    top: "25%",
    size: 3,
    duration: 8,
    delay: 1.1,
  },
] as const;

/* =========================================================
   INTENSITY
========================================================= */

const intensityClasses = {
  soft: {
    primary: "opacity-[0.08]",
    secondary: "opacity-[0.06]",
    grid: "opacity-[0.18]",
    particles: "opacity-40",
  },
  medium: {
    primary: "opacity-[0.13]",
    secondary: "opacity-[0.09]",
    grid: "opacity-[0.25]",
    particles: "opacity-60",
  },
  strong: {
    primary: "opacity-[0.18]",
    secondary: "opacity-[0.13]",
    grid: "opacity-[0.32]",
    particles: "opacity-80",
  },
} as const;

/* =========================================================
   COMPONENT
========================================================= */

export function GlossaryBackground({
  className,
  intensity = "medium",
  showGrid = true,
  showOrbs = true,
  showParticles = true,
}: GlossaryBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const selectedIntensity =
    intensityClasses[intensity];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none",
        "absolute inset-0",
        "overflow-hidden",
        className,
      )}
    >
      {/* Deep base gradient */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(circle_at_50%_-10%,rgba(125,78,255,0.14),transparent_38%),linear-gradient(to_bottom,#050507,#030305)]",
        )}
      />

      {/* Grid */}
      {showGrid && (
        <div
          className={cn(
            "absolute inset-0",
            selectedIntensity.grid,
            "bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]",
            "bg-[size:72px_72px]",
            "[mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]",
          )}
        />
      )}

      {/* Fine dot matrix */}
      <div
        className={cn(
          "absolute inset-0",
          "opacity-[0.12]",
          "bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)]",
          "bg-[size:18px_18px]",
          "[mask-image:linear-gradient(to_bottom,black,transparent_88%)]",
        )}
      />

      {showOrbs && (
        <>
          {/* Violet orb */}
          <motion.div
            className={cn(
              "absolute",
              "-left-[14rem] top-[4%]",
              "h-[34rem] w-[34rem]",
              "rounded-full",
              "bg-violet-500",
              selectedIntensity.primary,
              "blur-[145px]",
            )}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 80, 25, 0],
                    y: [0, 45, 100, 0],
                    scale: [
                      1,
                      1.12,
                      0.94,
                      1,
                    ],
                  }
            }
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Cyan orb */}
          <motion.div
            className={cn(
              "absolute",
              "-right-[12rem] top-[22%]",
              "h-[32rem] w-[32rem]",
              "rounded-full",
              "bg-cyan-400",
              selectedIntensity.secondary,
              "blur-[150px]",
            )}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -65, -15, 0],
                    y: [0, 90, 35, 0],
                    scale: [
                      0.92,
                      1.1,
                      1,
                      0.92,
                    ],
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Magenta accent */}
          <motion.div
            className={cn(
              "absolute",
              "bottom-[-18rem]",
              "left-[38%]",
              "h-[30rem] w-[30rem]",
              "rounded-full",
              "bg-fuchsia-500",
              "opacity-[0.07]",
              "blur-[160px]",
            )}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 70, -45, 0],
                    scale: [
                      1,
                      0.88,
                      1.08,
                      1,
                    ],
                  }
            }
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Animated light paths */}
      <svg
        className={cn(
          "absolute inset-0",
          "h-full w-full",
          "opacity-30",
        )}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient
            id="glossary-path-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#8b5cf6"
              stopOpacity="0"
            />

            <stop
              offset="48%"
              stopColor="#8b5cf6"
              stopOpacity="0.7"
            />

            <stop
              offset="72%"
              stopColor="#22d3ee"
              stopOpacity="0.65"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />
          </linearGradient>

          <filter id="glossary-path-glow">
            <feGaussianBlur
              stdDeviation="4"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M-80 610C180 410 320 520 510 380C710 232 815 280 980 170C1120 78 1270 130 1520 16"
          stroke="url(#glossary-path-gradient)"
          strokeWidth="1"
          filter="url(#glossary-path-glow)"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 0.8,
          }}
          transition={{
            pathLength: {
              duration: 2.4,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 0.8,
            },
          }}
        />

        <motion.path
          d="M-100 760C240 600 340 720 620 530C870 360 1090 470 1530 240"
          stroke="url(#glossary-path-gradient)"
          strokeWidth="0.65"
          strokeDasharray="8 18"
          initial={{
            strokeDashoffset: 120,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  strokeDashoffset: -120,
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>

      {/* Floating particles */}
      {showParticles &&
        particles.map(
          (
            particle,
            particleIndex,
          ) => (
            <motion.span
              key={particleIndex}
              className={cn(
                "absolute rounded-full",
                particleIndex % 3 === 0
                  ? "bg-cyan-300"
                  : "bg-violet-300",
                selectedIntensity.particles,
                "shadow-[0_0_14px_currentColor]",
              )}
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [
                        0,
                        -16,
                        6,
                        0,
                      ],
                      opacity: [
                        0.2,
                        0.85,
                        0.4,
                        0.2,
                      ],
                      scale: [
                        0.8,
                        1.25,
                        0.95,
                        0.8,
                      ],
                    }
              }
              transition={{
                duration:
                  particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ),
        )}

      {/* Center vignette */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(3,3,5,0.72)_100%)]",
        )}
      />

      {/* Bottom fade */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0",
          "h-48",
          "bg-gradient-to-b",
          "from-transparent",
          "to-[#030305]",
        )}
      />
    </div>
  );
}