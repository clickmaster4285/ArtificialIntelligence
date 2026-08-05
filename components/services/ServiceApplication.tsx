// src/components/services/ServiceApplications.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceApplicationsProps {
  data: {
    title: string;
    description?: string;
    items: {
      title: string;
      description: string;
      keyFeatures?: string[];
      technicalApproach?: string;
      typicalOutcome?: string;
    }[];
  };
  className?: string;
}

export function ServiceApplications({ data, className }: ServiceApplicationsProps) {
  return (
    <section className={cn("relative py-20 bg-card overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[var(--grad-fade)] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-eyebrow text-violet-soft">Applications</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mt-3">
              {data.title}
            </h2>
            {data.description && (
              <p className="text-ink-mute mt-4 max-w-2xl mx-auto">
                {data.description}
              </p>
            )}
          </motion.div>

          <div className="space-y-6">
            {data.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.06 * index }}
                className="group glass rounded-2xl p-6 md:p-8 hover:border-violet-500/30 hover:violet-glow transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-violet-500/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-violet-soft transition-colors duration-300 pt-1.5">
                    {item.title}
                  </h3>
                </div>

                <p className="text-ink-mute leading-relaxed mb-4 ml-14">
                  {item.description}
                </p>

                {item.keyFeatures && item.keyFeatures.length > 0 && (
                  <div className="ml-14 mb-4">
                    <div className="text-sm font-semibold text-ink-soft mb-2">
                      Key Features:
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.keyFeatures.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm text-ink-mute">
                          <svg
                            className="w-4 h-4 text-violet-soft mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.technicalApproach && (
                  <div className="ml-14 mb-2 bg-violet-500/[0.07] rounded-lg p-3 border border-violet-500/15">
                    <span className="text-sm font-semibold text-violet-soft">
                      Technical Approach:
                    </span>
                    <span className="text-sm text-ink-soft ml-1">
                      {item.technicalApproach}
                    </span>
                  </div>
                )}

                {item.typicalOutcome && (
                  <div className="ml-14">
                    <span className="text-sm font-semibold text-ink-soft">
                      Typical Outcome:
                    </span>
                    <span className="text-sm text-emerald-400 ml-1">
                      {item.typicalOutcome}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}