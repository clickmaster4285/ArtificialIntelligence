// Lightweight Network background component used by service pages

'use client';

import React from 'react';

type Density = 'low' | 'medium' | 'high';

interface NetworkBackgroundProps {
  density?: Density;
}

export function NetworkBackground({ density = 'medium' }: NetworkBackgroundProps) {
  // Minimal placeholder implementation to avoid circular import / missing export errors.
  const sizeClass = density === 'low' ? 'opacity-30' : density === 'high' ? 'opacity-90' : 'opacity-60';
  return (
    <div aria-hidden className={`absolute inset-0 pointer-events-none ${sizeClass}`}>
      {/* Implement visual network/particle canvas here */}
      <svg className="w-full h-full" preserveAspectRatio="none">
        <rect width="100%" height="100%" fill="none" />
      </svg>
    </div>
  );
}

export default NetworkBackground;