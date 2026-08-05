// src/components/services/ServiceCTA.tsx

'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { NetworkBackground } from './NetworkBackground';

interface ServiceCTAProps {
  data: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };
  className?: string;
}

export function ServiceCTA({ data, className }: ServiceCTAProps) {
  return (
    <section className={cn(
      "relative py-20 overflow-hidden",
      className
    )}>
      {/* Brand gradient background, consistent with homepage identity */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-fuchsia-700 to-violet-900" />
      <div className="opacity-70">
        <NetworkBackground density="low" />
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Grain texture for cohesion with rest of site */}
      <div className="absolute inset-0 opacity-[0.05] grain-after pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Let's Build Something Great Together
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-display text-3xl md:text-4xl lg:text-5xl text-white mb-4"
          >
            {data.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {data.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              href={data.ctaLink}
              className="group bg-white text-violet-700 hover:bg-white/90 hover:scale-105 hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 font-semibold px-8 py-6 text-base rounded-full"
            >
              {data.ctaText}
              <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>

            <a
              href="mailto:hello@clickmastersartificialintelligencecompany.com"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@clickmastersartificialintelligencecompany.com
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
          >
            {['Fixed-Price Milestones', 'Full IP Transfer', '24-Hour Response', 'USA-Based Engineers'].map((item, i) => (
              <span key={item} className="flex items-center gap-6">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}