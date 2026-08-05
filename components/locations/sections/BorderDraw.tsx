'use client';

// components/sections/shared/BorderDraw.tsx
//
// An absolutely-positioned SVG rect that "draws" its stroke around a card or
// button on hover, using the pathLength=1 trick so it works at any size
// without hand-computed dash arrays.

import React from 'react';
import { motion } from 'framer-motion';

interface BorderDrawProps {
  hovered: boolean;
  rounded?: number;
  colorFrom?: string;
  colorTo?: string;
  strokeWidth?: number;
}

export function BorderDraw({
  hovered,
  rounded = 16,
  colorFrom = '#a855f7',
  colorTo = '#ec4899',
  strokeWidth = 1.5,
}: BorderDrawProps) {
  const gradId = React.useId();

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorFrom} />
          <stop offset="100%" stopColor={colorTo} />
        </linearGradient>
      </defs>
      <motion.rect
        x={strokeWidth}
        y={strokeWidth}
        width={`calc(100% - ${strokeWidth * 2}px)`}
        height={`calc(100% - ${strokeWidth * 2}px)`}
        rx={rounded}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        pathLength={1}
        strokeDasharray="1 1"
        initial={{ strokeDashoffset: 1, opacity: 0 }}
        animate={{
          strokeDashoffset: hovered ? 0 : 1,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}