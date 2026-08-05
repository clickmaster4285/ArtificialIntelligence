// src/components/services/ServiceHero.tsx

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NetworkBackground } from './NetworkBackground';

interface ServiceHeroProps {
  data: {
    tagline: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    startingPrice?: string;
    badge?: string;
  };
  h1: string;
  className?: string;
}

export function ServiceHero({ data, h1, className }: ServiceHeroProps) {
  return (
    <section className={cn(
      "relative overflow-hidden py-24 min-h-[600px] flex items-center bg-background",
      className
    )}>
      {/* Base dark layer + signature network animation, matching homepage hero */}
      <div className="absolute inset-0 bg-background pointer-events-none" />
      <NetworkBackground density="medium" />
      <div className="absolute inset-0 bg-[var(--grad-fade)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] grain-after pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          {data.badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-violet-soft text-eyebrow mb-6 normal-case tracking-normal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-soft animate-pulse" />
              {data.badge}
            </motion.div>
          )}

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2"
          >
            {h1}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl font-medium mt-4 mb-4 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent"
          >
            {data.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-ink-mute leading-relaxed mb-8 max-w-3xl mx-auto"
          >
            {data.description}
          </motion.p>

          {/* CTA and Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              href={data.ctaLink}
              className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-0.5 rounded-full px-8 py-6 text-base"
            >
              {data.ctaText}
              <span className="ml-2">→</span>
            </Button>

            <div className="flex items-center gap-3">
              {data.startingPrice && (
                <span className="px-4 py-2 glass rounded-full font-semibold text-ink-soft text-sm">
                  From {data.startingPrice}
                </span>
              )}
              <span className="text-ink-mute text-sm">Fixed-price</span>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-ink-mute"
          >
            {['Full IP Transfer', 'USA-Based Engineers', 'Fixed-Price Milestones', '24-Hour Response'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}