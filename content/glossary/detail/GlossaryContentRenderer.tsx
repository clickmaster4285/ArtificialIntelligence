"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Quote,
  Sparkles,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import type {
  GlossaryCallout,
  GlossaryContentBlock,
} from "@/types/glossary";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryContentRendererProps {
  blocks: GlossaryContentBlock[];
}

/* =========================================================
   ANIMATED BLOCK
========================================================= */

function AnimatedContentBlock({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
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
        amount: 0.16,
      }}
      transition={{
        duration: 0.65,
        delay: Math.min(
          index * 0.05,
          0.2,
        ),
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   CALLOUT CONFIGURATION
========================================================= */

interface CalloutStyle {
  icon: LucideIcon;
  border: string;
  background: string;
  iconContainer: string;
  iconColor: string;
  titleColor: string;
  glow: string;
}

const calloutStyles: Record<
  NonNullable<GlossaryCallout["variant"]>,
  CalloutStyle
> = {
  info: {
    icon: Info,
    border: "border-cyan-300/20",
    background:
      "bg-cyan-300/[0.055]",
    iconContainer:
      "border-cyan-300/15 bg-cyan-300/[0.08]",
    iconColor: "text-cyan-300",
    titleColor: "text-cyan-100/80",
    glow: "bg-cyan-400/10",
  },

  success: {
    icon: CheckCircle2,
    border:
      "border-emerald-300/20",
    background:
      "bg-emerald-300/[0.05]",
    iconContainer:
      "border-emerald-300/15 bg-emerald-300/[0.08]",
    iconColor:
      "text-emerald-300",
    titleColor:
      "text-emerald-100/80",
    glow: "bg-emerald-400/10",
  },

  warning: {
    icon: AlertTriangle,
    border: "border-amber-300/20",
    background:
      "bg-amber-300/[0.05]",
    iconContainer:
      "border-amber-300/15 bg-amber-300/[0.08]",
    iconColor: "text-amber-300",
    titleColor:
      "text-amber-100/80",
    glow: "bg-amber-400/10",
  },

  highlight: {
    icon: Sparkles,
    border:
      "border-violet-400/25",
    background:
      "bg-[linear-gradient(115deg,rgba(139,92,246,0.1),rgba(34,211,238,0.035))]",
    iconContainer:
      "border-violet-400/20 bg-violet-400/[0.1]",
    iconColor: "text-violet-300",
    titleColor:
      "text-violet-100/85",
    glow: "bg-violet-500/12",
  },
};

/* =========================================================
   CALLOUT
========================================================= */

function CalloutBlock({
  block,
}: {
  block: GlossaryCallout;
}) {
  const variant =
    block.variant ?? "info";

  const styles =
    calloutStyles[variant];

  const Icon = styles.icon;

  return (
    <aside
      className={cn(
        "relative",
        "overflow-hidden",
        "rounded-2xl",
        "border",
        styles.border,
        styles.background,
        "p-5",
        "sm:p-6",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute -right-14 -top-14",
          "h-40 w-40",
          "rounded-full",
          styles.glow,
          "blur-[65px]",
        )}
      />

      <div
        className={cn(
          "relative z-10",
          "flex items-start gap-4",
        )}
      >
        <span
          className={cn(
            "grid h-10 w-10",
            "shrink-0",
            "place-items-center",
            "rounded-xl",
            "border",
            styles.iconContainer,
          )}
        >
          <Icon
            aria-hidden="true"
            className={cn(
              "h-4 w-4",
              styles.iconColor,
            )}
          />
        </span>

        <div>
          {block.title && (
            <h3
              className={cn(
                "text-sm",
                "font-semibold",
                "tracking-[-0.015em]",
                styles.titleColor,
              )}
            >
              {block.title}
            </h3>
          )}

          <p
            className={cn(
              block.title && "mt-2",
              "text-sm",
              "leading-[1.75]",
              "text-white/55",
              "sm:text-[0.96rem]",
            )}
          >
            {block.text}
          </p>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   MAIN RENDERER
========================================================= */

export function GlossaryContentRenderer({
  blocks,
}: GlossaryContentRendererProps) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const blockKey = `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph":
            return (
              <AnimatedContentBlock
                key={blockKey}
                index={index}
              >
                <p
                  className={cn(
                    "text-base",
                    "leading-[1.85]",
                    "text-white/58",
                    "sm:text-[1.05rem]",
                  )}
                >
                  {block.text}
                </p>
              </AnimatedContentBlock>
            );

          case "bullet-list":
            return (
              <AnimatedContentBlock
                key={blockKey}
                index={index}
              >
                <div>
                  {block.title && (
                    <h3
                      className={cn(
                        "mb-4",
                        "text-lg",
                        "font-semibold",
                        "tracking-[-0.025em]",
                        "text-white/85",
                      )}
                    >
                      {block.title}
                    </h3>
                  )}

                  <ul className="space-y-3">
                    {block.items.map(
                      (
                        item,
                        itemIndex,
                      ) => (
                        <li
                          key={`${item}-${itemIndex}`}
                          className={cn(
                            "group/item",
                            "flex items-start",
                            "gap-3",
                            "rounded-xl",
                            "border border-white/[0.055]",
                            "bg-white/[0.018]",
                            "px-4 py-3.5",
                            "text-sm",
                            "leading-[1.7]",
                            "text-white/52",
                            "transition-all",
                            "duration-300",
                            "hover:border-violet-400/15",
                            "hover:bg-violet-400/[0.035]",
                            "hover:text-white/68",
                            "sm:text-[0.96rem]",
                          )}
                        >
                          <span
                            className={cn(
                              "mt-[0.52rem]",
                              "h-1.5 w-1.5",
                              "shrink-0",
                              "rounded-full",
                              "bg-violet-400",
                              "shadow-[0_0_12px_rgba(139,92,246,0.8)]",
                            )}
                          />

                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </AnimatedContentBlock>
            );

          case "numbered-list":
            return (
              <AnimatedContentBlock
                key={blockKey}
                index={index}
              >
                <div>
                  {block.title && (
                    <h3
                      className={cn(
                        "mb-4",
                        "text-lg",
                        "font-semibold",
                        "tracking-[-0.025em]",
                        "text-white/85",
                      )}
                    >
                      {block.title}
                    </h3>
                  )}

                  <ol className="space-y-3">
                    {block.items.map(
                      (
                        item,
                        itemIndex,
                      ) => (
                        <li
                          key={`${item}-${itemIndex}`}
                          className={cn(
                            "group/item",
                            "flex items-start",
                            "gap-4",
                            "rounded-xl",
                            "border border-white/[0.055]",
                            "bg-white/[0.018]",
                            "px-4 py-4",
                            "transition-all",
                            "duration-300",
                            "hover:border-cyan-300/15",
                            "hover:bg-cyan-300/[0.025]",
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-7 w-7",
                              "shrink-0",
                              "place-items-center",
                              "rounded-lg",
                              "border border-cyan-300/15",
                              "bg-cyan-300/[0.06]",
                              "font-mono",
                              "text-[0.58rem]",
                              "font-semibold",
                              "text-cyan-200/70",
                            )}
                          >
                            {String(
                              itemIndex +
                                1,
                            ).padStart(
                              2,
                              "0",
                            )}
                          </span>

                          <span
                            className={cn(
                              "pt-0.5",
                              "text-sm",
                              "leading-[1.7]",
                              "text-white/52",
                              "transition-colors",
                              "group-hover/item:text-white/68",
                              "sm:text-[0.96rem]",
                            )}
                          >
                            {item}
                          </span>
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              </AnimatedContentBlock>
            );

          case "callout":
            return (
              <AnimatedContentBlock
                key={blockKey}
                index={index}
              >
                <CalloutBlock
                  block={block}
                />
              </AnimatedContentBlock>
            );

          case "quote":
            return (
              <AnimatedContentBlock
                key={blockKey}
                index={index}
              >
                <figure
                  className={cn(
                    "relative",
                    "overflow-hidden",
                    "rounded-2xl",
                    "border border-violet-400/15",
                    "bg-[linear-gradient(120deg,rgba(139,92,246,0.08),rgba(255,255,255,0.02))]",
                    "p-5",
                    "sm:p-7",
                  )}
                >
                  <Quote
                    aria-hidden="true"
                    className={cn(
                      "absolute right-5 top-5",
                      "h-12 w-12",
                      "text-violet-300/[0.08]",
                    )}
                  />

                  <blockquote
                    className={cn(
                      "relative z-10",
                      "max-w-[760px]",
                      "text-lg",
                      "font-medium",
                      "leading-[1.65]",
                      "tracking-[-0.02em]",
                      "text-white/72",
                      "sm:text-xl",
                    )}
                  >
                    “{block.text}”
                  </blockquote>

                  {(block.author ||
                    block.role) && (
                    <figcaption
                      className={cn(
                        "relative z-10",
                        "mt-5 flex",
                        "items-center gap-3",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-8 bg-violet-400/50"
                      />

                      <span className="text-xs text-white/38">
                        {block.author}

                        {block.author &&
                          block.role &&
                          ", "}

                        {block.role}
                      </span>
                    </figcaption>
                  )}
                </figure>
              </AnimatedContentBlock>
            );

          case "code":
            return (
              <AnimatedContentBlock
                key={blockKey}
                index={index}
              >
                <figure
                  className={cn(
                    "overflow-hidden",
                    "rounded-2xl",
                    "border border-white/[0.08]",
                    "bg-[#08080c]",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center",
                      "justify-between",
                      "border-b border-white/[0.07]",
                      "bg-white/[0.025]",
                      "px-4 py-3",
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/65" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/65" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/65" />
                    </div>

                    {block.language && (
                      <span
                        className={cn(
                          "font-mono",
                          "text-[0.6rem]",
                          "uppercase",
                          "tracking-[0.14em]",
                          "text-white/25",
                        )}
                      >
                        {block.language}
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <pre
                      className={cn(
                        "min-w-max",
                        "p-5",
                        "font-mono",
                        "text-sm",
                        "leading-[1.75]",
                        "text-cyan-100/65",
                      )}
                    >
                      <code>
                        {block.code}
                      </code>
                    </pre>
                  </div>

                  {block.caption && (
                    <figcaption
                      className={cn(
                        "border-t border-white/[0.06]",
                        "px-4 py-3",
                        "text-xs",
                        "text-white/30",
                      )}
                    >
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              </AnimatedContentBlock>
            );

          case "table":
            return (
              <AnimatedContentBlock
                key={blockKey}
                index={index}
              >
                <figure>
                  {block.caption && (
                    <figcaption
                      className={cn(
                        "mb-4",
                        "text-sm",
                        "font-semibold",
                        "text-white/72",
                      )}
                    >
                      {block.caption}
                    </figcaption>
                  )}

                  <div
                    className={cn(
                      "overflow-hidden",
                      "rounded-2xl",
                      "border border-white/[0.08]",
                      "bg-white/[0.018]",
                    )}
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[680px] border-collapse">
                        <thead>
                          <tr
                            className={cn(
                              "border-b border-white/[0.08]",
                              "bg-violet-400/[0.06]",
                            )}
                          >
                            {block.headers.map(
                              (
                                header,
                                headerIndex,
                              ) => (
                                <th
                                  key={`${header}-${headerIndex}`}
                                  scope="col"
                                  className={cn(
                                    "px-4 py-4",
                                    "text-left",
                                    "text-[0.64rem]",
                                    "font-semibold",
                                    "uppercase",
                                    "tracking-[0.13em]",
                                    "text-violet-100/60",
                                  )}
                                >
                                  {header}
                                </th>
                              ),
                            )}
                          </tr>
                        </thead>

                        <tbody>
                          {block.rows.map(
                            (
                              row,
                              rowIndex,
                            ) => (
                              <tr
                                key={rowIndex}
                                className={cn(
                                  "border-b border-white/[0.055]",
                                  "transition-colors",
                                  "last:border-b-0",
                                  "hover:bg-white/[0.025]",
                                )}
                              >
                                {row.map(
                                  (
                                    cell,
                                    cellIndex,
                                  ) => (
                                    <td
                                      key={`${cell}-${cellIndex}`}
                                      className={cn(
                                        "px-4 py-4",
                                        "text-sm",
                                        "leading-[1.6]",
                                        cellIndex ===
                                          0
                                          ? "font-medium text-white/70"
                                          : "text-white/45",
                                      )}
                                    >
                                      {cell}
                                    </td>
                                  ),
                                )}
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </figure>
              </AnimatedContentBlock>
            );

          case "key-value-grid":
            return (
              <AnimatedContentBlock
                key={blockKey}
                index={index}
              >
                <div>
                  {block.title && (
                    <h3
                      className={cn(
                        "mb-4",
                        "text-lg",
                        "font-semibold",
                        "tracking-[-0.025em]",
                        "text-white/85",
                      )}
                    >
                      {block.title}
                    </h3>
                  )}

                  <div
                    className={cn(
                      "grid grid-cols-1",
                      "gap-3",
                      "sm:grid-cols-2",
                    )}
                  >
                    {block.items.map(
                      (
                        item,
                        itemIndex,
                      ) => (
                        <div
                          key={`${item.label}-${itemIndex}`}
                          className={cn(
                            "group/value",
                            "relative",
                            "overflow-hidden",
                            "rounded-2xl",
                            "border border-white/[0.065]",
                            "bg-white/[0.022]",
                            "p-4",
                            "transition-all",
                            "duration-300",
                            "hover:-translate-y-0.5",
                            "hover:border-violet-400/18",
                            "hover:bg-violet-400/[0.035]",
                          )}
                        >
                          <div
                            aria-hidden="true"
                            className={cn(
                              "absolute inset-x-4 top-0",
                              "h-px",
                              "bg-[linear-gradient(90deg,transparent,#8b5cf6,transparent)]",
                              "opacity-0",
                              "transition-opacity",
                              "group-hover/value:opacity-50",
                            )}
                          />

                          <span
                            className={cn(
                              "text-sm",
                              "font-semibold",
                              "tracking-[-0.02em]",
                              "text-white/78",
                            )}
                          >
                            {item.label}
                          </span>

                          <p
                            className={cn(
                              "mt-2",
                              "text-sm",
                              "leading-[1.7]",
                              "text-white/43",
                              "transition-colors",
                              "group-hover/value:text-white/56",
                            )}
                          >
                            {item.value}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </AnimatedContentBlock>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}