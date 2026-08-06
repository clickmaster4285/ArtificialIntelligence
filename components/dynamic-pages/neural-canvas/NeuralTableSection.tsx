"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

import type {
  TableRow,
  TableSection,
} from "@/types/dynamic-page";

import { cn } from "@/lib/utils";

import { MagneticButton } from "../shared/MagneticButton";

import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
} from "../shared/MotionReveal";

import { SectionHeading } from "../shared/SectionHeading";

/* =========================================================
   TYPES
========================================================= */

interface NeuralTableSectionProps {
  section: TableSection;
  sectionIndex?: number;
}

/* =========================================================
   DESKTOP ROW
========================================================= */

function DesktopTableRow({
  row,
  section,
  index,
}: {
  row: TableRow;
  section: TableSection;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.tr
      className={cn(
        "group/row relative",
        "border-b border-white/[0.065]",
        "last:border-b-0",
        row.highlighted
          ? "bg-[var(--neural-soft)]"
          : "bg-transparent",
      )}
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              x: -35,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        delay: index * 0.07,
        duration: 0.65,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      {section.columns.map(
        (column, columnIndex) => (
          <td
            key={`${row.id}-${column.key}`}
            className={cn(
              "relative",
              "px-6 py-6",
              "align-middle",
              "text-sm",
              "leading-relaxed",
              "text-white/50",
              "transition-colors",
              "duration-300",
              "group-hover/row:text-white/75",
              column.align ===
                "center" &&
                "text-center",
              column.align === "right" &&
                "text-right",
              columnIndex === 0 &&
                "font-medium text-white/80",
            )}
            style={{
              width: column.width,
            }}
          >
            {/* Row hover surface */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none",
                "absolute inset-0",
                "bg-white/[0.025]",
                "opacity-0",
                "transition-opacity",
                "duration-300",
                "group-hover/row:opacity-100",
              )}
            />

            <span
              className={cn(
                "relative z-10",
                "inline-flex",
                "items-center gap-3",
              )}
            >
              {columnIndex === 0 &&
                row.highlighted && (
                  <span
                    className={cn(
                      "grid h-6 w-6",
                      "shrink-0",
                      "place-items-center",
                      "rounded-full",
                      "bg-[var(--neural-primary)]",
                      "text-white",
                      "shadow-[0_0_20px_var(--neural-soft)]",
                    )}
                  >
                    <Check
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    />
                  </span>
                )}

              <span>
                {row.cells[column.key] ??
                  "—"}
              </span>
            </span>

            {columnIndex === 0 &&
              row.badge && (
                <span
                  className={cn(
                    "relative z-10",
                    "ml-3 inline-flex",
                    "rounded-full",
                    "border",
                    "border-[var(--neural-primary)]",
                    "bg-[var(--neural-soft)]",
                    "px-2.5 py-1",
                    "text-[0.56rem]",
                    "font-semibold",
                    "uppercase",
                    "tracking-[0.13em]",
                    "text-[var(--neural-highlight)]",
                  )}
                >
                  {row.badge}
                </span>
              )}
          </td>
        ),
      )}
    </motion.tr>
  );
}

/* =========================================================
   DESKTOP TABLE
========================================================= */

function DesktopTable({
  section,
}: {
  section: TableSection;
}) {
  return (
    <MotionReveal
      preset="fade-scale"
      amount={0.1}
      className="hidden md:block"
    >
      <div
        className={cn(
          "relative overflow-hidden",
          "glass rounded-3xl",
          "shadow-[0_30px_100px_-58px_var(--neural-soft)]",
        )}
      >
        {/* Top gradient border */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0",
            "z-20 h-px",
            "bg-[linear-gradient(90deg,transparent,var(--neural-primary),var(--neural-secondary),transparent)]",
          )}
        />

        {/* Table ambient glow */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute -right-32 -top-32",
            "h-80 w-80",
            "rounded-full",
            "bg-[var(--neural-primary)]",
            "opacity-[0.08]",
            "blur-[100px]",
          )}
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse">
            <thead>
              <tr
                className={cn(
                  "border-b",
                  "border-white/[0.09]",
                  "bg-white/[0.025]",
                )}
              >
                {section.columns.map(
                  (column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={cn(
                        "px-6 py-5",
                        "text-left",
                        "text-[0.62rem]",
                        "font-semibold",
                        "uppercase",
                        "tracking-[0.18em]",
                        "text-white/35",
                        column.align ===
                          "center" &&
                          "text-center",
                        column.align ===
                          "right" &&
                          "text-right",
                      )}
                      style={{
                        width: column.width,
                      }}
                    >
                      {column.label}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {section.rows.map(
                (row, index) => (
                  <DesktopTableRow
                    key={row.id}
                    row={row}
                    section={section}
                    index={index}
                  />
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MotionReveal>
  );
}

/* =========================================================
   MOBILE CARDS
========================================================= */

function MobileTableCards({
  section,
}: {
  section: TableSection;
}) {
  return (
    <StaggerContainer
      className="grid gap-4 md:hidden"
      stagger={0.08}
    >
      {section.rows.map(
        (row, rowIndex) => (
          <StaggerItem
            key={row.id}
            preset="fade-scale"
          >
            <article
              className={cn(
                "relative overflow-hidden",
                "rounded-3xl p-5",
                row.highlighted
                  ? [
                      "glass",
                      "border-[var(--neural-primary)]",
                      "shadow-[0_30px_95px_-50px_var(--neural-soft)]",
                    ].join(" ")
                  : [
                      "glass",
                      "shadow-[0_24px_80px_-58px_var(--neural-primary)]",
                    ].join(" "),
              )}
            >
              {/* Card number */}
              <span
                className={cn(
                  "absolute right-4 top-4",
                  "font-mono",
                  "text-[0.58rem]",
                  "text-white/20",
                )}
              >
                {String(
                  rowIndex + 1,
                ).padStart(2, "0")}
              </span>

              {row.badge && (
                <div
                  className={cn(
                    "mb-5 inline-flex",
                    "items-center gap-2",
                    "rounded-full",
                    "border",
                    "border-[var(--neural-primary)]",
                    "bg-black/20",
                    "px-3 py-1.5",
                    "text-[0.58rem]",
                    "font-semibold",
                    "uppercase",
                    "tracking-[0.13em]",
                    "text-[var(--neural-highlight)]",
                  )}
                >
                  <Sparkles
                    aria-hidden="true"
                    className="h-3 w-3"
                  />

                  {row.badge}
                </div>
              )}

              <dl className="space-y-5">
                {section.columns.map(
                  (
                    column,
                    columnIndex,
                  ) => (
                    <div
                      key={`${row.id}-${column.key}`}
                      className={cn(
                        columnIndex > 0 &&
                          [
                            "border-t",
                            "border-white/[0.065]",
                            "pt-4",
                          ].join(" "),
                      )}
                    >
                      <dt
                        className={cn(
                          "text-[0.58rem]",
                          "font-semibold",
                          "uppercase",
                          "tracking-[0.16em]",
                          "text-white/30",
                        )}
                      >
                        {column.label}
                      </dt>

                      <dd
                        className={cn(
                          "mt-2",
                          "text-sm",
                          "leading-relaxed",
                          columnIndex === 0
                            ? [
                                "text-lg",
                                "font-semibold",
                                "tracking-[-0.025em]",
                                "text-white",
                              ].join(" ")
                            : "text-white/60",
                        )}
                      >
                        {row.cells[
                          column.key
                        ] ?? "—"}
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </article>
          </StaggerItem>
        ),
      )}
    </StaggerContainer>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function NeuralTableSection({
  section,
  sectionIndex = 3,
}: NeuralTableSectionProps) {
  if (
    section.columns.length === 0 ||
    section.rows.length === 0
  ) {
    return null;
  }

  const usesFaqTightHeading = true;

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
      {/* Background radial light */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute left-1/2 top-1/3",
          "h-[650px] w-[900px]",
          "-translate-x-1/2",
          "rounded-full",
          "bg-[var(--neural-primary)]",
          "opacity-[0.045]",
          "blur-[170px]",
        )}
      />

      {/* Decorative horizontal lines */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute inset-0",
          "opacity-20",
          "bg-[linear-gradient(to_bottom,transparent_49.8%,rgba(255,255,255,0.04)_50%,transparent_50.2%)]",
          "bg-[size:100%_120px]",
        )}
      />

      <div
        className={cn(
          "relative z-10",
          "mx-auto max-w-[1440px]",
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
              "Project investment"
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

        <div className="mt-0 sm:mt-1">
          <DesktopTable
            section={section}
          />

          <MobileTableCards
            section={section}
          />
        </div>

        {(section.note ||
          section.cta) && (
          <MotionReveal
            preset="fade-up"
            delay={0.12}
            className={cn(
              "mt-8 flex",
              "flex-col gap-6",
              "glass rounded-3xl",
              "p-5",
              "shadow-[0_24px_80px_-58px_var(--neural-primary)]",
              "sm:p-6",
              "lg:flex-row",
              "lg:items-center",
              "lg:justify-between",
            )}
          >
            {section.note && (
              <p
                className={cn(
                  "max-w-4xl",
                  "text-sm",
                  "leading-[1.75]",
                  "text-white/38",
                )}
              >
                {section.note}
              </p>
            )}

            {section.cta && (
              <MagneticButton
                link={section.cta}
                variant="secondary"
                icon={
                  <ArrowRight className="h-4 w-4" />
                }
                showArrow={false}
                className="shrink-0"
              />
            )}
          </MotionReveal>
        )}
      </div>
    </section>
  );
}
