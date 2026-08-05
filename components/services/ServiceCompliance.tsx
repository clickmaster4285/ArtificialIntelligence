// src/components/services/ServiceCompliance.tsx

'use client';

import { motion } from 'framer-motion';

interface ServiceComplianceProps {
  data: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
}

export function ServiceCompliance({ data }: ServiceComplianceProps) {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[var(--grad-fade)] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-eyebrow text-violet-soft">Compliance & Security</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mt-3">
              {data.title}
            </h2>
            <p className="text-ink-mute mt-4 max-w-2xl mx-auto">
              {data.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 * index }}
                className="glass rounded-xl p-6 hover:border-violet-500/30 hover:violet-glow transition-all duration-500"
              >
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-soft mt-2 flex-shrink-0 shadow-[0_0_8px_var(--violet-soft)]" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-mute leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}