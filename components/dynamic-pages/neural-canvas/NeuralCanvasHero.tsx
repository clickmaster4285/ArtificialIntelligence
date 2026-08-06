"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Check,
  CheckCircle2,
  Code2,
  Database,
  DollarSign,
  FileCode2,
  FileText,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";

import {
  useRef,
  type ComponentType,
} from "react";

import type {
  HeroSection,
  PageAppearance,
} from "@/types/dynamic-page";

import { cn } from "@/lib/utils";

import { MagneticButton } from "../shared/MagneticButton";

import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
} from "../shared/MotionReveal";

import { NeuralCanvasBackground } from "./NeuralCanvasBackground";

/* =========================================================
   TYPES
========================================================= */

interface NeuralCanvasHeroProps {
  hero: HeroSection;
  appearance: PageAppearance;
}

interface DocumentSource {
  label: string;
  icon: ComponentType<{
    className?: string;
  }>;
  delay: number;
}

function splitHeroTitle(title: string) {
  const dashIndex = title.indexOf("—");

  if (dashIndex === -1) {
    return {
      lead: title,
      detail: "",
    };
  }

  return {
    lead: title.slice(0, dashIndex).trim(),
    detail: title.slice(dashIndex).trim(),
  };
}

/* =========================================================
   DATA
========================================================= */

const documentSources: DocumentSource[] = [
  {
    label: "TXT",
    icon: FileText,
    delay: 0,
  },
  {
    label: "PDF",
    icon: FileText,
    delay: 0.15,
  },
  {
    label: "MD",
    icon: FileCode2,
    delay: 0.3,
  },
  {
    label: "API",
    icon: Code2,
    delay: 0.45,
  },
];

const systemLayers = [
  "Reasoning",
  "Grounding",
  "Safety",
  "Memory",
] as const;

const heroFeatureChips = [
  "Multimodal workflows",
  "Grounded retrieval",
  "Adaptive memory",
];

const vectorNodes = [
  { x: 18, y: 68 },
  { x: 28, y: 32 },
  { x: 42, y: 48 },
  { x: 51, y: 19 },
  { x: 62, y: 61 },
  { x: 76, y: 36 },
  { x: 84, y: 70 },
  { x: 48, y: 82 },
] as const;

const vectorConnections = [
  [0, 1],
  [0, 2],
  [0, 7],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [2, 7],
  [3, 5],
  [4, 5],
  [4, 6],
  [4, 7],
  [5, 6],
  [6, 7],
] as const;

/* =========================================================
   DOCUMENT SOURCES
========================================================= */

function DocumentSources({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className={cn(
        "absolute left-[1%] top-1/2",
        "z-20 w-[19%]",
        "-translate-y-1/2",
      )}
    >
      <span
        className={cn(
          "mb-3 block text-center",
          "text-[0.48rem]",
          "font-semibold uppercase",
          "tracking-[0.2em]",
          "text-white/55",
          "sm:text-[0.58rem]",
        )}
      >
        Documents
      </span>

      <div className="space-y-2">
        {documentSources.map(
          (source, index) => {
            const Icon = source.icon;

            return (
              <motion.div
                key={source.label}
                className={cn(
                  "relative overflow-hidden",
                  "rounded-lg",
                  "border border-white/[0.12]",
                  "bg-[#0d1020]/80",
                  "px-2 py-2",
                  "shadow-xl",
                  "backdrop-blur-xl",
                  "sm:rounded-xl",
                  "sm:px-3 sm:py-3",
                )}
                initial={
                  reduceMotion
                    ? undefined
                    : {
                      opacity: 0,
                      x: -28,
                      filter:
                        "blur(8px)",
                    }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay:
                    0.5 +
                    source.delay,
                  duration: 0.7,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "h-3 w-3",
                      "text-violet-300",
                      "sm:h-4 sm:w-4",
                    )}
                  />

                  <span
                    className={cn(
                      "font-mono",
                      "text-[0.48rem]",
                      "text-white/65",
                      "sm:text-[0.6rem]",
                    )}
                  >
                    {source.label}
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  {[0, 1, 2].map(
                    (line) => (
                      <motion.div
                        key={line}
                        className={cn(
                          "h-px rounded-full",
                          "bg-white/15",
                        )}
                        style={{
                          width: `${85 - line * 17}%`,
                        }}
                        initial={{
                          scaleX: 0,
                        }}
                        animate={{
                          scaleX: 1,
                        }}
                        transition={{
                          delay:
                            0.8 +
                            index * 0.1 +
                            line * 0.05,
                          duration: 0.7,
                        }}
                      />
                    ),
                  )}
                </div>
              </motion.div>
            );
          },
        )}
      </div>
    </div>
  );
}

/* =========================================================
   LANGUAGE SYSTEM CORE
========================================================= */

function LanguageSystemCore({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className={cn(
        "absolute left-[47%]",
        "top-1/2 z-30",
        "h-[52%] w-[31%]",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "[perspective:1200px]",
      )}
      animate={
        reduceMotion
          ? undefined
          : {
            y: [-7, 7, -7],
          }
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Outer energy glow */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute -inset-[30%]",
          "rounded-full",
          "bg-[radial-gradient(circle,var(--neural-soft),transparent_65%)]",
          "blur-2xl",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
              opacity: [
                0.45,
                0.9,
                0.45,
              ],
              scale: [
                0.9,
                1.08,
                0.9,
              ],
            }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rear glass layers */}
      {[3, 2, 1].map((layer) => (
        <div
          key={layer}
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            "rounded-[1.4rem]",
            "border",
            "border-violet-300/20",
            "bg-violet-500/[0.035]",
            "backdrop-blur-md",
          )}
          style={{
            transform: `translate(${layer * 7}px, ${-layer * 7}px)`,
          }}
        />
      ))}

      {/* Main glass core */}
      <div
        className={cn(
          "relative flex h-full",
          "flex-col overflow-hidden",
          "rounded-[1.35rem]",
          "border border-violet-200/30",
          "bg-[linear-gradient(145deg,rgba(116,72,210,0.28),rgba(5,10,30,0.88)_52%,rgba(20,115,180,0.2))]",
          "p-[9%]",
          "shadow-[inset_0_0_45px_rgba(139,92,246,0.15),0_0_55px_rgba(94,72,220,0.25)]",
          "backdrop-blur-2xl",
        )}
      >
        {/* Core grid */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            "opacity-30",
            "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]",
            "bg-[size:18px_18px]",
          )}
        />

        <div className="relative z-10">
          <Database
            aria-hidden="true"
            className={cn(
              "h-5 w-5",
              "text-cyan-300",
              "drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]",
            )}
          />

          <span
            className={cn(
              "mt-4 block",
              "text-[0.45rem]",
              "font-semibold uppercase",
              "leading-relaxed",
              "tracking-[0.13em]",
              "text-white/75",
              "sm:text-[0.6rem]",
            )}
          >
            Language
            <br />
            System Core
          </span>
        </div>

        <div className="relative z-10 mt-auto space-y-2">
          {systemLayers.map(
            (layer, index) => (
              <motion.div
                key={layer}
                className={cn(
                  "flex items-center",
                  "justify-between gap-2",
                  "border-b",
                  "border-white/[0.08]",
                  "pb-1.5",
                  "text-[0.38rem]",
                  "uppercase",
                  "tracking-[0.08em]",
                  "text-white/45",
                  "sm:text-[0.52rem]",
                )}
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay:
                    1 +
                    index * 0.12,
                }}
              >
                {layer}

                <span
                  className={cn(
                    "h-1.5 w-1.5",
                    "rounded-full",
                    "bg-cyan-300",
                    "shadow-[0_0_8px_rgba(34,211,238,0.9)]",
                  )}
                />
              </motion.div>
            ),
          )}
        </div>

        <motion.div
          aria-hidden="true"
          className={cn(
            "absolute inset-y-0",
            "w-16",
            "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]",
            "blur-lg",
          )}
          animate={{
            left: ["-35%", "120%"],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

/* =========================================================
   VECTOR SPACE
========================================================= */

function VectorSpace({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className={cn(
        "absolute right-[1%]",
        "top-[13%] z-20",
        "h-[31%] w-[25%]",
        "rounded-xl",
        "border border-cyan-200/20",
        "bg-[#07101d]/70",
        "p-3",
        "shadow-2xl",
        "backdrop-blur-xl",
      )}
      initial={
        reduceMotion
          ? undefined
          : {
            opacity: 0,
            x: 30,
            filter: "blur(10px)",
          }
      }
      animate={{
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
      }}
      transition={{
        delay: 0.8,
        duration: 0.8,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      <span
        className={cn(
          "absolute -top-6",
          "left-1/2",
          "-translate-x-1/2",
          "whitespace-nowrap",
          "text-[0.48rem]",
          "font-semibold uppercase",
          "tracking-[0.15em]",
          "text-white/55",
          "sm:text-[0.58rem]",
        )}
      >
        Vector Space
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="h-full w-full"
      >
        {vectorConnections.map(
          (
            [start, end],
            index,
          ) => (
            <motion.line
              key={`${start}-${end}`}
              x1={
                vectorNodes[start].x
              }
              y1={
                vectorNodes[start].y
              }
              x2={vectorNodes[end].x}
              y2={vectorNodes[end].y}
              stroke="rgba(80,180,255,0.42)"
              strokeWidth="0.7"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                delay:
                  1 +
                  index * 0.04,
                duration: 0.7,
              }}
            />
          ),
        )}

        {vectorNodes.map(
          (node, index) => (
            <motion.circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r={
                index % 3 === 0
                  ? 3
                  : 2.1
              }
              fill={
                index % 2 === 0
                  ? "#22d3ee"
                  : "#8b5cf6"
              }
              initial={{
                scale: 0,
              }}
              animate={{
                scale: [
                  0.8,
                  1.35,
                  0.8,
                ],
              }}
              transition={{
                delay:
                  1.1 +
                  index * 0.08,
                duration: 2.8,
                repeat: Infinity,
              }}
              style={{
                filter:
                  "drop-shadow(0 0 5px #22d3ee)",
                transformOrigin: `${node.x}px ${node.y}px`,
              }}
            />
          ),
        )}
      </svg>
    </motion.div>
  );
}

/* =========================================================
   GROUNDED ANSWERS
========================================================= */

function GroundedAnswers({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-[10%]",
        "right-[1%] z-20",
        "w-[25%]",
      )}
    >
      <span
        className={cn(
          "mb-2 block text-center",
          "text-[0.45rem]",
          "font-semibold uppercase",
          "tracking-[0.14em]",
          "text-white/50",
          "sm:text-[0.56rem]",
        )}
      >
        Grounded Answers
      </span>

      <div className="space-y-2">
        {[0, 1, 2].map(
          (item) => (
            <motion.div
              key={item}
              className={cn(
                "rounded-lg",
                "border border-cyan-200/20",
                "bg-[#081526]/80",
                "p-2",
                "shadow-lg",
                "backdrop-blur-xl",
                "sm:rounded-xl",
                "sm:p-3",
              )}
              initial={
                reduceMotion
                  ? undefined
                  : {
                    opacity: 0,
                    x: 28,
                  }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay:
                  1.25 +
                  item * 0.13,
                duration: 0.65,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-1.5">
                  <div className="h-px w-[82%] bg-white/20" />
                  <div className="h-px w-[58%] bg-violet-300/35" />
                </div>

                <CheckCircle2
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5",
                    "shrink-0",
                    "text-cyan-300",
                    "drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]",
                  )}
                />
              </div>
            </motion.div>
          ),
        )}
      </div>
    </div>
  );
}

/* =========================================================
   DATA FLOW SVG
========================================================= */

function DataFlow({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  const paths = [
    "M118 218 C205 205 218 250 315 242",
    "M118 252 C205 240 224 275 315 268",
    "M118 286 C208 285 225 300 315 292",
    "M390 240 C475 218 494 160 590 155",
    "M390 270 C485 282 505 355 594 365",
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 520"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none",
        "absolute inset-0",
        "z-10 h-full w-full",
      )}
    >
      <defs>
        <linearGradient
          id="hero-data-flow"
          x1="0"
          x2="1"
        >
          <stop
            offset="0%"
            stopColor="#8b5cf6"
          />

          <stop
            offset="55%"
            stopColor="#a855f7"
          />

          <stop
            offset="100%"
            stopColor="#22d3ee"
          />
        </linearGradient>

        <filter id="hero-data-glow">
          <feGaussianBlur
            stdDeviation="2.5"
            result="blur"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke="url(#hero-data-flow)"
          strokeWidth={
            index < 3 ? 1.5 : 1.2
          }
          strokeLinecap="round"
          filter="url(#hero-data-glow)"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 0.65,
          }}
          transition={{
            delay:
              0.7 + index * 0.09,
            duration: 1.4,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        />
      ))}

      {!reduceMotion &&
        paths.map((path, index) => (
          <motion.path
            key={`pulse-${path}`}
            d={path}
            fill="none"
            stroke="white"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeDasharray="2 42"
            filter="url(#hero-data-glow)"
            initial={{
              strokeDashoffset: 90,
              opacity: 0,
            }}
            animate={{
              strokeDashoffset: -140,
              opacity: [
                0,
                0.9,
                0,
              ],
            }}
            transition={{
              delay:
                1.2 +
                index * 0.12,
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 0.4,
              ease: "linear",
            }}
          />
        ))}
    </svg>
  );
}

/* =========================================================
   METRICS
========================================================= */

function HeroMetrics({
  metrics,
}: {
  metrics: NonNullable<
    HeroSection["metrics"]
  >;
}) {
  const icons = [
    DollarSign,
    Timer,
    ShieldCheck,
  ];

  return (
    <StaggerContainer
      className={cn(
        "mt-10 grid",
        "max-w-[700px]",
        "grid-cols-1 gap-4",
        "sm:grid-cols-3",
      )}
      delay={0.4}
      stagger={0.1}
    >
      {metrics
        .slice(0, 3)
        .map((metric, index) => {
          const Icon =
            icons[index] ??
            Sparkles;

          return (
            <StaggerItem
              key={`${metric.value}-${metric.label}`}
              preset="blur"
              className={cn(
                "rounded-[1.75rem]",
                "border border-white/[0.08]",
                "bg-white/5",
                "p-5",
                "shadow-[0_28px_80px_rgba(5,12,35,0.24)]",
                "backdrop-blur-xl",
              )}
            >
              <Icon
                aria-hidden="true"
                className={cn(
                  "mb-3 h-5 w-5",
                  "text-violet-400",
                )}
              />

              <strong
                className={cn(
                  "block text-2xl",
                  "font-semibold",
                  "tracking-[-0.04em]",
                  "text-white/85",
                  "sm:text-3xl",
                )}
              >
                {metric.value}
              </strong>

              <span
                className={cn(
                  "mt-1 block",
                  "text-[0.58rem]",
                  "font-semibold uppercase",
                  "tracking-[0.17em]",
                  "text-white/40",
                )}
              >
                {metric.label}
              </span>
            </StaggerItem>
          );
        })}
    </StaggerContainer>
  );
}

/* =========================================================
   MAIN HERO
========================================================= */

export function NeuralCanvasHero({
  hero,
  appearance,
}: NeuralCanvasHeroProps) {
  const titleParts = splitHeroTitle(
    hero.title,
  );

  const heroRef =
    useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: [
      "start start",
      "end start",
    ],
  });

  const rawContentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 115],
  );

  const rawVisualY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 180],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [1, 0.7, 0],
  );

  const contentY = useSpring(
    rawContentY,
    {
      stiffness: 95,
      damping: 25,
    },
  );

  const visualY = useSpring(
    rawVisualY,
    {
      stiffness: 82,
      damping: 26,
    },
  );

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative isolate",
        "min-h-[calc(82svh-5rem)]",
        "overflow-hidden",
        "border-b border-white/[0.07]",
        "bg-[#030406]",
      )}
    >
      <NeuralCanvasBackground
        accent={appearance.accent}
        interactive
        connectionDistance={150}
        speed={0.18}
        className="z-[-5] opacity-35"
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-0",
          "z-[-4]",
          "bg-[radial-gradient(circle_at_75%_45%,rgba(72,52,180,0.19),transparent_34%),radial-gradient(circle_at_87%_55%,rgba(10,140,210,0.12),transparent_32%),linear-gradient(to_bottom,transparent_70%,#030406)]",
        )}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-0",
          "z-[-3] opacity-25",
          "bg-[linear-gradient(rgba(70,100,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(70,100,255,0.06)_1px,transparent_1px)]",
          "bg-[size:84px_84px]",
          "[mask-image:linear-gradient(to_bottom,black,transparent_92%)]",
        )}
      />

      <div
        className={cn(
          "mx-auto grid",
          "min-h-[calc(82svh-5rem)]",
          "w-full max-w-[1600px]",
          "grid-cols-1",
          "items-start gap-10",
          "px-5 pb-10 pt-0",
          "sm:px-8 sm:pb-12 sm:pt-0",
          "lg:grid-cols-[0.98fr_1.02fr]",
          "lg:gap-8",
          "lg:px-12 lg:pb-12 lg:pt-0",
          "xl:px-16",
        )}
      >
        {/* LEFT CONTENT */}
        <motion.div
          className="relative z-30 self-start"
          style={
            reduceMotion
              ? undefined
              : {
                  y: contentY,
                  opacity:
                    contentOpacity,
                }
          }
        >
          {hero.eyebrow && (
            <MotionReveal preset="blur">
              <div
                className={cn(
                  "mb-4 inline-flex",
                  "items-center gap-3",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5",
                    "rounded-full",
                    "bg-violet-400",
                    "shadow-[0_0_14px_rgba(167,139,250,0.95)]",
                  )}
                />

                <span
                  className={cn(
                    "text-[0.65rem]",
                    "font-semibold uppercase",
                    "tracking-[0.24em]",
                    "text-violet-300",
                    "sm:text-xs",
                  )}
                >
                  {hero.eyebrow}
                </span>
              </div>
            </MotionReveal>
          )}

          <div
            className={cn(
              "mb-5 h-1.5 w-[9rem]",
              "rounded-full",
              "bg-gradient-to-r",
              "from-violet-400",
              "via-cyan-300",
              "to-sky-300",
              "shadow-[0_0_30px_rgba(56,189,248,0.25)]",
            )}
          />

          <MotionReveal
            preset="fade-up"
            duration={0.75}
          >
            <h1
              className={cn(
                "max-w-[860px]",
                "text-[clamp(3.35rem,6.2vw,7rem)]",
                "font-semibold",
                "leading-[0.92]",
                "tracking-[-0.06em]",
                "text-white",
              )}
            >
              <span
                className={cn(
                  "bg-[linear-gradient(100deg,#ffffff_0%,#f5f3ff_36%,#a78bfa_68%,#22d3ee_100%)]",
                  "bg-clip-text",
                  "text-white",
                  "supports-[background-clip:text]:text-transparent",
                )}
              >
                {titleParts.lead}
              </span>

              {titleParts.detail && (
                <span
                  className={cn(
                    "block pt-2",
                    "text-[clamp(2rem,3.4vw,3.8rem)]",
                    "leading-[1]",
                    "tracking-[-0.05em]",
                    "text-white/78",
                  )}
                >
                  {titleParts.detail}
                </span>
              )}
            </h1>
          </MotionReveal>

          {hero.highlightedText && (
            <MotionReveal
              preset="blur"
              delay={0.12}
            >
              <div
                className={cn(
                  "mt-4 inline-flex",
                  "items-center gap-2",
                  "rounded-full",
                  "border border-white/[0.12]",
                  "bg-white/[0.045]",
                  "px-4 py-2",
                  "text-sm",
                  "font-semibold",
                  "tracking-[-0.01em]",
                  "shadow-[0_18px_50px_-36px_var(--neural-primary)]",
                  "backdrop-blur-xl",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5",
                    "rounded-full",
                    "bg-[var(--neural-secondary)]",
                    "shadow-[0_0_12px_var(--neural-secondary)]",
                  )}
                />

                <span
                  className={cn(
                    "bg-[linear-gradient(100deg,#a855f7,#6366f1,#22d3ee)]",
                    "bg-clip-text",
                    "text-transparent",
                  )}
                >
                  {hero.highlightedText}
                </span>
              </div>
            </MotionReveal>
          )}

          <MotionReveal
            preset="blur"
            delay={0.2}
          >
            <p
              className={cn(
                "mt-5 max-w-[660px]",
                "text-base",
                "leading-[1.8]",
                "text-white/52",
                "sm:text-lg",
              )}
            >
              {hero.description}
            </p>
          </MotionReveal>

          <MotionReveal
            preset="fade-up"
            delay={0.3}
          >
            <div
              className={cn(
                "mt-6 flex",
                "flex-wrap gap-3",
              )}
            >
              <MagneticButton
                link={hero.primaryCta}
                size="large"
              />

              {hero.secondaryCta && (
                <MagneticButton
                  link={
                    hero.secondaryCta
                  }
                  variant="secondary"
                  size="large"
                />
              )}
            </div>
          </MotionReveal>

          <MotionReveal
            preset="fade-up"
            delay={0.35}
          >
            <div className="mt-5 flex flex-wrap gap-3">
              {heroFeatureChips.map((chip) => (
                <span
                  key={chip}
                  className={cn(
                    "rounded-full",
                    "border border-white/[0.12]",
                    "bg-white/5",
                    "px-4 py-2",
                    "text-[0.65rem]",
                    "font-semibold uppercase",
                    "tracking-[0.18em]",
                    "text-white/70",
                    "shadow-sm",
                    "backdrop-blur",
                  )}
                >
                  {chip}
                </span>
              ))}
            </div>
          </MotionReveal>

          {hero.trustText && (
            <MotionReveal
              preset="fade-up"
              delay={0.37}
            >
              <div
                className={cn(
                  "mt-5 flex",
                  "items-center gap-2",
                  "text-xs",
                  "text-white/35",
                )}
              >
                <span
                  className={cn(
                    "grid h-5 w-5",
                    "place-items-center",
                    "rounded-full",
                    "bg-emerald-400/10",
                  )}
                >
                  <Check className="h-3 w-3 text-emerald-300" />
                </span>

                {hero.trustText}
              </div>
            </MotionReveal>
          )}

          {hero.metrics && (
            <HeroMetrics
              metrics={hero.metrics}
            />
          )}
        </motion.div>

        {/* RIGHT SYSTEM VISUAL */}
        <motion.div
          className={cn(
            "relative z-20",
            "mx-auto aspect-[1.2/1]",
            "w-full max-w-[820px]",
          )}
          initial={
            reduceMotion
              ? undefined
              : {
                opacity: 0,
                scale: 0.88,
                filter: "blur(18px)",
              }
          }
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 0.28,
            duration: 1.2,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          style={
            reduceMotion
              ? undefined
              : {
                y: visualY,
              }
          }
        >
          <DataFlow
            reduceMotion={reduceMotion}
          />

          <DocumentSources
            reduceMotion={reduceMotion}
          />

          <LanguageSystemCore
            reduceMotion={reduceMotion}
          />

          <VectorSpace
            reduceMotion={reduceMotion}
          />

          <GroundedAnswers
            reduceMotion={reduceMotion}
          />

          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute bottom-[3%]",
              "left-[38%]",
              "h-[22%] w-[52%]",
              "rounded-[50%]",
              "border",
              "border-cyan-300/15",
            )}
            animate={
              reduceMotion
                ? undefined
                : {
                  rotate: 360,
                }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
