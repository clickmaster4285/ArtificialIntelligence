"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  BrainCircuit,
  Cpu,
  Orbit,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  TechnologyItem,
  TechnologySection,
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

interface NeuralTechnologyOrbitProps {
  section: TechnologySection;
  sectionIndex?: number;
}

interface OrbitNodeProps {
  item: TechnologyItem;
  index: number;
  totalItems: number;
  active: boolean;
  reduceMotion: boolean | null;
  onActivate: (
    item: TechnologyItem,
  ) => void;
}

/* =========================================================
   ORBIT CONFIGURATION
========================================================= */

const orbitDurations = [
  32,
  38,
  44,
] as const;

function getOrbitRadius(
  index: number,
): number {
  /*
   * Multiple radii create depth instead of placing
   * everything on one perfect circle.
   */
  const radii = [
    37,
    45,
    42,
    48,
    39,
    46,
  ];

  return radii[
    index % radii.length
  ];
}

/* =========================================================
   ORBIT NODE
========================================================= */

function OrbitNode({
  item,
  index,
  totalItems,
  active,
  reduceMotion,
  onActivate,
}: OrbitNodeProps) {
  const angle =
    (index / totalItems) *
      Math.PI *
      2 -
    Math.PI / 2;

  const radius =
    getOrbitRadius(index);

  const left =
    50 +
    Math.cos(angle) * radius;

  const top =
    50 +
    Math.sin(angle) * radius;

  return (
    <motion.button
      type="button"
      aria-label={`View ${item.name} details`}
      aria-pressed={active}
      onPointerEnter={() =>
        onActivate(item)
      }
      onFocus={() =>
        onActivate(item)
      }
      className={cn(
        "group/model absolute",
        "z-20",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "outline-none",
      )}
      style={{
        left: `${left}%`,
        top: `${top}%`,
      }}
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.6,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              scale: 1,
            }
      }
      viewport={{
        once: true,
      }}
      transition={{
        delay: 0.2 + index * 0.08,
        duration: 0.65,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.08,
            }
      }
    >
      {/* Node pulse */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          "rounded-2xl",
          "bg-[var(--neural-primary)]",
          "opacity-0 blur-xl",
          "transition-opacity",
          "duration-300",
          "group-hover/model:opacity-25",
          "group-focus-visible/model:opacity-25",
          active && "opacity-20",
        )}
      />

      <span
        className={cn(
          "relative flex",
          "min-w-[112px]",
          "items-center gap-2.5",
          "rounded-2xl",
          "border px-3 py-3",
          "backdrop-blur-xl",
          "transition-all",
          "duration-300",
          active
            ? [
                "border-[var(--neural-primary)]",
                "bg-[var(--neural-soft)]",
                "text-white",
                "shadow-[0_0_35px_var(--neural-soft)]",
              ].join(" ")
            : [
                "border-white/[0.09]",
                "bg-black/70",
                "text-white/60",
                "hover:border-white/20",
                "hover:bg-white/[0.06]",
                "hover:text-white",
              ].join(" "),
          "group-focus-visible/model:ring-2",
          "group-focus-visible/model:ring-[var(--neural-secondary)]",
        )}
      >
        <span
          className={cn(
            "grid h-7 w-7",
            "shrink-0",
            "place-items-center",
            "rounded-lg",
            active
              ? "bg-white/10"
              : "bg-white/[0.045]",
          )}
        >
          <Cpu
            aria-hidden="true"
            className={cn(
              "h-3.5 w-3.5",
              active
                ? "text-[var(--neural-secondary)]"
                : "text-white/45",
            )}
          />
        </span>

        <span className="text-left">
          <strong
            className={cn(
              "block",
              "text-[0.68rem]",
              "font-semibold",
              "tracking-wide",
            )}
          >
            {item.name}
          </strong>

          {item.category && (
            <small
              className={cn(
                "mt-0.5 block",
                "text-[0.52rem]",
                "uppercase",
                "tracking-[0.12em]",
                "text-white/30",
              )}
            >
              {item.category}
            </small>
          )}
        </span>
      </span>
    </motion.button>
  );
}

/* =========================================================
   CENTRAL CORE
========================================================= */

function IntelligenceCore({
  activeItem,
  reduceMotion,
}: {
  activeItem: TechnologyItem;
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2",
        "z-10",
        "h-[38%] w-[38%]",
        "-translate-x-1/2",
        "-translate-y-1/2",
      )}
    >
      {/* Outer rotating ring */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute -inset-[18%]",
          "rounded-full",
          "border",
          "border-dashed",
          "border-white/[0.1]",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Secondary ring */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute -inset-[7%]",
          "rounded-full",
          "border",
          "border-white/[0.1]",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
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
      </motion.div>

      {/* Core surface */}
      <motion.div
        className={cn(
          "relative flex h-full",
          "w-full flex-col",
          "items-center",
          "justify-center",
          "overflow-hidden",
          "rounded-full",
          "border border-white/[0.12]",
          "bg-black/65",
          "p-[12%]",
          "text-center",
          "shadow-[inset_0_0_60px_rgba(255,255,255,0.035),0_0_100px_var(--neural-soft)]",
          "backdrop-blur-2xl",
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [
                  1,
                  1.025,
                  1,
                ],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            "bg-[radial-gradient(circle_at_50%_15%,var(--neural-soft),transparent_58%)]",
          )}
        />

        <motion.div
          key={activeItem.name}
          className="relative z-10"
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 12,
                  filter: "blur(8px)",
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.45,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <BrainCircuit
            aria-hidden="true"
            className={cn(
              "mx-auto",
              "h-7 w-7",
              "text-[var(--neural-secondary)]",
              "drop-shadow-[0_0_14px_var(--neural-secondary)]",
              "xl:h-10 xl:w-10",
            )}
          />

          <strong
            className={cn(
              "mt-3 block",
              "text-sm",
              "font-semibold",
              "tracking-[-0.02em]",
              "text-white",
              "xl:text-lg",
            )}
          >
            {activeItem.name}
          </strong>

          {activeItem.description && (
            <p
              className={cn(
                "mx-auto mt-2",
                "hidden max-w-[240px]",
                "text-[0.62rem]",
                "leading-relaxed",
                "text-white/38",
                "xl:block",
                "xl:text-xs",
              )}
            >
              {
                activeItem.description
              }
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   DESKTOP ORBIT
========================================================= */

function DesktopOrbit({
  items,
}: {
  items: TechnologyItem[];
}) {
  const reduceMotion = useReducedMotion();

  const [activeItem, setActiveItem] =
    useState<TechnologyItem>(
      items[0],
    );

  return (
    <div
      className={cn(
        "relative mx-auto",
        "hidden aspect-square",
        "w-full max-w-[900px]",
        "lg:block",
      )}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-[12%]",
          "rounded-full",
          "bg-[radial-gradient(circle,var(--neural-soft),transparent_68%)]",
          "opacity-60 blur-3xl",
        )}
      />

      {/* Large orbital paths */}
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          aria-hidden="true"
          className={cn(
            "absolute rounded-full",
            "border border-white/[0.055]",
          )}
          style={{
            inset: `${8 + ring * 9}%`,
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
              orbitDurations[ring],
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span
            className={cn(
              "absolute left-1/2 top-0",
              "h-1.5 w-1.5",
              "-translate-x-1/2",
              "-translate-y-1/2",
              "rounded-full",
              ring % 2 === 0
                ? "bg-[var(--neural-primary)]"
                : "bg-[var(--neural-secondary)]",
            )}
          />
        </motion.div>
      ))}

      <IntelligenceCore
        activeItem={activeItem}
        reduceMotion={reduceMotion}
      />

      {items.map((item, index) => (
        <OrbitNode
          key={item.name}
          item={item}
          index={index}
          totalItems={items.length}
          active={
            activeItem.name === item.name
          }
          reduceMotion={reduceMotion}
          onActivate={setActiveItem}
        />
      ))}
    </div>
  );
}

/* =========================================================
   MOBILE TECHNOLOGY CARDS
========================================================= */

function MobileTechnologyCards({
  items,
}: {
  items: TechnologyItem[];
}) {
  return (
    <StaggerContainer
      className={cn(
        "grid grid-cols-1 gap-3",
        "sm:grid-cols-2",
        "lg:hidden",
      )}
      stagger={0.08}
    >
      {items.map((item, index) => (
        <StaggerItem
          key={item.name}
          preset="fade-scale"
        >
          <article
            className={cn(
              "relative overflow-hidden",
              "glass rounded-3xl",
              "p-5",
              "shadow-[0_24px_80px_-58px_var(--neural-primary)]",
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute right-0 top-0",
                "h-24 w-24",
                "translate-x-1/3",
                "-translate-y-1/3",
                "rounded-full",
                "bg-[var(--neural-primary)]",
                "opacity-10 blur-2xl",
              )}
            />

            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "grid h-11 w-11",
                  "shrink-0",
                  "place-items-center",
                  "rounded-xl",
                  "border border-white/[0.08]",
                  "bg-black/30",
                )}
              >
                <Cpu
                  aria-hidden="true"
                  className="h-5 w-5 text-[var(--neural-secondary)]"
                />
              </div>

              <div>
                <span
                  className={cn(
                    "font-mono",
                    "text-[0.58rem]",
                    "text-white/25",
                  )}
                >
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>

                <h3
                  className={cn(
                    "mt-1 text-lg",
                    "font-semibold",
                    "tracking-[-0.025em]",
                    "text-white",
                  )}
                >
                  {item.name}
                </h3>

                {item.category && (
                  <span
                    className={cn(
                      "mt-1 block",
                      "text-[0.62rem]",
                      "uppercase",
                      "tracking-[0.14em]",
                      "text-[var(--neural-secondary)]",
                    )}
                  >
                    {item.category}
                  </span>
                )}
              </div>
            </div>

            {item.description && (
              <p
                className={cn(
                  "mt-5",
                  "text-sm",
                  "leading-relaxed",
                  "text-white/40",
                )}
              >
                {item.description}
              </p>
            )}
          </article>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function NeuralTechnologyOrbit({
  section,
  sectionIndex = 2,
}: NeuralTechnologyOrbitProps) {
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
        "bg-[#07070a]",
        "px-5 py-8",
        "sm:px-8 sm:py-10",
        "lg:px-12 lg:py-12",
      )}
    >
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-0",
          "opacity-25",
          "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]",
          "bg-[size:72px_72px]",
          "[mask-image:radial-gradient(circle_at_center,black,transparent_78%)]",
        )}
      />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute left-1/2 top-1/2",
          "h-[700px] w-[700px]",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "rounded-full",
          "bg-[var(--neural-primary)]",
          "opacity-[0.05]",
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
              "Technology ecosystem"
            }
            index={sectionIndex}
            align="center"
            size="large"
          />
        </div>

        <div className="mt-0 sm:mt-1">
          <DesktopOrbit
            items={section.items}
          />

          <MobileTechnologyCards
            items={section.items}
          />
        </div>

        {/* Bottom model-independent message */}
        <div
          className={cn(
            "mx-auto mt-8",
            "flex max-w-3xl",
            "items-center",
            "justify-center gap-3",
            "rounded-full",
            "border border-white/[0.07]",
            "bg-white/[0.025]",
            "px-5 py-3",
            "text-center",
            "text-xs",
            "leading-relaxed",
            "text-white/35",
            "backdrop-blur-xl",
          )}
        >
          <Orbit
            aria-hidden="true"
            className={cn(
              "hidden h-4 w-4",
              "shrink-0",
              "text-[var(--neural-secondary)]",
              "sm:block",
            )}
          />

          Model selection follows your task,
          accuracy, latency, governance and
          operating-cost requirements.
        </div>
      </div>
    </section>
  );
}
