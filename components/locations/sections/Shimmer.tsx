'use client';

// components/sections/shared/Shimmer.tsx
//
// A diagonal light sweep that plays on hover. Drop inside any
// `relative overflow-hidden group` container.

import React from 'react';

export function Shimmer() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1100ms] ease-out"
      style={{
        background:
          'linear-gradient(75deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%)',
      }}
    />
  );
}

/**
 * SkeletonBar — a shimmering loading placeholder (infinite sweep), used for
 * the "loading skeleton" state before real content mounts.
 */
export function SkeletonBar({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-white/5 ${className}`}>
      <div
        className="absolute inset-0 animate-[skeleton-sweep_1.6s_ease-in-out_infinite]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
      <style jsx>{`
        @keyframes skeleton-sweep {
          0% { background-position: -150% 0; }
          100% { background-position: 150% 0; }
        }
      `}</style>
    </div>
  );
}