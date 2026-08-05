'use client';

// components/sections/shared/FloatingObjects.tsx
//
// Ambient background: slow-drifting blurred orbs + an animated gradient wash.
// Pure framer-motion (no custom CSS/keyframes needed), so it drops into any
// project without touching globals.css.

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingObjectsProps {
  variant?: 'hero' | 'cta' | 'subtle';
  className?: string;
}

interface Orb {
  size: number;
  top: string;
  left: string;
  color: string;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

function buildOrbs(variant: 'hero' | 'cta' | 'subtle'): Orb[] {
  const palette = ['#7c3aed', '#a855f7', '#ec4899', '#8b5cf6'];
  const count = variant === 'subtle' ? 3 : 4;
  const baseSize = variant === 'cta' ? 260 : 320;

  return Array.from({ length: count }, (_, i) => ({
    size: baseSize - i * 40,
    top: `${10 + ((i * 27) % 70)}%`,
    left: `${(i * 33) % 90}%`,
    color: palette[i % palette.length],
    duration: 10 + i * 3,
    delay: i * 0.8,
    driftX: 20 + i * 8,
    driftY: 26 + i * 6,
  }));
}

export function FloatingObjects({ variant = 'hero', className = '' }: FloatingObjectsProps) {
  const orbs = useMemo(() => buildOrbs(variant), [variant]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Animated gradient wash */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08), rgba(124,58,237,0.12))',
          backgroundSize: '200% 200%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating blurred orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: orb.color,
            opacity: 0.14,
          }}
          animate={{
            x: [0, orb.driftX, 0, -orb.driftX, 0],
            y: [0, -orb.driftY, 0, orb.driftY, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}