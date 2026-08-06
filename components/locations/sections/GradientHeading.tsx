'use client';

// components/sections/shared/GradientHeading.tsx
//
// Renders a bold, left-aligned heading with a word-by-word scroll reveal.
// Wrap any word(s) in *asterisks* to render them italic with the brand
// violet -> pink -> coral gradient, e.g.
//   <GradientHeading text="Have an idea worth *shipping*? Tell us about it." />

import React from 'react';
import { motion } from 'framer-motion';

interface Token {
  word: string;
  highlight: boolean;
}

function tokenize(text: string): Token[] {
  const segments = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  const tokens: Token[] = [];
  segments.forEach((seg) => {
    const isHighlight = seg.startsWith('*') && seg.endsWith('*');
    const content = isHighlight ? seg.slice(1, -1) : seg;
    content.split(' ').forEach((word) => {
      if (word) tokens.push({ word, highlight: isHighlight });
    });
  });
  return tokens;
}

interface GradientHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  trigger?: 'mount' | 'scroll';
  delay?: number;
}

export function GradientHeading({
  text,
  as = 'h2',
  className = '',
  trigger = 'scroll',
  delay = 0,
}: GradientHeadingProps) {
  const tokens = tokenize(text);
  const Tag: keyof React.JSX.IntrinsicElements = as;

  const viewportProps =
    trigger === 'scroll'
      ? { whileInView: 'visible', viewport: { once: true, margin: '-60px' } }
      : { animate: 'visible' };

  return (
    <Tag className={`text-display font-extrabold tracking-tight text-left ${className}`}>
      <motion.span
        initial="hidden"
        {...viewportProps}
        transition={{ staggerChildren: 0.045, delayChildren: delay }}
        className="inline"
      >
        {tokens.map((token, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] mr-[0.22em]">
            <motion.span
              variants={{
                hidden: { y: '115%', opacity: 0 },
                visible: {
                  y: '0%',
                  opacity: 1,
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={
                token.highlight
                  ? 'inline-block italic bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent'
                  : 'inline-block text-foreground'
              }
            >
              {token.word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
