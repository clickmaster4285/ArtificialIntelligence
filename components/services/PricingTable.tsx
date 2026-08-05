// src/components/services/ServicePricing.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServicePricingProps {
  data: {
    title: string;
    description?: string;
    items: {
      systemType: string;
      priceRange: string;
      timeline: string;
      primaryOutcome: string;
    }[];
    note?: string;
  };
  className?: string;
}

export function ServicePricing({ data, className }: ServicePricingProps) {
  return (
    <section className={cn("relative py-20 bg-card overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[var(--grad-fade)] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-eyebrow text-violet-soft">Investment</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mt-3">
              {data.title}
            </h2>
            {data.description && (
              <p className="text-ink-mute mt-4 max-w-2xl mx-auto">
                {data.description}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-x-auto glass rounded-2xl"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    System Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Price Range
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Timeline
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Primary Outcome
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.items.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-violet-500/[0.06] transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {item.systemType}
                    </td>
                    <td className="px-6 py-4 text-sm text-violet-soft font-semibold">
                      {item.priceRange}
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-mute">
                      {item.timeline}
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-mute">
                      {item.primaryOutcome}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {data.note && (
            <p className="mt-4 text-sm text-ink-mute italic text-center">
              {data.note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}