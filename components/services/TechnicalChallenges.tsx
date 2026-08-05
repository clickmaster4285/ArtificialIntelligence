// src/components/services/ServiceTechnicalChallenges.tsx

'use client';

import { motion } from 'framer-motion';

interface ServiceTechnicalChallengesProps {
  data: {
    title: string;
    description: string;
    challenges: {
      title: string;
      description: string;
      solution?: string;
    }[];
  };
}

export function ServiceTechnicalChallenges({ data }: ServiceTechnicalChallengesProps) {
  return (
    <section className="relative py-20 bg-card overflow-hidden">
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
            <span className="text-eyebrow text-violet-soft">Engineering Challenges</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mt-3">
              {data.title}
            </h2>
            <p className="text-ink-mute mt-4 max-w-2xl mx-auto">
              {data.description}
            </p>
          </motion.div>

          <div className="space-y-5">
            {data.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 * index }}
                className="glass rounded-xl p-6 hover:border-violet-500/30 transition-all duration-500"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {challenge.title}
                </h3>
                <p className="text-ink-mute leading-relaxed mb-3">
                  {challenge.description}
                </p>
                {challenge.solution && (
                  <div className="bg-violet-500/[0.07] rounded-lg p-4 border border-violet-500/15">
                    <span className="text-sm font-medium text-violet-soft">
                      Solution:
                    </span>
                    <span className="text-sm text-ink-soft ml-1">
                      {challenge.solution}
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