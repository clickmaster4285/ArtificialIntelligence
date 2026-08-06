'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, TrendingUp } from 'lucide-react';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';

interface OverviewStat {
  label: string;
  value: string;
  description?: string;
}

interface OverviewSectionProps {
  title: string;
  content: string;
  stats?: OverviewStat[];
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  title,
  content,
  stats,
}) => {
  const featuredStats = stats?.slice(0, 3) ?? [];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5"
          >
            <span className="text-eyebrow text-violet-400">Market Overview</span>
            <div className="mt-3">
              <GradientHeading
                text={title}
                as="h2"
                className="text-3xl md:text-4xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-base md:text-lg leading-relaxed text-ink-soft">
              {content}
            </p>

            {featuredStats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {featuredStats.map((stat, index) => {
                  const icons = [
                    <BrainCircuit key="brain" className="w-4 h-4" />,
                    <TrendingUp key="trend" className="w-4 h-4" />,
                    <CheckCircle2 key="check" className="w-4 h-4" />,
                  ];

                  return (
                    <motion.div
                      key={`${stat.label}-${index}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.12 + index * 0.05 }}
                      className="rounded-xl border border-white/5 bg-white/[0.04] p-4"
                    >
                      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                        {icons[index % icons.length]}
                      </div>
                      <div className="text-xl font-semibold text-white">{stat.value}</div>
                      <div className="mt-1 text-sm text-ink-mute">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
