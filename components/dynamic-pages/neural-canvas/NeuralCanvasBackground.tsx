"use client";

import {
  useEffect,
  useRef,
} from "react";

import { useReducedMotion } from "framer-motion";

import type { PageAccent } from "@/types/dynamic-page";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface NeuralCanvasBackgroundProps {
  accent?: PageAccent;
  className?: string;

  /**
   * Maximum distance at which nodes connect.
   */
  connectionDistance?: number;

  /**
   * Overall particle speed.
   *
   * Recommended:
   * 0.15 to 0.5
   */
  speed?: number;

  /**
   * Enables cursor repulsion and depth movement.
   */
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;

  previousX: number;
  previousY: number;

  velocityX: number;
  velocityY: number;

  radius: number;
  depth: number;
  opacity: number;
}

interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

/* =========================================================
   COLOR PALETTES
========================================================= */

type RGB = readonly [
  number,
  number,
  number,
];

interface AccentPalette {
  primary: RGB;
  secondary: RGB;
  highlight: RGB;
}

const palettes: Record<
  PageAccent,
  AccentPalette
> = {
  violet: {
    primary: [139, 92, 246],
    secondary: [34, 211, 238],
    highlight: [232, 121, 249],
  },

  cyan: {
    primary: [34, 211, 238],
    secondary: [59, 130, 246],
    highlight: [103, 232, 249],
  },

  blue: {
    primary: [59, 130, 246],
    secondary: [99, 102, 241],
    highlight: [147, 197, 253],
  },

  emerald: {
    primary: [16, 185, 129],
    secondary: [34, 211, 238],
    highlight: [110, 231, 183],
  },

  orange: {
    primary: [249, 115, 22],
    secondary: [244, 63, 94],
    highlight: [253, 186, 116],
  },

  rose: {
    primary: [244, 63, 94],
    secondary: [168, 85, 247],
    highlight: [251, 113, 133],
  },
};

/* =========================================================
   HELPERS
========================================================= */

function rgba(
  color: RGB,
  alpha: number,
): string {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

function randomBetween(
  minimum: number,
  maximum: number,
): number {
  return (
    minimum +
    Math.random() * (maximum - minimum)
  );
}

function distanceBetween(
  firstX: number,
  firstY: number,
  secondX: number,
  secondY: number,
): number {
  const differenceX = firstX - secondX;
  const differenceY = firstY - secondY;

  return Math.sqrt(
    differenceX * differenceX +
      differenceY * differenceY,
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export function NeuralCanvasBackground({
  accent = "violet",
  className,
  connectionDistance = 145,
  speed = 0.28,
  interactive = true,
}: NeuralCanvasBackgroundProps) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const canvasContext =
      canvas.getContext("2d", {
        alpha: true,
      });

    if (!canvasContext) {
      return;
    }

    const context = canvasContext;

    const palette = palettes[accent];

    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;

    let particles: Particle[] = [];
    let animationFrame = 0;
    let previousTime = performance.now();
    let pageIsVisible = true;

    const pointer: PointerState = {
      x: -1000,
      y: -1000,
      active: false,
    };

    /* =====================================================
       PARTICLE CREATION
    ===================================================== */

    const createParticle = (): Particle => {
      const depth = randomBetween(
        0.35,
        1,
      );

      const x = randomBetween(0, width);
      const y = randomBetween(0, height);

      const direction =
        randomBetween(0, Math.PI * 2);

      const velocity =
        randomBetween(0.08, 0.34) *
        speed *
        depth;

      return {
        x,
        y,

        previousX: x,
        previousY: y,

        velocityX:
          Math.cos(direction) *
          velocity,

        velocityY:
          Math.sin(direction) *
          velocity,

        radius:
          randomBetween(0.8, 2.2) *
          depth,

        depth,

        opacity: randomBetween(
          0.35,
          0.9,
        ),
      };
    };

    const createParticles = () => {
      /*
       * Desktop gets richer detail.
       * Mobile gets fewer particles for performance.
       */
      const isSmallViewport =
        width < 768;

      const area =
        width * height;

      const density = isSmallViewport
        ? 26000
        : 17500;

      const minimumParticles =
        isSmallViewport ? 24 : 45;

      const maximumParticles =
        isSmallViewport ? 48 : 95;

      const particleCount = Math.min(
        maximumParticles,
        Math.max(
          minimumParticles,
          Math.floor(area / density),
        ),
      );

      particles = Array.from(
        {
          length: particleCount,
        },
        createParticle,
      );
    };

    /* =====================================================
       CANVAS RESIZE
    ===================================================== */

    const resizeCanvas = () => {
      const bounds =
        canvas.getBoundingClientRect();

      width = Math.max(
        1,
        bounds.width,
      );

      height = Math.max(
        1,
        bounds.height,
      );

      /*
       * Cap DPR at 2 to avoid excessive GPU work
       * on high-density displays.
       */
      devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      canvas.width = Math.floor(
        width * devicePixelRatio,
      );

      canvas.height = Math.floor(
        height * devicePixelRatio,
      );

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0,
      );

      createParticles();

      /*
       * Reduced-motion users receive one
       * beautiful static frame.
       */
      if (reduceMotion) {
        drawFrame(0);
      }
    };

    /* =====================================================
       BACKGROUND GRID
    ===================================================== */

    const drawGrid = () => {
      const gridSize = 72;

      context.save();

      context.lineWidth = 1;

      context.strokeStyle =
        "rgba(255, 255, 255, 0.025)";

      for (
        let x = 0;
        x <= width;
        x += gridSize
      ) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (
        let y = 0;
        y <= height;
        y += gridSize
      ) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.restore();
    };

    /* =====================================================
       PARTICLE MOVEMENT
    ===================================================== */

    const updateParticle = (
      particle: Particle,
      deltaTime: number,
    ) => {
      particle.previousX = particle.x;
      particle.previousY = particle.y;

      const timeMultiplier =
        Math.min(deltaTime, 32) / 16.67;

      particle.x +=
        particle.velocityX *
        timeMultiplier;

      particle.y +=
        particle.velocityY *
        timeMultiplier;

      /*
       * Wrap particles around the viewport.
       */
      if (particle.x < -20) {
        particle.x = width + 20;
      } else if (
        particle.x > width + 20
      ) {
        particle.x = -20;
      }

      if (particle.y < -20) {
        particle.y = height + 20;
      } else if (
        particle.y > height + 20
      ) {
        particle.y = -20;
      }

      if (
        !interactive ||
        !pointer.active
      ) {
        return;
      }

      const pointerDistance =
        distanceBetween(
          particle.x,
          particle.y,
          pointer.x,
          pointer.y,
        );

      const interactionRadius = 180;

      if (
        pointerDistance <= 0 ||
        pointerDistance >
          interactionRadius
      ) {
        return;
      }

      const force =
        1 -
        pointerDistance /
          interactionRadius;

      const directionX =
        (particle.x - pointer.x) /
        pointerDistance;

      const directionY =
        (particle.y - pointer.y) /
        pointerDistance;

      /*
       * Near nodes gently move away from cursor.
       */
      particle.x +=
        directionX *
        force *
        1.5 *
        particle.depth;

      particle.y +=
        directionY *
        force *
        1.5 *
        particle.depth;
    };

    /* =====================================================
       CONNECTIONS
    ===================================================== */

    const drawConnections = () => {
      for (
        let firstIndex = 0;
        firstIndex <
        particles.length;
        firstIndex += 1
      ) {
        const first =
          particles[firstIndex];

        for (
          let secondIndex =
            firstIndex + 1;
          secondIndex <
          particles.length;
          secondIndex += 1
        ) {
          const second =
            particles[secondIndex];

          const distance =
            distanceBetween(
              first.x,
              first.y,
              second.x,
              second.y,
            );

          const depthAverage =
            (first.depth +
              second.depth) /
            2;

          const maximumDistance =
            connectionDistance *
            depthAverage;

          if (
            distance >
            maximumDistance
          ) {
            continue;
          }

          const opacity =
            (1 -
              distance /
                maximumDistance) *
            0.22 *
            depthAverage;

          const gradient =
            context.createLinearGradient(
              first.x,
              first.y,
              second.x,
              second.y,
            );

          gradient.addColorStop(
            0,
            rgba(
              palette.primary,
              opacity,
            ),
          );

          gradient.addColorStop(
            1,
            rgba(
              palette.secondary,
              opacity,
            ),
          );

          context.beginPath();

          context.moveTo(
            first.x,
            first.y,
          );

          context.lineTo(
            second.x,
            second.y,
          );

          context.lineWidth =
            0.5 +
            depthAverage * 0.35;

          context.strokeStyle =
            gradient;

          context.stroke();
        }
      }
    };

    /* =====================================================
       PARTICLE DRAWING
    ===================================================== */

    const drawParticle = (
      particle: Particle,
    ) => {
      /*
       * Subtle motion trail.
       */
      context.beginPath();

      context.moveTo(
        particle.previousX,
        particle.previousY,
      );

      context.lineTo(
        particle.x,
        particle.y,
      );

      context.lineWidth =
        particle.radius * 0.55;

      context.strokeStyle = rgba(
        palette.primary,
        particle.opacity * 0.15,
      );

      context.stroke();

      /*
       * Outer node glow.
       */
      const glow =
        context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 7,
        );

      glow.addColorStop(
        0,
        rgba(
          palette.highlight,
          particle.opacity * 0.5,
        ),
      );

      glow.addColorStop(
        1,
        rgba(
          palette.highlight,
          0,
        ),
      );

      context.beginPath();

      context.arc(
        particle.x,
        particle.y,
        particle.radius * 7,
        0,
        Math.PI * 2,
      );

      context.fillStyle = glow;
      context.fill();

      /*
       * Bright node core.
       */
      context.beginPath();

      context.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2,
      );

      context.fillStyle = rgba(
        palette.highlight,
        particle.opacity,
      );

      context.fill();
    };

    /* =====================================================
       POINTER GLOW
    ===================================================== */

    const drawPointerGlow = () => {
      if (
        !interactive ||
        !pointer.active
      ) {
        return;
      }

      const glow =
        context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          260,
        );

      glow.addColorStop(
        0,
        rgba(
          palette.primary,
          0.11,
        ),
      );

      glow.addColorStop(
        0.45,
        rgba(
          palette.secondary,
          0.045,
        ),
      );

      glow.addColorStop(
        1,
        rgba(
          palette.primary,
          0,
        ),
      );

      context.fillStyle = glow;

      context.fillRect(
        pointer.x - 260,
        pointer.y - 260,
        520,
        520,
      );
    };

    /* =====================================================
       FRAME RENDERING
    ===================================================== */

    function drawFrame(
      deltaTime: number,
    ) {
      context.clearRect(
        0,
        0,
        width,
        height,
      );

      drawGrid();
      drawPointerGlow();

      if (!reduceMotion) {
        particles.forEach(
          (particle) => {
            updateParticle(
              particle,
              deltaTime,
            );
          },
        );
      }

      drawConnections();

      particles.forEach(
        drawParticle,
      );
    }

    const animate = (
      currentTime: number,
    ) => {
      const deltaTime =
        currentTime - previousTime;

      previousTime = currentTime;

      if (pageIsVisible) {
        drawFrame(deltaTime);
      }

      animationFrame =
        window.requestAnimationFrame(
          animate,
        );
    };

    /* =====================================================
       POINTER EVENTS
    ===================================================== */

    const handlePointerMove = (
      event: globalThis.PointerEvent,
    ) => {
      if (
        !interactive ||
        event.pointerType === "touch"
      ) {
        return;
      }

      const bounds =
        canvas.getBoundingClientRect();

      pointer.x =
        event.clientX - bounds.left;

      pointer.y =
        event.clientY - bounds.top;

      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= bounds.width &&
        pointer.y >= 0 &&
        pointer.y <= bounds.height;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleVisibilityChange =
      () => {
        pageIsVisible =
          document.visibilityState ===
          "visible";

        previousTime =
          performance.now();
      };

    /* =====================================================
       INITIALIZATION
    ===================================================== */

    const resizeObserver =
      new ResizeObserver(
        resizeCanvas,
      );

    resizeObserver.observe(canvas);

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    resizeCanvas();

    if (!reduceMotion) {
      animationFrame =
        window.requestAnimationFrame(
          animate,
        );
    }

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      resizeObserver.disconnect();

      window.cancelAnimationFrame(
        animationFrame,
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [
    accent,
    connectionDistance,
    interactive,
    reduceMotion,
    speed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none",
        "absolute inset-0",
        "h-full w-full",
        className,
      )}
    />
  );
}
