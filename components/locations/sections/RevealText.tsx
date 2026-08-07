'use client';

// components/sections/shared/RevealText.tsx
//
// Word-by-word "text reveal" treatment: each word is masked inside an
// overflow-hidden span and slides up into place. Use `as` to pick the tag,
// and `trigger="mount"` for above-the-fold heroes vs `trigger="scroll"` for
// sections further down the page.

import React from 'react';
import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  wordClassName?: string;
  trigger?: 'mount' | 'scroll';
  delay?: number;
  stagger?: number;
}

export function RevealText({
  text,
  as = 'span',
  className = '',
  wordClassName = '',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.06,
}: RevealTextProps) {
  const words = text.split(' ');
  const Tag: keyof React.JSX.IntrinsicElements = as;

  const viewportProps =
    trigger === 'scroll' ? { whileInView: 'visible', viewport: { once: true, margin: '-60px' } } : { animate: 'visible' };

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        {...viewportProps}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em]">
            <motion.span
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: {
                  y: '0%',
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={`inline-block ${wordClassName}`}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
