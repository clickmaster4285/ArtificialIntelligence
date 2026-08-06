"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import Link from "next/link";

import type {
  PointerEvent,
  ReactNode,
} from "react";

import type { PageLink } from "@/types/dynamic-page";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

export type MagneticButtonVariant =
  | "primary"
  | "secondary"
  | "ghost";

export type MagneticButtonSize =
  | "default"
  | "large";

interface MagneticButtonProps {
  link: PageLink;

  variant?: MagneticButtonVariant;
  size?: MagneticButtonSize;

  className?: string;
  icon?: ReactNode;
  showArrow?: boolean;

  /**
   * Controls how far the button moves toward the cursor.
   *
   * Recommended:
   * 0.12 to 0.25
   */
  magneticStrength?: number;
}

/* =========================================================
   STYLES
========================================================= */

const variantClasses: Record<
  MagneticButtonVariant,
  string
> = {
  primary: [
    "border-white/15",
    "bg-white",
    "text-black",
    "shadow-[0_20px_80px_-24px_rgba(167,139,250,0.75)]",
    "hover:shadow-[0_28px_100px_-24px_rgba(167,139,250,0.95)]",
  ].join(" "),

  secondary: [
    "border-white/12",
    "bg-white/[0.055]",
    "text-white",
    "backdrop-blur-xl",
    "hover:border-violet-300/30",
    "hover:bg-white/[0.09]",
  ].join(" "),

  ghost: [
    "border-transparent",
    "bg-transparent",
    "text-white/75",
    "hover:border-white/10",
    "hover:bg-white/[0.045]",
    "hover:text-white",
  ].join(" "),
};

const sizeClasses: Record<
  MagneticButtonSize,
  string
> = {
  default: "min-h-12 px-5 py-3 text-sm",
  large: "min-h-14 px-7 py-4 text-[0.95rem]",
};

/* =========================================================
   COMPONENT
========================================================= */

export function MagneticButton({
  link,
  variant = "primary",
  size = "default",
  className,
  icon,
  showArrow = true,
  magneticStrength = 0.18,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();

  /*
   * Main button movement.
   */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /*
   * Glow position inside the button.
   */
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  /*
   * Spring movement creates premium weighted motion.
   */
  const springX = useSpring(rawX, {
    stiffness: 180,
    damping: 18,
    mass: 0.45,
  });

  const springY = useSpring(rawY, {
    stiffness: 180,
    damping: 18,
    mass: 0.45,
  });

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (
      reduceMotion ||
      event.pointerType === "touch"
    ) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const pointerX =
      event.clientX - bounds.left;

    const pointerY =
      event.clientY - bounds.top;

    const distanceFromCenterX =
      pointerX - bounds.width / 2;

    const distanceFromCenterY =
      pointerY - bounds.height / 2;

    rawX.set(
      distanceFromCenterX * magneticStrength,
    );

    rawY.set(
      distanceFromCenterY * magneticStrength,
    );

    /*
     * Keep glow coordinates relative to button center.
     */
    glowX.set(distanceFromCenterX);
    glowY.set(distanceFromCenterY);
  };

  const resetButton = () => {
    rawX.set(0);
    rawY.set(0);
    glowX.set(0);
    glowY.set(0);
  };

  const isExternal =
    link.external ||
    link.href.startsWith("http://") ||
    link.href.startsWith("https://");

  const ArrowIcon = isExternal
    ? ArrowUpRight
    : ArrowRight;

  return (
    <motion.div
      className="group/magnetic relative inline-flex"
      style={
        reduceMotion
          ? undefined
          : {
              x: springX,
              y: springY,
            }
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={resetButton}
      onPointerCancel={resetButton}
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.97,
            }
      }
    >
      <Link
        href={link.href}
        aria-label={
          link.ariaLabel ?? link.label
        }
        target={
          isExternal
            ? "_blank"
            : undefined
        }
        rel={
          isExternal
            ? "noopener noreferrer"
            : undefined
        }
        className={cn(
          "relative isolate inline-flex overflow-hidden",
          "items-center justify-center gap-3",
          "rounded-full border",
          "font-semibold tracking-[-0.015em]",
          "transition-[background-color,border-color,color,box-shadow,transform]",
          "duration-300 ease-out",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-violet-300",
          "focus-visible:ring-offset-4",
          "focus-visible:ring-offset-black",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
      >
        {/* Moving cursor glow */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute",
              "left-1/2 top-1/2 -z-10",
              "h-28 w-28 rounded-full",
              "opacity-0 blur-2xl",
              "transition-opacity duration-300",
              "group-hover/magnetic:opacity-100",
              variant === "primary"
                ? "bg-violet-400/45"
                : "bg-violet-400/30",
            )}
            style={{
              x: glowX,
              y: glowY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        )}

        {/* Animated border shine */}
        <motion.span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute",
            "inset-0 -z-10",
            "rounded-[inherit]",
            "opacity-0",
            "transition-opacity duration-300",
            "group-hover/magnetic:opacity-100",
            variant === "primary"
              ? "bg-[linear-gradient(110deg,transparent_25%,rgba(167,139,250,0.35)_48%,transparent_72%)]"
              : "bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.08)_48%,transparent_75%)]",
          )}
          initial={{
            x: "-120%",
          }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  x: "120%",
                }
          }
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Optional leading icon */}
        {icon && (
          <span
            aria-hidden="true"
            className="relative z-10 flex shrink-0"
          >
            {icon}
          </span>
        )}

        <span className="relative z-10">
          {link.label}
        </span>

        {showArrow && (
          <span
            aria-hidden="true"
            className={cn(
              "relative z-10 flex shrink-0",
              "transition-transform duration-300",
              "group-hover/magnetic:translate-x-1",
              isExternal &&
                "group-hover/magnetic:-translate-y-1",
            )}
          >
            <ArrowIcon className="h-4 w-4" />
          </span>
        )}
      </Link>
    </motion.div>
  );
}