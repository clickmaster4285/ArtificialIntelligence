// src/components/services/ServiceOverview.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceOverviewProps {
  data: {
    title: string;
    content: string;
    stats?: {
      label: string;
      value: string;
      description?: string;
    }[];
  };
  className?: string;
}

export function ServiceOverview({ data, className }: ServiceOverviewProps) {
  return (
    <section className={cn("relative py-20 bg-background overflow-hidden", className)}>
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[var(--grad-fade)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain-after" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="text-eyebrow text-violet-soft">Overview</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mt-3">
              {data.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-invert prose-lg max-w-none text-ink-soft leading-relaxed text-center"
          >
            <p>{data.content}</p>
          </motion.div>

          {data.stats && data.stats.length > 0 && (
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="glass rounded-2xl p-6 text-center hover:border-violet-500/30 hover:violet-glow transition-all duration-500 group"
                >
                  <div className="text-display text-3xl md:text-4xl text-violet-soft mb-1 group-hover:text-violet transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                  {stat.description && (
                    <div className="text-xs text-ink-mute mt-1">{stat.description}</div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}